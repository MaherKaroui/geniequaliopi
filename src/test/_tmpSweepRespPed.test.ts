import { describe, it, expect, beforeAll } from "vitest";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { preloadFormationsTest, ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST, type TypeAction } from "./dossierAudit.harness";

const SIG = "data:image/png;base64,SIGNATUREDIRIGEANT";
const RP = "SÉRÉBOU ANDRÉ URBAIN KOUAME";
const org = { ...ORG_TEST, responsablePedagogique: RP, signatureUrl: SIG, tamponUrl: "" };
const TYPES: TypeAction[] = ["actions-formation", "apprentissage", "vae", "bilans-competences"];

/** Boîtes de signature : libellé, nom affiché, présence d'une marque (image). */
function boites(html: string) {
  return html.split(/class="sig-box/).slice(1).map((chunk) => {
    const cut = chunk.indexOf('class="footer"');
    const body = cut >= 0 ? chunk.slice(0, cut) : chunk;
    return {
      label: /sig-label">([^<]*)</.exec(body)?.[1] ?? "",
      nom: /Nom\s*:\s*([^<]*)</.exec(body)?.[1]?.trim() ?? "",
      marque: /<img/.test(body),
    };
  });
}

describe("sweep responsable pédagogique", () => {
  beforeAll(async () => { await preloadFormationsTest(); }, 120_000);
  for (const type of TYPES) {
    it(`${type} : chaque case du responsable pédagogique porte la marque du dirigeant`, () => {
      const formation = FORMATIONS_TEST[type];
      const catalog = getFullCatalog(org, formation, STAGIAIRES_TEST);
      const vides: string[] = [];
      let vues = 0;
      for (const d of catalog) {
        let html = "";
        try { html = generateDocumentById(d.id, d.template, d.params, org, formation, STAGIAIRES_TEST) || ""; } catch { continue; }
        const bs = boites(html).filter((b) => (/p[ée]dagogique/i.test(b.label) && !/[ée]quipe/i.test(b.label)) || b.nom === RP);
        vues += bs.length;
        if (bs.some((b) => !b.marque)) vides.push(`${d.indicateur} · ${d.nom}`);
      }
      console.log(type, "→ cases concernées :", vues, "| sans marque :", vides.length, vides.slice(0, 15));
      expect(vides).toEqual([]);
    }, 300_000);
  }
});
