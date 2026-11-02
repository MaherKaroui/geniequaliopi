/**
 * Remplit les PDF officiels EYES PERFECT (public/edof-auto/rs7650) pour chaque candidat de l'export EDOF.
 * Les modèles ne sont pas redessinés : on écrit par-dessus, aux coordonnées relevées par
 * scripts/edof-auto (PyMuPDF, origine en haut à gauche, d'où la conversion y = hauteur − y).
 *
 * Aucune signature n'est apposée : le règlement exige l'émargement manuscrit du candidat et des 3 jurés.
 */
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { frDate, type EdofCandidat, type SessionExamen } from "./candidats";
import { PRAT_CRITERES, THEO_QUESTIONS, THEO_TOTAUX_P6 } from "./rs7650Layout";
import { CORRIGE_THEO, genererReponses, NOTE_MAX_THEO, type ReponsesCandidat } from "./rs7650Reponses";

export interface Jure { civilite: string; nom: string; statut: string; qualite: string }

export interface ContexteRS7650 {
  centre: { nom: string; adresse: string; ville: string };
  /** 3 jurés ; le premier est le président du jury */
  jury: Jure[];
}

export type ChargeurModele = (fichier: string) => Promise<ArrayBuffer | Uint8Array>;
export const chargeurHttp: ChargeurModele = async (f) => {
  const r = await fetch(`/edof-auto/rs7650/${f}`);
  if (!r.ok) throw new Error(`Modèle introuvable : ${f}`);
  return r.arrayBuffer();
};

const ENCRE = rgb(0.08, 0.17, 0.55);

/** Écriture « manuscrite » sur une page, coordonnées PyMuPDF (haut-gauche). */
class Plume {
  constructor(private page: PDFPage, private font: PDFFont) {}
  private get H() { return this.page.getHeight(); }
  /** Retire les caractères hors WinAnsi (non encodables par les polices standard). */
  propre(s: string): string {
    return [...(s || "")].map((ch) => {
      try { this.font.encodeText(ch); return ch; } catch {
        const base = ch.normalize("NFD").replace(/[̀-ͯ]/g, "");
        try { this.font.encodeText(base); return base; } catch { return ""; }
      }
    }).join("");
  }
  texte(s: string, x: number, baseline: number, size = 10, maxWidth?: number) {
    let t = this.propre(s);
    let sz = size;
    if (maxWidth) while (sz > 5 && this.font.widthOfTextAtSize(t, sz) > maxWidth) sz -= 0.5;
    this.page.drawText(t, { x, y: this.H - baseline, size: sz, font: this.font, color: ENCRE });
  }
  /** Texte aligné à droite sur x. */
  texteDroite(s: string, xDroite: number, baseline: number, size = 11) {
    const t = this.propre(s);
    this.texte(t, xDroite - this.font.widthOfTextAtSize(t, size), baseline, size);
  }
  /** Découpe un texte sur plusieurs lignes de largeur donnée. */
  lignes(s: string, largeur: number, size: number): string[] {
    const mots = this.propre(s).split(/\s+/);
    const out: string[] = [];
    let cur = "";
    for (const m of mots) {
      const essai = cur ? `${cur} ${m}` : m;
      if (this.font.widthOfTextAtSize(essai, size) > largeur && cur) { out.push(cur); cur = m; } else cur = essai;
    }
    if (cur) out.push(cur);
    return out;
  }
  cercle(cx: number, cyTop: number, rx = 7, ry = 6.5) {
    this.page.drawEllipse({ x: cx, y: this.H - cyTop, xScale: rx, yScale: ry, borderColor: ENCRE, borderWidth: 1.1 });
  }
  croix(cx: number, cyTop: number, d = 3.2) {
    const y = this.H - cyTop;
    this.page.drawLine({ start: { x: cx - d, y: y - d }, end: { x: cx + d, y: y + d }, thickness: 1.2, color: ENCRE });
    this.page.drawLine({ start: { x: cx - d, y: y + d }, end: { x: cx + d, y: y - d }, thickness: 1.2, color: ENCRE });
  }
}

const nomComplet = (c: EdofCandidat) => `${c.prenom} ${c.nom}`.trim();
const juryLigne = (j: Jure[]) => j.filter((x) => x.nom).map((x) => `${x.civilite} ${x.nom}`.trim()).join(", ");

async function ouvrir(charger: ChargeurModele, fichier: string) {
  const pdf = await PDFDocument.load(await charger(fichier));
  const oblique = await pdf.embedFont(StandardFonts.HelveticaOblique);
  return { pdf, oblique };
}

/** Nombre d'options de chaque question (pour tirer une mauvaise réponse plausible). */
export const NB_OPTIONS = THEO_QUESTIONS.map((q) => q.options.length);

export function reponsesDe(c: EdofCandidat): ReponsesCandidat {
  return genererReponses(c, NB_OPTIONS);
}

// ─── Évaluation théorique FS063 ───────────────────────────────────────────────

export async function remplirTheo(charger: ChargeurModele, ctx: ContexteRS7650, c: EdofCandidat, rep: ReponsesCandidat) {
  const { pdf, oblique } = await ouvrir(charger, "evaluation-theorique.pdf");
  const pages = pdf.getPages();
  const p0 = new Plume(pages[0], oblique);
  p0.texte(ctx.centre.nom, 172, 115.5, 10, 520);
  p0.texte(nomComplet(c), 80, 160, 11, 220);
  p0.texte(frDate(c.dateDebut), 313, 160, 11);
  p0.texte(frDate(c.dateFin), 546, 160, 11);
  p0.texte(juryLigne(ctx.jury), 80, 200, 9, 222);
  p0.texte(frDate(c.dateFin), 313, 200, 11);
  p0.texte("Oui", 617, 186, 10);

  const sections = [0, 0]; // page 6 : A. hygiène (gauche) / B. technique (droite)
  THEO_QUESTIONS.forEach((q, i) => {
    const plume = new Plume(pages[q.page], oblique);
    const r = rep.theo[i];
    for (const n of r.choix) {
      const o = q.options.find((op) => op[0] === n);
      if (o) plume.cercle(o[1] + 4.5, (o[2] + o[3]) / 2);
    }
    if (CORRIGE_THEO[i] === null) {
      const lignes = q.lignes;
      if (lignes.length === 3 && i === 13) {
        // 3 étapes : une étape par ligne numérotée
        r.texte.forEach((t, k) => lignes[k] && t && plume.texte(t, lignes[k][0] + 14, lignes[k][3] - 2.5, 10));
      } else if (lignes.length) {
        const largeur = lignes[0][2] - lignes[0][0];
        const texte = plume.lignes(r.texte.join(" "), largeur, 9.5).slice(0, lignes.length);
        texte.forEach((t, k) => plume.texte(t, lignes[k][0] + 2, lignes[k][3] - 2.5, 9.5));
      }
    }
    if (q.note) plume.texteDroite(r.juste ? "1" : "0", q.note[0] - 0.5, q.note[2] - 3, 12);
    else if (r.juste) sections[q.options[0][1] > 300 ? 1 : 0]++;
  });
  const p5 = new Plume(pages[5], oblique);
  THEO_TOTAUX_P6.forEach(([x, , y1], k) => p5.texteDroite(String(sections[k]), x - 0.5, y1 - 3, 12.5));
  p5.texte(`Note totale : ${rep.noteTheo}/${NOTE_MAX_THEO}`, 560, 588, 11);
  return pdf.save();
}

// ─── Grille d'évaluation pratique FS055 ───────────────────────────────────────

/** Position des totaux « NOMBRE TOTAL DE CASES COCHEES » : [page, x NA, x A, y bas du libellé]. */
const PRAT_TOTAUX: [number, number, number, number][] = [
  [0, 697.2, 758.6, 568.4],
  [1, 686.5, 753.8, 326.7],
  [2, 685.9, 752.6, 194.5],
  [2, 689.0, 756.4, 549.9],
  [3, 697.2, 755.4, 530.9],
  [4, 689.2, 756.9, 327.4],
];
/** Tableau récapitulatif page 6 : centres des lignes C1→C6 puis TOTAL, colonnes NA / A. */
const RECAP_Y = [309, 341, 374, 407, 439, 474, 509];
const RECAP_X = { na: 204.5, a: 285.5 };

export async function remplirPratique(charger: ChargeurModele, ctx: ContexteRS7650, c: EdofCandidat, rep: ReponsesCandidat) {
  const { pdf, oblique } = await ouvrir(charger, "evaluation-pratique.pdf");
  const pages = pdf.getPages();
  const p0 = new Plume(pages[0], oblique);
  p0.texte(ctx.centre.nom, 147, 117, 10, 400);
  p0.texte(nomComplet(c), 60, 154.5, 10, 255);
  p0.texte(frDate(c.dateDebut), 328, 154.5, 10);
  p0.texte(frDate(c.dateFin), 557, 154.5, 10);
  p0.texte(juryLigne(ctx.jury), 60, 190, 8.5, 255);
  p0.texte(frDate(c.dateFin), 328, 190, 11);
  p0.croix(527.5, 171, 3.5);

  rep.pratique.forEach((criteres, ci) => {
    criteres.forEach((acquis, k) => {
      const [page, naX0, y0, naX1, y1, aX0, aX1] = PRAT_CRITERES[ci][k];
      const plume = new Plume(pages[page], oblique);
      const cx = acquis ? (aX0 + aX1) / 2 : (naX0 + naX1) / 2;
      plume.croix(cx, y0 + (y1 - y0) * 0.55);
    });
    const [page, xNa, xA, yb] = PRAT_TOTAUX[ci];
    const plume = new Plume(pages[page], oblique);
    const nbA = criteres.filter(Boolean).length;
    plume.texteDroite(String(criteres.length - nbA), xNa - 0.5, yb - 2, 11);
    plume.texteDroite(String(nbA), xA - 0.5, yb - 2, 11);
  });

  const p5 = new Plume(pages[5], oblique);
  p5.lignes(rep.commentaireJury, 650, 9.5).slice(0, 2).forEach((l, k) => p5.texte(l, 146, 159 + k * 11.5, 9.5));
  p5.croix(rep.admis ? 406.5 : 583.5, 194.5);
  ctx.jury.filter((j) => j.nom).slice(0, 3).forEach((j, k) =>
    p5.texte(`${j.civilite} ${j.nom}${k === 0 ? " (président(e) du jury)" : ""} – ${j.qualite}`, 56, 226 + k * 6.6, 6.3, 340));
  let totNa = 0, totA = 0;
  rep.pratique.forEach((criteres, ci) => {
    const nbA = criteres.filter(Boolean).length;
    totNa += criteres.length - nbA; totA += nbA;
    p5.texte(String(criteres.length - nbA), RECAP_X.na - 3, RECAP_Y[ci] + 4, 12);
    p5.texte(String(nbA), RECAP_X.a - 4, RECAP_Y[ci] + 4, 12);
  });
  p5.texte(String(totNa), RECAP_X.na - 3, RECAP_Y[6] + 4, 12);
  p5.texte(String(totA), RECAP_X.a - 6, RECAP_Y[6] + 4, 12);
  p5.texteDroite(String(rep.noteTheo), 654.5, 344, 12);
  p5.texteDroite(String(rep.noteMiseEnSituation), 726.5, 380.5, 12);
  const appreciation = rep.admis
    ? `Compétences C1 à C6 acquises, théorie ${rep.noteTheo}/${NOTE_MAX_THEO} (> 20/37) : certification acquise.`
    : "Certification non acquise.";
  p5.lignes(appreciation, 262, 9.5).forEach((l, k) => p5.texte(l, 515, 432 + k * 12, 9.5));
  return pdf.save();
}

// ─── Questionnaire de positionnement ──────────────────────────────────────────

export async function remplirPositionnement(charger: ChargeurModele, c: EdofCandidat, rep: ReponsesCandidat) {
  const { pdf, oblique } = await ouvrir(charger, "positionnement.pdf");
  const pg = pdf.getPages().map((p) => new Plume(p, oblique));
  const p = rep.positionnement;
  const coche = (page: number, yTop: number) => pg[page].croix(57.5, yTop + 7.8, 3);
  const ouiNon = (page: number, yOui: number, yNon: number, v: boolean) => coche(page, v ? yOui : yNon);

  pg[0].texte(nomComplet(c), 200, 267, 10.5, 220);
  if (p.age !== null) pg[0].texte(`${p.age} ans`, 150, 294, 10.5);
  ouiNon(0, 337, 350, p.activite);
  if (p.activite) pg[0].texte(p.activiteDetail, 40, 412, 10, 500);
  if (!p.activite) { coche(0, 458); pg[0].texte(p.demandeurDepuis, 250, 468, 10); }
  pg[0].texte(p.diplome, 40, 532.5, 10, 500);
  ouiNon(0, 619, 632, p.experienceEsthetique);
  pg[0].texte(p.experienceDetail, 40, 694, 9.5, 515);

  ouiNon(1, 104, 118, p.dejaPratique);
  if (p.dejaPratique) pg[1].texte(p.nbModeles, 40, 179.5, 10, 500);
  ouiNon(1, 225, 239, p.dejaFormee);
  if (p.dejaFormee) pg[1].texte(p.formationDetail, 40, 312.5, 10, 515);
  ouiNon(1, 374, 388, p.clientele);
  ouiNon(1, 471, 484, p.prerequisLus);
  coche(1, { Oui: 551, Partiellement: 565, Non: 578 }[p.prerequisRemplis]);
  const yObjectifs = [659, 672, 685, 699, 712];
  p.objectifs.forEach((o) => coche(1, yObjectifs[o - 1]));

  coche(2, [145, 158, 172, 185, 198][p.confiance - 1]);
  coche(2, [292, 306, 319][p.rythme - 1]);
  const yAcc = [427, 440, 453, 467, 480, 494];
  p.accompagnement.forEach((a) => coche(2, yAcc[a - 1]));
  pg[2].texte(p.apprehensions, 40, 555.5, 10, 515);
  ouiNon(2, 695, 709, p.amenagement);

  ouiNon(3, 131, 145, true);
  ouiNon(3, 212, 225, true);
  pg[3].texte(nomComplet(c), 105, 304, 11);
  return pdf.save();
}

// ─── Attestation sur l'honneur ────────────────────────────────────────────────

export async function remplirAttestation(charger: ChargeurModele, ctx: ContexteRS7650, c: EdofCandidat) {
  const { pdf, oblique } = await ouvrir(charger, "attestation-honneur.pdf");
  const page = pdf.getPages()[0];
  const w = new Plume(page, oblique);
  const H = page.getHeight();
  const blanc = (x0: number, y0: number, x1: number, y1: number) =>
    page.drawRectangle({ x: x0, y: H - y1, width: x1 - x0, height: y1 - y0, color: rgb(1, 1, 1) });
  w.texte(`${c.civilite} ${nomComplet(c)}`.trim(), 136, 293, 10.5);
  w.texte(frDate(c.dateNaissance), 146, 308.5, 10.5);
  w.texte([c.adresse, `${c.codePostal} ${c.ville}`.trim()].filter(Boolean).join(", "), 100, 324, 10, 450);
  w.texte(c.email, 93, 339.5, 10.5);
  w.texte(c.telephone, 112, 355, 10.5);
  w.texte(nomComplet(c), 112, 404, 10.5, 250);
  blanc(135, 533, 246, 545);
  w.texte(ctx.centre.nom, 137, 542.5, 10, 107);
  w.texte(ctx.centre.ville, 70, 634, 10.5);
  blanc(52, 649, 126, 661);
  w.texte(frDate(c.dateDebut), 56, 658.5, 10.5);
  w.texte(nomComplet(c), 155, 740, 10, 200);
  return pdf.save();
}

// ─── PV général de session ────────────────────────────────────────────────────

const PV_COL = { num: 40, nom: 66, comp: [221.5, 275.5, 328.5, 376.5, 424.5, 476.5], theo: 532.5, prat: 592, total: 649, echec: 703.5, obs: 735 };
const PV_LIGNES = [256, 273.5, 291.5, 310.5, 328.5]; // centres des 5 lignes candidats
const PV_JURY = [369, 387.5, 406.5];
const PV_PRESIDENT = 454;

export async function remplirPV(charger: ChargeurModele, ctx: ContexteRS7650, session: SessionExamen, reps: ReponsesCandidat[]) {
  const modele = await PDFDocument.load(await charger("pv.pdf"));
  const pdf = await PDFDocument.create();
  const oblique = await pdf.embedFont(StandardFonts.HelveticaOblique);
  const nbPages = Math.max(1, Math.ceil(session.candidats.length / PV_LIGNES.length));
  for (let pi = 0; pi < nbPages; pi++) {
    const [page] = await pdf.copyPages(modele, [0]);
    pdf.addPage(page);
    const w = new Plume(page, oblique);
    const centre = (t: string, cx: number, cy: number, size = 9) => w.texte(t, cx - oblique.widthOfTextAtSize(w.propre(t), size) / 2, cy + size * 0.35, size);
    w.texte(ctx.centre.nom, 112, 173.5, 9, 700);
    w.texte(ctx.centre.adresse, 48, 190.5, 8.5, 345);
    w.texte(`le ${frDate(session.dateExamen)} à ${ctx.centre.ville}`, 456, 190.5, 9, 360);
    session.candidats.slice(pi * PV_LIGNES.length, (pi + 1) * PV_LIGNES.length).forEach((c, k) => {
      const rep = reps[pi * PV_LIGNES.length + k];
      const y = PV_LIGNES[k];
      centre(String(pi * PV_LIGNES.length + k + 1), PV_COL.num, y);
      w.texte(`${c.nom} ${c.prenom}`, PV_COL.nom, y + 3, 8.5, 126);
      rep.pratique.forEach((crit, ci) => centre(String(crit.filter(Boolean).length), PV_COL.comp[ci], y));
      centre(String(rep.noteTheo), PV_COL.theo, y);
      centre(String(rep.noteMiseEnSituation), PV_COL.prat, y);
      centre(String(rep.noteTheo + rep.noteMiseEnSituation), PV_COL.total, y);
      if (!rep.admis) centre("X", PV_COL.echec, y);
      w.texte(rep.admis ? "Acquis" : "Non acquis", PV_COL.obs, y + 3, 9);
    });
    ctx.jury.slice(0, 3).forEach((j, k) => {
      const y = PV_JURY[k];
      centre(j.civilite, 40, y);
      w.texte(j.nom, 66, y + 3, 9, 234);
      w.texte(j.statut, 306, y + 3, 9, 141);
      w.texte(j.qualite, 453, y + 3, 9, 106);
    });
    const pres = ctx.jury[0];
    if (pres) {
      centre(pres.civilite, 40, PV_PRESIDENT);
      w.texte(pres.nom, 66, PV_PRESIDENT + 3, 9, 234);
      w.texte("Président(e) du jury", 306, PV_PRESIDENT + 3, 9, 141);
      w.texte(pres.qualite, 453, PV_PRESIDENT + 3, 9, 106);
    }
  }
  return pdf.save();
}

// ─── Pack complet ─────────────────────────────────────────────────────────────

export interface FichierPack { chemin: string; donnees: Uint8Array }

export const slug = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").replace(/[^A-Za-z0-9-]+/g, "_").replace(/^_+|_+$/g, "");

/** Documents d'une session RS7650 : 4 PDF officiels remplis par candidat + le PV général. */
export async function genererSessionRS7650(
  dossier: string, s: SessionExamen, ctx: ContexteRS7650, charger: ChargeurModele = chargeurHttp, progression?: () => void,
): Promise<FichierPack[]> {
  const fichiers: FichierPack[] = [];
  const reps = s.candidats.map(reponsesDe);
  for (let i = 0; i < s.candidats.length; i++) {
    const c = s.candidats[i];
    const rep = reps[i];
    const base = `${dossier}/${String(i + 1).padStart(2, "0")}_${slug(`${c.nom}_${c.prenom}`)}`;
    fichiers.push({ chemin: `${base}/1_Questionnaire_de_positionnement.pdf`, donnees: await remplirPositionnement(charger, c, rep) });
    fichiers.push({ chemin: `${base}/2_Attestation_sur_l_honneur.pdf`, donnees: await remplirAttestation(charger, ctx, c) });
    fichiers.push({ chemin: `${base}/3_Evaluation_theorique_FS063.pdf`, donnees: await remplirTheo(charger, ctx, c, rep) });
    fichiers.push({ chemin: `${base}/4_Grille_evaluation_pratique_FS055.pdf`, donnees: await remplirPratique(charger, ctx, c, rep) });
    progression?.();
  }
  fichiers.push({ chemin: `${dossier}/PV_session_${s.dateExamen}.pdf`, donnees: await remplirPV(charger, ctx, s, reps) });
  return fichiers;
}

/** Règlement d'évaluation et référentiel fournis par EYES PERFECT. */
export async function documentsCommunsRS7650(dossier: string, charger: ChargeurModele = chargeurHttp): Promise<FichierPack[]> {
  const out: FichierPack[] = [];
  for (const [f, nom] of [["reglement-evaluation.pdf", "Reglement_d_evaluation.pdf"], ["referentiel.pdf", "Referentiel_RS7650.pdf"]]) {
    out.push({ chemin: `${dossier}/${nom}`, donnees: new Uint8Array(await charger(f)) });
  }
  return out;
}
