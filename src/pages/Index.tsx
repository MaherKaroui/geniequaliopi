import { appliquerIndicateursAuto } from "@/lib/indicateursResultats";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES } from "@/types/qualiopi";
import StepIndicator from "@/components/StepIndicator";
import OrganismeForm from "@/components/OrganismeForm";
import FormationForm from "@/components/FormationForm";
import StagiairesForm from "@/components/StagiairesForm";
import CriteresForm from "@/components/CriteresForm";
import DocumentGenerator from "@/components/DocumentGenerator";
import DossierHistory from "@/components/DossierHistory";
import Accueil from "@/components/Accueil";
import { EVT_ECRAN, type DemandeEcran } from "@/lib/outilsAccueil";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LogIn, LogOut, FileSpreadsheet, Upload, Loader2, ShieldCheck, Zap } from "lucide-react";
import BrandingAutoModal from "@/components/BrandingAutoModal";
import LogoGenie from "@/components/LogoGenie";
import MyCertifModal from "@/components/MyCertifModal";
import { exportFormDataToExcel } from "@/lib/exportFormData";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STEPS = [
  { id: 1, label: "Organisme" },
  { id: 2, label: "Formation" },
  { id: 3, label: "Stagiaires" },
  { id: 4, label: "Critères" },
  { id: 5, label: "Dossier" },
];

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", relationEntreprises: "", referentMobilite: "",
  domainesFormation: "", typesActions: [], certifications: "", outilsUtilises: "",
  version: "1", dateMaj: new Date().toISOString().slice(0, 10)
};

const emptyFormation: FormationInfo = {
  intitule: "", objectifs: "", prerequis: "", duree: "", modalites: "", tarif: "",
  programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "",
  delaiAcces: "", dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "", formateur: "",
  rythmeAlternance: ""
};

const Index = () => {
  const { user, signOut } = useAuth();
  const { isSuperAdmin } = useUserRole();
  const navigate = useNavigate();
  const [airtableLoading, setAirtableLoading] = useState(false);
  const [brandingOpen, setBrandingOpen] = useState(false);
  const [myCertifOpen, setMyCertifOpen] = useState(false);
  /** Dossier choisi dans « Reprendre un dossier » de l'accueil, ouvert par l'historique une fois chargé. */
  const [ouvrirId, setOuvrirId] = useState<string | null>(null);

  const getAirtableErrorMessage = (payload: any) => {
    if (!payload) return "Erreur Airtable inconnue";
    if (typeof payload.error === "string" && payload.error.trim()) return payload.error;

    const messages = Object.entries(payload.results ?? {}).flatMap(([key, value]) => {
      if (!value || typeof value !== "object") return [];
      if (!("error" in value) || !value.error) return [];
      return [`${key}: ${typeof value.error === "string" ? value.error : JSON.stringify(value.error)}`];
    });

    return messages.length > 0 ? messages.join(" | ") : "Erreur Airtable inconnue";
  };

  const syncToAirtable = async () => {
    setAirtableLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('airtable-sync', {
        body: { organisme, formation, stagiaires },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(getAirtableErrorMessage(data));

      toast.success("Données synchronisées vers Airtable !");
    } catch (err: any) {
      console.error('Airtable sync error:', err);
      toast.error("Erreur Airtable : " + (err.message || 'Erreur inconnue'));
    } finally {
      setAirtableLoading(false);
    }
  };

  // Emergency reset via ?reset query param
  const shouldReset = new URLSearchParams(window.location.search).has('reset');
  if (shouldReset) {
    sessionStorage.removeItem('qualiopi_step');
    sessionStorage.removeItem('qualiopi_org');
    sessionStorage.removeItem('qualiopi_form');
    sessionStorage.removeItem('qualiopi_stag');
    sessionStorage.removeItem('qualiopi_crit');
    sessionStorage.removeItem('qualiopi_started');
    window.history.replaceState({}, '', '/');
  }

  const [currentStep, setCurrentStep] = useState(() => {
    if (shouldReset) return 1;
    const saved = sessionStorage.getItem('qualiopi_step');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [organisme, setOrganisme] = useState<OrganismeInfo>(() => {
    if (shouldReset) return emptyOrganisme;
    try { const s = sessionStorage.getItem('qualiopi_org'); return s ? JSON.parse(s) : emptyOrganisme; } catch { return emptyOrganisme; }
  });
  const [formation, setFormation] = useState<FormationInfo>(() => {
    if (shouldReset) return emptyFormation;
    try { const s = sessionStorage.getItem('qualiopi_form'); return s ? JSON.parse(s) : emptyFormation; } catch { return emptyFormation; }
  });
  const [stagiaires, setStagiaires] = useState<StagiaireInfo[]>(() => {
    if (shouldReset) return [];
    try { const s = sessionStorage.getItem('qualiopi_stag'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [criteres, setCriteres] = useState<CritereData[]>(() => {
    if (shouldReset) return JSON.parse(JSON.stringify(CRITERES));
    try { const s = sessionStorage.getItem('qualiopi_crit'); return s ? JSON.parse(s) : JSON.parse(JSON.stringify(CRITERES)); } catch { return JSON.parse(JSON.stringify(CRITERES)); }
  });
  const [started, setStarted] = useState(() => shouldReset ? false : sessionStorage.getItem('qualiopi_started') === '1');

  const updateStarted = (v: boolean | ((prev: boolean) => boolean)) => {
    setStarted(prev => { const next = typeof v === 'function' ? v(prev) : v; sessionStorage.setItem('qualiopi_started', next ? '1' : '0'); return next; });
  };
  const updateStep = (v: number | ((prev: number) => number)) => {
    setCurrentStep(prev => { const next = typeof v === 'function' ? v(prev) : v; sessionStorage.setItem('qualiopi_step', String(next)); return next; });
  };
  const updateOrganisme = (v: OrganismeInfo) => { setOrganisme(v); sessionStorage.setItem('qualiopi_org', JSON.stringify(v)); };
  const updateFormation = (v: FormationInfo) => { setFormation(v); sessionStorage.setItem('qualiopi_form', JSON.stringify(v)); };
  const updateStagiaires = (v: StagiaireInfo[]) => { setStagiaires(v); sessionStorage.setItem('qualiopi_stag', JSON.stringify(v)); };
  const updateCriteres = (v: CritereData[]) => { setCriteres(v); sessionStorage.setItem('qualiopi_crit', JSON.stringify(v)); };

  // Indicateurs de résultats (critère 1) remplis automatiquement depuis les dates et les stagiaires.
  useEffect(() => {
    const maj = appliquerIndicateursAuto(formation, stagiaires);
    if (maj) updateFormation(maj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formation, stagiaires]);

  // Menu de l'espace de travail : « Tableau de bord » ou « Préparer dossier Qualiopi » alors que cette page est déjà affichée.
  useEffect(() => {
    const surDemande = (e: Event) => {
      const { parcours, etape } = (e as CustomEvent<DemandeEcran>).detail;
      if (etape) updateStep(etape);
      updateStarted(parcours);
    };
    window.addEventListener(EVT_ECRAN, surDemande);
    return () => window.removeEventListener(EVT_ECRAN, surDemande);
  }, []);

  const handleLoadDossier = (org: OrganismeInfo, form: FormationInfo, stag: StagiaireInfo[]) => {
    updateOrganisme(org);
    updateFormation(form);
    updateStagiaires(stag);
    updateStep(1);
  };

  if (!started) {
    return (
      <Accueil
        user={user}
        isSuperAdmin={isSuperAdmin}
        onSignOut={signOut}
        onNavigate={navigate}
        onPreparer={(etape) => { if (etape) updateStep(etape); updateStarted(true); }}
        onOuvrirDossier={(id) => { setOuvrirId(id); updateStarted(true); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => updateStarted(false)} aria-label="Génie Qualiopi — accueil"><LogoGenie /></button>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground hidden sm:inline">{user.email}</span>
                {isSuperAdmin && (
                  <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className="gap-1">
                    <ShieldCheck className="w-4 h-4" /> Admin
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={signOut} title="Déconnexion"><LogOut className="w-4 h-4" /></Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")} className="gap-1">
                <LogIn className="w-4 h-4" /> Connexion
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => exportFormDataToExcel(organisme, formation, stagiaires)} className="gap-1">
              <FileSpreadsheet className="w-4 h-4" /> Export Excel
            </Button>
            <Button variant="outline" size="sm" onClick={syncToAirtable} disabled={airtableLoading} className="gap-1">
              {airtableLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {airtableLoading ? 'Envoi...' : 'Airtable'}
            </Button>
            {/* Archivé : MyCertif */}
            <Button variant="outline" size="sm" onClick={() => navigate("/rapide")} className="gap-1">
              <Zap className="w-4 h-4" /> Rapide
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/audit-live")} className="gap-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              <ShieldCheck className="w-4 h-4" /> Audit live
            </Button>
            <Button variant="ghost" size="sm" onClick={() => updateStarted(false)}>Accueil</Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* History panel (only if logged in) */}
        {user && (
          <DossierHistory
            userId={user.id}
            organisme={organisme}
            formation={formation}
            stagiaires={stagiaires}
            onLoad={handleLoadDossier}
            ouvrirId={ouvrirId}
            onOuvert={() => setOuvrirId(null)}
          />
        )}

        <StepIndicator steps={STEPS} currentStep={currentStep} onStepClick={updateStep} />

        <div className="bg-card rounded-2xl border shadow-card p-6 md:p-8">
          {currentStep === 1 && <OrganismeForm data={organisme} onChange={updateOrganisme} />}
          {currentStep === 2 && <FormationForm data={formation} onChange={updateFormation} onImportStagiaires={updateStagiaires} stagiaires={stagiaires} />}
          {currentStep === 3 && <StagiairesForm data={stagiaires} onChange={updateStagiaires} formation={formation} typesActions={organisme.typesActions} />}
          {currentStep === 4 && <CriteresForm data={criteres} onChange={updateCriteres} />}
          {currentStep === 5 && <DocumentGenerator organisme={organisme} formation={formation} stagiaires={stagiaires} criteres={criteres} onOrganismeChange={updateOrganisme} />}
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => updateStep(s => Math.max(1, s - 1))} disabled={currentStep === 1} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Précédent
          </Button>
          <Button onClick={() => updateStep(s => Math.min(5, s + 1))} disabled={currentStep === 5} className="gap-2">
            Suivant <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
      <BrandingAutoModal open={brandingOpen} onOpenChange={setBrandingOpen} organisme={organisme} />
      <MyCertifModal open={myCertifOpen} onOpenChange={setMyCertifOpen} />
    </div>
  );
};

export default Index;
