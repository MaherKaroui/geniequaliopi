import { describe, it, expect } from "vitest";
import { writeFileSync } from "fs";
import { genCertificatRealisationStagiaire } from "@/lib/templatesAF";
import { genCertificatRealisationCFA } from "@/lib/templatesCFA";
import { lieuRealisationCertificat } from "@/lib/certificatRealisation";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const TAMPON = "data:image/png;base64,TAMPONOF", SIG = "data:image/png;base64,SIGDIR";
const org = { ...ORG_TEST, tamponUrl: TAMPON, signatureUrl: SIG };
const f0 = { ...FORMATIONS_TEST["actions-formation"], dateDebut: "2026-03-02", dateFin: "2026-03-06" };

describe("certificat de réalisation", () => {
  it("présentiel : lieu saisi, sinon adresse de l'organisme ; distanciel : aucun lieu", () => {
    expect(lieuRealisationCertificat(org, { modalites: "presentiel", lieu: "Salle Atlas, 4 rue Lafayette, 75009 Paris" })).toBe("Salle Atlas, 4 rue Lafayette, 75009 Paris");
    expect(lieuRealisationCertificat({ adresse: "12 rue de l'Information", codePostal: "75011", ville: "Paris" }, { modalites: "presentiel", lieu: "" })).toBe("12 rue de l'Information, 75011 Paris");
    expect(lieuRealisationCertificat(org, { modalites: "distanciel", lieu: "À distance (classe virtuelle)" })).toBe("");
  });
  it("seul le cachet de l'organisme, sans bloc représentant légal ni signature du dirigeant", () => {
    const h = genCertificatRealisationStagiaire(org, { ...f0, modalites: "presentiel", lieu: "Salle Atlas, Paris" }, STAGIAIRES_TEST, 0);
    writeFileSync("/tmp/certif/af.html", h);
    expect(h).toContain(TAMPON);
    expect(h.split(TAMPON).length - 1).toBe(1);
    expect(h).not.toContain(SIG);
    expect(h).not.toMatch(/représentant légal du dispensateur<\/p>/i);
    expect(h).toContain("Lieu de réalisation");
    expect(h).not.toContain('class="page-break"');
    expect(h).not.toContain("280x430");
  });
  it("CFA : même règle", () => {
    const h = genCertificatRealisationCFA(org, { ...f0, modalites: "presentiel", lieu: "CFA Nord, Lille" }, STAGIAIRES_TEST, 0);
    writeFileSync("/tmp/certif/cfa.html", h);
    expect(h.split(TAMPON).length - 1).toBe(1);
    expect(h).toContain("CFA Nord, Lille");
  });
  it("chaque certificat (AF, CFA) demande à l'export PDF de tenir sur une seule page", () => {
    const af = genCertificatRealisationStagiaire(org, f0, STAGIAIRES_TEST, 0);
    const cfa = genCertificatRealisationCFA(org, f0, STAGIAIRES_TEST, 0);
    expect(af).toMatch(/<meta name="pdf-une-page"/);
    expect(cfa).toMatch(/<meta name="pdf-une-page"/);
  });
  it("sans ville ni dirigeant : pas de « Fait à , » ni « Je soussigné , »", () => {
    const h = genCertificatRealisationStagiaire({ ...org, ville: "", dirigeant: "" }, { ...f0, modalites: "distanciel" }, STAGIAIRES_TEST, 0);
    writeFileSync("/tmp/certif/izi.html", h);
    expect(h).not.toContain("Fait à ,");
    expect(h).not.toMatch(/Je soussigné\(e\)\s*,\s*,/);
  });
});
