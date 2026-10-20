/**
 * Conversion des données IZILearn vers les structures du générateur
 * (OrganismeInfo / FormationInfo / StagiaireInfo). Champ absent côté IZILearn =
 * champ vide ici : rien n'est emprunté à une formation ou un organisme d'exemple.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import type { IzApprenant, IzPayload } from "./types";

const t = (v: unknown) => String(v ?? "").trim();

const MODALITE: Record<string, string> = {
  presentiel: "présentiel",
  distanciel: "distanciel",
  hybride: "mixte",
  mixte: "mixte",
  elearning: "distanciel",
};

const FINANCEUR: Record<string, string> = {
  cpf: "CPF",
  opco: "OPCO",
  apprentissage: "OPCO",
  france_travail: "France Travail",
  entreprise: "Entreprise",
  fipu: "Entreprise",
  particulier: "Personnel",
  region: "Région",
  autre: "Autre",
};

export const estDistanciel = (p: IzPayload) => /distanciel|elearning/i.test(p.session.modalite || "");

export function versOrganisme(p: IzPayload): OrganismeInfo {
  const o = p.organisme;
  const dirigeant = t(o.dirigeant);
  return {
    nom: t(o.nom), siret: t(o.siret), adresse: t(o.adresse), codePostal: t(o.codePostal), ville: t(o.ville),
    telephone: t(o.telephone), email: t(o.email), siteWeb: t(o.siteWeb), nda: t(o.nda),
    dirigeant,
    responsablePedagogique: dirigeant,
    referentHandicap: t(o.referentHandicap) || dirigeant,
    referentQualite: t(o.referentQualite) || dirigeant,
    poleAdministratif: dirigeant,
    relationEntreprises: dirigeant,
    referentMobilite: dirigeant,
    domainesFormation: "",
    typesActions: [p.formation.typeAction],
    certifications: "",
    outilsUtilises: "IZILearn",
    version: String(p.formation.version || 1),
    dateMaj: t(p.formation.miseAJour) || new Date().toISOString().slice(0, 10),
    logoUrl: t(o.logoUrl) || undefined,
    tamponUrl: t(o.tamponUrl) || undefined,
    signatureUrl: t(o.signatureUrl) || undefined,
    regimeTva: o.tvaExonere === false ? "assujetti" : "exonere",
  };
}

function programmeTexte(p: IzPayload): string {
  const mods = p.formation.modules || [];
  if (!mods.length) return "";
  return mods.map((m, i) => {
    const h = m.dureeHeures ? ` (${String(m.dureeHeures).replace(".", ",")} h)` : "";
    const obj = t(m.objectifs);
    return `Module ${i + 1} – ${t(m.titre)}${h}${obj ? ` : ${obj.replace(/\s*\n+\s*/g, " ; ")}` : ""}`;
  }).join("\n");
}

export function versFormation(p: IzPayload): FormationInfo {
  const f = p.formation;
  const s = p.session;
  const h = Number(f.dureeHeures || 0);
  const distanciel = estDistanciel(p);
  return {
    intitule: t(f.intitule),
    objectifs: t(f.objectifs),
    prerequis: t(f.prerequis),
    duree: h ? `${String(h).replace(".", ",")} heures` : "",
    dureeSaisiePrioritaire: true,
    modalites: MODALITE[s.modalite] || t(s.modalite),
    tarif: t(s.tarif) || t(f.tarif),
    programme: programmeTexte(p),
    methodesEvaluation: t(f.methodesEvaluation),
    moyensPedagogiques: t(f.methodesPedagogiques),
    publicVise: t(f.publicVise),
    delaiAcces: t(f.delaiAcces),
    dateDebut: t(s.dateDebut),
    dateFin: t(s.dateFin),
    lieu: t(s.lieu) || (distanciel ? "À distance (classe virtuelle)" : ""),
    nombreParticipants: String(p.apprenants.length || ""),
    formateur: t(s.formateur),
    codeRNCP: t(f.codeCertification) || undefined,
    rythmeAlternance: " ",
    typeAction: f.typeAction,
  };
}

export function versStagiaire(a: IzApprenant, p: IzPayload): StagiaireInfo {
  const civ = /^(mme|madame)/i.test(t(a.civilite)) ? "Mme" : /^(m\.?|monsieur|mr)$/i.test(t(a.civilite)) ? "M." : "";
  const adr = t(a.adresse);
  const cp = adr.match(/\b(\d{5})\s+([^,\n]+)$/);
  return {
    civilite: civ,
    nom: t(a.nom),
    prenom: t(a.prenom),
    email: t(a.email),
    telephone: t(a.telephone),
    entreprise: t(a.entreprise?.nom),
    responsableEntreprise: t(a.entreprise?.representant) || undefined,
    emailResponsable: t(a.entreprise?.email) || undefined,
    siretEntreprise: t(a.entreprise?.siret) || undefined,
    adresseEntreprise: t(a.entreprise?.adresse) || undefined,
    poste: t(a.poste),
    dateNaissance: t(a.dateNaissance),
    dateDebutFormation: t(p.session.dateDebut),
    dateFinFormation: t(p.session.dateFin),
    tarifFormation: t(p.session.tarif) || undefined,
    adresse: cp ? adr.slice(0, cp.index).replace(/[,\s]+$/, "") : adr || undefined,
    codePostal: cp?.[1],
    commune: cp?.[2]?.trim(),
    rqth: a.handicap ? (a.handicap.declare ? "oui" : "non") : "",
    formateur: t(p.session.formateur) || undefined,
    financeur: FINANCEUR[t(a.financeur).toLowerCase()] || undefined,
  };
}

export function versStagiaires(p: IzPayload): StagiaireInfo[] {
  return p.apprenants.map((a) => versStagiaire(a, p));
}

/** Contrôle minimal : ce qui manque dans IZILearn est listé, jamais deviné. */
export function champsManquants(p: IzPayload): string[] {
  const m: string[] = [];
  const o = p.organisme, f = p.formation, s = p.session;
  if (!t(o.siret)) m.push("Organisme : SIRET (Paramètres › Organisme)");
  if (!t(o.nda)) m.push("Organisme : numéro de déclaration d'activité");
  if (!t(o.adresse)) m.push("Organisme : adresse");
  if (!t(o.dirigeant)) m.push("Organisme : nom du dirigeant");
  if (!t(o.email)) m.push("Organisme : adresse e-mail pour envoyer les mails");
  for (const a of p.apprenants) {
    if (!t(a.email)) m.push(`Apprenant ${t(a.prenom)} ${t(a.nom)} : adresse e-mail`);
  }
  if (!t(f.objectifs)) m.push("Formation : objectifs");
  if (!f.dureeHeures) m.push("Formation : durée en heures");
  if (!(f.modules || []).length) m.push("Formation : modules du programme");
  if (!t(s.tarif) && !t(f.tarif)) m.push("Session / formation : tarif");
  if (!p.apprenants.length) m.push("Session : aucun apprenant inscrit");
  return m;
}
