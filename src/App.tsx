import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { BackgroundJobsProvider } from "@/lib/backgroundJobs";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ControleEY from "./pages/ControleEY";
import DemandeNDA from "./pages/DemandeNDA";
import GenerateurCV from "./pages/GenerateurCV";
import GenerateurTampon from "./pages/GenerateurTampon";
import GenerateurLogo from "./pages/GenerateurLogo";
import OPCOMobilites from "./pages/OPCOMobilites";
import GenerationRapide from "./pages/GenerationRapide";
import AnalyseBPF from "./pages/AnalyseBPF";
import GOTRMPage from "./pages/GOTRM";
import MuseeDossier from "./pages/MuseeDossier";
import QualiopiCheck from "./pages/QualiopiCheck";
import VAEPage from "./pages/VAE";
import BilanCompetences from "./pages/BilanCompetences";
import NotFound from "./pages/NotFound";
import SophieChat from "./components/SophieChat";
import Admin from "./pages/Admin";
import { RouteActivityTracker } from "./components/RouteActivityTracker";
import AccessGate from "./components/AccessGate";
import { installActivityTracker } from "./lib/activityTracker";
import { isEmbeddedVAE } from "./lib/vae/embedMode";
import { isEmbeddedBDC } from "./lib/bdc/embedMode";
import FormationPresetLoader from "./components/FormationPresetLoader";
import EspaceIzilearn from "./pages/EspaceIzilearn";

installActivityTracker();

const queryClient = new QueryClient();

const ApplicationContent = () => {
  const location = useLocation();
  // Espace IZILearn : accessible par lien, sans code d'accès ; ses données viennent d'IZILearn.
  if (location.pathname === "/izilearn") return <EspaceIzilearn />;
  // Espace CRM LMS : même espace, données envoyées par la fiche session de CRM LMS.
  if (location.pathname === "/crmlms") return <EspaceIzilearn app="crmlms" />;
  if (isEmbeddedBDC(location.pathname, location.search)) {
    return <BackgroundJobsProvider><BilanCompetences embedded /></BackgroundJobsProvider>;
  }
  if (isEmbeddedVAE(location.pathname, location.search)) {
    return (
      <BackgroundJobsProvider>
        <VAEPage embedded />
      </BackgroundJobsProvider>
    );
  }

  return (
        <AccessGate>
        <BackgroundJobsProvider>
        <RouteActivityTracker />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/controle-ey" element={<ControleEY />} />
          <Route path="/demande-nda" element={<DemandeNDA />} />
          <Route path="/generateur-cv" element={<GenerateurCV />} />
          <Route path="/generateur-tampon" element={<GenerateurTampon />} />
          <Route path="/generateur-logo" element={<GenerateurLogo />} />
          <Route path="/opco-mobilites" element={<OPCOMobilites />} />
          <Route path="/gotrm" element={<GOTRMPage />} />
          <Route path="/musee" element={<MuseeDossier />} />
          <Route path="/audit-live" element={<QualiopiCheck />} />
          <Route path="/vae" element={<VAEPage />} />
          <Route path="/bilan-competences" element={<BilanCompetences />} />
          <Route path="/rapide" element={<GenerationRapide />} />
          <Route path="/analyse-bpf" element={<AnalyseBPF />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SophieChat />
        </BackgroundJobsProvider>
        </AccessGate>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <FormationPresetLoader />
      <BrowserRouter>
        <ApplicationContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
