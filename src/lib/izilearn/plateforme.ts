/**
 * Plateforme reliée à l'espace documentaire : IZILearn (/izilearn), CRM LMS (/crmlms) ou Orienta Campus (/orienta).
 * Toutes envoient le même format de données (IzPayload) ; seuls le nom affiché,
 * les origines acceptées et les types de messages changent.
 */
export type AppSource = "izilearn" | "crmlms" | "orienta";

export interface Plateforme {
  app: AppSource;
  nom: string;
  /** Lien vers les sessions de la plateforme (page d'attente). */
  url: string;
  /** Libellé des connexions de classe virtuelle. */
  visio: string;
  origines: RegExp[];
  msg: { ready: string; data: string; save: string; saved: string };
}

const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

export const PLATEFORMES: Record<AppSource, Plateforme> = {
  izilearn: {
    app: "izilearn", nom: "IZILearn", url: "https://izilearn.net/sessions", visio: "Google Meet",
    // Domaine izilearn.net (et www), site Netlify et aperçus de déploiement.
    origines: [/^https:\/\/(www\.)?izilearn\.net$/, /^https:\/\/izilearn\.netlify\.app$/, /^https:\/\/[a-z0-9-]+--izilearn\.netlify\.app$/, LOCAL],
    msg: { ready: "geniequaliopi:ready", data: "izilearn:data", save: "geniequaliopi:save", saved: "izilearn:saved" },
  },
  crmlms: {
    app: "crmlms", nom: "CRM LMS", url: "https://crmlms.lovable.app/sessions", visio: "classe virtuelle",
    // Site publié, aperçus Lovable du projet et domaines personnalisés en *.lovable.app.
    origines: [/^https:\/\/crmlms\.lovable\.app$/, /^https:\/\/[a-z0-9-]+\.lovable\.app$/, /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/, LOCAL],
    msg: { ready: "geniequaliopi:ready", data: "crmlms:data", save: "geniequaliopi:save", saved: "crmlms:saved" },
  },
  orienta: {
    app: "orienta", nom: "Orienta Campus", url: "https://orienta-campus.lovable.app/sessions", visio: "classe virtuelle",
    // Site publié (orienta-campus.lovable.app, ancien english-business-import-hub), aperçus Lovable et poste local.
    origines: [/^https:\/\/orienta-campus\.lovable\.app$/, /^https:\/\/[a-z0-9-]+\.lovable\.app$/, /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/, LOCAL],
    msg: { ready: "geniequaliopi:ready", data: "orienta:data", save: "geniequaliopi:save", saved: "orienta:saved" },
  },
};

let courante: AppSource = "izilearn";

/** Fixée à la réception des données (et par la route) : les pièces rendues ensuite portent ce nom. */
export function definirPlateforme(app: AppSource | undefined) { courante = app && app in PLATEFORMES ? app : "izilearn"; }
export const plateforme = (): Plateforme => PLATEFORMES[courante];
export const nomPlateforme = () => plateforme().nom;
/** « CRM LMS / classe virtuelle », « IZILearn / Google Meet ». */
export const plateformeConnexion = () => `${plateforme().nom} / ${plateforme().visio}`;
/** Texte écrit pour IZILearn, adapté à la plateforme courante. */
export const marque = (s: string) => courante === "izilearn" ? s : s
  .replace(/IZILearn › CRM › Évaluation des besoins/g, `${plateforme().nom} (fiche du stagiaire)`)
  .replace(/IZILearn › Questionnaires/g, plateforme().nom)
  .replace(/IZILearn/g, plateforme().nom).replace(/Google Meet/g, plateforme().visio).replace(/Connexions Meet/g, `Connexions ${plateforme().visio}`);
