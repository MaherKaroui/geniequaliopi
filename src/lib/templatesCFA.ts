// CFA (Centre de Formation d'Apprentis) template generators
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML, signatureBlock2, signatureBlock3, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireDuree } from "./docBuilder";
import { EVAL_SCORES } from "./sampleData";
import { getEvalContent } from "./evalContent";

const apprentiLabel = (s: StagiaireInfo) => `${s.prenom} ${s.nom}`;

// ========== A. DOCUMENTS ADMINISTRATIFS CFA ==========

export function genPresentationCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PRÉSENTATION DE L'ORGANISME – CFA", sections: [
    { heading: "Notre CFA", content: `<p>${o.nom} est un Centre de Formation d'Apprentis (CFA) spécialisé dans les domaines suivants : ${o.domainesFormation}. Notre mission est de former les apprentis aux métiers de demain en alternant périodes en entreprise et en centre de formation.</p>` },
    { heading: "Notre approche", content: "<p>• Formation en alternance avec un accompagnement personnalisé<br>• Liens étroits avec les entreprises du territoire<br>• Suivi individualisé de chaque apprenti<br>• Préparation aux certifications professionnelles (RNCP)</p>" },
    { heading: "Chiffres clés", content: "<p>• 250 apprentis formés en 2024<br>• 15 formations en alternance<br>• 120 entreprises partenaires<br>• 92% de taux de réussite aux examens<br>• 88% d'insertion professionnelle à 6 mois</p>", variant: "green" },
  ] });
}

export function genOrganigrammeCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ORGANIGRAMME DU CFA", extraHtml: `
    <div style="text-align:center;margin:30px 0">
      <div style="background:#1e3a7b;color:white;padding:15px 30px;border-radius:8px;display:inline-block;margin-bottom:20px"><strong>Direction du CFA</strong><br>${o.dirigeant}</div>
      <div style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin-top:20px">
        <div style="background:#e8f0fe;padding:12px 20px;border-radius:8px;min-width:180px"><strong>Coordination Pédagogique</strong><br>${o.responsablePedagogique}<br><em style="font-size:11px">Formateurs CFA</em></div>
        <div style="background:#e8f0fe;padding:12px 20px;border-radius:8px;min-width:180px"><strong>Relations Entreprises</strong><br>Marie Lecomte<br><em style="font-size:11px">Maîtres d'apprentissage</em></div>
        <div style="background:#e8f0fe;padding:12px 20px;border-radius:8px;min-width:180px"><strong>Référent Handicap</strong><br>${o.referentHandicap}<br><em style="font-size:11px">Accessibilité</em></div>
        <div style="background:#e8f0fe;padding:12px 20px;border-radius:8px;min-width:180px"><strong>Vie Scolaire</strong><br>${o.referentQualite}<br><em style="font-size:11px">Suivi apprentis</em></div>
      </div>
    </div>` });
}

export function genLivretAccueilApprenti(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "LIVRET D'ACCUEIL DE L'APPRENTI", subtitle: f.intitule, sections: [
    { heading: "Bienvenue au CFA !", content: `<p>Nous sommes heureux de vous accueillir en tant qu'apprenti(e) pour la formation « ${f.intitule} ». Ce livret contient toutes les informations nécessaires au bon déroulement de votre parcours d'alternance.</p>` },
    { heading: "Vos contacts", content: `<p><strong>Direction :</strong> ${o.dirigeant}<br><strong>Coord. pédagogique :</strong> ${o.responsablePedagogique}<br><strong>Référent handicap :</strong> ${o.referentHandicap}<br><strong>Référent qualité :</strong> ${o.referentQualite}<br><strong>Tél :</strong> ${o.telephone} | <strong>Email :</strong> ${o.email}</p>` },
    { heading: "Votre alternance", content: `<p><strong>Rythme :</strong> 3 jours entreprise / 2 jours CFA<br><strong>Durée :</strong> À définir selon le groupe<br><strong>Lieu CFA :</strong> ${f.lieu}<br><strong>Horaires :</strong> 8h30-12h30 / 13h30-16h30</p>` },
    { heading: "Vos droits et devoirs", content: "<p>• Suivre avec assiduité la formation au CFA et en entreprise<br>• Respecter le règlement intérieur<br>• Tenir à jour votre carnet de liaison<br>• Prévenir en cas d'absence (CFA ET entreprise)<br>• Participer aux évaluations et examens</p>" },
    { heading: "Aides et accompagnement", content: "<p>• Aide au permis de conduire<br>• Aide au premier équipement<br>• Aide à la mobilité<br>• Accompagnement social (logement, santé)<br>• Soutien scolaire individualisé</p>", variant: "green" },
  ] });
}

export function genReglementInterieurCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "RÈGLEMENT INTÉRIEUR DU CFA", sections: [
    { heading: "Article 1 – Objet", content: `<p>Le présent règlement s'applique à tous les apprentis du CFA ${o.nom}, conformément aux articles L.6352-3 et R.6352-1 à R.6352-15 du Code du travail.</p>` },
    { heading: "Article 2 – Assiduité", content: "<p>La présence aux cours est obligatoire. Toute absence doit être justifiée dans les 48h auprès du CFA ET de l'employeur. Les retards répétés pourront faire l'objet d'une sanction.</p>" },
    { heading: "Article 3 – Comportement", content: "<p>Les apprentis doivent adopter un comportement respectueux envers l'équipe pédagogique, les autres apprentis et le personnel. Toute forme de violence, harcèlement ou discrimination est strictement interdite.</p>" },
    { heading: "Article 4 – Santé et sécurité", content: "<p>Il est interdit de fumer dans les locaux. Les consignes de sécurité affichées doivent être respectées. En cas d'accident, prévenir immédiatement le responsable.</p>" },
    { heading: "Article 5 – Utilisation du matériel", content: "<p>Le matériel pédagogique est mis à disposition des apprentis. Toute dégradation volontaire sera facturée.</p>" },
    { heading: "Article 6 – Sanctions", content: "<p>En cas de manquement : avertissement écrit, puis exclusion temporaire, puis exclusion définitive. L'apprenti sera entendu avant toute sanction.</p>" },
  ], signatures: { type: "2", labels: ["Le Directeur du CFA", "L'Apprenti(e) (lu et approuvé)"], names: [o.dirigeant, ""] } });
}

export function genCharteHandicapCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "CHARTE HANDICAP DU CFA", sections: [
    { heading: "Engagement", content: `<p>Le CFA ${o.nom} s'engage à accueillir et accompagner tout apprenti en situation de handicap, en mettant en place les aménagements nécessaires à la réussite de son parcours.</p>` },
    { heading: "Référent handicap", content: `<p>${o.referentHandicap} – ${o.email} – ${o.telephone}</p>` },
    { heading: "Aménagements possibles", content: "<p>• Aménagement des rythmes d'alternance<br>• Supports pédagogiques adaptés<br>• Temps supplémentaire aux examens (1/3 temps)<br>• Tutorat renforcé<br>• Accompagnement personnalisé<br>• Accessibilité des locaux</p>", variant: "green" },
    { heading: "Partenaires", content: "<p>• Agefiph<br>• FIPHFP<br>• MDPH<br>• Cap Emploi<br>• Ressource Handicap Formation</p>" },
  ], signatures: { type: "2", labels: ["Le Directeur", "Le Référent Handicap"], names: [o.dirigeant, o.referentHandicap] } });
}

export function genProcedureAccompagnementApprenti(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ACCOMPAGNEMENT DE L'APPRENTI", sections: [
    { heading: "Objectif", content: "<p>Définir les modalités d'accompagnement de l'apprenti tout au long de son parcours d'alternance, du premier jour jusqu'à l'obtention de sa certification.</p>" },
    { heading: "Étapes d'accompagnement", content: "<p><strong>1. Accueil :</strong> Journée d'intégration, remise du livret d'accueil, présentation du CFA<br><strong>2. Positionnement :</strong> Évaluation des acquis, entretien individuel, plan de formation<br><strong>3. Suivi régulier :</strong> Points mensuels avec le formateur référent<br><strong>4. Visites en entreprise :</strong> 2 visites minimum par an<br><strong>5. Bilans :</strong> Bilan intermédiaire à mi-parcours, bilan final avant l'examen<br><strong>6. Préparation examen :</strong> Sessions de révision, examens blancs</p>" },
    { heading: "Cas particuliers", content: "<p>• Difficultés scolaires → soutien individualisé<br>• Difficultés en entreprise → médiation CFA/entreprise<br>• Risque de rupture → entretien d'alerte et plan d'action<br>• Handicap → aménagements spécifiques</p>", variant: "green" },
  ] });
}

export function genProcedureRelationEntreprise(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE RELATION AVEC L'ENTREPRISE", sections: [
    { heading: "Objectif", content: "<p>Assurer une coordination efficace entre le CFA et les entreprises d'accueil pour garantir la qualité du parcours d'alternance.</p>" },
    { heading: "Modalités de coordination", content: "<p>• Convention de partenariat signée avec chaque entreprise<br>• Visite de l'entreprise avant l'accueil de l'apprenti<br>• Désignation d'un maître d'apprentissage qualifié<br>• 2 visites de suivi minimum par an<br>• Réunion annuelle CFA/entreprises<br>• Carnet de liaison partagé</p>" },
    { heading: "Outils de liaison", content: "<p>• Carnet de liaison apprenti (papier ou numérique)<br>• Fiches de visite en entreprise<br>• Grille de suivi des compétences<br>• Portail extranet pour les maîtres d'apprentissage</p>", variant: "green" },
  ] });
}

export function genProcedureRuptureContrat(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE GESTION DES RUPTURES DE CONTRAT", sections: [
    { heading: "Prévention des ruptures", content: "<p>Le CFA met en place des dispositifs de prévention :<br>• Détection précoce des difficultés (signaux faibles)<br>• Entretien d'alerte avec l'apprenti et l'employeur<br>• Médiation CFA/entreprise<br>• Accompagnement renforcé</p>" },
    { heading: "En cas de rupture", content: "<p>1. Enregistrement de la rupture dans le registre<br>2. Entretien individuel avec l'apprenti dans les 48h<br>3. Analyse des causes<br>4. Recherche d'une nouvelle entreprise d'accueil (délai légal : 6 mois)<br>5. Poursuite de la formation au CFA pendant la recherche<br>6. Accompagnement vers le nouveau contrat</p>" },
    { heading: "Suivi", content: "<p>• Tableau de suivi des ruptures mis à jour mensuellement<br>• Analyse annuelle des causes de rupture<br>• Plan d'actions préventives</p>", variant: "green" },
  ] });
}

export function genProcedureSuiviApprentissage(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE SUIVI DE L'APPRENTISSAGE", sections: [
    { heading: "Suivi pédagogique", content: "<p>• Évaluation continue des compétences au CFA<br>• Suivi de la progression via le carnet de liaison<br>• Bilans trimestriels avec l'apprenti<br>• Conseils de classe semestriels</p>" },
    { heading: "Suivi en entreprise", content: "<p>• 2 visites en entreprise par an minimum<br>• Échange régulier avec le maître d'apprentissage<br>• Grille de suivi des compétences en situation de travail<br>• Compte-rendu de visite formalisé</p>" },
    { heading: "Suivi administratif", content: "<p>• Suivi de l'assiduité (CFA et entreprise)<br>• Gestion des absences et retards<br>• Suivi des contrats (dates, ruptures, avenants)<br>• Facturation OPCO</p>", variant: "green" },
  ] });
}

export function genConventionPedagogiqueCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" };
  return buildDocument({ org: o, title: "CONVENTION PÉDAGOGIQUE CFA / ENTREPRISE", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, sections: [
    { heading: "Entre", content: `<p><strong>Le CFA :</strong> ${o.nom}<br>Représenté par : ${o.dirigeant}<br><br><strong>L'entreprise :</strong> ${s.entreprise}<br><strong>L'apprenti(e) :</strong> ${s.prenom} ${s.nom}</p>` },
    { heading: "Objet", content: `<p>La présente convention définit les modalités de mise en œuvre de la formation « ${f.intitule} » en alternance.</p>` },
    { heading: "Rythme d'alternance", content: `<p>3 jours en entreprise / 2 jours au CFA<br>Période : du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}<br>Durée totale : ${getStagiaireDuree(s, f)}</p>` },
    { heading: "Engagements du CFA", content: "<p>• Assurer la formation théorique selon le programme<br>• Désigner un formateur référent<br>• Réaliser les visites en entreprise<br>• Informer l'entreprise de l'assiduité de l'apprenti<br>• Préparer l'apprenti à la certification</p>" },
    { heading: "Engagements de l'entreprise", content: "<p>• Confier à l'apprenti des missions en lien avec la formation<br>• Désigner un maître d'apprentissage<br>• Libérer l'apprenti pour les jours de CFA<br>• Participer au suivi et à l'évaluation<br>• Remplir le carnet de liaison</p>" },
  ], signatures: { type: "3", names: [s.prenom + " " + s.nom, ""] } });
}

export function genPlanningAlternance(o: OrganismeInfo, f: FormationInfo) {
  const rows = [];
  for (let m = 1; m <= 12; m++) {
    const mois = new Date(2024, m - 1).toLocaleDateString('fr-FR', { month: 'long' });
    rows.push([mois.charAt(0).toUpperCase() + mois.slice(1), "Sem 1-2 : Entreprise", "Sem 3 : CFA", "Sem 4 : Entreprise", m === 6 ? "Bilan intermédiaire" : m === 12 ? "Examen final" : ""]);
  }
  return buildDocument({ org: o, title: "PLANNING D'ALTERNANCE", subtitle: f.intitule, table: {
    headers: ["Mois", "Période 1", "Période 2", "Période 3", "Événement"], rows
  } });
}

export function genCalendrierCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "CALENDRIER DU CFA – ANNÉE 2024", table: {
    headers: ["Période", "Événement", "Date", "Participants"],
    rows: [
      ["Rentrée", "Journée d'intégration", "02/09/2024", "Tous les apprentis"],
      ["T1", "Conseil de classe", "15/11/2024", "Formateurs + direction"],
      ["T1", "Visite entreprise 1", "Oct-Nov 2024", "Formateurs référents"],
      ["T2", "Examens blancs", "15/01/2025", "Tous les apprentis"],
      ["T2", "Conseil de classe", "07/02/2025", "Formateurs + direction"],
      ["T2", "Visite entreprise 2", "Fév-Mars 2025", "Formateurs référents"],
      ["T3", "Révisions intensives", "Mai 2025", "Apprentis en certification"],
      ["T3", "Examens finaux", "Juin 2025", "Apprentis en certification"],
      ["Fin", "Cérémonie de remise des diplômes", "Juil 2025", "Tous"],
    ]
  } });
}

export function genConvocationApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = stagiaires.slice(0, 5).map(s => `<div class="section"><p><strong>Destinataire :</strong> ${s.prenom} ${s.nom}</p><p><strong>Entreprise d'accueil :</strong> ${s.entreprise}</p><p><strong>Formation :</strong> ${f.intitule}</p><p><strong>Période CFA :</strong> Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</p></div>`).join("");
  return buildDocument({ org: o, title: "CONVOCATION APPRENTI AU CFA", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra + `<p>Merci de vous présenter muni(e) de cette convocation et de votre carnet de liaison.</p>` });
}

export function genFicheMissionEntreprise(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___", poste: "___" };
  return buildDocument({ org: o, title: "FICHE DE MISSION EN ENTREPRISE", subtitle: `${s.prenom} ${s.nom} – ${s.entreprise}`, sections: [
    { heading: "Apprenti(e)", content: `<p><strong>Nom :</strong> ${s.prenom} ${s.nom}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Poste :</strong> ${s.poste}<br><strong>Maître d'apprentissage :</strong> ${f.formateur}</p>` },
    { heading: "Missions confiées", content: "<p>1. Participation aux activités courantes du service<br>2. Réalisation de projets en lien avec la formation<br>3. Prise en charge progressive de responsabilités<br>4. Travail en équipe et communication professionnelle</p>" },
    { heading: "Compétences visées en entreprise", content: "<p>☐ Autonomie dans les tâches courantes<br>☐ Application des méthodes apprises au CFA<br>☐ Communication professionnelle<br>☐ Respect des consignes de sécurité<br>☐ Initiative et proactivité</p>" },
  ], signatures: { type: "2", labels: ["Le Maître d'apprentissage", "L'Apprenti(e)"], names: [f.formateur, s.prenom + " " + s.nom] } });
}

export function genFicheLiaisonCFAEntreprise(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE DE LIAISON CFA / ENTREPRISE", subtitle: f.intitule, table: {
    headers: ["Date", "Objet", "Interlocuteur CFA", "Interlocuteur Entreprise", "Suite donnée"],
    rows: [
      ["15/09/2024", "Présentation du parcours", o.responsablePedagogique, "RH entreprise", "Convention signée"],
      ["15/11/2024", "1ère visite en entreprise", o.responsablePedagogique, "Maître d'apprentissage", "RAS – Bonne intégration"],
      ["15/02/2025", "2ème visite – point mi-parcours", o.responsablePedagogique, "Maître d'apprentissage", "Progression satisfaisante"],
      ["15/05/2025", "Préparation examen", o.responsablePedagogique, "Maître d'apprentissage", "Évaluation finale planifiée"],
    ]
  } });
}

export function genAttestationPresenceCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = stagiaires.slice(0, 10).map(s => `
    <div class="section"><p>Je soussigné, <strong>${o.dirigeant}</strong>, directeur du CFA ${o.nom}, atteste que <strong>${s.prenom} ${s.nom}</strong>, apprenti(e) dans l'entreprise <strong>${s.entreprise}</strong>, a été présent(e) aux cours du CFA pour la période du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}.</p>
    <p><strong>Taux de présence au CFA :</strong> 95%</p>
    <p>Fait à ${o.ville}, le ${formatDate(f.dateFin)}</p></div><div class="page-break"></div>`).join("");
  return buildDocument({ org: o, title: "ATTESTATION DE PRÉSENCE – CFA", subtitle: f.intitule, extraHtml: extra });
}

export function genAttestationFinParcours(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [8, 8, 8, 8, 8];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    return `<div class="section" style="text-align:center;padding:25px"><h2>ATTESTATION DE FIN DE PARCOURS</h2><p style="font-size:15px;margin:15px 0"><strong>${s.prenom} ${s.nom}</strong></p><p>a achevé avec succès le parcours d'apprentissage</p><p style="font-size:14px;font-weight:700;color:#1e3a7b">${f.intitule}</p><p>Note moyenne : <strong>${avg}/10</strong><br>Certification : ${avg >= 7 ? "✅ Obtenue" : "⚠️ En cours de validation"}</p><p style="margin-top:15px">Fait à ${o.ville}, le ${formatDate(f.dateFin)}</p></div><div class="page-break"></div>`;
  }).join("");
  return buildDocument({ org: o, title: "ATTESTATIONS DE FIN DE PARCOURS", subtitle: f.intitule, extraHtml: extra });
}

// ========== B. DOCUMENTS PÉDAGOGIQUES CFA ==========

export function genPositionnementInitialApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    return [s.prenom + " " + s.nom, s.entreprise, `${avg}/10`, avg >= 8 ? "Avancé" : avg >= 6 ? "Intermédiaire" : "Débutant", evalData.appreciations[i]?.split('.')[0] + '.' || ""];
  });
  return buildDocument({ org: o, title: "POSITIONNEMENT INITIAL DES APPRENTIS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, table: {
    headers: ["Apprenti(e)", "Entreprise", "Score", "Niveau", "Observations"], rows
  } });
}

export function genEntretienPositionnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = "";
  stagiaires.slice(0, 5).forEach(s => {
    extra += `<div class="section"><h3>Entretien – ${s.prenom} ${s.nom}</h3>
      <p><strong>Entreprise :</strong> ${s.entreprise} | <strong>Poste :</strong> ${s.poste}</p>
      <p><strong>Parcours antérieur :</strong> Diplôme ${s.poste ? 'en lien avec le poste actuel' : 'à préciser'}</p>
      <p><strong>Motivations :</strong> Développer des compétences professionnelles en alternance</p>
      <p><strong>Besoins identifiés :</strong> Renforcement des bases théoriques, accompagnement pratique</p>
      <p><strong>Aménagements nécessaires :</strong> ${s.entreprise ? "Aucun" : "À évaluer"}</p>
    </div>`;
  });
  return buildDocument({ org: o, title: "ENTRETIENS DE POSITIONNEMENT", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
}

export function genAnalyseBesoinsApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  return buildDocument({ org: o, title: "ANALYSE DES BESOINS – APPRENTIS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, sections: [
    { heading: "Méthodologie", content: `<p>L'analyse des besoins des ${Math.min(stagiaires.length, 10)} apprentis a été réalisée via :<br>• Entretiens individuels de positionnement<br>• Questionnaire en ligne<br>• Échange avec les maîtres d'apprentissage<br>• Tests de niveau</p>` },
    { heading: "Besoins identifiés", content: "<p>• 70% souhaitent un accompagnement renforcé en entreprise<br>• 60% ont besoin de consolider les bases théoriques<br>• 40% demandent un suivi personnalisé<br>• 20% nécessitent des aménagements spécifiques</p>" },
    { heading: "Plan de formation individualisé", content: "<p>Chaque apprenti bénéficie d'un plan de formation individualisé intégrant :<br>• Les compétences à acquérir au CFA<br>• Les missions en entreprise<br>• Les modalités d'évaluation<br>• Le calendrier d'alternance adapté</p>", variant: "green" },
  ] });
}

export function genPlanIndividuelFormation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = "";
  stagiaires.slice(0, 5).forEach((s, i) => {
    extra += `<div class="page-break"></div><h2>Plan individuel – ${s.prenom} ${s.nom}</h2>
      <div class="section"><p><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Maître d'apprentissage :</strong> ${f.formateur}<br><strong>Formateur référent :</strong> ${o.responsablePedagogique}</p></div>`;
    extra += tableHTML(["Compétence", "CFA", "Entreprise", "Échéance", "Statut"], [
      ["Compétence 1 – Fondamentaux", "Module théorique", "Observation + pratique guidée", "T1", i < 3 ? "✅" : "🔄"],
      ["Compétence 2 – Spécialisation", "Module avancé", "Mission autonome", "T2", i < 2 ? "✅" : "🔄"],
      ["Compétence 3 – Projet", "Projet tutoré", "Projet en entreprise", "T3", "🔄"],
      ["Compétence 4 – Certification", "Préparation examen", "Mise en situation professionnelle", "T4", "📋"],
    ]);
  });
  return buildDocument({ org: o, title: "PLANS INDIVIDUELS DE FORMATION", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
}

export function genProgressionPedagogique(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PROGRESSION PÉDAGOGIQUE", subtitle: f.intitule, table: {
    headers: ["Période", "Module CFA", "Objectifs", "Évaluation", "Lien entreprise"],
    rows: [
      ["Sept-Oct", "Module 1 – Fondamentaux", "Acquérir les bases théoriques", "QCM positionnement", "Observation en entreprise"],
      ["Nov-Déc", "Module 2 – Approfondissement", "Maîtriser les techniques essentielles", "Exercices pratiques", "Pratique guidée"],
      ["Jan-Fév", "Module 3 – Spécialisation", "Développer une expertise métier", "Cas pratiques", "Missions autonomes"],
      ["Mars-Avr", "Module 4 – Projet", "Réaliser un projet complet", "Soutenance projet", "Projet en entreprise"],
      ["Mai-Juin", "Module 5 – Certification", "Préparer et réussir l'examen", "Examen blanc + final", "Bilan de compétences"],
    ]
  } });
}

export function genDeroulePedagogiqueCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "DÉROULÉ PÉDAGOGIQUE – CFA", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Semestre 1", content: `<p><strong>Module 1 :</strong> ${f.programme.split("\n")[0] || "Fondamentaux"}<br><strong>Module 2 :</strong> ${f.programme.split("\n")[1] || "Approfondissement"}<br><strong>Évaluation :</strong> Contrôle continu + examen de mi-parcours</p>` },
    { heading: "Semestre 2", content: `<p><strong>Module 3 :</strong> ${f.programme.split("\n")[2] || "Spécialisation"}<br><strong>Module 4 :</strong> ${f.programme.split("\n")[3] || "Projet professionnel"}<br><strong>Évaluation :</strong> Soutenance de projet + examen final</p>` },
    { heading: "Méthodes pédagogiques", content: "<p>• Cours magistraux et travaux dirigés (30%)<br>• Travaux pratiques et ateliers (40%)<br>• Projets tutorés (20%)<br>• Accompagnement individualisé (10%)</p>", variant: "green" },
  ] });
}

export function genGrilleSuiviCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    return [s.prenom + " " + s.nom, ...evalData.competences.map((_, ci) => {
      const v = Math.min(10, sc[ci % sc.length] + 1);
      return v >= 8 ? "✅" : v >= 6 ? "🔄" : "❌";
    })];
  });
  return buildDocument({ org: o, title: "GRILLE DE SUIVI DES COMPÉTENCES", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", ...evalData.competences.map((_, i) => `C${i+1}`)], rows
  }, sections: [{ heading: "Légende", content: evalData.competences.map((c, i) => `<p><strong>C${i+1} :</strong> ${c}</p>`).join("") }] });
}

export function genCarnetLiaison(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" };
  return buildDocument({ org: o, title: "CARNET DE LIAISON", subtitle: `${s.prenom} ${s.nom} – ${f.intitule}`, sections: [
    { heading: "Apprenti(e)", content: `<p><strong>Nom :</strong> ${s.prenom} ${s.nom}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Formation :</strong> ${f.intitule}</p>` },
  ], table: {
    headers: ["Semaine", "Activités CFA", "Activités Entreprise", "Observations MA", "Signature"],
    rows: Array.from({length: 8}, (_, i) => [`S${i+1}`, `Module ${Math.floor(i/2)+1}`, "Missions en cours", i < 4 ? "Bonne progression" : "Autonomie en développement", `Signé`])
  } });
}

export function genCompteRenduVisiteEntreprise(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" };
  return buildDocument({ org: o, title: "COMPTE-RENDU DE VISITE EN ENTREPRISE", subtitle: `${s.prenom} ${s.nom} – ${s.entreprise}`, sections: [
    { heading: "Informations", content: `<p><strong>Date de visite :</strong> ${formatDate(f.dateDebut)}<br><strong>Apprenti(e) :</strong> ${s.prenom} ${s.nom}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Maître d'apprentissage :</strong> ${f.formateur}<br><strong>Visiteur CFA :</strong> ${o.responsablePedagogique}</p>` },
    { heading: "Intégration dans l'entreprise", content: "<p>☑ Bonne intégration dans l'équipe<br>☑ Missions en adéquation avec la formation<br>☑ Maître d'apprentissage disponible et impliqué<br>☑ Conditions de travail satisfaisantes</p>", variant: "green" },
    { heading: "Progression des compétences", content: "<p>• Compétences techniques : En bonne voie d'acquisition<br>• Autonomie : En progression<br>• Communication : Satisfaisante<br>• Initiative : À développer</p>" },
    { heading: "Points d'attention", content: "<p>Aucun point bloquant identifié. L'apprenti est encouragé à prendre davantage d'initiative.</p>" },
  ], signatures: { type: "3", names: [s.prenom + " " + s.nom, f.formateur] } });
}

export function genBilanIntermediaireApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = "";
  stagiaires.slice(0, 10).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.map(v => Math.min(10, v + 1)).reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    extra += `<div class="section"><h3>${s.prenom} ${s.nom} – ${s.entreprise}</h3>
      <p><strong>Note intermédiaire :</strong> ${avg}/10<br><strong>Assiduité CFA :</strong> ${95 + (i % 5)}%<br><strong>Appréciation MA :</strong> ${avg >= 8 ? "Très satisfaisant" : avg >= 6 ? "Satisfaisant" : "En progression"}<br><strong>Appréciation CFA :</strong> ${avg >= 8 ? "Excellent parcours" : "Bonne progression"}</p></div>`;
  });
  return buildDocument({ org: o, title: "BILANS INTERMÉDIAIRES DES APPRENTIS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
}

export function genBilanFinalApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = "";
  stagiaires.slice(0, 10).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.map(v => Math.min(10, v + 2)).reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    extra += `<div class="section"><h3>${s.prenom} ${s.nom}</h3>
      <p><strong>Note finale :</strong> ${avg}/10<br><strong>Certification :</strong> ${avg >= 7 ? "✅ Obtenue" : "⚠️ À repasser"}<br><strong>Bilan entreprise :</strong> ${avg >= 8 ? "Proposition d'embauche" : "Expérience concluante"}<br><strong>Poursuite :</strong> ${avg >= 8 ? "Poursuite d'études envisagée" : "Insertion professionnelle"}</p></div>`;
  });
  return buildDocument({ org: o, title: "BILANS FINAUX DES APPRENTIS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Coordinateur CFA", "Le Directeur"], names: [o.responsablePedagogique, o.dirigeant] } });
}

export function genEvaluationAcquisCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const finalSc = sc.map(v => Math.min(10, v + 2));
    const avg = Math.round(finalSc.reduce((a, b) => a + b, 0) / finalSc.length * 10) / 10;
    return [s.prenom + " " + s.nom, ...evalData.competences.map((_, ci) => `${finalSc[ci % finalSc.length]}/10`), `${avg}/10`, avg >= 7 ? "✅" : "⚠️"];
  });
  return buildDocument({ org: o, title: "ÉVALUATION DES ACQUIS – CFA", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", ...evalData.competences.map((_, i) => `C${i+1}`), "Moyenne", "Validé"], rows
  } });
}

export function genGrilleValidationCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const competences = ["Compétence métier 1", "Compétence métier 2", "Compétence transversale", "Autonomie", "Communication pro"];
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    return [s.prenom + " " + s.nom, ...competences.map((_, ci) => {
      const v = Math.min(10, sc[ci % sc.length] + 2);
      return v >= 8 ? "✅ Validé" : v >= 6 ? "🔄 En cours" : "❌ Non validé";
    })];
  });
  return buildDocument({ org: o, title: "GRILLE DE VALIDATION DES COMPÉTENCES", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", ...competences], rows
  } });
}

export function genSupportCoursCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "SUPPORTS DE COURS – CFA", subtitle: f.intitule, sections: [
    { heading: "Supports fournis", content: "<p>• Manuels de formation (papier et numérique)<br>• Fiches de synthèse par module<br>• Exercices et cas pratiques<br>• Vidéos tutorielles<br>• Accès plateforme LMS</p>" },
    { heading: "Ressources complémentaires", content: `<p>• Plateforme : ${o.outilsUtilises}<br>• Bibliothèque numérique<br>• Annales d'examens<br>• Forum d'échange entre apprentis</p>`, variant: "green" },
  ] });
}

export function genGrilleAccompagnementIndividualise(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const rows = stagiaires.slice(0, 10).map((s, i) => [
    s.prenom + " " + s.nom, s.entreprise,
    i % 3 === 0 ? "Soutien scolaire" : i % 3 === 1 ? "Méthodologie" : "Aucun",
    `${2 + (i % 3)}h/mois`, i < 7 ? "✅ En place" : "📋 Planifié"
  ]);
  return buildDocument({ org: o, title: "GRILLE D'ACCOMPAGNEMENT INDIVIDUALISÉ", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", "Entreprise", "Type d'accompagnement", "Fréquence", "Statut"], rows
  } });
}

// ========== C. DOCUMENTS QUALITÉ CFA ==========

export function genSatisfactionApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = "";
  const criteres = ["Accueil au CFA", "Qualité des cours", "Lien CFA/Entreprise", "Accompagnement", "Supports", "Préparation examen"];
  stagiaires.slice(0, 8).forEach((s, si) => {
    const scores = criteres.map((_, ci) => 4 + ((si + ci) % 2));
    extra += `<h3>${s.prenom} ${s.nom}</h3>` + tableHTML(["Critère", "Note /5"], criteres.map((c, i) => [c, `${scores[i]}/5`]));
  });
  return buildDocument({ org: o, title: "QUESTIONNAIRE SATISFACTION APPRENTI", subtitle: f.intitule, extraHtml: extra,
    sections: [{ heading: "Moyenne", content: "<p><strong>Satisfaction apprentis : 4.6/5 (92%)</strong></p>", variant: "green" }] });
}

export function genSatisfactionEntrepriseCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "QUESTIONNAIRE SATISFACTION ENTREPRISE – CFA", subtitle: f.intitule, table: {
    headers: ["Critère", "Note /5"],
    rows: [
      ["Qualité de la coordination CFA/entreprise", "4.5/5"],
      ["Compétences acquises par l'apprenti", "4.3/5"],
      ["Disponibilité du formateur référent", "4.7/5"],
      ["Qualité des visites en entreprise", "4.4/5"],
      ["Adéquation formation/besoins métier", "4.6/5"],
      ["Satisfaction globale", "4.5/5"],
    ]
  } });
}

export function genSatisfactionFormateurCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "QUESTIONNAIRE SATISFACTION FORMATEUR – CFA", table: {
    headers: ["Critère", "Note /5"],
    rows: [
      ["Conditions de travail", "4.5/5"], ["Moyens pédagogiques", "4.3/5"], ["Accompagnement direction", "4.7/5"],
      ["Relations avec les entreprises", "4.4/5"], ["Niveau des apprentis", "4.2/5"], ["Satisfaction globale", "4.5/5"],
    ]
  } });
}

export function genTableauSuiviRuptures(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DES RUPTURES – CFA", table: {
    headers: ["N°", "Apprenti", "Entreprise", "Date rupture", "Motif", "Action", "Issue"],
    rows: [
      ["1", "Anonymisé A.", "Entreprise X", "15/11/2024", "Difficultés relationnelles", "Médiation + recherche nouvelle entreprise", "✅ Nouveau contrat signé"],
      ["2", "Anonymisé B.", "Entreprise Y", "20/01/2025", "Réorientation", "Accompagnement projet professionnel", "✅ Réorientation vers formation adaptée"],
    ]
  }, sections: [{ heading: "Bilan", content: "<p>Taux de rupture : 3% (2 ruptures sur 65 contrats)<br>100% des apprentis ont été accompagnés suite à la rupture.</p>", variant: "green" }] });
}

export function genTableauSuiviInsertion(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DE L'INSERTION PROFESSIONNELLE", table: {
    headers: ["Promotion", "Nb diplômés", "Emploi 3 mois", "Emploi 6 mois", "Poursuite études", "Recherche"],
    rows: [
      ["2022", "58", "42 (72%)", "50 (86%)", "5 (9%)", "3 (5%)"],
      ["2023", "62", "48 (77%)", "55 (89%)", "4 (6%)", "3 (5%)"],
      ["2024", "65", "52 (80%)", "58 (89%)", "4 (6%)", "3 (5%)"],
    ]
  }, sections: [{ heading: "Synthèse", content: "<p><strong>Taux d'insertion à 6 mois : 89%</strong><br>En progression constante depuis 3 ans.</p>", variant: "green" }] });
}

export function genTableauSuiviAssiduite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const rows = stagiaires.slice(0, 10).map((s, i) => [s.prenom + " " + s.nom, s.entreprise, `${95 + (i % 5)}%`, `${i % 10 < 8 ? 0 : 1}`, `${i % 10 < 7 ? 0 : 1}`, i < 8 ? "✅ Bon" : "⚠️ À suivre"]);
  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DE L'ASSIDUITÉ – CFA", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", "Entreprise", "Taux présence", "Abs justifiées", "Abs injustifiées", "Statut"], rows
  } });
}

export function genTableauSuiviAccompagnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const rows = stagiaires.slice(0, 10).map((s, i) => [s.prenom + " " + s.nom, i % 3 === 0 ? "Renforcé" : "Standard", `${1 + (i % 3)} visites`, i < 7 ? "✅" : "🔄", ""]);
  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DE L'ACCOMPAGNEMENT", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", "Niveau accompagnement", "Visites réalisées", "Objectif atteint", "Remarques"], rows
  } });
}

export function genRegistreReclamationsCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "REGISTRE DES RÉCLAMATIONS – CFA", table: {
    headers: ["N°", "Date", "Émetteur", "Type", "Objet", "Traitement", "Délai", "Statut"],
    rows: [
      ["1", "10/10/2024", "Apprenti", "Pédagogie", "Rythme trop rapide module 3", "Ajout séances de soutien", "72h", "✅"],
      ["2", "15/11/2024", "Entreprise", "Organisation", "Planning alternance modifié tardivement", "Communication anticipée", "48h", "✅"],
      ["3", "20/01/2025", "Parent", "Information", "Manque d'information sur les examens", "Envoi calendrier + réunion parents", "24h", "✅"],
    ]
  }, sections: [{ heading: "Bilan", content: "<p>3 réclamations – 100% traitées sous 72h.</p>", variant: "green" }] });
}

export function genPlanAmeliorationCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PLAN D'AMÉLIORATION CONTINUE – CFA", table: {
    headers: ["N°", "Action", "Origine", "Responsable", "Échéance", "Statut"],
    rows: [
      ["1", "Renforcer la coordination CFA/entreprise", "Enquête entreprises", o.responsablePedagogique, "T2 2025", "🔄 En cours"],
      ["2", "Créer un portail maître d'apprentissage", "Retours MA", "Service IT", "T3 2025", "📋 Planifié"],
      ["3", "Développer le soutien scolaire", "Analyse résultats", o.responsablePedagogique, "T1 2025", "✅ Fait"],
      ["4", "Améliorer le suivi des ruptures", "Analyse qualité", o.referentQualite, "T2 2025", "🔄 En cours"],
    ]
  } });
}

export function genSyntheseQualiteCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "SYNTHÈSE QUALITÉ – CFA 2024", sections: [
    { heading: "Indicateurs clés", content: "<p>✅ Taux de réussite : 92% (objectif 85%)<br>✅ Satisfaction apprentis : 92% (objectif 85%)<br>✅ Satisfaction entreprises : 90% (objectif 85%)<br>✅ Taux d'insertion : 89% (objectif 80%)<br>✅ Taux de rupture : 3% (objectif ≤5%)</p>", variant: "green" },
    { heading: "Points forts", content: "<p>• Qualité de l'accompagnement individualisé<br>• Relations solides avec les entreprises<br>• Taux de réussite en progression</p>" },
    { heading: "Axes d'amélioration 2025", content: "<p>• Digitalisation du carnet de liaison<br>• Renforcement des visites en entreprise<br>• Développement des partenariats</p>" },
  ] });
}

export function genTableauIndicateursCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "TABLEAU DES INDICATEURS – CFA", table: {
    headers: ["Indicateur", "2022", "2023", "2024", "Objectif", "Tendance"],
    rows: [
      ["Taux de réussite", "88%", "90%", "92%", "≥ 85%", "↗ En hausse"],
      ["Taux d'insertion (6 mois)", "86%", "88%", "89%", "≥ 80%", "↗ En hausse"],
      ["Satisfaction apprentis", "88%", "90%", "92%", "≥ 85%", "↗ En hausse"],
      ["Satisfaction entreprises", "85%", "88%", "90%", "≥ 85%", "↗ En hausse"],
      ["Taux de rupture", "5%", "4%", "3%", "≤ 5%", "↘ En baisse"],
      ["Nb apprentis", "180", "220", "250", "≥ 200", "↗ En hausse"],
      ["Nb entreprises partenaires", "90", "105", "120", "≥ 100", "↗ En hausse"],
    ]
  } });
}

// ========== D. PREUVES CFA ==========

export function genPreuveCoordinationCFAEntreprise(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – COORDINATION CFA / ENTREPRISE", sections: [
    { heading: "Dispositif de coordination", content: "<p>• Convention de partenariat signée avec chaque entreprise<br>• 2 visites de suivi en entreprise par an minimum<br>• Carnet de liaison partagé (papier ou numérique)<br>• Réunion annuelle CFA/entreprises<br>• Contact régulier avec les maîtres d'apprentissage</p>" },
    { heading: "Preuves", content: "<p>☑ Conventions de partenariat signées<br>☑ Comptes-rendus de visite en entreprise<br>☑ Carnets de liaison remplis<br>☑ CR réunion annuelle CFA/entreprises<br>☑ Emails et échanges tracés dans le CRM</p>", variant: "green" },
  ] });
}

export function genPreuveAccompagnementApprenti(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – ACCOMPAGNEMENT DE L'APPRENTI", sections: [
    { heading: "Dispositif", content: "<p>• Formateur référent désigné pour chaque apprenti<br>• Entretiens individuels mensuels<br>• Bilans intermédiaire et final<br>• Soutien scolaire sur demande<br>• Accompagnement socio-professionnel</p>" },
    { heading: "Preuves", content: "<p>☑ Plans individuels de formation<br>☑ Fiches d'entretien individuelles<br>☑ Bilans intermédiaires et finaux<br>☑ Grille d'accompagnement individualisé<br>☑ Attestations de soutien scolaire</p>", variant: "green" },
  ] });
}

export function genPreuveIndividualisationParcours(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – INDIVIDUALISATION DES PARCOURS", sections: [
    { heading: "Démarche", content: "<p>Chaque apprenti bénéficie d'un parcours individualisé basé sur :<br>• Le positionnement initial<br>• L'analyse des besoins<br>• Les missions en entreprise<br>• Le rythme d'apprentissage</p>" },
    { heading: "Preuves", content: "<p>☑ Tests de positionnement remplis<br>☑ Plans individuels de formation<br>☑ Grilles de suivi des compétences adaptées<br>☑ Supports différenciés par niveau<br>☑ Carnets de liaison personnalisés</p>", variant: "green" },
  ] });
}

export function genPreuveSuiviCompetencesCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – SUIVI DES COMPÉTENCES", sections: [
    { heading: "Dispositif", content: "<p>Le suivi des compétences est assuré par :<br>• Grille de compétences par apprenti (CFA + entreprise)<br>• Évaluations régulières (contrôle continu)<br>• Bilans avec le maître d'apprentissage<br>• Grille de validation des compétences</p>" },
    { heading: "Preuves", content: "<p>☑ Grilles de suivi des compétences remplies<br>☑ Grilles de validation signées<br>☑ Résultats aux évaluations<br>☑ Comptes-rendus de visite en entreprise</p>", variant: "green" },
  ] });
}

export function genPreuveGestionAbsencesCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – GESTION DES ABSENCES", sections: [
    { heading: "Procédure", content: "<p>• Appel réalisé à chaque demi-journée<br>• Absence signalée à l'entreprise sous 24h<br>• Justificatif demandé sous 48h<br>• 3 absences injustifiées → convocation de l'apprenti</p>" },
    { heading: "Preuves", content: "<p>☑ Tableaux d'assiduité par formation<br>☑ Courriers d'alerte aux employeurs<br>☑ Convocations d'apprentis<br>☑ Justificatifs archivés</p>", variant: "green" },
  ] });
}

export function genPreuveGestionRuptures(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – GESTION DES RUPTURES DE CONTRAT", sections: [
    { heading: "Preuves", content: "<p>☑ Tableau de suivi des ruptures<br>☑ Entretiens post-rupture réalisés<br>☑ Recherche de nouvelles entreprises<br>☑ Accompagnement documenté<br>☑ Analyse annuelle des causes</p>", variant: "green" },
  ] });
}

export function genPreuveInsertionProfessionnelle(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – INSERTION PROFESSIONNELLE", sections: [
    { heading: "Enquête", content: "<p>Enquête réalisée à 3 mois et 6 mois après l'obtention de la certification.</p>" },
    { heading: "Résultats 2024", content: "<p>• Taux d'insertion à 6 mois : 89%<br>• Dont CDI : 45%<br>• Dont CDD : 25%<br>• Poursuite d'études : 19%<br>• En recherche : 11%</p>", variant: "green" },
    { heading: "Preuves", content: "<p>☑ Questionnaires d'insertion remplis<br>☑ Tableau de suivi de l'insertion<br>☑ Base de données des anciens apprentis</p>" },
  ] });
}

export function genPreuveRelationEntreprise(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – RELATION AVEC LES ENTREPRISES", sections: [
    { heading: "Preuves", content: "<p>☑ 120 conventions de partenariat actives<br>☑ Comptes-rendus de visite en entreprise<br>☑ Enquêtes de satisfaction entreprise (90%)<br>☑ Fiches de liaison CFA/entreprise<br>☑ CR réunion annuelle entreprises</p>", variant: "green" },
  ] });
}

export function genPreuveAccessibiliteHandicapCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – ACCESSIBILITÉ HANDICAP CFA", sections: [
    { heading: "Référent", content: `<p>${o.referentHandicap} – ${o.email}</p>` },
    { heading: "Preuves", content: "<p>☑ Charte handicap CFA signée<br>☑ 6 apprentis en situation de handicap accueillis en 2024<br>☑ Aménagements mis en place (1/3 temps, supports adaptés)<br>☑ Partenariats Agefiph, MDPH, Cap Emploi<br>☑ Formation du référent handicap à jour</p>", variant: "green" },
  ] });
}

export function genPreuveQualificationIntervenantsCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – QUALIFICATION DES INTERVENANTS CFA", sections: [
    { heading: "Preuves", content: "<p>☑ CV à jour de tous les formateurs<br>☑ Copies des diplômes archivées<br>☑ Fiches de compétences validées<br>☑ Évaluations annuelles réalisées<br>☑ Plan de formation continue des formateurs<br>☑ Habilitations spécifiques vérifiées</p>", variant: "green" },
  ] });
}

export function genPreuveVeilleAmeliorationCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – VEILLE ET AMÉLIORATION CONTINUE CFA", sections: [
    { heading: "Veille", content: "<p>☑ Tableaux de veille trimestriels (réglementaire, métier, pédagogique)<br>☑ CR réunions de veille<br>☑ Fiches innovation<br>☑ Participation aux réseaux professionnels</p>" },
    { heading: "Amélioration continue", content: "<p>☑ Plan d'amélioration CFA<br>☑ Synthèse qualité CFA<br>☑ Tableau des indicateurs CFA<br>☑ Actions correctives mises en place</p>", variant: "green" },
  ] });
}
