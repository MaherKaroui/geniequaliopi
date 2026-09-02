import { useRef, useState } from "react";
import { FormationInfo, StagiaireInfo, OrganismeInfo } from "@/types/qualiopi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Sparkles, Loader2, RefreshCw, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_FORMATIONS, STAGIAIRES_BAC_PRO_LOGISTIQUE, STAGIAIRES_HAYB_GOTRM, STAGIAIRES_GOTRM_SEPTEMBRE, HAYB_FORMATIONS_ORG, MAISON_HSY_ORG, STAGIAIRES_MAQUILLEUR_PRO, PAIE_ORG, STAGIAIRES_PAIE, seedPaieAICaches, SECRETARIAT_ORG, STAGIAIRES_SECRETARIAT, seedSecretariatAICaches, seedGOTRMAICaches, SAMA_ORG, STAGIAIRES_SAMA, seedSAMAAICaches, ARH_ORG, STAGIAIRES_ARH, seedARHAICaches, IA_GENERATIVE_ORG, STAGIAIRES_IA_GENERATIVE, seedIAGenerativeAICaches, VITRAGE_ORG, STAGIAIRES_VITRAGE, seedVitrageAICaches } from "@/lib/sampleData";
import { parseEdofXlsx, EdofSession } from "@/lib/edofParser";
import { RNCP_FICHES } from "@/lib/rncpData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generateAIEvalPack, clearCachedPack } from "@/lib/aiEvalPack";
import { generateAIVeillePack, clearCachedVeillePack } from "@/lib/aiVeillePack";
import { generateAIContentPack, clearCachedContentPack } from "@/lib/aiContentPack";

interface FormationFormProps {
  data: FormationInfo;
  onChange: (data: FormationInfo) => void;
  onImportStagiaires?: (stagiaires: StagiaireInfo[]) => void;
  onApplyOrganisme?: (organisme: OrganismeInfo) => void;
}

const FormationForm = ({ data, onChange, onImportStagiaires, onApplyOrganisme }: FormationFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formateurSigRef = useRef<HTMLInputElement>(null);
  const [importedSessions, setImportedSessions] = useState<EdofSession[]>([]);
  const [importing, setImporting] = useState(false);
  const [aiNom, setAiNom] = useState("");
  const [aiCodeRNCP, setAiCodeRNCP] = useState("");
  const [aiModel, setAiModel] = useState<string>("google/gemini-2.5-flash");
  const [aiLoading, setAiLoading] = useState(false);
  const [veilleLoading, setVeilleLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [besoinsLoading, setBesoinsLoading] = useState(false);
  const [exosLoading, setExosLoading] = useState(false);

  const handleRegenerateBesoins = async () => {
    if (!data.intitule || data.intitule.trim().length < 3) {
      toast.error("Renseignez d'abord l'intitulé de la formation");
      return;
    }
    setBesoinsLoading(true);
    const t = toast.loading("Génération IA : réponses d'évaluation des besoins (ton humanisé)…");
    try {
      clearCachedContentPack(data);
      await generateAIContentPack(data, { force: true, humanizeBesoins: true } as any);
      toast.success("✅ Réponses d'évaluation des besoins régénérées (ton naturel, humanisé)", { id: t });
    } catch (err: any) {
      console.error("Besoins regen error:", err);
      toast.error(err?.message || "Échec de la régénération des besoins", { id: t });
    } finally {
      setBesoinsLoading(false);
    }
  };

  const handleRegenerateExosInd11 = async () => {
    if (!data.intitule || data.intitule.trim().length < 3) {
      toast.error("Renseignez d'abord l'intitulé de la formation");
      return;
    }
    setExosLoading(true);
    const t = toast.loading("Génération IA : exercices IND 11 + corrigés + réponses stagiaires…");
    try {
      clearCachedPack(data);
      await generateAIEvalPack(data, true);
      toast.success("✅ Exercices IND 11 (intermédiaires + évaluation finale + QCM) régénérés", { id: t });
    } catch (err: any) {
      console.error("Exos IND 11 regen error:", err);
      toast.error(err?.message || "Échec de la régénération des exercices", { id: t });
    } finally {
      setExosLoading(false);
    }
  };

  const handleRegenerateAllContent = async () => {
    if (!data.intitule || data.intitule.trim().length < 3) {
      toast.error("Renseignez d'abord l'intitulé de la formation");
      return;
    }
    setContentLoading(true);
    const t = toast.loading("Génération IA : support de cours +30p, exercices, corrigés, évaluation des besoins, ressources…");
    try {
      clearCachedPack(data);
      clearCachedContentPack(data);
      clearCachedVeillePack(data);
      const [evalRes, contentRes, veilleRes] = await Promise.allSettled([
        generateAIEvalPack(data, true),
        generateAIContentPack(data, { force: true }),
        generateAIVeillePack(data, true),
      ]);
      const failures: string[] = [];
      if (evalRes.status !== "fulfilled") failures.push("QCM/exercices");
      if (contentRes.status !== "fulfilled") failures.push("support de cours");
      if (veilleRes.status !== "fulfilled") failures.push("veilles");
      if (failures.length === 0) {
        toast.success("✅ Tout généré : évaluation besoins, support de cours, exercices+corrigés, QCM, veilles, ressources pédagogiques", { id: t });
      } else {
        toast.warning(`Génération partielle. Échec : ${failures.join(" + ")}`, { id: t });
        if (evalRes.status === "rejected") console.error("Eval pack:", evalRes.reason);
        if (contentRes.status === "rejected") console.error("Content pack:", contentRes.reason);
        if (veilleRes.status === "rejected") console.error("Veille pack:", veilleRes.reason);
      }
    } catch (err: any) {
      console.error("Regenerate all content error:", err);
      toast.error(err?.message || "Échec de la génération", { id: t });
    } finally {
      setContentLoading(false);
    }
  };

  const handleRegenerateVeilles = async () => {
    if (!data.intitule || data.intitule.trim().length < 3) {
      toast.error("Renseignez d'abord l'intitulé de la formation");
      return;
    }
    setVeilleLoading(true);
    const t = toast.loading("Génération des veilles cohérentes avec la formation…");
    try {
      clearCachedVeillePack(data);
      await generateAIVeillePack(data, true);
      toast.success("✅ Veilles (réglementaire / métier / techno) régénérées et adaptées à la formation", { id: t });
    } catch (err: any) {
      console.error("Veille regen error:", err);
      toast.error(err?.message || "Échec de la régénération des veilles", { id: t });
    } finally {
      setVeilleLoading(false);
    }
  };

  const handleAIGenerate = async () => {
    const nom = aiNom.trim();
    if (nom.length < 3) {
      toast.error("Donnez un nom de formation (3 caractères min)");
      return;
    }
    setAiLoading(true);
    const t = toast.loading("Génération IA en cours… (10-30s)");
    try {
      const { data, error } = await supabase.functions.invoke("generate-formation-ai", {
        body: { nom, codeRNCP: aiCodeRNCP.trim(), model: aiModel },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const f = data?.formation as FormationInfo | undefined;
      if (!f?.intitule) throw new Error("Réponse IA vide");
      onChange({ ...f });
      toast.success("✅ Formation générée — génération des QCM, exercices et veilles…", { id: t });

      // Génère en parallèle : pack QCM/exercices ET pack veilles, tous cohérents avec la formation.
      // ⚠️ On NE supprime PAS les veilles existantes : si un pack veilles est déjà mis en cache
      // (localStorage) pour cette formation, on le conserve tel quel.
      try {
        clearCachedPack(f);
        clearCachedContentPack(f);
        const [evalRes, veilleRes, contentRes] = await Promise.allSettled([
          generateAIEvalPack(f, true),
          generateAIVeillePack(f, false), // false = réutilise le cache si présent
          generateAIContentPack(f, { force: true }),
        ]);
        const evalOk = evalRes.status === "fulfilled";
        const veilleOk = veilleRes.status === "fulfilled";
        const contentOk = contentRes.status === "fulfilled";
        if (evalOk && veilleOk && contentOk) {
          toast.success("✅ QCM, exercices, évaluation finale, veilles, support de cours (30+ p.), ressources pédagogiques générés", { id: t });
        } else {
          const failures: string[] = [];
          if (!evalOk) failures.push("QCM/exercices");
          if (!veilleOk) failures.push("veilles");
          if (!contentOk) failures.push("contenu pédagogique");
          toast.warning(
            `Formation OK. Échec partiel : ${failures.join(" + ")}. Réessayez via l'étape 5.`,
            { id: t },
          );
          if (!evalOk) console.error("Eval pack error:", (evalRes as PromiseRejectedResult).reason);
          if (!veilleOk) console.error("Veille pack error:", (veilleRes as PromiseRejectedResult).reason);
          if (!contentOk) console.error("Content pack error:", (contentRes as PromiseRejectedResult).reason);
        }
      } catch (extraErr: any) {
        console.error("Extra IA generation error:", extraErr);
        toast.warning("Formation OK mais génération des packs IA échouée : " + (extraErr?.message || ""), { id: t });
      }
    } catch (err: any) {
      console.error("AI generation error:", err);
      toast.error(err?.message || "Échec de la génération IA", { id: t });
    } finally {
      setAiLoading(false);
    }
  };

  const handleFormateurSigFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({ ...data, formateurSignatureUrl: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const update = (field: keyof FormationInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleSelectFormation = (index: string) => {
    const selected = SAMPLE_FORMATIONS[parseInt(index)];
    if (selected) {
      onChange({ ...selected });
      // Auto-import stagiaires for Bac Pro Logistique
      if (selected.intitule.includes("Bac Professionnel Logistique") && onImportStagiaires) {
        onImportStagiaires([...STAGIAIRES_BAC_PRO_LOGISTIQUE]);
        toast.success(`9 stagiaires Bac Pro Logistique importés automatiquement`);
      }
      // Auto-import organisme + stagiaires + caches IA pour HAYB FORMATIONS GOTRM et TP GOTRM
      if (selected.intitule.toUpperCase().includes("HAYB") || selected.intitule.toLowerCase().includes("gotrm") || selected.intitule.toLowerCase().includes("gestionnaire des opérations de transport")) {
        const isSessionSeptembre = selected.intitule.toLowerCase().includes("session d'examen septembre");
        if (onApplyOrganisme) {
          onApplyOrganisme({ ...HAYB_FORMATIONS_ORG });
        }
        if (onImportStagiaires) {
          onImportStagiaires(isSessionSeptembre ? [...STAGIAIRES_GOTRM_SEPTEMBRE] : [...STAGIAIRES_HAYB_GOTRM]);
        }
        seedGOTRMAICaches();
        toast.success(isSessionSeptembre
          ? `Organisme HAYB FORMATIONS + 10 candidats session SEPTEMBRE (ECF + DP disponibles dans EDOF) pré-remplis`
          : `Organisme HAYB FORMATIONS + 10 stagiaires GOTRM + contenus IA (besoins, tests, exercices, veille) pré-remplis`);
      }

      // Auto-import organisme + 6 stagiaires pour Maquilleur Professionnel (Maison HSY)
      if (selected.intitule.toLowerCase().includes("maquilleur")) {
        if (onApplyOrganisme) {
          onApplyOrganisme({ ...MAISON_HSY_ORG });
        }
        if (onImportStagiaires) {
          onImportStagiaires([...STAGIAIRES_MAQUILLEUR_PRO]);
        }
        toast.success(`Organisme MAISON HSY BEAUTÉ + 6 stagiaires Maquilleur Pro importés`);
      }
      // Auto-import organisme + 6 stagiaires + pré-remplissage IA pour Gestionnaire de paie
      if (selected.intitule.toLowerCase().includes("gestionnaire de paie")) {
        if (onApplyOrganisme) {
          onApplyOrganisme({ ...PAIE_ORG });
        }
        if (onImportStagiaires) {
          onImportStagiaires([...STAGIAIRES_PAIE]);
        }
        seedPaieAICaches();
        toast.success(`Organisme IZIBUSINESS + 6 stagiaires + contenus IA (besoins, exercices, veilles) pré-remplis`);
      }
      // Auto-import organisme + 6 stagiaires + contenus IA pour Assistant ressources humaines (RNCP35030)
      if (selected.intitule.toLowerCase().includes("ressources humaines") || selected.intitule.toLowerCase().includes("rncp35030") || selected.intitule.toLowerCase().includes("(arh)")) {
        onChange({ ...selected, codeRNCP: "RNCP35030" });
        if (onApplyOrganisme) {
          onApplyOrganisme({ ...ARH_ORG });
        }
        if (onImportStagiaires) {
          onImportStagiaires([...STAGIAIRES_ARH]);
        }
        seedARHAICaches();
        toast.success(`Organisme IZIBUSINESS + 6 stagiaires ARH + contenus IA (besoins, QCM, exercices, veilles) pré-remplis`);
      }
      // Auto-import organisme + apprentis + pré-remplissage IA pour SAMA CFA 420 h (priorité sur "secrétariat" car intitulé contient "Secrétaire assistant médico-administratif")
      const intituleLower = selected.intitule.toLowerCase();
      const isSAMA = intituleLower.includes("médico-administratif") || intituleLower.includes("medico-administratif") || intituleLower.includes("rncp40800") || intituleLower.includes("sama");
      if (isSAMA) {
        onChange({ ...selected, codeRNCP: "RNCP40800" });
        if (onApplyOrganisme) {
          onApplyOrganisme({ ...SAMA_ORG });
        }
        if (onImportStagiaires) {
          onImportStagiaires([...STAGIAIRES_SAMA]);
        }
        seedSAMAAICaches();
        toast.success(`Organisme CFA IZIBUSINESS + 7 apprentis SAMA + contenus IA pré-remplis (RNCP40800)`);
      } else if (intituleLower.includes("secrétariat") || intituleLower.includes("secretariat")) {
        // Auto-import Secrétariat 70 h (générique, exclut SAMA déjà géré ci-dessus)
        if (onApplyOrganisme) {
          onApplyOrganisme({ ...SECRETARIAT_ORG });
        }
        if (onImportStagiaires) {
          onImportStagiaires([...STAGIAIRES_SECRETARIAT]);
        }
        seedSecretariatAICaches();
        toast.success(`Organisme IZIBUSINESS + 6 stagiaires Secrétariat + contenus IA pré-remplis`);
      } else if (
        intituleLower.includes("création de contenus") ||
        intituleLower.includes("creation de contenus") ||
        intituleLower.includes("contenus rédactionnels") ||
        intituleLower.includes("intelligence artificielle générative") ||
        intituleLower.includes("ia générative")
      ) {
        // Auto-import IA générative RS6776
        if (onApplyOrganisme) {
          onApplyOrganisme({ ...IA_GENERATIVE_ORG });
        }
        if (onImportStagiaires) {
          onImportStagiaires([...STAGIAIRES_IA_GENERATIVE]);
        }
        seedIAGenerativeAICaches();
        toast.success(`Organisme IZIBUSINESS + 6 stagiaires IA générative + contenus IA pré-remplis (RS6776)`);
      }
    }
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImporting(true);
    try {
      const buffer = await file.arrayBuffer();
      const sessions = parseEdofXlsx(buffer);
      
      if (sessions.length === 0) {
        toast.error("Aucune formation trouvée dans le fichier");
        return;
      }

      setImportedSessions(sessions);

      if (sessions.length === 1) {
        applySession(sessions[0]);
      } else {
        toast.success(`${sessions.length} formations trouvées – sélectionnez celle à importer`);
      }
    } catch (err) {
      console.error("Import error:", err);
      toast.error("Erreur lors de la lecture du fichier XLSX");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const applySession = (session: EdofSession) => {
    onChange(session.formation);
    if (onImportStagiaires) {
      onImportStagiaires(session.stagiaires);
    }
    toast.success(
      `✅ Formation importée : ${session.formation.intitule.slice(0, 50)}... avec ${session.stagiaires.length} stagiaires`
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Informations de la formation</h2>
        <p className="text-sm text-muted-foreground">Générez tout via IA, choisissez un exemple, importez EDOF, ou remplissez manuellement</p>
      </div>

      {/* AI Generator */}
      <div className="p-5 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-2 border-primary/30 rounded-xl space-y-3">
        <div className="flex items-start gap-2">
          <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div className="flex-1">
            <Label className="font-semibold text-primary text-base">Générateur IA — Formation complète en 1 clic</Label>
            <p className="text-xs text-muted-foreground">
              Donnez juste l'intitulé (et le code RNCP/RS si certification). L'IA remplit tous les champs : objectifs, programme détaillé jour par jour, prérequis, méthodes d'évaluation, moyens pédagogiques, public, durée, tarif… Les exercices, QCM, support de cours, veilles et plan de développement seront ensuite générés automatiquement à partir de ces données.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          <Input
            className="md:col-span-6 bg-card"
            placeholder="Ex: Conducteur VTC, Bac Pro Logistique, Excel avancé…"
            value={aiNom}
            onChange={(e) => setAiNom(e.target.value)}
            disabled={aiLoading}
          />
          <Input
            className="md:col-span-3 bg-card"
            placeholder="RNCP/RS (optionnel)"
            value={aiCodeRNCP}
            onChange={(e) => setAiCodeRNCP(e.target.value.toUpperCase())}
            disabled={aiLoading}
          />
          <Select value={aiModel} onValueChange={setAiModel} disabled={aiLoading}>
            <SelectTrigger className="md:col-span-3 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google/gemini-2.5-flash">Rapide (Flash)</SelectItem>
              <SelectItem value="google/gemini-2.5-pro">Qualité max (Pro)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          onClick={handleAIGenerate}
          disabled={aiLoading || aiNom.trim().length < 3}
          className="w-full gap-2"
          size="lg"
        >
          {aiLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Génération IA en cours…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Générer toute la formation avec l'IA
            </>
          )}
        </Button>
      </div>

      {/* Régénération des veilles cohérentes */}
      <div className="p-4 bg-secondary/30 border-2 border-secondary rounded-xl flex items-center justify-between gap-3">
        <div className="flex-1">
          <Label className="font-semibold">Veilles cohérentes avec la formation</Label>
          <p className="text-xs text-muted-foreground">
            Régénère les 3 tableaux (réglementaire / métier / technologique) parfaitement adaptés à « {data.intitule || "votre formation"} ». Cohérence garantie pour tous les documents IND 23/24/25.
          </p>
        </div>
        <Button
          type="button"
          variant="default"
          onClick={handleRegenerateVeilles}
          disabled={veilleLoading || !data.intitule}
          className="gap-2 shrink-0"
        >
          {veilleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {veilleLoading ? "Génération…" : "Régénérer les veilles"}
        </Button>
      </div>

      {/* Régénération complète du contenu pédagogique IA */}
      <div className="p-4 bg-gradient-to-br from-accent/20 to-primary/10 border-2 border-primary/30 rounded-xl flex items-center justify-between gap-3">
        <div className="flex-1">
          <Label className="font-semibold text-primary">Contenu pédagogique IA (tout-en-un)</Label>
          <p className="text-xs text-muted-foreground">
            Régénère en 1 clic pour « {data.intitule || "votre formation"} » : réponses évaluation des besoins, test de positionnement (début/fin), exercices + corrigés, QCM, support de cours +30 pages avec photos, ressources pédagogiques (vidéos YouTube, livres, sites).
          </p>
        </div>
        <Button
          type="button"
          variant="default"
          onClick={handleRegenerateAllContent}
          disabled={contentLoading || !data.intitule}
          className="gap-2 shrink-0"
          size="lg"
        >
          {contentLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {contentLoading ? "Génération…" : "Tout générer (cours + exos + besoins)"}
        </Button>
      </div>

      {/* Bouton dédié : réponses évaluation des besoins (humanisées) */}
      <div className="p-4 bg-accent/10 border-2 border-accent/40 rounded-xl flex items-center justify-between gap-3">
        <div className="flex-1">
          <Label className="font-semibold">Réponses évaluation des besoins (humanisées)</Label>
          <p className="text-xs text-muted-foreground">
            Régénère uniquement les réponses d'évaluation des besoins pour « {data.intitule || "votre formation"} », avec un ton naturel, oral et personnalisé (comme rédigé par un vrai stagiaire).
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleRegenerateBesoins}
          disabled={besoinsLoading || !data.intitule}
          className="gap-2 shrink-0"
        >
          {besoinsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {besoinsLoading ? "Génération…" : "Générer besoins (humanisés)"}
        </Button>
      </div>

      {/* Bouton dédié : exercices IND 11 */}
      <div className="p-4 bg-accent/10 border-2 border-accent/40 rounded-xl flex items-center justify-between gap-3">
        <div className="flex-1">
          <Label className="font-semibold">Exercices IND 11 (intermédiaires + évaluation finale)</Label>
          <p className="text-xs text-muted-foreground">
            Régénère les exercices pratiques IND 11 pour « {data.intitule || "votre formation"} » : consignes, corrigés, QCM début/fin. Les réponses stagiaires sont humanisées automatiquement.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleRegenerateExosInd11}
          disabled={exosLoading || !data.intitule}
          className="gap-2 shrink-0"
        >
          {exosLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {exosLoading ? "Génération…" : "Générer exercices IND 11"}
        </Button>
      </div>


      {/* Téléchargement du référentiel */}
      <div className="p-4 bg-primary/5 border-2 border-primary/30 rounded-xl flex items-center justify-between gap-3">
        <div className="flex-1">
          <Label className="font-semibold">Référentiel de la formation</Label>
          <p className="text-xs text-muted-foreground">
            Télécharge un fichier HTML du référentiel pour « {data.intitule || "votre formation"} ».
          </p>
        </div>
        <Button
          type="button"
          variant="default"
          onClick={() => {
            const titre = data.intitule || "Formation";
            const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Référentiel - ${titre}</title>
<style>
  body { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; padding: 20px; color: #1a1a1a; }
  h1 { color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px; }
  h2 { color: #1e3a8a; margin-top: 30px; }
  table { width: 100%; border-collapse: collapse; margin: 15px 0; }
  th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; vertical-align: top; }
  th { background: #1e40af; color: white; }
  tr:nth-child(even) { background: #f1f5f9; }
  .meta { background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
</style>
</head>
<body>
  <h1>Référentiel de formation</h1>
  <h2>${titre}</h2>

  <div class="meta">
    <p><strong>Durée :</strong> ${data.duree || "—"}</p>
    <p><strong>Modalités :</strong> ${data.modalites || "—"}</p>
    <p><strong>Public visé :</strong> ${data.publicVise || "—"}</p>
    <p><strong>Prérequis :</strong> ${data.prerequis || "—"}</p>
    <p><strong>Tarif :</strong> ${data.tarif || "—"}</p>
  </div>

  <h2>Objectifs pédagogiques</h2>
  <p>${(data.objectifs || "—").replace(/\n/g, "<br>")}</p>

  <h2>Programme</h2>
  <p>${(data.programme || "—").replace(/\n/g, "<br>")}</p>

  <h2>Méthodes d'évaluation</h2>
  <p>${(data.methodesEvaluation || "—").replace(/\n/g, "<br>")}</p>

  <h2>Moyens pédagogiques</h2>
  <p>${(data.moyensPedagogiques || "—").replace(/\n/g, "<br>")}</p>

  <h2>Délai d'accès</h2>
  <p>${data.delaiAcces || "—"}</p>
</body>
</html>`;
            const blob = new Blob([html], { type: "text/html;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Referentiel - ${titre}.html`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success("Référentiel téléchargé");
          }}
          disabled={!data.intitule}
          className="gap-2 shrink-0"
        >
          <FileDown className="w-4 h-4" />
          Télécharger référentiel
        </Button>
      </div>
      {/* EDOF / CPF Import */}
      <div className="p-4 bg-accent/30 border-2 border-accent rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-semibold text-primary">Importer un fichier EDOF ou CPF</Label>
            <p className="text-xs text-muted-foreground">Import automatique des stagiaires, dates, tarifs depuis votre export EDOF ou CPF (Bilan de compétences, .xlsx)</p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFileImport}
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
            >
              <Upload className="w-4 h-4" />
              {importing ? "Import en cours..." : "Charger un fichier XLSX"}
            </Button>
          </div>
        </div>

        {/* Session selector when multiple formations found */}
        {importedSessions.length > 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-primary">{importedSessions.length} formations trouvées :</p>
            {importedSessions.map((session, i) => (
              <button
                key={i}
                onClick={() => applySession(session)}
                className="w-full text-left p-3 rounded-lg border bg-card hover:bg-primary/5 hover:border-primary/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-medium text-sm">{session.formation.intitule}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({session.stagiaires.length} stagiaires • {session.formation.dateDebut} → {session.formation.dateFin} • {session.formation.tarif})
                  </span>
                </div>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">✓</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Formation selector dropdown */}
      <div className="p-4 bg-primary/5 border-2 border-primary/20 rounded-xl">
        <Label htmlFor="formation-select" className="font-semibold text-primary">Choisir une formation exemple</Label>
        <p className="text-xs text-muted-foreground mb-2">Tous les documents du dossier seront générés uniquement pour cette formation.</p>
        <Select onValueChange={handleSelectFormation}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Sélectionner une formation..." />
          </SelectTrigger>
          <SelectContent>
            {SAMPLE_FORMATIONS.map((f, i) => (
              <SelectItem key={i} value={String(i)}>{f.intitule}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* RNCP Code Selector */}
      <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl">
        <Label className="font-semibold text-orange-700 dark:text-orange-400">Code RNCP (certification)</Label>
        <p className="text-xs text-muted-foreground mb-2">Sélectionnez un titre RNCP pour générer automatiquement la Fiche Titre RNCP, la Matière et le Tableau croisé.</p>
        <div className="flex gap-2">
          <Select
            value={data.codeRNCP || ""}
            onValueChange={(val) => {
              if (val === "__custom__") return;
              update("codeRNCP", val);
              const fiche = RNCP_FICHES.find(f => f.code === val);
              if (fiche) {
                toast.success(`Fiche RNCP ${fiche.code} – ${fiche.intitule} sélectionnée`);
              }
            }}
          >
            <SelectTrigger className="bg-card flex-1">
              <SelectValue placeholder="Choisir un titre RNCP..." />
            </SelectTrigger>
            <SelectContent>
              {RNCP_FICHES.map((f) => (
                <SelectItem key={f.code} value={f.code}>
                  {f.code} – {f.intitule}
                </SelectItem>
              ))}
              <SelectItem value="__custom__" disabled className="text-muted-foreground italic">
                ── ou saisissez un code ci-dessous ──
              </SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="w-40 bg-card"
            placeholder="Ex: RNCP12345"
            value={data.codeRNCP || ""}
            onChange={e => update("codeRNCP", e.target.value.toUpperCase())}
          />
        </div>
        {data.codeRNCP && (
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
            Code sélectionné : <strong>{data.codeRNCP}</strong>
            {RNCP_FICHES.find(f => f.code === data.codeRNCP)
              ? ` – ${RNCP_FICHES.find(f => f.code === data.codeRNCP)!.intitule}`
              : " (code personnalisé)"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="intitule">Intitulé de la formation *</Label>
          <Input id="intitule" value={data.intitule} onChange={e => {
            const val = e.target.value;
            const low = val.toLowerCase();
            const isSAMA = low.includes("médico-administratif") || low.includes("medico-administratif") || low.includes("sama");
            if (isSAMA && !data.codeRNCP) {
              onChange({ ...data, intitule: val, codeRNCP: "RNCP40800" });
            } else {
              update('intitule', val);
            }
          }} placeholder="Ex: Formation Management d'équipe" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="objectifs">Objectifs pédagogiques *</Label>
          <Textarea id="objectifs" value={data.objectifs} onChange={e => update('objectifs', e.target.value)} placeholder="À l'issue de la formation, le stagiaire sera capable de..." rows={3} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="prerequis">Prérequis</Label>
          <Textarea id="prerequis" value={data.prerequis} onChange={e => update('prerequis', e.target.value)} placeholder="Ex: Aucun prérequis ou expérience de 2 ans..." rows={2} />
        </div>
        <div>
          <Label htmlFor="duree">Durée *</Label>
          <Input id="duree" value={data.duree} onChange={e => update('duree', e.target.value)} placeholder="Ex: 14 heures (2 jours)" />
        </div>
        <div>
          <Label htmlFor="modalites">Modalités</Label>
          <Select value={data.modalites} onValueChange={v => update('modalites', v)}>
            <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="presentiel">Présentiel</SelectItem>
              <SelectItem value="distanciel">Distanciel</SelectItem>
              <SelectItem value="mixte">Mixte</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tarif">Tarif</Label>
          <Input id="tarif" value={data.tarif} onChange={e => update('tarif', e.target.value)} placeholder="Ex: 1 200 € HT" />
        </div>
        <div>
          <Label htmlFor="delaiAcces">Délai d'accès</Label>
          <Input id="delaiAcces" value={data.delaiAcces} onChange={e => update('delaiAcces', e.target.value)} placeholder="Ex: 15 jours avant le début" />
        </div>
        <div>
          <Label htmlFor="dateDebut">Date de début</Label>
          <Input id="dateDebut" type="date" value={data.dateDebut} onChange={e => update('dateDebut', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="dateFin">Date de fin</Label>
          <Input id="dateFin" type="date" value={data.dateFin} onChange={e => update('dateFin', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="lieu">Lieu</Label>
          <Input id="lieu" value={data.lieu} onChange={e => update('lieu', e.target.value)} placeholder="Ex: 12 rue de la Formation, Paris" />
        </div>
        <div>
          <Label htmlFor="nombreParticipants">Nombre de participants</Label>
          <Input id="nombreParticipants" value={data.nombreParticipants} onChange={e => update('nombreParticipants', e.target.value)} placeholder="Ex: 8" />
        </div>
        <div>
          <Label htmlFor="formateur">Formateur</Label>
          <Input id="formateur" value={data.formateur} onChange={e => update('formateur', e.target.value)} placeholder="Nom du formateur" />
        </div>
        <div>
          <Label htmlFor="publicVise">Public visé</Label>
          <Input id="publicVise" value={data.publicVise} onChange={e => update('publicVise', e.target.value)} placeholder="Ex: Managers, chefs d'équipe" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="programme">Programme détaillé *</Label>
          <Textarea id="programme" value={data.programme} onChange={e => update('programme', e.target.value)} placeholder="Jour 1 : Introduction au management..." rows={5} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="moyensPedagogiques">Moyens pédagogiques</Label>
          <Textarea id="moyensPedagogiques" value={data.moyensPedagogiques} onChange={e => update('moyensPedagogiques', e.target.value)} placeholder="Ex: Supports de cours, vidéoprojecteur, exercices pratiques..." rows={2} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="rythmeAlternance">Rythme d'alternance (CFA)</Label>
          <Input id="rythmeAlternance" value={data.rythmeAlternance || ''} onChange={e => update('rythmeAlternance', e.target.value)} placeholder="Ex: 1 semaine CFA / 3 semaines entreprise" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="methodesEvaluation">Méthodes d'évaluation</Label>
          <Textarea id="methodesEvaluation" value={data.methodesEvaluation} onChange={e => update('methodesEvaluation', e.target.value)} placeholder="Ex: QCM, mise en situation, étude de cas..." rows={2} />
        </div>
        <div className="md:col-span-2">
          <Label>Signature du formateur</Label>
          <div className="flex items-center gap-4 mt-1">
            {data.formateurSignatureUrl ? (
              <div className="relative">
                <img src={data.formateurSignatureUrl} alt="Signature formateur" className="h-16 border rounded p-1" />
                <button type="button" onClick={() => onChange({ ...data, formateurSignatureUrl: '' })} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
              </div>
            ) : null}
            <Button type="button" variant="outline" size="sm" onClick={() => formateurSigRef.current?.click()}>
              <Upload className="w-4 h-4 mr-1" /> Importer signature
            </Button>
            <input ref={formateurSigRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFormateurSigFile(e.target.files[0]); }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationForm;
