// ---------------------------------------------------------------------------
// Profils réels des formateurs, d'après leur CV transmis par l'organisme.
// Alimentent les pièces IND 21 (compétences des intervenants) et IND 22 (plan de développement :
// besoins tirés de l'écart entre le CV et les modules de la formation animée).
// Données professionnelles uniquement : ni date de naissance, ni adresse, ni coordonnées personnelles.
// ---------------------------------------------------------------------------
import type { FormationInfo } from "@/types/qualiopi";
import { isVTC48Formation } from "./vtc48hHumanized";

/** Action de développement des compétences issue de l'analyse du CV. */
export interface BesoinProfil {
  origine: string;
  nom: string;
  objectif: string;
  prestataire: string;
  duree: string;
  priorite: "Haute" | "Moyenne";
}

export interface ProfilFormateur {
  /** Mots du nom (prénom et nom, dans n'importe quel ordre) */
  noms: string[];
  specialite: string;
  diplomes: string;
  experience: string;
  /** Besoins de développement pour la formation animée (écart CV / modules) */
  besoins: (f: FormationInfo) => BesoinProfil[];
}

const PROFILS: ProfilFormateur[] = [
  {
    // CV « 2 CV AZIZ FORMATEUR » transmis par IN3M FORMA (25/11/2026).
    noms: ["aziz", "bouyahia"],
    specialite: "Formateur professionnel d'adultes : développement commercial, gestion, relation client ; formation continue des conducteurs VTC",
    diplomes: "Licence Sciences de l'éducation (Université Paris 8, 2000) ; BTS Action commerciale (1999) ; DUT Techniques de commercialisation (IUT de Saint-Denis, 1997) ; baccalauréat STT Action et communication commerciale (1996). Langues : anglais B2, espagnol C1.",
    experience: "Enseignant-formateur depuis 2004 : économie-gestion option commerce et vente, enseignement en milieu carcéral, développement commercial ; membre de jury et conseiller VAE. Formateur professionnel depuis 2006 : BTS MCO, NDRC, SAM et GPME, titres professionnels MUM, EC, CRDC, VC et NTC, formation continue des conducteurs VTC, jury professionnel du titre FPA, coaching. Coordinateur de centre au GRETA MTE 93 de 2008 à 2015 (suivi administratif et pédagogique, recrutement des formateurs, plannings, suivi en entreprise).",
    besoins: (f) => isVTC48Formation(f.intitule, f.codeRNCP) ? [
      {
        origine: "Analyse du CV au regard du programme : gestion, développement commercial, français et anglais (B2) couverts ; la sécurité routière de l'épreuve C (épreuve écrite) est déjà enseignée dans la formation continue des conducteurs VTC qu'il anime ; renforcement souhaité sur la pratique des gestes de premiers secours",
        nom: "Premiers secours : PSC1 (renforcement)",
        objectif: "Illustrer par la pratique la conduite à tenir en cas d'accident (protéger, alerter, secourir) enseignée au module 3",
        prestataire: "Association agréée de sécurité civile (Croix-Rouge française, Protection civile)",
        duree: "7 h",
        priorite: "Moyenne",
      },
      {
        origine: "Module 6 : simulations commentées de courses, sans conduite réelle (non incluse dans la formation) ; l'épreuve pratique d'admission est évaluée par la CMA, pas par l'organisme",
        nom: "Épreuve pratique VTC : grille d'évaluation de la CMA et observation de courses en véhicule à double commande",
        objectif: "Tenir les simulations du module 6 au plus près des critères de l'épreuve (prise en charge, itinéraire, relation client)",
        prestataire: "Auto-école partenaire disposant d'un véhicule à double commande ; informations de la CMA",
        duree: "1 jour",
        priorite: "Moyenne",
      },
      {
        origine: "Analyse du CV : expérience de la formation continue des conducteurs VTC ; examen d'accès à actualiser (veille IND 23)",
        nom: "Examen d'accès VTC : épreuves A à G, plateforme exament3p.fr et textes récents (arrêté du 20 mars 2024, décret n° 2026-764)",
        objectif: "Aligner les QCM d'entraînement, les examens blancs et l'accompagnement à l'inscription sur l'examen en vigueur",
        prestataire: "CMA / réseau des organismes de formation T3P",
        duree: "1 jour",
        priorite: "Moyenne",
      },
    ] : [],
  },
];

const mots = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z]+/).filter(Boolean);

/** Profil réel d'un formateur à partir de son nom (prénom et nom dans n'importe quel ordre). */
export function profilFormateur(nom?: string): ProfilFormateur | undefined {
  const m = new Set(mots(nom || ""));
  return PROFILS.find((p) => p.noms.every((n) => m.has(n)));
}
