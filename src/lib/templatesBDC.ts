/**
 * Templates "Bilans de Compétences" (BDC)
 * Vocabulaire : bénéficiaire (pas stagiaire), consultant(e) (pas formateur),
 *               phases d'accompagnement (pas modules de cours)
 */
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, subtractBusinessDays, tableHTML, section, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireTarif, getStagiaireDuree, g, getDocStyle, footer, orgHeader, htmlWrap, applyGender } from "./docBuilder";
import { FormateurInfo, parseDuree } from "./sampleData";

// ---------- helpers ----------
function consultantName(o: OrganismeInfo): string {
  return o.responsablePedagogique || o.dirigeant || "Le/la consultant(e)";
}
function beneficiaireLabel(s: StagiaireInfo): string {
  return `${s.prenom || "Prénom"} ${s.nom || "NOM"}`;
}
function sigDateBDC(s: StagiaireInfo | undefined, f: FormationInfo): string {
  const ref = s?.dateDebutFormation || f.dateDebut || "";
  return ref ? formatDate(subtractBusinessDays(ref, 14)) : new Date().toLocaleDateString("fr-FR");
}
function endDate(s: StagiaireInfo | undefined, f: FormationInfo): string {
  return formatDate(s?.dateFinFormation || f.dateFin || "");
}
function startDate(s: StagiaireInfo | undefined, f: FormationInfo): string {
  return formatDate(s?.dateDebutFormation || f.dateDebut || "");
}
function dureeLabel(f: FormationInfo): string {
  return f.duree || "24 heures";
}
function phasesDates(f: FormationInfo) {
  const d0 = new Date(f.dateDebut || Date.now());
  const dEnd = new Date(f.dateFin || Date.now());
  const total = dEnd.getTime() - d0.getTime();
  const p1End = new Date(d0.getTime() + total * 0.2);
  const p2Start = new Date(p1End.getTime() + 86400000);
  const p2End = new Date(d0.getTime() + total * 0.75);
  const p3Start = new Date(p2End.getTime() + 86400000);
  const fmt = (d: Date) => d.toLocaleDateString("fr-FR");
  return { p1: { start: fmt(d0), end: fmt(p1End) }, p2: { start: fmt(p2Start), end: fmt(p2End) }, p3: { start: fmt(p3Start), end: fmt(dEnd) } };
}

type BdcDomainProfile = {
  label: string;
  metier: string;
  secteur: string;
  missions: string[];
  techniques: string[];
  transversales: string[];
  contraintes: string[];
  formations: string[];
  opportunites: string[];
  axes: string[];
  veilleReglementaire: { intitule: string; source: string; lien: string; date: string; exploitation: string };
  veilleMetier: { intitule: string; source: string; lien: string; date: string; exploitation: string };
  veilleTechnologique: { intitule: string; source: string; lien: string; date: string; exploitation: string };
};

function normalizeBdc(value: string): string {
  return (value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function listHtml(items: string[]): string {
  return `<p>${items.map((item) => `• ${item}`).join("<br>")}</p>`;
}

function deterministicIndex(s: StagiaireInfo | undefined, si: number, length: number, offset = 0): number {
  if (length <= 0) return 0;
  const raw = `${s?.prenom || ""}${s?.nom || ""}${s?.email || ""}${si}`;
  const sum = raw.split("").reduce((acc, char, idx) => acc + char.charCodeAt(0) * (idx + 3), 0);
  return Math.abs(sum + si * 37 + offset * 53) % length;
}

function pickForBeneficiaire(s: StagiaireInfo | undefined, si: number, items: string[], offset = 0): string {
  return items[deterministicIndex(s, si, items.length, offset)] || items[0] || "";
}

function getBdcDomainProfile(f: FormationInfo): BdcDomainProfile {
  const key = normalizeBdc(f.intitule || "");
  if (key.includes("esthetique") || key.includes("cosmetique") || key.includes("parfumerie")) {
    return {
      label: "CAP Esthétique Cosmétique Parfumerie",
      metier: "esthéticien(ne)-cosméticien(ne)",
      secteur: "instituts de beauté, parfumeries, spas et espaces bien-être",
      missions: ["accueillir et conseiller la clientèle", "réaliser des soins visage et corps", "effectuer les épilations, manucures et maquillages", "vendre des produits cosmétiques et parfums", "appliquer les règles strictes d'hygiène et de sécurité"],
      techniques: ["diagnostic de peau et protocole de soin visage", "épilation à la cire et soins post-épilation", "maquillage jour/soir et conseil image", "manucure, beauté des pieds et pose de vernis", "vente-conseil en cosmétique et parfumerie"],
      transversales: ["écoute client et reformulation du besoin", "sens esthétique et précision du geste", "hygiène professionnelle irréprochable", "gestion du planning de rendez-vous", "posture commerciale en cabine et en boutique"],
      contraintes: ["station debout prolongée et gestes répétitifs", "travail possible le samedi et en horaires élargis", "respect rigoureux des protocoles d'hygiène", "contact clientèle permanent", "nécessité de suivre les tendances beauté"],
      formations: ["CAP Esthétique Cosmétique Parfumerie", "CQP spa praticien ou maquillage conseil", "formation hygiène/salubrité selon prestations", "perfectionnement vente-conseil en parfumerie"],
      opportunites: ["emploi en institut de beauté", "poste de conseillère en parfumerie", "spécialisation soins visage/corps", "création d'une activité indépendante à domicile ou en cabine", "évolution vers responsable d'institut"],
      axes: ["renforcer la précision des protocoles de soin", "gagner en aisance dans la vente conseil", "sécuriser les règles d'hygiène en cabine", "structurer un projet d'installation indépendante"],
      veilleReglementaire: { intitule: "Actualisation des obligations d'hygiène pour les prestations esthétiques", source: "Légifrance – Code de la santé publique et règles d'hygiène applicables", lien: "https://www.legifrance.gouv.fr", date: "Décembre 2024", exploitation: "Point intégré aux entretiens sur les conditions réelles d'exercice en institut : hygiène du matériel, traçabilité des produits, contre-indications et information client. Les bénéficiaires orientés vers l'indépendance reçoivent une vigilance spécifique sur les obligations sanitaires." },
      veilleMetier: { intitule: "Évolution des métiers beauté : soins naturels, expérience client et vente omnicanale", source: "CIDJ – Fiche métier esthéticienne-cosméticienne", lien: "https://www.cidj.com", date: "Janvier 2025", exploitation: "Utilisé pendant l'enquête métier pour comparer les environnements institut, parfumerie et activité indépendante. Les plans d'action intègrent les compétences de conseil, fidélisation client et visibilité digitale." },
      veilleTechnologique: { intitule: "Nouveaux équipements de soin visage, diagnostic peau et outils de réservation", source: "Esthétique Pro – veille équipements et gestion d'institut", lien: "https://www.esthetique-pro.fr", date: "Février 2025", exploitation: "Présenté en phase d'investigation pour identifier les investissements utiles, les limites réglementaires et les compétences numériques nécessaires à la gestion d'une clientèle." },
    };
  }
  if (key.includes("mecanique") || key.includes("vehicule") || key.includes("automobile")) {
    return {
      label: "CAP Maintenance des véhicules / Mécanique automobile",
      metier: "mécanicien(ne) de maintenance automobile",
      secteur: "garages, concessions, centres auto et ateliers de maintenance véhicules",
      missions: ["réaliser un diagnostic de premier niveau", "effectuer l'entretien courant d'un véhicule", "remplacer les pièces d'usure et contrôler les organes de sécurité", "utiliser les outils de diagnostic électronique", "expliquer les interventions au client ou au réceptionnaire"],
      techniques: ["lecture d'un ordre de réparation et diagnostic simple", "vidange, freinage, pneumatiques et trains roulants", "contrôle moteur, batterie et circuits électriques", "utilisation d'une valise de diagnostic", "respect des procédures sécurité atelier"],
      transversales: ["rigueur dans le contrôle qualité", "méthode et sens de l'observation", "respect des consignes de sécurité", "communication avec l'équipe atelier", "gestion du temps sur intervention"],
      contraintes: ["postures physiques et manutention", "respect strict des règles sécurité atelier", "évolution rapide des motorisations hybrides/électriques", "travail sous délais en atelier", "besoin de précision dans la traçabilité des interventions"],
      formations: ["CAP Maintenance des véhicules option voitures particulières", "habilitation électrique véhicules hybrides/électriques", "formation diagnostic électronique", "stage constructeur ou centre auto sur nouveaux équipements"],
      opportunites: ["emploi en garage indépendant", "poste en centre auto ou concession", "spécialisation diagnostic électronique", "évolution vers réceptionnaire atelier", "création d'un atelier mobile ou service entretien"],
      axes: ["consolider le diagnostic électrique de base", "renforcer la méthodologie de recherche de panne", "sécuriser les gestes atelier et EPI", "développer la relation client autour du devis"],
      veilleReglementaire: { intitule: "Sécurité atelier et interventions sur véhicules électriques/hybrides", source: "INRS – Prévention des risques en réparation automobile", lien: "https://www.inrs.fr", date: "Novembre 2024", exploitation: "Exploitée pour rappeler les exigences de sécurité, EPI, consignation et limites d'intervention. Les bénéficiaires visant l'atelier sont orientés vers les habilitations nécessaires." },
      veilleMetier: { intitule: "Mutation du métier de mécanicien automobile avec l'électrification du parc", source: "France Travail – Fiche métier maintenance automobile", lien: "https://www.francetravail.fr", date: "Janvier 2025", exploitation: "Support d'analyse des débouchés en garage, concession et centre auto. Le plan d'action valorise la maintenance courante et prévoit une montée en compétence diagnostic électronique." },
      veilleTechnologique: { intitule: "Diagnostic électronique, ADAS et outils connectés en atelier", source: "Auto Infos – innovations après-vente automobile", lien: "https://www.autoinfos.fr", date: "Mars 2025", exploitation: "Intégré aux enquêtes métier pour montrer l'importance des valises diagnostic, calibrage ADAS et documentation technique numérique dans l'employabilité." },
    };
  }
  if (key.includes("negociateur") || key.includes("technico") || key.includes("commercial")) {
    return {
      label: "Négociateur Technico-Commercial",
      metier: "négociateur(trice) technico-commercial(e)",
      secteur: "vente BtoB, prospection commerciale, solutions techniques et relation client",
      missions: ["prospecter un portefeuille clients", "analyser un besoin technique et commercial", "construire une proposition argumentée", "négocier les conditions de vente", "suivre la relation client et le reporting CRM"],
      techniques: ["qualification des prospects et découverte besoin", "argumentaire SONCAS/CAP et traitement objections", "chiffrage d'une offre et marge commerciale", "négociation et closing", "utilisation CRM, pipeline et relances"],
      transversales: ["aisance orale et écoute active", "organisation de la prospection", "résilience face au refus", "analyse des besoins client", "suivi administratif et reporting"],
      contraintes: ["objectifs chiffrés et pression commerciale", "déplacements possibles", "nécessité d'une relance régulière", "maîtrise des caractéristiques techniques de l'offre", "forte exigence de traçabilité dans le CRM"],
      formations: ["Titre professionnel Négociateur Technico-Commercial", "formation prospection et techniques de vente", "perfectionnement CRM et social selling", "formation négociation BtoB"],
      opportunites: ["poste de commercial terrain ou sédentaire", "business developer BtoB", "chargé d'affaires junior", "évolution vers responsable commercial", "création d'une activité d'agent commercial"],
      axes: ["structurer la prospection hebdomadaire", "renforcer le traitement des objections", "améliorer la découverte des besoins techniques", "professionnaliser le suivi CRM et les relances"],
      veilleReglementaire: { intitule: "Encadrement de la prospection commerciale, RGPD et consentement", source: "CNIL – Prospection commerciale et données personnelles", lien: "https://www.cnil.fr", date: "Octobre 2024", exploitation: "Utilisé pour sécuriser les pratiques de prospection, qualification des fichiers et conservation des données. Les bénéficiaires intègrent une étape RGPD dans leur plan d'action commercial." },
      veilleMetier: { intitule: "Évolution des métiers commerciaux BtoB : hybride, CRM et social selling", source: "APEC – Tendances métiers commerciaux", lien: "https://www.apec.fr", date: "Janvier 2025", exploitation: "Mobilisé pendant l'enquête métier pour distinguer vente terrain, sédentaire et business development. Les plans d'action ciblent les compétences CRM, prospection et négociation." },
      veilleTechnologique: { intitule: "CRM, automatisation des relances et IA d'aide à la vente", source: "HubSpot France – tendances CRM et sales enablement", lien: "https://www.hubspot.fr", date: "Février 2025", exploitation: "Exploité pour montrer l'impact des outils CRM, séquences e-mail et tableaux de bord sur la performance commerciale et l'organisation personnelle." },
    };
  }
  return {
    label: f.intitule || "Bilan de compétences",
    metier: `professionnel(le) du domaine ${f.intitule || "visé"}`,
    secteur: f.intitule || "secteur professionnel visé",
    missions: ["analyser les activités clés du métier visé", "identifier les compétences transférables", "vérifier les conditions réelles d'exercice", "rencontrer ou interroger un professionnel", "formaliser un plan d'action réaliste"],
    techniques: ["analyse du parcours et portefeuille de compétences", "enquête métier et recherche documentaire", "identification des écarts de compétences", "construction d'un projet réaliste", "formalisation du plan d'action"],
    transversales: ["communication professionnelle", "organisation", "adaptabilité", "autonomie", "capacité d'analyse"],
    contraintes: ["contraintes de rythme et disponibilité", "besoin de sécuriser le financement", "validation progressive du projet", "mise à jour des compétences", "nécessité de confronter le projet au terrain"],
    formations: ["formation certifiante adaptée au projet", "stage d'immersion ou PMSMP", "modules courts de remise à niveau", "accompagnement à la recherche d'emploi ou création d'activité"],
    opportunites: ["reconversion sécurisée", "mobilité interne ou externe", "formation qualifiante", "création d'activité", "spécialisation progressive"],
    axes: ["clarifier le projet professionnel", "renforcer les compétences transférables", "confronter le projet au marché", "organiser les étapes de transition"],
    veilleReglementaire: { intitule: "Évolutions des dispositifs de reconversion et financement", source: "Ministère du Travail – formation professionnelle", lien: "https://travail-emploi.gouv.fr", date: "Janvier 2025", exploitation: "Exploitée pour sécuriser les choix de financement, CPF, transition professionnelle et accompagnement post-bilan." },
    veilleMetier: { intitule: `Tendances emploi et compétences dans le secteur ${f.intitule || "visé"}`, source: "France Travail – fiches métiers et marché du travail", lien: "https://www.francetravail.fr", date: "Février 2025", exploitation: "Utilisée pour vérifier les débouchés, compétences attendues et conditions d'accès au métier visé." },
    veilleTechnologique: { intitule: "Outils numériques de recherche métier, CV et suivi du plan d'action", source: "France Compétences – ressources orientation et compétences", lien: "https://www.francecompetences.fr", date: "Mars 2025", exploitation: "Présentée pour structurer les recherches, suivre les candidatures et documenter les compétences à développer." },
  };
}

function bdcPersonalisation(f: FormationInfo, s: StagiaireInfo | undefined, si: number) {
  const profile = getBdcDomainProfile(f);
  const objectif = pickForBeneficiaire(s, si, [
    `valider une reconversion vers le métier de ${profile.metier}`,
    `sécuriser une évolution professionnelle dans ${profile.secteur}`,
    `confirmer la faisabilité d'un projet dans ${profile.secteur}`,
    `construire un plan d'action avant d'intégrer une formation ou un poste en lien avec ${profile.label}`,
  ], 1);
  return {
    profile,
    objectif,
    technique: pickForBeneficiaire(s, si, profile.techniques, 2),
    techniqueSecondaire: pickForBeneficiaire(s, si, profile.techniques, 3),
    transversal: pickForBeneficiaire(s, si, profile.transversales, 4),
    axe: pickForBeneficiaire(s, si, profile.axes, 5),
    contrainte: pickForBeneficiaire(s, si, profile.contraintes, 6),
    opportunite: pickForBeneficiaire(s, si, profile.opportunites, 7),
    formation: pickForBeneficiaire(s, si, profile.formations, 8),
    financement: pickForBeneficiaire(s, si, ["CPF", "Projet de transition professionnelle", "autofinancement sécurisé", "France Travail / CPF", "plan de développement des compétences"], 9),
    rythme: pickForBeneficiaire(s, si, ["séances en journée avec travail personnel entre deux rendez-vous", "rythme hebdomadaire compatible avec les obligations personnelles", "accompagnement mixte avec recherches guidées entre les séances", "créneaux réguliers pour maintenir la dynamique du projet"], 10),
    pointFort: pickForBeneficiaire(s, si, ["capacité d'analyse", "motivation constante", "sens de l'organisation", "aisance relationnelle", "rigueur dans les recherches"], 11),
    vigilance: pickForBeneficiaire(s, si, ["formaliser les étapes du projet", "confronter le projet à des professionnels", "chiffrer le financement et le calendrier", "renforcer la confiance en situation d'entretien", "prioriser les actions à court terme"], 12),
    commentaireSatisfaction: pickForBeneficiaire(s, si, [
      `Les échanges m'ont aidé(e) à clarifier mon projet vers ${profile.metier} et à identifier les étapes concrètes.`,
      `L'enquête métier et le plan d'action m'ont permis de mieux comprendre les exigences de ${profile.secteur}.`,
      `Les outils utilisés ont mis en évidence mes compétences transférables et les points à renforcer.`,
      `L'accompagnement m'a donné une vision réaliste des débouchés et des formations possibles.`,
    ], 13),
  };
}

// ===== CR1 - IND 1 : Programme du bilan =====
export function genProgrammeBDC(o: OrganismeInfo, f: FormationInfo) {
  const ph = phasesDates(f);
  const { totalHours } = parseDuree(f.duree || "24h");
  const hPrelim = Math.round(totalHours * 0.125);
  const hInvest = Math.round(totalHours * 0.625);
  const hConcl = totalHours - hPrelim - hInvest;
  const profile = getBdcDomainProfile(f);
  const li = (arr: string[]) => arr.map(x => `• ${x}`).join("<br>");
  return buildDocument({ org: o, title: "PROGRAMME DE BILAN DE COMPÉTENCES", subtitle: `Domaine : ${profile.label}`, sections: [
    { heading: "Objectifs du bilan de compétences", content: `<p>• Analyser les compétences, aptitudes et motivations du bénéficiaire en lien avec le métier de <strong>${profile.metier}</strong> exercé dans le secteur ${profile.secteur}.<br>• Vérifier la faisabilité d'un projet professionnel ciblé sur ce métier (insertion, évolution ou création d'activité).<br>• Identifier les compétences transférables et les écarts à combler par rapport aux exigences du métier.<br>• Élaborer un plan d'action personnalisé : formation, certification, immersion, recherche d'emploi ou installation indépendante.</p>` },
    { heading: "Prérequis", content: `<p>• Aucun diplôme ni expérience préalable exigés dans le domaine.<br>• Maîtrise orale du français souhaitée pour les entretiens et la rédaction de la synthèse.<br>• Démarche personnelle de questionnement ou de reconversion vers le métier de ${profile.metier}.</p>` },
    { heading: `Phase préliminaire (${hPrelim}h) – ${ph.p1.start} au ${ph.p1.end}`, content: `<p>• Entretien d'accueil individuel : analyse de la demande et des facteurs déclencheurs (lassitude, mobilité, projet d'installation).<br>• Présentation de la méthodologie et signature de la convention tripartite (bénéficiaire / organisme / financeur).<br>• Information sur le cadre légal (art. L6313-10 à L6313-12 du Code du travail) et engagement de confidentialité.<br>• Définition des objectifs personnalisés du bilan, en lien avec le projet de devenir ${profile.metier}.</p>` },
    { heading: `Phase d'investigation (${hInvest}h) – ${ph.p2.start} au ${ph.p2.end}`, content: `<p><strong>Analyse du parcours et des compétences techniques attendues du métier :</strong><br>${li(profile.techniques)}</p><p><strong>Identification des compétences transversales mobilisables :</strong><br>${li(profile.transversales)}</p><p><strong>Étude du métier et de ses missions :</strong><br>${li(profile.missions)}</p><p><strong>Conditions réelles d'exercice à confronter :</strong><br>${li(profile.contraintes)}</p><p><strong>Tests psychométriques et d'orientation</strong> (RIASEC, intérêts professionnels), <strong>enquête métier</strong> auprès de professionnels du secteur (${profile.secteur}) et étude du marché du travail local.</p>` },
    { heading: `Phase de conclusion (${hConcl}h) – ${ph.p3.start} au ${ph.p3.end}`, content: `<p><strong>Projet professionnel principal et alternatif</strong> – Pistes envisagées :<br>${li(profile.opportunites)}</p><p><strong>Axes de progrès identifiés à intégrer au plan d'action :</strong><br>${li(profile.axes)}</p><p><strong>Formations et certifications recommandées :</strong><br>${li(profile.formations)}</p><p>Construction du plan d'action concret (étapes, ressources mobilisables – CPF, Transitions Pro, France Travail, OPCO – calendrier, indicateurs de suivi). Entretien de synthèse, remise du document de synthèse confidentiel et entretien de suivi à 6 mois.</p>` },
    { heading: "Modalités", content: `<p><strong>Durée totale :</strong> ${dureeLabel(f)}<br><strong>Dates :</strong> du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br><strong>Modalité :</strong> ${f.modalites || "Présentiel"}<br><strong>Lieu :</strong> ${o.adresse || "Locaux de l'organisme"}<br><strong>Consultant(e) :</strong> ${consultantName(o)}</p>` },
    { heading: "Confidentialité", content: "<p>Le contenu des entretiens, des tests et du document de synthèse est strictement confidentiel, conformément aux articles L6313-10 à L6313-12 du Code du travail. Le document de synthèse est la propriété exclusive du bénéficiaire (art. R.6313-7).</p>" },
  ] });
}

// ===== CR2 - IND 4 : Évaluation des besoins (per bénéficiaire) =====
export function genEvaluationBesoins(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const ref = s?.dateDebutFormation || f.dateDebut || "";
  const dt = ref ? formatDate(subtractBusinessDays(ref, 20)) : new Date().toLocaleDateString("fr-FR");
  const p = bdcPersonalisation(f, s, si);
  return buildDocument({ org: o, title: "ÉVALUATION DES BESOINS", subtitle: `Bilan de compétences – ${p.profile.label}`, stagiaires: [s], sections: [
    { heading: "Identification", content: `<p><strong>Date :</strong> ${dt}<br><strong>Nom :</strong> ${s.nom}<br><strong>Prénom :</strong> ${s.prenom}<br><strong>E-mail :</strong> ${s.email || "—"}<br><strong>Formation souhaitée :</strong> Bilan de compétences – ${p.profile.label}</p>` },
    { heading: "1) Éléments à prendre en considération (handicap, problème de santé, besoin particulier)", content: `<p>Aucun aménagement médical déclaré lors du pré-entretien. Point de vigilance personnel identifié : <strong>${p.contrainte}</strong>. L'accompagnement prévoit un rythme compatible avec cette contrainte.</p>` },
    { heading: "2) Nos adaptations possibles", content: `<p>• Entretiens individualisés centrés sur le projet ${p.profile.metier}<br>• Supports métier ciblés : fiches ROME, référentiels CAP/titre, offres d'emploi et enquêtes terrain<br>• Exercices adaptés : analyse d'expérience, portefeuille de compétences, plan d'action ${p.profile.secteur}<br>• Ajustement du rythme : ${p.rythme}</p>` },
    { heading: "3) Quel est votre objectif professionnel à travers ce bilan ?", content: `<p>Je souhaite ${p.objectif}. Mon besoin principal est de vérifier l'adéquation entre mon parcours, mes contraintes et les réalités du secteur : <strong>${p.profile.secteur}</strong>.</p>`, variant: "green" },
    { heading: "4) Domaines spécifiques à approfondir ?", content: `<p>• Compétence technique prioritaire : <strong>${p.technique}</strong><br>• Compétence complémentaire : <strong>${p.techniqueSecondaire}</strong><br>• Compétence transversale à valoriser : <strong>${p.transversal}</strong><br>• Axe de progression personnel : <strong>${p.axe}</strong></p>` },
    { heading: "5) Format préféré ?", content: `<p>${f.modalites || "Présentiel"} – avec recherches guidées entre les séances et restitution individuelle.</p>` },
    { heading: "6) Préférences horaires ?", content: `<p>${p.rythme}.</p>` },
    { heading: "7) Moyens de financement envisagés ?", content: `<p>${p.financement}. Le financement sera sécurisé dans le plan d'action final avec les démarches et échéances correspondantes.</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [dt, dt] } });
}

// ===== CR2 - IND 5 : Document de synthèse (pièce centrale!) =====
export function genDocumentSynthese(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const ph = phasesDates(f);
  const dtFin = endDate(s, f);
  return buildDocument({ org: o, title: "DOCUMENT DE SYNTHÈSE", subtitle: `Bilan de compétences – ${beneficiaireLabel(s)}`, stagiaires: [s], sections: [
    { heading: "Rappel de la conformité réglementaire", content: `<p>Conformément aux articles <strong>L6313-10 à L6313-12</strong> du Code du travail, ce bilan de compétences s'est déroulé dans un cadre légal et déontologique. Le bénéficiaire a été informé préalablement des <strong>objectifs</strong>, des <strong>modalités de mise en œuvre</strong> et des <strong>conditions de restitution des résultats</strong>, lesquels ne peuvent être transmis à un tiers qu'avec son accord.</p>` },
    { heading: "1. Les circonstances du bilan", content: `<p>${beneficiaireLabel(s)}, souhaitant faire le point sur ses compétences dans le domaine de ${f.intitule}, a sollicité ce bilan dans le cadre d'une démarche personnelle. L'objectif est de confirmer ses compétences, valider la faisabilité d'un projet professionnel et définir un plan d'action concret.</p>` },
    { heading: "2. Objectifs du bilan", content: `<p>• Identifier et valoriser les <strong>compétences techniques et transversales</strong> en ${f.intitule}.<br>• Préciser un projet professionnel réaliste dans le secteur.<br>• Vérifier la <strong>cohérence</strong> entre motivations, contraintes personnelles et réalités du métier.<br>• Élaborer un <strong>plan d'action concret</strong> : formation complémentaire, recherche d'emploi ou accompagnement à la création d'activité.</p>`, variant: "green" },
    { heading: "3. Modalités de réalisation", content: `<p>Le bilan s'est déroulé <strong>en ${(f.modalites || "présentiel").toLowerCase()}</strong> du <strong>${startDate(s, f)}</strong> au <strong>${dtFin}</strong>, pour une durée totale de <strong>${dureeLabel(f)}</strong>.</p><p><strong>Phase préliminaire (${ph.p1.start} – ${ph.p1.end}) :</strong><br>• Analyse de la demande et des attentes<br>• Définition du cadre méthodologique et validation de l'engagement</p><p><strong>Phase d'investigation (${ph.p2.start} – ${ph.p2.end}) :</strong><br>• Analyse du parcours, des compétences et des motivations<br>• Tests de positionnement métier et échanges approfondis<br>• Recherches sur les métiers du secteur</p><p><strong>Phase de conclusion (${ph.p3.start} – ${ph.p3.end}) :</strong><br>• Clarification du projet professionnel<br>• Préconisations personnalisées<br>• Rédaction et remise du présent document de synthèse</p>` },
    { heading: "4. Compétences identifiées", content: `<p><strong>Compétences techniques :</strong><br>• Maîtrise des fondamentaux du secteur ${f.intitule}<br>• Capacité d'organisation et de gestion<br>• Application des normes et procédures<br><br><strong>Compétences transversales :</strong><br>• Sens de l'organisation et rigueur<br>• Créativité et sens esthétique<br>• Communication et travail en équipe<br>• Adaptabilité et gestion du stress</p>`, variant: "green" },
    { heading: "5. Projet professionnel retenu", content: `<p>Le projet professionnel validé est en cohérence avec les compétences identifiées et les aspirations exprimées par ${g(s, "le", "la")} bénéficiaire. Il s'agit d'une évolution professionnelle dans le domaine de ${f.intitule}, avec un plan de formation ciblé.</p>` },
    { heading: "6. Plan d'action", content: "<p><strong>Court terme (0-3 mois) :</strong><br>• Formation complémentaire ciblée<br>• Mise à jour du CV et du profil professionnel<br>• Prise de contact avec le réseau professionnel<br><br><strong>Moyen terme (3-12 mois) :</strong><br>• Certification ou qualification complémentaire<br>• Recherche active d'opportunités<br>• Point de suivi à 6 mois avec le consultant</p>" },
    { heading: "Confidentialité", content: "<p>Ce document est la propriété exclusive du bénéficiaire. Il ne peut être communiqué à un tiers sans son autorisation écrite préalable.</p>" },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [dtFin, dtFin] } });
}

// ===== CR2 - IND 6 : Déroulé et modalités =====
export function genDerouleModalitesBDC(o: OrganismeInfo, f: FormationInfo) {
  const ph = phasesDates(f);
  const { totalHours } = parseDuree(f.duree || "24h");
  return buildDocument({ org: o, title: `DÉROULÉ ET MODALITÉS DU BILAN DE COMPÉTENCES`, subtitle: `Domaine : ${f.intitule}`, sections: [
    { heading: "Objectif du bilan", content: `<p>Le bilan de compétences vise à accompagner un(e) professionnel(le) souhaitant :<br>• faire un point global sur son parcours professionnel,<br>• identifier ses forces et ses axes d'amélioration,<br>• valider un projet d'évolution (spécialisation, reconversion, entrepreneuriat…),<br>• ou confirmer ses motivations à créer ou reprendre une activité dans le secteur de ${f.intitule}.</p>` },
    { heading: "1. Phase préliminaire (2 à 3 heures)", content: "<p>• Recueil de la demande spécifique<br>• Présentation du déroulement du bilan<br>• Définition des objectifs personnalisés<br>• Planification des séances</p>" },
    { heading: "2. Phase d'investigation (15 à 17 heures)", content: `<p>Cette phase approfondit les compétences acquises dans le domaine de ${f.intitule} et explore les pistes de valorisation et d'évolution :<br>• Analyse du parcours professionnel et des réalisations concrètes<br>• Identification des compétences clés (techniques, organisationnelles, relationnelles)<br>• Évaluation des motivations et du projet de vie<br>• Enquêtes métier<br>• Analyse des possibilités : retour en formation, VAE, création d'entreprise, mobilité</p>`, variant: "green" },
    { heading: "3. Phase de conclusion (4 à 5 heures)", content: "<p>• Synthèse du travail réalisé<br>• Validation d'un ou plusieurs projets professionnels adaptés<br>• Élaboration d'un plan d'action détaillé<br>• Rédaction du <strong>document de synthèse</strong> confidentiel<br>• Prévision d'un <strong>entretien de suivi</strong> dans les 6 mois</p>" },
    { heading: "Méthodes utilisées", content: "<p>• Entretiens individuels (présentiel et/ou visioconférence)<br>• Outils de positionnement et d'analyse (grilles de compétences, tests de motivation, ligne de vie professionnelle)<br>• Exercices pratiques adaptés<br>• Recherches encadrées sur les métiers et formations du secteur<br>• Accompagnement personnalisé par un(e) consultant(e)</p>" },
    { heading: "Modalités pratiques", content: `<p><strong>Durée totale :</strong> ${dureeLabel(f)}<br><strong>Dates :</strong> du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br><strong>Lieu :</strong> ${o.adresse || "Locaux de l'organisme"} ou en distanciel<br><strong>Rythme :</strong> 2 à 3 séances par semaine<br><strong>Consultant(e) :</strong> ${consultantName(o)}</p>` },
    { heading: "Confidentialité", content: "<p>L'ensemble des échanges, productions et résultats reste <strong>strictement confidentiel</strong>. Le document de synthèse est la propriété exclusive du bénéficiaire.</p>" },
  ] });
}

// ===== CR2 - IND 6 : Questionnaire enquête métier =====
export function genEnqueteMetierBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const p = bdcPersonalisation(f, s, si);
  return buildDocument({ org: o, title: "BILAN DE COMPÉTENCES – ENQUÊTE MÉTIER", subtitle: `Domaine exploré : ${p.profile.label}`, stagiaires: [s], sections: [
    { heading: "1. Identification du bénéficiaire", content: `<p><strong>Nom :</strong> ${s.nom}<br><strong>Prénom :</strong> ${s.prenom}<br><strong>Date de naissance :</strong> ${s.dateNaissance ? formatDate(s.dateNaissance) : "—"}<br><strong>E-mail :</strong> ${s.email || "—"}${s.telephone?.trim() ? `<br><strong>Téléphone :</strong> ${s.telephone}` : ""}</p>` },
    { heading: "2. Cadre du bilan", content: `<p><strong>Consultant(e) :</strong> ${consultantName(o)}<br><strong>Organisme :</strong> ${o.nom}<br><strong>Métier exploré :</strong> ${p.profile.metier}<br><strong>Domaine :</strong> ${p.profile.secteur}<br><strong>Date de l'entretien :</strong> ${startDate(s, f)}</p>` },
    { heading: "3. Objectifs de l'enquête métier", content: `<p>• Vérifier la cohérence du projet de ${beneficiaireLabel(s)} : <strong>${p.objectif}</strong>.<br>• Comprendre les missions, contraintes et débouchés du métier de <strong>${p.profile.metier}</strong>.<br>• Identifier les compétences déjà transférables et les écarts à combler.<br>• Repérer les formations ou immersions nécessaires pour sécuriser le parcours.</p>`, variant: "green" },
    { heading: "4. Présentation du métier", content: `<p>Le métier de <strong>${p.profile.metier}</strong> s'exerce principalement dans ${p.profile.secteur}. Les missions observées sont :</p>${listHtml(p.profile.missions)}` },
    { heading: "5. Compétences requises", content: `<p><strong>Techniques professionnelles :</strong></p>${listHtml(p.profile.techniques)}<p><strong>Compétences transversales :</strong></p>${listHtml(p.profile.transversales)}<p><strong>Point ciblé pour ${beneficiaireLabel(s)} :</strong> ${p.technique} et ${p.transversal}.</p>` },
    { heading: "6. Contraintes et points de vigilance", content: `${listHtml(p.profile.contraintes)}<p><strong>Vigilance personnelle retenue :</strong> ${p.contrainte}. Une action dédiée sera prévue dans le plan d'action.</p>` },
    { heading: "7. Formations recommandées", content: `${listHtml(p.profile.formations)}<p><strong>Priorité proposée :</strong> ${p.formation}.</p>` },
    { heading: "8. Perspectives d'emploi", content: `${listHtml(p.profile.opportunites)}<p><strong>Piste prioritaire pour ${beneficiaireLabel(s)} :</strong> ${p.opportunite}.</p>` },
    { heading: "9. Conclusion", content: `<p>L'enquête métier confirme que le projet est cohérent avec les motivations exprimées par ${g(s, "le", "la")} bénéficiaire, sous réserve de travailler l'axe suivant : <strong>${p.axe}</strong>. Les résultats alimentent le document de synthèse et le plan d'action final.</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [sigDateBDC(s, f), sigDateBDC(s, f)] } });
}

// ===== CR3 - IND 9 : CGV Bilan =====
export function genCGVBilanCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si?: number) {
  const s = stagiaires && stagiaires.length > 0 ? (stagiaires[si ?? 0] || stagiaires[0]) : undefined;
  const tarif = f.tarif ? `${f.tarif} € TTC` : "1 500 € TTC";
  const sigDate = (() => { const r = f.dateDebut || ""; return r ? formatDate(subtractBusinessDays(r, 14)) : new Date().toLocaleDateString("fr-FR"); })();
  return buildDocument({ org: o, title: "CONDITIONS GÉNÉRALES DE VENTE – BILAN DE COMPÉTENCES", stagiaires: s ? [s] : undefined, sections: [
    { heading: "Article 1 – Objet", content: `<p>Les présentes conditions générales ont pour objet de définir les modalités et conditions dans lesquelles l'organisme <strong>${o.nom}</strong> fournit une prestation de <strong>bilan de compétences</strong> à ses clients.</p>` },
    { heading: "Article 2 – Nature de la prestation", content: "<p>La prestation entre dans le champ d'application des <strong>articles L6313-1 à L6313-12</strong> du Code du travail. Elle se compose de 3 phases (préliminaire, investigation, conclusion) et donne lieu à la remise d'un <strong>document de synthèse confidentiel</strong> au bénéficiaire.</p>" },
    { heading: "Article 3 – Modalités d'inscription", content: "<p>L'inscription devient définitive à réception :<br>• du contrat de formation signé,<br>• de l'éventuel accord de financement,<br>• et/ou du règlement de la prestation en cas d'autofinancement.</p>" },
    { heading: "Article 4 – Tarifs", content: `<p>Le tarif applicable est celui en vigueur au moment de la signature du contrat : <strong>${tarif} pour ${dureeLabel(f)} de bilan en ${(f.modalites || "présentiel").toLowerCase()}</strong>.<br><br>Ce tarif comprend :<br>• les entretiens individuels,<br>• les outils utilisés,<br>• la rédaction du document de synthèse,<br>• les frais administratifs.<br><br>Aucun frais supplémentaire ne sera appliqué sans accord préalable.</p>` },
    { heading: "Article 5 – Financement", content: "<p>Le bilan peut être financé via : <strong>CPF, autofinancement, employeur, OPCO</strong>.<br>En cas de refus de prise en charge par un financeur, le bénéficiaire reste redevable du montant dû.</p>" },
    { heading: "Article 6 – Délai de rétractation", content: "<p>Conformément à l'article L221-18 du Code de la consommation, le bénéficiaire dispose d'un <strong>délai de rétractation de 14 jours</strong> à compter de la signature du contrat. Toute prestation démarrée avant la fin de ce délai ne pourra faire l'objet d'un remboursement sauf cas de force majeure.</p>" },
    { heading: "Article 7 – Annulation / Report", content: `<p>• En cas d'annulation par le bénéficiaire <strong>moins de 5 jours</strong> avant le début, 30 % du montant restera dû.<br>• En cas d'annulation <strong>sans justification</strong>, le solde peut être facturé.<br>• En cas d'annulation par l'organisme, la totalité de la somme versée est remboursée ou reportée.</p>` },
    { heading: "Article 8 – Confidentialité", content: "<p>Le contenu des entretiens, des tests et du document de synthèse est <strong>strictement confidentiel</strong>. Aucune information ne peut être transmise à un tiers sans l'accord écrit du bénéficiaire.</p>" },
    { heading: "Article 9 – Données personnelles", content: `<p>Les données personnelles sont traitées conformément au RGPD. Elles sont conservées pendant la durée légale de conservation et ne sont pas transmises à des tiers sauf obligation légale.</p>` },
    { heading: "Article 10 – Litiges", content: `<p>En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du ressort du siège de l'organisme.</p>` },
  ], signatures: { type: "2", labels: ["Le Prestataire", s ? `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}` : "Le Bénéficiaire"], names: [consultantName(o), s ? beneficiaireLabel(s) : ""], dates: [sigDate, sigDate] } });
}

// ===== CR3 - IND 9 : Contrat de bilan =====
export function genContratBilanCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const tarif = getStagiaireTarif(s, f) || f.tarif || "1 500";
  return buildDocument({ org: o, title: "CONTRAT DE BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Entre les soussignés", content: `<p><strong>1. L'organisme prestataire :</strong><br>RAISON SOCIALE : ${o.nom}<br>Adresse : ${o.adresse}<br>Représenté par : ${consultantName(o)}<br>Contact : ${o.email || "—"}${o.telephone?.trim() ? ` | ${o.telephone}` : ""}<br>N° SIRET : ${o.siret || "—"}<br><br>Ci-après dénommé "le Prestataire"<br><br><strong>ET</strong><br><br><strong>2. ${g(s, "Le bénéficiaire", "La bénéficiaire")} du bilan de compétences :</strong><br>Nom : ${s.nom}<br>Prénom : ${s.prenom}<br>${s.dateNaissance ? `Né(e) le : ${formatDate(s.dateNaissance)}<br>` : ""}${s.email ? `Mail : ${s.email}<br>` : ""}${s.telephone ? `Tél : ${s.telephone}<br>` : ""}<br>Ci-après dénommé(e) "${g(s, "le Bénéficiaire", "la Bénéficiaire")}"</p>` },
    { heading: "Article 1 – Objet du contrat", content: "<p>Le présent contrat a pour objet la réalisation d'un <strong>bilan de compétences</strong> conformément aux dispositions des articles L6313-1 à L6313-12 du Code du travail.</p>" },
    { heading: "Article 2 – Durée et dates", content: `<p>Le bilan de compétences se déroule sur la période <strong>du ${startDate(s, f)} au ${endDate(s, f)}</strong>, pour une durée totale de <strong>${dureeLabel(f)}</strong>, réparties selon un planning défini en accord entre les parties.</p>` },
    { heading: "Article 3 – Lieu de réalisation", content: `<p>Le bilan sera réalisé <strong>en ${(f.modalites || "présentiel").toLowerCase()}</strong> dans les locaux du Prestataire :<br><strong>${o.nom}</strong> – ${o.adresse}</p>` },
    { heading: "Article 4 – Modalités de réalisation", content: "<p>Le bilan comprend trois phases d'accompagnement :<br>• <strong>Phase préliminaire</strong> : analyse des attentes et validation de l'engagement.<br>• <strong>Phase d'investigation</strong> : identification des compétences, motivations, valeurs professionnelles.<br>• <strong>Phase de conclusion</strong> : définition du projet professionnel et remise du document de synthèse.</p>", variant: "green" },
    { heading: "Article 5 – Confidentialité", content: `<p>Les informations communiquées par ${g(s, "le", "la")} Bénéficiaire sont strictement confidentielles. Le Prestataire s'engage à ne divulguer aucune information sans accord écrit.</p>` },
    { heading: "Article 6 – Restitution", content: `<p>À l'issue du bilan, un <strong>document de synthèse</strong> sera remis ${g(s, "au Bénéficiaire", "à la Bénéficiaire")}. Ce document ne pourra être transmis à un tiers qu'avec son consentement écrit.</p>` },
    { heading: "Article 7 – Modalités financières", content: `<p>Le coût total du bilan est de <strong>${tarif} € TTC</strong>.</p>` },
  ], signatures: { type: "2", labels: ["Le Prestataire", `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [sigDateBDC(s, f), sigDateBDC(s, f)] } });
}

// ===== CR3 - IND 9 : Convention de bilan =====
export function genConventionBilanCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const tarif = getStagiaireTarif(s, f) || f.tarif || "1 500";
  return buildDocument({ org: o, title: "CONVENTION DE BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Entre", content: `<p><strong>L'organisme prestataire :</strong> ${o.nom}, SIRET : ${o.siret || "—"}, représenté par ${consultantName(o)}<br><br><strong>ET</strong><br><br><strong>${g(s, "Le bénéficiaire", "La bénéficiaire")} :</strong> ${beneficiaireLabel(s)}</p>` },
    { heading: "Article 1 – Objet", content: "<p>La présente convention a pour objet la mise en œuvre d'un bilan de compétences conformément aux articles L6313-1 à L6313-12 du Code du travail.</p>" },
    { heading: "Article 2 – Programme", content: "<p>Le bilan se déroule en trois phases :<br>• Phase préliminaire : analyse de la demande<br>• Phase d'investigation : identification des compétences et motivations<br>• Phase de conclusion : projet professionnel et plan d'action</p>" },
    { heading: "Article 3 – Durée et calendrier", content: `<p>Durée : ${dureeLabel(f)}<br>Du ${startDate(s, f)} au ${endDate(s, f)}</p>` },
    { heading: "Article 4 – Coût et financement", content: `<p>Coût total : ${tarif} € TTC<br>Financement : CPF / Autofinancement / Employeur / OPCO</p>` },
    { heading: "Article 5 – Confidentialité", content: "<p>Le document de synthèse est la propriété exclusive du bénéficiaire et ne peut être communiqué à un tiers qu'avec son accord écrit.</p>" },
  ], signatures: { type: "2", labels: ["Le Prestataire", `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [sigDateBDC(s, f), sigDateBDC(s, f)] } });
}

// ===== CR3 - IND 9 : Formulaire d'attentes et objectifs =====
export function genFormulaireAttentesBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  return buildDocument({ org: o, title: "FORMULAIRE D'ATTENTES ET OBJECTIFS", subtitle: `Bilan de compétences – Domaine : ${f.intitule}`, stagiaires: [s], sections: [
    { heading: "1. Identification du bénéficiaire", content: `<p>• Nom : ${s.nom}<br>• Prénom : ${s.prenom}<br>${s.dateNaissance ? `• Date de naissance : ${formatDate(s.dateNaissance)}<br>` : ""}${s.email ? `• E-mail : ${s.email}<br>` : ""}${s.telephone ? `• Téléphone : ${s.telephone}` : ""}</p>` },
    { heading: "2. Cadre du bilan", content: `<p>• Consultant(e) : ${consultantName(o)}<br>• Organisme : ${o.nom}<br>• Domaine exploré : ${f.intitule}</p>` },
    { heading: "3. Motivations et attentes", content: `<p><strong>Q1 : Quel est votre principal objectif professionnel ?</strong><br>Valider mes compétences en ${f.intitule} et définir un projet professionnel clair pour évoluer vers un poste à responsabilités ou créer mon activité.<br><br><strong>Q2 : Qu'est-ce qui vous motive ?</strong><br>Renforcer mes techniques, acquérir de nouvelles compétences et maîtriser les aspects professionnels du secteur.<br><br><strong>Q3 : Quels résultats attendez-vous ?</strong><br>Mieux connaître mes forces et axes d'amélioration, obtenir un plan personnalisé et définir les étapes pour atteindre mes objectifs.</p>`, variant: "green" },
    { heading: "4. Compétences à développer", content: `<p><strong>Q4 : Compétences techniques à renforcer ?</strong><br>Approfondir les compétences spécifiques au domaine de ${f.intitule}.<br><br><strong>Q5 : Compétences transversales ?</strong><br>Améliorer la gestion du temps, la communication et les compétences en management.</p>` },
    { heading: "5. Conditions et contraintes", content: `<p><strong>Q6 : Contraintes à prendre en compte ?</strong><br>Formation en journée, organisation flexible.<br><br><strong>Q7 : Préférences pédagogiques ?</strong><br>Entretiens individuels et mises en situation, complétés par des apports théoriques.</p>` },
    { heading: "6. Perspectives professionnelles", content: `<p><strong>Q8 : Quel poste ou secteur visez-vous ?</strong><br>Poste à responsabilités dans le secteur de ${f.intitule} ou création d'entreprise.<br><br><strong>Q9 : Entreprises identifiées ?</strong><br>Recherches en cours dans le secteur.</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [sigDateBDC(s, f), sigDateBDC(s, f)] } });
}

// ===== CR3 - IND 10 : Convocation au bilan =====
export function genConvocationBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const ref = s?.dateDebutFormation || f.dateDebut || "";
  const dt = ref ? formatDate(subtractBusinessDays(ref, 14)) : new Date().toLocaleDateString("fr-FR");
  return buildDocument({ org: o, title: "CONVOCATION AU BILAN DE COMPÉTENCES", subtitle: `Émise le ${dt}`, stagiaires: [s], sections: [
    { heading: "Organisme prestataire", content: `<p><strong>${o.nom}</strong><br>${o.adresse}<br>SIRET : ${o.siret || "—"}<br>${o.email || ""}${o.telephone?.trim() ? ` | ${o.telephone}` : ""}<br>Consultant(e) : ${consultantName(o)}</p>` },
    { heading: "Destinataire", content: `<p><strong>${g(s, "M.", "Mme")} ${beneficiaireLabel(s)}</strong><br>${s.email || ""}${s.telephone?.trim() ? ` | ${s.telephone}` : ""}</p>` },
    { heading: "Objet : Convocation au bilan de compétences", content: `<p>${g(s, "Monsieur", "Madame")},<br><br>Nous avons le plaisir de vous convoquer pour la réalisation de votre <strong>bilan de compétences – ${f.intitule}</strong>, que vous effectuerez auprès de notre organisme <strong>${o.nom}</strong>.</p>` },
    { heading: "Informations sur la prestation", content: `<p>• <strong>Intitulé :</strong> Bilan de compétences – ${f.intitule}<br>• <strong>Date de début :</strong> ${startDate(s, f)}<br>• <strong>Date de fin :</strong> ${endDate(s, f)}<br>• <strong>Durée totale :</strong> ${dureeLabel(f)} (en ${(f.modalites || "présentiel").toLowerCase()})<br>• <strong>Lieu :</strong> ${o.adresse || "Locaux de l'organisme"}<br>• <strong>Consultant(e) :</strong> ${consultantName(o)}</p>`, variant: "green" },
    { heading: "Documents à apporter", content: "<p>• Pièce d'identité<br>• Copie du contrat de formation signé<br>• CV ou tout document utile à l'analyse de votre parcours</p>" },
    { heading: "Informations pratiques", content: `<p>Merci de vous présenter <strong>10 minutes avant l'heure de votre premier rendez-vous</strong>.<br>En cas d'empêchement, merci de nous prévenir au plus tôt${o.telephone?.trim() ? ` au ${o.telephone}` : ""}.</p><p>Cordialement,<br>${consultantName(o)}<br>${o.nom}</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [dt, dt] } });
}

// ===== CR3 - IND 10 : Synopsis =====
export function genSynopsisBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const ph = phasesDates(f);
  return buildDocument({ org: o, title: "SYNOPSIS – BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Informations générales", content: `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Domaine :</strong> ${f.intitule}<br><strong>Organisme :</strong> ${o.nom}<br><strong>Période :</strong> Du ${startDate(s, f)} au ${endDate(s, f)}</p>` },
    { heading: "Objectif général", content: `<p>Accompagner ${beneficiaireLabel(s)} dans l'évaluation et le développement de ses compétences professionnelles en ${f.intitule} afin de consolider son projet professionnel, renforcer ses savoir-faire et définir un plan d'action clair pour sa carrière future.</p>` },
    { heading: `Phase 1 : Phase préliminaire (${ph.p1.start} – ${ph.p1.end})`, content: "<p>• <strong>Accueil et présentation du bilan</strong> : explication des étapes, modalités et objectifs.<br>• <strong>Recueil des attentes et motivations</strong> : entretien individuel approfondi.<br>• <strong>Analyse du parcours professionnel et personnel</strong> : identification des compétences acquises.</p>" },
    { heading: `Phase 2 : Phase d'investigation (${ph.p2.start} – ${ph.p2.end})`, content: `<p>• <strong>Identification des compétences techniques</strong> : évaluation des savoir-faire en ${f.intitule}.<br>• <strong>Analyse des compétences transversales</strong> : communication, organisation, gestion du temps.<br>• <strong>Tests pratiques et mises en situation</strong> : observation des compétences en conditions réelles.<br>• <strong>Étude du marché et des opportunités professionnelles</strong>.</p>`, variant: "green" },
    { heading: `Phase 3 : Phase de conclusion (${ph.p3.start} – ${ph.p3.end})`, content: "<p>• <strong>Synthèse des résultats</strong> : bilan des compétences et points d'amélioration.<br>• <strong>Définition du projet professionnel</strong> : validation ou ajustement du projet initial.<br>• <strong>Élaboration du plan d'action</strong> : recommandations et étapes à suivre.<br>• <strong>Entretien de restitution</strong> : présentation et validation du bilan.</p>" },
    { heading: "Modalités d'accompagnement", content: "<p>• Entretiens individuels réguliers (en présentiel ou visioconférence)<br>• Support documentaire et outils d'auto-évaluation<br>• Suivi personnalisé et conseils adaptés</p>" },
    { heading: "Résultats attendus", content: `<p>• Clarification du projet professionnel<br>• Identification précise des compétences maîtrisées et à développer<br>• Plan d'action réaliste et adapté<br>• Meilleure connaissance du marché de ${f.intitule} et des opportunités</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [(() => { const r = s?.dateDebutFormation || f.dateDebut || ""; return r ? formatDate(subtractBusinessDays(r, 14)) : new Date().toLocaleDateString("fr-FR"); })(), (() => { const r = s?.dateDebutFormation || f.dateDebut || ""; return r ? formatDate(subtractBusinessDays(r, 14)) : new Date().toLocaleDateString("fr-FR"); })()] } });
}

// ===== CR3 - IND 11 : Grille de suivi =====
export function genGrilleSuiviBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const d0 = new Date(s.dateDebutFormation || f.dateDebut || Date.now());
  const dEnd = new Date(s.dateFinFormation || f.dateFin || Date.now());
  const total = dEnd.getTime() - d0.getTime();
  const p = bdcPersonalisation(f, s, si);
  const rows: string[][] = [];
  const steps = [
    { pct: 0, label: "Accueil et cadrage", action: `Clarification de l'objectif : ${p.objectif}`, obs: `Motivation observée ; vigilance initiale sur ${p.contrainte}` },
    { pct: 0.08, label: "Analyse du parcours", action: `Repérage des expériences transférables vers ${p.profile.metier}`, obs: `Point fort repéré : ${p.pointFort}` },
    { pct: 0.16, label: "Cartographie des compétences", action: `Évaluation ciblée : ${p.technique}`, obs: `Compétence exploitable, à consolider par ${p.formation}` },
    { pct: 0.28, label: "Compétences transversales", action: `Travail sur ${p.transversal} et situations professionnelles vécues`, obs: `Axe de progression : ${p.axe}` },
    { pct: 0.42, label: "Enquête métier", action: `Recherche sur ${p.profile.secteur} et comparaison des postes visés`, obs: `Piste prioritaire retenue : ${p.opportunite}` },
    { pct: 0.56, label: "Confrontation au marché", action: `Analyse d'offres, prérequis et contraintes : ${p.contrainte}`, obs: `Projet réaliste sous réserve de planifier les étapes de montée en compétences` },
    { pct: 0.70, label: "Scénarios de parcours", action: `Choix entre formation, immersion ou candidature dans ${p.profile.secteur}`, obs: `Scénario privilégié : ${p.formation}` },
    { pct: 0.82, label: "Plan d'action", action: `Construction du calendrier : financement ${p.financement}, contacts, échéances`, obs: `Plan personnalisé formalisé avec priorités à 30/90 jours` },
    { pct: 0.92, label: "Préparation restitution", action: `Synthèse des preuves, compétences et points de vigilance`, obs: `Document de synthèse préparé autour de ${p.techniqueSecondaire}` },
    { pct: 1.0, label: "Entretien de restitution", action: `Validation finale du projet ${p.profile.metier} et des prochaines démarches`, obs: `${g(s, "Bénéficiaire engagé", "Bénéficiaire engagée")} ; suivi à 6 mois programmé` },
  ];
  for (const step of steps) {
    const d = new Date(d0.getTime() + total * step.pct);
    rows.push([d.toLocaleDateString("fr-FR"), step.label, step.action, step.obs]);
  }
  return buildDocument({ org: o, title: "GRILLE DE SUIVI DU BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Informations", content: `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Domaine :</strong> ${p.profile.label}<br><strong>Organisme :</strong> ${o.nom}<br><strong>Période :</strong> ${startDate(s, f)} – ${endDate(s, f)}</p>` },
  ], table: { headers: ["Date", "Étapes du bilan", "Actions réalisées", "Observations"], rows } });
}

// ===== CR3 - IND 11 : Questionnaire enquête métiers (vide) =====
export function genQuestionnaireEnqueteMetiersBDC(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "QUESTIONNAIRE ENQUÊTE MÉTIERS", subtitle: `Bilan de compétences – ${f.intitule}`, sections: [
    { heading: "CIBLER LES ACTIVITÉS", content: "" },
    { heading: "Pouvez-vous me décrire votre métier ?", content: "<p>_______________________________________________</p>" },
    { heading: "Au quotidien quelles sont vos activités ?", content: "<p>_______________________________________________</p>" },
    { heading: "Quels types d'outils ou machines utilisez-vous ?", content: "<p>_______________________________________________</p>" },
    { heading: "Utilisez-vous des matières premières ? Lesquelles ?", content: "<p>_______________________________________________</p>" },
    { heading: "Quelle est la part d'initiative dans votre métier ?", content: "<p>_______________________________________________</p>" },
    { heading: "Conditions de travail", content: "" },
    { heading: "Où travaillez-vous ?", content: "<p>_______________________________________________</p>" },
    { heading: "Travaillez-vous en intérieur ou extérieur ?", content: "<p>_______________________________________________</p>" },
    { heading: "Êtes-vous sédentaire ou travaillez-vous sur des sites différents ?", content: "<p>_______________________________________________</p>" },
    { heading: "Travaillez-vous en équipe ou seul ?", content: "<p>_______________________________________________</p>" },
    { heading: "Avez-vous un supérieur hiérarchique ? Où se trouve-t-il ? Comment intervient-il ?", content: "<p>_______________________________________________</p>" },
    { heading: "Quels sont vos horaires. Sont-ils réguliers ?", content: "<p>_______________________________________________</p>" },
    { heading: "Qualités", content: "" },
    { heading: "Les principales qualités demandées dans cette profession sont :", content: "<p>_______________________________________________</p>" },
    { heading: "Celui qui choisit cette profession doit montrer de l'intérêt pour :", content: "<p>_______________________________________________</p>" },
    { heading: "Existe-t-il des exigences physiques particulières ? Si oui, lesquelles ?", content: "<p>_______________________________________________</p>" },
    { heading: "Débouchés", content: "" },
    { heading: "Est-il facile de trouver un emploi dans votre branche ? Pourquoi ?", content: "<p>_______________________________________________</p>" },
    { heading: "Carrière", content: "" },
    { heading: "Quel est votre salaire ?", content: "<p>_______________________________________________</p>" },
    { heading: "Quelles sont vos perspectives de promotion ?", content: "<p>_______________________________________________</p>" },
    { heading: "Formation", content: "" },
    { heading: "Quels sont les diplômes qui préparent à ce métier ?", content: "<p>_______________________________________________</p>" },
    { heading: "Quels sont les avantages, les inconvénients de votre métier ?", content: "<p>_______________________________________________</p>" },
  ] });
}

// ===== CR3 - IND 11 : Questionnaire suivi post-bilan =====
export function genSuiviPostBilanBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SUIVI POST BILAN DE COMPÉTENCES", subtitle: "À remplir 6 mois après la fin du bilan", stagiaires: [s], sections: [
    { heading: "Identification", content: `<p><strong>Bénéficiaire :</strong> <br><strong>Consultant(e) :</strong> <br><strong>Date du bilan :</strong> du ____/____/________ au ____/____/________<br><strong>Date du questionnaire :</strong> ____/____/________</p>` },
    { heading: "1. Avez-vous mis en œuvre votre plan d'action ?", content: "<p>☐ Oui, intégralement<br>☐ Oui, partiellement<br>☐ Non, pas encore<br>Précisions : _______________________________</p>" },
    { heading: "2. Votre projet professionnel a-t-il évolué ?", content: "<p>☐ Je poursuis le même projet<br>☐ J'ai modifié mon projet<br>☐ J'ai abandonné mon projet<br>Précisions : _______________________________</p>" },
    { heading: "3. Avez-vous suivi une formation complémentaire ?", content: "<p>☐ Oui – Laquelle : _______________________________<br>☐ Non</p>" },
    { heading: "4. Votre situation professionnelle actuelle", content: "<p>☐ En poste (même employeur)<br>☐ En poste (nouvel employeur)<br>☐ En recherche d'emploi<br>☐ En formation<br>☐ Création d'entreprise<br>☐ Autre : _______________________________</p>" },
    { heading: "5. Le bilan vous a-t-il aidé dans vos démarches ?", content: "<p>☐ Très utile<br>☐ Assez utile<br>☐ Peu utile<br>☐ Pas utile</p>" },
    { heading: "6. Commentaires libres", content: "<p>_______________________________<br>_______________________________<br>_______________________________</p>" },
  ] });
}

// ===== CR3 - IND 12 : Procédure d'adaptation =====
export function genProcedureAdaptationBDC(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ADAPTATION DE L'ACCOMPAGNEMENT POUR LES BÉNÉFICIAIRES", sections: [
    { heading: "1. Objectif", content: "<p>L'objectif de cette procédure est d'assurer que chaque bénéficiaire d'un bilan de compétences bénéficie d'un accompagnement adapté à ses besoins spécifiques, ses compétences, son rythme et ses contraintes.</p>" },
    { heading: "2. Identification des besoins spécifiques", content: "<p><strong>2.1. Pré-entretien ou questionnaire d'accueil :</strong><br>• Identifier les objectifs professionnels et personnels<br>• Recueillir les informations relatives au parcours<br>• Détecter les besoins spécifiques : handicap, contraintes personnelles, préférences d'apprentissage<br><br><strong>2.2. Documents complémentaires :</strong><br>• Recueil d'attestations médicales si nécessaire (avec consentement)</p>" },
    { heading: "3. Analyse et diagnostic", content: "<p>• Identifier les écarts entre compétences actuelles et objectifs visés<br>• Détecter les obstacles potentiels<br>• Prioriser les adaptations : contenus, rythme, modalités d'évaluation, accompagnement spécifique</p>", variant: "green" },
    { heading: "4. Élaboration du plan d'adaptation", content: "<p>• Co-construction avec le bénéficiaire<br>• Objectifs spécifiques adaptés<br>• Méthodes adaptées (supports audio, vidéo, interactifs)<br>• Aménagements organisationnels (temps modulé, pauses, horaires)<br>• Tutorats personnalisés, coaching motivationnel</p>" },
    { heading: "5. Mise en œuvre", content: "<p>• Informer tous les intervenants<br>• Assurer la confidentialité<br>• Suivi régulier avec le bénéficiaire<br>• Évaluations formatives adaptées</p>" },
    { heading: "6. Suivi et évaluation", content: "<p>• Évaluer régulièrement la progression<br>• Recueillir les retours du bénéficiaire et du consultant<br>• Ajuster le plan si nécessaire<br>• Archiver les données pour l'amélioration continue</p>" },
  ] });
}

// ===== CR4 - IND 19 : Exploration métier =====
export function genExplorationMetierBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  return buildDocument({ org: o, title: "EXPLORATION MÉTIER – BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "1. Contexte et objectif", content: `<p>${g(s, "Le bénéficiaire", "La bénéficiaire")} de ce bilan de compétences exprime un intérêt pour une évolution dans le domaine de <strong>${f.intitule}</strong>. L'objectif est de vérifier la faisabilité du projet professionnel en explorant les exigences du métier, les compétences à acquérir, les formations possibles et les débouchés.</p>` },
    { heading: "2. Métier exploré", content: `<p><strong>Domaine :</strong> ${f.intitule}<br><br><strong>Compétences requises :</strong><br>• <strong>Techniques</strong> : maîtrise des techniques spécifiques au secteur, respect des normes<br>• <strong>Transversales</strong> : rigueur, créativité, organisation, gestion du temps<br>• <strong>Relationnelles</strong> : communication, travail en équipe, gestion de la relation client</p>` },
    { heading: "3. Formations recommandées", content: `<p>• Certifications et diplômes spécifiques au secteur de ${f.intitule}<br>• Stages de perfectionnement<br>• Formation continue et mise à jour des compétences réglementaires</p>`, variant: "green" },
    { heading: "4. Perspectives d'emploi", content: `<p>• Secteur dynamique avec des opportunités variées<br>• Évolutions possibles : spécialisation, management, création d'entreprise<br>• Le métier est en cohérence avec le projet de ${g(s, "le", "la")} bénéficiaire</p>` },
    { heading: "5. Formalisation pour l'audit", content: "<p>Preuves archivées :<br>• Formulaire d'attentes complété en début de bilan<br>• Résultats de l'enquête métier (entretien, fiches ROME)<br>• Plan d'action incluant contacts avec des centres de formation<br>• Synthèse intégrée dans le dossier final<br>• Questionnaire de satisfaction renseigné</p>" },
  ] });
}

// ===== CR4 - IND 19 : Guide des protocoles métier =====
export function genGuideProtocolesBDC(o: OrganismeInfo, f: FormationInfo) {
  const domain = f.intitule || "Esthétique";
  const style = getDocStyle();
  const imgStyle = `width:100%;max-height:220px;object-fit:cover;border-radius:8px;margin:10px 0;`;
  return buildDocument({ org: o, title: `GUIDE DES PROTOCOLES – ${domain.toUpperCase()}`, subtitle: `Ressource pédagogique – Bilan de compétences`, sections: [
    { heading: "Introduction", content: `<p>Ce guide recense les protocoles essentiels du domaine de <strong>${domain}</strong>. Il constitue une ressource pédagogique mise à disposition du bénéficiaire dans le cadre de son bilan de compétences, pour l'aider à identifier, consolider et valoriser ses compétences techniques.</p>` },
    { heading: "PROTOCOLE 1 – Soin du visage classique", content: `<img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80" alt="Soin du visage" style="${imgStyle}"/><p><strong>Objectif :</strong> Nettoyer, purifier et hydrater la peau du visage.<br><br><strong>Matériel nécessaire :</strong><br>• Lait démaquillant ou eau micellaire<br>• Lotion tonique<br>• Gommage doux (grains fins)<br>• Vapeur d'ozone ou serviette chaude<br>• Masque adapté au type de peau<br>• Crème hydratante de finition<br>• Cotons, compresses, spatule<br><br><strong>Déroulé :</strong><br>1. <strong>Démaquillage</strong> (5 min) – Appliquer le lait démaquillant en mouvements circulaires, rincer à la lotion tonique.<br>2. <strong>Analyse de peau</strong> (3 min) – Observer sous lampe loupe : type de peau, imperfections, zones de sécheresse.<br>3. <strong>Gommage</strong> (5 min) – Appliquer le gommage en évitant le contour des yeux, masser doucement.<br>4. <strong>Vapozone / Serviette chaude</strong> (8 min) – Ouvrir les pores pour faciliter l'extraction.<br>5. <strong>Extraction</strong> (10 min) – Retirer les comédons avec précaution à l'aide de cotons.<br>6. <strong>Masque</strong> (15 min) – Appliquer le masque adapté, laisser poser.<br>7. <strong>Hydratation finale</strong> (5 min) – Crème hydratante + protection solaire si nécessaire.</p>`, variant: "green" },
    { heading: "PROTOCOLE 2 – Épilation à la cire", content: `<img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80" alt="Épilation professionnelle" style="${imgStyle}"/><p><strong>Objectif :</strong> Retirer les poils de manière durable et hygiénique.<br><br><strong>Matériel nécessaire :</strong><br>• Cire tiède ou chaude (pot ou cartouche)<br>• Chauffe-cire<br>• Bandes non-tissées (si cire tiède)<br>• Huile post-épilation<br>• Talc, spatules, gants<br><br><strong>Déroulé :</strong><br>1. <strong>Préparation</strong> (3 min) – Désinfecter la zone, appliquer du talc pour absorber l'humidité.<br>2. <strong>Test de température</strong> – Vérifier sur le poignet avant application.<br>3. <strong>Application</strong> – Dans le sens de la pousse du poil, couche fine et régulière.<br>4. <strong>Retrait</strong> – D'un geste sec, dans le sens inverse de la pousse.<br>5. <strong>Finition</strong> – Appliquer l'huile post-épilation pour apaiser et retirer les résidus.</p><p><strong>Précautions :</strong><br>• Vérifier les contre-indications (varices, traitements médicamenteux, coups de soleil)<br>• Respecter les règles d'hygiène strictes (spatule à usage unique)</p>` },
    { heading: "PROTOCOLE 3 – Manucure complète", content: `<img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80" alt="Manucure professionnelle" style="${imgStyle}"/><p><strong>Objectif :</strong> Embellir les mains et les ongles, traiter les cuticules.<br><br><strong>Matériel nécessaire :</strong><br>• Dissolvant, cotons<br>• Lime à ongles (grain 180/240)<br>• Bâtonnet de buis ou repousse-cuticules<br>• Bol d'eau tiède + savon doux<br>• Coupe-ongles, pince à envies<br>• Base coat, vernis, top coat<br>• Crème hydratante mains<br><br><strong>Déroulé :</strong><br>1. <strong>Retrait du vernis</strong> (3 min)<br>2. <strong>Limage</strong> (5 min) – Forme choisie par la cliente (ronde, carrée, amande)<br>3. <strong>Trempage</strong> (5 min) – Ramollir les cuticules dans l'eau tiède.<br>4. <strong>Soin des cuticules</strong> (5 min) – Repousser et retirer les envies.<br>5. <strong>Massage des mains</strong> (5 min) – Crème hydratante.<br>6. <strong>Pose du vernis</strong> (10 min) – Base, 2 couches de couleur, top coat.</p>` },
    { heading: "PROTOCOLE 4 – Maquillage jour / naturel", content: `<img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80" alt="Maquillage professionnel" style="${imgStyle}"/><p><strong>Objectif :</strong> Sublimer le visage de manière naturelle pour un rendu quotidien.<br><br><strong>Déroulé :</strong><br>1. <strong>Préparation</strong> – Hydrater la peau, appliquer un primer si nécessaire.<br>2. <strong>Teint</strong> – Fond de teint adapté à la carnation, estomper au pinceau ou à l'éponge. Correcteur sous les yeux si nécessaire.<br>3. <strong>Poudre</strong> – Fixer légèrement avec une poudre libre translucide.<br>4. <strong>Sourcils</strong> – Structurer avec un crayon ou gel teinté.<br>5. <strong>Yeux</strong> – Ombre à paupières neutre, trait de crayon discret, mascara.<br>6. <strong>Blush</strong> – Touche de couleur sur les pommettes.<br>7. <strong>Lèvres</strong> – Baume teinté ou rouge à lèvres nude.</p>` },
    { heading: "PROTOCOLE 5 – Soin des pieds / Beauté des pieds", content: `<img src="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80" alt="Soin des pieds" style="${imgStyle}"/><p><strong>Objectif :</strong> Traiter les callosités, embellir les ongles des pieds.<br><br><strong>Déroulé :</strong><br>1. <strong>Bain de pieds</strong> (10 min) – Eau tiède + sel ou huile essentielle.<br>2. <strong>Gommage</strong> (5 min) – Gommage mécanique sur les callosités.<br>3. <strong>Râpe / Pierre ponce</strong> (5 min) – Éliminer les peaux mortes sur les talons.<br>4. <strong>Soin des ongles</strong> (10 min) – Coupe, limage, cuticules.<br>5. <strong>Masque hydratant</strong> (10 min) – Envelopper les pieds dans une serviette chaude.<br>6. <strong>Massage + Vernis</strong> (10 min) – Hydratation et pose de vernis.</p>` },
    { heading: "Références et normes", content: `<p>• Code de la santé publique – Normes d'hygiène en esthétique<br>• Référentiel CAP Esthétique Cosmétique Parfumerie<br>• Fiche ROME D1208 – Soins esthétiques et corporels<br>• Guide INRS – Prévention des risques en institut de beauté</p>` },
  ] });
}

// ===== CR4 - IND 19 : Tableau des bases métier =====
export function genTableauBasesBDC(o: OrganismeInfo, f: FormationInfo) {
  const domain = f.intitule || "Esthétique";
  return buildDocument({ org: o, title: `TABLEAU DES BASES – ${domain.toUpperCase()}`, subtitle: `Référentiel technique – Bilan de compétences`, sections: [
    { heading: "Introduction", content: `<p>Ce tableau récapitulatif présente les bases techniques essentielles du domaine de <strong>${domain}</strong>. Il est remis au bénéficiaire en tant que ressource d'appui lors de la phase d'investigation du bilan de compétences.</p>` },
  ], table: { headers: ["Catégorie", "Technique / Produit", "Ingrédients / Composants clés", "Dosage / Application", "Précautions"], rows: [
    ["SOINS VISAGE", "Démaquillage", "Lait démaquillant, eau micellaire", "Appliquer au coton, mouvements circulaires", "Éviter le contour des yeux avec produits agressifs"],
    ["", "Gommage mécanique", "Grains de jojoba, poudre de noyau", "1 noisette, masser 3-5 min", "Peau sensible : grains fins uniquement"],
    ["", "Gommage enzymatique", "Enzymes de papaye / ananas", "Poser 10 min sans frotter", "Contre-indiqué sur peau lésée"],
    ["", "Masque purifiant", "Argile verte, kaolin", "Couche épaisse, poser 15 min", "Ne pas laisser sécher complètement"],
    ["", "Masque hydratant", "Acide hyaluronique, aloe vera", "Couche fine, poser 15-20 min", "Adapter au type de peau"],
    ["", "Modelage facial", "Huile d'amande douce, jojoba", "Pressions douces, 15 min", "Attention zones fragiles"],
    ["ÉPILATION", "Cire tiède", "Résine, colophane, huile", "Chauffer 40-45°C, bandes", "Test température obligatoire"],
    ["", "Cire chaude", "Cire d'abeille, résine", "Chauffer 55-60°C, sans bande", "Contre-indiqué : varices, irritations"],
    ["", "Cire orientale", "Sucre, citron, eau", "Tiède, à la main ou spatule", "Naturelle, hypoallergénique"],
    ["", "Post-épilation", "Huile végétale, bisabolol", "Appliquer en massage doux", "Pas d'exposition solaire 24h"],
    ["MAQUILLAGE", "Base / Primer", "Silicone, acide hyaluronique", "Noisette, estomper au doigt", "Laisser sécher avant fond de teint"],
    ["", "Fond de teint", "Pigments, émollients", "Adapter à la carnation", "Choisir texture selon type de peau"],
    ["", "Poudre libre", "Talc, silice, amidon", "Pinceau large, tapotements", "Éviter excès sur peaux sèches"],
    ["", "Contouring", "Poudre bronzante, highlighter", "Creux des joues, arête du nez", "Estomper impérativement"],
    ["MANUCURE", "Limage", "Lime 180/240 grains", "Un seul sens, forme choisie", "Ne pas limer en va-et-vient"],
    ["", "Soin cuticules", "Huile de ricin, bâtonnet buis", "Repousser après trempage", "Ne jamais couper les cuticules"],
    ["", "Base coat", "Résine, nitrocellulose", "1 couche fine et uniforme", "Protège l'ongle de la coloration"],
    ["", "Vernis semi-permanent", "Gel UV, photoinitiateurs", "2 couches, catalyser 60s UV", "Dépose à l'acétone, ne pas arracher"],
    ["SOINS CORPS", "Gommage corporel", "Sel marin, sucre, huile coco", "Mouvements circulaires, rincer", "Éviter sur peau irritée"],
    ["", "Enveloppement", "Algues, argile, boue thermale", "Couvrir 20-30 min, film alimentaire", "Vérifier allergies"],
    ["", "Massage relaxant", "Huile d'argan, lavande", "Pressions moyennes, 30-45 min", "Contre-indications médicales"],
    ["HYGIÈNE / SÉCURITÉ", "Stérilisation outils", "Autoclave, UV", "Après chaque client", "Norme NF EN ISO 15883"],
    ["", "Désinfection surfaces", "Bactéricide virucide", "Spray + essuyage", "Porter des gants"],
    ["", "Lavage des mains", "Savon antiseptique, SHA", "30 sec min, entre chaque soin", "Obligatoire avant/après tout soin"],
  ] } });
}

// ===== CR5 - IND 21 : Fiche de poste consultant bilan =====
export function genFichePosteConsultantBDC(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FICHE DE POSTE – CONSULTANT(E) BILAN DE COMPÉTENCES", sections: [
    { heading: "Intitulé du poste", content: `<p>Consultant(e) en bilan de compétences<br><strong>Organisme :</strong> ${o.nom}<br><strong>Rattachement :</strong> Direction pédagogique</p>` },
    { heading: "Missions principales", content: "<p>• Conduire des bilans de compétences conformément aux articles L6313-1 à L6313-12 du Code du travail<br>• Accompagner les bénéficiaires dans les trois phases du bilan (préliminaire, investigation, conclusion)<br>• Rédiger les documents de synthèse confidentiels<br>• Assurer le suivi à 6 mois<br>• Réaliser les enquêtes métier et les recherches sectorielles<br>• Garantir la confidentialité des données</p>" },
    { heading: "Compétences requises", content: "<p>• Maîtrise des techniques d'entretien et d'écoute active<br>• Connaissance approfondie du marché de l'emploi et des dispositifs de formation<br>• Capacité d'analyse et de synthèse<br>• Maîtrise des outils d'évaluation (tests, grilles de compétences)<br>• Connaissance du cadre réglementaire (Qualiopi, RGPD)</p>", variant: "green" },
    { heading: "Qualifications", content: "<p>• Diplôme de niveau Bac+3 minimum en psychologie du travail, RH, sciences de l'éducation ou équivalent<br>• Expérience d'au moins 3 ans en accompagnement professionnel<br>• Formation continue en bilan de compétences</p>" },
    { heading: "Conditions", content: `<p>• Lieu : ${o.adresse || "Locaux de l'organisme"}<br>• Disponibilité pour entretiens en présentiel et distanciel<br>• Respect strict de la déontologie et de la confidentialité</p>` },
  ] });
}

// ===== CR5 - IND 21 : Compte rendu de fin de bilan =====
export function genCompteRenduFinBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const p = bdcPersonalisation(f, s, si);
  return buildDocument({ org: o, title: "COMPTE RENDU DE FIN DE BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Informations", content: `<p><strong>Organisme :</strong> ${o.nom}<br><strong>Consultant(e) :</strong> ${consultantName(o)}<br><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br>${s.dateNaissance ? `<strong>Date de naissance :</strong> ${formatDate(s.dateNaissance)}<br>` : ""}<strong>Dates du bilan :</strong> du ${startDate(s, f)} au ${endDate(s, f)}<br><strong>Domaine :</strong> ${p.profile.label}</p>` },
    { heading: "1. Introduction", content: `<p>${beneficiaireLabel(s)} a intégré le dispositif de bilan de compétences pour ${p.objectif}. Dès le premier entretien, ${g(s, "il", "elle")} a exprimé le besoin de confronter son projet aux réalités de ${p.profile.secteur}, notamment sur le point suivant : <strong>${p.contrainte}</strong>.</p>` },
    { heading: "2. Déroulement du bilan", content: `<p>Le bilan s'est déroulé sur la période prévue, dans le respect des trois phases :<br><br><strong>Phase préliminaire :</strong><br>• clarification de la demande et validation du projet ${p.profile.metier}<br>• identification du point fort initial : ${p.pointFort}<br>• cadrage du rythme : ${p.rythme}<br><br><strong>Phase d'investigation :</strong><br>• analyse du parcours et des compétences transférables<br>• travail ciblé sur ${p.technique} et ${p.transversal}<br>• enquête métier dans ${p.profile.secteur}<br>• comparaison des formations et débouchés : ${p.formation}<br><br><strong>Phase de conclusion :</strong><br>• validation de la piste ${p.opportunite}<br>• formalisation des étapes de financement : ${p.financement}<br>• remise du document de synthèse confidentiel</p>`, variant: "green" },
    { heading: "3. Appréciation du consultant", content: `<p>Tout au long du parcours, ${beneficiaireLabel(s)} a montré ${p.pointFort} et une implication régulière. Les travaux réalisés ont confirmé des ressources transférables vers le métier de <strong>${p.profile.metier}</strong>.<br><br><strong>Compétences mises en évidence :</strong><br>• ${p.technique}<br>• ${p.techniqueSecondaire}<br>• ${p.transversal}<br><br><strong>Axe à poursuivre :</strong> ${p.axe}. Cet axe est intégré dans le plan d'action final avec des actions concrètes à court terme.</p>` },
    { heading: "4. Conclusion", content: `<p>Le bilan s'est déroulé dans de bonnes conditions. ${g(s, "Le", "La")} bénéficiaire repart avec un projet professionnel individualisé : <strong>${p.opportunite}</strong>. Les prochaines étapes portent sur ${p.formation}, la sécurisation du financement (${p.financement}) et la mise en relation avec des professionnels du secteur. Un entretien de suivi est prévu dans les 6 mois suivant la fin du bilan.</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [endDate(s, f), endDate(s, f)] } });
}

// ===== CR5 - IND 21 : Fiche intervenant externe =====
export function genFicheIntervenantExterneBDC(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE INTERVENANT EXTERNE", subtitle: `Bilan de compétences – ${f.intitule}`, sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong><br>Adresse : ${o.adresse}<br>SIRET : ${o.siret || "—"}<br>Consultant(e) : ${consultantName(o)}<br>Contact : ${o.email || "—"}${o.telephone?.trim() ? ` – ${o.telephone}` : ""}<br>Formation concernée : Bilan de compétences – ${f.intitule}<br>Dates : du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</p>` },
    { heading: "Identité de l'intervenant externe", content: "<p>• <strong>Nom :</strong> (à compléter)<br>• <strong>Prénom :</strong> (à compléter)<br>• <strong>Entreprise / Structure :</strong> (à compléter)<br>• <strong>SIRET :</strong> (à compléter)<br>• <strong>Fonction :</strong> Professionnel du secteur / Formateur spécialisé<br>• <strong>E-mail :</strong> (à compléter)<br>• <strong>Téléphone :</strong> (à compléter)</p>" },
    { heading: "Compétences et qualifications", content: `<p>• <strong>Diplôme :</strong> Qualification dans le domaine de ${f.intitule}<br>• <strong>Expérience :</strong> Minimum 1 an dans le secteur<br>• <strong>Expérience en transmission :</strong> Ateliers, formation professionnelle ou encadrement</p>`, variant: "green" },
    { heading: "Rôle dans le bilan", content: "<p>• Intervention lors de la <strong>phase d'investigation</strong> du bilan<br>• Présentation du métier : conditions, débouchés, réalités terrain<br>• Partage d'expérience et retour constructif<br>• Participation à la validation du projet du bénéficiaire</p>" },
    { heading: "Modalités d'intervention", content: "<p>• <strong>Type :</strong> Présentiel / Visio<br>• <strong>Durée estimée :</strong> 2 à 4 heures<br>• <strong>Supports fournis :</strong> Témoignage oral, fiche métier, démonstration éventuelle</p>" },
  ] });
}

// ===== CR7 - IND 30 : Satisfaction à chaud BDC =====
export function genSatisfactionChaudBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const dtFin = endDate(s, f);
  const p = bdcPersonalisation(f, s, si);
  const satisfactionTable = (title: string, questions: string[], offset = 0) => {
    const headers = ["Questions", "Très satisfait(e)", "Satisfait(e)", "Moyennement", "Pas satisfait(e)"];
    const patterns = [
      [["X", "", "", ""], ["", "X", "", ""], ["X", "", "", ""], ["X", "", "", ""]],
      [["", "X", "", ""], ["X", "", "", ""], ["X", "", "", ""], ["", "X", "", ""]],
      [["X", "", "", ""], ["X", "", "", ""], ["", "X", "", ""], ["", "X", "", ""]],
    ];
    const selected = patterns[deterministicIndex(s, si, patterns.length, offset)];
    const rows = questions.map((q, i) => [q, ...selected[i % selected.length]]);
    return `<h2>${title}</h2>${tableHTML(headers, rows)}`;
  };
  let content = `<h1>QUESTIONNAIRE DE SATISFACTION À CHAUD – BILAN DE COMPÉTENCES</h1>`;
  content += `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Domaine :</strong> ${p.profile.label}<br><strong>Date du bilan :</strong> du ${startDate(s, f)} au ${endDate(s, f)}<br><strong>Consultant(e) :</strong> ${consultantName(o)}<br><strong>Organisme :</strong> ${o.nom}</p>`;
  content += `<p>Merci de répondre aux questions suivantes en cochant la case correspondant à votre ressenti.</p>`;
  content += satisfactionTable("1. Déroulement du bilan", [
    "L'accueil de l'organisme", `La disponibilité du/de la consultant(e) sur mon projet ${p.profile.metier}`, "Le respect du calendrier établi", "Le cadre et l'organisation générale"
  ], 1);
  content += satisfactionTable("2. Contenu du bilan", [
    `Les outils utilisés pour analyser ${p.technique}`, "La clarté des informations reçues", `L'adaptation de l'accompagnement à mon besoin : ${p.axe}`, `L'aide à la définition de mon projet professionnel vers ${p.opportunite}`
  ], 2);
  content += satisfactionTable("3. Résultats et utilité", [
    "La pertinence du document de synthèse", `La clarté du plan d'action et du financement ${p.financement}`, `L'utilité du bilan pour évoluer dans ${p.profile.secteur}`, "Votre satisfaction globale"
  ], 3);
  content += `<h2>4. Commentaires</h2><p>Ce qui vous a le plus apporté : ${p.commentaireSatisfaction}<br><br>Suggestion d'amélioration : disposer d'un exemple supplémentaire d'offre ou de parcours dans ${p.profile.secteur}.<br><br>Recommanderiez-vous ce bilan ? ☒ Oui ☐ Non</p>`;
  
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SATISFACTION À CHAUD – BILAN DE COMPÉTENCES", stagiaires: [s], extraHtml: content.replace(/<h1>.*?<\/h1>/, ""), sections: [
    { heading: "", content: `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Date du bilan :</strong> du ${startDate(s, f)} au ${endDate(s, f)}<br><strong>Consultant(e) :</strong> ${consultantName(o)}</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [dtFin, dtFin] } });
}

// ===== CR7 - IND 31 : Formulaire de réclamation BDC =====
export function genFormulaireReclamationBDC(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FORMULAIRE DE DÉPÔT DE RÉCLAMATION", sections: [
    { heading: "Identification", content: "<p>Nom : ___________________________<br>Prénom : ___________________________<br>Date de naissance : ___________________________<br>Adresse : ___________________________<br>Téléphone : ___________________________<br>Mail : ___________________________<br>Date du bilan : ___________________________<br>Intitulé du bilan : ___________________________</p>" },
    { heading: "Description de la réclamation", content: "<p>Veuillez détailler de manière la plus précise possible votre réclamation :<br>___________________________<br>___________________________<br>___________________________<br>___________________________</p>" },
    { heading: "Autorisation", content: `<p>J'autorise le centre ${o.nom} à conserver ce formulaire pour améliorer la qualité des prestations et à reprendre contact avec moi :<br><br>☐ Oui &nbsp;&nbsp;&nbsp;&nbsp; ☐ Non</p>` },
  ] });
}

// ===== CR7 - IND 31 : Gestion des réclamations BDC =====
export function genGestionReclamationsBDC(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "GESTION DES RÉCLAMATIONS ET DES DYSFONCTIONNEMENTS", sections: [
    { heading: "1. Objet", content: "<p>Cette procédure décrit les modalités de traitement des réclamations et dysfonctionnements signalés par les bénéficiaires de bilans de compétences.</p>" },
    { heading: "2. Recueil des réclamations", content: "<p>Les réclamations peuvent être transmises par :<br>• Formulaire de dépôt de réclamation (papier ou numérique)<br>• Courrier électronique<br>• Appel téléphonique (consigné par écrit)</p>" },
    { heading: "3. Traitement", content: "<p>• Accusé de réception sous 48h<br>• Analyse de la réclamation par le responsable qualité<br>• Enquête interne si nécessaire<br>• Réponse apportée sous 15 jours ouvrés<br>• Actions correctives mises en place</p>", variant: "green" },
    { heading: "4. Suivi", content: "<p>• Enregistrement dans le tableau de suivi des dysfonctionnements<br>• Analyse trimestrielle des réclamations<br>• Intégration dans le processus d'amélioration continue</p>" },
  ] });
}

// ===== CR7 - IND 32 : Tableau actions correctives =====
export function genActionsCorrectivesBDC(o: OrganismeInfo) {
  const rows = [
    ["Retard de restitution synthèse", "10/01/2025", "Réorganisation planning", "Consultant", "Terminé", "30/01/2025"],
    ["Demande d'adaptation horaires", "15/01/2025", "Flexibilité des créneaux", "Direction", "En cours", "—"],
    ["Difficulté d'accès distanciel", "20/01/2025", "Vérification outil visio", "IT", "Terminé", "25/01/2025"],
  ];
  return buildDocument({ org: o, title: "TABLEAU ACTIONS CORRECTIVES – TRAITEMENT DES RÉCLAMATIONS", table: { headers: ["Réclamation", "Date", "Action corrective", "Responsable", "Statut", "Date clôture"], rows } });
}

// ===== CT2 - IND 4 : Bilan mensuel des abandons / ruptures =====
export function genBilanAbandonsRupturesBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const period = `${formatDate(f.dateDebut || "")} – ${formatDate(f.dateFin || "")}`;
  const rows = stagiaires.map((s, i) => [
    String(i + 1),
    beneficiaireLabel(s),
    "",
    "",
    "",
    "",
  ]);
  return buildDocument({
    org: o,
    title: "BILAN MENSUEL DES ABANDONS / RUPTURES",
    sections: [
      { heading: "Informations générales", content: `
        <p><strong>Période :</strong> ${period}</p>
        <p><strong>Nombre de bénéficiaires :</strong> ${stagiaires.length}</p>
        <p><strong>Nombre d'abandons :</strong> 0</p>
        <p><strong>Nombre d'interruptions en cours de prestation :</strong> 0</p>
      ` },
      { heading: "Analyse suivi des abandons et d'interruptions en cours de prestation", content: "" },
    ],
    table: {
      headers: ["N°", "Nom et prénom du bénéficiaire", "Abandon", "Rupture", "Date", "Motif"],
      rows,
    },
  });
}

// ===== CT2 - IND 4 : Bilan mensuel =====
export function genBilanMensuelBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const period = `${formatDate(f.dateDebut || "")} – ${formatDate(f.dateFin || "")}`;
  const tarif = stagiaires[0] ? getStagiaireTarif(stagiaires[0], f) : (f.tarif || "0");
  const rows: string[][] = [
    ["Intitulé de la formation", f.intitule || "", "", "", ""],
    ["Date de la formation", `${formatDate(f.dateDebut || "")} au ${formatDate(f.dateFin || "")}`, "", "", ""],
    ["Nombre de bénéficiaires", String(stagiaires.length), "", "", ""],
    ["Formation particulier", "", "", "", ""],
    ["Formation entreprise", "", "", "", ""],
    ["Financement", "", "", "", ""],
    ["Opco CPF", "", "", "", ""],
    ["Personnel", "", "", "", ""],
    ["Tarif", tarif + " €", "", "", ""],
    ["", "", "", "", ""],
    ["Nombre total bénéficiaires", String(stagiaires.length), "", "", ""],
    ["[CPF] Nombre total", "", "", "", ""],
    ["[OPCO] Nombre total", "", "", "", ""],
    ["Financement Pôle emploi", "", "", "", ""],
    ["[Financement personnel] Nombre total", "", "", "", ""],
    ["Autre (employeur)", "", "", "", ""],
    ["Tarif total", tarif + " €", "", "", ""],
  ];
  return buildDocument({
    org: o,
    title: "BILAN MENSUEL",
    sections: [
      { heading: "Période", content: `<p>${period}</p>` },
    ],
    table: {
      headers: ["", "Formation 1", "Formation 2", "Formation 3", "Formation 4"],
      rows,
    },
  });
}

// ===== CT6 - IND 23/24/25 : Fiche de veille combinée =====
export function genFicheVeilleBDC(o: OrganismeInfo, f: FormationInfo) {
  const profile = getBdcDomainProfile(f);
  const tableStyle = `style="width:100%;border-collapse:collapse;margin-bottom:10px"`;
  const cellStyle = `style="border:1px solid #999;padding:8px;vertical-align:top"`;
  const headerCell = `style="border:1px solid #999;padding:8px;background:#f0f0f0;font-weight:bold;width:160px;vertical-align:top"`;

  function veillTable(label: string, value: string) {
    return `<tr><td ${headerCell}>${label}</td><td ${cellStyle}>${value}</td></tr>`;
  }

  function renderVeille(v: BdcDomainProfile["veilleReglementaire"], dateLabel: string) {
    return `<table ${tableStyle}>
${veillTable("Intitulé", `<strong>${v.intitule}</strong>`)}
${veillTable("Source", v.source)}
${veillTable("Lien", `<a href="${v.lien}">${v.lien.replace("https://", "")}</a>`)}
${veillTable(dateLabel, v.date)}
${veillTable("Exploitation", v.exploitation)}
</table>`;
  }

  return buildDocument({
    org: o,
    title: `FICHE DE VEILLE – ${profile.label.toUpperCase()}`,
    sections: [
      {
        heading: "1. Veille Réglementaire",
        content: renderVeille(profile.veilleReglementaire, "Date de publication"),
      },
      {
        heading: "2. Veille Métiers",
        content: renderVeille(profile.veilleMetier, "Date de mise à jour"),
      },
      {
        heading: "3. Veille Technologique",
        content: renderVeille(profile.veilleTechnologique, "Date de publication"),
      },
    ],
  });
}

// ===== CT6 - IND 27 : Contrat de sous-traitance BDC (style IZIBUSINESS) =====
export function genContratSousTraitanceBDC(o: OrganismeInfo, f: FormationInfo) {
  const majDate = o.dateMaj || new Date().toISOString().slice(0, 10);
  const dateContrat = formatDate(majDate);
  const oneYearLater = (() => { const d = new Date(majDate); d.setFullYear(d.getFullYear() + 1); return d.toISOString().slice(0, 10); })();
  const dateFinContrat = formatDate(oneYearLater);
  const cachetUrl = (o as OrganismeInfo & { cachet?: string }).cachet || o.tamponUrl;

  return buildDocument({
    org: o,
    title: "CONTRAT DE SOUS-TRAITANCE",
    sections: [
      {
        heading: "",
        content: `<p>Entre les soussignés :</p>
<p><strong>IZIBUSINESS</strong>,<br>
SASU au capital de 100 €, immatriculée au RCS de Créteil sous le numéro <strong>892 035 320 00019</strong>,<br>
ayant son siège social au <strong>1 Place des Alliés, 94600 Choisy-le-Roi</strong>,<br>
détentrice d'un numéro d'activité en cours (déclaration d'activité enregistrée auprès du préfet de région),<br>
représentée par <strong>Madame DENDANI Nadine</strong>, en sa qualité de <strong>Dirigeante</strong>,<br>
ci-après dénommée "le Sous-traitant",</p>

<p>ET :</p>

<p><strong>${o.nom}</strong>,<br>
Organisme de formation déclaré,<br>
ayant son siège au <strong>${o.adresse || ""}</strong>,<br>
${o.siret ? `immatriculé sous le SIRET <strong>${o.siret}</strong>,<br>` : ""}
représenté par <strong>${o.dirigeant || "Le/la dirigeant(e)"}</strong>,<br>
ci-après dénommé "le Donneur d'ordre",</p>`,
      },
      {
        heading: "Article 1 – Objet du contrat",
        content: `<p>Le présent contrat a pour objet de définir les modalités de <strong>sous-traitance des démarches Qualiopi</strong> confiées par <strong>${o.nom}</strong> à <strong>IZIBUSINESS</strong>, en qualité de prestataire externe.</p>
<p>IZIBUSINESS s'engage à réaliser pour le compte de ${o.nom} :</p>
<ul>
<li>La constitution et la mise à jour du <strong>dossier qualité</strong> (indicateurs du Référentiel National Qualité) ;</li>
<li>L'accompagnement aux <strong>audits Qualiopi</strong> (initial, surveillance ou renouvellement) ;</li>
<li>La mise à disposition de <strong>documents types</strong> (procédures, fiches, modèles conformes) ;</li>
<li>Le suivi mensuel des actions de mise en conformité et d'archivage ;</li>
<li>Tout autre acte administratif lié à la certification qualité.</li>
</ul>`,
      },
      {
        heading: "Article 2 – Durée du contrat",
        content: `<p>Le présent contrat est conclu pour une <strong>durée de 1 an</strong>, à compter du <strong>${dateContrat}</strong>, jusqu'au <strong>${dateFinContrat}</strong> inclus.<br>
Il est renouvelable par tacite reconduction sauf dénonciation par lettre recommandée avec préavis de 30 jours.</p>`,
      },
      {
        heading: "Article 3 – Conditions financières",
        content: `<p>Les modalités de rémunération et le montant total de la prestation seront fixés <strong>par un acte ultérieur</strong> (devis ou convention spécifique), signé par les deux parties.<br>
Le présent contrat reconnaît uniquement le <strong>principe de sous-traitance exclusive à IZIBUSINESS</strong> pour les actions Qualiopi pendant la durée mentionnée.</p>`,
      },
      {
        heading: "Article 4 – Obligations du Sous-traitant",
        content: `<p>IZIBUSINESS s'engage à :</p>
<ul>
<li>Respecter la confidentialité des informations transmises par ${o.nom} ;</li>
<li>Utiliser des documents et procédures conformes aux exigences du Référentiel Qualiopi ;</li>
<li>Tenir à disposition les justificatifs nécessaires en cas d'audit ou de contrôle ;</li>
<li>Conserver les documents dans un espace partagé sécurisé, selon les instructions du donneur d'ordre.</li>
</ul>`,
      },
      {
        heading: "Article 5 – Obligations du Donneur d'ordre",
        content: `<p>${o.nom} s'engage à :</p>
<ul>
<li>Fournir à IZIBUSINESS tous les documents nécessaires à l'accomplissement de sa mission ;</li>
<li>Prévenir IZIBUSINESS de tout changement d'activité ou de coordonnées ;</li>
<li>Respecter les délais et modalités convenus dans les éventuelles annexes financières ;</li>
<li>Mentionner IZIBUSINESS comme partenaire sous-traitant en cas de demande du certificateur.</li>
</ul>`,
      },
      {
        heading: "Article 6 – Résiliation",
        content: `<p>Le contrat pourra être résilié de plein droit par l'une ou l'autre des parties, en cas de manquement grave aux obligations contractuelles, et ce, après mise en demeure restée infructueuse pendant <strong>15 jours</strong>.</p>`,
      },
      {
        heading: "Article 7 – Juridiction compétente",
        content: `<p>En cas de litige, les parties s'engagent à rechercher une solution amiable.<br>
À défaut d'accord, le litige relèvera de la compétence exclusive des tribunaux du ressort de <strong>Créteil</strong>.</p>`,
      },
      {
        heading: "",
        content: `<p><strong>Fait à Choisy-le-Roi,</strong><br>
Le <strong>${dateContrat}</strong>,<br>
En <strong>deux exemplaires originaux</strong>.</p>

<div style="display:flex;justify-content:space-between;margin-top:40px">
  <div style="width:45%;text-align:center">
    <p><strong>Pour IZIBUSINESS</strong><br>Madame DENDANI Nadine<br>Dirigeante<br><em>(Lu et approuvé)</em></p>
    <img src="/images/izibusiness_tampon.png" alt="Tampon IZIBUSINESS" style="max-width:200px;margin:10px auto" />
  </div>
  <div style="width:45%;text-align:center">
    <p><strong>Pour ${o.nom}</strong><br>${o.dirigeant || "Le/la dirigeant(e)"}<br><em>(Lu et approuvé)</em></p>
    ${cachetUrl ? `<img src="${cachetUrl}" alt="Tampon" style="max-width:200px;margin:10px auto" />` : '<p style="margin-top:40px">Tampon :</p>'}
  </div>
</div>`,
      },
    ],
  });
}
