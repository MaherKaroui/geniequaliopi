/**
 * Banc d'essai des dossiers Qualiopi : génère le catalogue complet d'un organisme
 * neutre pour chaque type d'action (AF / CFA / VAE / BC) et relève, document par
 * document, les erreurs, les trous et les fuites de données d'autres organismes.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo, DocEntry } from "@/types/qualiopi";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";

export type TypeAction = OrganismeInfo["typesActions"][number];

export const ORG_TEST: OrganismeInfo = {
  nom: "ATELIER CONTROLE QUALITE",
  siret: "912 345 678 00019",
  adresse: "12 rue des Essais",
  codePostal: "69003",
  ville: "Lyon",
  telephone: "04 78 00 11 22",
  email: "contact@atelier-controle.fr",
  siteWeb: "https://www.atelier-controle.fr",
  nda: "84 69 99999 69",
  dirigeant: "Paul TESTARD",
  responsablePedagogique: "Paul TESTARD",
  referentHandicap: "Paul TESTARD",
  referentQualite: "FD Certif Expert ( Externe )",
  poleAdministratif: "Paul TESTARD",
  relationEntreprises: "Paul TESTARD",
  referentMobilite: "Paul TESTARD",
  domainesFormation: "Bureautique",
  typesActions: ["actions-formation"],
  certifications: "",
  outilsUtilises: "Google Meet, Zoom",
  version: "1",
  dateMaj: "2025-02-03",
};

export const FORMATIONS_TEST: Record<TypeAction, FormationInfo> = {
  "actions-formation": {
    intitule: "Initiation Word",
    objectifs: "À l'issue de la formation, le stagiaire sera capable de :\n- Créer et mettre en forme un document Word.\n- Insérer des tableaux et des images.\n- Mettre en page et imprimer un document.",
    prerequis: "Savoir utiliser un ordinateur.",
    duree: "14 heures (2 jours)",
    modalites: "distanciel",
    tarif: "890 € net de taxe",
    programme: "Module 1 : Interface et saisie\nModule 2 : Mise en forme\nModule 3 : Tableaux et images\nModule 4 : Mise en page",
    methodesEvaluation: "Test de positionnement, exercices pratiques, QCM final, questionnaire de satisfaction.",
    moyensPedagogiques: "Classe virtuelle, supports numériques, exercices corrigés.",
    publicVise: "Tout public",
    delaiAcces: "11 jours ouvrés après inscription",
    dateDebut: "2026-03-09",
    dateFin: "2026-03-10",
    lieu: "Google Meet / Zoom",
    nombreParticipants: "3",
    formateur: "Paul TESTARD",
    codeRNCP: "",
  },
  apprentissage: {
    intitule: "TP Négociateur Technico-Commercial",
    objectifs: "À l'issue de la formation, l'apprenti sera capable de :\n- Élaborer une stratégie de prospection.\n- Négocier une solution technique.\n- Développer un portefeuille clients.",
    prerequis: "Niveau baccalauréat ou expérience professionnelle équivalente.",
    duree: "420 heures",
    modalites: "distanciel",
    tarif: "Prise en charge OPCO selon NPEC",
    programme: "Bloc 1 : Élaborer une stratégie de prospection\nBloc 2 : Négocier une solution technique",
    methodesEvaluation: "Positionnement, ECF, dossier professionnel, session de validation.",
    moyensPedagogiques: "Classe virtuelle, LMS, études de cas.",
    publicVise: "Jeunes de 16 à 29 ans révolus en contrat d'apprentissage",
    delaiAcces: "Entrée possible toute l'année",
    dateDebut: "2025-10-06",
    dateFin: "2026-09-25",
    lieu: "Google Meet / Zoom",
    nombreParticipants: "3",
    formateur: "Paul TESTARD",
    codeRNCP: "RNCP39063",
    rythmeAlternance: "1 jour CFA / 4 jours entreprise",
  },
  vae: {
    intitule: "CAP Esthétique Cosmétique Parfumerie",
    objectifs: "Accompagner le candidat jusqu'à la validation totale ou partielle du CAP.",
    prerequis: "Justifier d'une expérience en lien direct avec la certification.",
    duree: "24 heures",
    modalites: "distanciel",
    tarif: "1 800 € net de taxe",
    programme: "Faisabilité, rédaction du dossier de validation, préparation au jury.",
    methodesEvaluation: "Entretiens de suivi, grille d'analyse du dossier, jury blanc.",
    moyensPedagogiques: "Entretiens individuels, plateforme, guides.",
    publicVise: "Toute personne justifiant d'une expérience en esthétique",
    delaiAcces: "11 jours ouvrés",
    dateDebut: "2026-02-02",
    dateFin: "2026-06-26",
    lieu: "Google Meet / Zoom",
    nombreParticipants: "3",
    formateur: "Paul TESTARD",
    codeRNCP: "RNCP39030",
  },
  "bilans-competences": {
    intitule: "Bilan de compétences",
    objectifs: "Analyser ses compétences, aptitudes et motivations pour définir un projet professionnel.",
    prerequis: "Aucun",
    duree: "24 heures",
    modalites: "distanciel",
    tarif: "1 990 € net de taxe",
    programme: "Phase préliminaire, phase d'investigation, phase de conclusion.",
    methodesEvaluation: "Entretiens, tests, synthèse.",
    moyensPedagogiques: "Entretiens individuels, tests psychométriques.",
    publicVise: "Tout actif",
    delaiAcces: "11 jours ouvrés",
    dateDebut: "2026-01-12",
    dateFin: "2026-03-20",
    lieu: "Google Meet / Zoom",
    nombreParticipants: "3",
    formateur: "Paul TESTARD",
    codeRNCP: "",
  },
};

export const STAGIAIRES_TEST: StagiaireInfo[] = [
  { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "Société Alpha", poste: "Assistante", dateNaissance: "1990-04-12", financeur: "CPF" },
  { civilite: "M.", nom: "BRAVO", prenom: "Julien", email: "julien.bravo@exemple.fr", telephone: "06 11 21 31 41", entreprise: "Bravo SARL", poste: "Commercial", dateNaissance: "1998-09-03", financeur: "OPCO" },
  { civilite: "Mme", nom: "CHARLIE", prenom: "Inès", email: "ines.charlie@exemple.fr", telephone: "06 12 22 32 42", entreprise: "", poste: "", dateNaissance: "1985-01-27", financeur: "Personnel" },
];

/** Chaînes propres à d'anciens organismes, formations ou personnes : ne doivent jamais sortir dans un dossier neutre. */
export const FUITES = [
  "FormaPro Excellence", "formapro-excellence", "Jean-Marc Beaumont", "Catherine Moreau", "Isabelle Fontaine", "Laurent Vasseur", "Marie Lecomte",
  "Nabih", "Ouardani", "Bilal", "Nouira", "Start Formation", "RS5637", "VTC",
  "prothésie ongulaire", "RS7302", "Hasnaa", "YEDDI", "Maison HSY",
  "NT Conseils", "NT CONSEILS", "Dreamers", "HAYB", "Fideline", "Mendy",
  "Philippe Martin", "Martin Dupont", "Sophie Bernard", "Tech Solutions", "Innov'Corp",
  "RNCP31041", "Pâtisserie", "Cake Design", "Vitrage", "vitrage",
];

/** Marqueurs de document inachevé. */
export const TROUS = [
  /\[\s*(À|A) COMPL[ÉE]TER\s*\]/i, /\bXXX+\b/, /lorem ipsum/i, /\bundefined\b/, /\bNaN\b/, /\[object Object\]/, /Invalid Date/,
  /\{\{[^}]+\}\}/, /\bnull\b(?![-\w])/,
];

export interface DocFinding { id: string; nom: string; ind: number; erreur?: string; fuites: string[]; trous: string[]; taille: number }

function texte(html: string): string {
  return html.replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/data:[^"')\s]+/g, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
}

export function auditType(type: TypeAction, opts: { limit?: number } = {}) {
  const org: OrganismeInfo = { ...ORG_TEST, typesActions: [type] };
  const formation = FORMATIONS_TEST[type];
  const catalog: DocEntry[] = getFullCatalog(org, formation, STAGIAIRES_TEST);
  const findings: DocFinding[] = [];
  const parInd: Record<number, number> = {};
  for (const d of catalog.slice(0, opts.limit ?? catalog.length)) {
    parInd[d.indicateur] = (parInd[d.indicateur] || 0) + 1;
    let html = "";
    let erreur: string | undefined;
    try {
      html = generateDocumentById(d.id, d.template, d.params, org, formation, STAGIAIRES_TEST) || "";
    } catch (e: any) {
      erreur = String(e?.message || e).slice(0, 200);
    }
    const t = texte(html);
    const fuites = FUITES.filter((f) => t.includes(f));
    const trous = TROUS.filter((r) => r.test(t)).map((r) => {
      const m = t.match(r);
      const i = m?.index ?? 0;
      return t.slice(Math.max(0, i - 50), i + 60);
    });
    if (!erreur && t.trim().length < 80 && !/xlsx|asset/.test(d.template)) erreur = `document quasi vide (${t.trim().length} car.)`;
    if (erreur || fuites.length || trous.length) findings.push({ id: d.id, nom: d.nom, ind: d.indicateur, erreur, fuites, trous, taille: t.length });
  }
  return { type, total: catalog.length, parInd, findings };
}
