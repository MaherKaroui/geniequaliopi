/**
 * Plan des pièces de l'espace IZILearn, par catégorie et par apprenant.
 * Pièces « à remettre » (programme, convocation, convention / contrat, CGV, RI,
 * livret d'accueil, support de cours) : générateurs existants du dossier Qualiopi.
 * Remplissage Qualiopi par défaut ; les réponses et preuves IZILearn priment.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { generateDocumentById } from "@/lib/documentGenerator";
import { adaptHtmlToTypeAction } from "@/lib/adaptTypeAction";
import type { IzPayload } from "./types";
import { estDistanciel, versFormation, versOrganisme, versStagiaires } from "./mapping";
import * as T from "./trames";
import { hasRecordedQuiz, hasRecordedResponses } from "./responses";
import { mailHtml, mailsModeles, type MailModele } from "./mails";
import { appliquerRevision, developperLivret } from "./presentation";

export type CategorieKey =
  | "programme" | "besoins" | "positionnement" | "convocation" | "convention" | "cgv" | "ri"
  | "livret" | "support" | "exercices" | "examen_final" | "emargement" | "connexion" | "bilan_chaud" | "bilan_froid" | "mails";

export interface Categorie { key: CategorieKey; label: string; dossier: string; aide: string }

export const CATEGORIES: Categorie[] = [
  { key: "programme", label: "Programme", dossier: "01_Programme", aide: "Programme de formation (indicateur 1)." },
  { key: "besoins", label: "Évaluation des besoins", dossier: "02_Evaluation_des_besoins", aide: "Évaluation personnalisée ; réponses IZILearn conservées lorsqu'elles existent." },
  { key: "positionnement", label: "Test de positionnement (début)", dossier: "03_Test_de_positionnement", aide: "Test personnalisé comme Qualiopi ; résultats IZILearn prioritaires." },
  { key: "convocation", label: "Convocation", dossier: "04_Convocation", aide: "Convocation de l'apprenant à la session." },
  { key: "convention", label: "Convention ou contrat", dossier: "05_Convention_Contrat", aide: "Convention si l'apprenant est rattaché à une entreprise, contrat de formation sinon (CFA : convention de formation par apprentissage)." },
  { key: "cgv", label: "CGV", dossier: "06_CGV", aide: "Conditions générales de vente." },
  { key: "ri", label: "Règlement intérieur", dossier: "07_Reglement_interieur", aide: "Règlement intérieur applicable aux apprenants." },
  { key: "livret", label: "Livret d'accueil", dossier: "08_Livret_d_accueil", aide: "Livret d'accueil de l'apprenant." },
  { key: "support", label: "Support de cours", dossier: "09_Support_de_cours", aide: "Support de cours de la formation." },
  { key: "exercices", label: "Exercices pratiques", dossier: "10_Exercices_pratiques", aide: "CFA : un exercice par semaine. Formation courte (≤ 12 jours) : un par jour. Formation longue : un par semaine." },
  { key: "examen_final", label: "Examen final", dossier: "10_Examen_final", aide: "Évaluation de fin de formation ; résultats IZILearn enregistrés, sinon examen à compléter." },
  { key: "emargement", label: "Feuille d'émargement", dossier: "11_Emargement", aide: "Demi-journées réelles de la session, signatures IZILearn horodatées." },
  { key: "connexion", label: "Temps de connexion", dossier: "11_Temps_de_connexion", aide: "Connexions Meet et e-learning relevées par IZILearn (formation à distance)." },
  { key: "bilan_chaud", label: "Bilan à chaud", dossier: "12_Bilan_a_chaud", aide: "Questionnaire de fin de formation." },
  { key: "bilan_froid", label: "Bilan à froid", dossier: "13_Bilan_a_froid", aide: "Enquête à 3 mois." },
  { key: "mails", label: "Mails", dossier: "14_Mails", aide: "Mêmes scénarios que la partie Qualiopi, en modèles à envoyer avec leur date prévue." },
];

export type Source = "izilearn" | "trame" | "document" | "modele";

export interface Piece {
  id: string;
  categorie: CategorieKey;
  titre: string;
  apprenantIdx: number | null;
  source: Source;
  fichier: string;          // nom sans extension
  mail?: MailModele;
  rendre: () => string;     // HTML complet
}

export interface Contexte {
  p: IzPayload;
  o: OrganismeInfo;
  f: FormationInfo;
  stagiaires: StagiaireInfo[];
}

export function contexte(p: IzPayload, dateMaj?: string): Contexte {
  const o = versOrganisme(p);
  if (dateMaj && /^\d{4}-\d{2}-\d{2}$/.test(dateMaj) && !Number.isNaN(new Date(`${dateMaj}T12:00:00`).getTime())) o.dateMaj = dateMaj;
  return { p, o, f: versFormation(p), stagiaires: versStagiaires(p) };
}

const slug = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80);
export const dossierApprenant = (s: StagiaireInfo) => slug(`${s.nom}_${s.prenom}`.toUpperCase());

/** Gabarits du générateur par type d'action. */
function gabarits(type: IzPayload["formation"]["typeAction"]) {
  const cfa = type === "apprentissage";
  const vae = type === "vae";
  const bc = type === "bilans-competences";
  return {
    programme: vae ? { t: "vae_programme_accompagnement" } : bc ? { t: "bdc_nt_programme_phases" } : { t: "programme_formation", params: { fi: 0, ...(cfa ? { isCFA: true } : {}) } },
    convocation: cfa ? "convocation_cfa" : "convocation_stagiaire",
    convention: (entreprise: boolean) => cfa ? "convention_formation_cfa" : entreprise ? "convention_formation_tripartite" : "contrat_formation_pro_stagiaire",
    cgv: vae ? "vae_cgv" : cfa ? "cgv_cfa" : "cgv_stagiaire",
    ri: vae ? "vae_reglement_interieur" : cfa ? "reglement_interieur_cfa_v2" : "reglement_interieur_stagiaire",
    livret: vae ? { t: "vae_livret_accueil", parApprenant: false } : cfa ? { t: "livret_accueil_cfa_v2", parApprenant: true } : { t: "livret_accueil", parApprenant: false },
    support: cfa ? "support_cours_cfa" : "support_cours_ref",
  };
}

export function planPieces(cx: Contexte): Piece[] {
  const { p, o, f, stagiaires } = cx;
  const g = gabarits(p.formation.typeAction);
  const out: Piece[] = [];
  const gen = (key: string, template: string, params: Record<string, unknown> = {}) => () =>
    adaptHtmlToTypeAction(generateDocumentById(key, template, params, o, f, stagiaires), f.typeAction);
  const nomF = slug(f.intitule).toUpperCase();

  // Pièces de session
  out.push({ id: "programme", categorie: "programme", titre: `Programme — ${f.intitule}`, apprenantIdx: null, source: "document", fichier: `PROGRAMME_${nomF}`, rendre: gen("programme", g.programme.t, g.programme.params) });
  if (!g.livret.parApprenant) out.push({ id: "livret", categorie: "livret", titre: "Livret d'accueil", apprenantIdx: null, source: "document", fichier: "LIVRET_D_ACCUEIL", rendre: gen("livret", g.livret.t) });
  out.push({ id: "support", categorie: "support", titre: `Support de cours — ${f.intitule}`, apprenantIdx: null, source: "document", fichier: `SUPPORT_DE_COURS_${nomF}`, rendre: gen("support", g.support, { fi: 0 }) });

  const distanciel = estDistanciel(p);
  const mixte = /hybride|mixte/i.test(p.session.modalite || "");

  p.apprenants.forEach((a, i) => {
    const s = stagiaires[i];
    const nom = `${s.prenom} ${s.nom}`.trim();
    const suffixe = dossierApprenant(s);
    const c: T.Ctx = { p, o, f, s, a };
    const par = (categorie: CategorieKey, titre: string, fichier: string, source: Source, rendre: () => string, extra: { id?: string; mail?: MailModele } = {}) =>
      out.push({ id: `${categorie}_${i}${extra.id ? `_${extra.id}` : ""}`, categorie, titre: `${titre} — ${nom}`, apprenantIdx: i, source, fichier: `${fichier}_${suffixe}`, rendre, mail: extra.mail });

    const besoins = hasRecordedResponses(a.besoins) || hasRecordedResponses(a.besoinsEntreprise);
    par("besoins", "Évaluation des besoins", "EVALUATION_DES_BESOINS", besoins ? "izilearn" : "document",
      besoins ? () => T.evaluationBesoins(c).html : gen(`besoins_${i}`, "trame_eval_besoins_combine", { stagiaireIdx: i }));
    const positionnement = (a.positionnement || []).some(hasRecordedQuiz);
    par("positionnement", "Test de positionnement", "TEST_DE_POSITIONNEMENT_DEBUT", positionnement ? "izilearn" : "document",
      positionnement ? () => T.testPositionnement(c).html : gen(`positionnement_${i}`, "test_positionnement_debut_stagiaire", { stagiaireIdx: i }));
    par("convocation", "Convocation", "CONVOCATION", "document", gen(`convocation_${i}`, g.convocation, { stagiaireIdx: i }));
    const entreprise = !!s.entreprise;
    par("convention", p.formation.typeAction === "apprentissage" ? "Convention de formation par apprentissage" : entreprise ? "Convention de formation" : "Contrat de formation",
      entreprise || p.formation.typeAction === "apprentissage" ? "CONVENTION" : "CONTRAT", "document", gen(`convention_${i}`, g.convention(entreprise), { stagiaireIdx: i }));
    par("cgv", "CGV", "CGV", "document", gen(`cgv_${i}`, g.cgv, { stagiaireIdx: i }));
    par("ri", "Règlement intérieur", "REGLEMENT_INTERIEUR", "document", gen(`ri_${i}`, g.ri, { stagiaireIdx: i }));
    if (g.livret.parApprenant) par("livret", "Livret d'accueil", "LIVRET_D_ACCUEIL", "document", gen(`livret_${i}`, g.livret.t, { stagiaireIdx: i }));

    const unites = T.unitesExercices(p, s, f);
    unites.forEach((u, k) => {
      const passe = u.fin.getTime() < new Date().setHours(0, 0, 0, 0);
      par("exercices", `QCM ${k + 1} (${u.type === "jour" ? "jour" : "semaine"} ${k + 1})`, `QCM_${String(k + 1).padStart(2, "0")}`, passe ? "document" : "trame",
        () => T.qcmPeriodique(c, u, k, unites.length, passe), { id: `ex${k}` });
    });

    const finSession = new Date(`${p.session.dateFin}T00:00:00`);
    const termine = finSession.getTime() < new Date().setHours(0, 0, 0, 0);
    const examen = (a.examenFinal || []).some(hasRecordedQuiz);
    par("examen_final", "Examen final", "EXAMEN_FINAL", examen ? "izilearn" : termine ? "document" : "trame", () => T.examenFinal(c).html);
    if (!distanciel || mixte) par("emargement", "Feuille d'émargement", "EMARGEMENT", a.signatures.length ? "izilearn" : "document", () => T.emargement(c).html);
    if (distanciel || mixte) par("connexion", "Temps de connexion", "TEMPS_DE_CONNEXION", a.connexions.length ? "izilearn" : "document", () => T.tempsConnexion(c).html);
    const suivi = new Date(finSession);
    suivi.setMonth(suivi.getMonth() + 3);
    const suiviEchu = suivi.getTime() < new Date().setHours(0, 0, 0, 0);
    const chaud = hasRecordedResponses(a.bilanChaud);
    const froid = hasRecordedResponses(a.bilanFroid);
    par("bilan_chaud", "Bilan à chaud", "BILAN_A_CHAUD", chaud ? "izilearn" : termine ? "document" : "trame",
      chaud || !termine ? () => T.bilanChaud(c).html : gen(`bilan_chaud_${i}`, "bilan_chaud_stagiaire", { stagiaireIdx: i }));
    par("bilan_froid", "Bilan à froid", "BILAN_A_FROID", froid ? "izilearn" : suiviEchu ? "document" : "trame",
      froid || !suiviEchu ? () => T.bilanFroid(c).html : gen(`bilan_froid_${i}`, "bilan_froid_stagiaire", { stagiaireIdx: i }));

    mailsModeles(o, f, s).forEach((m, k) => {
      const stamp = `${m.dateEnvoi.getFullYear()}-${String(m.dateEnvoi.getMonth() + 1).padStart(2, "0")}-${String(m.dateEnvoi.getDate()).padStart(2, "0")}`;
      par("mails", m.titre, `${stamp}_${slug(m.titre).toUpperCase()}`, "modele", () => mailHtml(m, o), { id: `m${k}`, mail: m });
    });
  });
  return out.map((piece) => {
    const rendre = piece.rendre;
    return { ...piece, rendre: () => appliquerRevision(piece.categorie === "livret" ? developperLivret(rendre(), cx) : rendre(), o) };
  });
}
