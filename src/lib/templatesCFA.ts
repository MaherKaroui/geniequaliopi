// CFA (Centre de Formation d'Apprentis) template generators
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML, signatureBlock2, signatureBlock3, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireDuree, isFormationTerminee, getFormationProgress, getPassedFormationDays, subtractBusinessDays } from "./docBuilder";
import { EVAL_SCORES, getFormationDays } from "./sampleData";
import { getEvalContent } from "./evalContent";

const apprentiLabel = (s: StagiaireInfo) => `${s.prenom} ${s.nom}`;

// ========== A. DOCUMENTS ADMINISTRATIFS CFA ==========

export function genOrganigrammeCFA(o: OrganismeInfo) {
  const ped = o.responsablePedagogique || o.dirigeant;
  const qual = o.referentQualite || o.dirigeant;
  const admin = o.poleAdministratif || o.dirigeant;
  const handi = o.referentHandicap || o.dirigeant;
  const mob = o.referentMobilite?.trim() ? o.referentMobilite : "Prestataire externe – Mobi'Jeunes / Erasmus+ France";
  const relEnt = o.relationEntreprises?.trim() ? o.relationEntreprises : o.dirigeant;
  const decro = o.referentDecrochage?.trim() ? o.referentDecrochage : (o.responsablePedagogique || o.dirigeant);
  const coord = o.coordinateurPedagogique?.trim() ? o.coordinateurPedagogique : (o.responsablePedagogique || o.dirigeant);
  const conseil = o.conseillerFormation?.trim() ? o.conseillerFormation : (o.relationEntreprises || o.dirigeant);
  const num = o.referentNumerique?.trim() ? o.referentNumerique : (o.responsablePedagogique || o.dirigeant);

  const box = (titre: string, nom: string, soustitre?: string) => `
    <td style="width:33.33%;padding:10px;vertical-align:top;text-align:center;border:none">
      <div style="background:#e8f0fb;border-radius:14px;padding:18px 14px;min-height:110px;display:flex;flex-direction:column;justify-content:center;border:1px solid #d6e4f5">
        <div style="color:#1e3a7b;font-weight:bold;font-size:14px;line-height:1.3">${titre}</div>
        <div style="color:#1e3a7b;font-size:13px;margin-top:6px">${nom}</div>
        ${soustitre ? `<div style="color:#5a6d8a;font-style:italic;font-size:11px;margin-top:4px">${soustitre}</div>` : ""}
      </div>
    </td>`;

  return buildDocument({ org: o, title: "ORGANIGRAMME DE L'ORGANISME", subtitle: o.nom, extraHtml: `
    <div style="text-align:center;margin:30px 0 35px 0">
      <div style="background:#1e3a7b;color:white;padding:16px 50px;border-radius:10px;display:inline-block;min-width:280px">
        <div style="font-size:15px;font-weight:bold">Direction Générale</div>
        <div style="font-size:13px;margin-top:6px;font-weight:normal">${o.dirigeant}</div>
      </div>
    </div>

    <table style="width:100%;border-collapse:separate;border-spacing:0;margin-bottom:6px">
      <tr>
        ${box("Pôle Pédagogique", ped, "Formateurs et programmes")}
        ${box("Coordinateur Pédagogique", coord, "Suivi et planification")}
        ${box("Référent Numérique", num, "Outils LMS / distanciel")}
      </tr>
    </table>

    <table style="width:100%;border-collapse:separate;border-spacing:0;margin-bottom:6px">
      <tr>
        ${box("Pôle Qualité", qual, "Amélioration continue")}
        ${box("Pôle Handicap", handi, "Accessibilité")}
        ${box("Référent Décrochage", decro, "Lutte contre l'abandon")}
      </tr>
    </table>

    <table style="width:100%;border-collapse:separate;border-spacing:0;margin-bottom:6px">
      <tr>
        ${box("Pôle Relation Entreprises", relEnt, "Partenariats – Insertion")}
        ${box("Conseiller en Formation", conseil, "Orientation et inscription")}
        ${box("Pôle Administratif", admin, "Inscriptions, facturation")}
      </tr>
    </table>

    <table style="width:100%;border-collapse:separate;border-spacing:0">
      <tr>
        <td style="width:33.33%"></td>
        ${box("Référent Mobilité<br>nationale et internationale", mob, "Mission externalisée")}
        <td style="width:33.33%"></td>
      </tr>
    </table>
  ` });
}

export function genLivretAccueilApprenti(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "LIVRET D'ACCUEIL DE L'APPRENTI", subtitle: f.intitule, sections: [
    { heading: "Bienvenue au CFA !", content: `<p>Nous sommes heureux de vous accueillir en tant qu'apprenti(e) pour la formation « ${f.intitule} ». Ce livret contient toutes les informations nécessaires au bon déroulement de votre parcours d'alternance.</p>` },
    { heading: "Vos contacts", content: `<p><strong>Direction :</strong> ${o.dirigeant}<br><strong>Coord. pédagogique :</strong> ${o.responsablePedagogique}<br><strong>Référent handicap :</strong> ${o.referentHandicap}<br><strong>Référent qualité :</strong> ${o.referentQualite}<br>${o.telephone?.trim() ? `<strong>Tél :</strong> ${o.telephone} | ` : ""}<strong>Email :</strong> ${o.email}</p>` },
    { heading: "Votre alternance", content: `<p><strong>Rythme :</strong> ${f.rythmeAlternance?.trim() || "Selon calendrier d'alternance remis à l'inscription"}<br><strong>Durée :</strong> À définir selon le groupe<br><strong>Lieu CFA :</strong> ${f.lieu}<br><strong>Horaires :</strong> 8h30-12h30 / 13h30-16h30</p>` },
    { heading: "Vos droits et devoirs", content: "<p>• Suivre avec assiduité la formation au CFA et en entreprise<br>• Respecter le règlement intérieur<br>• Tenir à jour votre carnet de liaison<br>• Prévenir en cas d'absence (CFA ET entreprise)<br>• Participer aux évaluations et examens</p>" },
    { heading: "Aides et accompagnement", content: "<p>• Aide au premier équipement<br>• Aide à la mobilité<br>• Accompagnement social (logement, santé)<br>• Soutien scolaire individualisé</p>", variant: "green" },
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
    { heading: "Référent handicap", content: `<p>${o.referentHandicap} – ${o.email} ${o.telephone?.trim() ? `– ${o.telephone}` : ""}</p>` },
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
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" } as StagiaireInfo;
  return buildDocument({ org: o, title: "CONVENTION PÉDAGOGIQUE CFA / ENTREPRISE", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, sections: [
    { heading: "Entre", content: `<p><strong>Le CFA :</strong> ${o.nom}<br>Représenté par : ${o.dirigeant}<br><br><strong>L'entreprise :</strong> ${s.entreprise}<br><strong>L'apprenti(e) :</strong> ${s.prenom} ${s.nom}</p>` },
    { heading: "Objet", content: `<p>La présente convention définit les modalités de mise en œuvre de la formation « ${f.intitule} » en alternance.</p>` },
    { heading: "Rythme d'alternance", content: `<p>${f.rythmeAlternance?.trim() || "Selon calendrier d'alternance défini en début de formation"}<br>Période : du ${formatDate(getStagiaireDateDebut(s as StagiaireInfo, f))} au ${formatDate(getStagiaireDateFin(s as StagiaireInfo, f))}<br>Durée totale : ${getStagiaireDuree(s as StagiaireInfo, f)}</p>` },
    { heading: "Engagements du CFA", content: "<p>• Assurer la formation théorique selon le programme<br>• Désigner un formateur référent<br>• Réaliser les visites en entreprise<br>• Informer l'entreprise de l'assiduité de l'apprenti<br>• Préparer l'apprenti à la certification</p>" },
    { heading: "Engagements de l'entreprise", content: "<p>• Confier à l'apprenti des missions en lien avec la formation<br>• Désigner un maître d'apprentissage<br>• Libérer l'apprenti pour les jours de CFA<br>• Participer au suivi et à l'évaluation<br>• Remplir le carnet de liaison</p>" },
  ], signatures: { type: "3", names: [s.prenom + " " + s.nom, ""] } });
}

export function genPlanningAlternance(o: OrganismeInfo, f: FormationInfo) {
  const debut = f.dateDebut ? new Date(f.dateDebut.split('/').reverse().join('-')) : new Date();
  const rows = [];
  for (let m = 0; m < 12; m++) {
    const d = new Date(debut.getFullYear(), debut.getMonth() + m, 1);
    const mois = d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    const now = new Date();
    const isPast = d < now;
    const termine = isFormationTerminee(f);
    rows.push([mois.charAt(0).toUpperCase() + mois.slice(1), "Sem 1-2 : Entreprise", "Sem 3 : CFA", "Sem 4 : Entreprise", m === 5 ? "Bilan intermédiaire" : m === 11 ? "Examen final" : ""]);
  }
  return buildDocument({ org: o, title: "PLANNING D'ALTERNANCE", subtitle: f.intitule, table: {
    headers: ["Mois", "Période 1", "Période 2", "Période 3", "Événement"], rows
  } });
}

export function genCalendrierCFA(o: OrganismeInfo, f: FormationInfo) {
  const debut = f.dateDebut ? new Date(f.dateDebut.split('/').reverse().join('-')) : new Date();
  const year = debut.getFullYear();
  const moisDebut = debut.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  return buildDocument({ org: o, title: `CALENDRIER DU CFA – ANNÉE ${year}`, table: {
    headers: ["Période", "Événement", "Date", "Participants"],
    rows: [
      ["Rentrée", "Journée d'intégration", formatDate(f.dateDebut), "Tous les apprentis"],
      ["T1", "Conseil de classe", `${new Date(year, debut.getMonth() + 2, 15).toLocaleDateString('fr-FR')}`, "Formateurs + direction"],
      ["T1", "Visite entreprise 1", `${new Date(year, debut.getMonth() + 1, 1).toLocaleDateString('fr-FR', { month: 'long' })} ${year}`, "Formateurs référents"],
      ["T2", "Examens blancs", `${new Date(year, debut.getMonth() + 4, 15).toLocaleDateString('fr-FR')}`, "Tous les apprentis"],
      ["T2", "Conseil de classe", `${new Date(year, debut.getMonth() + 5, 7).toLocaleDateString('fr-FR')}`, "Formateurs + direction"],
      ["T2", "Visite entreprise 2", `${new Date(year, debut.getMonth() + 5, 1).toLocaleDateString('fr-FR', { month: 'long' })} ${year}`, "Formateurs référents"],
      ["T3", "Révisions intensives", `${new Date(year, debut.getMonth() + 8, 1).toLocaleDateString('fr-FR', { month: 'long' })} ${year + 1}`, "Apprentis en certification"],
      ["T3", "Examens finaux", f.dateFin ? formatDate(f.dateFin) : `Juin ${year + 1}`, "Apprentis en certification"],
      ["Fin", "Cérémonie de remise des diplômes", f.dateFin ? formatDate(f.dateFin) : `Juil ${year + 1}`, "Tous"],
    ]
  } });
}

export function genConvocationApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = stagiaires.slice(0, 5).map(s => {
    const cp = (s as any).codePostal || "";
    const commune = (s as any).commune || "";
    const adresseFull = `${(s as any).adresse || "________________________"}${cp || commune ? `, ${cp} ${commune}`.trim() : ""}`;
    return `<div class="section"><p><strong>Destinataire :</strong> ${s.prenom} ${s.nom}</p><p><strong>Adresse :</strong> ${adresseFull}</p><p><strong>Entreprise d'accueil :</strong> ${s.entreprise}</p><p><strong>Adresse entreprise :</strong> ${(s as any).adresseEntreprise || "________________________"}</p><p><strong>Formation :</strong> ${f.intitule}</p><p><strong>Période CFA :</strong> Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</p></div>`;
  }).join("");
  return buildDocument({ org: o, title: "CONVOCATION APPRENTI AU CFA", subtitle: f.intitule, extraHtml: extra + `<p style="margin-top:15px">Merci de vous présenter muni(e) de cette convocation et de votre carnet de liaison.</p>` });
}

export function genFicheMissionEntreprise(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___", poste: "___" };
  const evalData = getEvalContent(f.intitule);
  const missions = evalData.competences.length >= 4
    ? evalData.competences.slice(0, 4).map((c, i) => `${i + 1}. ${c} – application en situation professionnelle`)
    : [`1. Participation aux activités courantes du service`, `2. Réalisation de projets en lien avec la formation « ${f.intitule} »`, `3. Prise en charge progressive de responsabilités`, `4. Travail en équipe et communication professionnelle`];
  const compChecks = evalData.competences.length > 0
    ? evalData.competences.slice(0, 5).map(c => `☐ ${c}`)
    : ["☐ Autonomie dans les tâches courantes", "☐ Application des méthodes apprises au CFA", "☐ Communication professionnelle", "☐ Respect des consignes de sécurité", "☐ Initiative et proactivité"];
  return buildDocument({ org: o, title: "FICHE DE MISSION EN ENTREPRISE", subtitle: `${s.prenom} ${s.nom} – ${s.entreprise}`, sections: [
    { heading: "Apprenti(e)", content: `<p><strong>Nom :</strong> ${s.prenom} ${s.nom}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Poste :</strong> ${s.poste}<br><strong>Maître d'apprentissage :</strong> ${f.formateur}</p>` },
    { heading: "Missions confiées", content: `<p>${missions.join('<br>')}</p>` },
    { heading: "Compétences visées en entreprise", content: `<p>${compChecks.join('<br>')}</p>` },
  ], signatures: { type: "2", labels: ["Le Maître d'apprentissage", "L'Apprenti(e)"], names: [f.formateur, s.prenom + " " + s.nom] } });
}

export function genFicheLiaisonCFAEntreprise(o: OrganismeInfo, f: FormationInfo) {
  const debut = f.dateDebut ? new Date(f.dateDebut.split('/').reverse().join('-')) : new Date();
  const termine = isFormationTerminee(f);
  const progress = getFormationProgress(f);
  const makeDate = (monthsAfter: number) => {
    const d = new Date(debut.getFullYear(), debut.getMonth() + monthsAfter, 15);
    return d.toLocaleDateString('fr-FR');
  };
  const isPastDate = (monthsAfter: number) => {
    const d = new Date(debut.getFullYear(), debut.getMonth() + monthsAfter, 15);
    return d <= new Date();
  };
  return buildDocument({ org: o, title: "FICHE DE LIAISON CFA / ENTREPRISE", subtitle: f.intitule, table: {
    headers: ["Date", "Objet", "Interlocuteur CFA", "Interlocuteur Entreprise", "Suite donnée"],
    rows: [
      [makeDate(0), "Présentation du parcours", o.responsablePedagogique, "RH entreprise", isPastDate(0) ? "Convention signée" : ""],
      [makeDate(2), "1ère visite en entreprise", o.responsablePedagogique, "Maître d'apprentissage", isPastDate(2) ? "RAS – Bonne intégration" : ""],
      [makeDate(5), "2ème visite – point mi-parcours", o.responsablePedagogique, "Maître d'apprentissage", isPastDate(5) ? "Progression satisfaisante" : ""],
      [makeDate(8), "Préparation examen", o.responsablePedagogique, "Maître d'apprentissage", isPastDate(8) ? "Évaluation finale planifiée" : ""],
    ]
  } });
}

export function genAttestationPresenceCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const termine = isFormationTerminee(f);
  const progress = getFormationProgress(f);
  const allDays = getFormationDays(f);
  const passedDays = getPassedFormationDays(f);
  const today = new Date().toLocaleDateString('fr-FR');
  let extra = stagiaires.map((s, i) => {
    const taux = termine ? `${95 + (i % 5)}%` : (progress > 0 ? `${Math.round((passedDays.length / Math.max(1, allDays.length)) * (95 + (i % 5)))}% (provisoire – ${passedDays.length}/${allDays.length} jours)` : "___");
    return `
    <div class="section"><p>Je soussigné, <strong>${o.dirigeant}</strong>, directeur du CFA ${o.nom}, atteste que <strong>${s.prenom} ${s.nom}</strong>, apprenti(e) dans l'entreprise <strong>${s.entreprise}</strong>, a été présent(e) aux cours du CFA pour la période du ${formatDate(f.dateDebut)} au ${termine ? formatDate(f.dateFin) : today}.</p>
    <p><strong>Taux de présence au CFA :</strong> ${taux}</p>
    <p>Fait à ${o.ville}, le ${termine ? formatDate(f.dateFin) : today}</p></div><div class="page-break"></div>`;
  }).join("");
  return buildDocument({ org: o, title: "ATTESTATION DE PRÉSENCE – CFA", subtitle: f.intitule, extraHtml: extra });
}

export function genAttestationFinParcours(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const termine = isFormationTerminee(f);
  if (!termine) {
    return buildDocument({ org: o, title: "ATTESTATIONS DE FIN DE PARCOURS", subtitle: f.intitule,
      extraHtml: `<div class="section section-green"><p><em>La formation est en cours. Les attestations de fin de parcours seront délivrées à l'issue de la formation.</em></p></div>` });
  }
  let extra = stagiaires.map((s, i) => {
    const sc = EVAL_SCORES[i] || [8, 8, 8, 8, 8];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    return `<div class="section" style="text-align:center;padding:25px"><h2>ATTESTATION DE FIN DE PARCOURS</h2><p style="font-size:15px;margin:15px 0"><strong>${s.prenom} ${s.nom}</strong></p><p>a achevé avec succès le parcours d'apprentissage</p><p style="font-size:14px;font-weight:700;color:#1e3a7b">${f.intitule}</p><p>Note moyenne : <strong>${avg}/10</strong><br>Certification : ${avg >= 7 ? "✅ Obtenue" : "⚠️ En cours de validation"}</p><p style="margin-top:15px">Fait à ${o.ville}, le ${formatDate(f.dateFin)}</p></div><div class="page-break"></div>`;
  }).join("");
  return buildDocument({ org: o, title: "ATTESTATIONS DE FIN DE PARCOURS", subtitle: f.intitule, extraHtml: extra });
}

// ========== B. DOCUMENTS PÉDAGOGIQUES CFA ==========

export function genPositionnementInitialApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const rows = stagiaires.map((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    return [s.prenom + " " + s.nom, s.entreprise, `${avg}/10`, avg >= 8 ? "Avancé" : avg >= 6 ? "Intermédiaire" : "Débutant", evalData.appreciations[i]?.split('.')[0] + '.' || ""];
  });
  return buildDocument({ org: o, title: "POSITIONNEMENT INITIAL DES APPRENTIS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, table: {
    headers: ["Apprenti(e)", "Entreprise", "Score", "Niveau", "Observations"], rows
  } });
}

export function genEntretienPositionnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const comps = evalData.competences.slice(0, 3);
  let extra = "";
  stagiaires.slice(0, 5).forEach(s => {
    const besoins = comps.length > 0
      ? comps.map(c => `Renforcement en ${c.toLowerCase()}`).join(', ')
      : "Renforcement des bases théoriques, accompagnement pratique";
    extra += `<div class="section"><h3>Entretien – ${s.prenom} ${s.nom}</h3>
      <p><strong>Entreprise :</strong> ${s.entreprise} | <strong>Poste :</strong> ${s.poste}</p>
      <p><strong>Parcours antérieur :</strong> ${s.poste ? `Expérience en ${s.poste}` : 'À préciser lors de l\'entretien'}</p>
      <p><strong>Motivations :</strong> Développer des compétences professionnelles en ${f.intitule.toLowerCase()}</p>
      <p><strong>Besoins identifiés :</strong> ${besoins}</p>
      <p><strong>Aménagements nécessaires :</strong> ${s.entreprise ? "Aucun" : "À évaluer"}</p>
    </div>`;
  });
  return buildDocument({ org: o, title: "ENTRETIENS DE POSITIONNEMENT", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
}

export function genAnalyseBesoinsApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const compsList = evalData.competences.length > 0
    ? evalData.competences.slice(0, 4).map(c => `• ${c}`).join('<br>')
    : "• Compétences techniques métier<br>• Compétences transversales<br>• Communication professionnelle<br>• Autonomie";
  return buildDocument({ org: o, title: "ANALYSE DES BESOINS – APPRENTIS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, sections: [
    { heading: "Méthodologie", content: `<p>L'analyse des besoins des ${Math.min(stagiaires.length, 10)} apprentis a été réalisée via :<br>• Entretiens individuels de positionnement<br>• Questionnaire en ligne<br>• Échange avec les maîtres d'apprentissage<br>• Tests de niveau</p>` },
    { heading: "Compétences visées", content: `<p>Formation « ${f.intitule} » :<br>${compsList}</p>` },
    { heading: "Besoins identifiés", content: "<p>• 70% souhaitent un accompagnement renforcé en entreprise<br>• 60% ont besoin de consolider les bases théoriques<br>• 40% demandent un suivi personnalisé<br>• 20% nécessitent des aménagements spécifiques</p>" },
    { heading: "Plan de formation individualisé", content: "<p>Chaque apprenti bénéficie d'un plan de formation individualisé intégrant :<br>• Les compétences à acquérir au CFA<br>• Les missions en entreprise<br>• Les modalités d'évaluation<br>• Le calendrier d'alternance adapté</p>", variant: "green" },
  ] });
}

export function genPlanIndividuelFormation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const termine = isFormationTerminee(f);
  const comps = evalData.competences.length >= 4
    ? evalData.competences.slice(0, 4)
    : [...evalData.competences, ...Array(4 - evalData.competences.length).fill("Compétence complémentaire")].slice(0, 4);
  let extra = "";
  stagiaires.slice(0, 5).forEach((s, i) => {
    extra += `<div class="page-break"></div><h2>Plan individuel – ${s.prenom} ${s.nom}</h2>
      <div class="section"><p><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Maître d'apprentissage :</strong> ${f.formateur}<br><strong>Formateur référent :</strong> ${o.responsablePedagogique}</p></div>`;
    extra += tableHTML(["Compétence", "CFA", "Entreprise", "Échéance", "Statut"], [
      [comps[0], "Module théorique", "Observation + pratique guidée", "T1", termine ? (i < 3 ? "✅" : "🔄") : ""],
      [comps[1], "Module avancé", "Mission autonome", "T2", termine ? (i < 2 ? "✅" : "🔄") : ""],
      [comps[2], "Projet tutoré", "Projet en entreprise", "T3", termine ? "🔄" : ""],
      [comps[3], "Préparation examen", "Mise en situation professionnelle", "T4", termine ? "📋" : ""],
    ]);
  });
  return buildDocument({ org: o, title: "PLANS INDIVIDUELS DE FORMATION", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
}

export function genProgressionPedagogique(o: OrganismeInfo, f: FormationInfo) {
  const evalData = getEvalContent(f.intitule);
  const comps = evalData.competences.length >= 5
    ? evalData.competences.slice(0, 5)
    : [...evalData.competences, ...["Approfondissement", "Spécialisation", "Projet professionnel", "Préparation certification"].slice(0, 5 - evalData.competences.length)];
  const periodes = ["Sept-Oct", "Nov-Déc", "Jan-Fév", "Mars-Avr", "Mai-Juin"];
  const evaluations = ["QCM positionnement", "Exercices pratiques", "Cas pratiques", "Soutenance projet", "Examen blanc + final"];
  const liens = ["Observation en entreprise", "Pratique guidée", "Missions autonomes", "Projet en entreprise", "Bilan de compétences"];
  return buildDocument({ org: o, title: "PROGRESSION PÉDAGOGIQUE", subtitle: f.intitule, table: {
    headers: ["Période", "Module CFA", "Objectifs", "Évaluation", "Lien entreprise"],
    rows: comps.map((comp, i) => [periodes[i] || `Période ${i+1}`, comp, `Acquérir les compétences liées à : ${comp}`, evaluations[i] || "Évaluation continue", liens[i] || "Pratique en entreprise"])
  } });
}

export function genDeroulePedagogiqueCFA(o: OrganismeInfo, f: FormationInfo) {
  const evalData = getEvalContent(f.intitule);
  const comps = evalData.competences;
  const half = Math.ceil(comps.length / 2);
  const sem1Content = comps.slice(0, half).map((c, i) => `<strong>Module ${i+1} :</strong> ${c}`).join('<br>') || `<strong>Module 1 :</strong> ${f.programme.split("\n")[0] || "Fondamentaux"}`;
  const sem2Content = comps.slice(half).map((c, i) => `<strong>Module ${half+i+1} :</strong> ${c}`).join('<br>') || `<strong>Module 2 :</strong> ${f.programme.split("\n")[1] || "Approfondissement"}`;
  return buildDocument({ org: o, title: "DÉROULÉ PÉDAGOGIQUE – CFA", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Semestre 1", content: `<p>${sem1Content}<br><strong>Évaluation :</strong> Contrôle continu + examen de mi-parcours</p>` },
    { heading: "Semestre 2", content: `<p>${sem2Content}<br><strong>Évaluation :</strong> Soutenance de projet + examen final</p>` },
    { heading: "Méthodes pédagogiques", content: "<p>• Cours magistraux et travaux dirigés (30%)<br>• Travaux pratiques et ateliers (40%)<br>• Projets tutorés (20%)<br>• Accompagnement individualisé (10%)</p>", variant: "green" },
  ] });
}

export function genGrilleSuiviCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const termine = isFormationTerminee(f);
  const rows = stagiaires.map((s, i) => {
    if (!termine) {
      return [s.prenom + " " + s.nom, ...evalData.competences.map(() => "")];
    }
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    return [s.prenom + " " + s.nom, ...evalData.competences.map((_, ci) => {
      const v = Math.min(10, sc[ci % sc.length] + 1);
      return v >= 8 ? "✅" : v >= 6 ? "🔄" : "❌";
    })];
  });
  return buildDocument({ org: o, title: "GRILLE DE SUIVI DES COMPÉTENCES", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", ...evalData.competences.map((_, i) => `C${i+1}`)], rows
  }, sections: [{ heading: "Légende", content: evalData.competences.map((c, i) => `<p><strong>C${i+1} :</strong> ${c}</p>`).join("") + (!termine ? '<p><em>Formation en cours – grille à compléter au fur et à mesure.</em></p>' : '') }] });
}

export function genCarnetLiaison(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" };
  const termine = isFormationTerminee(f);
  const progress = getFormationProgress(f);
  const evalData = getEvalContent(f.intitule);
  const modules = evalData.competences.length > 0 ? evalData.competences : ["Module 1", "Module 2", "Module 3", "Module 4"];
  const totalWeeks = 8;
  const weeksPassed = termine ? totalWeeks : Math.floor(progress * totalWeeks);
  return buildDocument({ org: o, title: "CARNET DE LIAISON", subtitle: `${s.prenom} ${s.nom} – ${f.intitule}`, sections: [
    { heading: "Apprenti(e)", content: `<p><strong>Nom :</strong> ${s.prenom} ${s.nom}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Formation :</strong> ${f.intitule}</p>` },
  ], table: {
    headers: ["Semaine", "Activités CFA", "Activités Entreprise", "Observations MA", "Signature"],
    rows: Array.from({length: totalWeeks}, (_, i) => {
      const modLabel = modules[Math.floor(i / Math.max(1, Math.ceil(totalWeeks / modules.length))) % modules.length];
      const isPast = i < weeksPassed;
      return [`S${i+1}`, modLabel, isPast ? "Missions en cours" : "", isPast ? (i < 4 ? "Bonne progression" : "Autonomie en développement") : "", isPast ? "Signé" : ""];
    })
  } });
}

export function genCompteRenduVisiteEntreprise(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" };
  const termine = isFormationTerminee(f);
  const progress = getFormationProgress(f);
  const enCours = !termine && progress > 0;
  // Date de visite: 2 months after debut for first visit
  const debut = f.dateDebut ? new Date(f.dateDebut.split('/').reverse().join('-')) : new Date();
  const dateVisite = new Date(debut.getFullYear(), debut.getMonth() + 2, 15);
  const visiteFaite = dateVisite <= new Date();
  return buildDocument({ org: o, title: "COMPTE-RENDU DE VISITE EN ENTREPRISE", subtitle: `${s.prenom} ${s.nom} – ${s.entreprise}`, sections: [
    { heading: "Informations", content: `<p><strong>Date de visite :</strong> ${visiteFaite ? dateVisite.toLocaleDateString('fr-FR') : '___'}<br><strong>Apprenti(e) :</strong> ${s.prenom} ${s.nom}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Maître d'apprentissage :</strong> ${f.formateur}<br><strong>Visiteur CFA :</strong> ${o.responsablePedagogique}</p>` },
    { heading: "Intégration dans l'entreprise", content: (termine || visiteFaite) ? "<p>☑ Bonne intégration dans l'équipe<br>☑ Missions en adéquation avec la formation<br>☑ Maître d'apprentissage disponible et impliqué<br>☑ Conditions de travail satisfaisantes</p>" : "<p>☐ Intégration dans l'équipe : ___<br>☐ Missions en adéquation avec la formation : ___<br>☐ Maître d'apprentissage disponible : ___<br>☐ Conditions de travail : ___</p>", variant: "green" },
    { heading: "Progression des compétences", content: (termine || visiteFaite) ? "<p>• Compétences techniques : En bonne voie d'acquisition<br>• Autonomie : En progression<br>• Communication : Satisfaisante<br>• Initiative : À développer</p>" : "<p>• Compétences techniques : ___<br>• Autonomie : ___<br>• Communication : ___<br>• Initiative : ___</p>" },
    { heading: "Points d'attention", content: (termine || visiteFaite) ? "<p>Aucun point bloquant identifié. L'apprenti est encouragé à prendre davantage d'initiative.</p>" : "<p>___</p>" },
  ], signatures: { type: "3", names: [s.prenom + " " + s.nom, f.formateur] } });
}

export function genBilanIntermediaireApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const termine = isFormationTerminee(f);
  let extra = "";
  if (!termine) {
    extra += `<div class="section section-green"><p><em>La formation est en cours. Les bilans intermédiaires seront complétés au fur et à mesure de l'avancement de la formation.</em></p></div>`;
    stagiaires.forEach((s) => {
      extra += `<div class="section"><h3>${s.prenom} ${s.nom} – ${s.entreprise}</h3>
        <p><strong>Note intermédiaire :</strong> ___/10<br><strong>Assiduité CFA :</strong> ___%<br><strong>Appréciation MA :</strong> ___<br><strong>Appréciation CFA :</strong> ___</p></div>`;
    });
  } else {
    stagiaires.forEach((s, i) => {
      const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
      const avg = Math.round(sc.map(v => Math.min(10, v + 1)).reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
      extra += `<div class="section"><h3>${s.prenom} ${s.nom} – ${s.entreprise}</h3>
        <p><strong>Note intermédiaire :</strong> ${avg}/10<br><strong>Assiduité CFA :</strong> ${95 + (i % 5)}%<br><strong>Appréciation MA :</strong> ${avg >= 8 ? "Très satisfaisant" : avg >= 6 ? "Satisfaisant" : "En progression"}<br><strong>Appréciation CFA :</strong> ${avg >= 8 ? "Excellent parcours" : "Bonne progression"}</p></div>`;
    });
  }
  return buildDocument({ org: o, title: "BILANS INTERMÉDIAIRES DES APPRENTIS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
}

export function genBilanFinalApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const termine = isFormationTerminee(f);
  if (!termine) {
    return buildDocument({ org: o, title: "BILANS FINAUX DES APPRENTIS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires,
      extraHtml: `<div class="section section-green"><p><em>La formation est en cours. Les bilans finaux seront réalisés à l'issue de la formation.</em></p></div>`,
      signatures: { type: "2", labels: ["Le Coordinateur CFA", "Le Directeur"], names: [o.responsablePedagogique, o.dirigeant] } });
  }
  let extra = "";
  stagiaires.forEach((s, i) => {
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
  const termine = isFormationTerminee(f);
  if (!termine) {
    const rows = stagiaires.map((s) => {
      return [s.prenom + " " + s.nom, ...evalData.competences.map(() => ""), "", ""];
    });
    return buildDocument({ org: o, title: "ÉVALUATION DES ACQUIS – CFA", subtitle: f.intitule, table: {
      headers: ["Apprenti(e)", ...evalData.competences.map((_, i) => `C${i+1}`), "Moyenne", "Validé"], rows
    } });
  }
  const rows = stagiaires.map((s, i) => {
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
  const evalData = getEvalContent(f.intitule);
  const competences = evalData.competences.length > 0 ? evalData.competences.slice(0, 5) : ["Compétence métier 1", "Compétence métier 2", "Compétence transversale", "Autonomie", "Communication pro"];
  const termine = isFormationTerminee(f);
  const rows = stagiaires.map((s, i) => {
    if (!termine) {
      return [s.prenom + " " + s.nom, ...competences.map(() => "")];
    }
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
  const termine = isFormationTerminee(f);
  const progress = getFormationProgress(f);
  const enCours = !termine && progress > 0;
  const rows = stagiaires.map((s, i) => {
    if (termine) {
      return [s.prenom + " " + s.nom, s.entreprise, i % 3 === 0 ? "Soutien scolaire" : i % 3 === 1 ? "Méthodologie" : "Aucun", `${2 + (i % 3)}h/mois`, i < 7 ? "✅ En place" : "📋 Planifié"];
    }
    if (enCours) {
      return [s.prenom + " " + s.nom, s.entreprise, i % 3 === 0 ? "Soutien scolaire" : i % 3 === 1 ? "Méthodologie" : "Aucun", `${2 + (i % 3)}h/mois`, "🔄 En cours"];
    }
    return [s.prenom + " " + s.nom, s.entreprise, "", "", ""];
  });
  return buildDocument({ org: o, title: "GRILLE D'ACCOMPAGNEMENT INDIVIDUALISÉ", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", "Entreprise", "Type d'accompagnement", "Fréquence", "Statut"], rows
  } });
}

// ========== C. DOCUMENTS QUALITÉ CFA ==========

export function genSatisfactionApprenti(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const termine = isFormationTerminee(f);
  let extra = "";
  const criteres = ["Accueil au CFA", "Qualité des cours", "Lien CFA/Entreprise", "Accompagnement", "Supports", "Préparation examen"];
  if (!termine) {
    stagiaires.forEach((s) => {
      extra += `<h3>${s.prenom} ${s.nom}</h3>` + tableHTML(["Critère", "Note /5"], criteres.map((c) => [c, ""]));
    });
    return buildDocument({ org: o, title: "QUESTIONNAIRE SATISFACTION APPRENTI", subtitle: f.intitule, extraHtml: extra,
      sections: [{ heading: "Moyenne", content: "<p><em>Formation en cours – questionnaire à compléter à l'issue de la formation.</em></p>", variant: "green" }] });
  }
  stagiaires.forEach((s, si) => {
    const scores = criteres.map((_, ci) => 4 + ((si + ci) % 2));
    extra += `<h3>${s.prenom} ${s.nom}</h3>` + tableHTML(["Critère", "Note /5"], criteres.map((c, i) => [c, `${scores[i]}/5`]));
  });
  return buildDocument({ org: o, title: "QUESTIONNAIRE SATISFACTION APPRENTI", subtitle: f.intitule, extraHtml: extra,
    sections: [{ heading: "Moyenne", content: "<p><strong>Satisfaction apprentis : 4.6/5 (92%)</strong></p>", variant: "green" }] });
}

export function genSatisfactionEntrepriseCFA(o: OrganismeInfo, f: FormationInfo) {
  const termine = isFormationTerminee(f);
  return buildDocument({ org: o, title: "QUESTIONNAIRE SATISFACTION ENTREPRISE – CFA", subtitle: f.intitule, table: {
    headers: ["Critère", "Note /5"],
    rows: [
      ["Qualité de la coordination CFA/entreprise", termine ? "4.5/5" : ""],
      ["Compétences acquises par l'apprenti", termine ? "4.3/5" : ""],
      ["Disponibilité du formateur référent", termine ? "4.7/5" : ""],
      ["Qualité des visites en entreprise", termine ? "4.4/5" : ""],
      ["Adéquation formation/besoins métier", termine ? "4.6/5" : ""],
      ["Satisfaction globale", termine ? "4.5/5" : ""],
    ]
  } });
}

export function genSatisfactionFormateurCFA(o: OrganismeInfo, f: FormationInfo) {
  const termine = isFormationTerminee(f);
  return buildDocument({ org: o, title: "QUESTIONNAIRE SATISFACTION FORMATEUR – CFA", table: {
    headers: ["Critère", "Note /5"],
    rows: [
      ["Conditions de travail", termine ? "4.5/5" : ""], ["Moyens pédagogiques", termine ? "4.3/5" : ""], ["Accompagnement direction", termine ? "4.7/5" : ""],
      ["Relations avec les entreprises", termine ? "4.4/5" : ""], ["Niveau des apprentis", termine ? "4.2/5" : ""], ["Satisfaction globale", termine ? "4.5/5" : ""],
    ]
  } });
}

export function genTableauSuiviAssiduite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const termine = isFormationTerminee(f);
  const progress = getFormationProgress(f);
  const enCours = !termine && progress > 0;
  const rows = stagiaires.map((s, i) => {
    if (termine) {
      return [s.prenom + " " + s.nom, s.entreprise, `${95 + (i % 5)}%`, `${i % 10 < 8 ? 0 : 1}`, `${i % 10 < 7 ? 0 : 1}`, i < 8 ? "✅ Bon" : "⚠️ À suivre"];
    }
    if (enCours) {
      const tauxPartiel = Math.round(progress * (95 + (i % 5)));
      return [s.prenom + " " + s.nom, s.entreprise, `${tauxPartiel}% (provisoire)`, "0", "0", "🔄 En cours"];
    }
    return [s.prenom + " " + s.nom, s.entreprise, "", "", "", ""];
  });
  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DE L'ASSIDUITÉ – CFA", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", "Entreprise", "Taux présence", "Abs justifiées", "Abs injustifiées", "Statut"], rows
  } });
}

export function genTableauSuiviAccompagnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const termine = isFormationTerminee(f);
  const progress = getFormationProgress(f);
  const enCours = !termine && progress > 0;
  const rows = stagiaires.map((s, i) => {
    if (termine) {
      return [s.prenom + " " + s.nom, i % 3 === 0 ? "Renforcé" : "Standard", `${1 + (i % 3)} visites`, i < 7 ? "✅" : "🔄", ""];
    }
    if (enCours) {
      const visitesRealisees = progress > 0.5 ? 1 : 0;
      return [s.prenom + " " + s.nom, i % 3 === 0 ? "Renforcé" : "Standard", visitesRealisees > 0 ? `${visitesRealisees} visite` : "Planifiée", "🔄 En cours", ""];
    }
    return [s.prenom + " " + s.nom, "", "", "", ""];
  });
  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DE L'ACCOMPAGNEMENT", subtitle: f.intitule, table: {
    headers: ["Apprenti(e)", "Niveau accompagnement", "Visites réalisées", "Objectif atteint", "Remarques"], rows
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

export function genPreuveRelationEntreprise(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE – RELATION AVEC LES ENTREPRISES", sections: [
    { heading: "Preuves", content: "<p>☑ 120 conventions de partenariat actives<br>☑ Comptes-rendus de visite en entreprise<br>☑ Enquêtes de satisfaction entreprise (90%)<br>☑ Fiches de liaison CFA/entreprise<br>☑ CR réunion annuelle entreprises</p>", variant: "green" },
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

// ========== IND 10 — ADAPTATION ET ACCOMPAGNEMENT CFA ==========

export function genProcedureAbandonReorientationCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE EN CAS D'ABANDON OU RÉORIENTATION OU D'ACCOMPAGNEMENT", sections: [
    { heading: "Objectif", content: `<p>Le référent pédagogique s'assure de l'accompagnement des apprentis en cas de réorientation ou d'abandon durant la formation. Il aide à chercher d'autres axes et moyens pour la suite de leurs études, et fait appel à un réseau d'entreprise.</p>` },
    { heading: "Mission Locale et aides pour la jeunesse", content: `<ul><li>Soutenir les jeunes en formation en CFA en recherche de contrat d'apprentissage</li><li>Proposer une orientation vers la prépa apprentissage aux jeunes les plus en difficulté qui n'ont pas encore finalisé leur projet professionnel, qui ne possèdent pas le niveau de maîtrise du socle commun de compétences ou ceux qui ne sont ni en scolarité, ni en formation, ni en emploi</li><li>Inciter les CFA à alimenter le tableau de bord de l'apprentissage, outil d'amélioration de la qualité du pilotage de l'apprentissage</li></ul>` },
    { heading: "Les Centres d'Information et d'Orientation (CIO)", content: `<p>Les CIO accueillent tous les publics et les informent sur les métiers, les formations et les aident dans leur orientation professionnelle :</p><ul><li>Accueillir tout public et en priorité des jeunes scolarisés et de leur famille</li><li>Informer sur les études, les formations professionnelles, les qualifications et les professions</li><li>Conseiller les personnes</li><li>Observer et analyser les transformations locales du système éducatif et des évolutions du marché du travail</li><li>Animer les échanges et les réflexions entre les partenaires du système éducatif, les parents, les jeunes, les décideurs locaux et les responsables économiques</li></ul>` },
    { heading: "Salaire moyen après la formation", content: `<p>Compte tenu de la diversité des diplômes préparés en CFA, il est impossible de donner un salaire moyen après la formation. Cependant, il faut noter qu'ayant été apprenti et pouvant ainsi justifier d'une expérience d'une à plusieurs années dans un secteur, l'apprenti sera apte à négocier son salaire à la hausse.</p>` },
    { heading: "Débouchés et métiers après la formation", content: `<p>Pas de métier type en sortie de CFA car cela dépendra du diplôme préparé. Selon celui-ci, l'apprenti pourra être agent opérationnel, manager, à son compte... Les possibilités sont multiples.</p><p>Quelques chiffres : selon une enquête de la Dares, 58 % des apprentis l'étaient dans la fonction tertiaire. L'apprentissage n'est donc plus seulement la chasse gardée de l'artisanat ou de l'industrie. Des secteurs comme la banque, l'assurance ou encore l'informatique cherchent chaque année à recruter de nouveaux apprentis.</p>` },
    { heading: "Formations supérieures accessibles", content: `<p>Après un cursus en CFA, plusieurs options s'offrent à l'apprenti : continuer ses études ou s'insérer professionnellement. S'il décide de continuer ses études, cela sera possible en alternance ou en formation continue : Licence en 3ème année à l'université après un BTS, Master, Licence Professionnelle, écoles de commerce, écoles d'ingénieurs...</p>` },
  ] });
}

export function genAccompagnementDistancielCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "DOCUMENTS ET SUIVI – ACCOMPAGNEMENT DISTANCIEL", sections: [
    { heading: "Documents et Suivi", content: `<p>Les preuves de temps de connexion, présentation des élèves à la certification et relance, preuve de contrat, règlement intérieur, CGV (signés) / Attestation de présence et de réussite, envoi des évaluations et grilles d'acquisition. Bilan à chaud et à froid ainsi que le suivi pédagogique sur ${o.nom} entre le stagiaire et le formateur.</p>` },
    { heading: "Moyens pédagogiques et techniques – Distanciel", content: `<p>Les stagiaires ont accès à l'ensemble des outils : bibliothèques avec ressources numériques et documentaires, espace numérique de travail, plateforme interactive...</p><p>Les modalités d'enseignement sont adaptées aux objectifs du programme.</p><p>Outils pour la formation à distance LMS (échanges asynchrones : mails, partage de fichiers, mise en commun d'informations trouvées par les apprenants, mutualisation de travaux, forums thématiques)</p>` },
    { heading: "Assistance technique et Pédagogique", content: `<p>Les modules proposent des fiches d'activités qui permettent de s'approprier les notions proposées à partir de la réflexion sur une pratique.</p><p>La formation proposée est une Formation Ouverte et à Distance qui met les apprenants en situation de formation sur Internet afin qu'ils expérimentent eux-mêmes les conditions d'un apprentissage à distance.</p><p>La situation d'autonomie des apprenants est soutenue par un environnement riche en ressources, théoriques et pratiques, complémentaires au programme. Le dispositif s'appuie sur le groupe des apprenants, constitué en communauté d'apprentissage, avec l'accompagnement méthodologique des formateurs/tuteurs.</p><p>Le planning des sessions, ainsi qu'un mail de relance est envoyé avant, pendant et après la formation.</p><p>Évaluation répartie tout au long de la formation dans chaque axe de la formation en distanciel, permettant d'évaluer le niveau de l'apprenant en début et en sortie de formation.</p>` },
  ] });
}

export function genEnquetePartenaireEmployeurCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const termine = isFormationTerminee(f);
  return buildDocument({ org: o, title: "FICHE DE SUIVI APPRENTI(E)", extraHtml: `
    <p style="margin-bottom:20px">Afin de suivre au mieux votre apprenti et assurer un lien constant entre l'école et l'entreprise, nous vous proposons cette fiche d'évaluation permettant d'évaluer le jeune que vous accueillez dans votre établissement.</p>
    <p>Merci de nous retourner cette fiche remplie à notre chargé de pédagogie professionnelle à l'adresse suivante : <strong>${o.email}</strong></p>
    <p>En vous remerciant très chaleureusement.</p>
    <table style="width:100%;border-collapse:collapse;margin-top:20px">
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Nom et prénom de votre apprenti(e) :</strong></td><td style="padding:8px;border:1px solid #ccc">${s.prenom} ${s.nom}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Nom et prénom du maître d'apprentissage :</strong></td><td style="padding:8px;border:1px solid #ccc">${s.entreprise || '___________________'}</td></tr>
    </table>
    <table style="width:100%;border-collapse:collapse;margin-top:20px">
      <tr style="background:#1e3a7b;color:white"><th style="padding:8px;border:1px solid #ccc;text-align:left">Critère</th><th style="padding:8px;border:1px solid #ccc">Très satisfaisant</th><th style="padding:8px;border:1px solid #ccc">Satisfaisant</th><th style="padding:8px;border:1px solid #ccc">À améliorer</th></tr>
      <tr><td style="padding:8px;border:1px solid #ccc">Montée en compétence de votre apprenti(e)</td><td style="padding:8px;border:1px solid #ccc;text-align:center">${termine ? '☑' : '☐'}</td><td style="padding:8px;border:1px solid #ccc;text-align:center">☐</td><td style="padding:8px;border:1px solid #ccc;text-align:center">☐</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc">Implication de votre apprenti(e)</td><td style="padding:8px;border:1px solid #ccc;text-align:center">☐</td><td style="padding:8px;border:1px solid #ccc;text-align:center">${termine ? '☑' : '☐'}</td><td style="padding:8px;border:1px solid #ccc;text-align:center">☐</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc">Ponctualité de votre apprenti(e)</td><td style="padding:8px;border:1px solid #ccc;text-align:center">${termine ? '☑' : '☐'}</td><td style="padding:8px;border:1px solid #ccc;text-align:center">☐</td><td style="padding:8px;border:1px solid #ccc;text-align:center">☐</td></tr>
    </table>
    <p style="margin-top:20px"><strong>Commentaires (optionnel) :</strong></p>
    <div style="border:1px solid #ccc;min-height:60px;padding:10px;margin-top:5px">${termine ? 'Bon apprenti, motivé et impliqué dans les missions confiées.' : ''}</div>
  ` });
}

export function genFicheRenseignementsCommanditaireCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  // Date du contact = J-15 avant le début de formation
  const dateContact = subtractBusinessDays(f.dateDebut, 15);
  const dc = dateContact ? new Date(dateContact) : new Date();
  const dd = String(dc.getDate()).padStart(2, "0");
  const mm = String(dc.getMonth() + 1).padStart(2, "0");
  const yyyy = dc.getFullYear();

  // Commanditaire = entreprise du 1er stagiaire (apprenti)
  const sRef = stagiaires[0];
  const nomEntreprise = sRef?.entreprise || "";
  const responsable = sRef?.responsableEntreprise || "";
  const adresseEnt = sRef?.adresseEntreprise || "";
  const telEnt = sRef?.telephone || "";
  const emailEnt = sRef?.email || "";
  const siret = sRef?.siretEntreprise || "";

  // Activité / Code NAF / OPCO basés sur l'organisme par défaut (formation pro)
  const activite = "Formation professionnelle continue";
  const codeNAF = "8559A";
  const nbSalaries = "";
  const opco = "OPCO EP";

  const tdL = "padding:8px;border:1px solid #ccc;width:35%;font-weight:bold;background:#f4f7fb";
  const tdR = "padding:8px;border:1px solid #ccc";

  // Lignes stagiaires
  const stagRows = stagiaires.length > 0
    ? stagiaires.map((s) => {
        const dDeb = s.dateDebutFormation || f.dateDebut;
        const dFin = s.dateFinFormation || f.dateFin;
        return `<tr>
          <td style="${tdR}">${s.prenom} ${s.nom}</td>
          <td style="${tdR}">${s.poste || "Apprenti(e)"}</td>
          <td style="${tdR}">${f.intitule}</td>
          <td style="${tdR}">${f.duree}</td>
          <td style="${tdR}">${formatDate(dDeb)} – ${formatDate(dFin)}</td>
        </tr>`;
      }).join("")
    : `<tr><td style="${tdR}">&nbsp;</td><td style="${tdR}"></td><td style="${tdR}">${f.intitule}</td><td style="${tdR}">${f.duree}</td><td style="${tdR}">${formatDate(f.dateDebut)} – ${formatDate(f.dateFin)}</td></tr>`;

  const lieu = f.lieu || `${o.adresse}, ${o.codePostal} ${o.ville}`;
  const surSite = lieu.toLowerCase().includes(o.ville.toLowerCase()) && lieu.includes(o.adresse) ? "Non concerné – formation dans les locaux de l'organisme" : "Oui, locaux conformes (espace adapté, accès, sécurité)";
  const rqthStag = stagiaires.find(s => s.rqth === "oui");
  const besoinHandicap = rqthStag ? `Oui – ${rqthStag.prenom} ${rqthStag.nom} (RQTH). Aménagement à étudier avec le référent handicap.` : "Aucun besoin spécifique signalé à ce jour";
  const adaptations = rqthStag
    ? `Adaptations envisagées : aménagement du temps d'évaluation (+1/3), supports accessibles (police agrandie, contraste renforcé), pauses fractionnées, accompagnement renforcé du formateur référent.`
    : `Aucune adaptation particulière à prévoir. Pédagogie active standard adaptée au public apprenti.`;

  return buildDocument({ org: o, title: "FICHE DE RENSEIGNEMENT COMMANDITAIRE", extraHtml: `
    <p style="text-align:right;margin-top:0"><strong>Date du contact :</strong> ${dd} / ${mm} / ${yyyy}</p>

    <h3 style="margin-top:20px;color:#1e3a7b">L'entreprise (ou « le demandeur » si votre client est un particulier)</h3>
    <table style="width:100%;border-collapse:collapse;margin-top:10px">
      <tr><td style="${tdL}">Nom de l'entreprise</td><td style="${tdR}">${nomEntreprise}</td></tr>
      <tr><td style="${tdL}">Nom et prénom du responsable</td><td style="${tdR}">${responsable}</td></tr>
      <tr><td style="${tdL}">Nom et prénom du contact</td><td style="${tdR}">${responsable}</td></tr>
      <tr><td style="${tdL}">Adresse</td><td style="${tdR}">${adresseEnt}</td></tr>
      <tr><td style="${tdL}">Téléphone</td><td style="${tdR}">${telEnt}</td></tr>
      <tr><td style="${tdL}">E-mail</td><td style="${tdR}">${emailEnt}</td></tr>
      <tr><td style="${tdL}">Activité</td><td style="${tdR}">${activite}</td></tr>
      <tr><td style="${tdL}">Code NAF</td><td style="${tdR}">${codeNAF}</td></tr>
      <tr><td style="${tdL}">Numéro SIRET</td><td style="${tdR}">${siret}</td></tr>
      <tr><td style="${tdL}">Nombre de salariés</td><td style="${tdR}">${nbSalaries}</td></tr>
      <tr><td style="${tdL}">OPCO</td><td style="${tdR}">${opco}</td></tr>
    </table>

    <h3 style="margin-top:20px;color:#1e3a7b">Les stagiaires et les formations</h3>
    <table style="width:100%;border-collapse:collapse;margin-top:10px">
      <tr style="background:#1e3a7b;color:white">
        <th style="padding:8px;border:1px solid #ccc">Nom et prénom des stagiaires</th>
        <th style="padding:8px;border:1px solid #ccc">Leur fonction dans l'entreprise</th>
        <th style="padding:8px;border:1px solid #ccc">Intitulé de la formation</th>
        <th style="padding:8px;border:1px solid #ccc">Durée de la formation</th>
        <th style="padding:8px;border:1px solid #ccc">Dates prévisionnelles</th>
      </tr>
      ${stagRows}
    </table>

    <p style="margin-top:15px"><strong>Lieu de la formation :</strong> ${lieu}</p>
    <p><strong>Si formation sur site :</strong> Les locaux de l'entreprise sont-ils appropriés ? ${surSite}</p>
    <p><strong>Besoin spécifique lié à une situation de handicap d'un salarié ?</strong> ${besoinHandicap}</p>

    <h3 style="margin-top:20px;color:#1e3a7b">Les adaptations à prévoir :</h3>
    <div style="border:1px solid #ccc;min-height:60px;padding:10px;margin-top:5px">${adaptations}</div>
  ` });
}

export function genContratApprentissageModeEmploiCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "CONTRAT D'APPRENTISSAGE – MODE D'EMPLOI", sections: [
    { heading: "C'est quoi l'apprentissage ?", content: `<p>C'est un contrat de travail en CDD ou CDI alternant les périodes d'apprentissage en entreprise et en Centre de Formation d'Apprentis en vue de l'obtention d'un diplôme ou d'un titre professionnel. La formation est gratuite pour l'apprenti(e).</p><ul><li>Sont concernés les jeunes de 15 à 30 ans et les personnes en situation de handicap sans limite d'âge maximum</li><li>Tous les établissements publics ou privés disposant d'un numéro SIRET en France peuvent signer un contrat d'apprentissage</li><li>Le contrat peut commencer 3 mois avant et après le début du cycle de la formation</li><li>Les métiers et formations de tout niveau peuvent être suivis (du CAP au BAC +5)</li><li>L'apprenti(e) doit être accompagné(e) par un Maître d'Apprentissage</li><li>Le temps de travail de l'apprenti est identique à celui des autres salariés (35h max pour les mineurs)</li></ul><p><strong>SANS CONTRAT IL NE PEUT Y AVOIR D'INSCRIPTION.</strong></p>` },
    { heading: "Rémunération de l'apprenti(e)", content: `<p>L'apprenti(e) perçoit une rémunération déterminée en pourcentage du SMIC :</p>
    <table style="width:100%;border-collapse:collapse;margin-top:10px"><tr style="background:#1e3a7b;color:white"><th style="padding:6px;border:1px solid #ccc">Âge</th><th style="padding:6px;border:1px solid #ccc">1ère année</th><th style="padding:6px;border:1px solid #ccc">2ème année</th><th style="padding:6px;border:1px solid #ccc">3ème année</th></tr>
    <tr><td style="padding:6px;border:1px solid #ccc">16 - 17 ans</td><td style="padding:6px;border:1px solid #ccc">27% – 486,48 EUR</td><td style="padding:6px;border:1px solid #ccc">39% – 702,70 EUR</td><td style="padding:6px;border:1px solid #ccc">55% – 990,99 EUR</td></tr>
    <tr><td style="padding:6px;border:1px solid #ccc">18 - 20 ans</td><td style="padding:6px;border:1px solid #ccc">43% – 774,77 EUR</td><td style="padding:6px;border:1px solid #ccc">51% – 918,91 EUR</td><td style="padding:6px;border:1px solid #ccc">67% – 1 207,20 EUR</td></tr>
    <tr><td style="padding:6px;border:1px solid #ccc">21 - 25 ans</td><td style="padding:6px;border:1px solid #ccc">53% – 954,95 EUR</td><td style="padding:6px;border:1px solid #ccc">61% – 1 099,09 EUR</td><td style="padding:6px;border:1px solid #ccc">78% – 1 405,40 EUR</td></tr>
    <tr><td style="padding:6px;border:1px solid #ccc">26 ans +</td><td colspan="3" style="padding:6px;border:1px solid #ccc">100% du SMIC – 1 801,80 EUR</td></tr></table>` },
    { heading: "Formalités pour conclure un contrat", content: `<p>Le contrat d'apprentissage est conclu à l'aide d'un formulaire type signé par l'employeur et l'apprenti(e) (Formulaire Cerfa FA 13).</p><ol><li>Vérifier que les conditions pour accueillir un apprenti sont remplies (Maître d'Apprentissage qualifié)</li><li>Remplir le formulaire avec le futur apprenti et le CFA</li><li>Déposer le contrat à l'OPCO dans les 5 jours ouvrables</li></ol>` },
    { heading: "Maître d'apprentissage", content: `<p>Le maître d'apprentissage est la personne directement responsable de l'apprenti dans l'entreprise. Il doit être :<br>- Salarié de l'entreprise, volontaire, majeur et offrant toutes garanties de moralité<br>- Titulaire d'un diplôme au moins du même niveau que celui préparé par l'apprenti, avec 1 an minimum d'expérience professionnelle en rapport avec la qualification préparée, OU justifier de 2 années d'expérience professionnelle en rapport avec la qualification préparée.</p>` },
  ] });
}

export function genProcedureAccueilBeneficiairesCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ACCUEIL ET D'ACCOMPAGNEMENT DES STAGIAIRES TOUT AU LONG DE LA FORMATION", sections: [
    { heading: "Accueil et accompagnement", content: `<p>Tout au long de la formation, les stagiaires sont accueillis de la façon suivante :</p><ul>
    <li>Dès leur arrivée, les stagiaires sont accueillis par le formateur qui s'assure d'être présent le premier. Au préalable, le formateur prépare la salle et vérifie le bon fonctionnement des équipements et la disponibilité du matériel prévu.</li>
    <li>Au début de la formation, le formateur fournit des informations sur la configuration des locaux, les horaires de début, les horaires des pauses, les horaires de fin, le règlement intérieur, le déroulement de la formation, les connexions wifi, le matériel utilisé, les modalités de repas et de pause.</li>
    <li>Au démarrage de la formation, le formateur recueille les attentes des participants.</li>
    <li>Durant la formation, le formateur informe les stagiaires sur les modalités pédagogiques, les supports remis, les objectifs de la formation, les modalités d'évaluation des acquis et d'évaluation de la formation, le contenu du programme du stage.</li>
    <li>Durant tout le déroulement du stage, le formateur s'assure du suivi et de la progression pédagogique de chaque participant, d'une façon personnalisée. Il répond à chaque question des participants.</li>
    <li>À la fin de la formation, le formateur évalue l'atteinte des objectifs, la satisfaction des attentes, identifie les points à améliorer, remet une attestation de fin de formation, et indique comment le contacter après la formation pour répondre aux éventuelles questions.</li>
    <li>Après la formation, il s'assure de la remise en état de la salle, de son rangement et de sa propreté.</li></ul>` },
    { heading: "1. Sécurité et confort des stagiaires", content: `<p>Tout au long de la présence des stagiaires dans les locaux de la formation, le formateur s'assure de leur sécurité et de leur confort.</p>` },
  ] });
}

export function genProcedureAdaptationPedagogiqueCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ADAPTATION DES MODALITÉS PÉDAGOGIQUES AUX OBJECTIFS ET AU PUBLIC DE LA FORMATION", extraHtml: `
    <p>Je soussigné(e) ${o.dirigeant} agissant en qualité de responsable légal(e) de l'organisme de formation ${o.nom}, atteste de l'adaptation des modalités pédagogiques aux objectifs et au public de la formation selon le descriptif fourni ci-dessous :</p>
    <ul style="margin-top:15px">
      <li>Diagnostic du bénéficiaire et adaptation de l'action de formation pour les personnes en situation de handicap</li>
      <li>Évaluation des pré-requis des stagiaires (test de positionnement début)</li>
      <li>Apport théorique et vécu (expérience sur le champ de la formation et de l'audit)</li>
      <li>Réflexions sur les cas réels</li>
      <li>Mises en situation par questionnement collectif</li>
      <li>Retours d'expériences sur les formations réalisées</li>
      <li>Tests de contrôle de connaissances en fin de formation (évaluation de fin de formation)</li>
    </ul>
  ` });
}

export function genProcedureGestionAnnulationsCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE GESTION DES ANNULATIONS", sections: [
    { heading: "Annulation + de 15 jours avant l'entrée en formation", content: `<ul><li>Proposition de report de dates par mail (garder une trace écrite) + relance téléphone</li><li>Restitution de l'acompte si l'annulation définitive</li></ul>` },
    { heading: "Annulation - de 15 jours avant l'entrée en formation", content: `<ul><li>Proposition de report de dates par mail (garder une trace écrite) + relance téléphone</li><li>Acompte non restitué sauf contre justificatif pour cause majeure dûment reconnue</li></ul>` },
    { heading: "Abandon en cours de formation", content: `<ul><li>Dans le cas où un stagiaire ne se présente pas et ne signe pas la feuille d'émargement, il est rappelé dans la demi-journée pour information</li><li>Soit un imprévu ne lui permet pas de continuer la formation et de nouvelles dates sont fixées</li><li>Soit nous demandons au stagiaire de justifier son abandon afin de le comprendre et de mettre en place des modifications si les raisons nous incombent</li><li>Si Abandon sans nouvelles : relances mail, téléphone, sms – copier sur un doc Word et enregistrer dans son dossier</li><li>Abandon sans report de dates de formation : Facturer les heures au réel si justificatif d'absence fourni</li></ul>` },
  ] });
}

// ========== IND 10 — MISSION N°5 CHARTE QUALITÉ CFA ==========

export function genProcedureRuptureContratApprentissageCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LES CAS DE RUPTURE DU CONTRAT D'APPRENTISSAGE", sections: [
    { heading: "Introduction", content: `<p>Le contrat d'apprentissage est un contrat de travail conclu entre un employeur et un apprenti dans le cadre d'une formation initiale. Il permet à l'apprenti d'acquérir des compétences professionnelles sanctionnées par un diplôme d'État ou un titre reconnu au Répertoire National des Certifications professionnelles (RNCP).</p><p>Le déroulement de la formation en contrat d'apprentissage repose sur l'alternance. Cela consiste à suivre une formation théorique dans un organisme de formation en alternance avec une mise en pratique de ces acquis au sein d'une entreprise.</p><p>En principe, le contrat d'apprentissage prend fin à son terme mais comme tout contrat de travail, il peut aussi être rompu à d'autres moments. La rupture du contrat d'apprentissage peut être à l'initiative de l'employeur, du salarié ou de l'administration.</p>` },
    { heading: "DANS QUELS CAS PEUT-ON ROMPRE UN CONTRAT D'APPRENTISSAGE ?", content: `<p>Durant la période probatoire des 45 premiers jours de formation (consécutifs ou non), l'employeur ou l'apprenti peuvent rompre le contrat sans avoir à fournir un motif précis. De plus, cette rupture ne nécessite pas de respecter un délai de préavis.</p><p>Pour définir la durée de la période d'essai de 45 jours, il ne faut pas tenir compte des périodes pendant lesquelles l'apprenti est en formation théorique dans un CFA mais seulement les périodes où l'apprenti est en formation pratique dans l'entreprise.</p><p>La rupture du contrat pendant la période d'essai ne prévoit alors aucun versement spécifique d'indemnité. Elle doit simplement être notifiée par écrit au Directeur du CFA en charge de la formation ainsi qu'à l'organisme auprès duquel le contrat a été enregistré.</p><p>Au-delà de la période probatoire, la rupture anticipée du contrat d'apprentissage ne peut être effectuée que dans certains cas.</p>` },
    { heading: "Rupture à l'initiative de l'employeur", content: `<p>Durant la période probatoire, aucune indemnité n'est due au salarié sauf stipulation contraire du contrat comme énoncé à l'article L. 6222-21 du Code du Travail.</p><p>L'employeur peut résilier le contrat en cas de faute grave de l'apprenti ou à cause de son inaptitude à exercer le métier.</p><p>Passé la période probatoire de 45 jours, la rupture du contrat est conclue :</p><ul><li>Par accord entre l'employeur et l'apprenti, constaté par écrit et notifié au directeur du CFA, à la Chambre Consulaire et à la DDT.</li><li>Par résiliation judiciaire du contrat à la suite d'une faute grave ou inaptitude.</li></ul><p>Des sanctions sont prévues en cas de non saisie du conseil de prud'hommes :</p><ul><li>Payer les salaires dûs jusqu'au terme ou jusqu'au jour de la résiliation judiciaire.</li><li>Verser des dommages et intérêts à l'apprenti.</li></ul>` },
    { heading: "Changements des conditions de rupture à partir de 2019", content: `<p>La loi « pour la liberté de choisir son avenir professionnel » a assoupli les conditions de rupture pour les contrats conclus à compter du 1er janvier 2019.</p><p>L'employeur n'est plus tenu de solliciter le conseil des prud'hommes s'il respecte la procédure de licenciement pour motif personnel ou disciplinaire en cas de faute grave, inaptitude ou force majeure.</p><p>L'exclusion définitive d'un apprenti du CFA constitue également une cause réelle et sérieuse de licenciement.</p>` },
    { heading: "La rupture du contrat à l'initiative du salarié", content: `<p>La loi « Avenir professionnel » ouvre droit à la démission pour l'apprenti (contrats conclus à partir du 1er janvier 2019, décret n° 2018-1231 du 24 décembre 2018).</p><p>L'apprenti doit saisir le médiateur de l'apprentissage et informer son employeur dans les 5 jours par lettre recommandée avec accusé de réception.</p><p>La rupture intervient dans un délai d'au moins 7 jours à compter de la notification.</p>` },
    { heading: "Conditions de rupture pour les contrats conclus avant le 01 janvier 2019", content: `<p>L'apprenti peut rompre le contrat en déposant sa démission uniquement durant la période probatoire ou suite à une faute de l'employeur. Passé ce délai, le contrat peut être résilié :</p><ul><li>Par accord commun entre l'employeur et l'apprenti.</li><li>Suite à l'obtention du diplôme ou du titre préparé (préavis de 1 mois).</li></ul>` },
    { heading: "Rupture pour faute de l'employeur", content: `<p>En cas de faute ou de manquements répétés, l'apprenti peut demander la résiliation auprès du Conseil de prud'hommes :</p><ul><li>Non règlement des sommes dues</li><li>Insalubrité des conditions d'hébergement</li><li>Violence à l'égard de l'apprenti</li><li>Manquements répétés aux dispositions sur la durée du travail</li><li>Suppression de l'hébergement de l'apprenti</li></ul>` },
    { heading: "Rupture anticipée après obtention du diplôme", content: `<p>L'article L115-2 du Code du travail définit qu'un apprenti peut demander la rupture anticipée en cas d'obtention du diplôme ou titre visé.</p><p>L'apprenti doit notifier par écrit sa décision à l'employeur par lettre recommandée A/R au minimum 1 mois avant la date souhaitée (décret n°2020-372 du 30 mars 2020).</p>` },
    { heading: "La rupture à l'initiative de l'administration", content: `<p>L'administration peut décider de la suspension ou la rupture lorsque l'employeur manque à ses obligations ou que l'apprenti est mis en danger :</p><ul><li>Le préfet peut interdire l'engagement d'apprentis et exiger la rupture des contrats en cours.</li><li>En cas de changement d'employeur, le contrat est transmis au nouvel employeur.</li><li>En cas de risques majeurs (sévices physiques ou moraux, substances dangereuses, installations non conformes…), le contrat peut être suspendu en urgence.</li></ul>` },
    { heading: "Procédures de l'administration", content: `<p>L'inspection du travail effectue une enquête. Le directeur départemental du travail dispose de 15 jours pour statuer. L'apprenti continue à percevoir sa rémunération.</p><p>Si la reprise n'est pas autorisée :</p><ul><li>Le contrat est rompu, l'employeur verse les sommes dues jusqu'au terme.</li><li>L'apprenti peut demander réparation du préjudice subi.</li><li>Le titre de maître d'apprentissage confirmé est retiré d'office.</li></ul>` },
    { heading: "CONSÉQUENCES DE LA RUPTURE DU CONTRAT", content: `<p>Si l'employeur a été reconnu en torts ou si la rupture est prononcée par l'administration, il doit reverser :</p><ul><li>L'indemnité forfaitaire reçue de la Région</li><li>Les exonérations de charges sociales et le crédit d'impôt de l'État</li></ul><p>La loi « Avenir professionnel » (contrats signés à partir du 01/01/2019) oblige le CFA à permettre à l'apprenti de continuer sa formation théorique pendant 6 mois et à contribuer à lui trouver un nouvel employeur.</p>` },
  ] });
}

// ========== IND 10 — Mission 5 : LES CAS DE RUPTURE (version détaillée fidèle au document de référence) ==========

export function genCasRuptureContratApprentissageCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LES CAS DE RUPTURE DU CONTRAT D'APPRENTISSAGE", sections: [
    { heading: "Préambule", content: `<p>Le contrat d'apprentissage est un contrat de travail conclu entre un employeur et un apprenti dans le cadre d'une formation initiale. Il permet à l'apprenti d'acquérir des compétences professionnelles sanctionnées par un diplôme d'État ou un titre reconnu au Répertoire National des Certifications Professionnelles (<strong>RNCP</strong>).</p>
<p>Le déroulement de la formation en contrat d'apprentissage repose sur l'alternance : une formation théorique dans un organisme de formation et une mise en pratique au sein d'une entreprise.</p>
<p>En principe, le contrat d'apprentissage prend fin à son terme, mais comme tout contrat de travail, il peut aussi être rompu à d'autres moments. La rupture peut être à l'initiative de <strong>l'employeur</strong>, du <strong>salarié</strong> ou de <strong>l'administration</strong>.</p>` },

    { heading: "1. Dans quels cas peut-on rompre un contrat d'apprentissage ?", content: `<p>Durant la <strong>période probatoire des 45 premiers jours</strong> de formation pratique (consécutifs ou non), l'employeur ou l'apprenti peuvent rompre le contrat sans motif et sans préavis.</p>
<p>Pour le calcul de cette période d'essai, ne sont comptabilisées que les périodes en entreprise — les semaines en CFA sont exclues.</p>
<p>La rupture pendant la période d'essai ne donne lieu à aucune indemnité. Elle doit être notifiée par écrit au Directeur du CFA en charge de la formation et à l'organisme d'enregistrement, puis transmise à la délégation locale de la <strong>DREETS</strong> (ex-DIRECCTE).</p>
<p><strong>Au-delà de la période probatoire</strong>, la rupture anticipée ne peut être effectuée que dans certains cas : <em>commun accord</em> entre les parties ou <em>décision unilatérale</em> de l'une d'elles, selon des procédures bien définies. L'apprenti peut également demander une rupture anticipée lors de l'<strong>obtention de son diplôme</strong>.</p>` },

    { heading: "2. Rupture à l'initiative de l'employeur", content: `<p>Durant la période probatoire, aucune indemnité n'est due au salarié, sauf stipulation contraire (art. <strong>L. 6222-21</strong> du Code du travail).</p>
<p>L'employeur peut résilier le contrat en cas de <em>faute grave de l'apprenti</em> (refus d'exécuter les consignes, embauche par un autre employeur à l'issue d'un arrêt maladie…) ou d'<em>inaptitude à exercer le métier</em>.</p>
<p>L'inaptitude est validée à la suite d'un examen par un médecin (<em>inaptitude médicale</em>) ou par un centre d'information et d'orientation (<em>inaptitude professionnelle</em>), sur ordonnance du juge ou à la demande de l'employeur, de l'apprenti, de son représentant légal ou du directeur du CFA.</p>
<p>Passé la période probatoire de 45 jours, la rupture est conclue :</p>
<ul>
<li><strong>Par accord</strong> entre l'employeur et l'apprenti, constaté par écrit et notifié au directeur du CFA, au responsable d'établissement, à la Chambre Consulaire ayant enregistré le contrat et à la DDT (Direction Départementale du Travail).</li>
<li><strong>Par résiliation judiciaire</strong> à la suite d'une faute grave ou de l'inaptitude de l'apprenti. Cette résiliation est prononcée par le Conseil de prud'hommes que l'employeur est obligatoirement tenu de saisir. Pendant l'instance, l'apprenti est frappé d'une mise à pied conservatoire ; il peut bénéficier de son salaire s'il est prouvé qu'il n'est pas à l'origine de la rupture.</li>
</ul>
<p>En cas de <strong>non saisine</strong> du Conseil de prud'hommes, l'employeur est tenu de :</p>
<ul>
<li>Payer les salaires dûs jusqu'au terme (ou jusqu'au jour de la résiliation judiciaire).</li>
<li>Verser des dommages et intérêts à l'apprenti — montant au moins égal au salaire qu'il aurait perçu jusqu'au terme du contrat.</li>
</ul>` },

    { heading: "2 bis. Changements des conditions de rupture à partir de 2019", content: `<p>La loi « <strong>Pour la liberté de choisir son avenir professionnel</strong> » a assoupli les conditions de rupture pour les contrats conclus à compter du <strong>1ᵉʳ janvier 2019</strong>.</p>
<p>L'employeur n'est plus tenu de solliciter le Conseil des prud'hommes pour licencier un apprenti, s'il respecte la procédure de licenciement pour motif personnel ou disciplinaire prévue en cas de faute grave, inaptitude ou force majeure.</p>
<p>L'<strong>exclusion définitive</strong> d'un apprenti du CFA constitue désormais une cause réelle et sérieuse de licenciement pour motif personnel.</p>` },

    { heading: "3. La rupture du contrat à l'initiative du salarié", content: `<p>La loi « <strong>Avenir professionnel</strong> » ouvre droit à la démission pour l'apprenti, pour les contrats conclus à partir du <strong>1ᵉʳ janvier 2019</strong>, dans les conditions définies par le décret n° <strong>2018-1231</strong> du 24 décembre 2018.</p>
<p>Pour faire valoir son droit à la démission, l'apprenti doit, sauf exception, saisir le <em>médiateur de l'apprentissage</em> désigné par les chambres consulaires dont il dépend, puis informer son employeur dans les <strong>5 jours suivants</strong> par lettre recommandée avec accusé de réception (ou tout moyen conférant date certaine).</p>
<p>La rupture intervient ensuite dans un délai d'<strong>au moins 7 jours</strong> à compter de la notification.</p>` },

    { heading: "3 bis. Conditions de rupture pour les contrats conclus avant le 01 janvier 2019", content: `<p>L'apprenti peut rompre le contrat en déposant sa démission uniquement pendant la période probatoire, ou suite à une faute de l'employeur à l'issue de celle-ci.</p>
<p>Passé ce délai, le contrat peut être résilié :</p>
<ul>
<li><strong>Par accord commun</strong> entre l'employeur et l'apprenti (mêmes formalités que pour l'initiative de l'employeur).</li>
<li><strong>Suite à l'obtention du diplôme ou du titre préparé</strong> — l'apprenti dispose d'un préavis de 1 mois pour informer l'employeur par écrit.</li>
</ul>
<p>Les autres cas de démission ne sont pas acceptés. Si l'employeur les acte tout de même, cela ouvre droit à indemnités au profit de l'apprenti. L'employeur peut alors demander la résiliation judiciaire du contrat.</p>` },

    { heading: "3 ter. Rupture pour faute de l'employeur", content: `<p>En cas de faute ou de manquements répétés de l'employeur, l'apprenti peut demander la résiliation auprès du Conseil de prud'hommes. La résiliation peut être prononcée notamment dans les cas suivants :</p>
<ul>
<li><strong>Non règlement des sommes dues</strong> (Cass. Soc. n°92-42.427 du 06/12/1995).</li>
<li><strong>Insalubrité des conditions d'hébergement</strong> de l'apprenti (CA Douai, 30 nov. 2000).</li>
<li><strong>Violences</strong> à l'égard de l'apprenti (Cass. Soc. n°88-40.597 du 05/02/1992).</li>
<li><strong>Manquements répétés</strong> aux dispositions règlementaires sur la durée du travail, l'interdiction du travail les jours fériés et le dimanche pour les salariés de moins de 18 ans (CA Versailles, 05 nov. 1999).</li>
<li><strong>Suppression de l'hébergement</strong> dont bénéficiait l'apprenti (Cass. Soc. n°98-42.385).</li>
</ul>
<p>L'apprenti reste tenu d'exécuter son contrat jusqu'à ce que la décision du juge soit prononcée.</p>` },

    { heading: "3 quater. Rupture anticipée après obtention du diplôme", content: `<p>L'<strong>article L115-2</strong> du Code du travail prévoit qu'un apprenti peut demander la rupture anticipée du contrat d'apprentissage en cas d'obtention du diplôme ou titre visé par la formation suivie.</p>
<p>L'apprenti doit notifier sa décision à l'employeur par <strong>lettre recommandée A/R au minimum 1 mois avant</strong> la date souhaitée de rupture (décret n° <strong>2020-372 du 30 mars 2020</strong>, alinéa 8). Cette lettre précise la date d'effet et le motif. L'apprenti informe également son organisme de formation et la chambre consulaire concernée.</p>` },

    { heading: "4. La rupture du contrat à l'initiative de l'administration", content: `<p>L'administration peut suspendre ou rompre le contrat d'apprentissage lorsque l'employeur manque à ses obligations ou que l'apprenti est mis en danger :</p>
<ul>
<li><em>Manquements de l'employeur</em> (dépassement des horaires, violation de l'obligation de formation, sans mise en danger) : le préfet peut interdire l'engagement d'apprentis et exiger la rupture des contrats en cours. L'employeur verse alors à l'apprenti les sommes qu'il aurait perçues jusqu'au terme.</li>
<li><em>Changement d'employeur</em> : le contrat est automatiquement transmis au nouvel employeur, qui doit effectuer une déclaration pour accomplir la formation.</li>
<li><em>Risques majeurs d'atteinte à la santé ou à l'intégrité physique et morale</em> : sévices physiques ou moraux (insultes, humiliations, harcèlement), exposition à des substances dangereuses sans protections, conduite de machines dangereuses, installations non conformes, infractions graves aux règlementations sur la durée du travail ou le travail de nuit. Le contrat peut être suspendu en urgence en vue d'une rupture.</li>
</ul>` },

    { heading: "4 bis. Procédures de l'administration pour rompre un contrat d'apprentissage", content: `<p>L'<strong>Inspection du travail</strong> effectue une enquête. Le directeur départemental du travail dispose de <strong>15 jours</strong> pour statuer sur la rupture ou la poursuite du contrat. Durant ce délai, l'apprenti continue à percevoir sa rémunération.</p>
<p>Si la reprise du contrat n'est pas autorisée :</p>
<ul>
<li>Le contrat est rompu et l'employeur verse à l'apprenti les sommes qu'il aurait perçues jusqu'au terme. Le directeur départemental peut interdire temporairement le recrutement de nouveaux apprentis ou de jeunes en insertion professionnelle.</li>
<li>L'apprenti peut demander la réparation du préjudice subi.</li>
<li>Le titre de <strong>Maître d'apprentissage confirmé</strong> est retiré d'office si l'employeur en est le titulaire.</li>
</ul>` },

    { heading: "5. Conséquences de la rupture du contrat", content: `<p>En échange de son engagement de formation, l'employeur perçoit normalement des aides financières versées par l'État ou la Région.</p>
<p>Si le contrat est rompu et que l'employeur a été reconnu en tort, ou si la rupture est prononcée par l'administration, il est alors tenu de reverser :</p>
<ul>
<li>L'<strong>indemnité forfaitaire</strong> reçue de la Région.</li>
<li>Les <strong>exonérations de charges sociales</strong> et le <strong>crédit d'impôt</strong> dont il a bénéficié de la part de l'État.</li>
</ul>
<p>Par ailleurs, la loi « <strong>Avenir professionnel</strong> » prévoit, pour les contrats signés à partir du <strong>1ᵉʳ janvier 2019</strong>, que le CFA est désormais tenu de permettre à l'apprenti de continuer à suivre sa formation théorique pendant <strong>6 mois</strong> dans tous les cas de rupture à l'initiative de l'employeur, et doit contribuer à lui en trouver un nouveau (cf. <strong>Mission 5</strong> du CFA).</p>` },

    { heading: "6. Engagement de l'organisme — Mission 5 du CFA", content: `<p><strong>${o.nom || "Le CFA"}</strong>, conformément à l'article <strong>L.6231-2</strong> du Code du travail et à la <strong>Mission 5</strong> des CFA, s'engage à :</p>
<ul>
<li><strong>Maintenir l'apprenti en formation pendant 6 mois maximum</strong> après la rupture, sans surcoût pour l'apprenti.</li>
<li>L'<strong>accompagner activement</strong> dans la recherche d'un nouvel employeur (réunions individuelles, mise en relation avec le réseau partenaire, ateliers CV et entretien).</li>
<li><strong>Notifier la rupture</strong> sous 30 jours à l'OPCO, à la DREETS et au financeur public, conformément aux obligations Qualiopi (IND 9 &amp; 10).</li>
<li>Tracer la procédure dans le <strong>« Tableau de suivi des ruptures »</strong> et le <strong>« Plan de maintien en formation »</strong> archivés au dossier de l'apprenti.</li>
</ul>
<p>Référent à contacter en cas de rupture : <strong>${o.responsablePedagogique || "Référent pédagogique du CFA"}</strong>${o.email ? " — " + o.email : ""}${o.telephone ? " — " + o.telephone : ""}.</p>` },

    { heading: "Textes de référence", content: `<ul>
<li>Code du travail : articles <strong>L.6222-18</strong>, <strong>L.6222-21</strong>, <strong>L.6231-2</strong>, <strong>L.115-2</strong>.</li>
<li>Loi n° <strong>2018-771</strong> du 5 septembre 2018 « Pour la liberté de choisir son avenir professionnel ».</li>
<li>Décret n° <strong>2018-1231</strong> du 24 décembre 2018 (démission de l'apprenti).</li>
<li>Décret n° <strong>2020-372</strong> du 30 mars 2020 (rupture après obtention du diplôme).</li>
<li>Référentiel National Qualité <strong>Qualiopi V9</strong>, indicateurs <strong>9, 10 et 23</strong>.</li>
</ul>` },
  ] });
}



// ========== IND 10 — LIVRET D'APPRENTISSAGE ET MAÎTRE D'APPRENTISSAGE ==========

export function genLivretApprentissageCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  return buildDocument({ org: o, title: "LIVRET D'APPRENTISSAGE", extraHtml: `
    <h2 style="text-align:center;margin-top:10px">${f.intitule || 'FORMATION EN APPRENTISSAGE'}</h2>
    <h3 style="text-align:center;color:#555">CENTRE DE FORMATION PAR APPRENTISSAGE</h3>

    <h2 style="margin-top:30px">LE LIVRET D'APPRENTISSAGE</h2>
    <p>Outil de base de la formation professionnelle par apprentissage, le livret d'apprentissage répartit et articule les responsabilités de formation entre l'entreprise et le CFA.</p>
    <p>Les contenus de formation se répartissent sur 2 semestres. Le document s'articule autour de 2 domaines d'activités. Il s'agit d'un document évolutif. Des modifications ou ajustements pourront se faire après bilan.</p>
    <p>La concertation entre <strong>${o.nom}</strong> et l'entreprise est nécessaire pour améliorer la qualité et l'efficacité de la formation et établir une bonne communication entre les partenaires qui encadrent les apprentis.</p>
    <p>L'essentiel de la formation professionnelle des apprentis a lieu en entreprise, le CFA intervient en complément de celle-ci.</p>
    <p>Ce document doit être consulté régulièrement. Il doit « vivre » et permettre une réelle <strong>INTERACTIVITÉ</strong> entre les travaux réalisés au sein du centre de formation et de l'entreprise.</p>

    <h2 style="margin-top:30px">CONTEXTE GÉNÉRAL DE L'APPRENTISSAGE</h2>
    <p><strong>${o.nom}</strong> a choisi de se développer en proposant des formations en apprentissage et/ou en contrat de professionnalisation. Nous dispensons aux jeunes sous contrat d'apprentissage une formation générale associée à un enseignement pratique. Nous avons pour mission :</p>
    <ul>
      <li>La formation des jeunes en alternance</li>
      <li>Le développement de l'apprentissage</li>
      <li>Informer les jeunes et leurs familles sur les formations</li>
    </ul>

    <h2 style="margin-top:30px">QU'EST-CE QUE L'APPRENTISSAGE ?</h2>
    <p>L'apprentissage est une entrée dans la vie active en vue de l'acquisition d'une qualification professionnelle certifiée par un diplôme ou par un titre homologué. Cette formation fait l'objet d'un contrat d'apprentissage. Cette insertion dans l'emploi permet aux jeunes d'acquérir une formation appliquée, des compétences opérationnelles qui leur permettent une intégration plus rapide dans la vie professionnelle.</p>

    <h2 style="margin-top:30px">COORDONNÉES DE L'APPRENTI(E)</h2>
    <table style="width:100%;border-collapse:collapse;margin-top:10px">
      <tr><td style="padding:8px;border:1px solid #ccc;width:35%;font-weight:bold">Nom</td><td style="padding:8px;border:1px solid #ccc">${s.nom}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold">Prénom</td><td style="padding:8px;border:1px solid #ccc">${s.prenom}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold">Date de naissance</td><td style="padding:8px;border:1px solid #ccc">${s.dateNaissance || '___/___/______'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold">Adresse</td><td style="padding:8px;border:1px solid #ccc">${s.email || '___________________'}</td></tr>
      ${s.telephone?.trim() ? `<tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold">Téléphone</td><td style="padding:8px;border:1px solid #ccc">${s.telephone}</td></tr>` : ""}
      <tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold">Entreprise</td><td style="padding:8px;border:1px solid #ccc">${s.entreprise || '___________________'}</td></tr>
    </table>

    <h2 style="margin-top:30px">LES 10 ENGAGEMENTS DE L'ENTREPRISE</h2>
    <ol>
      <li>Accueillir l'apprenti(e) en lui présentant l'entreprise, les collaborateurs, son maître d'apprentissage et le lieu de travail.</li>
      <li>Mettre en œuvre les moyens de lui assurer une formation progressive et complète sous la responsabilité de son maître d'apprentissage.</li>
      <li>Suivre l'évolution de la formation dispensée en CFA en utilisant régulièrement le livret professionnel de l'apprentissage.</li>
      <li>S'assurer périodiquement de l'évolution des acquis professionnels de l'apprenti(e).</li>
      <li>Prendre en compte le statut particulier de l'apprenti(e) à la fois travailleur salarié et jeune en formation.</li>
      <li>Respecter l'ensemble de la législation relative au droit du travail.</li>
      <li>S'impliquer dans le contrôle en cours de formation.</li>
      <li>Participer aux rencontres organisées à l'intention des maîtres d'apprentissage.</li>
      <li>Solliciter le concours d'une médiation en cas de situation conflictuelle.</li>
      <li>Soutenir l'apprenti(e) dans ses démarches d'intégration professionnelle à l'issue du contrat.</li>
    </ol>
    <p style="margin-top:15px"><strong>Signature de l'employeur :</strong> ___________________________</p>
    <p><strong>Signature du maître d'apprentissage :</strong> ___________________________</p>

    <h2 style="margin-top:30px">LES 10 ENGAGEMENTS DU CFA</h2>
    <ol>
      <li>Dispenser aux apprentis un enseignement général, technique, théorique et pratique en adéquation avec la formation dispensée en entreprise.</li>
      <li>Assurer la coordination entre la formation dispensée en partenariat avec l'entreprise.</li>
      <li>Arrêter d'un commun accord avec les entreprises les progressions de formations pratiques.</li>
      <li>Désigner pour chaque apprenti(e) un formateur chargé d'assurer la liaison avec le maître d'apprentissage.</li>
      <li>Organiser et effectuer pour chaque apprenti au minimum deux visites en entreprise par an.</li>
      <li>Organiser des réunions de travail avec les formateurs en entreprise.</li>
      <li>Diffuser aux entreprises tous documents pédagogiques pouvant aider à assurer une bonne formation pratique.</li>
      <li>Fournir sur le Livret Professionnel de l'Apprentissage tous renseignements permettant à l'entreprise de suivre l'assiduité et les résultats.</li>
      <li>Veiller à l'inscription de l'apprenti en temps voulu à l'examen.</li>
      <li>Soutenir l'apprenti(e) dans ses démarches administratives et sociales.</li>
    </ol>
    <p style="margin-top:15px"><strong>Signature pour la Direction du CFA :</strong> ___________________________</p>

    <h2 style="margin-top:30px">LES 10 ENGAGEMENTS DE L'APPRENTI(E)</h2>
    <p>En signant mon contrat d'apprentissage, je m'engage à :</p>
    <ol>
      <li>Avoir un comportement compatible avec les exigences du métier (tenue, langage, disponibilité…).</li>
      <li>Utiliser les deux premiers mois du contrat pour confirmer mon choix d'orientation et ma motivation.</li>
      <li>Adopter une attitude positive dans la réalisation du travail confié par mon maître d'apprentissage.</li>
      <li>Suivre assidûment les cours du Centre de Formation d'Apprentis.</li>
      <li>Tenir régulièrement à jour le livret professionnel de l'apprentissage.</li>
      <li>Respecter les consignes et les règlements intérieurs de l'entreprise et du CFA.</li>
      <li>Prévenir immédiatement l'entreprise et le CFA de mon absence et en fournir les justificatifs.</li>
      <li>Persévérer dans mon projet professionnel lorsque je rencontre des difficultés.</li>
      <li>Solliciter le concours d'une médiation en cas de situation conflictuelle.</li>
      <li>Me présenter à toutes les épreuves d'examen.</li>
    </ol>
    <p style="margin-top:15px"><strong>Signature de l'apprenti(e) :</strong> ___________________________</p>
  ` });
}

export function genLivretMaitreApprentissageCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LIVRET DU MAÎTRE D'APPRENTISSAGE", extraHtml: `
    <p style="text-align:center;font-style:italic;font-size:16px;margin-bottom:30px">Les clés pour réussir votre mission</p>

    <h2>L'APPRENTISSAGE, UN PARCOURS « GAGNANT-GAGNANT »</h2>
    <h3>Côté entreprise :</h3>
    <ul>
      <li>C'est un investissement qui contribue à perpétuer votre métier, à former vos futurs salariés</li>
      <li>Vous intégrez un collaborateur et le formez à vos méthodes de travail</li>
      <li>Vous bénéficiez d'une bonne formule de pré-recrutement de vos salariés</li>
      <li>Vous transmettez votre savoir-faire, étape indispensable pour l'avenir de votre métier</li>
      <li>Vous bénéficiez de méthodes de travail novatrices</li>
      <li>Vous préparez et anticipez sereinement la reprise de votre entreprise</li>
    </ul>
    <h3>Côté apprenti(e) :</h3>
    <ul>
      <li>Il/Elle prépare un diplôme tout en bénéficiant d'une expérience professionnelle</li>
      <li>Il/Elle dispose d'un tremplin vers l'emploi</li>
      <li>Il/Elle se dote d'expertise sur les méthodes et techniques de l'entreprise</li>
    </ul>

    <h2 style="margin-top:30px">LE RÔLE DU MAÎTRE D'APPRENTISSAGE</h2>
    <p>La fonction de maître d'apprentissage peut être exercée par le chef d'entreprise ou l'un de ses salariés. Le maître d'apprentissage doit :</p>
    <ul>
      <li>Être majeur et présenter les garanties de moralité</li>
      <li>Avoir le diplôme préparé par le jeune et 2 ans d'expérience professionnelle dans le métier ou posséder une expérience professionnelle de 3 ans</li>
    </ul>
    <p>Un maître d'apprentissage peut suivre au maximum deux apprentis et un(e) apprenti(e) redoublant.</p>

    <h2 style="margin-top:30px">SES MISSIONS</h2>
    <p>Il a deux missions essentielles :</p>
    <ul>
      <li><strong>La formation au métier</strong></li>
      <li><strong>L'accompagnement dans la vie professionnelle et sociale de l'apprenti</strong></li>
    </ul>

    <h3>Maître d'apprentissage formateur</h3>
    <p>Vous transmettez vos savoirs et savoir-faire techniques à votre apprenti(e) en situation réelle d'exercice du métier. Grâce à une coordination avec le CFA, vous vous assurez de la correspondance entre les apprentissages dans l'entreprise et ceux acquis au centre de formation.</p>

    <h3>Maître d'apprentissage accompagnateur</h3>
    <p>Vous aidez votre apprenti(e) à s'insérer dans l'entreprise, à comprendre les règles et les formes de l'organisation. Vous intervenez à 3 niveaux :</p>
    <ul>
      <li><strong>Le savoir :</strong> conseiller, accompagner le jeune dans sa formation générale</li>
      <li><strong>Le savoir-faire :</strong> veiller à ce que l'activité du jeune corresponde à l'acquisition des connaissances</li>
      <li><strong>Le savoir-être :</strong> participer à l'entrée du jeune dans la vie active</li>
    </ul>

    <h2 style="margin-top:30px">ACCUEILLIR ET INTÉGRER VOTRE APPRENTI(E)</h2>
    <h3>Préparez l'arrivée de votre apprenti(e)</h3>
    <p>Les débuts de la relation entre votre apprenti(e) et l'entreprise sont déterminants. Quelques conseils :</p>
    <ul>
      <li>Informez l'équipe de l'arrivée de l'apprenti(e), de son statut, du diplôme préparé</li>
      <li>Réservez des plages horaires dans votre planning pour accompagner l'apprenti(e)</li>
      <li>Prenez connaissance du référentiel de formation du diplôme préparé</li>
      <li>Adaptez l'organisation du travail en fonction du rythme de l'alternance</li>
      <li>N'oubliez pas d'effectuer la Déclaration Unique d'Embauche et la visite médicale</li>
    </ul>

    <h2 style="margin-top:30px">ACCOMPAGNER L'APPRENTI TOUT AU LONG DE SA FORMATION</h2>
    <p>Le maître d'apprentissage forme l'apprenti(e) au métier en suivant une progression pédagogique en lien avec le CFA.</p>
    <p>Le CFA assure l'accueil des apprentis et la coordination avec l'entreprise :</p>
    <ul>
      <li>Il organise et communique le calendrier de l'alternance</li>
      <li>Il désigne un tuteur enseignant chargé de suivre l'apprenti(e)</li>
      <li>Il organise des rencontres entre l'apprenti, le maître d'apprentissage et l'équipe pédagogique</li>
    </ul>

    <h2 style="margin-top:30px">UNE FORMATION SOUS CONTRAT</h2>
    <h3>Le contrat d'apprentissage</h3>
    <p>Vous signez un contrat de travail (CERFA 14) avec l'apprenti(e) et son représentant légal s'il est mineur. Il sera ensuite enregistré par <strong>${o.nom}</strong>. Il s'agit d'un CDD de type particulier car le temps est partagé entre l'entreprise et le CFA.</p>
    <p>Le contrat d'apprentissage varie de 1 à 3 ans en fonction du diplôme préparé.</p>

    <h3>Le salaire de l'apprenti</h3>
    <table style="width:100%;border-collapse:collapse;margin-top:10px">
      <tr style="background:#1e3a7b;color:white"><th style="padding:8px;border:1px solid #ccc">Année</th><th style="padding:8px;border:1px solid #ccc">- de 18 ans</th><th style="padding:8px;border:1px solid #ccc">18 à 20 ans</th><th style="padding:8px;border:1px solid #ccc">21 à 25 ans</th><th style="padding:8px;border:1px solid #ccc">26 ans et +</th></tr>
      <tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold">1ère année</td><td style="padding:8px;border:1px solid #ccc;text-align:center">27% SMIC</td><td style="padding:8px;border:1px solid #ccc;text-align:center">43% SMIC</td><td style="padding:8px;border:1px solid #ccc;text-align:center">53% SMIC</td><td style="padding:8px;border:1px solid #ccc;text-align:center">100% SMIC</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold">2ème année</td><td style="padding:8px;border:1px solid #ccc;text-align:center">39% SMIC</td><td style="padding:8px;border:1px solid #ccc;text-align:center">51% SMIC</td><td style="padding:8px;border:1px solid #ccc;text-align:center">61% SMIC</td><td style="padding:8px;border:1px solid #ccc;text-align:center">100% SMIC</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold">3ème année</td><td style="padding:8px;border:1px solid #ccc;text-align:center">55% SMIC</td><td style="padding:8px;border:1px solid #ccc;text-align:center">67% SMIC</td><td style="padding:8px;border:1px solid #ccc;text-align:center">78% SMIC</td><td style="padding:8px;border:1px solid #ccc;text-align:center">100% SMIC</td></tr>
    </table>

    <h3 style="margin-top:20px">La validation de la formation : le diplôme</h3>
    <ul>
      <li><strong>Le Contrôle en Cours de Formation (CCF) :</strong> Évaluation en cours d'année des pratiques professionnelles</li>
      <li><strong>L'examen terminal</strong></li>
    </ul>

    <h2 style="margin-top:30px">FORMATION MAÎTRE D'APPRENTISSAGE</h2>
    <p style="font-style:italic">« Accompagnez la réussite de vos apprentis » – Stage de 2 jours</p>
    <h3>Objectifs</h3>
    <ul>
      <li>Doter le maître d'apprentissage d'outils méthodologiques et pédagogiques pour transmettre son savoir-faire</li>
      <li>Favoriser la réussite professionnelle de l'apprenti en partenariat avec le centre de formation</li>
    </ul>
    <h3>Programme</h3>
    <ul>
      <li>Appréhender les caractéristiques et les spécificités du public jeune</li>
      <li>Identifier les missions du maître d'apprentissage</li>
      <li>Évaluer la progression de l'apprenti : méthodes et outils</li>
    </ul>

    <h2 style="margin-top:30px">AIDES FINANCIÈRES</h2>
    <h3>Prime régionale aux employeurs d'apprentis</h3>
    <p>Pour les entreprises de moins de 11 salariés : 1000€ pour chaque année de formation inscrite au contrat d'apprentissage.</p>
    <h3>Crédit d'impôt</h3>
    <p>1600€ par apprenti présent dans l'entreprise (porté à 2200€ pour un apprenti reconnu travailleur handicapé).</p>
    <h3>Cotisations sociales</h3>
    <p>Pour les entreprises de moins de 11 salariés inscrites au Répertoire des métiers : exonération de toutes cotisations patronales et salariales d'origine légale.</p>
  ` });
}

// ========== IND 12 — ENGAGEMENT DES BÉNÉFICIAIRES (CFA) ==========

export function genMesuresEngagementBeneficiairesCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "MESURES POUR FAVORISER L'ENGAGEMENT DES BÉNÉFICIAIRES", sections: [
    { heading: "Objectif", content: `<p>Cette procédure vise à adapter la prestation de formation pour répondre aux besoins spécifiques des apprenants, afin de garantir un apprentissage équitable et inclusif, tout en respectant les objectifs pédagogiques des formations proposées.</p>` },
    { heading: "1. Communication claire et anticipation des attentes", content: `<p><strong>Objectif :</strong> Clarifier les attentes et objectifs avant la formation pour éviter toute confusion et assurer un bon départ.</p><p><strong>Mesures :</strong></p><ul><li>Envoi d'un livret d'accueil avant le début de la formation, incluant le programme, les objectifs et les modalités</li><li>Réalisation d'entretiens individuels avec chaque bénéficiaire pour discuter de leurs objectifs, attentes et besoins spécifiques</li><li>Co-construction des objectifs d'apprentissage avec les bénéficiaires pour les impliquer dès le départ</li></ul>` },
    { heading: "2. Suivi régulier et individualisé pendant la formation", content: `<p><strong>Objectif :</strong> Maintenir un lien constant avec les bénéficiaires pour détecter rapidement toute difficulté et favoriser leur engagement.</p><p><strong>Mesures :</strong></p><ul><li>Planification d'entretiens de suivi individuels tout au long de la formation</li><li>Feedback continu et constructif sur les exercices, travaux pratiques et tests intermédiaires</li><li>Mise en place d'un espace numérique dédié (forum, chat) pour les échanges entre bénéficiaires et formateurs</li></ul>` },
    { heading: "3. Variété des méthodes pédagogiques", content: `<p><strong>Mesures :</strong></p><ul><li>Intégration d'études de cas, jeux de rôle, simulations et ateliers pratiques</li><li>Utilisation d'outils interactifs : quiz en ligne, tests de connaissances, jeux éducatifs</li><li>Organisation de travaux en groupe pour favoriser l'apprentissage par les pairs</li></ul>` },
    { heading: "4. Personnalisation du parcours de formation", content: `<p><strong>Objectif :</strong> Adapter la formation aux besoins spécifiques des bénéficiaires.</p><p><strong>Mesures :</strong></p><ul><li>Plans d'apprentissage personnalisés selon le rythme et le niveau de chaque apprenant</li><li>Supports pédagogiques variés (audio, vidéo, écrits)</li><li>Possibilité de choisir des modules optionnels selon les intérêts et besoins</li></ul>` },
    { heading: "5. Création d'un environnement inclusif et motivant", content: `<p><strong>Mesures :</strong></p><ul><li>Encouragement d'un climat où les erreurs sont perçues comme des opportunités d'apprentissage</li><li>Mise à disposition de ressources supplémentaires (tutorat, coaching individuel)</li><li>Suivi psychologique ou social pour les bénéficiaires rencontrant des difficultés personnelles</li></ul>` },
    { heading: "6. Évaluation régulière et réajustement", content: `<p><strong>Mesures :</strong></p><ul><li>Organisation de questionnaires pour mesurer l'engagement et la satisfaction</li><li>Groupes de discussion pour recueillir des suggestions</li><li>Réajustement immédiat du contenu, du rythme ou des supports en fonction des retours</li></ul>` },
    { heading: "Conclusion", content: `<p>Ces mesures visent à favoriser un engagement durable des bénéficiaires tout au long de la formation, en s'assurant que chacun soit activement impliqué et soutenu, et en valorisant les progrès à chaque étape du parcours.</p>` },
  ] });
}

export function genPreventionGestionAbandonsCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PRÉVENTION ET GESTION DES ABANDONS", sections: [
    { heading: "1. Prévention en amont", content: `<p><strong>Objectif :</strong> Identifier et traiter les signes avant-coureurs d'abandon avant le début de la formation.</p><p><strong>Actions :</strong></p><ul><li>Entretien individuel pré-formation pour évaluer la motivation et détecter les freins</li><li>Analyse des besoins pour s'assurer de l'adéquation entre le projet du bénéficiaire et la formation</li><li>Information claire sur les conditions, le rythme et les exigences de la formation</li></ul>` },
    { heading: "2. Détection précoce des risques", content: `<p><strong>Actions :</strong></p><ul><li>Suivi régulier de l'assiduité et des résultats</li><li>Entretiens de suivi à intervalles réguliers avec le référent pédagogique</li><li>Mise en place d'indicateurs d'alerte (absences répétées, baisse de résultats, désengagement)</li></ul>` },
    { heading: "3. Accompagnement renforcé", content: `<p><strong>Actions :</strong></p><ul><li>Proposition d'un accompagnement individualisé dès les premiers signes de difficulté</li><li>Orientation vers les dispositifs d'aide sociale si nécessaire (logement, transport, santé)</li><li>Aménagement du parcours de formation si besoin (rythme, modalités)</li></ul>` },
    { heading: "4. Gestion de l'abandon", content: `<p><strong>Actions :</strong></p><ul><li>Entretien systématique en cas d'abandon pour comprendre les raisons</li><li>Proposition d'alternatives : report, réorientation, mise en pause</li><li>Documentation de chaque situation dans le registre des abandons</li><li>Analyse des causes pour mettre en place des actions correctives</li></ul>` },
    { heading: "5. Suivi post-abandon", content: `<p><strong>Actions :</strong></p><ul><li>Relance à 1 mois et 3 mois pour proposer une reprise ou une réorientation</li><li>Accompagnement vers d'autres dispositifs de formation ou d'insertion</li></ul>` },
  ] });
}

export function genGuideEntretienAbandonsCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "GUIDE D'ENTRETIEN DES ABANDONS", extraHtml: `
    <table style="width:100%;border-collapse:collapse;margin:20px 0">
      <tr><td style="padding:8px;border:1px solid #ccc;width:30%"><strong>Nom :</strong></td><td style="padding:8px;border:1px solid #ccc">_________________________</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Date :</strong></td><td style="padding:8px;border:1px solid #ccc">_________________________</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Formation :</strong></td><td style="padding:8px;border:1px solid #ccc">_________________________</td></tr>
    </table>
    <h3>Questions</h3>
    <ol style="line-height:2.5">
      <li>Pourquoi souhaitez-vous abandonner la formation ?<br><div style="border-bottom:1px dotted #999;margin:5px 0 15px;height:40px"></div></li>
      <li>Quels sont les points qui vous ont contraint à prendre cette décision ?<br><div style="border-bottom:1px dotted #999;margin:5px 0 15px;height:40px"></div></li>
      <li>Avez-vous rencontré des difficultés personnelles (logement, transport, santé) ?<br><div style="border-bottom:1px dotted #999;margin:5px 0 15px;height:40px"></div></li>
      <li>La formation correspondait-elle à vos attentes initiales ?<br><div style="border-bottom:1px dotted #999;margin:5px 0 15px;height:40px"></div></li>
      <li>Avez-vous sollicité un accompagnement auprès du référent pédagogique ?<br><div style="border-bottom:1px dotted #999;margin:5px 0 15px;height:40px"></div></li>
      <li>Seriez-vous intéressé(e) par un report ou une réorientation ?<br><div style="border-bottom:1px dotted #999;margin:5px 0 15px;height:40px"></div></li>
      <li>Avez-vous des suggestions pour améliorer la formation ?<br><div style="border-bottom:1px dotted #999;margin:5px 0 15px;height:40px"></div></li>
    </ol>
    <p style="margin-top:30px"><strong>Observations du référent :</strong></p>
    <div style="border:1px solid #ccc;min-height:80px;padding:10px"></div>
    <p style="margin-top:20px"><strong>Date :</strong> _________________ <strong>Signature du référent :</strong> _________________</p>
  ` });
}

export function genEviterSituationsEchecCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ÉVITER LES SITUATIONS D'ÉCHEC", sections: [
    { heading: "Questionnaire d'analyse des besoins", content: `<p>L'orientation par défaut est cause de nombreuses ruptures. Pour éviter cela, nous transmettons à nos candidats un questionnaire d'analyse de leurs besoins afin de :</p><ul><li>Valider les objectifs de la formation qu'ils vont suivre</li><li>Anticiper les connaissances et compétences visées</li><li>Exprimer d'éventuelles attentes ou souhaits autour d'une situation professionnelle</li></ul><p>Ce questionnaire prévoit également la prise en charge de situations tel un handicap physique ou la maîtrise de la langue française.</p>` },
    { heading: "Diffusion de l'information", content: `<p>Une convention (ou un contrat) de formation a été éditée à laquelle a été annexé le programme détaillé, mettant en parallèle les objectifs, les méthodes pédagogiques, les moyens d'encadrement et les modalités d'évaluation.</p><p>Nous essayons de diffuser l'information de manière la plus complète possible pour que le candidat vérifie que nos formations correspondent à ses besoins et envies.</p>` },
    { heading: "Pédagogie et méthodes d'apprentissage", content: `<p>Les méthodes d'apprentissage interrogent le rapport au savoir de ceux qui reçoivent la formation et de ceux qui la dispensent. C'est pour cette raison que nous avons décidé de former un nombre limité d'étudiants par session, garantissant une grande efficacité dans la transmission du savoir et l'accompagnement.</p>` },
    { heading: "Identification et repérage des étudiants en difficulté", content: `<p>Afin de concevoir et mettre en œuvre les dispositifs de prévention et de remédiation des ruptures, il est essentiel d'identifier les bénéficiaires en difficulté.</p><p>Le <strong>pôle administratif</strong> (${o.poleAdministratif}) prend en charge la gestion de l'accueil des étudiants tout au long de la formation. Le <strong>pôle compétences</strong> accompagne les étudiants dans l'acquisition des compétences professionnelles. Si besoin, un accompagnement individualisé est proposé.</p>` },
    { heading: "Questionnaire de satisfaction", content: `<p>À la fin de chaque formation, nous envoyons un questionnaire de satisfaction afin d'analyser les besoins d'amélioration :</p><ul><li>Disposer d'indicateurs objectifs de la satisfaction</li><li>Améliorer les différents services proposés</li><li>Suivre l'évolution de la satisfaction</li><li>Être à l'écoute des étudiants</li><li>Identifier les attentes et construire des plans d'actions d'amélioration</li></ul>` },
  ] });
}

export function genProcedureAnnulationsAbandonsCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE GESTION DES ANNULATIONS ET DES ABANDONS DES BÉNÉFICIAIRES", sections: [
    { heading: "Annulation + de 15 jours avant l'entrée en formation", content: `<ul><li>Proposition de report de dates par mail (garder une trace écrite) + relance téléphone</li><li>Restitution de l'acompte si l'annulation définitive</li></ul>` },
    { heading: "Annulation - de 15 jours avant l'entrée en formation", content: `<ul><li>Proposition de report de dates par mail (garder une trace écrite) + relance téléphone</li><li>Acompte non restitué sauf contre justificatif pour cause majeure dûment reconnue</li></ul>` },
    { heading: "Abandon en cours de formation", content: `<ul><li>Dans le cas où un stagiaire ne se présente pas et ne signe pas la feuille d'émargement, il est rappelé dans la demi-journée pour information</li><li>Soit un imprévu ne lui permet pas de continuer et de nouvelles dates sont fixées</li><li>Soit nous demandons au stagiaire de justifier son abandon afin de le comprendre et de mettre en place des modifications si les raisons nous incombent</li><li>Si abandon sans nouvelles : relances mail, téléphone, SMS – copier sur un document et enregistrer dans son dossier</li><li>Abandon sans report : facturer les heures au réel si justificatif d'absence fourni</li><li>Abandon sans report / financement personnel : facturer les heures au réel si justificatif, sans justificatif la somme restante est due à ${o.nom}</li></ul>` },
  ] });
}

export function genFichierGestionAnnulationsCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "SUIVI DE GESTION DES ABANDONS", extraHtml: `
    <table style="width:100%;border-collapse:collapse;margin:20px 0">
      <tr style="background:#1e3a7b;color:white"><th style="padding:8px;border:1px solid #ccc">Nom stagiaire</th><th style="padding:8px;border:1px solid #ccc">Prénom</th><th style="padding:8px;border:1px solid #ccc">Date de formation</th><th style="padding:8px;border:1px solid #ccc">Intitulé de formation</th><th style="padding:8px;border:1px solid #ccc">Motif annulation ou absence</th><th style="padding:8px;border:1px solid #ccc">Reprogrammée ?</th><th style="padding:8px;border:1px solid #ccc">Nouvelle date</th></tr>
      ${Array.from({length: 10}, () => '<tr>' + Array.from({length: 7}, () => '<td style="padding:12px;border:1px solid #ccc">&nbsp;</td>').join('') + '</tr>').join('')}
    </table>
  ` });
}

export function genAccompagnementRechercheContratCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "L'ACCOMPAGNEMENT À LA RECHERCHE D'UN CONTRAT", sections: [
    { heading: "Accompagnement dès l'admission", content: `<p>Dès son admission pédagogique, le CFA ${o.nom} accompagnera le candidat-apprenti dans sa recherche d'entreprise jusqu'à la signature d'un contrat d'apprentissage par :</p><ul><li>Le Responsable de la formation (${o.responsablePedagogique})</li><li>Un référent d'aide au placement ou chargé de relation entreprises</li><li>Des ateliers de Techniques de Recherche d'Entreprises (TRE)</li></ul>` },
    { heading: "Entretiens et ateliers", content: `<p>L'équipe du CFA ${o.nom} propose des entretiens individuels et collectifs :</p><ul><li>Entretien d'aide au projet professionnel</li><li>Les plus-values de la formation et les missions en entreprise</li><li>Ateliers de Techniques de Recherche d'Entreprises : CV, lettre de motivation</li><li>Ateliers phoning, démarchage</li><li>Simulations d'entretien d'embauche</li></ul>` },
    { heading: "Mise en relation avec les entreprises partenaires", content: `<p>Nos entreprises partenaires ont la possibilité de déposer des offres de missions en apprentissage. Une fois étudiées et validées par les Responsables de Formation, elles sont diffusées auprès des candidats :</p><ul><li>Via la personne en charge de l'accompagnement</li><li>Lors du jobdating apprentissage annuel</li></ul><p>Pour tout renseignement : <strong>${o.email}</strong></p>` },
    { heading: "La fiche de mission", content: `<p>L'entreprise trouvée par le candidat devra proposer une mission en adéquation avec les objectifs de la formation. Le futur employeur devra rédiger une fiche de missions, validée par le Responsable de Formation.</p>` },
    { heading: "Le suivi personnalisé pendant la formation", content: `<p>Pour suivre la progression de l'apprenti(e) et assurer la cohésion pédagogique, ${o.nom} met en place un suivi personnalisé :</p><ul><li>Un référent dédié au suivi pédagogique et en entreprise</li><li>Lien constant entre le CFA et le maître d'apprentissage</li><li>Suivi de la partie pédagogique et du suivi en entreprise (appels téléphoniques et visites)</li></ul>` },
  ] });
}

export function genListeAideSocialCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LISTE AIDE SOCIAL", extraHtml: `
    <table style="width:100%;border-collapse:collapse;margin:20px 0">
      <tr style="background:#1e3a7b;color:white"><th style="padding:10px;border:1px solid #ccc;text-align:left">Structure</th><th style="padding:10px;border:1px solid #ccc;text-align:left">Horaires</th><th style="padding:10px;border:1px solid #ccc;text-align:left">Contact</th></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>MISSION LOCALE</strong></td><td style="padding:8px;border:1px solid #ccc">Lundi-Jeudi : 08:30–12:30, 13:30–17:00<br>Vendredi : 08:30–12:30</td><td style="padding:8px;border:1px solid #ccc">${o.telephone?.trim() ? o.telephone : ""}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>SERVICE JEUNESSE</strong></td><td style="padding:8px;border:1px solid #ccc">Lundi-Jeudi : 13:30–18:00<br>Mercredi : 10:30–18:00<br>Vendredi : 13:30–17:00</td><td style="padding:8px;border:1px solid #ccc">${o.telephone?.trim() ? o.telephone : ""}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>ASSISTANTE SOCIALE</strong></td><td style="padding:8px;border:1px solid #ccc">Sur rendez-vous</td><td style="padding:8px;border:1px solid #ccc">${o.adresse}, ${o.codePostal} ${o.ville}${o.telephone?.trim() ? `<br>${o.telephone}` : ""}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>PÔLE EMPLOI</strong></td><td style="padding:8px;border:1px solid #ccc">Lundi-Vendredi : 09:00–16:30</td><td style="padding:8px;border:1px solid #ccc">3949</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>CAF</strong></td><td style="padding:8px;border:1px solid #ccc">Lundi-Vendredi : 09:00–16:00</td><td style="padding:8px;border:1px solid #ccc">www.caf.fr</td></tr>
    </table>
    <p style="margin-top:20px"><em>Cette liste est fournie à titre indicatif et peut être complétée par le référent pédagogique en fonction des besoins spécifiques du bénéficiaire.</em></p>
  ` });
}

export function genCertificatRealisationCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx?: number) {
  // Mode individuel si un stagiaireIdx est fourni : un certificat pour ce stagiaire uniquement
  const target = typeof stagiaireIdx === "number" ? stagiaires[stagiaireIdx] : null;
  const stagList = target
    ? `${target.civilite || ""} ${target.prenom || ""} ${target.nom || ""}`.trim()
    : (stagiaires.length > 0 ? stagiaires.map(s => `${s.civilite} ${s.prenom} ${s.nom}`).join(', ') : '___________________');
  // Dates : individuelles si présentes, sinon dates formation
  const dDeb = target?.dateDebutFormation || f.dateDebut;
  const dFin = target?.dateFinFormation || f.dateFin;
  return buildDocument({ org: o, title: "CERTIFICAT DE RÉALISATION", extraHtml: `
    <p>Je soussigné <strong>${o.dirigeant}</strong>, représentant légal du dispensateur de l'action concourant au développement des compétences, de l'organisme de formation <strong>${o.nom}</strong></p>
    <p>atteste que :</p>
    <p style="font-size:14pt;font-weight:bold;text-align:center;margin:20px 0">${stagList}</p>
    <p>a suivi l'action <strong>${f.intitule}</strong></p>
    <p><strong>Nature de l'action :</strong></p>
    <ul>
      <li>☐ action de formation</li>
      <li>☐ bilan de compétences</li>
      <li>☐ action de VAE</li>
      <li>☑ action de formation par apprentissage</li>
    </ul>
    <p>Qui s'est déroulée du <strong>${formatDate(dDeb)}</strong> au <strong>${formatDate(dFin)}</strong> pour une durée de <strong>${f.duree}</strong></p>
    <p style="margin-top:20px">Sans préjudice des délais imposés par les règles fiscales, comptables ou commerciales, je m'engage à conserver l'ensemble des pièces justificatives qui ont permis d'établir le présent certificat pendant une durée de 3 ans à compter de la fin de l'année du dernier paiement.</p>
    <p>En cas de cofinancement des fonds européens, la durée de conservation est étendue conformément aux obligations conventionnelles spécifiques.</p>
    <p style="margin-top:30px">Fait à <strong>${o.ville}</strong>, le <strong>${formatDate(dFin)}</strong></p>
    <p>Cachet et signature du responsable du dispensateur de formation</p>
    <p style="margin-top:40px"><strong>${o.dirigeant}</strong></p>
  ` }).replace("</head>", '<meta name="pdf-page-size" content="280x430"></head>');
}

// ========== IND 14 — WEBINAIRES (CFA) ==========

export function genWebinaireFormationCompetencesCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "WEBINAIRE SUR LA FORMATION ET LE DÉVELOPPEMENT DES COMPÉTENCES", extraHtml: `
    <table style="width:100%;border-collapse:collapse;margin:20px 0">
      <tr><td style="padding:8px;border:1px solid #ccc;width:30%"><strong>Organisé par :</strong></td><td style="padding:8px;border:1px solid #ccc">${o.nom}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Lieu :</strong></td><td style="padding:8px;border:1px solid #ccc">${o.adresse}, ${o.codePostal} ${o.ville}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Durée :</strong></td><td style="padding:8px;border:1px solid #ccc">2H</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Intervenants :</strong></td><td style="padding:8px;border:1px solid #ccc">${o.responsablePedagogique} – Référent Pédagogique</td></tr>
    </table>
    <h3>Description</h3>
    <p>${o.nom} a organisé un webinaire sur le thème de la formation et le développement des compétences, visant à sensibiliser les professionnels à l'importance d'une gestion optimale des plans de formation.</p>
    <h3>Thèmes abordés</h3>
    <ul>
      <li>Identification des besoins en formation des employés</li>
      <li>Élaboration et gestion d'un plan de formation efficace</li>
      <li>Les dispositifs de financement disponibles (OPCO, CPF)</li>
      <li>Évaluation des résultats des formations et retour sur investissement</li>
      <li>Accompagnement des collaborateurs dans leur développement professionnel</li>
    </ul>
    <h3>Points clés</h3>
    <ul>
      <li>Identification des besoins de formation dans l'entreprise</li>
      <li>Importance de la formation continue pour l'employabilité</li>
      <li>Financement des formations professionnelles : CPF, OPCO</li>
      <li>Suivi et évaluation des résultats des actions de formation</li>
    </ul>
  ` });
}

export function genWebinaireNTCCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "WEBINAIRE – TECHNIQUES ET OUTILS DU NÉGOCIATEUR TECHNICO-COMMERCIAL", extraHtml: `
    <table style="width:100%;border-collapse:collapse;margin:20px 0">
      <tr><td style="padding:8px;border:1px solid #ccc;width:30%"><strong>Organisé par :</strong></td><td style="padding:8px;border:1px solid #ccc">${o.nom}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Lieu :</strong></td><td style="padding:8px;border:1px solid #ccc">${o.adresse}, ${o.codePostal} ${o.ville}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Durée :</strong></td><td style="padding:8px;border:1px solid #ccc">3H</td></tr>
      <tr><td style="padding:8px;border:1px solid #ccc"><strong>Intervenants :</strong></td><td style="padding:8px;border:1px solid #ccc">${o.responsablePedagogique} – Référent Pédagogique</td></tr>
    </table>
    <h3>Description</h3>
    <p>Le webinaire organisé par ${o.nom} portait sur les techniques et outils du négociateur technico-commercial, un sujet essentiel pour les professionnels souhaitant développer leurs compétences en prospection, négociation et gestion de la relation client.</p>
    <h3>Thèmes abordés</h3>
    <ul>
      <li>Les fondamentaux du métier de négociateur technico-commercial</li>
      <li>Les techniques de prospection et de qualification des prospects</li>
      <li>L'utilisation des outils numériques commerciaux (CRM, suivi des opportunités)</li>
      <li>Les techniques de négociation commerciale et de conclusion des ventes</li>
      <li>La gestion et la fidélisation de la relation client</li>
      <li>La veille commerciale et l'adaptation aux évolutions du marché</li>
    </ul>
    <h3>Points clés</h3>
    <ul>
      <li>Rôle et compétences du négociateur technico-commercial</li>
      <li>Techniques de prospection, négociation et fidélisation client</li>
      <li>Utilisation des outils numériques commerciaux (CRM, suivi client)</li>
      <li>Importance de la communication et de l'écoute active</li>
      <li>Veille commerciale et adaptation aux évolutions du marché</li>
    </ul>
  ` });
}

// ========== IND 15 — DROITS ET DEVOIRS (CFA) ==========

export function genDroitsDevoirsApprentiCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "DROITS ET DEVOIRS DE L'APPRENTI", sections: [
    { heading: "Les droits", content: `<p>L'apprenti bénéficie des mêmes conditions de travail et de protection sociale que les autres salariés :</p>
      <ul>
        <li><strong>Le temps de travail :</strong> les heures passées en cours sont considérées comme du temps de travail et comptent parmi les 35 ou 39 heures hebdomadaires</li>
        <li><strong>La rémunération :</strong> chaque mois, l'entreprise fournit une fiche de paie dont le montant est fixé en fonction de l'âge, la durée du contrat et le diplôme. Le taux varie entre 27 et 100 % du SMIC</li>
        <li><strong>La prise en charge des frais :</strong> l'employeur prend en charge 50 % des frais de déplacements en transport en commun</li>
        <li><strong>Frais de formation :</strong> les coûts de la formation ne peuvent être supportés par l'apprenti</li>
        <li><strong>Les congés :</strong> comme tout salarié, l'apprenti a droit à un salaire et des jours de repos. Pour la préparation du diplôme, 5 jours supplémentaires peuvent être demandés</li>
        <li><strong>La protection sociale :</strong> prise en charge des accidents de travail et maladies professionnelles. L'entreprise propose une mutuelle obligatoire</li>
        <li><strong>Retraite :</strong> les années de formation sont capitalisables comme années pleines</li>
        <li><strong>Litige :</strong> période d'essai de 45 jours (jours en entreprise uniquement). En cas de litige, contacter le CFA ou un médiateur de l'apprentissage</li>
      </ul>` },
    { heading: "Les devoirs", content: `<ul>
        <li><strong>Le respect des règles :</strong> respecter le règlement intérieur de l'établissement et de l'entreprise, notamment les règles d'hygiène et de sécurité</li>
        <li><strong>L'attitude professionnelle :</strong> respecter les horaires de travail, justifier toute absence, prévenir de tout retard. En cas de maladie, adresser un certificat médical dans les 48 heures</li>
        <li><strong>Le travail et la formation :</strong> suivre les enseignements, effectuer les tâches/missions confiées par l'entreprise, se présenter aux certifications</li>
        <li><strong>Le suivi administratif :</strong> fournir à l'employeur et au CFA tout changement de situation personnelle ou difficulté pouvant avoir une incidence sur la formation</li>
      </ul>` },
  ] });
}

export function genReglesSSMilieuProCFA(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LES RÈGLES APPLICABLES EN MATIÈRE DE SANTÉ ET DE SÉCURITÉ EN MILIEU PROFESSIONNEL", sections: [
    { heading: "Suivi de l'état de santé", content: `<p>Votre employeur est tenu d'assurer le suivi de votre état de santé, afin de vous informer sur les risques éventuels auxquels vous expose votre poste de travail.</p><p>En fonction de votre poste, des risques professionnels et de votre âge, vous bénéficiez d'une <strong>visite d'information et de prévention (VIP)</strong> au plus tard dans les 2 mois suivant l'embauche (ou avant l'affectation pour les mineurs).</p><p>La VIP a pour objectifs :</p><ul><li>Vous interroger sur votre état de santé</li><li>Vous informer sur les risques de votre poste</li><li>Vous sensibiliser sur les moyens de prévention</li><li>Identifier si un suivi médecin du travail est nécessaire</li></ul>` },
    { heading: "Droits et devoirs de l'employeur et du salarié", content: `<p><strong>L'employeur (Art L4121-1) :</strong> prend les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs.</p><p><strong>L'employeur (Art R4141-2) :</strong> informe les travailleurs sur les risques pour leur santé et sécurité.</p><p><strong>Le salarié (Art L4122-1) :</strong> chaque travailleur doit prendre soin de sa santé et sécurité ainsi que de celles des autres personnes.</p>` },
    { heading: "Interlocuteurs internes à l'entreprise", content: `<ul><li><strong>Le CSE :</strong> attributions en matière de santé, sécurité et conditions de travail (obligatoire à partir de 11 salariés)</li><li><strong>Le responsable sécurité :</strong> assiste l'employeur dans la politique de prévention des risques</li><li><strong>L'infirmier(e) de santé au travail :</strong> suivi de la santé des salariés (obligatoire à partir de 200 salariés industrie / 500 tertiaire)</li><li><strong>Le SST (Sauveteur Secouriste du Travail) :</strong> intervient en cas d'accident du travail et participe à la prévention</li></ul>` },
    { heading: "Interlocuteurs externes", content: `<ul><li><strong>Le service de santé au travail :</strong> visites régulières pour maintenir l'aptitude au poste</li><li><strong>L'inspection du travail :</strong> informe, conseille et contrôle l'application du droit du travail</li></ul>` },
    { heading: "Les atteintes à la santé en milieu professionnel", content: `<ul><li><strong>Accident de trajet :</strong> entre le lieu de travail et le domicile, ou le lieu de repas</li><li><strong>Accident du travail :</strong> accident survenu par le fait ou à l'occasion du travail</li><li><strong>Maladie professionnelle :</strong> maladie contractée du fait de l'exposition à un risque lors de l'exercice professionnel</li></ul>` },
  ] });
}
