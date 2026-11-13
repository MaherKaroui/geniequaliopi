/**
 * Automatisation EDOF — feuille d'émargement individuelle, comme celle du générateur Qualiopi :
 * une ligne par demi-journée (09h00–12h30 / 13h30–17h00), signature du stagiaire et du formateur,
 * cachet du centre. Seules les signatures fournies sont posées ; sinon les cases restent vides.
 */
import { estJourFerie } from "@/lib/joursFeries";
import { frDate, type EdofCandidat } from "./candidats";
import { DocPdf } from "./pdfMiseEnPage";
import { nomComplet, type ContexteRS7650 } from "./rs7650Pdf";
import { cleCandidat, marqueCentre } from "./signatures";

export interface DemiJournee { date: string; libelle: "Matin" | "Après-midi"; debut: string; fin: string; minutes: number }

const JOUR = 420; // 7 h
const MATIN = 210; // 09h00–12h30
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const heure = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}h${String(min % 60).padStart(2, "0")}`;
export const dureeTexte = (min: number) => `${Math.floor(min / 60)} h${min % 60 ? ` ${String(min % 60).padStart(2, "0")}` : ""}`;

/**
 * Jours de présence de la session : du lundi au vendredi hors jours fériés, puis les samedis si le
 * volume connu ne tient pas en semaine. Chaque jour fait 7 h, le dernier prend le reste ; sans volume
 * connu (export CSV), 7 h par jour ouvré.
 */
export function planningEmargement(c: EdofCandidat): DemiJournee[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(c.dateDebut) || !/^\d{4}-\d{2}-\d{2}$/.test(c.dateFin)) return [];
  const debut = new Date(`${c.dateDebut}T12:00:00`), fin = new Date(`${c.dateFin}T12:00:00`);
  const semaine: Date[] = [], samedis: Date[] = [];
  for (const d = new Date(debut); d <= fin; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 0 || estJourFerie(d)) continue;
    (d.getDay() === 6 ? samedis : semaine).push(new Date(d));
  }
  const total = c.dureeHeures ? Math.round(c.dureeHeures * 60) : 0;
  let jours = total > semaine.length * JOUR || semaine.length === 0 ? [...semaine, ...samedis] : semaine;
  jours = jours.sort((a, b) => a.getTime() - b.getTime());
  if (!jours.length) return [];

  let minutes: number[];
  if (!total) minutes = jours.map(() => JOUR);
  else if (total <= jours.length * JOUR && total > (jours.length - 1) * JOUR) {
    minutes = jours.map((_, i) => (i < jours.length - 1 ? JOUR : total - (jours.length - 1) * JOUR));
  } else {
    // Moins d'heures que de jours pleins, ou plus de 7 h par jour : répartition égale par pas de 15 min.
    const base = Math.floor(total / jours.length / 15) * 15;
    minutes = jours.map(() => base);
    let reste = total - base * jours.length;
    for (let i = 0; reste > 0; i = (i + 1) % jours.length) { const a = Math.min(15, reste); minutes[i] += a; reste -= a; }
  }

  const out: DemiJournee[] = [];
  jours.forEach((d, i) => {
    const m = minutes[i];
    const matin = Math.min(m, MATIN);
    out.push({ date: iso(d), libelle: "Matin", debut: heure(540), fin: heure(540 + matin), minutes: matin });
    if (m > matin) out.push({ date: iso(d), libelle: "Après-midi", debut: heure(810), fin: heure(810 + m - matin), minutes: m - matin });
  });
  return out;
}

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const jourLong = (d: string) => `${JOURS[new Date(`${d}T12:00:00`).getDay()]} ${frDate(d)}`;

export async function docEmargement(ctx: ContexteRS7650, c: EdofCandidat): Promise<Uint8Array> {
  const formation = c.codeCertif && c.intitule ? `${c.intitule} (${c.codeCertif})` : c.intitule || c.codeCertif;
  const doc = await DocPdf.creer({ organisme: ctx.centre.nom, titre: "FEUILLE D'ÉMARGEMENT", sousTitre: formation, reference: `Dossier CPF ${c.numeroDossier}` });
  const planning = planningEmargement(c);
  const total = planning.reduce((n, p) => n + p.minutes, 0);
  doc.tableau(["Stagiaire", "Session", "Lieu", "Formateur"], [[
    { t: `${c.civilite} ${nomComplet(c)}`.trim(), reponse: true },
    { t: `du ${frDate(c.dateDebut)} au ${frDate(c.dateFin)}${total ? ` — ${dureeTexte(total)}` : ""}`, reponse: true },
    { t: [ctx.centre.nom, ctx.centre.adresse].filter(Boolean).join(", "), reponse: true },
    { t: ctx.formateur || "", reponse: true },
  ]], [3, 3, 4, 3]);
  const sigStagiaire = ctx.signatures?.candidats?.[cleCandidat(c)];
  const sigFormateur = ctx.signatures?.formateur;
  await doc.tableauSignatures(
    ["Date", "Demi-journée", "Horaires", "Durée", "Signature du stagiaire", "Signature du formateur"],
    planning.map((p, i) => ({
      cellules: [
        i === 0 || planning[i - 1].date !== p.date ? { t: jourLong(p.date), gras: true } : "",
        p.libelle,
        { t: `${p.debut} – ${p.fin}`, centre: true },
        { t: dureeTexte(p.minutes), centre: true },
        "",
        "",
      ],
      images: [undefined, undefined, undefined, undefined, sigStagiaire, sigFormateur],
    })),
    [3.2, 2, 2.4, 1.4, 3, 3],
  );
  doc.paragraphe(`Total des heures émargées : ${dureeTexte(total)}.`, { gras: true });
  await doc.signatures(["Cachet du centre de formation"], [ctx.centre.nom], [marqueCentre(ctx.signatures)]);
  return doc.enregistrer();
}
