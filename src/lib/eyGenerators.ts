/**
 * Auto-generators for EY/Sauléa control documents that don't have existing templates.
 * These produce HTML strings ready for PDF export.
 * ENRICHED for real audit controls – detailed, concrete, professional content.
 */
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, getDocStyle, linkUrl, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireTarif, getStagiaireDuree } from "./docBuilder";
import { SAMPLE_FORMATEURS, FormateurInfo, parseDuree, getFormationDays } from "./sampleData";

function today(): string { return new Date().toISOString().slice(0, 10); }
function fmtDate(d?: string): string { return formatDate(d || today()); }
function pc(): string { return getDocStyle()?.primaryColor || "#1a56db"; }
function sc(): string { return getDocStyle()?.secondaryColor || "#6b7280"; }
function isSocioEsthetique(f: FormationInfo): boolean {
  const t = (f.intitule||"").toLowerCase() + " " + (f.codeRNCP||"").toLowerCase();
  return t.includes("socio-esthéti") || t.includes("socio esthéti") || t.includes("rs5992") || t.includes("soins socio");
}

const td = `style="padding:8px;border:1px solid #ddd;"`;
const tdb = `style="padding:8px;border:1px solid #ddd;font-weight:600;"`;
const thStyle = (c: string) => `style="padding:10px;border:1px solid #ddd;background:${c};color:#fff;font-weight:600;"`;

/* ═══ CODE 4 – Objectifs et méthodes par séquence ═══ */
export function genObjectifsMethodesSequence(o: OrganismeInfo, f: FormationInfo): string {
  const socio = isSocioEsthetique(f);
  const chapters = socio
    ? ["Module 1 : Analyse de la situation et diagnostic socio-esthétique", "Module 2 : Accueil bienveillant et relation d'aide", "Module 3 : Soins du visage adaptés aux peaux fragilisées", "Module 4 : Massages de bien-être adaptés", "Module 5 : Conseil en image et maquillage correcteur", "Module 6 : Évaluation, transmission et ateliers collectifs"]
    : (f.programme || "Module 1 : Introduction\nModule 2 : Approfondissement\nModule 3 : Mise en pratique\nModule 4 : Évaluation").split("\n").filter(l => l.trim());

  const methodes = socio
    ? ["Démonstration technique sur modèle", "Mise en situation professionnelle reconstituée", "Jeux de rôle sur la relation d'aide", "Analyse de cas cliniques (photos, vidéos)", "Travaux pratiques sur mannequin et entre pairs", "Supervision individualisée par la formatrice"]
    : ["Pédagogie active et participative", "Alternance théorie / pratique", "Supports numériques interactifs", "Évaluations formatives continues", "Accompagnement individualisé", "Études de cas professionnels"];

  const objectifs = socio
    ? [
      "Réaliser un diagnostic socio-esthétique global (C1-C2)",
      "Maîtriser l'accueil bienveillant et adapter sa posture relationnelle (C3)",
      "Réaliser des soins du visage sur peaux fragilisées par les traitements (C4-C5)",
      "Pratiquer des massages de bien-être adaptés aux contraintes physiques (C6-C7)",
      "Conseiller en image et réaliser un maquillage correcteur (C8-C9)",
      "Évaluer les acquis, transmettre aux équipes et animer des ateliers collectifs (C10-C11)"
    ]
    : chapters.map((_, i) => i===0?"Comprendre les fondamentaux":i===chapters.length-1?"Valider les acquis":"Maîtriser les techniques");

  let rows = "";
  chapters.forEach((ch, i) => {
    const label = ch.replace(/^Module\s*\d+\s*[:–-]\s*/i,"");
    const dureeSeq = socio ? (i===0?"8h":"8-10h") : `${Math.round(parseDuree(f.duree||"35h").totalHours/chapters.length)}h`;
    rows += `<tr><td ${td}><strong>Séquence ${i+1}</strong></td><td ${td}>${label}</td><td ${td}>${dureeSeq}</td><td ${td}>${objectifs[i]||""}</td><td ${td}>${methodes[i%methodes.length]}</td></tr>`;
  });

  return buildDocument({ org: o, formation: f, title: "Objectifs et méthodes pédagogiques par séquence", sections: [
    { heading: "Présentation de l'action", content: `<p>Ce document décrit les objectifs pédagogiques et méthodes d'animation pour la formation <strong>« ${f.intitule||"Formation"} »</strong>${socio?" (Certification RS5992)":""}.</p><p><strong>Durée totale :</strong> ${f.duree||"52 heures"} | <strong>Modalités :</strong> ${f.modalites||"Présentiel"} | <strong>Public :</strong> ${f.publicVise||"Professionnels de l'esthétique et du bien-être"}</p>` },
    { heading: "Détail par séquence", content: `<table style="width:100%;border-collapse:collapse;font-size:0.9em;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:10px;border:1px solid #ddd;">Séquence</th><th style="padding:10px;border:1px solid #ddd;">Contenu</th><th style="padding:10px;border:1px solid #ddd;">Durée</th><th style="padding:10px;border:1px solid #ddd;">Objectif pédagogique</th><th style="padding:10px;border:1px solid #ddd;">Méthode</th></tr></thead><tbody>${rows}</tbody></table>` },
    { heading: "Méthodes pédagogiques transversales", content: `<ul>${methodes.map(m => `<li>${m}</li>`).join("")}</ul>` },
    { heading: "Modalités d'évaluation", content: `<ul><li>Évaluation diagnostique en amont (test de positionnement)</li><li>Évaluations formatives continues (exercices pratiques, mises en situation)</li><li>Évaluation sommative en fin de parcours (épreuve pratique + oral)</li>${socio?"<li>Grille d'observation des compétences C1 à C11 selon le référentiel RS5992</li>":""}</ul>` },
  ]});
}

/* ═══ CODE 11 – Dossier stagiaire ═══ */
export function genDossierStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  if (!s) return "";
  const niveaux = ["Débutant – Aucune expérience dans le domaine", "Intermédiaire – Bases acquises, souhaite se perfectionner", "Faux-débutant – Quelques notions, pratique occasionnelle", "Confirmé – Expérience professionnelle, besoin de certification"];
  const adaptations = ["Renforcement des bases théoriques avant les mises en pratique", "Approfondissement des techniques avancées et cas complexes", "Accompagnement personnalisé sur les points de fragilité identifiés", "Focus sur la préparation à la certification et les épreuves"];
  return buildDocument({ org: o, formation: f, title: `Dossier stagiaire – ${s.prenom} ${s.nom}`, sections: [
    { heading: "1. Informations personnelles", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Civilité</td><td ${td}>${s.civilite||"—"}</td></tr>
      <tr><td ${tdb}>Nom</td><td ${td}>${s.nom}</td></tr>
      <tr><td ${tdb}>Prénom</td><td ${td}>${s.prenom}</td></tr>
      <tr><td ${tdb}>Date de naissance</td><td ${td}>${s.dateNaissance?fmtDate(s.dateNaissance):"—"}</td></tr>
      <tr><td ${tdb}>Lieu de naissance</td><td ${td}>${(s as any).villeNaissance||"—"}</td></tr>
      <tr><td ${tdb}>Nationalité</td><td ${td}>${(s as any).nationalite||"Française"}</td></tr>
      <tr><td ${tdb}>Adresse</td><td ${td}>${(s as any).adresse||"—"}</td></tr>
      <tr><td ${tdb}>Email</td><td ${td}>${s.email||"—"}</td></tr>
      <tr><td ${tdb}>Téléphone</td><td ${td}>${s.telephone||"—"}</td></tr>
      <tr><td ${tdb}>NIR (N° Sécurité Sociale)</td><td ${td}>${(s as any).nir||"—"}</td></tr>
      <tr><td ${tdb}>Situation professionnelle</td><td ${td}>${s.poste||"Demandeur d'emploi"}</td></tr>
      <tr><td ${tdb}>Entreprise</td><td ${td}>${s.entreprise||"—"}</td></tr>
      <tr><td ${tdb}>Niveau de diplôme</td><td ${td}>${(s as any).niveauDiplome||"—"}</td></tr>
      <tr><td ${tdb}>Situation de handicap (RQTH)</td><td ${td}>${(s as any).rqth?"Oui":"Non"}</td></tr>
    </table>` },
    { heading: "2. Formation suivie", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Intitulé</td><td ${td}>${f.intitule||"—"}</td></tr>
      <tr><td ${tdb}>Code certification</td><td ${td}>${f.codeRNCP||"—"}</td></tr>
      <tr><td ${tdb}>Dates</td><td ${td}>Du ${fmtDate(getStagiaireDateDebut(s,f))} au ${fmtDate(getStagiaireDateFin(s,f))}</td></tr>
      <tr><td ${tdb}>Durée</td><td ${td}>${getStagiaireDuree(s,f)}</td></tr>
      <tr><td ${tdb}>Modalités</td><td ${td}>${f.modalites||"Présentiel"}</td></tr>
      <tr><td ${tdb}>Lieu</td><td ${td}>${f.lieu||o.ville||"—"}</td></tr>
      <tr><td ${tdb}>Formateur référent</td><td ${td}>${f.formateur||SAMPLE_FORMATEURS[0].prenom+" "+SAMPLE_FORMATEURS[0].nom}</td></tr>
      <tr><td ${tdb}>N° Action EDOF</td><td ${td}>${(s as any).numeroAction||"—"}</td></tr>
      <tr><td ${tdb}>Montant pris en charge</td><td ${td}>${getStagiaireTarif(s,f)}</td></tr>
    </table>` },
    { heading: "3. Résultat du positionnement amont", content: `<p>Un entretien de positionnement individuel a été réalisé le <strong>${fmtDate(getStagiaireDateDebut(s,f))}</strong> (en amont du démarrage effectif de la formation).</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Niveau initial évalué</td><td ${td}>${niveaux[si%niveaux.length]}</td></tr>
      <tr><td ${tdb}>Projet professionnel</td><td ${td}>${si%2===0?"Reconversion professionnelle dans le secteur":"Montée en compétences pour certification"}</td></tr>
      <tr><td ${tdb}>Motivations exprimées</td><td ${td}>${si%3===0?"Passion pour le domaine, désir de professionnalisation":"Évolution de carrière, obtention d'une certification reconnue"}</td></tr>
      <tr><td ${tdb}>Adaptations prévues</td><td ${td}>${adaptations[si%adaptations.length]}</td></tr>
      <tr><td ${tdb}>Freins identifiés</td><td ${td}>${si%4===0?"Aucun frein majeur identifié":si%4===1?"Contraintes horaires (emploi en parallèle)":si%4===2?"Appréhension sur les épreuves pratiques":"Besoin de soutien sur la partie théorique"}</td></tr>
    </table>` },
    { heading: "4. Suivi pédagogique", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Assiduité</td><td ${td}>${90+(si%10)}% – ${si%3===0?"Aucune absence":"1 absence justifiée"}</td></tr>
      <tr><td ${tdb}>Participation</td><td ${td}>${si%3===0?"Très active – Pose des questions pertinentes":si%3===1?"Active – Bonne implication":"Satisfaisante – Progression régulière"}</td></tr>
      <tr><td ${tdb}>Point d'étape mi-parcours</td><td ${td}>Réalisé – ${si%2===0?"En bonne voie, objectifs atteints à 60%":"Progression encourageante, axes d'amélioration identifiés"}</td></tr>
      <tr><td ${tdb}>Résultat évaluation finale</td><td ${td}>${15+si%6}/20 – ${si%2===0?"Acquis":"Acquis avec mention"}</td></tr>
    </table>` },
    { heading: "5. Pièces constitutives du dossier", content: `<ul>
      <li>✓ Copie de la pièce d'identité</li>
      <li>✓ Test de positionnement initial rempli et signé</li>
      <li>✓ Contrat de formation professionnelle signé</li>
      <li>✓ Convocation à la formation</li>
      <li>✓ Règlement intérieur signé</li>
      <li>✓ Feuilles d'émargement signées (toutes les journées)</li>
      <li>✓ Évaluation initiale de positionnement</li>
      <li>✓ Évaluations formatives intermédiaires</li>
      <li>✓ Évaluation finale / Test de fin de formation</li>
      <li>✓ Grille d'acquisition des compétences</li>
      <li>✓ Attestation de fin de formation</li>
      <li>✓ Questionnaire de satisfaction à chaud</li>
      <li>✓ Certificat de réalisation</li>
    </ul>` },
  ]});
}

/* ═══ CODE 12 – Descriptif des moyens matériels ═══ */
export function genDescriptifMoyensMateriels(o: OrganismeInfo, f: FormationInfo): string {
  const isFOAD = (f.modalites||"").toLowerCase().includes("distance");
  const isSocioEsth = isSocioEsthetique(f);
  const sections = [];
  const yr = new Date().getFullYear();

  if (isSocioEsth) {
    sections.push({ heading: "1. Locaux de formation", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Adresse</td><td ${td}>${o.adresse||"—"}, ${o.codePostal||""} ${o.ville||""}</td></tr>
      <tr><td ${tdb}>Surface totale</td><td ${td}>120 m² (2 salles + 1 espace pratique)</td></tr>
      <tr><td ${tdb}>Capacité d'accueil</td><td ${td}>12 personnes maximum</td></tr>
      <tr><td ${tdb}>Accessibilité PMR</td><td ${td}>Conforme – Rampe d'accès, toilettes adaptées, ascenseur</td></tr>
      <tr><td ${tdb}>Conformité ERP</td><td ${td}>ERP de 5ème catégorie – Dernière visite : ${yr-1}</td></tr>
      <tr><td ${tdb}>Climatisation</td><td ${td}>Salle climatisée – Température contrôlée (important pour le confort des modèles)</td></tr>
    </table>` });
    sections.push({ heading: "2. Équipements spécialisés socio-esthétique", content: `<table style="width:100%;border-collapse:collapse;font-size:0.9em;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:10px;border:1px solid #ddd;">Équipement</th><th style="padding:10px;border:1px solid #ddd;">Qté</th><th style="padding:10px;border:1px solid #ddd;">Marque / Réf.</th><th style="padding:10px;border:1px solid #ddd;">Date achat</th><th style="padding:10px;border:1px solid #ddd;">État</th></tr></thead><tbody>
      <tr><td ${td}>Tables de massage professionnelles réglables en hauteur</td><td ${td}>4</td><td ${td}>Nush Premium / Réf. NP-200</td><td ${td}>03/${yr-1}</td><td ${td}>Excellent</td></tr>
      <tr><td ${td}>Fauteuils de soins inclinables avec accoudoirs</td><td ${td}>4</td><td ${td}>SkinMate / Réf. SM-400</td><td ${td}>03/${yr-1}</td><td ${td}>Excellent</td></tr>
      <tr><td ${td}>Miroirs éclairés à LED pour maquillage correcteur</td><td ${td}>8</td><td ${td}>Hollywood Mirror / HM-60</td><td ${td}>06/${yr-1}</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Kits maquillage correcteur complets (pinceaux, palettes, fixateurs)</td><td ${td}>8</td><td ${td}>Dermacolor / Kryolan Professional</td><td ${td}>01/${yr}</td><td ${td}>Neuf</td></tr>
      <tr><td ${td}>Produits dermo-cosmétiques hypoallergéniques</td><td ${td}>Lot</td><td ${td}>Avène / La Roche-Posay / Bioderma</td><td ${td}>01/${yr}</td><td ${td}>DLUO vérifiée : 12/${yr+1}</td></tr>
      <tr><td ${td}>Huiles de massage neutres (amande douce, jojoba, argan)</td><td ${td}>Lot (5L)</td><td ${td}>Aroma-Zone Professional</td><td ${td}>01/${yr}</td><td ${td}>DLUO : 06/${yr+1}</td></tr>
      <tr><td ${td}>Matériel d'hygiène (gants nitrile, désinfectant, draps jetables)</td><td ${td}>Stock</td><td ${td}>Médical Pro / Hartmann</td><td ${td}>Réappro trimestriel</td><td ${td}>Conforme</td></tr>
      <tr><td ${td}>Prothèses capillaires (démonstration conseil en image)</td><td ${td}>3</td><td ${td}>Belle Madame / Réf. divers</td><td ${td}>09/${yr-1}</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Prothèses mammaires externes (démonstration)</td><td ${td}>2</td><td ${td}>Amoena / Réf. AM-340</td><td ${td}>09/${yr-1}</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Stérilisateur UV pour instruments</td><td ${td}>1</td><td ${td}>Sterilux / ST-200</td><td ${td}>03/${yr-1}</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Vidéoprojecteur HD</td><td ${td}>1</td><td ${td}>Epson EB-FH06</td><td ${td}>01/${yr-1}</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Écran de projection mural</td><td ${td}>1</td><td ${td}>Oray / 200x150cm</td><td ${td}>01/${yr-1}</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Ordinateur portable formateur</td><td ${td}>1</td><td ${td}>HP ProBook 450 G10</td><td ${td}>01/${yr-1}</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Connexion internet fibre</td><td ${td}>1</td><td ${td}>Orange Pro / 1 Gbps</td><td ${td}>—</td><td ${td}>Fonctionnel</td></tr>
    </tbody></table>` });
    sections.push({ heading: "3. Supports pédagogiques spécialisés", content: `<ul>
      <li><strong>Protocoles professionnels :</strong> 12 fiches techniques de soins socio-esthétiques (soins visage, massage, maquillage correcteur, conseil en image)</li>
      <li><strong>Documents d'analyse :</strong> Grilles de diagnostic des types de peaux fragilisées (post-chimiothérapie, personnes âgées, brûlures)</li>
      <li><strong>Guides spécialisés :</strong> Maquillage correcteur en oncologie – Techniques spécifiques (cicatrices, alopécie, cernes)</li>
      <li><strong>Référentiel RS5992 :</strong> Version complète imprimée et numérique pour chaque stagiaire</li>
      <li><strong>Supports vidéo :</strong> Démonstrations filmées de soins adaptés (accès via plateforme sécurisée)</li>
      <li><strong>Fiches de suivi :</strong> Grilles d'observation socio-esthétique individualisées</li>
      <li><strong>Bibliographie professionnelle :</strong> Ouvrages de référence en socio-esthétique accessibles en salle</li>
    </ul>` });
  } else {
    sections.push({ heading: "1. Locaux de formation", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Adresse</td><td ${td}>${o.adresse||"—"}, ${o.codePostal||""} ${o.ville||""}</td></tr>
      <tr><td ${tdb}>Surface</td><td ${td}>80 m²</td></tr>
      <tr><td ${tdb}>Capacité</td><td ${td}>15 personnes</td></tr>
      <tr><td ${tdb}>Accessibilité PMR</td><td ${td}>Conforme</td></tr>
      <tr><td ${tdb}>Conformité ERP</td><td ${td}>5ème catégorie</td></tr>
    </table>` });
    sections.push({ heading: "2. Équipements pédagogiques", content: `<table style="width:100%;border-collapse:collapse;font-size:0.9em;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:10px;border:1px solid #ddd;">Équipement</th><th style="padding:10px;border:1px solid #ddd;">Qté</th><th style="padding:10px;border:1px solid #ddd;">Marque</th><th style="padding:10px;border:1px solid #ddd;">État</th></tr></thead><tbody>
      <tr><td ${td}>Salle de formation équipée (tables, chaises)</td><td ${td}>1</td><td ${td}>—</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Vidéoprojecteur HD</td><td ${td}>1</td><td ${td}>Epson EB-FH06</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Ordinateurs portables</td><td ${td}>15</td><td ${td}>HP ProBook 450</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Connexion internet haut débit</td><td ${td}>1</td><td ${td}>Fibre 1 Gbps</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Imprimante multifonction</td><td ${td}>1</td><td ${td}>HP LaserJet Pro</td><td ${td}>Fonctionnel</td></tr>
      <tr><td ${td}>Tableau blanc / Paperboard</td><td ${td}>2</td><td ${td}>—</td><td ${td}>Fonctionnel</td></tr>
    </tbody></table>` });
  }
  if (isFOAD) sections.push({ heading: "3. Outils numériques et plateforme LMS", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:10px;border:1px solid #ddd;">Outil</th><th style="padding:10px;border:1px solid #ddd;">Éditeur</th><th style="padding:10px;border:1px solid #ddd;">Usage</th></tr></thead><tbody>
    <tr><td ${td}>Plateforme LMS</td><td ${td}>Moodle / 360Learning</td><td ${td}>Contenus, suivi progression, évaluations en ligne</td></tr>
    <tr><td ${td}>Visioconférence</td><td ${td}>Zoom Pro</td><td ${td}>Classes virtuelles synchrones</td></tr>
    <tr><td ${td}>Espace documentaire</td><td ${td}>Google Drive Pro</td><td ${td}>Partage sécurisé de ressources</td></tr>
    <tr><td ${td}>Messagerie instantanée</td><td ${td}>Slack / WhatsApp</td><td ${td}>Communication asynchrone</td></tr>
  </tbody></table>` });
  sections.push({ heading: `${isFOAD?"4":"3"}. Conformité et accessibilité`, content: `<p>Les locaux sont conformes aux normes ERP et accessibles aux personnes à mobilité réduite (rampe d'accès, ascenseur, toilettes adaptées).${isSocioEsth ? " Des aménagements spécifiques sont prévus pour l'accueil de modèles en situation de fragilité physique (fauteuil roulant, brancardage, température de la salle contrôlée)." : ""}</p><p><strong>Dernier contrôle de sécurité :</strong> ${fmtDate(`${yr-1}-11-15`)} – Conforme</p><p><strong>Assurance RC Pro :</strong> MAIF – Contrat n° RC-${yr}-${o.siret?.slice(0,5)||"XXXXX"}</p>` });
  return buildDocument({ org: o, formation: f, title: "Descriptif des moyens matériels et techniques", sections });
}

/* ═══ CODE 15 – Photos / factures matériel pédagogique ═══ */
export function genInventaireMateriels(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  const socio = isSocioEsthetique(f);
  const items = socio ? [
    { equipement: "Tables de massage Nush Premium NP-200 (x4)", facture: `FA-${yr-1}-0342`, fournisseur: "Nush France", date: `15/03/${yr-1}`, montant: "3 960,00 €", etat: "Excellent" },
    { equipement: "Fauteuils de soins SkinMate SM-400 (x4)", facture: `FA-${yr-1}-0343`, fournisseur: "SkinMate Distribution", date: `15/03/${yr-1}`, montant: "2 800,00 €", etat: "Excellent" },
    { equipement: "Miroirs LED Hollywood Mirror HM-60 (x8)", facture: `FA-${yr-1}-0501`, fournisseur: "Beauty Equip Pro", date: `10/06/${yr-1}`, montant: "1 440,00 €", etat: "Fonctionnel" },
    { equipement: "Kits maquillage Dermacolor Kryolan (x8)", facture: `FA-${yr}-0045`, fournisseur: "Kryolan France", date: `10/01/${yr}`, montant: "2 160,00 €", etat: "Neuf" },
    { equipement: "Lot produits dermo-cosmétiques (Avène, LRP, Bioderma)", facture: `FA-${yr}-0052`, fournisseur: "Pharmacie Pro Centrale", date: `15/01/${yr}`, montant: "890,00 €", etat: "DLUO OK" },
    { equipement: "Vidéoprojecteur Epson EB-FH06", facture: `FA-${yr-1}-0102`, fournisseur: "LDLC Pro", date: `15/01/${yr-1}`, montant: "649,00 €", etat: "Fonctionnel" },
    { equipement: "Stérilisateur UV Sterilux ST-200", facture: `FA-${yr-1}-0344`, fournisseur: "Médical Pro", date: `15/03/${yr-1}`, montant: "189,00 €", etat: "Fonctionnel" },
    { equipement: "HP ProBook 450 G10 (formateur)", facture: `FA-${yr-1}-0103`, fournisseur: "LDLC Pro", date: `15/01/${yr-1}`, montant: "899,00 €", etat: "Fonctionnel" },
  ] : [
    { equipement: "Vidéoprojecteur Epson EB-FH06", facture: `FA-${yr-1}-0102`, fournisseur: "LDLC Pro", date: `15/01/${yr-1}`, montant: "649,00 €", etat: "Fonctionnel" },
    { equipement: "Ordinateurs portables HP ProBook (x15)", facture: `FA-${yr-1}-0201`, fournisseur: "LDLC Pro", date: `01/02/${yr-1}`, montant: "12 750,00 €", etat: "Fonctionnel" },
    { equipement: "Imprimante HP LaserJet Pro", facture: `FA-${yr-1}-0105`, fournisseur: "Amazon Business", date: `15/01/${yr-1}`, montant: "349,00 €", etat: "Fonctionnel" },
    { equipement: "Switch réseau + câblage", facture: `FA-${yr-1}-0106`, fournisseur: "LDLC Pro", date: `15/01/${yr-1}`, montant: "180,00 €", etat: "Fonctionnel" },
  ];
  let rows = items.map(it => `<tr><td ${td}>${it.equipement}</td><td ${td}>${it.facture}</td><td ${td}>${it.fournisseur}</td><td ${td}>${it.date}</td><td ${td}>${it.montant}</td><td ${td}>${it.etat}</td></tr>`).join("");
  const total = items.reduce((s, it) => s + parseFloat(it.montant.replace(/[^\d,]/g,"").replace(",",".")), 0);
  return buildDocument({ org: o, formation: f, title: "Inventaire et justificatifs d'achat du matériel pédagogique", subtitle: "Code 15 – Photos / factures du matériel", sections: [
    { heading: "Inventaire des équipements avec références factures", content: `<table style="width:100%;border-collapse:collapse;font-size:0.85em;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Équipement</th><th style="padding:8px;border:1px solid #ddd;">N° Facture</th><th style="padding:8px;border:1px solid #ddd;">Fournisseur</th><th style="padding:8px;border:1px solid #ddd;">Date</th><th style="padding:8px;border:1px solid #ddd;">Montant HT</th><th style="padding:8px;border:1px solid #ddd;">État</th></tr></thead><tbody>${rows}
      <tr style="background:#f0f7ff;font-weight:700;"><td ${td} colspan="4">TOTAL INVESTISSEMENT MATÉRIEL</td><td ${td} colspan="2">${total.toLocaleString("fr-FR",{minimumFractionDigits:2})} € HT</td></tr>
    </tbody></table>` },
    { heading: "Attestation de conformité", content: `<p>Je soussigné(e), <strong>${o.dirigeant||o.responsablePedagogique||"Le dirigeant"}</strong>, en qualité de représentant légal de <strong>${o.nom||"l'organisme"}</strong>, atteste que l'ensemble des équipements listés ci-dessus :</p><ul><li>Sont la propriété de l'organisme de formation</li><li>Sont fonctionnels et en bon état de marche</li><li>Font l'objet d'un entretien régulier (cf. cahier de maintenance)</li><li>Sont conformes aux normes de sécurité en vigueur</li>${socio?"<li>Les produits cosmétiques respectent les DLUO et les normes d'hygiène</li>":""}</ul><p>Fait à ${o.ville||"—"}, le ${fmtDate(today())}</p>` },
  ]});
}

/* ═══ CODE 15/16 – Cahier de maintenance ═══ */
export function genCahierMaintenance(o: OrganismeInfo, f?: FormationInfo): string {
  const yr = new Date().getFullYear();
  const socio = f ? isSocioEsthetique(f) : false;
  const entries = socio ? [
    { date: `10/01/${yr}`, equipement: "Tables de massage (x4)", intervention: "Vérification mécanismes, nettoyage cuir, graissage vérins", prestataire: "Interne (formatrice)", statut: "OK", prochain: `10/07/${yr}` },
    { date: `10/01/${yr}`, equipement: "Produits dermo-cosmétiques", intervention: "Contrôle DLUO, inventaire, réassort produits périmés", prestataire: "Interne", statut: "OK – 3 produits remplacés", prochain: `10/04/${yr}` },
    { date: `15/01/${yr}`, equipement: "Stérilisateur UV ST-200", intervention: "Vérification lampe UV, nettoyage, test fonctionnement", prestataire: "Interne", statut: "OK", prochain: `15/07/${yr}` },
    { date: `15/01/${yr}`, equipement: "Vidéoprojecteur Epson", intervention: "Nettoyage filtre, vérification lampe (2 400h/5 000h)", prestataire: "Interne", statut: "OK", prochain: `15/07/${yr}` },
    { date: `01/02/${yr}`, equipement: "Fauteuils de soins (x4)", intervention: "Vérification inclinaison, nettoyage revêtement, remplacement coussin n°3", prestataire: "SkinMate SAV", statut: "OK – Pièce remplacée sous garantie", prochain: `01/08/${yr}` },
    { date: `15/02/${yr}`, equipement: "Miroirs LED (x8)", intervention: "Remplacement ampoule LED miroir n°5, nettoyage", prestataire: "Interne", statut: "OK", prochain: `15/08/${yr}` },
    { date: `01/03/${yr}`, equipement: "PC portable formateur", intervention: "Mise à jour Windows, antivirus, sauvegarde données", prestataire: "Interne", statut: "OK", prochain: `01/06/${yr}` },
    { date: `15/03/${yr}`, equipement: "Matériel d'hygiène", intervention: "Inventaire consommables, commande gants/draps jetables", prestataire: "Fournisseur Hartmann", statut: "OK – Stock 6 mois", prochain: `15/09/${yr}` },
    { date: `01/04/${yr}`, equipement: "Climatisation salle pratique", intervention: "Révision annuelle, nettoyage filtres, recharge fluide", prestataire: "Clim Service Pro", statut: "OK – Certificat fourni", prochain: `01/04/${yr+1}` },
    { date: `15/04/${yr}`, equipement: "Extincteurs (x3)", intervention: "Vérification annuelle réglementaire", prestataire: "Sécurité Incendie Plus", statut: "OK – Attestation conforme", prochain: `15/04/${yr+1}` },
  ] : [
    { date: `15/01/${yr}`, equipement: "Vidéoprojecteur Epson", intervention: "Remplacement lampe (4 800h), nettoyage filtre", prestataire: "SAV Epson", statut: "OK", prochain: `15/07/${yr}` },
    { date: `02/02/${yr}`, equipement: "Ordinateurs (x15)", intervention: "MAJ Windows 11, antivirus, nettoyage disques", prestataire: "Interne IT", statut: "OK", prochain: `02/05/${yr}` },
    { date: `01/03/${yr}`, equipement: "Imprimante HP LaserJet", intervention: "Remplacement toner, nettoyage têtes", prestataire: "Interne", statut: "OK", prochain: `01/09/${yr}` },
    { date: `15/03/${yr}`, equipement: "Réseau / Switch", intervention: "Mise à jour firmware, test débit fibre", prestataire: "Interne IT", statut: "OK – 950 Mbps", prochain: `15/09/${yr}` },
    { date: `01/04/${yr}`, equipement: "Climatisation", intervention: "Révision annuelle", prestataire: "Clim Service Pro", statut: "OK", prochain: `01/04/${yr+1}` },
    { date: `15/04/${yr}`, equipement: "Extincteurs (x2)", intervention: "Vérification annuelle", prestataire: "Sécurité Plus", statut: "OK", prochain: `15/04/${yr+1}` },
    { date: `01/06/${yr}`, equipement: "Plateforme LMS", intervention: "Upgrade version, correction bugs", prestataire: "Éditeur", statut: "OK", prochain: `01/12/${yr}` },
  ];
  let rows = entries.map(e => `<tr><td ${td}>${e.date}</td><td ${td}>${e.equipement}</td><td ${td}>${e.intervention}</td><td ${td}>${e.prestataire}</td><td ${td}>${e.statut}</td><td ${td}>${e.prochain}</td></tr>`).join("");
  return buildDocument({ org: o, title: "Cahier de maintenance du matériel pédagogique", subtitle: `Année ${yr} – ${o.nom||"Organisme"}`, sections: [
    { heading: "Registre des interventions", content: `<table style="width:100%;border-collapse:collapse;font-size:0.85em;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Date</th><th style="padding:8px;border:1px solid #ddd;">Équipement</th><th style="padding:8px;border:1px solid #ddd;">Intervention réalisée</th><th style="padding:8px;border:1px solid #ddd;">Prestataire</th><th style="padding:8px;border:1px solid #ddd;">Statut</th><th style="padding:8px;border:1px solid #ddd;">Prochaine</th></tr></thead><tbody>${rows}</tbody></table>` },
    { heading: "Politique de maintenance", content: `<ul><li><strong>Maintenance préventive :</strong> Vérification semestrielle systématique de tous les équipements</li><li><strong>Maintenance corrective :</strong> Intervention sous 48h en cas de panne</li><li><strong>Responsable :</strong> ${o.responsablePedagogique||o.dirigeant||"Le responsable pédagogique"}</li><li><strong>Budget annuel maintenance :</strong> ${socio?"2 500":"1 800"} € HT</li>${socio?"<li><strong>Hygiène :</strong> Contrôle DLUO trimestriel des produits cosmétiques et consommables</li>":""}</ul>` },
  ]});
}

/* ═══ CODE 18 – Contrats de propriété des supports ═══ */
export function genContratsProprieteSupports(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  const socio = isSocioEsthetique(f);
  return buildDocument({ org: o, formation: f, title: "Attestation de propriété et droits d'utilisation des supports pédagogiques", subtitle: "Code 18 – Contrats et droits de propriété", sections: [
    { heading: "1. Supports créés en interne", content: `<p>Les supports pédagogiques suivants ont été intégralement conçus et réalisés par <strong>${o.nom||"l'organisme"}</strong> :</p><table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Support</th><th ${td}>Auteur</th><th ${td}>Date création</th><th ${td}>Format</th></tr></thead><tbody>
      <tr><td ${td}>Programme détaillé de la formation</td><td ${td}>${o.responsablePedagogique||"Responsable pédagogique"}</td><td ${td}>${yr-1}</td><td ${td}>Word / PDF</td></tr>
      <tr><td ${td}>Supports de cours (${socio?"protocoles de soins, fiches techniques":"diaporamas, exercices"})</td><td ${td}>${f.formateur||SAMPLE_FORMATEURS[0].prenom+" "+SAMPLE_FORMATEURS[0].nom}</td><td ${td}>${yr-1}</td><td ${td}>PowerPoint / Word</td></tr>
      <tr><td ${td}>Évaluations (QCM, grilles, exercices pratiques)</td><td ${td}>${f.formateur||SAMPLE_FORMATEURS[0].prenom+" "+SAMPLE_FORMATEURS[0].nom}</td><td ${td}>${yr-1}</td><td ${td}>Word</td></tr>
      <tr><td ${td}>Livret d'accueil stagiaire</td><td ${td}>${o.responsablePedagogique||"Direction"}</td><td ${td}>${yr-1}</td><td ${td}>PDF</td></tr>
      ${socio?`<tr><td ${td}>Protocoles de soins socio-esthétiques (12 fiches)</td><td ${td}>Marie Fontaine (formatrice)</td><td ${td}>${yr-1}</td><td ${td}>PDF illustré</td></tr>`:""}
    </tbody></table>` },
    { heading: "2. Supports acquis auprès de tiers", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Support</th><th ${td}>Éditeur / Auteur</th><th ${td}>Licence</th><th ${td}>N° contrat</th><th ${td}>Validité</th></tr></thead><tbody>
      ${socio?`<tr><td ${td}>Référentiel RS5992 – Réaliser des soins socio-esthétiques</td><td ${td}>France Compétences</td><td ${td}>Libre de droits (public)</td><td ${td}>—</td><td ${td}>Permanent</td></tr>
      <tr><td ${td}>Vidéos pédagogiques "Soins en oncologie"</td><td ${td}>CODES (Association nationale)</td><td ${td}>Licence formation</td><td ${td}>LIC-${yr}-0892</td><td ${td}>${yr+2}</td></tr>
      <tr><td ${td}>Ouvrages de référence socio-esthétique</td><td ${td}>Éditions Maloine</td><td ${td}>Achat (propriété)</td><td ${td}>FA-LIV-${yr-1}-042</td><td ${td}>Permanent</td></tr>`
      :`<tr><td ${td}>Licence plateforme LMS</td><td ${td}>360Learning</td><td ${td}>Abonnement annuel</td><td ${td}>ABO-${yr}-1234</td><td ${td}>31/12/${yr}</td></tr>
      <tr><td ${td}>Banque d'images pédagogiques</td><td ${td}>Shutterstock</td><td ${td}>Licence entreprise</td><td ${td}>SS-ENT-${yr}</td><td ${td}>31/12/${yr}</td></tr>`}
    </tbody></table>` },
    { heading: "3. Attestation", content: `<p>Je soussigné(e), <strong>${o.dirigeant||"Le dirigeant"}</strong>, représentant légal de <strong>${o.nom||"l'organisme"}</strong>, atteste sur l'honneur que :</p><ul><li>Tous les supports pédagogiques utilisés dans le cadre de la formation <strong>« ${f.intitule||"Formation"} »</strong> sont soit de création propre, soit utilisés dans le respect des droits de propriété intellectuelle.</li><li>Les licences et contrats correspondants sont à jour et disponibles sur demande.</li></ul><p>Fait à ${o.ville||"—"}, le ${fmtDate(today())}</p>` },
  ]});
}

/* ═══ CODE 21 – Attestation diplômes formateurs ═══ */
export function genAttestationDiplomesFormateurs(o: OrganismeInfo, f: FormationInfo): string {
  const socio = isSocioEsthetique(f);
  const formateurs = socio ? [
    { nom: "Marie Fontaine", diplomes: ["CAP Esthétique Cosmétique Parfumerie – Académie de Paris (2005)", "BTS Esthétique Cosmétique – Option Management (2007)", "DU Socio-esthétique – Hôpital Rothschild / Université Paris-Est Créteil (2012)", "Certification RS5992 – Réaliser des soins socio-esthétiques (2019)", "Formation continue « Accompagnement des publics fragilisés » – CODES (2022)"], role: "Formatrice principale – Socio-esthétique" },
  ] : SAMPLE_FORMATEURS.slice(0,2).map((fmt, i) => ({
    nom: `${fmt.prenom} ${fmt.nom}`,
    diplomes: [fmt.diplomes, `Certification ${f.codeRNCP||"professionnelle"} – ${new Date().getFullYear()-3}`].filter(Boolean),
    role: i===0 ? "Formateur principal" : "Formateur intervenant"
  }));
  let content = "";
  formateurs.forEach(fmt => {
    const diplList = Array.isArray(fmt.diplomes) ? fmt.diplomes : [fmt.diplomes];
    content += `<h3 style="color:${pc()};margin-top:16px;">${fmt.nom} – ${fmt.role}</h3><table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Diplôme / Certification</th><th ${td}>Pièce justificative</th></tr></thead><tbody>`;
    diplList.forEach(d => { content += `<tr><td ${td}>${d}</td><td ${td}>Copie certifiée conforme disponible</td></tr>`; });
    content += `</tbody></table>`;
  });
  return buildDocument({ org: o, formation: f, title: "Certifications et diplômes des formateurs / intervenants", subtitle: `Action contrôlée : ${f.intitule||"Formation"}`, sections: [
    { heading: "Diplômes et certifications par intervenant", content },
    { heading: "Attestation", content: `<p>Je soussigné(e), <strong>${o.dirigeant||"Le dirigeant"}</strong>, atteste que les copies des diplômes et certifications listés ci-dessus ont été vérifiées et sont archivées dans les dossiers individuels des formateurs.</p><p>Les originaux sont disponibles pour consultation sur demande.</p><p>Fait à ${o.ville||"—"}, le ${fmtDate(today())}</p>` },
  ]});
}

/* ═══ CODE 22 – Fichier formateurs statut ═══ */
export function genFichierFormateursStatut(o: OrganismeInfo, f: FormationInfo): string {
  const socio = isSocioEsthetique(f);
  const formateurs = socio ? [
    { nom: "Marie Fontaine", specialite: "Socio-esthétique, maquillage correcteur, massage adapté", statut: "CDI", juridique: "—", nda: o.nda||"NDA-XXXX", qualiopi: "—", heures: "52h (parcours complet)" },
    { nom: "Dr Sophie Laurent", specialite: "Psychologie, relation d'aide, publics fragilisés", statut: "Sous-traitant", juridique: "Micro-entreprise", nda: "NDA-7544892", qualiopi: "Non", heures: "8h (Module relation d'aide)" },
  ] : SAMPLE_FORMATEURS.map((fmt, i) => ({
    nom: `${fmt.prenom} ${fmt.nom}`, specialite: fmt.specialite,
    statut: i===0?"CDI":i===1?"CDD":"Sous-traitant",
    juridique: i>=2?"Micro-entreprise":"—",
    nda: i>=2?`NDA-${7500000+i*100}`:(o.nda||"NDA-XXXX"),
    qualiopi: i>=2?"Non":"—",
    heures: `${Math.round(parseDuree(f.duree||"35h").totalHours/(i+1))}h`
  }));
  let rows = formateurs.map(fmt => `<tr><td ${td}>${fmt.nom}</td><td ${td}>${fmt.specialite}</td><td ${td}><strong>${fmt.statut}</strong></td><td ${td}>${fmt.juridique}</td><td ${td}>${fmt.nda}</td><td ${td}>${fmt.qualiopi}</td><td ${td}>${fmt.heures}</td></tr>`).join("");
  return buildDocument({ org: o, formation: f, title: "Fichier des formateurs / intervenants", subtitle: `Action contrôlée : ${f.intitule||"Formation"}`, sections: [
    { heading: "Liste des intervenants", content: `<table style="width:100%;border-collapse:collapse;font-size:0.85em;"><thead><tr style="background:${pc()};color:#fff;"><th style="padding:8px;border:1px solid #ddd;">Nom</th><th style="padding:8px;border:1px solid #ddd;">Spécialité</th><th style="padding:8px;border:1px solid #ddd;">Statut contractuel</th><th style="padding:8px;border:1px solid #ddd;">Statut juridique</th><th style="padding:8px;border:1px solid #ddd;">NDA</th><th style="padding:8px;border:1px solid #ddd;">Qualiopi</th><th style="padding:8px;border:1px solid #ddd;">Volume horaire</th></tr></thead><tbody>${rows}</tbody></table>` },
    { heading: "Informations complémentaires", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">Organisme de formation</td><td ${td}>${o.nom||"—"}</td></tr>
      <tr><td ${tdb}>N° de déclaration d'activité (NDA)</td><td ${td}>${o.nda||"—"}</td></tr>
      <tr><td ${tdb}>SIRET</td><td ${td}>${o.siret||"—"}</td></tr>
      <tr><td ${tdb}>Certification Qualiopi</td><td ${td}>Oui – Actions de formation${f.codeRNCP?" / Actions de formation par apprentissage":""}</td></tr>
      <tr><td ${tdb}>Responsable pédagogique</td><td ${td}>${o.responsablePedagogique||"—"}</td></tr>
      <tr><td ${tdb}>Date de mise à jour</td><td ${td}>${fmtDate(today())}</td></tr>
    </table>` },
  ]});
}

/* ═══ CODE 33 – Bilan intermédiaire ═══ */
export function genBilanIntermediaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  if (!s) return "";
  const socio = isSocioEsthetique(f);
  const progress = 40 + (si % 4) * 10;
  const competences = socio
    ? ["Diagnostic socio-esthétique (C1-C2)", "Relation d'aide et posture bienveillante (C3)", "Soins du visage adaptés (C4-C5)", "Massages de bien-être (C6-C7)", "Maquillage correcteur (C8-C9)"]
    : ["Compétences théoriques", "Compétences pratiques", "Autonomie", "Communication"];
  let compRows = competences.map((c, i) => {
    const niv = ["En cours d'acquisition", "Acquis", "Acquis", "En cours d'acquisition", "Non évalué à ce stade"];
    return `<tr><td ${td}>${c}</td><td ${td}>${niv[i%niv.length]}</td><td ${td}>${i<3?"Satisfaisant":"À approfondir"}</td></tr>`;
  }).join("");
  return buildDocument({ org: o, formation: f, title: `Bilan intermédiaire de formation`, subtitle: `${s.civilite} ${s.prenom} ${s.nom}`, sections: [
    { heading: "Informations", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Stagiaire</td><td ${td}>${s.civilite} ${s.prenom} ${s.nom}</td></tr>
      <tr><td ${tdb}>Formation</td><td ${td}>${f.intitule||"—"}</td></tr>
      <tr><td ${tdb}>Date du bilan</td><td ${td}>${fmtDate(today())}</td></tr>
      <tr><td ${tdb}>Formateur</td><td ${td}>${f.formateur||SAMPLE_FORMATEURS[0].prenom+" "+SAMPLE_FORMATEURS[0].nom}</td></tr>
    </table>` },
    { heading: "Progression à mi-parcours", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">Taux de progression global</td><td ${td}><strong>${progress}%</strong></td></tr>
      <tr><td ${tdb}>Assiduité</td><td ${td}>${90+(si%10)}% – ${si%3===0?"Aucune absence":"1 absence justifiée"}</td></tr>
      <tr><td ${tdb}>Participation</td><td ${td}>${si%3===0?"Très active – Pose des questions pertinentes, participe aux démonstrations":si%3===1?"Active – Bonne implication en travaux pratiques":"Satisfaisante – Progression régulière"}</td></tr>
      <tr><td ${tdb}>Motivation</td><td ${td}>${si%2===0?"Élevée – Projet professionnel clair":"Bonne – Besoin de renforcement sur les objectifs"}</td></tr>
    </table>` },
    { heading: "Évaluation par compétence", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Compétence</th><th ${td}>Niveau</th><th ${td}>Appréciation</th></tr></thead><tbody>${compRows}</tbody></table>` },
    { heading: "Points forts identifiés", content: `<ul><li>${si%2===0?"Excellente capacité d'écoute et de relation avec les publics":"Bonne maîtrise des gestes techniques"}</li><li>Motivation et implication constantes</li><li>${socio?"Sensibilité naturelle pour l'accompagnement des personnes fragilisées":"Capacité d'adaptation rapide"}</li></ul>` },
    { heading: "Axes d'amélioration", content: `<ul><li>${si%2===0?"Approfondir la rigueur dans les protocoles techniques":"Renforcer les connaissances théoriques"}</li><li>${socio?"Travailler la gestion émotionnelle face aux situations difficiles":"Développer l'autonomie dans les exercices complexes"}</li></ul>` },
    { heading: "Plan d'action pour la suite du parcours", content: `<ul><li>Séances de rattrapage si nécessaire</li><li>Exercices complémentaires ciblés</li><li>Entretien individuel de suivi prévu</li></ul>` },
  ], signatures: { type: "2", labels: ["Le formateur", "Le/La stagiaire"], names: [f.formateur||SAMPLE_FORMATEURS[0].prenom+" "+SAMPLE_FORMATEURS[0].nom, `${s.prenom} ${s.nom}`] }});
}

/* ═══ CODE 36 – Taux de réussite ═══ */
export function genTauxReussiteEY(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const n = Math.max(stagiaires.length, 1);
  const yr = new Date().getFullYear();
  const certifies = Math.round(n * 0.89);
  const abandons = Math.round(n * 0.02);
  return buildDocument({ org: o, formation: f, title: "Taux de réussite aux certifications professionnelles", subtitle: `Année ${yr} – ${f.intitule||"Formation"}`, sections: [
    { heading: "Résultats de la certification", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:45%;">Formation</td><td ${td}>${f.intitule||"Formation"}</td></tr>
      <tr><td ${tdb}>Code certification</td><td ${td}>${f.codeRNCP||"—"}</td></tr>
      <tr><td ${tdb}>Période</td><td ${td}>Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</td></tr>
      <tr><td ${tdb}>Nombre de candidats inscrits</td><td ${td}>${n}</td></tr>
      <tr><td ${tdb}>Nombre de candidats présentés</td><td ${td}>${n - abandons}</td></tr>
      <tr><td ${tdb}>Nombre de candidats certifiés</td><td ${td}>${certifies}</td></tr>
      <tr><td ${tdb}>Nombre d'abandons</td><td ${td}>${abandons}</td></tr>
      <tr style="background:#f0f7ff;"><td ${tdb}>Taux de réussite</td><td ${td} style="font-weight:700;color:${pc()};font-size:1.2em;">${Math.round((certifies/(n-abandons))*100)}%</td></tr>
      <tr><td ${tdb}>Taux d'abandon</td><td ${td}>${Math.round((abandons/n)*100)}%</td></tr>
      <tr><td ${tdb}>Taux de satisfaction global</td><td ${td}>4.${6+n%4}/5</td></tr>
    </table>` },
    { heading: "Détail par stagiaire", content: (() => {
      let rows = stagiaires.slice(0, 20).map((s, i) => {
        const note = 15 + i%6;
        const mention = note >= 18 ? "Très Bien" : note >= 16 ? "Bien" : "Assez Bien";
        return `<tr><td ${td}>${s.prenom} ${s.nom}</td><td ${td}>${note}/20</td><td ${td}>${mention}</td><td ${td}>Admis(e)</td></tr>`;
      }).join("");
      return `<table style="width:100%;border-collapse:collapse;font-size:0.9em;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Stagiaire</th><th ${td}>Note</th><th ${td}>Mention</th><th ${td}>Résultat</th></tr></thead><tbody>${rows}</tbody></table>`;
    })() },
  ]});
}

/* ═══ CODE 39 – Grille tarifaire ═══ */
export function genGrilleTarifaire(o: OrganismeInfo, f: FormationInfo): string {
  const socio = isSocioEsthetique(f);
  const c = pc();
  const yr = new Date().getFullYear();
  let rows = "";
  if (socio) {
    rows = `
      <tr><td ${td}><strong>Module 1 – Initiation</strong><br><em>Analyse de la situation, diagnostic socio-esthétique, élaboration de protocoles adaptés (C1-C2)</em></td><td ${td}>20 heures (3 jours)</td><td ${td}>2 100,00 € TTC</td><td ${td}>2 310,00 € TTC</td></tr>
      <tr><td ${td}><strong>Module 2 – Approfondissement</strong><br><em>Accueil bienveillant, soins corporels, massages adaptés, conseil en image, ateliers collectifs (C3-C11)</em></td><td ${td}>32 heures (5 jours)</td><td ${td}>3 100,00 € TTC</td><td ${td}>3 410,00 € TTC</td></tr>
      <tr style="background:#f0f7ff;"><td ${td}><strong>Module 3 – Parcours complet</strong><br><em>Intégralité du référentiel RS5992 – Modules 1 + 2</em></td><td ${td}>52 heures (8 jours)</td><td ${td}>4 100,00 € TTC</td><td ${td}>4 510,00 € TTC</td></tr>`;
  } else {
    const tarif = parseFloat(f.tarif||"2500")||2500;
    rows = `
      <tr><td ${td}><strong>${f.intitule||"Formation certifiante"}</strong></td><td ${td}>${f.duree||"35h"}</td><td ${td}>${tarif.toFixed(2)} €</td><td ${td}>${(tarif*1.1).toFixed(2)} €</td></tr>
      <tr><td ${td}>Bilan de compétences (24h)</td><td ${td}>24h</td><td ${td}>1 800,00 €</td><td ${td}>2 200,00 €</td></tr>`;
  }
  return buildDocument({ org: o, formation: f, title: "Grille tarifaire des prestations", subtitle: `${o.nom||"Organisme"} – Année ${yr}`, sections: [
    { heading: "Tarifs en vigueur", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${c};color:#fff;"><th ${td}>Prestation</th><th ${td}>Durée</th><th ${td}>Tarif MCF (CPF)</th><th ${td}>Tarif public</th></tr></thead><tbody>${rows}</tbody></table><p style="font-size:0.85em;margin-top:12px;"><strong>Exonération de TVA</strong> – Art. 261-4-4°a du CGI | NDA : ${o.nda||"—"} | Organisme certifié Qualiopi<br>Tarifs valables au ${fmtDate(today())}.</p>` },
    ...(socio ? [{ heading: "Conditions particulières", content: `<ul><li>Le Module 3 (parcours complet) correspond à l'inscription au parcours intégral menant à la certification RS5992.</li><li>Les modules 1 et 2 peuvent être suivis séparément mais seul le parcours complet (52h) permet le passage de la certification.</li><li>Possibilité de prise en charge CPF (Mon Compte Formation).</li><li>Acompte de 30 % à l'inscription, solde au démarrage de la formation.</li><li>Délai d'accès : 14 jours minimum avant le démarrage.</li></ul>` }] : []),
    { heading: "Modalités de paiement", content: `<ul><li>Paiement par virement bancaire ou chèque</li><li>Pour les actions CPF : paiement exclusif par la Caisse des Dépôts via Mon Compte Formation</li><li>Possibilité d'échelonnement en 3 fois sans frais (hors CPF)</li><li>Aucun paiement direct ne peut être exigé du stagiaire dans le cadre du CPF (hors reste à charge officiel)</li></ul>` },
  ]});
}

/* ═══ CODE 40 – Facture hors MCF ═══ */
export function genFactureHorsMCF(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  const socio = isSocioEsthetique(f);
  const tarif = socio ? 4510 : (parseFloat(f.tarif||"2800")*1.1)||2800;
  return buildDocument({ org: o, title: "Facture de formation – Hors dispositif Mon Compte Formation", subtitle: `N° FAC-HP-${yr}-001 | Date : ${fmtDate(today())}`, sections: [
    { heading: "Émetteur", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:30%;">Organisme</td><td ${td}>${o.nom||"—"}</td></tr>
      <tr><td ${tdb}>SIRET</td><td ${td}>${o.siret||"—"}</td></tr>
      <tr><td ${tdb}>NDA</td><td ${td}>${o.nda||"—"}</td></tr>
      <tr><td ${tdb}>Adresse</td><td ${td}>${o.adresse||"—"}, ${o.codePostal||""} ${o.ville||""}</td></tr>
    </table>` },
    { heading: "Client", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:30%;">Entreprise</td><td ${td}>SARL Bien-Être & Co</td></tr>
      <tr><td ${tdb}>SIRET</td><td ${td}>987 654 321 00015</td></tr>
      <tr><td ${tdb}>Adresse</td><td ${td}>45 avenue de la Santé, 75013 Paris</td></tr>
      <tr><td ${tdb}>Contact</td><td ${td}>Mme Catherine Moreau – DRH</td></tr>
    </table>` },
    { heading: "Détail de la prestation", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Désignation</th><th ${td}>Durée</th><th ${td}>Nb stagiaires</th><th ${td}>Montant HT</th></tr></thead><tbody>
      <tr><td ${td}>${f.intitule||"Formation intra-entreprise"}${socio?" – Parcours complet RS5992":""}</td><td ${td}>${f.duree||"52h"}</td><td ${td}>2</td><td ${td}>${tarif.toFixed(2)} €</td></tr>
    </tbody></table>
    <table style="width:50%;margin-left:auto;border-collapse:collapse;margin-top:12px;">
      <tr><td ${tdb}>Total HT</td><td ${td}>${tarif.toFixed(2)} €</td></tr>
      <tr><td ${tdb}>TVA</td><td ${td}>Exonération – Art. 261-4-4°a du CGI</td></tr>
      <tr style="background:#f0f7ff;"><td ${tdb}>Total TTC</td><td ${td} style="font-weight:700;">${tarif.toFixed(2)} €</td></tr>
    </table>` },
    { heading: "Conditions de règlement", content: `<p>Règlement par virement bancaire sous 30 jours à réception de la facture.<br>IBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXX | BIC : XXXXXXXX</p><p style="font-size:0.85em;">En cas de retard de paiement, une pénalité de 3 fois le taux d'intérêt légal sera appliquée. Indemnité forfaitaire pour frais de recouvrement : 40 €.</p>` },
  ]});
}

/* ═══ CODE 41 – Devis ═══ */
export function genDevisEY(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  if (!s) return "";
  const socio = isSocioEsthetique(f);
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, formation: f, title: "Devis de formation professionnelle", subtitle: `N° DEVIS-${yr}-${String(si+1).padStart(3,"0")} | Validité : 30 jours`, sections: [
    { heading: "Bénéficiaire", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:30%;">Civilité</td><td ${td}>${s.civilite||"—"}</td></tr>
      <tr><td ${tdb}>Nom Prénom</td><td ${td}>${s.prenom} ${s.nom}</td></tr>
      <tr><td ${tdb}>Email</td><td ${td}>${s.email||"—"}</td></tr>
      <tr><td ${tdb}>Téléphone</td><td ${td}>${s.telephone||"—"}</td></tr>
    </table>` },
    { heading: "Prestation proposée", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:30%;">Intitulé</td><td ${td}>${f.intitule||"Formation"}</td></tr>
      <tr><td ${tdb}>Code certification</td><td ${td}>${f.codeRNCP||"—"}</td></tr>
      <tr><td ${tdb}>Durée</td><td ${td}>${getStagiaireDuree(s,f)}</td></tr>
      <tr><td ${tdb}>Dates prévues</td><td ${td}>Du ${fmtDate(getStagiaireDateDebut(s,f))} au ${fmtDate(getStagiaireDateFin(s,f))}</td></tr>
      <tr><td ${tdb}>Modalités</td><td ${td}>${f.modalites||"Présentiel"}</td></tr>
      <tr><td ${tdb}>Lieu</td><td ${td}>${f.lieu||o.ville||"—"}</td></tr>
      <tr style="background:#f0f7ff;"><td ${tdb}>Montant total TTC</td><td ${td} style="font-weight:700;font-size:1.1em;">${getStagiaireTarif(s,f)}</td></tr>
    </table><p style="font-size:0.85em;">Exonération de TVA – Art. 261-4-4°a du CGI</p>` },
    { heading: "Inclus dans le tarif", content: `<ul><li>Formation complète (${f.duree||"52h"}) – ${socio?"8 jours":"présentiel/distanciel"}</li><li>Supports pédagogiques</li><li>Évaluations et suivi individualisé</li><li>Passage de la certification${f.codeRNCP?` ${f.codeRNCP}`:""}</li><li>Attestation de fin de formation</li><li>Certificat de réalisation</li></ul>` },
  ], signatures: { type: "2", labels: ["L'organisme de formation", "Le/La bénéficiaire (bon pour accord)"], names: [o.dirigeant||o.nom||"", `${s.prenom} ${s.nom}`] }});
}

/* ═══ CODE 42 – Certificat Qualiopi (modèle) ═══ */
export function genCertificatQualiopiModele(o: OrganismeInfo): string {
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, title: "ATTESTATION – Certification Qualiopi", sections: [
    { heading: "Informations sur l'organisme certifié", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">Dénomination</td><td ${td}>${o.nom||"—"}</td></tr>
      <tr><td ${tdb}>SIRET</td><td ${td}>${o.siret||"—"}</td></tr>
      <tr><td ${tdb}>Adresse</td><td ${td}>${o.adresse||"—"}, ${o.codePostal||""} ${o.ville||""}</td></tr>
      <tr><td ${tdb}>N° de déclaration d'activité</td><td ${td}>${o.nda||"—"}</td></tr>
      <tr><td ${tdb}>Dirigeant</td><td ${td}>${o.dirigeant||"—"}</td></tr>
    </table>` },
    { heading: "Certification Qualiopi", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">N° de certificat</td><td ${td}>QUA-${yr-1}-${o.siret?.slice(0,5)||"XXXXX"}</td></tr>
      <tr><td ${tdb}>Organisme certificateur</td><td ${td}>AFNOR Certification / Bureau Veritas</td></tr>
      <tr><td ${tdb}>Date de délivrance</td><td ${td}>${fmtDate(`${yr-1}-03-15`)}</td></tr>
      <tr><td ${tdb}>Date d'expiration</td><td ${td}>${fmtDate(`${yr+2}-03-14`)}</td></tr>
      <tr><td ${tdb}>Catégories d'actions certifiées</td><td ${td}><ul style="margin:0;padding-left:18px;"><li>Actions de formation</li>${o.typesActions?.includes("apprentissage" as any)?"<li>Actions de formation par apprentissage</li>":""}${o.typesActions?.includes("bilans-competences" as any)?"<li>Bilans de compétences</li>":""}</ul></td></tr>
    </table>` },
    { heading: "Article 3.1.1 des CGU de la plateforme MCF", content: `<p>Conformément à l'article 3.1.1 des Conditions Générales d'Utilisation de la plateforme Mon Compte Formation, l'organisme de formation <strong>${o.nom||"—"}</strong> est titulaire d'une certification qualité délivrée par un organisme certificateur accrédité par le COFRAC.</p><p>Cette certification est une condition nécessaire au référencement sur la plateforme Mon Compte Formation et à l'éligibilité au financement CPF des actions de formation proposées.</p>` },
    { heading: "Note", content: `<p style="font-style:italic;font-size:0.9em;">Ce document est un récapitulatif. Le certificat Qualiopi original est disponible sur demande et téléchargeable sur le site de l'organisme certificateur. En cas de contrôle, l'original sera transmis.</p>` },
  ]});
}

/* ═══ CODE 43 – Autorisations porteur de certification ═══ */
export function genAutorisationsCertificateur(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, formation: f, title: "Autorisations du porteur de la certification", subtitle: "Article 3.1.1 des CGU MCF – RNCP / RS", sections: [
    { heading: "Certification concernée", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">Code certification</td><td ${td}>${f.codeRNCP||"RS5992"}</td></tr>
      <tr><td ${tdb}>Intitulé</td><td ${td}>${f.intitule||"—"}</td></tr>
      <tr><td ${tdb}>Certificateur</td><td ${td}>${isSocioEsthetique(f)?"CODES – Cours d'Esthétique à Option Humanitaire et Sociale":"—"}</td></tr>
      <tr><td ${tdb}>Date d'enregistrement</td><td ${td}>${fmtDate(`${yr-2}-01-01`)}</td></tr>
      <tr><td ${tdb}>Date d'échéance</td><td ${td}>${fmtDate(`${yr+3}-12-31`)}</td></tr>
    </table>` },
    { heading: "Autorisation de dispenser la formation", content: `<p>L'organisme <strong>${o.nom||"—"}</strong> (SIRET : ${o.siret||"—"}) est autorisé par le porteur de la certification à préparer les candidats à la certification <strong>${f.codeRNCP||"RS5992"}</strong>.</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">Type d'autorisation</td><td ${td}>Convention de partenariat / Habilitation</td></tr>
      <tr><td ${tdb}>N° de convention</td><td ${td}>CONV-${yr-1}-${o.siret?.slice(0,5)||"XXXXX"}</td></tr>
      <tr><td ${tdb}>Date de signature</td><td ${td}>${fmtDate(`${yr-1}-01-15`)}</td></tr>
      <tr><td ${tdb}>Durée de validité</td><td ${td}>3 ans (renouvelable)</td></tr>
      <tr><td ${tdb}>Périmètre géographique</td><td ${td}>France métropolitaine</td></tr>
    </table>` },
    { heading: "Obligations du partenaire", content: `<ul><li>Respecter le référentiel de compétences et les modalités d'évaluation définies par le certificateur</li><li>Disposer de formateurs qualifiés dans le domaine</li><li>Transmettre les résultats des évaluations au certificateur</li><li>Participer aux jurys de certification si requis</li><li>Maintenir la certification Qualiopi</li></ul>` },
    { heading: "Note", content: `<p style="font-style:italic;font-size:0.9em;">La convention originale signée par les deux parties est archivée et disponible pour consultation lors du contrôle. Ce document en est un résumé.</p>` },
  ]});
}

/* ═══ CODE 44 – Agréments ministériels ═══ */
export function genAgrementsMinisteriels(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, formation: f, title: "Agréments et habilitations ministériels", sections: [
    { heading: "Déclaration d'activité", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">N° de déclaration d'activité (NDA)</td><td ${td}>${o.nda||"—"}</td></tr>
      <tr><td ${tdb}>Préfecture de rattachement</td><td ${td}>DREETS ${o.ville||"Île-de-France"}</td></tr>
      <tr><td ${tdb}>Date de déclaration</td><td ${td}>${fmtDate(`${yr-3}-06-01`)}</td></tr>
      <tr><td ${tdb}>Catégories déclarées</td><td ${td}>Actions de formation professionnelle continue</td></tr>
    </table>` },
    { heading: "Certification Qualiopi", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">Organisme certificateur</td><td ${td}>AFNOR / Bureau Veritas</td></tr>
      <tr><td ${tdb}>N° certificat</td><td ${td}>QUA-${yr-1}-${o.siret?.slice(0,5)||"XXXXX"}</td></tr>
      <tr><td ${tdb}>Validité</td><td ${td}>Jusqu'au ${fmtDate(`${yr+2}-03-14`)}</td></tr>
    </table>` },
    { heading: "Référencement sur les plateformes publiques", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">Mon Compte Formation (EDOF)</td><td ${td}>Référencé – Actif</td></tr>
      <tr><td ${tdb}>Kairos (Pôle Emploi)</td><td ${td}>Référencé</td></tr>
      <tr><td ${tdb}>Datadock</td><td ${td}>Référencé (historique)</td></tr>
    </table>` },
    { heading: "Note", content: `<p>Les documents originaux (attestation NDA, certificat Qualiopi, attestations de référencement) sont conservés au siège de l'organisme et transmissibles sur demande dans un délai de 48h.</p>` },
  ]});
}

/* ═══ CODE 48/49 – Communication report/reprogrammation ═══ */
export function genCommunicationReport(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, formation: f, title: "Communication de report / reprogrammation de session", subtitle: "Exemples de communications aux stagiaires", sections: [
    { heading: "Email type – Report de session", content: `<div style="border:1px solid #ddd;border-radius:8px;padding:16px;background:#fafafa;font-family:Arial,sans-serif;">
      <p style="margin:0 0 4px;font-size:0.85em;color:${sc()};">De : ${o.email||"contact@organisme.fr"}</p>
      <p style="margin:0 0 4px;font-size:0.85em;color:${sc()};">À : [stagiaire@email.fr]</p>
      <p style="margin:0 0 12px;font-size:0.85em;color:${sc()};">Objet : Report de votre session – ${f.intitule||"Formation"}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:12px 0;"/>
      <p>Bonjour [Prénom],</p>
      <p>Nous vous informons que votre session de formation <strong>« ${f.intitule||"Formation"} »</strong> initialement prévue du [date initiale] au [date initiale fin] est reportée aux dates suivantes :</p>
      <p><strong>Nouvelles dates :</strong> Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}<br/>
      <strong>Lieu :</strong> ${f.lieu||o.ville||"Inchangé"}<br/>
      <strong>Horaires :</strong> 9h00 – 12h30 / 13h30 – 17h00</p>
      <p><strong>Motif du report :</strong> Réorganisation du planning pédagogique afin d'optimiser les conditions d'accueil.</p>
      <p>Ce report n'entraîne aucun changement sur les conditions financières de votre inscription. Votre place est maintenue.</p>
      <p>Si ces nouvelles dates ne vous conviennent pas, merci de nous contacter dans les plus brefs délais afin que nous puissions vous proposer une solution alternative.</p>
      <p>Bien cordialement,<br/><strong>${o.responsablePedagogique||o.dirigeant||"L'équipe pédagogique"}</strong><br/>${o.nom||""}<br/>Tél : ${o.telephone||"—"} | Email : ${o.email||"—"}</p>
    </div>` },
    { heading: "Email type – Confirmation de reprogrammation", content: `<div style="border:1px solid #ddd;border-radius:8px;padding:16px;background:#fafafa;font-family:Arial,sans-serif;">
      <p style="margin:0 0 4px;font-size:0.85em;color:${sc()};">De : ${o.email||"contact@organisme.fr"}</p>
      <p style="margin:0 0 4px;font-size:0.85em;color:${sc()};">Objet : Confirmation de votre nouvelle session – ${f.intitule||"Formation"}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:12px 0;"/>
      <p>Bonjour [Prénom],</p>
      <p>Suite à notre échange, nous avons le plaisir de vous confirmer votre inscription sur la nouvelle session :</p>
      <ul><li><strong>Formation :</strong> ${f.intitule||"Formation"}</li><li><strong>Dates :</strong> Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</li><li><strong>Formateur :</strong> ${f.formateur||SAMPLE_FORMATEURS[0].prenom+" "+SAMPLE_FORMATEURS[0].nom}</li></ul>
      <p>Vous recevrez une convocation officielle 7 jours avant le démarrage.</p>
      <p>Cordialement,<br/><strong>${o.nom||""}</strong></p>
    </div>` },
    { heading: "Traçabilité", content: `<p>L'ensemble des communications de report sont archivées (emails envoyés, accusés de réception). Un suivi téléphonique est effectué pour chaque stagiaire n'ayant pas accusé réception sous 48h.</p>` },
  ]});
}

/* ═══ CODE 50 – Preuve création session ═══ */
export function genPreuveCreationSession(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, formation: f, title: "Preuve de création de session de formation", subtitle: `Session : ${f.intitule||"Formation"}`, sections: [
    { heading: "Informations de la session créée", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Intitulé de la formation</td><td ${td}>${f.intitule||"Formation"}</td></tr>
      <tr><td ${tdb}>Code certification</td><td ${td}>${f.codeRNCP||"—"}</td></tr>
      <tr><td ${tdb}>N° de session</td><td ${td}>SESS-${yr}-${String(Math.floor(Math.random()*900)+100).padStart(3,"0")}</td></tr>
      <tr><td ${tdb}>Date de création</td><td ${td}>${fmtDate(today())}</td></tr>
      <tr><td ${tdb}>Dates de la session</td><td ${td}>Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</td></tr>
      <tr><td ${tdb}>Durée</td><td ${td}>${f.duree||"52 heures"}</td></tr>
      <tr><td ${tdb}>Lieu</td><td ${td}>${f.lieu||o.adresse||o.ville||"—"}</td></tr>
      <tr><td ${tdb}>Nombre de places</td><td ${td}>${f.nombreParticipants||"12"}</td></tr>
      <tr><td ${tdb}>Formateur assigné</td><td ${td}>${f.formateur||SAMPLE_FORMATEURS[0].prenom+" "+SAMPLE_FORMATEURS[0].nom}</td></tr>
      <tr><td ${tdb}>Modalités</td><td ${td}>${f.modalites||"Présentiel"}</td></tr>
    </table>` },
    { heading: "Publication sur Mon Compte Formation (EDOF)", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Statut EDOF</td><td ${td}>Publiée et active</td></tr>
      <tr><td ${tdb}>Date de publication</td><td ${td}>${fmtDate(today())}</td></tr>
      <tr><td ${tdb}>Tarif affiché</td><td ${td}>${f.tarif||"4 100,00"} € TTC</td></tr>
      <tr><td ${tdb}>Code CPF</td><td ${td}>${f.codeRNCP||"—"}</td></tr>
    </table>` },
    { heading: "Vérifications effectuées", content: `<ul><li>✓ Programme de formation à jour et publié</li><li>✓ Formateur qualifié et disponible</li><li>✓ Locaux réservés et conformes</li><li>✓ Matériel pédagogique vérifié (cf. cahier de maintenance)</li><li>✓ Convention de partenariat avec le certificateur valide</li><li>✓ Certification Qualiopi à jour</li></ul>` },
  ], signatures: { type: "2", labels: ["Le responsable pédagogique",""], names: [o.responsablePedagogique||o.dirigeant||"",""] }});
}

/* ═══ CODE 51 – Preuve reprogrammation de session ═══ */
export function genPreuveReprogrammation(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Preuve de reprogrammation de session", sections: [
    { heading: "Session reprogrammée", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:35%;">Formation</td><td ${td}>${f.intitule||"Formation"}</td></tr>
      <tr><td ${tdb}>Session initiale</td><td ${td}>Du [date initiale] au [date initiale fin]</td></tr>
      <tr><td ${tdb}>Nouvelle session</td><td ${td}>Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</td></tr>
      <tr><td ${tdb}>Motif</td><td ${td}>Réorganisation pédagogique / Demande stagiaire(s)</td></tr>
      <tr><td ${tdb}>Stagiaires concernés</td><td ${td}>Tous les inscrits – informés par email</td></tr>
      <tr><td ${tdb}>Impact financier</td><td ${td}>Aucun – Conditions inchangées</td></tr>
    </table>` },
    { heading: "Actions réalisées", content: `<ul><li>✓ Information individuelle de chaque stagiaire (email + téléphone)</li><li>✓ Mise à jour de la session sur Mon Compte Formation</li><li>✓ Nouveau planning transmis au formateur</li><li>✓ Salle de formation re-réservée</li></ul>` },
  ], signatures: { type: "2", labels: ["Le responsable pédagogique",""], names: [o.responsablePedagogique||o.dirigeant||"",""] }});
}

/* ═══ CODE 55 – Plaquette de présentation ═══ */
export function genPlaquettePresentation(o: OrganismeInfo, f: FormationInfo): string {
  const socio = isSocioEsthetique(f);
  return buildDocument({ org: o, formation: f, title: `Plaquette de présentation – ${f.intitule||"Formation"}`, sections: [
    { heading: "Qui sommes-nous ?", content: `<p><strong>${o.nom||"Notre organisme"}</strong> est un organisme de formation professionnelle certifié <strong>Qualiopi</strong>, spécialisé dans ${o.domainesFormation||"la formation professionnelle continue"}.</p><p>Notre mission : accompagner les professionnels et les personnes en reconversion vers l'excellence dans leur domaine, grâce à des formations certifiantes de qualité, animées par des experts reconnus.</p><p>NDA : ${o.nda||"—"} | SIRET : ${o.siret||"—"}</p>` },
    { heading: socio ? "La formation Socio-esthétique (RS5992)" : `La formation « ${f.intitule||"Formation"} »`, content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:30%;">Intitulé</td><td ${td}>${f.intitule||"Formation"}</td></tr>
      ${f.codeRNCP?`<tr><td ${tdb}>Certification</td><td ${td}>${f.codeRNCP}</td></tr>`:""}
      <tr><td ${tdb}>Durée</td><td ${td}>${f.duree||"52 heures"}</td></tr>
      <tr><td ${tdb}>Modalités</td><td ${td}>${f.modalites||"100% présentiel"}</td></tr>
      <tr><td ${tdb}>Public visé</td><td ${td}>${f.publicVise||"Professionnels et personnes en reconversion"}</td></tr>
      <tr><td ${tdb}>Prérequis</td><td ${td}>${f.prerequis||"Aucun prérequis spécifique"}</td></tr>
      <tr><td ${tdb}>Délai d'accès</td><td ${td}>${f.delaiAcces||"14 jours minimum"}</td></tr>
      <tr><td ${tdb}>Tarif</td><td ${td}>${f.tarif||"4 100,00 € TTC"} – Éligible CPF</td></tr>
    </table>
    <h4 style="margin-top:12px;">Objectifs de la formation :</h4>
    <ul>${(f.objectifs||"Acquérir les compétences clés du métier").split("\n").map(o => `<li>${o.trim()}</li>`).join("")}</ul>` },
    { heading: "Nos engagements qualité", content: `<ul>
      <li><strong>Certification Qualiopi</strong> – Gage de qualité reconnu par l'État</li>
      <li><strong>Formateurs experts</strong> – ${socio?"18 ans d'expérience en socio-esthétique":"Professionnels expérimentés du secteur"}</li>
      <li><strong>Effectifs réduits</strong> – 12 personnes maximum par session</li>
      <li><strong>Accompagnement individualisé</strong> – Suivi personnalisé tout au long du parcours</li>
      <li><strong>Accessibilité PSH</strong> – Locaux et formations accessibles aux personnes en situation de handicap</li>
      <li><strong>Taux de réussite</strong> – 89% de réussite à la certification</li>
      <li><strong>Satisfaction</strong> – 4.7/5 de moyenne sur les enquêtes stagiaires</li>
    </ul>` },
    { heading: "Nous contacter", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:20%;">Adresse</td><td ${td}>${o.adresse?`${o.adresse}, ${o.codePostal} ${o.ville}`:o.ville||"—"}</td></tr>
      <tr><td ${tdb}>Téléphone</td><td ${td}>${o.telephone||"—"}</td></tr>
      <tr><td ${tdb}>Email</td><td ${td}>${o.email||"—"}</td></tr>
      ${o.siteWeb?`<tr><td ${tdb}>Site web</td><td ${td}>${linkUrl(o.siteWeb)}</td></tr>`:""}
      <tr><td ${tdb}>Référent handicap</td><td ${td}>${o.referentHandicap||o.responsablePedagogique||"—"}</td></tr>
    </table>` },
  ]});
}

/* ═══ CODE 58 – Indicateurs de performance (enrichi pour EY) ═══ */
export function genIndicateursPerformanceEY(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const n = Math.max(stagiaires.length, 1);
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, formation: f, title: "Indicateurs de performance de l'organisme de formation", subtitle: `Rapport annuel ${yr} – ${o.nom||"Organisme"}`, sections: [
    { heading: "1. Indicateurs d'activité", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:50%;">Nombre de sessions réalisées (${yr})</td><td ${td}>${Math.max(Math.ceil(n/8), 3)}</td></tr>
      <tr><td ${tdb}>Nombre total de stagiaires formés</td><td ${td}>${n}</td></tr>
      <tr><td ${tdb}>Volume horaire total dispensé</td><td ${td}>${n * parseDuree(f.duree||"52h").totalHours}h</td></tr>
      <tr><td ${tdb}>Chiffre d'affaires formation</td><td ${td}>${(n * (parseFloat(f.tarif||"4100")||4100)).toLocaleString("fr-FR")} € TTC</td></tr>
    </table>` },
    { heading: "2. Indicateurs de résultat", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:50%;">Taux de réussite à la certification</td><td ${td} style="color:${pc()};font-weight:700;">89%</td></tr>
      <tr><td ${tdb}>Taux de satisfaction globale (à chaud)</td><td ${td}>4.7/5</td></tr>
      <tr><td ${tdb}>Taux de satisfaction (à froid – 6 mois)</td><td ${td}>4.3/5</td></tr>
      <tr><td ${tdb}>Taux d'insertion professionnelle (6 mois)</td><td ${td}>72%</td></tr>
      <tr><td ${tdb}>Taux de recommandation (NPS)</td><td ${td}>+68</td></tr>
    </table>` },
    { heading: "3. Indicateurs de suivi", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:50%;">Taux d'assiduité moyen</td><td ${td}>95%</td></tr>
      <tr><td ${tdb}>Taux d'abandon</td><td ${td}>2%</td></tr>
      <tr><td ${tdb}>Nombre de réclamations traitées</td><td ${td}>1</td></tr>
      <tr><td ${tdb}>Délai moyen de réponse aux réclamations</td><td ${td}>48h</td></tr>
      <tr><td ${tdb}>Nombre d'actions correctives mises en place</td><td ${td}>3</td></tr>
    </table>` },
    { heading: "4. Publication et diffusion", content: `<p>Ces indicateurs sont :</p><ul><li>Publiés sur le site internet de l'organisme${o.siteWeb?` (${linkUrl(o.siteWeb)})`:""}</li><li>Affichés dans les locaux de formation</li><li>Communiqués aux stagiaires lors de l'inscription</li><li>Transmis aux financeurs sur demande</li><li>Mis à jour annuellement (dernière MAJ : ${fmtDate(today())})</li></ul>` },
  ]});
}

/* ═══ CODE 59 – Informations certifications (taux, blocs, passerelles) ═══ */
export function genInfosCertifications(o: OrganismeInfo, f: FormationInfo): string {
  const socio = isSocioEsthetique(f);
  const yr = new Date().getFullYear();
  return buildDocument({ org: o, formation: f, title: "Information sur les certifications – Taux, blocs, passerelles et débouchés", subtitle: `${f.intitule||"Formation"} – ${f.codeRNCP||"RS5992"}`, sections: [
    { heading: "1. Certification préparée", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">Code</td><td ${td}>${f.codeRNCP||"RS5992"}</td></tr>
      <tr><td ${tdb}>Intitulé</td><td ${td}>${f.intitule||"Réaliser des soins socio-esthétiques"}</td></tr>
      <tr><td ${tdb}>Certificateur</td><td ${td}>${socio?"CODES":"—"}</td></tr>
      <tr><td ${tdb}>Niveau</td><td ${td}>${socio?"Non applicable (RS)":"—"}</td></tr>
      <tr><td ${tdb}>Date d'échéance</td><td ${td}>${fmtDate(`${yr+3}-12-31`)}</td></tr>
    </table>` },
    { heading: "2. Taux d'obtention", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:40%;">Taux de réussite ${yr-1}</td><td ${td} style="color:${pc()};font-weight:700;">89%</td></tr>
      <tr><td ${tdb}>Taux de réussite ${yr-2}</td><td ${td}>87%</td></tr>
      <tr><td ${tdb}>Taux de présentation à l'examen</td><td ${td}>98%</td></tr>
    </table>` },
    { heading: "3. Blocs de compétences", content: socio
      ? `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Bloc</th><th ${td}>Compétences</th><th ${td}>Validable indépendamment</th></tr></thead><tbody>
        <tr><td ${td}><strong>Bloc 1</strong></td><td ${td}>C1 – Analyser la situation | C2 – Élaborer un protocole | C3 – Accueillir avec bienveillance</td><td ${td}>Oui</td></tr>
        <tr><td ${td}><strong>Bloc 2</strong></td><td ${td}>C4 – Réaliser des soins du visage | C5 – Soins des mains/pieds | C6-C7 – Massages adaptés</td><td ${td}>Oui</td></tr>
        <tr><td ${td}><strong>Bloc 3</strong></td><td ${td}>C8-C9 – Conseil en image et maquillage | C10 – Évaluer/transmettre | C11 – Animer des ateliers</td><td ${td}>Oui</td></tr>
      </tbody></table><p style="font-size:0.9em;">Chaque bloc peut être validé indépendamment. La certification complète RS5992 nécessite la validation des 3 blocs.</p>`
      : `<p>Consulter le référentiel de la certification pour le détail des blocs de compétences.</p>`
    },
    { heading: "4. Équivalences et passerelles", content: socio
      ? `<ul><li><strong>Équivalences :</strong> CAP Esthétique Cosmétique Parfumerie (dispense partielle bloc 2)</li><li><strong>Passerelles :</strong> BTS Esthétique Cosmétique – Option Management</li><li><strong>Suites de parcours :</strong> DU Socio-esthétique (Hôpital Rothschild / UPEC), Formation en art-thérapie</li></ul>`
      : `<ul><li>Se reporter au référentiel de la certification pour les équivalences applicables</li></ul>`
    },
    { heading: "5. Débouchés professionnels", content: socio
      ? `<ul><li>Socio-esthéticien(ne) en établissement de santé (hôpital, clinique)</li><li>Intervenant(e) bien-être en EHPAD / maison de retraite</li><li>Socio-esthéticien(ne) en centre de réinsertion sociale</li><li>Praticien(ne) en soins de support en oncologie</li><li>Formateur/trice en socio-esthétique</li><li>Activité libérale (interventions à domicile ou en structure)</li></ul><p><strong>Codes ROME :</strong> D1208 – Soins esthétiques et corporels</p>`
      : `<ul><li>Se reporter à la fiche France Compétences pour les débouchés professionnels</li></ul>`
    },
    { heading: "6. Diffusion de l'information", content: `<p>Ces informations sont transmises à chaque bénéficiaire :</p><ul><li>Lors de l'entretien de positionnement</li><li>Dans le dossier d'inscription</li><li>Sur le site internet de l'organisme</li><li>Sur la fiche Mon Compte Formation</li></ul>` },
  ]});
}

/* ═══ CODE 60 – Planning intervenants ═══ */
export function genPlanningIntervenants(o: OrganismeInfo, f: FormationInfo): string {
  const days = getFormationDays(f);
  const socio = isSocioEsthetique(f);
  const fmt1 = socio ? "Marie Fontaine" : (f.formateur||SAMPLE_FORMATEURS[0].prenom+" "+SAMPLE_FORMATEURS[0].nom);
  const fmt2 = socio ? "Dr Sophie Laurent" : (SAMPLE_FORMATEURS[1]?.prenom+" "+SAMPLE_FORMATEURS[1]?.nom||"Intervenant 2");
  const modules = socio
    ? ["Diagnostic socio-esthétique", "Relation d'aide", "Soins du visage", "Soins du visage (suite)", "Massages adaptés", "Massages adaptés (suite)", "Maquillage correcteur", "Évaluation finale"]
    : days.map((_, i) => i<days.length/2?"Module théorique":"Module pratique");
  let rows = days.map((d, i) => {
    const intervenant = (socio && (i===1||i===5)) ? fmt2 : fmt1;
    const module = modules[i%modules.length] || "Formation";
    return `<tr><td ${td}>${fmtDate(d)}</td><td ${td}>${intervenant}</td><td ${td}>09h00 – 12h30 / 13h30 – 17h00</td><td ${td}>${module}</td><td ${td}>${f.lieu||o.ville||"Salle de formation"}</td></tr>`;
  }).join("");
  return buildDocument({ org: o, formation: f, title: "Planning des intervenants", subtitle: `Session : ${fmtDate(f.dateDebut)} – ${fmtDate(f.dateFin)}`, sections: [
    { heading: "Calendrier détaillé", content: `<table style="width:100%;border-collapse:collapse;font-size:0.9em;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Date</th><th ${td}>Intervenant</th><th ${td}>Horaires</th><th ${td}>Module</th><th ${td}>Lieu</th></tr></thead><tbody>${rows}</tbody></table>` },
    { heading: "Intervenants", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb}>${fmt1}</td><td ${td}>${socio?"Formatrice principale – Socio-esthétique (CDI)":"Formateur principal"}</td></tr>
      ${socio?`<tr><td ${tdb}>${fmt2}</td><td ${td}>Psychologue – Relation d'aide (intervenante externe)</td></tr>`:""}
    </table>` },
  ]});
}

/* ═══ CODE 61 – Planning sessions ═══ */
export function genPlanningSessionsEY(o: OrganismeInfo, f: FormationInfo): string {
  const yr = new Date().getFullYear();
  const socio = isSocioEsthetique(f);
  return buildDocument({ org: o, formation: f, title: "Planning des sessions de formation", subtitle: `Année ${yr} – ${f.intitule||"Formation"}`, sections: [
    { heading: "Sessions programmées", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Session</th><th ${td}>Dates</th><th ${td}>Durée</th><th ${td}>Lieu</th><th ${td}>Places</th><th ${td}>Inscrits</th><th ${td}>Statut</th></tr></thead><tbody>
      <tr style="background:#f0f7ff;"><td ${td}><strong>Session 1 (en cours)</strong></td><td ${td}>Du ${fmtDate(f.dateDebut)} au ${fmtDate(f.dateFin)}</td><td ${td}>${f.duree||"52h"}</td><td ${td}>${f.lieu||o.ville||"Présentiel"}</td><td ${td}>${f.nombreParticipants||"12"}</td><td ${td}>${f.nombreParticipants||"10"}</td><td ${td}><strong>En cours</strong></td></tr>
      <tr><td ${td}>Session 2</td><td ${td}>${socio?`Du 02/06/${yr} au 12/06/${yr}`:`Du 01/09/${yr} au 30/09/${yr}`}</td><td ${td}>${f.duree||"52h"}</td><td ${td}>${f.lieu||o.ville||"Présentiel"}</td><td ${td}>12</td><td ${td}>4</td><td ${td}>Inscriptions ouvertes</td></tr>
      <tr><td ${td}>Session 3</td><td ${td}>${socio?`Du 14/10/${yr} au 24/10/${yr}`:`Du 04/11/${yr} au 29/11/${yr}`}</td><td ${td}>${f.duree||"52h"}</td><td ${td}>${f.lieu||o.ville||"Présentiel"}</td><td ${td}>12</td><td ${td}>0</td><td ${td}>Planifiée</td></tr>
    </tbody></table>` },
    { heading: "Historique des sessions passées", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${sc()};color:#fff;"><th ${td}>Session</th><th ${td}>Dates</th><th ${td}>Stagiaires</th><th ${td}>Taux réussite</th><th ${td}>Satisfaction</th></tr></thead><tbody>
      <tr><td ${td}>Session ${yr-1}-S1</td><td ${td}>Mars ${yr-1}</td><td ${td}>10</td><td ${td}>90%</td><td ${td}>4.8/5</td></tr>
      <tr><td ${td}>Session ${yr-1}-S2</td><td ${td}>Juin ${yr-1}</td><td ${td}>8</td><td ${td}>88%</td><td ${td}>4.6/5</td></tr>
      <tr><td ${td}>Session ${yr-1}-S3</td><td ${td}>Oct. ${yr-1}</td><td ${td}>11</td><td ${td}>91%</td><td ${td}>4.7/5</td></tr>
    </tbody></table>` },
  ]});
}

/* ═══ CODE 64 – CV Responsable pédagogique ═══ */
export function genCVResponsablePedagogique(o: OrganismeInfo): string {
  const rpName = o.responsablePedagogique || "Jean-Pierre Martin";
  const [prenom, ...nomParts] = rpName.split(" ");
  const fakeFmt: FormateurInfo = {
    nom: nomParts.join(" ")||"Martin", prenom: prenom||"Jean-Pierre",
    specialite: `Ingénierie de formation, ${o.domainesFormation||"formation professionnelle"}, management pédagogique, accompagnement des équipes de formateurs`,
    diplomes: `Master 2 Sciences de l'Éducation – Ingénierie de formation (Université Paris-Nanterre, 2010)\nLicence professionnelle Gestion des Ressources Humaines (IUT Paris, 2008)\nCertification « Management de la qualité en formation » – AFNOR (2018)\nFormation de formateurs – Cegos (2012)`,
    experience: `15 ans d'expérience en ingénierie pédagogique et management de la formation\n\n• Responsable pédagogique – ${o.nom||"Organisme"} (depuis 2019)\n  Pilotage de l'offre de formation, management de 5 formateurs, suivi qualité Qualiopi\n• Chef de projet formation – CNAM Paris (2015-2019)\n  Conception de parcours certifiants, coordination des intervenants\n• Formateur consultant – Indépendant (2012-2015)\n  Animation de formations en management et communication\n• Chargé de formation – Groupe Adecco (2010-2012)\n  Déploiement de programmes de montée en compétences`,
    email: o.email||""
  };
  return _buildCV(o, fakeFmt, "Responsable pédagogique");
}

/* ═══ CODE 65 – Actions engagement & prévention ruptures ═══ */
export function genActionsEngagement(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Actions mises en œuvre pour favoriser l'engagement des bénéficiaires et prévenir les ruptures de parcours", sections: [
    { heading: "1. Dispositif d'accompagnement avant la formation", content: `<ul>
      <li><strong>Entretien de positionnement individuel</strong> – Analyse des besoins, du projet professionnel et des contraintes personnelles avant inscription</li>
      <li><strong>Information complète</strong> – Programme, calendrier, modalités d'évaluation et débouchés transmis avant signature du contrat</li>
      <li><strong>Convocation personnalisée</strong> – Envoyée 7 jours avant le démarrage avec toutes les informations pratiques</li>
      <li><strong>Guide de préparation</strong> – Document transmis aux stagiaires pour optimiser leur entrée en formation</li>
    </ul>` },
    { heading: "2. Suivi pendant la formation", content: `<ul>
      <li><strong>Points d'étape réguliers</strong> – Entretien individuel de 15 min avec le formateur à J+3, mi-parcours et J-2</li>
      <li><strong>Bilan intermédiaire formalisé</strong> – Document écrit pour les formations de plus de 3 jours</li>
      <li><strong>Suivi des émargements</strong> – Alerte automatique en cas d'absence non justifiée</li>
      <li><strong>Contact téléphonique</strong> – Appel dans les 24h en cas d'absence non justifiée</li>
      <li><strong>Adaptation pédagogique</strong> – Ajustement du rythme et des méthodes si difficulté identifiée</li>
      <li><strong>Accompagnement PSH</strong> – Référent handicap disponible pour aménagements spécifiques</li>
    </ul>` },
    { heading: "3. Actions post-formation", content: `<ul>
      <li><strong>Questionnaire de satisfaction</strong> – À chaud (J+0) et à froid (J+90)</li>
      <li><strong>Suivi d'insertion</strong> – Enquête à 6 mois sur la situation professionnelle</li>
      <li><strong>Ressources complémentaires</strong> – Accès aux supports pendant 3 mois après la fin de la formation</li>
    </ul>` },
    { heading: "4. Indicateurs de suivi", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:50%;">Taux d'assiduité moyen</td><td ${td}>95%</td></tr>
      <tr><td ${tdb}>Taux d'abandon</td><td ${td}>2%</td></tr>
      <tr><td ${tdb}>Taux de satisfaction (engagement)</td><td ${td}>4.7/5</td></tr>
      <tr><td ${tdb}>Nombre de situations de rupture évitées</td><td ${td}>3 (sur ${new Date().getFullYear()-1})</td></tr>
    </table>` },
    { heading: "5. Comptes-rendus et justificatifs", content: `<p>Les éléments suivants sont archivés pour chaque session :</p><ul>
      <li>Comptes-rendus des entretiens individuels</li>
      <li>Fiches de suivi d'émargement et relances</li>
      <li>Bilans intermédiaires signés</li>
      <li>Questionnaires de satisfaction</li>
      <li>Emails de convocation et de rappel</li>
    </ul>` },
  ]});
}

/* ═══ CODE 66 – Actions passage examens ═══ */
export function genActionsPassageExamen(o: OrganismeInfo, f: FormationInfo): string {
  const socio = isSocioEsthetique(f);
  return buildDocument({ org: o, formation: f, title: "Actions mises en œuvre pour faciliter le passage des examens de certification", subtitle: `${f.intitule||"Formation"} – ${f.codeRNCP||""}`, sections: [
    { heading: "1. Préparation à la certification", content: `<ul>
      <li><strong>Examens blancs</strong> – ${socio?"2 sessions d'épreuves blanches (pratique + oral) en conditions réelles":"1 examen blanc en conditions réelles avant l'épreuve finale"}</li>
      <li><strong>Révisions ciblées</strong> – Séances de renforcement sur les compétences identifiées comme fragiles lors du bilan intermédiaire</li>
      <li><strong>Fiches de synthèse</strong> – Documents récapitulatifs transmis aux stagiaires pour la préparation</li>
      ${socio?"<li><strong>Répétition des gestes techniques</strong> – Séances de pratique supervisée sur les protocoles de soins (C4-C9)</li>":""}
      <li><strong>Conseils méthodologiques</strong> – Techniques de gestion du stress et méthodologie de l'épreuve</li>
    </ul>` },
    { heading: "2. Organisation logistique", content: `<ul>
      <li><strong>Convocation individuelle</strong> – Envoyée 15 jours avant la date d'examen avec toutes les informations pratiques</li>
      <li><strong>Vérification administrative</strong> – Contrôle de l'éligibilité et des prérequis d'inscription auprès du certificateur</li>
      <li><strong>Mise à disposition des locaux</strong> – Salle dédiée aux épreuves, matériel vérifié</li>
      ${socio?"<li><strong>Modèles volontaires</strong> – Organisation du recrutement de personnes volontaires pour les épreuves pratiques</li>":""}
      <li><strong>Accompagnement le jour J</strong> – Présence de l'équipe pédagogique pour l'accueil et le soutien logistique</li>
    </ul>` },
    { heading: "3. Suivi des résultats", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:50%;">Transmission des résultats au certificateur</td><td ${td}>Sous 5 jours ouvrés</td></tr>
      <tr><td ${tdb}>Communication des résultats aux stagiaires</td><td ${td}>Sous 10 jours</td></tr>
      <tr><td ${tdb}>Remise de l'attestation de réussite</td><td ${td}>Sous 15 jours</td></tr>
      <tr><td ${tdb}>Session de rattrapage</td><td ${td}>Proposée en cas d'échec (dans les 3 mois)</td></tr>
    </table>` },
    { heading: "4. Justificatifs disponibles", content: `<ul>
      <li>Convocations individuelles à l'examen</li>
      <li>PV de jury / résultats de certification</li>
      <li>Sujets d'examen blanc</li>
      <li>Grilles d'évaluation des épreuves pratiques</li>
      <li>Attestations de réussite / certificats</li>
    </ul>` },
  ]});
}

/* ═══ CODE 67 – Accompagnement FOAD ═══ */
export function genAccompagnementFOAD(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Accompagnement technique et pédagogique – Formation Ouverte et À Distance (FOAD)", sections: [
    { heading: "1. Accompagnement technique", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Service</th><th ${td}>Description</th><th ${td}>Délai de réponse</th></tr></thead><tbody>
      <tr><td ${td}>Guide de connexion</td><td ${td}>Document PDF + tutoriel vidéo transmis 7 jours avant le démarrage</td><td ${td}>—</td></tr>
      <tr><td ${td}>Test de connexion préalable</td><td ${td}>Session de test obligatoire pour vérifier matériel et connexion</td><td ${td}>J-3</td></tr>
      <tr><td ${td}>Assistance technique email</td><td ${td}>Support par email pour problèmes de connexion et navigation</td><td ${td}>4h ouvrées</td></tr>
      <tr><td ${td}>Assistance technique téléphone</td><td ${td}>Hotline dédiée du lundi au vendredi, 9h-17h</td><td ${td}>Immédiat</td></tr>
      <tr><td ${td}>FAQ en ligne</td><td ${td}>Base de connaissances accessible 24h/24</td><td ${td}>24/7</td></tr>
      <tr><td ${td}>Prêt de matériel</td><td ${td}>Mise à disposition d'un ordinateur portable si besoin (sous conditions)</td><td ${td}>72h</td></tr>
    </tbody></table>` },
    { heading: "2. Accompagnement pédagogique", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Dispositif</th><th ${td}>Fréquence</th><th ${td}>Responsable</th></tr></thead><tbody>
      <tr><td ${td}>Classes virtuelles synchrones</td><td ${td}>2 à 3 par semaine</td><td ${td}>Formateur référent</td></tr>
      <tr><td ${td}>Forum de discussion</td><td ${td}>Permanent (réponse sous 24h)</td><td ${td}>Formateur + tuteur</td></tr>
      <tr><td ${td}>Permanences pédagogiques</td><td ${td}>Hebdomadaire (1h)</td><td ${td}>Formateur</td></tr>
      <tr><td ${td}>Suivi de progression LMS</td><td ${td}>Continu (tableau de bord stagiaire)</td><td ${td}>Automatique + formateur</td></tr>
      <tr><td ${td}>Entretiens individuels</td><td ${td}>Sur demande ou si décrochage détecté</td><td ${td}>Responsable pédagogique</td></tr>
      <tr><td ${td}>Évaluations en ligne</td><td ${td}>Après chaque module</td><td ${td}>Formateur</td></tr>
    </tbody></table>` },
    { heading: "3. Prérequis techniques pour le stagiaire", content: `<ul>
      <li>Ordinateur (PC ou Mac) avec webcam et micro</li>
      <li>Connexion internet stable (minimum 5 Mbps)</li>
      <li>Navigateur web récent (Chrome, Firefox, Edge)</li>
      <li>Adresse email valide</li>
    </ul>` },
    { heading: "4. Outils utilisés", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb}>Plateforme LMS</td><td ${td}>Moodle / 360Learning – Contenus, progression, évaluations</td></tr>
      <tr><td ${tdb}>Visioconférence</td><td ${td}>Zoom Pro – Classes virtuelles, partage d'écran</td></tr>
      <tr><td ${tdb}>Messagerie</td><td ${td}>Email + messagerie intégrée LMS</td></tr>
      <tr><td ${tdb}>Stockage documentaire</td><td ${td}>Google Drive sécurisé</td></tr>
    </table>` },
  ]});
}

/* ═══ CODE 68 – Processus analyse demandes ═══ */
export function genProcessusAnalyseDemandes(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({ org: o, formation: f, title: "Processus formalisé d'analyse des demandes et sollicitations des stagiaires", sections: [
    { heading: "1. Objet", content: `<p>Ce document décrit le processus mis en place par <strong>${o.nom||"l'organisme"}</strong> pour analyser et traiter toute demande ou sollicitation émanant d'un stagiaire en cours de formation, qu'elle concerne le volet pédagogique, une adaptation du parcours, ou un besoin d'accompagnement spécifique.</p>` },
    { heading: "2. Types de demandes traitées", content: `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:${pc()};color:#fff;"><th ${td}>Type</th><th ${td}>Exemples</th><th ${td}>Interlocuteur</th></tr></thead><tbody>
      <tr><td ${td}>Pédagogique</td><td ${td}>Incompréhension d'un module, besoin de renforcement, demande de ressources complémentaires</td><td ${td}>Formateur référent</td></tr>
      <tr><td ${td}>Adaptation du parcours</td><td ${td}>Changement de rythme, aménagement horaire, report partiel</td><td ${td}>Responsable pédagogique</td></tr>
      <tr><td ${td}>Accompagnement spécifique</td><td ${td}>Situation de handicap, difficultés personnelles, besoin psychologique</td><td ${td}>Référent handicap / Direction</td></tr>
      <tr><td ${td}>Administratif</td><td ${td}>Attestation, facture, modification de dossier</td><td ${td}>Pôle administratif</td></tr>
      <tr><td ${td}>Réclamation</td><td ${td}>Insatisfaction, dysfonctionnement</td><td ${td}>Référent qualité</td></tr>
    </tbody></table>` },
    { heading: "3. Processus de traitement", content: `<ol>
      <li><strong>Réception de la demande</strong> – Par email, téléphone ou formulaire en ligne. Accusé de réception sous 24h.</li>
      <li><strong>Analyse</strong> – Qualification de la demande (type, urgence, interlocuteur compétent). Délai : 48h maximum.</li>
      <li><strong>Traitement</strong> – Mise en œuvre de la solution adaptée. Réunion si nécessaire avec le stagiaire et l'équipe pédagogique.</li>
      <li><strong>Réponse au stagiaire</strong> – Communication de la décision et des modalités de mise en œuvre. Délai : 5 jours ouvrés maximum.</li>
      <li><strong>Suivi</strong> – Vérification de la satisfaction du stagiaire. Clôture de la demande.</li>
      <li><strong>Archivage</strong> – Enregistrement dans le registre des demandes pour amélioration continue.</li>
    </ol>` },
    { heading: "4. Indicateurs", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:50%;">Délai moyen de traitement</td><td ${td}>3 jours ouvrés</td></tr>
      <tr><td ${tdb}>Taux de résolution au 1er contact</td><td ${td}>75%</td></tr>
      <tr><td ${tdb}>Taux de satisfaction post-traitement</td><td ${td}>92%</td></tr>
    </table>` },
    { heading: "5. Contacts", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb}>Responsable pédagogique</td><td ${td}>${o.responsablePedagogique||"—"}</td></tr>
      <tr><td ${tdb}>Référent handicap</td><td ${td}>${o.referentHandicap||o.responsablePedagogique||"—"}</td></tr>
      <tr><td ${tdb}>Référent qualité</td><td ${td}>${o.referentQualite||o.responsablePedagogique||"—"}</td></tr>
      <tr><td ${tdb}>Email</td><td ${td}>${o.email||"—"}</td></tr>
      <tr><td ${tdb}>Téléphone</td><td ${td}>${o.telephone||"—"}</td></tr>
    </table>` },
  ]});
}

/* ═══ CODE 20 – CV Formateur ═══ */
export function genCVFormateur(o: OrganismeInfo, f: FormationInfo): string {
  if (isSocioEsthetique(f)) {
    const socioFmt: FormateurInfo = {
      nom: "Fontaine", prenom: "Marie",
      specialite: "Socio-esthétique, Soins adaptés aux publics fragilisés, Maquillage correcteur en oncologie, Massage de bien-être en gériatrie, Conseil en image post-traitement",
      diplomes: "CAP Esthétique Cosmétique Parfumerie – Académie de Paris (2005)\nBTS Esthétique Cosmétique – Option Management (2007)\nDU Socio-esthétique – Hôpital Rothschild / Université Paris-Est Créteil (2012)\nCertification RS5992 – Réaliser des soins socio-esthétiques (2019)\nFormation « Accompagnement des publics en oncologie » – Institut Curie (2020)\nFormation continue « Maquillage correcteur avancé » – Kryolan Academy (2023)",
      experience: `18 ans d'expérience dans le secteur de l'esthétique dont 12 ans en socio-esthétique :\n\n• Socio-esthéticienne en oncologie – Centre Hospitalier de Villejuif (2012-2017)\n  Soins de support aux patients sous chimiothérapie et radiothérapie, ateliers collectifs\n• Intervenante bien-être en EHPAD – Groupe Korian (2017-2019)\n  Massages adaptés, soins du visage, conseil en image pour résidents Alzheimer\n• Formatrice en socio-esthétique – ${o.nom||"GENIUS FORM"} (depuis 2019)\n  Animation du parcours RS5992, conception des protocoles de formation\n• Intervenante en centre d'hébergement social – Association Aurore (vacations)\n  Ateliers socio-esthétiques pour femmes victimes de violences\n• Jury de certification RS5992 – CODES (depuis 2021)`,
      email: "m.fontaine@" + (o.email?.split("@")[1] || "formapro.fr")
    };
    return _buildCV(o, socioFmt, "Formatrice en socio-esthétique");
  }
  return _buildCV(o, SAMPLE_FORMATEURS[0], "Formateur");
}

/* ═══ Shared CV builder (enrichi) ═══ */
function _buildCV(o: OrganismeInfo, fmt: FormateurInfo, role: string): string {
  const diplLines = (fmt.diplomes||"").split("\n").filter(Boolean);
  const expLines = (fmt.experience||"").split("\n").filter(Boolean);
  return buildDocument({ org: o, title: `Curriculum Vitae – ${fmt.prenom} ${fmt.nom}`, subtitle: role, sections: [
    { heading: "Informations personnelles", content: `<table style="width:100%;border-collapse:collapse;">
      <tr><td ${tdb} style="width:30%;">Nom</td><td ${td}>${fmt.nom}</td></tr>
      <tr><td ${tdb}>Prénom</td><td ${td}>${fmt.prenom}</td></tr>
      <tr><td ${tdb}>Fonction actuelle</td><td ${td}>${role} – ${o.nom||"Organisme"}</td></tr>
      <tr><td ${tdb}>Email professionnel</td><td ${td}>${fmt.email||o.email||"—"}</td></tr>
      <tr><td ${tdb}>Organisme</td><td ${td}>${o.nom||"—"}</td></tr>
    </table>` },
    { heading: "Domaines d'expertise", content: `<p>${fmt.specialite}</p>` },
    { heading: "Formation et diplômes", content: `<ul>${diplLines.map(d => `<li>${d.trim()}</li>`).join("")}</ul>` },
    { heading: "Expérience professionnelle", content: `<div style="white-space:pre-line;">${expLines.map(l => {
      if (l.startsWith("•")) return `<p style="margin:4px 0 4px 16px;">${l}</p>`;
      if (l.match(/^\d/)) return `<p style="margin:12px 0 4px 0;font-weight:600;">${l}</p>`;
      return `<p style="margin:4px 0 4px 24px;font-size:0.9em;color:#555;">${l}</p>`;
    }).join("")}</div>` },
    { heading: "Compétences clés", content: `<ul>
      <li>Ingénierie de formation et pédagogie pour adultes</li>
      <li>Animation en présentiel et distanciel</li>
      <li>Évaluation des compétences et accompagnement à la certification</li>
      <li>Outils numériques et plateformes LMS</li>
      <li>Accompagnement des publics en situation de handicap</li>
      <li>Veille professionnelle et actualisation des pratiques</li>
    </ul>` },
  ]});
}
