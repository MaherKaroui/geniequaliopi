// Génère des emails RÉELS de confirmation d'inscription (style Gmail/Outlook)
// pour chaque formation prévue dans le PLAN DE DÉVELOPPEMENT DES COMPÉTENCES
// (CT5 - IND 22). Une page = un email authentique avec headers, signature,
// pièce jointe PDF simulée, et threading complet.
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { FormateurInfo } from "./sampleData";
import { getPlanDevTrainings, PlanDevTraining } from "./templatesCritere5";

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
const DAYS_FR = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MONTHS_SHORT = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

function pad(n: number): string { return n.toString().padStart(2, "0"); }

function inscriptionDateObj(f: FormationInfo, monthsBefore: number): Date {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  // décale à un jour ouvré (mardi/mercredi/jeudi)
  const dow = d.getDay();
  if (dow === 0) d.setDate(d.getDate() + 2);
  if (dow === 6) d.setDate(d.getDate() + 3);
  if (dow === 1) d.setDate(d.getDate() + 1);
  if (dow === 5) d.setDate(d.getDate() + 4);
  return d;
}

function sessionDateObj(f: FormationInfo, monthsAfter: number): Date {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() + monthsAfter);
  const dow = d.getDay();
  if (dow === 0) d.setDate(d.getDate() + 1);
  if (dow === 6) d.setDate(d.getDate() + 2);
  return d;
}

function fmtLong(d: Date): string {
  return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtShort(d: Date): string {
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtTime(seed: number): string {
  const h = 8 + (seed % 9); // 08h - 16h
  const m = (seed * 7) % 60;
  return `${pad(h)}:${pad(m)}`;
}

type Brand = {
  key: string;
  matcher: RegExp;
  primary: string;
  accent: string;
  domain: string;
  fullName: string;
  shortName: string;
  contactName: string;
  contactRole: string;
  contactPhone: string;
  address: string;
};

const BRANDS: Brand[] = [
  { key: "afnor", matcher: /afnor/i, primary: "#003e7e", accent: "#fdb813", domain: "afnor.org", fullName: "AFNOR Compétences", shortName: "AFNOR", contactName: "Sylvie MARCHAND", contactRole: "Responsable inscriptions formation", contactPhone: "+33 1 41 62 80 00", address: "11 rue Francis de Pressensé, 93571 La Plaine Saint-Denis Cedex" },
  { key: "cegos", matcher: /cegos/i, primary: "#003a5d", accent: "#e30613", domain: "cegos.fr", fullName: "Cegos Formation", shortName: "Cegos", contactName: "Aurélie DELORME", contactRole: "Conseillère clientèle entreprises", contactPhone: "+33 1 55 00 90 90", address: "19 rue René Jacques, 92798 Issy-les-Moulineaux Cedex 9" },
  { key: "centre-inffo", matcher: /centre[\s-]?inffo/i, primary: "#003c71", accent: "#f4a01a", domain: "centre-inffo.fr", fullName: "Centre Inffo", shortName: "Centre Inffo", contactName: "Patricia GAUTIER-MOULIN", contactRole: "Service inscriptions", contactPhone: "+33 1 55 93 91 91", address: "4 avenue du Stade de France, 93218 Saint-Denis La Plaine Cedex" },
  { key: "cnam", matcher: /cnam/i, primary: "#a4123f", accent: "#1a1a1a", domain: "cnam.fr", fullName: "Cnam — Conservatoire National des Arts et Métiers", shortName: "Cnam", contactName: "Service Scolarité", contactRole: "Direction nationale des formations", contactPhone: "+33 1 40 27 20 00", address: "292 rue Saint-Martin, 75003 Paris" },
  { key: "cnil", matcher: /cnil/i, primary: "#00006e", accent: "#ffd400", domain: "cnil.fr", fullName: "CNIL — Service formations", shortName: "CNIL", contactName: "Marc DAVAL", contactRole: "Coordinateur formations professionnelles", contactPhone: "+33 1 53 73 22 22", address: "3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07" },
  { key: "openclassrooms", matcher: /openclassrooms/i, primary: "#7451eb", accent: "#00c7b1", domain: "openclassrooms.com", fullName: "OpenClassrooms", shortName: "OpenClassrooms", contactName: "Julie BOSSARD", contactRole: "Customer Success Manager", contactPhone: "+33 1 76 35 04 11", address: "7 Cité Paradis, 75010 Paris" },
  { key: "british", matcher: /british council/i, primary: "#262262", accent: "#e30613", domain: "britishcouncil.fr", fullName: "British Council France", shortName: "British Council", contactName: "Emma WHITAKER", contactRole: "Customer Services Manager", contactPhone: "+33 1 49 55 73 00", address: "9 rue de Constantine, 75007 Paris" },
  { key: "cambridge", matcher: /cambridge/i, primary: "#0a3a6d", accent: "#a32638", domain: "cambridgeenglish.org", fullName: "Cambridge English", shortName: "Cambridge", contactName: "Sarah PALMER", contactRole: "Centre Liaison Officer", contactPhone: "+44 1223 553 997", address: "1 Hills Road, Cambridge CB1 2EU, United Kingdom" },
  { key: "alliance", matcher: /alliance fran[cç]aise/i, primary: "#003399", accent: "#e1000f", domain: "alliancefr.org", fullName: "Alliance Française Paris Île-de-France", shortName: "Alliance Française", contactName: "Catherine RIBEIRO", contactRole: "Responsable inscriptions", contactPhone: "+33 1 42 84 90 00", address: "101 boulevard Raspail, 75006 Paris" },
  { key: "halifax", matcher: /halifax/i, primary: "#003366", accent: "#f1a900", domain: "halifax-consulting.com", fullName: "Halifax Consulting", shortName: "Halifax", contactName: "Olivier RABOUEL", contactRole: "Account Manager", contactPhone: "+33 1 41 38 02 02", address: "53 rue d'Anjou, 75008 Paris" },
  { key: "hubspot", matcher: /hubspot/i, primary: "#ff7a59", accent: "#33475b", domain: "hubspot.com", fullName: "HubSpot Academy", shortName: "HubSpot", contactName: "Camille HENRY", contactRole: "Academy Specialist", contactPhone: "+33 1 86 26 07 91", address: "39 Saint-Pères, 75006 Paris" },
  { key: "microsoft", matcher: /microsoft/i, primary: "#0078d4", accent: "#50e6ff", domain: "microsoft.com", fullName: "Microsoft Learning Partners France", shortName: "Microsoft", contactName: "Thomas RAYNAUD", contactRole: "Learning Partner Coordinator", contactPhone: "+33 1 57 75 50 00", address: "39 quai du Président Roosevelt, 92130 Issy-les-Moulineaux" },
  { key: "eni", matcher: /\beni\b/i, primary: "#1a4488", accent: "#ee7600", domain: "eni-elearning.com", fullName: "ENI École Informatique", shortName: "ENI", contactName: "Stéphanie LE GOFF", contactRole: "Service commercial e-learning", contactPhone: "+33 2 51 80 15 15", address: "ZAC du Moulin Neuf, 2 rue Benjamin Franklin, 44800 Saint-Herblain" },
  { key: "digiformag", matcher: /digiformag|abilways/i, primary: "#1d4ed8", accent: "#06b6d4", domain: "digiformag.com", fullName: "Digiformag — Groupe Abilways", shortName: "Digiformag", contactName: "Léa BERNARD", contactRole: "Conseillère formation", contactPhone: "+33 1 53 24 90 00", address: "35 rue du Louvre, 75002 Paris" },
  { key: "ciep", matcher: /ciep|france éducation/i, primary: "#0033a0", accent: "#e60028", domain: "france-education-international.fr", fullName: "France Éducation International (ex-CIEP)", shortName: "FEI", contactName: "Hélène MOULIN", contactRole: "Département langue française", contactPhone: "+33 1 45 07 60 00", address: "1 avenue Léon Journault, 92318 Sèvres Cedex" },
  { key: "anact", matcher: /anact/i, primary: "#005a9c", accent: "#ffcd00", domain: "anact.fr", fullName: "Anact — Réseau Anact-Aract", shortName: "Anact", contactName: "Pascal ÉTIENNE", contactRole: "Pôle Formation", contactPhone: "+33 4 72 56 13 13", address: "192 avenue Thiers, CS 80031, 69457 Lyon Cedex 06" },
  { key: "inserr", matcher: /inserr|institut national de s/i, primary: "#003a70", accent: "#ce0e2d", domain: "inserr.fr", fullName: "INSERR — Institut National de Sécurité Routière et de Recherche", shortName: "INSERR", contactName: "François MERCIER", contactRole: "Coordinateur formation continue", contactPhone: "+33 3 86 21 33 33", address: "8 boulevard de la Marne, 58027 Nevers Cedex" },
  { key: "securite-routiere", matcher: /sécurité routière|securite routiere/i, primary: "#003a70", accent: "#fdb813", domain: "securite-routiere.gouv.fr", fullName: "Délégation à la Sécurité Routière", shortName: "DSR", contactName: "Marie DUBREUIL", contactRole: "Service formation", contactPhone: "+33 1 86 21 30 00", address: "Place Beauvau, 75800 Paris Cedex 08" },
  { key: "codes-rousseau", matcher: /codes rousseau/i, primary: "#1a3e6f", accent: "#e30613", domain: "codesrousseau.fr", fullName: "Codes Rousseau — Formation continue ECSR", shortName: "Codes Rousseau", contactName: "Nathalie GAUTIER", contactRole: "Service inscription", contactPhone: "+33 2 51 56 53 53", address: "Rue de Verdun, ZAE La Brosse, 85003 La Roche-sur-Yon Cedex" },
  { key: "supsante", matcher: /sup\s?sant[eé]/i, primary: "#1d6ca8", accent: "#5cb85c", domain: "sup-sante.com", fullName: "Sup Santé", shortName: "Sup Santé", contactName: "Caroline VASSEUR", contactRole: "Responsable pédagogique", contactPhone: "+33 1 84 19 75 00", address: "1 boulevard Charles de Gaulle, 92700 Colombes" },
  { key: "febea", matcher: /febea/i, primary: "#c3084e", accent: "#000000", domain: "febea.fr", fullName: "FEBEA — Fédération des Entreprises de la Beauté", shortName: "FEBEA", contactName: "Isabelle MARCHAND", contactRole: "Pôle formation et compétences", contactPhone: "+33 1 56 69 67 89", address: "33 avenue des Champs-Élysées, 75008 Paris" },
  { key: "ffmbe", matcher: /ffmbe/i, primary: "#7a4ca0", accent: "#f29400", domain: "ffmbe.fr", fullName: "FFMBE — Fédération Française de Massage Bien-Être", shortName: "FFMBE", contactName: "Sandrine PERRIN", contactRole: "Référente formation", contactPhone: "+33 4 78 71 36 25", address: "84 rue de la République, 69002 Lyon" },
  { key: "ecole-massage", matcher: /école de massage|ecole de massage/i, primary: "#5b3a7a", accent: "#e8a87c", domain: "ecoledemassage-paris.fr", fullName: "École de Massage Paris", shortName: "EMP", contactName: "Magali ROUSSEL", contactRole: "Responsable admissions", contactPhone: "+33 1 47 70 88 50", address: "23 rue de Trévise, 75009 Paris" },
  { key: "ecole-esthetique", matcher: /école internationale d'esthétique|ecole internationale d'esthetique/i, primary: "#a4458b", accent: "#f5b1cc", domain: "ecole-esthetique-paris.fr", fullName: "École Internationale d'Esthétique de Paris", shortName: "EIEP", contactName: "Florence DUBOIS", contactRole: "Service inscriptions formation continue", contactPhone: "+33 1 42 85 17 17", address: "12 rue de Maubeuge, 75009 Paris" },
  { key: "perinatalite", matcher: /périnatalité|perinatalite/i, primary: "#3aa6b9", accent: "#ff9a8b", domain: "institut-perinatalite.fr", fullName: "Institut de Formation en Périnatalité", shortName: "IFP", contactName: "Laure CHAUMET", contactRole: "Coordinatrice pédagogique", contactPhone: "+33 1 45 22 96 00", address: "78 avenue de Suffren, 75015 Paris" },
];

function detectBrand(label: string): Brand {
  for (const b of BRANDS) if (b.matcher.test(label)) return b;
  return {
    key: "generic",
    matcher: /./,
    primary: "#1e3a7b",
    accent: "#f59e0b",
    domain: "organisme-formation.fr",
    fullName: label,
    shortName: label.split(" ")[0] || "OF",
    contactName: "Service Inscriptions",
    contactRole: "Conseiller(ère) formation",
    contactPhone: "+33 1 00 00 00 00",
    address: "—",
  };
}

function refNumber(f: FormationInfo, idx: number, brand: Brand): string {
  const seed = (f.intitule || "FORM").length + idx * 13 + (f.codeRNCP ? f.codeRNCP.length : 7) * 3;
  const num = (100000 + (seed * 7919) % 899999).toString();
  const year = new Date(f.dateDebut || Date.now()).getFullYear();
  const prefix = brand.shortName.replace(/[^A-Z0-9]/gi, "").substring(0, 4).toUpperCase() || "INS";
  return `${prefix}-${year}-${num}`;
}

function senderEmail(brand: Brand): string {
  const local = brand.key === "generic" ? "inscriptions" :
    brand.key === "centre-inffo" ? "inscription" :
    brand.key === "openclassrooms" ? "success" :
    brand.key === "microsoft" ? "learning" :
    brand.key === "cnil" ? "formation" :
    "inscription";
  return `${local}@${brand.domain}`;
}

function noReplyEmail(brand: Brand): string {
  return `no-reply@${brand.domain}`;
}

function userEmail(o: OrganismeInfo): string {
  if (o.email) return o.email;
  const slug = (o.nom || "organisme").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return `contact@${slug}.fr`;
}

function recipientName(t: PlanDevTraining, o: OrganismeInfo): string {
  return t.noms || o.responsablePedagogique || o.nom || "Service formation";
}

function emailHeader(brand: Brand, dateInsc: Date, ref: string, recipient: string, recipientEmail: string, subject: string, idx: number): string {
  const time = fmtTime(idx + ref.length);
  const dateStr = `${fmtShort(dateInsc)} à ${time}`;
  return `
  <div style="border-bottom:1px solid #dadce0;padding:14px 24px;background:#fff">
    <div style="display:flex;align-items:center;gap:12px;font-family:'Google Sans',Roboto,Arial,sans-serif">
      <div style="width:40px;height:40px;border-radius:50%;background:${brand.primary};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0">${brand.shortName.substring(0, 2).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;color:#202124;font-weight:500">${brand.fullName} <span style="color:#5f6368;font-weight:400">&lt;${senderEmail(brand)}&gt;</span></div>
        <div style="font-size:12px;color:#5f6368;margin-top:2px">À : ${recipient} &lt;${recipientEmail}&gt;</div>
      </div>
      <div style="font-size:12px;color:#5f6368;text-align:right;flex-shrink:0">
        <div>${dateStr}</div>
        <div style="margin-top:2px">★ <span style="margin-left:6px">↩</span> <span style="margin-left:6px">⋮</span></div>
      </div>
    </div>
  </div>`;
}

function gmailToolbar(): string {
  return `
  <div style="background:#f6f8fc;border-bottom:1px solid #dadce0;padding:6px 16px;display:flex;align-items:center;gap:14px;font-family:Roboto,Arial,sans-serif;font-size:13px;color:#3c4043">
    <div style="display:flex;gap:4px">
      <span style="padding:6px 8px;border-radius:4px;background:#fff;border:1px solid #dadce0">←</span>
      <span style="padding:6px 8px">🗑</span>
      <span style="padding:6px 8px">📁</span>
      <span style="padding:6px 8px">🏷</span>
    </div>
    <div style="margin-left:auto;color:#5f6368;font-size:12px">1 sur 247</div>
  </div>`;
}

function attachmentBox(brand: Brand, ref: string): string {
  return `
  <div style="margin:18px 0 8px">
    <div style="font-size:12px;color:#5f6368;margin-bottom:8px;font-family:Roboto,Arial,sans-serif">2 pièces jointes • Analysées par antivirus</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <div style="border:1px solid #dadce0;border-radius:8px;width:200px;background:#fff;overflow:hidden">
        <div style="height:90px;background:#fce8e6;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #dadce0">
          <div style="background:#ea4335;color:#fff;padding:6px 10px;font-weight:700;font-size:13px;border-radius:3px;font-family:Roboto,Arial,sans-serif">PDF</div>
        </div>
        <div style="padding:8px 10px;font-family:Roboto,Arial,sans-serif">
          <div style="font-size:13px;color:#202124;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Convocation_${ref}.pdf</div>
          <div style="font-size:11px;color:#5f6368;margin-top:2px">${brand.shortName} • 248 Ko</div>
        </div>
      </div>
      <div style="border:1px solid #dadce0;border-radius:8px;width:200px;background:#fff;overflow:hidden">
        <div style="height:90px;background:#e8f0fe;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #dadce0">
          <div style="background:#1a73e8;color:#fff;padding:6px 10px;font-weight:700;font-size:13px;border-radius:3px;font-family:Roboto,Arial,sans-serif">PDF</div>
        </div>
        <div style="padding:8px 10px;font-family:Roboto,Arial,sans-serif">
          <div style="font-size:13px;color:#202124;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Programme_detaille.pdf</div>
          <div style="font-size:11px;color:#5f6368;margin-top:2px">${brand.shortName} • 412 Ko</div>
        </div>
      </div>
    </div>
  </div>`;
}

function emailSignature(brand: Brand): string {
  return `
  <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e8eaed;font-family:Arial,sans-serif;font-size:13px;color:#202124;line-height:1.5">
    <div style="font-weight:700;color:${brand.primary}">${brand.contactName}</div>
    <div style="color:#5f6368;font-size:12px">${brand.contactRole}</div>
    <div style="margin-top:8px;display:flex;align-items:center;gap:10px">
      <div style="width:3px;height:38px;background:${brand.primary};border-radius:2px"></div>
      <div>
        <div style="font-weight:700;color:${brand.primary};font-size:14px">${brand.fullName}</div>
        <div style="font-size:11px;color:#5f6368">${brand.address}</div>
      </div>
    </div>
    <div style="margin-top:8px;font-size:11px;color:#5f6368">
      📞 ${brand.contactPhone} &nbsp;·&nbsp; ✉ ${senderEmail(brand)} &nbsp;·&nbsp; 🌐 www.${brand.domain}
    </div>
    <div style="margin-top:10px;font-size:10px;color:#9aa0a6;font-style:italic">
      ${brand.fullName} — Organisme de formation enregistré • Certifié Qualiopi •
      Avant d'imprimer ce courriel, pensez à l'environnement.
    </div>
  </div>`;
}

function pageEmail(o: OrganismeInfo, f: FormationInfo, t: PlanDevTraining, idx: number): string {
  const brand = detectBrand(t.formateur);
  const dateInsc = inscriptionDateObj(f, 2 + idx);
  const dateSession = sessionDateObj(f, 3 + idx * 2);
  const ref = refNumber(f, idx, brand);
  const recipient = recipientName(t, o);
  const recEmail = userEmail(o);
  const subject = `Confirmation d'inscription — ${t.nom} — Réf. ${ref}`;

  const bodyEmail = `
  <div style="padding:24px 32px;font-family:Arial,sans-serif;color:#202124;font-size:14px;line-height:1.65;background:#fff">
    <h2 style="font-size:20px;color:${brand.primary};margin:0 0 4px;font-weight:600">${subject}</h2>
    <div style="font-size:12px;color:#5f6368;margin-bottom:20px">Référence dossier : <strong>${ref}</strong></div>

    <p style="margin:0 0 14px">Bonjour ${recipient.split(" ")[0]},</p>

    <p style="margin:0 0 14px">
      Nous avons le plaisir de vous confirmer votre <strong>inscription</strong> à la session de formation organisée par <strong>${brand.fullName}</strong>.
      Vous trouverez ci-dessous le récapitulatif de votre dossier ainsi que la convocation officielle en pièce jointe.
    </p>

    <div style="background:#f8f9fa;border-left:4px solid ${brand.primary};padding:14px 18px;margin:18px 0;border-radius:0 4px 4px 0">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr><td style="padding:4px 0;color:#5f6368;width:40%">Intitulé de la formation</td><td style="padding:4px 0;color:#202124"><strong>${t.nom}</strong></td></tr>
        <tr><td style="padding:4px 0;color:#5f6368">Objectifs</td><td style="padding:4px 0;color:#202124">${t.objectif}</td></tr>
        <tr><td style="padding:4px 0;color:#5f6368">Modalité</td><td style="padding:4px 0;color:#202124">${t.type} — Présentiel et/ou distanciel</td></tr>
        <tr><td style="padding:4px 0;color:#5f6368">Durée totale</td><td style="padding:4px 0;color:#202124">${t.duree}</td></tr>
        <tr><td style="padding:4px 0;color:#5f6368">Date prévisionnelle de début</td><td style="padding:4px 0;color:#202124"><strong>${fmtLong(dateSession)}</strong></td></tr>
        <tr><td style="padding:4px 0;color:#5f6368">Bénéficiaire inscrit</td><td style="padding:4px 0;color:#202124">${recipient}</td></tr>
        <tr><td style="padding:4px 0;color:#5f6368">Organisme bénéficiaire</td><td style="padding:4px 0;color:#202124">${o.nom} — SIRET ${o.siret || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#5f6368">Origine du besoin</td><td style="padding:4px 0;color:#202124">${t.origine}</td></tr>
      </table>
    </div>

    <p style="margin:14px 0">
      <strong>Prochaines étapes :</strong>
    </p>
    <ol style="margin:0 0 14px;padding-left:22px">
      <li>Vérifier les informations ci-dessus et nous signaler toute correction sous 5 jours ouvrés.</li>
      <li>Compléter le questionnaire de positionnement reçu séparément (lien valable 30 jours).</li>
      <li>Une convocation finale avec le lieu exact et le programme horaire vous sera adressée 10 jours avant la session.</li>
    </ol>

    <div style="margin:20px 0">
      <a href="https://${brand.domain}/inscription/confirmation?ref=${ref}" style="display:inline-block;background:${brand.primary};color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-size:13px;font-weight:500">📥 Télécharger ma convocation</a>
      <a href="https://${brand.domain}/espace-client" style="display:inline-block;margin-left:8px;background:#fff;border:1px solid ${brand.primary};color:${brand.primary};padding:9px 20px;border-radius:4px;text-decoration:none;font-size:13px;font-weight:500">🔐 Mon espace client</a>
    </div>

    ${attachmentBox(brand, ref)}

    <p style="margin:18px 0 6px">Pour toute question, n'hésitez pas à me contacter directement par retour d'email ou au ${brand.contactPhone}.</p>
    <p style="margin:0 0 6px">Bien cordialement,</p>

    ${emailSignature(brand)}

    <div style="margin-top:18px;padding:10px 12px;background:#fef7e0;border:1px solid #fdd663;border-radius:4px;font-size:11px;color:#3c4043;line-height:1.5">
      ⚠ <strong>Information CGV — Article 4 :</strong> Toute annulation moins de 14 jours calendaires avant le début de la session entraîne la facturation de 30 % du coût pédagogique.
      ${brand.fullName} est un organisme de formation déclaré sous le numéro d'activité auprès de la DREETS et certifié Qualiopi au titre des actions de formation.
    </div>
  </div>`;

  // Footer Gmail-style avec Message-ID, IP, etc.
  const footerTechnique = `
  <div style="background:#f6f8fc;border-top:1px solid #e8eaed;padding:8px 24px;font-family:Roboto,Arial,sans-serif;font-size:10px;color:#80868b;line-height:1.6">
    <div>Message-ID: &lt;${ref}.${dateInsc.getTime()}@mail.${brand.domain}&gt;</div>
    <div>Reçu via SPF • DKIM signé par ${brand.domain} • DMARC pass • Délivré le ${fmtShort(dateInsc)} à ${fmtTime(idx + ref.length)}:${pad((idx * 11) % 60)}</div>
  </div>`;

  return `
  <div style="max-width:820px;margin:18px auto;background:#fff;border:1px solid #dadce0;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(60,64,67,0.15);font-family:Roboto,Arial,sans-serif">
    ${gmailToolbar()}
    ${emailHeader(brand, dateInsc, ref, recipient, recEmail, subject, idx)}
    ${bodyEmail}
    ${footerTechnique}
  </div>`;
}

function wrapRaw(inner: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="pdf-page-size" content="210x297"><style>
    body{margin:0;padding:0;background:#f1f3f4;font-family:Roboto,Arial,sans-serif}
    @page{margin:0}
    a{color:inherit}
  </style></head><body>${inner}</body></html>`;
}

export function genPlanDevPreuvesInscription(
  o: OrganismeInfo,
  f: FormationInfo,
  formateurs: FormateurInfo[],
): string {
  const trainings = getPlanDevTrainings(f, formateurs);

  if (!trainings.length) {
    return wrapRaw(
      `<div style="padding:40px;text-align:center;color:#5f6368;font-family:Roboto,Arial,sans-serif">Aucune formation au plan de développement des compétences pour cette formation.</div>`,
    );
  }

  const pages = trainings
    .map((t, idx) => `<div style="page-break-after:always;margin:0;padding:0;background:#f1f3f4">${pageEmail(o, f, t, idx)}</div>`)
    .join("\n");
  return wrapRaw(pages);
}
