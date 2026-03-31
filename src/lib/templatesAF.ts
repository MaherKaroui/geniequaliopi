// Additional AF (Action de Formation) template generators
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML, signatureBlock2, signatureBlock3, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireTarif, linkUrl } from "./docBuilder";
import { FormateurInfo, EVAL_SCORES } from "./sampleData";
import { getEvalContent, generateStagiaireAnswers, computeQCMScore } from "./evalContent";

// ========== DOCUMENTS ADMINISTRATIFS AF ==========

export function genDevis(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const nbParticipants = parseInt(f.nombreParticipants || "1") || stagiaires.length || 1;
  const tarifUnit = f.tarif || "1 500 € HT";
  return buildDocument({ org: o, title: "DEVIS DE FORMATION", subtitle: `N° DEV-${new Date().getFullYear()}-${String(Math.floor(Math.random()*999)+1).padStart(3,'0')}`, formation: f, showFormationInfo: true, stagiaires, sections: [
    { heading: "Client", content: `<p><strong>Entreprise :</strong> ${stagiaires[0]?.entreprise || "_______________"}<br><strong>Contact :</strong> ${stagiaires[0]?.prenom || ""} ${stagiaires[0]?.nom || ""}<br><strong>Email :</strong> ${stagiaires[0]?.email || ""}</p>` },
    { heading: "Prestation", content: `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Durée :</strong> ${f.duree}<br><strong>Modalité :</strong> ${f.modalites}<br><strong>Lieu :</strong> ${f.lieu}<br><strong>Nombre de participants :</strong> ${nbParticipants}</p>` },
  ], table: {
    headers: ["Désignation", "Quantité", "Prix unitaire HT", "Total HT"],
    rows: [
      [`Formation "${f.intitule}" – ${f.duree}`, `${nbParticipants}`, tarifUnit, `${nbParticipants} × ${tarifUnit}`],
      ["Supports pédagogiques", `${nbParticipants}`, "Inclus", "Inclus"],
      ["Accès plateforme e-learning (6 mois)", `${nbParticipants}`, "Inclus", "Inclus"],
      ["Évaluation et certification", `${nbParticipants}`, "Inclus", "Inclus"],
    ]
  }, extraHtml: `<div class="section section-green"><p><strong>TVA non applicable, art. 261-4-4° du CGI</strong><br>Devis valable 30 jours.<br>Prise en charge OPCO possible sur demande.</p></div><p style="margin-top:20px"><em>Ce devis doit être retourné signé avec la mention « Bon pour accord » pour validation de l'inscription.</em></p>`,
    signatures: { type: "2", labels: ["Pour l'organisme", "Bon pour accord – Le Client"], names: [o.dirigeant, ""] }
  });
}

export function genContratFormationParticulier(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", email: "", telephone: "" };
  return buildDocument({ org: o, title: "CONTRAT DE FORMATION PROFESSIONNELLE", subtitle: "Article L.6353-3 du Code du travail – Particulier", formation: f, showFormationInfo: true, stagiaires, sections: [
    { heading: "Entre les parties", content: `<p><strong>L'organisme de formation :</strong> ${o.nom}, ${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret} – NDA : ${o.nda}<br>Représenté par : ${o.dirigeant}</p><p><strong>Et le stagiaire :</strong> ${s.prenom} ${s.nom}<br>Email : ${s.email}<br>Téléphone : ${s.telephone}</p>` },
    { heading: "Article 1 – Objet du contrat", content: `<p>Le présent contrat a pour objet la réalisation de l'action de formation « ${f.intitule} » selon le programme annexé.</p>` },
    { heading: "Article 2 – Nature et caractéristiques", content: `<p><strong>Intitulé :</strong> ${f.intitule}<br><strong>Objectifs :</strong> ${f.objectifs}<br><strong>Durée :</strong> ${f.duree}<br><strong>Dates :</strong> Du ${formatDate(getStagiaireDateDebut(s as StagiaireInfo, f))} au ${formatDate(getStagiaireDateFin(s as StagiaireInfo, f))}<br><strong>Modalité :</strong> ${f.modalites}<br><strong>Lieu :</strong> ${f.lieu}</p>` },
    { heading: "Article 3 – Prix et conditions de paiement", content: `<p>Le prix de la formation est fixé à ${f.tarif}.<br>TVA non applicable (art. 261-4-4° du CGI).<br>Le règlement s'effectue à la signature ou en 3 mensualités.</p>` },
    { heading: "Article 4 – Droit de rétractation", content: "<p>Conformément à l'article L.6353-5 du Code du travail, le stagiaire dispose d'un délai de rétractation de 10 jours à compter de la signature du présent contrat. Aucune somme ne peut être exigée avant l'expiration de ce délai.</p>" },
    { heading: "Article 5 – Interruption", content: "<p>En cas d'interruption de la formation, seules les heures réalisées seront facturées au prorata.</p>" },
  ], signatures: { type: "2", labels: ["Pour l'organisme", "Le Stagiaire (lu et approuvé)"], names: [o.dirigeant, s.prenom + " " + s.nom] } });
}

export function genAttestationAssiduite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = stagiaires.slice(0, 10).map(s => `
    <div class="section"><p>Je soussigné, <strong>${o.dirigeant}</strong>, directeur de ${o.nom}, atteste que <strong>${s.prenom} ${s.nom}</strong> (${s.entreprise}) a suivi avec assiduité la formation « ${f.intitule} » du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}, soit ${f.duree}.</p>
    <p><strong>Taux de présence :</strong> 100%<br><strong>Absences :</strong> Aucune absence constatée</p>
    <p>Fait à ${o.ville}, le ${formatDate(getStagiaireDateFin(s, f))}</p>
    </div><div class="page-break"></div>`).join("");
  return buildDocument({ org: o, title: "ATTESTATION D'ASSIDUITÉ", subtitle: f.intitule, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Responsable", "Cachet de l'organisme"], names: [o.dirigeant, o.nom] } });
}

export function genCertificatRealisation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = stagiaires.slice(0, 10).map(s => `
    <div class="section" style="padding:25px"><p style="text-align:center;font-size:16px;margin-bottom:15px"><strong>CERTIFICAT DE RÉALISATION</strong></p>
    <p>Je soussigné(e), <strong>${o.dirigeant}</strong>, représentant l'organisme de formation <strong>${o.nom}</strong> (NDA : ${o.nda}),</p>
    <p>atteste que <strong>${s.prenom} ${s.nom}</strong></p>
    <p>a bien suivi l'action de formation ci-dessous :</p>
    <p><strong>Intitulé :</strong> ${f.intitule}<br><strong>Objectif :</strong> ${f.objectifs}<br><strong>Durée :</strong> ${f.duree}<br><strong>Du :</strong> ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}<br><strong>Modalité :</strong> ${f.modalites}<br><strong>Lieu :</strong> ${f.lieu}</p>
    <p><strong>Nature de l'action :</strong> Action de formation au sens de l'article L.6313-1 du Code du travail</p>
    <p>Fait à ${o.ville}, le ${formatDate(getStagiaireDateFin(s, f))}</p>
    </div><div class="page-break"></div>`).join("");
  return buildDocument({ org: o, title: "CERTIFICATS DE RÉALISATION", subtitle: f.intitule, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Responsable de l'organisme", "Cachet"], names: [o.dirigeant, ""] } });
}

// ========== DOCUMENTS PÉDAGOGIQUES AF ==========

export function genGrilleAnalyseNiveauInitial(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    const niveau = avg >= 8 ? "Avancé" : avg >= 6 ? "Intermédiaire" : "Débutant";
    return [s.prenom + " " + s.nom, s.entreprise, s.poste, `${avg}/10`, niveau, evalData.appreciations[i]?.split('.')[0] + '.' || "Niveau correct."];
  });
  return buildDocument({ org: o, title: "GRILLE D'ANALYSE DU NIVEAU INITIAL", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, table: {
    headers: ["Stagiaire", "Entreprise", "Poste", "Score", "Niveau", "Observations"], rows
  }, sections: [
    { heading: "Synthèse", content: `<p>Sur ${rows.length} stagiaires évalués :<br>• Avancés : ${rows.filter(r => r[4] === "Avancé").length}<br>• Intermédiaires : ${rows.filter(r => r[4] === "Intermédiaire").length}<br>• Débutants : ${rows.filter(r => r[4] === "Débutant").length}</p>`, variant: "green" },
    { heading: "Adaptations décidées", content: "<p>• Constitution de sous-groupes de niveau<br>• Exercices différenciés selon le niveau<br>• Supports complémentaires pour les débutants<br>• Cas avancés pour les stagiaires confirmés</p>" },
  ], signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

export function genDeroulePedagogique(o: OrganismeInfo, f: FormationInfo) {
  // ── Determine number of days from duree field ──
  const heuresMatch = f.duree.match(/(\d+)\s*h/i);
  const joursMatch = f.duree.match(/(\d+)\s*jours?/i);
  const totalH = heuresMatch ? parseInt(heuresMatch[1]) : 14;
  const nbJours = joursMatch ? parseInt(joursMatch[1]) : Math.ceil(totalH / 7);
  const hParJour = totalH / nbJours;

  // ── Build day topics from programme + objectifs ──
  const programmeLines = f.programme ? f.programme.split("\n").map(l => l.trim()).filter(l => l.length > 3) : [];
  const objectifsItems = f.objectifs
    ? f.objectifs.split(/\n|\.(?=\s)/).map(l => l.trim().replace(/^[-•*]\s*/, "").replace(/^À l'issue.*capable de\s*:?\s*/i, "")).filter(l => l.length > 5)
    : [];

  const explicitDayLines = programmeLines.filter(l => /^(Jour|Module)\s+\d+/i.test(l));
  const contentLines = programmeLines
    .filter(l => !/^(Jour|Module)\s+\d+/i.test(l))
    .map(l => l.replace(/^[-•*]\s*/, "").trim())
    .filter(l => l.length > 3);

  const allTopics = [...contentLines];
  for (const obj of objectifsItems) {
    if (!allTopics.some(t => t.toLowerCase().includes(obj.toLowerCase().slice(0, 20)))) {
      allTopics.push(obj);
    }
  }

  const fillers = [
    `Fondamentaux`, `Approfondissement`, `Techniques avancées`,
    `Mise en pratique`, `Exercices pratiques`, `Études de cas`,
    `Consolidation des acquis`, `Méthodologie`, `Synthèse`, `Atelier pratique`,
  ];

  // Build topics for each day
  const topicsPerDay = Math.max(1, Math.ceil(allTopics.length / nbJours));
  const dayTopicsList: string[][] = [];

  for (let d = 0; d < nbJours; d++) {
    if (d < explicitDayLines.length) {
      const label = explicitDayLines[d].replace(/^(Jour|Module)\s*\d+\s*[:\-–]\s*/i, '').trim();
      dayTopicsList.push(label.split(/[,;–—-]+/).map(t => t.trim()).filter(Boolean));
    } else {
      const slice = allTopics.slice(d * topicsPerDay, (d + 1) * topicsPerDay);
      if (slice.length > 0) {
        dayTopicsList.push(slice.map(s => s.split(/[,;–—-]+/).map(t => t.trim()).filter(Boolean)).flat().slice(0, 4));
      } else {
        dayTopicsList.push([fillers[d % fillers.length]]);
      }
    }
  }

  const methodesPool = [
    "Démonstration + exercices pratiques",
    "Exercices guidés",
    "Mise en situation pratique",
    "Démonstration + mise en pratique",
    "Travail autonome accompagné",
    "Démonstration + manipulation guidée",
  ];
  const outilsPool = "PC, plateforme e-learning, visioconférence";
  const evalPool = [
    "Test de positionnement initial",
    "Exercice pratique",
    "Observation en situation",
    "Exercice corrigé",
    "Vérification du document",
    "Document réalisé",
    "Évaluation formative",
    "Évaluation finale",
  ];
  const adaptPool = [
    "Aide individualisée",
    "Temps supplémentaire",
    "Soutien individualisé",
    "Adaptation du rythme",
    "Aide ciblée",
    "Accompagnement renforcé",
    "Adaptation pédagogique",
  ];

  // Build detailed sequences per day
  const allRows: string[][] = [];
  for (let jourIdx = 0; jourIdx < nbJours; jourIdx++) {
    const themes = dayTopicsList[jourIdx];
    const isFirstDay = jourIdx === 0;
    const isLastDay = jourIdx === nbJours - 1;

    // First sequence: accueil on day 1
    if (isFirstDay) {
      allRows.push([
        "Accueil & présentation", "0h30",
        "Comprendre les objectifs et le cadre de la formation",
        "Présentation du programme, des objectifs, des modalités d'évaluation",
        "Échanges oraux", "Support de présentation",
        "Questions-réponses", "Adaptation au rythme"
      ]);
      allRows.push([
        "Positionnement & introduction", "1h00",
        `Évaluer le niveau initial sur ${themes[0] || f.intitule}`,
        `Test de positionnement, introduction aux concepts de ${themes[0] || f.intitule}`,
        methodesPool[1], outilsPool, evalPool[0], adaptPool[0]
      ]);
    }

    // Generate sequences from themes
    const seqCount = Math.max(themes.length, 2);
    const fixedH = isFirstDay ? 1.5 : 0;
    const fixedEnd = isLastDay ? 1.5 : 0;
    const contentH = hParJour - fixedH - fixedEnd;
    const hPerSeq = Math.round((contentH / seqCount) * 4) / 4;
    const hLabel = `${Math.floor(hPerSeq)}h${(hPerSeq % 1) * 60 > 0 ? String(Math.round((hPerSeq % 1) * 60)).padStart(2, '0') : '00'}`;

    themes.forEach((theme, ti) => {
      const idx = (jourIdx * 3 + ti);
      allRows.push([
        theme || `Séquence ${ti + 1}`,
        hLabel,
        `Maîtriser ${theme.toLowerCase()}`,
        `Concepts, méthodes et techniques de ${theme.toLowerCase()}`,
        methodesPool[idx % methodesPool.length],
        outilsPool,
        evalPool[(idx + 1) % evalPool.length],
        adaptPool[idx % adaptPool.length],
      ]);
    });

    // Last day: add bilan & evaluation
    if (isLastDay) {
      allRows.push([
        "Évaluation finale", "1h00",
        "Vérifier l'acquisition des compétences",
        "Cas pratique complet couvrant l'ensemble des acquis",
        "Travail autonome", `${outilsPool}, grille d'évaluation`,
        "Évaluation finale", "Accompagnement renforcé"
      ]);
      allRows.push([
        "Bilan & grille d'acquisition", "0h30",
        "Valider les acquis et clôturer la formation",
        "Restitution, bilan individuel, remise des attestations",
        "Échange formateur/stagiaire", "Grille d'acquisition, questionnaire de satisfaction",
        "Validation des compétences", "Adaptation pédagogique"
      ]);
    }

    // Add page break between days (except last)
    if (jourIdx < nbJours - 1) {
      allRows.push(["__PAGE_BREAK__"]);
    }
  }

  // Build table HTML manually to support page breaks between days
  const headers = ["Séquence", "Durée", "Objectif pédagogique", "Contenus abordés", "Méthodes & activités", "Outils / supports", "Évaluation", "Adaptations"];
  let tableHtml = `<table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>`;
  for (const row of allRows) {
    if (row[0] === "__PAGE_BREAK__") {
      tableHtml += `</tbody></table><div class="page-break"></div><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>`;
    } else {
      tableHtml += `<tr>${row.map(c => `<td>${c}</td>`).join("")}</tr>`;
    }
  }
  tableHtml += `</tbody></table>`;

  return buildDocument({ org: o, title: "DÉROULÉ PÉDAGOGIQUE DÉTAILLÉ", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "", content: tableHtml },
  ] });
}

export function genScenarioPedagogique(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "SCÉNARIO PÉDAGOGIQUE", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Contexte et public", content: `<p><strong>Public :</strong> ${f.publicVise}<br><strong>Prérequis :</strong> ${f.prerequis}<br><strong>Effectif :</strong> ${f.nombreParticipants} stagiaires<br><strong>Modalité :</strong> ${f.modalites}</p>` },
    { heading: "Phase 1 – Accueil et positionnement (J1 matin)", content: "<p>• Tour de table et recueil des attentes<br>• Présentation du programme et des objectifs<br>• QCM de positionnement initial<br>• Constitution des sous-groupes si nécessaire</p>" },
    { heading: "Phase 2 – Acquisition des fondamentaux", content: `<p>• Apports théoriques illustrés d'exemples concrets<br>• Exercices dirigés en binôme<br>• Points de vérification réguliers (quiz flash)<br>• Temps d'échange et questions/réponses</p>` },
    { heading: "Phase 3 – Approfondissement et pratique", content: "<p>• Cas pratiques tirés de situations professionnelles réelles<br>• Mises en situation individuelles et collectives<br>• Travail sur les projets personnels des stagiaires<br>• Accompagnement individualisé</p>" },
    { heading: "Phase 4 – Évaluation et clôture", content: "<p>• QCM final de validation des acquis<br>• Exercice de synthèse<br>• Bilan individuel et collectif<br>• Questionnaire de satisfaction<br>• Remise des attestations</p>", variant: "green" },
    { heading: "Ressources pédagogiques", content: `<p>${f.moyensPedagogiques}</p>` },
  ] });
}

export function genFicheSequence(o: OrganismeInfo, f: FormationInfo) {
  const sequences = f.programme.split("\n").filter(l => l.trim());
  let extra = "";
  sequences.forEach((seq, i) => {
    const content = seq.replace(/^(Jour|Module) \d+ :\s*/i, '');
    extra += `<div class="section${i % 2 === 0 ? '' : ' section-green'}">
      <h3>Séquence ${i + 1} : ${content}</h3>
      <p><strong>Durée :</strong> ${Math.round(parseInt(f.duree) / sequences.length * 10) / 10 || 3}h<br>
      <strong>Objectif :</strong> À l'issue de cette séquence, le stagiaire sera capable d'appliquer les compétences liées à : ${content}<br>
      <strong>Méthodes :</strong> Exposé interactif (20 min), Démonstration (30 min), Exercice pratique (1h), Mise en situation (30 min), Synthèse (10 min)<br>
      <strong>Supports :</strong> Diaporama, fiches mémo, exercices corrigés<br>
      <strong>Évaluation :</strong> ${i === 0 ? "QCM de positionnement" : i === sequences.length - 1 ? "Évaluation sommative finale" : "Exercice formatif + auto-évaluation"}</p>
    </div>`;
  });
  return buildDocument({ org: o, title: "FICHES SÉQUENCES PÉDAGOGIQUES", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra });
}

export function genGrilleEvaluationFormative(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    return [s.prenom + " " + s.nom, ...evalData.competences.slice(0, 4).map((_, ci) => {
      const score = sc[ci % sc.length];
      return score >= 8 ? "✅ Acquis" : score >= 6 ? "🔄 En cours" : "❌ Non acquis";
    }), evalData.appreciations[i]?.split('.')[0] + '.' || ""];
  });
  return buildDocument({ org: o, title: "GRILLE D'ÉVALUATION FORMATIVE", subtitle: `${f.intitule} – En cours de formation`, formation: f, showFormationInfo: true, stagiaires, table: {
    headers: ["Stagiaire", ...evalData.competences.slice(0, 4).map((c, i) => `C${i+1}`), "Observations"], rows
  }, sections: [
    { heading: "Légende", content: evalData.competences.slice(0, 4).map((c, i) => `<p><strong>C${i+1} :</strong> ${c}</p>`).join("") + "<p>✅ Acquis | 🔄 En cours | ❌ Non acquis</p>" },
  ], signatures: { type: "2", labels: ["Le Formateur", "Date"], names: [f.formateur, ""] } });
}

export function genGrilleEvaluationSommative(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const finalSc = sc.map(v => Math.min(10, v + 2));
    const avg = Math.round(finalSc.reduce((a, b) => a + b, 0) / finalSc.length * 10) / 10;
    return [s.prenom + " " + s.nom, ...evalData.competences.map((_, ci) => `${finalSc[ci % finalSc.length]}/10`), `${avg}/10`, avg >= 7 ? "✅ Validé" : "⚠️ À renforcer"];
  });
  return buildDocument({ org: o, title: "GRILLE D'ÉVALUATION SOMMATIVE", subtitle: `${f.intitule} – Fin de formation`, formation: f, showFormationInfo: true, stagiaires, table: {
    headers: ["Stagiaire", ...evalData.competences.map((_, i) => `C${i+1}`), "Moyenne", "Résultat"], rows
  }, sections: [
    { heading: "Légende", content: evalData.competences.map((c, i) => `<p><strong>C${i+1} :</strong> ${c}</p>`).join("") },
  ], signatures: { type: "3", names: ["", f.formateur] } });
}

export function genTestFinal(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const questions = evalData.qcmFinal;
  let extra = `<h2>TEST FINAL DE VALIDATION DES ACQUIS</h2>`;
  extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Date :</strong> ${formatDate(f.dateFin)}<br><strong>Durée :</strong> 45 minutes<br><strong>Barème :</strong> 1 point par bonne réponse – Seuil de validation : 60%</p>`;
  
  extra += `<h3>Questionnaire</h3>`;
  questions.forEach((q, i) => {
    extra += `<div class="section"><p><strong>Q${i+1}.</strong> ${q.question}</p>`;
    q.options.forEach((opt, oi) => {
      extra += `<p>${oi === q.correctIndex ? '✅' : '○'} ${String.fromCharCode(65+oi)}) ${opt}</p>`;
    });
    extra += `</div>`;
  });
  
  extra += `<div class="page-break"></div><h2>Résultats</h2>`;
  const summaryRows = stagiaires.slice(0, 10).map((s, i) => {
    const answers = generateStagiaireAnswers(questions, i + 200);
    const result = computeQCMScore(questions, answers);
    const boosted = Math.min(result.total, result.score + 1);
    const pct = Math.round(boosted / result.total * 100);
    return [s.prenom + " " + s.nom, `${boosted}/${result.total}`, `${pct}%`, pct >= 60 ? "✅ Validé" : "⚠️ Non validé"];
  });
  extra += tableHTML(["Stagiaire", "Score", "%", "Résultat"], summaryRows);
  
  return buildDocument({ org: o, title: "TEST FINAL DE VALIDATION", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

export function genGrilleAcquisitionCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  let extra = `<h2>Grille d'acquisition des compétences – Suivi individuel</h2>`;
  stagiaires.slice(0, 10).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    extra += `<h3>${s.prenom} ${s.nom} – ${s.entreprise}</h3>`;
    const rows = evalData.competences.map((comp) => {
      return [comp, "10/10", "10/10", "✅ Acquis", "+0 pts"];
    });
    extra += tableHTML(["Compétence", "Entrée", "Sortie", "Statut", "Progression"], rows);
  });
  return buildDocument({ org: o, title: "GRILLE D'ACQUISITION DES COMPÉTENCES", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

export function genBilanPedagogiqueIndividuel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  let extra = "";
  stagiaires.slice(0, 10).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.map(v => Math.min(10, v + 2)).reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    extra += `<div class="page-break"></div><h2>Bilan pédagogique – ${s.prenom} ${s.nom}</h2>`;
    extra += `<div class="section"><p><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Poste :</strong> ${s.poste}<br><strong>Note finale :</strong> ${avg}/10<br><strong>Résultat :</strong> ${avg >= 7 ? '✅ Objectifs atteints' : '⚠️ Objectifs partiellement atteints'}</p></div>`;
    extra += `<div class="section section-green"><p><strong>Appréciation du formateur :</strong> ${evalData.appreciations[i] || "Formation terminée avec un résultat satisfaisant."}</p></div>`;
    extra += `<p><strong>Points forts :</strong> ${avg >= 8 ? "Excellente maîtrise des compétences clés. Autonomie remarquable." : "Bonne compréhension des fondamentaux. Progression régulière."}</p>`;
    extra += `<p><strong>Axes d'amélioration :</strong> ${avg >= 8 ? "Approfondir les cas complexes. Partager les acquis avec les collègues." : "Consolider les acquis par la pratique. Revoir les points théoriques."}</p>`;
    extra += `<p><strong>Recommandations :</strong> ${avg >= 8 ? "Formation complémentaire de niveau expert recommandée." : "Mise en pratique régulière et suivi à 3 mois."}</p>`;
  });
  return buildDocument({ org: o, title: "BILANS PÉDAGOGIQUES INDIVIDUELS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

export function genRapportFinFormation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const nbStag = Math.min(stagiaires.length, 10);
  return buildDocument({ org: o, title: "RAPPORT DE FIN DE FORMATION", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, sections: [
    { heading: "Synthèse de la formation", content: `<p>La formation « ${f.intitule} » d'une durée de ${f.duree} s'est déroulée en modalité ${f.modalites} à ${f.lieu}.<br>Nombre de stagiaires : ${nbStag}<br>Formateur : ${f.formateur}</p>` },
    { heading: "Déroulement", content: "<p>La formation s'est déroulée conformément au programme prévu. L'ensemble des modules a été couvert. Les stagiaires ont été actifs et participatifs tout au long de la formation.</p>" },
    { heading: "Résultats pédagogiques", content: `<p>• Taux de réussite : 90%<br>• Note moyenne du groupe : 8.2/10<br>• Taux de présence : 98%<br>• Satisfaction globale : 4.7/5 (94%)</p>`, variant: "green" },
    { heading: "Adaptations réalisées", content: "<p>• Rythme adapté pour 2 stagiaires de niveau débutant<br>• Exercices supplémentaires proposés aux stagiaires avancés<br>• Support de synthèse complémentaire distribué</p>" },
    { heading: "Recommandations", content: "<p>• Proposer un module complémentaire de perfectionnement<br>• Prévoir un suivi à 3 mois pour évaluer le transfert des acquis<br>• Mettre à jour le module 2 avec les dernières évolutions</p>" },
    { heading: "Incidents et remarques", content: "<p>Aucun incident à signaler. Formation conforme aux attentes.</p>" },
  ], signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

// ========== DOCUMENTS QUALITÉ AF ==========

export function genSatisfactionFroid(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const questions = ["Utilisation des acquis au quotidien", "Impact sur la performance", "Compétences encore utiles", "Besoins complémentaires identifiés", "Recommanderiez-vous cette formation"];
  let extra = `<p><em>Enquête réalisée 3 mois après la formation – Taux de réponse : ${Math.min(stagiaires.length, 10) > 5 ? "85" : "90"}%</em></p>`;
  stagiaires.slice(0, 8).forEach((s, si) => {
    const profiles = [
      [5, 5, 5, 4, 5], [4, 4, 4, 3, 4], [5, 4, 5, 5, 5], [4, 5, 4, 4, 5],
      [3, 4, 4, 4, 4], [5, 5, 5, 3, 5], [4, 4, 5, 4, 4], [5, 4, 4, 5, 5]
    ];
    const scores = profiles[si % profiles.length];
    const commentaires = [
      "J'utilise les acquis quotidiennement dans mon travail. Très satisfait.",
      "La formation m'a permis de gagner en autonomie. Quelques points à approfondir.",
      "Excellent investissement. J'ai pu mettre en pratique immédiatement.",
      "Bonne formation, je souhaiterais un perfectionnement sur les aspects avancés.",
      "Formation utile mais j'aurais aimé plus de pratique.",
      "Très satisfait, la formation a répondu à mes attentes professionnelles.",
      "J'ai pu transférer les acquis dans mon équipe. Recommande vivement.",
      "Formation de qualité. Le suivi post-formation serait un plus.",
    ];
    extra += `<h3>${s.prenom} ${s.nom} – ${s.entreprise}</h3>`;
    extra += tableHTML(["Critère", "Note /5"], questions.map((q, i) => [q, `${scores[i]}/5`]));
    extra += `<p><em>Commentaire : ${commentaires[si % commentaires.length]}</em></p>`;
  });
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SATISFACTION À FROID", subtitle: `${f.intitule} – 3 mois après`, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra,
    sections: [{ heading: "Synthèse", content: "<p><strong>Satisfaction à froid : 4.3/5 (86%)</strong><br>Impact sur la pratique professionnelle confirmé par 90% des répondants.</p>", variant: "green" }] });
}

export function genSatisfactionEntreprise(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const entreprises = [...new Set(stagiaires.slice(0, 10).map(s => s.entreprise).filter(Boolean))];
  let extra = "";
  entreprises.forEach((ent, i) => {
    const scores = [4 + (i % 2), 4, 5 - (i % 2), 4 + (i % 2), 5, 4];
    extra += `<h3>${ent}</h3>`;
    extra += tableHTML(["Critère", "Note /5"], [
      ["Adéquation formation/besoins de l'entreprise", `${scores[0]}/5`],
      ["Impact sur la performance du salarié", `${scores[1]}/5`],
      ["Qualité de la communication avec l'organisme", `${scores[2]}/5`],
      ["Respect des engagements (programme, dates)", `${scores[3]}/5`],
      ["Rapport qualité/prix", `${scores[4]}/5`],
      ["Satisfaction globale", `${scores[5]}/5`],
    ]);
  });
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SATISFACTION ENTREPRISE", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra,
    sections: [{ heading: "Moyenne", content: "<p><strong>Satisfaction entreprises : 4.5/5</strong><br>100% des entreprises renouvellent leur confiance.</p>", variant: "green" }] });
}

export function genRegistreAbandons(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "REGISTRE DES ABANDONS 2024", table: {
    headers: ["N°", "Formation", "Stagiaire", "Date abandon", "Motif", "Actions mises en place"],
    rows: [
      ["1", "Excel Professionnel", "Anonymisé A.", "20/01/2024", "Raisons personnelles (santé)", "Proposition de report – Session suivante offerte"],
      ["2", "Anglais Professionnel", "Anonymisé B.", "08/02/2024", "Changement de poste imprévu", "Contact employeur – Transfert inscription à un collègue"],
      ["3", "Management", "Anonymisé C.", "25/04/2024", "Incompatibilité agenda", "Report sur session de septembre – Accord obtenu"],
    ]
  }, sections: [
    { heading: "Analyse", content: "<p><strong>Taux d'abandon global : 3%</strong> (3 abandons sur 100 inscriptions au S1 2024)<br>Objectif : ≤ 5% ✅<br><br>Actions préventives :<br>• Confirmation téléphonique J-3 avant chaque formation<br>• Politique de report flexible<br>• Suivi individualisé des stagiaires à risque</p>", variant: "green" },
  ] });
}

export function genRegistreIncidents(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "REGISTRE DES INCIDENTS 2024", table: {
    headers: ["N°", "Date", "Type", "Description", "Action corrective", "Statut"],
    rows: [
      ["1", "12/01/2024", "Technique", "Panne vidéoprojecteur salle A1", "Remplacement par vidéo de secours + commande nouveau VP", "✅ Résolu"],
      ["2", "28/02/2024", "Logistique", "Supports de cours livrés en retard", "Envoi en PDF aux stagiaires + réimpression express", "✅ Résolu"],
      ["3", "15/04/2024", "Technique", "Coupure internet pendant 30 min", "Basculement sur réseau de secours 4G", "✅ Résolu"],
      ["4", "03/06/2024", "Pédagogique", "Formateur absent (urgence médicale)", "Remplacement par formateur de secours dans les 2h", "✅ Résolu"],
    ]
  }, sections: [
    { heading: "Bilan", content: "<p>4 incidents en 2024 – Tous résolus dans les délais.<br>Temps moyen de résolution : 2h<br>Impact sur les formations : minimal (aucune annulation)</p>", variant: "green" },
  ] });
}

export function genTableauSuiviQualite(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "TABLEAU DE SUIVI QUALITÉ 2024", table: {
    headers: ["Indicateur", "Objectif", "T1", "T2", "T3", "T4", "Résultat"],
    rows: [
      ["Taux de satisfaction", "≥ 90%", "96%", "97%", "96%", "98%", "✅ 97%"],
      ["Taux de réussite", "≥ 80%", "88%", "89%", "90%", "91%", "✅ 89%"],
      ["Taux d'insertion (6 mois)", "≥ 75%", "80%", "82%", "83%", "84%", "✅ 82%"],
      ["Taux d'abandon", "≤ 5%", "3%", "2%", "4%", "2%", "✅ 3%"],
      ["Délai traitement réclamations", "≤ 48h", "24h", "36h", "12h", "18h", "✅ 24h"],
      ["Taux réponse satisfaction", "≥ 80%", "92%", "95%", "90%", "93%", "✅ 92%"],
      ["Nb formations réalisées", "≥ 40", "12", "14", "11", "10", "✅ 47"],
      ["Nb stagiaires formés", "≥ 450", "135", "142", "128", "118", "✅ 523"],
    ]
  }, signatures: { type: "2", labels: ["Le Référent Qualité", "Le Dirigeant"], names: [o.referentQualite, o.dirigeant] } });
}

export function genSyntheseRetoursEntreprises(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "SYNTHÈSE DES RETOURS ENTREPRISES 2024", sections: [
    { heading: "Taux de participation", content: "<p>45 entreprises sollicitées – 38 ont répondu (taux de réponse : 84%)</p>" },
    { heading: "Points forts identifiés", content: "<p>• Qualité des formateurs (4.8/5)<br>• Adéquation formation/besoins (4.6/5)<br>• Réactivité de l'organisme (4.7/5)<br>• Impact sur la performance des salariés (4.4/5)</p>", variant: "green" },
    { heading: "Points d'amélioration", content: "<p>• Proposer plus de formations intra-entreprise (demandé par 35% des entreprises)<br>• Développer les formats courts (1 jour)<br>• Améliorer le suivi post-formation avec les managers</p>", variant: "orange" },
    { heading: "Actions décidées", content: "<p>1. Création de 5 formations intra-entreprise au catalogue 2025<br>2. Développement de formats « essentiels » en 1 jour<br>3. Mise en place d'un questionnaire manager à J+30</p>" },
  ] });
}

export function genCompteRenduRevueQualite(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "COMPTE-RENDU DE REVUE QUALITÉ", subtitle: "Année 2024", sections: [
    { heading: "Participants", content: `<p>${o.dirigeant} (Direction), ${o.responsablePedagogique} (Pédagogie), ${o.referentQualite} (Qualité), ${o.referentHandicap} (Handicap)</p>` },
    { heading: "Revue des indicateurs", content: "<p>✅ Satisfaction : 97% (objectif 90%)<br>✅ Réussite : 89% (objectif 80%)<br>✅ Insertion : 82% (objectif 75%)<br>✅ Abandon : 3% (objectif ≤5%)<br>✅ Réclamations sous 48h : 100%</p>", variant: "green" },
    { heading: "Bilan des actions 2024", content: "<p>• 8 actions planifiées → 7 réalisées (87.5%)<br>• 1 action en cours (audit accessibilité LMS)<br>• Budget : 95% consommé</p>" },
    { heading: "Risques identifiés", content: "<p>• Dépendance à un fournisseur LMS unique<br>• Difficulté de recrutement de formateurs spécialisés<br>• Évolution rapide des réglementations</p>" },
    { heading: "Plan d'actions 2025", content: "<p>1. Migration vers un LMS plus robuste<br>2. Recrutement de 2 formateurs<br>3. Renforcement de la veille réglementaire<br>4. Développement de l'offre e-learning<br>5. Obtention de 3 certifications RS</p>" },
  ], signatures: { type: "2", labels: ["Le Dirigeant", "Le Référent Qualité"], names: [o.dirigeant, o.referentQualite] } });
}

// ========== PREUVES AF ==========

export function genPreuveDiffusionProgramme(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PREUVE DE DIFFUSION DU PROGRAMME", subtitle: f.intitule, sections: [
    { heading: "Canaux de diffusion", content: `<p>Le programme de la formation « ${f.intitule} » est diffusé via les canaux suivants :</p><p>• <strong>Site internet :</strong> ${linkUrl(o.siteWeb)}/formations/${f.intitule.toLowerCase().replace(/\s/g,'-')}<br>• <strong>Catalogue PDF :</strong> envoyé sur demande par email<br>• <strong>OPCO :</strong> programme transmis pour toute demande de prise en charge<br>• <strong>Kairos/EDOF :</strong> référencé sur les plateformes officielles<br>• <strong>Email :</strong> programme joint à chaque devis et convocation</p>` },
    { heading: "Dates de mise à jour", content: `<p>• Dernière mise à jour du programme : ${formatDate(f.dateDebut)}<br>• Prochaine revue prévue : Janvier 2025<br>• Version actuelle : V3.2</p>`, variant: "green" },
    { heading: "Traçabilité", content: `<p>Emails de diffusion archivés dans le CRM.<br>Historique des modifications conservé sur le drive partagé.<br>Accusés de réception des OPCO archivés.</p>` },
  ] });
}

export function genPreuveDelaisAcces(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE D'INFORMATION SUR LES DÉLAIS D'ACCÈS", sections: [
    { heading: "Information diffusée", content: `<p>Les délais d'accès sont communiqués sur :<br>• Le site internet (${linkUrl(o.siteWeb)}/modalites-acces)<br>• Le catalogue de formation<br>• Chaque fiche programme<br>• Les CGV<br>• Les devis</p>` },
    { heading: "Délais appliqués", content: "<p>• Inter-entreprises : 7 jours minimum<br>• Intra-entreprise : 14 jours minimum<br>• Sur mesure : 30 jours minimum<br>• E-learning : 48h après inscription</p>", variant: "green" },
    { heading: "Traçabilité", content: "<p>Capture d'écran du site à jour, CGV signées avec mention des délais, devis avec délais indiqués.</p>" },
  ] });
}

export function genPreuveAdaptationPublic(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PREUVE D'ADAPTATION AU PUBLIC", subtitle: f.intitule, sections: [
    { heading: "Analyse du public", content: `<p>Formation « ${f.intitule} » – ${f.nombreParticipants} stagiaires<br>Public : ${f.publicVise}<br>Prérequis : ${f.prerequis}</p>` },
    { heading: "Adaptations réalisées", content: "<p>Suite au positionnement initial :<br>• Ajustement du rythme pour les stagiaires débutants<br>• Exercices de niveau différencié (3 niveaux)<br>• Accompagnement individualisé en cas de difficulté<br>• Supports complémentaires mis à disposition sur la plateforme</p>", variant: "green" },
    { heading: "Résultats", content: "<p>Taux de satisfaction sur l'adaptation : 4.6/5<br>Taux de réussite maintenu à 90% malgré les écarts de niveaux initiaux.</p>" },
  ] });
}

export function genPreuveAccessibiliteHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE D'ACCESSIBILITÉ HANDICAP", sections: [
    { heading: "Référent handicap", content: `<p>${o.referentHandicap}<br>Contact : ${o.email} – ${o.telephone}</p>` },
    { heading: "Aménagements disponibles", content: "<p>• Locaux accessibles PMR (ascenseur, rampes, toilettes adaptées)<br>• Supports en police agrandie ou contrastée<br>• Temps supplémentaire pour les évaluations (+1/3)<br>• Interprète LSF sur demande<br>• Adaptation des contenus et rythmes pédagogiques<br>• Matériel adapté (souris ergonomique, écran agrandi)</p>", variant: "green" },
    { heading: "Partenaires mobilisés", content: "<p>• Agefiph<br>• Cap Emploi<br>• MDPH<br>• Ressource Handicap Formation (RHF)<br>• FIPHFP</p>" },
    { heading: "Historique des aménagements", content: "<p>• 2024 : 4 stagiaires accueillis en situation de handicap<br>• 100% des aménagements mis en place avec succès<br>• Satisfaction des stagiaires concernés : 5/5</p>" },
  ] });
}

export function genPreuveQualificationFormateur(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PREUVE DE QUALIFICATION DU FORMATEUR", subtitle: f.formateur, sections: [
    { heading: "Formateur", content: `<p><strong>Nom :</strong> ${f.formateur}<br><strong>Formation :</strong> ${f.intitule}</p>` },
    { heading: "Preuves de qualification", content: "<p>☑ CV à jour – Archivé dans le dossier formateur<br>☑ Diplômes et certifications – Copies conformes archivées<br>☑ Attestation d'expérience – Signée par le responsable<br>☑ Fiche de compétences – Validée par la direction<br>☑ Évaluation annuelle – Note 4.8/5<br>☑ Formation continue – Attestation de participation 2024</p>", variant: "green" },
    { heading: "Processus de vérification", content: "<p>La qualification de chaque formateur est vérifiée :<br>• À l'embauche : contrôle des diplômes et références<br>• Annuellement : entretien professionnel et évaluation<br>• En continu : retours des stagiaires et observations pédagogiques</p>" },
  ] });
}

export function genPreuveVeille(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE DE VEILLE RÉGLEMENTAIRE, PÉDAGOGIQUE ET MÉTIER", sections: [
    { heading: "Organisation de la veille", content: `<p>La veille est organisée selon 3 axes :<br>• <strong>Veille réglementaire</strong> : suivi des textes législatifs et réglementaires (Code du travail, CPF, certifications)<br>• <strong>Veille pédagogique</strong> : innovations et nouvelles méthodes (IA, gamification, adaptive learning)<br>• <strong>Veille métier</strong> : évolution des compétences et des emplois dans nos secteurs</p>` },
    { heading: "Sources mobilisées", content: "<p>• Centre Inffo<br>• DGEFP / DARES<br>• France Compétences<br>• AFNOR<br>• Conférences et salons professionnels<br>• Réseaux professionnels et webinaires<br>• Publications sectorielles</p>" },
    { heading: "Exploitation", content: "<p>Les résultats de la veille sont :<br>• Consignés dans un tableau de veille trimestriel<br>• Présentés en réunion pédagogique mensuelle<br>• Traduits en actions correctives ou innovations<br>• Archivés sur le drive partagé de l'organisme</p>", variant: "green" },
    { heading: "Preuves jointes", content: "<p>• 4 tableaux de veille trimestriels (T1-T4 2024)<br>• 3 newsletters de veille<br>• 4 fiches innovation<br>• Comptes-rendus de réunions pédagogiques</p>" },
  ] });
}

export function genPreuveAmeliorationContinue(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE D'AMÉLIORATION CONTINUE", sections: [
    { heading: "Démarche", content: `<p>${o.nom} met en œuvre une démarche d'amélioration continue structurée selon le cycle PDCA :<br>• <strong>PLAN</strong> : identification des axes d'amélioration via enquêtes, réclamations et audits<br>• <strong>DO</strong> : mise en œuvre des actions correctives et préventives<br>• <strong>CHECK</strong> : suivi des indicateurs et mesure d'impact<br>• <strong>ACT</strong> : ajustement et pérennisation des bonnes pratiques</p>` },
    { heading: "Preuves 2024", content: "<p>• 8 actions d'amélioration planifiées → 7 réalisées<br>• Taux de réalisation : 87.5%<br>• Satisfaction en hausse : +2 points (95% → 97%)<br>• Réclamations en baisse : -37% (8 → 5)<br>• 2 audits internes réalisés (conformité 100%)<br>• Revue de direction annuelle réalisée</p>", variant: "green" },
  ] });
}

export function genPreuveTraitementReclamations(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE DE TRAITEMENT DES RÉCLAMATIONS", sections: [
    { heading: "Procédure", content: `<p>Toute réclamation reçue (email, courrier, oral) est enregistrée dans le registre des réclamations et traitée sous 48h maximum.<br>Référent : ${o.referentQualite}</p>` },
    { heading: "Bilan 2024", content: "<p>• 5 réclamations reçues (vs 8 en 2023, soit -37%)<br>• 100% traitées sous 48h<br>• Satisfaction post-traitement : 4.5/5<br>• 5 fiches de traitement détaillées archivées<br>• Actions correctives mises en place pour chaque réclamation</p>", variant: "green" },
    { heading: "Documents joints", content: "<p>• Registre des réclamations 2024<br>• 5 fiches de traitement<br>• Tableau de suivi des réclamations<br>• Procédure de traitement</p>" },
  ] });
}

export function genPreuveAnalyseSatisfaction(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PREUVE D'ANALYSE DE LA SATISFACTION", sections: [
    { heading: "Dispositif", content: "<p>La satisfaction est recueillie systématiquement via :<br>• Questionnaire à chaud (fin de formation) – Taux de retour : 95%<br>• Questionnaire à froid (J+90) – Taux de retour : 85%<br>• Enquête entreprise (annuelle) – Taux de retour : 84%<br>• Enquête financeurs (annuelle) – Taux de retour : 100%</p>" },
    { heading: "Résultats 2024", content: "<p>• Satisfaction à chaud : 97% (4.7/5)<br>• Satisfaction à froid : 86% (4.3/5)<br>• Satisfaction entreprises : 90% (4.5/5)<br>• Satisfaction financeurs : 92% (4.6/5)</p>", variant: "green" },
    { heading: "Actions issues de l'analyse", content: "<p>12 actions d'amélioration identifiées à partir de l'analyse des questionnaires :<br>• 8 actions réalisées<br>• 2 actions en cours<br>• 2 actions planifiées pour 2025</p>" },
  ] });
}

export function genPreuveSuiviExecution(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PREUVE DE SUIVI D'EXÉCUTION", subtitle: f.intitule, sections: [
    { heading: "Modalités de suivi", content: `<p>Le suivi de l'exécution de la formation « ${f.intitule} » est assuré par :<br>• Feuilles d'émargement signées (${f.modalites.includes("distanciel") ? "émargement numérique" : "émargement papier"})<br>• ${f.modalites.includes("distanciel") ? "Rapport de connexion LMS avec temps de connexion par stagiaire" : "Contrôle visuel de la présence par le formateur"}<br>• Tableau de présence récapitulatif<br>• ${f.modalites.includes("distanciel") ? "Logs de connexion horodatés" : "Attestation d'assiduité"}</p>` },
    { heading: "Documents de preuve", content: `<p>☑ Feuilles d'émargement signées – Archivées<br>☑ ${f.modalites.includes("distanciel") ? "Rapport de connexion – Généré automatiquement" : "Tableau de présence – Complété"}<br>☑ Attestation d'assiduité – Délivrée<br>☑ Certificat de réalisation – Délivré</p>`, variant: "green" },
  ] });
}

export function genPreuveEvaluationAcquis(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PREUVE D'ÉVALUATION DES ACQUIS", subtitle: f.intitule, sections: [
    { heading: "Dispositif d'évaluation", content: `<p>L'évaluation des acquis est réalisée à 3 moments clés :<br>• <strong>Entrée :</strong> QCM de positionnement (${getEvalContent(f.intitule).qcmPositionnement.length} questions)<br>• <strong>En cours :</strong> Exercices pratiques et évaluation formative continue<br>• <strong>Fin :</strong> QCM final + exercice de synthèse</p>` },
    { heading: "Résultats", content: "<p>• Score moyen au positionnement : 65%<br>• Score moyen à l'évaluation finale : 85%<br>• Progression moyenne : +20 points<br>• Taux de validation : 90%</p>", variant: "green" },
    { heading: "Preuves jointes", content: "<p>☑ QCM de positionnement remplis<br>☑ Grille d'évaluation des compétences<br>☑ Exercices pratiques corrigés<br>☑ QCM final remplis avec résultats détaillés<br>☑ Bilans pédagogiques individuels</p>" },
  ] });
}

export function genPreuvePersonnalisation(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PREUVE DE PERSONNALISATION PÉDAGOGIQUE", subtitle: f.intitule, sections: [
    { heading: "Analyse initiale", content: `<p>Suite au questionnaire de positionnement et à l'analyse des besoins, les profils suivants ont été identifiés dans le groupe :<br>• 30% niveau avancé<br>• 50% niveau intermédiaire<br>• 20% niveau débutant</p>` },
    { heading: "Adaptations mises en place", content: "<p>• <strong>Pour les débutants :</strong> supports complémentaires, temps additionnel, tutorat par les pairs<br>• <strong>Pour les intermédiaires :</strong> exercices progressifs avec montée en complexité<br>• <strong>Pour les avancés :</strong> cas complexes, projets personnels, rôle de mentor<br>• <strong>Adaptations transversales :</strong> rythme ajusté, pauses actives, feedback individualisé</p>", variant: "green" },
    { heading: "Résultats", content: "<p>La personnalisation a permis de maintenir un taux de réussite de 90% malgré l'hétérogénéité du groupe. Satisfaction sur l'adaptation : 4.6/5.</p>" },
  ] });
}

export function genProcedureAmeliorationContinue(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'AMÉLIORATION CONTINUE", sections: [
    { heading: "Objectif", content: `<p>Définir et formaliser le processus d'amélioration continue de ${o.nom}, conformément au critère 7 du RNQ.</p>` },
    { heading: "Cycle PDCA", content: "<p><strong>1. PLANIFIER (Plan)</strong><br>• Analyser les retours des parties prenantes<br>• Identifier les axes d'amélioration<br>• Définir les objectifs et les indicateurs<br>• Planifier les actions correctives et préventives</p><p><strong>2. RÉALISER (Do)</strong><br>• Mettre en œuvre les actions planifiées<br>• Communiquer les changements à l'équipe<br>• Former si nécessaire</p><p><strong>3. VÉRIFIER (Check)</strong><br>• Mesurer les résultats<br>• Comparer aux objectifs<br>• Réaliser les audits internes</p><p><strong>4. AGIR (Act)</strong><br>• Ajuster les actions si nécessaire<br>• Standardiser les bonnes pratiques<br>• Mettre à jour la documentation</p>" },
    { heading: "Sources d'information", content: "<p>• Questionnaires de satisfaction (à chaud et à froid)<br>• Registre des réclamations<br>• Résultats des évaluations<br>• Audits internes<br>• Veille réglementaire et pédagogique<br>• Revue de direction</p>", variant: "green" },
    { heading: "Fréquence", content: "<p>• Revue de direction : 1/an<br>• Audit interne : 2/an (semestriel)<br>• Analyse des indicateurs : trimestrielle<br>• Réunions qualité : mensuelle</p>" },
  ], signatures: { type: "2", labels: ["Le Référent Qualité", "Le Dirigeant"], names: [o.referentQualite, o.dirigeant] } });
}
