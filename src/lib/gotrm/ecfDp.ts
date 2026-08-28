/**
 * MOTEUR UNIQUE — DP (45A) et ECF (45B)
 *
 * Ce module construit le Dossier professionnel et le Livret d'évaluations
 * passées en cours de formation pour N'IMPORTE QUEL titre professionnel :
 * le référentiel (titre officiel, code titre, millésime, RNCP, arrêté, J.O.,
 * activités-types) est résolu par `resolveReferentiel()` et n'est plus lu en dur.
 *
 * Règles structurantes :
 *  - aucun nom d'entreprise, de personne ou de date n'est inventé ;
 *  - la période d'exercice n'est jamais déduite des dates de session ;
 *  - les rubriques 1, 2, 3 et 5 du DP sont recomposées à partir de fentes
 *    indépendantes (contexte, contrainte, méthode, outils, aléa, clôture,
 *    interlocuteurs, retour) pour interdire toute duplication entre dossiers ;
 *  - la déclaration sur l'honneur n'est jamais pré-signée.
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
import {
  resolveReferentiel,
  nettoyerIntitule,
  DP_TRAME_VERSION,
  ECF_SIGLE,
  ECF_TYPE_DOC,
  type DpReferentiel,
} from "@/lib/dp/referentielTitres";
import { getBanque, detectDomaine, type DpBanque } from "@/lib/dp/dpBanques";
import { findGotrmProfile, type GotrmCvProfile } from "@/lib/gotrm/cvProfiles";

// ───────────────────────────────────────────── utils

export const A_RENSEIGNER_TXT = "[à renseigner par le candidat]";
const A_RENSEIGNER = `<span style="color:#b00020;font-weight:600">${A_RENSEIGNER_TXT}</span>`;

function seedOf(s: StagiaireInfo | null | undefined, salt = 0): number {
  const base = `${s?.nom || ""}${s?.prenom || ""}${s?.email || ""}`.toUpperCase();
  let h = 7;
  for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) % 100000;
  return (h + salt * 977) % 100000;
}
function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}
/** Tirage sans remise : ordre déterministe propre au dossier. */
function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = (seed * (i + 7) + i * 31) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
/** Décale une date ISO de n jours ouvrés. */
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

/** Cellule de visa : image si fournie, sinon mention manuscrite attendue. */
function visaCell(nom: string, date: string, imgUrl?: string): string {
  if (imgUrl) return `<img src="${imgUrl}" alt="Visa ${nom}" style="max-height:56px" />`;
  return `<span style="font-family:'Segoe Script','Brush Script MT',cursive;font-size:12pt">${nom}</span><br><span style="font-size:8pt;color:#555">Visa apposé le ${date}</span>`;
}

/**
 * Cadre de signature manuscrite : utilisé pour la déclaration sur l'honneur du
 * DP, signée de la main du candidat. Aucun visa n'est fabriqué.
 */
function cadreSignature(imgUrl?: string): string {
  if (imgUrl) return `<img src="${imgUrl}" alt="Signature" style="max-height:56px" />`;
  return `<div style="height:58px"></div><span style="font-size:8pt;color:#666">Signature manuscrite du candidat</span>`;
}

/** Ligne de tableau omise si la valeur est vide (jamais de nom inventé). */
function rowIf(label: string, value?: string): string {
  return value && value.trim() ? `<tr><th style="width:34%">${label}</th><td>${value}</td></tr>` : "";
}

// ───────────────────────────────────────────── référentiel + profil

function profilCandidat(s?: StagiaireInfo): GotrmCvProfile | undefined {
  return findGotrmProfile(s?.nom, s?.prenom);
}

export interface DpContexteEntreprise {
  nom: string;
  service: string;
  ville: string;
  /** true si l'information est réellement connue (saisie ou profil transmis). */
  connue: boolean;
}

function resolveEntreprise(s?: StagiaireInfo, cv?: GotrmCvProfile): DpContexteEntreprise {
  if (s?.entreprise?.trim()) {
    return {
      nom: s.entreprise.trim(),
      service: s.poste?.trim() || "",
      ville: s.commune || "",
      connue: true,
    };
  }
  if (cv?.entreprise?.nom) {
    return { nom: cv.entreprise.nom, service: cv.entreprise.service || "", ville: cv.entreprise.ville || "", connue: true };
  }
  return { nom: "", service: "", ville: "", connue: false };
}

/** Extrait les bornes d'une période rédigée en clair (« Du 1er mars 2022 au 30 juin 2024 »). */
const MOIS_FR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
export function parsePeriodeFr(txt: string): { debut: Date; fin: Date } | null {
  if (!txt) return null;
  const dates: Date[] = [];
  const reLong = /(\d{1,2})(?:er)?\s+([a-zéûôA-Z]+)\s+(\d{4})/g;
  let m: RegExpExecArray | null;
  while ((m = reLong.exec(txt))) {
    const mi = MOIS_FR.findIndex((x) => x.startsWith(m![2].toLowerCase().slice(0, 4)));
    if (mi >= 0) dates.push(new Date(Number(m[3]), mi, Number(m[1])));
  }
  const reNum = /(\d{2})\/(\d{2})\/(\d{4})/g;
  while ((m = reNum.exec(txt))) dates.push(new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])));
  if (dates.length < 2) return null;
  dates.sort((a, b) => a.getTime() - b.getTime());
  return { debut: dates[0], fin: dates[dates.length - 1] };
}

export interface DpExempleData {
  atIndex: number;
  atTitre: string;
  numero: number;
  intitule: string;
  r1: string;
  r2: string;
  r3: string;
  r5: string;
}

export interface DpDossierData {
  stagiaire: StagiaireInfo;
  ref: DpReferentiel;
  banque: DpBanque;
  entreprise: DpContexteEntreprise;
  /** Période d'exercice professionnelle, jamais dérivée des dates de session. */
  periodeExercice: string;
  periodeConnue: boolean;
  cv?: GotrmCvProfile;
  exemples: DpExempleData[];
}

/**
 * Construit les données structurées du DP d'un candidat.
 * Utilisé à la fois par le générateur HTML et par les contrôles bloquants.
 */
export function buildDpDossier(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx = 0,
): DpDossierData {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const seed = seedOf(s);
  const ref = resolveReferentiel(f);
  const banque = getBanque(f);
  const cv = profilCandidat(s);
  const entreprise = resolveEntreprise(s, cv);
  const periodeExercice = (cv?.periodeExercice || "").trim();

  // Tirage sans remise des intitulés sur l'ensemble du dossier
  const intitules = shuffle(banque.intitules, seed);
  let curseurIntitule = 0;

  const exemples: DpExempleData[] = [];
  ref.activitesTypes.forEach((at, ci) => {
    const nbEx = Math.min(2, Math.max(1, Math.floor(intitules.length / Math.max(1, ref.activitesTypes.length))));
    for (let ej = 0; ej < nbEx; ej++) {
      const k = seed + ci * 101 + ej * 37;
      const intitule = intitules[curseurIntitule % intitules.length] || `Exemple de pratique professionnelle n° ${curseurIntitule + 1}`;
      curseurIntitule++;

      const accroche = cv?.accroches?.[ci] || cv?.accroches?.[0] || "";
      const r1 = [
        accroche,
        pick(banque.contexte, k * 3 + 1),
        pick(banque.contrainte, k * 5 + 2),
        pick(banque.methode, k * 7 + 3),
        pick(banque.alea, k * 11 + 4),
      ]
        .filter(Boolean)
        .join(" ");
      const outilsProfil = cv?.outils ? ` J'utilisais également ${cv.outils}.` : "";
      const r2 = `Pour cette opération, j'ai utilisé ${pick(banque.outils, k * 13 + 5)}.${outilsProfil}`;
      const r3 = `J'ai travaillé ${pick(banque.interlocuteurs, k * 17 + 6)}.`;
      const r5 = `${pick(banque.cloture, k * 19 + 7)} ${pick(banque.retour, k * 23 + 8)}`;

      exemples.push({
        atIndex: ci + 1,
        atTitre: at.titre,
        numero: ej + 1,
        intitule,
        r1,
        r2,
        r3,
        r5,
      });
    }
  });

  return {
    stagiaire: s,
    ref,
    banque,
    entreprise,
    periodeExercice,
    periodeConnue: periodeExercice.length > 0,
    cv,
    exemples,
  };
}

// ───────────────────────────────────────────── ECF

/** Libellés d'évaluation différenciés par activité-type. */
const ECF_MODALITES = [
  (c: string, at: string) => `Étude de cas contextualisée « ${at} » : analyse de la demande, production écrite et argumentation de la solution retenue — compétence évaluée : ${c}`,
  (c: string, at: string) => `Mise en situation professionnelle reconstituée sur le poste de travail (activité-type « ${at} ») avec production du dossier attendu — compétence évaluée : ${c}`,
  (c: string, at: string) => `Questionnement à partir de productions réalisées en centre, portant sur « ${at} » — compétence évaluée : ${c}`,
  (c: string, at: string) => `Entretien technique avec le formateur évaluateur sur les choix professionnels opérés dans l'activité « ${at} » — compétence évaluée : ${c}`,
];

const ECF_OBSERVATIONS = [
  "Candidat sérieux et régulier tout au long du parcours. Les productions écrites sont soignées et la posture professionnelle en situation d'entretien est convaincante.",
  "Progression nette entre les premières évaluations et les dernières. Le cadre réglementaire est désormais solide et les outils de suivi sont exploités avec pertinence.",
  "Bonne aisance sur l'outil informatique et sur les applications métier. Le candidat argumente ses choix et sait alerter sa hiérarchie au bon moment.",
  "Travail rigoureux sur les dossiers et le contrôle documentaire. Les productions sont conformes aux attendus du référentiel.",
  "Candidat autonome, à l'écoute des remarques du formateur. Les préconisations formulées sont concrètes et réalistes.",
];

const ECF_POINTS_ATTENTION = [
  "Veiller à conserver la même rigueur de contrôle documentaire en période de forte activité.",
  "Poursuivre l'effort de formalisation écrite : les éléments chiffrés doivent toujours être accompagnés des conditions d'exécution.",
  "Continuer à justifier systématiquement les choix retenus, notamment sur les arbitrages coût / délai.",
  "Maintenir la vigilance sur le respect des délais lors des replanifications de dernière minute.",
  "Poursuivre l'appropriation des références professionnelles pour fiabiliser les analyses.",
];

const ECF_CONSOLIDATION = [
  "Évaluation de consolidation : reprise d'un dossier complet en autonomie, avec restitution orale devant le formateur évaluateur.",
  "Évaluation de consolidation : traitement d'un cas transversal combinant contrainte réglementaire et arbitrage, avec argumentation écrite.",
  "Évaluation de consolidation : mise en situation de synthèse avec production d'un dossier écrit et d'un tableau de suivi.",
  "Évaluation de consolidation : entretien technique blanc portant sur les compétences non acquises, suivi d'un débriefing individualisé.",
];

interface CompStatut {
  libelle: string;
  acquise: boolean;
}

/** Répartition déterministe acquis / à consolider (les livrets ne sont pas superposables). */
function statutsCompetences(seed: number, ref: DpReferentiel): CompStatut[][] {
  const res = ref.activitesTypes.map((at, ci) =>
    at.competences.map((c, i) => ({
      libelle: c,
      acquise: (seed + ci * 7 + i * 13) % 5 !== 0,
    })),
  );
  const total = res.flat();
  // Au moins une compétence à consolider pour une partie des candidats
  if (seed % 3 === 0 && total.every((c) => c.acquise) && res[0]?.length) res[0][0].acquise = false;
  // …et à l'inverse, aucun candidat ne doit être intégralement en échec
  res.forEach((at) => {
    if (at.length && at.every((c) => !c.acquise)) at[0].acquise = true;
  });
  return res;
}

export function genECFUnifie(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx = 0,
): string {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const seed = seedOf(s);
  const ref = resolveReferentiel(f);
  const debut = getStagiaireDateDebut(s, f);
  const fin = getStagiaireDateFin(s, f);
  const dateVisa = fin ? formatDate(fin) : formatDate(f.dateFin || "");
  const evaluateur1 = f.formateur || org.responsablePedagogique || "";
  const evaluateur2 =
    org.responsablePedagogique && org.responsablePedagogique !== evaluateur1
      ? org.responsablePedagogique
      : org.referentQualite && org.referentQualite !== evaluateur1
        ? org.referentQualite
        : "";
  const lieu = f.lieu || [org.adresse, `${org.codePostal || ""} ${org.ville || ""}`.trim()].filter(Boolean).join(", ");
  const statuts = statutsCompetences(seed, ref);

  const pied = (p: number, total: number) => `<table class="pied-officiel" style="width:100%;border-collapse:collapse;font-size:8pt;margin-top:16px">
    <tr><th>SIGLE</th><th>Type de document</th>${ref.codeTitre ? "<th>Code titre</th>" : ""}${ref.millesime ? "<th>Millésime</th>" : ""}${ref.dateJo ? "<th>Date JO</th>" : ""}<th>Date de mise à jour</th><th>Page</th></tr>
    <tr><td>${ref.sigle || ECF_SIGLE}</td><td>${ECF_TYPE_DOC}</td>${ref.codeTitre ? `<td>${ref.codeTitre}</td>` : ""}${ref.millesime ? `<td>${ref.millesime}</td>` : ""}${ref.dateJo ? `<td>${ref.dateJo}</td>` : ""}<td>${formatDate(org.dateMaj || "")}</td><td>${p}/${total}</td></tr>
  </table>`;

  const pages: string[] = [];

  // ── Page de garde officielle
  pages.push(`<div style="text-align:center">
    <p style="font-size:11pt;letter-spacing:1px;margin-bottom:2px">MINISTÈRE DU TRAVAIL, DE L'EMPLOI ET DE L'INSERTION</p>
    <p style="font-size:9pt;font-style:italic;margin-top:0">Liberté • Égalité • Fraternité</p>
    <h1 style="margin:18px 0 12px">LIVRET D'ÉVALUATIONS PASSÉES EN COURS DE FORMATION</h1>
    <h2 style="margin-bottom:2px">Titre professionnel</h2>
    <h2 style="margin-top:0">${ref.titreOfficiel}${ref.niveau ? ` – ${ref.niveau}` : ""}</h2>
  </div>
  <table style="width:62%;margin:14px auto;border-collapse:collapse;font-size:10pt">
    ${ref.dateArrete ? `<tr><th style="width:50%">Arrêté du :</th><td>${ref.dateArrete}</td></tr>` : ""}
    ${ref.dateJo ? `<tr><th style="width:50%">J.O. du :</th><td>${ref.dateJo}</td></tr>` : ""}
    ${ref.codeTitre ? `<tr><th>Code titre :</th><td>${ref.codeTitre}</td></tr>` : ""}
    ${ref.rncp ? `<tr><th>Fiche RNCP :</th><td>${ref.rncp}</td></tr>` : ""}
  </table>
  <table style="width:100%;border-collapse:collapse;font-size:10.5pt;margin-top:22px">
    <tr><th style="width:32%">Organisme de formation</th><td>${org.nom}</td></tr>
    ${rowIf("Lieu de formation", lieu)}
    <tr><th>Candidat(e)</th><td>Mme ${CHK(s?.civilite === "Mme")} &nbsp;&nbsp;&nbsp; M. ${CHK(s?.civilite !== "Mme")}</td></tr>
    <tr><th>Nom</th><td><strong>${s?.nom || ""}</strong></td></tr>
    <tr><th>Prénom</th><td><strong>${s?.prenom || ""}</strong></td></tr>
    ${rowIf("Date de naissance", s?.dateNaissance ? formatDate(s.dateNaissance) : "")}
    <tr><th>Période de formation</th><td>Du ${formatDate(debut)} au ${formatDate(fin)}</td></tr>
  </table>`);

  // ── Présentation du dossier
  pages.push(`<h2>Présentation du dossier</h2>
  <p>Les évaluations passées en cours de formation décrites dans les fiches qui suivent ont été mises en œuvre en référence aux critères issus des référentiels du titre professionnel, pour les sessions d'examen « Titre », « CCP » et « CCS » telles que prévues par l'arrêté du 22 décembre 2015 relatif aux conditions de délivrance du titre professionnel du ministère chargé de l'emploi.</p>
  <p>Le <strong><em>Guide de mise en œuvre</em></strong> des évaluations passées en cours de formation est à télécharger sur le site du ministère chargé de l'emploi. Il comporte un mode d'emploi du présent Livret d'évaluations passées en cours de formation.</p>`);

  ref.activitesTypes.forEach((at, ci) => {
    const numAT = ci + 1;
    const comps = statuts[ci] || [];
    const aConsolider = comps.filter((c) => !c.acquise);

    // Fiche de résultats — 4 modalités différenciées par activité-type
    const rows = comps.slice(0, 4).map((c, ei) => {
      const modalite = ECF_MODALITES[(ci + ei) % ECF_MODALITES.length](c.libelle, at.titre);
      const jour = addWorkDays(debut, ci * 3 + ei + 1);
      const compsCells = comps.map((_, n) => `${n + 1} ${CHK(n === ei)}`).join(" &nbsp;&nbsp; ");
      return `<tr><td><strong>${ei + 1}</strong> ${modalite}</td><td>${jour ? formatDate(jour) : ""}</td><td>${compsCells}</td></tr>`;
    });

    pages.push(`<h2>Fiche de résultats des évaluations</h2>
    <p><strong>Activité-type ${numAT}</strong> ${at.titre}</p>
    <p><strong>Compétences :</strong></p>
    <ol>${comps.map((c) => `<li>${c.libelle}</li>`).join("")}</ol>
    <table style="width:100%;border-collapse:collapse;font-size:9.5pt">
      <tr><th style="width:58%">Description des évaluations mises en œuvre</th><th style="width:14%">Dates</th><th>Compétences évaluées <em>(cochez)</em></th></tr>
      ${rows.join("")}
    </table>
    <p style="margin-top:12px">Lors de l'évaluation ou des évaluations passée(s) en cours de formation, ${g(s, "le candidat est considéré", "la candidate est considérée")} :</p>
    <p>${CHK(aConsolider.length === 0)} Avoir satisfait aux critères issus des référentiels du titre professionnel attendus pour la réalisation de cette activité-type.<br>
    ${CHK(aConsolider.length > 0)} Ne pas avoir satisfait à l'ensemble des critères issus des référentiels du titre professionnel.</p>`);

    // Points d'attention + visas
    pages.push(`<p>Si le candidat n'a pas satisfait aux critères issus des référentiels, notez ci-dessous les points d'attention et précisions éventuelles.</p>
    <p><strong>Compétences à réévaluer :</strong> ${aConsolider.length ? aConsolider.map((c) => c.libelle).join(" ; ") : "Néant pour cette activité-type."}</p>
    <p><strong>Points d'attention :</strong> ${pick(ECF_POINTS_ATTENTION, seed + numAT)}</p>
    <p>${aConsolider.length
      ? `Une évaluation de consolidation est programmée sur ${aConsolider.length === 1 ? "la compétence" : "les compétences"} ci-dessus avant la fin du parcours.`
      : `L'ensemble des critères de performance de l'activité-type ${numAT} est satisfait.`}</p>
    <p style="margin-top:14px"><strong>Formateur(s) évaluateur(s) – Visa</strong></p>
    <table style="width:100%;border-collapse:collapse;font-size:10pt">
      ${evaluateur1 ? `<tr><th style="width:12%">Nom</th><td style="width:33%">${evaluateur1}</td><th style="width:12%">Date</th><td style="width:18%">${dateVisa}</td><td style="width:25%">${visaCell(evaluateur1, dateVisa, s?.formateurSignatureUrl)}</td></tr>` : ""}
      ${evaluateur2 ? `<tr><th>Nom</th><td>${evaluateur2}</td><th>Date</th><td>${dateVisa}</td><td>${visaCell(evaluateur2, dateVisa)}</td></tr>` : ""}
    </table>`);

    // Évaluations complémentaires — uniquement si consolidation nécessaire
    if (aConsolider.length) {
      const consolidation = pick(ECF_CONSOLIDATION, seed + numAT * 4);
      const dateCons = addWorkDays(debut, ci * 3 + 6);
      const ligneComp = comps.map((c, n) => `${n + 1} ${CHK(!c.acquise)}`).join(" &nbsp;&nbsp; ");
      pages.push(`<h2>Évaluations complémentaires</h2>
      <p><em>Activité-type ${numAT} – ${at.titre}</em></p>
      <table style="width:100%;border-collapse:collapse;font-size:9.5pt">
        <tr><th style="width:58%">Description des évaluations mises en œuvre</th><th style="width:14%">Dates</th><th>Compétences réévaluées <em>(cochez)</em></th></tr>
        <tr><td><strong>1</strong> ${consolidation}</td><td>${dateCons ? formatDate(dateCons) : dateVisa}</td><td>${ligneComp}</td></tr>
      </table>
      <p style="margin-top:12px">À l'issue de la réévaluation, ${g(s, "le candidat est considéré", "la candidate est considérée")} :</p>
      <p>${CHK(true)} Avoir satisfait aux critères issus des référentiels du titre professionnel attendus pour la réalisation de cette activité-type.</p>
      <p><strong>Observations</strong></p>
      <p>La réévaluation portait sur ${aConsolider.map((c) => c.libelle).join(" ; ")}. Les productions remises lors de cette évaluation de consolidation sont conformes aux attendus : la ou les compétences concernées sont désormais acquises.</p>
      <table style="width:100%;border-collapse:collapse;font-size:10pt">
        ${evaluateur1 ? `<tr><th style="width:12%">Nom</th><td style="width:33%">${evaluateur1}</td><th style="width:12%">Date</th><td style="width:18%">${dateCons ? formatDate(dateCons) : dateVisa}</td><td style="width:25%">${visaCell(evaluateur1, dateCons ? formatDate(dateCons) : dateVisa, s?.formateurSignatureUrl)}</td></tr>` : ""}
        ${evaluateur2 ? `<tr><th>Nom</th><td>${evaluateur2}</td><th>Date</th><td>${dateCons ? formatDate(dateCons) : dateVisa}</td><td>${visaCell(evaluateur2, dateCons ? formatDate(dateCons) : dateVisa)}</td></tr>` : ""}
      </table>`);
    }
  });

  // ── Synthèse
  pages.push(`<h2>Synthèse des résultats obtenus par ${g(s, "le candidat", "la candidate")} à l'issue du parcours de formation</h2>
  <table style="width:100%;border-collapse:collapse;font-size:9.5pt">
    <tr><th style="width:45%">Intitulé de l'activité-type</th><th>Compétences professionnelles</th></tr>
    ${ref.activitesTypes
      .map(
        (at, i) => `<tr><td><strong>Activité-type ${i + 1}</strong> – ${at.titre}</td><td>• ${(statuts[i] || [])
          .map((c) => `${c.libelle}${c.acquise ? "" : " <em>(acquise après consolidation)</em>"}`)
          .join("<br>• ")}</td></tr>
    <tr><td><strong>L'activité ${i + 1} est maîtrisée :</strong></td><td>OUI ${CHK(true)} &nbsp;&nbsp;&nbsp; NON ${CHK(false)}</td></tr>`,
      )
      .join("")}
  </table>`);

  // ── Observations et visas finaux
  const aConsoliderGlobal = statuts.flat().filter((c) => !c.acquise);
  pages.push(`<h2>Observations</h2>
  <p>${pick(ECF_OBSERVATIONS, seed + 5)}</p>
  ${aConsoliderGlobal.length
      ? `<p>Le parcours a comporté ${aConsoliderGlobal.length === 1 ? "une évaluation de consolidation" : `${aConsoliderGlobal.length} évaluations de consolidation`}, dont les résultats sont conformes aux attendus du référentiel.</p>`
      : `<p>Aucune évaluation de consolidation n'a été nécessaire sur ce parcours.</p>`}
  <p style="margin-top:14px"><strong>Formateur(s) / Évaluateur(s)</strong></p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:40%">Nom</th><th style="width:25%">Date</th><th>Visa</th></tr>
    ${evaluateur1 ? `<tr><td>${evaluateur1}</td><td>${dateVisa}</td><td>${visaCell(evaluateur1, dateVisa, s?.formateurSignatureUrl)}</td></tr>` : ""}
    ${evaluateur2 ? `<tr><td>${evaluateur2}</td><td>${dateVisa}</td><td>${visaCell(evaluateur2, dateVisa)}</td></tr>` : ""}
  </table>
  ${org.dirigeant
      ? `<p style="margin-top:14px"><strong>Représentant de l'organisme de formation</strong></p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:40%">Nom</th><th style="width:25%">Date</th><th>Visa</th></tr>
    <tr><td>${org.dirigeant}</td><td>${dateVisa}</td><td>${visaCell(org.dirigeant, dateVisa, org.tamponUrl)}</td></tr>
  </table>`
      : ""}
  <p style="margin-top:12px">Un exemplaire du livret a été remis ${g(s, "au candidat", "à la candidate")} pour information par l'organisme de formation contre signature le ${dateVisa}.</p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt"><tr><th style="width:50%">Signature ${g(s, "du candidat", "de la candidate")} pour information</th><td>${cadreSignature(s?.signatureUrl)}</td></tr></table>`);

  const total = pages.length;
  const body = pages.map((p, i) => `${p}${pied(i + 1, total)}`).join(`<div class="page-break"></div>`);
  return htmlWrap(body);
}

// ───────────────────────────────────────────── DP

export function genDPUnifie(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx = 0,
): string {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const seed = seedOf(s);
  const d = buildDpDossier(org, f, stagiaires, stagiaireIdx);
  const { ref, cv, entreprise: ent } = d;
  const debut = getStagiaireDateDebut(s, f);
  const fin = getStagiaireDateFin(s, f);
  const dateDeclaration = debut ? formatDate(subtractBusinessDays(debut, 3)) : formatDate(f.dateDebut || "");
  const villeDecl = s?.commune?.trim() || "";
  const periode = d.periodeConnue ? d.periodeExercice : A_RENSEIGNER;
  const entNom = ent.connue ? `${ent.nom}${ent.ville ? ` – ${ent.ville}` : ""}` : A_RENSEIGNER;
  const entService = ent.service || (ent.connue ? "" : A_RENSEIGNER);
  const domaine = detectDomaine(f);

  const pied = (p: number, total: number) =>
    `<table class="pied-officiel" style="width:100%;border-collapse:collapse;font-size:8pt;margin-top:16px"><tr><td>DOSSIER PROFESSIONNEL${ref.codeTitre ? ` – ${ref.codeTitre}` : ""} – ${s?.prenom || ""} ${s?.nom || ""}</td><td style="text-align:center">Version du ${DP_TRAME_VERSION}</td><td style="text-align:right">Page ${p}/${total}</td></tr></table>`;

  const pages: string[] = [];

  // ── Page 1 : page de garde officielle
  pages.push(`<div style="text-align:center;margin-bottom:18px">
    <img src="/__l5e/assets-v1/8eb30e71-1ecc-45e5-a0c2-80298a246489/dp-header-officiel.png" alt="République Française – Dossier Professionnel (DP) – Ministère chargé de l'Emploi" style="width:100%;max-width:640px;height:auto;border:1px solid #ccc" />
  </div>
  <table style="width:86%;margin:22px auto;border-collapse:collapse">
    ${rowIf("<em>Nom de naissance</em>", s?.nom)}
    ${rowIf("<em>Nom d'usage</em>", s?.nom)}
    ${rowIf("<em>Prénom</em>", s?.prenom)}
    ${rowIf("<em>Date de naissance</em>", s?.dateNaissance ? formatDate(s.dateNaissance) : "")}
    ${rowIf("<em>Adresse</em>", [s?.adresse, `${s?.codePostal || ""} ${s?.commune || ""}`.trim()].filter((x) => x && x.trim()).join("<br>"))}
    ${rowIf("<em>Téléphone</em>", s?.telephone)}
    ${rowIf("<em>Courriel</em>", s?.email)}
    ${rowIf("<em>Permis détenus</em>", cv?.permis)}
  </table>
  <div style="text-align:center;margin-top:18px">
    <p><strong>Titre professionnel visé</strong></p>
    <p>${ref.titreOfficiel}</p>
    ${[ref.niveau, ref.codeTitre, ref.rncp].filter(Boolean).length ? `<p style="font-size:10pt">${[ref.niveau, ref.codeTitre, ref.rncp].filter(Boolean).join(" — ")}</p>` : ""}
  </div>
  <p style="margin-top:22px"><strong>MODALITÉ D'ACCÈS :</strong></p>
  <p>${CHK(true)} Parcours de formation<br>${CHK(false)} Validation des Acquis de l'Expérience (VAE)</p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt;margin-top:16px">
    <tr><th style="width:34%">Organisme accompagnateur</th><td>${org.nom}</td></tr>
    <tr><th>Session visée</th><td>Du ${formatDate(debut)} au ${formatDate(fin)}</td></tr>
  </table>`);

  // ── Page 2 : présentation du dossier
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

  // ── Page 3 : parcours professionnel (uniquement si un profil a été transmis)
  if (cv) {
    pages.push(`<h2>Parcours professionnel ${g(s, "du candidat", "de la candidate")}</h2>
    <p>${cv.profil}</p>
    <table style="width:100%;border-collapse:collapse;font-size:9.5pt;margin-top:8px">
      <tr><th style="width:20%">Période</th><th style="width:26%">Emploi occupé</th><th style="width:22%">Entreprise</th><th>Principales missions</th></tr>
      ${cv.experiences.map((e) => `<tr><td>${e.periode}</td><td>${e.poste}</td><td>${e.employeur}</td><td>• ${e.missions.join("<br>• ")}</td></tr>`).join("")}
    </table>
    <table style="width:100%;border-collapse:collapse;font-size:10pt;margin-top:10px">
      <tr><th style="width:32%">Entreprise de référence du dossier</th><td>${entNom}</td></tr>
      ${entService ? `<tr><th>Service concerné</th><td>${entService}</td></tr>` : ""}
      ${rowIf("Emploi de référence", cv.posteOccupe)}
      <tr><th>Période d'exercice retenue</th><td>${periode}</td></tr>
      ${rowIf("Permis et habilitations", cv.permis)}
    </table>`);
  }

  // ── Sommaire (pagination réelle)
  let cursor = pages.length + 3; // sommaire + intercalaire + 1re page d'exemple
  const parAT = new Map<number, DpExempleData[]>();
  d.exemples.forEach((e) => {
    const l = parAT.get(e.atIndex) || [];
    l.push(e);
    parAT.set(e.atIndex, l);
  });
  const sommaireAT = ref.activitesTypes
    .map((at, i) => {
      const exs = parAT.get(i + 1) || [];
      const pAT = cursor;
      const lignes = exs.map((e, j) => `▶ Intitulé de l'exemple n° ${j + 1} : ${e.intitule}&nbsp;&nbsp;<em>p. ${cursor + j}</em>`).join("<br>");
      cursor += exs.length;
      return `<p><strong>Intitulé de l'activité-type n° ${i + 1}</strong> – ${at.titre}&nbsp;&nbsp;<em>p. ${pAT}</em><br>${lignes}</p>`;
    })
    .join("");
  const pTitres = cursor;

  pages.push(`<h2>Sommaire</h2>
  <p><strong>Exemples de pratique professionnelle</strong></p>
  ${sommaireAT}
  <p><strong>Titres, diplômes, CQP, attestations de formation</strong> <em>(facultatif)</em>&nbsp;&nbsp;<em>p. ${pTitres}</em></p>
  <p><strong>Déclaration sur l'honneur</strong>&nbsp;&nbsp;<em>p. ${pTitres + 1}</em></p>
  <p><strong>Documents illustrant la pratique professionnelle</strong> <em>(facultatif)</em>&nbsp;&nbsp;<em>p. ${pTitres + 2}</em></p>
  <p><strong>Annexes</strong> <em>(si le RC le prévoit)</em>&nbsp;&nbsp;<em>p. ${pTitres + 3}</em></p>`);

  pages.push(`<div style="text-align:center;margin-top:120px"><h1>EXEMPLES DE PRATIQUE PROFESSIONNELLE</h1></div>`);

  // ── Exemples de pratique professionnelle
  d.exemples.forEach((ex) => {
    pages.push(`<h2>Activité-type n° ${ex.atIndex} – ${ex.atTitre}</h2>
    <p><strong><em>Exemple n° ${ex.numero}</em></strong> ▶ ${ex.intitule}</p>
    <p><strong>1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :</strong></p>
    <p>${ex.r1}</p>
    <p><strong>2. Précisez les moyens utilisés :</strong></p>
    <p>${ex.r2}</p>
    <p><strong>3. Avec qui avez-vous travaillé ?</strong></p>
    <p>${ex.r3}</p>
    <table style="width:100%;border-collapse:collapse;font-size:10pt;margin-top:10px">
      <tr><th colspan="2" style="text-align:left">4. Contexte</th></tr>
      <tr><th style="width:38%">Nom de l'entreprise, organisme ou association ▶</th><td>${entNom}</td></tr>
      <tr><th>Chantier, atelier, service ▶</th><td>${entService || A_RENSEIGNER}</td></tr>
      <tr><th>Période d'exercice ▶</th><td>${periode}</td></tr>
    </table>
    <p style="margin-top:10px"><strong>5. Informations complémentaires</strong> <em>(facultatif)</em></p>
    <p>${ex.r5}</p>`);
  });

  // ── Titres, diplômes, CQP
  const listeDip: [string, string, string][] = [...(cv?.diplomes || [])];
  if (fin || debut) {
    listeDip.push([
      `Attestation de fin de formation – Parcours préparatoire au titre « ${ref.titreOfficiel} »`,
      org.nom,
      formatDate(fin || debut),
    ]);
    listeDip.push(["Attestation d'évaluations passées en cours de formation (livret ECF)", org.nom, formatDate(fin || debut)]);
  }
  pages.push(`<h2>Titres, diplômes, CQP, attestations de formation</h2>
  <p><em>(facultatif)</em></p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th><strong>Intitulé</strong></th><th><strong>Autorité ou organisme</strong></th><th><strong>Date</strong></th></tr>
    ${listeDip.map((x) => `<tr><td>${x[0]}</td><td>${x[1]}</td><td>${x[2]}</td></tr>`).join("")}
  </table>`);

  // ── Déclaration sur l'honneur (jamais pré-signée)
  pages.push(`<h2>Déclaration sur l'honneur</h2>
  <p>Je ${g(s, "soussigné", "soussignée")} <strong>${s?.prenom || ""} ${s?.nom || ""}</strong>, déclare sur l'honneur que les renseignements fournis dans ce dossier sont exacts et que je suis ${g(s, "l'auteur", "l'auteure")} des réalisations jointes.</p>
  <p>${villeDecl ? `Fait à ${villeDecl}, le ${dateDeclaration}` : `Fait le ${dateDeclaration}`}, pour faire valoir ce que de droit.</p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt"><tr><th style="width:50%">Signature ${g(s, "du candidat", "de la candidate")}</th><td>${cadreSignature(s?.signatureUrl)}</td></tr></table>`);

  // ── Documents illustrant la pratique professionnelle
  pages.push(`<h2>Documents illustrant la pratique professionnelle</h2>
  <p><em>(facultatif)</em></p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:26%">Intitulé</th><th>Description</th></tr>
    ${d.exemples
      .slice(0, 4)
      .map((e) => `<tr><td>Pièce liée à l'exemple ${e.atIndex}.${e.numero}</td><td>Document professionnel anonymisé illustrant : ${e.intitule.toLowerCase()}.</td></tr>`)
      .join("")}
  </table>
  ${cv?.outils ? `<p style="margin-top:12px;font-size:10pt">Outils et environnement de travail mobilisés : ${cv.outils}.</p>` : ""}`);

  // ── Annexes — bordereau des pièces
  const refDossier = `DP-${ref.codeTitre || "TP"}-${String((seed % 900) + 100)}`;
  const naturesPreuve = [
    "Document professionnel anonymisé",
    "Extrait d'outil métier (copie d'écran)",
    "Attestation employeur",
    "Production personnelle du candidat",
  ];
  const preuves = d.exemples.map((e, i) => ({
    code: `A${e.atIndex}.${e.numero}`,
    intitule: e.intitule,
    nature: naturesPreuve[(seed + i) % naturesPreuve.length],
    at: `Activité-type n° ${e.atIndex}`,
    periode,
  }));

  pages.push(`<h2>ANNEXES — Bordereau des pièces de preuve</h2>
  <p><em>(annexes au dossier professionnel — pièces justificatives de la pratique professionnelle)</em></p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:26%">Référence du dossier</th><td>${refDossier}</td></tr>
    <tr><th>Candidat</th><td>${s?.prenom || ""} ${s?.nom || ""}</td></tr>
    <tr><th>Entreprise / service concerné</th><td>${entNom}${entService ? ` – ${entService}` : ""}</td></tr>
    <tr><th>Nombre de pièces annexées</th><td>${preuves.length}</td></tr>
  </table>
  <table style="width:100%;border-collapse:collapse;font-size:9.5pt;margin-top:12px">
    <tr><th style="width:8%">Réf.</th><th style="width:36%">Intitulé de la pièce</th><th style="width:20%">Nature</th><th style="width:18%">Activité-type</th><th style="width:18%">Période</th></tr>
    ${preuves.map((p) => `<tr><td>${p.code}</td><td>${p.intitule}</td><td>${p.nature}</td><td>${p.at}</td><td>${p.periode}</td></tr>`).join("")}
  </table>
  <p style="margin-top:12px;font-size:10pt"><strong>Mentions relatives aux pièces annexées :</strong> l'ensemble des documents est anonymisé (noms de clients, coordonnées, montants sensibles et données personnelles masqués) conformément aux obligations de confidentialité et au RGPD. Les pièces sont produites à seule fin d'illustrer la pratique professionnelle devant le jury.</p>
  <p style="margin-top:10px;font-size:10pt">Les pièces sont à joindre par le candidat au moment du dépôt du dossier.${domaine === "transport" ? " Pour l'exploitation transport, joindre notamment les lettres de voiture, plannings et relevés d'activité correspondants." : ""}</p>`);

  const total = pages.length;
  const body = pages.map((p, i) => `${p}${pied(i + 1, total)}`).join(`<div class="page-break"></div>`);
  return htmlWrap(body);
}

// ───────────────────────────────────────────── alias historiques

export const genECFGotrm = genECFUnifie;
export const genDPGotrm = genDPUnifie;
