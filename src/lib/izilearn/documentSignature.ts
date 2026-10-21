import type { IzPayload } from "./types";
import type { Piece, Contexte } from "./pieces";

export type SignatureRole = "stagiaire" | "entreprise" | "formateur";
export type LearnerSignatures = Record<string, string>;

export function signatureKey(payload: IzPayload, index: number, role: SignatureRole): string | null {
  if (role === "formateur") {
    const nom = payload.session.formateur?.trim();
    if (!nom) return null;
    return JSON.stringify([payload.source.orgId, payload.source.sessionId, "formateur", nom]);
  }
  const learner = payload.apprenants[index];
  if (!learner) return null;
  if (role === "entreprise" && !learner.entreprise?.nom?.trim()) return null;
  return JSON.stringify([payload.source.orgId, payload.source.sessionId, learner.inscriptionId, learner.contactId, learner.prenom, learner.nom, role, ...(role === "entreprise" ? [learner.entreprise?.nom, learner.entreprise?.siret, learner.entreprise?.representant] : [])]);
}

export function validSignatureImage(image: string): boolean {
  return /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(image) && image.length <= 3_000_000;
}

export function contexteAvecSignatures(cx: Contexte, signatures: LearnerSignatures): Contexte {
  const trainerKey = signatureKey(cx.p, -1, "formateur");
  const trainer = trainerKey ? signatures[trainerKey] : undefined;
  return {
    ...cx,
    f: trainer && validSignatureImage(trainer) ? { ...cx.f, formateurSignatureUrl: trainer } : cx.f,
    stagiaires: cx.stagiaires.map((s, i) => {
      const traineeKey = signatureKey(cx.p, i, "stagiaire");
      const companyKey = signatureKey(cx.p, i, "entreprise");
      const image = (traineeKey ? signatures[traineeKey] : undefined) || cx.p.apprenants[i]?.signatureUrl;
      const company = companyKey ? signatures[companyKey] : undefined;
      return { ...s, signatureUrl: image && validSignatureImage(image) ? image : s.signatureUrl, signatureResponsableUrl: company && validSignatureImage(company) ? company : s.signatureResponsableUrl };
    }),
  };
}

/** Fill imported form signature boxes; generators already use the shared Qualiopi URLs. */
export function applyLearnerSignatures(html: string, piece: Piece, cx: Contexte): string {
  if (piece.mail || piece.apprenantIdx === null) return html;
  const learner = cx.stagiaires[piece.apprenantIdx];
  if (!learner || (!learner.signatureUrl && !learner.signatureResponsableUrl && !cx.f.formateurSignatureUrl)) return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const targets = [...doc.querySelectorAll(".sig-box"), ...[...doc.querySelectorAll("p")].filter((p) => !p.closest(".sig-box") && /^Signature\s+(du|de|d[’'])/i.test(p.textContent?.trim() ?? ""))];
  for (const box of targets) {
    const label = box.classList.contains("sig-box") ? box.querySelector(".sig-label")?.textContent ?? "" : box.textContent ?? "";
    const enterprise = /entreprise|employeur|ma[iî]tre/i.test(label);
    const trainer = /formateur|intervenant/i.test(label);
    const trainee = /stagiaire|apprenant|apprenti|bénéficiaire|candidat|client/i.test(label);
    const url = enterprise ? learner.signatureResponsableUrl : trainer ? cx.f.formateurSignatureUrl : trainee ? learner.signatureUrl : undefined;
    if (!url || !validSignatureImage(url) || box.querySelector("img") || box.nextElementSibling?.tagName === "IMG") continue;
    const image = doc.createElement("img");
    image.src = url;
    image.alt = enterprise ? "Signature responsable entreprise" : "Signature stagiaire";
    image.setAttribute("style", "max-width:150px;max-height:65px;object-fit:contain");
    box.appendChild(image);
  }
  // Copy only to recorded connection days, never to an unsigned attendance row.
  if (piece.categorie === "connexion" && learner.signatureUrl && validSignatureImage(learner.signatureUrl)) {
    for (const cell of doc.querySelectorAll('[data-learner-signature="recorded-connection"]')) {
      if (cell.querySelector("img")) continue;
      const image = doc.createElement("img");
      image.src = learner.signatureUrl;
      image.alt = "Signature stagiaire reprise";
      image.setAttribute("style", "max-width:100%;max-height:45px;object-fit:contain");
      const label = doc.createElement("small");
      label.textContent = "Signature reprise";
      cell.append(image, label);
    }
  }
  return "<!DOCTYPE html>" + doc.documentElement.outerHTML;
}