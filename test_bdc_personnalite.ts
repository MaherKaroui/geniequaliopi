import { buildBdcContext } from "./src/lib/bdc/bdcModel";
import { BDC_TEMPLATES_MANQUANTS } from "./src/lib/bdc/bdcTemplatesBC";

const org: any = {
  nom: "ORG TEST", siret: "123 456 789 00012", adresse: "1 rue Test", codePostal: "75001", ville: "Paris",
  telephone: "01 23 45 67 89", email: "test@org.fr", siteWeb: "", nda: "11999999999",
  dirigeant: "Jean Dupont", responsablePedagogique: "Marie Martin", referentHandicap: "Lucie Handi",
  referentQualite: "Paul Quali", poleAdministratif: "", relationEntreprises: "", referentMobilite: "",
  domainesFormation: "", typesActions: ["bilans-competences"], certifications: "", outilsUtilises: "",
  version: "1", dateMaj: "2024-01-15"
};

const formation: any = {
  intitule: "Bilan de compétences Pâtisserie", objectifs: "Clarifier le projet professionnel",
  prerequis: "", duree: "24", modalites: "Présentiel", tarif: "2400 €", programme: "",
  methodesEvaluation: "", moyensPedagogiques: "", publicVise: "", delaiAcces: "",
  dateDebut: "2024-02-01", dateFin: "2024-02-29", lieu: "Paris", nombreParticipants: "2",
  formateur: "", rythmeAlternance: ""
};

const s1: any = {
  prenom: "Sabrina", nom: "SYLLA", civilite: "Mme", dateNaissance: "1990-03-15",
  adresse: "2 rue A", codePostal: "75001", commune: "Paris", email: "sabrina@mail.fr", telephone: "06 11 11 11 11",
  entreprise: "", poste: "", dateDebutFormation: "2024-02-01", dateFinFormation: "2024-02-29",
};

const s2: any = {
  prenom: "Yassine", nom: "EL-ARABY", civilite: "M.", dateNaissance: "1985-07-20",
  adresse: "3 rue B", codePostal: "75001", commune: "Paris", email: "yassine@mail.fr", telephone: "06 22 22 22 22",
  entreprise: "", poste: "", dateDebutFormation: "2024-02-01", dateFinFormation: "2024-02-29",
};

const ctx = buildBdcContext(org, formation, [s1, s2]);
const def = BDC_TEMPLATES_MANQUANTS.find(d => d.nom === "Indicateur 11 - Test de personnalité");
if (!def) { console.error("Document non trouvé"); process.exit(1); }

for (const b of ctx.beneficiaires) {
  const md = def.build(ctx, b);
  console.log("===", b.prenom, b.nom, "===");
  console.log(md.slice(0, 1200));
  console.log("\n");
}
