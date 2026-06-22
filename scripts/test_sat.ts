import { renderBdcNTDocHtml } from "../src/lib/bdc/bdcNTConseilsZip";
const org: any = { nom: "SELECT FORMATION", siret: "12345678900015", nda: "11 75 12345 75", ville: "Paris", dirigeant: "Jean Dupont", email: "test@test.fr" };
const stag: any = { prenom: "Yassine", nom: "EL-ARABY", civilite: "M.", email: "y@x.com", entreprise: "Acme", dateDebutFormation: "01/02/2025", dateFinFormation: "30/04/2025" };
const form: any = { intitule: "Pâtisserie & Cake Design", duree: "24" };
const html = renderBdcNTDocHtml("Indicateur 30/Indicateur 30 - Questionnaire satisfaction entreprise", org, stag, form);
console.log("LEN:", html.length);
console.log(html.slice(0, 3000));
