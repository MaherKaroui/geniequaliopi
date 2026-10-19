import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home, GraduationCap, Check, Settings2 } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import StepOrganisme from "@/components/vae/StepOrganisme";
import StepCertification from "@/components/vae/StepCertification";
import StepCandidat from "@/components/vae/StepCandidat";
import StepSession from "@/components/vae/StepSession";
import StepGeneration from "@/components/vae/StepGeneration";
import VAEDossierHistory from "@/components/vae/VAEDossierHistory";
import { useAuth } from "@/hooks/useAuth";
import {
  DEFAULT_ORGANISME, EMPTY_CERTIFICATION, EMPTY_CANDIDAT, EMPTY_SESSION, EMPTY_CONTENTS,
  type VAEOrganisme, type VAECertification, type VAECandidat, type VAESession, type VAEContents, type VAEData,
} from "@/lib/vae/vaeTypes";
import DossierOutputSettings from "@/components/DossierOutputSettings";

const STEPS = [
  { id: 1, label: "Organisme" },
  { id: 2, label: "Candidat / CV" },
  { id: 3, label: "Certification" },
  { id: 4, label: "Session" },
  { id: 5, label: "Génération" },
];

const ORG_KEY = "vae_organisme";

export default function VAEPage({ embedded = false }: { embedded?: boolean }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [organisme, setOrganisme] = useState<VAEOrganisme>(() => {
    try { const s = localStorage.getItem(ORG_KEY); return s ? JSON.parse(s) : DEFAULT_ORGANISME; } catch { return DEFAULT_ORGANISME; }
  });
  const [certification, setCertification] = useState<VAECertification>(EMPTY_CERTIFICATION);
  const [candidat, setCandidat] = useState<VAECandidat>(EMPTY_CANDIDAT);
  const [session, setSession] = useState<VAESession>(EMPTY_SESSION);
  const [contents, setContents] = useState<VAEContents>(EMPTY_CONTENTS);

  useEffect(() => { localStorage.setItem(ORG_KEY, JSON.stringify(organisme)); }, [organisme]);

  const data: VAEData = { organisme, certification, candidat, session, contents };

  return (
    <div className={`${embedded ? "vae-embedded " : ""}min-h-screen bg-background text-foreground`}>
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">{embedded ? "VAE Génie Qualiopi" : "Génération VAE"}</span>
          </div>
          {!embedded && <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1"><Home className="w-4 h-4" /> Accueil</Button>}
        </div>
      </header>

      <main className={`max-w-5xl mx-auto px-4 ${embedded ? "py-5 sm:px-6" : "py-8"}`}>
        {embedded ? (
          <details className="mb-5 border-b pb-3">
            <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground"><Settings2 className="h-4 w-4" /> Qualité et design du dossier</summary>
            <div className="pt-3"><DossierOutputSettings organisme={{ nom: organisme.nom, siret: organisme.siret, dateMaj: "" }} scope="vae" compact /></div>
          </details>
        ) : (
        <DossierOutputSettings
          organisme={{ nom: organisme.nom, siret: organisme.siret, dateMaj: "" }}
          scope="vae"
          compact
        />
        )}
        {!embedded && user && (
          <VAEDossierHistory
            userId={user.id}
            organisme={organisme}
            certification={certification}
            candidat={candidat}
            session={session}
            contents={contents}
            onLoad={(o, c, ca, s, co) => { setOrganisme(o); setCertification(c); setCandidat(ca); setSession(s); setContents(co); }}
          />
        )}
        {embedded ? (
          <nav aria-label="Étapes VAE" className="mb-6 grid grid-cols-5 gap-1 rounded-lg bg-secondary p-1">
            {STEPS.map(item => (
              <Button key={item.id} variant="ghost" onClick={() => setStep(item.id)} aria-current={step === item.id ? "step" : undefined} aria-label={item.label} className={`h-auto min-h-12 min-w-0 flex-col gap-1 px-1 py-2 text-xs sm:flex-row sm:gap-2 ${step === item.id ? "bg-accent text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground" : "text-muted-foreground"}`}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current/20">{step > item.id ? <Check className="h-3 w-3" /> : item.id}</span>
                <span className="hidden whitespace-normal sm:inline">{item.label}</span>
              </Button>
            ))}
          </nav>
        ) : <StepIndicator steps={STEPS} currentStep={step} onStepClick={setStep} />}
        <div className={embedded ? "vae-step py-2" : "bg-card rounded-2xl border shadow-card p-6 md:p-8"}>
          {step === 1 && <StepOrganisme data={organisme} onChange={setOrganisme} />}
          {step === 2 && <StepCandidat data={candidat} onChange={setCandidat} certification={certification} />}
          {step === 3 && <StepCertification data={certification} onChange={setCertification} candidat={candidat} />}
          {step === 4 && <StepSession data={session} onChange={setSession} />}
          {step === 5 && <StepGeneration data={data} onContentsChange={setContents} />}
        </div>
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Précédent
          </Button>
          <Button onClick={() => setStep(s => Math.min(5, s + 1))} disabled={step === 5} className={`gap-2 ${embedded ? "bg-accent text-accent-foreground hover:bg-accent/80" : ""}`}>
            Suivant <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
