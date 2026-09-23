import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home, GraduationCap } from "lucide-react";
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

export default function VAEPage() {
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
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Génération VAE</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1"><Home className="w-4 h-4" /> Accueil</Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <DossierOutputSettings
          organisme={{ nom: organisme.nom, siret: organisme.siret, dateMaj: organisme.dateMaj }}
          scope="vae"
          compact
        />
        {user && (
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
        <StepIndicator steps={STEPS} currentStep={step} onStepClick={setStep} />
        <div className="bg-card rounded-2xl border shadow-card p-6 md:p-8">
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
          <Button onClick={() => setStep(s => Math.min(5, s + 1))} disabled={step === 5} className="gap-2">
            Suivant <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
