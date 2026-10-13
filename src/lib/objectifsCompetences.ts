/**
 * Sépare le champ « objectifs » d'une formation en deux contenus distincts
 * pour le programme :
 *  - section 4 « Objectifs pédagogiques » : objectif général + objectifs
 *    opérationnels (l'intitulé de chaque capacité, sans le détail) ;
 *  - section 5 « Compétences développées » : chaque compétence avec les
 *    savoirs / savoir-faire mobilisés (le détail après « : ») et la séquence
 *    du programme qui la travaille.
 * Avant, la section 5 reprenait mot pour mot la liste de la section 4.
 */

export interface CompetenceDetaillee {
  code: string;
  intitule: string;
  contenus: string[];
  sequence: string;
}

export interface ObjectifsCompetences {
  general: string;
  operationnels: string[];
  competences: CompetenceDetaillee[];
}

const LIGNE_META = /^(formation (professionnelle )?(non )?certifiante|à l'issue de (la|cette) formation.*capable de\s*:?)\.?$/i;

function nettoie(l: string): string {
  return l.trim().replace(/^[-•*]\s*/, "").trim();
}

/** Coupe « intitulé : détail » ou, à défaut, « intitulé (détail) reste ». */
function decoupe(texte: string): { intitule: string; contenus: string[] } {
  const t = texte.replace(/\.$/, "").trim();
  const deuxPoints = t.search(/\s:\s/);
  let intitule = t;
  let detail = "";
  if (deuxPoints > 0) {
    intitule = t.slice(0, deuxPoints).trim();
    detail = t.slice(deuxPoints).replace(/^\s:\s/, "").trim();
  } else {
    // « Négocier les objections (prix, délai) par la reformulation » :
    // la parenthèse donne le détail, le reste de la phrase reste dans l'intitulé.
    const m = t.match(/^(.*?)\s\(([^()]*)\)\s*(.*)$/);
    if (m && m[2].includes(",")) {
      intitule = `${m[1].trim()}${m[3] ? " " + m[3].trim() : ""}`;
      detail = m[2].trim();
    }
  }
  // Découpe le détail sur les virgules de premier niveau (hors parenthèses).
  const contenus: string[] = [];
  let prof = 0;
  let cur = "";
  for (const ch of detail) {
    if (ch === "(") prof++;
    if (ch === ")") prof = Math.max(0, prof - 1);
    if (ch === "," && prof === 0) { contenus.push(cur); cur = ""; continue; }
    cur += ch;
  }
  contenus.push(cur);
  return {
    intitule,
    contenus: contenus.map(c => c.trim()).filter(c => c.length > 1).map(c => c.charAt(0).toUpperCase() + c.slice(1)),
  };
}

function sequencePour(code: string, programme: string): string {
  if (!code) return "";
  const re = new RegExp(`\\b${code}\\b`);
  const lignes = (programme || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const titre = lignes.find(l => re.test(l) && /^(jour|j\d|module|séquence|sequence|demi-journée)/i.test(l));
  if (!titre) return "";
  const m = titre.match(/^((?:jour|module|séquence|sequence|demi-journée)\s*\d+|j\d+)/i);
  return m ? m[1].replace(/^jour/i, "Jour").replace(/^module/i, "Module") : "";
}

export function parseObjectifsCompetences(objectifs: string, programme = ""): ObjectifsCompetences {
  const lignes = (objectifs || "").split(/\r?\n/).map(nettoie).filter(Boolean);
  let general = "";
  const items: string[] = [];
  for (const l of lignes) {
    // Une ligne peut porter plusieurs phrases (« Formation non certifiante. Objectif général : … »).
    const phrases = /^(C\d+|\d+[.)])\s/.test(l) ? [l] : l.split(/(?<=\.)\s+(?=[A-ZÀ-Ý])/);
    for (const p of phrases.map(nettoie)) {
      if (!p || LIGNE_META.test(p)) continue;
      const g = p.match(/^objectif(?:s)? généra(?:l|ux)\s*:\s*(.+)$/i);
      if (g) { general = g[1].replace(/\.$/, "").trim(); continue; }
      if (p.length > 5) items.push(p);
    }
  }

  const operationnels: string[] = [];
  const competences: CompetenceDetaillee[] = [];
  for (const it of items) {
    const m = it.match(/^(C\d+|\d+)\s*[—–\-.:)]\s*(.+)$/);
    const code = m ? m[1] : "";
    const { intitule, contenus } = decoupe(m ? m[2] : it);
    operationnels.push(intitule);
    competences.push({ code, intitule, contenus, sequence: sequencePour(code, programme) });
  }
  return { general, operationnels, competences };
}

type Echap = (s: string) => string;
const brut: Echap = s => s;

/** HTML de la section 4 (objectif général + objectifs opérationnels). */
export function objectifsPedagogiquesHtml(oc: ObjectifsCompetences, esc: Echap = brut, fallback = ""): string {
  if (!oc.general && oc.operationnels.length === 0) return fallback;
  let html = "";
  if (oc.general) html += `<p><strong>Objectif général :</strong> ${esc(oc.general)}.</p>`;
  if (oc.operationnels.length) {
    html += `${oc.general ? "<p><strong>Objectifs opérationnels :</strong></p>" : ""}<ul>${oc.operationnels.map(o => `<li>${esc(o)}</li>`).join("")}</ul>`;
  }
  return html;
}

/** HTML de la section 5 (compétences, savoirs mobilisés, séquence). */
export function competencesDeveloppeesHtml(oc: ObjectifsCompetences, esc: Echap = brut, fallback = ""): string {
  const comps = oc.competences;
  if (comps.length === 0) return fallback;
  const avecDetail = comps.some(c => c.contenus.length > 0);
  if (!avecDetail) {
    // Pas de détail saisi : on présente la compétence comme mise en œuvre attendue,
    // et non comme une copie de l'objectif.
    return `<ul>${comps.map(c => `<li>${c.code ? `<strong>${esc(c.code)}</strong> — ` : ""}${esc(c.intitule)} : mise en œuvre en autonomie en situation professionnelle réelle ou simulée${c.sequence ? ` (${esc(c.sequence)})` : ""}.</li>`).join("")}</ul>`;
  }
  const avecSeq = comps.some(c => c.sequence);
  const rows = comps.map(c => `<tr>
      <td style="vertical-align:top"><strong>${c.code ? esc(c.code) + " — " : ""}${esc(c.intitule)}</strong></td>
      <td style="vertical-align:top">${c.contenus.length ? `<ul style="margin:0;padding-left:18px">${c.contenus.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "Mise en œuvre en situation professionnelle réelle ou simulée"}</td>
      ${avecSeq ? `<td style="vertical-align:top;white-space:nowrap">${esc(c.sequence)}</td>` : ""}
    </tr>`).join("");
  return `<table style="width:100%">
    <tr><th style="width:35%">Compétence</th><th>Savoirs et savoir-faire mobilisés</th>${avecSeq ? `<th style="width:12%">Séquence</th>` : ""}</tr>
    ${rows}
  </table>`;
}
