import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { ArrowLeft, Building2, Download, FileUp, Loader2, Users, Workflow, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchEntreprise } from "@/lib/bpfAnalyse";
import { formationRealisee, frDate, grouperSessions, lireExportEdof, type EdofCandidat, type EdofExport } from "@/lib/edofAuto/candidats";
import { genererPackRS7650, reponsesDe, type Jure } from "@/lib/edofAuto/rs7650Pdf";

/** Certifications dont les documents du certificateur sont automatisés (dossier « Document d'évaluation »). */
const estRS7650 = (c: EdofCandidat) => c.codeCertif === "RS7650" || (!c.codeCertif && /cils/i.test(c.intitule));

// Jury du PV exemple fourni par le certificateur EYES PERFECT — à confirmer pour chaque session.
const JURY_DEFAUT: Jure[] = [
  { civilite: "Mme", nom: "Shanon Le Trouher", statut: "Jury", qualite: "Co-gérante (certificateur)" },
  { civilite: "Mme", nom: "Jade Cambon", statut: "Jury", qualite: "Membre externe" },
  { civilite: "Mme", nom: "Inès Sedjai", statut: "Jury", qualite: "Membre externe" },
];

const villeDepuisAdresse = (adresse: string) => adresse.match(/\d{5}\s+(.+)$/)?.[1]?.trim() || "";

export default function AutomatisationEDOF() {
  const navigate = useNavigate();
  const [exportEdof, setExportEdof] = useState<EdofExport | null>(null);
  const [nomFichier, setNomFichier] = useState("");
  const [realisesSeulement, setRealisesSeulement] = useState(true);
  const [centre, setCentre] = useState({ nom: "", adresse: "", ville: "" });
  const [jury, setJury] = useState<Jure[]>(JURY_DEFAUT);
  const [recherche, setRecherche] = useState(false);
  const [generation, setGeneration] = useState<{ fait: number; total: number } | null>(null);

  const retenus = useMemo(
    () => (exportEdof?.candidats || []).filter((c) => estRS7650(c) && (!realisesSeulement || formationRealisee(c.statut))),
    [exportEdof, realisesSeulement],
  );
  const sessions = useMemo(() => grouperSessions(retenus), [retenus]);
  const horsModele = (exportEdof?.candidats || []).filter((c) => !estRS7650(c));

  const chercherCentre = async (siret: string) => {
    if (!siret) return;
    setRecherche(true);
    try {
      const e = await fetchEntreprise(siret);
      if (e) setCentre({ nom: e.nom, adresse: e.adresse, ville: villeDepuisAdresse(e.adresse) });
      else toast.warning(`Aucun organisme trouvé pour le SIRET ${siret}`);
    } catch (err: any) {
      toast.error(err.message || "Recherche du centre impossible");
    } finally {
      setRecherche(false);
    }
  };

  const importer = async (file: File) => {
    try {
      const exp = lireExportEdof(await file.arrayBuffer(), file.name);
      if (!exp.candidats.length) { toast.error("Aucun dossier lu dans ce fichier (colonnes NOM / PRENOM introuvables)."); return; }
      setExportEdof(exp);
      setNomFichier(file.name);
      toast.success(`${exp.candidats.length} dossiers lus`);
      if (exp.siret) chercherCentre(exp.siret);
    } catch (err: any) {
      toast.error(`Lecture de l'export impossible : ${err.message || err}`);
    }
  };

  const manquants = [
    !centre.nom && "nom du centre",
    !centre.adresse && "adresse du centre",
    !centre.ville && "ville du jury",
    jury.some((j) => !j.nom) && "les 3 membres du jury",
  ].filter(Boolean) as string[];

  const generer = async () => {
    setGeneration({ fait: 0, total: retenus.length });
    try {
      const fichiers = await genererPackRS7650(sessions, { centre, jury }, undefined, (fait, total) => setGeneration({ fait, total }));
      const zip = new JSZip();
      for (const f of fichiers) zip.file(f.chemin, f.donnees);
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `Automatisation_EDOF_RS7650_${exportEdof?.siret || "export"}_${new Date().toISOString().slice(0, 10)}.zip`);
      toast.success(`${fichiers.length} documents générés pour ${retenus.length} candidat(s)`);
    } catch (err: any) {
      toast.error(`Génération impossible : ${err.message || err}`);
    } finally {
      setGeneration(null);
    }
  };

  const setJure = (i: number, champ: keyof Jure, v: string) => setJury((js) => js.map((j, k) => (k === i ? { ...j, [champ]: v } : j)));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1"><ArrowLeft className="w-4 h-4" /> Accueil</Button>
            <h1 className="font-bold text-lg flex items-center gap-2"><Workflow className="w-5 h-5 text-primary" /> Automatisation EDOF</h1>
          </div>
          {retenus.length > 0 && (
            <Button size="sm" onClick={generer} disabled={!!generation || manquants.length > 0} className="gap-1 bg-gradient-hero border-0 text-primary-foreground">
              {generation ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {generation ? `${generation.fait}/${generation.total} candidats…` : `Générer les documents (${retenus.length})`}
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-lg">1. Export EDOF</h2>
            <p className="text-sm text-muted-foreground">
              Déposez l'export « Tous les dossiers » de Mon Compte Formation (CSV ou XLSX). Pour chaque stagiaire RS7650
              (extension et rehaussement de cils, EYES PERFECT), les documents d'évaluation du certificateur sont remplis
              avec des réponses propres à chaque candidat : questionnaire de positionnement, attestation sur l'honneur,
              évaluation théorique FS063, grille pratique FS055, et un PV par session d'examen.
            </p>
          </div>
          <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-muted/40 transition">
            <FileUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">{nomFichier || "Choisir l'export EDOF (.csv, .xlsx)"}</span>
            <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={(e) => e.target.files?.[0] && importer(e.target.files[0])} />
          </label>
          {exportEdof && (
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Badge variant="secondary">{exportEdof.candidats.length} dossiers</Badge>
              {exportEdof.siret && <Badge variant="outline">SIRET {exportEdof.siret}</Badge>}
              <label className="flex items-center gap-2">
                <Checkbox checked={realisesSeulement} onCheckedChange={(v) => setRealisesSeulement(!!v)} />
                Seulement les formations réalisées (service fait, sortie, en formation)
              </label>
            </div>
          )}
          {horsModele.length > 0 && (
            <p className="text-xs text-amber-700 flex gap-1"><Info className="w-4 h-4 shrink-0" />
              {horsModele.length} dossier(s) sur une autre certification ({[...new Set(horsModele.map((c) => c.codeCertif || c.intitule))].slice(0, 4).join(", ")}) : pas encore de modèle, ignorés.
            </p>
          )}
        </section>

        <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
          <h2 className="font-semibold text-lg flex items-center gap-2"><Building2 className="w-5 h-5" /> 2. Centre de formation et jury</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="space-y-1"><Label>Centre de formation</Label><Input value={centre.nom} onChange={(e) => setCentre({ ...centre, nom: e.target.value })} /></div>
            <div className="space-y-1"><Label>Adresse</Label><Input value={centre.adresse} onChange={(e) => setCentre({ ...centre, adresse: e.target.value })} /></div>
            <div className="space-y-1"><Label>Ville du jury / « Fait à »</Label><Input value={centre.ville} onChange={(e) => setCentre({ ...centre, ville: e.target.value })} /></div>
          </div>
          {exportEdof?.siret && (
            <Button variant="outline" size="sm" onClick={() => chercherCentre(exportEdof.siret)} disabled={recherche} className="gap-1">
              {recherche && <Loader2 className="w-4 h-4 animate-spin" />} Reprendre depuis le SIRET {exportEdof.siret}
            </Button>
          )}
          <div className="space-y-2">
            <p className="text-sm font-medium">Jury (3 membres, le premier préside) — repris du PV exemple du certificateur, à confirmer pour chaque session</p>
            {jury.map((j, i) => (
              <div key={i} className="grid grid-cols-[80px_1fr_1fr_1fr] gap-2">
                <Input value={j.civilite} onChange={(e) => setJure(i, "civilite", e.target.value)} />
                <Input value={j.nom} placeholder="Nom et prénom" onChange={(e) => setJure(i, "nom", e.target.value)} />
                <Input value={j.statut} placeholder="Statut" onChange={(e) => setJure(i, "statut", e.target.value)} />
                <Input value={j.qualite} placeholder="Qualité" onChange={(e) => setJure(i, "qualite", e.target.value)} />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Les signatures ne sont jamais apposées : le règlement d'évaluation impose la signature manuscrite du candidat et des 3 jurés.
          </p>
          {manquants.length > 0 && retenus.length > 0 && <p className="text-xs text-destructive">À compléter avant génération : {manquants.join(", ")}.</p>}
        </section>

        {sessions.length > 0 && (
          <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Users className="w-5 h-5" /> 3. Sessions d'examen ({sessions.length})</h2>
            {sessions.map((s) => (
              <div key={s.cle} className="border rounded-xl overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 text-sm font-medium">
                  Examen du {frDate(s.dateExamen)} — {s.candidats.length} candidat(s) — PV général sur {Math.ceil(s.candidats.length / 5)} page(s)
                </div>
                <table className="w-full text-xs">
                  <thead><tr className="text-left text-muted-foreground"><th className="p-2">Candidat</th><th className="p-2">Formation</th><th className="p-2">Statut EDOF</th><th className="p-2">Théorie</th><th className="p-2">Pratique</th><th className="p-2">Résultat</th></tr></thead>
                  <tbody>
                    {s.candidats.map((c) => {
                      const r = reponsesDe(c);
                      return (
                        <tr key={c.numeroDossier + c.nom} className="border-t">
                          <td className="p-2">{c.civilite} {c.nom} {c.prenom}</td>
                          <td className="p-2">{frDate(c.dateDebut)} → {frDate(c.dateFin)}</td>
                          <td className="p-2">{c.statut}</td>
                          <td className="p-2">{r.noteTheo}/37</td>
                          <td className="p-2">{r.noteMiseEnSituation}/6</td>
                          <td className="p-2">{r.admis ? <Badge className="bg-emerald-600">Acquis</Badge> : <Badge variant="destructive">Non acquis</Badge>}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
