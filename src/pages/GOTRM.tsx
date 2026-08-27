import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Download,
  FileDown,
  Plus,
  Trash2,
  Truck,
  Upload,
  Users,
} from "lucide-react";
import { GOTRM_CCP, GOTRM_PARCOURS, GOTRM_TITRE, type GotrmParcours } from "@/data/gotrm";
import {
  buildConvocation,
  buildEmargement,
  buildFicheCandidat,
  buildGrilleEvaluation,
  buildLivretCertification,
  buildProcesVerbal,
  buildSyntheseSession,
  mspConflit,
} from "@/lib/gotrm/gotrmDocs";
import {
  buildGotrmIdentifiant,
  gotrmCandidatNomComplet,
  type GotrmCandidat,
  type GotrmSession,
} from "@/lib/gotrm/gotrmTypes";
import { buildGenericFileName } from "@/lib/fileNaming";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { useBackgroundJobs } from "@/lib/backgroundJobs";
import type { OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", relationEntreprises: "", referentMobilite: "",
  domainesFormation: "", typesActions: [], certifications: "", outilsUtilises: "",
  version: "1", dateMaj: new Date().toISOString().slice(0, 10),
};

function readSession<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function newCandidat(index: number, dateRef: string): GotrmCandidat {
  return {
    id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`,
    civilite: "M.",
    nom: "",
    prenom: "",
    dateNaissance: "",
    identifiant: buildGotrmIdentifiant(dateRef, index),
    dossierComplet: true,
    motifIncomplet: "",
    parcours: "Formation continue",
    ccpVises: GOTRM_CCP.map((c) => c.code),
    ordrePassage: index + 1,
    msp1Date: "",
    msp1Horaire: "09h00 – 14h00",
    msp2Date: "",
    msp2Horaire: "09h00 – 14h00",
    ccpObtenus: [],
  };
}

/** Parse CSV simple : civilite;nom;prenom;dateNaissance (ou séparateur , / tabulation) */
function parseCandidatsCsv(text: string, dateRef: string, offset: number): GotrmCandidat[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^civilit/i.test(l))
    .map((line, i) => {
      const cols = line.split(/[;,\t]/).map((c) => c.trim());
      const base = newCandidat(offset + i, dateRef);
      if (cols.length >= 3) {
        base.civilite = cols[0] || base.civilite;
        base.nom = cols[1] || "";
        base.prenom = cols[2] || "";
        base.dateNaissance = cols[3] || "";
      } else {
        base.nom = cols[0] || "";
        base.prenom = cols[1] || "";
      }
      return base;
    })
    .filter((c) => c.nom || c.prenom);
}

const GOTRMPage = () => {
  const navigate = useNavigate();
  const { runJob } = useBackgroundJobs();

  const [organisme] = useState<OrganismeInfo>(() => readSession("qualiopi_org", emptyOrganisme));
  const [intitule, setIntitule] = useState("Session GOTRM");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [lieu, setLieu] = useState(organisme.ville ? `${organisme.nom} — ${organisme.ville}` : "");
  const [jury, setJury] = useState([{ nom: "", qualite: "Président du jury" }]);
  const [surveillants, setSurveillants] = useState<string[]>([""]);
  const [candidats, setCandidats] = useState<GotrmCandidat[]>([]);

  const session: GotrmSession = useMemo(
    () => ({ intitule, dateDebut, dateFin, lieu, jury, surveillants, organisme, candidats }),
    [intitule, dateDebut, dateFin, lieu, jury, surveillants, organisme, candidats],
  );

  const conflits = candidats.filter(mspConflit);

  const patch = (id: string, changes: Partial<GotrmCandidat>) =>
    setCandidats((prev) => prev.map((c) => (c.id === id ? { ...c, ...changes } : c)));

  const addCandidat = () =>
    setCandidats((prev) => [...prev, newCandidat(prev.length, dateDebut)]);

  const importStagiaires = () => {
    const stagiaires = readSession<StagiaireInfo[]>("qualiopi_stag", []);
    if (!stagiaires.length) {
      toast.error("Aucun stagiaire enregistré dans l'application.");
      return;
    }
    setCandidats((prev) => [
      ...prev,
      ...stagiaires.map((s, i) => {
        const c = newCandidat(prev.length + i, dateDebut);
        c.civilite = s.civilite || c.civilite;
        c.nom = s.nom || "";
        c.prenom = s.prenom || "";
        c.dateNaissance = (s as { dateNaissance?: string }).dateNaissance || "";
        return c;
      }),
    ]);
    toast.success(`${stagiaires.length} candidat(s) importé(s).`);
  };

  const importCsv = async (file: File) => {
    const text = await file.text();
    const rows = parseCandidatsCsv(text, dateDebut, candidats.length);
    if (!rows.length) {
      toast.error("Aucun candidat détecté dans le fichier.");
      return;
    }
    setCandidats((prev) => [...prev, ...rows]);
    toast.success(`${rows.length} candidat(s) importé(s).`);
  };

  const fileName = (label: string) =>
    buildGenericFileName(`GOTRM ${label}`, organisme.nom, organisme.version, organisme.dateMaj, ".pdf");

  const downloadDoc = (label: string, html: string) => {
    runJob({
      label: `GOTRM — ${label}`,
      fileName: fileName(label),
      run: async (r) => {
        r.report(30, "Génération du document…");
        const blob = await htmlToPdfBlob(html);
        r.report(100, "Terminé");
        return blob;
      },
    });
  };

  const requireCandidats = () => {
    if (!candidats.length) {
      toast.error("Ajoutez au moins un candidat.");
      return false;
    }
    return true;
  };

  const exportPack = () => {
    if (!requireCandidats()) return;
    const snapshot: GotrmSession = JSON.parse(JSON.stringify(session));
    runJob({
      label: "GOTRM — Pack complet",
      fileName: buildGenericFileName("GOTRM PACK SESSION", organisme.nom, organisme.version, organisme.dateMaj, ".zip"),
      run: async (r) => {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();
        const total = snapshot.candidats.length * 3 + 4;
        let done = 0;
        const step = (msg: string) => {
          done += 1;
          r.report(Math.round((done / total) * 100), msg);
        };

        for (const c of snapshot.candidats) {
          const folder = zip.folder(
            `${String(c.ordrePassage).padStart(2, "0")}_${gotrmCandidatNomComplet(c).replace(/[^\p{L}\d]+/gu, "_")}`,
          )!;
          folder.file(
            fileName(`Fiche candidat ${c.nom}`),
            await htmlToPdfBlob(buildFicheCandidat(snapshot, c)),
          );
          step(`Fiche candidat — ${c.nom}`);
          folder.file(fileName(`Convocation ${c.nom}`), await htmlToPdfBlob(buildConvocation(snapshot, c)));
          step(`Convocation — ${c.nom}`);
          folder.file(
            fileName(`Grille evaluation jury ${c.nom}`),
            await htmlToPdfBlob(buildGrilleEvaluation(snapshot, c)),
          );
          step(`Grille jury — ${c.nom}`);
          if (c.parcours === "Capitalisation de CCP") {
            folder.file(
              fileName(`Livret de certification ${c.nom}`),
              await htmlToPdfBlob(buildLivretCertification(snapshot, c)),
            );
          }
        }

        zip.file(fileName("Feuille emargement session"), await htmlToPdfBlob(buildEmargement(snapshot)));
        step("Émargement");
        zip.file(fileName("Proces verbal de session"), await htmlToPdfBlob(buildProcesVerbal(snapshot)));
        step("Procès-verbal");
        zip.file(fileName("Synthese de session"), await htmlToPdfBlob(buildSyntheseSession(snapshot)));
        step("Synthèse");

        const blob = await zip.generateAsync({ type: "blob" });
        r.report(100, "Pack prêt");
        return blob;
      },
    });
  };

  const perCandidatDocs: { label: string; build: (c: GotrmCandidat) => string }[] = [
    { label: "Fiche candidat", build: (c) => buildFicheCandidat(session, c) },
    { label: "Convocation", build: (c) => buildConvocation(session, c) },
    { label: "Grille jury", build: (c) => buildGrilleEvaluation(session, c) },
    { label: "Livret de certification", build: (c) => buildLivretCertification(session, c) },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
              <ArrowLeft className="w-4 h-4" /> Accueil
            </Button>
            <div>
              <h1 className="font-semibold flex items-center gap-2">
                <Truck className="w-4 h-4" /> GOTRM — Session d'examen
              </h1>
              <p className="text-xs text-muted-foreground">
                {GOTRM_TITRE.codeTitre} · Millésime {GOTRM_TITRE.millesime} · {GOTRM_TITRE.rncp} · {GOTRM_TITRE.niveau}
              </p>
            </div>
          </div>
          <Button onClick={exportPack} className="gap-2">
            <Download className="w-4 h-4" /> Générer le pack complet
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
          <h2 className="font-semibold">Configuration de la session</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Intitulé de session</Label>
              <Input value={intitule} onChange={(e) => setIntitule(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Date de début</Label>
              <Input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Date de fin</Label>
              <Input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Lieu / centre organisateur</Label>
              <Input value={lieu} onChange={(e) => setLieu(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Organisme</Label>
              <Input value={organisme.nom} readOnly className="bg-muted/50" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Membres du jury</Label>
                <Button variant="outline" size="sm" className="gap-1" onClick={() => setJury((p) => [...p, { nom: "", qualite: "" }])}>
                  <Plus className="w-3.5 h-3.5" /> Ajouter
                </Button>
              </div>
              {jury.map((j, i) => (
                <div key={i} className="flex gap-2">
                  <Input placeholder="Nom" value={j.nom} onChange={(e) => setJury((p) => p.map((x, k) => (k === i ? { ...x, nom: e.target.value } : x)))} />
                  <Input placeholder="Qualité" value={j.qualite} onChange={(e) => setJury((p) => p.map((x, k) => (k === i ? { ...x, qualite: e.target.value } : x)))} />
                  <Button variant="ghost" size="icon" onClick={() => setJury((p) => p.filter((_, k) => k !== i))}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Surveillant(s)</Label>
                <Button variant="outline" size="sm" className="gap-1" onClick={() => setSurveillants((p) => [...p, ""])}>
                  <Plus className="w-3.5 h-3.5" /> Ajouter
                </Button>
              </div>
              {surveillants.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <Input placeholder="Nom du surveillant" value={s} onChange={(e) => setSurveillants((p) => p.map((x, k) => (k === i ? e.target.value : x)))} />
                  <Button variant="ghost" size="icon" onClick={() => setSurveillants((p) => p.filter((_, k) => k !== i))}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">Candidats ({candidats.length})</h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={addCandidat}>
                <Plus className="w-4 h-4" /> Candidat
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={importStagiaires}>
                <Users className="w-4 h-4" /> Reprendre les stagiaires
              </Button>
              <label className="inline-flex">
                <input
                  type="file"
                  accept=".csv,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void importCsv(f);
                    e.target.value = "";
                  }}
                />
                <span className="inline-flex items-center gap-1 h-9 px-3 rounded-md border text-sm cursor-pointer hover:bg-accent">
                  <Upload className="w-4 h-4" /> Import CSV
                </span>
              </label>
            </div>
          </div>

          {conflits.length > 0 && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              Les deux parties de la MSP ne peuvent pas être planifiées le même jour :{" "}
              {conflits.map((c) => gotrmCandidatNomComplet(c) || c.identifiant).join(", ")}.
            </div>
          )}

          {candidats.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun candidat pour le moment.</p>
          )}

          <div className="space-y-4">
            {candidats.map((c, idx) => (
              <div key={c.id} className="rounded-xl border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    N° {c.ordrePassage} — {gotrmCandidatNomComplet(c) || "Nouveau candidat"} · {c.identifiant}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => setCandidats((p) => p.filter((x) => x.id !== c.id))}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-4 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Civilité</Label>
                    <Select value={c.civilite} onValueChange={(v) => patch(c.id, { civilite: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M.">M.</SelectItem>
                        <SelectItem value="Mme">Mme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Nom</Label>
                    <Input value={c.nom} onChange={(e) => patch(c.id, { nom: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Prénom</Label>
                    <Input value={c.prenom} onChange={(e) => patch(c.id, { prenom: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Date de naissance</Label>
                    <Input type="date" value={c.dateNaissance} onChange={(e) => patch(c.id, { dateNaissance: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Parcours</Label>
                    <Select value={c.parcours} onValueChange={(v) => patch(c.id, { parcours: v as GotrmParcours })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {GOTRM_PARCOURS.map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Ordre de passage</Label>
                    <Input
                      type="number"
                      min={1}
                      value={c.ordrePassage}
                      onChange={(e) => patch(c.id, { ordrePassage: Number(e.target.value) || idx + 1 })}
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-xs">Dossier d'inscription</Label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox checked={c.dossierComplet} onCheckedChange={(v) => patch(c.id, { dossierComplet: Boolean(v) })} />
                        Complet
                      </label>
                      {!c.dossierComplet && (
                        <Input
                          placeholder="Motif de l'incomplétude"
                          value={c.motifIncomplet}
                          onChange={(e) => patch(c.id, { motifIncomplet: e.target.value })}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">CCP visés</Label>
                  <div className="flex flex-wrap gap-4">
                    {GOTRM_CCP.map((ccp) => (
                      <label key={ccp.code} className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={c.ccpVises.includes(ccp.code)}
                          onCheckedChange={(v) =>
                            patch(c.id, {
                              ccpVises: v
                                ? [...c.ccpVises, ccp.code]
                                : c.ccpVises.filter((x) => x !== ccp.code),
                            })
                          }
                        />
                        {ccp.code}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">MSP partie 1 — date (CCP1)</Label>
                    <Input type="date" value={c.msp1Date} onChange={(e) => patch(c.id, { msp1Date: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Horaire partie 1</Label>
                    <Input value={c.msp1Horaire} onChange={(e) => patch(c.id, { msp1Horaire: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">MSP partie 2 — date (CCP2 + CCP3)</Label>
                    <Input type="date" value={c.msp2Date} onChange={(e) => patch(c.id, { msp2Date: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Horaire partie 2</Label>
                    <Input value={c.msp2Horaire} onChange={(e) => patch(c.id, { msp2Horaire: e.target.value })} />
                  </div>
                </div>
                {mspConflit(c) && (
                  <p className="text-xs text-destructive">
                    Les deux parties de la MSP doivent se dérouler sur deux jours distincts.
                  </p>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  {perCandidatDocs
                    .filter((d) => d.label !== "Livret de certification" || c.parcours === "Capitalisation de CCP")
                    .map((d) => (
                      <Button
                        key={d.label}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => downloadDoc(`${d.label} ${c.nom}`, d.build(c))}
                      >
                        <FileDown className="w-3.5 h-3.5" /> {d.label}
                      </Button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-2xl border shadow-card p-6 space-y-3">
          <h2 className="font-semibold">Documents de session</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2" onClick={() => requireCandidats() && downloadDoc("Feuille emargement session", buildEmargement(session))}>
              <FileDown className="w-4 h-4" /> Feuille d'émargement
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => requireCandidats() && downloadDoc("Proces verbal de session", buildProcesVerbal(session))}>
              <FileDown className="w-4 h-4" /> Procès-verbal
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => requireCandidats() && downloadDoc("Synthese de session", buildSyntheseSession(session))}>
              <FileDown className="w-4 h-4" /> Synthèse de session
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Ce module produit uniquement les pièces d'organisation et d'évaluation de la session. Les dossiers AC1 et AC2
            sont les productions rédigées par le candidat pendant les 10 heures de mise en situation professionnelle : ils
            figurent au bordereau de remise, sans contenu pré-rempli.
          </p>
        </section>
      </main>
    </div>
  );
};

export default GOTRMPage;
