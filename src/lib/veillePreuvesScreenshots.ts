// Génère des "captures d'écran" HTML des sources de veille réglementaire
// utilisées comme preuves d'exploitation pour l'Indicateur 23 (Critère 6).
// Chaque capture imite la page d'inscription / d'archivage de la source officielle.
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { formatDate } from "./docBuilder";

function shortDate(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function longDate(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  return formatDate(d.toISOString().split("T")[0]);
}

function extractNomPrenom(dirigeant: string): { nom: string; prenom: string } {
  const parts = (dirigeant || "").trim().split(/\s+/);
  if (parts.length >= 2) return { prenom: parts[0], nom: parts.slice(1).join(" ") };
  return { prenom: dirigeant || "Dirigeant", nom: "" };
}

// ===== 1. LÉGIFRANCE — page texte officiel =====
function screenshotLegifrance(o: OrganismeInfo, f: FormationInfo): string {
  const date = longDate(f, 8);
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:'Marianne',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:12px 24px;border-bottom:3px solid #000091;display:flex;align-items:center;gap:14px">
    <div style="display:flex;flex-direction:column;line-height:1">
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">RÉPUBLIQUE</span>
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">FRANÇAISE</span>
      <span style="font-size:9px;font-style:italic;color:#666;margin-top:2px">Liberté · Égalité · Fraternité</span>
    </div>
    <div style="height:42px;width:1px;background:#ddd"></div>
    <div style="font-size:24px;font-weight:700;color:#000091;letter-spacing:0.5px">Légifrance</div>
    <div style="margin-left:auto;font-size:11px;color:#666">Le service public de la diffusion du droit</div>
  </div>
  <div style="background:#f6f6f6;padding:8px 24px;font-size:11px;color:#444;border-bottom:1px solid #e5e5e5">
    Accueil &gt; Les codes &gt; Code du travail &gt; Sixième partie &gt; Livre III &gt; Titre Ier
  </div>
  <div style="padding:24px 30px">
    <div style="background:#000091;color:#fff;display:inline-block;padding:4px 10px;font-size:11px;font-weight:600;margin-bottom:10px">EN VIGUEUR</div>
    <h1 style="font-size:22px;color:#161616;margin:0 0 6px;font-weight:700">Article L6316-1 — Code du travail</h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">Version en vigueur depuis le ${date} · Modifié par LOI n°2024-200</div>
    <div style="font-size:13px;line-height:1.7;color:#161616;border-left:3px solid #000091;padding:8px 16px;background:#f9f9fc;margin-bottom:18px">
      Lorsqu'ils financent une action concourant au développement des compétences mentionnée à l'article L. 6313-1, l'État, les régions, la Caisse des dépôts et consignations, France Travail, l'Agefiph et les opérateurs de compétences s'assurent que cette action est dispensée par un prestataire ayant obtenu une <strong>certification qualité</strong> délivrée sur la base d'un référentiel national.
    </div>
    <div style="display:flex;gap:10px;margin-bottom:16px">
      <div style="background:#000091;color:#fff;padding:8px 16px;font-size:12px;border-radius:2px">📥 Télécharger le PDF</div>
      <div style="border:1px solid #000091;color:#000091;padding:8px 16px;font-size:12px;border-radius:2px">🔗 Lien permanent</div>
      <div style="border:1px solid #000091;color:#000091;padding:8px 16px;font-size:12px;border-radius:2px">⭐ Mes favoris</div>
    </div>
    <div style="background:#fff8e1;border-left:3px solid #f4c542;padding:10px 14px;font-size:11px;color:#5a4a00;margin-bottom:14px">
      <strong>Archivé par :</strong> ${o.nom} — Référent qualité ${o.referentQualite || o.dirigeant || ""}<br/>
      <strong>Date d'archivage :</strong> ${shortDate(f, 1)} · <strong>URL :</strong> legifrance.gouv.fr/codes/article_lc/LEGIARTI000049XXXX
    </div>
  </div>
</div>`;
}

// ===== 2. MINISTÈRE DU TRAVAIL — Référentiel Qualiopi V9 =====
function screenshotMinistereTravail(o: OrganismeInfo, f: FormationInfo): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:'Marianne',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:12px 24px;border-bottom:3px solid #000091;display:flex;align-items:center;gap:14px">
    <div style="display:flex;flex-direction:column;line-height:1">
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">RÉPUBLIQUE</span>
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">FRANÇAISE</span>
    </div>
    <div style="height:42px;width:1px;background:#ddd"></div>
    <div style="font-size:14px;font-weight:600;color:#161616;line-height:1.3">
      Ministère du Travail,<br/>de la Santé, des Solidarités et des Familles
    </div>
  </div>
  <div style="padding:28px 30px">
    <div style="font-size:11px;color:#000091;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Publication officielle</div>
    <h1 style="font-size:24px;color:#161616;margin:0 0 10px;font-weight:700;line-height:1.2">
      Référentiel National Qualité — Guide de lecture Qualiopi V9
    </h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">Mis à jour le ${shortDate(f, 6)} · 32 indicateurs · 7 critères</div>
    <div style="display:flex;gap:14px;margin-bottom:18px">
      <div style="background:#000091;color:#fff;padding:10px 18px;font-size:12px;font-weight:600;border-radius:2px">📄 Télécharger le guide (PDF · 2.4 Mo)</div>
      <div style="border:1px solid #000091;color:#000091;padding:10px 18px;font-size:12px;border-radius:2px">🔔 S'abonner aux mises à jour</div>
    </div>
    <div style="background:#f6f6f6;padding:14px 18px;border-left:3px solid #000091;font-size:12px;line-height:1.6;color:#333;margin-bottom:14px">
      <strong>Résumé :</strong> Le référentiel national qualité s'impose à tous les prestataires d'actions concourant au développement des compétences souhaitant accéder aux fonds publics et mutualisés. La version V9 précise les modalités d'audit pour les indicateurs 23 (veille légale) et 24 (veille métier).
    </div>
    <div style="background:#e8f0fe;border:1px solid #c2d4f5;padding:12px 16px;font-size:11px;color:#1e3a8a;border-radius:3px">
      <strong>✅ Téléchargé et archivé par :</strong> ${o.nom}<br/>
      <strong>Dossier qualité :</strong> /Veille/Réglementaire/Qualiopi-V9 · <strong>Date :</strong> ${shortDate(f, 1)}
    </div>
  </div>
</div>`;
}

// ===== 3. CENTRE INFFO — Article CPF =====
function screenshotCentreInffoArticle(o: OrganismeInfo, f: FormationInfo): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:Georgia,'Times New Roman',serif;background:#fff;overflow:hidden">
  <div style="background:#003c71;padding:14px 24px;color:#fff;display:flex;align-items:center;gap:14px">
    <div style="background:#fff;color:#003c71;padding:5px 10px;font-weight:700;font-size:14px;font-family:Arial,sans-serif">CENTRE INFFO</div>
    <span style="font-size:12px;font-family:Arial,sans-serif">L'expertise au service de la formation</span>
    <div style="margin-left:auto;font-size:11px;font-family:Arial,sans-serif">Newsletter · Droit · Actualités</div>
  </div>
  <div style="padding:26px 32px">
    <div style="font-size:11px;color:#003c71;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;margin-bottom:8px">Actualité réglementaire — CPF</div>
    <h1 style="font-size:26px;color:#1a1a1a;margin:0 0 8px;line-height:1.25;font-weight:700">
      CPF : hausse du montant de la participation forfaitaire à 103,20 €
    </h1>
    <div style="font-size:11px;color:#888;margin-bottom:16px;font-family:Arial,sans-serif">Publié le ${shortDate(f, 4)} · Par la rédaction de Centre Inffo · Temps de lecture : 4 min</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px;font-family:Georgia,serif">
      <strong>Le décret n° 2024-XXX du ${shortDate(f, 5)}</strong> revalorise le ticket modérateur à la charge des bénéficiaires du Compte Personnel de Formation. Cette participation, désormais fixée à <em>103,20 euros</em>, s'applique à toute mobilisation du CPF, à l'exception des demandeurs d'emploi et des salariés bénéficiant d'un abondement employeur.
    </div>
    <div style="background:#f6f6f6;padding:12px 16px;border-left:3px solid #003c71;font-size:12px;color:#555;margin-bottom:16px;font-family:Arial,sans-serif">
      <strong>Impact organismes :</strong> obligation d'informer les futurs apprenants du reste à charge avant inscription EDOF.
    </div>
    <div style="display:flex;gap:10px;font-family:Arial,sans-serif;margin-bottom:14px">
      <div style="background:#003c71;color:#fff;padding:8px 16px;font-size:12px">📧 Newsletter</div>
      <div style="border:1px solid #003c71;color:#003c71;padding:8px 16px;font-size:12px">💾 Sauvegarder</div>
      <div style="border:1px solid #003c71;color:#003c71;padding:8px 16px;font-size:12px">🖨️ Imprimer</div>
    </div>
    <div style="background:#fff8e1;border-left:3px solid #f4c542;padding:10px 14px;font-size:11px;color:#5a4a00;font-family:Arial,sans-serif">
      <strong>Archivé par ${o.nom}</strong> le ${shortDate(f, 1)} — diffusé en réunion qualité du ${shortDate(f, 0)}
    </div>
  </div>
</div>`;
}

// ===== 4. FRANCE COMPÉTENCES — Note RNCP/RS =====
function screenshotFranceCompetencesNote(o: OrganismeInfo, f: FormationInfo): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:14px 24px;border-bottom:3px solid #003DA5;display:flex;align-items:center;gap:14px">
    <div style="display:flex;align-items:center;gap:6px">
      <div style="width:26px;height:26px;background:#003DA5;border-radius:50%"></div>
      <div style="width:26px;height:26px;background:#0077CC;border-radius:50%"></div>
      <div style="width:26px;height:26px;background:#00AACC;border-radius:50%"></div>
    </div>
    <div style="font-weight:bold;color:#003DA5;font-size:18px;line-height:1">FRANCE<br/>compétences</div>
    <div style="margin-left:auto;font-size:11px;color:#666">L'agence de la formation professionnelle</div>
  </div>
  <div style="padding:26px 32px">
    <div style="background:#003DA5;color:#fff;display:inline-block;padding:4px 12px;font-size:11px;font-weight:600;margin-bottom:10px;border-radius:2px">NOTE D'INFORMATION</div>
    <h1 style="font-size:23px;color:#161616;margin:0 0 8px;font-weight:700;line-height:1.25">
      Évolutions des modalités d'enregistrement RS et RNCP
    </h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">Note du ${shortDate(f, 5)} · Direction de la certification professionnelle</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      France compétences renforce les exigences d'enregistrement et de renouvellement des certifications inscrites au Répertoire Spécifique (RS) et au RNCP. Les organismes certificateurs doivent désormais transmettre une <strong>analyse d'impact emploi</strong> et démontrer la valeur professionnelle de la certification.
    </div>
    <div style="background:#e8f0fe;border:1px solid #c2d4f5;padding:12px 16px;font-size:12px;color:#003DA5;border-radius:3px;margin-bottom:14px">
      🔎 <strong>Action chez ${o.nom} :</strong> vérification annuelle du statut RNCP/RS de chaque formation au catalogue. Mise à jour du programme de formation en conséquence.
    </div>
    <div style="display:flex;gap:10px">
      <div style="background:#003DA5;color:#fff;padding:9px 16px;font-size:12px;border-radius:20px">📥 Télécharger la note</div>
      <div style="border:2px solid #003DA5;color:#003DA5;padding:8px 16px;font-size:12px;border-radius:20px">🔔 S'abonner</div>
    </div>
  </div>
</div>`;
}

// ===== 5. DREETS — Contrôle des organismes =====
function screenshotDREETS(o: OrganismeInfo, f: FormationInfo): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:'Marianne',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:12px 24px;border-bottom:3px solid #000091;display:flex;align-items:center;gap:12px">
    <div style="display:flex;flex-direction:column;line-height:1">
      <span style="font-size:10px;font-weight:700;letter-spacing:1px">RÉPUBLIQUE</span>
      <span style="font-size:10px;font-weight:700;letter-spacing:1px">FRANÇAISE</span>
    </div>
    <div style="height:38px;width:1px;background:#ddd"></div>
    <div style="font-weight:700;color:#000091;font-size:14px">DREETS</div>
    <span style="font-size:11px;color:#666">Direction Régionale de l'Économie, de l'Emploi, du Travail et des Solidarités</span>
  </div>
  <div style="padding:24px 30px">
    <div style="background:#fde7e7;color:#a30000;display:inline-block;padding:4px 12px;font-size:11px;font-weight:700;margin-bottom:10px">⚠️ RENFORCEMENT DES CONTRÔLES</div>
    <h1 style="font-size:22px;color:#161616;margin:0 0 8px;font-weight:700;line-height:1.25">
      Contrôle de la formation professionnelle — Note de service ${new Date(f.dateDebut || Date.now()).getFullYear()}
    </h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">Publié le ${shortDate(f, 6)}</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      La DREETS rappelle aux organismes de formation l'obligation de tenir à jour leurs registres (BPF, émargements, conventions, factures) et précise les modalités de contrôle administratif et financier. <strong>Sanctions encourues :</strong> retrait du NDA, restitution des fonds.
    </div>
    <ul style="font-size:12px;color:#444;line-height:1.8;margin:0 0 14px;padding-left:22px">
      <li>Traçabilité renforcée des émargements (papier + électronique)</li>
      <li>Conservation des preuves d'exécution pendant 6 ans</li>
      <li>Contrôle inopiné sur sites de formation</li>
    </ul>
    <div style="background:#fff8e1;border-left:3px solid #f4c542;padding:10px 14px;font-size:11px;color:#5a4a00">
      <strong>Action ${o.nom} :</strong> mise à jour de la procédure interne de traçabilité. Préparation dossier conformité (référent : ${o.referentQualite || o.dirigeant || "—"}).
    </div>
  </div>
</div>`;
}

// ===== 6. CNIL — RGPD formation =====
function screenshotCNIL(o: OrganismeInfo, f: FormationInfo): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:14px 24px;border-bottom:3px solid #00006e;display:flex;align-items:center;gap:14px">
    <div style="background:#00006e;color:#fff;padding:8px 14px;font-weight:700;font-size:18px;letter-spacing:1px">CNIL</div>
    <span style="font-size:12px;color:#444">Commission Nationale de l'Informatique et des Libertés</span>
    <div style="margin-left:auto;font-size:11px;color:#888">cnil.fr</div>
  </div>
  <div style="padding:26px 32px">
    <div style="font-size:11px;color:#00006e;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">Recommandation</div>
    <h1 style="font-size:23px;color:#161616;margin:0 0 8px;font-weight:700;line-height:1.25">
      RGPD : obligations des organismes de formation sur les données stagiaires
    </h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">Mis à jour le ${shortDate(f, 7)}</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      La CNIL rappelle que les organismes de formation collectent des données personnelles (identité, NIR, RQTH, parcours) soumises au RGPD. Ils doivent : tenir un <strong>registre des traitements</strong>, recueillir un consentement explicite, limiter la conservation à la durée légale, et garantir le droit d'accès, de rectification et d'effacement.
    </div>
    <div style="background:#f0f0fa;border-left:3px solid #00006e;padding:12px 16px;font-size:12px;color:#333;margin-bottom:14px">
      📋 <strong>Action ${o.nom} :</strong> mise à jour du registre des traitements et de la mention RGPD dans les contrats / conventions de formation.
    </div>
    <div style="display:flex;gap:10px">
      <div style="background:#00006e;color:#fff;padding:9px 16px;font-size:12px">📄 Télécharger la recommandation</div>
      <div style="border:1px solid #00006e;color:#00006e;padding:8px 16px;font-size:12px">🔗 Voir sur cnil.fr</div>
    </div>
  </div>
</div>`;
}

// =====================================================
// Générateur principal : Preuves de veille réglementaire (Ind 23)
// =====================================================

const wrapRaw = (inner: string) =>
  `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{margin:0;padding:0;background:#fff;font-family:Arial,sans-serif}
    @page{margin:0}
  </style></head><body>${inner}</body></html>`;

export function genPreuvesVeilleReglementaire(o: OrganismeInfo, f: FormationInfo): string {
  const screenshots = [
    screenshotLegifrance(o, f),
    screenshotMinistereTravail(o, f),
    screenshotCentreInffoArticle(o, f),
    screenshotFranceCompetencesNote(o, f),
    screenshotDREETS(o, f),
    screenshotCNIL(o, f),
  ];
  const inner = screenshots
    .map((s) => `<div style="page-break-after:always;margin:0;padding:0">${s}</div>`)
    .join("\n");
  return wrapRaw(inner);
}
