/**
 * Signatures et tampon fournis par l'utilisateur (dessinés dans la page ou importés en image),
 * posés automatiquement dans les PDF. Aucune signature n'est inventée : sans image, le cadre reste vide.
 * Règle des dossiers : le centre est représenté par son tampon seul s'il existe, sinon par la signature
 * de son représentant (jamais les deux).
 */
import { PDFDocument, PDFImage, PDFPage } from "pdf-lib";
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

/** Pose l'image dans le cadre (coordonnées haut-gauche), proportions conservées, centrée. */
export async function poserImage(pdf: PDFDocument, page: PDFPage, octets: Uint8Array | undefined, x: number, yHaut: number, largeur: number, hauteur: number) {
  if (!octets) return;
  const img = await integrer(pdf, octets);
  if (!img) return;
  const k = Math.min(largeur / img.width, hauteur / img.height);
  const w = img.width * k, h = img.height * k;
  page.drawImage(img, { x: x + (largeur - w) / 2, y: page.getHeight() - yHaut - hauteur + (hauteur - h) / 2, width: w, height: h });
}
