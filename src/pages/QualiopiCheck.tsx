import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, AlertTriangle, CheckCircle2, XCircle, RefreshCw, ShieldCheck, Search, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { buildFullCatalog } from "@/lib/docCatalog";

type Severity = "error" | "warning" | "info";
type AuditType = "AF" | "BC" | "VAE" | "CFA";
type AiSeverity = "critical" | "major" | "minor" | "info";

interface AiFinding {
  severity: AiSeverity;
  categorie: "manquant" | "incoherence" | "incorrect" | "amelioration";
  critere: number;
  indicateur: number;
  zone: string;
  constat: string;
  impact: string;
  action: string;
}

interface AiAudit {
  scoreGlobal: number;
  synthese: string;
  findings: AiFinding[];
}

interface CheckRow {
  critere: number;
  indicateur: number;
  titre: string;
  ok: boolean;
  message: string;
  fix?: string;
}

interface Incoherence {
  severity: Severity;
  zone: string;
  message: string;
  suggestion?: string;
}

const INDICATEURS: { critere: number; num: number; titre: string }[] = [
  { critere: 1, num: 1, titre: "Information du public diffusée" },
  { critere: 1, num: 2, titre: "Indicateurs de résultats publiés" },
  { critere: 1, num: 3, titre: "Taux d'obtention de certification" },
  { critere: 2, num: 4, titre: "Analyse du besoin du bénéficiaire" },
  { critere: 2, num: 5, titre: "Objectifs opérationnels et évaluables" },
  { critere: 2, num: 6, titre: "Contenus adaptés aux publics" },
  { critere: 2, num: 7, titre: "Adéquation avec la certification" },
  { critere: 3, num: 8, titre: "Positionnement à l'entrée" },
  { critere: 3, num: 9, titre: "Conditions de déroulement informées" },
  { critere: 3, num: 10, titre: "Adaptation et suivi de la prestation" },
  { critere: 3, num: 11, titre: "Évaluation de l'atteinte des objectifs" },
  { critere: 3, num: 12, titre: "Engagement et prévention des abandons" },
  { critere: 3, num: 13, titre: "Coordination avec l'alternance (CFA)" },
  { critere: 3, num: 14, titre: "Accompagnement socio-pro (CFA)" },
  { critere: 3, num: 15, titre: "Droits et devoirs apprenti (CFA)" },
  { critere: 3, num: 16, titre: "Présentation à la certification" },
  { critere: 4, num: 17, titre: "Moyens humains et techniques" },
  { critere: 4, num: 18, titre: "Coordination des intervenants" },
  { critere: 4, num: 19, titre: "Ressources pédagogiques" },
  { critere: 4, num: 20, titre: "Personnels dédiés (CFA)" },
  { critere: 5, num: 21, titre: "Compétences des intervenants" },
  { critere: 5, num: 22, titre: "Développement des compétences" },
  { critere: 6, num: 23, titre: "Veille réglementaire" },
  { critere: 6, num: 24, titre: "Veille métiers" },
  { critere: 6, num: 25, titre: "Veille innovations pédagogiques" },
  { critere: 6, num: 26, titre: "Accueil du handicap" },
  { critere: 6, num: 27, titre: "Sous-traitance encadrée" },
  { critere: 6, num: 28, titre: "Formation en situation de travail" },
  { critere: 7, num: 29, titre: "Insertion professionnelle (CFA)" },
  { critere: 7, num: 30, titre: "Recueil des appréciations" },
  { critere: 7, num: 31, titre: "Traitement des réclamations" },
  { critere: 7, num: 32, titre: "Mesures d'amélioration continue" },
];

const CRIT_LABELS: Record<number, string> = {
  1: "Information du public",
  2: "Objectifs et adaptation",
  3: "Accueil & accompagnement",
  4: "Adéquation des moyens",
  5: "Qualification du personnel",
  6: "Investissement professionnel",
  7: "Amélioration continue",
};

function load<T>(key: string, fallback: T): T {
  try { const s = sessionStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
}

const isFilled = (v: any) => v !== undefined && v !== null && String(v).trim() !== "";

const validSiret = (s: string) => /^\d{14}$/.test(String(s || "").replace(/\s/g, ""));
const validNda = (s: string) => /^\d{2}\s?\d{2,}\s?\d{4,}\s?\d{2,}$/.test(String(s || "").trim()) || /^\d{11}$/.test(String(s || "").replace(/\s/g, ""));
const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").trim());
const validDate = (s: string) => isFilled(s) && !isNaN(new Date(s).getTime());

function runChecks(org: any, form: any, stag: any[]): CheckRow[] {
  const rows: CheckRow[] = [];
  const has = (v: any) => isFilled(v);
  const stagOk = Array.isArray(stag) && stag.length > 0;

  const push = (c: number, n: number, ok: boolean, message: string, fix?: string) => {
    const meta = INDICATEURS.find(i => i.num === n)!;
    rows.push({ critere: c, indicateur: n, titre: meta.titre, ok, message, fix });
  };

  push(1, 1, has(org?.nom) && has(org?.siteWeb), has(org?.siteWeb) ? "Site web renseigné" : "Site web manquant", "Renseigner le site web de l'organisme");
  push(1, 2, stagOk, stagOk ? `${stag.length} stagiaire(s) — indicateurs calculables` : "Aucun stagiaire pour calculer les indicateurs", "Ajouter au moins un stagiaire");
  push(1, 3, stagOk && has(form?.intitule), has(form?.intitule) ? "Formation rattachable à un taux de certif" : "Formation non définie", "Renseigner l'intitulé de la formation");

  push(2, 4, stagOk, stagOk ? "Bénéficiaires renseignés (analyse des besoins possible)" : "Pas de bénéficiaire", "Ajouter les stagiaires");
  push(2, 5, has(form?.objectifs), has(form?.objectifs) ? "Objectifs renseignés" : "Objectifs pédagogiques manquants", "Compléter les objectifs dans Formation");
  push(2, 6, has(form?.programme) && has(form?.publicVise), has(form?.publicVise) ? "Public visé défini" : "Public visé manquant", "Renseigner public visé et programme");
  push(2, 7, has(form?.intitule) && has(form?.duree), has(form?.duree) ? "Durée définie" : "Durée manquante", "Renseigner la durée");

  push(3, 8, has(form?.prerequis), has(form?.prerequis) ? "Prérequis définis" : "Prérequis manquants", "Renseigner les prérequis");
  push(3, 9, has(form?.lieu) && has(form?.modalites) && has(form?.dateDebut), "Conditions (lieu, modalités, dates) renseignées", "Compléter lieu, modalités et dates");
  push(3, 10, has(form?.moyensPedagogiques), has(form?.moyensPedagogiques) ? "Moyens pédagogiques décrits" : "Moyens pédagogiques manquants");
  push(3, 11, has(form?.methodesEvaluation), has(form?.methodesEvaluation) ? "Méthodes d'évaluation présentes" : "Méthodes d'évaluation manquantes");
  push(3, 12, stagOk, stagOk ? "Suivi possible (stagiaires présents)" : "Pas de suivi possible");

  const isCFA = String(form?.modalites || "").toLowerCase().includes("apprentis") || !!form?.rythmeAlternance;
  push(3, 13, !isCFA || has(form?.rythmeAlternance), isCFA ? (has(form?.rythmeAlternance) ? "Rythme d'alternance renseigné" : "Rythme d'alternance manquant (CFA)") : "Non applicable (hors CFA)");
  push(3, 14, !isCFA || has(org?.referentHandicap), isCFA ? "Accompagnement socio-pro à documenter" : "Non applicable");
  push(3, 15, true, "Règlement intérieur à fournir (généré automatiquement)");
  push(3, 16, has(form?.intitule), "Convocation examen générée automatiquement");

  push(4, 17, has(form?.formateur) && has(org?.outilsUtilises), has(form?.formateur) ? "Formateur renseigné" : "Formateur manquant");
  push(4, 18, has(org?.responsablePedagogique), has(org?.responsablePedagogique) ? "Responsable pédagogique défini" : "Responsable pédagogique manquant");
  push(4, 19, has(form?.moyensPedagogiques), has(form?.moyensPedagogiques) ? "Ressources décrites" : "Ressources pédagogiques à décrire");
  push(4, 20, !isCFA || has(org?.poleAdministratif), isCFA ? "Pôle administratif à renseigner" : "Non applicable");

  push(5, 21, has(form?.formateur), has(form?.formateur) ? "Formateur identifié (CV requis)" : "Formateur manquant");
  push(5, 22, true, "Plan de développement N+1 généré automatiquement");

  push(6, 23, true, "Veille réglementaire générée automatiquement");
  push(6, 24, has(org?.domainesFormation), has(org?.domainesFormation) ? "Domaine défini" : "Domaine de formation manquant — veille métier impossible");
  push(6, 25, true, "Veille innovations pédagogiques générée");
  push(6, 26, has(org?.referentHandicap), has(org?.referentHandicap) ? "Référent handicap nommé" : "Référent handicap manquant — bloquant Qualiopi !");
  push(6, 27, true, "Aucune sous-traitance déclarée par défaut");
  push(6, 28, true, "FEST documentée si applicable");

  push(7, 29, !isCFA || stagOk, isCFA ? "Suivi insertion à 6 mois requis" : "Non applicable");
  push(7, 30, stagOk, stagOk ? "Bilans à chaud/à froid générables" : "Pas de bilan possible sans stagiaire");
  push(7, 31, true, "Registre des réclamations généré");
  push(7, 32, true, "Plan d'amélioration généré");

  return rows;
}

function runIncoherences(org: any, form: any, stag: any[]): Incoherence[] {
  const out: Incoherence[] = [];
  const add = (severity: Severity, zone: string, message: string, suggestion?: string) =>
    out.push({ severity, zone, message, suggestion });

  // Organisme
  if (isFilled(org?.siret) && !validSiret(org.siret)) add("error", "Organisme", `SIRET invalide (${org.siret}) — doit contenir 14 chiffres`, "Vérifier le SIRET");
  if (isFilled(org?.nda) && !validNda(org.nda)) add("warning", "Organisme", `Format NDA inhabituel (${org.nda})`, "Format attendu : 11 chiffres (XX XXXX XXXX XX)");
  if (isFilled(org?.email) && !validEmail(org.email)) add("error", "Organisme", `Email invalide : ${org.email}`);
  if (!isFilled(org?.referentHandicap)) add("error", "Organisme", "Référent handicap absent — point bloquant en audit Qualiopi", "Indicateur 26");
  if (!isFilled(org?.dirigeant)) add("warning", "Organisme", "Dirigeant non renseigné — signatures impossibles");

  // Formation dates
  if (isFilled(form?.dateDebut) && !validDate(form.dateDebut)) add("error", "Formation", "Date de début invalide");
  if (isFilled(form?.dateFin) && !validDate(form.dateFin)) add("error", "Formation", "Date de fin invalide");
  if (validDate(form?.dateDebut) && validDate(form?.dateFin)) {
    const a = new Date(form.dateDebut).getTime();
    const b = new Date(form.dateFin).getTime();
    if (b < a) add("error", "Formation", "Date de fin antérieure à la date de début", "Inverser ou corriger les dates");
    const days = Math.round((b - a) / 86400000);
    if (days > 730) add("warning", "Formation", `Durée calendaire très longue (${days} jours)`);
    if (isFilled(form?.duree)) {
      const h = parseInt(String(form.duree).match(/\d+/)?.[0] || "0", 10);
      if (h > 0) {
        const maxH = Math.max(7, days * 7);
        if (h > maxH) add("error", "Formation", `Durée déclarée (${h}h) incompatible avec la période (${days} jours)`, "Réduire la durée ou élargir la période");
      }
    }
  }
  if (!isFilled(form?.prerequis)) add("warning", "Formation", "Prérequis non renseignés (IND 8)");
  if (!isFilled(form?.methodesEvaluation)) add("warning", "Formation", "Méthodes d'évaluation manquantes (IND 11)");

  // Stagiaires
  if (Array.isArray(stag)) {
    const emails = new Map<string, number>();
    stag.forEach((s, i) => {
      const who = `${s?.prenom || ""} ${s?.nom || ""}`.trim() || `Stagiaire #${i + 1}`;
      if (!isFilled(s?.nom) || !isFilled(s?.prenom)) add("error", "Stagiaires", `${who} : nom ou prénom manquant`);
      if (isFilled(s?.email)) {
        if (!validEmail(s.email)) add("error", "Stagiaires", `${who} : email invalide (${s.email})`);
        const k = String(s.email).toLowerCase();
        emails.set(k, (emails.get(k) || 0) + 1);
      }
      if (isFilled(s?.dateDebut) && isFilled(s?.dateFin)) {
        const a = new Date(s.dateDebut).getTime();
        const b = new Date(s.dateFin).getTime();
        if (b < a) add("error", "Stagiaires", `${who} : date fin avant date début`);
      }
      // Comparison with global formation dates
      if (validDate(form?.dateDebut) && validDate(s?.dateDebut)) {
        const diff = Math.abs(new Date(s.dateDebut).getTime() - new Date(form.dateDebut).getTime()) / 86400000;
        if (diff > 365) add("warning", "Stagiaires", `${who} : date de début éloignée de >1 an de celle de la formation globale`);
      }
    });
    emails.forEach((n, k) => { if (n > 1) add("warning", "Stagiaires", `Email dupliqué (${n}×) : ${k}`); });

    // RQTH coherence
    const hasRqth = stag.some((s: any) => s?.rqth);
    if (hasRqth && !isFilled(org?.referentHandicap)) add("error", "Cohérence", "Stagiaire(s) RQTH déclaré(s) mais aucun référent handicap — incohérence majeure", "Renseigner le référent handicap");
  }

  // Cross-checks
  if (isFilled(form?.formateur) && isFilled(org?.dirigeant) && form.formateur.trim().toLowerCase() === org.dirigeant.trim().toLowerCase()) {
    add("info", "Cohérence", "Le formateur et le dirigeant sont la même personne — vérifier que c'est intentionnel");
  }

  return out;
}

const QualiopiCheck = () => {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState<"checklist" | "incoherences" | "ai">("ai");
  const [auditType, setAuditType] = useState<AuditType>("AF");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAudit, setAiAudit] = useState<AiAudit | null>(null);
  const [decisions, setDecisions] = useState<Record<number, "fix" | "ignore">>({});
  const [fixingIdx, setFixingIdx] = useState<number | null>(null);

  const applyFix = async (idx: number, f: AiFinding) => {
    setFixingIdx(idx);
    try {
      const { data, error } = await supabase.functions.invoke("audit-fix", {
        body: { type: auditType, finding: f, organisme: org, formation: form, stagiaires: stag },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const patch = (data as any)?.patch || {};
      const explication = (data as any)?.explication || "Correction appliquée";

      let touched = false;
      if (patch.organisme && typeof patch.organisme === "object" && Object.keys(patch.organisme).length) {
        const merged = { ...load<any>("qualiopi_org", {}), ...patch.organisme };
        sessionStorage.setItem("qualiopi_org", JSON.stringify(merged));
        touched = true;
      }
      if (patch.formation && typeof patch.formation === "object" && Object.keys(patch.formation).length) {
        const merged = { ...load<any>("qualiopi_form", {}), ...patch.formation };
        sessionStorage.setItem("qualiopi_form", JSON.stringify(merged));
        touched = true;
      }
      if (Array.isArray(patch.stagiaires) && patch.stagiaires.length) {
        const arr = load<any[]>("qualiopi_stag", []);
        patch.stagiaires.forEach((u: any) => {
          if (typeof u?.index === "number" && arr[u.index] && u.champs) {
            arr[u.index] = { ...arr[u.index], ...u.champs };
          }
        });
        sessionStorage.setItem("qualiopi_stag", JSON.stringify(arr));
        touched = true;
      }
      if (touched) {
        setDecisions(d => ({ ...d, [idx]: "fix" }));
        setTick(t => t + 1);
        toast.success(`✅ Corrigé par l'IA : ${explication}`);
      } else {
        toast.info(`ℹ️ ${explication || "Pas de patch automatique disponible — corrige manuellement."}`);
      }
    } catch (e: any) {
      toast.error(e.message || "Erreur correction IA");
    } finally {
      setFixingIdx(null);
    }
  };

  // Live refresh: re-read sessionStorage on focus
  useEffect(() => {
    const h = () => setTick(t => t + 1);
    window.addEventListener("focus", h);
    window.addEventListener("storage", h);
    const id = setInterval(h, 2000);
    return () => { window.removeEventListener("focus", h); window.removeEventListener("storage", h); clearInterval(id); };
  }, []);

  const { org, form, stag, checks, incos, score, byCrit } = useMemo(() => {
    const org = load<any>("qualiopi_org", {});
    const form = load<any>("qualiopi_form", {});
    const stag = load<any[]>("qualiopi_stag", []);
    const checks = runChecks(org, form, stag);
    const incos = runIncoherences(org, form, stag);
    const okCount = checks.filter(c => c.ok).length;
    const score = Math.round((okCount / checks.length) * 100);
    const byCrit = new Map<number, CheckRow[]>();
    checks.forEach(c => { if (!byCrit.has(c.critere)) byCrit.set(c.critere, []); byCrit.get(c.critere)!.push(c); });
    return { org, form, stag, checks, incos, score, byCrit };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  // Auto-detect default audit type from org.typesActions
  useEffect(() => {
    const t = (org?.typesActions || []) as string[];
    if (t.includes("vae")) setAuditType("VAE");
    else if (t.includes("bilans-competences")) setAuditType("BC");
    else if (t.includes("apprentissage")) setAuditType("CFA");
    else setAuditType("AF");
  }, [org?.typesActions]);

  const runAiAudit = async () => {
    setAiLoading(true);
    setAiAudit(null);
    try {
      const formations = form?.intitule ? [form] : [];
      // Map the audit type → typesActions so the catalog contains the right docs
      const typeMap: Record<AuditType, string[]> = {
        AF: ["actions-formation"],
        BC: ["bilans-competences"],
        VAE: ["vae"],
        CFA: ["apprentissage"],
      };
      const typesForCatalog = typeMap[auditType];
      let documents: { nom: string; critere: number; indicateur: number }[] = [];
      try {
        const cat = buildFullCatalog(formations as any, (stag || []) as any, [], typesForCatalog as any, org?.dirigeant);
        documents = cat.map(d => ({ nom: d.nom, critere: d.critere, indicateur: d.indicateur }));
      } catch {}
      const { data, error } = await supabase.functions.invoke("audit-ia", {
        body: { type: auditType, organisme: org, formation: form, stagiaires: stag, documents },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      if (!(data as any)?.findings) throw new Error("Réponse IA invalide");
      setAiAudit(data as AiAudit);
      setDecisions({});
      toast.success(`Audit IA terminé — ${(data as AiAudit).findings.length} points relevés. Décide pour chacun : Corriger ou Ignorer.`);
    } catch (e: any) {
      toast.error(e.message || "Erreur audit IA");
    } finally {
      setAiLoading(false);
    }
  };

  const errCount = incos.filter(i => i.severity === "error").length;
  const warnCount = incos.filter(i => i.severity === "warning").length;

  const sevColor = (s: Severity) => s === "error" ? "border-destructive bg-destructive/5 text-destructive" : s === "warning" ? "border-amber-400 bg-amber-50 text-amber-800" : "border-blue-300 bg-blue-50 text-blue-800";
  const sevIcon = (s: Severity) => s === "error" ? <XCircle className="w-4 h-4" /> : s === "warning" ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />;

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}><ArrowLeft className="w-4 h-4 mr-1" /> Retour</Button>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Audit Qualiopi en direct</h1>
              <p className="text-xs text-muted-foreground">{org?.nom || "Organisme non renseigné"} • {form?.intitule || "Formation non renseignée"} • {stag?.length || 0} stagiaire(s)</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setTick(t => t + 1)}><RefreshCw className="w-4 h-4 mr-1" /> Rafraîchir</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Score */}
        <Card className="p-6">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div>
              <p className="text-sm text-muted-foreground">Score de complétude</p>
              <p className="text-5xl font-bold text-primary">{score}%</p>
              <Progress value={score} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">{checks.filter(c => c.ok).length} / {checks.length} indicateurs couverts</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Incohérences détectées</p>
              <p className="text-5xl font-bold text-destructive">{errCount}</p>
              <p className="text-xs text-muted-foreground mt-2">{warnCount} alerte(s) • {incos.length - errCount - warnCount} info(s)</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant={tab === "ai" ? "default" : "outline"} onClick={() => setTab("ai")} className="justify-start">
                <Sparkles className="w-4 h-4 mr-2" /> Audit IA (réel)
              </Button>
              <Button variant={tab === "checklist" ? "default" : "outline"} onClick={() => setTab("checklist")} className="justify-start">
                <ShieldCheck className="w-4 h-4 mr-2" /> Checklist 33 indicateurs
              </Button>
              <Button variant={tab === "incoherences" ? "default" : "outline"} onClick={() => setTab("incoherences")} className="justify-start">
                <Search className="w-4 h-4 mr-2" /> Détecteur d'incohérences
              </Button>
            </div>
          </div>
        </Card>

        {tab === "checklist" && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map(c => {
              const list = byCrit.get(c) || [];
              const okN = list.filter(r => r.ok).length;
              return (
                <Card key={c} className="overflow-hidden">
                  <div className="px-4 py-3 bg-primary/5 border-b flex items-center justify-between">
                    <p className="font-semibold">Critère {c} — {CRIT_LABELS[c]}</p>
                    <Badge variant={okN === list.length ? "default" : "secondary"}>{okN}/{list.length}</Badge>
                  </div>
                  <div className="divide-y">
                    {list.map(r => (
                      <div key={r.indicateur} className="px-4 py-2.5 flex items-start gap-3">
                        {r.ok
                          ? <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                          : <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">IND {r.indicateur} — {r.titre}</p>
                          <p className="text-xs text-muted-foreground">{r.message}</p>
                          {!r.ok && r.fix && <p className="text-xs text-primary mt-0.5">→ {r.fix}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {tab === "incoherences" && (
          <Card className="p-4">
            {incos.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="font-semibold">Aucune incohérence détectée</p>
                <p className="text-sm text-muted-foreground">Ton dossier est cohérent. 🎉</p>
              </div>
            ) : (
              <div className="space-y-2">
                {incos.sort((a, b) => (a.severity === "error" ? -1 : b.severity === "error" ? 1 : a.severity === "warning" ? -1 : 1)).map((i, idx) => (
                  <div key={idx} className={`border-l-4 rounded p-3 flex items-start gap-3 ${sevColor(i.severity)}`}>
                    <div className="mt-0.5">{sevIcon(i.severity)}</div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{i.zone}</p>
                      <p className="text-sm">{i.message}</p>
                      {i.suggestion && <p className="text-xs mt-1 opacity-80">💡 {i.suggestion}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {tab === "ai" && (
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Audit IA en direct</p>
                <p className="text-xs text-muted-foreground">L'IA analyse réellement ton dossier (organisme, formation, stagiaires, documents générés) et liste tout ce qui manque, est incohérent ou améliorable.</p>
              </div>
              <div className="flex items-center gap-2">
                {(["AF", "BC", "VAE", "CFA"] as AuditType[]).map(t => (
                  <Button key={t} size="sm" variant={auditType === t ? "default" : "outline"} onClick={() => setAuditType(t)}>{t}</Button>
                ))}
                <Button size="sm" onClick={runAiAudit} disabled={aiLoading} className="ml-2">
                  {aiLoading ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Audit en cours…</> : <><Sparkles className="w-4 h-4 mr-1" /> Lancer l'audit IA</>}
                </Button>
              </div>
            </div>

            {!aiAudit && !aiLoading && (
              <div className="text-center py-10 text-sm text-muted-foreground">
                Sélectionne le type d'action ({auditType}) puis lance l'audit IA pour obtenir un rapport détaillé.
              </div>
            )}

            {aiLoading && (
              <div className="text-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Analyse du dossier en cours — l'IA passe en revue chaque indicateur…</p>
              </div>
            )}

            {aiAudit && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <p className="text-xs text-muted-foreground">Score auditeur</p>
                    <p className="text-4xl font-bold text-primary">{aiAudit.scoreGlobal}%</p>
                    <Progress value={aiAudit.scoreGlobal} className="mt-2" />
                  </Card>
                  <Card className="p-4 md:col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">Synthèse</p>
                    <p className="text-sm">{aiAudit.synthese}</p>
                    <div className="flex gap-3 mt-3 text-xs">
                      <Badge variant="destructive">{aiAudit.findings.filter(f => f.severity === "critical").length} critiques</Badge>
                      <Badge className="bg-orange-500 hover:bg-orange-500">{aiAudit.findings.filter(f => f.severity === "major").length} majeurs</Badge>
                      <Badge variant="secondary">{aiAudit.findings.filter(f => f.severity === "minor").length} mineurs</Badge>
                      <Badge variant="outline">{aiAudit.findings.filter(f => f.severity === "info").length} infos</Badge>
                    </div>
                  </Card>
                </div>

                <div className="space-y-2">
                  {(() => {
                    const total = aiAudit.findings.length;
                    const decided = Object.keys(decisions).length;
                    const fixed = Object.values(decisions).filter(v => v === "fix").length;
                    const ignored = Object.values(decisions).filter(v => v === "ignore").length;
                    return (
                      <div className="flex items-center justify-between text-xs bg-muted/40 rounded p-2 mb-2">
                        <span className="font-medium">Décisions : {decided}/{total}</span>
                        <span className="text-muted-foreground">✅ {fixed} à corriger · ✗ {ignored} ignorés · ⏳ {total - decided} en attente</span>
                      </div>
                    );
                  })()}
                  {aiAudit.findings
                    .slice()
                    .sort((a, b) => {
                      const ord = { critical: 0, major: 1, minor: 2, info: 3 } as const;
                      return ord[a.severity] - ord[b.severity];
                    })
                    .map((f, idx) => {
                      const decision = decisions[idx];
                      const color =
                        decision === "ignore" ? "border-l-muted bg-muted/30 opacity-60"
                        : decision === "fix" ? "border-l-green-500 bg-green-50"
                        : f.severity === "critical" ? "border-l-destructive bg-destructive/5"
                        : f.severity === "major" ? "border-l-orange-500 bg-orange-50"
                        : f.severity === "minor" ? "border-l-amber-400 bg-amber-50"
                        : "border-l-blue-400 bg-blue-50";
                      const catLabel = {
                        manquant: "🔴 Manquant",
                        incoherence: "⚠️ Incohérence",
                        incorrect: "❌ Incorrect",
                        amelioration: "💡 Amélioration",
                      }[f.categorie] || f.categorie;
                      const routeFor = (zone: string) => {
                        const z = (zone || "").toLowerCase();
                        if (z.includes("organisme") || z.includes("siret") || z.includes("nda")) return "/organisme";
                        if (z.includes("stagiaire") || z.includes("apprenti") || z.includes("bénéficiaire")) return "/stagiaires";
                        if (z.includes("formation") || z.includes("programme") || z.includes("session")) return "/formation";
                        return null;
                      };
                      return (
                        <div key={idx} className={`border-l-4 rounded p-3 ${color}`}>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <Badge variant="outline" className="text-[10px] uppercase">{f.severity}</Badge>
                            <span className="text-xs font-semibold">{catLabel}</span>
                            {f.critere > 0 && <Badge variant="secondary" className="text-[10px]">C{f.critere}{f.indicateur > 0 ? ` · IND ${f.indicateur}` : ""}</Badge>}
                            <span className="text-xs text-muted-foreground">{f.zone}</span>
                            {decision === "fix" && <Badge className="bg-green-600 hover:bg-green-600 text-[10px] ml-auto">✅ À corriger</Badge>}
                            {decision === "ignore" && <Badge variant="outline" className="text-[10px] ml-auto">✗ Ignoré</Badge>}
                          </div>
                          <p className="text-sm font-medium">{f.constat}</p>
                          {f.impact && <p className="text-xs text-muted-foreground mt-1"><strong>Impact :</strong> {f.impact}</p>}
                          {f.action && <p className="text-xs text-primary mt-1">→ <strong>Action :</strong> {f.action}</p>}
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-current/10">
                            <span className="text-xs font-semibold text-muted-foreground mr-1">Ta décision :</span>
                            <Button
                              size="sm"
                              variant={decision === "fix" ? "default" : "outline"}
                              disabled={fixingIdx === idx}
                              className={decision === "fix" ? "bg-green-600 hover:bg-green-700 h-7 text-xs" : "h-7 text-xs"}
                              onClick={() => applyFix(idx, f)}
                            >
                              {fixingIdx === idx
                                ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Correction IA…</>
                                : <><CheckCircle2 className="w-3 h-3 mr-1" /> Corriger avec IA</>}
                            </Button>
                            <Button
                              size="sm"
                              variant={decision === "ignore" ? "secondary" : "ghost"}
                              className="h-7 text-xs"
                              onClick={() => {
                                setDecisions(d => ({ ...d, [idx]: "ignore" }));
                                toast("Point ignoré");
                              }}
                            >
                              <XCircle className="w-3 h-3 mr-1" /> Ignorer
                            </Button>
                            {decision && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs text-muted-foreground"
                                onClick={() => setDecisions(d => { const n = { ...d }; delete n[idx]; return n; })}
                              >
                                Réinitialiser
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </Card>
        )}
      </main>
    </div>
  );
};

export default QualiopiCheck;
