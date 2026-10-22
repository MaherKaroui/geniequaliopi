import { describe, it, expect, vi } from "vitest";

// html2canvas ne fonctionne pas sous jsdom : le rendu PDF est remplacé par le HTML source,
// ce qui permet de contrôler le contenu exact de chaque pièce PDF.
vi.mock("@/lib/pdfExport", () => ({
  htmlToPdfBlob: async (html: string) => new Blob([html], { type: "application/pdf" }),
  getActivePdfOptions: () => ({}),
}));
import JSZip from "jszip";
import { buildBDCNTConseilsZip } from "@/lib/bdc/bdcNTConseilsZip";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";
import type { StagiaireInfo } from "@/types/qualiopi";

/** Texte brut de chaque fichier du ZIP (docx / xlsx : XML internes ; autres : texte). */
async function textesZip(blob: Blob): Promise<Record<string, string>> {
  const zip = await JSZip.loadAsync(blob as unknown as Blob);
  const out: Record<string, string> = {};
  for (const [nom, f] of Object.entries(zip.files)) {
    if (f.dir) continue;
    const data = await f.async("uint8array");
    let texte = "";
    if (/\.(docx|xlsx)$/i.test(nom)) {
      try {
        const inner = await JSZip.loadAsync(data);
        for (const [n2, f2] of Object.entries(inner.files)) {
          if (/\.xml$/i.test(n2) || /\.html?$/i.test(n2)) texte += " " + (await f2.async("string"));
        }
      } catch {
        texte = new TextDecoder().decode(data); // fichier HTML (Word / Excel)
      }
    } else {
      texte = new TextDecoder().decode(data);
    }
    out[nom] = texte.replace(/<[^>]+>/g, " ").replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
  }
  return out;
}

const ARBORESCENCE_NEXUS = [
  "Critere_1/Indicateur_1/Indicateur 1 - Calendrier annuel.xlsx",
  "Critere_1/Indicateur_1/Indicateur 1 - Cadre legal et reglementaire.pdf",
  "Critere_1/Indicateur_1/Indicateur 1 - Fiche de presentation du bilan de competences.pdf",
  "Critere_1/Indicateur_1/Indicateur 1 - Process de diffusion de l'information.pdf",
  "Critere_1/Indicateur_2/Indicateur 2 - Indicateurs de resultats.pdf",
  "Critere_1/Indicateur_2/Indicateur 2 - Process Suivi a 6 mois.pdf",
  "Critere_1/Indicateur_2/Indicateur 2 - Tableaux de suivi et indicateurs de resultats.xlsx",
  "Critere_2/Indicateur_4/Bénéficiaire - Claire ALPHA/Indicateur 4 - Fiche d'analyse du besoin.pdf",
  "Critere_2/Indicateur_4/Bénéficiaire - Claire ALPHA/Indicateur 4 - Fiche prealable au bilan de competences.pdf",
  "Critere_2/Indicateur_4/Bénéficiaire - Claire ALPHA/Indicateur 4 - Planning previsionnel signe.pdf",
  "Critere_2/Indicateur_4/Indicateur 4 - Cahier de contacts et analyse du besoin.xlsx",
  "Critere_2/Indicateur_4/Indicateur 4 - Mail type handicap.pdf",
  "Critere_2/Indicateur_4/Indicateur 4 - Process Analyse du besoin.pdf",
  "Critere_2/Indicateur_5/Bénéficiaire - Claire ALPHA/Indicateur 5 - Document de synthese.pdf",
  "Critere_2/Indicateur_5/Bénéficiaire - Claire ALPHA/Indicateur 5 - Matrices d'evaluation renseignees.xlsx",
  "Critere_2/Indicateur_5/Bénéficiaire - Claire ALPHA/Indicateur 5 - Objectifs individualises du bilan.pdf",
  "Critere_2/Indicateur_5/Bénéficiaire - Claire ALPHA/Indicateur 5 - Outil preparatoire.pdf",
  "Critere_2/Indicateur_5/Indicateur 5 - Fiche de presentation du bilan de competences.pdf",
  "Critere_2/Indicateur_5/Indicateur 5 - Matrices d'evaluation du bilan (classeur).xlsx",
  "Critere_2/Indicateur_5/Indicateur 5 - Matrices d'evaluation du bilan.pdf",
  "Critere_2/Indicateur_5/Indicateur 5 - Process Definition des objectifs.pdf",
  "Critere_2/Indicateur_5/Indicateur 5 - Reperes qualite et feuille de route de la synthese.pdf",
  "Critere_2/Indicateur_5/Indicateur 5 - Trame du document de synthese.pdf",
  "Critere_2/Indicateur_6/Indicateur 6 - Fiche d'analyse du besoin.pdf",
  "Critere_2/Indicateur_6/Indicateur 6 - Phase 1 - Phase préliminaire.pdf",
  "Critere_2/Indicateur_6/Indicateur 6 - Phase 2 - Phase d'investigation.pdf",
  "Critere_2/Indicateur_6/Indicateur 6 - Phase 3 - Phase de conclusion.pdf",
  "Critere_2/Indicateur_6/Indicateur 6 - Programme des 3 phases du bilan de competences.pdf",
  "Critere_2/Indicateur_8/Bénéficiaire - Claire ALPHA/Indicateur 8 - Mail test de personnalite.pdf",
  "Critere_2/Indicateur_8/Bénéficiaire - Claire ALPHA/Indicateur 8 - Test de personnalite et restitution.pdf",
  "Critere_2/Indicateur_8/Indicateur 8 - Process Test de personnalite a l'entree.pdf",
  "Critere_3/Indicateur_10/Bénéficiaire - Claire ALPHA/Indicateur 10 - Convention de prestation.pdf",
  "Critere_3/Indicateur_10/Bénéficiaire - Claire ALPHA/Indicateur 10 - Convocation.pdf",
  "Critere_3/Indicateur_10/Bénéficiaire - Claire ALPHA/Indicateur 10 - Entretien intermediaire.pdf",
  "Critere_3/Indicateur_10/Bénéficiaire - Claire ALPHA/Indicateur 10 - Fiche d'analyse du besoin.pdf",
  "Critere_3/Indicateur_10/Bénéficiaire - Claire ALPHA/Indicateur 10 - Fiche pedagogique.pdf",
  "Critere_3/Indicateur_10/Bénéficiaire - Claire ALPHA/Indicateur 10 - Planning previsionnel signe.pdf",
  "Critere_3/Indicateur_10/Bénéficiaire - Claire ALPHA/Indicateur 10 - Suivi de l'adaptation a l'accompagnement.pdf",
  "Critere_3/Indicateur_10/Indicateur 10 - Catalogue des adaptations de l'accompagnement.pdf",
  "Critere_3/Indicateur_11/Bénéficiaire - Claire ALPHA/Indicateur 11 - Attestation de remise du document de synthese.pdf",
  "Critere_3/Indicateur_11/Bénéficiaire - Claire ALPHA/Indicateur 11 - Document de synthese.pdf",
  "Critere_3/Indicateur_11/Bénéficiaire - Claire ALPHA/Indicateur 11 - Feuilles d'emargement par seance.pdf",
  "Critere_3/Indicateur_11/Bénéficiaire - Claire ALPHA/Indicateur 11 - Matrices d'evaluation renseignees.xlsx",
  "Critere_3/Indicateur_11/Bénéficiaire - Claire ALPHA/Indicateur 11 - Restitution du questionnaire d'interets professionnels.pdf",
  "Critere_3/Indicateur_11/Indicateur 11 - Matrices d'evaluation du bilan (classeur).xlsx",
  "Critere_3/Indicateur_11/Indicateur 11 - Matrices d'evaluation du bilan.pdf",
  "Critere_3/Indicateur_11/Indicateur 11 - Process Evaluation de l'atteinte des objectifs.pdf",
  "Critere_3/Indicateur_11/Indicateur 11 - Reperes qualite et feuille de route de la synthese.pdf",
  "Critere_3/Indicateur_11/Indicateur 11 - Trame du document de synthese.pdf",
  "Critere_3/Indicateur_12/Indicateur 12 - Guide d'entretien des abandons.pdf",
  "Critere_3/Indicateur_12/Indicateur 12 - Livret d'accueil du beneficiaire.pdf",
  "Critere_3/Indicateur_12/Indicateur 12 - Process Prevention et traitement des abandons.pdf",
  "Critere_3/Indicateur_12/Indicateur 12 - Registre des abandons et des aleas.xlsx",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Accord de conservation et destruction des documents.pdf",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Certificat de realisation.pdf",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Conditions generales de vente.pdf",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Convention de prestation.pdf",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Convocation.pdf",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Livret d'accueil du beneficiaire.pdf",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Mail de debut de prestation.pdf",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Mail envoi de la convention.pdf",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Mail type envoi du certificat de realisation.pdf",
  "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Reglement interieur.pdf",
  "Critere_3/Indicateur_9/Indicateur 9 - Clauses contractuelles specifiques au bilan de competences.pdf",
  "Critere_3/Indicateur_9/Indicateur 9 - Engagements deontologiques du consultant.pdf",
  "Critere_3/Indicateur_9/Indicateur 9 - Informations peripheriques (presentiel).pdf",
  "Critere_3/Indicateur_9/Indicateur 9 - Informations pratiques - prestation a distance.pdf",
  "Critere_3/Indicateur_9/Indicateur 9 - Process Information des publics.pdf",
  "Critere_4/Indicateur_17/Indicateur 17 - Moyens humains, techniques et environnement.pdf",
  "Critere_4/Indicateur_18/Indicateur 18 - Annuaire des contacts.pdf",
  "Critere_4/Indicateur_18/Indicateur 18 - Organigramme.pdf",
  "Critere_4/Indicateur_18/Indicateur 18 - Process Coordination des intervenants.pdf",
  "Critere_4/Indicateur_19/Indicateur 19 - Ressources mises a disposition du beneficiaire.pdf",
  "Critere_5/Indicateur_21/Indicateur 21 - Fiche de competences du consultant.pdf",
  "Critere_5/Indicateur_21/Indicateur 21 - Fiche de poste - Consultant en bilan de competences.pdf",
  "Critere_5/Indicateur_21/Indicateur 21 - Fiche de poste - Referent administratif.pdf",
  "Critere_5/Indicateur_21/Indicateur 21 - Fiche de poste - Referent commercial et communication.pdf",
  "Critere_5/Indicateur_21/Indicateur 21 - Fiche de poste - Referent handicap.pdf",
  "Critere_5/Indicateur_21/Indicateur 21 - Fiche de poste - Referent qualite.pdf",
  "Critere_5/Indicateur_21/Indicateur 21 - Process Recrutement.pdf",
  "Critere_5/Indicateur_21/Indicateur 21 - Trame d'entretien de recrutement.pdf",
  "Critere_5/Indicateur_22/Indicateur 22 - Compte rendu d'entretien annuel.pdf",
  "Critere_5/Indicateur_22/Indicateur 22 - Plan de developpement des competences.pdf",
  "Critere_6/Indicateur_23/Indicateur 23 - Process Veille legale et reglementaire.pdf",
  "Critere_6/Indicateur_23/Indicateur 23 - Registre de veille.pdf",
  "Critere_6/Indicateur_24/Indicateur 24 - Process Veille sur les competences, les metiers et les emplois.pdf",
  "Critere_6/Indicateur_24/Indicateur 24 - Registre de veille.pdf",
  "Critere_6/Indicateur_24/Indicateur 24 - Reseau d'acteurs socio-economiques.pdf",
  "Critere_6/Indicateur_25/Indicateur 25 - Process Veille sur les innovations pedagogiques et technologiques.pdf",
  "Critere_6/Indicateur_25/Indicateur 25 - Registre de veille.pdf",
  "Critere_6/Indicateur_26/Indicateur 26 - Contacts et suivi handicap.xlsx",
  "Critere_6/Indicateur_26/Indicateur 26 - Partenaires nationaux handicap.pdf",
  "Critere_6/Indicateur_26/Indicateur 26 - Process d'accueil des beneficiaires en situation de handicap.pdf",
  "Critere_6/Indicateur_26/Indicateur 26 - Ressources de formation sur le handicap.pdf",
  "Critere_6/Indicateur_26/Indicateur 26 - Suivi des adaptations par beneficiaire.xlsx",
  "Critere_6/Indicateur_27/Indicateur 27 - Charte des consultants sous-traitants.pdf",
  "Critere_6/Indicateur_27/Indicateur 27 - Contrat de sous-traitance.pdf",
  "Critere_6/Indicateur_27/Indicateur 27 - Process Sous-traitance.pdf",
  "Critere_6/Indicateur_27/Indicateur 27 - Registre de sous-traitance et de portage salarial.pdf",
  "Critere_7/Indicateur_30/Bénéficiaire - Claire ALPHA/Indicateur 30 - Questionnaire de satisfaction a chaud.pdf",
  "Critere_7/Indicateur_30/Bénéficiaire - Claire ALPHA/Indicateur 30 - Questionnaire de satisfaction a froid.pdf",
  "Critere_7/Indicateur_30/Bénéficiaire - Claire ALPHA/Indicateur 30 - Questionnaire de satisfaction entreprise.pdf",
  "Critere_7/Indicateur_30/Bénéficiaire - Claire ALPHA/Indicateur 30 - Questionnaire de satisfaction financeur.pdf",
  "Critere_7/Indicateur_30/Bénéficiaire - Claire ALPHA/Indicateur 30 - Questionnaire de satisfaction interne.pdf",
  "Critere_7/Indicateur_30/Indicateur 30 - Mentions de non-applicabilite et de sollicitation sans reponse.pdf",
  "Critere_7/Indicateur_30/Indicateur 30 - Process Satisfaction des parties prenantes.pdf",
  "Critere_7/Indicateur_31/Indicateur 31 - Procedure de reclamation et de mediation.pdf",
  "Critere_7/Indicateur_31/Indicateur 31 - Registre des reclamations.pdf",
  "Critere_7/Indicateur_31/Indicateur 31 - Tableau des dysfonctionnements.xlsx",
  "Critere_7/Indicateur_32/Indicateur 32 - Tableau d'amelioration continue.pdf",
];


const INTERDITS = ["NT CONSEILS", "NT Conseils", "NANTERRE", "Nanterre", "ÎLE DE FRANCE", "ILE-DE-FRANCE", "évidence pro", "FORMALERTE", "Marion LAURENT", "VTest", "FONGECIF", "OPACIF", "Galaoui", "ZOCLY", "ANTTOISSE", "Pôle emploi", "Pâtisserie", "Cake Design", "détruits au terme d'un an", "[à compléter]", "undefined", "NaN"];

describe("ZIP d'audit bilan de compétences", () => {
  it("ne contient aucune donnée d'un autre organisme ni pièce hors référentiel", async () => {
    const futur: StagiaireInfo = { ...STAGIAIRES_TEST[0], nom: "DELTA", prenom: "Nora", email: "nora.delta@exemple.fr", dateDebutFormation: "2026-11-02", dateFinFormation: "2027-01-15", financeur: "Entreprise", entreprise: "Delta SAS" };
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const blob = await buildBDCNTConseilsZip(org, FORMATIONS_TEST["bilans-competences"], [...STAGIAIRES_TEST, futur]);
    const textes = await textesZip(blob);
    const noms = Object.keys(textes);
    expect(noms.some((n) => /00_CONTROLE/.test(n))).toBe(false);
    for (const ind of [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32]) {
      expect(noms.some((n) => new RegExp(`/Indicateur_${ind}/`).test(n)), `IND ${ind} couvert`).toBe(true);
    }
    const fuites: string[] = [];
    for (const [nom, t] of Object.entries(textes)) {
      for (const x of INTERDITS) if (t.includes(x)) fuites.push(`${nom} → ${x}`);
    }
    expect(fuites).toEqual([]);
    // Bilan futur : synthèse non rédigée, questionnaire à chaud vierge
    const synthFutur = noms.find((n) => /Nora DELTA\/.*Document de synth[eè]se/.test(n));
    expect(synthFutur).toBeTruthy();
    expect(textes[synthFutur!]).toMatch(/Bilan en cours/);
    // Convention tripartite pour un financement entreprise, contrat pour le CPF
    const convFutur = noms.find((n) => /Nora DELTA\/.*Convention de prestation/.test(n))!;
    expect(textes[convFutur]).toMatch(/CONVENTION TRIPARTITE/);
    const convCpf = noms.find((n) => /Claire ALPHA\/.*Convention de prestation/.test(n))!;
    expect(textes[convCpf]).toMatch(/CONVENTION DE RÉALISATION/);
  }, 600_000);

  it("réserve le support de cours au profil Pâtisserie", async () => {
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const blob = await buildBDCNTConseilsZip(org, { ...FORMATIONS_TEST["bilans-competences"], intitule: "Bilan de compétences — Pâtisserie & Cake Design" }, STAGIAIRES_TEST.slice(0, 1));
    const noms = Object.keys(await textesZip(blob));
    expect(noms.some((n) => /Support de cours/i.test(n))).toBe(true);
  }, 600_000);

  it("produit le support de cours Manager (exercices corrigés, veille) pour le profil Manager", async () => {
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const blob = await buildBDCNTConseilsZip(org, { ...FORMATIONS_TEST["bilans-competences"], intitule: "Bilan de compétences – Manager : évaluer et développer ses compétences managériales" }, STAGIAIRES_TEST.slice(0, 1));
    const textes = await textesZip(blob);
    const support = Object.keys(textes).find((n) => /Support de cours Manager/i.test(n));
    expect(support).toBeTruthy();
    expect(textes[support!]).toMatch(/Corrigé 13/);
    expect(Object.keys(textes).some((n) => /Pâtisserie/i.test(n))).toBe(false);
  }, 600_000);

  it("suit l'arborescence du dossier audité NEXUS : mêmes pièces, mêmes noms, PDF, pied de page des autres dossiers Qualiopi", async () => {
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const textes = await textesZip(await buildBDCNTConseilsZip(org, FORMATIONS_TEST["bilans-competences"], STAGIAIRES_TEST.slice(0, 1)));
    const noms = Object.keys(textes).map((n) => n.normalize("NFC")).sort();
    // Même arborescence que NEXUS (hors captures PNG et PDF Agefiph chargé par URL)
    expect(noms).toEqual([...ARBORESCENCE_NEXUS].sort());
    const deux = await textesZip(await buildBDCNTConseilsZip(org, FORMATIONS_TEST["bilans-competences"], STAGIAIRES_TEST.slice(0, 2)));
    const noms2 = Object.keys(deux);
    // CGV et règlement intérieur versés dans chaque dossier bénéficiaire, comme NEXUS
    expect(noms2.filter((n) => /Conditions generales de vente/.test(n))).toHaveLength(2);
    expect(noms2.some((n) => /^Critere_3\/Indicateur_9\/Indicateur 9 - Conditions generales/.test(n))).toBe(false);
    expect(noms2.some((n) => /Indicateur_(16|28)\//.test(n))).toBe(false);
    // Une seule version et une seule date de mise à jour (celle de la V1) sur chaque PDF
    for (const n of noms.filter((x) => x.endsWith(".pdf"))) {
      const t = textes[n];
      // Pied de page des autres dossiers Qualiopi : « V1 3 février 2025 », une seule fois
      expect(t.split("V1 3 février 2025").length - 1, n).toBe(1);
    }
    // Rétractation : 14 jours partout ; conservation : trois ans au plus
    for (const [n, t] of Object.entries(textes)) {
      expect(/r[ée]tractation de (4|7|10) jours/i.test(t), n).toBe(false);
      expect(/conserv[^.]{0,80}(un|1) an/i.test(t), n).toBe(false);
    }
    // Entretien annuel = trame vierge (pas de faits inventés)
    const annuel = textes["Critere_5/Indicateur_22/Indicateur 22 - Compte rendu d'entretien annuel.pdf"];
    expect(annuel).not.toMatch(/salons|audit de surveillance|8\/10/);
  }, 600_000);

  it("n'emploie le CPF que si l'organisme est certifié Qualiopi « bilans de compétences »", async () => {
    const claire = STAGIAIRES_TEST.slice(0, 1);
    const nonCertifie = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const t1 = await textesZip(await buildBDCNTConseilsZip(nonCertifie, FORMATIONS_TEST["bilans-competences"], claire));
    const conv1 = Object.keys(t1).find((n) => /Claire ALPHA\/.*Convention de prestation/.test(n))!;
    expect(t1[conv1]).toMatch(/finance personnellement/);
    const certifie = { ...nonCertifie, numeroCertificatQualiopi: "TEST-001", dateObtentionQualiopi: "2025-06-01", certifications: "Actions de formation, bilans de compétences" };
    const t2 = await textesZip(await buildBDCNTConseilsZip(certifie, FORMATIONS_TEST["bilans-competences"], claire));
    const conv2 = Object.keys(t2).find((n) => /Claire ALPHA\/.*Convention de prestation/.test(n))!;
    expect(t2[conv2]).toMatch(/compte personnel de formation/i);
  }, 600_000);
  it("renseigne les pièces du bénéficiaire une fois l'étape passée, jamais avant", async () => {
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const textes = await textesZip(await buildBDCNTConseilsZip(org, FORMATIONS_TEST["bilans-competences"], STAGIAIRES_TEST));
    const de = (re: RegExp) => Object.entries(textes).filter(([n]) => re.test(n));
    const chaud = de(/Questionnaire de satisfaction a chaud/);
    expect(chaud.length).toBe(STAGIAIRES_TEST.length);
    // Rempli (notes et moyenne calculée) ou, si le bilan n'est pas terminé, aucune case cochée.
    for (const [n, t] of chaud) expect(/Moyenne des 8 items \d,\d\d \/ 5/.test(t) || !/☒/.test(t), n).toBe(true);
    for (const [n, t] of de(/Test de personnalite et restitution/)) expect(/\d+ \/ 20/.test(t) || /Passation prévue/.test(t), n).toBe(true);
    expect(de(/Objectifs individualis/).length).toBe(STAGIAIRES_TEST.length);
    expect(de(/CV du consultant/).length).toBe(0);
    expect(de(/Fiche de poste - /).length).toBe(5);
    for (const [n, t] of de(/Questionnaire de satisfaction (entreprise|financeur|interne)/)) expect(t, n).not.toMatch(/☒/);
  }, 600_000);

  it("ne mentionne pas l'inscription via Mon Compte Formation pour un organisme non certifié BC", async () => {
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const], numeroCertificatQualiopi: "", dateObtentionQualiopi: "" };
    const textes = await textesZip(await buildBDCNTConseilsZip(org, FORMATIONS_TEST["bilans-competences"], STAGIAIRES_TEST));
    const fuites = Object.entries(textes).filter(([, t]) => /via Mon Compte Formation|inscription via Mon Compte/.test(t)).map(([n]) => n);
    expect(fuites).toEqual([]);
  }, 600_000);
});
