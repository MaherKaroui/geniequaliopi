/**
 * Plans et tableaux des missions 2, 4, 7, 8 et 9 (article L.6231-2) — sans chiffre,
 * partenaire ni statut inventé : dates tirées de la session, statut « Réalisée »
 * seulement pour une date passée, indicateurs calculés à partir des données du dossier.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML } from "./docBuilder";
import { lundiMission } from "./calendrierMissionsCFA";
import { MISSIONS_REF } from "./missionsCFA2026";

const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fr = (d: Date) => formatDate(iso(d));
const valides = (st: StagiaireInfo[]) => st.filter((s) => (s.nom || "").trim());
const parse = (x?: string) => { const d = new Date(`${(x || "").slice(0, 10)}T00:00:00`); return isNaN(d.getTime()) ? null : d; };
const statut = (d: Date) => (d.getTime() <= today0().getTime() ? "Réalisée" : "Planifiée");

interface Jalon { date: Date; statut: string }

/** Date d'une action placée à une fraction de la session. */
function jalonSession(f: FormationInfo, ratio: number): Jalon {
  const a = parse(f.dateDebut) || today0();
  const b = parse(f.dateFin) || new Date(a.getTime() + 300 * 86400000);
  const d = new Date(a.getTime() + (b.getTime() - a.getTime()) * ratio);
  return { date: d, statut: statut(d) };
}

function jalonMission(f: FormationInfo, n: number, stagiaires: StagiaireInfo[]): Jalon {
  const d = lundiMission(f, n, valides(stagiaires)[0]);
  return { date: d, statut: statut(d) };
}

/** Journée internationale des droits des femmes (8 mars), si elle tombe dans la session. */
function huitMars(f: FormationInfo): Jalon | null {
  const a = parse(f.dateDebut), b = parse(f.dateFin);
  if (!a || !b) return null;
  for (let y = a.getFullYear(); y <= b.getFullYear(); y++) {
    const d = new Date(y, 2, 8);
    if (d >= a && d <= b) return { date: d, statut: statut(d) };
  }
  return null;
}

function repartitionFH(stagiaires: StagiaireInfo[]): string {
  const v = valides(stagiaires);
  if (!v.length) return "Aucun apprenti renseigné";
  const fem = v.filter((s) => s.civilite === "Mme").length;
  const hom = v.filter((s) => s.civilite === "M.").length;
  const nr = v.length - fem - hom;
  return `${fem} femme(s) et ${hom} homme(s) sur ${v.length} apprenti(s)${nr ? ` (${nr} non renseigné(s))` : ""}`;
}

function planMission(
  o: OrganismeInfo, f: FormationInfo, n: number, titre: string, cadre: string,
  actions: { libelle: string; jalon: Jalon | null; pilote: string }[], indicateurs: string[][],
): string {
  const m = MISSIONS_REF.find((x) => x.n === n)!;
  const rows = actions.filter((a) => a.jalon).map((a) => [a.libelle, fr(a.jalon!.date), a.pilote, a.jalon!.statut]);
  return buildDocument({
    org: o,
    title: titre,
    subtitle: `Mission ${n} — article L.6231-2, ${n}° du Code du travail`,
    formation: f,
    sections: [
      { heading: "Cadre", content: `<p>${m.alinea}</p>${cadre}` },
      { heading: "Responsable", content: `<p>${m.responsable(o)} — ${o.email || "adresse du CFA"}${o.telephone ? ` / ${o.telephone}` : ""}.</p>` },
    ],
    table: { headers: ["Action", "Date", "Pilote", "Statut"], rows },
    extraHtml: `<h2>Indicateurs de suivi (données du dossier)</h2>${tableHTML(["Indicateur", "Valeur"], indicateurs)}<p style="margin-top:8px">Statuts établis au ${fr(today0())} : une action n'est « réalisée » que si sa date est passée ; sa preuve (émargement, support, compte rendu) est conservée dans le dossier de la mission.</p>`,
  });
}

/** Mission 7 — mixité et égalité femmes-hommes, prévention du harcèlement sexuel. */
export function genPlanMixiteEgaliteFH2026(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const r = MISSIONS_REF[6].responsable(o);
  return planMission(o, f, 7, "PLAN D'ACTIONS — MIXITÉ ET ÉGALITÉ FEMMES-HOMMES",
    "<p>Le plan comprend la sensibilisation des formateurs, des maîtres d'apprentissage et des apprentis, et l'information sur la prévention du harcèlement sexuel et des agissements sexistes (numéro national 3919 pour les violences faites aux femmes).</p>",
    [
      { libelle: "Information des apprentis sur la prévention du harcèlement sexuel et des agissements sexistes (rentrée)", jalon: jalonSession(f, 0.02), pilote: r },
      { libelle: "Atelier Mission 7 et QCM", jalon: jalonMission(f, 7, stagiaires), pilote: r },
      { libelle: "Sensibilisation des maîtres d'apprentissage lors des visites de suivi", jalon: jalonSession(f, 0.35), pilote: MISSIONS_REF[2].responsable(o) },
      { libelle: "Journée internationale des droits des femmes (8 mars)", jalon: huitMars(f), pilote: r },
      { libelle: "Bilan présenté au conseil de perfectionnement", jalon: jalonSession(f, 0.9), pilote: o.dirigeant },
    ],
    [["Répartition femmes-hommes de la session", repartitionFH(stagiaires)], ["Signalements liés au sexisme", "Suivis dans le registre des réclamations (IND 31)"]]);
}

/** Mission 8 — mixité des métiers et égalité professionnelle. */
export function genPlanMixiteMetiers2026(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const r = MISSIONS_REF[7].responsable(o);
  return planMission(o, f, 8, "PLAN D'ACTIONS — MIXITÉ DES MÉTIERS ET ÉGALITÉ PROFESSIONNELLE",
    `<p>Métier préparé : ${f.intitule}${f.codeRNCP ? ` (${f.codeRNCP})` : ""}. Les données nationales de mixité du métier sont consultées dans les publications de la DARES et de France Travail avant chaque action et ne sont citées qu'avec leur source.</p>`,
    [
      { libelle: "Atelier Mission 8 « Stéréotypes et métiers » et QCM", jalon: jalonMission(f, 8, stagiaires), pilote: r },
      { libelle: "Témoignage d'un(e) professionnel(le) exerçant le métier dans une situation où son sexe est minoritaire", jalon: jalonSession(f, 0.45), pilote: r },
      { libelle: "Relecture épicène des supports de recrutement et de communication", jalon: jalonSession(f, 0.1), pilote: o.poleAdministratif || o.dirigeant },
      { libelle: "Analyse des candidatures et des admissions par sexe", jalon: jalonSession(f, 0.85), pilote: o.dirigeant },
    ],
    [["Répartition femmes-hommes de la session", repartitionFH(stagiaires)]]);
}

/** Mission 9 — diversité et accompagnement des apprentis victimes de discriminations. */
export function genPlanDiversite2026(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const r = MISSIONS_REF[8].responsable(o);
  const v = valides(stagiaires);
  return planMission(o, f, 9, "PLAN D'ACTIONS — DIVERSITÉ ET LUTTE CONTRE LES DISCRIMINATIONS",
    "<p>Tout apprenti victime de discrimination est reçu sans délai, accompagné et, si besoin, orienté vers le Défenseur des droits (3928) ; la situation est traitée selon la procédure de traitement sans délai des ruptures, violences et discriminations (IND 14).</p>",
    [
      { libelle: "Affichage de la charte de la laïcité et des contacts d'aide (rentrée)", jalon: jalonSession(f, 0.01), pilote: o.poleAdministratif || o.dirigeant },
      { libelle: "Atelier Mission 9 et QCM", jalon: jalonMission(f, 9, stagiaires), pilote: r },
      { libelle: "Revue des critères de sélection des candidats (non-discrimination)", jalon: jalonSession(f, 0.2), pilote: o.dirigeant },
      { libelle: "Bilan présenté au conseil de perfectionnement", jalon: jalonSession(f, 0.9), pilote: o.dirigeant },
    ],
    [["Apprentis en situation de handicap (RQTH) dans la session", `${v.filter((s) => s.rqth === "oui").length} / ${v.length}`], ["Signalements pour discrimination", "Suivis dans le registre des réclamations (IND 31)"]]);
}

/** Mission 4 — information sur les droits et devoirs et la santé-sécurité, tracée par apprenti. */
export function genInformationDroitsDevoirsSST2026(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const t = today0();
  const rows = valides(stagiaires).map((s) => {
    const deb = parse(s.dateDebutFormation) || parse(f.dateDebut) || t;
    const n = new Date(s.dateNaissance || "");
    const mineur = !isNaN(n.getTime()) && (deb.getTime() - n.getTime()) / (365.25 * 86400000) < 18;
    return [`${s.prenom} ${s.nom}`, fr(deb), mineur ? "Oui — information renforcée, représentants légaux informés" : "Non", deb.getTime() <= t.getTime() ? "Délivrée — attestation de remise signée" : "Prévue à la rentrée"];
  });
  return buildDocument({
    org: o,
    title: "INFORMATION DES APPRENTIS — DROITS ET DEVOIRS, SANTÉ ET SÉCURITÉ (MISSION 4)",
    subtitle: "Article L.6231-2, 4° — indicateurs Qualiopi 9 et 15",
    formation: f,
    sections: [
      { heading: "Obligation", content: `<p>${MISSIONS_REF[3].alinea}</p>` },
      { heading: "Contenu de la séance de rentrée", content: "<ul><li>Statut d'apprenti salarié : contrat, rémunération, temps de travail, congés, période d'essai, rupture</li><li>Obligations : assiduité au CFA et en entreprise, règlement intérieur, justification des absences</li><li>Santé et sécurité : visite d'information et de prévention, équipements de protection, travaux interdits ou réglementés pour les mineurs</li><li>Prévention et signalement des violences, du harcèlement moral ou sexuel, des agissements sexistes et des discriminations ; interlocuteurs ; médiateur de l'apprentissage de la chambre consulaire compétente (IND 15, décret n° 2026-728)</li></ul>" },
      { heading: "Modalités", content: "<p>Séance collective le premier jour au CFA, remise du livret d'accueil et du document « Droits et devoirs de l'apprenti », attestation de remise signée par l'apprenti (et par ses représentants légaux s'il est mineur). Rappel lors de l'atelier Mission 4.</p>" },
    ],
    table: { headers: ["Apprenti", "Date d'entrée", "Mineur à l'entrée", "Information"], rows },
  });
}

/** Mission 2 — suivi des candidats et apprentis sans contrat, à partir des données du dossier. */
export function genTableauCandidatsSansContrat2026(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const v = valides(stagiaires);
  const rows = v.map((s) => {
    const avec = !!(s.entreprise || "").trim();
    return [`${s.prenom} ${s.nom}`, avec ? `Oui — ${s.entreprise}` : "Non", avec ? "Contrat signé : suivi par le maître d'apprentissage et le CFA" : "Accompagnement renforcé : ateliers CV et entretien, mises en relation, 3 mois au plus en formation sans contrat", fr(today0())];
  });
  const sans = v.filter((s) => !(s.entreprise || "").trim()).length;
  return buildDocument({
    org: o,
    title: "TABLEAU DE SUIVI — CANDIDATS ET APPRENTIS SANS CONTRAT (MISSION 2)",
    subtitle: "Article L.6231-2, 2° — indicateurs Qualiopi 10, 12 et 29",
    formation: f,
    sections: [{ heading: "Règle", content: `<p>Une personne peut débuter sa formation sans employeur et rester en formation au CFA trois mois au plus (article L.6222-12-1 du Code du travail) ; le CFA l'accompagne activement dans sa recherche. Tableau tenu par ${MISSIONS_REF[1].responsable(o)}.</p>` }],
    table: { headers: ["Personne", "Employeur", "Situation / accompagnement", "Mise à jour"], rows },
    extraHtml: `<p><strong>Situation de la session :</strong> ${v.length - sans} apprenti(s) sous contrat, ${sans} sans contrat.</p>`,
  });
}
