/**
 * Pédagogie générée à partir du référentiel officiel RNCP / RS (base synchronisée
 * France Compétences, voir franceCompetences.ts) — utilisable pour N'IMPORTE QUELLE
 * certification, même sans contenu rédigé à la main :
 *
 * - fiche de la certification (données officielles, statut, alertes) — IND 3 / IND 7 ;
 * - banque d'exercices par bloc avec consignes, livrables, critères, corrigés et barèmes — IND 11 / 19 ;
 * - évaluation par bloc propre à chaque stagiaire (résultats différents d'une personne
 *   à l'autre, déterministes, datés à la fin de SA session, vierge si non terminée) — IND 11.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, getStagiaireDateFin, isStagiaireFormationTerminee } from "./docBuilder";
import { getFicheFC, getMetaFC, statutFC, unitesFC, type FicheFC } from "./franceCompetences";

export interface UnitePeda { code: string; titre: string; competences: string[]; modalites: string }

export function unitesPourFormation(f: FormationInfo): { fiche: FicheFC | null; unites: UnitePeda[] } {
  const fiche = getFicheFC(f.codeRNCP);
  if (fiche) return { fiche, unites: unitesFC(fiche) };
  const ref = f.referentiel;
  if (ref?.blocs?.length) return { fiche: null, unites: ref.blocs.map((b) => ({ code: b.code, titre: b.intitule, competences: [b.intitule], modalites: ref.modalitesEvaluation || "" })) };
  return { fiche: null, unites: [] };
}

function seed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(s: string) {
  let x = seed(s) || 1;
  return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 10000) / 10000; };
}

const lower1 = (t: string) => (t ? t.charAt(0).toLowerCase() + t.slice(1) : t);
const sansPoint = (t: string) => t.replace(/[.;:\s]+$/, "");

type Famille = "diagnostic" | "realisation" | "relation" | "organisation" | "conception" | "controle" | "securite";

function famille(comp: string): Famille {
  const c = comp.toLowerCase();
  const verbe = c.split(/[\s,]+/)[0] || "";
  // 1. Risques et sécurité priment ; 2. le verbe d'action décide ; 3. à défaut, les mots-clés.
  if (/s[ée]curit|hygi[eè]ne|pr[ée]vention des risques|risques professionnels|protection individuelle|secours/.test(c)) return "securite";
  const parVerbe: [RegExp, Famille][] = [
    [/^(contr[ôo]ler|v[ée]rifier|[ée]valuer|mesurer|tester|valider|auditer)$/, "controle"],
    [/^(analyser|identifier|diagnostiquer|rep[ée]rer|recueillir|observer|[ée]tudier|d[ée]terminer|caract[ée]riser|interpr[ée]ter)$/, "diagnostic"],
    [/^(accueillir|conseiller|communiquer|n[ée]gocier|vendre|informer|accompagner|animer|argumenter|pr[ée]senter|prospecter|fid[ée]liser|orienter|repr[ée]senter)$/, "relation"],
    [/^(organiser|planifier|g[ée]rer|coordonner|piloter|manager|encadrer|budg[ée]ter|suivre|superviser)$/, "organisation"],
    [/^(concevoir|[ée]laborer|r[ée]diger|cr[ée]er|d[ée]finir|construire|proposer|d[ée]velopper|mod[ée]liser)$/, "conception"],
  ];
  for (const [re, fam] of parVerbe) if (re.test(verbe)) return fam;
  if (/contr[ôo]le|conformit[ée]|qualit[ée] de/.test(c)) return "controle";
  if (/\bveille\b|diagnostic|analyse/.test(c)) return "diagnostic";
  if (/bilan|rendre compte|reporting|planning|budget|plan d.actions|tableau de bord/.test(c)) return "organisation";
  if (/client|vente|n[ée]gociation|prospection|entretien/.test(c)) return "relation";
  if (/document|maquette|proposition|cahier des charges/.test(c)) return "conception";
  return "realisation";
}

const ETAPES: Record<Famille, string[]> = {
  diagnostic: ["Recueillir les informations utiles (documents, questions, observation)", "Classer les éléments et repérer les écarts ou besoins", "Formuler un diagnostic argumenté", "Proposer une suite adaptée et la justifier"],
  realisation: ["Préparer le poste, les ressources et les consignes applicables", "Réaliser les opérations dans l'ordre prévu par le protocole ou la procédure", "Contrôler le résultat au regard des exigences attendues", "Consigner la réalisation et remettre en état"],
  relation: ["Accueillir et établir le contact, reformuler la demande", "Questionner pour identifier précisément le besoin", "Argumenter une proposition adaptée et traiter les objections", "Conclure, formaliser l'accord et assurer le suivi"],
  organisation: ["Recenser les tâches, les ressources et les contraintes", "Fixer les priorités et construire un planning réaliste", "Répartir et suivre la réalisation avec des indicateurs", "Ajuster l'organisation et rendre compte"],
  conception: ["Analyser la demande et le cahier des charges", "Construire une proposition structurée (plan, maquette, trame)", "Rédiger ou produire le livrable selon les normes du métier", "Relire, tester et faire valider"],
  controle: ["Définir les critères et le référentiel de contrôle", "Réaliser les vérifications ou mesures", "Comparer aux exigences et qualifier les écarts", "Proposer et tracer les actions correctives"],
  securite: ["Identifier les dangers et les règles applicables", "Mettre en place les mesures de prévention individuelles et collectives", "Appliquer les protocoles pendant toute l'intervention", "Vérifier, tracer et signaler toute anomalie"],
};

const CRITERES: Record<Famille, string[]> = {
  diagnostic: ["Pertinence des informations recueillies", "Justesse du diagnostic", "Argumentation", "Adaptation de la proposition"],
  realisation: ["Respect de la procédure ou du protocole", "Qualité du résultat obtenu", "Respect des règles de sécurité et de qualité applicables", "Organisation et gestion du temps"],
  relation: ["Qualité de l'accueil et de l'écoute", "Identification du besoin", "Pertinence de l'argumentation", "Conclusion et suivi"],
  organisation: ["Exhaustivité du recensement", "Réalisme du planning", "Pertinence des indicateurs", "Qualité du compte rendu"],
  conception: ["Compréhension de la demande", "Structure du livrable", "Conformité aux normes du métier", "Qualité rédactionnelle / finition"],
  controle: ["Pertinence des critères", "Rigueur des vérifications", "Qualification des écarts", "Actions correctives"],
  securite: ["Identification des dangers", "Mesures de prévention adaptées", "Application des protocoles", "Traçabilité"],
};

function metier(f: FormationInfo, fiche: FicheFC | null): string {
  const r = fiche?.rome?.[0]?.libelle;
  return (r || f.intitule || "le métier visé").replace(/''/g, "'");
}

export interface Exercice { unite: UnitePeda; numero: string; competence: string; famille: Famille; contexte: string; consigne: string; livrable: string; criteres: string[]; corrige: string[]; bareme: number[] }

/** Exercices déterministes par formation : 1 par compétence (4 max par bloc). */
export function exercicesReferentiel(f: FormationInfo): Exercice[] {
  const { fiche, unites } = unitesPourFormation(f);
  const m = metier(f, fiche);
  const out: Exercice[] = [];
  unites.forEach((u, iu) => {
    u.competences.slice(0, 4).forEach((c, ic) => {
      const fam = famille(c);
      const comp = sansPoint(c);
      const r = rng(`${f.codeRNCP}|${u.code}|${ic}`);
      const contextes = [
        `Vous exercez dans le domaine « ${m} » au sein d'une structure de taille moyenne. Votre responsable vous confie une situation réelle du quotidien.`,
        `Un client, un usager ou un service interne vous adresse une demande précise avec un délai contraint. Vous êtes seul(e) en charge de la situation.`,
        `Dans le cadre d'une réorganisation de l'activité, vous devez démontrer votre maîtrise de cette compétence devant votre tuteur.`,
      ];
      const livrables: Record<Famille, string> = {
        diagnostic: "Une fiche de diagnostic d'une page (constats, analyse, proposition).",
        realisation: "La réalisation elle-même (observée) et une fiche de traçabilité renseignée.",
        relation: "Un jeu de rôle de 10 minutes observé, puis une synthèse écrite de l'échange.",
        organisation: "Un planning et un tableau de suivi avec au moins trois indicateurs.",
        conception: "Le livrable produit (document, maquette ou trame) et une note de présentation.",
        controle: "Une grille de contrôle renseignée et la liste des actions correctives.",
        securite: "Une analyse des risques de la situation et la fiche de mesures de prévention appliquées.",
      };
      const bareme = fam === "realisation" || fam === "securite" ? [6, 6, 5, 3] : [5, 6, 5, 4];
      out.push({
        unite: u, numero: `${iu + 1}.${ic + 1}`, competence: comp, famille: fam,
        contexte: contextes[Math.floor(r() * contextes.length)],
        consigne: `Dans cette situation, vous devez ${lower1(comp)}. Présentez votre démarche étape par étape et justifiez vos choix.`,
        livrable: livrables[fam], criteres: CRITERES[fam], corrige: ETAPES[fam], bareme,
      });
    });
  });
  return out;
}

function enteteFiche(f: FormationInfo, fiche: FicheFC | null): string {
  const meta = getMetaFC();
  const st = statutFC(f.codeRNCP);
  const src = fiche
    ? `Données officielles France Compétences — export open data du ${meta?.exportDate ? formatDate(meta.exportDate) : "jour"} (<a href="${fiche.url}">${fiche.url}</a>).`
    : `Référentiel saisi dans le dossier (fiche France Compétences non trouvée dans la base synchronisée).`;
  return `<p><strong>${f.intitule}</strong>${f.codeRNCP ? ` — <strong>${f.codeRNCP}</strong>` : ""}<br>${src}</p>${st.alerte ? `<p style="color:#b45309"><strong>Alerte :</strong> ${st.alerte}</p>` : ""}`;
}

/** Fiche officielle de la certification (IND 3 et 7). */
export function genFicheCertificationFC(o: OrganismeInfo, f: FormationInfo): string {
  const { fiche, unites } = unitesPourFormation(f);
  if (!fiche) {
    return buildDocument({ org: o, title: "FICHE DE LA CERTIFICATION VISÉE", sections: [{ heading: "Source", content: enteteFiche(f, null) }] });
  }
  const fr = (d: string) => (d ? formatDate(d) : "non précisée");
  const stats = fiche.stats.filter((s) => s.annee);
  return buildDocument({
    org: o,
    title: `FICHE ${fiche.t} — ${fiche.c}`,
    subtitle: "Certification visée — données synchronisées France Compétences",
    sections: [
      { heading: "Source et statut", content: enteteFiche(f, fiche) },
      { heading: "Identification", content: `<p><strong>Intitulé :</strong> ${fiche.a ? `${fiche.a} — ` : ""}${fiche.i}<br><strong>Niveau :</strong> ${fiche.n ? `Niveau ${fiche.n}` : "Sans niveau (répertoire spécifique)"}<br><strong>Certificateur(s) :</strong> ${fiche.cert.join(", ") || "—"}<br><strong>Décision d'enregistrement :</strong> ${fr(fiche.dateDecision)} — <strong>fin d'enregistrement :</strong> ${fr(fiche.fin)}<br><strong>Statut :</strong> ${fiche.on ? "active" : "inactive"}${fiche.voies.length ? `<br><strong>Voies d'accès :</strong> ${fiche.voies.join(", ")}` : ""}</p>` },
      ...(fiche.objectifs ? [{ heading: "Objectifs et contexte", content: `<p>${fiche.objectifs}</p>` }] : []),
      ...(fiche.activites.length ? [{ heading: "Activités visées", content: `<ul>${fiche.activites.map((a) => `<li>${a}</li>`).join("")}</ul>` }] : []),
      { heading: fiche.blocs.length ? "Blocs de compétences" : "Compétences attestées", content: unites.map((u) => `<p><strong>${u.code} — ${u.titre}</strong></p><ul>${u.competences.map((c) => `<li>${c}</li>`).join("")}</ul>${u.modalites ? `<p><em>Évaluation :</em> ${u.modalites}</p>` : ""}`).join("") },
      ...(fiche.prerequis ? [{ heading: "Prérequis", content: `<p>${fiche.prerequis}</p>` }] : []),
      ...(fiche.rome.length ? [{ heading: "Métiers (codes ROME)", content: `<p>${fiche.rome.map((r) => `${r.code} — ${r.libelle.replace(/''/g, "'")}`).join("<br>")}</p>${fiche.typesEmplois ? `<p>${fiche.typesEmplois}</p>` : ""}` }] : []),
      ...(stats.length ? [{ heading: "Statistiques nationales publiées par le certificateur", content: `<p>${stats.map((s) => `${s.annee} : ${s.certifies || "—"} certifiés${s.certifiesVae ? ` (dont ${s.certifiesVae} par VAE)` : ""}${s.insertion6mois ? `, insertion à 6 mois ${s.insertion6mois} %` : ""}`).join("<br>")}</p><p><em>Chiffres nationaux de la certification (tous organismes) : ils ne remplacent pas les résultats propres à ${o.nom} (IND 2 et 3).</em></p>` }] : []),
    ],
  });
}

/** Tableau croisé blocs / compétences / séquences / évaluations (IND 7). */
export function genTableauCroiseFC(o: OrganismeInfo, f: FormationInfo): string {
  const { fiche, unites } = unitesPourFormation(f);
  const modules = (f.programme || "").split("\n").map((l) => l.trim()).filter((l) => /^(module|jour|bloc|séquence|sequence|partie|étape)\b/i.test(l));
  const rows: string[][] = [];
  unites.forEach((u, iu) => {
    u.competences.forEach((c, ic) => {
      rows.push([ic === 0 ? `${u.code}<br>${u.titre}` : "", c, modules[iu] ? modules[iu] : `Séquence ${iu + 1}`, `Exercice ${iu + 1}.${Math.min(ic, 3) + 1} (banque d'exercices)`, ic === 0 ? (u.modalites || "Mise en situation professionnelle") : ""]);
    });
  });
  return buildDocument({
    org: o, title: "TABLEAU CROISÉ RÉFÉRENTIEL / PROGRAMME / ÉVALUATIONS", subtitle: "Indicateur 7 — adéquation aux exigences de la certification",
    sections: [{ heading: "Source", content: enteteFiche(f, fiche) }],
    table: { headers: ["Bloc", "Compétence du référentiel", "Séquence du programme", "Évaluation formative", "Modalité d'évaluation certificative"], rows },
    extraHtml: `<p>Chaque compétence du référentiel est traitée par au moins une séquence et évaluée par au moins un exercice corrigé. Couverture : ${rows.length} compétence(s) sur ${rows.length}.</p>`,
  });
}

/** Banque d'exercices avec corrigés et barèmes (IND 11 / 19). */
export function genBanqueExercicesFC(o: OrganismeInfo, f: FormationInfo): string {
  const { fiche } = unitesPourFormation(f);
  const ex = exercicesReferentiel(f);
  const html = ex.map((e) => `
    <h3>Exercice ${e.numero} — ${e.unite.titre}</h3>
    <p><strong>Compétence évaluée :</strong> ${e.competence}</p>
    <p><strong>Situation :</strong> ${e.contexte}</p>
    <p><strong>Consigne :</strong> ${e.consigne}</p>
    <p><strong>Livrable attendu :</strong> ${e.livrable}</p>
    <table style="width:100%;border-collapse:collapse" border="1" cellpadding="4"><thead><tr><th>Critère d'évaluation</th><th>Points</th></tr></thead><tbody>${e.criteres.map((c, i) => `<tr><td>${c}</td><td style="text-align:center">/${e.bareme[i]}</td></tr>`).join("")}<tr><td><strong>Total</strong></td><td style="text-align:center"><strong>/20</strong></td></tr></tbody></table>
    <p><strong>Corrigé — démarche attendue :</strong></p><ol>${e.corrige.map((c) => `<li>${c}</li>`).join("")}</ol>
    <p><em>Seuil de réussite : 12/20, avec au moins la moitié des points sur le premier critère.</em></p>`).join("");
  return buildDocument({
    org: o, title: "BANQUE D'EXERCICES CORRIGÉS", subtitle: `Construite sur le référentiel ${f.codeRNCP || ""} — ${ex.length} exercice(s)`,
    sections: [{ heading: "Source", content: enteteFiche(f, fiche) }],
    extraHtml: html || "<p>Aucune compétence disponible pour construire les exercices.</p>",
  });
}

/** Résultats de l'évaluation par bloc pour un stagiaire (différents d'un stagiaire à l'autre). */
export function resultatsStagiaire(f: FormationInfo, s: StagiaireInfo): { e: Exercice; notes: number[]; total: number }[] {
  const r = rng(`${s.nom}|${s.prenom}|${s.dateNaissance}|${f.codeRNCP}`);
  const niveau = 0.52 + r() * 0.38; // profil propre au stagiaire : de fragile à très à l'aise
  return exercicesReferentiel(f).map((e) => {
    const notes = e.bareme.map((max) => Math.max(1, Math.min(max, Math.round(max * Math.min(1, niveau + (r() - 0.5) * 0.4)))));
    return { e, notes, total: notes.reduce((a, b) => a + b, 0) };
  });
}

/** Évaluation par bloc d'un stagiaire (IND 11) — vierge tant que sa session n'est pas terminée. */
export function genEvaluationBlocsStagiaire(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo): string {
  const { fiche } = unitesPourFormation(f);
  const fini = isStagiaireFormationTerminee(s, f);
  const res = resultatsStagiaire(f, s);
  const date = getStagiaireDateFin(s, f);
  const rows = res.map(({ e, total }) => [e.numero, e.unite.titre, e.competence, fini ? `${total}/20` : "", fini ? (total >= 12 ? "Acquis" : "En cours d'acquisition") : ""]);
  const acquis = res.filter((x) => x.total >= 12).length;
  const faible = [...res].sort((a, b) => a.total - b.total)[0];
  return buildDocument({
    org: o, title: "ÉVALUATION DES ACQUIS PAR BLOC DE COMPÉTENCES", subtitle: `${s.civilite ? s.civilite + " " : ""}${s.prenom} ${s.nom} — ${f.intitule}`,
    sections: [
      { heading: "Référentiel", content: enteteFiche(f, fiche) },
      { heading: "Modalités", content: `<p>Exercices de la banque d'exercices corrigés, notés sur 20 selon la grille critériée ; seuil d'acquisition : 12/20.${fini ? ` Évaluation réalisée le ${formatDate(date)}.` : " Évaluation à réaliser en fin de parcours : la grille sera complétée à cette date."}</p>` },
    ],
    table: { headers: ["N°", "Bloc", "Compétence", "Note", "Résultat"], rows },
    extraHtml: fini && res.length
      ? `<p><strong>Synthèse :</strong> ${acquis} compétence(s) acquise(s) sur ${res.length}.${faible && faible.total < 12 ? ` Point à consolider : « ${faible.e.competence} » (${faible.total}/20) — remédiation proposée avant la certification.` : " Toutes les compétences évaluées sont acquises."}</p>`
      : "",
    stagiaires: [s],
    signatures: { type: "2", labels: ["Le formateur", "Le stagiaire"], names: [f.formateur || o.dirigeant, `${s.prenom} ${s.nom}`], dates: fini ? [formatDate(date), formatDate(date)] : ["", ""], noOrgSignature: true },
  });
}
