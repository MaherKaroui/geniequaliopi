/**
 * Générateur automatique des factures AKTO (1ère échéance apprentissage)
 * — Modèle : ANNEXE facture AKTO fournie dans le courrier d'accord de prise en charge.
 * 4 stagiaires prédéfinis (SKILLMASTER / RNCP39063 Négociateur Technico-Commercial).
 */
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { htmlToWordBlob } from "@/lib/wordExport";

export interface FactureAktoStagiaire {
  nom: string;
  dossier: string;      // Numéro de dossier AKTO
  numeroFacture: string;
  dateFacture: string;  // JJ/MM/AAAA
  dateEcheance: string; // JJ/MM/AAAA
  periodeDu: string;
  periodeAu: string;
  montantHT: string;    // ex "4 151,00"
}

export const CFA_INFO = {
  nom: "SKILLMASTER",
  siret: "93239261600029",
  adresse: "23 BOULEVARD DAVOUT",
  cp: "89000",
  ville: "AUXERRE",
  representant: "LARANGE CHRISTOPHER",
  fonction: "Directeur",
  iban: "FR76 3000 4028 3700 0123 4567 890",
  bic: "BNPAFRPPXXX",
};

export const FACTURES_AKTO_STAGIAIRES: FactureAktoStagiaire[] = [
  {
    nom: "Fincoura Sacko",
    dossier: "2509CA038764",
    numeroFacture: "F-2025-001",
    dateFacture: "29/09/2025",
    dateEcheance: "29/10/2025",
    periodeDu: "13/10/2025",
    periodeAu: "14/09/2026",
    montantHT: "4 151,00",
  },
  {
    nom: "Gylian Gippet",
    dossier: "2509CA038519",
    numeroFacture: "F-2025-002",
    dateFacture: "22/09/2025",
    dateEcheance: "22/10/2025",
    periodeDu: "13/10/2025",
    periodeAu: "14/09/2026",
    montantHT: "4 151,00",
  },
  {
    nom: "Hassan Assailal",
    dossier: "2510CA025951",
    numeroFacture: "F-2025-003",
    dateFacture: "01/09/2025",
    dateEcheance: "01/10/2025",
    periodeDu: "01/09/2025",
    periodeAu: "14/08/2026",
    montantHT: "4 151,00",
  },
  {
    nom: "Sekou Diallo",
    dossier: "2510CA025954",
    numeroFacture: "F-2025-004",
    dateFacture: "06/10/2025",
    dateEcheance: "06/11/2025",
    periodeDu: "13/10/2025",
    periodeAu: "14/08/2026",
    montantHT: "4 151,00",
  },
];

function buildHtml(s: FactureAktoStagiaire): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#000;margin:0}
    h1{font-size:20pt;text-align:center;margin:14pt 0}
    table{border-collapse:collapse;width:100%;margin:8pt 0}
    th,td{border:1px solid #333;padding:5pt 7pt;font-size:10.5pt;vertical-align:top}
    th{background:#e8e8e8;text-align:left}
    .header{display:table;width:100%;margin-bottom:14pt}
    .col{display:table-cell;vertical-align:top;width:50%}
    .col.right{text-align:right}
    .kv{margin:2pt 0}
    .kv b{display:inline-block;min-width:150px}
    .totals td{border:none;padding:2pt 0}
    .totals .lbl{width:70%;text-align:right;font-weight:bold}
    .footer{margin-top:24pt;font-size:9.5pt;border-top:1px solid #999;padding-top:6pt;text-align:center;color:#555}
    .sig{margin-top:22pt}
    .box{border:1px solid #999;padding:8pt;margin-top:6pt;min-height:70pt}
  </style></head><body>

  <div class="header">
    <div class="col">
      <div style="font-weight:bold;font-size:13pt">${CFA_INFO.nom}</div>
      <div>SIRET : ${CFA_INFO.siret}</div>
      <div>${CFA_INFO.adresse}</div>
      <div>${CFA_INFO.cp} ${CFA_INFO.ville}</div>
    </div>
    <div class="col right">
      <div style="font-weight:bold;font-size:13pt">AKTO</div>
      <div>TVA Intra : FR77853000982</div>
      <div>14 rue Riquet</div>
      <div>75019 Paris</div>
    </div>
  </div>

  <h1>FACTURE</h1>

  <div class="kv"><b>Date de facture :</b> ${s.dateFacture}</div>
  <div class="kv"><b>Numéro de facture :</b> ${s.numeroFacture}</div>
  <div class="kv"><b>Date d'échéance :</b> ${s.dateEcheance}</div>
  <br/>
  <div class="kv"><b>Participant :</b> ${s.nom}</div>
  <div class="kv"><b>Numéro de dossier :</b> ${s.dossier}</div>
  <div class="kv"><b>Période facturée :</b></div>
  <div class="kv"><b>Du :</b> ${s.periodeDu}</div>
  <div class="kv"><b>au :</b> ${s.periodeAu}</div>
  <br/>
  <div class="kv"><b>Total à payer :</b> ${s.montantHT} €</div>
  <br/>
  <div class="kv"><b>IBAN :</b> ${CFA_INFO.iban} &nbsp;&nbsp; <b>BIC :</b> ${CFA_INFO.bic}</div>

  <table>
    <tr><th>DESCRIPTION</th><th>NOMBRE</th><th>TAUX</th><th>MONTANT</th></tr>
    <tr><td>Frais pédagogiques</td><td>1ère échéance</td><td>50,00 %</td><td>${s.montantHT} €</td></tr>
    <tr><td>Frais annexes : 1er équipement</td><td></td><td></td><td>0,00 €</td></tr>
    <tr><td>Frais annexes : Restauration</td><td></td><td></td><td>0,00 €</td></tr>
    <tr><td>Frais annexes : Hébergement</td><td></td><td></td><td>0,00 €</td></tr>
  </table>

  <table class="totals">
    <tr><td class="lbl">Total HT</td><td>${s.montantHT} €</td></tr>
    <tr><td class="lbl">Montant TVA</td><td>0,00 €</td></tr>
    <tr><td class="lbl">TOTAL TTC en EUROS</td><td>${s.montantHT} €</td></tr>
  </table>

  <p style="font-style:italic;font-size:10pt">TVA non applicable selon l'article Art. 261.4.4 du Code Général des Impôts</p>

  <div class="sig">
    <div style="font-weight:bold">Cachet et signature du CFA</div>
    <div class="kv">Le CFA représenté par : ${CFA_INFO.representant}</div>
    <div class="kv">occupant la fonction de : ${CFA_INFO.fonction}</div>
    <p>certifie sincères et exactes les informations ci-dessus et atteste que l'apprenti(e) :</p>
    <p style="font-weight:bold">${s.nom}</p>
    <p>☐ Poursuit toujours la formation à la suite d'une rupture du contrat.<br/>
       ☒ Poursuit la formation et est toujours en poste au sein de l'entreprise.</p>
    <div class="kv">Fait le : ${s.dateFacture}</div>
    <div class="box">Cachet</div>
  </div>

  <div class="footer">
    AKTO - Siège social - 14 rue Riquet - 75019 Paris - Tél. : 01 88 13 10 00 - www.akto.fr<br/>
    SIREN : 853 000 982 - APE : 8559A - TVA intracommunautaire : FR77853000982
  </div>

  </body></html>`;
}

function slug(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

export async function buildFactureAktoBlob(s: FactureAktoStagiaire): Promise<Blob> {
  return htmlToWordBlob(buildHtml(s));
}

export async function downloadFactureAkto(s: FactureAktoStagiaire): Promise<void> {
  const blob = await buildFactureAktoBlob(s);
  const ext = blob.type.includes("officedocument") ? "docx" : "doc";
  saveAs(blob, `FACTURE_AKTO_${slug(s.nom)}_${s.dossier}.${ext}`);
}

export async function downloadAllFacturesAktoZip(): Promise<void> {
  const zip = new JSZip();
  for (const s of FACTURES_AKTO_STAGIAIRES) {
    const blob = await buildFactureAktoBlob(s);
    const ext = blob.type.includes("officedocument") ? "docx" : "doc";
    zip.file(`FACTURE_AKTO_${slug(s.nom)}_${s.dossier}.${ext}`, blob);
  }
  const out = await zip.generateAsync({ type: "blob" });
  saveAs(out, `Factures_AKTO_1ere_echeance_${new Date().toISOString().slice(0, 10)}.zip`);
}
