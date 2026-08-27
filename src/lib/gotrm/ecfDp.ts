/**
 * ECF (Livret d'évaluations passées en cours de formation) et DP (Dossier professionnel)
 * pour le Titre professionnel GOTRM (TP-01329 / RNCP40990).
 *
 * Les trames reprennent les documents officiels du Ministère chargé de l'emploi :
 *  - « Livret d'évaluations passées en cours de formation » (ECF)
 *  - « Dossier professionnel (DP) »
 *
 * Les réponses sont humanisées (rédaction à la première personne, style candidat)
 * et varient pour chaque stagiaire (graine déterministe sur le nom/prénom).
 */

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import {

  htmlWrap,
  formatDate,
  getStagiaireDateDebut,
  getStagiaireDateFin,
  subtractBusinessDays,
  g,
} from "@/lib/docBuilder";
import { GOTRM_TITRE, GOTRM_CCP } from "@/data/gotrm";

// ───────────────────────────────────────────── utils

function seedOf(s: StagiaireInfo | null | undefined, salt = 0): number {
  const base = `${s?.nom || ""}${s?.prenom || ""}${s?.email || ""}`.toUpperCase();
  let h = 7;
  for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) % 100000;
  return (h + salt * 977) % 100000;
}
function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}
/** Décale une date ISO de n jours (en évitant samedi/dimanche). */
function addWorkDays(iso: string, days: number): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const w = d.getDay();
    if (w !== 0 && w !== 6) left--;
  }
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

const CHK = (on: boolean) => (on ? "☒" : "☐");

const ENTREPRISES = [
  { nom: "TRANSPORTS MARTEAU & FILS", service: "Service exploitation – zone longue distance", ville: "Gennevilliers (92)" },
  { nom: "STG LOGISTIQUE ÎLE-DE-FRANCE", service: "Agence de messagerie – quai départ", ville: "Wissous (91)" },
  { nom: "GEODIS DISTRIBUTION & EXPRESS", service: "Exploitation camionnage / distribution régionale", ville: "Bonneuil-sur-Marne (94)" },
  { nom: "TRANSPORTS DELAHAYE", service: "Cellule affrètement national", ville: "Rungis (94)" },
  { nom: "DACHSER FRANCE", service: "Service traction et groupage", ville: "Roissy-en-France (95)" },
  { nom: "TRANSALLIANCE TS", service: "Exploitation sous-traitance régulière", ville: "Combs-la-Ville (77)" },
  { nom: "HEPPNER TRANSPORTS", service: "Service après-vente / litiges transport", ville: "Noyelles (59) – rattachement IDF" },
  { nom: "TRANSPORTS SIMONNET", service: "Exploitation frigorifique (ATP)", ville: "Chevilly-Larue (94)" },
  { nom: "XPO LOGISTICS EUROPE", service: "Planning conducteurs & plans de marche", ville: "Aulnay-sous-Bois (93)" },
  { nom: "TRANSPORTS BOUCHER LOGISTIQUE", service: "Exploitation lot complet et affrètement", ville: "Vitry-sur-Seine (94)" },
];

const OUTILS = [
  "TMS Akanea Transport, Excel® (tableaux de bord et calculs de PRK), Word® (offres et comptes rendus), messagerie Outlook, téléphone d'exploitation",
  "TMS Trans-iX, bourse de fret B2P, Excel® pour la tarification, chronotachygraphe numérique et logiciel de téléchargement des cartes conducteurs",
  "TMS Shippeo pour le suivi temps réel, Teleroute pour l'affrètement, Excel®, Word®, imprimante étiquettes, lettres de voiture CMR",
  "Logiciel de tournée OptimoRoute, TMS interne, Excel® (taux de remplissage, retour à vide), Word®, plateforme EDI client",
  "TMS Akanea, Wtransnet, tableur Excel® (indices CNR, gazole), Legifrance et Code des transports en consultation, téléphonie mobile flotte",
];

const COLLEGUES = [
  "avec mon responsable d'exploitation, deux collègues exploitants, une assistante administrative et une quinzaine de conducteurs",
  "en binôme avec l'exploitant confirmé du service, sous la supervision du directeur d'agence, en lien quotidien avec les conducteurs et le quai",
  "avec la responsable affrètement, le service facturation, les sous-traitants réguliers et les donneurs d'ordres",
  "avec le chef de quai, les conducteurs de distribution, le service commercial et la cellule litiges",
  "avec mon tuteur (responsable transport), l'équipe de trois exploitants et les correspondants qualité des clients",
];

// ───────────────────────────────────────────── ECF

const ECF_EVALS: Record<string, { desc: string[]; comps: number[] }[]> = {
  CCP1: [
    {
      desc: [
        "Étude de cas « demande de transport lot complet Lille → Marseille » : analyse de faisabilité, calcul du prix de revient kilométrique et rédaction de l'offre commerciale sous Word®",
        "Étude de cas « transport de palettes sous température dirigée » : vérification de la faisabilité ATP, tarification et proposition technique détaillée au donneur d'ordres",
        "Étude tarifaire « 12 t de marchandises générales Paris → Bordeaux » : calcul du PRK, application des indices CNR et formalisation de l'offre écrite",
      ],
      comps: [1],
    },
    {
      desc: [
        "Mise en situation sur TMS pédagogique : affectation de 8 commandes aux moyens propres et à deux sous-traitants, contrôle des pièces administratives (licence, attestation d'assurance, vigilance URSSAF)",
        "Exercice de planification hebdomadaire : affectation de 11 ordres de transport, recours à la bourse de fret pour 3 lots, planning conducteurs sur TMS",
        "Cas pratique affrètement : sélection des sous-traitants, contrôle de leur situation administrative et report des opérations sur le planning",
      ],
      comps: [2],
    },
    {
      desc: [
        "Jeu de rôle « briefing conducteurs » : transmission des consignes, construction de deux plans de marche conformes au règlement (CE) 561/2006 et à l'accord 35 h transport",
        "Exercice de lecture de disques et de données chronotachygraphe numérique : repérage de trois anomalies, rédaction de l'alerte à la hiérarchie",
        "Mise en situation d'encadrement : contrôle des temps de service, information des conducteurs sur leurs obligations et vérification des documents de bord",
      ],
      comps: [3],
    },
    {
      desc: [
        "Suivi d'exploitation sur une journée simulée : renseignement des tableaux de suivi, gestion d'un aléa (panne à Orléans), recherche d'une solution de substitution et information des interlocuteurs",
        "Cas « refus de livraison et réserves CMR » : rédaction des réserves, transmission aux services concernés, relevé des indicateurs OTIF et de rentabilité",
        "Exercice de clôture de dossiers : contrôle des objectifs qualité/rentabilité de 6 opérations et alerte de la hiérarchie sur deux écarts",
      ],
      comps: [4],
    },
  ],
  CCP2: [
    {
      desc: [
        "Négociation simulée d'un contrat de sous-traitance régulière (3 rotations hebdomadaires) : cahier des charges, clauses tarifaires et indexation gazole selon le contrat type du décret du 26/12/2017",
        "Étude de cas « contractualisation d'une traction régulière Paris → Lyon » : négociation du tarif, rédaction du cahier des charges et formalisation du contrat commercial",
        "Cas pratique bilingue : traitement d'une demande de sous-traitance rédigée en anglais, négociation tarifaire et contractualisation",
      ],
      comps: [5],
    },
    {
      desc: [
        "Mise en situation « arrivage messagerie » : affectation des positions aux véhicules de distribution, optimisation de deux tournées de livraison et de ramasse, contrôle des bordereaux de groupage",
        "Exercice de supervision traction/groupage : affectation des envois aux tractions, contrôle de la conformité réglementaire des tournées",
        "Cas pratique camionnage : optimisation d'une tournée de 18 points sous OptimoRoute et vérification des bordereaux de départ",
      ],
      comps: [6],
    },
    {
      desc: [
        "Jeu de rôle SAV : traitement d'une réclamation client pour avarie, ouverture du litige, suivi des supports de charge consignés et organisation du retour de marchandise",
        "Étude de cas litiges : trois réclamations à qualifier (manquant, retard, avarie), transmission aux services concernés et réponse écrite au client",
        "Mise en situation « retours et palettes Europe » : traitement administratif des consignes et régularisation du compte palettes du client",
      ],
      comps: [7],
    },
  ],
  CCP3: [
    {
      desc: [
        "Animation d'une réunion d'exploitation simulée : plan d'actions QVCT, planification des formations réglementaires (FCO, ADR) et calcul des éléments variables de paie de trois conducteurs",
        "Cas pratique management : anticipation d'un besoin de recrutement, proposition à la hiérarchie et planification des formations obligatoires de l'équipe",
        "Mise en situation « annexe au bulletin de salaire » : reconstitution des éléments variables à partir des relevés d'activité de la semaine",
      ],
      comps: [8],
    },
    {
      desc: [
        "Construction d'un tableau de bord d'exploitation sous Excel® : coûts d'exploitation, comparaison aux indices CNR, seuil de rentabilité, ratios et préconisation de trois mesures correctives",
        "Étude de rentabilité d'un trafic régulier : reconstitution des coûts, analyse des ratios et proposition d'un plan d'actions à la direction",
        "Analyse d'indicateurs (km/litre, taux de remplissage, retour à vide, marge brute par client) et rédaction d'une note de préconisations",
      ],
      comps: [9],
    },
  ],
};

const ECF_OBSERVATIONS = [
  "Candidat sérieux et régulier tout au long du parcours. Les calculs de prix de revient sont maîtrisés et les productions écrites sont soignées. La posture professionnelle en situation d'entretien est convaincante.",
  "Progression nette entre les premières évaluations et les dernières. La partie réglementaire (RSE, AETR) est désormais solide et les tableaux de bord sont exploités avec pertinence.",
  "Bonne aisance sur l'outil informatique et sur le TMS. Le candidat argumente ses choix organisationnels et sait alerter sa hiérarchie au bon moment.",
  "Travail rigoureux sur les dossiers d'affrètement et le contrôle des sous-traitants. Les réserves CMR et le traitement des litiges sont conformes aux attendus du référentiel.",
  "Candidat autonome, à l'écoute des remarques du formateur. Les préconisations de mesures correctives sont chiffrées et réalistes.",
];

export function genECFGotrm(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx = 0,
): string {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const seed = seedOf(s);
  const debut = getStagiaireDateDebut(s, f);
  const fin = getStagiaireDateFin(s, f);
  const dateVisa = fin ? formatDate(fin) : formatDate(f.dateFin || "");
  const evaluateur1 = f.formateur || org.responsablePedagogique || org.dirigeant || "";
  const evaluateur2 = org.responsablePedagogique && org.responsablePedagogique !== evaluateur1
    ? org.responsablePedagogique
    : org.referentQualite || org.dirigeant || "";
  const lieu = f.lieu || `${org.adresse}, ${org.codePostal} ${org.ville}`;

  // ── Pied de page officiel (identique à la trame « Livret ECF-EPR »)
  const nbPages = GOTRM_CCP.length + 3;
  const pied = (p: number) => `<table class="pied-officiel" style="width:100%;border-collapse:collapse;font-size:8pt;margin-top:16px">
    <tr><th>SIGLE</th><th>Type de document</th><th>Code titre</th><th>Millésime</th><th>Date JO</th><th>Date de mise à jour</th><th>Page</th></tr>
    <tr><td>EPR</td><td>Livret d'évaluations passées en cours de formation</td><td>${GOTRM_TITRE.codeTitre}</td><td>${GOTRM_TITRE.millesime}</td><td>14/06/2025</td><td>${formatDate(org.dateMaj || "")}</td><td>${p}/${nbPages}</td></tr>
  </table>`;

  const pages: string[] = [];

  // ── Page 1 : page de garde officielle
  pages.push(`<div style="text-align:center">
    <p style="font-size:11pt;letter-spacing:2px;margin-bottom:2px">MINISTÈRE CHARGÉ DE L'EMPLOI</p>
    <p style="font-size:9pt;font-style:italic;margin-top:0">Liberté • Égalité • Fraternité</p>
    <h1 style="margin-bottom:2px">Titre professionnel</h1>
    <h2 style="margin-top:0">${GOTRM_TITRE.intitule}</h2>
    <p><strong>${GOTRM_TITRE.niveau}</strong></p>
  </div>
  <table style="width:60%;margin:0 auto;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:50%">Arrêté du :</th><td>${GOTRM_TITRE.arrete.replace(/^Arrêté du\s*:?\s*/i, "")}</td></tr>
    <tr><th>J.O. du :</th><td>${GOTRM_TITRE.jo.replace(/^J\.?O\.?\s*du\s*:?\s*/i, "")}</td></tr>
    <tr><th>Date d'effet au :</th><td>${GOTRM_TITRE.dateEffet}</td></tr>
  </table>
  <p style="margin-top:22px"><em>Organisme de formation – Lieu de formation</em><br>${org.nom}<br>${lieu}</p>
  <p style="margin-top:18px"><strong><em>Candidat(e) :</em></strong> Mme ${CHK(s?.civilite === "Mme")} &nbsp;&nbsp; M. ${CHK(s?.civilite !== "Mme")}</p>
  <p><em>Nom</em> : <strong>${s?.nom || ""}</strong><br>
  <em>Prénom</em> : <strong>${s?.prenom || ""}</strong><br>
  <em>Date de naissance</em> : ${s?.dateNaissance ? formatDate(s.dateNaissance) : ""}</p>
  <p><em>Période de formation</em> : du ${formatDate(debut)} au ${formatDate(fin)}</p>`);

  // ── Page 2 : présentation du dossier (texte officiel)
  pages.push(`<h2>Présentation du dossier</h2>
  <p>Les évaluations passées en cours de formation décrites dans les fiches qui suivent ont été mises en œuvre en référence aux critères issus des référentiels du titre professionnel, pour les sessions d'examen « Titre », « CCP » et « CCS » telles que prévues par l'arrêté du 22 décembre 2015 relatif aux conditions de délivrance du titre professionnel du ministère chargé de l'emploi.</p>
  <p>Le <strong><em>Guide de mise en œuvre</em></strong> des évaluations passées en cours de formation est à télécharger sur le site du ministère de l'emploi : http://travail-emploi.gouv.fr/ (rubrique <em>Documents techniques</em>). Il comporte un mode d'emploi du présent Livret d'évaluations passées en cours de formation.</p>`);

  // ── Fiches de résultats des évaluations (une page par activité-type)
  GOTRM_CCP.forEach((ccp, ci) => {
    const numAT = ci + 1;
    const evals = ECF_EVALS[ccp.code] || [];
    let p = `<h2>Fiche de résultats des évaluations</h2>
    <p><strong>Activité-type ${numAT} ${ccp.libelle}</strong></p>
    <p><strong>Compétences :</strong></p>
    <ol>${ccp.competences.map(c => `<li>${c.libelle}</li>`).join("")}</ol>`;

    const rows = evals.map((ev, ei) => {
      const desc = pick(ev.desc, seed + ci * 3 + ei);
      const jour = addWorkDays(debut, ci * 3 + ei + 1);
      const compsCells = ccp.competences
        .map((_, n) => `${n + 1} ${CHK(ev.comps.includes(n + 1))}`)
        .join(" &nbsp;&nbsp; ");
      return `<tr><td><strong>${ei + 1}</strong> ${desc}</td><td>${jour ? formatDate(jour) : ""}</td><td>${compsCells}</td></tr>`;
    });
    p += `<table style="width:100%;border-collapse:collapse;font-size:9.5pt">
      <tr><th style="width:58%">Description des évaluations mises en œuvre</th><th style="width:14%">Dates</th><th>Compétences évaluées <em>(cochez)</em></th></tr>
      ${rows.join("")}
    </table>`;
    p += `<p style="margin-top:12px"><strong>Lors de l'évaluation ou des évaluations passée(s) en cours de formation, ${g(s, "le candidat est considéré", "la candidate est considérée")} :</strong></p>
      <p>${CHK(true)} Avoir satisfait aux critères issus des référentiels du titre professionnel attendus pour la réalisation de cette activité-type.<br>
      ${CHK(false)} Ne pas avoir satisfait aux critères issus des référentiels du titre professionnel.</p>
      <p><strong>Si le candidat n'a pas satisfait aux critères issus des référentiels, notez ci-dessous les points d'attention et précisions éventuelles.</strong><br>Néant.</p>
      <p><strong>Compétences à réévaluer :</strong> néant.</p>`;
    p += `<p style="margin-top:10px"><strong>Formateur(s) évaluateur(s) – Visa</strong></p>
    <table style="width:100%;border-collapse:collapse;font-size:10pt">
      <tr><th style="width:12%"><em>Nom</em></th><td style="width:33%">${evaluateur1}</td><th style="width:12%"><em>Date</em></th><td style="width:18%">${dateVisa}</td><td style="height:44px"></td></tr>
      <tr><th><em>Nom</em></th><td>${evaluateur2}</td><th><em>Date</em></th><td>${dateVisa}</td><td style="height:44px"></td></tr>
    </table>`;
    pages.push(p);
  });

  // ── Dernière page : synthèse des résultats
  let syn = `<h2>Synthèse des résultats obtenus par ${g(s, "le candidat", "la candidate")} à l'issue du parcours de formation</h2>
  <table style="width:100%;border-collapse:collapse;font-size:9.5pt">
    <tr><th style="width:42%">Intitulé de l'activité-type</th><th style="width:40%">Compétences professionnelles</th><th>Activité maîtrisée</th></tr>
    ${GOTRM_CCP.map((ccp, i) => `<tr><td><strong>Activité-type ${i + 1}</strong> – ${ccp.libelle}</td><td>• ${ccp.competences.map(c => c.libelle).join("<br>• ")}</td><td>OUI ${CHK(true)} &nbsp; NON ${CHK(false)}</td></tr>`).join("")}
  </table>
  <p style="margin-top:12px"><strong>Observations :</strong></p>
  <p>${pick(ECF_OBSERVATIONS, seed + 5)}</p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:40%">Formateur(s) / Évaluateur(s)</th><th style="width:25%">Date</th><th>Visa</th></tr>
    <tr><td>${evaluateur1}</td><td>${dateVisa}</td><td style="height:44px"></td></tr>
    <tr><td>${evaluateur2}</td><td>${dateVisa}</td><td style="height:44px"></td></tr>
    <tr><td><strong>Représentant de l'organisme de formation</strong><br>${org.dirigeant || ""}</td><td>${dateVisa}</td><td style="height:44px">${org.tamponUrl ? `<img src="${org.tamponUrl}" alt="Tampon ${org.nom}" style="max-height:70px" />` : ""}</td></tr>
  </table>
  <p style="margin-top:12px">Un exemplaire du livret a été remis ${g(s, "au candidat", "à la candidate")} pour information par l'organisme de formation contre signature, le ${dateVisa}.</p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt"><tr><th style="width:50%">Signature ${g(s, "du candidat", "de la candidate")} pour information</th><td style="height:70px">${s?.signatureUrl ? `<img src="${s.signatureUrl}" alt="Signature ${s.prenom} ${s.nom}" style="max-height:60px" />` : ""}</td></tr></table>`;
  pages.push(syn);

  const body = pages
    .map((p, i) => `${p}${pied(i + 1)}`)
    .join(`<div class="page-break"></div>`);
  return htmlWrap(body);
}


// ───────────────────────────────────────────── DP

interface DpExemple {
  titre: string;
  taches: string[];
  moyens: string[];
  avecQui?: string;
  complement: string[];
}

const DP_EXEMPLES: Record<string, DpExemple[]> = {
  CCP1: [
    {
      titre: "Traitement d'une demande de transport de lot complet et remise d'une offre chiffrée",
      taches: [
        "J'ai reçu par mail une demande d'un client industriel pour un lot complet de 22 palettes au départ de la région parisienne vers Marseille, avec un rendez-vous de livraison imposé à 8 h le lendemain. J'ai commencé par reprendre point par point la demande : poids, nombre de palettes, hauteur, marchandise non dangereuse, horaires de chargement et de livraison. J'ai appelé le client pour confirmer deux informations qui manquaient (hayon nécessaire ou non, et heure limite de mise à quai). Ensuite j'ai vérifié la faisabilité : distance, temps de conduite réglementaire, coupure obligatoire, disponibilité d'un véhicule de 24 t. Comme le délai imposait un départ le soir même, j'ai calculé le coût avec un conducteur en découché. J'ai monté mon prix de revient sur Excel (coût kilométrique, coût horaire de conduite, frais de déplacement, péages, gazole), j'ai appliqué la marge demandée par mon responsable, puis j'ai rédigé l'offre sous Word en détaillant les moyens, le déroulé et les conditions. Le client a validé l'offre le jour même.",
        "Un donneur d'ordres du secteur agroalimentaire m'a sollicité pour un transport sous température dirigée (+2/+4 °C) de 14 palettes. J'ai d'abord vérifié que nous disposions d'un véhicule sous ATP en cours de validité et que le conducteur avait bien la sensibilisation au respect de la chaîne du froid. J'ai contrôlé les contraintes : prise de température au chargement, relevé à la livraison, obligation de traçabilité. Comme le trajet dépassait ce que je pouvais couvrir en propre cette semaine-là, j'ai consulté deux sous-traitants réguliers et une bourse de fret. J'ai comparé les prix et les délais, j'ai retenu la solution la plus fiable même si elle n'était pas la moins chère, en l'expliquant par écrit à mon responsable. J'ai ensuite tarifé la prestation en intégrant la marge d'affrètement et j'ai envoyé une proposition technique détaillée qui reprenait les températures, les documents à fournir et les conditions de responsabilité prévues par la CMR.",
        "J'ai traité une consultation pour un trafic ponctuel de 6 t de marchandises générales de Paris vers Bordeaux, avec deux points de livraison. J'ai décomposé la demande en deux ordres pour pouvoir chiffrer correctement le deuxième point. J'ai repris le prix de revient kilométrique de l'entreprise, mis à jour avec l'indice gazole du mois, et j'ai ajouté le temps d'attente prévisible sur le deuxième site. J'ai formalisé une offre écrite claire, avec les délais, la nature du matériel, la couverture d'assurance et la durée de validité du prix. J'ai aussi signalé au client que le déchargement devait être assuré par ses soins, pour éviter tout malentendu au moment de la livraison.",
      ],
      moyens: [
        "Tableur Excel pour le calcul du prix de revient et la simulation de marge, traitement de texte Word pour l'offre commerciale, TMS de l'entreprise, bourse de fret, barème gazole et indices CNR, Code des transports et contrats types consultés en ligne, téléphone et messagerie professionnelle.",
        "TMS Akanea, Excel (grille tarifaire interne et coût de revient), Word pour la proposition écrite, documentation ATP et CMR, tableau des sous-traitants référencés avec leurs attestations à jour.",
      ],
      complement: [
        "Ce qui m'a le plus servi, c'est de systématiquement rappeler le client quand une information manque : cela évite de chiffrer à côté et de perdre la commande sur un malentendu.",
        "J'ai gardé l'habitude de conserver une trace écrite de chaque offre et de chaque accord verbal confirmé par mail, ce qui a déjà évité un litige sur le prix à la facturation.",
      ],
    },
    {
      titre: "Affectation des moyens, affrètement et planification d'une semaine d'exploitation",
      taches: [
        "Chaque vendredi, je préparais le planning de la semaine suivante. Je partais des commandes fermes saisies dans le TMS, je les classais par zone géographique et par créneau de rendez-vous, puis j'affectais nos véhicules en tenant compte des temps de conduite, des repos, des congés et des visites périodiques des camions. Pour les commandes que nous ne pouvions pas absorber, je passais par nos sous-traitants réguliers puis, en dernier recours, par la bourse de fret. Avant de confirmer un nouveau sous-traitant, je contrôlais systématiquement sa licence de transport, son attestation d'assurance RC, son attestation de vigilance URSSAF et le K-bis. Une fois, un sous-traitant m'a transmis une attestation périmée : j'ai suspendu la commande et j'ai prévenu mon responsable avant de la réaffecter à un autre confrère.",
        "J'ai été chargé de la planification de 11 ordres de transport sur trois jours avec seulement six véhicules disponibles. J'ai commencé par identifier les ordres réellement contraints par un rendez-vous et ceux qui pouvaient glisser d'une journée. J'ai ensuite regroupé deux livraisons proches sur une même tournée, ce qui m'a libéré un véhicule. Pour les trois ordres restants, j'ai affrété deux confrères sur des trajets qu'ils faisaient déjà à vide au retour, ce qui m'a permis d'obtenir un bon prix. J'ai reporté toutes les affectations sur le planning partagé pour que le quai et la facturation aient la même information que moi.",
        "Sur une période chargée avant les fêtes, j'ai dû réorganiser les affectations presque tous les matins. J'ai mis en place un point de dix minutes chaque jour à 7 h 30 avec le chef de quai pour caler les priorités. J'ai aussi tenu compte d'un conducteur reconnu travailleur handicapé avec une restriction de port de charge : je lui affectais des tournées sans manutention, en le disant clairement pour que ce soit intégré comme une contrainte d'exploitation normale et pas comme une faveur.",
      ],
      moyens: [
        "TMS pour la saisie et l'affectation, planning hebdomadaire partagé, bourse de fret pour l'affrètement, dossier de référencement des sous-traitants (licence, assurance, vigilance URSSAF), règlement (CE) 561/2006 et accord de branche transport pour le calcul des amplitudes.",
        "Planning Excel partagé, TMS, téléphone d'exploitation, plateforme de suivi des conducteurs, tableau de suivi des attestations de sous-traitance avec alerte sur les dates d'expiration.",
      ],
      complement: [
        "J'ai appris à toujours garder une marge d'un véhicule ou d'un sous-traitant disponible : dans le transport, il y a toujours un imprévu dans la journée.",
        "Le contrôle administratif des sous-traitants est un réflexe que je n'ai plus lâché, parce que la responsabilité de l'entreprise est directement engagée.",
      ],
    },
  ],
  CCP2: [
    {
      titre: "Négociation et contractualisation d'un trafic régulier sous-traité",
      taches: [
        "Nous avons gagné un trafic régulier de trois rotations hebdomadaires vers la région lyonnaise et la direction a décidé de le sous-traiter. J'ai été chargé de la partie négociation. J'ai d'abord chiffré ce que le trafic nous coûterait en propre pour savoir jusqu'où je pouvais aller. J'ai consulté trois transporteurs, je leur ai transmis un cahier des charges avec les volumes, les horaires, le type de matériel, les exigences qualité du client et les pénalités. Après deux tours de négociation, j'ai retenu celui qui proposait le meilleur rapport prix / fiabilité. Nous avons formalisé un contrat conforme au contrat type de sous-traitance, avec la clause d'indexation gazole, les délais de paiement, les obligations d'assurance et les indicateurs de suivi. J'ai relu le contrat avec mon responsable avant signature.",
        "J'ai repris la renégociation annuelle d'un contrat de traction existant. Le sous-traitant demandait une hausse de 6 % à cause du carburant et des salaires. J'ai repris les indices professionnels et j'ai montré, chiffres à l'appui, que la hausse justifiée était plutôt de l'ordre de 3,5 %. Nous nous sommes accordés sur une revalorisation de 4 % avec une indexation gazole automatique trimestrielle, ce qui a évité de refaire la discussion tous les mois. J'ai mis à jour le cahier des charges et fait signer l'avenant.",
        "Un client européen nous a transmis une demande de sous-traitance régulière rédigée en anglais. J'ai traduit et reformulé les exigences (fréquence, incoterms, exigences de traçabilité), j'ai vérifié les points qui pouvaient poser problème sur le plan réglementaire français, puis j'ai construit le cahier des charges bilingue. La négociation s'est faite par visioconférence en anglais simple, et le contrat a été établi selon le contrat type applicable.",
      ],
      moyens: [
        "Contrat type de sous-traitance (décret du 26 décembre 2017), Excel pour la simulation du coût en propre et du coût sous-traité, indices professionnels CNR, Word pour le cahier des charges et le contrat, visioconférence et messagerie.",
        "Trame de cahier des charges de l'entreprise, base des sous-traitants référencés, tableur de comparaison des offres, contrat type, dictionnaire technique anglais du transport.",
      ],
      complement: [
        "J'ai retenu qu'une négociation bien préparée se joue avant l'appel : si je connais mon coût, je sais où je peux m'arrêter.",
        "Mettre une indexation gazole écrite dès le départ évite énormément de tensions en cours d'année.",
      ],
    },
    {
      titre: "Supervision des opérations de traction, groupage et camionnage, et traitement d'un litige",
      taches: [
        "Le matin, je supervisais l'arrivage messagerie : je récupérais les positions annoncées, je les affectais aux véhicules de distribution selon les secteurs, et j'ajustais quand un volume était plus important que prévu. J'optimisais les tournées de livraison et de ramasse pour limiter les kilomètres à vide, tout en respectant les amplitudes des conducteurs. Je contrôlais les bordereaux de groupage au départ pour vérifier que chaque envoi était bien affecté à la bonne traction et que rien ne restait sur le quai.",
        "J'ai eu à traiter une réclamation client pour une palette avariée à la livraison. J'ai récupéré la lettre de voiture avec les réserves du destinataire, les photos prises sur place et le relevé de température. J'ai ouvert le dossier litige, informé le service concerné et le sous-traitant, et j'ai fait la déclaration à l'assurance dans les délais. J'ai tenu le client informé par écrit à chaque étape. Le dossier s'est réglé par une indemnisation partielle conforme à la limitation CMR, et j'ai expliqué le calcul au client pour qu'il comprenne le montant retenu.",
        "J'ai également repris le suivi administratif des supports de charge : le compte palettes de deux clients dérivait depuis plusieurs mois. J'ai reconstitué les mouvements sur trois mois à partir des bons de livraison, j'ai identifié où les palettes n'étaient pas restituées, et j'ai mis en place un bon de consigne systématique. Le compte est revenu à l'équilibre en deux mois.",
      ],
      moyens: [
        "TMS et écrans de suivi d'arrivage, logiciel d'optimisation de tournées, bordereaux de groupage, lettres de voiture CMR, Excel pour le compte palettes, dossier litige avec pièces jointes photos, contacts assurance.",
        "Plateforme de suivi temps réel, téléphone d'exploitation, trame de réponse écrite au client, Convention CMR pour les règles de responsabilité et d'indemnisation.",
      ],
      complement: [
        "Sur un litige, le plus important c'est la trace : sans réserves écrites au moment de la livraison, le dossier est très difficile à défendre.",
        "Répondre vite au client, même pour dire que le dossier est en cours, désamorce la plupart des tensions.",
      ],
    },
  ],
  CCP3: [
    {
      titre: "Animation de l'équipe d'exploitation et suivi des obligations sociales",
      taches: [
        "J'animais un point hebdomadaire avec les conducteurs et l'équipe d'exploitation : retour sur les incidents de la semaine, rappel des consignes de sécurité, préparation de la semaine suivante. J'ai construit un tableau de suivi des formations réglementaires (FCO, ADR, SST) avec les dates d'échéance, pour anticiper les recyclages au lieu de les subir. J'ai proposé à ma hiérarchie un plan de formation sur l'éco-conduite, en argumentant sur l'économie de carburant attendue.",
        "J'ai participé à la préparation des éléments variables de paie : à partir des relevés d'activité et des données du chronotachygraphe, j'ai reconstitué les heures de service, les découchés, les repas et les heures supplémentaires de chaque conducteur, puis j'ai transmis le tableau au service paie en signalant deux écarts à vérifier avec les intéressés.",
        "Sur la partie qualité de vie au travail, j'ai remonté à la direction que deux conducteurs enchaînaient trop souvent les départs de nuit. Nous avons revu la rotation pour mieux répartir la contrainte, et j'ai constaté ensuite moins de retards de prise de service.",
      ],
      moyens: [
        "Tableau de suivi des habilitations et formations, données chronotachygraphe et logiciel de téléchargement des cartes, Excel pour les éléments variables de paie, convention collective des transports routiers, support de réunion.",
        "Planning d'équipe, comptes rendus de réunion, grille de suivi QVCT, échanges avec le service RH et le service paie.",
      ],
      complement: [
        "J'ai compris que les conducteurs acceptent beaucoup mieux les contraintes quand elles sont expliquées et réparties équitablement.",
        "Anticiper les recyclages réglementaires évite d'immobiliser un conducteur au pire moment.",
      ],
    },
    {
      titre: "Construction d'un tableau de bord d'exploitation et préconisation de mesures correctives",
      taches: [
        "J'ai construit sous Excel un tableau de bord mensuel de l'exploitation : chiffre d'affaires par client, coût kilométrique réel, consommation moyenne, taux de remplissage, taux de retour à vide, marge brute par trafic. J'ai comparé nos coûts aux indices professionnels de référence pour situer l'entreprise. L'analyse a montré qu'un trafic régulier était en dessous du seuil de rentabilité à cause de retours à vide systématiques.",
        "À partir de ce constat, j'ai préconisé trois mesures à ma direction : rechercher un fret retour sur la zone concernée, renégocier le tarif client avec un argumentaire chiffré, et regrouper deux départs par semaine au lieu de trois. Les deux premières mesures ont été retenues. Le trafic est repassé positif au bout de deux mois, avec un taux de retour à vide réduit d'environ un tiers.",
        "J'ai également mis en place un suivi hebdomadaire des litiges et des retards de livraison, avec une recherche de cause à chaque fois (5 pourquoi). Cela nous a permis de voir que la majorité des retards venaient d'un seul créneau de chargement mal calé chez un client, et nous avons décalé le rendez-vous.",
      ],
      moyens: [
        "Excel (tableaux croisés dynamiques, graphiques), extractions du TMS, indices CNR, données gazole, comptes d'exploitation transmis par la comptabilité, PowerPoint pour la présentation à la direction.",
        "Tableau de bord mensuel, fiche de préconisation écrite, réunions de suivi avec le responsable d'exploitation, méthode PDCA et 5 pourquoi.",
      ],
      complement: [
        "Un indicateur n'a de valeur que s'il débouche sur une action : c'est ce que j'ai retenu de cette expérience.",
        "Présenter des chiffres fiables à la direction change complètement la façon dont une proposition est reçue.",
      ],
    },
  ],
};

export function genDPGotrm(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx = 0,
): string {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const seed = seedOf(s);
  const ent = s?.entreprise?.trim()
    ? { nom: s.entreprise!, service: s.poste?.trim() || "Service exploitation transport", ville: s.commune || "" }
    : pick(ENTREPRISES, seed);
  const debut = getStagiaireDateDebut(s, f);
  const fin = getStagiaireDateFin(s, f);
  const dateDeclaration = debut ? formatDate(subtractBusinessDays(debut, 3)) : formatDate(f.dateDebut || "");
  const villeDecl = s?.commune || org.ville || "";
  const outils = pick(OUTILS, seed + 1);
  const collegues = pick(COLLEGUES, seed + 2);

  // Période d'exercice professionnelle (antérieure à la formation)
  const periodeDebut = debut ? new Date(debut) : new Date();
  const anneeFin = periodeDebut.getFullYear();
  const periodes = [
    `Du 1er mars ${anneeFin - 3} au 31 décembre ${anneeFin - 1}`,
    `Du 1er septembre ${anneeFin - 4} au 30 juin ${anneeFin - 1}`,
    `Du 2 janvier ${anneeFin - 2} au ${fin ? formatDate(fin) : "ce jour"}`,
    `Du 15 avril ${anneeFin - 3} au 30 novembre ${anneeFin - 1}`,
  ];

  const pied = (p: number, total: number) =>
    `<table class="pied-officiel" style="width:100%;border-collapse:collapse;font-size:8pt;margin-top:16px"><tr><td>DOSSIER PROFESSIONNEL – Version du 01/06/2016</td><td style="text-align:right">Page ${p}/${total}</td></tr></table>`;

  const pages: string[] = [];

  // ── Page 1 : page de garde officielle du DP
  pages.push(`<div style="text-align:center">
    <p style="font-size:11pt;letter-spacing:2px;margin-bottom:2px">MINISTÈRE CHARGÉ DE L'EMPLOI</p>
    <h1 style="margin-top:6px">DOSSIER PROFESSIONNEL (DP)</h1>
  </div>
  <table style="width:80%;margin:22px auto;border-collapse:collapse">
    <tr><th style="width:34%"><em>Nom de naissance</em></th><td>${s?.nom || ""}</td></tr>
    <tr><th><em>Nom d'usage</em></th><td>${s?.nom || ""}</td></tr>
    <tr><th><em>Prénom</em></th><td>${s?.prenom || ""}</td></tr>
    <tr><th><em>Adresse</em></th><td>${[s?.adresse, `${s?.codePostal || ""} ${s?.commune || ""}`.trim()].filter(Boolean).join("<br>")}</td></tr>
  </table>
  <div style="text-align:center;margin-top:18px">
    <p><strong>Titre professionnel visé</strong></p>
    <p>${GOTRM_TITRE.intitule}</p>
  </div>
  <p style="margin-top:22px"><strong>MODALITÉ D'ACCÈS :</strong></p>
  <p>${CHK(true)} Parcours de formation<br>${CHK(false)} Validation des Acquis de l'Expérience (VAE)</p>`);

  // ── Page 2 : présentation du dossier (texte officiel)
  pages.push(`<h2>Présentation du dossier</h2>
  <p>Le dossier professionnel (DP) constitue un élément du système de validation du titre professionnel. <strong>Ce titre est délivré par le Ministère chargé de l'emploi.</strong> Le DP appartient au candidat. Il le conserve, l'actualise durant son parcours et le présente <strong>obligatoirement à chaque session d'examen</strong>. Pour rédiger le DP, le candidat peut être aidé par un formateur ou par un accompagnateur VAE. Il est consulté par le jury au moment de la session d'examen.</p>
  <p><strong>Pour prendre sa décision, le jury dispose :</strong></p>
  <ol>
    <li>des résultats de la mise en situation professionnelle complétés, éventuellement, du questionnaire professionnel ou de l'entretien professionnel ou de l'entretien technique ou du questionnement à partir de productions ;</li>
    <li>du <strong>Dossier Professionnel</strong> (DP) dans lequel le candidat a consigné les preuves de sa pratique professionnelle ;</li>
    <li>des résultats des évaluations passées en cours de formation lorsque le candidat évalué est issu d'un parcours de formation ;</li>
    <li>de l'entretien final (dans le cadre de la session titre).</li>
  </ol>
  <p><em>[Arrêté du 22 décembre 2015, relatif aux conditions de délivrance des titres professionnels du ministère chargé de l'Emploi]</em></p>
  <p><strong>Ce dossier comporte :</strong></p>
  <p>▶ pour chaque activité-type du titre visé, un à trois exemples de pratique professionnelle ;<br>
  ▶ un tableau à renseigner si le candidat souhaite porter à la connaissance du jury la détention d'un titre, d'un diplôme, d'un certificat de qualification professionnelle (CQP) ou des attestations de formation ;<br>
  ▶ une déclaration sur l'honneur à compléter et à signer ;<br>
  ▶ des documents illustrant la pratique professionnelle du candidat (facultatif) ;<br>
  ▶ des annexes, si nécessaire.</p>`);

  // ── Page 3 : sommaire officiel
  pages.push(`<h2>Sommaire</h2>
  <p><strong>Exemples de pratique professionnelle</strong></p>
  ${GOTRM_CCP.map((ccp, i) => `<p><strong>Intitulé de l'activité-type n° ${i + 1}</strong> – ${ccp.libelle}<br>${(DP_EXEMPLES[ccp.code] || []).map((e, j) => `▶ Intitulé de l'exemple n° ${j + 1} : ${e.titre}`).join("<br>")}</p>`).join("")}
  <p><strong>Titres, diplômes, CQP, attestations de formation</strong> <em>(facultatif)</em></p>
  <p><strong>Déclaration sur l'honneur</strong></p>
  <p><strong>Documents illustrant la pratique professionnelle</strong> <em>(facultatif)</em></p>`);

  // ── Exemples de pratique professionnelle (une page par exemple, trame officielle)
  GOTRM_CCP.forEach((ccp, ci) => {
    const exemples = DP_EXEMPLES[ccp.code] || [];
    exemples.forEach((ex, ej) => {
      const tache = pick(ex.taches, seed + ci * 7 + ej * 3);
      const moyen = pick(ex.moyens, seed + ci * 5 + ej);
      const compl = pick(ex.complement, seed + ci * 11 + ej);
      const periode = pick(periodes, seed + ci * 2 + ej);
      pages.push(`<h2>Activité-type n° ${ci + 1} – ${ccp.libelle}</h2>
      <p><strong><em>Exemple n° ${ej + 1}</em></strong> ▶ ${ex.titre}</p>
      <p><strong>1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :</strong></p>
      <p>${tache}</p>
      <p><strong>2. Précisez les moyens utilisés :</strong></p>
      <p>${moyen}</p>
      <p><strong>3. Avec qui avez-vous travaillé ?</strong></p>
      <p>J'ai travaillé ${collegues}.</p>
      <table style="width:100%;border-collapse:collapse;font-size:10pt;margin-top:10px">
        <tr><th colspan="2" style="text-align:left">4. Contexte</th></tr>
        <tr><th style="width:38%">Nom de l'entreprise, organisme ou association ▶</th><td>${ent.nom}${ent.ville ? ` – ${ent.ville}` : ""}</td></tr>
        <tr><th>Chantier, atelier, service ▶</th><td>${ent.service}</td></tr>
        <tr><th>Période d'exercice ▶</th><td>${periode}</td></tr>
      </table>
      <p style="margin-top:10px"><strong>5. Informations complémentaires</strong> <em>(facultatif)</em></p>
      <p>${compl}</p>`);
    });
  });

  // ── Titres, diplômes, CQP
  const diplomes = [
    ["Baccalauréat professionnel Transport", "Ministère de l'Éducation nationale", `${anneeFin - 8}`],
    ["Attestation de formation à la sécurité (SST)", "Organisme habilité INRS", `${anneeFin - 2}`],
    ["Attestation de suivi – Réglementation sociale européenne (RSE)", org.nom, `${anneeFin - 1}`],
  ];
  const diplomesAlt = [
    ["Titre professionnel Conducteur routier de marchandises", "Ministère chargé de l'emploi", `${anneeFin - 9}`],
    ["FCO Marchandises", "Centre de formation agréé", `${anneeFin - 2}`],
    ["Attestation de formation – Utilisation d'un TMS", org.nom, `${anneeFin - 1}`],
  ];
  const listeDip = seed % 2 === 0 ? diplomes : diplomesAlt;
  pages.push(`<h2>Titres, diplômes, CQP, attestations de formation</h2>
  <p><em>(facultatif)</em></p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th><strong>Intitulé</strong></th><th><strong>Autorité ou organisme</strong></th><th><strong>Date</strong></th></tr>
    ${listeDip.map(d => `<tr><td>${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td></tr>`).join("")}
  </table>`);

  // ── Déclaration sur l'honneur (trame officielle)
  pages.push(`<h2>Déclaration sur l'honneur</h2>
  <p>Je ${g(s, "soussigné", "soussignée")} <strong>${s?.prenom || ""} ${s?.nom || ""}</strong>, déclare sur l'honneur que les renseignements fournis dans ce dossier sont exacts et que je suis ${g(s, "l'auteur", "l'auteure")} des réalisations jointes.</p>
  <p>Fait à ${villeDecl}, le ${dateDeclaration}, pour faire valoir ce que de droit.</p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt"><tr><th style="width:50%">Signature ${g(s, "du candidat", "de la candidate")}</th><td style="height:80px">${s?.signatureUrl ? `<img src="${s.signatureUrl}" alt="Signature ${s.prenom} ${s.nom}" style="max-height:70px" />` : ""}</td></tr></table>
  <p style="margin-top:14px;font-size:10pt"><strong>Documents illustrant la pratique professionnelle</strong> <em>(facultatif)</em> : offres commerciales et calculs de prix de revient anonymisés, extraits de plannings d'exploitation, cahier des charges de sous-traitance, tableau de bord d'exploitation.</p>
  <p style="font-size:10pt">Outils et environnement de travail mobilisés : ${outils}.</p>`);

  const total = pages.length;
  const body = pages
    .map((p, i) => `${p}${pied(i + 1, total)}`)
    .join(`<div class="page-break"></div>`);
  return htmlWrap(body);
}

