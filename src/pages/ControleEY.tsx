import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES, DocStyleConfig, DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import OrganismeForm from "@/components/OrganismeForm";
import FormationForm from "@/components/FormationForm";
import StagiairesForm from "@/components/StagiairesForm";
import DocStyleConfigPanel from "@/components/DocStyleConfigPanel";
import ControleEDOF from "@/components/ControleEDOF";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogIn, LogOut, ChevronDown, ChevronRight, Building2, GraduationCap, Users, Palette } from "lucide-react";
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

  // Collapsible sections
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section); else next.add(section);
      return next;
    });
  };

  const handleOrgChange = useCallback((data: OrganismeInfo) => {
    setOrganisme(data);
    sessionStorage.setItem('qualiopi_org', JSON.stringify(data));
  }, []);

  const handleFormChange = useCallback((data: FormationInfo) => {
    setFormation(data);
    sessionStorage.setItem('qualiopi_form', JSON.stringify(data));
  }, []);

  const handleStagChange = useCallback((data: StagiaireInfo[]) => {
    setStagiaires(data);
    sessionStorage.setItem('qualiopi_stag', JSON.stringify(data));
  }, []);

  const sections = [
    { key: "organisme", label: "Organisme", icon: <Building2 className="w-4 h-4" />, filled: !!organisme.nom },
    { key: "formation", label: "Formation", icon: <GraduationCap className="w-4 h-4" />, filled: !!formation.intitule },
    { key: "stagiaires", label: "Stagiaires", icon: <Users className="w-4 h-4" />, count: stagiaires.length },
  ];

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

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Collapsible data forms */}
        {sections.map(({ key, label, icon, filled, count }) => (
          <div key={key} className="border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection(key)}
              className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                {openSections.has(key) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                {icon}
                <span className="font-semibold">{label}</span>
                {count !== undefined && (
                  <span className="text-xs text-muted-foreground">({count})</span>
                )}
                {filled && (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Rempli</span>
                )}
              </div>
            </button>
            {openSections.has(key) && (
              <div className="p-4 border-t bg-background">
                {key === "organisme" && <OrganismeForm data={organisme} onChange={handleOrgChange} />}
                {key === "formation" && (
                  <FormationForm
                    data={formation}
                    onChange={handleFormChange}
                    onImportStagiaires={handleStagChange}
                  />
                )}
                {key === "stagiaires" && <StagiairesForm data={stagiaires} onChange={handleStagChange} />}
              </div>
            )}
          </div>
        ))}

        {/* Checklist */}
        <ControleEDOF organisme={organisme} formation={formation} stagiaires={stagiaires} criteres={criteres} />
      </main>
    </div>
  );
};

export default ControleEY;
