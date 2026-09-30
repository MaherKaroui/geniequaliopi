/**
 * Matrice de cas : génère le catalogue complet pour un large échantillon de
 * combinaisons (type d'action, certification, modalité, calendrier, profils de
 * stagiaires, organisme) et contrôle automatiquement la cohérence des trames.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo, DocEntry } from "@/types/qualiopi";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { financeursEffectifs } from "@/lib/formationResolue";
import { ORG_TEST, FORMATIONS_TEST, FUITES, type TypeAction } from "./dossierAudit.harness";

export interface Cas { id: string; type: TypeAction; org: OrganismeInfo; f: FormationInfo; stagiaires: StagiaireInfo[]; tags: string[] }
export interface Violation { cas: string; regle: string; doc: string; template: string; extrait: string }

const today = new Date();
const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

type Calendrier = "passee" | "encours" | "future";
function dates(cal: Calendrier, type: TypeAction): { debut: string; fin: string } {
  const long = type === "apprentissage" ? 330 : type === "vae" ? 120 : type === "bilans-competences" ? 60 : 1;
  if (cal === "passee") return { debut: iso(addDays(today, -long - 60)), fin: iso(addDays(today, -60)) };
  if (cal === "encours") return { debut: iso(addDays(today, -Math.max(1, Math.floor(long / 2)) - 1)), fin: iso(addDays(today, Math.max(1, Math.ceil(long / 2)) + 1)) };
  return { debut: iso(addDays(today, 40)), fin: iso(addDays(today, 40 + long)) };
}

const PROFILS: StagiaireInfo[] = [
  { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "Société Alpha", responsableEntreprise: "Luc MARTINEAU", emailResponsable: "rh@alpha.fr", poste: "Assistante", dateNaissance: "1990-04-12", financeur: "OPCO", rqth: "non", diplome: "BTS" },
  { civilite: "M.", nom: "BRAVO", prenom: "Julien", email: "julien.bravo@exemple.fr", telephone: "06 11 21 31 41", entreprise: "", poste: "", dateNaissance: "1998-09-03", financeur: "CPF", rqth: "oui" },
  { civilite: "Mme", nom: "CHARLIE", prenom: "Inès", email: "ines.charlie@exemple.fr", telephone: "", entreprise: "", poste: "Demandeuse d'emploi", dateNaissance: "1985-01-27", financeur: "France Travail", rqth: "non" },
  { civilite: "M.", nom: "DELTA", prenom: "Yanis", email: "yanis.delta@exemple.fr", telephone: "07 12 22 32 42", entreprise: "Delta BTP", responsableEntreprise: "", poste: "Commercial", dateNaissance: "2009-02-14", financeur: "Personnel", rqth: "non" },
];

export function construireMatrice(): Cas[] {
  const out: Cas[] = [];
  const types: TypeAction[] = ["actions-formation", "apprentissage", "vae", "bilans-competences"];
  const codesAF = ["", "RS5637", "RNCP39063"];
  const modalites = ["distanciel", "présentiel", "mixte"];
  const cals: Calendrier[] = ["passee", "encours", "future"];
  let n = 0;
  for (const type of types) {
    const codes = type === "actions-formation" ? codesAF : [FORMATIONS_TEST[type].codeRNCP || ""];
    for (const code of codes) {
      for (const [im, modalite] of modalites.entries()) {
        for (const [ic, cal] of cals.entries()) {
          // Échantillonnage déterministe : on garde environ la moitié des combinaisons, en couvrant chaque valeur.
          n++;
          const d = dates(cal, type);
          const f: FormationInfo = {
            ...FORMATIONS_TEST[type], codeRNCP: code, modalites: modalite,
            lieu: modalite === "distanciel" ? "Google Meet / Zoom" : "12 rue des Essais, 69003 Lyon",
            moyensPedagogiques: modalite === "présentiel" ? "Salle de formation équipée, vidéoprojecteur, supports remis à chaque participant, exercices corrigés."
              : modalite === "mixte" ? "Séances en salle et classes virtuelles, supports numériques, exercices corrigés." : "Classe virtuelle, supports numériques, exercices corrigés.",
            dateDebut: d.debut, dateFin: d.fin,
            ...(type === "actions-formation" && code ? { intitule: code === "RS5637" ? "Préparation à l'examen VTC" : "Négociateur technico-commercial" } : {}),
          };
          const variante = n % 3;
          const org: OrganismeInfo = {
            ...ORG_TEST, typesActions: [type],
            telephone: variante === 1 ? "" : ORG_TEST.telephone,
            siteWeb: variante === 2 ? "" : ORG_TEST.siteWeb,
            email: variante === 0 ? "atelier.controle@gmail.com" : ORG_TEST.email,
          };
          // Profils : rotation + dates individuelles pour certains cas.
          const profils = PROFILS.map((p, i) => ({ ...p })).filter((_, i) => type === "apprentissage" || i < 3 || variante === 1);
          if (variante === 2) profils.forEach((p, i) => { p.dateDebutFormation = d.debut; p.dateFinFormation = iso(addDays(new Date(d.fin), -i)); });
          if (type === "apprentissage") profils.forEach((p) => { p.financeur = "OPCO"; if (!p.entreprise) p.entreprise = "Entreprise d'accueil SAS"; });
          out.push({ id: `${type}|${code || "noncert"}|${modalite}|${cal}|v${variante}`, type, org, f, stagiaires: profils, tags: [type, code || "noncert", modalite, cal] });
        }
      }
    }
  }
  return out;
}

export function texte(html: string): string {
  return html.replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/data:[^"')\s]+/g, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/\s+/g, " ");
}

const TROUS: RegExp[] = [/\bundefined\b/, /\bNaN\b/, /Invalid Date/, /\[object Object\]/, /\{\{(?!PAGES?\}\})[^}]{1,40}\}\}/, /\bXXX+\b/, /\[\s*(À|A) COMPL[ÉE]TER\s*\]/i, /(^|\s)null(\s|$)/];

function extrait(t: string, re: RegExp): string {
  const m = t.match(re);
  const i = m?.index ?? 0;
  return t.slice(Math.max(0, i - 70), i + 90);
}

const PIECE_CONTRACTUELLE = /contrat|convention|cgv|conditions_generales/i;
const PIECE_EXECUTION = /emargement|certificat_realisation|attestation_(reussite|fin|assiduite)|examen_final|releve|connexion|questionnaire_satisfaction|satisfaction_stagiaire|bilan_chaud/i;

export function auditerCas(c: Cas, opts: { limitParType?: number } = {}): { total: number; violations: Violation[] } {
  const v: Violation[] = [];
  const cat: DocEntry[] = getFullCatalog(c.org, c.f, c.stagiaires);
  const effectifs = financeursEffectifs(c.stagiaires, c.f, c.org);
  const certifiante = /^(RS|RNCP)\d+$/.test(c.f.codeRNCP || "");
  const presentiel = /pr[ée]sentiel/i.test(c.f.modalites) && !/mixte|distanciel/i.test(c.f.modalites);
  const distanciel = /distanciel/i.test(c.f.modalites);
  const evalBesoins: Record<number, string> = {};
  const chrono: Record<number, { analyse?: Date | null; contrat?: Date | null; convoc?: Date | null }> = {};
  const add = (regle: string, d: DocEntry, ex: string) => v.push({ cas: c.id, regle, doc: d.nom, template: d.template, extrait: ex });

  for (const d of cat) {
    if (/pdf_static|asset|xlsx|excel/.test(d.template)) continue;
    let html = "";
    try {
      html = generateDocumentById(d.id, d.template, d.params, c.org, c.f, c.stagiaires) || "";
    } catch (e: any) {
      add("exception", d, String(e?.message || e).slice(0, 160));
      continue;
    }
    const t = texte(html);
    for (const re of TROUS) if (re.test(t)) add("trou", d, extrait(t, re));
    // Formes neutres non résolues (« le/la », « inscrit(e) ») dans un document individuel.
    if (typeof d.params?.stagiaireIdx === "number" && /[Ll]e\/[Ll]a|[a-zé]\((e|ne|trice|euse|ère)\)/.test(t)) add("genre-residuel", d, extrait(t, /[Ll]e\/[Ll]a|[a-zé]\((e|ne|trice|euse|ère)\)/));
    // Un organisme sans certificat ne peut pas se dire « certifié Qualiopi ».
    if (!/quiz/i.test(d.id) && !(c.org.numeroCertificatQualiopi || "").trim() && /(organisme|est|sommes|CERTIFIÉ)\s+(de formation\s+)?certifié\s+Qualiopi|CERTIFIÉ QUALIOPI/i.test(t)) add("qualiopi-non-certifie", d, extrait(t, /certifié\s+Qualiopi|CERTIFIÉ QUALIOPI/i));
    for (const f of FUITES) if (t.includes(f)) {
      // Les noms de certification officiels (fiche RS5637 VTC) ne sont pas des fuites quand la formation est VTC.
      if (/VTC|RS5637/.test(f) && /RS5637/.test(c.f.codeRNCP || "")) continue;
      add("fuite", d, extrait(t, new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))));
    }
    const si = typeof d.params?.stagiaireIdx === "number" ? (d.params!.stagiaireIdx as number) : -1;
    const s = si >= 0 ? effectifs[si] : undefined;
    if (s && c.type === "actions-formation") {
      const dt = (re: RegExp) => { const m = t.match(re); if (!m) return null; const [j, mo, a] = m[1].split("/").map(Number); return new Date(a, mo - 1, j); };
      const ch = (chrono[si] = chrono[si] || {});
      if (/trame_eval_besoins/.test(d.template)) ch.analyse = dt(/Date d'analyse : (\d{2}\/\d{2}\/\d{4})/) || ch.analyse;
      if (/contrat_formation|convention_formation/.test(d.template)) ch.contrat = dt(/Fait à [^,]+, le : (\d{2}\/\d{2}\/\d{4})/) || ch.contrat;
      if (/convocation_stagiaire/.test(d.template)) ch.convoc = dt(/Fait à [^,]+, le : (\d{2}\/\d{2}\/\d{4})/) || ch.convoc;
    }
    if (s) {
      // Financement : rien de CPF pour une formation non certifiante.
      if (c.type === "actions-formation" && !certifiante && /\bCPF\b|Mon Compte Formation/i.test(t) && !/non (éligible|eligible)|pas (éligible|eligible)|hors CPF|n'est pas éligible/i.test(t)) add("cpf-non-certifiant", d, extrait(t, /\bCPF\b|Mon Compte Formation/i));
      // Convention seulement si entreprise/OPCO ; contrat si personnel (AF).
      if (c.type === "actions-formation" && /CONVENTION DE FORMATION/i.test(d.nom) && s.financeur === "Personnel") add("convention-pour-personnel", d, d.nom);
      if (c.type === "actions-formation" && /CONTRAT DE FORMATION/i.test(d.nom) && /opco|entreprise/i.test(s.financeur || "")) add("contrat-pour-opco", d, d.nom);
      // Civilité.
      if (s.civilite === "Mme" && new RegExp(`Monsieur\\s+(${s.nom}|${s.prenom})`, "i").test(t)) add("civilite", d, extrait(t, /Monsieur/));
      if (s.civilite === "M." && new RegExp(`Madame\\s+(${s.nom}|${s.prenom})`, "i").test(t)) add("civilite", d, extrait(t, /Madame/));
      // Accords au genre du stagiaire concerné.
      if (s.civilite === "M." && /(apprentie|convoquée|inscrite|l'apprenante|la candidate|la stagiaire)/i.test(t)) add("accord-genre", d, extrait(t, /(apprentie|convoquée|inscrite|l'apprenante|la candidate|la stagiaire)/i));
      if (s.civilite === "Mme" && /(convoqué|inscrit)(?!e)|l'apprenti|le stagiaire concerné/.test(t) && !/l'apprenti\(e\)/.test(t)) add("accord-genre", d, extrait(t, /(convoqué|inscrit)(?!e)|l'apprenti|le stagiaire concerné/));
      // RQTH.
      if (s.rqth === "oui" && /pas de reconnaissance de handicap|je ne suis pas en situation de handicap|RQTH\s*:\s*Non/i.test(t)) add("rqth-contradiction", d, extrait(t, /pas de reconnaissance de handicap|je ne suis pas en situation de handicap|RQTH\s*:\s*Non/i));
      if (s.rqth !== "oui" && /RQTH\s*:\s*Oui/i.test(t)) add("rqth-contradiction", d, extrait(t, /RQTH\s*:\s*Oui/i));
      if (/eval_besoins|evaluation_besoins|analyse_besoin/i.test(d.template)) evalBesoins[si] = (evalBesoins[si] || "") + t.replace(new RegExp(`${s.nom}|${s.prenom}|Madame|Monsieur|Mme|M\\.`, "g"), "");
      // Mineur (CFA).
      if (c.type === "apprentissage" && /contrat_apprentissage|convention/i.test(d.template) && /2009/.test(s.dateNaissance || "") && !/représentant légal|representant legal|responsable légal/i.test(t)) add("mineur-sans-representant", d, d.nom);
    }
    // Modalité.
    if (presentiel && /convocation|programme/i.test(d.template) && /classe virtuelle|Google Meet|Zoom/i.test(t) && !/ou à distance|mixte/i.test(t)) add("modalite-presentiel", d, extrait(t, /classe virtuelle|Google Meet|Zoom/i));
    if (distanciel && !/mixte/i.test(c.f.modalites) && /convocation/i.test(d.template) && /salle de formation|se présenter à l'accueil/i.test(t)) add("modalite-distanciel", d, extrait(t, /salle de formation|se présenter à l'accueil/i));
    // Pièces d'exécution d'une session future : aucune date passée de réalisation ni résultat.
    if (c.tags.includes("future") && PIECE_EXECUTION.test(d.template) && /\b(ADMIS|Acquis|Présent|Signé le)\b/.test(t) && !/à venir|n'est pas émis|sera (établi|complété|renseigné)|à compléter|avant la réalisation/i.test(t)) add("execution-future-remplie", d, extrait(t, /\b(ADMIS|Acquis|Présent|Signé le)\b/));
  }
  // Chronologie AF : analyse des besoins ≤ contrat/convention ≤ convocation ≤ début.
  for (const [si, ch] of Object.entries(chrono)) {
    const fmt = (d?: Date | null) => (d ? d.toLocaleDateString("fr-FR") : "?");
    if (ch.analyse && ch.contrat && ch.analyse > ch.contrat) v.push({ cas: c.id, regle: "chronologie", doc: `stagiaire ${si}`, template: "analyse>contrat", extrait: `analyse ${fmt(ch.analyse)} > contrat ${fmt(ch.contrat)}` });
    if (ch.contrat && ch.convoc && ch.contrat > ch.convoc) v.push({ cas: c.id, regle: "chronologie", doc: `stagiaire ${si}`, template: "contrat>convocation", extrait: `contrat ${fmt(ch.contrat)} > convocation ${fmt(ch.convoc)}` });
    const debut = new Date(`${(c.stagiaires[+si].dateDebutFormation || c.f.dateDebut)}T00:00:00`);
    if (ch.convoc && ch.convoc > debut) v.push({ cas: c.id, regle: "chronologie", doc: `stagiaire ${si}`, template: "convocation>debut", extrait: `convocation ${fmt(ch.convoc)} > début ${fmt(debut)}` });
  }
  // Réponses différentes d'un stagiaire à l'autre.
  const vals = Object.entries(evalBesoins);
  for (let i = 0; i < vals.length; i++) for (let j = i + 1; j < vals.length; j++) {
    const a = new Set(vals[i][1].split(/[.?!]\s/)), b = new Set(vals[j][1].split(/[.?!]\s/));
    const inter = [...a].filter((x) => b.has(x) && x.length > 40).length;
    const ratio = inter / Math.max(1, Math.min(a.size, b.size));
    if (ratio > 0.85) v.push({ cas: c.id, regle: "reponses-identiques", doc: `évaluation des besoins s${vals[i][0]} / s${vals[j][0]}`, template: "eval_besoins", extrait: `${Math.round(ratio * 100)} % de phrases communes` });
  }
  return { total: cat.length, violations: v };
}
