import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useActivityLogger } from "@/hooks/useActivityLogger";
import { useAuth } from "@/hooks/useAuth";

const ROUTE_LABELS: Record<string, string> = {
  "/": "Accueil",
  "/controle-ey": "Contrôle EY / EDOF",
  "/demande-nda": "Demande NDA",
  "/generateur-cv": "Générateur CV",
  "/generateur-tampon": "Générateur Tampon",
  "/opco-mobilites": "OPCO Mobilités",
  "/musee": "Musée dossiers",
  "/audit-live": "Audit Qualiopi Live",
  "/vae": "VAE",
  "/admin": "Tableau de bord admin",
};

/**
 * Trace chaque navigation authentifiée dans activity_logs.
 * Monté une seule fois au niveau App.
 */
export function RouteActivityTracker() {
  const location = useLocation();
  const { user } = useAuth();
  const { logActivity } = useActivityLogger();
  const lastRef = useRef<string>("");

  useEffect(() => {
    if (!user) return;
    const key = location.pathname;
    if (lastRef.current === key) return;
    lastRef.current = key;
    const label = ROUTE_LABELS[key] ?? key;
    logActivity("page_view", `Ouverture : ${label}`, { path: key });
  }, [location.pathname, user, logActivity]);

  return null;
}
