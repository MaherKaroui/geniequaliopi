import { describe, expect, it } from "vitest";
import { getBesoinsHTML, getLivret1HTML, getLivret2HTML, getConventionHTML, getAutorisationRGPDHTML, getCharteHTML, getReglementInterieurHTML } from "@/lib/vae/vaeTemplates";
import { DEFAULT_ORGANISME, EMPTY_CANDIDAT, EMPTY_CERTIFICATION, EMPTY_SESSION, EMPTY_CONTENTS, type VAEData } from "@/lib/vae/vaeTypes";

const candidateImage = "data:image/png;base64,Y2FuZGlkYXRl";
const directorImage = "data:image/png;base64,ZGlyZWN0b3I=";
const stampImage = "data:image/png;base64,c3RhbXA=";
const data: VAEData = {
  organisme: { ...DEFAULT_ORGANISME, nom: "Organisme test", signature: directorImage },
  candidat: { ...EMPTY_CANDIDAT, nom: "Test", signature: candidateImage },
  certification: EMPTY_CERTIFICATION, session: EMPTY_SESSION, contents: EMPTY_CONTENTS,
};

describe("images fournies dans les documents VAE", () => {
  it.each([getBesoinsHTML, getLivret1HTML, getLivret2HTML, getConventionHTML, getAutorisationRGPDHTML])("conserve l'image candidat et la signature du dirigeant sans tampon (%#)", (generate) => {
    const html = generate(data);
    expect(html).toContain(candidateImage);
    expect(html).toContain(directorImage);
  });
  it.each([getBesoinsHTML, getLivret1HTML, getLivret2HTML, getConventionHTML, getAutorisationRGPDHTML, getCharteHTML, getReglementInterieurHTML])("utilise le tampon de l'organisme lorsqu'il est fourni (%#)", (generate) => {
    const html = generate({ ...data, organisme: { ...data.organisme, tampon: stampImage } });
    expect(html).toContain(stampImage);
    expect(html).not.toContain(directorImage);
  });
  it("ne crée aucune image de signature absente", () => {
    const html = getBesoinsHTML({ ...data, organisme: DEFAULT_ORGANISME, candidat: EMPTY_CANDIDAT });
    expect(html).not.toContain('alt="Signature"');
    expect(html).not.toContain('alt="Tampon"');
  });
});