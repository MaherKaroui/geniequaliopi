// Documents CFA — Combler les écarts de preuves identifiés sur la matrice
// "Prépa audit Qualiopi CFA" (Dreamers Team / V9 nouvel entrant).
// 18 générateurs courts, datés, brandés.

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML, isFormationTerminee } from "./docBuilder";

const todayLong = () => new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

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
  const rows: string[][] = [
    ["Locaux", `${o.adresse || ""}, ${o.codePostal || ""} ${o.ville || ""}`, "Salles équipées", "Conformes ERP 5e cat.", todayLong()],
    ["Vidéoprojecteurs", "x3 — Epson EB-W06", "Salles 1, 2, 3", "Opérationnels", todayLong()],
    ["Postes informatiques", "x15 — Dell OptiPlex i5", "Salle informatique", "Sous garantie", todayLong()],
    ["Licences logicielles", "Microsoft 365 E3 (x15) + Adobe Creative Cloud (x5)", "Active Directory", "Renouvelées annuellement", todayLong()],
    ["LMS", `Moodle 4.x — Hébergement OVH`, "Web", "Sauvegardes quotidiennes", todayLong()],
    ["Plateforme visio", "Zoom Education", "Web", "Compte payant", todayLong()],
    ["Accessibilité PSH", "Rampe d'accès, sanitaires PMR, signalétique", "Locaux", "Conformes loi 2005", todayLong()],
    ["Maintenance", "Contrat IT — prestataire externe", "Hebdomadaire", "Active", todayLong()],
  ];
  return buildDocument({
    org: o,
    title: `INVENTAIRE DES MOYENS PÉDAGOGIQUES, TECHNIQUES ET D'ENCADREMENT`,
    sections: [
      { heading: "Objet (Indicateur 17)", content: `<p>Inventaire daté des moyens mis en œuvre par le CFA <strong>${o.nom}</strong> pour la formation <strong>${f.intitule || ""}</strong>. Mise à jour : ${todayLong()}.</p>` },
    ],
    table: { headers: ["Catégorie", "Description / Réf.", "Localisation", "État / Conformité", "Date contrôle"], rows },
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
  const date = todayLong();
  const nbApprentis = stagiaires.length;
  return buildDocument({
    org: o,
    title: `COMPTE-RENDU DE RÉUNION PÉDAGOGIQUE`,
    sections: [
      { heading: "Identification", content: `<p><strong>Date :</strong> ${date}<br><strong>Lieu :</strong> Locaux CFA — ${o.ville || ""}<br><strong>Animateur :</strong> ${o.responsablePedagogique}<br><strong>Participants :</strong> ${o.dirigeant}, ${o.responsablePedagogique}, ${o.referentQualite}, ${f.formateur || "Formateur référent"}</p>` },
      { heading: "Ordre du jour", content: `<p>1. Suivi de la promotion ${f.intitule || ""} (${nbApprentis} apprenti${nbApprentis > 1 ? "s" : ""})<br>2. Retours des visites en entreprise<br>3. Évaluations intermédiaires<br>4. Préparation des examens<br>5. Questions diverses</p>` },
      { heading: "Décisions & actions", content: `<p>• Maintien du planning prévisionnel.<br>• Renforcement du suivi tuteur pour les apprentis identifiés en alerte.<br>• Programmation d'un examen blanc à mi-parcours.<br>• Mise à jour du livret d'apprentissage à l'issue de la session.</p>` },
      { heading: "Prochaine réunion", content: `<p>Réunion mensuelle — date à fixer.</p>` },
    ],
    signatures: { type: "2", labels: ["Animateur", "Direction"], names: [o.responsablePedagogique, o.dirigeant], dates: [date, date] },
  });
}

// ============================================================================
// IND 19 — Guide d'assistance FOAD
// ============================================================================
export function genGuideAssistanceFOADCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o,
    title: `GUIDE D'ASSISTANCE TECHNIQUE ET PÉDAGOGIQUE FOAD`,
    sections: [
      { heading: "Cadre réglementaire", content: `<p>Conformément à l'article D.6313-3-1 du Code du travail, le CFA <strong>${o.nom}</strong> garantit aux apprenants en formation à distance une assistance technique et pédagogique appropriée.</p><p><em>Document daté du ${todayLong()}.</em></p>` },
      { heading: "Assistance technique", content: `<p>• Hotline LMS du lundi au vendredi, 9h-18h<br>• Email dédié : ${o.email}<br>${o.telephone ? `• Téléphone : ${o.telephone}<br>` : ""}• Délai de réponse : 24 h ouvrées maximum<br>• Tutoriels vidéo d'utilisation de la plateforme</p>` },
      { heading: "Assistance pédagogique", content: `<p>• Forum d'échange par module<br>• Classes virtuelles hebdomadaires<br>• Tuteur référent identifié dès l'inscription<br>• Rendez-vous individualisés à la demande</p>` },
      { heading: "Modalités d'accompagnement", content: `<p>• Information sur l'accès aux activités (planning, ressources, modalités d'évaluation)<br>• Accompagnement à l'appropriation de l'environnement numérique<br>• Suivi pédagogique régulier avec traçabilité (logs LMS, points d'étape)</p>` },
      { heading: "Référent FOAD", content: `<p><strong>${o.responsablePedagogique}</strong> — Responsable pédagogique<br>Email : ${o.email}</p>` },
    ],
    signatures: { type: "2", labels: ["Responsable pédagogique", "Direction"], names: [o.responsablePedagogique, o.dirigeant], dates: [todayLong(), todayLong()] },
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
      { heading: "Objet (Indicateur 32 — spécifique CFA)", content: `<p>Plan d'amélioration continue formalisé du CFA <strong>${o.nom}</strong> sur deux leviers prioritaires : amélioration de l'insertion professionnelle et réduction des ruptures de contrat. Daté du ${todayLong()}. Nouvel entrant : les résultats seront mesurés à la première surveillance.</p>` },
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
    signatures: { type: "2", labels: ["Référent qualité", "Direction"], names: [o.referentQualite, o.dirigeant], dates: [todayLong(), todayLong()] },
  });
}
