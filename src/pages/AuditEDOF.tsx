import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Building2, Download, FileSearch, FileUp, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { fetchEntreprise, type EntrepriseInfo } from "@/lib/bpfAnalyse";
import { analyserEdof, chargerReferentiels, eur, fr, lireDossiersEdof, nomRapport, type AuditEdof, type DossierEdof, type Niveau } from "@/lib/auditEdof/analyse";
import { genererRapportEdof } from "@/lib/auditEdof/rapportPdf";

const STYLE_NIVEAU: Record<Niveau, string> = {
  "ÉLEVÉ": "bg-red-600 text-white hover:bg-red-600",
  MOYEN: "bg-amber-500 text-white hover:bg-amber-500",
  FAIBLE: "bg-slate-500 text-white hover:bg-slate-500",
};

const messageErreur = (err: unknown, defaut: string) => (err instanceof Error && err.message) || defaut;

export default function AuditEDOF() {
  const navigate = useNavigate();
  const [fichier, setFichier] = useState<{ nom: string; dossiers: DossierEdof[] } | null>(null);
  const [siret, setSiret] = useState("");
  const [entreprise, setEntreprise] = useState<EntrepriseInfo | null>(null);
  const [recherche, setRecherche] = useState(false);
  const [calcul, setCalcul] = useState(false);
  const [audit, setAudit] = useState<AuditEdof | null>(null);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => () => { if (pdfUrl) URL.revokeObjectURL(pdfUrl); }, [pdfUrl]);

  const chercher = async (s: string) => {
    if (!/^\d{14}$/.test(s)) return;
    setRecherche(true);
    try {
      const e = await fetchEntreprise(s);
      setEntreprise(e);
      if (!e) toast.error("SIRET introuvable dans l'annuaire des entreprises");
    } catch (err) {
      toast.error(messageErreur(err, "Recherche impossible"));
    } finally {
      setRecherche(false);
    }
  };

  const charger = async (f: File) => {
    try {
      const dossiers = lireDossiersEdof(await f.arrayBuffer());
      if (!dossiers.length) throw new Error("Aucun dossier lu : est-ce bien l'export « Tous les dossiers » d'EDOF ?");
      setFichier({ nom: f.name, dossiers });
      setAudit(null);
      setPdfUrl("");
      const s = f.name.match(/(\d{14})/)?.[1] || "";
      setSiret(s);
      setEntreprise(null);
      toast.success(`${dossiers.length} dossiers lus`);
      if (s) chercher(s);
    } catch (err) {
      toast.error(messageErreur(err, "Lecture impossible"));
    }
  };

  const generer = async () => {
    if (!fichier) return;
    setCalcul(true);
    try {
      const referentiels = await chargerReferentiels(fichier.dossiers);
      const a = analyserEdof(fichier.dossiers, { siret, nomFichier: fichier.nom, entreprise, referentiels });
      const pdf = await genererRapportEdof(a);
      setAudit(a);
      setPdfUrl(URL.createObjectURL(new Blob([pdf as BlobPart], { type: "application/pdf" })));
    } catch (err) {
      console.error(err);
      toast.error(messageErreur(err, "Génération impossible"));
    } finally {
      setCalcul(false);
    }
  };

  const telecharger = () => {
    if (!audit || !pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = nomRapport(audit);
    a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1"><ArrowLeft className="w-4 h-4" /> Accueil</Button>
            <h1 className="font-bold text-lg flex items-center gap-2"><FileSearch className="w-5 h-5 text-primary" /> Audit EDOF</h1>
          </div>
          {audit && pdfUrl && (
            <Button size="sm" onClick={telecharger} className="gap-1 bg-gradient-hero border-0 text-primary-foreground">
              <Download className="w-4 h-4" /> Télécharger le PDF
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-lg">1. Export EDOF</h2>
            <p className="text-sm text-muted-foreground">
              Déposez l'export « Tous les dossiers » de Mon Compte Formation (CSV ou XLSX). Toutes les années de l'export sont
              analysées dans un seul rapport, avec le chiffre d'affaires séparé par année : habilitations France Compétences,
              dirigeant inscrit, prix par action, dossiers recréés, multi-certifications, durées, 11 jours ouvrés, taux de réalisation,
              contacts partagés, géographie, prérequis, VAE, annulations.
            </p>
          </div>
          <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-muted/40">
            <FileUp className="w-5 h-5 text-primary" />
            <span className="text-sm">{fichier ? `${fichier.nom} – ${fichier.dossiers.length} dossiers` : "Choisir l'export EDOF"}</span>
            <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) charger(f); e.target.value = ""; }} />
          </label>
        </section>

        {fichier && (
          <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Building2 className="w-5 h-5" /> 2. Organisme</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
              <div className="flex-1">
                <Label className="text-xs">SIRET (lu dans le nom du fichier)</Label>
                <Input value={siret} onChange={(e) => setSiret(e.target.value.replace(/\D/g, "").slice(0, 14))} placeholder="14 chiffres" />
              </div>
              <Button variant="outline" onClick={() => chercher(siret)} disabled={recherche || siret.length !== 14} className="gap-1">
                {recherche ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Rechercher
              </Button>
            </div>
            {entreprise && (
              <div className="text-sm rounded-lg bg-muted/50 p-3 space-y-0.5">
                <p className="font-semibold">{entreprise.nom}</p>
                <p className="text-muted-foreground">{entreprise.adresse}</p>
                <p className="text-muted-foreground">
                  {[entreprise.dateCreation && `Créée le ${fr(entreprise.dateCreation)}`, entreprise.dirigeant, entreprise.nda && `NDA ${entreprise.nda}`, entreprise.etat].filter(Boolean).join(" – ")}
                </p>
              </div>
            )}
            <Button onClick={generer} disabled={calcul || siret.length !== 14} className="gap-1 bg-gradient-hero border-0 text-primary-foreground">
              {calcul ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSearch className="w-4 h-4" />}
              {calcul ? "Analyse en cours…" : "Analyser et générer le PDF"}
            </Button>
            {!entreprise && siret.length === 14 && !recherche && (
              <p className="text-xs text-muted-foreground">Sans fiche entreprise, le rapport n'a ni identité complète ni contrôle « dirigeant inscrit ».</p>
            )}
          </section>
        )}

        {audit && (
          <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
            <h2 className="font-semibold text-lg">3. Résultat</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                [String(audit.dossiers.length), "dossiers"],
                [String(audit.servicesFaits), "services faits validés"],
                [eur(audit.ca), audit.annees.filter((y) => audit.caParAnnee[y] > 0).map((y) => `${y} : ${eur(audit.caParAnnee[y])}`).join(" · ")],
                [String(audit.enCours.n), `en cours (${eur(audit.enCours.montant)})`],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xl font-bold text-primary">{v}</p>
                  <p className="text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
            <div className="divide-y rounded-xl border">
              {audit.constats.map((c) => (
                <div key={c.id} className="p-3 flex gap-3 items-start">
                  <Badge className={STYLE_NIVEAU[c.niveau]}>{c.niveau}</Badge>
                  <div className="text-sm">
                    <p className="font-medium">{c.titre}</p>
                    <p className="text-muted-foreground">{c.ampleur}</p>
                  </div>
                </div>
              ))}
              {!audit.constats.length && <p className="p-3 text-sm">Aucun constat de risque.</p>}
            </div>
            {pdfUrl && <iframe title="Aperçu du rapport" src={pdfUrl} className="w-full h-[80vh] rounded-xl border" />}
          </section>
        )}
      </main>
    </div>
  );
}
