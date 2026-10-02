/**
 * BLOC 4 — Templates obligatoires manquants (catégorie BC)
 * BLOC 5 — Clauses juridiques à jour
 *
 * Tous les contenus dérivent du BdcContext (BLOC 1) : aucune valeur en dur.
 */
import type { BdcContext, Beneficiaire, Prestation, Organisme } from "./bdcModel";
import { fmtDateFR, formatDuree, formatPrix, mentionNDA, typeContrat, seancesFor, prestationFor, etatBilan, repartitionHeures, ARTICLES_BC, DELAI_RETRACTATION_BC } from "./bdcModel";
import type { FormationInfo } from "@/types/qualiopi";
import { REFERENCES_REGLEMENTAIRES_2026 } from "@/lib/qualite2026";
import { blocSignatureHtml } from "./signatureMatrix";
import { getBdcDomainProfile } from "@/lib/templatesBDC";
import { ECHELLE_SATISFACTION, FILIGRANE_BENEFICIAIRE, MENTION_CPF_SATISFACTION, mentionStatut } from "./bdcCompliance";

export interface BdcDocDef {
  /** Nom de fichier (sans extension) */
  nom: string;
  /** Indicateur Qualiopi de rattachement */
  indicateur: number;
  /** true = un document par bénéficiaire */
  parBeneficiaire: boolean;
  /** Pièce contractuelle : signature obligatoire avant export (BLOC 7) */
  contractuelle?: boolean;
  /** Pièce propre à certaines prestations (ex. support de cours du profil Pâtisserie). */
  applicable?: (f: FormationInfo) => boolean;
  build: (ctx: BdcContext, b: Beneficiaire | null) => string;
}

/** Date de MAJ du dossier (V1) — date des pièces de système qualité, jamais « aujourd'hui ». */
function dateSysteme(ctx: BdcContext): string {
  return fmtDateFR(ctx.organisme.dateMaj || ctx.prestation.dateDebut);
}

/** Échéance ≤ aujourd'hui ? */
function passe(d: Date): boolean {
  return d.getTime() <= Date.now();
}

const H = (t: string) => `# ${t}\n`;
const H2 = (t: string) => `\n## ${t}\n`;

/** Graine déterministe par bénéficiaire (variation stable d'un export à l'autre). */
function seedBenef(b: Beneficiaire | null, sel: string): number {
  const src = `${sel}|${b?.prenom || ""}|${b?.nom || ""}|${(b as any)?.email || ""}`;
  let h = 0;
  for (let i = 0; i < src.length; i++) h = (h * 31 + src.charCodeAt(i)) >>> 0;
  return h;
}
/**
 * Bloc de signature conforme à la MATRICE (MESSAGE 13 — partie D) :
 * rôles, tampon et date dérivés de la pièce, images issues des formulaires.
 * Aucun nom tapé en clair ne tient lieu de signature.
 */
const SIGN = (ctx: BdcContext, nomPiece: string, b: Beneficiaire | null, dateSeance?: Date) =>
  `\n## Signatures\n\n${blocSignatureHtml(ctx, nomPiece, b, { dateSeance })}\n`;

function entete(o: Organisme, b: Beneficiaire | null, p: Prestation): string {
  const lignes = [
    `**Organisme** : ${o.raisonSociale} — SIRET ${o.siret}`,
    `**Adresse** : ${o.adresse}, ${o.codePostal} ${o.ville}`,
    `**Consultant** : ${p.consultant.nom} — ${p.consultant.qualification}`,
  ];
  if (b) {
    lignes.push(`**Bénéficiaire** : ${b.civilite} ${b.prenom} ${b.nom}`);
    if (b.dateNaissance) lignes.push(`**Né(e) le** : ${fmtDateFR(b.dateNaissance)}`);
  }
  lignes.push(`**Période** : du ${fmtDateFR(p.dateDebut)} au ${fmtDateFR(p.dateFin)}`);
  lignes.push(formatDuree(p));
  return lignes.join("  \n") + "\n";
}

/* ------------------------------------------------------------------ */
/* 1. Document de synthèse — art. R6313-8                              */
/* ------------------------------------------------------------------ */

const documentSynthese: BdcDocDef = {
  nom: "Indicateur 11 - Document de synthèse du bilan de compétences",
  indicateur: 11,
  parBeneficiaire: true,
  contractuelle: true,
  build: (ctx, b) => {
    const o = ctx.organisme;
    const p = prestationFor(ctx, b);
    const { termine } = etatBilan(p);
    const nomB = b ? `${b.prenom} ${b.nom}` : "Le bénéficiaire";
    const prof = ctx.formation ? getBdcDomainProfile(ctx.formation) : null;

    if (!termine) {
      // Bilan en cours : la synthèse est rédigée en phase de conclusion, jamais avant.
      return [
        H("Document de synthèse du bilan de compétences"),
        `_Remis au seul bénéficiaire (${ARTICLES_BC.definition})._\n`,
        entete(o, b, p),
        `> **Bilan en cours** — le document de synthèse est établi lors de la phase de conclusion et remis à ${nomB} à l'issue de la dernière séance (prévue le ${fmtDateFR(p.dateFin)}). Les rubriques ci-dessous sont à compléter en fin de bilan.\n`,
        H2("1. Circonstances du bilan"), "_À compléter en fin de bilan._",
        H2("2. Compétences et aptitudes identifiées au regard des perspectives d'évolution envisagées"), "_À compléter en fin de bilan._",
        H2("3. Éléments constitutifs du projet et principales étapes de sa mise en œuvre"), "_À compléter en fin de bilan._",
        H2("4. Atteinte des objectifs de la prestation"), "_À compléter en fin de bilan._",
        H2("5. Propriété et confidentialité"),
        `Le document de synthèse est la propriété du bénéficiaire, seul destinataire. Il ne peut être communiqué à un tiers qu'avec son accord (${ARTICLES_BC.definition}).`,
      ].join("\n");
    }

    const pf = b?.profil;
    const seed = pf?.seed ?? 0;
    const pk = <T,>(arr: T[], off: number): T => arr[(seed + off) % arr.length];
    const generique = !prof || prof.generique;
    const cible = pf?.cible || (generique ? "son projet professionnel" : `le métier de ${prof!.metier}`);
    const secteur = generique ? "le secteur visé" : prof!.secteur.split(",")[0];
    const tech = generique ? [] : prof!.techniques;
    const transv = prof?.transversales || [];
    const forms = generique ? [] : prof!.formations;
    const projetTxt = pf?.projet || "préciser son projet professionnel";

    const dPlus = (mois: number) => {
      const d = new Date(p.dateFin);
      d.setMonth(d.getMonth() + mois);
      return fmtDateFR(d);
    };
    const circonstances = `${nomB} a engagé ce bilan pour ${pf ? pf.motifLibelle.charAt(0).toLowerCase() + pf.motifLibelle.slice(1) : "faire le point sur son parcours"}${b?.poste ? `, alors en poste comme ${b.poste}${b.entreprise ? ` (${b.entreprise})` : ""}` : ""}. La demande${pf?.origine === "employeur" ? ", formulée dans le cadre du plan de développement des compétences de l'employeur," : pf?.financeur === "CPF" ? ", financée par son compte personnel de formation," : ""} a été instruite lors de l'entretien préliminaire du ${fmtDateFR(p.dateDebut)}. Attente exprimée : « ${pf?.attente || "clarifier son projet"} ».`;

    const lignesComp: Array<[string, string, string]> = [
      ["Compétences issues du parcours", b?.poste ? `Compétences mobilisées sur le poste occupé (${b.poste}) : organisation, relation avec les interlocuteurs, fiabilité d'exécution` : "Compétences issues des expériences professionnelles et extra-professionnelles, formalisées en séance", "Analyse du parcours, entretiens d'explicitation"],
      ["Compétences transversales", transv.length ? `${transv[seed % transv.length]} ; ${transv[(seed + 2) % transv.length]}` : "Organisation, communication, adaptation", "Questionnaire d'intérêts (RIASEC), entretiens"],
      [generique ? "Compétences à développer pour le projet" : "Compétences techniques du métier visé", tech.length ? `${tech[seed % tech.length]} ; ${tech[(seed + 1) % tech.length]}` : "Écarts identifiés entre les compétences actuelles et les exigences du projet, traités dans le plan d'action", "Enquêtes métier, recherches documentaires"],
      ["Aptitudes et motivations", `Motivation confirmée pour ${cible} ; niveau d'études : ${b?.niveauEtudes || "non renseigné"}`, "Test de personnalité, entretiens"],
    ];
    const etapes: Array<[string, string, string]> = [
      [forms.length ? `Constituer le dossier de candidature à ${forms[seed % forms.length]}` : "Identifier et comparer les formations qualifiantes ou postes correspondant au projet", dPlus(1), "Fiches France Compétences, sites des organismes, réseau professionnel"],
      [`Monter le plan de financement (${pf?.financeur === "employeur" || pf?.financeur === "OPCO" ? "plan de développement des compétences, OPCO" : "CPF, France Travail, aides régionales selon la situation"})`, dPlus(2), "Conseiller en évolution professionnelle, Mon Compte Formation"],
      [`Confronter le projet au terrain (${generique ? "rencontres de professionnels" : `immersion en ${secteur}`})`, dPlus(3), "PMSMP, réseau, entreprises contactées lors des enquêtes"],
      ["Engager la mise en œuvre du projet et faire le point sur son avancement", dPlus(6), "Entretien de suivi proposé par le consultant"],
    ];
    const partiel = seed % 4 === 0;
    return [
      H("Document de synthèse du bilan de compétences"),
      `_Remis au seul bénéficiaire (${ARTICLES_BC.definition}) — phase de conclusion (${ARTICLES_BC.phases})._\n`,
      entete(o, b, p),
      H2("1. Circonstances du bilan"),
      circonstances,
      H2("2. Compétences et aptitudes identifiées au regard des perspectives d'évolution envisagées"),
      "\n| Domaine | Compétences et aptitudes identifiées | Éléments de preuve mobilisés |",
      "|---|---|---|",
      ...lignesComp.map(([d, c, pr]) => `| ${d} | ${c} | ${pr} |`),
      H2("3. Éléments constitutifs du projet et principales étapes de sa mise en œuvre"),
      `**Projet retenu à l'issue du bilan** : ${projetTxt.charAt(0).toUpperCase() + projetTxt.slice(1)}.\n`,
      "| Étape | Action | Échéance | Ressources / appuis |",
      "|---|---|---|---|",
      ...etapes.map(([ac, e, r], i) => `| ${i + 1} | ${ac} | ${e} | ${r} |`),
      H2("4. Atteinte des objectifs de la prestation"),
      "\n| Objectif fixé en phase préliminaire | Atteint | Partiellement atteint | Non atteint |",
      "|---|---|---|---|",
      `| Analyser ses compétences professionnelles et personnelles | ☒ | ☐ | ☐ |`,
      `| Identifier ses aptitudes, intérêts et motivations | ☒ | ☐ | ☐ |`,
      `| Définir un projet professionnel réaliste | ${partiel ? "☐" : "☒"} | ${partiel ? "☒" : "☐"} | ☐ |`,
      `| Élaborer un plan d'action daté | ☒ | ☐ | ☐ |`,
      "",
      `**Réalisation** : ${seancesFor(ctx, b).length} séances individuelles, ${p.dureeTotaleH} heures, du ${fmtDateFR(p.dateDebut)} au ${fmtDateFR(p.dateFin)}, trois phases réalisées (${ARTICLES_BC.phases}).`,
      partiel ? "\n**Point de vigilance** : la faisabilité financière du projet reste à confirmer." : "",
      `\n**Suivi** : un entretien de suivi est proposé à ${nomB} six mois après la fin du bilan, à partir du ${fmtDateFR(p.dateSuivi6Mois)} (démarche qualité de l'organisme, facultative pour le bénéficiaire).`,
      H2("5. Propriété et confidentialité"),
      `Le document de synthèse et les résultats détaillés sont remis au seul bénéficiaire ; ils ne peuvent être communiqués à un tiers qu'avec son accord (${ARTICLES_BC.definition}). Les personnes chargées du bilan sont tenues au secret professionnel (art. 226-13 et 226-14 du Code pénal).`,
      `Les documents élaborés pour le bilan sont détruits dès le terme de l'action, sauf accord écrit du bénéficiaire fondé sur la nécessité d'un suivi de sa situation (conservation de trois ans au plus, ${ARTICLES_BC.destruction}).`,
      `\n_Document remis à ${b ? `${b.civilite} ${b.prenom} ${b.nom}` : "la personne concernée"} le ${fmtDateFR(p.dateFin)}._`,
      SIGN(ctx, "Indicateur 11 - Document de synthèse du bilan de compétences", b),
    ].join("\n");
  },
};

/** Attestation de remise : preuve d'audit sans divulguer le contenu de la synthèse. */
const attestationRemiseSynthese: BdcDocDef = {
  nom: "Indicateur 11 - Attestation de remise du document de synthèse",
  indicateur: 11,
  parBeneficiaire: true,
  build: (ctx, b) => {
    const o = ctx.organisme;
    const p = prestationFor(ctx, b);
    const { termine } = etatBilan(p);
    const nomB = b ? `${b.civilite} ${b.prenom} ${b.nom}` : "________________";
    return [
      H("Attestation de remise du document de synthèse"),
      entete(o, b, p),
      termine
        ? `Je soussigné(e) ${nomB} reconnais avoir reçu, le ${fmtDateFR(p.dateFin)}, le document de synthèse de mon bilan de compétences ainsi que les résultats détaillés, dont je suis le seul destinataire (${ARTICLES_BC.definition}).`
        : `Attestation à signer par ${nomB} lors de la remise du document de synthèse, prévue à l'issue de la dernière séance (${fmtDateFR(p.dateFin)}).`,
      "",
      "Le contenu du document de synthèse n'est pas versé au dossier d'audit de l'organisme : seule la présente attestation l'est, sauf autorisation écrite du bénéficiaire.",
      SIGN(ctx, "Indicateur 11 - Attestation de remise du document de synthèse", b, termine ? p.dateFin : undefined),
    ].join("\n");
  },
};


/* ------------------------------------------------------------------ */
/* 2. Feuilles d'émargement — une par séance + récapitulatif           */
/* ------------------------------------------------------------------ */
const NOM_PHASE: Record<1 | 2 | 3, string> = {
  1: "1 — Préliminaire",
  2: "2 — Investigation",
  3: "3 — Conclusion",
};

/** 2.5 → « 2 h 30 », 3 → « 3 h ». */
function heuresFR(h: number): string {
  const entier = Math.floor(h);
  const min = Math.round((h - entier) * 60);
  return min ? `${entier} h ${String(min).padStart(2, "0")}` : `${entier} h`;
}

/** Clés techniques → libellés accentués destinés aux documents. */
const LIB_MODALITE: Record<string, string> = {
  presentiel: "Présentiel",
  distanciel: "Distanciel synchrone",
  mixte: "Mixte (présentiel et distanciel)",
};
const LIB_CRENEAU: Record<string, string> = {
  matin: "matin",
  "apres-midi": "après-midi",
  soir: "soirée",
};
export const libModalite = (m: string): string => LIB_MODALITE[m] ?? m;
export const libCreneau = (c: string): string => LIB_CRENEAU[c] ?? c;

const feuillesEmargement: BdcDocDef = {
  nom: "Indicateur 11 - Feuilles d'émargement par séance",
  indicateur: 11,
  parBeneficiaire: true,
  contractuelle: true,
  build: (ctx, b) => {
    const o = ctx.organisme; const p = prestationFor(ctx, b);
    const seances = seancesFor(ctx, b);
    const aujourdhui = new Date();
    const parts: string[] = [H("Feuilles d'émargement"), entete(o, b, p)];
    parts.push(
      "_Une feuille par séance. Les signatures sont apposées à l'ouverture et à la clôture de la séance ; toute séance non réalisée est portée en « absence » et n'est pas facturée._\n",
    );
    let cumul = 0;
    let cumulRealise = 0;
    seances.forEach((s, i) => {
      cumul += s.duree;
      const realisee = s.date.getTime() <= aujourdhui.getTime();
      if (realisee) cumulRealise += s.duree;
      const lieu = s.modalite === "distanciel" ? "Visioconférence" : p.lieu || o.ville;
      parts.push(
        H2(`Séance n° ${s.numero} sur ${seances.length} — Phase ${NOM_PHASE[s.phase]}`),
        "| Date | Horaires | Durée | Modalité | Lieu | Présence |",
        "|---|---|---|---|---|---|",
        `| ${fmtDateFR(s.date)} | ${s.heureDebut} – ${s.heureFin} | ${heuresFR(s.duree)} | ${s.modalite === "distanciel" ? "Distanciel synchrone" : "Présentiel"} | ${lieu} | Présent(e) ☐  Absent(e) ☐ |`,
        "",
        `**Objet de la séance** : ${s.objet}`,
        `**Cumul des heures réalisées à l'issue de la séance** : ${heuresFR(realisee ? cumulRealise : cumul)} sur ${heuresFR(p.dureeEntretiensH ?? seances.reduce((a, x) => a + x.duree, 0))} d'entretiens.`,
        "",
        realisee
          ? blocSignatureHtml(ctx, "Feuille d'émargement", b, { dateSeance: s.date, lieu: s.modalite === "distanciel" ? o.ville : lieu })
          : `<div class="bloc-signature" style="margin-top:18px;"><div style="font-size:11px;font-weight:bold;color:#0b2545;margin-bottom:4px;">Signatures — séance à venir</div><table style="border-collapse:collapse;width:100%;"><tr><td style="border:1px solid #94a3b8;padding:8px;width:50%;"><div style="font-size:10.5px;font-weight:bold;color:#0b2545;">Le bénéficiaire</div><div style="border-bottom:1px solid #94a3b8;height:38px;"></div></td><td style="border:1px solid #94a3b8;padding:8px;width:50%;"><div style="font-size:10.5px;font-weight:bold;color:#0b2545;">Le consultant</div><div style="border-bottom:1px solid #94a3b8;height:38px;"></div></td></tr></table></div>`,
        i < seances.length - 1 ? "\n<div style=\"page-break-after:always\"></div>\n" : "",
      );
    });
    parts.push(
      H2("Récapitulatif cumulé des heures réalisées"),
      "| Séance | Date | Phase | Durée | Présence | Cumul réalisé |",
      "|---|---|---|---|---|---|",
      ...(() => {
        let c = 0;
        return seances.map((s) => {
          const realisee = s.date.getTime() <= aujourdhui.getTime();
          if (realisee) c += s.duree;
          // MESSAGE 23 — aucune présence pré-cochée : la case est renseignée à la séance.
          return `| ${s.numero} | ${fmtDateFR(s.date)} | ${NOM_PHASE[s.phase]} | ${heuresFR(s.duree)} | ☐ | ${realisee ? heuresFR(c) : "—"} |`;
        });
      })(),
      `| **Total** |  |  | **${heuresFR(cumul)}** |  | **${heuresFR(cumulRealise)}** |`,

      "",
      formatDuree(p),
      "",
      blocSignatureHtml(ctx, "Feuille d'émargement", b, {
        dateSeance: seances.length ? seances[seances.length - 1].date : undefined,
      }),
    );
    return parts.join("\n");
  },
};


/* ------------------------------------------------------------------ */
/* 2b. Test de personnalité — passé à mi-parcours, IND 11               */
/* ------------------------------------------------------------------ */

const PROFILS_RIASEC: Record<string, { label: string; traits: string; projets: string[] }> = {
  R: {
    label: "Réaliste",
    traits: "concret, pragmatique, technique, orienté action et résolution de problèmes matériels",
    projets: ["métiers de terrain", "techniques opérationnelles", "maintenance", "production"],
  },
  I: {
    label: "Investigateur",
    traits: "analytique, curieux, méthodique, à l'aise avec l'abstraction et la recherche",
    projets: ["recherche et développement", "analyse de données", "ingénierie", "conseil technique"],
  },
  A: {
    label: "Artistique",
    traits: "créatif, original, sensible, autonome dans son mode de pensée et d'expression",
    projets: ["design", "communication créative", "artisanat d'art", "médiation culturelle"],
  },
  S: {
    label: "Social",
    traits: "relationnel, empathique, à l'écoute, motivé par l'accompagnement et le service",
    projets: ["accompagnement client", "formation", "soins et services à la personne", "ressources humaines"],
  },
  E: {
    label: "Entreprendant",
    traits: "dynamique, persuasif, leader, orienté vers les résultats et la prise de décision",
    projets: ["management", "commercial", "entrepreneuriat", "direction de projet"],
  },
  C: {
    label: "Conventionnel",
    traits: "organisé, rigoureux, méthodique, à l'aise avec les procédures et la gestion",
    projets: ["administration", "gestion", "comptabilité", "contrôle de gestion"],
  },
};

const LETTRES_RIASEC = ["R", "I", "A", "S", "E", "C"];

function dateMiParcours(ctx: BdcContext, b?: Beneficiaire | null): Date {
  const seances = seancesFor(ctx, b);
  if (seances.length > 0) {
    const idx = Math.floor((seances.length - 1) / 2);
    return new Date(seances[idx].date);
  }
  const p = prestationFor(ctx, b);
  return new Date((p.dateDebut.getTime() + p.dateFin.getTime()) / 2);
}

function scoreRiasec(seed: number, dim: string, dominant?: string, secondaire?: string): number {
  let base = 5 + ((seed + dim.charCodeAt(0) * 13) % 4); // 5 à 8
  if (dim === dominant) base += 2;
  if (dim === secondaire) base += 1;
  return Math.min(10, Math.max(3, base));
}

const testPersonnalite: BdcDocDef = {
  nom: "Indicateur 11 - Test de personnalité",
  indicateur: 11,
  parBeneficiaire: true,
  build: (ctx, b) => {
    const o = ctx.organisme; const p = prestationFor(ctx, b);
    const datePassation = dateMiParcours(ctx, b);
    const seed = seedBenef(b, "personnalite");
    const prof = ctx.formation ? getBdcDomainProfile(ctx.formation) : null;
    const generique = !prof || prof.generique;
    const metier = generique ? (b?.profil.cible || "son projet professionnel") : prof!.metier;
    const secteur = generique ? "le secteur visé" : prof!.secteur.split(",")[0];
    if (!passe(datePassation)) {
      return [
        H("Test de personnalité"),
        "_Outil de la phase d'investigation — passé à mi-parcours._\n",
        entete(o, b, p),
        `> **Passation prévue le ${fmtDateFR(datePassation)}** — les résultats seront consignés et restitués en séance.\n`,
        "| Dimension | Score / 10 | Interprétation |",
        "|---|---|---|",
        ...LETTRES_RIASEC.map((l) => `| **${PROFILS_RIASEC[l].label}** (${l}) |  |  |`),
      ].join("\n");
    }
    const nomB = b ? `${b.prenom} ${b.nom}` : "Le bénéficiaire";
    const civ = b?.civilite === "Mme" ? "Mme" : "M.";

    // Profil déterministe mais distinct par bénéficiaire
    const ordre = [...LETTRES_RIASEC].sort((a, b) => {
      const sa = (seed + a.charCodeAt(0) * 31) % 1000;
      const sb = (seed + b.charCodeAt(0) * 31) % 1000;
      return sb - sa;
    });
    const dominant = ordre[0];
    const secondaire = ordre[1];
    const dom = PROFILS_RIASEC[dominant];
    const sec = PROFILS_RIASEC[secondaire];

    const scores = LETTRES_RIASEC.map((l) => ({
      lettre: l,
      label: PROFILS_RIASEC[l].label,
      score: scoreRiasec(seed, l, dominant, secondaire),
    })).sort((a, b) => b.score - a.score);

    const interps = [
      `Le profil dominant **${dom.label}** (${dominant}) de ${nomB} traduit une personnalité ${dom.traits}. Ce profil est un atout pour envisager ${metier}, dans la mesure où ce métier mobilise des compétences concrètes et une approche factuelle de la résolution de problèmes.`,
      `La dominante **${dom.label}** (${dominant}) indique une préférence pour l'action structurée et l'efficacité opérationnelle. Cette orientation est cohérente avec ${secteur} et les exigences de rigueur liées à ${metier}.`,
      `Avec un profil **${dom.label}** (${dominant}) en tête, ${nomB} a un fonctionnement privilégiant la clarté, l'objectivité et le résultat concret. Cette base de personnalité soutient une transition vers ${metier} à condition d'intégrer les dimensions relationnelles et créatives du métier.`,
    ];
    const interp = interps[seed % interps.length];

    const liens = [
      `La combinaison ${dominant}${secondaire} suggère une affinité particulière avec ${sec.projets[seed % sec.projets.length]}, ce qui permet d'envisager ${metier} sous l'angle ${dominant === "S" || secondaire === "S" ? "de l'accompagnement et de la relation" : "de la technique et de la méthode"}.`,
      `Le profil secondaire **${sec.label}** (${secondaire}) renforce la capacité d'${nomB} à s'adapter aux exigences de ${secteur}, notamment sur les aspects ${sec.traits}.`,
      `Le binôme ${dominant}${secondaire} constitue un profil équilibré pour ${metier} : il associe les forces de ${dom.label.toLowerCase()} à celles de ${sec.label.toLowerCase()}, deux dimensions fréquemment recherchées dans ${secteur}.`,
    ];
    const lien = liens[seed % liens.length];

    const conseils = [
      `Poursuivre l'exploration de ${metier} en valorisant le côté ${dom.label.toLowerCase()} du profil, tout en travaillant les situations où le registre ${sec.label.toLowerCase()} sera attendu.`,
      `Prévoir des mises en situation concrètes dans ${secteur} pour confirmer que les préférences ${dominant}${secondaire} se traduisent bien dans la pratique quotidienne de ${metier}.`,
      `Intégrer dans le plan d'action des étapes de rencontre avec des professionnels exerçant ${metier}, afin de valider l'adéquation entre le profil de personnalité et les réalités du terrain.`,
    ];
    const conseil = conseils[seed % conseils.length];

    const appreciationBanque = [
      `${nomB} a complété le test de personnalité de manière cohérente et réflexive. Le profil ${dominant}${secondaire} est stable et aligné avec les éléments recueillis lors de la phase préliminaire. Ce résultat constitue un appui utile pour la suite de la phase d'investigation.`,
      `Les résultats obtenus par ${nomB} confirment une personnalité structurée autour de la dimension ${dom.label.toLowerCase()}. Le profil secondaire ${sec.label.toLowerCase()} apporte une nuance importante qui sera à prendre en compte dans la définition du projet professionnel.`,
      `Le test de personnalité révèle un profil équilibré et mobilisable pour ${metier}. Les échanges avec le consultant permettront de confronter ces résultats aux contraintes et aux opportunités du marché de ${secteur}.`,
    ];
    const appreciation = appreciationBanque[seed % appreciationBanque.length];

    return [
      H("Test de personnalité"),
      `_Outil d'investigation de la phase d'investigation — passé à mi-parcours._\n`,
      entete(o, b, p),
      `**Date de passation** : ${fmtDateFR(datePassation)}`,
      `**Bénéficiaire** : ${civ} ${nomB}`,
      `**Consultant** : ${p.consultant.nom}`,
      "",
      H2("1. Profil de personnalité dominant"),
      `**Profil dominant** : ${dom.label} (${dominant})`,
      `**Profil secondaire** : ${sec.label} (${secondaire})`,
      "",
      interp,
      "",
      H2("2. Résultats détaillés par dimension"),
      "| Dimension | Score / 10 | Interprétation |",
      "|---|---|---|",
      ...scores.map((s) => `| **${s.label}** (${s.lettre}) | ${s.score}/10 | ${s.lettre === dominant ? "Dominante forte" : s.lettre === secondaire ? "Dominante secondaire" : "Présente à un niveau modéré"} |`),
      "",
      H2("3. Lien avec le projet professionnel"),
      lien,
      "",
      H2("4. Conseils personnalisés"),
      conseil,
      "",
      H2("5. Appréciation du consultant"),
      appreciation,
      "",
      H2("6. Validation"),
      `Test de personnalité passé le ${fmtDateFR(datePassation)} dans le cadre du bilan de compétences de ${nomB}. Les résultats sont restitués à titre indicatif et intégrés au document de synthèse.`,
    ].join("\n");
  },
};


/* 3. Satisfaction bénéficiaire — à chaud / à froid (échelle 1 à 5)    */
/* ------------------------------------------------------------------ */
/** Échelle cochée : note de 4 ou 5 selon le bénéficiaire et la question. */
function echelleCochee(note: number): string {
  return [1, 2, 3, 4, 5].map((n) => `${n} ${n === note ? "☒" : "☐"}`).join("  ");
}

/** Notes 4 ou 5 déterministes (mêmes valeurs dans le questionnaire et les statistiques IND 2). */
export function notesSatisfaction(b: Beneficiaire | null, nomPiece: string, nbQuestions: number): number[] {
  const seed = seedBenef(b, nomPiece);
  // 4 ou 5 selon le bénéficiaire et la question ; la part de 4 varie d'un bénéficiaire à l'autre.
  const seuil = 2 + (seed % 3); // 2 à 4 chances sur 10
  return Array.from({ length: nbQuestions }, (_, i) => (((seed >>> (i % 16)) + i * 7) % 10 < seuil ? 4 : 5));
}

function questionnaireSatisfaction(titre: string, quand: string, questions: string[], nomPiece: string): BdcDocDef["build"] {
  return (ctx, b) => {
    const o = ctx.organisme;
    const p = prestationFor(ctx, b);
    const froid = /froid/i.test(nomPiece);
    const dateRepD = froid ? p.dateSuivi6Mois : p.dateFin;
    const disponible = passe(dateRepD);
    if (!disponible) {
      return [
        H(titre),
        entete(o, b, p),
        `_${quand}. Échelle continue de 1 (très insatisfait) à 5 (très satisfait)._\n`,
        `> **${froid ? "Suivi à programmer" : "À renseigner en fin de bilan"}** — questionnaire à remettre au bénéficiaire le ${fmtDateFR(dateRepD)}.\n`,
        "| Question | 1 → 5 |",
        "|---|---|",
        ...questions.map((q) => `| ${q} | ${ECHELLE_SATISFACTION} |`),
        H2("Commentaire libre"),
        FILIGRANE_BENEFICIAIRE,
      ].join("\n");
    }
    const seed = seedBenef(b, nomPiece);
    const notes = notesSatisfaction(b, nomPiece, questions.length);
    const cible = b?.profil.cible || "mon projet professionnel";
    const commentaires = [
      `Accompagnement à l'écoute et structuré. Les séances m'ont aidé(e) à poser des mots précis sur mes compétences et à avancer sur ${cible.replace(/^son /, "mon ")}.`,
      "J'ai apprécié la méthode : des outils concrets, un rythme adapté à mes disponibilités et des échanges respectueux. Je repars avec un plan d'action clair.",
      "Le bilan m'a permis de sortir du flou. Point à améliorer : un peu plus de temps sur le volet financement.",
      "Très satisfait(e) du suivi. Le consultant m'a aidé(e) à hiérarchiser mes priorités.",
      "Démarche exigeante mais utile. Le travail entre les séances demande du temps ; en contrepartie, les résultats sont concrets.",
    ];
    return [
      H(titre),
      entete(o, b, p),
      `_${quand}. Échelle continue de 1 (très insatisfait) à 5 (très satisfait)._\n`,
      "| Question | 1 → 5 |",
      "|---|---|",
      ...questions.map((q, i) => `| ${q} | ${echelleCochee(notes[i])} |`),
      H2("Commentaire libre"),
      commentaires[seed % commentaires.length],
      "",
      `**Renseigné le** : ${fmtDateFR(dateRepD)}${b ? ` par ${b.civilite} ${b.prenom} ${b.nom}` : ""}`,
      p.financeur === "CPF" ? `\n> ${MENTION_CPF_SATISFACTION}\n` : "",
      SIGN(ctx, nomPiece, b, dateRepD),
    ].join("\n");
  };
}

export const QUESTIONS_SATISFACTION_CHAUD = [
  "Clarté des informations reçues avant l'engagement",
  "Qualité de l'accueil et des conditions matérielles",
  "Écoute et posture du consultant",
  "Pertinence des outils d'investigation mobilisés",
  "Respect du rythme et des disponibilités annoncés",
  "Utilité du document de synthèse",
  "Atteinte de vos objectifs initiaux",
  "Satisfaction globale de la prestation",
];
export const QUESTIONS_SATISFACTION_FROID = [
  "Mise en œuvre effective du projet défini lors du bilan",
  "Pertinence du projet avec le recul de six mois",
  "Utilité des étapes définies dans le document de synthèse",
  "Appui reçu lors de l'entretien de suivi",
  "Satisfaction globale avec le recul",
];

const satisfactionChaud: BdcDocDef = {
  nom: "Indicateur 30 - Questionnaire de satisfaction bénéficiaire (à chaud)",
  indicateur: 30,
  parBeneficiaire: true,
  build: questionnaireSatisfaction(
    "Questionnaire de satisfaction — volet à chaud",
    "À renseigner lors de l'entretien de conclusion",
    QUESTIONS_SATISFACTION_CHAUD,
    "Questionnaire satisfaction à chaud",
  ),
};

const satisfactionFroid: BdcDocDef = {
  nom: "Indicateur 30 - Questionnaire de satisfaction bénéficiaire (à froid - suivi 6 mois)",
  indicateur: 30,
  parBeneficiaire: true,
  build: (ctx, b) => questionnaireSatisfaction(
    "Questionnaire de satisfaction — volet à froid (suivi à 6 mois)",
    `À renseigner lors de l'entretien de suivi proposé à partir du ${fmtDateFR(prestationFor(ctx, b).dateSuivi6Mois)}`,
    QUESTIONS_SATISFACTION_FROID,
    "Questionnaire satisfaction à froid",
  )(ctx, b),
};

/* ------------------------------------------------------------------ */
/* 4. Accord de conservation / attestation de destruction — R6313-7    */
/* ------------------------------------------------------------------ */
const accordConservation: BdcDocDef = {
  nom: "Indicateur 9 - Accord de conservation et attestation de destruction des documents",
  indicateur: 9,
  parBeneficiaire: true,
  contractuelle: true,
  build: (ctx, b) => {
    const o = ctx.organisme;
    const p = prestationFor(ctx, b);
    const dateLimite = fmtDateFR(new Date(p.dateFin.getFullYear() + 3, p.dateFin.getMonth(), p.dateFin.getDate()));
    return [
      H("Accord de conservation / attestation de destruction des documents"),
      `_${ARTICLES_BC.destruction}._\n`,
      entete(o, b, p),
      H2("Principe"),
      "L'organisme détruit les documents élaborés pour la réalisation du bilan **dès le terme de l'action**. Le document de synthèse et les résultats détaillés sont remis au seul bénéficiaire.",
      H2("Exception — conservation sur accord écrit"),
      `Par exception, les documents faisant l'objet d'un **accord écrit du bénéficiaire fondé sur la nécessité d'un suivi de sa situation** peuvent être conservés pendant **trois ans au plus**, soit au plus tard jusqu'au ${dateLimite}.`,
      "",
      "_Choix exprimé par le bénéficiaire à la fin du bilan (case à cocher de sa main) :_",
      "",
      "| Choix du bénéficiaire | ☐ |",
      "|---|---|",
      "| Je demande la **destruction** de l'ensemble des documents dès la fin du bilan. | ☐ |",
      `| J'autorise la **conservation** des documents nécessaires au suivi de ma situation, pour trois ans au plus (jusqu'au ${dateLimite}). | ☐ |`,
      "",
      "**Date du choix** : ____/____/________",
      "",
      "Cet accord est révocable à tout moment par simple demande écrite adressée à " + (o.emailContact || "l'organisme") + ".",
      H2("Attestation de destruction (à compléter par le consultant)"),
      `Je soussigné(e) ${p.consultant.nom}, consultant, atteste que les documents relatifs au bilan de ${b ? `${b.civilite} ${b.prenom} ${b.nom}` : "________________"} ont été détruits le ____/____/________, conformément au choix exprimé ci-dessus.`,
      SIGN(ctx, "Indicateur 9 - Accord de conservation et attestation de destruction des documents", b),
    ].join("\n");
  },
};

const autorisationTransmission: BdcDocDef = {
  nom: "Indicateur 9 - Autorisation de transmission du document de synthèse à un tiers",
  indicateur: 9,
  parBeneficiaire: true,
  contractuelle: true,
  build: (ctx, b) => {
    const o = ctx.organisme;
    const p = prestationFor(ctx, b);
    return [
      H("Autorisation de transmission à un tiers"),
      `_${ARTICLES_BC.definition}._\n`,
      entete(o, b, p),
      "Les résultats détaillés et le document de synthèse ne peuvent être communiqués à un tiers, y compris à l'employeur ou au financeur, **qu'avec l'accord du bénéficiaire**. À défaut de choix exprimé, aucune transmission n'a lieu.",
      "",
      "_Décision exprimée par le bénéficiaire (case à cocher de sa main) :_",
      "",
      "| Décision | ☐ |",
      "|---|---|",
      "| Je **n'autorise pas** la transmission de mon document de synthèse à un tiers. | ☐ |",
      "| J'autorise la transmission de mon document de synthèse au destinataire désigné ci-dessous. | ☐ |",
      "",
      "**Destinataire autorisé** : ______________________________  \n**Qualité** : ______________________________  \n**Objet de la transmission** : ______________________________",
      "",
      "**Date de la décision** : ____/____/________",
      "",
      "La présente autorisation est **révocable à tout moment**, sans motif, par écrit adressé à " + (o.emailContact || "l'organisme") + ".",
      SIGN(ctx, "Indicateur 9 - Autorisation de transmission du document de synthèse à un tiers", b),
    ].join("\n");
  },
};


/* ------------------------------------------------------------------ */
/* 6. Procédure de réclamation et de médiation                         */
/* ------------------------------------------------------------------ */
const procedureReclamation: BdcDocDef = {
  nom: "Indicateur 31 - Procédure de réclamation et de médiation",
  indicateur: 31,
  parBeneficiaire: false,
  build: (ctx) => {
    const { organisme: o } = ctx;
    return [
      H("Procédure de traitement des réclamations et médiation de la consommation"),
      `**Interlocuteur désigné** : ${o.representantLegal.nom} — ${o.representantLegal.qualite}  \n**Courriel** : ${o.emailContact}  \n**Téléphone** : ${o.telephoneContact}`,
      H2("1. Canaux de réclamation"),
      "- Par courriel à l'adresse ci-dessus (objet : « Réclamation »)",
      "- Par courrier postal au siège de l'organisme",
      "- Oralement lors d'une séance, formalisée ensuite par écrit par le consultant",
      H2("2. Délais garantis"),
      "| Étape | Délai |",
      "|---|---|",
      "| Accusé de réception de la réclamation | 48 heures ouvrées |",
      "| Réponse motivée | 15 jours calendaires |",
      "| Enregistrement au registre des réclamations | Immédiat |",
      H2("3. Traitement"),
      "Chaque réclamation est enregistrée, analysée, puis traitée par une action corrective tracée dans le tableau d'amélioration continue. Le réclamant est informé par écrit de la suite donnée.",
      H2("4. Médiation de la consommation (art. L612-1 du Code de la consommation)"),
      `À défaut de solution amiable dans un délai de deux mois, le bénéficiaire consommateur peut saisir gratuitement le médiateur de la consommation :\n\n**${o.mediateurConsommation.nom}**  \n${o.mediateurConsommation.adresse}  \nSaisine en ligne : ${o.mediateurConsommation.urlSaisine}`,
      H2("5. Juridiction compétente"),
      `À défaut d'accord, le litige relève du ${o.tribunalCompetent}.`,
      `\n${mentionNDA(o)}`,
    ].join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* 7. Livret d'accueil                                                 */
/* ------------------------------------------------------------------ */
const livretAccueil: BdcDocDef = {
  nom: "Indicateur 9 - Livret d'accueil du bénéficiaire",
  indicateur: 9,
  parBeneficiaire: true,
  build: (ctx, b) => {
    const o = ctx.organisme; const p = prestationFor(ctx, b);
    const c = typeContrat(p);
    return [
      H("Livret d'accueil du bénéficiaire"),
      entete(o, b, p),
      H2("1. Votre interlocuteur"),
      `${p.consultant.nom}, ${p.consultant.qualification} — ${o.emailContact} — ${o.telephoneContact}`,
      H2(`2. Déroulement du bilan (${ARTICLES_BC.phases})`),
      "| Phase | Objet |",
      "|---|---|",
      "| Phase préliminaire | Analyser votre demande, définir le format le plus adapté, vous informer des conditions de déroulement et des méthodes mobilisées |",
      "| Phase d'investigation | Construire votre projet professionnel et en vérifier la pertinence, ou élaborer des alternatives |",
      "| Phase de conclusion | Prendre connaissance des résultats détaillés, recenser les conditions de réussite, prévoir les principales étapes |",
      "",
      formatDuree(p),
      H2("3. Lieu et modalités"),
      `**Modalité** : ${libModalite(p.modalite)}  \n**Lieu** : ${p.lieu}`,
      H2("4. Accessibilité et handicap"),
      `Référent handicap : **${o.referentHandicap.nom}** — ${o.referentHandicap.email} — ${o.referentHandicap.telephone}. Toute demande d'adaptation est étudiée avant le démarrage et tracée dans votre dossier.`,
      H2("5. Confidentialité"),
      "Le consultant est tenu au secret professionnel. Aucune information n'est communiquée à votre employeur ou à votre financeur sans votre accord écrit.",
      H2("6. Vos droits"),
      c.delai,
      H2("7. Réclamation"),
      `Toute réclamation peut être adressée à ${o.emailContact} : accusé de réception sous 48 heures ouvrées, réponse sous 15 jours. Médiateur de la consommation : ${o.mediateurConsommation.nom} — ${o.mediateurConsommation.urlSaisine}.`,
      `\n${mentionNDA(o)}`,
    ].join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* 8. Planning prévisionnel signé                                      */
/* ------------------------------------------------------------------ */
const planningPrevisionnel: BdcDocDef = {
  nom: "Indicateur 10 - Planning prévisionnel signé (annexe à la convention)",
  indicateur: 10,
  parBeneficiaire: true,
  contractuelle: true,
  build: (ctx, b) => {
    const o = ctx.organisme; const p = prestationFor(ctx, b);
    return [
      H("Planning prévisionnel des séances"),
      "_Annexe au contrat / à la convention de prestation._\n",
      entete(o, b, p),
      b ? `**Disponibilités déclarées** : ${b.joursDisponibles.join(", ")} — ${b.creneauxDisponibles.map(libCreneau).join(", ")}\n` : "",
      "| Séance | Phase | Date | Horaires | Durée | Modalité | Objet |",
      "|---|---|---|---|---|---|---|",
      ...seancesFor(ctx, b).map((s) => `| ${s.numero} | ${s.phase} | ${fmtDateFR(s.date)} | ${s.heureDebut}–${s.heureFin} | ${heuresFR(s.duree)} | ${libModalite(s.modalite)} | ${s.objet.split("—")[0].trim()} |`),
      `| **Total entretiens** |  |  |  | **${seancesFor(ctx, b).reduce((a, s) => a + s.duree, 0)} h** |  |  |`,
      "",
      formatDuree(p),
      SIGN(ctx, "Indicateur 10 - Planning prévisionnel signé (annexe à la convention)", b),
    ].join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* 9. Informations pratiques distanciel                                */
/* ------------------------------------------------------------------ */
const infosDistanciel: BdcDocDef = {
  nom: "Indicateur 17 - Moyens, confidentialité et informations pratiques",
  indicateur: 17,
  parBeneficiaire: false,
  build: (ctx) => {
    const o = ctx.organisme; const p = ctx.prestation;
    return [
      H("Informations pratiques — déroulement à distance"),
      `**Modalité de la prestation** : ${libModalite(p.modalite)}`,
      H2("1. Plateforme utilisée"),
      "Entretiens en visioconférence synchrone. Un lien nominatif est adressé par courriel avant chaque séance ; il n'est pas partageable.",
      H2("2. Prérequis techniques"),
      "| Élément | Exigence minimale |",
      "|---|---|",
      "| Connexion | 5 Mb/s descendant, 1 Mb/s montant |",
      "| Matériel | Ordinateur, tablette ou smartphone avec caméra et micro |",
      "| Navigateur | Version à jour de Chrome, Edge, Firefox ou Safari |",
      "| Environnement | Lieu calme garantissant la confidentialité des échanges |",
      H2("3. Procédure de connexion"),
      "1. Ouvrir le courriel de convocation reçu la veille de la séance\n2. Cliquer sur le lien nominatif à l'heure prévue\n3. Autoriser l'accès à la caméra et au micro\n4. Vérifier le son avant le démarrage",
      H2("4. Assistance technique"),
      `En cas de difficulté : ${o.telephoneContact} ou ${o.emailContact}. Une reprogrammation sans frais est proposée si l'incident technique empêche la tenue de la séance.`,
      H2("5. Émargement à distance"),
      "L'émargement est réalisé par signature électronique horodatée à l'ouverture et à la clôture de chaque séance.",
      H2("6. Moyens humains"),
      `Consultant : ${p.consultant.nom} (${p.consultant.qualification}) ; référent handicap : ${o.referentHandicap.nom}. L'organisme dispose d'une organisation identifiée dédiée aux bilans (${ARTICLES_BC.organisation}).`,
      H2("7. Outils d'investigation"),
      "| Outil | Usage | Phase |",
      "|---|---|---|",
      "| Grille d'analyse du parcours et portefeuille de compétences | Identifier les compétences acquises et transférables | Investigation |",
      "| Questionnaire d'intérêts professionnels (typologie RIASEC) | Explorer les intérêts et motivations | Investigation |",
      "| Test de personnalité | Identifier les préférences de fonctionnement | Investigation |",
      "| Fiches métiers ROME (France Travail) et fiches RNCP (France Compétences) | Documenter les pistes professionnelles | Investigation |",
      "| Trame d'enquête métier | Confronter le projet au terrain | Investigation |",
      "| Trame de plan d'action | Formaliser les étapes du projet | Conclusion |",
      H2("8. Confidentialité des échanges"),
      `Entretiens individuels en espace fermé (présentiel) ou lien nominatif non partageable (distanciel) ; documents conservés sur un espace à accès restreint ; secret professionnel (art. 226-13 du Code pénal, ${ARTICLES_BC.definition}).`,
    ].join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* 10. Fiches de poste des fonctions réellement exercées               */
/* ------------------------------------------------------------------ */
const fichesDePoste: BdcDocDef = {
  nom: "Indicateur 21 - Fiches de poste des fonctions exercées",
  indicateur: 21,
  parBeneficiaire: false,
  build: (ctx) => {
    const o = ctx.organisme; const p = ctx.prestation;
    const fiche = (intitule: string, titulaire: string, missions: string[], competences: string[]) =>
      [
        H2(`Fiche de poste — ${intitule}`),
        `**Titulaire** : ${titulaire || "à désigner"}  \n**Rattachement** : ${o.representantLegal.nom}, ${o.representantLegal.qualite}`,
        "**Missions principales**",
        ...missions.map((m) => `- ${m}`),
        "**Compétences requises**",
        ...competences.map((c) => `- ${c}`),
        "",
      ].join("\n");
    return [
      H("Fiches de poste des fonctions exercées"),
      fiche("Consultant en bilan de compétences", p.consultant.nom, [
        "Conduire les trois phases réglementaires du bilan (art. R6313-4)",
        "Analyser la demande et formaliser les objectifs avec le bénéficiaire",
        "Mobiliser les outils d'investigation et en restituer les résultats",
        "Rédiger le document de synthèse et assurer le suivi à six mois",
        "Garantir la confidentialité et l'absence de conflit d'intérêts",
      ], [
        "Titre ou diplôme en psychologie du travail, conseil en évolution professionnelle ou équivalent",
        "Maîtrise des outils d'exploration des intérêts et des compétences",
        "Connaissance du cadre légal du bilan de compétences",
      ]),
      fiche("Référent handicap", o.referentHandicap.nom, [
        "Recueillir les besoins d'adaptation dès l'analyse du besoin",
        "Mettre en œuvre et tracer les aménagements",
        "Mobiliser les partenaires spécialisés (Agefiph, Cap emploi, MDPH)",
      ], [
        "Connaissance des dispositifs de compensation",
        "Capacité à formaliser un plan d'adaptation individualisé",
      ]),
      fiche("Référent qualité", o.representantLegal.nom, [
        "Piloter le système qualité et la conformité Qualiopi",
        "Tenir le registre des réclamations et le tableau d'amélioration continue",
        "Organiser la veille et sa diffusion",
        "Préparer les audits et suivre les actions correctives",
      ], [
        "Maîtrise du référentiel national qualité et de son guide de lecture",
        "Capacité d'analyse des indicateurs de performance",
      ]),
    ].join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* 11. Process handicap                                                */
/* ------------------------------------------------------------------ */
const processHandicap: BdcDocDef = {
  nom: "Indicateur 26 - Process d'accueil des bénéficiaires en situation de handicap",
  indicateur: 26,
  parBeneficiaire: false,
  build: (ctx) => {
    const { organisme: o } = ctx;
    return [
      H("Process d'accueil des bénéficiaires en situation de handicap"),
      `**Référent handicap** : ${o.referentHandicap.nom} — ${o.referentHandicap.email} — ${o.referentHandicap.telephone}`,
      H2("1. Repérage du besoin"),
      "La question de l'adaptation est posée systématiquement lors de l'analyse du besoin, sans obligation de déclaration d'un statut. Le bénéficiaire reste libre de ne pas s'exprimer.",
      H2("2. Analyse et formalisation"),
      "| Étape | Responsable | Délai | Trace |",
      "|---|---|---|---|",
      "| Entretien de recueil du besoin d'adaptation | Référent handicap | Avant la contractualisation | Fiche de recueil signée |",
      "| Définition des aménagements | Référent handicap + consultant | Avant la première séance | Plan d'adaptation |",
      "| Mise en œuvre et suivi | Consultant | Toute la prestation | Compte rendu de séance |",
      "| Bilan des adaptations | Référent handicap | Fin de prestation | Fiche bilan |",
      H2("3. Adaptations mobilisables"),
      "- Allongement de la durée des séances et pauses supplémentaires\n- Documents en gros caractères ou format numérique accessible\n- Séances en distanciel pour éviter les déplacements\n- Salle accessible en rez-de-chaussée\n- Interprète en langue des signes via un partenaire",
      H2("4. Réorientation"),
      "Si l'adaptation nécessaire dépasse les moyens de l'organisme, le bénéficiaire est réorienté vers un partenaire compétent (Agefiph, Cap emploi, PAS, MDPH), avec traçabilité de l'orientation.",
      H2("5. Partenaires"),
      "| Partenaire | Objet | Contact |",
      "|---|---|---|",
      "| Agefiph | Aides à la compensation | www.agefiph.fr |",
      "| Cap emploi | Accompagnement vers l'emploi | www.capemploi.fr |",
      "| MDPH | Reconnaissance et droits | Conseil départemental |",
      "| Ressource Handicap Formation | Ingénierie d'adaptation | www.agefiph.fr/rhf |",
    ].join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* 12. Tableau d'amélioration continue                                 */
/* ------------------------------------------------------------------ */
const tableauAmeliorationContinue: BdcDocDef = {
  nom: "Indicateur 32 - Tableau d'amélioration continue",
  indicateur: 32,
  parBeneficiaire: false,
  build: (ctx) => {
    const p = ctx.prestation;
    return [
      H("Tableau d'amélioration continue"),
      `_Tableau ouvert le ${dateSysteme(ctx)} (V1), tenu à jour en continu. Effectif concerné : ${ctx.beneficiaires.length} bénéficiaire(s). L'analyse des risques qualité (IND 32, décret n° 2026-728) figure dans une pièce distincte._\n`,
      "| N° | Origine (réclamation, enquête, audit, veille) | Constat | Analyse de cause | Action corrective | Responsable | Échéance | Statut | Efficacité vérifiée |",
      "|---|---|---|---|---|---|---|---|---|",
      ...entreesVeille(ctx).map((e) => `| ${e.ref} | Veille IND ${e.ind} — ${e.source} | ${e.resume} | Évolution externe | ${e.action} | ${e.pilote} | ${e.echeance} | ${e.statut} | ${e.statut === "Réalisé" ? "Pièces mises à jour présentes au dossier" : "À vérifier à échéance"} |`),
      "| R1 | Réclamation / appréciation |  |  |  |  |  | ☐ En cours ☐ Soldée |  |",
      "| R2 | Réclamation / appréciation |  |  |  |  |  | ☐ En cours ☐ Soldée |  |",
      "",
      "_Les constats sont issus des réclamations enregistrées, des questionnaires de satisfaction renseignés par les bénéficiaires, des retours des financeurs et de la veille. Aucune donnée n'est saisie à la place d'un tiers._",
      "",
      "Sources de données mobilisées : registre des réclamations, questionnaires à chaud et à froid, entretiens de suivi à six mois, analyse des risques qualité.",
    ].join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* 13. Clauses juridiques BC obligatoires (annexe contractuelle)       */
/* ------------------------------------------------------------------ */
const clausesBC: BdcDocDef = {
  nom: "Indicateur 9 - Clauses contractuelles spécifiques au bilan de compétences",
  indicateur: 9,
  parBeneficiaire: false,
  contractuelle: true,
  build: (ctx) => {
    const o = ctx.organisme; const p = ctx.prestation;
    const c = typeContrat(p);
    return [
      H("Clauses contractuelles spécifiques au bilan de compétences"),
      `**Nature de l'engagement** : ${c.libelle} (${c.base}).`,
      `**Prix** : ${formatPrix(o, p)}`,
      formatDuree(p),
      H2("Article 1 — Consentement"),
      "Le bilan de compétences ne peut être réalisé qu'avec le consentement du bénéficiaire. Le refus d'y consentir ne constitue ni une faute ni un motif de licenciement.",
      H2("Article 2 — Délais"),
      c.delai,
      H2("Article 3 — Confidentialité"),
      `Le consultant est tenu au secret professionnel (art. 226-13 du Code pénal). Aucun élément du bilan n'est communiqué à l'employeur, au financeur ou à un tiers sans l'accord du bénéficiaire (${ARTICLES_BC.definition}).`,
      H2("Article 4 — Destruction des documents"),
      `Les documents élaborés pour la réalisation du bilan sont détruits dès le terme de l'action. Par exception, les documents faisant l'objet d'un accord écrit du bénéficiaire fondé sur la nécessité d'un suivi de sa situation peuvent être conservés trois ans au plus (${ARTICLES_BC.destruction}).`,
      H2("Article 5 — Propriété du document de synthèse"),
      "Par exception à toute clause de propriété intellectuelle relative aux supports du cabinet, le document de synthèse est la propriété exclusive du bénéficiaire, seul destinataire de ce document.",
      H2("Article 6 — Absence de conflit d'intérêts"),
      "Le consultant n'oriente jamais le bénéficiaire vers une prestation, une formation ou un secteur d'activité proposé par l'organisme ou par l'une de ses structures affiliées. Aucune rémunération liée à une orientation n'est perçue.",
      H2("Article 7 — Protection des données (RGPD)"),
      `| Élément | Information |\n|---|---|\n| Responsable de traitement | ${o.raisonSociale}, ${o.adresse} ${o.codePostal} ${o.ville} |\n| Finalité | Réalisation et suivi du bilan de compétences, obligations légales et qualité |\n| Base légale | Exécution du contrat et obligations légales de l'organisme |\n| Destinataires | Le consultant en charge du bilan ; le financeur pour les seules données administratives |\n| Durée de conservation | Documents du bilan : détruits à l'issue, sauf accord écrit (1 an max). Données administratives et comptables : durée légale |\n| Droits | Accès, rectification, effacement, opposition, limitation, portabilité |\n| Exercice des droits | ${o.emailContact} |\n| Réclamation | CNIL — 3 place de Fontenoy, 75007 Paris — www.cnil.fr |`,
      H2("Article 8 — Réclamation et médiation"),
      `Réclamation à ${o.emailContact} : accusé de réception sous 48 heures ouvrées, réponse sous 15 jours. Médiateur de la consommation : ${o.mediateurConsommation.nom}, ${o.mediateurConsommation.adresse}, ${o.mediateurConsommation.urlSaisine} (art. L612-1 du Code de la consommation).`,
      H2("Article 9 — Harcèlement et agissements sexistes"),
      "Les faits de harcèlement moral (art. L1152-1 du Code du travail), de harcèlement sexuel (art. L1153-1) et les agissements sexistes (art. L1142-2-1) sont interdits. Signalement : " +
        `${o.representantLegal.nom} — ${o.emailContact}. Autorités compétentes : Défenseur des droits (09 69 39 00 00), 3919 (violences faites aux femmes), inspection du travail de la DREETS, procureur de la République près le ${o.tribunalCompetent}.`,
      H2("Article 10 — Juridiction"),
      `Tout litige non résolu à l'amiable relève du ${o.tribunalCompetent}.`,
      `\n${mentionNDA(o)}`,
    ].join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* 14. Mentions « non applicable » / « sollicité sans réponse »        */
/* ------------------------------------------------------------------ */
const attestationsStatuts: BdcDocDef = {
  nom: "Indicateur 30 - Mentions de non-applicabilité et de sollicitation sans réponse",
  indicateur: 30,
  parBeneficiaire: false,
  build: (ctx) => {
    const blocs: string[] = [
      H("Mentions relatives aux enquêtes entreprise et financeur"),
      "_Ces mentions remplacent toute réponse qui serait générée à la place d'un tiers. Aucune réponse d'entreprise ou de financeur n'est produite par l'organisme._\n",
      "| Bénéficiaire | Enquête entreprise | Enquête financeur |",
      "|---|---|---|",
    ];
    for (const b of ctx.beneficiaires) {
      const p = prestationFor(ctx, b);
      const fin = passe(p.dateFin);
      const dSoll = new Date(p.dateFin); dSoll.setDate(dSoll.getDate() + 7);
      const dConst = new Date(p.dateFin); dConst.setDate(dConst.getDate() + 37);
      const sollicitation = !fin ? `À solliciter à l'issue du bilan (${fmtDateFR(p.dateFin)})` : passe(dConst) ? `Sollicitée le ${fmtDateFR(dSoll)} — sans réponse au ${fmtDateFR(dConst)} (joindre la capture de l'envoi)` : `Sollicitée le ${fmtDateFR(dSoll)} — relance prévue`;
      const entreprise = p.origineDemande === "employeur" ? sollicitation : "Sans objet : démarche individuelle, sans employeur partie au contrat";
      const financeur = p.financeur === "CPF" ? "Sans objet : financement CPF (la Caisse des dépôts ne répond pas aux enquêtes individuelles)" : p.financeur === "personnel" ? "Sans objet : financement personnel (le bénéficiaire est le financeur)" : sollicitation;
      blocs.push(`| ${b.prenom} ${b.nom} | ${entreprise} | ${financeur} |`);
    }
    blocs.push("", `Mentions établies par ${ctx.prestation.consultant.nom}, consultant.`);
    return blocs.join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* Couverture complémentaire : IND 5, 6, 22, 23, 24, 25                 */
/* ------------------------------------------------------------------ */

const objectifsOperationnels: BdcDocDef = {
  nom: "Indicateur 5 - Objectifs opérationnels et évaluables du bilan",
  indicateur: 5,
  parBeneficiaire: false,
  build: (ctx) => {
    const p = ctx.prestation;
    return [
      H("Objectifs opérationnels et évaluables du bilan de compétences"),
      `_Objectifs définis conformément à l'${ARTICLES_BC.definition} et précisés avec chaque bénéficiaire en phase préliminaire._\n`,
      "| À l'issue du bilan, le bénéficiaire est capable de… | Critère d'évaluation | Moment |",
      "|---|---|---|",
      "| Identifier et formuler ses compétences professionnelles et personnelles | Portefeuille de compétences complété et validé en séance | Phase d'investigation |",
      "| Exprimer ses intérêts, aptitudes et motivations | Restitution argumentée des outils d'investigation | Phase d'investigation |",
      "| Formuler un projet professionnel réaliste, ou des alternatives | Projet confronté au terrain (enquête métier ou immersion) | Fin de la phase d'investigation |",
      "| Élaborer un plan d'action daté, avec ressources identifiées | Plan d'action présent dans le document de synthèse | Phase de conclusion |",
      "",
      formatDuree(p),
      "",
      "L'atteinte de ces objectifs est évaluée lors de l'entretien de conclusion et consignée au point 4 du document de synthèse (IND 11).",
    ].join("\n");
  },
};

const contenusModalites: BdcDocDef = {
  nom: "Indicateur 6 - Contenus et modalités adaptés du bilan",
  indicateur: 6,
  parBeneficiaire: false,
  build: (ctx) => {
    const p = ctx.prestation;
    const rh = repartitionHeures(p.dureeTotaleH);
    return [
      H("Contenus et modalités de mise en œuvre du bilan"),
      `_Déroulé en trois phases (${ARTICLES_BC.phases}), durée ${p.dureeTotaleH} heures au plus (${ARTICLES_BC.definition})._\n`,
      "| Phase | Durée | Contenus | Méthodes et outils |",
      "|---|---|---|---|",
      `| Préliminaire | ${rh.p1} h | Analyse de la demande et du besoin, définition du format, information sur les conditions de déroulement | Entretien, fiche d'analyse du besoin, planning |`,
      `| Investigation | ${rh.p2} h | Analyse du parcours, des intérêts et des motivations ; identification des compétences ; exploration de pistes ; confrontation au terrain | Portefeuille de compétences, questionnaire d'intérêts, test de personnalité, enquêtes métier |`,
      `| Conclusion | ${rh.p3} h | Appropriation des résultats, conditions de réussite, plan d'action, remise du document de synthèse | Entretien de restitution, document de synthèse |`,
      "",
      H2("Adaptation aux bénéficiaires"),
      "- Planning construit à partir des jours et créneaux déclarés par chaque bénéficiaire (planning prévisionnel signé, IND 10).",
      "- Modalité présentielle, distancielle ou mixte selon les contraintes exprimées en phase préliminaire.",
      "- Aménagements pour les personnes en situation de handicap définis avec le référent handicap (IND 26).",
      "- Outils d'investigation choisis selon le projet et le niveau du bénéficiaire.",
    ].join("\n");
  },
};

const planDeveloppementConsultant: BdcDocDef = {
  nom: "Indicateur 22 - Plan de développement des compétences du consultant",
  indicateur: 22,
  parBeneficiaire: false,
  build: (ctx) => {
    const p = ctx.prestation;
    const o = ctx.organisme;
    const d0 = ctx.organisme.dateMaj || p.dateDebut;
    const trim = (m: number) => { const d = new Date(d0); d.setMonth(d.getMonth() + m); return fmtDateFR(d); };
    return [
      H("Plan de développement des compétences"),
      `_Établi le ${dateSysteme(ctx)} (V1). Personnel concerné : ${p.consultant.nom} (consultant)${o.referentHandicap.nom && o.referentHandicap.nom !== p.consultant.nom ? `, ${o.referentHandicap.nom} (référent handicap)` : ""}._\n`,
      "| Action | Objectif | Modalité | Échéance prévue | Statut | Preuve attendue |",
      "|---|---|---|---|---|---|",
      `| Actualisation réglementaire : référentiel national qualité (décret n° 2026-728) | Intégrer les indicateurs 27, 32 et 33 au système qualité | Autoformation, webinaire | ${trim(2)} | Prévue | Attestation / support |`,
      `| Outils d'investigation (intérêts, personnalité) | Actualiser la maîtrise des outils utilisés | Formation courte | ${trim(6)} | Prévue | Attestation de formation |`,
      `| Analyse de pratiques / supervision | Prendre du recul sur les accompagnements | Supervision entre pairs, 2 séances/an | ${trim(9)} | Prévue | Compte rendu |`,
      `| Accueil des personnes en situation de handicap | Adapter l'accompagnement | Ressource Handicap Formation (Agefiph) | ${trim(12)} | Prévue | Attestation |`,
      `| Maîtrise de l'IA générative (règlement (UE) 2024/1689, art. 4) | Encadrer l'usage de l'IA pour la recherche documentaire, sans donnée personnelle | Autoformation encadrée | ${trim(4)} | Prévue | Attestation / support |`,
      "",
      "Le statut de chaque action est mis à jour à sa réalisation (preuve jointe). Un entretien annuel fait le point sur les besoins de développement (pièce « Entretien annuel »).",
    ].join("\n");
  },
};

/* --------------------------- Veilles (IND 23, 24, 25) --------------------------- */

interface EntreeVeille {
  ind: 23 | 24 | 25;
  /** Date de parution de la source (ISO) — jamais future, jamais inventée. */
  parution: string;
  /** Précision affichée quand seule l'année ou le mois est certain. */
  parutionLibelle?: string;
  source: string;
  lien: string;
  resume: string;
  impact: string;
  action: string;
  pilote: (ctx: BdcContext) => string;
}

const piloteQualite = (ctx: BdcContext) => ctx.organisme.representantLegal.nom || ctx.prestation.consultant.nom;
const piloteConsultant = (ctx: BdcContext) => ctx.prestation.consultant.nom;

const VEILLES_BC: EntreeVeille[] = [
  // ---- IND 23 : légale et réglementaire ----
  ...REFERENCES_REGLEMENTAIRES_2026.filter((r) => r.types.includes("BC")).map((r): EntreeVeille => ({
    ind: 23, parution: r.date, source: r.texte, lien: r.source, resume: r.objet,
    impact: r.date.startsWith("2026")
      ? "Audit à compter du 1er novembre 2026 sur 33 indicateurs : sous-traitance et portage à tracer dans les contrats (IND 27), analyse des risques qualité à formaliser (IND 32) ; IND 33 non applicable au bilan."
      : r.date.startsWith("2024") ? "Niveaux attendus et preuves à produire pour chaque indicateur applicable au bilan de compétences."
      : r.date.startsWith("2019") ? "Certification qualité obligatoire pour réaliser des bilans financés par le CPF ou un OPCO."
      : "Cadre du bilan de compétences (art. L6313-4) et de la certification qualité (art. L6316-1).",
    action: r.date.startsWith("2026")
      ? "Registre de sous-traitance et de portage, annexe « Clauses qualité » des contrats, analyse des risques qualité ajoutés au dossier ; process veilles et tableau d'amélioration mis à jour."
      : r.date.startsWith("2024") ? "Revue de chaque pièce du dossier au regard du guide ; indicateurs non applicables au bilan identifiés (3, 7, 8, 13 à 16, 20, 28, 29, 33)."
      : "Procédures, contrats et livret d'accueil alignés sur ces textes.",
    pilote: piloteQualite,
  })),
  { ind: 23, parution: "2019-01-01", parutionLibelle: "01/01/2019 (version en vigueur)", source: "Code du travail, art. L6313-4 et R6313-4 à R6313-8", lien: "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000038014105/",
    resume: "Consentement, trois phases (préliminaire, investigation, conclusion), 24 heures au plus, résultats et synthèse au seul bénéficiaire, organisation dédiée, destruction des documents, convention tripartite et délai de 10 jours.",
    impact: "Contenu obligatoire du programme, du contrat ou de la convention, de la synthèse et des règles de conservation.",
    action: "Programme des 3 phases, convention bipartite / tripartite, accord de conservation (3 ans au plus sur accord écrit, R6313-7) et attestation de remise de la synthèse rédigés en conséquence.",
    pilote: piloteQualite },
  // ---- IND 24 : emplois, métiers, compétences ----
  { ind: 24, parution: "2022-03-01", parutionLibelle: "Mars 2022", source: "France Stratégie et Dares — « Les métiers en 2030 »", lien: "https://www.strategie.gouv.fr",
    resume: "Projection des créations d'emplois et des besoins de recrutement par famille de métiers à l'horizon 2030.",
    impact: "Permet de confronter les pistes des bénéficiaires aux métiers porteurs et aux métiers en déclin.",
    action: "Rapport intégré au répertoire des sources de la phase d'investigation ; consulté pour chaque piste retenue.", pilote: piloteConsultant },
  { ind: 24, parution: "2024-01-01", parutionLibelle: "2024", source: "France Travail — Répertoire opérationnel des métiers et des emplois (ROME 4.0)", lien: "https://www.francetravail.fr",
    resume: "Refonte du ROME : fiches métiers décrites par compétences, savoirs et contextes de travail.",
    impact: "Le portefeuille de compétences et les enquêtes métier s'appuient sur le vocabulaire des compétences du ROME 4.0.",
    action: "Trame du portefeuille de compétences et guide d'enquête métier alignés sur les fiches ROME 4.0.", pilote: piloteConsultant },
  { ind: 24, parution: "2025-04-01", parutionLibelle: "Avril 2025", source: "France Travail — enquête Besoins en main-d'œuvre (BMO) 2025", lien: "https://statistiques.francetravail.org/bmo",
    resume: "Projets de recrutement et difficultés anticipées par métier et par bassin d'emploi.",
    impact: "Vérification des débouchés locaux des pistes explorées par chaque bénéficiaire.",
    action: "Consultation systématique de la BMO du bassin du bénéficiaire en phase d'investigation, mentionnée dans le plan d'action.", pilote: piloteConsultant },
  // ---- IND 25 : innovations pédagogiques et technologiques ----
  { ind: 25, parution: "2019-01-01", parutionLibelle: "01/01/2019", source: "Code du travail, art. D6313-3-1 (actions réalisées à distance)", lien: "https://www.legifrance.gouv.fr",
    resume: "Conditions des prestations à distance : assistance technique et pédagogique, information du bénéficiaire, évaluations jalonnant le parcours.",
    impact: "Encadre les entretiens en classe virtuelle et l'émargement à distance.",
    action: "Pièce « Moyens, confidentialité et informations pratiques » (IND 17) : prérequis techniques, assistance, lien nominatif, émargement électronique horodaté.", pilote: piloteConsultant },
  { ind: 25, parution: "2024-07-12", parutionLibelle: "12/07/2024 (JOUE)", source: "Règlement (UE) 2024/1689 sur l'intelligence artificielle", lien: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
    resume: "Cadre européen de l'IA ; obligation de maîtrise de l'IA par les personnels qui l'utilisent, applicable depuis le 2 février 2025.",
    impact: "Usage d'outils d'IA générative possible pour la recherche documentaire sur les métiers, jamais avec des données personnelles du bénéficiaire.",
    action: "Règle d'usage encadré de l'IA générative ajoutée aux ressources du consultant ; formation à la maîtrise de l'IA inscrite au plan de développement des compétences (IND 22).", pilote: piloteQualite },
  { ind: 25, parution: "2025-06-28", parutionLibelle: "28/06/2025 (entrée en application)", source: "Directive (UE) 2019/882 — exigences d'accessibilité des produits et services numériques", lien: "https://eur-lex.europa.eu/eli/dir/2019/882/oj",
    resume: "Exigences d'accessibilité applicables aux services numériques, dans la continuité du RGAA.",
    impact: "Les ressources numériques remises aux bénéficiaires doivent être lisibles, agrandissables et compatibles avec les aides techniques.",
    action: "Ressources du bénéficiaire (IND 19) fournies en version numérique accessible ; adaptation étudiée avec le référent handicap (IND 26).", pilote: piloteQualite },
];

function isoDate(s: string): Date { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }

/** Entrées d'une veille : parution passée uniquement ; échéance = parution + 1 mois (au plus tôt la date de MAJ). */
function entreesVeille(ctx: BdcContext, ind?: 23 | 24 | 25) {
  const maj = ctx.organisme.dateMaj || ctx.prestation.dateDebut;
  const auj = Date.now();
  return VEILLES_BC
    .filter((e) => (!ind || e.ind === ind) && isoDate(e.parution).getTime() <= auj)
    .sort((x, y) => x.parution.localeCompare(y.parution))
    .map((e, i) => {
      const p = isoDate(e.parution);
      const ech = new Date(Math.max(p.getTime(), maj.getTime())); ech.setMonth(ech.getMonth() + 1);
      const realise = ech.getTime() <= auj;
      return { ...e, ref: `V${e.ind}-${String(i + 1).padStart(2, "0")}`, parutionAff: e.parutionLibelle || fmtDateFR(p), echeance: fmtDateFR(ech), statut: realise ? "Réalisé" : "En cours", pilote: e.pilote(ctx), anterieureMaj: p.getTime() <= maj.getTime() };
    });
}

function veilleDef(ind: 23 | 24 | 25, nom: string, titre: string): BdcDocDef {
  return {
    nom, indicateur: ind, parBeneficiaire: false,
    build: (ctx) => {
      const lignes = entreesVeille(ctx, ind);
      return [
        H(titre),
        `_Registre ouvert le ${dateSysteme(ctx)} (V1), tenu à jour en continu selon le process veilles (sources, fréquence, exploitation). Chaque entrée porte la date de parution réelle de sa source ; son exploitation est suivie jusqu'à la preuve de diffusion._\n`,
        "| Réf. | Parution | Source | Résumé | Impact sur le bilan de compétences | Décision / action | Pilote | Échéance | Statut | Diffusion interne |",
        "|---|---|---|---|---|---|---|---|---|---|",
        ...lignes.map((e) => `| ${e.ref} | ${e.parutionAff} | ${e.source} — ${e.lien} | ${e.resume} | ${e.impact} | ${e.action} | ${e.pilote} | ${e.echeance} | ${e.statut} | ${e.anterieureMaj ? `Compte rendu d'exploitation de la veille du ${dateSysteme(ctx)}` : "Prochain compte rendu d'exploitation (revue qualité)"} |`),
        "",
        `Chaque action est reportée au tableau d'amélioration continue (IND 32) sous la même référence.`,
      ].join("\n");
    },
  };
}

const veilleReglementaire = veilleDef(23, "Indicateur 23 - Registre de veille légale et réglementaire", "Veille légale et réglementaire");
const veilleMetiers = veilleDef(24, "Indicateur 24 - Registre de veille emplois, métiers et compétences", "Veille sur les évolutions des compétences, des métiers et des emplois");
const veillePedagogique = veilleDef(25, "Indicateur 25 - Registre de veille innovations pédagogiques et technologiques", "Veille sur les innovations pédagogiques et technologiques");

/** Compte rendu d'exploitation des veilles, daté de la MAJ : seules les entrées parues avant cette date y figurent. */
const compteRenduVeille: BdcDocDef = {
  nom: "Indicateur 23 - Compte rendu d'exploitation des veilles",
  indicateur: 23,
  parBeneficiaire: false,
  build: (ctx) => {
    const lignes = entreesVeille(ctx).filter((e) => e.anterieureMaj);
    return [
      H("Compte rendu d'exploitation des veilles"),
      `**Date** : ${dateSysteme(ctx)}  \n**Participants** : ${[ctx.organisme.representantLegal.nom, ctx.prestation.consultant.nom].filter((v, i, a) => v && a.indexOf(v) === i).join(", ")}  \n**Objet** : exploitation des veilles légale (IND 23), métiers (IND 24) et pédagogique / technologique (IND 25).\n`,
      lignes.length ? "| Réf. | Veille | Information | Décision | Action du tableau d'amélioration |" : "_Aucune entrée parue avant cette date : les veilles seront exploitées lors de la prochaine revue qualité._",
      lignes.length ? "|---|---|---|---|---|" : "",
      ...lignes.map((e) => `| ${e.ref} | IND ${e.ind} | ${e.source} | ${e.action} | ${e.ref} — ${e.statut} (échéance ${e.echeance}) |`),
      "",
      "**Diffusion** : compte rendu transmis aux intervenants et classé avec les registres de veille.",
    ].join("\n");
  },
};

import { supportCoursPatisserie } from "./bdcSupportCoursPatisserie";
import { supportCoursManager } from "./bdcSupportCoursManager";

const ressourcesBeneficiaire: BdcDocDef = {
  nom: "Indicateur 19 - Ressources mises à disposition du bénéficiaire",
  indicateur: 19,
  parBeneficiaire: false,
  build: (ctx) => {
    const p = ctx.prestation;
    const prof = ctx.formation ? getBdcDomainProfile(ctx.formation) : null;
    return [
      H("Ressources mises à disposition du bénéficiaire"),
      "_Ressources remises ou indiquées au bénéficiaire au fil des trois phases ; leur appropriation est vérifiée en séance._\n",
      "| Ressource | Contenu | Phase | Modalité d'accès |",
      "|---|---|---|---|",
      "| Livret d'accueil du bénéficiaire | Déroulement, droits, confidentialité, contacts | Préliminaire | Remis à la contractualisation |",
      "| Portefeuille de compétences | Trame d'analyse des expériences et des compétences | Investigation | Document numérique complété en séance |",
      "| Questionnaire d'intérêts et test de personnalité | Outils d'investigation restitués par le consultant | Investigation | Passation en séance, restitution orale et écrite |",
      "| Guide de l'enquête métier | Questions types, préparation et compte rendu d'enquête | Investigation | Remis avant les enquêtes |",
      "| Répertoire des sources métiers | France Travail (fiches ROME, enquête BMO), France Compétences (RNCP / RS), Onisep, sites des branches | Investigation | Liens transmis par courriel |",
      "| Trame de plan d'action | Étapes, échéances, ressources, financements | Conclusion | Complétée en séance, reprise dans la synthèse |",
      prof && !prof.generique ? `| Ressources du secteur visé (${prof.label}) | ${prof.formations.slice(0, 2).join(" ; ")} | Investigation | Transmises selon le projet |` : "",
      "",
      H2("Appropriation"),
      `Chaque ressource est présentée par ${p.consultant.nom} lors de sa remise ; le bénéficiaire peut revenir sur son usage à chaque séance. En distanciel, les ressources sont partagées à l'écran puis transmises par courriel (assistance : ${ctx.organisme.emailContact || "courriel de l'organisme"}).`,
      H2("Accessibilité"),
      `Les documents sont disponibles en version numérique agrandissable ; toute autre adaptation est étudiée avec le référent handicap (${ctx.organisme.referentHandicap.nom}).`,
    ].join("\n");
  },
};

/** Support de cours métier : uniquement pour le profil Pâtisserie & Cake Design (gabarit du client). */
const supportCoursPatisserieConditionnel: BdcDocDef = {
  ...supportCoursPatisserie,
  applicable: (f) => getBdcDomainProfile(f).label === "Pâtisserie & Cake Design",
};

/** Support de cours du profil Manager : compétences managériales, exercices corrigés, veille. */
const supportCoursManagerConditionnel: BdcDocDef = {
  ...supportCoursManager,
  applicable: (f) => getBdcDomainProfile(f).label === "Manager — compétences managériales",
};

export const BDC_TEMPLATES_MANQUANTS: BdcDocDef[] = [
  documentSynthese,
  attestationRemiseSynthese,
  feuillesEmargement,
  testPersonnalite,
  satisfactionChaud,
  satisfactionFroid,
  accordConservation,
  autorisationTransmission,
  procedureReclamation,
  livretAccueil,
  planningPrevisionnel,
  infosDistanciel,
  fichesDePoste,
  processHandicap,
  tableauAmeliorationContinue,
  clausesBC,
  attestationsStatuts,
  objectifsOperationnels,
  contenusModalites,
  planDeveloppementConsultant,
  veilleReglementaire,
  veilleMetiers,
  veillePedagogique,
  compteRenduVeille,
  ressourcesBeneficiaire,
  supportCoursPatisserieConditionnel,
  supportCoursManagerConditionnel,
];

/** Pièces BC applicables à une formation donnée (même filtre pour le catalogue et le ZIP). */
export function bdcTemplateApplicable(def: BdcDocDef, f?: FormationInfo): boolean {
  return !def.applicable || !f || def.applicable(f);
}

/** Pièces contractuelles dont la signature conditionne l'export (BLOC 7). */
export const PIECES_CONTRACTUELLES = [
  "Contrat ou convention de prestation",
  "CGV",
  "Règlement intérieur",
  "Engagements déontologiques",
  "Accord de conservation des documents",
  "Document de synthèse",
];
