/**
 * Conversion des données IZILearn vers les structures du générateur
 * (OrganismeInfo / FormationInfo / StagiaireInfo). Champ absent côté IZILearn =
 * champ vide ici : rien n'est emprunté à une formation ou un organisme d'exemple.
 */
import type { CerfaComplement, FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
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

type Obj = Record<string, unknown>;
const norm = (k: string) => k.toLowerCase().replace(/[^a-z0-9]/g, "");
/** Première valeur non vide parmi des alias de clés (insensible à la casse / tirets). */
function pick(o: unknown, ...alias: string[]): string {
  if (!o || typeof o !== "object") return "";
  const idx = new Map(Object.entries(o as Obj).map(([k, v]) => [norm(k), v]));
  for (const a of alias) {
    const v = idx.get(norm(a));
    if (v !== undefined && v !== null && typeof v !== "object" && t(v)) return t(v);
  }
  return "";
}
const sub = (o: unknown, ...alias: string[]): Obj | undefined => {
  if (!o || typeof o !== "object") return undefined;
  const idx = new Map(Object.entries(o as Obj).map(([k, v]) => [norm(k), v]));
  for (const a of alias) { const v = idx.get(norm(a)); if (v && typeof v === "object") return v as Obj; }
  return undefined;
};
const bool = (v: string): boolean | undefined => /^(oui|true|1|yes|o)$/i.test(v) ? true : /^(non|false|0|no|n)$/i.test(v) ? false : undefined;
const isoDate = (v: string) => { const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); return m ? `${m[3]}-${m[2]}-${m[1]}` : v; };

/** Tous les champs CERFA réellement transmis par IZILearn (apprenant, entreprise, contrat). */
export function cerfaDepuisIzilearn(a: IzApprenant): { complement: CerfaComplement; nir: string; nationalite: string; departementNaissance: string; communeNaissance: string; diplome: string; dateNaissanceResponsable: string } {
  const e = a.entreprise || undefined;
  const c = sub(a, "cerfa", "contrat", "contratApprentissage") || {};
  const src = [c, a, e];
  const p = (...k: string[]) => { for (const o of src) { const v = pick(o, ...k); if (v) return v; } return ""; };
  const pe = (...k: string[]) => pick(c, ...k) || pick(e, ...k);
  const rep = sub(c, "representantLegal") || sub(a, "representantLegal", "responsableLegal");
  const m1 = sub(c, "maitreApprentissage", "maitre", "tuteur") || sub(e, "maitreApprentissage", "maitre", "tuteur");
  const m2 = sub(c, "maitreApprentissage2", "maitre2", "tuteur2");
  const pub = pe("employeurPublic", "public");
  const sportif = p("sportifHautNiveau", "sportif");
  const mach = p("machinesDangereuses", "travauxDangereux");
  const complement: CerfaComplement = {
    employeurPublic: pub ? bool(pub) : /public/i.test(pe("secteur", "typeEmployeurLibelle")) || undefined,
    typeEmployeur: pe("typeEmployeur", "codeTypeEmployeur"),
    employeurSpecifique: pe("employeurSpecifique"),
    codeApe: pe("codeApe", "ape", "codeNaf", "naf", "apeNaf"),
    effectif: pe("effectif", "effectifTotal", "effectifSalarie", "nbSalaries"),
    idcc: pe("idcc", "codeIdcc", "conventionCollective", "ccn"),
    telephoneEmployeur: pe("telephone", "tel", "telephoneEmployeur"),
    complementAdresseEmployeur: pe("complementAdresse", "adresseComplement"),
    nomNaissance: p("nomNaissance", "nomDeNaissance"),
    complementAdresse: pick(c, "complementAdresseApprenti") || pick(a, "complementAdresse"),
    regimeSocial: p("regimeSocial"),
    sportifHautNiveau: sportif ? bool(sportif) : undefined,
    situationAvant: p("situationAvant", "situationAvantContrat"),
    dernierDiplomePrepare: p("dernierDiplomePrepare", "diplomePrepare"),
    derniereClasse: p("derniereClasse", "derniereAnnee"),
    diplomePlusEleve: p("diplomePlusEleve", "diplomeLePlusEleve", "niveauDiplome"),
    representantLegal: rep ? { nom: pick(rep, "nom", "nomPrenom"), numero: pick(rep, "numero"), voie: pick(rep, "voie", "adresse"), complement: pick(rep, "complement"), codePostal: pick(rep, "codePostal", "cp"), commune: pick(rep, "commune", "ville"), email: pick(rep, "email", "courriel") } : undefined,
    maitreEmploi: pick(m1, "emploi", "poste", "fonction") || pe("emploiMaitre", "posteRepresentant", "fonctionRepresentant"),
    maitre2: m2 ? { nom: pick(m2, "nom"), prenom: pick(m2, "prenom"), dateNaissance: isoDate(pick(m2, "dateNaissance")), email: pick(m2, "email") } : undefined,
    typeContrat: pick(c, "typeContrat", "codeTypeContrat"),
    typeDerogation: pick(c, "typeDerogation", "derogation"),
    numeroContratPrecedent: pick(c, "numeroContratPrecedent"),
    dateConclusion: isoDate(pick(c, "dateConclusion", "dateSignature")),
    dateDebutExecution: isoDate(pick(c, "dateDebutExecution", "dateDebut")),
    dureeHebdoHeures: pick(c, "dureeHebdo", "dureeHebdoHeures", "heuresHebdo"),
    dureeHebdoMinutes: pick(c, "dureeHebdoMinutes"),
    salaireBrutMensuel: pick(c, "salaireBrut", "salaireBrutMensuel", "salaire", "remuneration"),
    machinesDangereuses: mach ? bool(mach) : undefined,
    codeDiplome: pick(c, "codeDiplome"),
    heuresDistance: pick(c, "heuresDistance", "heuresFOAD"),
    lieuSignature: pick(c, "lieuSignature", "faitA"),
  };
  return {
    complement,
    nir: p("nir", "numeroSecuriteSociale", "numeroSecu", "secu", "numeroSS"),
    nationalite: p("nationalite"),
    departementNaissance: p("departementNaissance", "deptNaissance"),
    communeNaissance: p("communeNaissance", "lieuNaissance", "villeNaissance"),
    diplome: p("dernierDiplome", "diplome", "diplomeObtenu"),
    dateNaissanceResponsable: isoDate(pick(m1, "dateNaissance") || pe("dateNaissanceRepresentant", "dateNaissanceMaitre")),
  };
}

export function versStagiaire(a: IzApprenant, p: IzPayload): StagiaireInfo {
  const civ = /^(mme|madame)/i.test(t(a.civilite)) ? "Mme" : /^(m\.?|monsieur|mr)$/i.test(t(a.civilite)) ? "M." : "";
  const adr = t(a.adresse);
  const cp = adr.match(/\b(\d{5})\s+([^,\n]+)$/);
  const cf = cerfaDepuisIzilearn(a);
  return {
    nir: cf.nir || undefined,
    nationalite: cf.nationalite || undefined,
    departementNaissance: cf.departementNaissance || undefined,
    communeNaissance: cf.communeNaissance || undefined,
    diplome: cf.diplome || undefined,
    dateNaissanceResponsable: cf.dateNaissanceResponsable || undefined,
    cerfa: cf.complement,
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
    signatureUrl: t(a.signatureUrl) || undefined,
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
