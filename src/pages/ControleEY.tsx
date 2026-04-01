import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES } from "@/types/qualiopi";
import ControleEDOF from "@/components/ControleEDOF";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", domainesFormation: "", typesActions: [], certifications: "", outilsUtilises: "",
  version: "1", dateMaj: new Date().toISOString().slice(0, 10)
};

const emptyFormation: FormationInfo = {
  intitule: "", objectifs: "", prerequis: "", duree: "", modalites: "", tarif: "",
  programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "",
  delaiAcces: "", dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "", formateur: "",
  rythmeAlternance: ""
};

const ControleEY = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [organisme, setOrganisme] = useState<OrganismeInfo>(() => {
    try { const s = sessionStorage.getItem('qualiopi_org'); return s ? JSON.parse(s) : emptyOrganisme; } catch { return emptyOrganisme; }
  });
  const [formation, setFormation] = useState<FormationInfo>(() => {
    try { const s = sessionStorage.getItem('qualiopi_form'); return s ? JSON.parse(s) : emptyFormation; } catch { return emptyFormation; }
  });
  const [stagiaires, setStagiaires] = useState<StagiaireInfo[]>(() => {
    try { const s = sessionStorage.getItem('qualiopi_stag'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [criteres] = useState<CritereData[]>(() => {
    try { const s = sessionStorage.getItem('qualiopi_crit'); return s ? JSON.parse(s) : JSON.parse(JSON.stringify(CRITERES)); } catch { return JSON.parse(JSON.stringify(CRITERES)); }
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
              <ChevronLeft className="w-4 h-4" /> Accueil
            </Button>
            <span className="font-bold text-lg">Contrôle EDOF / EY</span>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground hidden sm:inline">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={signOut} title="Déconnexion"><LogOut className="w-4 h-4" /></Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")} className="gap-1">
                <LogIn className="w-4 h-4" /> Connexion
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <ControleEDOF organisme={organisme} formation={formation} stagiaires={stagiaires} criteres={criteres} />
      </main>
    </div>
  );
};

export default ControleEY;
