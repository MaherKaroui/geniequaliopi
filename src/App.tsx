import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import GOTRMPage from "./pages/GOTRM";
import MuseeDossier from "./pages/MuseeDossier";
import QualiopiCheck from "./pages/QualiopiCheck";
import VAEPage from "./pages/VAE";
import NotFound from "./pages/NotFound";
import SophieChat from "./components/SophieChat";
import Admin from "./pages/Admin";
import { RouteActivityTracker } from "./components/RouteActivityTracker";
import AccessGate from "./components/AccessGate";
import { installActivityTracker } from "./lib/activityTracker";

installActivityTracker();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
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
          <Route path="/rapide" element={<GenerationRapide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SophieChat />
        </BackgroundJobsProvider>
        </AccessGate>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
