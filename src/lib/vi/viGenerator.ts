/**
 * VI - Pack ZIP : 4 documents PDF par apprenti (25 apprentis × 4 = 100 PDF)
 */
import JSZip from "jszip";
import { getViApprentis, type ViApprenti } from "./viData";
import { getLivretApprentissageHTML, getLivretMaitreHTML, getReglementInterieurHTML, getLivretAccueilHTML } from "./viDocs";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import type { JobReporter } from "@/lib/backgroundJobs";

function safe(s: string): string {
  return s.replace(/[^\w\-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").slice(0, 90);
}

function modaliteShort(m: string): string {
  if (m === "PRESENTIEL") return "PRESENTIEL";
  if (m === "DISTANCIEL" || m === "E-LEARNING") return "FOAD";
  return m;
}

export async function buildViZip(reporter?: JobReporter): Promise<Blob> {
  const zip = new JSZip();
  const apprentis = getViApprentis();
  const total = apprentis.length * 4;
  let step = 0;

  zip.file("README.txt", [
    "VISIONNAIRE INSTITUTE — Pack apprentis",
    `Généré le ${new Date().toLocaleString("fr-FR")}`,
    `${apprentis.length} apprentis × 4 documents = ${total} PDF`,
    "",
    "Pour chaque apprenti :",
    " 1. Livret d'apprentissage",
    " 2. Livret de maître d'apprentissage (signé)",
    " 3. Règlement intérieur (signé)",
    " 4. Livret d'accueil (signé)",
  ].join("\n"));

  for (let i = 0; i < apprentis.length; i++) {
    const a = apprentis[i];
    const folderName = `${String(i + 1).padStart(2, "0")}_${safe(a.prenom + " " + a.nom)}`;
    const folder = zip.folder(folderName)!;
    const baseName = `${safe(a.nom)}_${safe(a.prenom)}`;
    const code = a.formation.code;
    const mod = modaliteShort(a.modalite);

    const docs: Array<[string, () => string]> = [
      [`Livret_Apprentissage_${a.prenom}_${safe(a.nom)}.pdf`, () => getLivretApprentissageHTML(a)],
      [`Livret_Maitre_Apprentissage_${mod}_${a.prenom}_${safe(a.nom)}_signed.pdf`, () => getLivretMaitreHTML(a)],
      [`Reglement_VI_${mod}_${code}_${safe(a.nom)}_${a.prenom}_signed.pdf`, () => getReglementInterieurHTML(a)],
      [`LivretAccueil_CFAVI_${code}_V1_${a.modalite === "PRESENTIEL" ? "Presentiel" : "Distanciel"}_${safe(a.nom)}_${a.prenom}_signed.pdf`, () => getLivretAccueilHTML(a)],
    ];

    for (const [name, htmlFn] of docs) {
      try {
        reporter?.setMessage(`${a.prenom} ${a.nom} — ${name.split("_")[0]}…`);
        const pdf = await htmlToPdfBlob(htmlFn());
        folder.file(name, pdf);
      } catch (err) {
        console.error("VI gen error", name, err);
        folder.file(`ERREUR_${name}.txt`, `Erreur : ${(err as Error).message}`);
      }
      step++;
      reporter?.setProgress(Math.round((step / total) * 100));
    }
    if (i % 2 === 1) await new Promise((r) => setTimeout(r, 30));
  }

  reporter?.setMessage("Compression du ZIP…");
  const blob = await zip.generateAsync(
    { type: "blob", compression: "STORE", streamFiles: true },
    (meta) => reporter?.setProgress(Math.min(100, 95 + meta.percent / 20))
  );
  reporter?.setMessage("Pack VI prêt !");
  return blob;
}

export type ViDocKind = "livret" | "maitre" | "reglement" | "accueil";

export function buildViDocHtml(a: ViApprenti, kind: ViDocKind): string {
  switch (kind) {
    case "livret": return getLivretApprentissageHTML(a);
    case "maitre": return getLivretMaitreHTML(a);
    case "reglement": return getReglementInterieurHTML(a);
    case "accueil": return getLivretAccueilHTML(a);
  }
}
