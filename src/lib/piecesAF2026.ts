/**
 * Pièces AF générées à partir des données saisies, en remplacement des pièces
 * de tiers qui étaient fabriquées (factures, certificats, captures, bail,
 * attestations d'autres organismes) : IND 17, 18, 21, 23, 25, 26, 28.
 *
 * Règle : l'organisme décrit ce qu'il met en œuvre (document de l'OF) ; toute
 * pièce émise par un tiers (facture, diplôme, bail, capture) est listée comme
 * justificatif à joindre, jamais inventée.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, subtractBusinessDays } from "./docBuilder";
import { getFormationDays, type FormateurInfo } from "./sampleData";
import { REFERENCES_REGLEMENTAIRES_2026 } from "./qualite2026";

const v = (x: unknown) => (x == null ? "" : String(x).trim());

function dateMajFr(o: OrganismeInfo): string {
  return v(o.dateMaj) ? formatDate(o.dateMaj) : formatDate(new Date().toISOString().slice(0, 10));
}

function isoMaj(o: OrganismeInfo): string {
  return v(o.dateMaj) || new Date().toISOString().slice(0, 10);
}

/** Intervenants réels : formateur de la formation, formateurs affectés aux stagiaires, sinon dirigeant. */
export function intervenantsReels(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[]): string[] {
  const set = new Map<string, string>();
  const add = (n?: string) => { const t = v(n); if (t) set.set(t.toLowerCase().replace(/\s+/g, " "), t); };
  add(f?.formateur);
  (stagiaires || []).forEach((s) => add(s.formateur));
  if (set.size === 0) add(o.responsablePedagogique || o.dirigeant);
  return [...set.values()];
}

/**
 * Fiches formateur construites à partir des intervenants réels (remplace SAMPLE_FORMATEURS,
 * qui faisait sortir « Philippe Martin — formapro-excellence.fr » dans tous les dossiers).
 * Diplômes et expérience ne sont jamais inventés : ils renvoient aux justificatifs à joindre.
 */
export function formateursReels(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[]): FormateurInfo[] {
  return intervenantsReels(o, f, stagiaires).map((nomComplet) => {
    const parts = nomComplet.split(/\s+/);
    return {
      prenom: parts.length > 1 ? parts.slice(0, -1).join(" ") : nomComplet,
      nom: parts.length > 1 ? parts[parts.length - 1] : "",
      specialite: v(f?.intitule) || v(o.domainesFormation) || "Formation professionnelle",
      diplomes: "Diplômes et certifications : copies jointes au dossier de l'intervenant",
      experience: "Expérience professionnelle : voir CV daté et signé joint au dossier",
      email: v(o.email),
    };
  });
}

export function estDirigeant(o: OrganismeInfo, nom: string): boolean {
  const n = (x: string) => x.trim().toLowerCase().replace(/\s+/g, " ");
  return !!v(o.dirigeant) && n(o.dirigeant) === n(nom);
}

function modalite(f?: FormationInfo): "distanciel" | "presentiel" | "mixte" {
  const m = (f?.modalites || "").toLowerCase();
  if (m.includes("mixte") || (m.includes("distanciel") && /pr[ée]sentiel/.test(m))) return "mixte";
  if (m.includes("distanciel") || m.includes("foad") || m.includes("e-learning")) return "distanciel";
  return "presentiel";
}

/** Pièce émise par un tiers : jamais générée, remplacée par la liste des justificatifs à joindre. */
export function genPieceAFournir(o: OrganismeInfo, titre: string, justificatifs: string[], note?: string): string {
  return buildDocument({
    org: o,
    title: titre,
    subtitle: "Pièce justificative à joindre par l'organisme",
    sections: [
      { heading: "Nature de la pièce", content: `<p>Cette preuve est émise par un tiers (fournisseur, bailleur, organisme de formation, certificateur…). Elle ne peut pas être produite par le générateur : l'original doit être joint au dossier par ${o.nom}.</p>${note ? `<p>${note}</p>` : ""}` },
      { heading: "Justificatifs acceptés", content: `<ul>${justificatifs.map((j) => `<li>${j}</li>`).join("")}</ul>`, variant: "orange" },
    ],
  });
}

// ─── IND 17 ─────────────────────────────────────────────────────────────────

export function genMoyensEnvironnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const m = modalite(f);
  const outils = v(o.outilsUtilises) || "Google Meet, Zoom, messagerie électronique";
  const intervenants = intervenantsReels(o, f, stagiaires);
  const adresse = [v(o.adresse), [v(o.codePostal), v(o.ville)].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const rows: string[][] = [
    ["Moyens humains", intervenants.map((n) => `${n}${estDirigeant(o, n) ? " (dirigeant)" : ""}`).join(", ") + ` — responsable pédagogique : ${o.responsablePedagogique || o.dirigeant} ; référent handicap : ${o.referentHandicap || o.dirigeant}`, "CV et diplômes des intervenants (IND 21)"],
  ];
  if (m !== "presentiel") {
    rows.push(["Outils de formation à distance", outils, "Abonnements ou comptes des outils utilisés"]);
    rows.push(["Assistance technique et pédagogique (art. D.6313-3-1)", `Assistance par ${o.email || "courriel"}${o.telephone?.trim() ? ` et au ${o.telephone}` : ""}, réponse sous 24 h ouvrées ; test de connexion avant la première séance`, "Procédure d'assistance, mail d'aide à la connexion"]);
    rows.push(["Équipement demandé au stagiaire", "Ordinateur avec micro et caméra, connexion internet stable, navigateur à jour", "Mentionné dans la convocation"]);
  }
  if (m !== "distanciel") {
    rows.push(["Locaux", v(f.lieu) && !/meet|zoom|distance/i.test(f.lieu) ? f.lieu : adresse || "Lieu indiqué dans la convocation", "Bail, convention de mise à disposition ou facture de location de salle"]);
    rows.push(["Accessibilité des locaux", "Accès PMR vérifié avant la session ; à défaut, solution alternative étudiée avec le référent handicap", "Attestation d'accessibilité / registre public d'accessibilité"]);
    rows.push(["Équipement pédagogique", "Vidéoprojecteur ou écran, tableau, postes informatiques si la formation l'exige", "Inventaire du matériel"]);
  }
  rows.push(["Ressources pédagogiques", "Supports de cours, exercices corrigés, évaluations (IND 19)", "Support de cours du dossier"]);
  return buildDocument({
    org: o,
    title: "DESCRIPTIF DES MOYENS HUMAINS, TECHNIQUES ET DE L'ENVIRONNEMENT",
    subtitle: `Indicateur 17 — ${f.intitule}`,
    sections: [
      { heading: "Modalité de la prestation", content: `<p>Formation <strong>${m === "distanciel" ? "à distance (classe virtuelle)" : m === "mixte" ? "mixte (présentiel et distanciel)" : "en présentiel"}</strong>, ${v(f.duree) || "durée précisée au programme"}, pour ${v(f.nombreParticipants) || String(stagiaires.length || 1)} participant(s) maximum par session.</p>` },
    ],
    table: { headers: ["Moyen", "Description", "Justificatif à joindre"], rows },
    extraHtml: `<p style="margin-top:10px">Descriptif établi le ${dateMajFr(o)} et revu avant chaque session. Les justificatifs de la dernière colonne sont des pièces de l'organisme ou de ses fournisseurs : ils sont joints au dossier, ils ne sont pas produits par le générateur.</p>`,
    signatures: { type: "1", labels: ["Le dirigeant"], names: [o.dirigeant], dates: [dateMajFr(o)] },
  });
}


// ─── IND 18 ─────────────────────────────────────────────────────────────────

function sessions(f: FormationInfo, stagiaires: StagiaireInfo[]): { debut: string; fin: string; noms: string[] }[] {
  const map = new Map<string, { debut: string; fin: string; noms: string[] }>();
  const valides = stagiaires.filter((s) => v(s.nom));
  (valides.length ? valides : [null]).forEach((s) => {
    const debut = v(s?.dateDebutFormation) || v(f.dateDebut);
    const fin = v(s?.dateFinFormation) || v(f.dateFin);
    const k = `${debut}|${fin}`;
    if (!map.has(k)) map.set(k, { debut, fin, noms: [] });
    if (s) map.get(k)!.noms.push(`${s.prenom} ${s.nom}`);
  });
  return [...map.values()];
}

export function genCRReunionPedagogique(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const sess = sessions(f, stagiaires)[0];
  const today = new Date().toISOString().slice(0, 10);
  const dateReunion = sess.debut ? subtractBusinessDays(sess.debut, 3) : isoMaj(o);
  const tenue = dateReunion <= today;
  const intervenants = intervenantsReels(o, f, stagiaires);
  const psh = stagiaires.filter((s) => s.rqth === "oui").map((s) => `${s.prenom} ${s.nom}`);
  return buildDocument({
    org: o,
    title: tenue ? "COMPTE RENDU DE RÉUNION PÉDAGOGIQUE DE PRÉPARATION" : "ORDRE DU JOUR — RÉUNION PÉDAGOGIQUE DE PRÉPARATION",
    subtitle: `Indicateur 18 — ${f.intitule}`,
    sections: [
      { heading: "Réunion", content: `<p><strong>Date :</strong> ${formatDate(dateReunion)}${tenue ? "" : " (programmée)"}<br><strong>Participants :</strong> ${[...new Set([o.dirigeant, o.responsablePedagogique, ...intervenants, o.referentHandicap].filter(Boolean))].join(", ")}<br><strong>Session :</strong> du ${formatDate(sess.debut)} au ${formatDate(sess.fin)} — ${sess.noms.length} stagiaire(s)</p>` },
      { heading: "Points traités", content: `<ol><li>Analyse des besoins des stagiaires et adaptations décidées (trames IND 4).</li><li>Résultats des tests de positionnement et constitution des groupes de niveau (IND 8).</li><li>${psh.length ? `Aménagements pour ${psh.join(", ")} (RQTH) validés avec le référent handicap.` : "Aucun besoin de compensation déclaré ; rappel de la procédure en cas de besoin exprimé en cours de session."}</li><li>Répartition des séquences entre intervenants, supports et exercices corrigés à utiliser.</li><li>Organisation ${modalite(f) === "presentiel" ? "des locaux et du matériel" : "des classes virtuelles : liens, test de connexion, solution de repli"}.</li><li>Modalités d'émargement, d'évaluation et de recueil des appréciations.</li></ol>` },
      { heading: tenue ? "Décisions" : "Décisions attendues", content: `<ul><li>Planning des intervenants validé (document joint).</li><li>Point d'étape à mi-parcours entre le responsable pédagogique et les intervenants.</li><li>Bilan de session sous 8 jours après la fin de la formation.</li></ul>` },
    ],
    signatures: tenue ? { type: "2", labels: ["Le responsable pédagogique", "Pour les intervenants"], names: [o.responsablePedagogique || o.dirigeant, intervenants[0] || o.dirigeant], dates: [formatDate(dateReunion), formatDate(dateReunion)] } : undefined,
  });
}

export function genPlanningIntervenants(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const rows: string[][] = [];
  const modules = (f.programme || "").split("\n").map((l) => l.trim()).filter((l) => /^(module|jour|bloc|séquence|étape|phase)\b/i.test(l));
  sessions(f, stagiaires).forEach((sess) => {
    const jours = getFormationDays({ ...f, dateDebut: sess.debut, dateFin: sess.fin });
    const intervenant = stagiaires.find((s) => v(s.dateDebutFormation) === sess.debut && v(s.formateur))?.formateur || f.formateur || o.dirigeant;
    jours.forEach((j, i) => {
      rows.push([j, "09h00 – 12h30 / 13h30 – 17h00", modules.length ? modules[Math.min(i, modules.length - 1)].replace(/\s*:\s*/, " : ") : `Séquence ${i + 1}`, intervenant, modalite(f) === "presentiel" ? (f.lieu || o.ville) : "Classe virtuelle"]);
    });
  });
  return buildDocument({
    org: o,
    title: "PLANNING DES INTERVENANTS",
    subtitle: `Indicateur 18 — ${f.intitule}`,
    table: { headers: ["Date", "Horaires", "Séquence", "Intervenant", "Lieu / modalité"], rows },
    extraHtml: `<p style="margin-top:10px">Planning validé par ${o.responsablePedagogique || o.dirigeant}. Toute modification (absence, remplacement) est tracée et communiquée aux stagiaires.</p>`,
  });
}

// ─── IND 23 / 25 / 26 — veilles sourcées ─────────────────────────────────────

type ThemeVeille = "reglementaire" | "technologique" | "handicap";

const SOURCES: Record<ThemeVeille, { source: string; url: string; objet: string }[]> = {
  reglementaire: [
    { source: "Légifrance — Journal officiel", url: "https://www.legifrance.gouv.fr", objet: "Textes relatifs à la formation professionnelle (Code du travail, 6e partie)" },
    { source: "Ministère du Travail — Qualiopi", url: "https://travail-emploi.gouv.fr/qualiopi-marque-de-certification-qualite-des-prestataires-de-formation", objet: "Référentiel national qualité et guide de lecture" },
    { source: "France Compétences", url: "https://www.francecompetences.fr", objet: "Répertoires RNCP / RS, règles de certification" },
    { source: "Centre Inffo", url: "https://www.centre-inffo.fr", objet: "Actualité juridique de la formation" },
    { source: "Mon Compte Formation — espace des organismes", url: "https://www.of.moncompteformation.gouv.fr", objet: "Conditions générales EDOF, règles CPF" },
  ],
  technologique: [
    { source: "FFFOD — Forum des acteurs de la formation digitale", url: "https://www.fffod.org", objet: "Pratiques de formation à distance" },
    { source: "Centre Inffo — innovation pédagogique", url: "https://www.centre-inffo.fr", objet: "AFEST, multimodalité, outils numériques" },
    { source: "CNIL", url: "https://www.cnil.fr", objet: "Outils numériques et données personnelles des apprenants" },
  ],
  handicap: [
    { source: "Agefiph", url: "https://www.agefiph.fr", objet: "Aides, ressources handicap et formation" },
    { source: "Monparcourshandicap.gouv.fr", url: "https://www.monparcourshandicap.gouv.fr", objet: "Information des personnes en situation de handicap" },
    { source: "Cap emploi (réseau Cheops)", url: "https://www.capemploi.info", objet: "Accompagnement vers l'emploi et la formation" },
  ],
};

/** Tableau de veille sourcé : textes vérifiés et sources officielles, consultés au plus tard à la date de MAJ. */
export function genVeilleSourcee(o: OrganismeInfo, f: FormationInfo, theme: ThemeVeille): string {
  const maj = isoMaj(o);
  const titre = theme === "reglementaire" ? "VEILLE LÉGALE ET RÉGLEMENTAIRE — SOURCES ET TEXTES SUIVIS" : theme === "technologique" ? "VEILLE INNOVATIONS PÉDAGOGIQUES ET TECHNOLOGIQUES — SOURCES SUIVIES" : "VEILLE HANDICAP — SOURCES ET RÉSEAUX SUIVIS";
  const ind = theme === "reglementaire" ? 23 : theme === "technologique" ? 25 : 26;
  const textes = theme === "reglementaire"
    ? REFERENCES_REGLEMENTAIRES_2026.filter((r) => r.types.includes("AF") && r.date <= maj).map((r) => [formatDate(r.date), r.texte, r.objet, `<a href="${r.source}">${r.source}</a>`, "Intégré aux procédures et au dossier qualité"])
    : [];
  const consult = formatDate(maj);
  const rows = SOURCES[theme].map((s) => [s.source, s.objet, `<a href="${s.url}">${s.url}</a>`, "Mensuelle", consult]);
  return buildDocument({
    org: o,
    title: titre,
    subtitle: `Indicateur ${ind} — ${f.intitule}`,
    sections: [
      { heading: "Organisation de la veille", content: `<p>Veille assurée par ${o.referentQualite || o.dirigeant}, consignée dans ce tableau et exploitée en revue qualité ; chaque évolution retenue donne lieu à une action au tableau d'amélioration continue. Les abonnements et courriels reçus sont conservés comme preuves par l'organisme.</p>` },
    ],
    table: { headers: ["Source", "Objet suivi", "Adresse", "Fréquence", "Dernière consultation"], rows },
    extraHtml: textes.length
      ? `<h2>Textes identifiés et exploitation</h2><table><tr><th>Publication</th><th>Texte</th><th>Contenu</th><th>Source</th><th>Exploitation</th></tr>${textes.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</table>`
      : "",
  });
}

// ─── IND 28 ─────────────────────────────────────────────────────────────────

export function genCooperationSocioEconomique(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const entreprises = [...new Set(stagiaires.map((s) => v(s.entreprise)).filter(Boolean))];
  return buildDocument({
    org: o,
    title: "MOBILISATION DU RÉSEAU DE PARTENAIRES SOCIO-ÉCONOMIQUES",
    subtitle: `Indicateur 28 — ${f.intitule} (${f.rythmeAlternance || "formation en situation de travail"})`,
    sections: [
      { heading: "Objet", content: `<p>La formation comprend des périodes en situation de travail. ${o.nom} associe les entreprises d'accueil à l'ingénierie du parcours et à l'accueil des stagiaires.</p>` },
      { heading: "Entreprises d'accueil", content: entreprises.length ? `<ul>${entreprises.map((e) => `<li>${e}</li>`).join("")}</ul>` : "<p>Aucune entreprise d'accueil renseignée à ce jour.</p>" },
      { heading: "Modalités de co-construction", content: `<ul><li>Entretien avec le tuteur avant l'entrée : missions confiées, compétences visées.</li><li>Calendrier d'alternance partagé.</li><li>Point tuteur à mi-parcours et bilan de fin de parcours.</li><li>Recueil de l'appréciation de l'entreprise (IND 30).</li></ul>` },
    ],
    extraHtml: `<p>Établi le ${dateMajFr(o)}.</p>`,
  });
}
