import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3, Building2, CalendarDays, FileBadge, FileCheck, FileSearch, FolderCheck, Globe, GraduationCap,
  LayoutDashboard, LayoutGrid, Mail, PanelLeft, ShieldCheck, Sparkles, Stamp, Truck, UserCircle, Workflow, Zap,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Outils de l'application, rangés par famille (accueil, recherche Ctrl K, menu de l'espace de travail)
// ---------------------------------------------------------------------------
/** Un outil de l'accueil : une page de l'application (`route`), un autre site (`url`) ou le parcours en 5 étapes. */
export interface Outil {
  label: string;
  description: string;
  icon: LucideIcon;
  route?: string;
  url?: string;
  action?: "preparer";
}

export interface Famille {
  titre: string;
  sousTitre: string;
  icon: LucideIcon;
  /** Dégradé de la pastille d'icône. */
  couleur: string;
  outils: Outil[];
}

export const FAMILLES: Famille[] = [
  {
    titre: "Dossiers Qualiopi", sousTitre: "AF, CFA, VAE, BC", icon: FolderCheck,
    couleur: "from-blue-500 to-blue-800",
    outils: [
      { label: "Préparer dossier Qualiopi", description: "5 étapes, de l'organisme aux documents", icon: FolderCheck, action: "preparer" },
      { label: "Génération rapide", description: "Un dossier complet en quelques minutes", icon: Zap, route: "/rapide" },
      { label: "Génération VAE", description: "Accompagnement à la VAE", icon: GraduationCap, route: "/vae" },
      { label: "Bilan de compétences", description: "Dossier BC complet", icon: FileCheck, route: "/bilan-competences" },
    ],
  },
  {
    titre: "EDOF et financeurs", sousTitre: "CPF, OPCO, BPF", icon: Workflow,
    couleur: "from-amber-400 to-orange-700",
    outils: [
      { label: "Automatisation EDOF", description: "Pièces depuis l'export EDOF", icon: Workflow, route: "/automatisation-edof" },
      { label: "Audit EDOF (PDF)", description: "Analyse d'un export EDOF", icon: FileSearch, route: "/audit-edof" },
      { label: "Contrôle EDOF / EY", description: "Préparer un contrôle", icon: ShieldCheck, route: "/controle-ey" },
      { label: "OPCO Mobilités", description: "Dossiers OPCO Mobilités", icon: Truck, route: "/opco-mobilites" },
      { label: "Analyse BPF", description: "Lecture du bilan pédagogique", icon: BarChart3, route: "/analyse-bpf" },
    ],
  },
  {
    titre: "Identité de l'organisme", sousTitre: "NDA, tampon, logo, CV", icon: Building2,
    couleur: "from-emerald-400 to-emerald-700",
    outils: [
      { label: "Demande NDA", description: "Déclaration d'activité", icon: FileBadge, route: "/demande-nda" },
      { label: "Générateur de tampon", description: "Tampon de l'organisme", icon: Stamp, route: "/generateur-tampon" },
      { label: "Créateur de logo", description: "Logo de l'organisme", icon: Sparkles, route: "/generateur-logo" },
      { label: "Générateur de CV", description: "CV du formateur", icon: UserCircle, route: "/generateur-cv" },
    ],
  },
  {
    titre: "Messagerie modifiable", sousTitre: "S'ouvre dans un autre site", icon: Mail,
    couleur: "from-rose-400 to-rose-700",
    outils: [
      { label: "Outlook", description: "Autre site", icon: Mail, url: "https://outlook-modifiable.netlify.app/" },
      { label: "Gmail", description: "Autre site", icon: Globe, url: "https://gmail-modifiable.netlify.app/" },
      { label: "Agenda", description: "Autre site", icon: CalendarDays, url: "https://agenda-modifiable.netlify.app/" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Design de l'accueil, choisi par chaque personne et gardé dans son navigateur
// ---------------------------------------------------------------------------
export type DesignAccueil = "tableau" | "lanceur" | "espace";

export const DESIGNS: { id: DesignAccueil; nom: string; detail: string; icon: LucideIcon }[] = [
  { id: "tableau", nom: "Tableau de bord", detail: "Bandeau, dossiers récents et familles d'outils", icon: LayoutDashboard },
  { id: "lanceur", nom: "Lanceur d'outils", detail: "Recherche au centre et tuiles", icon: LayoutGrid },
  { id: "espace", nom: "Espace de travail", detail: "Menu latéral et 5 étapes", icon: PanelLeft },
];

const CLE_DESIGN = "gq_design_accueil";

export function lireDesign(): DesignAccueil {
  try {
    const v = localStorage.getItem(CLE_DESIGN);
    if (v === "tableau" || v === "lanceur" || v === "espace") return v;
  } catch { /* stockage indisponible : design par défaut */ }
  return "tableau";
}

const EVT_DESIGN = "gq-design-accueil";

export function choisirDesign(d: DesignAccueil): void {
  try { localStorage.setItem(CLE_DESIGN, d); } catch { /* choix gardé pour cette visite seulement */ }
  window.dispatchEvent(new CustomEvent<DesignAccueil>(EVT_DESIGN, { detail: d }));
}

/** Design choisi, mis à jour partout dès qu'il change (accueil, menu de l'espace de travail). */
export function useDesignAccueil(): DesignAccueil {
  const [design, setDesign] = useState<DesignAccueil>(lireDesign);
  useEffect(() => {
    const maj = () => setDesign(lireDesign());
    window.addEventListener(EVT_DESIGN, maj);
    window.addEventListener("storage", maj);
    return () => { window.removeEventListener(EVT_DESIGN, maj); window.removeEventListener("storage", maj); };
  }, []);
  return design;
}

// ---------------------------------------------------------------------------
// Aller à l'accueil ou au parcours « Préparer dossier Qualiopi » depuis n'importe quelle page.
// La page d'accueil (Index) garde son état en sessionStorage ; l'événement la prévient quand elle est déjà affichée.
// ---------------------------------------------------------------------------
export const EVT_ECRAN = "gq-ecran-accueil";
export interface DemandeEcran { parcours: boolean; etape?: number }

export function demanderEcran(navigate: (route: string) => void, demande: DemandeEcran): void {
  sessionStorage.setItem("qualiopi_started", demande.parcours ? "1" : "0");
  if (demande.etape) sessionStorage.setItem("qualiopi_step", String(demande.etape));
  window.dispatchEvent(new CustomEvent<DemandeEcran>(EVT_ECRAN, { detail: demande }));
  navigate("/");
}

/** Vrai quand la page d'accueil affiche le parcours en 5 étapes plutôt que l'accueil. */
export function useParcoursOuvert(): boolean {
  const [ouvert, setOuvert] = useState(() => sessionStorage.getItem("qualiopi_started") === "1");
  useEffect(() => {
    const maj = (e: Event) => setOuvert((e as CustomEvent<DemandeEcran>).detail.parcours);
    window.addEventListener(EVT_ECRAN, maj);
    return () => window.removeEventListener(EVT_ECRAN, maj);
  }, []);
  return ouvert;
}
