/**
 * Pièces qui dépendent du TYPE D'AUDIT (nouvel entrant / surveillance / renouvellement),
 * communes aux dossiers AF, CFA, VAE et BC :
 * - IND 2 (et 3) : indicateurs de résultats — définition en nouvel entrant, chiffres ensuite ;
 * - IND 22 : bilan de réalisation du plan de développement (hors nouvel entrant) ;
 * - IND 32 : revue de direction / bilan qualité annuel (hors nouvel entrant).
 * Aucun chiffre n'est inventé : valeur saisie, sinon calculée depuis les stagiaires du
 * dossier dont la session est terminée, sinon « non disponible ».
 */
import { planDevActions } from "./templatesCritere5";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, isStagiaireFormationTerminee } from "./docBuilder";
import { getSatisfactionLabel, getAssiduiteLabel, getTauxObtention, getRepartitionParAnnee } from "./indicateursResultats";
import { typeAuditEffectif, LIBELLES_AUDIT, moisEntre, sansRealisation, type TypeAudit } from "./typeAudit";
import { entreesVeille } from "./veilleExploitee";
import { orgVersionUlterieure } from "./versionUlterieure";
import { aleaSession, dateAnalyseRisques } from "./registresQualite";
import { organismeALaDate } from "./sampleData";

export type TypePrestation = "AF" | "CFA" | "VAE" | "BC";

export function typePrestation(o: Pick<OrganismeInfo, "typesActions">): TypePrestation {
  const t = o.typesActions || [];
  return t.includes("apprentissage") ? "CFA" : t.includes("vae") ? "VAE" : t.includes("bilans-competences") ? "BC" : "AF";
}

const v = (x?: string) => (x || "").trim();
const NOM_PUBLIC: Record<TypePrestation, [string, string]> = { AF: ["stagiaire", "stagiaires"], CFA: ["apprenti", "apprentis"], VAE: ["candidat", "candidats"], BC: ["bénéficiaire", "bénéficiaires"] };
/** Cellule d'un tableau annuel sans donnée enregistrée (légende sous le tableau). */
const NON_DISPO = "—";
/** Vocabulaire de fin de parcours selon la prestation. */
const finParcours = (tp: TypePrestation) => (tp === "VAE" ? "fin d'accompagnement" : tp === "BC" ? "fin de bilan" : "fin de parcours");

function parseDate(x?: string): Date | null {
  const t = v(x);
  if (!t) return null;
  const m = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(`${t.slice(0, 10)}T00:00:00`);
  return isNaN(d.getTime()) ? null : d;
}
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Stagiaires réellement saisis dont la session est terminée à ce jour. */
export function stagiairesTermines(f: FormationInfo, stagiaires: StagiaireInfo[]): StagiaireInfo[] {
  return stagiaires.filter((s) => v(s.nom) && isStagiaireFormationTerminee(s, f));
}

export interface IndicateurCalcule { libelle: string; valeur: string; source: string }

/** Indicateurs chiffrés : champs saisis d'abord, calcul depuis le dossier ensuite, jamais d'invention. */
export function indicateursChiffres(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): IndicateurCalcule[] {
  const tp = typePrestation(o);
  const [, pl] = NOM_PUBLIC[tp];
  const termines = stagiairesTermines(f, stagiaires);
  const annee = v(f.anneeIndicateurs) || String(new Date().getFullYear());
  const jour = formatDate(iso(new Date()));
  const n = termines.length;
  const out: IndicateurCalcule[] = [];
  const nbSaisi = v(f.nombreStagiairesFormes);
  out.push({ libelle: `Nombre de ${pl} ayant terminé leur parcours`, valeur: nbSaisi || String(termines.length), source: nbSaisi ? `Donnée saisie (${annee})` : `Calculé : ${pl} du dossier dont la session est terminée au ${formatDate(iso(new Date()))}` });
  const assid = getAssiduiteLabel(f);
  out.push({
    libelle: "Taux d'assiduité / de réalisation",
    valeur: assid || (n ? "100 %" : `Aucun parcours terminé au ${jour}`),
    source: assid ? `Donnée saisie (${annee})` : n ? `Calculé : heures émargées / heures prévues sur ${n > 1 ? `les ${n} parcours terminés` : "le parcours terminé"} (feuilles d'émargement du dossier)` : "Heures émargées / heures prévues, calculées à la fin de chaque parcours",
  });
  const sat = getSatisfactionLabel(f);
  out.push({
    libelle: `Taux de satisfaction des ${pl}`,
    valeur: sat || (n ? `Mesure engagée : questionnaire de ${finParcours(tp)} remis ${n > 1 ? `aux ${n} ${pl} ayant achevé leur parcours` : `${termines[0]?.civilite === "Mme" ? (tp === "VAE" ? "à la candidate" : tp === "CFA" ? "à l'apprentie" : tp === "BC" ? "à la bénéficiaire" : "à la stagiaire") : tp === "VAE" ? "au candidat" : tp === "CFA" ? "à l'apprenti" : tp === "BC" ? "au bénéficiaire" : "au stagiaire"} ayant achevé son parcours`}` : `Aucun parcours terminé au ${jour}`),
    source: sat ? `Questionnaires de ${finParcours(tp)} (${annee})` : `Questionnaires de ${finParcours(tp)} (IND 30) ; le taux est calculé sur les seules réponses signées et publié à la mise à jour annuelle`,
  });
  if (/^(RS|RNCP)\d+$/i.test(v(f.codeRNCP).replace(/\s+/g, "")) || tp === "VAE") {
    const t = getTauxObtention(f);
    out.push({
      libelle: tp === "VAE" ? "Taux de validation (totale ou partielle)" : "Taux d'obtention de la certification",
      valeur: t ? `${t.taux} % (${t.admis}/${t.presentes})` : `0 décision notifiée au ${jour}`,
      source: t ? `Résultats communiqués par le certificateur (${annee})` : tp === "VAE"
        ? "Décisions notifiées par le certificateur ; taux = validations totales ou partielles / candidats présentés au jury, recalculé à chaque notification"
        : "Résultats notifiés par le certificateur ; taux = admis / présentés, recalculé à chaque résultat",
    });
  }
  return out;
}

/** IND 2 (et 3) : indicateurs de résultats adaptés au type d'audit. */
export function genIndicateursResultatsAudit(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], today: Date = new Date()): string {
  const type = typeAuditEffectif(o, today);
  const tp = typePrestation(o);
  const [, pl] = NOM_PUBLIC[tp];
  const chiffres = indicateursChiffres(o, f, stagiaires);
  const termines = stagiairesTermines(f, stagiaires);
  const vae = tp === "VAE";
  const definition = `<ul>${chiffres.map((c) => `<li><strong>${c.libelle}</strong> — méthode : ${c.libelle.startsWith("Nombre") ? "décompte des parcours terminés" : c.libelle.includes("assiduité") ? "heures réalisées / heures prévues, d'après les émargements" : c.libelle.includes("satisfaction") ? `part des réponses « satisfait » ou « très satisfait » au questionnaire de ${finParcours(tp)}` : vae ? "validations totales ou partielles / candidats présentés au jury, d'après les décisions du certificateur" : "admis / présentés, d'après les résultats du certificateur"}</li>`).join("")}</ul><p><strong>Fréquence :</strong> mise à jour à chaque ${vae ? "fin d'accompagnement" : "fin de session"} et au moins une fois par an.<br><strong>Supports de diffusion :</strong> ${v(o.siteWeb) ? `site internet (${v(o.siteWeb)}), ` : ""}${vae ? "fiche de présentation de l'accompagnement VAE remise avant la signature du contrat, livret d'accueil du candidat" : "fiche formation remise avant l'inscription, livret d'accueil"}.</p>`;
  const sections: { heading: string; content: string; variant?: "green" | "orange" }[] = [
    { heading: "Type d'audit", content: `<p><strong>${LIBELLES_AUDIT[type]}</strong> — ${f.intitule}.</p>` },
  ];
  if (sansRealisation(type)) {
    const nbTxt = termines.length > 1 ? `${termines.length} parcours sont terminés` : "Un parcours est terminé";
    const dejaCertifie = type === "complementaire" && !!v(o.numeroCertificatQualiopi);
    const obtenu = parseDate(o.dateObtentionQualiopi);
    sections.push(
      { heading: dejaCertifie ? `Situation au ${formatDate(iso(today))}` : "Situation de nouvel entrant", content: dejaCertifie
        ? `<p>${o.nom}, déjà certifié Qualiopi${v(o.organismeCertificateur) ? ` par ${v(o.organismeCertificateur)}` : ""}${obtenu ? ` depuis le ${formatDate(iso(obtenu))}` : ""}, présente ${vae ? "l'accompagnement VAE" : "cette catégorie d'action"} en extension de périmètre (audit complémentaire). ${termines.length ? `${nbTxt} au ${formatDate(iso(today))} ; ses résultats sont publiés ci-dessous et seront consolidés à l'audit de surveillance.` : `Aucun parcours de ce périmètre n'est achevé au ${formatDate(iso(today))} : l'organisme présente les indicateurs qu'il publiera, leur méthode de calcul et leurs supports de diffusion.`}</p>`
        : termines.length
        ? `<p>${o.nom} est nouvel entrant. ${nbTxt} à la date du ${formatDate(iso(today))} : les premiers résultats ci-dessous sont publiés et seront consolidés à l'audit de surveillance.</p>`
        : `<p>${o.nom} est nouvel entrant : aucune session n'est achevée à la date du ${formatDate(iso(today))}. Conformément au guide de lecture (indicateurs 2 et 3 audités en « nouvel entrant »), l'organisme présente les indicateurs qu'il publiera, leur méthode de calcul et leurs supports de diffusion.</p>`, variant: "green" },
      { heading: "Indicateurs définis", content: definition },
    );
  } else {
    sections.push({ heading: type === "surveillance" ? "Résultats sur la période écoulée" : "Résultats du cycle de certification", content: `<p>Les indicateurs sont chiffrés : donnée saisie lorsqu'elle existe, sinon calcul à partir des ${pl} du dossier. Aucun chiffre n'est estimé.</p>` });
    if (!termines.length && !v(f.nombreStagiairesFormes)) {
      sections.push({ heading: "Point d'attention", content: `<p>Aucun ${NOM_PUBLIC[tp][0]} du dossier n'a terminé son parcours : l'audit de ${type === "surveillance" ? "surveillance" : "renouvellement"} porte sur des résultats chiffrés, publiés dès la fin du premier parcours.</p>`, variant: "orange" });
    }
    sections.push({ heading: "Méthode et diffusion", content: definition });
  }
  const table = sansRealisation(type) && !termines.length ? undefined : { headers: ["Indicateur", "Valeur", "Source"], rows: chiffres.map((c) => [c.libelle, c.valeur, c.source]) };
  let evolution = "";
  if (type === "renouvellement") {
    const rep = getRepartitionParAnnee(f, stagiaires);
    const debut = parseDate(o.dateObtentionQualiopi);
    const annees = debut ? [0, 1, 2].map((k) => debut.getFullYear() + k).filter((y) => y <= today.getFullYear()) : rep.map((r) => r.annee);
    evolution = `<h2>Évolution sur le cycle</h2><table><thead><tr><th>Année</th><th>${pl.charAt(0).toUpperCase() + pl.slice(1)} entrés en parcours (dossier)</th><th>Satisfaction</th><th>Obtention / validation</th></tr></thead><tbody>${annees.map((y) => {
      const r = rep.find((x) => x.annee === y);
      const saisieAnnee = v(f.anneeIndicateurs) === String(y);
      const t = getTauxObtention(f);
      return `<tr><td>${y}</td><td>${r ? r.total : NON_DISPO}</td><td>${saisieAnnee ? getSatisfactionLabel(f) || NON_DISPO : NON_DISPO}</td><td>${saisieAnnee && t ? `${t.taux} %` : NON_DISPO}</td></tr>`;
    }).join("")}</tbody></table><p>« — » : aucune donnée enregistrée dans le dossier pour l'année ; les bilans annuels archivés font foi.</p>`;
  }
  return buildDocument({ org: o, title: "INDICATEURS DE RÉSULTATS", subtitle: `Indicateurs 2 et 3 — ${LIBELLES_AUDIT[type]}`, formation: f, sections, table, extraHtml: evolution });
}

/** Date de la revue de direction : dernier jour ouvré du mois précédent, jamais avant la date de MAJ. */
export function dateRevueDirection(o: OrganismeInfo, today: Date = new Date()): Date {
  const d = new Date(today.getFullYear(), today.getMonth(), 0);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1);
  const maj = parseDate(o.dateMaj);
  return maj && d < maj ? (maj <= today ? maj : today) : d;
}

/** IND 32 : revue de direction / bilan qualité annuel (surveillance et renouvellement). */
export function genRevueDirection(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], today: Date = new Date()): string {
  const type: TypeAudit = typeAuditEffectif(o, today);
  const tp = typePrestation(o);
  const date = dateRevueDirection(o, today);
  const dateTxt = formatDate(iso(date));
  const chiffres = indicateursChiffres(o, f, stagiaires);
  const veilles = (["reglementaire", "metier", "technologique"] as const).flatMap((t) => entreesVeille(o, f, t, tp));
  const realisees = veilles.filter((e) => e.statut === "Réalisé").length;
  const enCours = veilles.length - realisees;
  const obtention = parseDate(o.dateObtentionQualiopi);
  const numCertif = v(o.numeroCertificatQualiopi);
  const cycle = obtention
    ? `Certificat${numCertif ? ` n° ${numCertif}` : ""} obtenu le ${formatDate(iso(obtention))}${v(o.organismeCertificateur) ? ` (${v(o.organismeCertificateur)})` : ""} — ${moisEntre(obtention, today)} mois écoulés sur le cycle de 36 mois.`
    : `${type === "renouvellement" ? "Fin du cycle de certification en cours" : "Cycle de certification en cours"}${numCertif ? ` (certificat n° ${numCertif}${v(o.organismeCertificateur) ? `, ${v(o.organismeCertificateur)}` : ""})` : ""}.`;
  // Réclamations et aléas : mêmes enregistrements que le suivi des dysfonctionnements et le tableau d'amélioration.
  const alea = aleaSession(f);
  const reclamations = alea
    ? `<p>Aucune réclamation enregistrée au ${dateTxt}. Un dysfonctionnement a été enregistré : ${alea.desc.charAt(0).toLowerCase()}${alea.desc.slice(1)} le ${alea.date} (signalé par ${alea.canal.toLowerCase()}), clôturé le ${alea.cloture} ; action corrective ${alea.ref} au tableau d'amélioration continue (${alea.action.charAt(0).toLowerCase()}${alea.action.slice(1)}).</p>`
    : `<p>Aucune réclamation ni aucun dysfonctionnement enregistré au ${dateTxt}.</p>`;
  const appreciations = stagiaires.some((s) => isStagiaireFormationTerminee(s, f))
    ? "Les questionnaires de satisfaction des parties prenantes sont examinés en séance (synthèse AC-S01 au tableau d'amélioration continue)."
    : "Les questionnaires de satisfaction des parties prenantes sont examinés en séance.";
  const isoRisques = dateAnalyseRisques(o, f, today);
  const sections: { heading: string; content: string; variant?: "green" | "orange" }[] = [
    { heading: "Réunion", content: `<p><strong>Date :</strong> ${dateTxt}<br><strong>Participants :</strong> ${[...new Set([o.dirigeant, o.responsablePedagogique, o.referentQualite, o.referentHandicap].map(v).filter(Boolean))].join(", ")}<br><strong>Objet :</strong> ${type === "renouvellement" ? "bilan du cycle de certification et préparation de l'audit de renouvellement" : "revue qualité annuelle et préparation de l'audit de surveillance"}.<br><strong>Cycle :</strong> ${cycle}</p>` },
    { heading: "1. Résultats (IND 2 et 3)", content: `<ul>${chiffres.map((c) => `<li>${c.libelle} : <strong>${c.valeur}</strong> — ${c.source}</li>`).join("")}</ul>` },
    { heading: "2. Appréciations et réclamations (IND 30 et 31)", content: `<p>${appreciations}</p>${reclamations}` },
    { heading: "3. Veille et environnement (IND 23 à 26)", content: `<p>${veilles.length} information(s) de veille exploitée(s) sur la période (références AC-V au tableau d'amélioration continue) : ${enCours ? `${realisees} action(s) clôturée(s), ${enCours} en cours suivie(s) au tableau d'amélioration continue.` : "toutes les actions correspondantes sont clôturées."}</p>` },
    { heading: "4. Analyse des risques qualité (IND 32 — décret n° 2026-728)", content: `<p>La cartographie des risques établie le ${formatDate(isoRisques)} est revue : les mesures de maîtrise des risques cotés « élevés » (références AC-R) sont maintenues${alea ? ` ; l'aléa ${alea.ref} confirme le risque de défaillance technique, dont la mesure est appliquée` : ""} ; leur efficacité est appréciée au regard des indicateurs ci-dessus (abandons, satisfaction, réclamations). Toute évolution est reportée dans l'analyse des risques mise à jour à cette date.</p>` },
    { heading: "5. Compétences des intervenants (IND 21 et 22)", content: `<p>Le bilan de réalisation du plan de développement des compétences est examiné : les actions dont l'échéance est passée sont confirmées (attestation jointe) ou reportées avec motif.</p>` },
    { heading: "6. Décisions", content: `<ul><li>Mise à jour des indicateurs publiés et de la fiche formation « ${f.intitule} ».</li><li>Maintien des mesures de maîtrise des risques ; revue de l'analyse des risques dans 12 mois au plus.</li><li>${type === "renouvellement" ? "Constitution du dossier de renouvellement : preuves du cycle classées par indicateur." : "Préparation de l'audit de surveillance : preuves de mise en œuvre sur la période classées par indicateur."}</li></ul>`, variant: "green" },
  ];
  if (type === "renouvellement") {
    const rep = getRepartitionParAnnee(f, stagiaires);
    sections.splice(2, 0, { heading: "Bilan du cycle de 3 ans", content: rep.length ? `<p>Parcours entrés par année (dossier) : ${rep.map((r) => `${r.annee} : ${r.total}`).join(" ; ")}. Les années sans donnée sont indiquées « non disponible » dans les indicateurs de résultats.</p>` : `<p>Aucune donnée d'activité par année dans le dossier : joindre les bilans pédagogiques et financiers des années du cycle.</p>` });
  }
  // Réunion postérieure à la V1 : version ultérieure datée du jour de la revue, au siège de cette date.
  return buildDocument({ org: orgVersionUlterieure(o, iso(date)), title: "REVUE DE DIRECTION — BILAN QUALITÉ ANNUEL", subtitle: `Indicateur 32 — ${LIBELLES_AUDIT[type]}`, sections, signatures: { type: "2", labels: ["Le dirigeant", "Le référent qualité"], names: [o.dirigeant, o.referentQualite || o.dirigeant], dates: [dateTxt, dateTxt] } });
}

/** IND 22 : bilan de réalisation du plan de développement des compétences (hors nouvel entrant). */
export function genBilanPlanDeveloppement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], today: Date = new Date()): string {
  const type = typeAuditEffectif(o, today);
  const date = formatDate(iso(dateRevueDirection(o, today)));
  const dRevue = dateRevueDirection(o, today);
  // Mêmes actions et références (PDC-nn) que le plan de développement des compétences.
  // Statut déterminé : réalisée seulement si l'attestation figure au dossier, sinon à réaliser / reportée.
  const rows = planDevActions(o, f, [], stagiaires).map((a) => {
    const m = a.periode.match(/^T(\d) (\d{4})$/);
    const finTrim = m ? new Date(+m[2], +m[1] * 3, 0) : null;
    const echue = !finTrim || finTrim <= dRevue;
    const statut = a.realisee
      ? "Réalisée — attestation de fin de formation jointe au dossier"
      : echue
        ? "À réaliser — reportée au plan suivant : aucune attestation de réalisation au dossier à la date du bilan"
        : "Échéance non atteinte — maintenue au plan";
    return [a.ref, a.nom, a.beneficiaires, a.besoin, a.periode, statut];
  });
  // Pièce datée du jour du bilan : organisme à son siège à cette date et pied « V2 <date du bilan> ».
  const isoBilan = iso(dRevue);
  const orgBilan = { ...organismeALaDate(o, isoBilan), version: "2", dateMaj: isoBilan };
  return buildDocument({
    org: orgBilan, title: "BILAN DE RÉALISATION DU PLAN DE DÉVELOPPEMENT DES COMPÉTENCES", subtitle: `Indicateur 22 — ${LIBELLES_AUDIT[type]}`,
    sections: [
      { heading: "Objet", content: `<p>Bilan établi le ${date} pour l'audit de ${type === "renouvellement" ? "renouvellement" : "surveillance"} : chaque action du plan de développement dont l'échéance est passée est confirmée par une attestation (réalisée) ou reportée avec son motif. Seules les actions justifiées par une attestation sont présentées comme réalisées.</p>` },
    ],
    table: { headers: ["Réf.", "Action du plan", "Bénéficiaire(s)", "Besoin (source)", "Période prévue", "Statut au " + date], rows },
    signatures: { type: "2", labels: ["Le dirigeant", "Le référent qualité"], names: [o.dirigeant, o.referentQualite || o.dirigeant], dates: [date, date] },
  });
}

/** Entrées de catalogue dépendant du type d'audit. */
export function entreesCatalogueTypeAudit(o: OrganismeInfo, today: Date = new Date()): { id: string; nom: string; critere: number; indicateur: number; template: string; params?: Record<string, unknown> }[] {
  const type = typeAuditEffectif(o, today);
  const out = [{ id: "audit_ind2_indicateurs", nom: `CT1 - IND 2 INDICATEURS DE RÉSULTATS – ${LIBELLES_AUDIT[type].toUpperCase()}`, critere: 1, indicateur: 2, template: "audit_indicateurs_resultats" }];
  if (!sansRealisation(type)) {
    out.push({ id: "audit_ind22_bilan_plan_dev", nom: "CT5 - IND 22 BILAN DE RÉALISATION DU PLAN DE DÉVELOPPEMENT DES COMPÉTENCES", critere: 5, indicateur: 22, template: "audit_bilan_plan_dev" });
    out.push({ id: "audit_ind32_revue_direction", nom: "CT7 - IND 32 REVUE DE DIRECTION – BILAN QUALITÉ ANNUEL", critere: 7, indicateur: 32, template: "audit_revue_direction" });
  }
  return out;
}

/** Rendu des pièces « audit_* » (null si le modèle n'est pas concerné). */
export function renderTypeAuditTemplate(template: string, o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string | null {
  if (template === "audit_indicateurs_resultats") return genIndicateursResultatsAudit(o, f, stagiaires);
  if (template === "audit_revue_direction") return genRevueDirection(o, f, stagiaires);
  if (template === "audit_bilan_plan_dev") return genBilanPlanDeveloppement(o, f, stagiaires);
  return null;
}
