import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { ArrowLeft, Building2, Download, FileUp, Loader2, Users, Workflow, Info, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchEntreprise } from "@/lib/bpfAnalyse";
import type { FicheFC } from "@/lib/franceCompetences";
import { formationRealisee, frDate, grouperSessions, lireExportEdof, type EdofExport } from "@/lib/edofAuto/candidats";
import { reponsesDe, type Jure } from "@/lib/edofAuto/rs7650Pdf";
import { construireSujet, genererReponsesGeneriques, type SujetCertification } from "@/lib/edofAuto/generique";
import { chargerFiches, estCodeCertification, genererPack, generable, MODELES_OFFICIELS } from "@/lib/edofAuto/pack";

// Jury du PV exemple fourni par le certificateur EYES PERFECT — à confirmer pour chaque session.
const JURY_RS7650: Jure[] = [
  { civilite: "Mme", nom: "Shanon Le Trouher", statut: "Jury", qualite: "Co-gérante (certificateur)" },
  { civilite: "Mme", nom: "Jade Cambon", statut: "Jury", qualite: "Membre externe" },
  { civilite: "Mme", nom: "Inès Sedjai", statut: "Jury", qualite: "Membre externe" },
];
const juryVide = (): Jure[] => [
  { civilite: "Mme", nom: "", statut: "Jury", qualite: "Représentant du certificateur" },
  { civilite: "Mme", nom: "", statut: "Jury", qualite: "Professionnel externe" },
  { civilite: "M.", nom: "", statut: "Jury", qualite: "Professionnel externe" },
];

const villeDepuisAdresse = (adresse: string) => adresse.match(/\d{5}\s+(.+)$/)?.[1]?.trim() || "";

export default function AutomatisationEDOF() {
  const navigate = useNavigate();
  const [exportEdof, setExportEdof] = useState<EdofExport | null>(null);
  const [nomFichier, setNomFichier] = useState("");
  const [fiches, setFiches] = useState<Record<string, FicheFC | null>>({});
  const [chargement, setChargement] = useState(false);
  const [realisesSeulement, setRealisesSeulement] = useState(true);
  const [centre, setCentre] = useState({ nom: "", adresse: "", ville: "" });
  const [jurys, setJurys] = useState<Record<string, Jure[]>>({});
  const [recherche, setRecherche] = useState(false);
  const [generation, setGeneration] = useState<{ fait: number; total: number } | null>(null);

  const candidats = useMemo(
    () => (exportEdof?.candidats || []).filter((c) => !realisesSeulement || formationRealisee(c.statut)),
    [exportEdof, realisesSeulement],
  );
  const certifs = useMemo(() => {
    const m = new Map<string, { code: string; intitule: string; nb: number }>();
    for (const c of candidats) {
      const code = c.codeCertif || "(sans code)";
      if (!m.has(code)) m.set(code, { code, intitule: c.intitule, nb: 0 });
      m.get(code)!.nb++;
    }
    return [...m.values()].sort((a, b) => b.nb - a.nb);
  }, [candidats]);
  const codesGenerables = certifs.map((c) => c.code).filter((code) => generable(code, fiches));
  const sessions = useMemo(() => grouperSessions(candidats.filter((c) => codesGenerables.includes(c.codeCertif))), [candidats, codesGenerables.join("|")]);
  const nbRetenus = sessions.reduce((n, s) => n + s.candidats.length, 0);
  const sujets = useMemo(() => {
    const out: Record<string, SujetCertification> = {};
    for (const code of codesGenerables) if (code !== "RS7650" && fiches[code]) out[code] = construireSujet(fiches[code]!);
    return out;
  }, [codesGenerables.join("|"), fiches]);

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
      setChargement(true);
      const codes = [...new Set(exp.candidats.map((c) => c.codeCertif).filter(Boolean))];
      setFiches(await chargerFiches(codes));
      setJurys((j) => Object.fromEntries(codes.map((code) => [code, j[code] || (code === "RS7650" ? JURY_RS7650 : juryVide())])));
    } catch (err: any) {
      toast.error(`Lecture de l'export impossible : ${err.message || err}`);
    } finally {
      setChargement(false);
    }
  };

  const manquants = [
    !centre.nom && "nom du centre",
    !centre.adresse && "adresse du centre",
    !centre.ville && "ville du jury",
    ...codesGenerables.filter((code) => (jurys[code] || []).some((j) => !j.nom)).map((code) => `les 3 jurés ${code}`),
  ].filter(Boolean) as string[];

  const generer = async () => {
    setGeneration({ fait: 0, total: nbRetenus });
    try {
      const contextes = Object.fromEntries(codesGenerables.map((code) => [code, { centre, jury: jurys[code] }]));
      const fichiers = await genererPack(sessions, contextes, fiches, undefined, (fait, total) => setGeneration({ fait, total }));
      const zip = new JSZip();
      for (const f of fichiers) zip.file(f.chemin, f.donnees);
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `Automatisation_EDOF_${exportEdof?.siret || "export"}_${new Date().toISOString().slice(0, 10)}.zip`);
      toast.success(`${fichiers.length} documents générés pour ${nbRetenus} candidat(s)`);
    } catch (err: any) {
      toast.error(`Génération impossible : ${err.message || err}`);
    } finally {
      setGeneration(null);
    }
  };

  const setJure = (code: string, i: number, champ: keyof Jure, v: string) =>
    setJurys((js) => ({ ...js, [code]: js[code].map((j, k) => (k === i ? { ...j, [champ]: v } : j)) }));

  const statutCertif = (code: string) => {
    if (MODELES_OFFICIELS[code]) return { ok: true, label: "Modèle officiel du certificateur" };
    if (!estCodeCertification(code)) return { ok: false, label: "Pas une certification RS / RNCP (ex. accompagnement VAE) : ignoré" };
    if (fiches[code]) return { ok: true, label: `Généré depuis la fiche France Compétences (${fiches[code]!.cert.join(", ") || "certificateur"})` };
    return { ok: false, label: chargement ? "Recherche de la fiche…" : "Fiche absente de France Compétences (certification échue ou inconnue) : ignoré" };
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1"><ArrowLeft className="w-4 h-4" /> Accueil</Button>
            <h1 className="font-bold text-lg flex items-center gap-2"><Workflow className="w-5 h-5 text-primary" /> Automatisation EDOF</h1>
          </div>
          {nbRetenus > 0 && (
            <Button size="sm" onClick={generer} disabled={!!generation || manquants.length > 0} className="gap-1 bg-gradient-hero border-0 text-primary-foreground">
              {generation ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {generation ? `${generation.fait}/${generation.total} candidats…` : `Générer les documents (${nbRetenus})`}
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-lg">1. Export EDOF</h2>
            <p className="text-sm text-muted-foreground">
              Déposez l'export « Tous les dossiers » de Mon Compte Formation (CSV ou XLSX). Pour chaque stagiaire, quelle que soit
              la certification (RS ou RNCP), 4 documents sont produits — questionnaire de positionnement, attestation sur l'honneur,
              évaluation des connaissances, grille d'évaluation des compétences — plus un PV par session d'examen, avec des réponses
              propres à chaque candidat. Quand le certificateur a fourni ses documents (RS7650 EYES PERFECT), ce sont eux qui sont remplis ;
              sinon les documents sont construits sur la fiche officielle France Compétences.
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
              {chargement && <span className="flex items-center gap-1 text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> Lecture des fiches France Compétences…</span>}
            </div>
          )}
        </section>

        {certifs.length > 0 && (
          <section className="bg-card rounded-2xl border shadow-card p-6 space-y-3">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Award className="w-5 h-5" /> 2. Certifications de l'export</h2>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-muted-foreground"><th className="p-2">Code</th><th className="p-2">Intitulé</th><th className="p-2">Dossiers</th><th className="p-2">Documents</th></tr></thead>
              <tbody>
                {certifs.map((c) => {
                  const st = statutCertif(c.code);
                  return (
                    <tr key={c.code} className="border-t">
                      <td className="p-2 font-medium">{c.code}</td>
                      <td className="p-2">{c.intitule}</td>
                      <td className="p-2">{c.nb}</td>
                      <td className={`p-2 text-xs ${st.ok ? "text-emerald-700" : "text-amber-700"}`}>{st.label}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        {exportEdof && (
          <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Building2 className="w-5 h-5" /> 3. Centre de formation et jurys</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="space-y-1"><Label>Centre de formation</Label><Input value={centre.nom} onChange={(e) => setCentre({ ...centre, nom: e.target.value })} /></div>
              <div className="space-y-1"><Label>Adresse</Label><Input value={centre.adresse} onChange={(e) => setCentre({ ...centre, adresse: e.target.value })} /></div>
              <div className="space-y-1"><Label>Ville du jury / « Fait à »</Label><Input value={centre.ville} onChange={(e) => setCentre({ ...centre, ville: e.target.value })} /></div>
            </div>
            {exportEdof.siret && (
              <Button variant="outline" size="sm" onClick={() => chercherCentre(exportEdof.siret)} disabled={recherche} className="gap-1">
                {recherche && <Loader2 className="w-4 h-4 animate-spin" />} Reprendre depuis le SIRET {exportEdof.siret}
              </Button>
            )}
            {codesGenerables.map((code) => (
              <div key={code} className="space-y-2 border rounded-xl p-3">
                <p className="text-sm font-medium">
                  Jury {code} (3 membres, le premier préside)
                  {code === "RS7650" && <span className="text-muted-foreground font-normal"> — repris du PV exemple du certificateur, à confirmer</span>}
                </p>
                {(jurys[code] || []).map((j, i) => (
                  <div key={i} className="grid grid-cols-[80px_1fr_1fr_1fr] gap-2">
                    <Input value={j.civilite} onChange={(e) => setJure(code, i, "civilite", e.target.value)} />
                    <Input value={j.nom} placeholder="Nom et prénom" onChange={(e) => setJure(code, i, "nom", e.target.value)} />
                    <Input value={j.statut} placeholder="Statut" onChange={(e) => setJure(code, i, "statut", e.target.value)} />
                    <Input value={j.qualite} placeholder="Qualité" onChange={(e) => setJure(code, i, "qualite", e.target.value)} />
                  </div>
                ))}
              </div>
            ))}
            <p className="text-xs text-muted-foreground flex gap-1"><Info className="w-4 h-4 shrink-0" />
              Les signatures ne sont jamais apposées : candidats et jurés signent à la main.
            </p>
            {manquants.length > 0 && nbRetenus > 0 && <p className="text-sm text-destructive">À compléter avant génération : {manquants.join(", ")}.</p>}
          </section>
        )}

        {sessions.length > 0 && (
          <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Users className="w-5 h-5" /> 4. Sessions d'examen ({sessions.length})</h2>
            {sessions.map((s) => (
              <div key={s.cle} className="border rounded-xl overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 text-sm font-medium">
                  {s.codeCertif} — examen du {frDate(s.dateExamen)} — {s.candidats.length} candidat(s)
                </div>
                <table className="w-full text-xs">
                  <thead><tr className="text-left text-muted-foreground"><th className="p-2">Candidat</th><th className="p-2">Formation</th><th className="p-2">Statut EDOF</th><th className="p-2">Théorie</th><th className="p-2">Compétences</th><th className="p-2">Résultat</th></tr></thead>
                  <tbody>
                    {s.candidats.map((c) => {
                      let theo = "", comp = "", admis = false;
                      if (s.codeCertif === "RS7650") {
                        const r = reponsesDe(c);
                        theo = `${r.noteTheo}/37`; comp = `${r.noteMiseEnSituation}/6`; admis = r.admis;
                      } else if (sujets[s.codeCertif]) {
                        const sj = sujets[s.codeCertif];
                        const r = genererReponsesGeneriques(sj, c);
                        theo = `${r.noteTheo}/${sj.noteMax}`; comp = `${r.competencesValidees.filter(Boolean).length}/${sj.competences.length}`; admis = r.admis;
                      }
                      return (
                        <tr key={c.numeroDossier + c.nom} className="border-t">
                          <td className="p-2">{c.civilite} {c.nom} {c.prenom}</td>
                          <td className="p-2">{frDate(c.dateDebut)} → {frDate(c.dateFin)}</td>
                          <td className="p-2">{c.statut}</td>
                          <td className="p-2">{theo}</td>
                          <td className="p-2">{comp}</td>
                          <td className="p-2">{admis ? <Badge className="bg-emerald-600">Acquis</Badge> : <Badge variant="destructive">Non acquis</Badge>}</td>
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
