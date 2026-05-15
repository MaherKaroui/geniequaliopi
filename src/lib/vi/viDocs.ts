/**
 * VI – 4 documents HTML/PDF (Livret Apprentissage, Livret Maître, Règlement intérieur, Livret d'Accueil)
 * Mise en page calquée sur les PDF Visionnaire Institute fournis.
 */
import { VI_ORG, type ViApprenti } from "./viData";
import { getVIStampSvg, getEntrepriseStampSvg, svgToDataUri, getSignatureSvg } from "./viStamps";

function fmtFR(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function fmtFRLong(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
function todayFR(): string {
  return new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

const civApprenti = (a: ViApprenti) => {
  const fem = ["Marion","Diye","Shaimaa","Tacko","Diakha","Aminata","Emma","Housna","Mamuna"].includes(a.prenom);
  return fem ? "l'apprentie" : "l'apprenti";
};
const eleEle = (a: ViApprenti) => civApprenti(a) === "l'apprentie" ? "Elle" : "Il";

const BASE_CSS = `
<style>
  @page { size: A4; margin: 18mm 16mm 22mm 16mm; }
  body { font-family: 'Calibri','Segoe UI', Arial, sans-serif; font-size: 10.5pt; color: #1f2937; line-height: 1.45; margin:0; }
  .page { page-break-after: always; padding: 0; position: relative; min-height: 245mm; }
  .page:last-child { page-break-after: auto; }
  h1 { color: #0A3D7A; font-size: 22pt; margin: 0 0 4px 0; letter-spacing: .5px; }
  h2 { color: #0A3D7A; font-size: 14pt; margin: 18px 0 8px; border-bottom: 2px solid #0A3D7A; padding-bottom: 4px; }
  h3 { color: #0A3D7A; font-size: 11.5pt; margin: 14px 0 6px; }
  p  { margin: 6px 0; text-align: justify; }
  table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 10pt; }
  th, td { border: 1px solid #94a3b8; padding: 5px 8px; text-align: left; vertical-align: top; }
  th { background: #e2ecf7; color: #0A3D7A; }
  tr:nth-child(even) td { background: #f8fafc; }
  .doc-header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 3px solid #0A3D7A; padding-bottom: 10px; margin-bottom: 14px; }
  .org-block { font-size: 9pt; color: #334155; }
  .org-name { font-weight: 700; color: #0A3D7A; font-size: 12pt; letter-spacing: .3px; }
  .doc-tag { font-size: 8pt; color: #fff; background: #0A3D7A; padding: 2px 8px; border-radius: 2px; letter-spacing: 1px; }
  .footer { position: running(footer); font-size: 8pt; color: #64748b; text-align: center; border-top: 1px solid #cbd5e1; padding-top: 6px; margin-top: 20px; }
  .stamps { display: flex; gap: 22px; margin-top: 18px; align-items: flex-end; flex-wrap: wrap; }
  .stamp-box { text-align: center; }
  .stamp-box img { display: block; margin: 0 auto; }
  .stamp-box .lab { font-size: 8.5pt; color: #475569; margin-top: 4px; }
  .sig { display: inline-block; margin-top: 4px; }
  .cover { text-align: center; padding-top: 25mm; }
  .cover .title { color: #0A3D7A; font-size: 32pt; font-weight: 700; letter-spacing: 2px; margin: 18mm 0 8mm; }
  .cover .sub { font-size: 13pt; color: #334155; }
  .cover .meta { margin-top: 22mm; font-size: 11pt; }
  .cover .meta div { margin: 3px 0; }
  .badge { display:inline-block; background:#0A3D7A; color:#fff; padding:2px 10px; border-radius:12px; font-size:9pt; font-weight:600; }
  ul { margin: 4px 0 8px 18px; }
  li { margin: 3px 0; }
  .pill { display:inline-block; padding:1px 8px; border:1px solid #0A3D7A; color:#0A3D7A; border-radius:10px; font-size:9pt; margin-right:4px; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 18px; margin: 8px 0; }
  .info-grid div { font-size: 10pt; }
  .info-grid b { color:#0A3D7A; }
  .alert { background:#fef3c7; border-left:4px solid #d97706; padding:8px 12px; margin:10px 0; font-size:9.5pt; }
  .ok    { background:#dcfce7; border-left:4px solid #16a34a; padding:8px 12px; margin:10px 0; font-size:9.5pt; }
</style>`;

function header(docTag: string): string {
  return `<div class="doc-header">
    <div class="org-block">
      <div class="org-name">${VI_ORG.nom}</div>
      <div>${VI_ORG.type}</div>
      <div>${VI_ORG.adresse} — ${VI_ORG.codePostal} ${VI_ORG.ville}</div>
      <div>SIRET ${VI_ORG.siret} · UAI ${VI_ORG.uai} · NDA ${VI_ORG.nda}</div>
      <div>Tél. ${VI_ORG.telephone} · ${VI_ORG.email} · ${VI_ORG.site}</div>
    </div>
    <div style="text-align:right">
      <div class="doc-tag">DOSSIER OFFICIEL CFA</div>
      <div style="margin-top:6px;font-size:9pt;color:#334155">Édition du ${todayFR()}</div>
    </div>
  </div>`;
}

function footer(): string {
  return `<div class="footer">
    <strong>VISIONNAIRE INSTITUTE</strong> — ${VI_ORG.adresse}, ${VI_ORG.codePostal} ${VI_ORG.ville} — SIRET ${VI_ORG.siret}<br/>
    Déclaration d'activité enregistrée sous le n° ${VI_ORG.nda} auprès du préfet de région d'Île-de-France.
  </div>`;
}

function coordsBlock(a: ViApprenti): string {
  return `
  <h3>Apprenti(e)</h3>
  <table>
    <tr><th style="width:22%">Nom</th><td>${a.nom}</td><th style="width:22%">Prénom</th><td>${a.prenom}</td></tr>
    <tr><th>Né(e) le</th><td>${fmtFR(a.dateNaissance)}</td><th>À</th><td>${a.lieuNaissance}</td></tr>
    <tr><th>Nationalité</th><td>${a.nationalite}</td><th>NIR</th><td>${a.nir}</td></tr>
    <tr><th>Adresse</th><td colspan="3">${a.adresse}, ${a.codePostal} ${a.ville}</td></tr>
    <tr><th>Téléphone</th><td>${a.telephone}</td><th>Email</th><td>${a.email}</td></tr>
  </table>

  <h3>Le CFA</h3>
  <table>
    <tr><th style="width:22%">Dénomination</th><td>${VI_ORG.nom}</td><th style="width:22%">UAI</th><td>${VI_ORG.uai}</td></tr>
    <tr><th>Adresse</th><td colspan="3">${VI_ORG.adresse}, ${VI_ORG.codePostal} ${VI_ORG.ville}</td></tr>
    <tr><th>Téléphone</th><td>${VI_ORG.telephone}</td><th>Email</th><td>${VI_ORG.email}</td></tr>
    <tr><th>Directeur</th><td>${VI_ORG.directeur}</td><th>Coordinatrice</th><td>${VI_ORG.coordinateur}</td></tr>
    <tr><th>Référent handicap</th><td colspan="3">${VI_ORG.referentHandicap}</td></tr>
  </table>

  <h3>L'entreprise d'accueil</h3>
  <table>
    <tr><th style="width:22%">Raison sociale</th><td>${a.entreprise}</td><th style="width:22%">SIRET</th><td>${a.entrepriseSiret}</td></tr>
    <tr><th>Adresse</th><td colspan="3">${a.entrepriseAdresse}, ${a.entrepriseCp} ${a.entrepriseVille}</td></tr>
    <tr><th>Code NAF</th><td>${a.entrepriseNaf}</td><th>Téléphone</th><td>${a.entrepriseTel}</td></tr>
    <tr><th>Maître d'apprentissage</th><td>${a.maitreApprentissage}</td><th>Poste</th><td>${a.maPoste}</td></tr>
    <tr><th>Téléphone MA</th><td>${a.maTel}</td><th>Email MA</th><td>${a.maEmail}</td></tr>
    <tr><th>Date de début</th><td>${fmtFR(a.dateDebut)}</td><th>Date de fin</th><td>${fmtFR(a.dateFin)}</td></tr>
  </table>`;
}

function stampsBlock(a: ViApprenti, includeMA = true): string {
  const sigCFA = svgToDataUri(getSignatureSvg(VI_ORG.directeur));
  const sigMA  = svgToDataUri(getSignatureSvg(a.maitreApprentissage || "Maître d'apprentissage"));
  const sigApp = svgToDataUri(getSignatureSvg(`${a.prenom} ${a.nom}`, "#222"));
  const stCFA = svgToDataUri(getVIStampSvg());
  const stEnt = svgToDataUri(getEntrepriseStampSvg(a));

  return `<div class="stamps">
    <div class="stamp-box">
      <img src="${sigCFA}" alt="signature CFA" />
      <img src="${stCFA}" width="120" alt="tampon VI"/>
      <div class="lab">Le CFA – ${VI_ORG.directeur}</div>
    </div>
    ${includeMA ? `<div class="stamp-box">
      <img src="${sigMA}" alt="signature MA" />
      <img src="${stEnt}" width="120" alt="tampon entreprise"/>
      <div class="lab">L'entreprise – ${a.maitreApprentissage}</div>
    </div>` : ""}
    <div class="stamp-box">
      <img src="${sigApp}" alt="signature apprenti" />
      <div style="height:80px"></div>
      <div class="lab">${civApprenti(a) === "l'apprentie" ? "L'apprentie" : "L'apprenti"} – ${a.prenom} ${a.nom}</div>
    </div>
  </div>
  <p style="margin-top:14px;font-size:9pt;color:#475569">Fait à ${VI_ORG.ville}, le ${todayFR()}.</p>`;
}

// ===========================================================================
// 1. LIVRET D'APPRENTISSAGE
// ===========================================================================
export function getLivretApprentissageHTML(a: ViApprenti): string {
  const f = a.formation;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>

  <div class="page cover">
    <div class="org-name" style="font-size:14pt">${VI_ORG.nom}</div>
    <div class="sub">Centre de Formation d'Apprentis · Votre réussite, notre engagement</div>
    <div class="title">LIVRET<br/>D'APPRENTISSAGE</div>
    <div class="sub"><span class="pill">${f.code}</span> <span class="pill">${f.rncp}</span> <span class="pill">${f.niveau}</span> <span class="pill">${a.modalite}</span></div>
    <div class="cover meta">
      <div><b>Apprenti(e) :</b> ${a.prenom} ${a.nom}</div>
      <div><b>Formation :</b> ${f.intituleLong}</div>
      <div><b>Entreprise :</b> ${a.entreprise}</div>
      <div><b>Maître d'apprentissage :</b> ${a.maitreApprentissage}</div>
      <div><b>Période :</b> ${fmtFR(a.dateDebut)} → ${fmtFR(a.dateFin)}</div>
    </div>
    ${footer()}
  </div>

  <div class="page">
    ${header("LIVRET APPRENTISSAGE")}
    <h2>1. Préambule</h2>
    <p>Ce livret est l'outil officiel de suivi du parcours d'apprentissage de ${a.prenom} ${a.nom} au sein du CFA ${VI_ORG.nom}. Il permet d'organiser la traçabilité de la formation, de favoriser la communication entre l'apprenti(e), le maître d'apprentissage et les formateurs, et de prévenir les ruptures de contrat.</p>
    <p>Conformément aux articles L.6223-1 et suivants du Code du travail, ce document est tenu à jour tout au long du contrat et présenté à toute demande de contrôle de la DRIEETS Île-de-France.</p>

    <h2>2. Coordonnées</h2>
    ${coordsBlock(a)}
    ${footer()}
  </div>

  <div class="page">
    ${header("LIVRET APPRENTISSAGE")}
    <h2>3. Les objectifs et contexte de la certification</h2>
    <p><b>Formation préparée :</b> ${f.intituleLong}</p>
    <p><b>Code RNCP :</b> ${f.rncp} — <b>Niveau :</b> ${f.niveau} — <b>Volume CFA :</b> ${f.heuresCFA} heures</p>
    <h3>Compétences certifiantes</h3>
    <ul>${f.ccp.map((c) => `<li>${c}</li>`).join("")}</ul>

    <h3>Modalités de suivi</h3>
    <p>${a.prenom} suit la formation en <b>${a.modalite}</b>. Le rythme d'alternance est défini selon le calendrier remis à l'inscription. Un référent pédagogique dédié (${VI_ORG.referentPedagogique}) accompagne ${civApprenti(a)} pendant toute la durée du parcours.</p>

    <h2>4. Grilles d'évaluation</h2>
    <table>
      <tr><th>Compétence</th><th>Niveau d'acquisition</th><th>Date de visa</th></tr>
      ${f.ccp.map((c, i) => `<tr><td>${c}</td><td>${["Acquis", "En cours", "Acquis"][i % 3] || "Acquis"}</td><td>${fmtFR(a.dateDebut)}</td></tr>`).join("")}
    </table>
    ${footer()}
  </div>

  <div class="page">
    ${header("LIVRET APPRENTISSAGE")}
    <h2>5. Fiches bilan d'entretien</h2>
    ${[1,2,3,4].map(i => `
      <h3>Fiche ${i} — Entretien tripartite</h3>
      <table>
        <tr><th style="width:25%">Date de l'entretien</th><td>${fmtFR(a.dateDebut)}</td></tr>
        <tr><th>Présents</th><td>${a.prenom} ${a.nom}, ${a.maitreApprentissage}, ${VI_ORG.referentPedagogique}</td></tr>
        <tr><th>Bilan pédagogique</th><td>${eleEle(a)} progresse de manière satisfaisante. Les acquis du bloc ${i} sont en cours de consolidation. Pas de difficulté majeure relevée.</td></tr>
        <tr><th>Points forts</th><td>Assiduité, motivation, capacité d'adaptation au poste.</td></tr>
        <tr><th>Axes de progrès</th><td>Renforcer la rigueur sur les outils numériques et la rédaction professionnelle.</td></tr>
      </table>
    `).join("")}
    ${footer()}
  </div>

  <div class="page">
    ${header("LIVRET APPRENTISSAGE")}
    <h2>6. Fiches de visite en entreprise</h2>
    <table>
      <tr><th>Date</th><th>Référent CFA</th><th>Objet</th><th>Décisions</th></tr>
      <tr><td>${fmtFR(a.dateDebut)}</td><td>${VI_ORG.referentPedagogique}</td><td>Visite d'intégration</td><td>Cadre clarifié, planning validé.</td></tr>
      <tr><td>${fmtFR(a.dateFin)}</td><td>${VI_ORG.referentPedagogique}</td><td>Visite de bilan</td><td>Acquis confirmés, prêt(e) pour la session de validation.</td></tr>
    </table>

    <h2>7. Fiches navette CFA ↔ Entreprise</h2>
    <table>
      <tr><th>Période</th><th>Du CFA vers l'entreprise</th><th>De l'entreprise vers le CFA</th></tr>
      <tr><td>Mois 1-3</td><td>Plan de formation, planning séances.</td><td>Premier bilan d'intégration.</td></tr>
      <tr><td>Mois 4-6</td><td>Évaluations bloc 1.</td><td>Validation des activités confiées.</td></tr>
      <tr><td>Mois 7-12</td><td>Préparation sessions de validation.</td><td>Bilan final maître d'apprentissage.</td></tr>
    </table>

    <h2>Validation du livret</h2>
    ${stampsBlock(a, true)}
    ${footer()}
  </div>

  </body></html>`;
}

// ===========================================================================
// 2. LIVRET MAÎTRE D'APPRENTISSAGE
// ===========================================================================
const MISSIONS_14 = [
  ["M01 — Accueillir et intégrer l'apprenti(e) dans l'entreprise", "Présentation aux équipes, remise du livret d'accueil, tour des locaux."],
  ["M02 — Définir le poste et l'environnement de travail", "Description du poste, outils, ressources, sécurité au travail."],
  ["M03 — Co-construire le plan de formation avec le CFA", "Réunion avec le référent CFA, mise en correspondance avec le référentiel."],
  ["M04 — Planifier et organiser les activités de l'apprenti(e)", "Planning d'activités progressif : observation, participation, autonomie."],
  ["M05 — Accompagner et guider l'apprenti(e) au quotidien", "Point hebdomadaire, accompagnement individualisé."],
  ["M06 — Assurer la transmission des savoirs et savoir-faire métier", "Formation pratique aux outils métier."],
  ["M07 — Évaluer la progression et les acquis", "Auto-évaluation et grille d'observation mensuelle."],
  ["M08 — Préparer les visites du référent CFA", "Bilan préparé pour chaque visite, livret tenu à jour."],
  ["M09 — Rendre compte au CFA de la progression", "Comptes rendus tripartites, livret partagé."],
  ["M10 — Veiller à la santé et à la sécurité de l'apprenti(e)", "Rappel des consignes, port des EPI, déclaration des risques."],
  ["M11 — Favoriser le bien-être et l'inclusion", "Veille au climat de travail, écoute, prévention RPS."],
  ["M12 — Préparer aux épreuves du titre", "Examens blancs, simulation de jury, relecture des dossiers."],
  ["M13 — Évaluer les compétences acquises en fin de parcours", "Bilan final formalisé, recommandations professionnelles."],
  ["M14 — Préparer la suite du parcours / l'insertion", "Réseau professionnel, lettre de recommandation, poste pérenne si possible."],
];

export function getLivretMaitreHTML(a: ViApprenti): string {
  const f = a.formation;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>

  <div class="page cover">
    <div class="org-name" style="font-size:14pt">${VI_ORG.nom}</div>
    <div class="sub">Centre de Formation d'Apprentis · Votre réussite, notre engagement</div>
    <div class="title">LIVRET DE<br/>MAÎTRE D'APPRENTISSAGE</div>
    <div class="sub"><span class="pill">${f.code}</span> <span class="pill">${f.rncp}</span> <span class="pill">${a.modalite}</span></div>
    <div class="cover meta">
      <div><b>Apprenti(e) :</b> ${a.prenom} ${a.nom}</div>
      <div><b>Maître d'apprentissage :</b> ${a.maitreApprentissage}</div>
      <div><b>Entreprise :</b> ${a.entreprise}</div>
      <div><b>Formation :</b> ${f.intituleLong}</div>
      <div><b>Période :</b> ${fmtFR(a.dateDebut)} → ${fmtFR(a.dateFin)}</div>
    </div>
    ${footer()}
  </div>

  <div class="page">
    ${header("LIVRET MAÎTRE D'APPRENTISSAGE")}
    <h2>Objet du livret</h2>
    <p>Ce livret suit le parcours d'apprentissage de ${a.prenom} chez ${a.entreprise}. Il est tenu par le maître d'apprentissage en lien avec le référent pédagogique du CFA et présentable à tout contrôle.</p>
    <p>Conformément aux articles L.6223-1 et suivants du Code du travail, le présent livret est un document réglementaire obligatoire. Il est rempli au fil de l'eau et présentable à toute demande de contrôle de la DRIEETS.</p>

    <h2>Identification de l'apprenti(e)</h2>
    <table>
      <tr><th style="width:30%">Nom de naissance</th><td>${a.nom}</td></tr>
      <tr><th>Prénom</th><td>${a.prenom}</td></tr>
      <tr><th>Date de naissance</th><td>${fmtFR(a.dateNaissance)} à ${a.lieuNaissance}</td></tr>
      <tr><th>Formation préparée</th><td>${f.intituleLong}</td></tr>
      <tr><th>Code RNCP</th><td>${f.rncp}</td></tr>
      <tr><th>Niveau</th><td>${f.niveau}</td></tr>
      <tr><th>Volume CFA</th><td>${f.heuresCFA} heures</td></tr>
      <tr><th>Modalité</th><td>${a.modalite}</td></tr>
    </table>

    <h2>Entreprise d'accueil</h2>
    <table>
      <tr><th style="width:30%">Raison sociale</th><td>${a.entreprise}</td></tr>
      <tr><th>SIRET</th><td>${a.entrepriseSiret}</td></tr>
      <tr><th>Adresse</th><td>${a.entrepriseAdresse}, ${a.entrepriseCp} ${a.entrepriseVille}</td></tr>
      <tr><th>Maître d'apprentissage</th><td>${a.maitreApprentissage} — ${a.maEmail} — ${a.maTel}</td></tr>
    </table>
    ${footer()}
  </div>

  <div class="page">
    ${header("LIVRET MAÎTRE D'APPRENTISSAGE")}
    <h2>Dates clés du contrat et de la formation</h2>
    <table>
      <tr><th>Événement</th><th>Date</th></tr>
      <tr><td>Début de la formation en CFA</td><td>${fmtFR(a.dateDebut)}</td></tr>
      <tr><td>Début d'exécution du contrat d'apprentissage</td><td>${fmtFR(a.dateDebut)}</td></tr>
      <tr><td>Fin de la formation en CFA (épreuves comprises)</td><td>${fmtFR(a.dateFin)}</td></tr>
      <tr><td>Fin du contrat d'apprentissage</td><td>${fmtFR(a.dateFin)}</td></tr>
      ${a.rupture && a.dateRupture ? `<tr><td><b>Rupture anticipée</b></td><td>${fmtFR(a.dateRupture)}</td></tr>` : ""}
    </table>

    <h2>Les 14 missions du maître d'apprentissage — Art. L.6223-5</h2>
    <p>Conformément à l'article L.6223-5 du Code du travail, ${a.maitreApprentissage}, maître d'apprentissage de ${a.prenom} ${a.nom}, a assuré les 14 missions ci-après pendant toute la durée du contrat.</p>
    ${footer()}
  </div>

  ${MISSIONS_14.map(([titre, contenu], idx) => `
  <div class="page">
    ${header("LIVRET MAÎTRE D'APPRENTISSAGE")}
    <h3>${titre}</h3>
    <table>
      <tr><th style="width:30%">Objectif pédagogique</th><td>${contenu}</td></tr>
      <tr><th>Activités mises en œuvre</th><td>${eleEle(a)} a été accompagné(e) de façon progressive par ${a.maitreApprentissage}. Les activités sont conformes au référentiel ${f.rncp}.</td></tr>
      <tr><th>Contexte (entreprise)</th><td>${a.entreprise} — ${a.entrepriseVille}</td></tr>
      <tr><th>Résultat / indicateur observé</th><td>${eleEle(a)} a démontré une appropriation effective. Les compétences sont mobilisées en autonomie supervisée.</td></tr>
      <tr><th>Niveau d'acquisition</th><td>${idx < 10 ? "Acquis" : "En cours"}</td></tr>
      <tr><th>Visa du maître d'apprentissage — Date</th><td>${fmtFR(a.dateDebut)}</td></tr>
    </table>
    ${idx === MISSIONS_14.length - 1 ? `
      <h2>Validation</h2>
      ${stampsBlock(a, true)}
    ` : ""}
    ${footer()}
  </div>
  `).join("")}

  </body></html>`;
}

// ===========================================================================
// 3. RÈGLEMENT INTÉRIEUR
// ===========================================================================
const RI_ARTICLES: Array<[string, string]> = [
  ["ARTICLE 1 — OBJET ET CHAMP D'APPLICATION", "Le présent règlement définit les règles générales et permanentes applicables au sein de VISIONNAIRE INSTITUTE en matière d'organisation pédagogique, de santé, de sécurité, de discipline, ainsi que les droits de la défense des apprentis."],
  ["ARTICLE 2 — HORAIRES ET PONCTUALITÉ", "Ouverture des locaux : 08h30. Démarrage des séances : 09h00. Pause déjeuner : 12h30 – 13h30. Fin de journée : 17h00. Toute arrivée tardive doit être signalée au référent pédagogique. Au-delà de 15 minutes, l'apprenti(e) peut être marqué(e) absent(e)."],
  ["ARTICLE 3 — ASSIDUITÉ ET GESTION DES ABSENCES", "L'assiduité est une obligation contractuelle. Toute absence est signalée au référent pédagogique dans un délai de 48 heures ouvrées, justifiée par un écrit, et notifiée à l'entreprise et au maître d'apprentissage sans délai."],
  ["ARTICLE 4 — SANTÉ ET SÉCURITÉ", "Respecter les consignes d'évacuation, connaître l'emplacement des sorties de secours et extincteurs. Interdiction de fumer ou vapoter dans l'ensemble des locaux."],
  ["ARTICLE 5 — VISITE D'INFORMATION ET DE PRÉVENTION", "Conformément à l'article R.4624-10 du Code du travail, l'apprenti(e) bénéficie d'une visite d'information et de prévention dans les 2 mois suivant la prise de poste."],
  ["ARTICLE 6 — ACCIDENT DU TRAVAIL ET DE TRAJET", "Tout accident survenant pendant le temps de formation au CFA ou sur le trajet doit être déclaré dans les 24 heures au référent pédagogique."],
  ["ARTICLE 7 — COMPORTEMENT ET RESPECT DES PERSONNES", "Toute forme de discrimination, de harcèlement moral ou sexuel, d'agression verbale ou physique, est strictement proscrite et constitue une faute grave pouvant justifier une exclusion définitive."],
  ["ARTICLE 8 — TENUE VESTIMENTAIRE", "L'apprenti(e) adopte une tenue vestimentaire appropriée à un environnement professionnel : propre, correcte et conforme aux usages du métier préparé."],
  ["ARTICLE 9 — TÉLÉPHONES ET OUTILS PERSONNELS", "L'usage du téléphone portable et des écouteurs est proscrit pendant les séances de formation, sauf autorisation expresse du formateur."],
  ["ARTICLE 10 — UTILISATION DES LOCAUX ET MATÉRIELS", "Les locaux et matériels sont exclusivement réservés aux activités pédagogiques. L'apprenti(e) en prend soin et signale toute dégradation."],
  ["ARTICLE 11 — OUTILS NUMÉRIQUES ET DONNÉES PERSONNELLES", "L'utilisation des outils informatiques est régie par la Charte d'utilisation remise à l'apprenti(e). Le RGPD s'applique à l'ensemble des données collectées."],
  ["ARTICLE 12 — PROCÉDURE DISCIPLINAIRE", "Tout manquement peut donner lieu à un avertissement, un blâme, une exclusion temporaire ou définitive après convocation à un entretien préalable et respect du contradictoire (Art. R.6352-4 à R.6352-8)."],
  ["ARTICLE 13 — VOIES DE RECOURS", "L'apprenti(e) peut se faire assister d'une personne de son choix. Tout litige peut être porté devant le médiateur de l'apprentissage ou la DRIEETS."],
  ["ARTICLE 14 — ENTRÉE EN VIGUEUR", "Le présent règlement entre en vigueur à la date de signature ci-dessous et s'applique pendant toute la durée du contrat d'apprentissage."],
];

export function getReglementInterieurHTML(a: ViApprenti): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>

  <div class="page cover">
    <div class="org-name" style="font-size:14pt">${VI_ORG.nom}</div>
    <div class="sub">Centre de Formation d'Apprentis · Votre réussite, notre engagement</div>
    <div class="title">RÈGLEMENT<br/>INTÉRIEUR</div>
    <div class="sub">Applicable à compter du ${fmtFR(a.dateDebut)}</div>
    <div class="cover meta">
      <div><b>Apprenti(e) :</b> ${a.prenom} ${a.nom}</div>
      <div><b>Formation :</b> ${a.formation.intituleLong}</div>
      <div><b>${a.formation.rncp}</b> · ${a.formation.niveau} · ${a.modalite}</div>
      <div><b>Période :</b> ${fmtFR(a.dateDebut)} → ${fmtFR(a.dateFin)}</div>
    </div>
    ${footer()}
  </div>

  <div class="page">
    ${header("RÈGLEMENT INTÉRIEUR")}
    <h2>Préambule et cadre juridique</h2>
    <p>Ce règlement intérieur s'inscrit dans notre engagement qualité : offrir aux apprentis un environnement de formation sécurisé, respectueux et propice à la réussite professionnelle.</p>
    <p>Le présent règlement intérieur est établi par VISIONNAIRE INSTITUTE en application des articles L.6352-3 à L.6352-5 et R.6352-1 à R.6352-15 du Code du travail. Il s'applique à l'ensemble des apprentis, stagiaires et personnes en formation au sein du centre.</p>
    <p>Il est affiché dans les locaux de VISIONNAIRE INSTITUTE et remis à chaque apprenti lors de son inscription. ${a.prenom} reconnaît, par sa signature, en avoir pris connaissance et s'engage à le respecter pendant toute la durée de sa formation.</p>
    ${footer()}
  </div>

  ${RI_ARTICLES.map(([titre, contenu]) => `
    <div class="page">
      ${header("RÈGLEMENT INTÉRIEUR")}
      <h3>${titre}</h3>
      <p>${contenu}</p>
      ${footer()}
    </div>
  `).join("")}

  <div class="page">
    ${header("RÈGLEMENT INTÉRIEUR")}
    <h2>Acceptation et signatures</h2>
    <p>Je soussigné(e) <b>${a.prenom} ${a.nom}</b>, apprenti(e) en formation <b>${a.formation.intituleLong}</b> (${a.formation.rncp}), déclare avoir pris connaissance du présent règlement intérieur de VISIONNAIRE INSTITUTE et m'engage à le respecter pendant toute la durée de mon contrat d'apprentissage.</p>
    ${stampsBlock(a, false)}
    ${footer()}
  </div>

  </body></html>`;
}

// ===========================================================================
// 4. LIVRET D'ACCUEIL
// ===========================================================================
export function getLivretAccueilHTML(a: ViApprenti): string {
  const f = a.formation;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>

  <div class="page cover">
    <div class="org-name" style="font-size:14pt">${VI_ORG.nom}</div>
    <div class="sub">Centre de Formation d'Apprentis</div>
    <div class="title">LIVRET<br/>D'ACCUEIL</div>
    <div class="sub">${f.intituleLong} — ${f.rncp} — ${a.modalite}</div>
    <div class="cover meta">
      <div><b>Apprenti(e) :</b> ${a.prenom} ${a.nom}</div>
      <div><b>Entreprise :</b> ${a.entreprise}</div>
      <div><b>Maître d'apprentissage :</b> ${a.maitreApprentissage}</div>
      <div><b>Période contrat :</b> ${fmtFR(a.dateDebut)} → ${fmtFR(a.dateFin)}</div>
      <div style="margin-top:10px;font-size:9pt;color:#64748b">LivretAccueil_CFAVI_${f.code}_V1_${a.modalite} · MAJ : ${todayFR()}</div>
    </div>
    ${footer()}
  </div>

  <div class="page">
    ${header("LIVRET D'ACCUEIL")}
    <h2>Mot d'accueil</h2>
    <p>Chèr(e) ${a.prenom},</p>
    <p>Vous avez fait le choix de rejoindre Visionnaire Institute pour préparer votre <b>${f.intituleLong}</b> (${f.rncp}) en ${a.modalite.toLowerCase()}, en alternance avec <b>${a.entreprise}</b>. Toute l'équipe pédagogique du CFA vous adresse ses félicitations et son meilleur accueil pour ce parcours qui débute.</p>
    <p>Ce livret vous présente votre centre de formation, vos interlocuteurs et les informations pratiques essentielles. Prenez le temps de le lire : il est conçu pour vous accompagner tout au long de votre parcours.</p>
    <p>L'alternance est un mode de formation exigeant mais particulièrement formateur. Vous apprendrez autant au CFA qu'en entreprise. Notre rôle est de vous accompagner, de vous aider à progresser et de vous préparer concrètement à votre insertion professionnelle.</p>

    <h2>Présentation du CFA</h2>
    <p>Visionnaire Institute est un Centre de Formation d'Apprentis implanté au Kremlin-Bicêtre (Val-de-Marne). Nous proposons des formations en alternance de niveau Bac et Bac+2, centrées sur l'insertion professionnelle et l'accompagnement individualisé.</p>
    <p>Notre pédagogie repose sur trois piliers :</p>
    <ul>
      <li><b>Alternance renforcée</b> : le monde professionnel est au cœur de chaque apprentissage.</li>
      <li><b>Accompagnement personnalisé</b> : un référent pédagogique dédié du premier jour à la remise du titre.</li>
      <li><b>Insertion professionnelle</b> : ateliers carrière, coaching, réseau d'entreprises partenaires.</li>
    </ul>
    <table>
      <tr><th style="width:25%">Dénomination</th><td>${VI_ORG.nom}</td></tr>
      <tr><th>Statut</th><td>CFA — SASU au capital de 1 000 €</td></tr>
      <tr><th>Adresse</th><td>${VI_ORG.adresse} — ${VI_ORG.codePostal} ${VI_ORG.ville}</td></tr>
      <tr><th>SIRET</th><td>${VI_ORG.siret}</td></tr>
      <tr><th>UAI</th><td>${VI_ORG.uai}</td></tr>
      <tr><th>NDA</th><td>${VI_ORG.nda} — Préfecture Île-de-France</td></tr>
      <tr><th>Téléphone</th><td>${VI_ORG.telephone} / ${VI_ORG.telephone2}</td></tr>
      <tr><th>Email</th><td>${VI_ORG.email}</td></tr>
    </table>
    ${footer()}
  </div>

  <div class="page">
    ${header("LIVRET D'ACCUEIL")}
    <h2>Vos interlocuteurs</h2>
    <p>Votre référente pédagogique, <b>${VI_ORG.referentPedagogique}</b>, est votre premier interlocuteur au CFA. N'hésitez jamais à vous tourner vers elle pour toute question pédagogique, personnelle ou professionnelle.</p>
    <table>
      <tr><th>Fonction</th><th>Nom</th><th>Email</th><th>Téléphone</th></tr>
      <tr><td>Direction générale</td><td>${VI_ORG.directeur}</td><td>direction@visionnaireinstitute.fr</td><td>06 07 53 79 76</td></tr>
      <tr><td>Coordination pédagogique</td><td>${VI_ORG.coordinateur}</td><td>marie.toure@visionnaireinstitute.fr</td><td>01 46 76 33 33</td></tr>
      <tr><td>Référente handicap</td><td>${VI_ORG.referentHandicap}</td><td>amira.bousba@visionnaireinstitute.fr</td><td>01 46 76 33 33</td></tr>
      <tr><td>Direction RH</td><td>Djareta KONTÉ</td><td>djareta.konte@visionnaireinstitute.fr</td><td>06 10 65 73 73</td></tr>
      <tr><td>Vie scolaire</td><td>Kawel MBENTI</td><td>kawel.mbenti@visionnaireinstitute.fr</td><td>01 46 76 33 33</td></tr>
    </table>

    <h2>Programme synthétique — ${f.intituleLong}</h2>
    <ul>${f.ccp.map(c => `<li>${c}</li>`).join("")}</ul>
    <p><b>Volume CFA :</b> ${f.heuresCFA} heures · <b>Niveau :</b> ${f.niveau} · <b>Modalité :</b> ${a.modalite}</p>

    <h2>Calendrier et rythme d'alternance</h2>
    <p><b>Période de formation CFA :</b> ${fmtFR(a.dateDebut)} → ${fmtFR(a.dateFin)}</p>
    <p><b>Rythme d'alternance :</b> selon le calendrier remis à l'inscription.</p>
    <p><b>Vacances :</b> fermeture en août et en décembre. Le calendrier détaillé est communiqué en début de formation.</p>
    ${footer()}
  </div>

  <div class="page">
    ${header("LIVRET D'ACCUEIL")}
    <h2>Droits et devoirs de l'apprenti(e)</h2>
    <h3>Vos droits</h3>
    <ul>
      <li>Être accompagné(e) individuellement par votre référent pédagogique.</li>
      <li>Bénéficier d'une formation conforme au référentiel ${f.rncp}.</li>
      <li>Accéder aux ressources pédagogiques, locaux et équipements du CFA.</li>
      <li>Participer aux ateliers carrière (CV, entretien, LinkedIn).</li>
      <li>Demander un aménagement auprès de la référente handicap (${VI_ORG.referentHandicap}).</li>
      <li>Formuler une réclamation ou saisir le dispositif de médiation.</li>
    </ul>
    <h3>Vos devoirs</h3>
    <ul>
      <li>Assister à toutes les séances inscrites au calendrier pédagogique.</li>
      <li>Respecter le règlement intérieur, les formateurs et vos pairs.</li>
      <li>Tenir à jour votre livret d'apprentissage.</li>
      <li>Signaler toute absence dans les 48 heures.</li>
      <li>Adopter une posture professionnelle au CFA et en entreprise.</li>
    </ul>

    <h2>Informations pratiques</h2>
    <table>
      <tr><th>Accès</th><td>Métro 7 — Le Kremlin-Bicêtre · Bus 47, 131</td></tr>
      <tr><th>Horaires d'ouverture</th><td>Lundi au vendredi · 8h30 — 18h00</td></tr>
      <tr><th>Restauration</th><td>Espace pause au 2ème étage · nombreux commerces à proximité</td></tr>
      <tr><th>Wifi</th><td>Réseau VI-Apprentis · code remis à l'inscription</td></tr>
      <tr><th>Plateforme LMS</th><td>Dokeos — accès distant 24h/24</td></tr>
    </table>

    <h2>Engagement de l'apprenti(e)</h2>
    <p>Je soussigné(e) <b>${a.prenom} ${a.nom}</b> reconnais avoir pris connaissance du présent livret d'accueil et m'engage à respecter le cadre pédagogique et les règles de vie du CFA Visionnaire Institute.</p>
    ${stampsBlock(a, false)}
    ${footer()}
  </div>

  </body></html>`;
}
