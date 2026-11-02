import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Building2, Download, FileUp, Loader2, Users, Workflow, Info, Award, Stamp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchEntreprise } from "@/lib/bpfAnalyse";
import { cleFormation, formationRealisee, frDate, grouperSessions, lireExportEdof, type EdofExport } from "@/lib/edofAuto/candidats";
import { reponsesDe, type Jure } from "@/lib/edofAuto/rs7650Pdf";
import { construireSujet, genererReponsesGeneriques, type SujetCertification } from "@/lib/edofAuto/generique";
import { estOfficiel, genererPack, resoudreReferentiels, type Referentiel } from "@/lib/edofAuto/pack";
import { cleCandidat, dataUrlEnOctets } from "@/lib/edofAuto/signatures";
import SignatureChamp, { lireImage } from "@/components/SignatureChamp";
import ResultatsEdof, { type ResultatEdof } from "@/components/edof/ResultatsEdof";
import HistoriqueEdof from "@/components/edof/HistoriqueEdof";
import { useAuth } from "@/hooks/useAuth";
import { ajouterEnvois, chargerFichiers, enregistrer, type Automatisation, type EnvoiMail } from "@/lib/edofAuto/historique";

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

const sansAccents = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

const villeDepuisAdresse = (adresse: string) => adresse.match(/\d{5}\s+(.+)$/)?.[1]?.trim() || "";

export default function AutomatisationEDOF() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [exportEdof, setExportEdof] = useState<EdofExport | null>(null);
  const [nomFichier, setNomFichier] = useState("");
  const [referentiels, setReferentiels] = useState<Record<string, Referentiel>>({});
  const [chargement, setChargement] = useState(false);
  const [realisesSeulement, setRealisesSeulement] = useState(true);
  const [centre, setCentre] = useState({ nom: "", adresse: "", ville: "" });
  const [jurys, setJurys] = useState<Record<string, Jure[]>>({});
  const [recherche, setRecherche] = useState(false);
  const [generation, setGeneration] = useState<{ fait: number; total: number } | null>(null);
  const [tampon, setTampon] = useState<string>();
  const [signatureCentre, setSignatureCentre] = useState<string>();
  const [sigJurys, setSigJurys] = useState<Record<string, (string | undefined)[]>>({});
  const [sigCandidats, setSigCandidats] = useState<Record<string, string | undefined>>({});
  const [resultat, setResultat] = useState<ResultatEdof | null>(null);
  const [rafraichirHist, setRafraichirHist] = useState(0);

  const candidats = useMemo(
    () => (exportEdof?.candidats || []).filter((c) => !realisesSeulement || formationRealisee(c.statut)),
    [exportEdof, realisesSeulement],
  );
  const certifs = useMemo(() => {
    const m = new Map<string, { code: string; intitule: string; nb: number }>();
    for (const c of candidats) {
      const code = cleFormation(c);
      if (!m.has(code)) m.set(code, { code, intitule: c.intitule, nb: 0 });
      m.get(code)!.nb++;
    }
    return [...m.values()].sort((a, b) => b.nb - a.nb);
  }, [candidats]);
  const codesGenerables = certifs.map((c) => c.code).filter((code) => !!referentiels[code]);
  const sessions = useMemo(() => grouperSessions(candidats.filter((c) => codesGenerables.includes(cleFormation(c)))), [candidats, codesGenerables.join("|")]);
  const nbRetenus = sessions.reduce((n, s) => n + s.candidats.length, 0);
  const sujets = useMemo(() => {
    const out: Record<string, SujetCertification> = {};
    for (const code of codesGenerables) {
      const ref = referentiels[code];
      if (ref && !estOfficiel(ref)) out[code] = construireSujet(ref);
    }
    return out;
  }, [codesGenerables.join("|"), referentiels]);

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
      const refs = await resoudreReferentiels(exp.candidats);
      setReferentiels(refs);
      setJurys((j) => Object.fromEntries(Object.keys(refs).map((code) => [code, j[code] || (code === "RS7650" ? JURY_RS7650 : juryVide())])));
    } catch (err: any) {
      toast.error(`Lecture de l'export impossible : ${err.message || err}`);
    } finally {
      setChargement(false);
    }
  };

  /** Import groupé : chaque image est rattachée au stagiaire dont le n° de dossier, ou le nom ET le prénom, figurent dans le nom du fichier. */
  const importerSignaturesStagiaires = async (files: FileList) => {
    let n = 0;
    const ajouts: Record<string, string> = {};
    for (const f of Array.from(files)) {
      const nomF = sansAccents(f.name);
      const c = candidats.find((x) => (x.numeroDossier && nomF.includes(x.numeroDossier)) || (nomF.includes(sansAccents(x.nom)) && nomF.includes(sansAccents(x.prenom))));
      if (c) { ajouts[cleCandidat(c)] = await lireImage(f); n++; }
    }
    setSigCandidats((s) => ({ ...s, ...ajouts }));
    toast[n ? "success" : "warning"](`${n} signature(s) rattachée(s) sur ${files.length} image(s)`);
  };

  const octets = (v?: string) => (v ? dataUrlEnOctets(v) : undefined);

  const manquants = [
    !centre.nom && "nom du centre",
    !centre.adresse && "adresse du centre",
    !centre.ville && "ville du jury",
    ...codesGenerables.filter((code) => (jurys[code] || []).some((j) => !j.nom)).map((code) => `les 3 jurés ${code}`),
  ].filter(Boolean) as string[];

  const generer = async () => {
    setGeneration({ fait: 0, total: nbRetenus });
    try {
      const candidatsSig: Record<string, Uint8Array> = {};
      for (const [k, v] of Object.entries(sigCandidats)) if (v) candidatsSig[k] = dataUrlEnOctets(v);
      const contextes = Object.fromEntries(codesGenerables.map((code) => [code, {
        centre,
        jury: jurys[code],
        signatures: {
          tamponCentre: octets(tampon),
          signatureCentre: tampon ? undefined : octets(signatureCentre), // tampon seul s'il existe
          jurys: (sigJurys[code] || []).map(octets),
          candidats: candidatsSig,
        },
      }]));
      const fichiers = await genererPack(sessions, contextes, referentiels, undefined, (fait, total) => setGeneration({ fait, total }));
      const formations = Object.fromEntries(certifs.map((c) => [c.code, c.intitule]));
      const generes = sessions.flatMap((s) => s.candidats);
      const nomZip = `Automatisation_EDOF_${exportEdof?.siret || "export"}_${new Date().toISOString().slice(0, 10)}.zip`;
      const r: ResultatEdof = {
        fichiers, candidats: generes, formations, centreNom: centre.nom, nomZip, envois: [],
        meta: {
          name: nomFichier || "Export EDOF", export_name: nomFichier, siret: exportEdof?.siret || "", centre,
          jurys: Object.fromEntries(codesGenerables.map((code) => [code, jurys[code]])),
          resume: { formations: certifs.filter((c) => codesGenerables.includes(c.code)), candidats: generes },
        },
      };
      setResultat(r);
      toast.success(`${fichiers.length} documents générés pour ${nbRetenus} candidat(s)`);
      setTimeout(() => document.getElementById("resultats-edof")?.scrollIntoView({ behavior: "smooth" }), 100);
      if (user) await enregistrerHistorique(r);
    } catch (err: any) {
      toast.error(`Génération impossible : ${err.message || err}`);
    } finally {
      setGeneration(null);
    }
  };

  /** Enregistre un résultat dans l'historique (automatique après génération si connecté, ou via le bouton). */
  const enregistrerHistorique = async (r: ResultatEdof) => {
    if (!user) { toast.error("Connectez-vous pour enregistrer dans l'historique."); return; }
    try {
      const a = await enregistrer(user.id, r.meta, r.fichiers);
      if (r.envois.length) await ajouterEnvois(a.id, r.envois);
      setResultat((cur) => (cur && cur.fichiers === r.fichiers ? { ...cur, histId: a.id } : cur));
      setRafraichirHist((n) => n + 1);
      toast.success("Enregistré dans l'historique");
    } catch (e: any) {
      toast.error(`Historique non enregistré : ${e.message}`);
    }
  };

  const majEnvois = async (envois: EnvoiMail[]) => {
    setResultat((r) => (r ? { ...r, envois } : r));
    if (resultat?.histId) {
      try { await ajouterEnvois(resultat.histId, envois); setRafraichirHist((n) => n + 1); } catch (e: any) { toast.error(`Envois non enregistrés : ${e.message}`); }
    }
  };

  const ouvrirHistorique = async (a: Automatisation) => {
    const fichiers = await chargerFichiers(a);
    setResultat({
      fichiers,
      candidats: (a.resume?.candidats || []) as ResultatEdof["candidats"],
      formations: Object.fromEntries((a.resume?.formations || []).map((f) => [f.code, f.intitule])),
      centreNom: a.centre?.nom || "",
      nomZip: `${a.name.replace(/\.(csv|xlsx?)$/i, "")}.zip`,
      histId: a.id,
      envois: a.envois || [],
      meta: { name: a.name, export_name: a.export_name, siret: a.siret, centre: a.centre, jurys: a.jurys, resume: a.resume },
    });
    setTimeout(() => document.getElementById("resultats-edof")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const setJure = (code: string, i: number, champ: keyof Jure, v: string) =>
    setJurys((js) => ({ ...js, [code]: js[code].map((j, k) => (k === i ? { ...j, [champ]: v } : j)) }));

  const statutCertif = (code: string) => {
    const ref = referentiels[code];
    if (!ref) return { ok: false, label: chargement ? "Recherche du référentiel…" : "—" };
    if (estOfficiel(ref)) return { ok: true, label: `Modèle officiel : ${ref.origine}` };
    return { ok: true, label: `Généré sur le ${ref.origine}` };
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
              la formation, 4 documents sont produits — questionnaire de positionnement, attestation sur l'honneur,
              évaluation des connaissances, grille d'évaluation des compétences — plus un PV par session d'examen, avec des réponses
              propres à chaque candidat. Quand le certificateur a fourni ses documents (RS7650 EYES PERFECT), ce sont eux qui sont remplis ;
              sinon les documents sont construits sur la fiche officielle France Compétences, ou à défaut sur l'intitulé de la formation.
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
              <thead><tr className="text-left text-muted-foreground"><th className="p-2">Formation</th><th className="p-2">Intitulé</th><th className="p-2">Dossiers</th><th className="p-2">Documents</th></tr></thead>
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
                  <div key={i} className="grid grid-cols-[70px_1fr_0.7fr_1fr_auto] gap-2 items-center">
                    <Input value={j.civilite} onChange={(e) => setJure(code, i, "civilite", e.target.value)} />
                    <Input value={j.nom} placeholder="Nom et prénom" onChange={(e) => setJure(code, i, "nom", e.target.value)} />
                    <Input value={j.statut} placeholder="Statut" onChange={(e) => setJure(code, i, "statut", e.target.value)} />
                    <Input value={j.qualite} placeholder="Qualité" onChange={(e) => setJure(code, i, "qualite", e.target.value)} />
                    <SignatureChamp compact libelle={`Signature de ${j.nom || `juré ${i + 1}`}`} valeur={sigJurys[code]?.[i]}
                      onChange={(v) => setSigJurys((s) => { const l = [...(s[code] || [])]; l[i] = v; return { ...s, [code]: l }; })} />
                  </div>
                ))}
              </div>
            ))}
            <div className="border rounded-xl p-3 space-y-3">
              <p className="text-sm font-medium flex items-center gap-2"><Stamp className="w-4 h-4" /> Représentant du centre habilité</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1"><Label>Tampon du centre</Label><SignatureChamp libelle="Tampon du centre" valeur={tampon} onChange={setTampon} /></div>
                <div className="space-y-1">
                  <Label>Signature du représentant {tampon && <span className="text-muted-foreground font-normal">(non utilisée : tampon seul)</span>}</Label>
                  <SignatureChamp libelle="Signature du représentant du centre" valeur={signatureCentre} onChange={setSignatureCentre} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Pas de tampon ? Créez-le avec le <a className="underline" href="/generateur-tampon" target="_blank" rel="noreferrer">Générateur Tampon</a> puis importez l'image.</p>
            </div>
            <p className="text-xs text-muted-foreground flex gap-1"><Info className="w-4 h-4 shrink-0" />
              Seules les signatures et le tampon fournis ici sont posés dans les documents ; sans image, le cadre reste vide.
            </p>
            {manquants.length > 0 && nbRetenus > 0 && <p className="text-sm text-destructive">À compléter avant génération : {manquants.join(", ")}.</p>}
          </section>
        )}

        {sessions.length > 0 && (
          <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold text-lg flex items-center gap-2"><Users className="w-5 h-5" /> 4. Sessions d'examen ({sessions.length})</h2>
              <label className="text-sm border rounded-md px-3 py-1.5 cursor-pointer hover:bg-muted/40">
                Importer les signatures des stagiaires ({Object.values(sigCandidats).filter(Boolean).length}/{nbRetenus})
                <input type="file" multiple accept="image/png,image/jpeg" className="hidden" onChange={(e) => { if (e.target.files?.length) importerSignaturesStagiaires(e.target.files); e.target.value = ""; }} />
              </label>
            </div>
            <p className="text-xs text-muted-foreground">Import groupé : une image par stagiaire, nommée avec son n° de dossier CPF ou NOM_Prénom (ex. DUPONT_Marie.png). Ou signez directement dans la colonne Signature.</p>
            {sessions.map((s) => (
              <div key={s.cle} className="border rounded-xl overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 text-sm font-medium">
                  {s.codeCertif} — examen du {frDate(s.dateExamen)} — {s.candidats.length} candidat(s)
                </div>
                <table className="w-full text-xs">
                  <thead><tr className="text-left text-muted-foreground"><th className="p-2">Candidat</th><th className="p-2">Formation</th><th className="p-2">Statut EDOF</th><th className="p-2">Théorie</th><th className="p-2">Compétences</th><th className="p-2">Résultat</th><th className="p-2">Signature</th></tr></thead>
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
                          <td className="p-2"><SignatureChamp compact libelle={`Signature de ${c.prenom} ${c.nom}`} valeur={sigCandidats[cleCandidat(c)]} onChange={(v) => setSigCandidats((s) => ({ ...s, [cleCandidat(c)]: v }))} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </section>
        )}
        {resultat && (
          <div id="resultats-edof">
            <ResultatsEdof resultat={resultat} connecte={!!user} onEnvois={majEnvois} onEnregistrer={() => enregistrerHistorique(resultat)} />
          </div>
        )}

        <HistoriqueEdof connecte={!!user} rafraichir={rafraichirHist} onOuvrir={ouvrirHistorique} />
      </main>
    </div>
  );
}
