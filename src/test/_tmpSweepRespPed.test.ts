import { describe, it, expect, beforeAll } from "vitest";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { preloadFormationsTest, ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const SIG = "data:image/png;base64,SIGNATUREDIRIGEANT";
const org = { ...ORG_TEST, responsablePedagogique: "SÉRÉBOU ANDRÉ URBAIN KOUAME", signatureUrl: SIG, tamponUrl: "" };

/** Boîtes de signature du document : libellé + présence d'une marque (image). */
function boites(html: string) {
  return html.split(/class="sig-box/).slice(1).map((chunk) => {
    const cut = chunk.indexOf('class="footer"');
    const body = cut >= 0 ? chunk.slice(0, cut) : chunk;
    return { label: /sig-label">([^<]*)</.exec(body)?.[1] ?? "", marque: /<img/.test(body) };
  });
}

describe("sweep responsable pédagogique", () => {
  beforeAll(async () => { await preloadFormationsTest(); }, 120_000);
  it("chaque case 'responsable pédagogique' porte la marque du dirigeant", () => {
    const formation = FORMATIONS_TEST["actions-formation"];
    const catalog = getFullCatalog(org, formation, STAGIAIRES_TEST);
    const vides: string[] = [];
    let vues = 0;
    for (const d of catalog) {
      let html = "";
      try { html = generateDocumentById(d.id, d.template, d.params, org, formation, STAGIAIRES_TEST) || ""; } catch { continue; }
      const bs = boites(html).filter((b) => /p[ée]dagogique/i.test(b.label) && !/[ée]quipe/i.test(b.label));
      vues += bs.length;
      if (bs.some((b) => !b.marque)) vides.push(`${d.indicateur} · ${d.nom}`);
    }
    console.log("cases responsable pédagogique trouvées :", vues, "| sans marque :", vides.length, vides.slice(0, 12));
    expect(vues).toBeGreaterThan(0);
    expect(vides).toEqual([]);
  }, 300_000);
});
