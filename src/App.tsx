import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ControleEY from "./pages/ControleEY";
import DemandeNDA from "./pages/DemandeNDA";
import GenerateurCV from "./pages/GenerateurCV";
import GenerateurTampon from "./pages/GenerateurTampon";
import OPCOMobilites from "./pages/OPCOMobilites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/controle-ey" element={<ControleEY />} />
          <Route path="/demande-nda" element={<DemandeNDA />} />
          <Route path="/generateur-cv" element={<GenerateurCV />} />
          <Route path="/generateur-tampon" element={<GenerateurTampon />} />
          <Route path="/opco-mobilites" element={<OPCOMobilites />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
