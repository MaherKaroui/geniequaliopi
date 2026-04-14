/**
 * Auto-generators for EY/Sauléa control documents that don't have existing templates.
 * These produce HTML strings ready for PDF export.
 */
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, getDocStyle, linkUrl, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireTarif, getStagiaireDuree } from "./docBuilder";
import { SAMPLE_FORMATEURS, FormateurInfo, parseDuree, getFormationDays } from "./sampleData";

function today(): string { return new Date().toISOString().slice(0, 10); }
function fmtDate(d?: string): string { return formatDate(d || today()); }
function pc(): string { return getDocStyle()?.primaryColor || "#1a56db"; }
function isSocioEsthetique(f: FormationInfo): boolean {
  const t = (f.intitule||"").toLowerCase() + " " + (f.codeRNCP||"").toLowerCase();
  return t.includes("socio-esthéti") || t.includes("socio esthéti") || t.includes("rs5992") || t.includes("soins socio");
}

/* ═══ CODE 4 – Objectifs et méthodes par séquence ═══ */
export function genObjectifsMethodesSequence(o: OrganismeInfo, f: FormationInfo): string {
  const chapters = (f.programme || "Module 1 : Introduction\nModule 2 : Approfondissement\nModule 3 : Mise en pratique\nModule 4 : Évaluation").split("\n").filter(l => l.trim());
  let rows = "";
  chapters.forEach((ch, i) => {
    rows += `<tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Séquence ${i+1}</td><td style="padding:6px;border:1px solid #ddd;">${ch.replace(/^Module\s*\d+\s*[:–-]\s*/i,"")}</td><td style="padding:6px;border:1px solid #ddd;">${i===chapters.length-1?"Évaluation sommative":"Cas pratiques, exercices dirigés"}</td><td style="padding:6px;border:1px solid #ddd;">${i===0?"Comprendre les fondamentaux":i===chapters.length-1?"Valider les acquis":"Maîtriser les techniques"}</td></tr>`;
  });
  return buildDocument({ org: o, formation: f, title: "Objectifs et méthodes pédagogiques par séquence", sections: [
    { heading: "Présentation", content: `<p>Ce document décrit les objectifs pédagogiques et méthodes d'animation pour <strong>${f.intitule||"Formation"}</strong>.</p>` },
    { heading: "Détail par séquence", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Séquence</th><th style="padding:8px;border:1px solid #ddd;">Contenu</th><th style="padding:8px;border:1px solid #ddd;">Méthode</th><th style="padding:8px;border:1px solid #ddd;">Objectif</th></tr></thead><tbody>${rows}</tbody></table>` },
    { heading: "Méthodes transversales", content: `<ul><li>Pédagogie active et participative</li><li>Alternance théorie / pratique</li><li>Supports numériques interactifs</li><li>Évaluations formatives continues</li><li>Accompagnement individualisé</li></ul>` },
  ]});
}

/* ═══ CODE 11 – Dossier stagiaire ═══ */
export function genDossierStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  if (!s) return "";
  return buildDocument({ org: o, formation: f, title: `Dossier stagiaire – ${s.prenom} ${s.nom}`, sections: [
    { heading: "Informations personnelles", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:35%;">Civilité</td><td style="padding:6px;border:1px solid #ddd;">${s.civilite||"—"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Nom</td><td style="padding:6px;border:1px solid #ddd;">${s.nom}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Prénom</td><td style="padding:6px;border:1px solid #ddd;">${s.prenom}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Date de naissance</td><td style="padding:6px;border:1px solid #ddd;">${s.dateNaissance?fmtDate(s.dateNaissance):"—"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Email</td><td style="padding:6px;border:1px solid #ddd;">${s.email||"—"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Téléphone</td><td style="padding:6px;border:1px solid #ddd;">${s.telephone||"—"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Entreprise</td><td style="padding:6px;border:1px solid #ddd;">${s.entreprise||"—"}</td></tr></table>` },
    { heading: "Formation suivie", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:35%;">Intitulé</td><td style="padding:6px;border:1px solid #ddd;">${f.intitule||"—"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Dates</td><td style="padding:6px;border:1px solid #ddd;">Du ${fmtDate(getStagiaireDateDebut(s,f))} au ${fmtDate(getStagiaireDateFin(s,f))}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Durée</td><td style="padding:6px;border:1px solid #ddd;">${getStagiaireDuree(s,f)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Modalités</td><td style="padding:6px;border:1px solid #ddd;">${f.modalites||"Présentiel"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">N° Action</td><td style="padding:6px;border:1px solid #ddd;">${(s as any).numeroAction||"—"}</td></tr></table>` },
    { heading: "Résultat du positionnement amont", content: `<p>Un test de positionnement a été réalisé en amont.</p><p><strong>Niveau initial :</strong> ${si%3===0?"Débutant":si%3===1?"Intermédiaire":"Faux-débutant"}</p><p><strong>Adaptations :</strong> ${si%2===0?"Renforcement des bases théoriques":"Approfondissement pratique"}</p>` },
    { heading: "Pièces jointes au dossier", content: `<ul><li>Copie de la pièce d'identité</li><li>Test de positionnement rempli</li><li>Contrat de formation signé</li><li>Convocation à la formation</li><li>Feuilles d'émargement</li><li>Évaluations (initiale, intermédiaire, finale)</li><li>Attestation de fin de formation</li></ul>` },
  ]});
}

/* ═══ CODE 12 – Descriptif des moyens matériels ═══ */
export function genDescriptifMoyensMateriels(o: OrganismeInfo, f: FormationInfo): string {
  const isFOAD = (f.modalites||"").toLowerCase().includes("distance");
  const isSocioEsth = isSocioEsthetique(f);
  const sections = [];

  if (isSocioEsth) {
    sections.push({ heading: "Locaux et équipements spécialisés", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Équipement</th><th style="padding:8px;border:1px solid #ddd;">Qté</th><th style="padding:8px;border:1px solid #ddd;">État</th></tr></thead><tbody>
<tr><td style="padding:6px;border:1px solid #ddd;">Tables de massage professionnelles</td><td style="padding:6px;border:1px solid #ddd;">4</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd;">Fauteuils de soins réglables</td><td style="padding:6px;border:1px solid #ddd;">4</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd;">Miroirs éclairés pour maquillage</td><td style="padding:6px;border:1px solid #ddd;">8</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd;">Kit de maquillage correcteur (pinceaux, prothèses, palettes)</td><td style="padding:6px;border:1px solid #ddd;">8</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd;">Produits dermo-cosmétiques hypoallergéniques</td><td style="padding:6px;border:1px solid #ddd;">Lot</td><td style="padding:6px;border:1px solid #ddd;">Conforme (DLUO vérifiée)</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd;">Huiles de massage neutres (amande douce, jojoba)</td><td style="padding:6px;border:1px solid #ddd;">Lot</td><td style="padding:6px;border:1px solid #ddd;">Conforme</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd;">Matériel d'hygiène (gants, désinfectants, consommables)</td><td style="padding:6px;border:1px solid #ddd;">Stock</td><td style="padding:6px;border:1px solid #ddd;">Conforme</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd;">Prothèses capillaires et mammaires (démonstration)</td><td style="padding:6px;border:1px solid #ddd;">2</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd;">Vidéoprojecteur / Écran interactif</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr>
</tbody></table>` });
    sections.push({ heading: "Supports pédagogiques spécialisés", content: `<ul><li>Protocoles professionnels de soins socio-esthétiques (fiches techniques)</li><li>Documents d'analyse des types de peaux fragilisées</li><li>Guides de maquillage correcteur en oncologie et gériatrie</li><li>Référentiel de compétences RS5992 complet</li><li>Supports vidéo : démonstrations de soins adaptés</li><li>Fiches de suivi socio-esthétique</li></ul>` });
  } else {
    sections.push({ heading: "Locaux et équipements", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Équipement</th><th style="padding:8px;border:1px solid #ddd;">Qté</th><th style="padding:8px;border:1px solid #ddd;">État</th></tr></thead><tbody><tr><td style="padding:6px;border:1px solid #ddd;">Salle de formation équipée</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">Vidéoprojecteur / Écran interactif</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">Ordinateurs portables</td><td style="padding:6px;border:1px solid #ddd;">15</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">Connexion internet haut débit</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">Imprimante multifonction</td><td style="padding:6px;border:1px solid #ddd;">1</td><td style="padding:6px;border:1px solid #ddd;">Fonctionnel</td></tr></tbody></table>` });
  }
  if (isFOAD) sections.push({ heading: "Outils numériques et plateforme LMS", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Outil</th><th style="padding:8px;border:1px solid #ddd;">Usage</th></tr></thead><tbody><tr><td style="padding:6px;border:1px solid #ddd;">Plateforme LMS</td><td style="padding:6px;border:1px solid #ddd;">Contenus et suivi progression</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">Visioconférence</td><td style="padding:6px;border:1px solid #ddd;">Classes virtuelles synchrones</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">Espace documentaire</td><td style="padding:6px;border:1px solid #ddd;">Partage de ressources</td></tr></tbody></table>` });
  sections.push({ heading: "Conformité et accessibilité", content: `<p>Les locaux sont conformes aux normes ERP et accessibles aux personnes à mobilité réduite.${isSocioEsth ? " Aménagements spécifiques pour l'accueil de modèles en situation de fragilité (fauteuil roulant, brancardage)." : ""}</p>` });
  return buildDocument({ org: o, formation: f, title: "Descriptif des moyens matériels et techniques", sections });
}

/* ═══ CODE 15/16 – Cahier de maintenance ═══ */
export function genCahierMaintenance(o: OrganismeInfo): string {
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, title: "Cahier de maintenance du matériel pédagogique", sections: [
    { heading: "Registre de maintenance", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Date</th><th style="padding:8px;border:1px solid #ddd;">Équipement</th><th style="padding:8px;border:1px solid #ddd;">Intervention</th><th style="padding:8px;border:1px solid #ddd;">Prestataire</th><th style="padding:8px;border:1px solid #ddd;">État</th></tr></thead><tbody><tr><td style="padding:6px;border:1px solid #ddd;">15/01/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Vidéoprojecteur</td><td style="padding:6px;border:1px solid #ddd;">Remplacement lampe</td><td style="padding:6px;border:1px solid #ddd;">SAV</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">02/03/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Ordinateurs (x15)</td><td style="padding:6px;border:1px solid #ddd;">MAJ OS + antivirus</td><td style="padding:6px;border:1px solid #ddd;">Interne</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">15/04/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Imprimante</td><td style="padding:6px;border:1px solid #ddd;">Révision + toner</td><td style="padding:6px;border:1px solid #ddd;">SAV</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">01/06/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Internet</td><td style="padding:6px;border:1px solid #ddd;">Upgrade fibre</td><td style="padding:6px;border:1px solid #ddd;">FAI</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr><tr><td style="padding:6px;border:1px solid #ddd;">15/09/${yr}</td><td style="padding:6px;border:1px solid #ddd;">Plateforme LMS</td><td style="padding:6px;border:1px solid #ddd;">MAJ version</td><td style="padding:6px;border:1px solid #ddd;">Éditeur</td><td style="padding:6px;border:1px solid #ddd;">OK</td></tr></tbody></table>` },
  ]});
}

/* ═══ CODE 20 – CV Formateur ═══ */
export function genCVFormateur(o: OrganismeInfo, f: FormationInfo): string {
  if (isSocioEsthetique(f)) {
    const socioFmt: FormateurInfo = {
      nom: "Fontaine", prenom: "Marie",
      specialite: "Socio-esthétique, Soins adaptés aux publics fragilisés, Maquillage correcteur en oncologie, Massage de bien-être en gériatrie",
      diplomes: "CAP Esthétique Cosmétique Parfumerie – Académie de Paris\nBTS Esthétique Cosmétique – Option Management\nDU Socio-esthétique – Hôpital Rothschild / Université Paris-Est Créteil\nCertification RS5992 – Réaliser des soins socio-esthétiques",
      experience: "18 ans d'expérience dans le secteur esthétique dont 10 ans en socio-esthétique\n• Socio-esthéticienne en oncologie – Centre Hospitalier de Villejuif (5 ans)\n• Intervenante bien-être en EHPAD – Groupe Korian (3 ans)\n• Formatrice en socio-esthétique – GENIUS FORM / FormaPro Excellence (depuis 2019)\n• Animation d'ateliers socio-esthétiques en structures d'insertion sociale\n• Intervenante auprès de femmes victimes de violences – Association SOS Femmes",
      email: "m.fontaine@formapro-excellence.fr"
    };
    return _buildCV(o, socioFmt, "Formatrice en socio-esthétique");
  }
  return _buildCV(o, SAMPLE_FORMATEURS[0], "Formateur");
}

/* ═══ CODE 22 – Fichier formateurs statut ═══ */
export function genFichierFormateursStatut(o: OrganismeInfo, f: FormationInfo): string {
  let rows = "";
  SAMPLE_FORMATEURS.forEach((fmt, i) => {
    rows += `<tr><td style="padding:6px;border:1px solid #ddd;">${fmt.prenom} ${fmt.nom}</td><td style="padding:6px;border:1px solid #ddd;">${fmt.specialite}</td><td style="padding:6px;border:1px solid #ddd;">${i===0?"CDI":i===1?"CDD":"Sous-traitant"}</td><td style="padding:6px;border:1px solid #ddd;">${i>=2?"Micro-entreprise":"—"}</td><td style="padding:6px;border:1px solid #ddd;">${o.nda||"NDA-XXXX"}</td><td style="padding:6px;border:1px solid #ddd;">${i>=2?"Non":"—"}</td></tr>`;
  });
  return buildDocument({ org: o, formation: f, title: "Fichier des formateurs / intervenants", subtitle: `Action contrôlée : ${f.intitule||"Formation"}`, sections: [
    { heading: "Liste des intervenants", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Nom</th><th style="padding:8px;border:1px solid #ddd;">Spécialité</th><th style="padding:8px;border:1px solid #ddd;">Statut</th><th style="padding:8px;border:1px solid #ddd;">Juridique</th><th style="padding:8px;border:1px solid #ddd;">NDA</th><th style="padding:8px;border:1px solid #ddd;">Qualiopi</th></tr></thead><tbody>${rows}</tbody></table>` },
  ]});
}

/* ═══ CODE 33 – Bilan intermédiaire ═══ */
export function genBilanIntermediaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  if (!s) return "";
  const progress = 40 + (si % 4) * 10;
  return buildDocument({ org: o, formation: f, title: `Bilan intermédiaire – ${s.prenom} ${s.nom}`, sections: [
    { heading: "Progression à mi-parcours", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:40%;">Taux de progression</td><td style="padding:6px;border:1px solid #ddd;">${progress}%</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Assiduité</td><td style="padding:6px;border:1px solid #ddd;">${90+(si%10)}%</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Participation</td><td style="padding:6px;border:1px solid #ddd;">${si%3===0?"Très active":si%3===1?"Active":"Satisfaisante"}</td></tr></table>` },
    { heading: "Points forts", content: `<ul><li>${si%2===0?"Bonne compréhension des concepts":"Excellente capacité pratique"}</li><li>Motivation et implication constantes</li></ul>` },
    { heading: "Axes d'amélioration", content: `<ul><li>${si%2===0?"Approfondir la pratique":"Renforcer les acquis théoriques"}</li></ul>` },
  ], signatures: { type: "2", labels: ["Le formateur", "Le/La stagiaire"], names: [o.responsablePedagogique||SAMPLE_FORMATEURS[0].nom, `${s.prenom} ${s.nom}`] }});
}

/* ═══ CODE 36 – Taux de réussite ═══ */
export function genTauxReussiteEY(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const n = Math.max(stagiaires.length, 1);
  const r = Math.round(n * 0.89);
  return buildDocument({ org: o, formation: f, title: "Taux de réussite aux certifications", sections: [
    { heading: "Résultats", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Formation</td><td style="padding:8px;border:1px solid #ddd;">${f.intitule||"Formation"}</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Candidats présentés</td><td style="padding:8px;border:1px solid #ddd;">${n}</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Certifiés</td><td style="padding:8px;border:1px solid #ddd;">${r}</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Taux de réussite</td><td style="padding:8px;border:1px solid #ddd;font-weight:700;color:${pc()};">${Math.round((r/n)*100)}%</td></tr></table>` },
  ]});
}

/* ═══ CODE 39 – Grille tarifaire ═══ */
export function genGrilleTarifaire(o: OrganismeInfo, f: FormationInfo): string {
  const socio = isSocioEsthetique(f);
  const c = pc();
  const th = `style="padding:8px;border:1px solid #ddd;"`;
  const td = `style="padding:6px;border:1px solid #ddd;"`;

  let rows = "";
  if (socio) {
    rows = `
      <tr><td ${td}><strong>Module 1 – Initiation</strong><br><em>Analyse de la situation, diagnostic socio-esthétique, élaboration de protocoles adaptés (C1-C2)</em></td><td ${td}>20 heures (3 jours)</td><td ${td}>2 100,00 € TTC</td><td ${td}>2 310,00 € TTC</td></tr>
      <tr><td ${td}><strong>Module 2 – Approfondissement</strong><br><em>Accueil bienveillant, soins corporels, massages adaptés, conseil en image, ateliers collectifs (C3-C11)</em></td><td ${td}>32 heures (5 jours)</td><td ${td}>3 100,00 € TTC</td><td ${td}>3 410,00 € TTC</td></tr>
      <tr style="background:#f0f7ff;"><td ${td}><strong>Module 3 – Parcours complet</strong><br><em>Intégralité du référentiel RS5992 – Modules 1 + 2</em></td><td ${td}>52 heures (8 jours)</td><td ${td}>4 100,00 € TTC</td><td ${td}>4 510,00 € TTC</td></tr>`;
  } else {
    const tarif = parseFloat(f.tarif||"2500")||2500;
    rows = `
      <tr><td ${td}>${f.intitule||"Formation certifiante"}</td><td ${td}>${f.duree||"35h"}</td><td ${td}>${tarif.toFixed(2)} €</td><td ${td}>${(tarif*1.1).toFixed(2)} €</td></tr>
      <tr><td ${td}>Bilan de compétences</td><td ${td}>24h</td><td ${td}>1 800,00 €</td><td ${td}>2 200,00 €</td></tr>`;
  }

  return buildDocument({ org: o, formation: f, title: "Grille tarifaire des prestations", sections: [
    { heading: "Tarifs en vigueur", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${c};color:#fff;"><th ${th}>Prestation</th><th ${th}>Durée</th><th ${th}>Tarif MCF (CPF)</th><th ${th}>Tarif public</th></tr></thead><tbody>${rows}</tbody></table><p style="font-size:0.85em;margin-top:12px;">Exonération de TVA – Art. 261-4-4°a du CGI<br>Tarifs valables pour l'année ${new Date().getFullYear()}. Organisme certifié Qualiopi.</p>` },
    ...(socio ? [{ heading: "Conditions particulières", content: `<ul><li>Le Module 3 (parcours complet) correspond à l'inscription au parcours intégral menant à la certification RS5992.</li><li>Les modules 1 et 2 peuvent être suivis séparément mais seul le parcours complet (52h) permet le passage de la certification.</li><li>Possibilité de prise en charge CPF (Mon Compte Formation).</li><li>Acompte de 30 % à l'inscription, solde au démarrage de la formation.</li></ul>` }] : []),
  ]});
}

/* ═══ CODE 40 – Facture hors MCF ═══ */
export function genFactureHorsMCF(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, title: "Exemple de facture hors dispositif MCF", subtitle: `N° FAC-HP-${yr}-001`, sections: [
    { heading: "Client", content: `<p>Entreprise XYZ<br>123 rue du Commerce, 75001 Paris</p>` },
    { heading: "Prestation", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Désignation</th><th style="padding:8px;border:1px solid #ddd;">Durée</th><th style="padding:8px;border:1px solid #ddd;">Montant</th></tr></thead><tbody><tr><td style="padding:6px;border:1px solid #ddd;">${f.intitule||"Formation intra"}</td><td style="padding:6px;border:1px solid #ddd;">${f.duree||"14h"}</td><td style="padding:6px;border:1px solid #ddd;">2 800,00 €</td></tr></tbody></table><p style="font-size:0.85em;">Exonération de TVA – Art. 261-4-4°a du CGI</p>` },
  ]});
}

/* ═══ CODE 41 – Devis ═══ */
export function genDevisEY(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  if (!s) return "";
  return buildDocument({ org: o, formation: f, title: "Devis de formation", subtitle: `N° DEVIS-${new Date().getFullYear()}-${String(si+1).padStart(3,"0")}`, sections: [
    { heading: "Bénéficiaire", content: `<p>${s.civilite} ${s.prenom} ${s.nom}<br>${s.email||""}<br>${s.telephone||""}</p>` },
    { heading: "Prestation", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Intitulé</td><td style="padding:6px;border:1px solid #ddd;">${f.intitule||"Formation"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Durée</td><td style="padding:6px;border:1px solid #ddd;">${getStagiaireDuree(s,f)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Dates</td><td style="padding:6px;border:1px solid #ddd;">Du ${fmtDate(getStagiaireDateDebut(s,f))} au ${fmtDate(getStagiaireDateFin(s,f))}</td></tr><tr style="background:#f0f9ff;"><td style="padding:8px;border:1px solid #ddd;font-weight:700;">Montant total TTC</td><td style="padding:8px;border:1px solid #ddd;font-weight:700;">${getStagiaireTarif(s,f)}</td></tr></table>` },
  ], signatures: { type: "2", labels: ["Le prestataire", "Le client"], names: [o.dirigeant||o.nom, `${s.prenom} ${s.nom}`] }});
}

/* ═══ CODE 48/49 – Communication report ═══ */
export function genCommunicationReport(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Communication de report / reprogrammation de session", sections: [
    { heading: "Objet", content: `<p>La session de formation a été reprogrammée selon les modalités suivantes :</p>` },
    { heading: "Détails", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:35%;">Formation</td><td style="padding:6px;border:1px solid #ddd;">${f.intitule||"Formation"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Nouvelles dates</td><td style="padding:6px;border:1px solid #ddd;">Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Motif</td><td style="padding:6px;border:1px solid #ddd;">Ajustement organisationnel</td></tr></table>` },
    { heading: "Information aux stagiaires", content: `<p>Tous les stagiaires inscrits ont été informés par email et/ou téléphone.</p>` },
  ]});
}

/* ═══ CODE 50 – Preuve création session ═══ */
export function genPreuveCreationSession(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Preuve de création de session de formation", sections: [
    { heading: "Informations session", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:35%;">Formation</td><td style="padding:6px;border:1px solid #ddd;">${f.intitule||"Formation"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Dates</td><td style="padding:6px;border:1px solid #ddd;">Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Durée</td><td style="padding:6px;border:1px solid #ddd;">${f.duree||"35h"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Lieu</td><td style="padding:6px;border:1px solid #ddd;">${f.lieu||o.ville||"À distance"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Formateur</td><td style="padding:6px;border:1px solid #ddd;">${f.formateur||SAMPLE_FORMATEURS[0].prenom+" "+SAMPLE_FORMATEURS[0].nom}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Date de création</td><td style="padding:6px;border:1px solid #ddd;">${fmtDate(today())}</td></tr></table>` },
  ], signatures: { type: "2", labels: ["Le responsable pédagogique",""], names: [o.responsablePedagogique||o.dirigeant||"",""] }});
}

/* ═══ CODE 55 – Plaquette ═══ */
export function genPlaquettePresentation(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Plaquette de présentation", sections: [
    { heading: "Qui sommes-nous ?", content: `<p><strong>${o.nom||"Notre organisme"}</strong> est un organisme certifié Qualiopi, spécialisé dans ${o.domainesFormation||"la formation professionnelle"}.</p>` },
    { heading: "Nos formations", content: `<p><strong>${f.intitule||"Formation"}</strong></p><ul><li><strong>Durée :</strong> ${f.duree||"35h"}</li><li><strong>Modalités :</strong> ${f.modalites||"Présentiel"}</li><li><strong>Public :</strong> ${f.publicVise||"Tout public"}</li><li><strong>Objectifs :</strong> ${f.objectifs||"Acquérir les compétences clés"}</li></ul>` },
    { heading: "Nos engagements", content: `<ul><li>Certification Qualiopi</li><li>Formateurs experts</li><li>Accompagnement individualisé</li><li>Accessibilité PSH</li></ul>` },
    { heading: "Contact", content: `<p>${o.nom}<br>${o.adresse?`${o.adresse}, ${o.codePostal} ${o.ville}`:""}<br>${o.telephone?`Tél : ${o.telephone}`:""}<br>${o.email?`Email : ${o.email}`:""}${o.siteWeb?`<br>Web : ${linkUrl(o.siteWeb)}`:""}</p>` },
  ]});
}

/* ═══ CODE 60 – Planning intervenants ═══ */
export function genPlanningIntervenants(o: OrganismeInfo, f: FormationInfo): string {
  const days = getFormationDays(f);
  const fmt = SAMPLE_FORMATEURS[0];
  let rows = "";
  days.forEach((d, i) => { rows += `<tr><td style="padding:6px;border:1px solid #ddd;">${fmtDate(d)}</td><td style="padding:6px;border:1px solid #ddd;">${fmt.prenom} ${fmt.nom}</td><td style="padding:6px;border:1px solid #ddd;">09h00 – 17h00</td><td style="padding:6px;border:1px solid #ddd;">${i<days.length/2?"Module théorique":"Module pratique"}</td></tr>`; });
  return buildDocument({ org: o, formation: f, title: "Planning des intervenants", sections: [
    { heading: "Calendrier", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Date</th><th style="padding:8px;border:1px solid #ddd;">Intervenant</th><th style="padding:8px;border:1px solid #ddd;">Horaires</th><th style="padding:8px;border:1px solid #ddd;">Module</th></tr></thead><tbody>${rows}</tbody></table>` },
  ]});
}

/* ═══ CODE 61 – Planning sessions ═══ */
export function genPlanningSessionsEY(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Planning des sessions de formation", sections: [
    { heading: "Sessions programmées", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Session</th><th style="padding:8px;border:1px solid #ddd;">Dates</th><th style="padding:8px;border:1px solid #ddd;">Lieu</th><th style="padding:8px;border:1px solid #ddd;">Places</th><th style="padding:8px;border:1px solid #ddd;">Statut</th></tr></thead><tbody><tr><td style="padding:6px;border:1px solid #ddd;">Session 1</td><td style="padding:6px;border:1px solid #ddd;">Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</td><td style="padding:6px;border:1px solid #ddd;">${f.lieu||o.ville||"À distance"}</td><td style="padding:6px;border:1px solid #ddd;">${f.nombreParticipants||"15"}</td><td style="padding:6px;border:1px solid #ddd;">En cours</td></tr></tbody></table>` },
  ]});
}

/* ═══ CODE 64 – CV Responsable pédagogique ═══ */
export function genCVResponsablePedagogique(o: OrganismeInfo): string {
  const rpName = o.responsablePedagogique || "Jean-Pierre Martin";
  const [prenom, ...nomParts] = rpName.split(" ");
  const fakeFmt: FormateurInfo = { nom: nomParts.join(" ")||"Martin", prenom: prenom||"Jean-Pierre", specialite: o.domainesFormation||"Ingénierie de formation", diplomes: "Master 2 Sciences de l'Éducation", experience: "12 ans en ingénierie pédagogique", email: o.email||"" };
  return _buildCV(o, fakeFmt, "Responsable pédagogique");
}

/* ═══ CODE 65 – Actions engagement ═══ */
export function genActionsEngagement(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Actions de prévention des ruptures de parcours", sections: [
    { heading: "Dispositif de suivi", content: `<ul><li>Entretien individuel de positionnement en amont</li><li>Points d'étape réguliers avec le formateur</li><li>Bilan intermédiaire à mi-parcours</li><li>Accompagnement renforcé en cas de difficulté</li><li>Contact téléphonique en cas d'absence non justifiée</li></ul>` },
    { heading: "Indicateurs", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Taux d'assiduité moyen</td><td style="padding:6px;border:1px solid #ddd;">95%</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Taux d'abandon</td><td style="padding:6px;border:1px solid #ddd;">0%</td></tr></table>` },
  ]});
}

/* ═══ CODE 66 – Actions passage examens ═══ */
export function genActionsPassageExamen(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Actions pour faciliter le passage des examens", sections: [
    { heading: "Préparation aux examens", content: `<ul><li>Examens blancs en conditions réelles</li><li>Révisions ciblées sur les compétences clés</li><li>Conseils méthodologiques écrits et oraux</li><li>Accompagnement individualisé</li></ul>` },
    { heading: "Organisation", content: `<ul><li>Convocation individuelle</li><li>Vérification des prérequis d'inscription</li><li>Mise à disposition des ressources</li><li>Accompagnement logistique le jour J</li></ul>` },
  ]});
}

/* ═══ CODE 67 – Accompagnement FOAD ═══ */
export function genAccompagnementFOAD(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Accompagnement technique et pédagogique en FOAD", sections: [
    { heading: "Accompagnement technique", content: `<ul><li>Guide de connexion transmis avant démarrage</li><li>Test de connexion préalable</li><li>Assistance par email et téléphone (réponse sous 4h)</li><li>FAQ en ligne 24h/24</li></ul>` },
    { heading: "Accompagnement pédagogique", content: `<ul><li>Classes virtuelles synchrones régulières</li><li>Forum de discussion</li><li>Permanences pédagogiques hebdomadaires</li><li>Suivi progression via LMS</li><li>Entretiens individuels sur demande</li></ul>` },
    { heading: "Outils", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Plateforme LMS</td><td style="padding:6px;border:1px solid #ddd;">Contenus et suivi</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Visioconférence</td><td style="padding:6px;border:1px solid #ddd;">Classes virtuelles</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Email / Téléphone</td><td style="padding:6px;border:1px solid #ddd;">Support technique</td></tr></table>` },
  ]});
}

/* ═══ Shared CV builder ═══ */
function _buildCV(o: OrganismeInfo, fmt: FormateurInfo, role: string): string {
  return buildDocument({ org: o, title: `Curriculum Vitae – ${fmt.prenom} ${fmt.nom}`, subtitle: role, sections: [
    { heading: "Informations personnelles", content: `<table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;width:30%;">Nom</td><td style="padding:6px;border:1px solid #ddd;">${fmt.nom}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Prénom</td><td style="padding:6px;border:1px solid #ddd;">${fmt.prenom}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Fonction</td><td style="padding:6px;border:1px solid #ddd;">${role}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Email</td><td style="padding:6px;border:1px solid #ddd;">${fmt.email||o.email||"—"}</td></tr><tr><td style="padding:6px;border:1px solid #ddd;font-weight:600;">Organisme</td><td style="padding:6px;border:1px solid #ddd;">${o.nom||"—"}</td></tr></table>` },
    { heading: "Domaines d'expertise", content: `<p>${fmt.specialite}</p>` },
    { heading: "Formation et diplômes", content: `<p>${fmt.diplomes}</p>` },
    { heading: "Expérience professionnelle", content: `<p>${fmt.experience}</p><ul><li><strong>${role}</strong> – ${o.nom||"Organisme de formation"} (en poste)</li><li>Conception et animation de formations professionnelles</li><li>Ingénierie pédagogique et suivi qualité</li><li>Accompagnement individualisé des apprenants</li></ul>` },
    { heading: "Compétences clés", content: `<ul><li>Ingénierie de formation et pédagogie pour adultes</li><li>Animation présentiel et distanciel</li><li>Évaluation des compétences et certification</li><li>Outils numériques et plateformes LMS</li><li>Accompagnement PSH</li></ul>` },
  ]});
}
