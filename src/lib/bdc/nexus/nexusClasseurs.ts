/**
 * Classeurs Excel du dossier BDC au format NEXUS, alimentés par la même chronologie que les PDF
 * (nexusModele.ts). Aucune ligne n'est datée après le jour de l'édition ; les registres tenus au
 * fil de l'eau (dysfonctionnements, abandons) sont ouverts sans ligne inventée.
 */
import { classeur } from "../bdcClasseursXlsx";
import { departementDuCodePostal } from "./departements";
import { fmt, type BenNexus, type ContexteNexus } from "./nexusModele";

const passe = (d: Date, ref: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() <= new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()).getTime();
const nomBen = (b: BenNexus) => `${b.s.prenom} ${(b.s.nom || "").toUpperCase()}`.trim();

function tete(ctx: ContexteNexus, suite: string): string {
  const v = ctx.base;
  return [v.SIRET ? `SIRET ${v.SIRET}` : "", v.NDA ? `NDA ${v.NDA}` : "", v.ORG_ADRESSE_COMPLETE, `Version ${v.VERSION}`, v.DATE_MAJ ? `Mise à jour du ${v.DATE_MAJ}` : ""]
    .filter(Boolean).join(" · ") + (suite ? ` — ${suite}` : "");
}

function effectif(ctx: ContexteNexus): string {
  const n = ctx.bens.filter((b) => b.nomme);
  const t = n.filter((b) => passe(b.dates.fin, ctx.arrete)).length;
  return `Arrêté au ${fmt(ctx.arrete)} — effectif : ${n.length} bénéficiaire${n.length > 1 ? "s" : ""}, ${t} parcours terminé${t > 1 ? "s" : ""}.`;
}

/** IND 4 — Cahier de contacts : une ligne par échange déjà intervenu. */
export function cahierContacts(ctx: ContexteNexus): string {
  const v = ctx.base;
  const rows = ctx.bens.filter((b) => b.nomme).flatMap((b) => {
    const d = b.dates;
    const tri = b.financement === "employeur" || b.financement === "OPCO";
    const lignes: Array<[Date, string[]]> = [
      [d.prealable, ["Courriel", nomBen(b), b.s.telephone || "—", b.s.email || "—", "Demande d'information — bilan de compétences", "Envoi de la fiche de présentation et du cadre légal ; entretien préalable, fiche préalable et fiche d'analyse du besoin", String(v.CONSULTANT), v.CERTIFIE_BC || tri ? "Besoin relevant du bilan — prestation acceptée" : "Besoin relevant du bilan — prestation acceptée ; CPF, OPCO et France Travail non mobilisables"]],
      [d.convention, ["Courriel", nomBen(b), b.s.telephone || "—", b.s.email || "—", "Contractualisation", `Envoi ${tri ? "de la convention tripartite" : b.financement === "CPF" ? "du contrat de prestation" : "de la convention de réalisation"}, des CGV, du règlement intérieur, du livret d'accueil et des clauses contractuelles spécifiques`, String(v.CONSULTANT), `Signée le ${fmt(d.convention)} — délai de rétractation expirant le ${fmt(d.retractation)}`]],
      [d.planning, ["Courriel", nomBen(b), b.s.telephone || "—", b.s.email || "—", "Planning des séances", `Planning des ${b.seances.length} séances arrêté d'un commun accord`, String(v.CONSULTANT), "Planning signé des deux parties"]],
      [d.convocation, ["Courriel", nomBen(b), b.s.telephone || "—", b.s.email || "—", "Confirmation du démarrage de la prestation", "Envoi du courriel de début de prestation, de la convocation et des modalités de connexion", String(v.CONSULTANT), `Première séance le ${fmt(d.debut)}`]],
    ];
    return lignes.filter(([date]) => passe(date, ctx.arrete)).map(([date, l]) => [fmt(date), ...l]);
  });
  return classeur(`${v.ORG} — Cahier de contacts`, tete(ctx, `édition du ${fmt(ctx.arrete)} ; toute demande entrante est tracée le jour même`), "Cahier de contacts",
    ["Date du contact", "Canal", "Personne", "Téléphone", "Courriel", "Objet de la demande", "Suite donnée", "Interlocuteur", "Statut"],
    rows.length ? rows : [["", "", "", "", "", "", "", "", ""]],
    ["Aucune donnée ne peut être postérieure à la date d'édition du dossier", "Le cahier trace également les demandes n'ayant pas abouti et les refus de prise en charge, avec leur motif"]);
}

/** IND 26 — Contacts et suivi handicap. */
export function contactsHandicap(ctx: ContexteNexus): string {
  const v = ctx.base;
  const dep = departementDuCodePostal(ctx.org.codePostal);
  const deps = new Map<string, { du: string; role: string }>();
  if (dep) deps.set(dep.numero, { du: dep.du, role: "département du siège" });
  for (const b of ctx.bens) {
    const d = departementDuCodePostal(b.s.codePostal);
    if (d && !deps.has(d.numero)) deps.set(d.numero, { du: d.du, role: "département de résidence d'un bénéficiaire accompagné" });
  }
  const mdph = [...deps.entries()].map(([num, d]) =>
    [`MDPH ${d.du} (${num})`, "Maison départementale des personnes handicapées", "—", `Conseil départemental ${d.du}`, `Reconnaissance RQTH, orientation, prestation de compensation — ${d.role}`]);
  return classeur(`${v.ORG} — Contacts handicap`, tete(ctx, `réseau mobilisable, mise à jour du ${v.DATE_MAJ || fmt(ctx.arrete)}`), "Contacts handicap",
    ["Structure", "Interlocuteur", "Téléphone", "Site ou contact", "Champ d'intervention"],
    [
      ["Référent handicap de l'organisme", String(v.REF_HANDICAP), String(v.ORG_TEL) || "—", String(v.ORG_EMAIL) || "—", "Accueil, analyse du besoin d'adaptation, mise en œuvre et suivi des aménagements, mise en relation avec les partenaires"],
      ["Agefiph", `Délégation régionale ${v.REGION}`, "0 800 11 10 09", "www.agefiph.fr", "Aides à la compensation du handicap en emploi et en formation"],
      ["Ressource Handicap Formation", `Agefiph — RHF ${v.REGION}`, "0 800 11 10 09", "www.agefiph.fr", "Ingénierie d'adaptation des parcours de formation et d'accompagnement"],
      ["Cap emploi", "Organisme de placement spécialisé", "—", "www.capemploi.fr", "Accompagnement vers et dans l'emploi"],
      ...mdph,
      ["FIPHFP", "Fonds pour l'insertion dans la fonction publique", "—", "www.fiphfp.fr", "Compensation du handicap pour les agents publics"],
      ["France Travail", "Conseiller référent", "3949", "www.francetravail.fr", "Dispositifs d'immersion, aides à la formation"],
    ]);
}

/** IND 26 — Suivi des adaptations par bénéficiaire : la question posée à l'entretien préalable, le reste à renseigner. */
export function suiviAdaptations(ctx: ContexteNexus): string {
  const v = ctx.base;
  const rows = ctx.bens.filter((b) => b.nomme && passe(b.dates.prealable, ctx.arrete)).map((b) =>
    [nomBen(b), fmt(b.dates.prealable), "Oui — lors de l'entretien préalable, sans obligation de déclaration de statut", "", "", "", ""]);
  return classeur(`${v.ORG} — Suivi adaptations`, tete(ctx, effectif(ctx)), "Suivi adaptations",
    ["Bénéficiaire", "Date du constat", "Question posée", "Besoin exprimé", "Adaptation mise en œuvre", "Partenaire mobilisé", "Efficacité constatée"],
    rows.length ? rows : [["", "", "", "", "", "", ""]],
    ["La question de l'adaptation est posée à l'analyse du besoin, réitérée à l'ouverture de chaque séance et lors de l'entretien intermédiaire", "Les colonnes « besoin exprimé », « adaptation » et « efficacité constatée » sont renseignées à partir des échanges avec le bénéficiaire"]);
}

/** IND 31 — Tableau des dysfonctionnements, ouvert sans ligne inventée. */
export function tableauDysfonctionnements(ctx: ContexteNexus): string {
  const v = ctx.base;
  const vide = ["", "", "", "", "", "", "", "", "", "", ""];
  return classeur(`${v.ORG} — Dysfonctionnements`, tete(ctx, effectif(ctx)), "Dysfonctionnements",
    ["Réf.", "Date du constat", "Origine", "Auteur", "Bénéficiaire concerné", "Description", "Analyse de cause", "Action corrective", "Responsable", "Échéance", "Statut"],
    [vide, vide, vide],
    ["Les réclamations formelles sont également portées au Registre des réclamations", "Toute action corrective est reportée au Tableau d'amélioration continue (indicateur 32)"]);
}

/** IND 1 — Calendrier annuel des obligations du référentiel. */
export function calendrierAnnuel(ctx: ContexteNexus): string {
  const v = ctx.base;
  const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const ligne = (dom: string, cases: Record<number, string>) => [dom, ...mois.map((_, i) => cases[i] || "")];
  const veille = "Consulter les sources, qualifier les informations, analyser leur impact et tracer les décisions au registre de veille";
  const sat = "Analyser les retours de satisfaction du trimestre écoulé";
  const rec = "Analyser les difficultés et réclamations du trimestre écoulé";
  const amel = "Revue générale de l'amélioration continue ; vérifier l'efficacité des actions soldées";
  return classeur(`${v.ORG} — Calendrier annuel`, tete(ctx, "programmation annuelle des obligations du référentiel national qualité"), "Calendrier annuel",
    ["Domaine", ...mois],
    [
      ligne("Obligations déclaratives", { 3: "Préparer le bilan pédagogique et financier", 4: "Déposer le bilan pédagogique et financier (date limite : 31 mai)" }),
      ligne("Information du public (ind. 1)", { 0: v.CERTIFIE_BC ? "Vérifier et actualiser la fiche de présentation du bilan de compétences et l'offre Mon Compte Formation" : "Vérifier et actualiser la fiche de présentation du bilan de compétences (et l'offre Mon Compte Formation après extension de la certification)", 6: "Actualiser les ressources remises aux bénéficiaires (ind. 19)" }),
      ligne("Indicateurs de résultats (ind. 2)", { 0: "Calculer les indicateurs de résultats de l'année écoulée, les publier avec leur volume et leur date d'arrêté" }),
      ligne("Compétences (ind. 21 et 22)", { 1: "Établir le plan de développement des compétences de l'année", 9: "Envoyer le document préparatoire à l'entretien individuel annuel", 11: "Réaliser l'entretien individuel annuel et actualiser les fiches de poste" }),
      ligne("Sous-traitance (ind. 27)", { 2: "Faire signer la charte des consultants sous-traitants ; vérifier CV, diplômes et attestation de RC professionnelle" }),
      ligne("Veilles (ind. 23, 24, 25)", Object.fromEntries(mois.map((_, i) => [i, veille]))),
      ligne("Satisfaction (ind. 30)", { 1: sat, 4: sat, 7: sat, 10: sat }),
      ligne("Réclamations (ind. 31)", { 2: rec, 5: rec, 8: rec, 11: rec }),
      ligne("Amélioration continue (ind. 32)", { 3: amel, 9: amel }),
      ligne("Handicap (ind. 26)", { 0: "Vérifier l'actualité des contacts partenaires handicap", 6: "Point sur les adaptations mises en œuvre et leur efficacité" }),
    ]);
}
