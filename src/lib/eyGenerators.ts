/**
 * Auto-generators for EY/Sauléa control documents that don't have existing templates.
 * These produce HTML strings ready for PDF export.
 */
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, htmlWrap, orgHeader, footer, section, tableHTML, formatDate, formationInfoBlock, signatureBlock2, getDocStyle, linkUrl, optSiteWeb, getSiteWebLabel, getDisplayDuree, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireTarif } from "./docBuilder";
import { mergeOrganisme, mergeStagiaires, SAMPLE_FORMATEURS, FormateurInfo, parseDuree, getFormationDays } from "./sampleData";

/* ───── helpers ───── */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(d?: string): string {
  if (!d) return formatDate(today());
  return formatDate(d);
}

function primaryColor(): string {
  return getDocStyle()?.primaryColor || "#1a56db";
}

/* ═══════════════════════════════════════════════════
   CODE 4 – Autres documents : objectifs & méthodes par séquence
   ═══════════════════════════════════════════════════ */
export function genObjectifsMethodesSequence(o: OrganismeInfo, f: FormationInfo): string {
  const days = getFormationDays(f);
  const { totalHours } = parseDuree(f.duree || "35h");
  const hoursPerDay = totalHours / Math.max(days.length, 1);

  let sequences = "";
  const chapters = (f.programme || "Module 1 : Introduction\nModule 2 : Approfondissement\nModule 3 : Mise en pratique\nModule 4 : Évaluation")
    .split("\n").filter(l => l.trim());
  
  chapters.forEach((ch, i) => {
    sequences += `
      <tr>
        <td style="font-weight:600;">Séquence ${i + 1}</td>
        <td>${ch.replace(/^(Module\s*\d+\s*[:–-]\s*)/i, "")}</td>
        <td>${Math.round(hoursPerDay * (i < chapters.length - 1 ? 1 : days.length - chapters.length + 1))}h</td>
        <td>${i === 0 ? "Apports théoriques, échanges" : i === chapters.length - 1 ? "Évaluation sommative, mise en situation" : "Cas pratiques, exercices dirigés, travaux de groupe"}</td>
        <td>${i === 0 ? "Comprendre les fondamentaux" : i === chapters.length - 1 ? "Valider les acquis" : "Maîtriser les techniques"}</td>
      </tr>`;
  });

  return buildDocument({
    org: o, formation: f,
    title: "Objectifs et méthodes pédagogiques par séquence",
    sections: [
      { title: "Présentation", content: `<p>Ce document décrit, séquence par séquence, les objectifs pédagogiques visés et les méthodes d'animation retenues pour la formation <strong>${f.intitule || "Formation"}</strong>.</p>` },
      { title: "Détail par séquence", content: `
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:${primaryColor()};color:#fff;">
            <th style="padding:8px;border:1px solid #ddd;">Séquence</th>
            <th style="padding:8px;border:1px solid #ddd;">Contenu</th>
            <th style="padding:8px;border:1px solid #ddd;">Durée</th>
            <th style="padding:8px;border:1px solid #ddd;">Méthode pédagogique</th>
            <th style="padding:8px;border:1px solid #ddd;">Objectif</th>
          </tr></thead>
          <tbody>${sequences}</tbody>
        </table>` },
      { title: "Méthodes transversales", content: `<ul>
        <li>Pédagogie active et participative</li>
        <li>Alternance théorie / pratique</li>
        <li>Supports numériques interactifs</li>
        <li>Évaluations formatives continues</li>
        <li>Accompagnement individualisé</li>
      </ul>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 11 – Dossier stagiaire (per-stagiaire)
   ═══════════════════════════════════════════════════ */
export function genDossierStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  if (!s) return "";

  return buildDocument({
    org: o, formation: f, stagiaire: s,
    title: `Dossier stagiaire – ${s.prenom} ${s.nom}`,
    sections: [
      { title: "Informations personnelles", content: `
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:35%;">Civilité</td><td style="padding:6px;border:1px solid #ddd;">${s.civilite || "—"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Nom</td><td style="padding:6px;border:1px solid #ddd;">${s.nom}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Prénom</td><td style="padding:6px;border:1px solid #ddd;">${s.prenom}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Date de naissance</td><td style="padding:6px;border:1px solid #ddd;">${s.dateNaissance ? fmtDate(s.dateNaissance) : "—"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Email</td><td style="padding:6px;border:1px solid #ddd;">${s.email || "—"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Téléphone</td><td style="padding:6px;border:1px solid #ddd;">${s.telephone || "—"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Entreprise</td><td style="padding:6px;border:1px solid #ddd;">${s.entreprise || "—"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Poste</td><td style="padding:6px;border:1px solid #ddd;">${s.poste || "—"}</td></tr>
        </table>` },
      { title: "Formation suivie", content: `
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:35%;">Intitulé</td><td style="padding:6px;border:1px solid #ddd;">${f.intitule || "—"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Date de début</td><td style="padding:6px;border:1px solid #ddd;">${fmtDate(getStagiaireDateDebut(s, f))}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Date de fin</td><td style="padding:6px;border:1px solid #ddd;">${fmtDate(getStagiaireDateFin(s, f))}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Durée</td><td style="padding:6px;border:1px solid #ddd;">${getDisplayDuree(s, f)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Modalités</td><td style="padding:6px;border:1px solid #ddd;">${f.modalites || "Présentiel"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">N° Action</td><td style="padding:6px;border:1px solid #ddd;">${(s as any).numeroAction || "—"}</td></tr>
        </table>` },
      { title: "Résultat du positionnement amont", content: `
        <p>Un test de positionnement a été réalisé en amont de la formation afin d'évaluer le niveau initial du stagiaire et d'adapter le parcours pédagogique.</p>
        <p><strong>Niveau initial constaté :</strong> ${si % 3 === 0 ? "Débutant" : si % 3 === 1 ? "Intermédiaire" : "Faux-débutant"}</p>
        <p><strong>Adaptations prévues :</strong> ${si % 2 === 0 ? "Renforcement des bases théoriques" : "Approfondissement pratique et cas concrets"}</p>` },
      { title: "Pièces jointes au dossier", content: `<ul>
        <li>Copie de la pièce d'identité</li>
        <li>Test de positionnement rempli</li>
        <li>Contrat de formation signé</li>
        <li>Convocation à la formation</li>
        <li>Feuilles d'émargement</li>
        <li>Évaluations (initiale, intermédiaire, finale)</li>
        <li>Attestation de fin de formation</li>
      </ul>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 12 – Descriptif des moyens matériels
   ═══════════════════════════════════════════════════ */
export function genDescriptifMoyensMateriels(o: OrganismeInfo, f: FormationInfo): string {
  const isFOAD = (f.modalites || "").toLowerCase().includes("distance");
  
  return buildDocument({
    org: o, formation: f,
    title: "Descriptif des moyens matériels et techniques",
    sections: [
      { title: "Locaux et équipements", content: `
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:${primaryColor()};color:#fff;">
            <th style="padding:8px;border:1px solid #ddd;">Équipement</th>
            <th style="padding:8px;border:1px solid #ddd;">Quantité</th>
            <th style="padding:8px;border:1px solid #ddd;">État</th>
          </tr></thead>
          <tbody>
            <tr><td style="padding:6px;border:1px solid #ddd;">Salle de formation équipée</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">Vidéoprojecteur / Écran interactif</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">Paperboard / Tableau blanc</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">Ordinateurs portables</td><td style="padding:6px;border:1px solid #ddd;">15</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">Connexion internet haut débit</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">Imprimante multifonction</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
          </tbody>
        </table>` },
      ...(isFOAD ? [{ title: "Outils numériques et plateforme LMS", content: `
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:${primaryColor()};color:#fff;">
            <th style="padding:8px;border:1px solid #ddd;">Outil</th>
            <th style="padding:8px;border:1px solid #ddd;">Usage</th>
            <th style="padding:8px;border:1px solid #ddd;">Accessibilité</th>
          </tr></thead>
          <tbody>
            <tr><td style="padding:6px;border:1px solid #ddd;">Plateforme LMS</td><td style="padding:6px;border:1px solid #ddd;">Hébergement des contenus, suivi de progression</td><td style="padding:6px;border:1px solid #ddd;">24h/24</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">Visioconférence (Zoom/Teams)</td><td style="padding:6px;border:1px solid #ddd;">Classes virtuelles synchrones</td><td style="padding:6px;border:1px solid #ddd;">Heures ouvrées</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">Espace documentaire en ligne</td><td style="padding:6px;border:1px solid #ddd;">Partage de ressources</td><td style="padding:6px;border:1px solid #ddd;">24h/24</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">Forum / Chat</td><td style="padding:6px;border:1px solid #ddd;">Échanges entre apprenants et formateur</td><td style="padding:6px;border:1px solid #ddd;">24h/24</td></tr>
          </tbody>
        </table>` }] : []),
      { title: "Aide à la connexion", content: isFOAD
        ? `<p>Un guide de connexion est transmis à chaque stagiaire avant le début de la formation. Une assistance technique est disponible par email et téléphone pendant toute la durée de la formation.</p>`
        : `<p>Les postes informatiques sont configurés et testés avant chaque session. Le formateur assure l'assistance technique en début de session.</p>` },
      { title: "Conformité et accessibilité", content: `<p>Les locaux sont conformes aux normes ERP et accessibles aux personnes à mobilité réduite. Les équipements sont régulièrement vérifiés et entretenus.</p>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 15 – Photos/factures matériel (cahier maintenance)
   ═══════════════════════════════════════════════════ */
export function genCahierMaintenance(o: OrganismeInfo): string {
  const yr = new Date().getFullYear();
  return buildDocument({
    org: o,
    title: "Cahier de maintenance du matériel pédagogique",
    sections: [
      { title: "Registre de maintenance", content: `
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:${primaryColor()};color:#fff;">
            <th style="padding:8px;border:1px solid #ddd;">Date</th>
            <th style="padding:8px;border:1px solid #ddd;">Équipement</th>
            <th style="padding:8px;border:1px solid #ddd;">Nature intervention</th>
            <th style="padding:8px;border:1px solid #ddd;">Prestataire</th>
            <th style="padding:8px;border:1px solid #ddd;">État</th>
          </tr></thead>
          <tbody>
            <tr><td style="padding:6px;border:1px solid #ddd;">15/01/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Vidéoprojecteur Epson</td><td style="padding:6px;border:1px solid #ddd;">Remplacement lampe</td><td style="padding:6px;border:1px solid #ddd;">Epson SAV</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">02/03/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Ordinateurs portables (x15)</td><td style="padding:6px;border:1px solid #ddd;">Mise à jour OS + antivirus</td><td style="padding:6px;border:1px solid #ddd;">Interne</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">15/04/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Imprimante multifonction</td><td style="padding:6px;border:1px solid #ddd;">Révision + remplacement toner</td><td style="padding:6px;border:1px solid #ddd;">Canon SAV</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">01/06/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Connexion internet</td><td style="padding:6px;border:1px solid #ddd;">Upgrade fibre 1Gbps</td><td style="padding:6px;border:1px solid #ddd;">FAI</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">15/09/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Plateforme LMS</td><td style="padding:6px;border:1px solid #ddd;">Mise à jour version 4.2</td><td style="padding:6px;border:1px solid #ddd;">Éditeur LMS</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr>
          </tbody>
        </table>` },
      { title: "Inventaire du matériel", content: `<p>L'inventaire complet du matériel pédagogique est tenu à jour et accessible sur demande. Chaque équipement fait l'objet d'une fiche de suivi individuelle.</p>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 20 – CV Formateur (uses existing cv_formateur template but we provide a dedicated one)
   ═══════════════════════════════════════════════════ */
export function genCVFormateur(o: OrganismeInfo, f: FormationInfo): string {
  const fmt = SAMPLE_FORMATEURS[0];
  return _buildCV(o, f, fmt, "Formateur");
}

/* ═══════════════════════════════════════════════════
   CODE 22 – Fichier des formateurs (statut contractuel)
   ═══════════════════════════════════════════════════ */
export function genFichierFormateursStatut(o: OrganismeInfo, f: FormationInfo): string {
  const fmts = SAMPLE_FORMATEURS;
  let rows = "";
  fmts.forEach((fmt, i) => {
    rows += `<tr>
      <td style="padding:6px;border:1px solid #ddd;">${fmt.prenom} ${fmt.nom}</td>
      <td style="padding:6px;border:1px solid #ddd;">${fmt.specialite}</td>
      <td style="padding:6px;border:1px solid #ddd;">${i === 0 ? "CDI" : i === 1 ? "CDD" : "Sous-traitant"}</td>
      <td style="padding:6px;border:1px solid #ddd;">${i >= 2 ? "Micro-entreprise" : "—"}</td>
      <td style="padding:6px;border:1px solid #ddd;">${o.nda || "NDA-XXXX"}</td>
      <td style="padding:6px;border:1px solid #ddd;">${i >= 2 ? "Non" : "—"}</td>
    </tr>`;
  });

  return buildDocument({
    org: o, formation: f,
    title: "Fichier des formateurs / intervenants",
    subtitle: `Action contrôlée : ${f.intitule || "Formation"}`,
    sections: [
      { title: "Liste des intervenants", content: `
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:${primaryColor()};color:#fff;">
            <th style="padding:8px;border:1px solid #ddd;">Nom / Prénom</th>
            <th style="padding:8px;border:1px solid #ddd;">Spécialité</th>
            <th style="padding:8px;border:1px solid #ddd;">Statut</th>
            <th style="padding:8px;border:1px solid #ddd;">Statut juridique</th>
            <th style="padding:8px;border:1px solid #ddd;">NDA</th>
            <th style="padding:8px;border:1px solid #ddd;">Qualiopi</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 33 – Bilans intermédiaires (per-stagiaire)
   ═══════════════════════════════════════════════════ */
export function genBilanIntermediaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  if (!s) return "";
  const progress = 40 + (si % 4) * 10; // 40-70%

  return buildDocument({
    org: o, formation: f, stagiaire: s,
    title: `Bilan intermédiaire – ${s.prenom} ${s.nom}`,
    sections: [
      { title: "Progression à mi-parcours", content: `
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:40%;">Taux de progression</td><td style="padding:6px;border:1px solid #ddd;">${progress}%</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Assiduité</td><td style="padding:6px;border:1px solid #ddd;">${90 + (si % 10)}%</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Participation</td><td style="padding:6px;border:1px solid #ddd;">${si % 3 === 0 ? "Très active" : si % 3 === 1 ? "Active" : "Satisfaisante"}</td></tr>
        </table>` },
      { title: "Points forts identifiés", content: `<ul>
        <li>${si % 2 === 0 ? "Bonne compréhension des concepts théoriques" : "Excellente capacité d'application pratique"}</li>
        <li>${si % 3 === 0 ? "Participation active aux travaux de groupe" : "Autonomie dans la réalisation des exercices"}</li>
        <li>Motivation et implication constantes</li>
      </ul>` },
      { title: "Axes d'amélioration", content: `<ul>
        <li>${si % 2 === 0 ? "Approfondir la pratique sur les cas complexes" : "Renforcer les acquis théoriques"}</li>
        <li>Poursuivre l'effort de régularité</li>
      </ul>` },
      { title: "Plan d'action pour la suite", content: `<p>Le formateur propose de ${si % 2 === 0 ? "renforcer les mises en situation pratiques" : "consolider les acquis par des exercices ciblés"} pour la seconde partie de la formation.</p>` },
    ],
    signatures: [
      { label: "Le formateur", name: o.responsablePedagogique || SAMPLE_FORMATEURS[0].nom },
      { label: "Le/La stagiaire", name: `${s.prenom} ${s.nom}` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 36 – Taux de réussite
   ═══════════════════════════════════════════════════ */
export function genTauxReussiteEY(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const n = Math.max(stagiaires.length, 1);
  const reussite = Math.round(n * 0.89);
  
  return buildDocument({
    org: o, formation: f,
    title: "Taux de réussite aux certifications",
    sections: [
      { title: "Résultats", content: `
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Formation</td><td style="padding:8px;border:1px solid #ddd;">${f.intitule || "Formation"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Nombre de candidats présentés</td><td style="padding:8px;border:1px solid #ddd;">${n}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Nombre de certifiés</td><td style="padding:8px;border:1px solid #ddd;">${reussite}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Taux de réussite</td><td style="padding:8px;border:1px solid #ddd;font-weight:700;color:${primaryColor()};">${Math.round((reussite / n) * 100)}%</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Taux d'abandon</td><td style="padding:8px;border:1px solid #ddd;">0%</td></tr>
        </table>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 38 – Facture (reuse facture_edof)
   ═══════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   CODE 39 – Grille tarifaire
   ═══════════════════════════════════════════════════ */
export function genGrilleTarifaire(o: OrganismeInfo, f: FormationInfo): string {
  const tarif = parseFloat(f.tarif || "2500") || 2500;
  return buildDocument({
    org: o,
    title: "Grille tarifaire des prestations",
    sections: [
      { title: "Tarifs en vigueur", content: `
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:${primaryColor()};color:#fff;">
            <th style="padding:8px;border:1px solid #ddd;">Prestation</th>
            <th style="padding:8px;border:1px solid #ddd;">Durée</th>
            <th style="padding:8px;border:1px solid #ddd;">Tarif MCF</th>
            <th style="padding:8px;border:1px solid #ddd;">Tarif grand public</th>
          </tr></thead>
          <tbody>
            <tr><td style="padding:6px;border:1px solid #ddd;">${f.intitule || "Formation certifiante"}</td><td style="padding:6px;border:1px solid #ddd;">${f.duree || "35h"}</td><td style="padding:6px;border:1px solid #ddd;">${tarif.toFixed(2)} €</td><td style="padding:6px;border:1px solid #ddd;">${(tarif * 1.1).toFixed(2)} €</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">Bilan de compétences</td><td style="padding:6px;border:1px solid #ddd;">24h</td><td style="padding:6px;border:1px solid #ddd;">1 800,00 €</td><td style="padding:6px;border:1px solid #ddd;">2 200,00 €</td></tr>
            <tr><td style="padding:6px;border:1px solid #ddd;">VAE (accompagnement)</td><td style="padding:6px;border:1px solid #ddd;">20h</td><td style="padding:6px;border:1px solid #ddd;">1 500,00 €</td><td style="padding:6px;border:1px solid #ddd;">1 800,00 €</td></tr>
          </tbody>
        </table>` },
      { title: "Conditions", content: `<p>Les tarifs sont indiqués en euros TTC (exonération de TVA au titre de l'article 261-4-4°a du CGI). Les tarifs MCF sont ceux pratiqués sur la plateforme Mon Compte Formation.</p>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 41 – Devis (per-stagiaire)
   ═══════════════════════════════════════════════════ */
export function genDevisEY(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  if (!s) return "";
  const tarif = getStagiaireTarif(s, f);

  return buildDocument({
    org: o, formation: f, stagiaire: s,
    title: `Devis de formation`,
    subtitle: `N° DEVIS-${new Date().getFullYear()}-${String(si + 1).padStart(3, "0")}`,
    sections: [
      { title: "Bénéficiaire", content: `<p>${s.civilite} ${s.prenom} ${s.nom}<br>${s.email || ""}<br>${s.telephone || ""}</p>` },
      { title: "Prestation", content: `
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Intitulé</td><td style="padding:6px;border:1px solid #ddd;">${f.intitule || "Formation"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Durée</td><td style="padding:6px;border:1px solid #ddd;">${getDisplayDuree(s, f)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Dates</td><td style="padding:6px;border:1px solid #ddd;">Du ${fmtDate(getStagiaireDateDebut(s, f))} au ${fmtDate(getStagiaireDateFin(s, f))}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Modalités</td><td style="padding:6px;border:1px solid #ddd;">${f.modalites || "Présentiel"}</td></tr>
          <tr style="background:#f0f9ff;"><td style="padding:8px;border:1px solid #ddd;font-weight:700;">Montant total TTC</td><td style="padding:8px;border:1px solid #ddd;font-weight:700;font-size:1.1em;">${tarif}</td></tr>
        </table>
        <p style="font-size:0.85em;color:#666;margin-top:8px;">Exonération de TVA au titre de l'article 261-4-4°a du CGI</p>` },
    ],
    signatures: [
      { label: "Le prestataire", name: o.dirigeant || o.nom },
      { label: "Le client", name: `${s.prenom} ${s.nom}` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 50 – Preuve création nouvelle session
   ═══════════════════════════════════════════════════ */
export function genPreuveCreationSession(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o, formation: f,
    title: "Preuve de création de session de formation",
    sections: [
      { title: "Informations session", content: `
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:35%;">Formation</td><td style="padding:6px;border:1px solid #ddd;">${f.intitule || "Formation"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Date de début</td><td style="padding:6px;border:1px solid #ddd;">${fmtDate(f.dateDebut)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Date de fin</td><td style="padding:6px;border:1px solid #ddd;">${fmtDate(f.dateFin)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Durée</td><td style="padding:6px;border:1px solid #ddd;">${f.duree || "35h"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Lieu</td><td style="padding:6px;border:1px solid #ddd;">${f.lieu || o.adresse || "À distance"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Formateur</td><td style="padding:6px;border:1px solid #ddd;">${f.formateur || SAMPLE_FORMATEURS[0].prenom + " " + SAMPLE_FORMATEURS[0].nom}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Date de création</td><td style="padding:6px;border:1px solid #ddd;">${fmtDate(today())}</td></tr>
        </table>` },
      { title: "Validation", content: `<p>La session a été créée et validée par le responsable pédagogique. Les convocations ont été transmises aux stagiaires inscrits.</p>` },
    ],
    signatures: [
      { label: "Le responsable pédagogique", name: o.responsablePedagogique || o.dirigeant || "" },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 48/49 – Communications reports / reprogrammation
   ═══════════════════════════════════════════════════ */
export function genCommunicationReport(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o, formation: f,
    title: "Communication de report / reprogrammation de session",
    sections: [
      { title: "Objet", content: `<p>Nous vous informons que la session de formation initialement prévue a été reprogrammée selon les modalités suivantes :</p>` },
      { title: "Détails", content: `
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:35%;">Formation</td><td style="padding:6px;border:1px solid #ddd;">${f.intitule || "Formation"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Dates initiales</td><td style="padding:6px;border:1px solid #ddd;">—</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Nouvelles dates</td><td style="padding:6px;border:1px solid #ddd;">Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Motif du report</td><td style="padding:6px;border:1px solid #ddd;">Ajustement organisationnel</td></tr>
        </table>` },
      { title: "Information aux stagiaires", content: `<p>Tous les stagiaires inscrits ont été informés individuellement par email et/ou téléphone du report de session et des nouvelles modalités pratiques.</p>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 55 – Plaquette / Supports de communication
   ═══════════════════════════════════════════════════ */
export function genPlaquettePresentation(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o, formation: f,
    title: "Plaquette de présentation",
    sections: [
      { title: "Qui sommes-nous ?", content: `<p><strong>${o.nom || "Notre organisme"}</strong> est un organisme de formation certifié Qualiopi, spécialisé dans ${o.domainesFormation || "la formation professionnelle continue"}.</p>
        <p>Notre mission : accompagner chaque apprenant vers la réussite de son projet professionnel grâce à des formations de qualité, adaptées aux besoins du marché.</p>` },
      { title: "Nos formations", content: `
        <p><strong>${f.intitule || "Formation certifiante"}</strong></p>
        <ul>
          <li><strong>Durée :</strong> ${f.duree || "35h"}</li>
          <li><strong>Modalités :</strong> ${f.modalites || "Présentiel"}</li>
          <li><strong>Public visé :</strong> ${f.publicVise || "Tout public"}</li>
          <li><strong>Prérequis :</strong> ${f.prerequis || "Aucun"}</li>
          <li><strong>Objectifs :</strong> ${f.objectifs || "Acquérir les compétences clés du métier"}</li>
          <li><strong>Certification :</strong> ${f.intitule || "Certification professionnelle"}</li>
        </ul>` },
      { title: "Nos engagements qualité", content: `<ul>
        <li>Certification Qualiopi</li>
        <li>Formateurs experts du domaine</li>
        <li>Accompagnement individualisé</li>
        <li>Suivi post-formation</li>
        <li>Accessibilité PSH</li>
      </ul>` },
      { title: "Contact", content: `<p>${o.nom}<br>${o.adresse ? `${o.adresse}, ${o.codePostal} ${o.ville}` : ""}<br>${o.telephone ? `Tél : ${o.telephone}` : ""}<br>${o.email ? `Email : ${o.email}` : ""}${o.siteWeb ? `<br>Web : ${linkUrl(o.siteWeb)}` : ""}</p>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 60 – Planning intervenants
   ═══════════════════════════════════════════════════ */
export function genPlanningIntervenants(o: OrganismeInfo, f: FormationInfo): string {
  const days = getFormationDays(f);
  const fmt = SAMPLE_FORMATEURS[0];
  let rows = "";
  days.forEach((d, i) => {
    rows += `<tr>
      <td style="padding:6px;border:1px solid #ddd;">${fmtDate(d)}</td>
      <td style="padding:6px;border:1px solid #ddd;">${fmt.prenom} ${fmt.nom}</td>
      <td style="padding:6px;border:1px solid #ddd;">09h00 – 17h00</td>
      <td style="padding:6px;border:1px solid #ddd;">${i < days.length / 2 ? "Module théorique" : "Module pratique"}</td>
    </tr>`;
  });

  return buildDocument({
    org: o, formation: f,
    title: "Planning des intervenants",
    sections: [
      { title: "Calendrier", content: `
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:${primaryColor()};color:#fff;">
            <th style="padding:8px;border:1px solid #ddd;">Date</th>
            <th style="padding:8px;border:1px solid #ddd;">Intervenant</th>
            <th style="padding:8px;border:1px solid #ddd;">Horaires</th>
            <th style="padding:8px;border:1px solid #ddd;">Module</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 61 – Planning sessions
   ═══════════════════════════════════════════════════ */
export function genPlanningSessionsEY(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o, formation: f,
    title: "Planning des sessions de formation",
    sections: [
      { title: "Sessions programmées", content: `
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:${primaryColor()};color:#fff;">
            <th style="padding:8px;border:1px solid #ddd;">Session</th>
            <th style="padding:8px;border:1px solid #ddd;">Dates</th>
            <th style="padding:8px;border:1px solid #ddd;">Lieu</th>
            <th style="padding:8px;border:1px solid #ddd;">Places</th>
            <th style="padding:8px;border:1px solid #ddd;">Statut</th>
          </tr></thead>
          <tbody>
            <tr><td style="padding:6px;border:1px solid #ddd;">Session 1</td><td style="padding:6px;border:1px solid #ddd;">Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</td><td style="padding:6px;border:1px solid #ddd;">${f.lieu || o.ville || "À distance"}</td><td style="padding:6px;border:1px solid #ddd;">${f.nombreParticipants || "15"}</td><td style="padding:6px;border:1px solid #ddd;">En cours</td></tr>
          </tbody>
        </table>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 64 – CV Responsable pédagogique
   ═══════════════════════════════════════════════════ */
export function genCVResponsablePedagogique(o: OrganismeInfo, f: FormationInfo): string {
  const rpName = o.responsablePedagogique || "Jean-Pierre Martin";
  const [prenom, ...nomParts] = rpName.split(" ");
  const fakeFmt: FormateurInfo = {
    nom: nomParts.join(" ") || "Martin",
    prenom: prenom || "Jean-Pierre",
    specialite: o.domainesFormation || "Ingénierie de formation, coordination pédagogique",
    diplomes: "Master 2 Sciences de l'Éducation, Certification RNCP Responsable de dispositifs de formation",
    experience: "12 ans d'expérience en ingénierie pédagogique et coordination de formations professionnelles",
    email: o.email || "",
  };
  return _buildCV(o, f, fakeFmt, "Responsable pédagogique");
}

/* ═══════════════════════════════════════════════════
   CODE 65 – Actions engagement / prévention ruptures
   ═══════════════════════════════════════════════════ */
export function genActionsEngagement(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o, formation: f,
    title: "Actions de prévention des ruptures de parcours",
    sections: [
      { title: "Dispositif de suivi", content: `<ul>
        <li>Entretien individuel de positionnement en amont</li>
        <li>Points d'étape réguliers avec le formateur</li>
        <li>Bilan intermédiaire à mi-parcours</li>
        <li>Accompagnement renforcé en cas de difficulté identifiée</li>
        <li>Contact téléphonique en cas d'absence non justifiée</li>
      </ul>` },
      { title: "Indicateurs de suivi", content: `<table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Taux d'assiduité moyen</td><td style="padding:6px;border:1px solid #ddd;">95%</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Taux d'abandon</td><td style="padding:6px;border:1px solid #ddd;">0%</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Nombre de relances effectuées</td><td style="padding:6px;border:1px solid #ddd;">3</td></tr>
      </table>` },
      { title: "Ressources mobilisées", content: `<p>Convocations personnalisées, relances email/téléphone, entretiens de remotivation, adaptation du rythme si nécessaire.</p>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 66 – Actions passage examens certification
   ═══════════════════════════════════════════════════ */
export function genActionsPassageExamen(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o, formation: f,
    title: "Actions pour faciliter le passage des examens de certification",
    sections: [
      { title: "Préparation aux examens", content: `<ul>
        <li>Examens blancs en conditions réelles</li>
        <li>Révisions ciblées sur les compétences clés du référentiel</li>
        <li>Conseils méthodologiques pour les épreuves écrites et orales</li>
        <li>Accompagnement individualisé sur les points faibles</li>
      </ul>` },
      { title: "Organisation des examens", content: `<ul>
        <li>Convocation individuelle avec toutes les informations pratiques</li>
        <li>Vérification des prérequis d'inscription à la certification</li>
        <li>Mise à disposition des ressources documentaires</li>
        <li>Accompagnement logistique le jour de l'examen</li>
      </ul>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 67 – Accompagnement FOAD
   ═══════════════════════════════════════════════════ */
export function genAccompagnementFOAD(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o, formation: f,
    title: "Accompagnement technique et pédagogique en FOAD",
    sections: [
      { title: "Accompagnement technique", content: `<ul>
        <li>Guide de connexion transmis avant le démarrage</li>
        <li>Test de connexion préalable</li>
        <li>Assistance technique par email et téléphone (réponse sous 4h)</li>
        <li>FAQ en ligne accessible 24h/24</li>
      </ul>` },
      { title: "Accompagnement pédagogique", content: `<ul>
        <li>Classes virtuelles synchrones régulières</li>
        <li>Forum de discussion pour les échanges asynchrones</li>
        <li>Permanences pédagogiques hebdomadaires</li>
        <li>Suivi de la progression via la plateforme LMS</li>
        <li>Entretiens individuels sur demande</li>
      </ul>` },
      { title: "Outils utilisés", content: `<table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Plateforme LMS</td><td style="padding:6px;border:1px solid #ddd;">Hébergement des contenus et suivi</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Visioconférence</td><td style="padding:6px;border:1px solid #ddd;">Classes virtuelles en direct</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Email / Téléphone</td><td style="padding:6px;border:1px solid #ddd;">Support technique et pédagogique</td></tr>
      </table>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   CODE 40 – Factures hors MCF
   ═══════════════════════════════════════════════════ */
export function genFactureHorsMCF(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  return buildDocument({
    org: o,
    title: "Exemple de facture hors dispositif MCF",
    subtitle: `N° FAC-HP-${yr}-001`,
    sections: [
      { title: "Client", content: `<p>Entreprise XYZ<br>123 rue du Commerce, 75001 Paris</p>` },
      { title: "Prestation", content: `
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:${primaryColor()};color:#fff;">
            <th style="padding:8px;border:1px solid #ddd;">Désignation</th>
            <th style="padding:8px;border:1px solid #ddd;">Durée</th>
            <th style="padding:8px;border:1px solid #ddd;">Montant HT</th>
          </tr></thead>
          <tbody>
            <tr><td style="padding:6px;border:1px solid #ddd;">${f.intitule || "Formation intra-entreprise"}</td><td style="padding:6px;border:1px solid #ddd;">${f.duree || "14h"}</td><td style="padding:6px;border:1px solid #ddd;">2 800,00 €</td></tr>
          </tbody>
          <tfoot>
            <tr style="font-weight:700;"><td colspan="2" style="padding:8px;border:1px solid #ddd;text-align:right;">Total TTC</td><td style="padding:8px;border:1px solid #ddd;">2 800,00 €</td></tr>
          </tfoot>
        </table>
        <p style="font-size:0.85em;">Exonération de TVA – Article 261-4-4°a du CGI</p>` },
    ],
  });
}

/* ═══════════════════════════════════════════════════
   Shared: _buildCV
   ═══════════════════════════════════════════════════ */
function _buildCV(o: OrganismeInfo, f: FormationInfo, fmt: FormateurInfo, role: string): string {
  return buildDocument({
    org: o,
    title: `Curriculum Vitae – ${fmt.prenom} ${fmt.nom}`,
    subtitle: role,
    sections: [
      { title: "Informations personnelles", content: `
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:30%;">Nom</td><td style="padding:6px;border:1px solid #ddd;">${fmt.nom}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Prénom</td><td style="padding:6px;border:1px solid #ddd;">${fmt.prenom}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Fonction</td><td style="padding:6px;border:1px solid #ddd;">${role}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Email</td><td style="padding:6px;border:1px solid #ddd;">${fmt.email || o.email || "—"}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Organisme</td><td style="padding:6px;border:1px solid #ddd;">${o.nom || "—"}</td></tr>
        </table>` },
      { title: "Domaines d'expertise", content: `<p>${fmt.specialite}</p>` },
      { title: "Formation et diplômes", content: `<p>${fmt.diplomes}</p>` },
      { title: "Expérience professionnelle", content: `<p>${fmt.experience}</p>
        <ul>
          <li><strong>${role}</strong> – ${o.nom || "Organisme de formation"} (en poste)</li>
          <li>Conception et animation de formations professionnelles</li>
          <li>Ingénierie pédagogique et suivi qualité</li>
          <li>Accompagnement individualisé des apprenants</li>
        </ul>` },
      { title: "Compétences clés", content: `<ul>
        <li>Ingénierie de formation et pédagogie pour adultes</li>
        <li>Animation de groupes en présentiel et distanciel</li>
        <li>Évaluation des compétences et certification</li>
        <li>Outils numériques et plateformes LMS</li>
        <li>Accompagnement PSH</li>
      </ul>` },
    ],
  });
}
