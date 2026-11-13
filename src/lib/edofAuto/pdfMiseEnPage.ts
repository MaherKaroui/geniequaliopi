/**
 * Petit moteur de mise en page pdf-lib (texte vectoriel, sélectionnable) pour les documents
 * d'évaluation générés quand le certificateur n'a pas fourni de modèle : en-tête, titres,
 * paragraphes, cases à cocher, tableaux à lignes de hauteur variable, sauts de page.
 * Les réponses du candidat / du jury sont écrites à l'encre bleue en italique, comme sur les modèles remplis.
 */
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, type RGB } from "pdf-lib";
import { poserImage } from "./signatures";

export const ENCRE = rgb(0.08, 0.17, 0.55);
const NOIR = rgb(0.1, 0.1, 0.12);
const GRIS = rgb(0.45, 0.45, 0.5);
const TRAIT = rgb(0.55, 0.58, 0.65);
const FOND = rgb(0.9, 0.93, 0.97);
const BANDEAU = rgb(0.12, 0.25, 0.5);

/** Une cellule : texte imprimé, ou réponse manuscrite (bleu italique). */
export type Cellule = string | { t: string; reponse?: boolean; gras?: boolean; centre?: boolean };

export interface EnteteDoc { organisme: string; titre: string; sousTitre: string; reference: string }

export class DocPdf {
  pdf!: PDFDocument;
  private f!: PDFFont;
  private fb!: PDFFont;
  private fi!: PDFFont;
  page!: PDFPage;
  y = 0;
  readonly W: number;
  readonly H: number;
  readonly M = 40;

  private constructor(private entete: EnteteDoc, paysage: boolean) {
    this.W = paysage ? 842 : 595;
    this.H = paysage ? 595 : 842;
  }

  static async creer(entete: EnteteDoc, paysage = false): Promise<DocPdf> {
    const d = new DocPdf(entete, paysage);
    d.pdf = await PDFDocument.create();
    d.f = await d.pdf.embedFont(StandardFonts.Helvetica);
    d.fb = await d.pdf.embedFont(StandardFonts.HelveticaBold);
    d.fi = await d.pdf.embedFont(StandardFonts.HelveticaOblique);
    d.pdf.setTitle(`${entete.titre} — ${entete.sousTitre}`);
    d.nouvellePage();
    return d;
  }

  get largeur() { return this.W - 2 * this.M; }

  /** Retire les caractères non encodables par les polices standard (WinAnsi). */
  propre(s: string): string {
    return [...(s || "")].map((ch) => {
      if (ch === "\n") return ch;
      try { this.f.encodeText(ch); return ch; } catch {
        const base = ch.normalize("NFD").replace(/[̀-ͯ]/g, "");
        try { this.f.encodeText(base); return base; } catch { return ch === "≥" ? ">=" : ch === "≤" ? "<=" : ""; }
      }
    }).join("");
  }

  private police(gras?: boolean, reponse?: boolean) { return reponse ? this.fi : gras ? this.fb : this.f; }

  lignes(texte: string, largeur: number, size: number, police: PDFFont = this.f): string[] {
    const out: string[] = [];
    for (const para of this.propre(texte).split("\n")) {
      let cur = "";
      for (const mot of para.split(/\s+/).filter(Boolean)) {
        const essai = cur ? `${cur} ${mot}` : mot;
        if (police.widthOfTextAtSize(essai, size) > largeur && cur) { out.push(cur); cur = mot; } else cur = essai;
      }
      out.push(cur);
    }
    return out;
  }

  nouvellePage() {
    this.page = this.pdf.addPage([this.W, this.H]);
    const { M, W, H } = this;
    const e = this.entete;
    this.page.drawRectangle({ x: M, y: H - M - 46, width: W - 2 * M, height: 46, borderColor: TRAIT, borderWidth: 0.8 });
    this.page.drawRectangle({ x: M, y: H - M - 46, width: 150, height: 46, color: FOND });
    this.ecrireBloc(e.organisme, M + 6, H - M - 15, 140, 8.5, this.fb, NOIR, 3);
    this.ecrireCentre(e.titre, W / 2 + 40, H - M - 18, 11.5, this.fb);
    this.ecrireCentre(e.sousTitre, W / 2 + 40, H - M - 33, 8.5, this.f, GRIS, W - 2 * M - 260);
    this.page.drawText(this.propre(e.reference), { x: W - M - 6 - this.f.widthOfTextAtSize(this.propre(e.reference), 7.5), y: H - M - 26, size: 7.5, font: this.f, color: GRIS });
    this.y = H - M - 62;
  }

  /** Pied de page « organisme — page x/n » sur toutes les pages (à appeler avant save). */
  finaliser() {
    const pages = this.pdf.getPages();
    pages.forEach((p, i) => {
      const t = this.propre(`${this.entete.organisme} — ${this.entete.reference} — page ${i + 1}/${pages.length}`);
      p.drawText(t, { x: this.W / 2 - this.f.widthOfTextAtSize(t, 7) / 2, y: 22, size: 7, font: this.f, color: GRIS });
    });
  }

  private ecrireCentre(t: string, cx: number, y: number, size: number, police: PDFFont, color: RGB = NOIR, max?: number) {
    let s = this.propre(t), sz = size;
    if (max) while (sz > 6 && police.widthOfTextAtSize(s, sz) > max) sz -= 0.5;
    this.page.drawText(s, { x: cx - police.widthOfTextAtSize(s, sz) / 2, y, size: sz, font: police, color });
  }

  private ecrireBloc(t: string, x: number, y: number, largeur: number, size: number, police: PDFFont, color: RGB, maxLignes = 99): number {
    const ls = this.lignes(t, largeur, size, police).slice(0, maxLignes);
    ls.forEach((l, i) => this.page.drawText(l, { x, y: y - i * (size + 2.5), size, font: police, color }));
    return ls.length * (size + 2.5);
  }

  /** Garantit `h` points disponibles avant le pied de page, sinon page suivante. */
  place(h: number) { if (this.y - h < 45) this.nouvellePage(); }

  espace(h = 8) { this.y -= h; }

  titreSection(t: string) {
    this.place(30);
    this.y -= 6;
    this.page.drawRectangle({ x: this.M, y: this.y - 14, width: this.largeur, height: 17, color: BANDEAU });
    this.page.drawText(this.propre(t.toUpperCase()), { x: this.M + 6, y: this.y - 9.5, size: 9, font: this.fb, color: rgb(1, 1, 1) });
    this.y -= 24;
  }

  paragraphe(t: string, opts: { size?: number; gras?: boolean; reponse?: boolean; retrait?: number; couleur?: RGB } = {}) {
    const size = opts.size ?? 9.5;
    const police = this.police(opts.gras, opts.reponse);
    const x = this.M + (opts.retrait ?? 0);
    const ls = this.lignes(t, this.largeur - (opts.retrait ?? 0), size, police);
    for (const l of ls) {
      this.place(size + 4);
      this.page.drawText(l, { x, y: this.y - size, size, font: police, color: opts.reponse ? ENCRE : opts.couleur ?? NOIR });
      this.y -= size + 3;
    }
    this.y -= 3;
  }

  /** Question + réponse manuscrite sur ligne pointillée. */
  questionLibre(question: string, reponse: string, nbLignes = 1) {
    this.paragraphe(question, { gras: true, size: 9.5 });
    const ls = this.lignes(reponse, this.largeur - 10, 10, this.fi);
    const n = Math.max(nbLignes, ls.length);
    for (let i = 0; i < n; i++) {
      this.place(16);
      const yb = this.y - 12;
      this.page.drawLine({ start: { x: this.M + 4, y: yb - 2 }, end: { x: this.W - this.M, y: yb - 2 }, thickness: 0.4, color: TRAIT, dashArray: [1, 2] });
      if (ls[i]) this.page.drawText(ls[i], { x: this.M + 8, y: yb, size: 10, font: this.fi, color: ENCRE });
      this.y -= 16;
    }
    this.y -= 4;
  }

  private caseACocher(x: number, yHaut: number, cochee: boolean) {
    this.page.drawRectangle({ x, y: yHaut - 8.5, width: 8.5, height: 8.5, borderColor: NOIR, borderWidth: 0.7 });
    if (cochee) {
      this.page.drawLine({ start: { x: x - 0.5, y: yHaut - 9 }, end: { x: x + 9, y: yHaut + 0.5 }, thickness: 1.3, color: ENCRE });
      this.page.drawLine({ start: { x: x - 0.5, y: yHaut + 0.5 }, end: { x: x + 9, y: yHaut - 9 }, thickness: 1.3, color: ENCRE });
    }
  }

  /** Liste d'options avec cases ; `enLigne` pour les échelles courtes (Oui / Non, 1 à 5). */
  choix(question: string, options: string[], coches: number[], opts: { enLigne?: boolean; precision?: string } = {}) {
    if (question) this.paragraphe(question, { gras: true });
    if (opts.enLigne) {
      this.place(16);
      let x = this.M + 10;
      options.forEach((o, i) => {
        this.caseACocher(x, this.y - 1, coches.includes(i));
        const t = this.propre(o);
        this.page.drawText(t, { x: x + 13, y: this.y - 8.5, size: 9.5, font: this.f, color: NOIR });
        x += 13 + this.f.widthOfTextAtSize(t, 9.5) + 22;
      });
      this.y -= 16;
    } else {
      options.forEach((o, i) => {
        const ls = this.lignes(o, this.largeur - 34, 9.5);
        this.place(ls.length * 12 + 2);
        this.caseACocher(this.M + 10, this.y - 1, coches.includes(i));
        ls.forEach((l, k) => this.page.drawText(l, { x: this.M + 24, y: this.y - 8.5 - k * 12, size: 9.5, font: this.f, color: NOIR }));
        this.y -= ls.length * 12 + 3;
      });
    }
    if (opts.precision) this.paragraphe(opts.precision, { reponse: true, retrait: 24, size: 10 });
    this.y -= 4;
  }

  /** Tableau à colonnes proportionnelles ; la première ligne est l'en-tête. */
  tableau(entetes: string[], lignes: Cellule[][], poids: number[], opts: { size?: number } = {}) {
    const size = opts.size ?? 8.5;
    const total = poids.reduce((a, b) => a + b, 0);
    const largeurs = poids.map((p) => (p / total) * this.largeur);
    const dessinerLigne = (cells: Cellule[], entete: boolean) => {
      const norm = cells.map((c) => (typeof c === "string" ? { t: c } : c));
      const contenus = norm.map((c, i) => this.lignes(c.t, largeurs[i] - 6, c.reponse ? size + 0.5 : size, this.police(entete || c.gras, c.reponse)));
      const h = Math.max(...contenus.map((l) => l.length)) * (size + 2.5) + 7;
      this.place(h);
      let x = this.M;
      norm.forEach((c, i) => {
        this.page.drawRectangle({ x, y: this.y - h, width: largeurs[i], height: h, borderColor: TRAIT, borderWidth: 0.6, ...(entete ? { color: FOND } : {}) });
        const police = this.police(entete || c.gras, c.reponse);
        const sz = c.reponse ? size + 0.5 : size;
        contenus[i].forEach((l, k) => {
          const w = police.widthOfTextAtSize(l, sz);
          const tx = c.centre || entete ? x + (largeurs[i] - w) / 2 : x + 3;
          this.page.drawText(l, { x: tx, y: this.y - 4 - sz - k * (size + 2.5), size: sz, font: police, color: c.reponse ? ENCRE : NOIR });
        });
        x += largeurs[i];
      });
      this.y -= h;
    };
    dessinerLigne(entetes, true);
    lignes.forEach((l) => dessinerLigne(l, false));
    this.y -= 8;
  }

  /** Tableau dont certaines colonnes reçoivent une image (signature) ; une colonne sans image reste vide.
   *  L'en-tête est répété en haut de chaque nouvelle page. */
  async tableauSignatures(entetes: string[], lignes: { cellules: Cellule[]; images: (Uint8Array | undefined)[] }[], poids: number[], hauteur = 34) {
    const size = 8.5;
    const total = poids.reduce((a, b) => a + b, 0);
    const largeurs = poids.map((p) => (p / total) * this.largeur);
    const entete = () => {
      const h = 22;
      let x = this.M;
      entetes.forEach((t, i) => {
        this.page.drawRectangle({ x, y: this.y - h, width: largeurs[i], height: h, borderColor: TRAIT, borderWidth: 0.6, color: FOND });
        this.lignes(t, largeurs[i] - 6, size, this.fb).forEach((s, k) =>
          this.page.drawText(s, { x: x + (largeurs[i] - this.fb.widthOfTextAtSize(s, size)) / 2, y: this.y - 9 - k * (size + 1.5), size, font: this.fb, color: NOIR }));
        x += largeurs[i];
      });
      this.y -= h;
    };
    this.place(22 + hauteur);
    entete();
    for (const [n, ligne] of lignes.entries()) {
      if (this.y - hauteur < 45) { this.nouvellePage(); entete(); }
      let x = this.M;
      for (let i = 0; i < largeurs.length; i++) {
        this.page.drawRectangle({ x, y: this.y - hauteur, width: largeurs[i], height: hauteur, borderColor: TRAIT, borderWidth: 0.6 });
        const c = ligne.cellules[i] ?? "";
        const cel = typeof c === "string" ? { t: c } : c;
        const police = this.police(cel.gras, cel.reponse);
        const sz = cel.reponse ? size + 0.5 : size;
        this.lignes(cel.t, largeurs[i] - 6, sz, police).forEach((s, k) => {
          const tx = cel.centre ? x + (largeurs[i] - police.widthOfTextAtSize(s, sz)) / 2 : x + 3;
          this.page.drawText(s, { x: tx, y: this.y - 4 - sz - k * (size + 2.5), size: sz, font: police, color: cel.reponse ? ENCRE : NOIR });
        });
        // Chaque case a son propre tracé (taille, place, inclinaison) : la signature ne se répète pas à l'identique.
        await poserImage(this.pdf, this.page, ligne.images[i], x + 3, this.H - this.y + 3, largeurs[i] - 6, hauteur - 6, n * 7 + i);
        x += largeurs[i];
      }
      this.y -= hauteur;
    }
    this.y -= 8;
  }

  /** Cadres de signature ; l'image fournie (signature ou tampon) est posée dans le cadre, sinon il reste vide. */
  async signatures(libelles: string[], noms: string[], images: (Uint8Array | undefined)[] = []) {
    this.place(80);
    const w = (this.largeur - (libelles.length - 1) * 12) / libelles.length;
    for (let i = 0; i < libelles.length; i++) {
      const x = this.M + i * (w + 12);
      this.page.drawRectangle({ x, y: this.y - 70, width: w, height: 70, borderColor: TRAIT, borderWidth: 0.6 });
      this.page.drawText(this.propre(libelles[i]), { x: x + 5, y: this.y - 12, size: 8.5, font: this.fb, color: NOIR });
      if (noms[i]) this.page.drawText(this.propre(noms[i]), { x: x + 5, y: this.y - 24, size: 9.5, font: this.fi, color: ENCRE });
      await poserImage(this.pdf, this.page, images[i], x + 5, this.H - this.y + 27, w - 10, 40);
    }
    this.y -= 80;
  }

  async enregistrer(): Promise<Uint8Array> {
    this.finaliser();
    return this.pdf.save();
  }
}
