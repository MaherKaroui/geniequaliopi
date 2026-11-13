/**
 * Signatures et tampon fournis par l'utilisateur (dessinés dans la page ou importés en image),
 * posés automatiquement dans les PDF. Aucune signature n'est inventée : sans image, le cadre reste vide.
 * Règle des dossiers : le centre est représenté par son tampon seul s'il existe, sinon par la signature
 * de son représentant (jamais les deux).
 */
import { PDFDocument, PDFImage, PDFPage, degrees } from "pdf-lib";
import type { EdofCandidat } from "./candidats";

export interface SignaturesEval {
  tamponCentre?: Uint8Array;
  signatureCentre?: Uint8Array;
  /** une signature par juré, dans l'ordre du jury (le premier préside) */
  jurys?: (Uint8Array | undefined)[];
  /** signatures des stagiaires, clé = cleCandidat */
  candidats?: Record<string, Uint8Array>;
  /** signature du formateur (feuille d'émargement) */
  formateur?: Uint8Array;
}

export const cleCandidat = (c: EdofCandidat) => c.numeroDossier || `${c.nom}|${c.prenom}`;

/** Tampon du centre s'il existe, sinon signature de son représentant. */
export const marqueCentre = (s?: SignaturesEval) => s?.tamponCentre || s?.signatureCentre;

export function dataUrlEnOctets(dataUrl: string): Uint8Array {
  const b64 = dataUrl.split(",")[1] || "";
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

const cache = new WeakMap<PDFDocument, Map<Uint8Array, Promise<PDFImage | null>>>();

async function integrer(pdf: PDFDocument, octets: Uint8Array): Promise<PDFImage | null> {
  let m = cache.get(pdf);
  if (!m) { m = new Map(); cache.set(pdf, m); }
  if (!m.has(octets)) {
    m.set(octets, (async () => {
      try {
        const png = octets[0] === 0x89 && octets[1] === 0x50;
        return png ? await pdf.embedPng(octets) : await pdf.embedJpg(octets);
      } catch { return null; }
    })());
  }
  return m.get(octets)!;
}

/** Pose l'image dans le cadre (coordonnées haut-gauche), proportions conservées, centrée.
 *  Avec `variation` (un numéro de ligne, par exemple), l'image change de taille, de place et
 *  d'inclinaison d'une case à l'autre, comme une signature refaite à la main ; même numéro = même tracé. */
export async function poserImage(pdf: PDFDocument, page: PDFPage, octets: Uint8Array | undefined, x: number, yHaut: number, largeur: number, hauteur: number, variation?: number) {
  if (!octets) return;
  const img = await integrer(pdf, octets);
  if (!img) return;
  let k = Math.min(largeur / img.width, hauteur / img.height);
  let dx = 0.5, dy = 0.5, angle = 0;
  if (variation !== undefined) {
    const r = (n: number) => { const v = Math.sin((variation + 1) * 12.9898 + n * 78.233) * 43758.5453; return v - Math.floor(v); };
    k *= 0.6 + r(1) * 0.32; // 60 à 92 % de la case
    dx = r(2); // de collée à gauche à collée à droite
    dy = 0.2 + r(3) * 0.6;
    angle = (r(4) - 0.5) * 10; // ±5°
  }
  const w = img.width * k, h = img.height * k;
  const px = x + (largeur - w) * dx;
  const py = page.getHeight() - yHaut - hauteur + (hauteur - h) * dy;
  page.drawImage(img, { x: px, y: py, width: w, height: h, rotate: degrees(angle) });
}
