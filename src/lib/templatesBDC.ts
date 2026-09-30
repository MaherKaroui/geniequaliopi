/**
 * Templates "Bilans de Compétences" (BDC)
 * Vocabulaire : bénéficiaire (pas stagiaire), consultant(e) (pas formateur),
 *               phases d'accompagnement (pas modules de cours)
 */
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, subtractBusinessDays, tableHTML, section, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireTarif, getStagiaireDuree, g, getDocStyle, footer, orgHeader, htmlWrap, applyGender, isStagiaireFormationTerminee } from "./docBuilder";
import { FormateurInfo, parseDuree } from "./sampleData";
import { generateCVHTML, CV_DESIGNS, type CVData, type CVDesign } from "./cvGenerator";

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

export type BdcDomainProfile = {
  label: string;
  /** true = intitulé sans domaine métier reconnu : aucun métier n'est imposé aux bénéficiaires. */
  generique?: boolean;
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

export function getBdcDomainProfile(f: FormationInfo): BdcDomainProfile {
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
  if (key.includes("patisser") || key.includes("patisseri") || key.includes("cake") || key.includes("boulanger") || key.includes("chocolat")) {
    return {
      label: "Pâtisserie & Cake Design",
      metier: "pâtissier(e) / cake designer",
      secteur: "boutiques de pâtisserie, laboratoires d'hôtel-restaurant, ateliers de cake design événementiel (mariages, baby showers, anniversaires), boulangeries-pâtisseries artisanales",
      missions: ["élaborer et réaliser des recettes de pâtisserie (entremets, tartes, viennoiseries, petits fours)", "concevoir des pièces décoratives de cake design (drip cakes, numbercakes, gâteaux sculptés, fleurs en sucre)", "gérer les commandes événementielles et le planning de production", "appliquer rigoureusement les règles HACCP, hygiène et traçabilité des allergènes", "conseiller la clientèle en boutique et personnaliser les créations"],
      techniques: ["maîtrise des pâtes de base (brisée, sablée, feuilletée, choux)", "crèmes et appareils (pâtissière, mousseline, ganache, crémeux)", "techniques de cake design (pâte à sucre, ganache montée, glaçage miroir, modelage)", "tempérage du chocolat et décors", "organisation d'un laboratoire et calcul de coûts matières"],
      transversales: ["créativité et sens artistique", "rigueur et précision dans les dosages", "résistance physique (station debout, manipulation au froid/chaud)", "écoute client et reformulation pour les commandes personnalisées", "gestion du temps et des urgences de production"],
      contraintes: ["horaires décalés (très tôt le matin, week-ends, fêtes de fin d'année)", "station debout prolongée et manipulation de charges", "respect strict des règles HACCP et de la chaîne du froid", "saisonnalité forte (Noël, Pâques, mariages)", "gestion des allergènes et fiches techniques obligatoires"],
      formations: ["CAP Pâtissier (RNCP1120) en candidat libre ou en CFA", "CAP Chocolatier-Confiseur", "Mention Complémentaire Pâtisserie Glacerie Chocolaterie Confiserie spécialisées", "formations cake design en école spécialisée (Ferrandi, Lenôtre, Bellouet Conseil, École Cake Design)", "formation HACCP obligatoire pour la création d'activité"],
      opportunites: ["emploi en boutique de pâtisserie artisanale", "poste en laboratoire d'hôtel-restaurant ou de traiteur", "création d'un atelier de cake design événementiel à domicile ou en local commercial", "spécialisation wedding cakes / pâtisserie événementielle", "ouverture d'une boutique de pâtisserie / salon de thé"],
      axes: ["consolider les bases techniques (pâtes, crèmes, cuissons)", "développer la technicité cake design (modelage, fleurs en sucre, structure)", "structurer un projet de création d'activité (étude de marché, statut, financement)", "professionnaliser la gestion des commandes et la relation client événementielle"],
      veilleReglementaire: { intitule: "Obligations HACCP, étiquetage des allergènes et hygiène en pâtisserie artisanale", source: "DGCCRF & Légifrance – Paquet hygiène et information du consommateur (INCO)", lien: "https://www.economie.gouv.fr/dgccrf", date: "Janvier 2025", exploitation: "Exploitée pour informer les bénéficiaires sur les obligations légales en création de pâtisserie (formation HACCP, déclaration en mairie, étiquetage des 14 allergènes majeurs, traçabilité). Les projets de création intègrent systématiquement un volet conformité réglementaire." },
      veilleMetier: { intitule: "Tendances métiers pâtisserie et cake design : événementiel, naked cakes, pâtisserie healthy", source: "Confédération Nationale de la Pâtisserie & magazine Fou de Pâtisserie", lien: "https://www.confederation-patisserie.fr", date: "Février 2025", exploitation: "Utilisée pendant l'enquête métier pour comparer les environnements boutique, laboratoire d'hôtel-restaurant et atelier événementiel. Les plans d'action intègrent les tendances actuelles (cake design, gâteaux personnalisés, alternatives sans gluten/vegan)." },
      veilleTechnologique: { intitule: "Outils numériques pour pâtissiers indépendants : prise de commande en ligne, logiciels de calcul de coûts matières, communication Instagram", source: "Le Journal du Pâtissier – innovations digitales et matériel", lien: "https://www.lejournaldupatissier.com", date: "Mars 2025", exploitation: "Présentée pour identifier les outils numériques utiles à la création d'un atelier de cake design (site vitrine, prise de commande, Instagram comme vitrine commerciale, logiciels de food cost)." },
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
  if (key.includes("papier") || key.includes("carton") || key.includes("papeter") || key.includes("cellulose")) {
    return {
      label: "Fabrication du papier et du carton",
      metier: "conducteur(trice) de machine à papier / opérateur(trice) cartonnerie",
      secteur: "industrie papetière, cartonnerie, transformation carton ondulé, emballage et recyclage des fibres cellulosiques",
      missions: ["conduire et surveiller une machine à papier ou une ligne de transformation carton", "régler les paramètres process (vitesse, températures, dosages pâte/produits chimiques, calandrage)", "réaliser les contrôles qualité (grammage, humidité, blancheur, résistance)", "assurer la maintenance de 1er niveau et la traçabilité production", "appliquer les consignes HSE (sécurité machine, ATEX, environnement)"],
      techniques: ["lecture de schémas process et utilisation de supervision (SCADA, GTC)", "conduite de machine à papier (table de formation, presses, sécherie, calandre, enrouleuse)", "transformation carton ondulé (onduleuse, slotter, imprimante, plieuse-colleuse)", "contrôle qualité laboratoire (grammage, COBB, éclatement Mullen, perforation)", "maintenance de premier niveau et préparation aux arrêts techniques"],
      transversales: ["rigueur et attention soutenue", "réactivité face aux dérives process", "travail en équipe postée (3x8, 5x8)", "communication avec le poste précédent/suivant", "respect strict des règles de sécurité industrielle"],
      contraintes: ["travail posté en continu (3x8 ou 5x8) week-ends et jours fériés inclus", "environnement chaud, humide et bruyant (port d'EPI obligatoire)", "vigilance permanente sur la sécurité machine (cylindres, bobines, vapeur)", "exigences qualité élevées et traçabilité client", "évolutions technologiques (digitalisation, transition écologique, fibres recyclées)"],
      formations: ["CQP Conducteur de machine de production papier-carton (UNIDIS)", "CQP Conducteur de ligne de transformation papier-carton", "BTS Pilotage des Procédés", "Licence professionnelle Pâte, Papier et Carton (Pôle PAGORA – Grenoble INP)", "formations HSE / environnement papetier", "habilitations sécurité (consignation, ATEX, pontier-élingueur)"],
      opportunites: ["poste de conducteur de machine à papier dans une papeterie (Norske Skog, International Paper, Smurfit Kappa)", "opérateur ou chef d'équipe en cartonnerie (DS Smith, Saica, Smurfit Kappa, Sical)", "technicien qualité / laboratoire papetier", "technicien environnement / station d'épuration industrielle", "évolution vers chef de quart, contremaître ou responsable production", "métiers du recyclage des fibres et de l'économie circulaire"],
      axes: ["consolider la lecture des paramètres process et la conduite supervisée", "sécuriser les gestes en environnement industriel (sécurité machine, EPI, consignation)", "développer la polyvalence sur plusieurs postes de la ligne", "se préparer à un CQP ou à une qualification reconnue (BTS PP, licence pro PAGORA)"],
      veilleReglementaire: { intitule: "Sécurité machine, ATEX et environnement dans l'industrie papetière", source: "INRS & Code du travail – ED 6122 prévention des risques en industrie papetière", lien: "https://www.inrs.fr", date: "Décembre 2024", exploitation: "Exploitée pour rappeler les obligations sécurité (consignation/déconsignation, ATEX, protection auditive, manutention de bobines), les exigences environnementales (ICPE, rejets aqueux) et les habilitations attendues. Les bénéficiaires visant un poste en production reçoivent une vigilance spécifique sur les EPI et la sécurité machine." },
      veilleMetier: { intitule: "Mutation des métiers de la production papier-carton : recyclage, emballages durables et tension sur les conducteurs de machine", source: "COPACEL & UNIDIS – Observatoire des métiers de l'industrie papetière", lien: "https://www.copacel.fr", date: "Janvier 2025", exploitation: "Utilisée pendant l'enquête métier pour comparer les environnements papeterie, cartonnerie et transformation. Les plans d'action intègrent les opportunités liées au boom de l'emballage carton (e-commerce, substitution du plastique) et aux métiers en tension (conducteur de machine, technicien process)." },
      veilleTechnologique: { intitule: "Digitalisation des lignes (Industrie 4.0), supervision SCADA et fibres recyclées", source: "ATIP – Association Technique de l'Industrie Papetière", lien: "https://www.atip.asso.fr", date: "Février 2025", exploitation: "Présentée pour identifier les compétences numériques attendues (supervision, maintenance prédictive, indicateurs de performance), les évolutions des matières premières (taux de fibres recyclées, désencrage) et les besoins de qualification associés." },
    };
  }
  // Intitulé sans domaine métier (« Bilan de compétences ») : profil neutre, le projet
  // est propre à chaque bénéficiaire (profil déclaratif, bdcModel.profilDeclaratif).
  return {
    label: f.intitule || "Bilan de compétences",
    generique: true,
    metier: "le métier ciblé par son projet",
    secteur: "le secteur d'activité visé",
    missions: ["analyser les activités clés du métier visé", "identifier les compétences transférables", "vérifier les conditions réelles d'exercice", "rencontrer ou interroger un professionnel", "formaliser un plan d'action réaliste"],
    techniques: ["analyse du parcours et portefeuille de compétences", "enquête métier et recherche documentaire", "identification des écarts de compétences", "construction d'un projet réaliste", "formalisation du plan d'action"],
    transversales: ["communication professionnelle", "organisation", "adaptabilité", "autonomie", "capacité d'analyse"],
    contraintes: ["contraintes de rythme et disponibilité", "besoin de sécuriser le financement", "validation progressive du projet", "mise à jour des compétences", "nécessité de confronter le projet au terrain"],
    formations: ["formation certifiante adaptée au projet", "stage d'immersion ou PMSMP", "modules courts de remise à niveau", "accompagnement à la recherche d'emploi ou création d'activité"],
    opportunites: ["reconversion sécurisée", "mobilité interne ou externe", "formation qualifiante", "création d'activité", "spécialisation progressive"],
    axes: ["clarifier le projet professionnel", "renforcer les compétences transférables", "confronter le projet au marché", "organiser les étapes de transition"],
    veilleReglementaire: { intitule: "Évolutions des dispositifs de reconversion et financement", source: "Ministère du Travail – formation professionnelle", lien: "https://travail-emploi.gouv.fr", date: "Janvier 2025", exploitation: "Exploitée pour sécuriser les choix de financement, CPF, transition professionnelle et accompagnement post-bilan." },
    veilleMetier: { intitule: "Tendances emploi et compétences : métiers en tension et besoins en main-d'œuvre", source: "France Travail – fiches métiers et marché du travail", lien: "https://www.francetravail.fr", date: "Février 2025", exploitation: "Utilisée pour vérifier les débouchés, compétences attendues et conditions d'accès au métier visé." },
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

function bdcBeneficiarySections(f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const s = stagiaires?.[si] || stagiaires?.[0];
  if (!s) return [];
  const p = bdcPersonalisation(f, s, si);
  return [{
    heading: "Bénéficiaire concerné",
    content: `<p><strong>Nom :</strong> ${s.nom || ""}<br><strong>Prénom :</strong> ${s.prenom || ""}${s.email ? `<br><strong>E-mail :</strong> ${s.email}` : ""}${s.telephone?.trim() ? `<br><strong>Téléphone :</strong> ${s.telephone}` : ""}<br><strong>Période du bilan :</strong> du ${startDate(s, f)} au ${endDate(s, f)}<br><strong>Objectif individualisé :</strong> ${p.objectif}<br><strong>Axe de travail prioritaire :</strong> ${p.axe}</p>`,
    variant: "green" as const,
  }];
}

// ===== CR1 - IND 1 : Programme du bilan =====
export function genProgrammeBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const ph = phasesDates(f);
  const totalHours = 24;
  const hPrelim = 3;
  const hInvest = 15;
  const hConcl = totalHours - hPrelim - hInvest; // 6h
  const profile = getBdcDomainProfile(f);
  const li = (arr: string[]) => arr.map(x => `• ${x}`).join("<br>");
  const refHandicap = (o as any).referentHandicap || consultantName(o);
  const tel = o.telephone ? ` – ${o.telephone}` : "";
  return buildDocument({ org: o, title: "PROGRAMME DE BILAN DE COMPÉTENCES", subtitle: `Domaine : ${profile.label}`, stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [
    ...bdcBeneficiarySections(f, stagiaires, si),
    { heading: "Objectifs du bilan de compétences", content: `<p>• Analyser les compétences, aptitudes et motivations du bénéficiaire en lien avec le métier de <strong>${profile.metier}</strong> exercé dans le secteur ${profile.secteur}.<br>• Vérifier la faisabilité d'un projet professionnel ciblé sur ce métier (insertion, évolution ou création d'activité).<br>• Identifier les compétences transférables et les écarts à combler par rapport aux exigences du métier.<br>• Élaborer un plan d'action personnalisé : formation, certification, immersion, recherche d'emploi ou installation indépendante.</p>` },
    { heading: "Public visé", content: `<p>• Salariés du secteur privé (CDI, CDD) souhaitant évoluer ou se reconvertir vers le métier de ${profile.metier}.<br>• Demandeurs d'emploi inscrits à France Travail en réflexion sur un projet dans le secteur ${profile.secteur}.<br>• Travailleurs indépendants, intérimaires ou agents publics.<br>• Toute personne en démarche de mobilité professionnelle, sans condition de diplôme.</p>` },
    { heading: "Prérequis", content: `<p>• Aucun diplôme ni expérience préalable exigés dans le domaine.<br>• Maîtrise orale du français souhaitée pour les entretiens et la rédaction de la synthèse.<br>• Démarche personnelle et volontaire de questionnement ou de reconversion vers le métier de ${profile.metier}.</p>` },
    { heading: "Modalités et délais d'accès", content: `<p>• <strong>Inscription :</strong> demande par téléphone, e-mail (${o.email || ""}) ou via le site Mon Compte Formation (CPF).<br>• <strong>Entretien préalable</strong> gratuit et sans engagement pour valider la pertinence du bilan et le mode de financement.<br>• <strong>Délai d'accès :</strong> 11 jours ouvrés minimum après acceptation du devis (CPF) ; 15 jours pour un financement employeur ou Transitions Pro.<br>• <strong>Démarrage</strong> sous 2 à 4 semaines selon le calendrier des consultants et les disponibilités du bénéficiaire.</p>` },
    { heading: "Tarif et modalités de règlement", content: `<p>• <strong>Tarif :</strong> 1 800 € net de TVA pour ${totalHours}h d'accompagnement individuel (organisme exonéré – art. 261-4-4° a CGI).<br>• <strong>Financements possibles :</strong> CPF (Mon Compte Formation), Transitions Pro (PTP), plan de développement des compétences employeur, France Travail (AIF), financement personnel.<br>• <strong>Règlement :</strong> directement par le financeur sur facturation à l'issue du bilan ; en cas de financement personnel, échelonnement possible (50 % à la signature, solde à mi-parcours).<br>• <strong>Convention tripartite</strong> ou contrat individuel signé avant tout démarrage.</p>` },
    { heading: `Phase préliminaire (${hPrelim}h) – ${ph.p1.start} au ${ph.p1.end}`, content: `<p>• Entretien d'accueil individuel : analyse de la demande et des facteurs déclencheurs (lassitude, mobilité, projet d'installation).<br>• Présentation de la méthodologie et signature de la convention tripartite (bénéficiaire / organisme / financeur).<br>• Information sur le cadre légal (art. L6313-10 à L6313-12 du Code du travail) et engagement de confidentialité.<br>• Définition des objectifs personnalisés du bilan, en lien avec le projet de devenir ${profile.metier}.</p>` },
    { heading: `Phase d'investigation (${hInvest}h) – ${ph.p2.start} au ${ph.p2.end}`, content: `<p><strong>Analyse du parcours et des compétences techniques attendues du métier :</strong><br>${li(profile.techniques)}</p><p><strong>Identification des compétences transversales mobilisables :</strong><br>${li(profile.transversales)}</p><p><strong>Étude du métier et de ses missions :</strong><br>${li(profile.missions)}</p><p><strong>Conditions réelles d'exercice à confronter :</strong><br>${li(profile.contraintes)}</p><p><strong>Tests psychométriques et d'orientation</strong> (RIASEC, intérêts professionnels), <strong>enquête métier</strong> auprès de professionnels du secteur (${profile.secteur}) et étude du marché du travail local.</p>` },
    { heading: `Phase de conclusion (${hConcl}h) – ${ph.p3.start} au ${ph.p3.end}`, content: `<p><strong>Projet professionnel principal et alternatif</strong> – Pistes envisagées :<br>${li(profile.opportunites)}</p><p><strong>Axes de progrès identifiés à intégrer au plan d'action :</strong><br>${li(profile.axes)}</p><p><strong>Formations et certifications recommandées :</strong><br>${li(profile.formations)}</p><p>Construction du plan d'action concret (étapes, ressources mobilisables – CPF, Transitions Pro, France Travail, OPCO – calendrier, indicateurs de suivi). Entretien de synthèse, remise du document de synthèse confidentiel et entretien de suivi à 6 mois.</p>` },
    { heading: "Méthodes et moyens pédagogiques", content: `<p>• <strong>Entretiens individuels</strong> menés par un consultant qualifié (psychologue du travail / consultant bilan certifié).<br>• <strong>Tests et questionnaires :</strong> RIASEC (intérêts professionnels), Sosie ou Performanse (personnalité), questionnaire de valeurs et motivations, inventaire des compétences acquises.<br>• <strong>Enquête métier</strong> auprès de professionnels du secteur ${profile.secteur} (${profile.metier}) et exploration documentaire (fiches ROME, Onisep, référentiels CAP / titres professionnels).<br>• <strong>Outils numériques :</strong> plateforme sécurisée d'auto-positionnement, espace de travail personnel, ressources Pôle Emploi / France Compétences.<br>• <strong>Travail intersession</strong> guidé : recherches, lectures, contacts professionnels, immersions courtes (PMSMP).</p>` },
    { heading: "Modalités d'évaluation et de suivi", content: `<p>• <strong>Évaluation continue</strong> à chaque séance : reformulation, validation des acquis, ajustement du rythme.<br>• <strong>Évaluation à chaud</strong> en fin de bilan (questionnaire de satisfaction).<br>• <strong>Entretien de suivi à 6 mois</strong> (téléphonique ou présentiel) pour mesurer la mise en œuvre du plan d'action, conformément à l'art. R6313-8 CT.<br>• <strong>Évaluation à froid</strong> (questionnaire) pour mesurer l'impact du bilan sur le projet professionnel.</p>` },
    { heading: "Document de synthèse et restitution des résultats", content: `<p>• Le bénéficiaire reçoit l'ensemble des <strong>résultats détaillés</strong> des tests et entretiens commentés en séance.<br>• Un <strong>document de synthèse écrit</strong> (circonstances, compétences identifiées, projet, plan d'action) lui est remis en main propre lors du dernier entretien, en version papier et numérique.<br>• Ce document est la <strong>propriété exclusive du bénéficiaire</strong> (art. R6313-7 CT). Il ne peut être communiqué à un tiers (employeur, financeur) qu'avec son <strong>accord écrit</strong>.</p>` },
    { heading: "Accessibilité aux personnes en situation de handicap", content: `<p>Nos locaux et nos modalités d'accompagnement sont accessibles aux personnes en situation de handicap. Un <strong>référent handicap</strong> est mobilisable dès l'entretien préalable pour étudier les adaptations nécessaires (rythme, supports, lieu, modalité distancielle, partenariats Agefiph / Cap Emploi).<br><strong>Référent handicap :</strong> ${refHandicap}${tel}${o.email ? ` – ${o.email}` : ""}.</p>` },
    { heading: "Organisation dédiée au bilan de compétences", content: `<p>${o.nom || "L'organisme"} dispose d'une <strong>équipe et de procédures dédiées</strong> à l'activité bilan de compétences, distinctes de l'activité de formation : consultants spécifiquement formés, locaux confidentiels, dossiers archivés séparément, supervision interne et démarche d'amélioration continue.</p>` },
    { heading: "Conservation et destruction des documents", content: `<p>Conformément aux articles L6313-10 à L6313-12 et R6313-7 du Code du travail :<br>• Les documents établis pour la réalisation du bilan (notes, tests, supports) sont <strong>détruits par l'organisme à l'issue du bilan</strong>.<br>• Seuls le document de synthèse et la convention sont conservés, et uniquement <strong>avec l'accord écrit du bénéficiaire</strong> (1 an maximum).<br>• Les résultats détaillés et le document de synthèse restent la propriété exclusive du bénéficiaire.</p>` },
    { heading: "Modalités logistiques", content: `<p><strong>Durée totale :</strong> ${totalHours}h (réparties sur 8 à 10 séances individuelles)<br><strong>Dates :</strong> du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br><strong>Modalité :</strong> ${f.modalites || "Présentiel"}<br><strong>Lieu :</strong> ${o.adresse || "Locaux de l'organisme"}<br><strong>Consultant(e) :</strong> ${consultantName(o)}</p>` },
    { heading: "Confidentialité", content: "<p>Le contenu des entretiens, des tests et du document de synthèse est strictement confidentiel, conformément aux articles L6313-10 à L6313-12 du Code du travail. Le consultant est tenu au secret professionnel. Aucune information ne peut être transmise à un tiers sans l'accord écrit du bénéficiaire.</p>" },
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
export function genDerouleModalitesBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const ph = phasesDates(f);
  const { totalHours } = parseDuree(f.duree || "24h");
  return buildDocument({ org: o, title: `DÉROULÉ ET MODALITÉS DU BILAN DE COMPÉTENCES`, subtitle: `Domaine : ${f.intitule}`, stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [
    ...bdcBeneficiarySections(f, stagiaires, si),
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
    { heading: "Article 5 – Confidentialité", content: "<p>Le contenu des entretiens, des tests et le document de synthèse sont strictement confidentiels (art. L6313-10 à L6313-12 CT). Le consultant est tenu au secret professionnel. Le document de synthèse est la propriété exclusive du bénéficiaire et ne peut être communiqué à un tiers qu'avec son accord écrit.</p>" },
    { heading: "Article 6 – Conservation et destruction des documents", content: "<p>Conformément à l'article R6313-7 du Code du travail, les documents établis pour la réalisation du bilan (notes, tests, supports de travail) sont <strong>détruits par l'organisme à l'issue du bilan</strong>. Seuls le document de synthèse et la convention peuvent être conservés, et uniquement <strong>avec l'accord écrit du bénéficiaire</strong>, pour une durée maximale de <strong>1 an</strong>. Au-delà, ils sont détruits sauf demande expresse écrite contraire du bénéficiaire.</p>" },
    { heading: "Article 7 – Suivi à 6 mois", content: "<p>Un entretien de suivi est proposé au bénéficiaire dans un délai de 6 mois après la fin du bilan, conformément à l'article R6313-8 CT, pour mesurer la mise en œuvre du plan d'action et apporter un éventuel appui complémentaire.</p>" },
  ], signatures: { type: "2", labels: ["Le Prestataire", `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [sigDateBDC(s, f), sigDateBDC(s, f)] } });
}

// ===== CR3 - IND 9 : Formulaire d'attentes et objectifs =====
export function genFormulaireAttentesBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const p = bdcPersonalisation(f, s, si);
  return buildDocument({ org: o, title: "FORMULAIRE D'ATTENTES ET OBJECTIFS", subtitle: `Bilan de compétences – ${p.profile.label}`, stagiaires: [s], sections: [
    { heading: "1. Identification du bénéficiaire", content: `<p>• Nom : ${s.nom}<br>• Prénom : ${s.prenom}<br>${s.dateNaissance ? `• Date de naissance : ${formatDate(s.dateNaissance)}<br>` : ""}${s.email ? `• E-mail : ${s.email}<br>` : ""}${s.telephone ? `• Téléphone : ${s.telephone}` : ""}</p>` },
    { heading: "2. Cadre du bilan", content: `<p>• Consultant(e) : ${consultantName(o)}<br>• Organisme : ${o.nom}<br>• Métier ciblé : ${p.profile.metier}<br>• Secteur exploré : ${p.profile.secteur}</p>` },
    { heading: "3. Motivations et attentes", content: `<p><strong>Q1 : Quel est votre principal objectif professionnel ?</strong><br>Je souhaite ${p.objectif}. Mon point fort identifié – <strong>${p.pointFort}</strong> – est un appui que je veux mettre au service de ce projet.<br><br><strong>Q2 : Qu'est-ce qui vous motive ?</strong><br>Renforcer la compétence technique <strong>${p.technique}</strong>, consolider <strong>${p.techniqueSecondaire}</strong> et confirmer mon attrait pour le quotidien d'un(e) ${p.profile.metier} dans ${p.profile.secteur}.<br><br><strong>Q3 : Quels résultats attendez-vous ?</strong><br>Identifier clairement mon axe de progrès – <strong>${p.axe}</strong> – et obtenir un plan d'action chiffré (formation, financement, calendrier) pour aboutir à <strong>${p.opportunite}</strong>.</p>`, variant: "green" },
    { heading: "4. Compétences à développer", content: `<p><strong>Q4 : Compétences techniques à renforcer ?</strong><br>Prioritairement <strong>${p.technique}</strong>, puis en complément <strong>${p.techniqueSecondaire}</strong>, en lien direct avec le référentiel ${p.profile.label}.<br><br><strong>Q5 : Compétences transversales ?</strong><br>Consolider <strong>${p.transversal}</strong>, en m'appuyant sur ma <strong>${p.pointFort}</strong> et en travaillant le point de vigilance suivant : <strong>${p.vigilance}</strong>.</p>` },
    { heading: "5. Conditions et contraintes", content: `<p><strong>Q6 : Contraintes à prendre en compte ?</strong><br>Contrainte principale identifiée : <strong>${p.contrainte}</strong>. Le rythme proposé est compatible : ${p.rythme}.<br><br><strong>Q7 : Préférences pédagogiques ?</strong><br>Entretiens individuels en ${(f.modalites || "présentiel").toLowerCase()}, mises en situation et apports métier ciblés sur ${p.profile.secteur}.</p>` },
    { heading: "6. Perspectives professionnelles", content: `<p><strong>Q8 : Quel poste ou secteur visez-vous ?</strong><br>Cible privilégiée : <strong>${p.opportunite}</strong> dans ${p.profile.secteur}.<br><br><strong>Q9 : Entreprises identifiées ?</strong><br>Recherches en cours sur le bassin d'emploi local (${p.profile.secteur}) ; enquête métier prévue en phase d'investigation.<br><br><strong>Q10 : Financement envisagé ?</strong><br>${p.financement}, avec sécurisation des démarches dans le plan d'action final.</p>` },
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
export function genQuestionnaireEnqueteMetiersBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const s = stagiaires?.[si] || stagiaires?.[0];
  const p = bdcPersonalisation(f, s, si);
  return buildDocument({ org: o, title: "QUESTIONNAIRE ENQUÊTE MÉTIERS", subtitle: `Bilan de compétences – ${s ? beneficiaireLabel(s) : f.intitule}`, stagiaires: s ? [s] : undefined, sections: [
    ...bdcBeneficiarySections(f, stagiaires, si),
    { heading: "Cibler les activités", content: `<p><strong>Métier interrogé :</strong> ${p.profile.metier}<br><strong>Secteur :</strong> ${p.profile.secteur}<br><strong>Objectif de l'enquête :</strong> vérifier ${p.objectif}.</p>` },
    { heading: "Pouvez-vous me décrire votre métier ?", content: `<p>Le métier de ${p.profile.metier} consiste principalement à ${p.profile.missions.slice(0, 3).join(", ")}. Les activités demandent une bonne connaissance du terrain et une capacité d'adaptation aux situations rencontrées.</p>` },
    { heading: "Au quotidien quelles sont vos activités ?", content: listHtml(p.profile.missions) },
    { heading: "Quels types d'outils ou machines utilisez-vous ?", content: listHtml(p.profile.techniques) },
    { heading: "Conditions de travail", content: `<p>Les principales contraintes observées sont :</p>${listHtml(p.profile.contraintes)}<p><strong>Point à vérifier pour ${s ? beneficiaireLabel(s) : "le bénéficiaire"} :</strong> ${p.contrainte}.</p>` },
    { heading: "Qualités", content: `<p>Les qualités attendues sont :</p>${listHtml(p.profile.transversales)}<p><strong>Atout personnel à valoriser :</strong> ${p.pointFort}. <strong>Axe à renforcer :</strong> ${p.axe}.</p>` },
    { heading: "Débouchés", content: `${listHtml(p.profile.opportunites)}<p><strong>Piste privilégiée :</strong> ${p.opportunite}.</p>` },
    { heading: "Formation", content: `${listHtml(p.profile.formations)}<p><strong>Formation prioritaire identifiée :</strong> ${p.formation}.</p>` },
    { heading: "Synthèse de l'enquête", content: `<p>L'enquête confirme la cohérence du projet sous réserve de travailler : <strong>${p.vigilance}</strong>. Les informations recueillies seront intégrées au document de synthèse et au plan d'action final.</p>`, variant: "green" },
  ] });
}

// ===== CR3 - IND 11 : Questionnaire suivi post-bilan =====
export function genSuiviPostBilanBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const termine = isStagiaireFormationTerminee(s, f);
  const p = bdcPersonalisation(f, s, si);
  // Si formation terminée → pré-remplir avec données réalistes pour audit
  if (termine) {
    const dtFin = endDate(s, f);
    // Date du questionnaire : ~6 mois après fin de bilan
    const dFin = new Date(s.dateFinFormation || f.dateFin);
    dFin.setMonth(dFin.getMonth() + 6);
    const dtQuestionnaire = formatDate(dFin.toISOString().split("T")[0]);
    // Variantes déterministes
    const planAction = ["☒ Oui, intégralement", "☒ Oui, partiellement", "☒ Oui, intégralement"][deterministicIndex(s, si, 3, 51)];
    const projetEvol = ["☒ Je poursuis le même projet", "☒ Je poursuis le même projet", "☒ J'ai modifié mon projet"][deterministicIndex(s, si, 3, 52)];
    const formationCompl = ["☒ Oui", "☐ Oui", "☒ Oui"][deterministicIndex(s, si, 3, 53)];
    const formLib = formationCompl.includes("☒") ? p.formation : "—";
    const situations = ["☒ En poste (nouvel employeur)", "☒ En formation", "☒ Création d'entreprise", "☒ En poste (même employeur)"];
    const situation = situations[deterministicIndex(s, si, situations.length, 54)];
    const utilites = ["☒ Très utile", "☒ Très utile", "☒ Assez utile"];
    const utilite = utilites[deterministicIndex(s, si, utilites.length, 55)];
    return buildDocument({ org: o, title: "QUESTIONNAIRE DE SUIVI POST BILAN DE COMPÉTENCES", subtitle: "Bilan à 6 mois après la fin du bilan", stagiaires: [s], sections: [
      { heading: "Identification", content: `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Consultant(e) :</strong> ${consultantName(o)}<br><strong>Date du bilan :</strong> du ${startDate(s, f)} au ${dtFin}<br><strong>Date du questionnaire :</strong> ${dtQuestionnaire}</p>` },
      { heading: "1. Avez-vous mis en œuvre votre plan d'action ?", content: `<p>${planAction.includes("intégralement") ? planAction : "☐ Oui, intégralement"}<br>${planAction.includes("partiellement") ? planAction : "☐ Oui, partiellement"}<br>☐ Non, pas encore<br>Précisions : ${p.opportunite} – démarches engagées (${p.formation}).</p>` },
      { heading: "2. Votre projet professionnel a-t-il évolué ?", content: `<p>${projetEvol.includes("même") ? projetEvol : "☐ Je poursuis le même projet"}<br>${projetEvol.includes("modifié") ? projetEvol : "☐ J'ai modifié mon projet"}<br>☐ J'ai abandonné mon projet<br>Précisions : confirmation de la piste ${p.opportunite} dans ${p.profile.secteur}.</p>` },
      { heading: "3. Avez-vous suivi une formation complémentaire ?", content: `<p>${formationCompl} – Laquelle : ${formLib}<br>${formationCompl.includes("☒") ? "☐ Non" : "☒ Non"}</p>`, variant: "green" },
      { heading: "4. Votre situation professionnelle actuelle", content: `<p>${situation}<br>Précisions : insertion en cours dans ${p.profile.secteur}.</p>` },
      { heading: "5. Le bilan vous a-t-il aidé dans vos démarches ?", content: `<p>${utilite}</p>` },
      { heading: "6. Commentaires libres", content: `<p>${p.commentaireSatisfaction}</p>` },
    ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [dtQuestionnaire, dtQuestionnaire] } });
  }
  // Sinon : trame vierge (formation non terminée)
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SUIVI POST BILAN DE COMPÉTENCES", subtitle: "À remplir 6 mois après la fin du bilan", stagiaires: [s], sections: [
    { heading: "Identification", content: `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Consultant(e) :</strong> ${consultantName(o)}<br><strong>Date du bilan :</strong> du ${startDate(s, f)} au ${endDate(s, f)}<br><strong>Date du questionnaire :</strong> ____/____/________</p>` },
    { heading: "1. Avez-vous mis en œuvre votre plan d'action ?", content: "<p>☐ Oui, intégralement<br>☐ Oui, partiellement<br>☐ Non, pas encore<br>Précisions : _______________________________</p>" },
    { heading: "2. Votre projet professionnel a-t-il évolué ?", content: "<p>☐ Je poursuis le même projet<br>☐ J'ai modifié mon projet<br>☐ J'ai abandonné mon projet<br>Précisions : _______________________________</p>" },
    { heading: "3. Avez-vous suivi une formation complémentaire ?", content: "<p>☐ Oui – Laquelle : _______________________________<br>☐ Non</p>" },
    { heading: "4. Votre situation professionnelle actuelle", content: "<p>☐ En poste (même employeur)<br>☐ En poste (nouvel employeur)<br>☐ En recherche d'emploi<br>☐ En formation<br>☐ Création d'entreprise<br>☐ Autre : _______________________________</p>" },
    { heading: "5. Le bilan vous a-t-il aidé dans vos démarches ?", content: "<p>☐ Très utile<br>☐ Assez utile<br>☐ Peu utile<br>☐ Pas utile</p>" },
    { heading: "6. Commentaires libres", content: "<p>_______________________________<br>_______________________________<br>_______________________________</p>" },
  ] });
}

// ===== CR3 - IND 12 : Procédure d'adaptation =====
export function genProcedureAdaptationBDC(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ADAPTATION DE L'ACCOMPAGNEMENT POUR LES BÉNÉFICIAIRES", stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [
    ...(f ? bdcBeneficiarySections(f, stagiaires, si) : []),
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
export function genGuideProtocolesBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const profile = getBdcDomainProfile(f);
  const key = (f.intitule || "").toLowerCase();
  const imgStyle = `width:100%;max-height:220px;object-fit:cover;border-radius:8px;margin:10px 0;`;
  const isMeca = /mecan|véhic|vehic|automob/i.test(key);
  const isNTC = /negoc|technico|commerc/i.test(key);

  let sections: { heading: string; content: string; variant?: "green" }[] = [];
  let refs = "";

  if (isMeca) {
    sections = [
      { heading: "Introduction", content: `<p>Ce guide recense les protocoles essentiels du métier de <strong>${profile.metier}</strong> exercé dans ${profile.secteur}. Il est remis au bénéficiaire comme ressource d'appui pendant la phase d'investigation pour identifier ses compétences techniques transférables.</p>` },
      { heading: "PROTOCOLE 1 – Accueil client et ordre de réparation (OR)", content: `<img src="https://images.unsplash.com/photo-1632823471565-1ecdf5158051?w=800&q=80" alt="Accueil client en garage automobile" style="${imgStyle}"/><p><strong>Objectif :</strong> Réceptionner le véhicule, formaliser la demande client et sécuriser l'intervention.<br><br><strong>Matériel nécessaire :</strong><br>• Logiciel DMS (GIMS, Sage Garage, iCar)<br>• Fiche OR papier ou tablette<br>• Housse de protection siège, volant, levier de vitesses<br>• Carte d'identification véhicule (carte grise)<br><br><strong>Déroulé :</strong><br>1. <strong>Accueil et écoute</strong> (5 min) – Reformuler la panne décrite par le client.<br>2. <strong>Tour de véhicule</strong> (5 min) – Relever chocs, rayures, kilométrage, niveau carburant.<br>3. <strong>Saisie OR</strong> (10 min) – Immatriculation, VIN, motorisation, opérations demandées.<br>4. <strong>Devis prévisionnel</strong> – Forfait main-d'œuvre + pièces.<br>5. <strong>Validation client</strong> – Signature OR et accord sur délai/montant.</p>`, variant: "green" },
      { heading: "PROTOCOLE 2 – Vidange moteur et remplacement filtres", content: `<img src="https://images.unsplash.com/photo-1635260615739-bf3c7c4e0c7d?w=800&q=80" alt="Vidange moteur automobile" style="${imgStyle}"/><p><strong>Matériel :</strong> Pont élévateur, bac de récupération, clé à filtre, clé dynamométrique, huile préconisée constructeur (5W30, 0W20…), joint de bouchon de vidange neuf, filtre à huile neuf.<br><br><strong>Déroulé :</strong><br>1. Mettre le véhicule sur pont, moteur tiède.<br>2. Dévisser le bouchon de vidange, laisser s'écouler 10 min.<br>3. Remplacer le joint, resserrer au couple constructeur.<br>4. Démonter et remplacer le filtre à huile (graisser le joint neuf).<br>5. Remplir d'huile à la jauge maxi, contrôler étanchéité après démarrage.<br>6. Réinitialiser l'indicateur d'entretien sur le tableau de bord.<br>7. Tracer l'intervention sur le carnet et l'OR.</p>` },
      { heading: "PROTOCOLE 3 – Remplacement plaquettes et disques de frein", content: `<img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80" alt="Système de freinage automobile" style="${imgStyle}"/><p><strong>Matériel :</strong> Cric, chandelles, clé dynamométrique, repousse-piston, nettoyant frein, graisse cuivre, plaquettes et disques neufs.<br><br><strong>Déroulé :</strong><br>1. Lever le véhicule, déposer la roue.<br>2. Démonter l'étrier, repousser le piston (attention au liquide DOT4).<br>3. Déposer plaquettes et disque, nettoyer le moyeu.<br>4. Monter disque neuf + plaquettes neuves (graisse cuivre sur les chants uniquement).<br>5. Resserrer au couple, reposer la roue.<br>6. Pomper la pédale jusqu'à dureté retrouvée.<br>7. Essai routier de freinage et rodage 200 km doux.</p>` },
      { heading: "PROTOCOLE 4 – Diagnostic électronique OBD-II", content: `<img src="https://images.unsplash.com/photo-1632823469850-1b7b1e8b7c6b?w=800&q=80" alt="Valise diagnostic OBD" style="${imgStyle}"/><p><strong>Matériel :</strong> Valise diagnostic multimarque (Bosch KTS, Delphi, Launch X431), multimètre, oscilloscope.<br><br><strong>Déroulé :</strong><br>1. Connecter la valise sur la prise OBD-II (sous le volant).<br>2. Lire les codes défaut sur chaque calculateur (moteur, ABS, ESP, airbag).<br>3. Interpréter les codes (DTC) avec la documentation technique constructeur.<br>4. Effectuer les mesures de paramètres en temps réel (sondes, capteurs).<br>5. Localiser la panne (élément, faisceau, calculateur).<br>6. Effacer les défauts après réparation et valider l'absence de retour.</p>` },
      { heading: "PROTOCOLE 5 – Intervention sur véhicule hybride / électrique (consignation)", content: `<img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80" alt="Maintenance véhicule électrique" style="${imgStyle}"/><p><strong>Habilitation requise :</strong> B1L / B2L / BCL selon la norme NF C 18-550.<br><br><strong>Déroulé :</strong><br>1. EPI : gants isolants 1000 V, écran facial, tapis isolant.<br>2. Couper le contact, retirer la clé, attendre la temporisation constructeur (5 à 10 min).<br>3. Déposer le shut-off plug (sectionneur de service haute tension).<br>4. Vérifier l'absence de tension (VAT) sur les bornes batterie HT.<br>5. Poser la pancarte de consignation et la condamnation.<br>6. Réaliser l'intervention.<br>7. Déconsigner dans l'ordre inverse, contrôler les défauts au démarrage.</p>` },
    ];
    refs = `<p>• Référentiel CAP Maintenance des véhicules option A – RNCP36796<br>• Norme NF C 18-550 – Opérations sur véhicules à motorisation thermique, hybride et électrique<br>• Convention Collective Services de l'Automobile (IDCC 1090)<br>• Fiche ROME I1604 – Mécanique automobile<br>• Documentation INRS / ANFA – Sécurité atelier après-vente</p>`;
  } else if (isNTC) {
    sections = [
      { heading: "Introduction", content: `<p>Ce guide recense les protocoles commerciaux clés du métier de <strong>${profile.metier}</strong> dans ${profile.secteur}. Il sert de ressource d'appui en phase d'investigation pour formaliser les compétences déjà mises en œuvre par le bénéficiaire.</p>` },
      { heading: "PROTOCOLE 1 – Plan de prospection multicanale", content: `<img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Prospection commerciale BtoB" style="${imgStyle}"/><p><strong>Objectif :</strong> Construire un pipeline de prospects qualifiés sur 4 semaines.<br><br><strong>Outils :</strong> CRM (HubSpot, Salesforce, Pipedrive), LinkedIn Sales Navigator, fichiers ICP (Ideal Customer Profile), séquences e-mail (Lemlist, Waalaxy).<br><br><strong>Déroulé :</strong><br>1. <strong>Définition de l'ICP</strong> – Secteur, taille, CA, décideur cible.<br>2. <strong>Constitution du fichier</strong> (200 comptes) – Sales Nav + bases sectorielles.<br>3. <strong>Plan de touches multicanal</strong> – J1 connexion LinkedIn, J3 e-mail personnalisé, J6 appel, J10 e-mail de relance, J15 message LinkedIn de relance.<br>4. <strong>Suivi CRM quotidien</strong> – Statut prospect, prochaine action.<br>5. <strong>Indicateurs hebdo</strong> – Taux de réponse, taux de RDV, coût par lead.</p>`, variant: "green" },
      { heading: "PROTOCOLE 2 – Découverte client (méthode SPIN / SONCAS)", content: `<img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" alt="Rendez-vous commercial BtoB" style="${imgStyle}"/><p><strong>Déroulé d'un rendez-vous découverte (45 min) :</strong><br>1. <strong>Brise-glace + cadrage</strong> (3 min) – Méthode CROC.<br>2. <strong>Questions de Situation</strong> – Comment fonctionnent-ils aujourd'hui ?<br>3. <strong>Questions de Problème</strong> – Quelles difficultés rencontrent-ils ?<br>4. <strong>Questions d'Implication</strong> – Quelles conséquences sur leur activité ?<br>5. <strong>Questions de Need-payoff</strong> – Quelle valeur attendue d'une solution ?<br>6. <strong>Identification du profil SONCAS</strong> – Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie.<br>7. <strong>Synthèse + prochaine étape</strong> – Engagement sur la suite (démo, devis, RDV décideur).</p>` },
      { heading: "PROTOCOLE 3 – Construction d'une proposition commerciale technico-commerciale", content: `<img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" alt="Proposition commerciale" style="${imgStyle}"/><p><strong>Structure standard :</strong><br>1. Page de garde personnalisée (logo client, nom de l'interlocuteur, date).<br>2. Reformulation du besoin et des enjeux exprimés en découverte.<br>3. Solution technique proposée (caractéristiques, schémas, options).<br>4. Bénéfices client chiffrés (ROI, gain de temps, économies).<br>5. Méthodologie de mise en œuvre (planning, jalons, équipe).<br>6. Tarification – Détail prix unitaires, remises, conditions de paiement, validité de l'offre.<br>7. Références clients similaires.<br>8. CGV et bon pour accord.</p>` },
      { heading: "PROTOCOLE 4 – Négociation et traitement des objections", content: `<img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80" alt="Négociation commerciale" style="${imgStyle}"/><p><strong>Méthode CRAC pour traiter une objection :</strong><br>• <strong>C</strong>reuser – « Qu'entendez-vous par … ? »<br>• <strong>R</strong>eformuler – « Si je comprends bien … »<br>• <strong>A</strong>rgumenter – Bénéfice concret + preuve.<br>• <strong>C</strong>ontrôler – « Cela répond-il à votre attente ? »<br><br><strong>Levier de négociation :</strong> ne jamais lâcher de remise sans contrepartie (volume, délai de paiement, durée d'engagement, témoignage).</p>` },
      { heading: "PROTOCOLE 5 – Suivi CRM et fidélisation portefeuille", content: `<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Tableau de bord CRM" style="${imgStyle}"/><p><strong>Rituels hebdomadaires :</strong><br>• Mise à jour systématique du pipeline (date de closing, montant, probabilité).<br>• Relance des opportunités sans activité depuis 7 jours.<br>• Reporting hebdo manager (CA prévisionnel, taux de transformation).<br><br><strong>Plan de fidélisation client :</strong><br>1. Bilan trimestriel client (QBR).<br>2. Identification d'opportunités de cross-selling et up-selling.<br>3. Mesure du NPS (Net Promoter Score) post-livraison.<br>4. Programme parrainage / témoignage client.</p>` },
    ];
    refs = `<p>• Référentiel Titre Professionnel Négociateur Technico-Commercial – RNCP39063 (niveau 5)<br>• Fiche ROME D1402 – Relation commerciale grands comptes et entreprises<br>• Code de la consommation – CGV BtoB / délais de paiement (loi LME)<br>• RGPD – Prospection commerciale et consentement (CNIL)<br>• Référentiel APEC – Métiers commerciaux BtoB</p>`;
  } else {
    // Default: Esthétique
    sections = [
      { heading: "Introduction", content: `<p>Ce guide recense les protocoles essentiels du métier de <strong>${profile.metier}</strong> dans ${profile.secteur}. Il est remis au bénéficiaire comme ressource d'appui pendant la phase d'investigation du bilan.</p>` },
      { heading: "PROTOCOLE 1 – Soin du visage classique", content: `<img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80" alt="Soin du visage" style="${imgStyle}"/><p><strong>Objectif :</strong> Nettoyer, purifier et hydrater la peau du visage.<br><br><strong>Matériel :</strong> Lait démaquillant, lotion tonique, gommage, vapozone, masque adapté, crème hydratante, cotons, spatule.<br><br><strong>Déroulé :</strong><br>1. Démaquillage (5 min).<br>2. Analyse de peau sous lampe loupe (3 min).<br>3. Gommage doux (5 min).<br>4. Vapozone pour ouvrir les pores (8 min).<br>5. Extraction des comédons (10 min).<br>6. Masque adapté (15 min).<br>7. Hydratation finale + protection solaire (5 min).</p>`, variant: "green" },
      { heading: "PROTOCOLE 2 – Épilation à la cire", content: `<img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80" alt="Épilation professionnelle" style="${imgStyle}"/><p><strong>Matériel :</strong> Cire tiède ou chaude, chauffe-cire, bandes non-tissées, huile post-épilation, talc, spatules, gants.<br><br><strong>Déroulé :</strong><br>1. Désinfecter la zone, appliquer du talc.<br>2. Tester la température de la cire au poignet.<br>3. Appliquer dans le sens du poil, couche fine.<br>4. Retirer d'un geste sec dans le sens inverse.<br>5. Appliquer l'huile post-épilation.<br><br><strong>Précautions :</strong> contre-indications (varices, médicaments, coups de soleil), spatules à usage unique.</p>` },
      { heading: "PROTOCOLE 3 – Manucure complète", content: `<img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80" alt="Manucure professionnelle" style="${imgStyle}"/><p><strong>Déroulé :</strong><br>1. Retrait du vernis (3 min).<br>2. Limage forme cliente (5 min).<br>3. Trempage des mains (5 min).<br>4. Soin des cuticules au bâtonnet (5 min).<br>5. Massage hydratant des mains (5 min).<br>6. Pose vernis : base, 2 couches, top coat (10 min).</p>` },
      { heading: "PROTOCOLE 4 – Maquillage jour / naturel", content: `<img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80" alt="Maquillage professionnel" style="${imgStyle}"/><p><strong>Déroulé :</strong> hydratation + primer, fond de teint estompé, correcteur, poudre libre, sourcils structurés, ombre neutre + mascara, blush léger, baume teinté.</p>` },
      { heading: "PROTOCOLE 5 – Beauté des pieds", content: `<img src="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80" alt="Soin des pieds" style="${imgStyle}"/><p><strong>Déroulé :</strong> bain de pieds (10 min), gommage callosités (5 min), pierre ponce sur talons (5 min), soin des ongles (10 min), masque hydratant (10 min), massage + vernis (10 min).</p>` },
    ];
    refs = `<p>• Code de la santé publique – Normes d'hygiène en esthétique<br>• Référentiel CAP Esthétique Cosmétique Parfumerie – RNCP31041<br>• Fiche ROME D1208 – Soins esthétiques et corporels<br>• Guide INRS – Prévention des risques en institut de beauté</p>`;
  }

  sections.push({ heading: "Références et normes", content: refs });

  return buildDocument({ org: o, title: `GUIDE DES PROTOCOLES – ${profile.label.toUpperCase()}`, subtitle: `Ressource pédagogique – Bilan de compétences`, stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [...bdcBeneficiarySections(f, stagiaires, si), ...sections] });
}

// ===== CR4 - IND 19 : Tableau des bases métier =====
export function genTableauBasesBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const profile = getBdcDomainProfile(f);
  const key = (f.intitule || "").toLowerCase();
  const isMeca = /mecan|véhic|vehic|automob/i.test(key);
  const isNTC = /negoc|technico|commerc/i.test(key);

  let headers: string[] = [];
  let rows: string[][] = [];

  if (isMeca) {
    headers = ["Catégorie", "Opération / Système", "Outils / Pièces clés", "Procédure / Couples", "Précautions sécurité"];
    rows = [
      ["ENTRETIEN PÉRIODIQUE", "Vidange moteur", "Clé à filtre, bac récupération, huile constructeur 5W30/0W20", "Bouchon : 25-30 N·m, joint neuf systématique", "Huile chaude – risque brûlure"],
      ["", "Filtre à air / habitacle", "Tournevis, filtre OEM ou équivalent", "Sens de montage flèche flux d'air", "Vérifier joints d'étanchéité"],
      ["", "Filtre à carburant diesel", "Clés plates, joints neufs", "Amorçage circuit obligatoire", "Risque incendie – ventiler"],
      ["", "Bougies d'allumage", "Clé à bougie, clé dynamo", "Couple : 25 N·m, écartement constructeur", "Moteur froid uniquement"],
      ["FREINAGE", "Plaquettes avant/arrière", "Repousse-piston, clé dynamo, graisse cuivre", "Vis étrier : 28-35 N·m", "Liquide DOT4 : pomper la pédale après remontage"],
      ["", "Disques de frein", "Tournevis Torx, nettoyant frein", "Voile maxi 0,05 mm, épaisseur mini gravée", "Rodage 200 km doux après changement"],
      ["", "Liquide de frein DOT4", "Purgeur, bocal, tuyau transparent", "Purger les 4 roues, ordre constructeur", "Liquide corrosif – protection peinture"],
      ["DISTRIBUTION", "Courroie de distribution", "Outils calage constructeur, clé dynamo", "Tension contrôlée, repères PMH", "Erreur de calage = casse moteur"],
      ["", "Chaîne de distribution", "Tendeur OEM, joints neufs", "Contrôle élongation, bruits anormaux", "Intervention complexe – atelier équipé"],
      ["PNEUMATIQUES", "Montage / équilibrage", "Démonte-pneu, équilibreuse", "Pression à froid (étiquette portière)", "Sens de rotation respecté"],
      ["", "Géométrie 3D", "Banc géométrie laser/caméras", "Carrossage, parallélisme, chasse constructeur", "Ressorts en bon état préalable"],
      ["ÉLECTRIQUE BT", "Batterie 12V", "Pince ampèremétrique, multimètre", "Tension repos > 12,5 V, démarrage > 9,5 V", "Reprogrammation après débranchement"],
      ["", "Alternateur / démarreur", "Multimètre, pince ampèremétrique", "Charge : 13,8 à 14,4 V à 2000 tr/min", "Attention courts-circuits"],
      ["DIAGNOSTIC", "Lecture codes OBD-II", "Valise Bosch KTS / Launch X431", "Connecteur sous volant, contact +", "Effacer après réparation uniquement"],
      ["", "Mesures capteurs", "Multimètre, oscilloscope", "Comparer aux valeurs RTA constructeur", "Risque court-circuit calculateur"],
      ["VE / HYBRIDE (HT)", "Consignation HT", "Sectionneur, VAT, EPI 1000 V", "Temporisation 5-10 min, VAT obligatoire", "Habilitation B1L/B2L/BCL exigée"],
      ["", "Batterie lithium-ion", "Outils isolés, gants 1000 V", "Ne jamais ouvrir un module HT", "Risque arc électrique mortel"],
      ["CLIMATISATION", "Recharge R134a / R1234yf", "Station de recharge agréée", "Tirage au vide 30 min, charge au poids", "Habilitation fluides frigorigènes Cat. V"],
      ["HYGIÈNE / SÉCURITÉ", "EPI atelier", "Gants nitrile, lunettes, chaussures S3", "Port obligatoire toute intervention", "Code du travail – EPI à jour"],
      ["", "Levage véhicule", "Pont 2 ou 4 colonnes, chandelles", "Points de levage constructeur uniquement", "Vérification annuelle obligatoire"],
    ];
  } else if (isNTC) {
    headers = ["Étape commerciale", "Outil / Méthode", "Données clés", "Indicateurs", "Points de vigilance"];
    rows = [
      ["PROSPECTION", "Définition ICP", "Secteur, taille, CA, décideur, géographie", "Nombre de comptes ciblés", "Affiner après chaque campagne"],
      ["", "LinkedIn Sales Navigator", "Filtres avancés, alertes, lead lists", "Taux d'acceptation > 30 %", "Personnaliser chaque invitation"],
      ["", "E-mailing personnalisé (Lemlist, Waalaxy)", "Objet < 50 caractères, AIDA, signature pro", "Taux d'ouverture > 35 %, réponse > 8 %", "Respect RGPD / opt-out clair"],
      ["", "Cold call (téléphone)", "Méthode CROC : Contact, Raison, Objectif, Conclusion", "Taux RDV / appels décrochés > 15 %", "Ne jamais lire un script mot à mot"],
      ["DÉCOUVERTE", "Méthode SPIN", "Situation, Problème, Implication, Need-payoff", "Durée RDV 30-45 min", "80 % d'écoute, 20 % de parole"],
      ["", "Méthode SONCAS", "Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie", "Profil détecté en 10 min", "Adapter l'argumentaire au profil"],
      ["", "Compte rendu CRM", "Besoins, contexte, BANT, prochaine étape", "100 % des RDV CR sous 24 h", "Sans CR : pas de suivi possible"],
      ["PROPOSITION", "Argumentaire CAP", "Caractéristique → Avantage → Preuve", "1 CAP par bénéfice client", "Toujours chiffrer le ROI"],
      ["", "Devis / proposition commerciale", "Reformulation besoin, solution, planning, prix, CGV", "Délai d'envoi < 48 h", "Validité de l'offre limitée (15-30 j)"],
      ["", "Calcul de marge", "PV = PA / (1 - taux marge)", "Marge brute > 25 % minimum", "Ne pas brader sans contrepartie"],
      ["NÉGOCIATION", "Méthode CRAC objections", "Creuser, Reformuler, Argumenter, Contrôler", "100 % des objections traitées", "Ne jamais couper la parole"],
      ["", "Échiquier des concessions", "Lister les contreparties possibles à l'avance", "Ratio concession/contrepartie 1:1", "Préparer 3 niveaux de remise"],
      ["", "Closing", "Alternative, accord partiel, urgence", "Taux de transformation > 25 %", "Toujours demander la commande"],
      ["CONTRACTUALISATION", "Bon de commande / contrat", "CGV, ADV, modalités de paiement", "Signature dans les 7 j", "Vérifier RIB et conditions"],
      ["", "Délais de paiement (LME)", "30 j fin de mois max BtoB", "DSO < 45 j", "Pénalités de retard légales"],
      ["FIDÉLISATION", "QBR (Quarterly Business Review)", "Bilan trimestriel client + plan d'action", "1 QBR / trimestre / compte clé", "Préparer slides + données chiffrées"],
      ["", "NPS (Net Promoter Score)", "« Recommanderiez-vous… ? » 0-10", "NPS > 50 = excellent", "Relancer les détracteurs"],
      ["", "Cross-sell / Up-sell", "Identifier nouveaux besoins / montée en gamme", "+ 15 % CA portefeuille / an", "Ne pas saturer le client"],
      ["PILOTAGE", "Tableau de bord CRM", "Pipeline, prévisionnel, taux closing, vélocité", "Mise à jour quotidienne", "Données fausses = prévisions fausses"],
      ["RGPD", "Consentement prospect", "Base légale (intérêt légitime BtoB)", "Registre des traitements à jour", "Droit d'opposition à respecter"],
    ];
  } else {
    // Default: Esthétique (existing data)
    headers = ["Catégorie", "Technique / Produit", "Ingrédients / Composants clés", "Dosage / Application", "Précautions"];
    rows = [
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
    ];
  }

  return buildDocument({ org: o, title: `TABLEAU DES BASES – ${profile.label.toUpperCase()}`, subtitle: `Référentiel technique – Bilan de compétences`, stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [
    ...bdcBeneficiarySections(f, stagiaires, si),
    { heading: "Introduction", content: `<p>Ce tableau récapitulatif présente les bases techniques essentielles du métier de <strong>${profile.metier}</strong> dans ${profile.secteur}. Il est remis au bénéficiaire en tant que ressource d'appui lors de la phase d'investigation du bilan de compétences.</p>` },
  ], table: { headers, rows } });
}

// ===== CR5 - IND 21 : Fiche de poste consultant bilan =====
export function genFichePosteConsultantBDC(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  return buildDocument({ org: o, title: "FICHE DE POSTE – CONSULTANT(E) BILAN DE COMPÉTENCES", stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [
    ...(f ? bdcBeneficiarySections(f, stagiaires, si) : []),
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
export function genFicheIntervenantExterneBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const s = stagiaires?.[si];
  const p = bdcPersonalisation(f, s, si);
  // Pool d'intervenants externes réalistes par secteur
  const intervenantsBySector: Record<string, Array<{nom: string; prenom: string; entreprise: string; siret: string; fonction: string; email: string; tel: string}>> = {
    esthetique: [
      { nom: "MARTINEZ", prenom: "Sophie", entreprise: "Institut Belle Époque", siret: "82345678900015", fonction: "Esthéticienne diplômée – Gérante", email: "s.martinez@institut-belle-epoque.fr", tel: "06 12 34 56 78" },
      { nom: "DUBOIS", prenom: "Camille", entreprise: "Spa Harmonie & Co", siret: "79456123400022", fonction: "Praticienne spa & soins corps", email: "c.dubois@spa-harmonie.fr", tel: "06 45 78 12 33" },
    ],
    automobile: [
      { nom: "LEROY", prenom: "Thomas", entreprise: "Garage LEROY Auto", siret: "81234567800019", fonction: "Mécanicien automobile – Chef d'atelier", email: "contact@leroy-auto.fr", tel: "06 78 23 45 67" },
      { nom: "BERNARD", prenom: "Julien", entreprise: "AD Expert Mécanique", siret: "80987654300017", fonction: "Technicien diagnostic automobile", email: "j.bernard@ad-expert.fr", tel: "06 23 89 56 14" },
    ],
    commerce: [
      { nom: "ROUSSEAU", prenom: "Marc", entreprise: "Cabinet Habitat Conseil", siret: "82456789100023", fonction: "Négociateur immobilier senior", email: "m.rousseau@habitat-conseil.fr", tel: "06 14 56 78 92" },
      { nom: "GIRAUD", prenom: "Sandrine", entreprise: "Performance B2B", siret: "81765432100018", fonction: "Technico-commerciale terrain", email: "s.giraud@performance-b2b.fr", tel: "06 89 23 45 17" },
    ],
  };
  const sectorKey = /esth/i.test(p.profile.label) ? "esthetique" : /m[ée]canique|automobile|v[ée]hicule/i.test(p.profile.label) ? "automobile" : "commerce";
  const pool = intervenantsBySector[sectorKey];
  const idx = deterministicIndex(s, si, pool.length, 7);
  const it = pool[idx];
  return buildDocument({ org: o, title: "FICHE INTERVENANT EXTERNE", subtitle: `Bilan de compétences – ${f.intitule}`, stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [
    ...bdcBeneficiarySections(f, stagiaires, si),
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong><br>Adresse : ${o.adresse}<br>SIRET : ${o.siret || "—"}<br>Consultant(e) : ${consultantName(o)}<br>Contact : ${o.email || "—"}${o.telephone?.trim() ? ` – ${o.telephone}` : ""}<br>Formation concernée : Bilan de compétences – ${f.intitule}<br>Dates : du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</p>` },
    { heading: "Identité de l'intervenant externe", content: `<p>• <strong>Nom :</strong> ${it.nom}<br>• <strong>Prénom :</strong> ${it.prenom}<br>• <strong>Entreprise / Structure :</strong> ${it.entreprise}<br>• <strong>SIRET :</strong> ${it.siret}<br>• <strong>Fonction :</strong> ${it.fonction}<br>• <strong>E-mail :</strong> ${it.email}<br>• <strong>Téléphone :</strong> ${it.tel}</p>` },
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
export function genFormulaireReclamationBDC(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const s = stagiaires?.[si] || stagiaires?.[0];
  return buildDocument({ org: o, title: "FORMULAIRE DE DÉPÔT DE RÉCLAMATION", stagiaires: s ? [s] : undefined, sections: [
    ...(f ? bdcBeneficiarySections(f, stagiaires, si) : []),
    { heading: "Identification", content: `<p>Nom : ${s?.nom || "___________________________"}<br>Prénom : ${s?.prenom || "___________________________"}<br>Date de naissance : ${s?.dateNaissance ? formatDate(s.dateNaissance) : "___________________________"}<br>Adresse : ${s?.adresse || "___________________________"}<br>${s?.telephone?.trim() ? `Téléphone : ${s.telephone}<br>` : ""}Mail : ${s?.email || "___________________________"}<br>Date du bilan : ${f ? `du ${startDate(s, f)} au ${endDate(s, f)}` : "___________________________"}<br>Intitulé du bilan : ${f ? `Bilan de compétences – ${f.intitule}` : "___________________________"}</p>` },
    { heading: "Description de la réclamation", content: "<p>Veuillez détailler de manière la plus précise possible votre réclamation :<br>___________________________<br>___________________________<br>___________________________<br>___________________________</p>" },
    { heading: "Autorisation", content: `<p>J'autorise le centre ${o.nom} à conserver ce formulaire pour améliorer la qualité des prestations et à reprendre contact avec moi :<br><br>☐ Oui &nbsp;&nbsp;&nbsp;&nbsp; ☐ Non</p>` },
  ] });
}

// ===== CR7 - IND 31 : Gestion des réclamations BDC =====
export function genGestionReclamationsBDC(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  return buildDocument({ org: o, title: "GESTION DES RÉCLAMATIONS ET DES DYSFONCTIONNEMENTS", stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [
    ...(f ? bdcBeneficiarySections(f, stagiaires, si) : []),
    { heading: "1. Objet", content: "<p>Cette procédure décrit les modalités de traitement des réclamations et dysfonctionnements signalés par les bénéficiaires de bilans de compétences.</p>" },
    { heading: "2. Recueil des réclamations", content: "<p>Les réclamations peuvent être transmises par :<br>• Formulaire de dépôt de réclamation (papier ou numérique)<br>• Courrier électronique<br>• Appel téléphonique (consigné par écrit)</p>" },
    { heading: "3. Traitement", content: "<p>• Accusé de réception sous 48h<br>• Analyse de la réclamation par le responsable qualité<br>• Enquête interne si nécessaire<br>• Réponse apportée sous 15 jours ouvrés<br>• Actions correctives mises en place</p>", variant: "green" },
    { heading: "4. Suivi", content: "<p>• Enregistrement dans le tableau de suivi des dysfonctionnements<br>• Analyse trimestrielle des réclamations<br>• Intégration dans le processus d'amélioration continue</p>" },
  ] });
}

// ===== CR7 - IND 32 : Tableau actions correctives =====
export function genActionsCorrectivesBDC(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const rows = [
    ["Retard de restitution synthèse", "10/01/2025", "Réorganisation planning", "Consultant", "Terminé", "30/01/2025"],
    ["Demande d'adaptation horaires", "15/01/2025", "Flexibilité des créneaux", "Direction", "En cours", "—"],
    ["Difficulté d'accès distanciel", "20/01/2025", "Vérification outil visio", "IT", "Terminé", "25/01/2025"],
  ];
  return buildDocument({ org: o, title: "TABLEAU ACTIONS CORRECTIVES – TRAITEMENT DES RÉCLAMATIONS", stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: f ? bdcBeneficiarySections(f, stagiaires, si) : [], table: { headers: ["Réclamation", "Date", "Action corrective", "Responsable", "Statut", "Date clôture"], rows } });
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
export function genFicheVeilleBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
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
    stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined,
    sections: [
      ...bdcBeneficiarySections(f, stagiaires, si),
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
export function genContratSousTraitanceBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const majDate = o.dateMaj || new Date().toISOString().slice(0, 10);
  const dateContrat = formatDate(majDate);
  const oneYearLater = (() => { const d = new Date(majDate); d.setFullYear(d.getFullYear() + 1); return d.toISOString().slice(0, 10); })();
  const dateFinContrat = formatDate(oneYearLater);
  const cachetUrl = (o as OrganismeInfo & { cachet?: string }).cachet || o.tamponUrl;

  return buildDocument({
    org: o,
    title: "CONTRAT DE SOUS-TRAITANCE",
    stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined,
    sections: [
      ...bdcBeneficiarySections(f, stagiaires, si),
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

// ===== CR1 - IND 1 : Catalogue / fiche commerciale publique =====
export function genCatalogueCommercialBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const profile = getBdcDomainProfile(f);
  const refHandicap = (o as any).referentHandicap || consultantName(o);
  const tel = o.telephone ? ` – ${o.telephone}` : "";
  const dateMaj = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return buildDocument({ org: o, title: "FICHE COMMERCIALE – BILAN DE COMPÉTENCES", subtitle: `Domaine : ${profile.label} • Mise à jour : ${dateMaj}`, stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [
    ...bdcBeneficiarySections(f, stagiaires, si),
    { heading: "Objectifs", content: `<p>Faire le point sur les compétences, aptitudes et motivations du bénéficiaire, vérifier la faisabilité d'un projet professionnel ciblé sur le métier de <strong>${profile.metier}</strong> dans le secteur ${profile.secteur}, et bâtir un plan d'action concret (formation, mobilité, création d'activité).</p>` },
    { heading: "Public visé", content: "<p>Salariés du privé (CDI/CDD), demandeurs d'emploi inscrits à France Travail, travailleurs indépendants, intérimaires, agents publics. Sans condition de diplôme.</p>" },
    { heading: "Prérequis", content: "<p>Aucun prérequis de diplôme ou d'expérience. Maîtrise orale du français pour les entretiens et la rédaction de la synthèse. Démarche personnelle et volontaire.</p>" },
    { heading: "Durée", content: "<p><strong>24 heures</strong> d'accompagnement individuel maximum (art. R6313-4 à R6313-8 CT), réparties sur 8 à 10 séances individuelles, sur 8 à 12 semaines.</p>" },
    { heading: "Tarif", content: "<p><strong>1 800 € net de TVA</strong> (organisme exonéré – art. 261-4-4° a CGI).</p>" },
    { heading: "Modalités", content: `<p>Présentiel et/ou distanciel synchrone (visioconférence). Entretiens individuels, tests psychométriques (RIASEC, Sosie/Performanse), enquête métier, travail intersession guidé.</p>` },
    { heading: "Délais d'accès", content: "<p>• 11 jours ouvrés minimum après acceptation du devis (CPF)<br>• 15 jours pour un financement employeur ou Transitions Pro<br>• Démarrage sous 2 à 4 semaines selon disponibilités</p>" },
    { heading: "Méthodes mobilisées", content: "<p>Entretiens individuels avec un consultant qualifié, tests psychométriques validés, enquête métier auprès de professionnels du secteur, exploration documentaire (ROME, référentiels), travail intersession guidé, restitution personnalisée.</p>" },
    { heading: "Modalités d'évaluation", content: "<p>Évaluation continue à chaque séance, questionnaire de satisfaction à chaud en fin de bilan, entretien de suivi à 6 mois (art. R6313-8 CT), questionnaire d'évaluation à froid pour mesurer l'impact.</p>" },
    { heading: "Document de synthèse", content: "<p>Remise en main propre au bénéficiaire (papier + numérique) lors du dernier entretien. Document propriété exclusive du bénéficiaire (art. R6313-7 CT), non communiquable à un tiers sans son accord écrit.</p>" },
    { heading: "Accessibilité aux personnes en situation de handicap", content: `<p>Locaux et modalités accessibles. Référent handicap mobilisable dès l'entretien préalable pour étudier les adaptations nécessaires (rythme, supports, lieu, distanciel, partenariats Agefiph / Cap Emploi).<br><strong>Référent handicap :</strong> ${refHandicap}${tel}${o.email ? ` – ${o.email}` : ""}.</p>` },
    { heading: "Financements possibles", content: "<p>CPF (Mon Compte Formation), Transitions Pro (PTP), plan de développement des compétences employeur, France Travail (AIF), financement personnel.</p>" },
    { heading: "Contact et inscription", content: `<p>${o.nom || ""}${o.adresse ? ` – ${o.adresse}` : ""}${o.telephone ? `<br>Téléphone : ${o.telephone}` : ""}${o.email ? `<br>E-mail : ${o.email}` : ""}${o.siteWeb ? `<br>Site : ${o.siteWeb}` : ""}</p>` },
  ] });
}

// ===== CR3 - IND 26 : Procédure handicap dédiée BDC =====
export function genProcedureHandicapBDC(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const refHandicap = (o as any).referentHandicap || consultantName(o);
  const tel = o.telephone ? ` – ${o.telephone}` : "";
  const dateMaj = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return buildDocument({ org: o, title: "PROCÉDURE D'ACCUEIL DES PERSONNES EN SITUATION DE HANDICAP", subtitle: `Bilan de compétences • Version en vigueur au ${dateMaj}`, stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined, sections: [
    ...(f ? bdcBeneficiarySections(f, stagiaires, si) : []),
    { heading: "1. Engagement de l'organisme", content: `<p>${o.nom || "L'organisme"} s'engage à garantir l'égalité d'accès au bilan de compétences pour toute personne en situation de handicap (loi du 11 février 2005, art. L5211-1 et R6316-1 CT). Aucun bénéficiaire ne peut être écarté en raison de son handicap.</p>` },
    { heading: "2. Référent handicap", content: `<p><strong>Identité :</strong> ${refHandicap}<br><strong>Coordonnées :</strong>${tel}${o.email ? ` – ${o.email}` : ""}<br><strong>Missions :</strong> point d'entrée unique du bénéficiaire, analyse du besoin d'adaptation, mobilisation des partenaires (Agefiph, Cap Emploi, MDPH), suivi de la mise en œuvre, évaluation à l'issue du bilan.</p>` },
    { heading: "3. Détection du besoin", content: "<p>Dès l'entretien préalable :<br>• question ouverte sur l'existence d'une RQTH ou d'un besoin d'aménagement<br>• proposition systématique d'un échange confidentiel avec le référent handicap<br>• recueil – avec accord écrit – des préconisations médicales utiles<br>• jamais d'obligation de déclarer son handicap</p>" },
    { heading: "4. Analyse et plan d'adaptation", content: "<p>Le référent handicap formalise un <strong>plan d'adaptation individuel</strong> précisant :<br>• les adaptations matérielles (locaux PMR, supports en gros caractères, supports audio, logiciels d'accessibilité)<br>• les adaptations pédagogiques (rythme allongé, pauses, distanciel, durée des séances réduite)<br>• les adaptations organisationnelles (horaires, accompagnement par un tiers)<br>• les partenaires mobilisés (Agefiph, Cap Emploi, SAMETH, médecin du travail)</p>", variant: "green" },
    { heading: "5. Mise en œuvre", content: "<p>• Information du consultant en charge du bilan (dans le respect du secret)<br>• Validation conjointe avec le bénéficiaire des adaptations retenues<br>• Démarrage du bilan dans les conditions adaptées<br>• Point d'étape à mi-parcours pour ajuster le dispositif</p>" },
    { heading: "6. Partenaires mobilisables", content: "<p>• <strong>Agefiph</strong> – aides techniques et humaines : agefiph.fr<br>• <strong>Cap Emploi</strong> – accompagnement vers l'emploi<br>• <strong>MDPH</strong> – reconnaissance RQTH, PCH, AAH<br>• <strong>SAMETH</strong> – maintien dans l'emploi<br>• <strong>Médecin du travail</strong> – préconisations professionnelles</p>" },
    { heading: "7. Confidentialité", content: "<p>Toutes les informations relatives à la situation de handicap sont strictement confidentielles. Elles ne sont partagées qu'avec accord écrit du bénéficiaire et uniquement dans la mesure nécessaire à l'adaptation du bilan.</p>" },
    { heading: "8. Suivi et amélioration continue", content: "<p>• Bilan d'adaptation en fin de bilan<br>• Question dédiée dans le questionnaire de satisfaction<br>• Revue annuelle de la procédure<br>• Mise à jour de la veille handicap (CR6 IND 26)</p>" },
  ] });
}

// ===== CR2 - IND 5 : Engagement de confidentialité signé =====
export function genEngagementConfidentialiteBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const dt = sigDateBDC(s, f);
  return buildDocument({ org: o, title: "ENGAGEMENT RÉCIPROQUE DE CONFIDENTIALITÉ", subtitle: "Bilan de compétences", stagiaires: [s], sections: [
    { heading: "Entre", content: `<p><strong>L'organisme prestataire :</strong> ${o.nom}, SIRET ${o.siret || "—"}, représenté par ${consultantName(o)}, agissant en qualité de consultant(e) bilan,<br><br><strong>ET</strong><br><br><strong>${g(s, "Le bénéficiaire", "La bénéficiaire")} :</strong> ${beneficiaireLabel(s)}.</p>` },
    { heading: "Cadre légal", content: "<p>Le présent engagement est conclu en application des articles <strong>L6313-10 à L6313-12</strong> et <strong>R6313-4 à R6313-8</strong> du Code du travail, qui imposent au prestataire et à ses intervenants une obligation de confidentialité absolue sur les informations recueillies à l'occasion du bilan.</p>" },
    { heading: "Article 1 – Engagement du consultant et de l'organisme", content: "<p>Le consultant et l'organisme s'engagent à :<br>• ne divulguer à aucun tiers le contenu des entretiens, des tests, du document de synthèse et de toute pièce du dossier<br>• respecter le secret professionnel sur l'existence même de la prestation<br>• ne transmettre aucune information à l'employeur, au financeur ou à un tiers sans <strong>accord écrit préalable du bénéficiaire</strong><br>• détruire, à l'issue du bilan, tous les documents établis pour sa réalisation, sauf le document de synthèse et la convention qui ne sont conservés qu'avec accord écrit du bénéficiaire (1 an max)</p>", variant: "green" },
    { heading: "Article 2 – Engagement du bénéficiaire", content: "<p>Le bénéficiaire reconnaît :<br>• avoir été informé que les résultats détaillés et le document de synthèse sont sa <strong>propriété exclusive</strong> (art. R6313-7 CT)<br>• disposer librement du document de synthèse et pouvoir refuser à tout moment sa transmission à un tiers<br>• avoir reçu une information claire sur les objectifs, la méthodologie et les modalités du bilan</p>" },
    { heading: "Article 3 – Sécurisation des données", content: "<p>Les données personnelles collectées font l'objet d'un traitement conforme au RGPD : finalité limitée à la réalisation du bilan, accès restreint au consultant désigné, durée de conservation limitée, droit d'accès et de rectification ouvert au bénéficiaire à tout moment.</p>" },
    { heading: "Article 4 – Sanctions", content: "<p>Tout manquement à la présente obligation expose son auteur aux sanctions prévues par l'article 226-13 du Code pénal (un an d'emprisonnement et 15 000 € d'amende) et engage la responsabilité civile de l'organisme.</p>" },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [dt, dt] } });
}

// ===== CR3 - IND 11 : Trame entretien de suivi à 6 mois =====
export function genTrameSuivi6MoisBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const finRef = s?.dateFinFormation || f.dateFin || "";
  let dt6m = new Date().toLocaleDateString("fr-FR");
  if (finRef) {
    const d = new Date(finRef);
    if (!isNaN(d.getTime())) {
      d.setMonth(d.getMonth() + 6);
      dt6m = formatDate(d.toISOString().split("T")[0]);
    }
  }
  const profile = getBdcDomainProfile(f);
  return buildDocument({ org: o, title: "ENTRETIEN DE SUIVI À 6 MOIS", subtitle: `Bilan de compétences – ${beneficiaireLabel(s)} • Domaine : ${profile.label}`, stagiaires: [s], sections: [
    { heading: "Cadre", content: `<p>Conformément à l'article <strong>R6313-8</strong> du Code du travail, un entretien de suivi est proposé au bénéficiaire dans les 6 mois suivant la fin du bilan pour mesurer la mise en œuvre du plan d'action et apporter un éventuel appui.</p><p><strong>Date de fin du bilan :</strong> ${endDate(s, f)}<br><strong>Date prévue de l'entretien :</strong> ${dt6m}<br><strong>Modalité :</strong> téléphone / visioconférence / présentiel<br><strong>Consultant(e) :</strong> ${consultantName(o)}</p>` },
    { heading: "1. Situation actuelle du bénéficiaire", content: "<p>• Situation professionnelle : (en poste / en formation / en recherche / en création d'activité)<br>• Évolution depuis la fin du bilan :<br>• Changements personnels significatifs :</p>" },
    { heading: "2. Mise en œuvre du plan d'action", content: "<p><strong>Étapes prévues dans le plan :</strong><br>• Étape 1 : ☐ Réalisée  ☐ En cours  ☐ Reportée  ☐ Abandonnée — Commentaire :<br>• Étape 2 : ☐ Réalisée  ☐ En cours  ☐ Reportée  ☐ Abandonnée — Commentaire :<br>• Étape 3 : ☐ Réalisée  ☐ En cours  ☐ Reportée  ☐ Abandonnée — Commentaire :</p>", variant: "green" },
    { heading: "3. Démarches engagées", content: `<p>• Inscription en formation : ☐ Oui  ☐ Non — Précisez :<br>• Démarche de validation (VAE, certification) : ☐ Oui  ☐ Non — Précisez :<br>• Recherche d'emploi (CV, lettres, entretiens) : ☐ Oui  ☐ Non — Précisez :<br>• Démarche de création d'activité : ☐ Oui  ☐ Non — Précisez :<br>• Mobilisation du réseau professionnel (${profile.secteur}) : ☐ Oui  ☐ Non</p>` },
    { heading: "4. Atteinte du projet professionnel", content: `<p>Projet retenu en fin de bilan : <strong>${profile.metier}</strong><br>• Projet maintenu ? ☐ Oui  ☐ Réorienté  ☐ Abandonné — Pourquoi :<br>• Niveau d'avancement (de 1 à 10) : ___ / 10<br>• Premiers résultats concrets observés :</p>` },
    { heading: "5. Difficultés rencontrées et besoins d'appui", content: "<p>• Difficultés principales (financières, organisationnelles, motivation, santé) :<br>• Besoin d'un appui complémentaire ? ☐ Oui  ☐ Non — Lequel :<br>• Orientation vers un partenaire (France Travail, Cap Emploi, OPCO, Mission Locale, BGE) : ☐ Oui  ☐ Non</p>" },
    { heading: "6. Satisfaction à froid", content: "<p>• Le bilan a-t-il été utile dans votre parcours ? ☐ Très utile  ☐ Utile  ☐ Peu utile  ☐ Pas utile<br>• Recommanderiez-vous le bilan à un proche ? ☐ Oui  ☐ Non — Pourquoi :<br>• Suggestions d'amélioration :</p>" },
    { heading: "7. Préconisations du consultant", content: "<p>Synthèse de l'échange, ressources orientées, prochaine étape conseillée, éventuelle prolongation d'accompagnement.</p>" },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [dt6m, dt6m] } });
}

// ===== CR – CV du bénéficiaire (annexé au dossier de bilan) =====
export function genCVBeneficiaireBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const profile = getBdcDomainProfile(f);
  const perso = bdcPersonalisation(f, s, si);
  const yearNow = new Date().getFullYear();
  const yearMid = yearNow - deterministicIndex(s, si, 4, 21) - 2;
  const yearStart = yearMid - deterministicIndex(s, si, 5, 22) - 2;
  const yearEarly = yearStart - deterministicIndex(s, si, 4, 31) - 2;
  const ville = s.commune || (o.adresse || "").split(",").slice(-1)[0]?.trim() || "France";
  const entreprise = s.entreprise && s.entreprise.toLowerCase() !== "demandeur d'emploi" ? s.entreprise : "";
  const poste = s.poste || perso.profile.metier;
  const adresseLine = [s.adresse, [s.codePostal, s.commune].filter(Boolean).join(" ")].filter(Boolean).join(", ");

  // Pick a deterministic CV design + accent + font per beneficiary so each one looks visually distinct
  const design: CVDesign = CV_DESIGNS[deterministicIndex(s, si, CV_DESIGNS.length, 41)].id;
  const accentPalette = [
    "#1e3a7b", "#2563eb", "#0f766e", "#92700C", "#dc2626", "#7c3aed",
    "#0891b2", "#be185d", "#15803d", "#b45309", "#475569", "#9333ea",
    "#c2410c", "#0369a1", "#4d7c0f", "#a21caf",
  ];
  const fontPalette = [
    "'Segoe UI',Arial,sans-serif",
    "Georgia,'Times New Roman',serif",
    "'Helvetica Neue',Helvetica,Arial,sans-serif",
    "'Trebuchet MS',sans-serif",
    "'Verdana',Geneva,sans-serif",
    "'Calibri','Segoe UI',sans-serif",
    "'Garamond','Times New Roman',serif",
    "'Tahoma',Geneva,sans-serif",
  ];
  const accent = accentPalette[deterministicIndex(s, si, accentPalette.length, 81)];
  const fontFamily = fontPalette[deterministicIndex(s, si, fontPalette.length, 82)];

  const profilTexts = [
    `${perso.profile.metier} avec ${yearNow - yearStart} ans d'expérience dans le secteur ${profile.secteur}. ${perso.objectif.charAt(0).toUpperCase() + perso.objectif.slice(1)}.`,
    `Professionnel(le) engagé(e) dans le secteur ${profile.secteur}, je souhaite donner un nouvel élan à mon parcours. ${perso.objectif.charAt(0).toUpperCase() + perso.objectif.slice(1)}.`,
    `Fort(e) d'un parcours dans ${profile.secteur}, je m'investis aujourd'hui dans une démarche de bilan de compétences pour clarifier mon projet : ${perso.objectif}.`,
    `Acteur/actrice de mon évolution professionnelle, je m'appuie sur mon expérience de ${perso.profile.metier} pour construire un projet cohérent : ${perso.objectif}.`,
  ];
  const interets = [
    "Lecture, marche, voyages",
    "Sport, cuisine, bénévolat associatif",
    "Photographie, randonnée, activités familiales",
    "Musique, jardinage, engagement local",
    "Cinéma, course à pied, cuisine du monde",
  ];

  const expDescriptions = [
    profile.missions.slice(0, 3).map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(". ") + ".",
    profile.missions.slice(1, 4).map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(". ") + ".",
    `Polyvalence sur ${pickForBeneficiaire(s, si, profile.missions, 51)}, ${pickForBeneficiaire(s, si, profile.missions, 52)} et ${pickForBeneficiaire(s, si, profile.missions, 53)}.`,
  ];

  const data: CVData = {
    prenom: s.prenom || "",
    nom: s.nom || "",
    titre: poste,
    email: s.email || "",
    telephone: s.telephone || "",
    adresse: adresseLine,
    photoUrl: "",
    profil: pickForBeneficiaire(s, si, profilTexts, 42),
    specialites: profile.techniques.slice(0, 3).join(" • "),
    experiences: (() => {
      // Nombre d'expériences variable : 2, 3, 4 ou 5 selon le bénéficiaire
      const nbExp = 2 + deterministicIndex(s, si, 4, 91);
      const villes = [ville, "Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Bordeaux", "Lille"];
      const v2 = pickForBeneficiaire(s, si, villes, 92);
      const v3 = pickForBeneficiaire(s, si, villes, 93);
      const all = [
        // Exp 1 - Poste actuel/récent
        {
          poste,
          entreprise: entreprise || `Secteur ${profile.secteur} – ${ville}`,
          dateDebut: `${yearMid}`,
          dateFin: `${yearNow}`,
          description: pickForBeneficiaire(s, si, expDescriptions, 43),
        },
        // Exp 2 - Précédente
        {
          poste: perso.profile.metier,
          entreprise: pickForBeneficiaire(s, si, [
            `Entreprise locale – ${ville}`, `PME du secteur ${profile.secteur}`,
            `Établissement à ${ville}`, `Société de services – ${v2}`,
            `Cabinet ${profile.secteur} – ${v2}`,
          ], 44),
          dateDebut: `${yearStart}`,
          dateFin: `${yearMid}`,
          description: pickForBeneficiaire(s, si, [
            "Polyvalence sur les missions confiées et adaptation rapide à de nouveaux environnements de travail.",
            "Participation à l'organisation quotidienne et au respect des procédures internes.",
            "Contribution à la satisfaction client et au bon déroulement de l'activité.",
            "Soutien à l'équipe sur les pics d'activité et reporting régulier au responsable.",
            "Encadrement ponctuel de stagiaires et formation des nouveaux entrants sur les procédures.",
          ], 45),
        },
        // Exp 3 - Premier poste
        {
          poste: pickForBeneficiaire(s, si, ["Premier poste / stage", "Emploi saisonnier", "Mission d'intérim", "Apprentissage", "Contrat aidé"], 46),
          entreprise: pickForBeneficiaire(s, si, [`Établissement local – ${ville}`, `TPE – ${v3}`, `Association locale`, `Commerce de proximité – ${ville}`], 94),
          dateDebut: `${yearEarly}`,
          dateFin: `${yearStart}`,
          description: pickForBeneficiaire(s, si, [
            "Découverte du monde professionnel, intégration à une équipe et acquisition des fondamentaux du métier.",
            "Apprentissage des bases du métier, observation des process et premières prises de responsabilité.",
            "Mission de remplacement : adaptation rapide, autonomie et fiabilité dans l'exécution des tâches.",
          ], 95),
        },
        // Exp 4 - Mission complémentaire (optionnelle)
        {
          poste: pickForBeneficiaire(s, si, ["Mission ponctuelle", "Vacation", "Bénévolat associatif", "Activité indépendante", "Service civique"], 96),
          entreprise: pickForBeneficiaire(s, si, [`Association ${ville}`, `Indépendant – ${ville}`, `Collectif local`, `Structure d'insertion – ${v2}`], 97),
          dateDebut: `${yearEarly - 1}`,
          dateFin: `${yearEarly}`,
          description: pickForBeneficiaire(s, si, [
            "Engagement dans une démarche solidaire et développement de compétences transversales (organisation, communication, gestion de projet).",
            "Accompagnement de publics variés et travail en équipe pluridisciplinaire.",
            "Participation à l'animation d'événements et à la coordination logistique.",
          ], 98),
        },
        // Exp 5 - Formation/job étudiant (optionnelle)
        {
          poste: pickForBeneficiaire(s, si, ["Job étudiant", "Stage de découverte", "Aide familial(e)", "Petits boulots", "Service à la personne"], 99),
          entreprise: pickForBeneficiaire(s, si, [`Restauration – ${ville}`, `Grande distribution – ${ville}`, `Particulier employeur`, `Commerce indépendant – ${v3}`], 100),
          dateDebut: `${yearEarly - 3}`,
          dateFin: `${yearEarly - 1}`,
          description: pickForBeneficiaire(s, si, [
            "Première expérience du monde du travail : ponctualité, sens du service, gestion du stress.",
            "Contact client direct, encaissement, mise en rayon et entretien de l'espace de travail.",
            "Accompagnement de personnes au quotidien, sens de l'écoute et de la bienveillance.",
          ], 101),
        },
      ];
      return all.slice(0, nbExp);
    })(),
    formations: [
      ...(s.diplome ? [{ diplome: s.diplome, etablissement: pickForBeneficiaire(s, si, ["Lycée professionnel", "Centre de formation", "CFA régional", "Établissement public"], 47), annee: `${yearStart - 1}` }] : []),
      { diplome: pickForBeneficiaire(s, si, profile.formations, 48), etablissement: "Formation continue", annee: `${yearMid}` },
      { diplome: `Bilan de compétences – ${o.nom}`, etablissement: o.nom, annee: `${yearNow}` },
    ],
    competences: profile.techniques.slice(0, 6).map((t, idx) => ({
      nom: t.charAt(0).toUpperCase() + t.slice(1),
      niveau: 3 + ((deterministicIndex(s, si, 3, 50 + idx)) % 3), // 3, 4 or 5
    })),
    langues: [
      { langue: "Français", niveau: "Langue maternelle" },
      ...(deterministicIndex(s, si, 2, 60) === 0 ? [{ langue: "Anglais", niveau: pickForBeneficiaire(s, si, ["Notions (A2)", "Intermédiaire (B1)", "Courant (B2)"], 61) }] : []),
    ],
    certifications: [
      ...(deterministicIndex(s, si, 2, 70) === 0 ? [{ nom: pickForBeneficiaire(s, si, ["SST – Sauveteur Secouriste du Travail", "Habilitation électrique BS/BE", "Permis B", "PIX – Compétences numériques"], 71), annee: `${yearMid}` }] : []),
    ],
    experiencePedagogique: "",
    publications: "",
  };

  return generateCVHTML(data, design, { accent, fontFamily });
}

// ===== CR – Test de personnalité (typologie MBTI E/I, S/N, T/F, J/P) =====
export function genTestPersonnaliteBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const dt = formatDate(s.dateDebutFormation || f.dateDebut || new Date().toISOString().split("T")[0]);

  const blocks: { title: string; left: string; right: string; rows: [string, string][]; score: string }[] = [
    { title: "1. Êtes-vous plutôt « E » (Extraverti) ou plutôt « I » (Introverti) ?", left: "E – Extraverti(e)", right: "I – Introverti(e)", score: "E : ___ / 10  •  I : ___ / 10",
      rows: [
        ["Vous êtes dynamique", "Vous êtes calme"],
        ["Vous aimez parler", "Vous aimez écouter"],
        ["Vous pensez à voix haute", "Vous réfléchissez posément"],
        ["Vous agissez puis pensez", "Vous pensez puis agissez"],
        ["Vous n'aimez pas être seul(e)", "Vous vous sentez bien quand vous êtes seul(e)"],
        ["Vous aimez établir de nouveaux contacts", "Vous aimez approfondir vos contacts"],
        ["Vous préférez parler plutôt qu'écrire", "Vous êtes considéré(e) comme plutôt secret(ète) et réservé(e)"],
        ["Vous pouvez facilement être distrait(e)", "Vous possédez une bonne capacité de concentration"],
        ["Vous préférez faire plusieurs choses à la fois", "Vous préférez faire une chose à la fois"],
        ["Vous avez parfois un discours changeant", "Vous êtes indépendant(e)"],
      ] },
    { title: "2. Êtes-vous plutôt « S » (Sensation) ou plutôt « N » (iNtuition) ?", left: "S – Sensation", right: "N – Intuition", score: "S : ___ / 10  •  N : ___ / 10",
      rows: [
        ["Vous aimez les choses utiles", "Vous aimez les choses différemment"],
        ["Vous vivez dans l'instant présent", "Vous pensez aux implications futures"],
        ["Vous faites confiance à l'expérience", "Vous suivez votre instinct"],
        ["Vous aimez approfondir vos compétences", "Vous aimez apprendre de nouvelles compétences"],
        ["Vous restez fidèle aux méthodes éprouvées", "Vous n'aimez pas la routine"],
        ["Vous préférez les instructions étape par étape", "Vous cherchez à comprendre globalement"],
        ["Vous êtes pratique", "Vous êtes théorique"],
        ["Vous aimez ce qui est concret, réel, observable", "Vous êtes attiré(e) par les idées originales"],
        ["Vous êtes réaliste : vous voyez ce qui existe", "Vous êtes imaginatif(ve) : vous voyez les possibilités"],
        ["Vous préférez les faits aux concepts", "Vous préférez les concepts aux faits"],
      ] },
    { title: "3. Êtes-vous plutôt « T » (Pensée) ou plutôt « F » (Sentiment) ?", left: "T – Pensée (Thinking)", right: "F – Sentiment (Feeling)", score: "T : ___ / 10  •  F : ___ / 10",
      rows: [
        ["Vous vous efforcez d'être objectif(ve) dans vos décisions", "Vous fondez vos décisions sur vos valeurs et sentiments"],
        ["Vous apparaissez calme et réservé(e)", "Vous êtes sociable et amical(e)"],
        ["Vous avez un sens aigu de la justice", "Vous avez tendance à la clémence"],
        ["Vous vous impliquez peu, vous prenez de la distance", "Vous prenez les choses à cœur"],
        ["Vous évitez la discussion et le conflit", "Vous recherchez la conciliation"],
        ["Vous êtes franc(he) et direct(e)", "Vous êtes diplomate et faites preuve de tact"],
        ["Vous êtes motivé(e) par vos projets", "Vous êtes motivé(e) par l'estime des autres"],
        ["Vous aimez vous placer en observateur(trice)", "Vous êtes sensible (facilement blessé(e))"],
        ["Vous êtes sensible à la logique", "Vous faites confiance à vos impressions"],
        ["Vous décidez avec la tête", "Vous décidez avec le cœur"],
      ] },
    { title: "4. Êtes-vous plutôt « J » (Jugement) ou plutôt « P » (Perception) ?", left: "J – Jugement", right: "P – Perception", score: "J : ___ / 10  •  P : ___ / 10",
      rows: [
        ["Vous aimez organiser et planifier", "Vous aimez vivre de façon flexible"],
        ["Vous êtes sérieux(se) et conventionnel(le)", "Vous êtes ludique et non-conventionnel(le)"],
        ["Vous suivez votre calendrier et êtes ponctuel(le)", "Vous tenez peu compte des heures et délais"],
        ["Vous aimez terminer vos projets", "Vous aimez démarrer des projets"],
        ["Vous travaillez d'abord, vous vous amusez ensuite", "Vous vous amusez d'abord, travaillez ensuite"],
        ["Vous n'aimez pas le stress de dernière minute", "Vous rechignez à vous engager"],
        ["Vous ne discutez pas les règles", "Vous discutez les règles"],
        ["Vous cherchez à maîtriser", "Vous cherchez à comprendre"],
        ["Vous êtes à l'aise dans des structures bien définies", "Vous aimez conserver votre liberté d'action"],
        ["Vous n'aimez pas le provisoire, l'incertain", "Vous restez ouvert(e) aux expériences et à l'adaptation"],
      ] },
  ];

  // Préférences dominantes par bénéficiaire (déterministe)
  const letters = ["E","I","S","N","T","F","J","P"];
  const dominants: ("L"|"R")[] = [];
  const scores: [number, number][] = [];
  const sections = blocks.map((b, bi) => {
    // Choix de la dominante : ratio entre 6/10 et 9/10 pour la lettre dominante
    const dominantSide: "L" | "R" = deterministicIndex(s, si, 2, 130 + bi * 7) === 0 ? "L" : "R";
    const dominantScore = 6 + deterministicIndex(s, si, 4, 140 + bi * 11); // 6..9
    const otherScore = 10 - dominantScore;
    dominants.push(dominantSide);
    scores.push(dominantSide === "L" ? [dominantScore, otherScore] : [otherScore, dominantScore]);

    // Cocher dominantScore lignes du côté dominant, otherScore lignes côté opposé
    const total = b.rows.length; // 10
    // Sélection déterministe des lignes cochées côté dominant
    const dominantRows = new Set<number>();
    let seed = (si + 1) * 31 + bi * 17;
    while (dominantRows.size < dominantScore) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      dominantRows.add(seed % total);
    }
    const renderedRows: [string, string][] = b.rows.map((r, ri) => {
      const dominantHere = dominantRows.has(ri);
      const leftChecked = (dominantSide === "L" && dominantHere) || (dominantSide === "R" && !dominantHere);
      return [
        `${leftChecked ? "☒" : "☐"} ${r[0]}`,
        `${leftChecked ? "☐" : "☒"} ${r[1]}`,
      ];
    });
    const [lScore, rScore] = dominantSide === "L" ? [dominantScore, otherScore] : [otherScore, dominantScore];
    const scoreLabel = `${b.left.split(" ")[0]} : ${lScore} / 10  •  ${b.right.split(" ")[0]} : ${rScore} / 10`;
    return {
      heading: b.title,
      content: tableHTML([b.left, b.right], renderedRows) + `<p style="margin-top:8px;"><strong>Score :</strong> ${scoreLabel}  →  Préférence dominante : <strong>${dominantSide === "L" ? b.left.split(" ")[0] : b.right.split(" ")[0]}</strong></p>`,
    };
  });

  // Type MBTI complet
  const mbti = blocks.map((b, i) => (dominants[i] === "L" ? b.left.split(" ")[0] : b.right.split(" ")[0])).join("");
  const mbtiDescriptions: Record<string, string> = {
    ISTJ: "Logisticien : organisé, méthodique, fiable. Profil adapté aux fonctions structurées et opérationnelles.",
    ISFJ: "Défenseur : loyal, attentionné, soucieux du bien-être collectif. Bon relationnel et sens du service.",
    INFJ: "Avocat : intuitif, déterminé, porté par des convictions fortes. Apprécie les projets porteurs de sens.",
    INTJ: "Architecte : stratège, indépendant, orienté résultats. À l'aise dans la conception et la planification.",
    ISTP: "Virtuose : pragmatique, observateur, habile dans la résolution concrète de problèmes.",
    ISFP: "Aventurier : sensible, flexible, créatif. Aime travailler dans un cadre humain et bienveillant.",
    INFP: "Médiateur : idéaliste, empathique, créatif. Recherche un alignement entre valeurs et activité professionnelle.",
    INTP: "Logicien : analytique, curieux, aime explorer les concepts et résoudre des problèmes complexes.",
    ESTP: "Entrepreneur : dynamique, réactif, à l'aise dans l'action et la négociation directe.",
    ESFP: "Animateur : sociable, énergique, à l'écoute. Excellent dans les fonctions de contact et d'animation.",
    ENFP: "Inspirateur : enthousiaste, créatif, communicatif. Aime initier des projets et fédérer.",
    ENTP: "Innovateur : agile, persuasif, aime débattre et explorer de nouvelles idées.",
    ESTJ: "Directeur : organisé, décidé, naturellement à l'aise dans le pilotage et la coordination d'équipe.",
    ESFJ: "Consul : attentif aux autres, organisé, fiable. Bon profil pour les métiers d'accompagnement.",
    ENFJ: "Protagoniste : leader naturel, empathique, fédérateur. Aime accompagner la progression des autres.",
    ENTJ: "Commandant : déterminé, stratégique, orienté objectifs. À l'aise dans le management et la décision.",
  };
  const mbtiDesc = mbtiDescriptions[mbti] || "Profil équilibré, capable de s'adapter à différents contextes professionnels.";
  const pistes = `Le profil <strong>${mbti}</strong> ouvre des pistes cohérentes avec le projet exploré (${(f.intitule || "formation").trim()}). À approfondir lors de la phase de conclusion : confirmation des environnements professionnels favorables, repérage des leviers de motivation et points de vigilance.`;

  return buildDocument({
    org: o,
    title: "TEST DE PERSONNALITÉ – TYPOLOGIE",
    subtitle: `Bilan de compétences – ${beneficiaireLabel(s)} • Date : ${dt}`,
    stagiaires: [s],
    sections: [
      { heading: "Consignes", content: `<p>Pour chacune des 4 dimensions, cochez la phrase qui vous correspond le mieux dans chaque ligne. Comptabilisez ensuite vos réponses pour obtenir vos préférences dominantes (E/I, S/N, T/F, J/P).</p><p><em>Outil de positionnement utilisé en phase d'investigation – à exploiter en entretien avec ${consultantName(o)}.</em></p>`, variant: "green" },
      ...sections,
      { heading: "Quel profil êtes-vous ?", content: `<p>Lettres dominantes : <strong>${mbti.split("").join("  ")}</strong></p><p><strong>Type MBTI obtenu :</strong> ${mbti} – ${mbtiDesc}</p><p><strong>Synthèse / pistes d'exploration retenues avec le consultant :</strong><br>${pistes}</p>`, variant: "green" },
    ],
    signatures: { type: "2", labels: [`${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`, `${g(s, "Le Consultant", "La Consultante")}`], names: [beneficiaireLabel(s), consultantName(o)], dates: [dt, dt] },
  });
}

// ===== CR – Parcours Bilan de Compétences (process écrit, 29 étapes) =====
export function genParcoursBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const referent = o.referentHandicap || o.responsablePedagogique || o.dirigeant || "Le référent pédagogique";
  const rows: [string, string][] = [
    ["1 – C", "Recherche d'information : CPF, site internet, bouche à oreille, prospection. Programme téléchargeable via le site, ainsi que la plaquette."],
    ["2 – C", "Demande de contact ou de renseignements via le CPF, le site internet ou par mail."],
    ["3 – OF", "Proposer un entretien préliminaire et confirmer par <strong>mail 1</strong> le RDV."],
    ["4 – OF", "À la fin de l'entretien préliminaire, envoyer par <strong>mail 2</strong> le programme, la plaquette et le questionnaire des prérequis."],
    ["5 – C", "Compléter le questionnaire des prérequis."],
    ["6 – OF", "Validation des prérequis et envoi de la convention de collaboration et du règlement intérieur — <strong>mail 3.1</strong> processus de validation des inscriptions. Si refus : <strong>mail 3.2</strong>."],
    ["7 – C", "Inscription via le CPF."],
    ["8 – OF", "Valider le dossier client sur le CPF et envoyer un mail de confirmation — <strong>mail 4</strong>."],
    ["9 – C", "Compléter la convention et la renvoyer signée par mail à l'OF."],
    ["10 – C", "Valider le financement via le CPF."],
    ["11 – OF", "Envoyer pour le premier entretien par mail : convocation, planning prévisionnel, livret d'accueil + attestation, engagement client, workbook, process visio."],
    ["12 – C", "1<sup>er</sup> RDV : travail sur le workbook."],
    ["13 – OF", "Lors du 1<sup>er</sup> RDV : remplir le dossier client et l'objectif individualisé, faire signer la feuille d'émargement."],
    ["14 – C", "2<sup>e</sup> RDV : travail sur le workbook et réalisation des tests."],
    ["15 – OF", "Feuille d'émargement à faire signer + remise d'exercices si besoin."],
    ["16 – C", "3<sup>e</sup> RDV : travail sur le workbook."],
    ["17 – OF", "Feuille d'émargement à faire signer + remise d'exercices si besoin."],
    ["18 – C", "4<sup>e</sup> RDV : travail sur le workbook et/ou les exercices."],
    ["19 – OF", "Construire la <strong>synthèse de mi-parcours</strong> et faire signer la feuille d'émargement — <strong>mail 5</strong>."],
    ["20 – C", "5<sup>e</sup> RDV : travail sur le workbook."],
    ["21 – OF", "Feuille d'émargement à faire signer + remise d'exercices si besoin."],
    ["22 – C", "6<sup>e</sup> RDV : travail sur le workbook + exercices et synthèse."],
    ["23 – OF", "Feuille d'émargement à faire signer + remise d'exercices si besoin."],
    ["24 – C", "7<sup>e</sup> et dernier RDV : travail sur le workbook + exercices et synthèse."],
    ["25 – OF", "Remise — <strong>mail 6</strong> : feuille d'émargement, dossier client, synthèse + attestation, objectif individualisé, questionnaire à chaud."],
    ["26 – OF", "Appel pour le suivi à 1 mois et envoi par <strong>mail 7</strong> du compte rendu de l'appel."],
    ["27 – OF", "RDV à 6 mois — <strong>mail 8</strong> avec envoi du questionnaire à 6 mois."],
    ["28 – C", "Confirmer le RDV de suivi à 6 mois par mail."],
    ["29 – OF", "Envoyer le questionnaire de satisfaction à 6 mois — <strong>mail 9</strong> (en l'absence d'obtention d'un RDV à 6 mois)."],
  ];
  return buildDocument({
    org: o,
    title: "PARCOURS BILAN DE COMPÉTENCES",
    subtitle: `Processus écrit – C : client / OF : ${o.nom}`,
    stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined,
    sections: [
      ...bdcBeneficiarySections(f, stagiaires, si),
      { heading: "Référents", content: `<p><strong>Référent pédagogique, administratif, handicap et service médiation/réclamation :</strong> ${referent}<br><strong>Email :</strong> ${o.email || "—"}<br><strong>Téléphone :</strong> ${o.telephone || "—"}</p>` },
      { heading: "Documents à fournir / processus écrit", content: tableHTML(["Étape", "Action"], rows) },
      { heading: "Mails types associés", content: "<p><strong>Mail 1</strong> : confirmation entretien préliminaire — <strong>Mail 2</strong> : envoi programme/plaquette/prérequis — <strong>Mail 3.1</strong> : validation prérequis et convention — <strong>Mail 3.2</strong> : refus motivé — <strong>Mail 4</strong> : confirmation inscription CPF — <strong>Mail 5</strong> : synthèse mi-parcours — <strong>Mail 6</strong> : remise des livrables de fin de bilan — <strong>Mail 7</strong> : compte rendu suivi 1 mois — <strong>Mail 8</strong> : RDV de suivi à 6 mois — <strong>Mail 9</strong> : questionnaire satisfaction à 6 mois.</p>", variant: "green" },
    ],
  });
}

// ===== CR – Support de cours Bilan de Compétences =====
export function genSupportCoursBDC(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[], si = 0) {
  const profile = getBdcDomainProfile(f);
  const phasesRows: string[][] = [
    ["1. Phase préliminaire", "Confirmer l'engagement dans la démarche ; définir et analyser les besoins et attentes ; informer des conditions de déroulement ; élaborer un programme de travail et un calendrier adapté.", "Entretien individuel"],
    ["2. Phase d'investigation", "Analyser la dynamique du parcours ; valoriser les réalisations et le CV ; diagnostiquer motivations, besoins et valeurs ; déterminer points forts et axes de développement ; positionnement sur l'inventaire d'intérêts professionnels ; élaborer des voies d'orientation ; valider la cohérence du projet.", "Entretien individuel, recherches, mise en situation, tests, enquête métier"],
    ["3. Phase de conclusion", "Récapituler les résultats détaillés ; co-rédiger la synthèse et vérifier l'appropriation par le bénéficiaire ; recenser les facteurs favorables et défavorables ; prévoir les principales étapes de mise en œuvre du projet.", "Entretien individuel, travail de rédaction"],
    ["Évaluation", "Évaluation de la satisfaction, évaluation à chaud, suivi à froid à 6 mois.", "Questionnaires"],
  ];
  return buildDocument({
    org: o,
    title: "SUPPORT DE COURS – BILAN DE COMPÉTENCES",
    subtitle: `Domaine : ${profile.label} • Version 1`,
    stagiaires: stagiaires?.[si] ? [stagiaires[si]] : undefined,
    sections: [
      ...bdcBeneficiarySections(f, stagiaires, si),
      { heading: "Sommaire", content: "<p>1. Objectifs<br>2. Programme<br>3. Finalités du bilan de compétences et engagements<br>4. Cœur de métier<br>5. Approche du bilan de compétences<br>6. Phases du bilan de compétences<br>7. Méthodologie<br>8. Éthique<br>9. Valeur ajoutée<br>10. Démarche qualité</p>" },
      { heading: "1. Objectifs", content: `<p><strong>Phase 1 – Entretien préliminaire :</strong> confirmer l'engagement, définir et analyser les besoins, informer des conditions, élaborer un programme et un calendrier adaptés.</p><p><strong>Phase 2 – Investigation :</strong><br>• Module 1 : analyser la dynamique du parcours<br>• Module 2 : valoriser les réalisations et le CV<br>• Module 3 : diagnostiquer motivations, besoins et valeurs<br>• Module 4 : déterminer points forts et axes de développement<br>• Module 5 : positionnement sur l'inventaire d'intérêts professionnels<br>• Module 6 : élaborer des voies d'orientation<br>• Module 7 : valider la cohérence du projet</p><p><strong>Phase 3 – Conclusion (Module 8) :</strong> confirmer le projet professionnel et/ou de formation, récapituler les résultats détaillés, co-rédiger la synthèse, recenser les facteurs favorables/défavorables, planifier la mise en œuvre.</p>`, variant: "green" },
      { heading: "2. Programme", content: tableHTML(["Phase", "Thèmes traités", "Pédagogie"], phasesRows) },
      { heading: "3. Finalités et engagements", content: "<p>Le bilan de compétences nécessite une démarche active du bénéficiaire. Il vise à :<br>• identifier les compétences au regard des fonctions exercées<br>• repérer intérêts, motivations, traits de personnalité, atouts et axes de développement<br>• traduire ces éléments en projet professionnel<br>• valider un projet de repositionnement et son plan d'action (mobilité, formation, développement dans la fonction).</p><p>Nos engagements :<br>• respecter le protocole légal (Loi n° 91-1405 du 31 décembre 1991, Décret n° 92-1075 du 2 octobre 1992 ; articles L6313-10 à L6313-12 et R6313-4 à R6313-8 du Code du travail)<br>• adapter l'approche en fonction du bénéficiaire et du besoin défini lors de l'entretien d'accueil<br>• favoriser le travail de réflexion et d'appropriation du bénéficiaire.</p>" },
      { heading: "4. Notre cœur de métier", content: `<p>${o.nom} accompagne les transitions professionnelles dans le secteur ${profile.secteur}. Domaines : conseil RH, gestion des compétences, accompagnement individuel et collectif, ingénierie de formation, conduite du changement.</p>` },
      { heading: "5. Notre approche", content: "<p>Le bilan est une démarche <strong>volontaire, individuelle et confidentielle</strong>. L'accompagnement s'inscrit dans une relation bipartite ou tripartite avec engagements réciproques :<br>• <strong>Vous</strong> : démarche active pour vous réapproprier votre identité professionnelle et identifier des projets d'avenir.<br>• <strong>Nous</strong> : vous aider à élaborer un projet réaliste en tenant compte de votre globalité de vie, de votre contexte et de la réalité du marché.<br>• <strong>Votre entreprise</strong> (le cas échéant) : finance la démarche et peut, à votre demande ou avec votre accord, bénéficier d'entretiens tripartites de démarrage et de présentation des projets.</p><p>Méthodologie fondée sur l'alternance de travail individuel et de temps d'accompagnement : écoute active, mise en processus de la réflexion, outils et méthodes adaptés.</p>" },
      { heading: "6. Phases détaillées", content: "<p><strong>0 / Phase d'accueil :</strong> point sur les besoins, attentes et contexte ; information sur le déroulement et le cadre légal ; confirmation de l'engagement réciproque.</p><p><strong>1 / Phase préparatoire :</strong> analyse de l'histoire professionnelle, repérage des points clés, mise en lumière du fil conducteur, identification des compétences acquises et transférables, analyse des facteurs de réussite et freins, prise en compte des aspirations et contraintes, élaboration des premières hypothèses d'évolution.</p><p><strong>2 / Phase d'investigation :</strong> identification des comportements professionnels dominants, mesure des écarts de perception, inventaire de personnalité, exploration des valeurs, aspirations et facteurs de motivation, confrontation aux exigences du marché.</p><p><strong>3 / Phase de conclusion :</strong> validation du projet, plan d'action, document de synthèse remis au seul bénéficiaire.</p>", variant: "green" },
      { heading: "7. Méthodologie", content: "<p>Entretiens individuels en face-à-face espacés sur 8 à 16 semaines : remise d'un support méthodologique, séances de travail, passation de questionnaires de personnalité et tests métiers, travail personnel entre les séances, recherches documentaires, démarches terrain, rédaction de la synthèse.</p>" },
      { heading: "8. Notre éthique", content: "<p>Nos consultants sont des professionnels confirmés mettant régulièrement à jour leurs méthodes, outils et connaissance de l'environnement économique. Nous travaillons dans le respect de la personne et nous engageons à ne pas divulguer à des tiers les informations recueillies au cours du bilan. Le bénéficiaire est le seul destinataire du document de synthèse, qui ne peut être communiqué à un tiers sans son accord écrit.</p>" },
      { heading: "9. Notre valeur ajoutée", content: "<p>• Professionnalisme et complémentarité des intervenants (RH, ingénierie de formation, évaluation, orientation, coaching).<br>• Outils éprouvés et fiables, régulièrement mis à jour.<br>• Personnalisation de la relation, neutralité d'analyse, prise en compte des réalités de l'entreprise et du marché.<br>• Confidentialité absolue des informations recueillies.</p>" },
      { heading: "10. Notre démarche qualité", content: `<p>Mesure systématique de la satisfaction (questionnaire à chaud + à 6 mois). Remontée des insatisfactions ou suggestions par mail (${o.email || "—"}) ou téléphone (${o.telephone || "—"}). Mise en œuvre d'actions correctives consignées dans le tableau d'amélioration continue (Critère 7).</p>` },
    ],
  });
}
