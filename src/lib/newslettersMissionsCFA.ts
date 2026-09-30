// Newsletters A4 portrait — 1 par mission CFA (14 missions L6231-2)
// Style identique aux deux exemples fournis (Visionnaire Institute N°2 & N°5) :
//   - En-tête : logo + nom organisme + "N°X | NEWS LETTER"
//   - Titre fort
//   - Illustration hero
//   - 4-5 puces avec icône SVG + libellé court
//   - Paragraphe d'engagement à droite
//   - Footer : site web + contact référent
import type { OrganismeInfo } from "@/types/qualiopi";

interface MissionNL {
  num: number;
  titre: string;     // titre principal de la newsletter
  puces: { label: string; desc: string; icon: string }[]; // 5 puces
  paragraphe: string;
  imageUrl: string;
  referent: { fonction: string; nom: string };
  accent: string;
}

/* Icônes SVG monochromes (stroke = currentColor) */
const ICONS = {
  hourglass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h12M6 21h12M7 3v3a5 5 0 0010 0V3M7 21v-3a5 5 0 0110 0v3"/></svg>',
  gear:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
  compass:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></svg>',
  globe:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18"/></svg>',
  card:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg>',
  doc:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M8 13h8M8 17h5"/></svg>',
  key:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/></svg>',
  user:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>',
  heart:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.8 5.6a5.5 5.5 0 00-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 10-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z"/></svg>',
  scale:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v18M5 7h14M7 7l-3 7a4 4 0 008 0L9 7M17 7l-3 7a4 4 0 008 0l-3-7"/></svg>',
  shield:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  plane:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 16l20-7-9 13-2-6z"/></svg>',
  laptop:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>',
  check:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12l5 5L20 6"/></svg>',
  graduate:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M11 17l-3 3-4-4 7-7 3 3M13 7l3-3 4 4-7 7-3-3"/></svg>',
  hand:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 11V5a2 2 0 014 0v6M11 11V4a2 2 0 014 0v7M15 11V6a2 2 0 014 0v8a8 8 0 01-8 8 8 8 0 01-8-8v-2a2 2 0 014 0v1"/></svg>',
  euro:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 6a8 8 0 100 12M3 10h11M3 14h11"/></svg>',
};

/* Une définition par mission (1..14) */
const MISSIONS: Record<number, Omit<MissionNL, "imageUrl" | "referent">> = {
  1: {
    num: 1,
    titre: "Accueillir, accompagner, informer et orienter les apprentis",
    accent: "#1E3A8A",
    puces: [
      { label: "Accueil personnalisé", desc: "Journée d'intégration et livret d'accueil dès J+1.", icon: ICONS.user },
      { label: "Référent dédié", desc: "Un référent pédagogique pour chaque apprenti.", icon: ICONS.handshake },
      { label: "Information continue", desc: "Droits, devoirs, planning et règlement intérieur.", icon: ICONS.doc },
      { label: "Orientation & réorientation", desc: "Bilans de positionnement et passerelles métiers.", icon: ICONS.compass },
      { label: "Référent Handicap", desc: "Adaptations pédagogiques et lien avec l'AGEFIPH.", icon: ICONS.heart },
    ],
    paragraphe: "s'engage à offrir un accueil de qualité, à informer et orienter chaque apprenti tout au long de son parcours. De l'intégration à la fin du contrat, un accompagnement individualisé garantit la réussite et l'épanouissement professionnel de chacun.",
  },
  2: {
    num: 2,
    titre: "Appuyer et accompagner les postulants à l'apprentissage dans leur recherche d'un employeur",
    accent: "#EA580C",
    puces: [
      { label: "Coaching individualisé", desc: "Accompagnement sur-mesure pour chaque candidat.", icon: ICONS.gear },
      { label: "Optimisation de profil", desc: "Atelier CV et lettre de motivation.", icon: ICONS.doc },
      { label: "Préparation aux entretiens", desc: "Simulations et conseils personnalisés.", icon: ICONS.key },
      { label: "Réseau d'employeurs partenaires", desc: "Mise en relation et matching avec des entreprises.", icon: ICONS.globe },
      { label: "Suivi post-candidature", desc: "Soutien jusqu'à la signature du contrat.", icon: ICONS.user },
    ],
    paragraphe: "s'engage à vos côtés pour vous aider à trouver votre employeur idéal. Nous offrons un accompagnement complet, de l'élaboration de votre profil à la rencontre avec des entreprises à la recherche d'apprentis motivés. Un soutien efficace pour sécuriser votre futur professionnel.",
  },
  3: {
    num: 3,
    titre: "Assurer la cohérence entre la formation dispensée et celle reçue en entreprise",
    accent: "#0E7490",
    puces: [
      { label: "Livret d'apprentissage partagé", desc: "Outil de liaison CFA / entreprise / apprenti.", icon: ICONS.doc },
      { label: "Visites en entreprise", desc: "Visites trimestrielles du formateur référent.", icon: ICONS.handshake },
      { label: "Échanges réguliers", desc: "Réunions et points hebdomadaires avec le maître d'apprentissage.", icon: ICONS.user },
      { label: "Progression coordonnée", desc: "Planning école/entreprise harmonisé sur les compétences REAC.", icon: ICONS.check },
      { label: "Outils numériques de suivi", desc: "ENT et plateforme LMS partagés en temps réel.", icon: ICONS.laptop },
    ],
    paragraphe: "garantit une parfaite cohérence entre les enseignements théoriques dispensés au CFA et les missions confiées en entreprise. Ce lien permanent assure la montée en compétences progressive et la réussite à l'examen de chaque apprenti.",
  },
  4: {
    num: 4,
    titre: "Informer apprentis et maîtres d'apprentissage sur leurs droits et devoirs",
    accent: "#B45309",
    puces: [
      { label: "Livret droits & devoirs", desc: "Remis à chaque apprenti et MA dès la signature.", icon: ICONS.doc },
      { label: "Information santé-sécurité", desc: "Note d'information SST et risques professionnels.", icon: ICONS.shield },
      { label: "Règlement intérieur", desc: "Présenté et signé lors de la journée d'intégration.", icon: ICONS.scale },
      { label: "Sessions d'information annuelles", desc: "Rappels sur le code du travail et la convention collective.", icon: ICONS.user },
      { label: "Permanence juridique", desc: "Réponses aux questions des apprentis et MA.", icon: ICONS.handshake },
    ],
    paragraphe: "informe régulièrement apprentis et maîtres d'apprentissage sur leurs droits et leurs devoirs respectifs, dans le respect du Code du travail et de la convention collective applicable, pour garantir des conditions d'apprentissage sereines et conformes.",
  },
  5: {
    num: 5,
    titre: "Sécuriser le parcours des apprentis en rupture de contrat",
    accent: "#B91C1C",
    puces: [
      { label: "Maintien en formation (6 mois)", desc: "Poursuite de la formation théorique garantie.", icon: ICONS.hourglass },
      { label: "Consolidation des acquis", desc: "Poursuite du développement des compétences professionnelles.", icon: ICONS.gear },
      { label: "Recherche intensive d'employeur", desc: "Coaching dédié à la recherche d'un nouveau contrat.", icon: ICONS.compass },
      { label: "Accès au réseau partenaire", desc: "Mise en relation privilégiée avec de nouvelles entreprises.", icon: ICONS.globe },
      { label: "Droit aux aides : France Travail, CAF, santé…", desc: "Information et orientation vers les dispositifs d'aide.", icon: ICONS.card },
    ],
    paragraphe: "s'engage activement à sécuriser le parcours des apprentis en rupture de contrat. Nous offrons un accompagnement complet et personnalisé pour garantir la continuité de leur formation théorique pendant six mois, tout en les soutenant dans la recherche d'un nouvel employeur idéal.",
  },
  6: {
    num: 6,
    titre: "Accompagner les apprentis dans leur prise d'autonomie sociale et matérielle",
    accent: "#15803D",
    puces: [
      { label: "Aides de la Région", desc: "Accompagnement au montage des dossiers d'aide de la Région du CFA (transport, hébergement, équipement).", icon: ICONS.euro },
      { label: "Aide équipement individuel", desc: "Soutien à l'achat du matériel pédagogique requis.", icon: ICONS.doc },
      { label: "Santé Psy Étudiant", desc: "Orientation vers les dispositifs de soutien psychologique.", icon: ICONS.heart },
      { label: "Transport et mobilité", desc: "Aide aux démarches pour les réductions de transport et les aides locales.", icon: ICONS.card },
      { label: "Logement & restauration", desc: "Information sur les solutions hébergement et CROUS.", icon: ICONS.user },
    ],
    paragraphe: "accompagne chaque apprenti dans sa prise d'autonomie sociale et matérielle. Aides régionales, soutien psychologique, mobilité, logement : un panel de dispositifs activés pour lever les freins périphériques à la réussite de la formation.",
  },
  7: {
    num: 7,
    titre: "Favoriser la mixité au sein de ses structures",
    accent: "#7C3AED",
    puces: [
      { label: "Plan d'actions mixité F/H", desc: "Plan annuel piloté par le référent égalité.", icon: ICONS.scale },
      { label: "Sensibilisation des équipes", desc: "Formation des formateurs aux biais de genre.", icon: ICONS.user },
      { label: "Communication non-stéréotypée", desc: "Supports promotionnels équilibrés F/H.", icon: ICONS.doc },
      { label: "Cellule d'écoute", desc: "Référent harcèlement et discrimination identifié.", icon: ICONS.shield },
      { label: "Bilan annuel chiffré", desc: "Indicateurs F/H présentés au Conseil de perfectionnement.", icon: ICONS.check },
    ],
    paragraphe: "agit concrètement pour la mixité Femmes-Hommes au sein de ses structures. Plan d'actions, sensibilisation, cellule d'écoute et indicateurs annuels garantissent un environnement de formation équilibré et respectueux.",
  },
  8: {
    num: 8,
    titre: "Encourager la mixité dans les métiers préparés",
    accent: "#DB2777",
    puces: [
      { label: "Promotion des métiers ouverts à toutes et tous", desc: "Témoignages et campagnes de communication.", icon: ICONS.globe },
      { label: "Partenariats associatifs", desc: "Elles bougent, Capital Filles, etc.", icon: ICONS.handshake },
      { label: "Journées portes ouvertes mixtes", desc: "Mise en avant de la mixité métier.", icon: ICONS.user },
      { label: "Tutorat & marrainage", desc: "Mise en réseau avec des professionnel·le·s du métier.", icon: ICONS.heart },
      { label: "Suivi statistique", desc: "Indicateurs de mixité par diplôme et par promotion.", icon: ICONS.check },
    ],
    paragraphe: "œuvre pour la mixité dans les métiers préparés en agissant à la fois sur la communication, le recrutement et l'accompagnement, afin de déconstruire les stéréotypes et d'ouvrir tous les métiers à toutes et tous.",
  },
  9: {
    num: 9,
    titre: "Favoriser la diversité et lutter contre les discriminations",
    accent: "#1D4ED8",
    puces: [
      { label: "Charte diversité", desc: "Signée par toute l'équipe du CFA.", icon: ICONS.doc },
      { label: "Référent anti-discrimination", desc: "Point d'entrée unique pour les signalements.", icon: ICONS.shield },
      { label: "Formation des équipes", desc: "Sensibilisation annuelle obligatoire.", icon: ICONS.user },
      { label: "Procédure de signalement", desc: "Confidentielle, tracée et suivie.", icon: ICONS.handshake },
      { label: "Bilan annuel", desc: "Présenté au Conseil de perfectionnement.", icon: ICONS.check },
    ],
    paragraphe: "déploie une politique active de promotion de la diversité et de lutte contre toutes les formes de discriminations, dans le recrutement, l'orientation et le suivi pédagogique, conformément au cadre légal et aux principes de la République.",
  },
  10: {
    num: 10,
    titre: "Encourager la mobilité nationale et internationale des apprentis",
    accent: "#0F766E",
    puces: [
      { label: "Référent Mobilité", desc: "Dédié à l'accompagnement individualisé des projets.", icon: ICONS.user },
      { label: "Programme Erasmus+", desc: "Convention de partenariat et financement européen.", icon: ICONS.plane },
      { label: "Convention inter-CFA", desc: "Mobilité nationale facilitée entre CFA partenaires.", icon: ICONS.handshake },
      { label: "Préparation linguistique & culturelle", desc: "Modules dédiés avant le départ.", icon: ICONS.globe },
      { label: "Reconnaissance des acquis", desc: "Valorisation officielle via Europass.", icon: ICONS.check },
    ],
    paragraphe: "encourage la mobilité nationale et internationale comme levier d'ouverture, de montée en compétences et d'employabilité. Un accompagnement complet, du choix de la destination à la valorisation des acquis, est proposé à chaque apprenti volontaire.",
  },
  11: {
    num: 11,
    titre: "Assurer un suivi pédagogique de la formation à distance",
    accent: "#4338CA",
    puces: [
      { label: "Plateforme LMS dédiée", desc: "Accès 24/7 aux ressources et activités.", icon: ICONS.laptop },
      { label: "Classes virtuelles régulières", desc: "Visioconférences avec les formateurs.", icon: ICONS.user },
      { label: "Tutorat individualisé", desc: "Échanges synchrones et asynchrones.", icon: ICONS.handshake },
      { label: "Suivi des temps de connexion", desc: "Indicateurs d'assiduité et de progression.", icon: ICONS.check },
      { label: "Support technique réactif", desc: "Hotline et tutoriels pour lever les freins numériques.", icon: ICONS.gear },
    ],
    paragraphe: "garantit un suivi pédagogique rigoureux des formations à distance, via une plateforme LMS performante, des classes virtuelles régulières, un tutorat individualisé et des indicateurs d'assiduité, pour la réussite de chaque apprenti à distance.",
  },
  12: {
    num: 12,
    titre: "Évaluer les compétences acquises par les apprentis en entreprise",
    accent: "#16A34A",
    puces: [
      { label: "Livret d'évaluation entreprise", desc: "Rempli par le maître d'apprentissage.", icon: ICONS.doc },
      { label: "Visites trimestrielles", desc: "Évaluation conjointe formateur / MA.", icon: ICONS.handshake },
      { label: "Grilles de compétences REAC", desc: "Référentiel partagé pour l'évaluation.", icon: ICONS.check },
      { label: "Bilans tripartites", desc: "Apprenti — MA — formateur référent.", icon: ICONS.user },
      { label: "Formation des MA", desc: "Module dédié à l'évaluation par compétences.", icon: ICONS.graduate },
    ],
    paragraphe: "structure et formalise l'évaluation des compétences acquises en entreprise. Livret d'évaluation, grilles REAC, visites trimestrielles et bilans tripartites garantissent une évaluation objective, traçable et conforme aux exigences du diplôme.",
  },
  13: {
    num: 13,
    titre: "Accompagner les apprentis après la formation vers l'insertion ou la poursuite d'études",
    accent: "#9A3412",
    puces: [
      { label: "Entretien individuel post-formation", desc: "Projet professionnel à 3 mois et 6 mois.", icon: ICONS.user },
      { label: "Aide à la recherche d'emploi", desc: "Atelier CV, lettre, simulations d'entretien.", icon: ICONS.doc },
      { label: "Réseau entreprises partenaires", desc: "Diffusion d'offres ciblées aux diplômés.", icon: ICONS.globe },
      { label: "Conseil en poursuite d'études", desc: "Information sur les passerelles supérieures.", icon: ICONS.graduate },
      { label: "Suivi à 6 mois", desc: "Enquête d'insertion et accompagnement personnalisé.", icon: ICONS.check },
    ],
    paragraphe: "poursuit l'accompagnement des apprentis au-delà de la fin de leur formation. Entretiens, réseau entreprises, conseil en poursuite d'études et enquête à 6 mois assurent une transition réussie vers l'emploi durable ou les études supérieures.",
  },
  14: {
    num: 14,
    titre: "Accompagner les apprentis dans l'accès aux droits et aux aides spécifiques",
    accent: "#6D28D9",
    puces: [
      { label: "Mobili-Jeune (Action Logement)", desc: "Aide au paiement du loyer des alternants, sous conditions (actionlogement.fr).", icon: ICONS.hand },
      { label: "Garantie Visale + Avance Loca-Pass", desc: "Caution locative gratuite + avance du dépôt de garantie.", icon: ICONS.hand },
      { label: "Aide au logement & restauration", desc: "Information et orientation CROUS / Action Logement / APL CAF.", icon: ICONS.hand },
      { label: "Aide à la mobilité", desc: "Aides transport de la Région, mobilité nationale et Erasmus+.", icon: ICONS.plane },
      { label: "Carte d'étudiant des métiers + Prime d'activité (CAF)", desc: "Réductions loisirs/transports/commerces + complément de revenus selon ressources.", icon: ICONS.card },
      { label: "Aide au premier équipement", desc: "Matériel, outils et tenue professionnelle selon les règles de l'OPCO ou de la Région.", icon: ICONS.euro },
      { label: "Aides santé & psy", desc: "Mutuelle, complémentaire, dispositif Santé Psy Étudiant.", icon: ICONS.heart },
      { label: "Aides selon la situation", desc: "Aides de la Région, France Travail, Agefiph pour les apprentis RQTH.", icon: ICONS.euro },
    ],
    paragraphe: "accompagne chaque apprenti dans l'accès aux droits et aux aides : logement (Mobili-Jeune, Visale, Loca-Pass, APL), mobilité, restauration, santé, prime d'activité et aides régionales. Un référent dédié facilite les démarches administratives ; la liste des aides est tenue à jour au fil de la veille (l'aide de 500 € au permis de conduire des apprentis est supprimée depuis le 21/02/2026).",
  },
};

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Choix d'un référent contextuel selon la mission */
function getReferent(o: OrganismeInfo, missionNum: number): { fonction: string; nom: string; tel: string } {
  const tel = (o.telephone || "01 00 00 00 00").trim();
  const dir = (o.dirigeant || "Direction pédagogique").trim();
  const map: Record<number, string> = {
    1: "Référent pédagogique",
    2: "Référent emploi",
    3: "Référent entreprise",
    4: "Référent juridique",
    5: "Référent pédagogique",
    6: "Référent social",
    7: "Référent égalité F/H",
    8: "Référent mixité",
    9: "Référent diversité",
    10: "Référent mobilité",
    11: "Référent FOAD",
    12: "Référent évaluation",
    13: "Référent insertion",
    14: "Référent handicap",
  };
  return { fonction: map[missionNum] || "Référent pédagogique", nom: dir, tel };
}

export function genNewsletterMissionCFA(
  o: OrganismeInfo,
  missionNum: number,
): string {
  const m = MISSIONS[missionNum];
  if (!m) return `<p>Mission ${missionNum} introuvable.</p>`;

  const orgName = (o.nom || "ORGANISME DE FORMATION").toUpperCase();
  const ref = getReferent(o, missionNum);
  const imageUrl = `/pdfs/visuels_14_missions/illu_m${missionNum}.jpg`;
  const siteWeb = (o.siteWeb || `www.${(o.nom || "organisme").toLowerCase().replace(/[^a-z0-9]/g, "")}.fr`).replace(/^https?:\/\//, "");
  const accent = m.accent;

  const pucesHtml = m.puces.map((p) => `
    <tr>
      <td class="ico" style="color:${accent};">${p.icon}</td>
      <td class="puce-txt">
        <div class="puce-label">${escHtml(p.label)} :</div>
        <div class="puce-desc">${escHtml(p.desc)}</div>
      </td>
    </tr>
  `).join("");

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8">
<title>Newsletter Mission ${missionNum} – ${escHtml(orgName)}</title>
<style>
  @page { size: A4 portrait; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 210mm; height: 297mm; background: #fafaf7;
    font-family: Georgia, 'Times New Roman', serif;
    color: #1a1a1a;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .sheet {
    width: 210mm; height: 297mm;
    padding: 10mm;
    background: #fafaf7;
    overflow: hidden;
  }
  .frame {
    height: 100%;
    border: 1px solid #d8d8d2;
    padding: 7mm 9mm 6mm;
    position: relative;
    background: #fbfbf7;
    display: flex; flex-direction: column;
  }
  .frame::before, .frame::after {
    content: ""; position: absolute; width: 7mm; height: 7mm;
    border: 1px solid #b0b0a8;
  }
  .frame::before { top: -3.5mm; left: -3.5mm; border-right: none; border-bottom: none; }
  .frame::after  { bottom: -3.5mm; right: -3.5mm; border-left: none; border-top: none; }

  .header { display: flex; align-items: center; gap: 5mm; margin-bottom: 1.5mm; flex-shrink: 0; }
  .logo-circle {
    width: 14mm; height: 14mm; border-radius: 50%;
    border: 1.2px solid #1a2540;
    display: flex; align-items: center; justify-content: center;
    font-family: Georgia, serif; font-weight: 700; font-size: 10pt; color: #1a2540;
    letter-spacing: 0.5px; flex-shrink: 0;
  }
  .org-block { flex: 1; }
  .org-name {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 20pt; font-weight: 400; letter-spacing: 2px; color: #1a2540;
    line-height: 1; text-transform: uppercase;
  }
  .nl-tag {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 9.5pt; letter-spacing: 2px; color: #4a4a4a;
    margin-top: 1.5mm;
  }

  .title {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 800; font-size: 14pt; line-height: 1.18;
    color: #1a2540; margin: 2.5mm 0; flex-shrink: 0;
  }

  .hero {
    width: 100%; height: 63mm; object-fit: cover;
    display: block; border: 1px solid #e0e0d8;
    background: #eeeee8; flex-shrink: 0;
  }

  .content {
    margin-top: 3mm;
    display: grid; grid-template-columns: 86mm 1fr; gap: 5mm;
    flex: 1; min-height: 0; align-items: start;
  }
  .puces { width: 100%; border-collapse: collapse; height: auto; }
  .puces tr { vertical-align: top; }
  .puces td { padding: 1.6mm 0; }
  .puces .ico { width: 10mm; padding-right: 2mm; vertical-align: top; }
  .puces .ico svg { width: 7mm; height: 7mm; display: block; }
  .puce-label {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 700; font-size: 9.5pt; color: #1a1a1a; line-height: 1.2;
  }
  .puce-desc {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 8.2pt; color: #3a3a3a; margin-top: 0.4mm; line-height: 1.28;
  }

  .paragraphe {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 10pt; line-height: 1.38; color: #1a1a1a; text-align: justify;
  }
  .paragraphe strong { color: #1a2540; }
</style></head>
<body>
<div class="sheet">
  <div class="frame">
    <div class="header">
      <div class="logo-circle">${escHtml((orgName[0] || "O") + (orgName.split(" ")[1]?.[0] || ""))}</div>
      <div class="org-block">
        <div class="org-name">${escHtml(orgName)}</div>
        <div class="nl-tag">N°${missionNum} | NEWS LETTER</div>
      </div>
    </div>

    <div class="title">${escHtml(m.titre)}</div>

    <img class="hero" src="${imageUrl}" alt="Illustration Mission ${missionNum}" onerror="this.style.background='${accent}';this.style.opacity='0.15';" />

    <div class="content">
      <table class="puces">${pucesHtml}</table>
      <div class="paragraphe">
        Le centre de formation <strong>${escHtml(o.nom || "")}</strong> ${escHtml(m.paragraphe)}
      </div>
    </div>

  </div>
</div>
</body></html>`;
}

export const NEWSLETTER_MISSIONS_LIST = [
  { num: 1,  titre: "Accueil & orientation des apprentis",          folder: "14_MISSIONS_CFA/Mission_1_Orientation_Handicap" },
  { num: 2,  titre: "Recherche d'employeur",                         folder: "14_MISSIONS_CFA/Mission_2_Recherche_Employeur" },
  { num: 3,  titre: "Cohérence CFA / Entreprise",                    folder: "14_MISSIONS_CFA/Mission_3_Coherence_CFA_Entreprise" },
  { num: 4,  titre: "Droits, devoirs & SST",                         folder: "14_MISSIONS_CFA/Mission_4_Droits_Devoirs_Sante_Securite" },
  { num: 5,  titre: "Rupture de contrat",                            folder: "14_MISSIONS_CFA/Mission_5_Rupture_Contrat" },
  { num: 6,  titre: "Accompagnement social & matériel",              folder: "14_MISSIONS_CFA/Mission_6_Accompagnement_Social_Materiel" },
  { num: 7,  titre: "Mixité F/H",                                    folder: "14_MISSIONS_CFA/Mission_7_Mixite_Egalite_FH" },
  { num: 8,  titre: "Égalité pro & mixité des métiers",              folder: "14_MISSIONS_CFA/Mission_8_Egalite_Pro_Mixite_Metiers" },
  { num: 9,  titre: "Diversité & lutte contre les discriminations",  folder: "14_MISSIONS_CFA/Mission_9_Diversite_Discriminations" },
  { num: 10, titre: "Mobilité nationale & internationale",           folder: "14_MISSIONS_CFA/Mission_10_Mobilite_Nationale" },
  { num: 11, titre: "Suivi de la formation à distance",              folder: "14_MISSIONS_CFA/Mission_11_Formation_Distance" },
  { num: 12, titre: "Évaluation des compétences acquises",           folder: "14_MISSIONS_CFA/Mission_12_Evaluation_Competences" },
  { num: 13, titre: "Accompagnement post-formation",                 folder: "14_MISSIONS_CFA/Mission_13_Accompagnement_Post_Formation" },
  { num: 14, titre: "Accès aux aides des apprentis",                 folder: "14_MISSIONS_CFA/Mission_14_Acces_Aides" },
] as const;
