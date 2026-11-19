import type { OrganismeInfo } from "@/types/qualiopi";

/** Fonctions de l'organisme (formulaire Organisme) qui peuvent signer une pièce. */
export type CleReferent =
  | "responsablePedagogique" | "referentHandicap" | "referentQualite" | "poleAdministratif"
  | "relationEntreprises" | "referentMobilite" | "referentDecrochage" | "coordinateurPedagogique"
  | "conseillerFormation" | "referentNumerique";

export const REFERENTS: { cle: CleReferent; libelle: string; motif: RegExp }[] = [
  { cle: "coordinateurPedagogique", libelle: "coordinateur pédagogique", motif: /coordinat\w*\s+p[ée]dagog/i },
  { cle: "responsablePedagogique", libelle: "responsable pédagogique", motif: /p[ée]dagogique/i },
  { cle: "referentHandicap", libelle: "référent handicap", motif: /handicap/i },
  { cle: "referentQualite", libelle: "référent qualité", motif: /qualit[ée]/i },
  { cle: "referentMobilite", libelle: "référent mobilité", motif: /mobilit[ée]/i },
  { cle: "poleAdministratif", libelle: "pôle administratif", motif: /administrati/i },
  { cle: "relationEntreprises", libelle: "relation entreprises", motif: /relations?\s+entreprises?/i },
  { cle: "referentDecrochage", libelle: "référent décrochage", motif: /d[ée]crochage|abandon/i },
  { cle: "conseillerFormation", libelle: "conseiller en formation", motif: /conseill/i },
  { cle: "referentNumerique", libelle: "référent numérique", motif: /num[ée]rique|distanciel/i },
];

const nomCle = (n?: string) => (n || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().split(/[\s-]+/).filter(Boolean).sort().join(" ");
const meme = (a?: string, b?: string) => !!nomCle(a) && nomCle(a) === nomCle(b);

type OrgSig = Partial<Pick<OrganismeInfo, CleReferent | "dirigeant" | "signatureReferents" | "referentQualiteSignatureUrl">>;

/** Le référent porte-t-il le même nom que le dirigeant (casse, accents, ordre ignorés) ? */
export function referentEstDirigeant(o: OrgSig | null | undefined, cle: CleReferent): boolean {
  return !!o && meme(o[cle] as string | undefined, o.dirigeant);
}

/** Signature propre saisie pour ce référent (formulaire Organisme). */
export function signaturePropreReferent(o: OrgSig | null | undefined, cle: CleReferent): string | undefined {
  if (!o) return undefined;
  return o.signatureReferents?.[cle] || (cle === "referentQualite" ? o.referentQualiteSignatureUrl : undefined) || undefined;
}

/**
 * Fonction désignée par un libellé de signature (« Le Référent Handicap », « Le Resp. Pédagogique »…).
 * Libellé générique (« Le référent ») : retrouvée par le nom du signataire.
 * Les libellés combinés avec le dirigeant ou le directeur restent au dirigeant.
 */
export function referentDepuisLibelle(o: OrgSig | null | undefined, libelle: string, nom?: string): CleReferent | null {
  const l = libelle || "";
  if (/dirigeant|directeur|organisme|cachet|[ée]quipe|stagiaire|apprenti|apprenant|candidat|b[ée]n[ée]ficiaire|formateur|employeur|ma[îi]tre|tuteur/i.test(l)) return null;
  if (/entreprise/i.test(l) && !/relations?\s+entreprise/i.test(l)) return null;
  const parLibelle = REFERENTS.find(r => r.motif.test(l));
  if (parLibelle) return parLibelle.cle;
  if (o && nom && /r[ée]f[ée]rent|responsable|p[ôo]le|coordinat|conseill/i.test(l)) {
    const parNom = REFERENTS.find(r => meme(o[r.cle] as string | undefined, nom));
    if (parNom) return parNom.cle;
  }
  return null;
}

/**
 * Signature d'un référent : même nom que le dirigeant → « dirigeant » (sa signature est reprise) ;
 * sinon la signature propre du référent si elle a été saisie ; sinon rien.
 */
export function sourceSignatureReferent(o: OrgSig | null | undefined, cle: CleReferent): { type: "dirigeant" } | { type: "propre"; url: string } | null {
  if (!o || !(o[cle] as string | undefined)?.trim()) return null;
  if (referentEstDirigeant(o, cle)) return { type: "dirigeant" };
  const url = signaturePropreReferent(o, cle);
  return url ? { type: "propre", url } : null;
}
