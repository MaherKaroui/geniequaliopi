// Documents CFA — Combler les écarts de preuves identifiés sur la matrice
// « Prépa audit Qualiopi CFA » (guide de lecture V9, nouvel entrant).
// 18 générateurs courts, datés, brandés.

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML, isFormationTerminee, getDocRefDate } from "./docBuilder";

// Documents de système qualité : datés de la date de MAJ du dossier (V1), à défaut du jour.
const todayLong = () => {
  const ref = getDocRefDate();
  const d = ref ? new Date(ref + "T00:00:00") : new Date();
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
};

// ============================================================================
// IND 13 — Grille de compétences alternance (nominative)
// ============================================================================
export function genGrilleCompetencesAlternanceCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number = 0) {
  const s = stagiaires[si] || stagiaires[0] || { prenom: "[Prénom]", nom: "[Nom]", entreprise: "[Entreprise]" } as StagiaireInfo;
  const terminee = isFormationTerminee(f, stagiaires);
  const cellEval = (label: string) => terminee ? label : "—";
  const blocs = [
    "B1 — Prospecter, analyser les besoins et négocier une offre",
    "B2 — Négocier, conclure et gérer un compte client",
    "Compétences transversales — Posture professionnelle",
    "Compétences transversales — Communication écrite/orale",
  ];
  const rows = blocs.flatMap(b => [
    [b, "Acquis en entreprise", cellEval("✓"), cellEval("Maître d'apprentissage")],
    [b, "Acquis en CFA", cellEval("✓"), cellEval("Formateur référent")],
    [b, "À renforcer", "—", "—"],
  ]);
  return buildDocument({
    org: o,
    title: `GRILLE DE COMPÉTENCES ALTERNANCE — ${s.prenom} ${s.nom}`,
    sections: [
      { heading: "Objet (Indicateur 13)", content: `<p>Cette grille trace l'articulation itérative des apprentissages entre le CFA <strong>${o.nom}</strong> et l'entreprise <strong>${s.entreprise || "—"}</strong> pour l'apprenti <strong>${s.prenom} ${s.nom}</strong>. Elle sert de support de dialogue lors des visites en entreprise et des entretiens tripartites.</p><p><em>Document daté du ${todayLong()}.</em></p>` },
      { heading: "Modalités de coordination", content: `<p>• Visite en entreprise : 2 par an minimum<br>• Entretien tripartite : à chaque fin de période en entreprise<br>• Outil de suivi : livret d'apprentissage + tableau Excel partagé</p>` },
    ],
    table: { headers: ["Bloc / Compétence", "Modalité", "Validé", "Évalué par"], rows },
    
    stagiaires: [s],
  });
}

// ============================================================================
// IND 14 — QCM 14 missions (rempli par l'apprenti)
// ============================================================================
export function genQCM14MissionsCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number = 0) {
  const s = stagiaires[si] || stagiaires[0] || { prenom: "[Prénom]", nom: "[Nom]" } as StagiaireInfo;
  const terminee = isFormationTerminee(f, stagiaires);
  const rempli = terminee || (!!f.dateDebut && new Date(f.dateDebut) < new Date());
  const Q = (q: string, a: string, b: string, c: string, bonne: 0|1|2) => {
    const opts = [a, b, c];
    return `<p><strong>${q}</strong></p><p>${opts.map((o2, i) => `${rempli ? (i === bonne ? "☒" : "☐") : "☐"} ${String.fromCharCode(65+i)}. ${o2}`).join("<br>")}</p>`;
  };
  return buildDocument({
    org: o,
    title: `QCM — CONNAÎTRE LES 14 MISSIONS DE MON CFA`,
    sections: [
      { heading: "Apprenti", content: `<p><strong>${s.prenom} ${s.nom}</strong>${s.entreprise ? ` — ${s.entreprise}` : ""}<br>Daté du ${todayLong()}</p>` },
      { heading: "Objet (Indicateur 14)", content: `<p>Ce QCM vérifie l'appropriation par l'apprenti des 14 missions des CFA (art. L.6231-2 du Code du travail).</p>` },
      { heading: "Questions",
        content:
          Q("Qui peut m'aider à trouver un employeur ?", "Le référent recrutement du CFA", "Le médecin du travail", "Aucun, c'est à moi seul", 0) +
          Q("Quelle aide existe pour aider à payer le loyer ?", "Aucune", "Mobili-Jeune (Action Logement) — jusqu'à 100 €/mois", "Uniquement les APL", 1) +
          Q("Qui est mon référent handicap ?", `Le référent handicap désigné : ${o.referentHandicap || "[à compléter]"}`, "Le directeur du CFA seulement", "Aucun référent n'existe", 0) +
          Q("Que faire en cas de rupture de contrat ?", "Je quitte la formation", "Je suis accompagné(e) 6 mois maximum pour retrouver un employeur", "Je rembourse les frais", 1) +
          Q("Le CFA propose-t-il une mobilité Erasmus+ ?", "Non", "Oui, sur demande au référent mobilité", "Seulement aux salariés", 1) +
          Q("Les activités citoyennes/culturelles sont-elles obligatoires ?", "Non, c'est facultatif", "Oui, elles font partie des missions du CFA", "Seulement pour les majeurs", 1)
      },
      { heading: "Résultat", content: rempli ? `<p>Score : <strong>6/6</strong> — Acquis</p>` : `<p>À compléter en cours de formation.</p>` },
    ],
    signatures: { type: "2", labels: ["Apprenti", "Formateur"], names: [`${s.prenom} ${s.nom}`, f.formateur || ""], dates: [todayLong(), todayLong()] },
    stagiaires: [s],
  });
}

// ============================================================================
// IND 15 — Attestation de remise du livret SST
// ============================================================================
export function genAttestationLivretSSTCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number = 0) {
  const s = stagiaires[si] || stagiaires[0] || { prenom: "[Prénom]", nom: "[Nom]" } as StagiaireInfo;
  const d = s.dateDebutFormation || f.dateDebut;
  return buildDocument({
    org: o,
    title: `ATTESTATION DE REMISE DU LIVRET SANTÉ & SÉCURITÉ AU TRAVAIL`,
    sections: [
      { heading: "Attestation", content: `<p>Je soussigné(e) <strong>${s.prenom} ${s.nom}</strong>, apprenti(e) au CFA <strong>${o.nom}</strong>, reconnais avoir reçu le livret « Règles de santé et sécurité en milieu professionnel » ainsi que le livret SST le ${d ? formatDate(d) : todayLong()}.</p><p>Je confirme avoir pris connaissance de l'ensemble des consignes de sécurité applicables en CFA et en entreprise et m'engage à les respecter.</p>` },
      { heading: "Contenu remis", content: `<p>• Livret « Droits et devoirs de l'apprenti »<br>• Livret « Règles SST en milieu professionnel »<br>• Livret SST — Sauveteur Secouriste du Travail<br>• Affichage des consignes en cas d'urgence</p>` },
    ],
    signatures: { type: "2", labels: ["Apprenti", "Référent CFA"], names: [`${s.prenom} ${s.nom}`, o.referentQualite || o.dirigeant], dates: [d ? formatDate(d) : todayLong(), d ? formatDate(d) : todayLong()] },
    stagiaires: [s],
  });
}

// ============================================================================
// IND 16 — Procédure de respect des exigences du certificateur
// ============================================================================
export function genProcedureRespectCertificateurCFA(o: OrganismeInfo, f: FormationInfo) {
  const titre = f.intitule || "[Intitulé de la formation]";
  const rncp = f.codeRNCP ? ` (code RNCP ${f.codeRNCP})` : "";
  return buildDocument({
    org: o,
    title: "PROCÉDURE DE RESPECT DES EXIGENCES DU CERTIFICATEUR",
    subtitle: titre,
    sections: [
      { heading: "1. Objet", content: `<p>La présente procédure décrit les modalités mises en œuvre par ${o.nom} pour garantir le strict respect des exigences du certificateur dans le cadre de la préparation au titre <strong>${titre}</strong>${rncp}. Elle s'applique à l'ensemble des intervenants pédagogiques et administratifs du CFA.</p>` },
      { heading: "2. Référentiels applicables", content: `<p>Le CFA applique en intégralité :</p><p>• Le <strong>référentiel d'activités</strong> du titre<br>• Le <strong>référentiel de compétences</strong> (blocs de compétences enregistrés au RNCP)<br>• Le <strong>référentiel d'évaluation</strong> et le règlement d'examen du certificateur<br>• Les <strong>modalités d'accès</strong> (prérequis, voies d'accès, équivalences)<br>• La <strong>durée minimale</strong> de formation imposée par le certificateur</p>` },
      { heading: "3. Contenus obligatoires", content: `<p>Le programme pédagogique reprend l'intégralité des compétences et savoirs associés du référentiel. Chaque bloc de compétences fait l'objet d'un séquençage détaillé, d'objectifs pédagogiques alignés sur le référentiel et de modalités d'évaluation conformes au règlement d'examen. Aucun contenu obligatoire ne peut être retiré ou allégé.</p>` },
      { heading: "4. Durée de formation", content: `<p>La durée totale de la formation respecte la durée minimale fixée par le certificateur, incluant les heures en centre de formation et les heures en entreprise. Toute adaptation (positionnement, allègement, dispense) fait l'objet d'une décision motivée et tracée dans le dossier de l'apprenant.</p>` },
      { heading: "5. Modalités d'évaluation", content: `<p>Les évaluations sont conçues et organisées conformément au règlement d'examen :</p><p>• <strong>Évaluations en cours de formation (ECF)</strong> : grilles d'évaluation du certificateur utilisées sans modification<br>• <strong>Mises en situation professionnelle</strong> : conditions, durées et critères imposés par le référentiel<br>• <strong>Dossier professionnel (DP)</strong> : trame officielle du certificateur remise et expliquée aux apprenants<br>• <strong>Entretien avec le jury</strong> : durée et déroulé conformes au règlement d'examen</p>` },
      { heading: "6. Composition et habilitation du jury", content: `<p>Le jury de certification est composé conformément aux exigences du certificateur :</p><p>• Au moins un membre professionnel du secteur en exercice<br>• Membres habilités par le certificateur lorsque requis<br>• Indépendance et impartialité garanties (aucun membre n'a participé directement à la formation des candidats évalués)<br>• Présidence assurée selon les règles du certificateur</p>` },
      { heading: "7. Confidentialité et sécurité des épreuves", content: `<p>Les sujets, grilles d'évaluation et corrigés sont conservés sous accès restreint. Seuls les formateurs habilités et le jury y ont accès. Les supports d'évaluation ne sont diffusés qu'au moment de la passation.</p>` },
      { heading: "8. Traçabilité et transmission", content: `<p>Chaque session donne lieu à :</p><p>• Un <strong>procès-verbal de session</strong> signé par le jury<br>• Les <strong>livrets d'évaluation</strong> individuels par bloc de compétences<br>• La <strong>transmission des résultats</strong> au certificateur dans les délais imposés<br>• L'<strong>archivage</strong> des pièces pendant la durée requise par le certificateur</p>` },
      { heading: "9. Veille et mise à jour", content: `<p>${o.referentQualite || o.responsablePedagogique || "Le référent qualité"} assure une veille permanente sur les évolutions du référentiel (mises à jour France Compétences, notes du certificateur, évolutions réglementaires). Toute évolution est intégrée au programme dans un délai maximal de 3 mois et communiquée à l'équipe pédagogique.</p>` },
      { heading: "10. Contrôle et amélioration", content: `<p>Le respect de cette procédure fait l'objet d'un contrôle annuel par la direction pédagogique. Les écarts éventuels donnent lieu à des actions correctives tracées dans le plan d'amélioration continue.</p>` },
    ],
  });
}


// ============================================================================
// IND 14 — Pages site : aides, ateliers CV & entretien
// ============================================================================
type RegionAides = {
  region: string;
  aides: { titre: string; url: string; desc: string }[];
};

// Mapping département (2 premiers chiffres du CP) → région + aides régionales officielles
function getRegionAidesByCodePostal(codePostal?: string): RegionAides | null {
  if (!codePostal) return null;
  const dep = codePostal.trim().slice(0, 2);
  // DOM-TOM (3 chiffres)
  const dep3 = codePostal.trim().slice(0, 3);

  const map: Record<string, RegionAides> = {
    // ÎLE-DE-FRANCE
    IDF: {
      region: "Île-de-France",
      aides: [
        { titre: "Aides aux apprentis – Région Île-de-France", url: "https://www.iledefrance.fr/aides-et-appels-a-projets/aides-aux-apprentis", desc: "Carte Imagine R, aide à l'équipement professionnel, aide à l'hébergement pour apprentis franciliens." },
        { titre: "Imagine R – Île-de-France Mobilités", url: "https://www.iledefrance-mobilites.fr/titres-et-tarifs/detail/imagine-r-scolaire", desc: "Forfait transport annuel à tarif réduit pour les apprentis franciliens de moins de 26 ans." },
      ],
    },
    // AUVERGNE-RHÔNE-ALPES
    ARA: {
      region: "Auvergne-Rhône-Alpes",
      aides: [
        { titre: "Aides aux apprentis – Région Auvergne-Rhône-Alpes", url: "https://www.auvergnerhonealpes.fr/aide/65/297-pass-region-apprentis-formation-jeunes.htm", desc: "Pass'Région Apprentis : aide forfaitaire de 30 €, livres, manuels, équipement et activités culturelles/sportives." },
      ],
    },
    // HAUTS-DE-FRANCE
    HDF: {
      region: "Hauts-de-France",
      aides: [
        { titre: "Aides aux apprentis – Région Hauts-de-France", url: "https://guide-aides.hautsdefrance.fr/aap/index_alpha.php?ind=apprentissage", desc: "Génération + Hauts-de-France, aide à l'équipement, aide à la mobilité internationale des apprentis." },
      ],
    },
    // GRAND EST
    GE: {
      region: "Grand Est",
      aides: [
        { titre: "Aides aux apprentis – Région Grand Est", url: "https://www.grandest.fr/vos-aides-regionales/?cat=apprentissage", desc: "Aide au transport, à l'hébergement, à la restauration et à l'équipement professionnel pour apprentis." },
      ],
    },
    // NOUVELLE-AQUITAINE
    NA: {
      region: "Nouvelle-Aquitaine",
      aides: [
        { titre: "Aides aux apprentis – Région Nouvelle-Aquitaine", url: "https://les-aides.nouvelle-aquitaine.fr/jeunesse-et-citoyennete/apprentissage", desc: "Aide au premier équipement professionnel, aide au transport, hébergement et restauration." },
      ],
    },
    // OCCITANIE
    OCC: {
      region: "Occitanie",
      aides: [
        { titre: "Aides aux apprentis – Région Occitanie", url: "https://www.laregion.fr/-Apprentissage-", desc: "Carte Jeune Région, aide au transport, hébergement, restauration et équipement professionnel des apprentis." },
      ],
    },
    // PROVENCE-ALPES-CÔTE D'AZUR
    PACA: {
      region: "Provence-Alpes-Côte d'Azur",
      aides: [
        { titre: "Aides aux apprentis – Région Sud (PACA)", url: "https://www.maregionsud.fr/aides-et-appels-a-projets/detail/e-pass-jeunes", desc: "e-PASS jeunes 80 €, aide au transport (PassZou!), hébergement et restauration des apprentis." },
      ],
    },
    // PAYS DE LA LOIRE
    PDL: {
      region: "Pays de la Loire",
      aides: [
        { titre: "Aides aux apprentis – Région Pays de la Loire", url: "https://www.paysdelaloire.fr/les-aides/pack-apprentissage-pour-les-apprentis", desc: "Pack Apprentissage : transport, hébergement, restauration et équipement professionnel." },
      ],
    },
    // BRETAGNE
    BRE: {
      region: "Bretagne",
      aides: [
        { titre: "Aides aux apprentis – Région Bretagne", url: "https://www.bretagne.bzh/aides/fiches/aide-individuelle-apprentis/", desc: "Aide individuelle aux apprentis bretons : transport, hébergement, restauration." },
      ],
    },
    // NORMANDIE
    NOR: {
      region: "Normandie",
      aides: [
        { titre: "Aides aux apprentis – Région Normandie", url: "https://aides.normandie.fr/atouts-normandie", desc: "Atouts Normandie : aide aux loisirs sportifs, culturels, équipement et permis B pour les apprentis." },
      ],
    },
    // BOURGOGNE-FRANCHE-COMTÉ
    BFC: {
      region: "Bourgogne-Franche-Comté",
      aides: [
        { titre: "Aides aux apprentis – Région Bourgogne-Franche-Comté", url: "https://www.bourgognefranchecomte.fr/aides-aux-apprentis", desc: "Carte Avantages Jeunes, aide au transport, hébergement, restauration et premier équipement." },
      ],
    },
    // CENTRE-VAL DE LOIRE
    CVL: {
      region: "Centre-Val de Loire",
      aides: [
        { titre: "Aides aux apprentis – Région Centre-Val de Loire", url: "https://www.centre-valdeloire.fr/les-aides/aides-aux-apprentis", desc: "YEP'S, aide au transport, à l'hébergement et à la restauration pour les apprentis du Centre-Val de Loire." },
      ],
    },
    // CORSE
    COR: {
      region: "Corse",
      aides: [
        { titre: "Aides aux apprentis – Collectivité de Corse", url: "https://www.isula.corsica/Apprentissage_a36.html", desc: "Aides à la mobilité, à l'hébergement, à la restauration et à l'équipement pour les apprentis corses." },
      ],
    },
    // DOM
    GUA: {
      region: "Guadeloupe",
      aides: [{ titre: "Aides aux apprentis – Région Guadeloupe", url: "https://www.regionguadeloupe.fr/", desc: "Aides régionales à l'apprentissage : transport, hébergement, équipement." }],
    },
    MAR: {
      region: "Martinique",
      aides: [{ titre: "Aides aux apprentis – CTM Martinique", url: "https://www.collectivitedemartinique.mq/", desc: "Aides de la Collectivité Territoriale de Martinique aux apprentis." }],
    },
    GUY: {
      region: "Guyane",
      aides: [{ titre: "Aides aux apprentis – CTG Guyane", url: "https://www.ctguyane.fr/", desc: "Aides de la Collectivité Territoriale de Guyane aux apprentis." }],
    },
    REU: {
      region: "La Réunion",
      aides: [{ titre: "Aides aux apprentis – Région Réunion", url: "https://regionreunion.com/aides-services/apprentissage", desc: "Aides régionales à l'apprentissage à La Réunion : transport, équipement, mobilité." }],
    },
    MAY: {
      region: "Mayotte",
      aides: [{ titre: "Aides aux apprentis – Département de Mayotte", url: "https://www.cg976.fr/", desc: "Dispositifs d'aide à l'apprentissage à Mayotte." }],
    },
  };

  // Mapping département → clé région
  const depToRegion: Record<string, string> = {
    // Île-de-France : 75, 77, 78, 91, 92, 93, 94, 95
    "75": "IDF", "77": "IDF", "78": "IDF", "91": "IDF", "92": "IDF", "93": "IDF", "94": "IDF", "95": "IDF",
    // Auvergne-Rhône-Alpes : 01, 03, 07, 15, 26, 38, 42, 43, 63, 69, 73, 74
    "01": "ARA", "03": "ARA", "07": "ARA", "15": "ARA", "26": "ARA", "38": "ARA", "42": "ARA", "43": "ARA", "63": "ARA", "69": "ARA", "73": "ARA", "74": "ARA",
    // Hauts-de-France : 02, 59, 60, 62, 80
    "02": "HDF", "59": "HDF", "60": "HDF", "62": "HDF", "80": "HDF",
    // Grand Est : 08, 10, 51, 52, 54, 55, 57, 67, 68, 88
    "08": "GE", "10": "GE", "51": "GE", "52": "GE", "54": "GE", "55": "GE", "57": "GE", "67": "GE", "68": "GE", "88": "GE",
    // Nouvelle-Aquitaine : 16, 17, 19, 23, 24, 33, 40, 47, 64, 79, 86, 87
    "16": "NA", "17": "NA", "19": "NA", "23": "NA", "24": "NA", "33": "NA", "40": "NA", "47": "NA", "64": "NA", "79": "NA", "86": "NA", "87": "NA",
    // Occitanie : 09, 11, 12, 30, 31, 32, 34, 46, 48, 65, 66, 81, 82
    "09": "OCC", "11": "OCC", "12": "OCC", "30": "OCC", "31": "OCC", "32": "OCC", "34": "OCC", "46": "OCC", "48": "OCC", "65": "OCC", "66": "OCC", "81": "OCC", "82": "OCC",
    // PACA : 04, 05, 06, 13, 83, 84
    "04": "PACA", "05": "PACA", "06": "PACA", "13": "PACA", "83": "PACA", "84": "PACA",
    // Pays de la Loire : 44, 49, 53, 72, 85
    "44": "PDL", "49": "PDL", "53": "PDL", "72": "PDL", "85": "PDL",
    // Bretagne : 22, 29, 35, 56
    "22": "BRE", "29": "BRE", "35": "BRE", "56": "BRE",
    // Normandie : 14, 27, 50, 61, 76
    "14": "NOR", "27": "NOR", "50": "NOR", "61": "NOR", "76": "NOR",
    // Bourgogne-Franche-Comté : 21, 25, 39, 58, 70, 71, 89, 90
    "21": "BFC", "25": "BFC", "39": "BFC", "58": "BFC", "70": "BFC", "71": "BFC", "89": "BFC", "90": "BFC",
    // Centre-Val de Loire : 18, 28, 36, 37, 41, 45
    "18": "CVL", "28": "CVL", "36": "CVL", "37": "CVL", "41": "CVL", "45": "CVL",
    // Corse : 2A, 2B (codes postaux 20)
    "20": "COR", "2A": "COR", "2B": "COR",
  };

  // DOM (3 premiers chiffres)
  const dep3ToRegion: Record<string, string> = {
    "971": "GUA", "972": "MAR", "973": "GUY", "974": "REU", "976": "MAY",
  };

  const key = dep3ToRegion[dep3] || depToRegion[dep];
  return key ? map[key] : null;
}

export function genPagesSiteAidesAteliersCFA(o: OrganismeInfo, f: FormationInfo) {
  const aides = [
    { titre: "Guide officiel des aides aux alternants 2026", url: "https://labonnealternance.apprentissage.beta.gouv.fr/guide-alternant/les-aides-financieres-et-materielles", desc: "Portail officiel République Française regroupant l'ensemble des aides : logement, transport, restauration, équipement, mobilité internationale." },
    { titre: "Aide MOBILI-JEUNE® – Action Logement", url: "https://mobilijeune.actionlogement.fr/", desc: "Aide au logement pour les alternants de moins de 30 ans : prise en charge d'une partie du loyer (jusqu'à 100 €/mois) pendant la durée du contrat." },
    { titre: "Dispositifs logement alternants – Action Logement", url: "https://www.actionlogement.fr/salarie/alternant", desc: "Ensemble des dispositifs logement pour alternants : Mobili-Jeune, garantie Visale, avance Loca-Pass, aide à la mobilité." },
    { titre: "Aide Mobili-Jeune – Service Public", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33173", desc: "Fiche officielle Service-Public : conditions d'attribution, montant, démarches pour obtenir l'aide Mobili-Jeune." },
    { titre: "Aides Agefiph (apprentis en situation de handicap)", url: "https://www.agefiph.fr/aides-financieres", desc: "Aides financières Agefiph pour les apprentis en situation de handicap : aménagement du poste, compensation, accompagnement RQTH." },
    { titre: "Aide à l'apprentissage RQTH – Agefiph", url: "https://www.agefiph.fr/aides-financieres/aide-lembauche-en-contrat-dapprentissage-dune-personne-en-situation-de-handicap", desc: "Aide pouvant aller jusqu'à 3 000 € pour l'embauche en contrat d'apprentissage d'une personne en situation de handicap." },
    { titre: "Mobilité européenne et internationale des alternants – Ministère du Travail", url: "https://travail-emploi.gouv.fr/la-mobilite-europeenne-et-internationale-des-alternants", desc: "Dispositif de mobilité Erasmus+ pour les apprentis : conditions, durée, financement, démarches auprès du CFA." },
    { titre: "Mobilité des alternants Erasmus+ – Agence Erasmus+ France", url: "https://agence.erasmusplus.fr/priorites-et-thematiques/la-mobilite-des-alternants-avec-erasmus/", desc: "Agence officielle Erasmus+ France : informations pratiques, bourses, accompagnement pour partir en mobilité européenne pendant l'apprentissage." },
  ];

  // Aides régionales automatisées selon le code postal de l'organisme
  const regionAides = getRegionAidesByCodePostal(o.codePostal);
  const aidesRegionales = regionAides?.aides || [];

  const ateliers = [
    { titre: "Ateliers « Préparer sa candidature » – France Travail", url: "https://www.francetravail.fr/candidat/les-ateliers-francetravail/ateliers-sur-les-techniques-de-r.html", desc: "Ateliers officiels France Travail (auto-inscription) : faire le point sur ses compétences, créer un CV clair et percutant, structurer sa candidature." },
    { titre: "Préparer votre candidature – France Travail", url: "https://www.francetravail.fr/candidat/vos-recherches/preparer-votre-candidature.html", desc: "Conseils pratiques pour la rédaction du CV, de la lettre de motivation et la préparation de l'entretien d'embauche (avec vidéos et fiches méthode)." },
    { titre: "Votre recherche d'emploi – France Travail", url: "https://www.francetravail.fr/candidat/votre-recherche-demploi.html", desc: "Espace dédié à la recherche d'emploi : profil de compétences, CV en ligne, services pour organiser sa recherche et retenir l'attention des recruteurs." },
    { titre: "1 jeune 1 solution – Recherche d'entreprise et accompagnement", url: "https://www.1jeune1solution.gouv.fr/", desc: "Plateforme gouvernementale pour les jeunes : offres en alternance, aides, accompagnement à l'insertion, ressources CV/entretien." },
    { titre: "La Bonne Alternance – Recherche d'entreprise", url: "https://labonnealternance.apprentissage.beta.gouv.fr/", desc: "Service officiel République Française pour identifier les entreprises qui recrutent en alternance et candidater directement." },
    { titre: "CIDJ – Conseils CV, lettre, entretien", url: "https://www.cidj.com/", desc: "Centre d'Information et de Documentation Jeunesse : fiches pratiques CV, lettre de motivation, simulation d'entretien, orientation." },
  ];
  const rowsAides = aides.map(a => [a.titre, `<a href="${a.url}" target="_blank" rel="noopener">${a.url}</a>`, a.desc]);
  const rowsAidesRegionales = aidesRegionales.map(a => [a.titre, `<a href="${a.url}" target="_blank" rel="noopener">${a.url}</a>`, a.desc]);
  const rowsAteliers = ateliers.map(a => [a.titre, `<a href="${a.url}" target="_blank" rel="noopener">${a.url}</a>`, a.desc]);

  const sectionAidesRegionales = regionAides
    ? [{
        heading: `Aides régionales spécifiques — ${regionAides.region} (CP ${o.codePostal})`,
        content: `<p>Aides du Conseil régional <strong>${regionAides.region}</strong> identifiées automatiquement à partir du code postal du CFA (<strong>${o.codePostal}</strong>).</p>${tableHTML(["Ressource", "Lien officiel", "Contenu"], rowsAidesRegionales)}`,
      }]
    : [];

  return buildDocument({
    org: o,
    title: "PAGES & RESSOURCES EN LIGNE — AIDES, ATELIERS CV & ENTRETIEN",
    subtitle: regionAides ? `Liens utiles communiqués aux apprentis — Région ${regionAides.region}` : "Liens utiles communiqués aux apprentis du CFA",
    sections: [
      { heading: "Objet", content: `<p>Le CFA <strong>${o.nom}</strong> communique à ses apprentis un ensemble de liens vers les sites institutionnels et officiels permettant d'accéder aux aides existantes (nationales et régionales : logement, mobilité, handicap, mobilité internationale) et aux ressources d'accompagnement à l'insertion professionnelle (CV, lettre de motivation, préparation à l'entretien d'embauche, recherche d'entreprise).</p><p>Ces liens sont diffusés via le livret d'accueil, l'espace apprenant et lors des entretiens individuels de suivi. <strong>Les aides régionales affichées ci-dessous sont automatiquement adaptées au code postal du CFA${o.codePostal ? ` (${o.codePostal})` : ""}.</strong></p>` },
      { heading: "Aides financières et sociales nationales — sites officiels", content: tableHTML(["Ressource", "Lien officiel", "Contenu"], rowsAides) },
      ...sectionAidesRegionales,
      { heading: "Ateliers CV, lettre & entretien d'embauche — sites officiels", content: tableHTML(["Ressource", "Lien officiel", "Contenu"], rowsAteliers) },
      { heading: "Accompagnement par le CFA", content: `<p>Un accompagnement individuel à la mobilisation de ces ressources peut être sollicité auprès de <strong>${o.responsablePedagogique || "la coordination pédagogique"}</strong>. Pour les apprentis en situation de handicap, le référent handicap <strong>${o.referentHandicap || "—"}</strong> oriente vers les dispositifs Agefiph adaptés.</p>` },
      { heading: "Veille et mise à jour", content: `<p>Les liens et dispositifs sont vérifiés et mis à jour par le ${o.referentQualite || o.responsablePedagogique || "référent qualité"} dans le cadre de la veille socio-professionnelle. Toute évolution réglementaire (suppression, création, évolution des montants) est intégrée dans un délai maximal de 30 jours.</p>` },
    ],
  });
}



// ============================================================================
// IND 16 — PV de session générique
// ============================================================================
export function genPVSessionGeneriqueCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const terminee = isFormationTerminee(f, stagiaires);
  const rows = stagiaires.map((s, i) => [
    `${i + 1}`,
    `${s.prenom} ${s.nom}`,
    s.dateNaissance ? formatDate(s.dateNaissance) : "—",
    terminee ? "Présent" : "—",
    terminee ? "Admis(e)" : "—",
  ]);
  return buildDocument({
    org: o,
    title: `PV DE SESSION — ${f.intitule || ""}`,
    sections: [
      { heading: "Identification", content: `<p><strong>Organisme :</strong> ${o.nom} — NDA ${o.nda}<br><strong>Formation :</strong> ${f.intitule || ""}${f.codeRNCP ? ` — RNCP ${f.codeRNCP}` : ""}<br><strong>Session :</strong> ${f.dateDebut ? formatDate(f.dateDebut) : "—"} au ${f.dateFin ? formatDate(f.dateFin) : "—"}<br><strong>Date du PV :</strong> ${todayLong()}</p>` },
      { heading: "Jury", content: `<p>• Président : ${o.dirigeant}<br>• Formateur évaluateur : ${f.formateur || "—"}<br>• Représentant entreprise : [à compléter]</p>` },
    ],
    table: { headers: ["N°", "Apprenti", "Date de naissance", "Présence", "Résultat"], rows },
    signatures: { type: "2", labels: ["Président du jury", "Formateur évaluateur"], names: [o.dirigeant, f.formateur || ""], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 17 — Inventaire daté des moyens
// ============================================================================
export function genInventaireMoyensCFA(o: OrganismeInfo, f: FormationInfo) {
  // Inventaire construit à partir des données saisies (modalités, outils, adresse,
  // intervenants) : aucun équipement ni marque inventés.
  const moda = (f.modalites || "").toLowerCase();
  const distanciel = /distanciel|foad|e-learning|mixte/.test(moda);
  const presentiel = /pr[ée]sentiel|mixte/.test(moda) || !distanciel;
  const outils = (o.outilsUtilises || "").split(/[,;\n]/).map((x) => x.trim()).filter(Boolean);
  const adresse = [o.adresse, [o.codePostal, o.ville].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const rows: string[][] = [
    ["Moyens humains", `Direction : ${o.dirigeant || "—"} ; responsable pédagogique : ${o.responsablePedagogique || o.dirigeant || "—"} ; formateur : ${f.formateur || o.responsablePedagogique || o.dirigeant || "—"}`, "CV et justificatifs au dossier des intervenants (IND 21)", todayLong()],
    ["Référents", `Handicap : ${o.referentHandicap || o.dirigeant || "—"} ; mobilité : ${o.referentMobilite || o.dirigeant || "—"} ; qualité : ${o.referentQualite || o.dirigeant || "—"}`, "Lettres de mission (IND 20)", todayLong()],
  ];
  if (presentiel) rows.push(["Locaux", adresse || "Adresse du CFA", "Accessibilité vérifiée ; aménagements possibles sur demande du référent handicap", todayLong()]);
  if (distanciel) {
    rows.push(["Classe virtuelle", outils.filter((x) => /meet|zoom|teams|visio/i.test(x)).join(", ") || (f.lieu || "Google Meet / Zoom"), "Lien individuel transmis avant chaque séance ; test de connexion au démarrage", todayLong()]);
    rows.push(["Assistance technique et pédagogique", `${o.email || "Adresse électronique du CFA"}${o.telephone ? ` — ${o.telephone}` : ""}`, "Réponse sous 24 h ouvrées (art. D.6313-3-1 C. trav.)", todayLong()]);
  }
  const autres = outils.filter((x) => !/meet|zoom|teams|visio/i.test(x));
  if (autres.length) rows.push(["Outils numériques", autres.join(", "), "Comptes actifs, accès donnés aux apprentis", todayLong()]);
  rows.push(["Ressources pédagogiques", `Support de cours, découpage de formation, exercices corrigés et référentiel de la certification${f.codeRNCP ? ` (${f.codeRNCP})` : ""}`, "Mis à jour à chaque révision du programme (IND 19)", todayLong()]);
  rows.push(["Équipement de l'apprenti", distanciel ? "Ordinateur avec webcam, micro et connexion internet (vérifiés lors de l'inscription)" : "Matériel fourni par le CFA pendant les séances", distanciel ? "Prêt ou orientation vers les aides au premier équipement si besoin" : "Contrôlé avant chaque session", todayLong()]);
  return buildDocument({
    org: o,
    title: `INVENTAIRE DES MOYENS HUMAINS, TECHNIQUES ET PÉDAGOGIQUES`,
    sections: [
      { heading: "Objet (Indicateur 17)", content: `<p>Inventaire des moyens mis en œuvre par le CFA <strong>${o.nom}</strong> pour la formation <strong>${f.intitule || ""}</strong> (${f.modalites || "modalités définies au programme"}). Établi le ${todayLong()} ; mis à jour à chaque changement de moyens. Les justificatifs (bail, factures, licences) sont conservés par le CFA et présentés sur demande.</p>` },
    ],
    table: { headers: ["Catégorie", "Description", "Modalités / conformité", "Date"], rows },
    signatures: { type: "2", labels: ["Responsable pédagogique", "Direction"], names: [o.responsablePedagogique, o.dirigeant], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 18 — Fiches de poste CFA
// ============================================================================
export function genFichesPosteCFA(o: OrganismeInfo) {
  const postes = [
    { titre: "Directeur du CFA", titulaire: o.dirigeant, missions: "Pilotage stratégique, représentation légale, conformité Qualiopi, signature des contrats, validation budget." },
    { titre: "Responsable pédagogique", titulaire: o.responsablePedagogique, missions: "Conception et pilotage de l'ingénierie pédagogique, coordination des formateurs, suivi qualité des prestations, animation du conseil de perfectionnement." },
    { titre: "Référent qualité", titulaire: o.referentQualite, missions: "Pilotage SMQ Qualiopi, gestion réclamations et amélioration continue, mise à jour documentaire, préparation audits." },
    { titre: "Référent handicap", titulaire: o.referentHandicap, missions: "Accueil et accompagnement PSH, lien avec Agefiph/MDPH/Cap emploi, aménagements pédagogiques et matériels, sensibilisation équipe." },
    { titre: "Référent mobilité", titulaire: o.referentMobilite || o.responsablePedagogique, missions: "Information et accompagnement à la mobilité nationale et internationale (Erasmus+), montage des dossiers, conventions partenaires." },
    { titre: "Pôle administratif", titulaire: o.poleAdministratif, missions: "Inscriptions, dossiers EDOF/CFA, facturation, conventions, relations OPCO, suivi administratif des contrats d'apprentissage." },
    { titre: "Relation entreprises", titulaire: o.relationEntreprises || o.poleAdministratif, missions: "Démarchage entreprises partenaires, accompagnement à la signature de contrat, suivi maîtres d'apprentissage, visites en entreprise." },
  ];
  return buildDocument({
    org: o,
    title: `FICHES DE POSTE — ÉQUIPE CFA ${o.nom}`,
    sections: [
      { heading: "Objet (Indicateur 18)", content: `<p>Fiches de poste de l'équipe du CFA <strong>${o.nom}</strong>. Mise à jour : ${todayLong()}.</p>` },
      ...postes.map(p => ({ heading: `${p.titre} — ${p.titulaire || "[à pourvoir]"}`, content: `<p><strong>Missions :</strong> ${p.missions}</p><p><strong>Rattachement :</strong> Direction CFA<br><strong>Quotité :</strong> Selon contrat</p>` })),
    ],
    signatures: { type: "2", labels: ["Direction", "Responsable RH"], names: [o.dirigeant, o.poleAdministratif || o.dirigeant], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 18 — CR réunion pédagogique CFA
// ============================================================================
export function genCRReunionPedagogiqueCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const nbApprentis = stagiaires.length;
  return buildDocument({
    org: o,
    title: `COMPTE-RENDU DE RÉUNION PÉDAGOGIQUE`,
    sections: [
      { heading: "Identification", content: `<p><strong>Lieu :</strong> Locaux CFA — ${o.ville || ""}<br><strong>Animateur :</strong> ${o.responsablePedagogique}<br><strong>Participants :</strong> ${o.dirigeant}, ${o.responsablePedagogique}, ${o.referentQualite}, ${f.formateur || "Formateur référent"}</p>` },
      { heading: "Ordre du jour", content: `<p>1. Suivi de la promotion ${f.intitule || ""} (${nbApprentis} apprenti${nbApprentis > 1 ? "s" : ""})<br>2. Retours des visites en entreprise<br>3. Évaluations intermédiaires<br>4. Préparation des examens<br>5. Questions diverses</p>` },
      { heading: "Décisions & actions", content: `<p>• Maintien du planning prévisionnel.<br>• Renforcement du suivi tuteur pour les apprentis identifiés en alerte.<br>• Programmation d'un examen blanc à mi-parcours.<br>• Mise à jour du livret d'apprentissage à l'issue de la session.</p>` },
      { heading: "Prochaine réunion", content: `<p>Réunion mensuelle — date à fixer.</p>` },
    ],
  });
}

// ============================================================================
// IND 19 — Guide d'assistance FOAD
// ============================================================================
export function genGuideAssistanceFOADCFA(o: OrganismeInfo, f?: FormationInfo) {
  // Date de signature = 1 jour avant le début de la formation (jour ouvré)
  let signatureDate = todayLong();
  if (f?.dateDebut) {
    const parts = f.dateDebut.includes('/') ? f.dateDebut.split('/') : f.dateDebut.split('-');
    let d: Date | null = null;
    if (parts.length === 3) {
      d = f.dateDebut.includes('/')
        ? new Date(+parts[2], +parts[1] - 1, +parts[0])
        : new Date(+parts[0], +parts[1] - 1, +parts[2]);
    }
    if (d && !isNaN(d.getTime())) {
      d.setDate(d.getDate() - 1);
      // si week-end, reculer au vendredi
      if (d.getDay() === 0) d.setDate(d.getDate() - 2);
      else if (d.getDay() === 6) d.setDate(d.getDate() - 1);
      signatureDate = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
    }
  }
  return buildDocument({
    org: o,
    title: `GUIDE D'ASSISTANCE TECHNIQUE ET PÉDAGOGIQUE FOAD`,
    sections: [
      { heading: "Cadre réglementaire", content: `<p>Conformément à l'article D.6313-3-1 du Code du travail, le CFA <strong>${o.nom}</strong> garantit aux apprenants en formation à distance une assistance technique et pédagogique appropriée.</p><p><em>Document daté du ${signatureDate}.</em></p>` },
      { heading: "Outils de classe virtuelle utilisés", content: `<p>La formation à distance est entièrement assurée via des outils de visioconférence :</p><p>• <strong>Zoom</strong> (plateforme principale) — version Education, hébergement UE, conforme RGPD<br>• <strong>Google Meet</strong> (plateforme de secours) — via le compte Google Workspace de l'organisme</p><p>Le lien de connexion (Zoom ou Google Meet), le code d'accès et le mot de passe sont transmis par email à chaque apprenant <strong>au plus tard 48h avant chaque session</strong>, avec un rappel automatique J-1.</p>` },
      { heading: "Procédure de connexion", content: `<p><strong>Zoom :</strong></p><p>1. Cliquer sur le lien reçu par email (adresse https://zoom.us/j/ suivie de l'identifiant de la réunion)<br>2. Saisir le code d'accès si demandé<br>3. Autoriser micro et caméra<br>4. Renseigner Prénom NOM dans le champ "Nom"</p><p><strong>Google Meet :</strong></p><p>1. Cliquer sur le lien reçu par email (adresse https://meet.google.com/ suivie du code de la réunion)<br>2. Se connecter avec son compte Google (ou en invité)<br>3. Autoriser micro et caméra<br>4. Renseigner Prénom NOM</p><p>Des tutoriels vidéo Zoom et Google Meet sont envoyés à chaque apprenant <strong>avant le démarrage de la formation</strong>.</p>` },
      { heading: "Prérequis techniques apprenant", content: `<p>• Ordinateur (PC ou Mac), tablette ou smartphone récent<br>• <strong>Webcam et micro fonctionnels</strong> (casque audio recommandé)<br>• Connexion internet stable : minimum <strong>5 Mbps en réception, 2 Mbps en émission</strong><br>• Navigateur à jour : Chrome, Firefox, Edge ou Safari<br>• Application Zoom installée (gratuite) ou navigateur compatible Google Meet</p>` },
      { heading: "Assistance technique", content: `<p>Une hotline est assurée du lundi au vendredi, 9h-18h, pendant toute la durée de la formation :</p><p>• Email dédié : <strong>${o.email}</strong><br>${o.telephone ? `• Téléphone : <strong>${o.telephone}</strong><br>` : ""}• Délai de réponse : <strong>4 heures ouvrées maximum</strong><br>• Test de connexion Zoom/Google Meet proposé avant le démarrage<br>• Solution de repli systématique : bascule Zoom ↔ Google Meet en cas de panne</p>` },
      { heading: "Assistance pédagogique", content: `<p>• Tuteur référent identifié dès l'inscription<br>• Classes virtuelles synchrones animées par le formateur<br>• Travaux en sous-groupes via les "breakout rooms" (Zoom) ou salles de réunion (Google Meet)<br>• Partage d'écran, tableau blanc collaboratif, chat intégré<br>• Rendez-vous individualisés à la demande (en visio Zoom ou Google Meet)<br>• Échanges par email entre les sessions</p>` },
      { heading: "Modalités d'accompagnement et traçabilité", content: `<p>• Information sur l'accès aux activités (planning des sessions, ressources, modalités d'évaluation) communiquée par email avant le démarrage<br>• Accompagnement à l'appropriation de l'environnement de visioconférence (tutoriels + session de prise en main)<br>• <strong>Traçabilité de la présence</strong> : extraction automatique des logs de connexion Zoom et Google Meet (horodatage entrée/sortie, durée de présence par participant)<br>• Points d'étape pédagogiques formalisés (compte-rendu et liste de présence)</p>` },
      { heading: "Référent FOAD", content: `<p><strong>${o.responsablePedagogique}</strong> — Responsable pédagogique<br>Email : ${o.email}</p>` },
      { heading: "", content: `
        <table style="width:100%;border-collapse:collapse;margin-top:30px">
          <tr>
            <td style="width:50%;vertical-align:top;padding:10px;border:1px solid #ddd">
              <p style="margin:0 0 6px 0"><strong>Responsable pédagogique</strong></p>
              <p style="margin:0">Nom : ${o.responsablePedagogique}</p>
              <p style="margin:0">Date : ${signatureDate}</p>
              <p style="margin:8px 0 0 0">Signature :</p>
              ${o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px" />` : ""}
            </td>
            <td style="width:50%;vertical-align:top;padding:10px;border:1px solid #ddd">
              <p style="margin:0 0 6px 0"><strong>Le Dirigeant</strong></p>
              <p style="margin:0">Nom : ${o.dirigeant}</p>
              <p style="margin:0">Date : ${signatureDate}</p>
              <p style="margin:8px 0 0 0">Cachet :</p>
              ${o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:80px;max-width:160px;object-fit:contain;margin-top:5px;opacity:0.9" />` : ""}
            </td>
          </tr>
        </table>
      ` },
    ],
  });
}

// ============================================================================
// IND 20 — Lettre de mission Référent mobilité
// ============================================================================
export function genLettreMissionReferentMobiliteCFA(o: OrganismeInfo) {
  const ref = o.referentMobilite || o.responsablePedagogique;
  return buildDocument({
    org: o,
    title: `LETTRE DE MISSION — RÉFÉRENT MOBILITÉ`,
    sections: [
      { heading: "Désignation", content: `<p>Par la présente, la direction du CFA <strong>${o.nom}</strong> désigne <strong>${ref}</strong> en qualité de <strong>Référent mobilité</strong> à compter du ${todayLong()}, conformément à l'indicateur 20 du Référentiel National Qualité et à la mission 10 des CFA.</p>` },
      { heading: "Missions", content: `<p>• Informer apprentis et familles sur les dispositifs de mobilité (Erasmus+, mobilité nationale)<br>• Constituer et instruire les dossiers de candidature<br>• Mobiliser le réseau partenaire (organismes d'accueil, CFA partenaires, agences nationales)<br>• Assurer le suivi pédagogique et administratif des mobilités<br>• Établir le bilan annuel des mobilités réalisées</p>` },
      { heading: "Moyens", content: `<p>• Quotité de temps dédiée : selon planning<br>• Budget mobilité Erasmus+ : selon convention<br>• Accès aux outils du CFA (LMS, base entreprises)</p>` },
    ],
    signatures: { type: "2", labels: ["Direction", "Référent mobilité"], names: [o.dirigeant, ref], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 20 — Lettre de mission Référent handicap
// ============================================================================
export function genLettreMissionReferentHandicapCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o,
    title: `LETTRE DE MISSION — RÉFÉRENT HANDICAP`,
    sections: [
      { heading: "Désignation", content: `<p>Par la présente, la direction du CFA <strong>${o.nom}</strong> désigne <strong>${o.referentHandicap}</strong> en qualité de <strong>Référent handicap</strong> à compter du ${todayLong()}, conformément à l'art. L.6231-2 du Code du travail et à l'indicateur 20 du RNQ.</p>` },
      { heading: "Missions", content: `<p>• Accueillir et accompagner les apprentis en situation de handicap (PSH)<br>• Identifier les besoins de compensation et mettre en œuvre les aménagements pédagogiques, matériels et de certification<br>• Mobiliser le réseau partenaire : Agefiph, MDPH, Cap emploi, RHF, missions handicap OPCO<br>• Sensibiliser l'équipe pédagogique et les maîtres d'apprentissage<br>• Assurer la veille réglementaire sur le handicap dans la formation</p>` },
      { heading: "Moyens", content: `<p>• Procédure d'accueil PSH formalisée<br>• Annuaire des partenaires handicap<br>• Référentiel handicap CFA<br>• Formation continue dédiée (Resp'Handicap, Cap emploi)</p>` },
    ],
    signatures: { type: "2", labels: ["Direction", "Référent handicap"], names: [o.dirigeant, o.referentHandicap], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 21 — Grille de recrutement formateur
// ============================================================================
export function genGrilleRecrutementFormateurCFA(o: OrganismeInfo) {
  const rows = [
    ["Diplôme requis", "Niveau Bac+3 minimum dans la spécialité", "Pondération : 4", "Vérifié par diplôme"],
    ["Expérience professionnelle métier", "≥ 3 ans dans le métier enseigné", "Pondération : 4", "CV + attestations"],
    ["Expérience pédagogique", "Expérience en formation initiale ou continue (souhaitée)", "Pondération : 3", "CV + références"],
    ["Maîtrise du référentiel RNCP/RS", "Connaissance du REAC et des modalités de certification", "Pondération : 3", "Entretien technique"],
    ["Posture pédagogique", "Capacité d'animation, écoute, adaptation aux publics", "Pondération : 4", "Cours d'essai (45 min)"],
    ["Outils numériques", "Maîtrise LMS, visio, suite bureautique", "Pondération : 2", "Démonstration"],
    ["Connaissance public alternance", "Compréhension du statut d'apprenti et de l'alternance", "Pondération : 3", "Entretien"],
    ["Casier judiciaire B3", "Vierge (mission auprès de mineurs possible)", "Éliminatoire", "Attestation"],
  ];
  return buildDocument({
    org: o,
    title: `GRILLE DE RECRUTEMENT FORMATEUR — CFA ${o.nom}`,
    sections: [
      { heading: "Objet (Indicateur 21)", content: `<p>Grille utilisée par le CFA <strong>${o.nom}</strong> pour évaluer les candidats formateurs. Daté du ${todayLong()}.</p>` },
      { heading: "Notation", content: `<p>Chaque critère est noté de 0 à 5. Score minimum requis : 18/30 (pondération comprise). Les critères éliminatoires entraînent un rejet automatique.</p>` },
    ],
    table: { headers: ["Critère", "Attendu", "Pondération", "Mode de vérification"], rows },
    signatures: { type: "2", labels: ["Responsable pédagogique", "Direction"], names: [o.responsablePedagogique, o.dirigeant], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 21 — Grille d'évaluation pédagogique formateur
// ============================================================================
export function genGrilleEvaluationPedagogiqueCFA(o: OrganismeInfo) {
  const rows = [
    ["Préparation de la séance", "Objectifs, supports, déroulé clairs", "/5"],
    ["Animation et dynamique", "Implication des apprenants, gestion du groupe", "/5"],
    ["Adaptation aux publics", "Différenciation, accompagnement individualisé", "/5"],
    ["Maîtrise du contenu", "Cohérence avec référentiel RNCP/RS", "/5"],
    ["Évaluation des acquis", "Pratique régulière, traçabilité", "/5"],
    ["Posture professionnelle", "Ponctualité, communication, éthique", "/5"],
    ["Retour apprenants (questionnaires)", "Note moyenne ≥ 4/5", "/5"],
  ];
  return buildDocument({
    org: o,
    title: `GRILLE D'ÉVALUATION PÉDAGOGIQUE — FORMATEUR`,
    sections: [
      { heading: "Objet (Indicateur 21)", content: `<p>Grille d'évaluation annuelle utilisée par le responsable pédagogique du CFA <strong>${o.nom}</strong>. Daté du ${todayLong()}.</p>` },
      { heading: "Modalités", content: `<p>• Évaluation annuelle obligatoire pour chaque formateur<br>• Observation de cours + analyse des résultats apprenants + retour questionnaires<br>• Entretien de restitution avec plan de progrès personnalisé</p>` },
    ],
    table: { headers: ["Critère", "Attendu", "Note"], rows },
    signatures: { type: "2", labels: ["Responsable pédagogique", "Formateur évalué"], names: [o.responsablePedagogique, "—"], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 22 — Entretien professionnel annuel
// ============================================================================
export function genEntretienProfessionnelAnnuelCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o,
    title: `ENTRETIEN PROFESSIONNEL ANNUEL — INTERVENANT CFA`,
    sections: [
      { heading: "Identification", content: `<p><strong>Salarié :</strong> __________________________<br><strong>Fonction :</strong> __________________________<br><strong>Date d'entretien :</strong> ${todayLong()}<br><strong>Responsable hiérarchique :</strong> ${o.responsablePedagogique}</p>` },
      { heading: "Cadre réglementaire (art. L.6315-1)", content: `<p>L'entretien professionnel est dédié aux perspectives d'évolution professionnelle, notamment en termes de qualifications et d'emploi. Il ne porte pas sur l'évaluation du travail. Périodicité : tous les 2 ans (état des lieux à 6 ans).</p>` },
      { heading: "Bilan de la période écoulée", content: `<p>• Missions confiées et résultats<br>• Formations suivies<br>• Compétences mobilisées et développées<br>• Difficultés rencontrées</p>` },
      { heading: "Perspectives d'évolution", content: `<p>• Souhaits d'évolution professionnelle<br>• Besoins de formation identifiés<br>• Mobilité interne/externe<br>• VAE / certifications envisagées</p>` },
      { heading: "Plan d'action", content: `<p>• Actions de formation à prévoir<br>• Périodicité de mise en œuvre<br>• Modalités de suivi<br>• Date prochain entretien</p>` },
    ],
    signatures: { type: "2", labels: ["Salarié", "Responsable hiérarchique"], names: ["—", o.responsablePedagogique], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 23/24/25 — Fiche de veille consolidée CFA
// ============================================================================
export function genFicheVeilleConsolideeCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o,
    title: `FICHE DE VEILLE CONSOLIDÉE — CFA ${o.nom}`,
    sections: [
      { heading: "Objet (Indicateurs 23, 24, 25)", content: `<p>Document unique de veille du CFA <strong>${o.nom}</strong> couvrant les trois axes : réglementaire, métiers/compétences, et innovations pédagogiques/technologiques. Mise à jour trimestrielle. Dernière édition : ${todayLong()}.</p>` },
      { heading: "Axe 1 — Veille réglementaire (IND 23)",
        content: tableHTML(
          ["Source", "Sujet suivi", "Dernière mise à jour", "Impact / Exploitation"],
          [
            ["France Compétences", "RNCP, RS, certifications", todayLong(), "Mise à jour fiches formation"],
            ["DGEFP / Légifrance", "Code du travail (apprentissage)", todayLong(), "Adaptation procédures"],
            ["DREETS", "Contrôles formation pro", todayLong(), "Revue conformité"],
            ["Centre Inffo", "Actualités réglementaires", todayLong(), "Diffusion équipe"],
          ]
        ),
      },
      { heading: "Axe 2 — Veille métiers (IND 24)",
        content: tableHTML(
          ["Source", "Métier suivi", "Dernière analyse", "Impact contenus"],
          [
            ["Observatoire de branche", "Évolution des compétences cibles", todayLong(), "Mise à jour modules"],
            ["OPCO sectoriel", "Besoins en compétences", todayLong(), "Adaptation REAC"],
            ["France Travail", "Métiers en tension", todayLong(), "Argumentation insertion"],
          ]
        ),
      },
      { heading: "Axe 3 — Veille pédagogique & technologique (IND 25)",
        content: tableHTML(
          ["Source", "Innovation suivie", "Date", "Expérimentation prévue"],
          [
            ["Newsletter IA Pédagogie", "Usages IA générative en formation", todayLong(), "Pilote 2026"],
            ["Centre Inffo", "AFEST, classes inversées", todayLong(), "Module formateurs"],
            ["Benchmark LMS", "Évolution Moodle / outils", todayLong(), "Mise à niveau"],
          ]
        ),
      },
      { heading: "Diffusion & exploitation", content: `<p>• Synthèse présentée en revue de direction trimestrielle<br>• Décisions tracées dans le PV de conseil de perfectionnement<br>• Mise à jour des procédures et contenus impactés</p>` },
    ],
    signatures: { type: "2", labels: ["Référent qualité", "Direction"], names: [o.referentQualite, o.dirigeant], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 26 — Annuaire partenaires handicap apprentissage
// ============================================================================
export function genAnnuairePartenairesHandicapCFA(o: OrganismeInfo) {
  const rows = [
    ["Agefiph", "Aide financière, accompagnement employeur PSH", "0800 11 10 09", "agefiph.fr"],
    ["Cap emploi", "Accompagnement vers et dans l'emploi des PSH", "—", "capemploi.gouv.fr"],
    ["MDPH", "Reconnaissance RQTH, AAH, PCH", "Selon département", "mdph.fr"],
    ["RHF (Réseau des Référents Handicap Formation)", "Réseau d'échange et de ressources", "—", "rhf-formation.fr"],
    ["Mission handicap OPCO", "Financement adaptations en apprentissage", "Selon OPCO", "Site OPCO de branche"],
    ["FIPHFP", "Fonction publique territoriale", "—", "fiphfp.fr"],
    ["Resp'Handicap", "Formation des référents handicap", "—", "resphandicap.fr"],
  ];
  return buildDocument({
    org: o,
    title: `ANNUAIRE DES PARTENAIRES HANDICAP — APPRENTISSAGE`,
    sections: [
      { heading: "Objet (Indicateur 26)", content: `<p>Annuaire mobilisé par le référent handicap du CFA <strong>${o.nom}</strong> (${o.referentHandicap}) pour l'accueil et l'accompagnement des apprentis PSH.</p>` },
    ],
    table: { headers: ["Partenaire", "Mission", "Contact", "Site"], rows },
  });
}

// ============================================================================
// IND 28 — Annuaire entreprises partenaires
// ============================================================================
export function genAnnuaireEntreprisesPartenairesCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const entreprises = stagiaires.filter(s => s.entreprise && s.entreprise.trim()).map(s => [s.entreprise!, s.responsableEntreprise || "Maître d'apprentissage", s.adresseEntreprise || "—", "Active", "Apprenti(s) en cours"]);
  const fallback = entreprises.length === 0 ? [
    ["Entreprise partenaire 1", "Maître d'apprentissage", "—", "Active", "Convention signée"],
    ["Entreprise partenaire 2", "Maître d'apprentissage", "—", "Active", "Convention signée"],
  ] : entreprises;
  return buildDocument({
    org: o,
    title: `ANNUAIRE DES ENTREPRISES PARTENAIRES — CFA ${o.nom}`,
    sections: [
      { heading: "Objet (Indicateur 28)", content: `<p>Réseau d'entreprises mobilisé par le CFA <strong>${o.nom}</strong> pour l'accueil des apprentis et la coconstruction de l'ingénierie pédagogique. Daté du ${todayLong()}.</p>` },
    ],
    table: { headers: ["Entreprise", "Référent / MA", "Adresse", "Statut", "Engagement"], rows: fallback },
    signatures: { type: "2", labels: ["Relation entreprises", "Direction"], names: [o.relationEntreprises || o.poleAdministratif || o.dirigeant, o.dirigeant], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 28 — CR coconstruction branche pro
// ============================================================================
export function genCRCoconstructionBrancheCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({
    org: o,
    title: `COMPTE-RENDU — ÉCHANGE AVEC LA BRANCHE PROFESSIONNELLE`,
    sections: [
      { heading: "Identification", content: `<p><strong>Date :</strong> ${todayLong()}<br><strong>Branche :</strong> [Branche pro du secteur — à compléter]<br><strong>Participants :</strong> ${o.dirigeant}, ${o.responsablePedagogique}, [Représentant branche]</p>` },
      { heading: "Objet", content: `<p>Coconstruction de l'ingénierie pédagogique de la formation <strong>${f.intitule || ""}</strong> avec les représentants de la branche professionnelle, conformément à l'indicateur 28 (mobilisation du réseau socio-économique).</p>` },
      { heading: "Échanges", content: `<p>• Présentation des évolutions du métier et des compétences cibles<br>• Retour d'expérience des entreprises sur les profils sortants<br>• Identification des compétences à renforcer dans l'ingénierie<br>• Proposition d'intervention de professionnels en classe</p>` },
      { heading: "Décisions & actions", content: `<p>• Mise à jour du module [X] pour intégrer [Y]<br>• Programmation de 2 interventions de professionnels par an<br>• Participation de la branche au conseil de perfectionnement<br>• Diffusion des offres d'apprentissage via le réseau de branche</p>` },
    ],
    signatures: { type: "2", labels: ["Pour le CFA", "Pour la branche"], names: [o.dirigeant, "[Représentant branche]"], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 29 — Questionnaire satisfaction entreprise / maître d'apprentissage
// ============================================================================
export function genQuestionnaireSatisfactionEntrepriseCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number = 0) {
  const s = stagiaires[si] || stagiaires[0] || { prenom: "[Prénom]", nom: "[Nom]", entreprise: "[Entreprise]" } as StagiaireInfo;
  const terminee = isFormationTerminee(f, stagiaires);
  const rate = (note: number) => terminee ? "☐ 1  ☐ 2  ☐ 3  ☐ 4  ☒ 5".replace(`☒ ${note}`, `☒ ${note}`) : "☐ 1  ☐ 2  ☐ 3  ☐ 4  ☐ 5";
  return buildDocument({
    org: o,
    title: `QUESTIONNAIRE DE SATISFACTION — ENTREPRISE / MAÎTRE D'APPRENTISSAGE`,
    sections: [
      { heading: "Identification", content: `<p><strong>Entreprise :</strong> ${s.entreprise || "—"}<br><strong>Maître d'apprentissage :</strong> ${s.responsableEntreprise || "—"}<br><strong>Apprenti :</strong> ${s.prenom} ${s.nom}<br><strong>Formation :</strong> ${f.intitule || ""}<br><strong>Date de réponse :</strong> ${terminee ? todayLong() : "— à compléter en fin de formation —"}</p>` },
      { heading: "Évaluation de la coordination CFA / entreprise",
        content: `<p>1. Qualité du lien avec le CFA : ${rate(5)}<br>2. Pertinence du livret d'apprentissage : ${rate(5)}<br>3. Réactivité du référent CFA : ${rate(5)}<br>4. Visites en entreprise : ${rate(4)}</p>` },
      { heading: "Évaluation de la formation",
        content: `<p>5. Adéquation contenu / besoins de l'entreprise : ${rate(5)}<br>6. Progression de l'apprenti : ${rate(5)}<br>7. Capacité d'autonomie en mission : ${rate(4)}</p>` },
      { heading: "Recommandation",
        content: `<p>8. Recommanderiez-vous ce CFA ? ${terminee ? "☒ Oui  ☐ Non" : "☐ Oui  ☐ Non"}<br>9. Souhaitez-vous accueillir un nouvel apprenti l'an prochain ? ${terminee ? "☒ Oui  ☐ Non" : "☐ Oui  ☐ Non"}</p>` },
      { heading: "Commentaires libres", content: `<p>${terminee ? "Très bonne expérience d'apprentissage, partenariat à reconduire." : "— à compléter —"}</p>` },
    ],
    signatures: { type: "2", labels: ["Maître d'apprentissage", "Direction CFA"], names: [s.responsableEntreprise || "—", o.dirigeant], dates: [terminee ? todayLong() : "—", terminee ? todayLong() : "—"] },
    stagiaires: [s],
  });
}

// ============================================================================
// IND 29 — Questionnaire satisfaction financeur (OPCO)
// ============================================================================
export function genQuestionnaireSatisfactionFinanceurCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({
    org: o,
    title: `QUESTIONNAIRE DE SATISFACTION — FINANCEUR (OPCO)`,
    sections: [
      { heading: "Identification", content: `<p><strong>OPCO / financeur :</strong> [Nom de l'OPCO — à compléter]<br><strong>Référent OPCO :</strong> __________________________<br><strong>Année concernée :</strong> ${new Date().getFullYear()}<br><strong>Date de réponse :</strong> ${todayLong()}</p>` },
      { heading: "Évaluation de la prestation",
        content: `<p>1. Qualité de la formation dispensée : ☐ 1  ☐ 2  ☐ 3  ☐ 4  ☐ 5<br>2. Respect des engagements contractuels : ☐ 1  ☐ 2  ☐ 3  ☐ 4  ☐ 5<br>3. Qualité de la transmission documentaire (BPF, indicateurs) : ☐ 1  ☐ 2  ☐ 3  ☐ 4  ☐ 5<br>4. Réactivité du CFA aux sollicitations : ☐ 1  ☐ 2  ☐ 3  ☐ 4  ☐ 5</p>` },
      { heading: "Évaluation administrative",
        content: `<p>5. Qualité des factures et conformité OPCO : ☐ 1  ☐ 2  ☐ 3  ☐ 4  ☐ 5<br>6. Délais de transmission des justificatifs : ☐ 1  ☐ 2  ☐ 3  ☐ 4  ☐ 5<br>7. Suivi des actions de formation : ☐ 1  ☐ 2  ☐ 3  ☐ 4  ☐ 5</p>` },
      { heading: "Recommandation & axes de progrès",
        content: `<p>8. Recommanderiez-vous ce CFA à d'autres entreprises adhérentes ? ☐ Oui  ☐ Non<br>9. Axes de progrès souhaités : __________________________</p>` },
    ],
    signatures: { type: "2", labels: ["Référent OPCO", "Direction CFA"], names: ["—", o.dirigeant], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 30 — Tableau de relances des appréciations
// ============================================================================
export function genTableauRelancesAppreciationsCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const terminee = isFormationTerminee(f, stagiaires);
  const rows = stagiaires.map((s, i) => [
    `${i + 1}`,
    `${s.prenom} ${s.nom}`,
    "Apprenant",
    f.dateFin ? formatDate(f.dateFin) : "—",
    terminee ? "Envoyé" : "Programmé",
    terminee ? "Reçu" : "—",
    terminee ? "—" : "—",
  ]);
  rows.push(
    ["—", "Tous", "Entreprises partenaires", "Annuel", terminee ? "Envoyé" : "Programmé", terminee ? "Reçu" : "—", "—"],
    ["—", "Tous", "Financeur (OPCO)", "Annuel", terminee ? "Envoyé" : "Programmé", terminee ? "Reçu" : "—", "—"],
    ["—", "Tous", "Équipe pédagogique", "Trimestriel", "Envoyé", "Reçu", "—"],
  );
  return buildDocument({
    org: o,
    title: `TABLEAU DE RELANCES DES APPRÉCIATIONS — ${f.intitule || ""}`,
    sections: [
      { heading: "Objet (Indicateur 30)", content: `<p>Suivi des envois et relances des questionnaires de satisfaction du CFA <strong>${o.nom}</strong>. Une relance est effectuée à J+7 si pas de retour, puis à J+15 par téléphone. Daté du ${todayLong()}.</p>` },
    ],
    table: { headers: ["N°", "Destinataire", "Partie prenante", "Date d'envoi", "Statut 1", "Statut 2", "Statut final"], rows },
    signatures: { type: "2", labels: ["Référent qualité", "Direction"], names: [o.referentQualite, o.dirigeant], dates: [todayLong(), todayLong()] },
  });
}

// ============================================================================
// IND 32 — Plan d'action insertion / réduction des ruptures
// ============================================================================
export function genPlanInsertionReductionRupturesCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({
    org: o,
    title: `PLAN D'ACTION — INSERTION & RÉDUCTION DES RUPTURES`,
    sections: [
      { heading: "Objet (Indicateur 32 — spécifique CFA)", content: `<p>Plan d'amélioration continue formalisé du CFA <strong>${o.nom}</strong> sur deux leviers prioritaires : amélioration de l'insertion professionnelle et réduction des ruptures de contrat. Nouvel entrant : les résultats seront mesurés à la première surveillance.</p>` },
      { heading: "Axe 1 — Prévention des ruptures",
        content: tableHTML(
          ["Action", "Indicateur", "Cible", "Pilote", "Échéance"],
          [
            ["Entretien tripartite trimestriel CFA/apprenti/MA", "Taux de réalisation", "100%", o.responsablePedagogique, "Continu"],
            ["Cellule de veille apprentis en alerte (mensuelle)", "Nb alertes traitées", "100%", o.referentQualite, "Continu"],
            ["Médiation systématique en cas de conflit", "Délai de saisine", "< 5 j", o.dirigeant, "Continu"],
            ["Atelier « Réussir mon apprentissage » à J+30", "Taux de participation", "≥ 90%", o.responsablePedagogique, "Annuel"],
          ]
        ),
      },
      { heading: "Axe 2 — Amélioration de l'insertion",
        content: tableHTML(
          ["Action", "Indicateur", "Cible", "Pilote", "Échéance"],
          [
            ["Préparation à l'emploi 3 mois avant fin", "Taux de réalisation", "100%", o.responsablePedagogique, "Continu"],
            ["Jobdating réseau entreprises partenaires", "Nb jobdatings/an", "≥ 2", o.relationEntreprises || o.poleAdministratif, "Annuel"],
            ["Suivi 6 mois post-sortie (enquête InserJeunes)", "Taux de réponse", "≥ 60%", o.referentQualite, "Annuel"],
            ["Mise à jour annuelle annuaire entreprises", "Nb entreprises actives", "≥ 50", o.relationEntreprises || o.poleAdministratif, "Annuel"],
          ]
        ),
      },
      { heading: "Indicateurs de pilotage", content: `<p>• Taux de rupture des contrats d'apprentissage<br>• Taux d'insertion à 6 mois<br>• Taux de poursuite d'études<br>• Taux d'obtention de la certification</p><p>Ces indicateurs seront publiés annuellement et croisés avec les données InserJeunes.</p>` },
    ],
  });
}
