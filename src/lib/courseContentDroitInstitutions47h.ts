import type { CourseChapter } from "./courseContent";
import { DRI47_CHAPITRE_1 } from "./droitInstitutions47h/chapitre1";
import { DRI47_CHAPITRE_2 } from "./droitInstitutions47h/chapitre2";
import { DRI47_CHAPITRE_3 } from "./droitInstitutions47h/chapitre3";
import { DRI47_CHAPITRE_4 } from "./droitInstitutions47h/chapitre4";
import { DRI47_CHAPITRE_5 } from "./droitInstitutions47h/chapitre5";
import { DRI47_CHAPITRE_6 } from "./droitInstitutions47h/chapitre6";
import { DRI21_INTITULE, DRI21_MODULES } from "./droitInstitutions47hPreset";

/**
 * Support de cours « Enseignement : fondamentaux du droit et des institutions » (6 chapitres, un par module) :
 * 1 fondements du droit, sources et hiérarchie des normes, 2 les branches du droit,
 * 3 la Constitution de la Ve République, 4 institutions politiques et territoriales, citoyenneté et libertés,
 * 5 ordre interne, droit de l'Union européenne et traités, 6 organisation juridictionnelle.
 * Cas pratiques fictifs : Camille, la commune de Valmont-sur-Seine, l'entreprise Atelier Valmontais.
 */
export function getDroitInstitutions47hChapters(): CourseChapter[] {
  return [DRI47_CHAPITRE_1, DRI47_CHAPITRE_2, DRI47_CHAPITRE_3, DRI47_CHAPITRE_4, DRI47_CHAPITRE_5, DRI47_CHAPITRE_6];
}

// ---------------------------------------------------------------------------
// Variante 21 h « Initiation au droit et aux institutions politiques » : mêmes chapitres, sauf les
// blocs qui décrivent le calendrier de la 47 h (modules de 8 h en deux demi-journées), remplacés
// par la place du module dans les 3 jours de 7 h (un module par demi-journée de 3 h 30).
// ---------------------------------------------------------------------------
const INTITULE_47H = "Enseignement : fondamentaux du droit et des institutions";

/** Titres h3 des blocs propres au calendrier de la 47 h. */
const BLOC_HORAIRE_47H = /^(Le découpage en six modules|Les six modules de la formation|(La )?[Pp]lace du module dans la formation|Déroulé du module|Déroulé horaire)/;

function placeDuModule21h(n: number): string {
  const m = DRI21_MODULES[n - 1];
  const lignes = DRI21_MODULES.map((x) => {
    const cells = [`Jour ${x.jour}, ${x.creneau}`, `Module ${x.n} (${x.c}) : ${x.titre}`, "3 h 30"];
    return "<tr>" + cells.map((c) => `<td>${x.n === n ? `<strong>${c}</strong>` : c}</td>`).join("") + "</tr>";
  }).join("\n");
  return `<h3>Place du module dans la formation</h3>\n<p>La formation « ${DRI21_INTITULE} » dure <strong>21 heures</strong>, sur <strong>3 jours de 7 heures</strong>, entièrement en classe virtuelle (09h00 – 12h30 et 13h30 – 17h00). Chaque module occupe une demi-journée de <strong>3 h 30</strong> : le module ${n} a lieu le <strong>jour ${m.jour}, de ${m.creneau.replace(" – ", " à ")}</strong>. Il alterne apports, lecture guidée de textes, mises en situation et QCM de fin de module ; les approfondissements du chapitre se lisent entre les séances.</p>\n<table>\n<tr><th>Créneau</th><th>Module</th><th>Durée</th></tr>\n${lignes}\n<tr><td><strong>Total</strong></td><td></td><td><strong>21 h</strong></td></tr>\n</table>\n`;
}

function retirerBlocsHoraires(html: string): string {
  return html
    .split(/(?=<h[234][ >])/)
    .filter((bloc) => {
      const titre = /^<h[34][^>]*>([^<]*)<\/h[34]>/.exec(bloc)?.[1].trim();
      return !(titre && BLOC_HORAIRE_47H.test(titre));
    })
    .join("");
}

/** Intitulé, durée totale et durée des modules (8 h ou 7 h dans la 47 h, 3 h 30 ici). */
function adapterTexte(s: string): string {
  return s
    .split(INTITULE_47H).join(DRI21_INTITULE)
    .replace(/\b47 heures\b/g, "21 heures")
    .replace(/\b47 h\b/g, "21 h")
    .replace(/six modules \(8 \+ 8 \+ 8 \+ 8 \+ 8 \+ 7 h\)/g, "six modules de 3 h 30")
    .replace(/\b([Mm]odule \d) \((?:8|7) (?:h|heures)\)/g, "$1 (3 h 30)")
    .replace(/<td>Module (\d)<\/td><td>(?:8|7) h<\/td>/g, "<td>Module $1</td><td>3 h 30</td>");
}

/** Insère le bloc avant le deuxième titre de la section (après son introduction), sinon à la fin. */
function insererApresIntroduction(html: string, bloc: string): string {
  const idx = html.indexOf("<h3", 1);
  return idx > 0 ? html.slice(0, idx) + bloc + html.slice(idx) : html + bloc;
}

function adapterChapitre21h(ch: CourseChapter, n: number): CourseChapter {
  return {
    title: adapterTexte(ch.title).replace(/\(\d+ h\)/, "(3 h 30)"),
    description: adapterTexte(ch.description).replace(/\bde \d+ h\b/, "de 3 h 30"),
    sections: ch.sections.map((sec, i) => {
      const content = retirerBlocsHoraires(sec.content);
      return {
        title: adapterTexte(sec.title),
        content: adapterTexte(i === 0 ? insererApresIntroduction(content, placeDuModule21h(n)) : content),
      };
    }),
  };
}

export function getDroitInstitutions21hChapters(): CourseChapter[] {
  return getDroitInstitutions47hChapters().map((ch, i) => adapterChapitre21h(ch, i + 1));
}
