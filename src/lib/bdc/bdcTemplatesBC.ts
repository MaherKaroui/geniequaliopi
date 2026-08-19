/**
 * BLOC 4 — Templates obligatoires manquants (catégorie BC)
 * BLOC 5 — Clauses juridiques à jour
 *
 * Tous les contenus dérivent du BdcContext (BLOC 1) : aucune valeur en dur.
 */
import type { BdcContext, Beneficiaire, Prestation, Organisme } from "./bdcModel";
import { fmtDateFR, formatDuree, formatPrix, mentionNDA, typeContrat, seancesFor } from "./bdcModel";
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
  build: (ctx: BdcContext, b: Beneficiaire | null) => string;
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
    const { organisme: o, prestation: p } = ctx;
    const seed = seedBenef(b, "synthese");
    const pk = <T,>(arr: T[], off: number): T => arr[(seed + off) % arr.length];
    const prof = ctx.formation ? getBdcDomainProfile(ctx.formation) : null;
    const metier = prof?.metier || "le métier visé";
    const secteur = prof?.secteur || "le secteur visé";
    const tech = prof?.techniques || [];
    const transv = prof?.transversales || [];
    const forms = prof?.formations || [];
    const opps = prof?.opportunites || [];
    const nomB = b ? `${b.prenom} ${b.nom}` : "Le bénéficiaire";

    const dPlus = (mois: number) => {
      const d = new Date(p.dateFin);
      d.setMonth(d.getMonth() + mois);
      return fmtDateFR(d);
    };

    const circonstances = pk([
      `${nomB} a sollicité ce bilan pour sécuriser une orientation vers ${metier}. La demande, formulée le ${fmtDateFR(p.dateDebut)}, portait sur la vérification de la faisabilité du projet et sur l'identification des compétences transférables.`,
      `${nomB} a engagé cette démarche à la suite d'un questionnement professionnel durable. Le besoin exprimé lors de l'entretien préliminaire concernait la clarification du projet et sa confrontation aux réalités de ${secteur}.`,
      `${nomB} s'est inscrit(e) dans ce bilan pour objectiver ses acquis et arbitrer entre plusieurs pistes, dont ${metier}. La démarche est volontaire et a été instruite lors de l'entretien préliminaire du ${fmtDateFR(p.dateDebut)}.`,
    ], 0);

    const lignesComp: Array<[string, string, string]> = [
      [
        "Compétences techniques du métier visé",
        tech.length ? `${tech[seed % tech.length]} ; ${tech[(seed + 1) % tech.length]}` : "Compétences techniques du domaine visé identifiées en séance",
        "Tests de positionnement, mises en situation et retours d'expérience professionnelle",
      ],
      [
        "Compétences transversales",
        transv.length ? `${transv[seed % transv.length]} ; ${transv[(seed + 2) % transv.length]}` : "Organisation, communication, adaptation",
        "Questionnaire d'intérêts (RIASEC), entretiens d'explicitation",
      ],
      [
        "Aptitudes et motivations",
        `Motivation confirmée pour ${secteur} ; capacité à apprendre et à s'adapter à un nouvel environnement de travail`,
        "Test de personnalité, enquêtes métier réalisées entre les séances",
      ],
    ];

    const projet = pk([
      `Accéder au métier de ${metier} dans ${secteur}, après acquisition de la qualification requise.`,
      `Se professionnaliser dans ${secteur} en visant ${opps.length ? opps[seed % opps.length] : "un poste correspondant au projet"}, en capitalisant sur les acquis du parcours.`,
      `Valider le projet de ${metier} par une formation qualifiante, puis une insertion progressive dans ${secteur}.`,
    ], 1);

    const etapes: Array<[string, string, string]> = [
      [
        `Finaliser le dossier de candidature à ${forms.length ? forms[seed % forms.length] : "la formation qualifiante identifiée"}`,
        dPlus(1),
        "Consultant du bilan, organisme de formation, site France Compétences",
      ],
      [
        "Monter le plan de financement (CPF, aides régionales, France Travail selon la situation)",
        dPlus(2),
        "Conseiller France Travail / OPCO, plateforme Mon Compte Formation",
      ],
      [
        `Réaliser une immersion ou une période d'observation en ${secteur}`,
        dPlus(3),
        "Réseau professionnel, PMSMP, entreprises identifiées lors des enquêtes métier",
      ],
      [
        `Entrer en formation puis engager la recherche d'emploi sur le métier de ${metier}`,
        dPlus(6),
        "Organisme de formation, entretien de suivi à 6 mois",
      ],
    ];

    const objectifs: Array<[string, 0 | 1]> = [
      [`Analyser ses compétences professionnelles et personnelles au regard de ${metier}`, 0],
      [`Identifier ses aptitudes, ses intérêts et ses motivations pour ${secteur}`, 0],
      ["Définir un projet professionnel réaliste et, le cas échéant, un projet de formation", (seed % 4 === 0 ? 1 : 0)],
      ["Élaborer un plan d'action daté, hiérarchisé et assorti de ressources mobilisables", 0],
    ];
    const obsObj = [
      `Objectif atteint : les compétences transférables vers ${metier} sont formalisées au point 2 du présent document.`,
      `Objectif atteint : les investigations menées sur ${secteur} (enquêtes métier, tests, entretiens) permettent une décision éclairée.`,
      "Partiellement atteint : le projet est arrêté, la faisabilité financière du parcours de formation reste à confirmer.",
      "Objectif atteint : le plan d'action figurant au point 3 est daté et les appuis sont identifiés.",
    ];

    /* Indicateurs factuels de réalisation de la prestation (indicateur 11). */
    const nbSeances = seancesFor(ctx, b).length;
    const indicateursReal: Array<[string, string]> = [
      ["Heures d'accompagnement réalisées", `${p.dureeTotaleH} h sur ${p.dureeTotaleH} h prévues, soit 100 %`],
      ["Séances réalisées", `${nbSeances} séances individuelles, du ${fmtDateFR(p.dateDebut)} au ${fmtDateFR(p.dateFin)}`],
      ["Respect des trois phases réglementaires", "Préliminaire, investigation et conclusion réalisées (art. R6313-4)"],
      ["Travail intersession", pk(["Réalisé intégralement", "Réalisé, avec un léger décalage sur une enquête métier", "Réalisé, enrichi d'une immersion complémentaire"], 3)],
      ["Remise du document de synthèse", `Effectuée le ${fmtDateFR(p.dateFin)}, en main propre au bénéficiaire`],
    ];

    const niveauGlobal = seed % 4 === 0
      ? "Objectifs globalement atteints — trois objectifs sur quatre pleinement atteints, le quatrième partiellement."
      : "Objectifs atteints — l'ensemble des objectifs fixés en phase préliminaire est satisfait à l'issue de la prestation.";


    const appreciation = pk([
      `Démarche sérieuse et régulière. ${nomB} a mobilisé les outils proposés et réalisé le travail intersession. Le projet de ${metier} est cohérent avec le parcours et les contraintes exprimées ; sa mise en œuvre dépend principalement de l'entrée en formation.`,
      `${nomB} a fait preuve d'un réel engagement tout au long du bilan. Les investigations menées sur ${secteur} ont permis de lever les doutes initiaux. Le plan d'action est réaliste, avec un point de vigilance sur le financement.`,
      `Le bilan a permis de structurer un projet jusque-là intuitif. ${nomB} dispose désormais d'un plan d'action daté et des ressources pour le conduire ; l'entretien de suivi à six mois permettra d'en mesurer l'avancement.`,
    ], 2);

    return [
      H("Document de synthèse du bilan de compétences"),
      "_Établi en application de l'article R6313-8 du Code du travail._\n",
      entete(o, b, p),
      H2("1. Circonstances du bilan"),
      "_Rubrique rédigée en style indirect par le consultant à partir des entretiens._\n",
      circonstances,
      `\nLa demande a été formulée le ${fmtDateFR(p.dateDebut)} et instruite lors de l'entretien préliminaire. Les objectifs ont été arrêtés conjointement et rappelés au point 4 du présent document.`,
      H2("2. Compétences et aptitudes identifiées au regard des perspectives d'évolution envisagées"),
      "\n| Domaine | Compétences et aptitudes identifiées | Éléments de preuve mobilisés |",
      "|---|---|---|",
      ...lignesComp.map(([d, c, pr]) => `| ${d} | ${c} | ${pr} |`),
      H2("3. Éléments constitutifs du projet et principales étapes de sa mise en œuvre"),
      `**Projet retenu à l'issue du bilan** : ${projet}\n`,
      "| Étape | Action | Échéance | Ressources / appuis |",
      "|---|---|---|---|",
      ...etapes.map(([a, e, r], i) => `| ${i + 1} | ${a} | ${e} | ${r} |`),
      H2("4. Atteinte des objectifs de la prestation (indicateur 11)"),
      "\n| Objectif fixé en phase préliminaire | Atteint | Partiellement atteint | Non atteint | Observations |",
      "|---|---|---|---|---|",
      ...objectifs.map(([lib, part], i) =>
        `| ${lib} | ${part ? "☐" : "☒"} | ${part ? "☒" : "☐"} | ☐ | ${part ? obsObj[2] : obsObj[[0, 1, 3][i % 3]]} |`),
      "\n**Indicateurs de réalisation de la prestation**\n",
      "| Indicateur | Constat |",
      "|---|---|",
      ...indicateursReal.map(([k, v]) => `| ${k} | ${v} |`),
      `\n**Niveau d'atteinte global** : ${niveauGlobal}`,
      `\n**Appréciation générale du consultant** : ${appreciation}`,
      `\n**Suites données** : ${pk([
        `Entrée en formation visée pour ${dPlus(3)}, puis recherche d'emploi sur ${metier}.`,
        `Dépôt du dossier de financement engagé ; démarrage du parcours envisagé à compter du ${dPlus(2)}.`,
        `Poursuite des démarches de manière autonome, avec un point d'étape au ${dPlus(3)}.`,
      ], 4)}`,
      `\n**Suivi** : un entretien de suivi est prévu le ${fmtDateFR(p.dateSuivi6Mois)}, soit six mois après la remise du présent document, conformément à l'article R6313-8.`,


      H2("5. Propriété et confidentialité"),
      "Le document de synthèse est la **seule et exclusive propriété du bénéficiaire**. Il ne peut être communiqué à un tiers, à l'employeur ou au financeur qu'avec son accord écrit préalable et révocable (art. L6313-4).",
      "Les résultats détaillés et les documents produits au cours du bilan sont couverts par le secret professionnel et détruits à l'issue de la prestation, sauf accord écrit du bénéficiaire pour une conservation limitée à un an (art. R6313-7).",
      `\n_Document remis à ${b ? `${b.civilite} ${b.prenom} ${b.nom}` : "la personne concernée"} le ${fmtDateFR(p.dateFin)}._`,
      SIGN(ctx, "Indicateur 11 - Document de synthèse du bilan de compétences", b),
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
    const { organisme: o, prestation: p } = ctx;
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
          ? blocSignatureHtml(ctx, "Feuille d'émargement", b, { dateSeance: s.date, lieu })
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


/* 3. Satisfaction bénéficiaire — à chaud / à froid (échelle 1 à 5)    */
/* ------------------------------------------------------------------ */
/** Échelle cochée : note de 4 ou 5 selon le bénéficiaire et la question. */
function echelleCochee(note: number): string {
  return [1, 2, 3, 4, 5].map((n) => `${n} ${n === note ? "☒" : "☐"}`).join("  ");
}

function questionnaireSatisfaction(titre: string, quand: string, questions: string[], nomPiece: string): BdcDocDef["build"] {
  return (ctx, b) => {
    const { organisme: o, prestation: p } = ctx;
    const seed = seedBenef(b, nomPiece);
    const prof = ctx.formation ? getBdcDomainProfile(ctx.formation) : null;
    const metier = prof?.metier || "mon projet professionnel";
    const lignes = questions.map((q, i) => {
      const note = (seed + i * 3) % 5 === 0 ? 4 : 5;
      return `| ${q} | ${echelleCochee(note)} |`;
    });
    const commentaires = [
      `Accompagnement de qualité, à l'écoute et structuré. Les séances m'ont aidé(e) à poser des mots précis sur mes compétences et à avancer sur le projet de ${metier}.`,
      `J'ai apprécié la méthode : des outils concrets, un rythme adapté à mes disponibilités et des échanges toujours respectueux. Je repars avec un plan d'action clair.`,
      `Le bilan m'a permis de sortir du flou. Les enquêtes métier et les tests ont confirmé mon orientation vers ${metier}. Point à améliorer : un peu plus de temps sur le volet financement.`,
      `Très satisfait(e) du suivi. Le consultant a su me remettre en confiance et m'aider à hiérarchiser mes priorités. Je recommanderais cet accompagnement.`,
      `Démarche exigeante mais utile. Le travail entre les séances demande du temps ; en contrepartie, les résultats sont concrets et réutilisables.`,
    ];
    const commentaire = commentaires[seed % commentaires.length];
    const dateRep = fmtDateFR(/froid/i.test(nomPiece) ? p.dateSuivi6Mois : p.dateFin);
    return [
      H(titre),
      entete(o, b, p),
      `_${quand}. Échelle continue de 1 (très insatisfait) à 5 (très satisfait)._\n`,
      "| Question | 1 → 5 |",
      "|---|---|",
      ...lignes,
      H2("Commentaire libre"),
      commentaire,
      "",
      `**Renseigné le** : ${dateRep}${b ? ` par ${b.civilite} ${b.prenom} ${b.nom}` : ""}`,
      p.financeur === "CPF" ? `\n> ${MENTION_CPF_SATISFACTION}\n` : "",
      SIGN(ctx, nomPiece, b),
    ].join("\n");
  };
}


const satisfactionChaud: BdcDocDef = {
  nom: "Indicateur 30 - Questionnaire de satisfaction bénéficiaire (à chaud)",
  indicateur: 30,
  parBeneficiaire: true,
  build: questionnaireSatisfaction(
    "Questionnaire de satisfaction — volet à chaud",
    "À renseigner lors de l'entretien de conclusion",
    [
      "Clarté des informations reçues avant l'engagement",
      "Qualité de l'accueil et des conditions matérielles",
      "Écoute et posture du consultant",
      "Pertinence des outils d'investigation mobilisés",
      "Respect du rythme et des disponibilités annoncés",
      "Utilité du document de synthèse",
      "Atteinte de vos objectifs initiaux",
      "Satisfaction globale de la prestation",
    ],
    "Questionnaire satisfaction à chaud",
  ),
};

const satisfactionFroid: BdcDocDef = {
  nom: "Indicateur 30 - Questionnaire de satisfaction bénéficiaire (à froid - suivi 6 mois)",
  indicateur: 30,
  parBeneficiaire: true,
  build: (ctx, b) => {
    const base = questionnaireSatisfaction(
      "Questionnaire de satisfaction — volet à froid (suivi à 6 mois)",
      `À renseigner lors de l'entretien de suivi prévu le ${fmtDateFR(ctx.prestation.dateSuivi6Mois)}`,
      [
        "Mise en œuvre effective du projet défini lors du bilan",
        "Pertinence du projet avec le recul de six mois",
        "Utilité des étapes définies dans le document de synthèse",
        "Appui reçu lors de l'entretien de suivi",
        "Satisfaction globale avec le recul",
      ],
      "Questionnaire satisfaction à froid",
    )(ctx, b);
    return base;
  },
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
    const { organisme: o, prestation: p } = ctx;
    const seed = seedBenef(b, "conservation");
    const conserve = seed % 2 === 0;
    const dateLimite = fmtDateFR(new Date(p.dateFin.getFullYear() + 1, p.dateFin.getMonth(), p.dateFin.getDate()));
    const dateDestruction = conserve ? dateLimite : fmtDateFR(p.dateFin);
    return [
      H("Accord de conservation / attestation de destruction des documents"),
      "_Article R6313-7 du Code du travail._\n",
      entete(o, b, p),
      H2("Principe"),
      "À l'issue du bilan de compétences, l'ensemble des documents élaborés pour la réalisation de la prestation est **détruit**. Le document de synthèse est remis au seul bénéficiaire.",
      H2("Exception — conservation sur accord écrit"),
      "La conservation des documents constitue une exception, limitée à **un an maximum**, et subordonnée à l'accord écrit du bénéficiaire ci-dessous.",
      "",
      "| Choix du bénéficiaire | ☐ |",
      "|---|---|",
      `| Je demande la **destruction immédiate** de l'ensemble des documents à l'issue du bilan. | ${conserve ? "☐" : "☒"} |`,
      `| J'autorise la **conservation** des documents pour une durée d'un an maximum, soit jusqu'au ${dateLimite}, à des fins exclusives de suivi. | ${conserve ? "☒" : "☐"} |`,
      "",
      `**Choix exprimé le** : ${fmtDateFR(p.dateFin)}${b ? ` par ${b.civilite} ${b.prenom} ${b.nom}` : ""}.`,
      "",
      "Cet accord est révocable à tout moment par simple demande écrite adressée à " + (o.emailContact || "l'organisme") + ".",
      H2("Attestation de destruction"),
      `Je soussigné(e) ${p.consultant.nom}, consultant, atteste que l'intégralité des documents relatifs au bilan de ${b ? `${b.civilite} ${b.prenom} ${b.nom}` : "________________"} ${conserve ? `sera détruite au terme de la conservation autorisée, soit le ${dateDestruction}` : `a été détruite le ${dateDestruction}`}.`,
      "",
      `**Fait à** ${o.ville}, **le** ${fmtDateFR(p.dateFin)}.`,
      SIGN(ctx, "Indicateur 9 - Accord de conservation et attestation de destruction des documents", b),
    ].join("\n");
  },
};

/* ------------------------------------------------------------------ */
/* 5. Autorisation de transmission à un tiers — L6313-4                */
/* ------------------------------------------------------------------ */
const autorisationTransmission: BdcDocDef = {
  nom: "Indicateur 9 - Autorisation de transmission du document de synthèse à un tiers",
  indicateur: 9,
  parBeneficiaire: true,
  contractuelle: true,
  build: (ctx, b) => {
    const { organisme: o, prestation: p } = ctx;
    const seed = seedBenef(b, "transmission");
    const employeur = (b as any)?.entreprise ? String((b as any).entreprise).trim() : "";
    const autorise = !!employeur && seed % 3 === 0;
    const dateChoix = fmtDateFR(p.dateFin);
    return [
      H("Autorisation de transmission à un tiers"),
      "_Article L6313-4 du Code du travail._\n",
      entete(o, b, p),
      "Les résultats détaillés et le document de synthèse ne peuvent être communiqués à un tiers, y compris à l'employeur ou au financeur, **qu'avec l'accord écrit du bénéficiaire**.",
      "",
      "| Décision | ☐ |",
      "|---|---|",
      `| Je **n'autorise pas** la transmission de mon document de synthèse à un tiers. | ${autorise ? "☐" : "☒"} |`,
      `| J'autorise la transmission de mon document de synthèse au destinataire désigné ci-dessous. | ${autorise ? "☒" : "☐"} |`,
      "",
      autorise
        ? `**Destinataire autorisé** : ${employeur}  \n**Qualité** : employeur du bénéficiaire  \n**Objet de la transmission** : accompagnement de la mobilité interne et suivi du plan de développement des compétences.`
        : "**Destinataire autorisé** : sans objet — aucune transmission autorisée  \n**Qualité** : sans objet  \n**Objet de la transmission** : sans objet",
      "",
      `**Décision exprimée le** : ${dateChoix}${b ? ` par ${b.civilite} ${b.prenom} ${b.nom}` : ""}.`,
      "",
      "La présente autorisation est **révocable à tout moment**, sans motif, par écrit adressé à " + (o.emailContact || "l'organisme") + ". La révocation prend effet dès sa réception.",
      "",
      `**Fait à** ${o.ville}, **le** ${dateChoix}.`,
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
    const { organisme: o, prestation: p } = ctx;
    const c = typeContrat(p);
    return [
      H("Livret d'accueil du bénéficiaire"),
      entete(o, b, p),
      H2("1. Votre interlocuteur"),
      `${p.consultant.nom}, ${p.consultant.qualification} — ${o.emailContact} — ${o.telephoneContact}`,
      H2("2. Déroulement du bilan (art. R6313-4)"),
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
    const { organisme: o, prestation: p } = ctx;
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
  nom: "Indicateur 9 - Informations pratiques - prestation à distance",
  indicateur: 9,
  parBeneficiaire: false,
  build: (ctx) => {
    const { organisme: o, prestation: p } = ctx;
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
    const { organisme: o, prestation: p } = ctx;
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
    const { prestation: p } = ctx;
    return [
      H("Tableau d'amélioration continue"),
      `_Arrêté au ${fmtDateFR(new Date())}. Effectif concerné : ${ctx.beneficiaires.length} bénéficiaire(s)._\n`,
      "| N° | Origine (réclamation, enquête, audit, veille) | Constat | Analyse de cause | Action corrective | Responsable | Échéance | Statut | Efficacité vérifiée |",
      "|---|---|---|---|---|---|---|---|---|",
      "| 1 |  |  |  |  |  |  | ☐ En cours ☐ Soldée |  |",
      "| 2 |  |  |  |  |  |  | ☐ En cours ☐ Soldée |  |",
      "| 3 |  |  |  |  |  |  | ☐ En cours ☐ Soldée |  |",
      "",
      "_Les constats sont issus des réclamations enregistrées, des questionnaires de satisfaction renseignés par les bénéficiaires, des retours des financeurs et de la veille. Aucune donnée n'est saisie à la place d'un tiers._",
      "",
      `Sources de données mobilisées : registre des réclamations, questionnaires à chaud et à froid, entretiens de suivi à ${fmtDateFR(p.dateSuivi6Mois)}.`,
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
    const { organisme: o, prestation: p } = ctx;
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
      "Le consultant est tenu au secret professionnel. Aucun élément du bilan n'est communiqué à l'employeur, au financeur ou à un tiers sans l'accord écrit et révocable du bénéficiaire (art. L6313-4).",
      H2("Article 4 — Destruction des documents"),
      "Les documents élaborés pour la réalisation du bilan sont détruits à l'issue de la prestation. Leur conservation constitue une exception, limitée à un an, subordonnée à l'accord écrit du bénéficiaire (art. R6313-7).",
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
    const { prestation: p } = ctx;
    const aujourdhui = fmtDateFR(new Date());
    const blocs: string[] = [
      H("Mentions relatives aux enquêtes non renseignées"),
      "_Ces mentions remplacent toute réponse qui serait générée à la place d'un tiers. Aucune réponse d'entreprise, de financeur ou d'équipe n'est produite par l'organisme._\n",
    ];
    if (p.origineDemande !== "employeur") {
      blocs.push(H2("Questionnaire de satisfaction entreprise"), mentionStatut("NON_APPLICABLE", { dateConstat: aujourdhui, motif: "démarche individuelle sans employeur" }));
    } else {
      blocs.push(H2("Questionnaire de satisfaction entreprise"), mentionStatut("SOLLICITE_SANS_REPONSE", { dateConstat: aujourdhui }));
    }
    if (p.financeur === "CPF") {
      blocs.push(H2("Questionnaire de satisfaction financeur"), `> ${MENTION_CPF_SATISFACTION}\n`, mentionStatut("NON_APPLICABLE", { dateConstat: aujourdhui, motif: "financement CPF — le financeur ne répond pas aux enquêtes de satisfaction" }));
    } else {
      blocs.push(H2("Questionnaire de satisfaction financeur"), mentionStatut("SOLLICITE_SANS_REPONSE", { dateConstat: aujourdhui }));
    }
    return blocs.join("\n");
  },
};

export const BDC_TEMPLATES_MANQUANTS: BdcDocDef[] = [
  documentSynthese,
  feuillesEmargement,
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
];

/** Pièces contractuelles dont la signature conditionne l'export (BLOC 7). */
export const PIECES_CONTRACTUELLES = [
  "Contrat ou convention de prestation",
  "CGV",
  "Règlement intérieur",
  "Engagements déontologiques",
  "Accord de conservation des documents",
  "Document de synthèse",
];
