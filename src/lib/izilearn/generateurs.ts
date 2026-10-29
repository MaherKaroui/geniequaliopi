/**
 * VAE et bilan de compétences : la session IZILearn alimente les générateurs dédiés
 * (générateur VAE et générateur bilan de compétences) au lieu des pièces AF / CFA.
 * Un dossier par apprenant ; ce qui manque dans la plateforme reste vide et est signalé.
 */
import { withActiveDossierStyle } from "@/lib/dossierDesign";
import { vaeDocuments } from "@/lib/vae/vaeGenerator";
import { EMPTY_CONTENTS, type VAEData } from "@/lib/vae/vaeTypes";
import { ajouterJoursOuvres, chronoVAE, isoVAE, parseDateVAE } from "@/lib/vae/vaeProfil";
import { emptyBdcData, type StandaloneBdcData } from "@/lib/bdc/standaloneTypes";
import { generateStandaloneBdcPlanning, validateStandaloneBdc } from "@/lib/bdc/standaloneModel";
import { BDC_STANDALONE_DOCUMENTS, bdcDocumentTitle, buildStandaloneBdcDocument } from "@/lib/bdc/standaloneDocuments";
import { bdcFileTag } from "@/lib/bdc/standaloneExport";
import type { Creneau, Jour } from "@/lib/bdc/bdcModel";
import type { IzApprenant, IzPayload, IzReponses } from "./types";
import type { Contexte } from "./pieces";
import { estDistanciel } from "./mapping";

export type Generateur = "vae" | "bdc";

export function generateurDedie(p: IzPayload): Generateur | null {
  return p.formation.typeAction === "vae" ? "vae" : p.formation.typeAction === "bilans-competences" ? "bdc" : null;
}

const reponsesTexte = (r?: IzReponses | null) => (r?.reponses || []).filter((x) => x.reponse?.trim()).map((x) => `${x.question} : ${x.reponse}`).join("\n");
const mixte = (p: IzPayload) => /hybride|mixte/i.test(p.session.modalite || "");

export function versVAEData(cx: Contexte, i: number): VAEData {
  const { p, o, f } = cx;
  const s = cx.stagiaires[i];
  const ref = f.referentiel;
  const code = (f.codeRNCP || "").toUpperCase();
  const num = code.replace(/\D/g, "");
  const chrono = chronoVAE(s, f, o);
  const jour = (d: Date | null) => (d ? isoVAE(d) : "");
  return {
    organisme: {
      nom: o.nom, adresse: [o.adresse, [o.codePostal, o.ville].filter(Boolean).join(" ")].filter(Boolean).join(", "),
      siret: o.siret, nda: o.nda, dirigeant: o.dirigeant, email: o.email, telephone: o.telephone, lienVisio: "",
      referentHandicap: o.referentHandicap, prixTTC: s.tarifFormation || f.tarif, duree: f.duree,
      logo: o.logoUrl, signature: o.signatureUrl, tampon: o.tamponUrl,
    },
    certification: {
      intitule: ref?.intitule || f.intitule, rncp: num, niveau: ref?.niveau ? String(ref.niveau) : "",
      certificateur: ref?.certificateur || "", dateEcheance: ref?.dateFinEnregistrement || "",
      lien: num ? `https://www.francecompetences.fr/recherche/${code.startsWith("RS") ? "rs" : "rncp"}/${num}/` : "",
      blocs: (ref?.blocs || []).map((b) => ({ code: b.code, intitule: b.intitule })),
    },
    candidat: {
      civilite: s.civilite === "Mme" || s.civilite === "M." ? s.civilite : "", prenom: s.prenom, nom: s.nom,
      dateNaissance: s.dateNaissance || "", lieuNaissance: s.communeNaissance, adresse: s.adresse || "",
      codePostal: s.codePostal || "", ville: s.commune || "", telephone: s.telephone, email: s.email,
      emploiActuel: s.poste, employeur: s.entreprise,
      statut: s.entreprise ? "Salarié" : s.financeur === "France Travail" ? "Demandeur d'emploi" : "",
      niveauFormation: s.diplome || "", diplomes: [], experiences: [], signature: s.signatureUrl,
    },
    session: {
      dateEntretienPositionnement: jour(chrono.entretienFaisabilite), dateDebut: p.session.dateDebut, dateFin: p.session.dateFin,
      dateDemandeRecevabilite: jour(chrono.depotFaisabilite),
      modalite: mixte(p) ? "Mixte (présentiel et à distance)" : estDistanciel(p) ? "100 % à distance" : "Présentiel",
      financement: "Financement personnel", lieuSignature: o.ville, dateSignature: jour(chrono.contrat),
    },
    contents: { ...EMPTY_CONTENTS, besoins: { ...EMPTY_CONTENTS.besoins, attentes: reponsesTexte(p.apprenants[i].besoins) } },
  };
}

const JOURS: Jour[] = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/** Jours et demi-journées réellement programmés dans la session, sinon toute la semaine. */
function disponibilites(p: IzPayload): { jours: Jour[]; creneaux: Creneau[] } {
  const jours = [...new Set(p.creneaux.map((c) => JOURS[new Date(c.debut).getDay()]))];
  const creneaux = [...new Set(p.creneaux.map((c): Creneau => (c.demiJournee === "matin" ? "matin" : "apres-midi")))];
  const d = emptyBdcData();
  return { jours: jours.length ? JOURS.filter((j) => jours.includes(j)) : d.jours, creneaux: creneaux.length ? creneaux : d.creneaux };
}

export function versBdcData(cx: Contexte, i: number): StandaloneBdcData {
  const { p, o, f } = cx;
  const a: IzApprenant = p.apprenants[i];
  const debut = parseDateVAE(p.session.dateDebut);
  const avant = (n: number) => (debut ? isoVAE(ajouterJoursOuvres(debut, -n)) : "");
  const base = emptyBdcData();
  const s = cx.stagiaires[i];
  // Le générateur BC attend un montant numérique (« 1 800 € » → « 1800 »).
  const prix = (v?: string) => (v || "").replace(/[^\d,.]/g, "").replace(/[.,]$/, "");
  const d: StandaloneBdcData = {
    ...base,
    ...disponibilites(p),
    organisme: { ...o, typesActions: ["bilans-competences"] },
    formation: { ...f, duree: p.formation.dureeHeures ? String(p.formation.dureeHeures) : "", tarif: prix(f.tarif), nombreParticipants: "1" },
    beneficiaire: { ...s, tarifFormation: prix(s.tarifFormation) || undefined },
    // Entretien préalable puis signature avant le délai de rétractation CPF de 11 jours ouvrés.
    dateEntretien: avant(15),
    dateSignature: avant(11),
    declarations: { ...base.declarations, besoins: reponsesTexte(a.besoins), attentes: reponsesTexte(a.besoinsEntreprise) },
  };
  try { d.sessions = generateStandaloneBdcPlanning(d); } catch { /* erreurs listées par alertesGenerateur */ }
  return d;
}

export interface DocGenerateur { id: string; titre: string; fichier: string; rendre: () => string; tablesFluides: true }

export function documentsGenerateur(cx: Contexte, i: number, g: Generateur): DocGenerateur[] {
  if (g === "vae") {
    const d = versVAEData(cx, i);
    return vaeDocuments(d).map((x, k) => ({ id: `vae${k}`, titre: x.titre, fichier: x.fichier.replace(/\.docx$/i, ""), rendre: () => withActiveDossierStyle(x.html()), tablesFluides: true }));
  }
  const d = versBdcData(cx, i);
  return BDC_STANDALONE_DOCUMENTS.map((x, k) => ({
    id: x.id, titre: bdcDocumentTitle(x.id, d), tablesFluides: true,
    fichier: `${String(k + 1).padStart(2, "0")}_${bdcFileTag(bdcDocumentTitle(x.id, d))}_${bdcFileTag(d.beneficiaire.nom)}_${bdcFileTag(d.beneficiaire.prenom)}`,
    rendre: () => buildStandaloneBdcDocument(d, x.id),
  }));
}

/** Ce que le générateur dédié exige et que la session ne fournit pas. */
export function alertesGenerateur(cx: Contexte): string[] {
  const g = generateurDedie(cx.p);
  if (g === "vae") return cx.f.referentiel?.code ? [] : ["Formation : code RNCP / RS de la certification visée (blocs, certificateur, niveau)"];
  if (g !== "bdc") return [];
  const out = new Set<string>();
  cx.p.apprenants.forEach((_, i) => {
    const s = cx.stagiaires[i];
    for (const e of validateStandaloneBdc(versBdcData(cx, i))) out.add(`Bilan de ${s.prenom} ${s.nom} : ${e}`);
  });
  return [...out];
}
