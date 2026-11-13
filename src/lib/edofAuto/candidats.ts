/**
 * Automatisation EDOF — lecture des dossiers d'un export « Tous les dossiers » (CSV ou XLSX)
 * et regroupement en sessions d'examen (même certification, même date de fin de session).
 */
import { formatPhone, getCol, parseEdofDate, readEdofRows } from "@/lib/edofParser";

export interface EdofCandidat {
  numeroDossier: string;
  civilite: "Mme" | "M." | "";
  nom: string;
  prenom: string;
  dateNaissance: string; // ISO
  adresse: string;
  codePostal: string;
  ville: string;
  email: string;
  telephone: string;
  codeCertif: string;
  intitule: string;
  numeroSession: string;
  dateDebut: string; // ISO
  dateFin: string; // ISO
  lieuVille: string;
  statut: string;
  dateInscription: string; // ISO
}

export interface EdofExport {
  siret: string;
  candidats: EdofCandidat[];
}

/** Dossiers dont la formation a eu lieu (ou est en cours) : seuls ceux-là passent l'examen. */
export function formationRealisee(statut: string): boolean {
  const s = statut.toLowerCase();
  if (/annul|refus|rejet|expir/.test(s)) return false;
  return /service fait|sortie|en formation|termin|factur|pay/.test(s);
}

const capitalize = (s: string) =>
  s.toLowerCase().replace(/(^|[\s'-])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase());

/** SIRET de l'organisme lu dans le nom de fichier « Export_Tous les dossiers_<SIRET>_<date>.csv ». */
export function siretDepuisNomFichier(nom: string): string {
  const m = nom.match(/(\d{14})/);
  return m ? m[1] : "";
}

export function lireExportEdof(data: ArrayBuffer, nomFichier = ""): EdofExport {
  const rows = readEdofRows(data);
  const candidats: EdofCandidat[] = rows
    .map((row) => {
      const civ = String(getCol(row, "CIVILITE", "Civilité") || "");
      const nom = String(getCol(row, "NOM", "Nom") || "").trim();
      const prenom = String(getCol(row, "PRENOM", "Prénom", "Prenom") || "").trim();
      return {
        numeroDossier: String(getCol(row, "NUMERO_DOSSIER", "N° DOSSIER", "Numéro dossier") || "").trim(),
        civilite: (/madame|mme/i.test(civ) ? "Mme" : /monsieur|^m\.?$/i.test(civ) ? "M." : "") as EdofCandidat["civilite"],
        nom: nom.toUpperCase(),
        prenom: capitalize(prenom),
        dateNaissance: parseEdofDate(getCol(row, "DATE_DE_NAISSANCE", "DATE DE NAISSANCE", "Date de naissance")),
        adresse: String(getCol(row, "ADRESSE_POSTALE", "ADRESSE POSTALE", "Adresse") || "").trim(),
        codePostal: String(getCol(row, "ADRESSE_CODE_POSTAL", "ADRESSE CODE POSTAL", "Code postal") || "").trim(),
        ville: String(getCol(row, "ADRESSE_VILLE", "ADRESSE VILLE", "Ville") || "").trim(),
        email: String(getCol(row, "COURRIEL", "EMAIL", "E-mail") || "").replace(/\\/g, "").trim(),
        telephone: formatPhone(getCol(row, "NUMERO_TELEPHONE_PORTABLE", "TELEPHONE", "Téléphone") || getCol(row, "NUMERO_TELEPHONE_FIXE")),
        codeCertif: String(getCol(row, "CODE_CERTIF/THEM", "CODE CERTIF/THEM", "CODE_CERTIF") || "").trim().toUpperCase(),
        intitule: String(getCol(row, "INTITULE_CERTIF/THEM", "INTITULE_FORMATION", "INTITULE FORMATION", "FORMATION") || "").trim(),
        numeroSession: String(getCol(row, "NUMERO_SESSION", "NUMERO SESSION") || "").trim(),
        dateDebut: parseEdofDate(getCol(row, "DATE_DEBUT_SESSION", "DATE DEBUT SESSION", "Début session")),
        dateFin: parseEdofDate(getCol(row, "DATE_FIN_SESSION", "DATE FIN SESSION", "Fin session")),
        lieuVille: String(getCol(row, "LIEU_FORMATION_VILLE", "LIEU FORMATION VILLE") || "").trim(),
        statut: String(getCol(row, "STATUT_DOSSIER", "STATUT DOSSIER", "Statut") || "").trim(),
        dateInscription: parseEdofDate(getCol(row, "DATE_INSCRIPTION", "DATE INSCRIPTION")),
      };
    })
    .filter((c) => c.nom || c.prenom);
  return { siret: siretDepuisNomFichier(nomFichier), candidats };
}

export interface DossierPdfEdof {
  candidat: EdofCandidat;
  /** Organisme lu dans « Synthèse de l'action » (« Par <nom> <adresse> ») ; l'adresse peut manquer. */
  centre: { nom: string; adresse: string; ville: string };
}

const isoDepuisFr = (d: string) => (/^\d{2}\/\d{2}\/\d{4}$/.test(d) ? `${d.slice(6)}-${d.slice(3, 5)}-${d.slice(0, 2)}` : "");

/** Statut EDOF déduit du dernier événement de l'historique du dossier. */
function statutDepuisHistorique(texte: string): string {
  const evenements: [RegExp, string][] = [
    [/Service fait validé/gi, "Service fait validé"],
    [/Déclaration service fait/gi, "Service fait déclaré"],
    [/Déclaration Sortie de formation/gi, "Sortie de formation"],
    [/Déclaration Entrée en Formation/gi, "En formation"],
    [/Validation de la proposition/gi, "Accepté"],
    [/Annulation|annulé par/gi, "Annulé"],
    [/Refus|refusé par/gi, "Refusé"],
  ];
  const debut = texte.search(/HISTORIQUE/);
  const histo = debut >= 0 ? texte.slice(debut) : texte;
  let statut = "", pos = -1;
  for (const [re, libelle] of evenements) {
    for (const m of histo.matchAll(re)) if (m.index! > pos) { pos = m.index!; statut = libelle; }
  }
  return statut;
}

/**
 * Un dossier exporté en PDF depuis l'espace OF de Mon Compte Formation
 * (« Export_PDF_dossier_n_<numéro>.pdf »), lu à partir de son texte.
 * Le PDF ne donne ni date de naissance, ni civilité, ni SIRET : laissés vides.
 */
export function lireDossierPdfEdof(texte: string): DossierPdfEdof | null {
  const t = texte.replace(/\s+/g, " ").replace(/’/g, "'");
  const numero = t.match(/Dossier N°\s*(\d{6,})/i)?.[1];
  const titulaire = t.match(/TITULAIRE Titulaire (.+?) (\S+@\S+\.\w+) ((?:\+33 ?|0)\d(?:[ .]?\d{2}){4}) (.+?) ACTION\b/);
  if (!numero || !titulaire) return null;
  // « NOM Prénom » de l'en-tête de page (la ligne du titulaire enchaîne sur le niveau de diplôme).
  const identite = t.match(/Dossier N° \d+ - (.+?) Page \d+\/\d+/)?.[1] || titulaire[1];
  const nomMots: string[] = [], prenomMots: string[] = [];
  for (const m of identite.split(" ")) {
    if (prenomMots.length === 0 && /^[A-ZÀ-Ý'-]{2,}$/.test(m)) nomMots.push(m);
    else prenomMots.push(m);
  }
  const adresseComplete = titulaire[4].trim();
  const cp = adresseComplete.match(/^(.*) (\d{5}) (.+)$/);
  const session = t.match(/Session du (\d{2}\/\d{2}\/\d{4}) au (\d{2}\/\d{2}\/\d{4})/);
  const intitule = (t.match(/Certification : (.+?) Session du/)?.[1] || t.match(/Synthèse de l'action (.+?) Session du/)?.[1] || "").trim();
  const code = t.match(/\b(RS\d{3,5}|RNCP\d{3,6})(?:BC\d{2})?\b/)?.[1] || "";
  // Nom de l'organisme, puis son adresse (qui commence par le numéro de voie) quand l'offre la donne.
  const par = t.match(/Session du \d{2}\/\d{2}\/\d{4} au \d{2}\/\d{2}\/\d{4} Par (.+?) (?:(\d.*? \d{5} .+?) )?[\d.,]+ heures de formation/);
  const adresseCentre = (par?.[2] || "").trim();
  const villeCentre = adresseCentre.match(/\d{5} (.+)$/)?.[1] || "";
  const inscription = t.match(/(\d{2})-(\d{2})-(\d{4}) à \d{2}:\d{2} Envoi demande d'inscription/);
  return {
    candidat: {
      numeroDossier: numero,
      civilite: "",
      nom: nomMots.join(" ").toUpperCase(),
      prenom: capitalize(prenomMots.join(" ")),
      dateNaissance: "",
      adresse: cp ? cp[1].trim() : adresseComplete,
      codePostal: cp ? cp[2] : "",
      ville: cp ? cp[3].trim() : "",
      email: titulaire[2],
      telephone: formatPhone(titulaire[3].replace(/[\s.]/g, "").replace(/^\+33/, "0")),
      codeCertif: code,
      intitule,
      numeroSession: t.match(/Identifiants Offre \S+ Action \S+ Session (\S+)/)?.[1] || "",
      dateDebut: session ? isoDepuisFr(session[1]) : "",
      dateFin: session ? isoDepuisFr(session[2]) : "",
      lieuVille: villeCentre,
      statut: statutDepuisHistorique(t),
      dateInscription: inscription ? `${inscription[3]}-${inscription[2]}-${inscription[1]}` : "",
    },
    centre: { nom: (par?.[1] || "").trim(), adresse: adresseCentre, ville: villeCentre },
  };
}

/** Identifiant de la formation : code de certification, ou intitulé quand l'export n'en donne pas. */
export const cleFormation = (c: EdofCandidat) => c.codeCertif || c.intitule.trim() || "Formation";

export interface SessionExamen {
  cle: string;
  /** clé de la formation (cleFormation) : code RS / RNCP, CPF200, ou intitulé */
  codeCertif: string;
  dateExamen: string; // ISO = dernier jour de formation
  candidats: EdofCandidat[];
}

/** Une session d'examen = même certification + même dernier jour de formation (règle du PV EYES PERFECT). */
export function grouperSessions(candidats: EdofCandidat[]): SessionExamen[] {
  const map = new Map<string, SessionExamen>();
  for (const c of candidats) {
    const formation = cleFormation(c);
    const cle = `${formation}|${c.dateFin}`;
    if (!map.has(cle)) map.set(cle, { cle, codeCertif: formation, dateExamen: c.dateFin, candidats: [] });
    map.get(cle)!.candidats.push(c);
  }
  return [...map.values()]
    .map((s) => ({ ...s, candidats: [...s.candidats].sort((a, b) => `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`, "fr")) }))
    .sort((a, b) => a.dateExamen.localeCompare(b.dateExamen));
}

export const frDate = (iso: string) => (/^\d{4}-\d{2}-\d{2}/.test(iso) ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : iso);

/** Âge révolu à une date donnée (ISO). */
export function ageAu(naissance: string, date: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}/.test(naissance) || !/^\d{4}-\d{2}-\d{2}/.test(date)) return null;
  let age = +date.slice(0, 4) - +naissance.slice(0, 4);
  if (date.slice(5, 10) < naissance.slice(5, 10)) age--;
  return age;
}
