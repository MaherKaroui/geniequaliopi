// ---------------------------------------------------------------------------
// LILATE — anglais (RS7314, et RS6118 pour les sessions antérieures au 24/10/2025) et
// français langue étrangère (RS6916), certificateur LINGUEO — moteur de réponses HUMANISÉES.
// 100 % statique (aucun appel IA / réseau), déterministe par rang du stagiaire (sinon nom + prénom).
// Chaque stagiaire a un niveau CECRL estimé (A1 à B2) qui pilote toute sa copie :
//   • QCM de début : nombre de bonnes réponses cohérent avec le barème du test de niveau
//     (0-3 → A1, 4-5 → A2, 6-7 → B1, 8-9 → B2) ;
//   • questions ouvertes de début et de fin : réponses construites item par item à partir du corrigé
//     de la question réelle, avec les erreurs typiques d'un apprenant de ce niveau
//     (mauvais mot de la liste, tutoiement, ordre des mots…) ; plus d'items justes à la fin ;
//   • mises en situation : production propre (prénom du stagiaire, longueur et maladresses selon
//     le niveau) et bilan personnel ;
//   • évaluation des besoins : un profil professionnel par stagiaire (accueil, téléphone,
//     e-mails, réunions…), sans donnée personnelle vérifiable.
// Le choix suit le rang dans la session par une permutation : sur un groupe de 12 stagiaires,
// deux copies ne sont jamais identiques. Aucune promesse de réussite : le test LILATE est
// passé auprès de LINGUEO, qui délivre le niveau.
// ---------------------------------------------------------------------------
import lilateEn from "@/data/tpPresets/lilate-en.json";
import lilateFle from "@/data/tpPresets/lilate-fle.json";

const normalize = (s?: string) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();
const lower = (s?: string) => normalize(s).toLowerCase();

const CODES_EN = ["RS7314", "RS6118", "RS5551"];
const CODE_FLE = "RS6916";

/** Vrai pour les formations LILATE : codes RS7314 / RS6118 / RS5551 (anglais), RS6916 (FLE), ou « lilate » dans l'intitulé. */
export function isLilateFormation(intitule?: string, code?: string): boolean {
  const c = (code || "").replace(/\s+/g, "").toUpperCase();
  if (CODES_EN.includes(c) || c === CODE_FLE) return true;
  const t = lower(intitule);
  return /\blilate\b/.test(t) || /rs\s*(7314|6118|6916|5551)\b/.test(t);
}

/** Langue du parcours : « fle » pour RS6916 ou un intitulé français / FLE, sinon « en ». */
export function lilateLangue(intitule?: string, code?: string): "en" | "fle" {
  const c = (code || "").replace(/\s+/g, "").toUpperCase();
  if (c === CODE_FLE) return "fle";
  if (CODES_EN.includes(c)) return "en";
  const t = lower(intitule);
  return /rs\s*6916|\bfle\b|francais langue etrangere|francais professionnel|^francais/.test(t) ? "fle" : "en";
}

export function lilateSeed(nom?: string, prenom?: string): number {
  const src = normalize(nom) + "|" + normalize(prenom);
  let h = 2166136261;
  for (let i = 0; i < src.length; i++) { h ^= src.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}

function isFeminin(civilite?: string, prenom?: string): boolean {
  const c = (civilite || "").toLowerCase();
  if (c.startsWith("mme") || c.startsWith("madame") || c.startsWith("mlle")) return true;
  if (c.startsWith("m.") || c === "m" || c.startsWith("monsieur")) return false;
  const p = (prenom || "").trim().toLowerCase();
  return p.endsWith("a") || p.endsWith("e");
}
const accorder = (txt: string, fem: boolean) => txt.replace(/\{e\}/g, fem ? "e" : "").replace(/\{ne\}/g, fem ? "ne" : "").replace(/\{rice\}/g, fem ? "rice" : "eur");

const PAS = [1, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
const pgcd = (a: number, b: number): number => (b === 0 ? a : pgcd(b, a % b));
/** Permutation du rang du stagiaire : n stagiaires consécutifs → n rangs différents. */
function rang(idx: number, sel: number, n: number): number {
  if (n <= 1) return 0;
  let pas = PAS[sel % PAS.length] % n || 1;
  while (pgcd(pas, n) !== 1) pas++;
  return (((idx * pas + sel * 7 + Math.floor(sel / 3)) % n) + n) % n;
}
const baseIndex = (idx: number | undefined, nom?: string, prenom?: string) =>
  typeof idx === "number" && idx >= 0 ? idx : lilateSeed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Niveau CECRL estimé à l'entrée (12 positions, réparties A1 à B2)
// ---------------------------------------------------------------------------
export type NiveauLilate = "A1" | "A2" | "B1" | "B2";
const NIVEAUX: NiveauLilate[] = ["A2", "B1", "A1", "B2", "A2", "B1", "A2", "B1", "A1", "B2", "B1", "A2"];
const RANG_NIVEAU: Record<NiveauLilate, number> = { A1: 0, A2: 1, B1: 2, B2: 3 };
export function lilateNiveau(idx?: number, nom?: string, prenom?: string): NiveauLilate {
  return NIVEAUX[rang(baseIndex(idx, nom, prenom), 5, NIVEAUX.length)];
}

/** Bonnes réponses au QCM de début (barème du test de niveau du parcours, ramené au nombre de questions). */
const BONNES_SUR_10: Record<NiveauLilate, number[]> = { A1: [2, 3, 1], A2: [4, 5], B1: [6, 7], B2: [8, 9] };
export function lilateBonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  const b = baseIndex(idx, nom, prenom);
  const opts = BONNES_SUR_10[lilateNiveau(idx, nom, prenom)];
  const sur10 = opts[rang(b, 13, opts.length)];
  return Math.max(0, Math.min(nbQuestions, Math.round((sur10 / 10) * nbQuestions)));
}

/** Réponses au QCM de début : exactement `lilateBonnesQcmDebut` justes, les autres sur une option fausse. */
export function lilateReponsesQcmDebut(questions: { options: string[]; correctIndex: number }[], idx: number, nom?: string, prenom?: string): number[] {
  const n = questions.length;
  const bonnes = lilateBonnesQcmDebut(n, idx, nom, prenom);
  const base = baseIndex(idx, nom, prenom);
  // Le test de niveau va du plus facile au plus difficile : les bonnes réponses sont plutôt au début.
  const ordre = [...Array(n).keys()].sort((a, b) => (a + rang(base + a, 47, 3)) - (b + rang(base + b, 47, 3)));
  const justes = new Set(ordre.slice(0, bonnes));
  return questions.map((q, qi) => {
    if (justes.has(qi)) return q.correctIndex;
    const fausses = q.options.map((_, i) => i).filter((i) => i !== q.correctIndex);
    return fausses[rang(base, qi + 3, fausses.length)] ?? 0;
  });
}

/** Notes d'exercice selon le niveau : QCM sur 10, mise en situation sur 5. */
const NOTES_QCM: Record<NiveauLilate, number[]> = { A1: [5, 6, 5, 7], A2: [6, 7, 6, 8], B1: [7, 8, 9, 8], B2: [8, 9, 10, 9] };
const NOTES_EX: Record<NiveauLilate, number[]> = { A1: [2.5, 3, 3.5, 3], A2: [3, 3.5, 4, 3.5], B1: [3.5, 4, 4.5, 4], B2: [4, 4.5, 5, 4.5] };
export function lilateNoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const niv = lilateNiveau(stagiaireIdx);
  const notes = (estQcm ? NOTES_QCM : NOTES_EX)[niv];
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Copie item par item à partir du corrigé
// ---------------------------------------------------------------------------
type Item = { num: string; texte: string };

/** Items numérotés du corrigé (« 1. … », « 1-c, 2-e », « 1 → c »), sans les notes ni les rappels. */
function itemsCorrige(corrige: string): Item[] {
  const lignes = corrige.split(/\n+/).map((l) => nettoyer(l.trim())).filter(Boolean)
    .filter((l) => !/^(note|conseil|à retenir|a retenir|texte complet|résumé complet|resume complet|astuce)\b/i.test(l));
  const out: Item[] = [];
  for (const l of lignes) {
    // Correspondances sur une ligne : « 1-c, 2-e, 3-a » ou « 1 → c ; 2 → d ».
    const paires = [...l.matchAll(/(\d+)\s*[-–→]\s*([a-eA-E])\b/g)];
    if (paires.length > 1 && !/^\d+\.\s+\D{12,}/.test(l)) { paires.forEach((m) => out.push({ num: m[1], texte: `${m[1]}-${m[2]}` })); continue; }
    // Plusieurs items sur une ligne (« 1. … 2. … 3. … »).
    const morceaux = l.split(/\s+(?=\d{1,2}\s*[.)]\s)/);
    for (const m of morceaux) {
      const mm = m.match(/^(\d{1,2})\s*[.)\-–→]\s*(.*)$/);
      if (mm) out.push({ num: mm[1], texte: nettoyer(m.trim()) });
      else if (/^ordre\s*:/i.test(m)) out.push({ num: "ordre", texte: m.trim() });
    }
  }
  return out;
}

/** Ce qu'écrit l'apprenant : sans les explications du corrigé (parenthèses, règle, phonétique). */
function nettoyer(t: string): string {
  return t
    .replace(/^Modèle de (réponse|lecture)( orale)?\s*:\s*/i, "")
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*\[[^\]]*\]/g, "")
    .replace(/‿/g, " ")
    .replace(/\s*:\s+(la voix|on |c’est|c'est|il faut|le verbe)[^.]*\./gi, ".")
    .replace(/([.?!])\s+(Avec |On |Attention|Ici |Car |Parce |Pour |Rappel|Conseil|Astuce|À retenir|Note)[\s\S]*$/, "$1")
    .replace(/\s+([.?!,])/g, (m, p) => (p === "?" || p === "!" ? ` ${p}` : p))
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Mots proposés dans la consigne (« Mots à utiliser : a, b, c »). */
function motsListe(question: string): string[] {
  const m = question.match(/Mots à utiliser\s*:\s*([^\n]+)/i);
  if (!m) return [];
  return m[1].split(/\s*(?:,|–|\/|;| - )\s*/).map((x) => x.trim().replace(/[.«»"]/g, "")).filter((x) => x && x.length < 40);
}

const ERREURS_EN: [RegExp, string][] = [
  [/\bhave worked\b/, "work"], [/\bhad worked\b/, "worked"], [/\bis located\b/, "locates"], [/\bwas founded\b/, "is found"],
  [/Could you tell me (where|when|what) (.+?) (is|are)\b/, "Could you tell me $1 $3 $2"], [/\bmustn't\b/, "don't have to"],
  [/\bdon't have to\b/, "mustn't"], [/\bshould\b/, "must"], [/\bsaid\b/, "told"], [/\btold me\b/, "said me"],
  [/\bI'm afraid\b/, "Sorry,"], [/\bcall back\b/, "recall"], [/\bspeaking\b/, "is speaking"], [/\bsince\b/, "for"],
  [/\bPlease find attached\b/, "In attached"], [/\bKind regards\b/, "Best salutations"], [/\brose\b/, "raised"],
  [/\bfell\b/, "felt"], [/\bunderstand\b/, "comprehend"], [/\bfloor\b/, "stage"], [/\bin charge of\b/, "responsible of"],
];
const ERREURS_FLE: [RegExp, string][] = [
  [/\bVous avez votre\b/, "Tu as ta"], [/\bVous pouvez signer\b/, "Tu peux signer"], [/\bJe vous rappelle\b/, "Je te rappelle"],
  [/\bAttendez ici\b/, "Attends ici"], [/\bEst-ce que tu\b/, "Tu"], [/\bEst-ce que vous\b/, "Vous"],
  [/\bQuelle\b/, "Quel"], [/\bdans un\b/, "à un"], [/\bchez\b/, "à"], [/\bayons\b/, "avons"], [/\bveuille\b/, "veut"],
  [/\bJ’ai travaillé\b/, "Je travaillais"], [/\bje vais commencer\b/i, "je commence"], [/\bÉteignez\b/, "Éteindre"],
  [/\bAllez\b/, "Aller"], [/\bN’ouvrez pas\b/, "Pas ouvrir"], [/\bgrâce à\b/i, "à cause de"], [/\bIl est\b/, "C’est un"],
  [/\bElle est\b/, "C’est une"], [/\bcombien\b/i, "quand"], [/\boui\b/, "non"],
];

/** Version fautive d'un item, plausible pour un apprenant (mot voisin de la liste, erreur typique, lettre voisine). */
function itemFaux(it: Item, mots: string[], langue: "en" | "fle", sel: number): string | null {
  const t = it.texte;
  const lettre = t.match(/^(\d+)-([a-e])$/i);
  if (lettre) {
    const l = lettre[2].toLowerCase();
    const autres = ["a", "b", "c", "d", "e"].filter((x) => x !== l).slice(0, 4);
    return `${lettre[1]}-${autres[sel % autres.length]}`;
  }
  if (it.num === "ordre") {
    const ls = t.replace(/^ordre\s*:\s*/i, "").split(/\s*(?:,|→)\s*/).filter(Boolean);
    if (ls.length > 2) { const k = sel % (ls.length - 1); [ls[k], ls[k + 1]] = [ls[k + 1], ls[k]]; return `Ordre : ${ls.join(", ")}`; }
    return null;
  }
  const present = mots.filter((m) => m.length > 1 && t.toLowerCase().includes(m.toLowerCase()));
  // Mot de remplacement absent de la phrase : pas de mot en double (« votre nom votre nom »).
  const autres = mots.filter((m) => !t.toLowerCase().includes(m.toLowerCase()));
  if (present.length && autres.length) {
    const juste = present[sel % present.length];
    const faux = autres[sel % autres.length];
    const re = new RegExp(juste.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    return t.replace(re, faux);
  }
  const erreurs = langue === "en" ? ERREURS_EN : ERREURS_FLE;
  const candidates = erreurs.filter(([re]) => re.test(t));
  if (candidates.length) { const [re, rep] = candidates[sel % candidates.length]; return t.replace(re, rep); }
  return null;
}

/** Item laissé sans réponse ou à moitié traité. */
function itemIncomplet(it: Item, langue: "en" | "fle", sel: number): string {
  const vides = langue === "en"
    ? ["___ (je ne sais pas)", "? (pas sûr{e})", "___", "… (je n'ai pas compris la consigne)"]
    : ["___ (je ne sais pas)", "? (je ne suis pas sûr{e})", "___", "… (je n'ai pas compris ce mot)"];
  const num = /^\d+$/.test(it.num) ? `${it.num}. ` : "";
  return `${num}${vides[sel % vides.length]}`;
}

// Commentaires d'apprenant en fin de copie (16 par moment) : garantissent deux copies différentes.
const COMMENTAIRES_DEBUT: string[] = [
  "J'ai répondu vite, sans dictionnaire.", "Je n'étais pas sûr{e} pour plusieurs réponses.", "Je connais ces mots à l'oral mais pas à l'écrit.",
  "J'ai deviné pour certaines réponses.", "C'était difficile, je n'ai pas l'habitude.", "J'ai relu deux fois avant de répondre.",
  "Je pense avoir compris la plupart des phrases.", "Certains mots me sont inconnus.", "J'ai utilisé le contexte pour deviner.",
  "Je fais souvent cette erreur au travail.", "Je me suis aidé{e} des exemples de la consigne.", "Je n'ai pas eu le temps de tout vérifier.",
  "Je préfère l'oral, l'écrit me prend du temps.", "J'ai hésité entre deux réponses.", "Je me souviens de cette règle de l'école.", "C'est un point que je veux travailler.",
];
const COMMENTAIRES_FIN: string[] = [
  "J'ai appliqué la règle vue dans la leçon.", "J'ai vérifié avec le vocabulaire du module.", "Cette fois j'ai trouvé plus facilement.",
  "Je me suis relu{e} avant de valider.", "Il me reste un doute sur une réponse.", "J'utilise maintenant ces phrases au travail.",
  "J'ai repensé au dialogue de la leçon.", "Je suis plus à l'aise qu'au début.", "J'ai répondu sans aide.",
  "J'ai mieux compris la différence grâce aux exercices.", "J'ai pris mon temps pour chaque phrase.", "Je confonds encore parfois deux mots.",
  "J'ai relu mes notes du carnet avant.", "Je reconnais maintenant les formules polies.", "J'ai gardé la même méthode que pour l'examen blanc.", "Je veux encore m'entraîner sur ce point.",
];

/** Part d'items justes selon le niveau et le moment (la fin est toujours supérieure au début). */
const PART_JUSTE: Record<NiveauLilate, [number, number]> = { A1: [0.25, 0.6], A2: [0.4, 0.75], B1: [0.6, 0.85], B2: [0.75, 1] };

export interface QuestionLilate { question: string; reponseAttendue: string }

function copie(q: QuestionLilate, base: number, qi: number, niv: NiveauLilate, isDebut: boolean, langue: "en" | "fle", fem: boolean) {
  const items = itemsCorrige(q.reponseAttendue);
  const mots = motsListe(q.question);
  const part = PART_JUSTE[niv][isDebut ? 0 : 1];
  const n = items.length;
  const nbJustes = n ? Math.max(isDebut ? 0 : 1, Math.min(n, Math.round(part * n + (rang(base, qi + 17, 3) - 1) * 0.5))) : 0;
  // Items réussis : plutôt les premiers (les plus simples), avec une variation par stagiaire.
  const ordre = [...Array(n).keys()].sort((a, b) => (a + rang(base + a, qi + 29, 3)) - (b + rang(base + b, qi + 29, 3)));
  const justes = new Set(ordre.slice(0, nbJustes));
  const lignes = items.map((it, k) => {
    if (justes.has(k)) return it.texte;
    const sel = rang(base, qi * 5 + k + 1, 7);
    const faux = itemFaux(it, mots, langue, sel);
    // Au début, une partie des items ratés est laissée vide ; à la fin, l'apprenant tente toujours.
    if (faux && (!isDebut || rang(base, qi + k + 41, 3) !== 0)) return faux;
    return isDebut ? itemIncomplet(it, langue, sel) : (faux ?? it.texte.replace(/[.!?]?$/, " (?)"));
  });
  const comms = isDebut ? COMMENTAIRES_DEBUT : COMMENTAIRES_FIN;
  const comm = comms[rang(base, qi + (isDebut ? 3 : 9), comms.length)];
  const corps = lignes.length ? lignes.join("<br>") : (isDebut ? "Je ne sais pas encore répondre à cette question." : q.reponseAttendue.split("\n")[0]);
  const ratio = n ? nbJustes / n : isDebut ? 0 : 1;
  const score = ratio >= 0.8 ? 1 : ratio >= 0.4 ? 0.5 : 0;
  return { reponse: accorder(`${corps}<br><em>${comm}</em>`, fem), score };
}

/** Réponses aux questions ouvertes de positionnement (début ou fin), propres à chaque stagiaire. */
export function getLilateAutoAnswers(
  questions: QuestionLilate[], nom: string | undefined, prenom: string | undefined, civilite: string | undefined,
  isDebut: boolean, idx?: number, langue: "en" | "fle" = "en",
): { reponses: string[]; scores: number[] } {
  const base = baseIndex(idx, nom, prenom);
  const niv = lilateNiveau(idx, nom, prenom);
  const fem = isFeminin(civilite, prenom);
  const out = questions.map((q, qi) => copie(q, base, qi, niv, isDebut, langue, fem));
  return { reponses: out.map((x) => x.reponse), scores: out.map((x) => x.score) };
}

// ---------------------------------------------------------------------------
// Mises en situation (exercices du parcours)
// ---------------------------------------------------------------------------
type ExoPreset = { titre: string; consigne: string; reponseAttendue: string };
const EXOS: Record<"en" | "fle", ExoPreset[]> = {
  en: (lilateEn as { exercices: ExoPreset[] }).exercices,
  fle: (lilateFle as { exercices: ExoPreset[] }).exercices,
};

const BILANS: Record<"en" | "fle", string[]> = {
  en: [
    "J'ai préparé par écrit avant de le dire à voix haute.", "Je me suis enregistré{e} deux fois ; la deuxième version est plus fluide.",
    "J'ai encore du mal avec la prononciation de certains mots.", "J'ai réutilisé les formules polies de la leçon.",
    "Je parle encore un peu lentement, mais je me fais comprendre.", "J'ai comparé avec le modèle et corrigé deux fautes.",
    "Cette situation arrive vraiment dans mon travail.", "J'ai oublié une étape au premier essai, puis je l'ai ajoutée.",
    "Je dois mémoriser le vocabulaire du module.", "Je me sens plus à l'aise au téléphone qu'en face à face.",
    "J'ai demandé au formateur une précision sur une expression.", "Je vais réutiliser ces phrases avec nos clients étrangers.",
    "J'ai mis plus de temps que prévu pour la partie écrite.", "Le dialogue de la leçon m'a beaucoup aidé{e}.",
    "Je fais encore des erreurs de temps, je les ai notées.", "J'ai relu à voix haute pour vérifier l'intonation.",
  ],
  fle: [
    "J'ai préparé mes phrases à l'écrit avant de parler.", "Je me suis enregistré{e} et j'ai réécouté.",
    "La prononciation de certains sons est encore difficile pour moi.", "J'ai utilisé le vouvoiement comme dans la leçon.",
    "Je parle lentement, mais on me comprend.", "J'ai comparé avec le modèle et j'ai corrigé mes fautes.",
    "Cette situation arrive dans mon travail.", "J'ai oublié une étape, puis je l'ai ajoutée.",
    "Je dois encore apprendre le vocabulaire du module.", "Je suis plus à l'aise à l'écrit qu'à l'oral.",
    "J'ai demandé au formateur le sens d'un mot.", "Je vais utiliser ces phrases avec mes collègues.",
    "La partie écrite m'a pris du temps.", "Le dialogue de la leçon m'a aidé{e}.",
    "Je fais encore des erreurs d'accord, je les ai notées.", "J'ai relu à voix haute pour les liaisons.",
  ],
};

const PRENOMS_MODELES = /\b(Julien|Fatou|Sophie|Paul|Kevin|Nadia|Marc|Julie|Sophie Le\w*)\b/g;

/** Production orale préparée par écrit : modèle repris avec le prénom du stagiaire, raccourci et imparfait selon le niveau. */
function productionOrale(modele: string, s: { prenom?: string; entreprise?: string }, niv: NiveauLilate, langue: "en" | "fle", base: number, ei: number): string {
  let txt = nettoyer(modele.replace(/[«»"]/g, ""));
  const prenom = (s.prenom || "").trim();
  if (prenom) txt = txt.replace(PRENOMS_MODELES, prenom);
  const phrases = txt.split(/(?<=[.!?])\s+/).filter(Boolean);
  const garder: Record<NiveauLilate, number> = { A1: 3, A2: 4, B1: 6, B2: 99 };
  let out = phrases.slice(0, Math.max(2, garder[niv]));
  // Maladresses : une à deux erreurs typiques aux niveaux A1–A2, une au niveau B1.
  const nbErreurs = niv === "A1" ? 2 : niv === "A2" ? 1 + rang(base, ei + 7, 2) : niv === "B1" ? rang(base, ei + 7, 2) : 0;
  const erreurs = langue === "en" ? ERREURS_EN : ERREURS_FLE;
  for (let e = 0, k = rang(base, ei + 11, Math.max(1, out.length)); e < nbErreurs && out.length; e++, k++) {
    const i = k % out.length;
    const cand = erreurs.filter(([re]) => re.test(out[i]));
    if (cand.length) { const [re, rep] = cand[rang(base, ei + e, cand.length)]; out[i] = out[i].replace(re, rep); }
  }
  if (niv === "B2") {
    const ajout = langue === "en"
      ? ["Is there anything else I can do for you?", "Please don't hesitate to contact me if you need more information.", "I'll send you a short summary by email.", "Thank you for your patience."]
      : ["Est-ce que je peux vous aider pour autre chose ?", "N’hésitez pas à me contacter si besoin.", "Je vous envoie un récapitulatif par e-mail.", "Merci de votre patience."];
    out = [...out, ajout[rang(base, ei + 19, ajout.length)]];
  }
  return out.join(" ");
}

export function pickLilateExerciceAnswer(
  intitule: string, code: string | undefined, exerciceIdx: number, stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string }, contexte?: string,
): string | null {
  if (!isLilateFormation(intitule, code)) return null;
  const langue = lilateLangue(intitule, code);
  const exos = EXOS[langue];
  const t = (contexte || "").trim();
  const ex = exos.find((e) => t && (e.titre === t || t.startsWith(e.titre))) ?? exos[((exerciceIdx % exos.length) + exos.length) % exos.length];
  const base = baseIndex(stagiaireIdx, s.nom, s.prenom);
  const niv = lilateNiveau(stagiaireIdx, s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const oral = /Modèle de réponse/i.test(ex.reponseAttendue) || /oral/i.test(ex.titre);
  const bilan = BILANS[langue][rang(base, exerciceIdx + 11, BILANS[langue].length)];
  let corps: string;
  if (oral) corps = productionOrale(ex.reponseAttendue, s, niv, langue, base, exerciceIdx);
  else {
    // Exercice écrit : copie item par item, niveau entre le début et la fin du parcours.
    const c = copie({ question: ex.consigne, reponseAttendue: ex.reponseAttendue }, base, exerciceIdx + 20, niv, rang(base, exerciceIdx + 3, 4) === 0, langue, fem);
    corps = c.reponse.replace(/<br><em>[\s\S]*<\/em>$/, "");
  }
  const entreprise = (s.entreprise || "").trim();
  const ctx = entreprise && entreprise.toLowerCase() !== "entreprise" ? `J'ai pensé à une situation réelle chez ${entreprise}. ` : "";
  return accorder(`${corps}<br><em>${ctx}${bilan}</em>`, fem);
}

// ---------------------------------------------------------------------------
// Évaluation des besoins
// ---------------------------------------------------------------------------
interface ProfilBesoin { besoin: string; objectif: string; projet: string; attentes: string; missions: string; contribution: string }

const PROFILS: Record<"en" | "fle", ProfilBesoin[]> = {
  en: [
    { besoin: "Accueillir en anglais les visiteurs étrangers qui se présentent à l'accueil, comprendre leur demande et les orienter.", objectif: "Être capable d'accueillir, de renseigner et d'orienter un visiteur anglophone sans passer par un collègue.", projet: "Prendre en charge seul{e} l'accueil des clients internationaux.", attentes: "La structure attend un accueil fluide et poli des visiteurs anglophones.", missions: "Accueil physique et téléphonique, gestion des badges et des rendez-vous, orientation des visiteurs.", contribution: "Réduire les appels à des collègues pour traduire et améliorer l'image de l'accueil." },
    { besoin: "Répondre au téléphone en anglais, prendre un message complet et le transmettre sans erreur de nom ou de numéro.", objectif: "Mener un appel simple en anglais : identifier l'interlocuteur, noter la demande, épeler et confirmer.", projet: "Assurer le standard pendant les permanences sans renvoyer les appels étrangers.", attentes: "Les appels de clients et fournisseurs étrangers doivent être traités dès le premier contact.", missions: "Standard téléphonique, prise de messages, gestion de l'agenda de l'équipe.", contribution: "Ne plus perdre d'appels de partenaires étrangers." },
    { besoin: "Rédiger des e-mails professionnels courts en anglais (confirmation, relance, réponse à une réclamation).", objectif: "Écrire un e-mail clair et poli en anglais avec les formules d'ouverture et de clôture adaptées.", projet: "Gérer seul{e} les échanges écrits avec les clients étrangers de mon portefeuille.", attentes: "Les e-mails envoyés aux clients étrangers doivent être compréhensibles et professionnels.", missions: "Suivi des commandes, relances, réponses aux demandes des clients par e-mail.", contribution: "Raccourcir les délais de réponse aux clients anglophones." },
    { besoin: "Suivre une réunion ou une visioconférence en anglais et en retenir les informations utiles.", objectif: "Comprendre l'essentiel d'une réunion en anglais, reformuler pour vérifier et prendre des notes fiables.", projet: "Participer activement aux réunions avec le groupe ou les partenaires étrangers.", attentes: "La structure attend que je puisse rendre compte des réunions internationales.", missions: "Coordination de projets, participation aux réunions d'équipe, comptes rendus.", contribution: "Éviter les malentendus et les décisions mal comprises après les réunions." },
    { besoin: "Expliquer une procédure ou des consignes de sécurité en anglais à des intervenants étrangers.", objectif: "Transmettre en anglais des consignes simples, étape par étape, et vérifier qu'elles sont comprises.", projet: "Accueillir les intervenants et prestataires étrangers sur le site.", attentes: "Les consignes de sécurité doivent être comprises par tous les intervenants.", missions: "Accueil des prestataires, explication des règles du site, suivi des interventions.", contribution: "Réduire les risques liés à des consignes mal comprises." },
    { besoin: "Lire et exploiter des documents en anglais : notices, tableaux, e-mails de partenaires.", objectif: "Repérer rapidement les informations utiles d'un document en anglais et les transmettre en français.", projet: "Traiter seul{e} les documents fournis en anglais par nos fournisseurs.", attentes: "Les informations des documents en anglais doivent être exploitées sans retard.", missions: "Gestion des commandes et des fiches techniques, relation fournisseurs.", contribution: "Gagner du temps sur le traitement des documents fournisseurs." },
    { besoin: "Traiter une réclamation d'un client anglophone avec calme et des formules adaptées.", objectif: "Écouter, reformuler, s'excuser et proposer une solution en anglais.", projet: "Prendre en charge le service client pour la clientèle étrangère.", attentes: "Les clients étrangers mécontents doivent recevoir une réponse rapide et polie.", missions: "Service après-vente, traitement des réclamations, suivi des retours.", contribution: "Améliorer la satisfaction des clients étrangers." },
    { besoin: "Reprendre confiance à l'oral en anglais après plusieurs années sans pratique.", objectif: "Oser parler en anglais dans des situations de travail simples et connaître mon niveau CECRL.", projet: "Évoluer vers un poste en contact avec une clientèle internationale.", attentes: "Je souhaite pouvoir répondre aux demandes en anglais qui arrivent de plus en plus souvent.", missions: "Accueil, conseil et vente auprès d'une clientèle variée.", contribution: "Ouvrir mon poste à la clientèle étrangère." },
  ],
  fle: [
    { besoin: "Accueillir les clients en français, comprendre leur demande et répondre poliment.", objectif: "Accueillir une personne en français, lui demander son nom et sa demande, et l'orienter.", projet: "Travailler à l'accueil sans demander l'aide d'un collègue.", attentes: "La structure attend un accueil poli et clair des clients francophones.", missions: "Accueil des clients, renseignements, orientation.", contribution: "Améliorer la qualité de l'accueil." },
    { besoin: "Comprendre les consignes de mon responsable et les consignes de sécurité affichées.", objectif: "Lire et comprendre une note, un affichage ou une procédure en français.", projet: "Travailler en autonomie sur mon poste et respecter les règles du site.", attentes: "Les consignes doivent être comprises et appliquées sans erreur.", missions: "Préparation des commandes, rangement, respect des règles de sécurité.", contribution: "Réduire les erreurs et les risques au travail." },
    { besoin: "Répondre au téléphone en français et prendre un message complet.", objectif: "Noter le nom, le numéro et la demande d'un appel, puis transmettre le message.", projet: "Pouvoir assurer les appels quand mes collègues sont absents.", attentes: "Les appels doivent être traités correctement.", missions: "Accueil téléphonique, prise de rendez-vous.", contribution: "Ne plus perdre d'appels." },
    { besoin: "Écrire un message court ou un e-mail simple en français à un collègue ou à un client.", objectif: "Écrire un SMS ou un e-mail clair, avec une formule de politesse adaptée.", projet: "Communiquer par écrit avec mon équipe sans faire relire mes messages.", attentes: "Les messages écrits doivent être compréhensibles.", missions: "Échanges avec l'équipe, signalement des absences et des problèmes.", contribution: "Faciliter l'organisation de l'équipe." },
    { besoin: "Participer à une réunion d'équipe en français et comprendre les décisions prises.", objectif: "Comprendre l'essentiel d'une réunion, poser une question et reformuler.", projet: "Prendre la parole pendant les réunions de service.", attentes: "Chaque salarié doit comprendre les décisions des réunions.", missions: "Travail en équipe, participation aux réunions de service.", contribution: "Mieux intégrer l'équipe et éviter les malentendus." },
    { besoin: "Expliquer une procédure simple en français à un nouveau collègue.", objectif: "Transmettre des consignes étape par étape avec « d'abord, ensuite, enfin ».", projet: "Former les nouveaux arrivants sur mon poste.", attentes: "Les nouveaux collègues doivent être formés correctement.", missions: "Production, transmission des consignes, tutorat.", contribution: "Accélérer l'intégration des nouveaux collègues." },
    { besoin: "Gérer un client mécontent en français avec des phrases professionnelles.", objectif: "Écouter, reformuler, s'excuser et proposer une solution.", projet: "Être plus autonome face aux clients en magasin.", attentes: "Les clients mécontents doivent être bien reçus.", missions: "Vente, conseil, encaissement, service client.", contribution: "Améliorer la satisfaction des clients." },
    { besoin: "Améliorer ma prononciation et ma compréhension orale pour être plus à l'aise au travail.", objectif: "Parler plus clairement et comprendre mes collègues quand ils parlent vite.", projet: "Évoluer vers un poste avec plus de contact avec le public.", attentes: "Je souhaite être compris{e} du premier coup.", missions: "Travail en équipe, échanges avec le public.", contribution: "Mieux communiquer avec l'équipe et les clients." },
  ],
};

function profil(langue: "en" | "fle", idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  const p = PROFILS[langue];
  return p[rang(baseIndex(idx, nom, prenom), 2, p.length)];
}

export function getLilateBesoin(intitule: string | undefined, code: string | undefined, nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return accorder(profil(lilateLangue(intitule, code), idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

const PARCOURS: Record<"en" | "fle", string[]> = {
  en: [
    "Anglais appris au collège et au lycée, peu pratiqué depuis", "Baccalauréat, anglais LV1 ; utilisation ponctuelle au travail",
    "BTS, anglais pratiqué à l'écrit (e-mails) mais peu à l'oral", "CAP, anglais très peu étudié", "Licence, anglais de niveau scolaire",
    "Baccalauréat professionnel, anglais appris en autodidacte (séries, applications)", "Formation antérieure en anglais il y a plusieurs années",
    "BTS, séjour linguistique court, oral à reprendre", "Diplôme obtenu à l'étranger, anglais utilisé au quotidien dans un poste précédent",
    "Baccalauréat, anglais compris à l'écrit, difficultés à l'oral", "Pas de diplôme en anglais, pratique au contact des clients", "Master, anglais technique de mon métier",
  ],
  fle: [
    "Scolarité dans mon pays d'origine, français appris en arrivant en France", "Diplôme obtenu à l'étranger, en cours de reconnaissance",
    "Cours de français associatifs suivis l'année dernière", "Baccalauréat dans mon pays, français appris à l'école",
    "Pas de diplôme, français appris au travail", "Licence obtenue à l'étranger ; français écrit à améliorer",
    "Formation professionnelle dans mon pays, français oral courant", "Cours de français en ligne en autonomie",
    "Diplôme technique étranger, français appris avec mes collègues", "Scolarité courte, je comprends mieux que je ne parle",
    "Études supérieures à l'étranger ; français appris en famille", "Contrat d'intégration républicaine, cours de français suivis",
  ],
};
const HANDICAP = [
  "Non, je n'ai pas de situation de handicap et pas besoin d'adaptation.", "Non. Je souhaite pouvoir réécouter les vidéos autant que nécessaire.",
  "Non, aucun besoin particulier.", "Non. Les sous-titres des vidéos me sont utiles.", "Oui, une fatigue visuelle : je préfère agrandir les textes à l'écran.",
  "Non. Je sais que je peux contacter le référent handicap si besoin.", "Non, pas d'aménagement nécessaire.", "Oui, une légère baisse d'audition : un casque et les sous-titres me conviennent.",
  "Non. Je préfère des séances courtes et régulières.", "Non, je n'ai pas de besoin particulier.", "Non. J'aimerais pouvoir télécharger les cours pour les relire.", "Non, aucun aménagement.",
];
const DISPOS = [
  "Je me connecterai le matin avant ma prise de poste, environ une heure par jour.", "Je suivrai le parcours en fin de journée, trois à quatre fois par semaine.",
  "J'ai prévu deux créneaux par semaine sur mon temps de travail, accordés par mon responsable.", "Je travaillerai surtout le week-end et un soir par semaine.",
  "Je me connecterai pendant ma pause de midi et le soir.", "J'ai bloqué deux demi-journées par semaine dans mon planning.",
  "Je suis disponible en journée, en dehors de mes heures de service.", "Je ferai une séance courte chaque jour, sur ordinateur ou tablette.",
  "Mes horaires changent chaque semaine : je planifierai mes séances dans l'agenda de la plateforme.", "Je peux me connecter tous les matins de 9 h à 10 h 30.",
];

/** Réponses d'évaluation des besoins LILATE, différentes pour chaque stagiaire. */
export function getLilateEvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean, idx?: number, intitule?: string, code?: string,
) {
  const langue = lilateLangue(intitule, code);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const p = profil(langue, idx, s.nom, s.prenom);
  const niv = lilateNiveau(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const civ = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : (s.civilite || "Madame");
  const test = langue === "en" ? "le test LILATE anglais" : "le test LILATE français langue étrangère";
  return {
    civilite: civ,
    raisonSociale: hasEntreprise ? (s.entreprise as string) : "/",
    attentes: accorder(p.attentes, fem),
    missions: accorder(p.missions, fem),
    contribution: accorder(p.contribution, fem),
    diplome: pick(PARCOURS[langue], 4),
    objectif: accorder(`${p.objectif} Je souhaite aussi me préparer à ${test}, passé auprès de LINGUEO ; j'estime mon niveau actuel autour de ${niv}, le test de niveau le précisera.`, fem),
    budget: hasEntreprise
      ? "Formation prise en charge dans le cadre du plan de développement des compétences de ma structure."
      : "Formation financée par mon compte personnel de formation (CPF), à mon initiative.",
    projetPro: accorder(p.projet, fem),
    handicap: pick(HANDICAP, 6),
    // Suit le nom (lu aussi hors de la session, sans rang) : identique partout.
    disponibilites: DISPOS[lilateSeed(s.nom, s.prenom) % DISPOS.length],
  };
}
