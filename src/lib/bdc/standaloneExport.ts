import JSZip from "jszip";
import { limiterCheminsZip } from "@/lib/fileNaming";
import { htmlToWordBlob } from "@/lib/wordExport";
import { htmlToPdfBlob, getActivePdfOptions } from "@/lib/pdfExport";
import { buildStandaloneBdcDocument, bdcDocumentTitle, BDC_STANDALONE_DOCUMENTS, type BdcDocumentId } from "./standaloneDocuments";
import { validateStandaloneBdc } from "./standaloneModel";
import type { StandaloneBdcData } from "./standaloneTypes";

export const bdcFileTag = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "_").replace(/^_|_$/g, "").slice(0, 90);

export async function exportStandaloneBdcDocument(d: StandaloneBdcData, id: BdcDocumentId, format: "pdf" | "word") {
  const errors = validateStandaloneBdc(d);
  if (errors.length) throw new Error(errors.join("\n"));
  const html = buildStandaloneBdcDocument(d, id);
  const blob = format === "pdf" ? await htmlToPdfBlob(html, { ...getActivePdfOptions(), keepTablesTogether: false }) : await htmlToWordBlob(html);
  const extension = format === "pdf" ? "pdf" : blob.type.includes("officedocument") ? "docx" : "doc";
  return { blob, filename: `${bdcFileTag(bdcDocumentTitle(id, d))}_${bdcFileTag(d.beneficiaire.nom)}_${bdcFileTag(d.beneficiaire.prenom)}_${d.organisme.dateMaj}.${extension}` };
}

export async function exportStandaloneBdcZip(d: StandaloneBdcData, format: "pdf" | "word", onProgress: (message: string) => void, selected: readonly BdcDocumentId[] = BDC_STANDALONE_DOCUMENTS.map(doc => doc.id)) {
  const zip = new JSZip();
  const docs = BDC_STANDALONE_DOCUMENTS.filter(doc => selected.includes(doc.id));
  if (!docs.length) throw new Error("Sélectionnez au moins un document.");
  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    onProgress(`${i + 1} / ${docs.length} — ${bdcDocumentTitle(doc.id, d)}`);
    // Fail explicitly instead of quietly returning an incomplete dossier.
    const { blob, filename } = await exportStandaloneBdcDocument(d, doc.id, format);
    zip.file(`${String(i + 1).padStart(2, "0")}_${filename}`, blob);
  }
  await limiterCheminsZip(zip);
  return zip.generateAsync({ type: "blob" });
}

export function downloadBdcBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}