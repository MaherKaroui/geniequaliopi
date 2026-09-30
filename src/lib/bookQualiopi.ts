import { typeAuditEffectif, attenduSelonAudit, LIBELLES_AUDIT, type TypeAudit } from "./typeAudit";
import { OrganismeInfo, FormationInfo, StagiaireInfo, DocEntry, CRITERES_INFO } from "@/types/qualiopi";
import { baseStyle, formatDate, orgHeader, footer, isFacebookPage } from "./docBuilder";
import { INDICATEURS_REFERENCE, CRITERES_TITLES } from "./qualiopiReference";

// Generate the full "Book Qualiopi" as a single HTML document matching the Reltim PDF structure
export function generateBookQualiopi(
  org: OrganismeInfo,
  formations: FormationInfo[],
  stagiaires: StagiaireInfo[],
  catalog: DocEntry[],
  typeAudit: TypeAudit = typeAuditEffectif(org)
): string {
  const bookStyle = `<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e;line-height:1.6}
.page{max-width:850px;margin:0 auto;padding:40px;min-height:100vh;position:relative}
.page-break{page-break-after:always}

/* Cover */
.cover{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90vh;text-align:center;background:linear-gradient(135deg,#1e3a7b 0%,#2d5aa0 100%);color:white;border-radius:16px;padding:60px 40px;margin-bottom:40px}
.cover h1{font-size:48px;font-weight:800;letter-spacing:2px;margin-bottom:10px}
.cover .subtitle{font-size:20px;opacity:0.9;margin-top:10px}
.cover .org-badge{background:rgba(255,255,255,0.15);padding:15px 30px;border-radius:12px;margin-top:30px;font-size:16px}
.cover .year{font-size:80px;font-weight:800;opacity:0.15;position:absolute;bottom:40px;right:40px}

/* Sections */
h1.section-title{font-size:24px;color:#1e3a7b;border-bottom:3px solid #1e3a7b;padding-bottom:10px;margin:30px 0 20px}
h2{font-size:18px;color:#1e3a7b;margin:20px 0 10px}
h3{font-size:15px;color:#333;margin:15px 0 8px}
p{margin-bottom:8px;font-size:13px;line-height:1.7}

.info-card{background:#f8f9fa;border-radius:12px;padding:20px;margin:15px 0;border-left:4px solid #1e3a7b}
.info-card.green{border-left-color:#2d8659}
.info-card.orange{border-left-color:#e8870e}

.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin:15px 0}

.participant-card{background:white;border:1px solid #e0e0e0;border-radius:12px;padding:20px;text-align:center}
.participant-card .name{font-weight:700;color:#1e3a7b;font-size:15px}
.participant-card .role{color:#666;font-size:12px;margin-top:4px}

.tool-badge{display:inline-block;background:#e8f0fe;color:#1e3a7b;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;margin:3px}

/* Critère header */
.critere-header{background:linear-gradient(135deg,#1e3a7b,#2d5aa0);color:white;padding:25px 30px;border-radius:12px;margin:30px 0 20px}
.critere-header h2{color:white;margin:0;font-size:20px}
.critere-header p{color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:13px}

/* Indicateur */
.indicateur-block{border:1px solid #e0e0e0;border-radius:12px;margin:20px 0;overflow:hidden}
.indicateur-num{background:#1e3a7b;color:white;padding:12px 20px;font-weight:700;font-size:14px;display:flex;align-items:center;gap:10px}
.indicateur-num .badge{background:rgba(255,255,255,0.2);padding:2px 10px;border-radius:10px;font-size:11px}
.indicateur-content{padding:20px}
.indicateur-intitule{font-size:13px;font-style:italic;color:#444;margin-bottom:12px;padding:10px;background:#f8f9fa;border-radius:8px}
.niveau-attendu{background:#e8f0fe;padding:12px 16px;border-radius:8px;margin:10px 0;font-size:13px}
.niveau-attendu strong{color:#1e3a7b}
.preuves-list{margin:15px 0}
.preuves-list h4{color:#1e3a7b;font-size:13px;margin-bottom:8px}
.preuve-item{display:flex;align-items:center;gap:8px;padding:6px 0;font-size:12px;border-bottom:1px solid #f0f0f0}
.preuve-item .check{color:#2d8659;font-weight:700}
.preuve-item .doc-name{flex:1}

/* Table */
table{width:100%;border-collapse:collapse;margin:15px 0;font-size:12px}
th{background:#1e3a7b;color:white;padding:10px;text-align:left}
td{padding:8px 10px;border-bottom:1px solid #e0e0e0}
tr:nth-child(even){background:#f8f9fa}

.footer{margin-top:40px;padding-top:20px;border-top:2px solid #e0e0e0;font-size:11px;color:#666;text-align:center}

/* Sommaire */
.sommaire-item{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid #f0f0f0}
.sommaire-num{background:#1e3a7b;color:white;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0}
.sommaire-text{font-size:13px;flex:1}
.sommaire-text strong{color:#1e3a7b}

@media print{
  .page{padding:20px}
  .cover{min-height:100vh}
  .page-break{page-break-after:always}
}
</style>`;

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${bookStyle}</head><body>`;

  // === PAGE 1: COVER ===
  const logoHtml = org.logoUrl ? `<div style="margin-bottom:20px"><img src="${org.logoUrl}" alt="Logo" style="max-height:100px;max-width:250px;object-fit:contain" /></div>` : "";
  html += `<div class="cover">
    ${logoHtml}
    <h1>BOOK QUALIOPI</h1>
    <div class="subtitle">Dossier de preuves – Référentiel National Qualité</div>
    <div class="org-badge">
      <strong>${org.nom}</strong><br>
      Organisme de formation – NDA : ${org.nda}
    </div>
    <div class="subtitle" style="margin-top:40px;opacity:0.7">SIRET : ${org.siret}</div>
    <div class="org-badge">${LIBELLES_AUDIT[typeAudit]}</div>
    <div class="year">${new Date().getFullYear()}</div>
  </div>`;
  html += `<div class="page-break"></div>`;

  // === PAGE 2: PRÉSENTATION / SITE INTERNET ===
  const isFb = isFacebookPage(org.siteWeb);
  html += `<div class="page">
    <h1 class="section-title">PRÉSENTATION</h1>
    ${org.siteWeb ? `<h2>${isFb ? 'Page Facebook' : 'Site Internet'}</h2>
    <div class="info-card">
      <p><strong>URL ${isFb ? 'Page Facebook' : 'site internet'} :</strong> ${org.siteWeb}</p>
      ${!isFb ? `<p><strong>URL pages formations :</strong> ${org.siteWeb}/formations</p>
      <p><strong>Lien catalogue :</strong> ${org.siteWeb}/catalogue</p>` : ''}
    </div>` : ''}
    <h2>Informations</h2>
    <div class="info-card">
      <p><strong>Raison sociale :</strong> ${org.nom}</p>
      <p><strong>SIRET :</strong> ${org.siret}</p>
      <p><strong>NDA :</strong> ${org.nda}</p>
      <p><strong>Adresse :</strong> ${org.adresse}, ${org.codePostal} ${org.ville}</p>
      <p><strong>Téléphone :</strong> ${org.telephone}</p>
      <p><strong>Email :</strong> ${org.email}</p>
      <p><strong>Domaines de formation :</strong> ${org.domainesFormation}</p>
      <p><strong>Types d'actions :</strong> ${org.typesActions.join(", ")}</p>
      <p><strong>Certifications :</strong> ${org.certifications}</p>
      <p><strong>Nombre de formations dispensées :</strong> ${formations.length} formations au catalogue</p>
      <p><strong>Formations RNCP / RS :</strong> ${org.certifications}</p>
      <p><strong>Modalités :</strong> Intra / Inter / Distanciel / Mixte</p>
    </div>
  </div>`;
  html += `<div class="page-break"></div>`;

  // === PAGE 3: CARTE D'IDENTITÉ ===
  html += `<div class="page">
    <h1 class="section-title">CARTE D'IDENTITÉ</h1>
    <div class="info-card">
      <p><strong>Nom organisme :</strong> ${org.nom}</p>
      <p><strong>SIRET :</strong> ${org.siret}</p>
      <p><strong>NDA :</strong> ${org.nda}</p>
      <p><strong>Email :</strong> ${org.email}</p>
      <p><strong>Certifications déjà obtenues :</strong> ${org.certifications}</p>
    </div>
    <h2>PARTICIPANTS À L'AUDIT</h2>
    <div class="grid-2">
      <div class="participant-card">
        <div class="name">${org.dirigeant}</div>
        <div class="role">Directeur / CEO</div>
      </div>
      <div class="participant-card">
        <div class="name">${org.responsablePedagogique}</div>
        <div class="role">Responsable pédagogique</div>
      </div>
      <div class="participant-card">
        <div class="name">${org.referentHandicap}</div>
        <div class="role">Référent handicap</div>
      </div>
      <div class="participant-card">
        <div class="name">${org.referentQualite}</div>
        <div class="role">Référent qualité / administratif</div>
      </div>
    </div>
  </div>`;
  html += `<div class="page-break"></div>`;

  // === PAGE 4: ORGANIGRAMME ===
  html += `<div class="page">
    <h1 class="section-title">ORGANIGRAMME</h1>
    <div style="text-align:center;margin:30px 0">
      <div style="background:#1e3a7b;color:white;padding:18px 40px;border-radius:12px;display:inline-block;margin-bottom:25px;font-size:15px"><strong>Direction Générale</strong><br>${org.dirigeant}</div>
      <div class="grid-2" style="max-width:600px;margin:0 auto">
        <div style="background:#e8f0fe;padding:15px;border-radius:10px;text-align:center"><strong>Pôle Pédagogique</strong><br><span style="font-size:12px">${org.responsablePedagogique}</span><br><em style="font-size:11px;color:#666">Formateurs</em></div>
        <div style="background:#e8f0fe;padding:15px;border-radius:10px;text-align:center"><strong>Pôle Qualité</strong><br><span style="font-size:12px">${org.referentQualite}</span><br><em style="font-size:11px;color:#666">Amélioration continue</em></div>
        <div style="background:#e8f0fe;padding:15px;border-radius:10px;text-align:center"><strong>Pôle Handicap</strong><br><span style="font-size:12px">${org.referentHandicap}</span><br><em style="font-size:11px;color:#666">Accessibilité</em></div>
        <div style="background:#e8f0fe;padding:15px;border-radius:10px;text-align:center"><strong>Pôle Administratif</strong><br><span style="font-size:12px">${org.poleAdministratif}</span><br><em style="font-size:11px;color:#666">Inscriptions, facturation</em></div>
      </div>
    </div>
  </div>`;
  html += `<div class="page-break"></div>`;

  // === PAGE 5: OUTILS UTILISÉS ===
  const tools = org.outilsUtilises ? org.outilsUtilises.split(",").map(t => t.trim()) : ["Microsoft 365", "Moodle LMS", "Zoom", "Google Drive", "Digiforma"];
  html += `<div class="page">
    <h1 class="section-title">LES OUTILS UTILISÉS</h1>
    <div style="margin:20px 0">
      ${tools.map(t => `<span class="tool-badge">${t}</span>`).join(" ")}
    </div>
    <div class="info-card">
      <h3>Outils de gestion</h3>
      <p>• ${tools.slice(0, 3).join(", ")} – Gestion administrative et pédagogique</p>
      <h3>Outils pédagogiques</h3>
      <p>• Plateforme LMS pour les formations à distance et le suivi des apprenants</p>
      <p>• Outils de visioconférence pour les classes virtuelles</p>
      <p>• Supports interactifs et évaluations en ligne</p>
      <h3>Outils qualité</h3>
      <p>• Questionnaires de satisfaction en ligne</p>
      <p>• Tableau de bord qualité et indicateurs de performance</p>
      <p>• Registre des réclamations et plan d'amélioration continue</p>
    </div>
  </div>`;
  html += `<div class="page-break"></div>`;

  // === PAGE 6: SOMMAIRE ===
  html += `<div class="page">
    <h1 class="section-title">SOMMAIRE</h1>
    ${CRITERES_INFO.map(c => `
      <div class="sommaire-item">
        <div class="sommaire-num">${c.numero}</div>
        <div class="sommaire-text"><strong>CRITÈRE ${c.numero}</strong> : ${CRITERES_TITLES[c.numero]?.toUpperCase() || c.titre.toUpperCase()}</div>
      </div>
    `).join("")}
  </div>`;
  html += `<div class="page-break"></div>`;

  // === CRITÈRES & INDICATEURS — une page dédiée par indicateur (32 pages) ===
  for (const critere of CRITERES_INFO) {
    // Page d'intro du critère
    html += `<div class="page">
      <div class="critere-header">
        <h2>CRITÈRE ${critere.numero}</h2>
        <p>${CRITERES_TITLES[critere.numero] || critere.titre}</p>
      </div>
      <div class="info-card" style="margin-top:20px">
        <h3 style="color:#1e3a7b;margin-bottom:12px">Indicateurs de ce critère (${critere.indicateurs.length})</h3>
        ${critere.indicateurs.map(ind => {
          const ref = INDICATEURS_REFERENCE.find(r => r.numero === ind.numero);
          return `<div class="sommaire-item">
            <div class="sommaire-num">${ind.numero}</div>
            <div class="sommaire-text"><strong>Indicateur ${ind.numero}</strong> — ${ref?.intitule || ind.titre}</div>
          </div>`;
        }).join("")}
      </div>
    </div><div class="page-break"></div>`;

    // Une page dédiée par indicateur
    for (const ind of critere.indicateurs) {
      const ref = INDICATEURS_REFERENCE.find(r => r.numero === ind.numero);
      const indDocs = catalog.filter(d => d.indicateur === ind.numero);

      html += `<div class="page">
        <div class="critere-header" style="padding:16px 24px">
          <h2 style="font-size:16px">CRITÈRE ${critere.numero} — INDICATEUR ${ind.numero}</h2>
          <p>${CRITERES_TITLES[critere.numero] || critere.titre}</p>
        </div>
        <div class="indicateur-block" style="margin-top:20px">
          <div class="indicateur-num">
            <span>INDICATEUR ${ind.numero}</span>
            ${ref ? `<span class="badge">${ref.type === "commun" ? "COMMUN" : "SPÉCIFIQUE"}</span>` : ""}
            ${ref ? `<span class="badge">${ref.applicableActions.join(" · ")}</span>` : ""}
          </div>
          <div class="indicateur-content">
            ${ref ? `<div class="indicateur-intitule">${ref.intitule}</div>` : `<div class="indicateur-intitule">${ind.titre}</div>`}
            ${ref ? `<div class="niveau-attendu"><strong>Niveau attendu :</strong> ${ref.niveauAttendu}<br><em>${attenduSelonAudit(typeAudit, ind.numero)}</em></div>` : ""}

            <div class="preuves-list">
              <h4>📁 Preuves et documents (${indDocs.length})</h4>
              ${indDocs.length > 0
                ? indDocs.map(d => `<div class="preuve-item"><span class="check">✅</span><span class="doc-name">${d.nom}</span></div>`).join("")
                : `<p style="font-size:12px;color:#666;font-style:italic;padding:8px 0">Aucun document généré pour cet indicateur.</p>`}
            </div>

            ${ref && ref.questionsPreuves.length > 0 ? `
            <div class="info-card" style="margin-top:15px">
              <h4 style="color:#1e3a7b;font-size:12px;margin-bottom:8px">Questions d'audit</h4>
              ${ref.questionsPreuves.map(q => `<p style="font-size:11px;margin:4px 0">• ${q}</p>`).join("")}
            </div>` : ""}
          </div>
        </div>
      </div><div class="page-break"></div>`;
    }
  }

  // === FOOTER ===
  html += `<div class="page">
    ${footer(org)}
  </div>`;

  html += `</body></html>`;
  return html;
}
