import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import {
  VSSApprenant, VSSPlanning, genererPlanningVSS, parseSuiviVSSXlsx,
  exportPlanningsVSSXlsx, exportPlanningVSSXlsx, slugApprenant, stagiairesToVSS, frDate, MAX_H_JOUR,
} from "@/lib/vssPlanning";
import JSZip from "jszip";
import {
  Upload, Download, AlertTriangle, CheckCircle2, ChevronDown, ChevronRight,
  Users, Plus, Trash2, Clock, Bug,
} from "lucide-react";
import { toast } from "sonner";

interface Props {
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
}

const STORAGE_KEY = "vss_apprenants";

const SuiviVSS = ({ formation, stagiaires }: Props) => {
  const [open, setOpen] = useState(false);
  const [apprenants, setApprenants] = useState<VSSApprenant[]>(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [showDebug, setShowDebug] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(apprenants)); } catch { /* ignore */ }
  }, [apprenants]);

  // Recalcul automatique dès qu'une date ou un nombre d'heures change
  const plannings: VSSPlanning[] = useMemo(
    () => apprenants.map((a) => genererPlanningVSS(a)),
    [apprenants],
  );

  const totalAlertes = plannings.filter((p) => !p.valide).length;

  const update = (id: string, patch: Partial<VSSApprenant>) =>
    setApprenants((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const handleImport = async (file: File) => {
    try {
      const buf = await file.arrayBuffer();
      const rows = parseSuiviVSSXlsx(buf);
      if (!rows.length) { toast.error("Aucun apprenant détecté dans le fichier"); return; }
      setApprenants(rows);
      toast.success(`${rows.length} apprenant(s) importé(s)`);
    } catch (e) {
      toast.error("Impossible de lire le fichier Excel");
    }
  };

  const handleFromStagiaires = () => {
    if (!stagiaires.length) { toast.error("Aucun stagiaire dans le formulaire"); return; }
    setApprenants(stagiairesToVSS(stagiaires as any, formation.dateDebut, formation.dateFin, 0));
    toast.success(`${stagiaires.length} apprenant(s) chargé(s) — renseignez les heures VSS`);
  };

  const download = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (!plannings.length) { toast.error("Aucun planning à exporter"); return; }
    download(exportPlanningsVSSXlsx(plannings), `Suivi_temps_connexion_VSS.xlsx`);
  };

  const handleExportParStagiaire = async () => {
    if (!plannings.length) { toast.error("Aucun planning à exporter"); return; }
    const zip = new JSZip();
    zip.file("Synthese_globale_VSS.xlsx", exportPlanningsVSSXlsx(plannings));
    const used = new Map<string, number>();
    plannings.forEach((p) => {
      let slug = slugApprenant(p.apprenant.nom);
      const n = (used.get(slug) ?? 0) + 1;
      used.set(slug, n);
      if (n > 1) slug = `${slug}_${n}`;
      zip.folder(slug)!.file(`Suivi_temps_connexion_VSS_${slug}.xlsx`, exportPlanningVSSXlsx(p));
    });
    const blob = await zip.generateAsync({ type: "blob" });
    download(blob, "Suivi_temps_connexion_VSS_par_stagiaire.zip");
    toast.success(`${plannings.length} dossier(s) stagiaire exporté(s)`);
  };


  const toggleRow = (id: string) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const statutBadge = (s: string) => {
    const cls =
      s === "réalisé" ? "bg-primary/10 text-primary"
        : s === "manquant" ? "bg-destructive/10 text-destructive"
          : "bg-muted text-muted-foreground";
    return <span className={`text-xs px-2 py-0.5 rounded-full ${cls}`}>{s}</span>;
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <Clock className="w-4 h-4" />
          <span className="font-semibold">Temps de connexion VSS</span>
          {apprenants.length > 0 && (
            <span className="text-xs text-muted-foreground">({apprenants.length} apprenant{apprenants.length > 1 ? "s" : ""})</span>
          )}
          {totalAlertes > 0 && (
            <span className="text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
              {totalAlertes} alerte{totalAlertes > 1 ? "s" : ""}
            </span>
          )}
          {apprenants.length > 0 && totalAlertes === 0 && (
            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Conforme</span>
          )}
        </div>
      </button>

      {open && (
        <div className="p-4 border-t bg-background space-y-4">
          <p className="text-sm text-muted-foreground">
            Planification automatique à raison d'<strong>un jour de connexion par semaine</strong> entre la date de
            début et la date de fin, avec répartition exacte du volume d'heures VSS (capacité max {MAX_H_JOUR} h/jour).
          </p>

          <div className="flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImport(f); e.target.value = ""; }}
            />
            <Button variant="outline" size="sm" className="gap-2" onClick={() => fileRef.current?.click()}>
              <Upload className="w-4 h-4" /> Importer le suivi parcours (Excel)
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleFromStagiaires}>
              <Users className="w-4 h-4" /> Charger depuis les stagiaires
            </Button>
            <Button
              variant="outline" size="sm" className="gap-2"
              onClick={() => setApprenants((p) => [...p, {
                id: `new-${Date.now()}`, nom: "", dateDebut: formation.dateDebut || "",
                dateFin: formation.dateFin || "", heuresVSS: 0,
              }])}
            >
              <Plus className="w-4 h-4" /> Ajouter un apprenant
            </Button>
            <Button size="sm" className="gap-2" onClick={handleExport} disabled={!plannings.length}>
              <Download className="w-4 h-4" /> Exporter en Excel
            </Button>
            <Button
              variant="ghost" size="sm" className="gap-2"
              onClick={() => setShowDebug((d) => !d)}
              disabled={!apprenants.length}
            >
              <Bug className="w-4 h-4" /> {showDebug ? "Masquer" : "Voir"} les données importées
            </Button>
          </div>

          {showDebug && apprenants.length > 0 && (
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-2">Apprenant</th>
                    <th className="text-left p-2">Section / feuille</th>
                    <th className="text-left p-2">Colonne début</th>
                    <th className="text-left p-2">Début brut</th>
                    <th className="text-left p-2">Début normalisé</th>
                    <th className="text-left p-2">Colonne fin</th>
                    <th className="text-left p-2">Fin brute</th>
                    <th className="text-left p-2">Fin normalisée</th>
                    <th className="text-left p-2">Heures VSS</th>
                  </tr>
                </thead>
                <tbody>
                  {apprenants.map((a) => (
                    <tr key={a.id} className="border-t">
                      <td className="p-2 font-medium">{a.nom}</td>
                      <td className="p-2 text-muted-foreground">{a.source || "—"}</td>
                      <td className="p-2 text-muted-foreground">{a.colDebut || "—"}</td>
                      <td className="p-2">{a.rawDebut || "—"}</td>
                      <td className={`p-2 ${a.dateDebut ? "" : "text-destructive"}`}>{a.dateDebut || "invalide"}</td>
                      <td className="p-2 text-muted-foreground">{a.colFin || "—"}</td>
                      <td className="p-2">{a.rawFin || "—"}</td>
                      <td className={`p-2 ${a.dateFin ? "" : "text-destructive"}`}>{a.dateFin || "invalide"}</td>
                      <td className="p-2">{a.heuresVSS} h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!apprenants.length && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              Aucun apprenant. Importez le fichier de suivi parcours VSS ou chargez les stagiaires du dossier.
            </div>
          )}

          {plannings.map((p) => {
            const a = p.apprenant;
            const isOpen = expanded.has(a.id);
            return (
              <div key={a.id} className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 p-3 bg-muted/30">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                    <div>
                      <label className="text-[11px] text-muted-foreground">Apprenant</label>
                      <Input value={a.nom} onChange={(e) => update(a.id, { nom: e.target.value })} className="h-8 text-sm" />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground">Date de début</label>
                      <Input type="date" value={a.dateDebut} onChange={(e) => update(a.id, { dateDebut: e.target.value })} className="h-8 text-sm" />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground">Date de fin</label>
                      <Input type="date" value={a.dateFin} onChange={(e) => update(a.id, { dateFin: e.target.value })} className="h-8 text-sm" />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground">Heures totales du parcours</label>
                      <Input
                        type="number" min={0} step={0.5} value={a.heuresVSS}
                        onChange={(e) => update(a.id, { heuresVSS: Number(e.target.value) || 0 })}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground">Heures de connexion réalisées</label>
                      <Input
                        type="number" min={0} step={0.5} value={a.heuresRealisees ?? 0}
                        onChange={(e) => update(a.id, { heuresRealisees: Number(e.target.value) || 0 })}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => toggleRow(a.id)}>
                      {isOpen ? "Masquer" : "Voir le détail"}
                    </Button>
                    <Button
                      variant="ghost" size="sm" className="text-destructive"
                      onClick={() => setApprenants((prev) => prev.filter((x) => x.id !== a.id))}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="px-3 py-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs border-t">
                  <span>Semaines : <strong>{p.semainesDisponibles}</strong></span>
                  <span>Parcours total : <strong>{p.totalAttendu} h</strong></span>
                  <span>Réalisées : <strong className="text-primary">{p.totalRealise} h</strong></span>
                  <span>Attendues à ce stade : <strong>{p.heuresAttenduesStade ?? "—"} h</strong></span>
                  <span>% de la cible : <strong>{p.tauxCible ?? 0} %</strong></span>
                  <span>Écart cible : <strong className={(p.ecartStade ?? 0) < 0 ? "text-destructive" : ""}>{(p.ecartStade ?? 0) > 0 ? "+" : ""}{p.ecartStade ?? 0} h</strong></span>
                  <span>Reste : <strong>{Math.round((p.totalAttendu - p.totalRealise) * 100) / 100} h</strong></span>
                  {p.valide
                    ? <span className="flex items-center gap-1 text-primary"><CheckCircle2 className="w-3 h-3" /> Conforme</span>
                    : <span className="flex items-center gap-1 text-destructive"><AlertTriangle className="w-3 h-3" /> Alerte</span>}
                </div>

                {p.transmission && (
                  <div className="px-3 pb-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Transmissions internes : </span>{p.transmission}
                  </div>
                )}



                {p.alertes.length > 0 && (
                  <div className="px-3 pb-2 space-y-1">
                    {p.alertes.map((al, i) => (
                      <div key={i} className="text-xs text-destructive bg-destructive/10 rounded px-2 py-1 flex gap-2">
                        <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                        <span>{al}</span>
                      </div>
                    ))}
                  </div>
                )}

                {(p.notes?.length ?? 0) > 0 && (
                  <div className="px-3 pb-2 space-y-1">
                    {p.notes!.map((n, i) => (
                      <div key={i} className="text-xs text-muted-foreground bg-muted rounded px-2 py-1">{n}</div>
                    ))}
                  </div>
                )}

                {isOpen && p.seances.length > 0 && (
                  <div className="overflow-x-auto border-t">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-2">Apprenant</th>
                          <th className="text-left p-2">Début</th>
                          <th className="text-left p-2">Fin</th>
                          <th className="text-left p-2">Semaine</th>
                          <th className="text-left p-2">Date de connexion</th>
                          <th className="text-left p-2">Créneau</th>
                          <th className="text-right p-2">Heures prévues</th>
                          <th className="text-right p-2">Heures réalisées</th>
                          <th className="text-right p-2">Cumul réalisé</th>
                          <th className="text-right p-2">Heures restantes</th>
                          <th className="text-left p-2">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {p.seances.map((s, i) => (
                          <tr key={s.date} className={i % 2 ? "bg-primary/5" : ""}>
                            <td className="p-2">{a.nom}</td>
                            <td className="p-2">{frDate(a.dateDebut)}</td>
                            <td className="p-2">{frDate(a.dateFin)}</td>
                            <td className="p-2">S{s.semaine}</td>
                            <td className="p-2">{s.jour} {s.dateFr}</td>
                            <td className="p-2">{s.creneau}</td>
                            <td className="p-2 text-right">{s.heures} h</td>
                            <td className="p-2 text-right">{s.realisees ? `${s.realisees} h` : "—"}</td>
                            <td className="p-2 text-right">{s.cumulRealise} h</td>
                            <td className="p-2 text-right">{s.restant} h</td>
                            <td className="p-2">{statutBadge(s.statut)}</td>
                          </tr>
                        ))}
                        <tr className="font-semibold border-t">
                          <td className="p-2" colSpan={6}>Total</td>
                          <td className="p-2 text-right">{p.totalPlanifie} h</td>
                          <td className="p-2 text-right">{p.totalRealise} h</td>
                          <td className="p-2 text-right">{p.totalRealise} h</td>
                          <td className="p-2 text-right">{Math.round((p.totalAttendu - p.totalRealise) * 100) / 100} h</td>
                          <td className="p-2" />
                        </tr>
                      </tbody>

                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SuiviVSS;
