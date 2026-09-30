import type { VAEData, VAECandidat, VAEOrganisme, VAECertification, VAESession, VAEContents } from "./vaeTypes";

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

function longDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function shortDate(iso: string): string {
  if (!iso) return "…… / …… / ……";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

function esc(s: string | undefined | null): string {
  if (s === undefined || s === null) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function nl2br(s: string): string {
  return esc(s).replace(/\n/g, "<br/>");
}

function cleanGeneratedText(s: string): string {
  return (s || "")
    .replace(/à\s+rédiger(?:\s+avec\s+le\s+candidat)?/gi, "")
    .replace(/à\s+compléter/gi, "")
    .replace(/\.{3,}|…{2,}/g, "")
    .trim();
}

function vaeExperienceSummary(c: VAECandidat): string {
  if (!c.experiences.length) {
    return `${c.emploiActuel || "mon poste"}${c.employeur ? ` chez ${c.employeur}` : ""}`;
  }
  return c.experiences
    .slice(0, 3)
    .map(x => `${x.poste || "poste exercé"} chez ${x.entreprise || "l'employeur"}${x.dateDebut || x.dateFin ? ` (${[x.dateDebut, x.dateFin].filter(Boolean).join(" - ")})` : ""}`)
    .join(" ; ");
}

function fallbackVAESection(c: VAECandidat, bloc: { codeBloc?: string; code?: string; intitule?: string }, section: "contexte" | "description" | "moyens" | "analyse"): string {
  const code = bloc.codeBloc || bloc.code || "";
  const intitule = bloc.intitule || "ce bloc de compétences";
  const exp = vaeExperienceSummary(c);
  if (section === "contexte") {
    return `J'ai exercé ces activités dans un environnement professionnel directement lié à ${intitule}. Mon parcours, notamment ${exp}, m'a placé dans des situations où je devais répondre à des objectifs concrets, coordonner mes actions avec différents interlocuteurs et produire des résultats utiles à l'organisation. La finalité de l'activité était de contribuer au bon fonctionnement du service, à la satisfaction des bénéficiaires ou clients, et à l'atteinte des objectifs opérationnels fixés.`;
  }
  if (section === "description") {
    return `Dans ces situations, j'ai pris en charge plusieurs activités représentatives de ${intitule}. J'ai commencé par analyser la demande, recueillir les informations nécessaires et identifier les priorités. J'ai ensuite organisé mon travail, mobilisé les ressources disponibles, réalisé les actions prévues et assuré le suivi des résultats. Lorsque des difficultés apparaissaient, j'adaptais ma méthode, sollicitais les interlocuteurs compétents et formalisais les éléments importants afin de garantir la continuité et la qualité du travail réalisé.`;
  }
  if (section === "moyens") {
    return `Pour réaliser ces activités, j'ai mobilisé des outils bureautiques, des supports de suivi, des échanges professionnels, des procédures internes et des méthodes d'organisation adaptées à ${intitule}. J'ai utilisé des tableaux de bord, des documents de travail, des comptes rendus, des outils numériques de communication et des référentiels métier afin de sécuriser mes actions et de conserver une traçabilité des décisions prises.`;
  }
  return `J'ai démontré ma capacité à mobiliser les compétences du bloc ${code ? `${code} — ` : ""}${intitule} dans des situations professionnelles concrètes. À partir de mon expérience (${exp}), j'ai su analyser les besoins, définir les priorités, organiser les actions et choisir les méthodes adaptées au contexte. J'ai également assuré le suivi des résultats, la coordination avec les interlocuteurs concernés et l'ajustement de mes pratiques lorsque la situation l'exigeait. Ces activités montrent que je maîtrise les compétences attendues du bloc, car je suis capable de passer d'un objectif à une mise en œuvre opérationnelle, en gardant une logique de qualité, de traçabilité et d'amélioration continue. Mon expérience prouve aussi ma capacité à prendre du recul sur mes pratiques, à identifier les points de réussite et à justifier les choix professionnels réalisés.`;
}

function isIncompleteVAEAnalysis(s: string): boolean {
  const text = cleanGeneratedText(s).toLowerCase();
  return !text || text.length < 350 || /^j['’]ai démontré ma capacité à\s*$/i.test(text) || /^j['’]ai mis en œuvre/i.test(text) && text.length < 450;
}

function civilLong(c: VAECandidat): string {
  return c.civilite === "M." ? "Monsieur" : c.civilite === "Mme" ? "Madame" : "";
}

function fullName(c: VAECandidat): string {
  return `${c.prenom} ${c.nom}`.trim();
}

function nomPrenomUpper(c: VAECandidat): string {
  return `${c.nom.toUpperCase()} ${c.prenom}`.trim();
}

// Accord de genre : renvoie la forme masculine ou féminine selon la civilité
function g(c: VAECandidat, masc: string, fem: string): string {
  return c.civilite === "Mme" ? fem : masc;
}

// ------------------------------------------------------------------
// Base styles inspired by LCA DIGITAL examples (clean, minimalist)
// ------------------------------------------------------------------

const STYLE = `
<style>
  body { font-family: "Calibri", Arial, sans-serif; color: #1a1a1a; font-size: 11pt; line-height: 1.5; margin: 0; }
  .doc-header { text-align: center; margin-bottom: 14px; }
  .doc-header .org { font-weight: bold; font-size: 12pt; color: #0f172a; letter-spacing: 0.5px; }
  .doc-header .meta { font-size: 9.5pt; color: #475569; margin-top: 2px; }
  h1 { text-align: center; font-size: 18pt; color: #0f172a; margin: 24px 0 6px 0; letter-spacing: 1px; text-transform: uppercase; }
  h1 + .subtitle { text-align: center; font-size: 11pt; color: #475569; font-style: italic; margin-bottom: 22px; }
  h2 { font-size: 13pt; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-top: 22px; margin-bottom: 10px; }
  h3 { font-size: 11.5pt; color: #1e40af; margin-top: 14px; margin-bottom: 6px; }
  p { margin: 6px 0; text-align: justify; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0 14px 0; }
  th, td { border: 1px solid #94a3b8; padding: 6px 9px; vertical-align: top; font-size: 10.5pt; }
  th { background: #e2e8f0; color: #0f172a; text-align: left; font-weight: bold; width: 32%; }
  .kv td:first-child { background: #f1f5f9; font-weight: bold; width: 32%; }
  .sign-row { display: table; width: 100%; margin-top: 40px; }
  .sign-cell { display: table-cell; width: 50%; border: 1px solid #94a3b8; padding: 12px; vertical-align: top; height: 90px; }
  .sign-cell .lbl { font-weight: bold; font-size: 10pt; }
  .sign-cell .sub { font-size: 9.5pt; color: #475569; margin-top: 3px; }
  .footer { margin-top: 36px; padding-top: 8px; border-top: 1px solid #94a3b8; font-size: 8.5pt; color: #475569; text-align: center; }
  .footer strong { color: #0f172a; }
  .notice { background: #f8fafc; border-left: 3px solid #0f172a; padding: 10px 14px; margin: 12px 0; font-size: 10.5pt; }
  ul { margin: 6px 0 6px 22px; padding: 0; }
  li { margin: 2px 0; }
  .center { text-align: center; }
  .cbx { font-family: "Segoe UI Symbol", "Arial Unicode MS", sans-serif; }
  .dots { color: #94a3b8; }
  .art { font-weight: bold; margin-top: 14px; }
</style>`;

function docHeader(org: VAEOrganisme): string {
  const logo = org.logo ? `<div style="text-align:center;margin-bottom:6px;"><img src="${org.logo}" alt="Logo" height="70" /></div>` : "";
  return `${logo}<div class="doc-header">
    <div class="org">${esc(org.nom)}</div>
    <div class="meta">${esc(org.adresse)} — SIRET : ${esc(org.siret)}</div>
    <div class="meta">Déclaration d'activité n° ${esc(org.nda)} — Dirigeant : ${esc(org.dirigeant)}</div>
  </div>`;
}

function docFooter(org: VAEOrganisme): string {
  const today = shortDate(new Date().toISOString().slice(0, 10));
  return `<div class="footer">
    <strong>${esc(org.nom)}</strong> — SIRET ${esc(org.siret)}<br/>
    Déclaration d'activité enregistrée sous le n° ${esc(org.nda)}. L'enregistrement de la déclaration d'activité ne vaut pas agrément de l'État.<br/>
    Mise à jour : ${today} — v1
  </div>`;
}

function wrap(org: VAEOrganisme, title: string, body: string, subtitle?: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(title)}</title>${STYLE}</head><body>
    ${docHeader(org)}
    <h1>${esc(title)}</h1>
    ${subtitle ? `<div class="subtitle">${esc(subtitle)}</div>` : ""}
    ${body}
    ${docFooter(org)}
  </body></html>`;
}

function ck(checked: boolean): string {
  return checked ? "☒" : "☐";
}

function candidatAddressLine(c: VAECandidat): string {
  const parts = [c.adresse, [c.codePostal, c.ville].filter(Boolean).join(" ")].filter(Boolean);
  return parts.join(", ");
}

function candidatCoordTable(c: VAECandidat, includeBirth = false): string {
  const rows: string[] = [];
  rows.push(`<tr><td>Adresse</td><td>${esc(candidatAddressLine(c))}</td></tr>`);
  if (c.telephone) rows.push(`<tr><td>Téléphone</td><td>${esc(c.telephone)}</td></tr>`);
  rows.push(`<tr><td>Courriel</td><td>${esc(c.email)}</td></tr>`);
  if (includeBirth && c.dateNaissance) rows.push(`<tr><td>Date de naissance</td><td>${shortDate(c.dateNaissance)}</td></tr>`);
  return `<table class="kv">${rows.join("")}</table>`;
}

function signatureBlock(leftLabel: string, leftSub: string, rightLabel: string, rightSub: string, leftImgs?: { signature?: string; tampon?: string }, rightImgs?: { signature?: string; tampon?: string }): string {
  const cell = (label: string, sub: string, i?: { signature?: string; tampon?: string }) => {
    const sig = i?.signature ? `<div style="margin-top:8px;"><img src="${i.signature}" alt="Signature" width="170" height="60" style="width:170px;height:60px;display:block;" /></div>` : "";
    const tam = i?.tampon ? `<div style="margin-top:8px;"><img src="${i.tampon}" alt="Tampon" width="120" height="75" style="width:120px;height:75px;display:block;" /></div>` : "";
    return `<td width="50%" valign="top" style="border:1px solid #94a3b8;padding:12px;">
      <div style="font-weight:bold;font-size:10pt;">${esc(label)}</div>
      <div style="font-size:9.5pt;color:#475569;">${esc(sub)}</div>
      <div style="font-size:9.5pt;color:#475569;margin-top:10px;">Date et signature :</div>
      ${sig}${tam}
    </td>`;
  };
  return `<table cellpadding="0" cellspacing="0" style="width:100%;margin-top:30px;border-collapse:collapse;"><tr>
    ${cell(leftLabel, leftSub, leftImgs)}
    ${cell(rightLabel, rightSub, rightImgs)}
  </tr></table>`;
}

// ------------------------------------------------------------------
// A. Documents personnalisés candidat
// ------------------------------------------------------------------

// 1) Évaluation des besoins
/** Ville extraite de l'adresse de l'organisme (« … 69003 Lyon » → « Lyon »), pour « Fait à … ». */
function villeDepuisAdresse(adresse?: string): string {
  const m = (adresse || "").match(/\d{5}\s+([^,
]+)\s*$/);
  return m ? m[1].trim() : "……………………";
}

export function getBesoinsHTML(d: VAEData): string {
  const { organisme: o, candidat: c, certification: cert, session: s, contents } = d;
  const b = contents.besoins;
  const body = `
    <table class="kv">
      <tr><td>Titre / Diplôme visé</td><td>${esc(cert.intitule)}</td></tr>
      <tr><td>Candidat</td><td>${esc(nomPrenomUpper(c))}</td></tr>
      <tr><td>Organisme accompagnateur</td><td>${esc(o.nom)}</td></tr>
      <tr><td>Accompagnatrice référente</td><td>${esc(o.dirigeant)}</td></tr>
      <tr><td>Date de l'entretien</td><td>${shortDate(s.dateEntretienPositionnement)}</td></tr>
      <tr><td>Modalité</td><td><span class="cbx">☒</span> Visioconférence &nbsp; <span class="cbx">☐</span> Téléphone &nbsp; <span class="cbx">☐</span> Présentiel</td></tr>
    </table>

    <h2>Objet du document</h2>
    <p>Ce document a pour objet d'identifier, avant l'entrée en accompagnement, les besoins du candidat afin de personnaliser le parcours VAE : niveau de maîtrise des outils numériques, disponibilité, attentes pédagogiques, contraintes éventuelles et besoins d'aménagement liés à une situation de handicap. Il complète le dossier de faisabilité de recevabilité et sert de base à la construction du planning d'accompagnement.</p>
    <p>Les rubriques pré-renseignées le sont à partir du CV et du dossier de faisabilité. Elles doivent être vérifiées et complétées par le candidat lors de l'entretien. Les champs en pointillés (……) sont à compléter manuellement.</p>

    <h2>1. Profil et projet du candidat</h2>
    <table class="kv">
      <tr><td>Emploi actuel</td><td>${esc(c.emploiActuel)}${c.employeur ? " — " + esc(c.employeur) : ""}</td></tr>
      <tr><td>Ancienneté dans le secteur</td><td>${esc(contents.parcours ? contents.parcours.split("\n")[0].slice(0, 120) : "")}</td></tr>
      <tr><td>Statut</td><td>
        <span class="cbx">${ck(c.statut === "Salarié")}</span> ${g(c,"Salarié","Salariée")} &nbsp;
        <span class="cbx">${ck(c.statut === "Demandeur d'emploi")}</span> Demandeur d'emploi &nbsp;
        <span class="cbx">${ck(c.statut === "Autre")}</span> Autre : <span class="dots">…………</span>
      </td></tr>
      <tr><td>Niveau de formation initiale</td><td>${esc(c.niveauFormation)}</td></tr>
    </table>

    <h3>Motivation et objectif visé</h3>
    <p>${nl2br(contents.motivation) || "<em>À rédiger avec le candidat.</em>"}</p>

    <h2>2. Besoins numériques et logistiques</h2>
    <p>L'accompagnement étant 100 % à distance, la maîtrise des outils numériques et la disponibilité du matériel sont évaluées ci-dessous.</p>
    <table>
      <tr><th style="width:55%">Item évalué</th><th style="width:30%">Réponse</th><th>Observations</th></tr>
      <tr><td>Disposez-vous d'un ordinateur ?</td><td><span class="cbx">☒</span> Oui &nbsp; <span class="cbx">☐</span> Non</td><td></td></tr>
      <tr><td>Disposez-vous d'une connexion Internet stable ?</td><td><span class="cbx">☒</span> Oui &nbsp; <span class="cbx">☐</span> Non</td><td></td></tr>
      <tr><td>Êtes-vous à l'aise avec la visioconférence (Zoom, Teams…) ?</td><td><span class="cbx">☒</span> Oui &nbsp; <span class="cbx">☐</span> Partiel &nbsp; <span class="cbx">☐</span> Non</td><td></td></tr>
      <tr><td>Êtes-vous à l'aise avec le traitement de texte (Word) ?</td><td><span class="cbx">☒</span> Oui &nbsp; <span class="cbx">☐</span> Partiel &nbsp; <span class="cbx">☐</span> Non</td><td></td></tr>
      <tr><td>Êtes-vous à l'aise avec la messagerie électronique ?</td><td><span class="cbx">☒</span> Oui &nbsp; <span class="cbx">☐</span> Partiel &nbsp; <span class="cbx">☐</span> Non</td><td></td></tr>
      <tr><td>Avez-vous besoin d'un accompagnement renforcé sur les outils ?</td><td><span class="cbx">☐</span> Oui &nbsp; <span class="cbx">☒</span> Non</td><td>${esc(b.materiel)}</td></tr>
    </table>

    <h2>3. Disponibilité et organisation</h2>
    <table class="kv">
      <tr><td>Disponibilités</td><td>${nl2br(b.disponibilites) || "<span class='dots'>………………………………</span>"}</td></tr>
      <tr><td>Attentes vis-à-vis de l'accompagnement</td><td>${nl2br(b.attentes) || "<span class='dots'>………………………………</span>"}</td></tr>
      <tr><td>Freins ou contraintes identifiés</td><td>${nl2br(b.freins) || "<span class='dots'>………………………………</span>"}</td></tr>
    </table>

    <h2>4. Situation de handicap</h2>
    <p>Un référent handicap (${esc(o.referentHandicap)}) est à votre disposition pour toute demande d'aménagement.</p>
    <table class="kv">
      <tr><td>Situation de handicap ou RQTH</td><td><span class="cbx">☐</span> Oui &nbsp; <span class="cbx">☒</span> Non</td></tr>
      <tr><td>Aménagements souhaités</td><td>${nl2br(b.handicap) || "<span class='dots'>Aucun aménagement particulier.</span>"}</td></tr>
    </table>

    <h2>Conclusion</h2>
    <p>À l'issue de cet entretien, le parcours d'accompagnement VAE peut être engagé selon les modalités convenues avec le candidat, sur la base des éléments recueillis ci-dessus.</p>

    ${signatureBlock("Le Candidat", esc(fullName(c)), "Pour " + esc(o.nom), esc(o.dirigeant) + " — Dirigeant", { signature: c.signature, tampon: c.tampon }, { tampon: o.tampon })}
  `;
  return wrap(o, "Évaluation des besoins", body, "Accompagnement à la Validation des Acquis de l'Expérience (VAE) — Entretien de positionnement");
}

// 2) dossier de faisabilité – Recevabilité
export function getLivret1HTML(d: VAEData): string {
  const { organisme: o, candidat: c, certification: cert, session: s } = d;
  const dip = c.diplomes.length
    ? c.diplomes.map(x => `<tr><td>${esc(x.intitule)}</td><td>${esc(x.etablissement)}</td><td>${esc(x.annee)}</td></tr>`).join("")
    : `<tr><td class="dots">………………</td><td class="dots">………………</td><td class="dots">………</td></tr>`;
  const exp = c.experiences.length
    ? c.experiences.map(x => `<tr><td>${esc(x.dateDebut)} → ${esc(x.dateFin)}</td><td>${esc(x.poste)}</td><td>${esc(x.entreprise)}</td><td>${nl2br(x.missions)}</td></tr>`).join("")
    : `<tr><td class="dots">………</td><td class="dots">………</td><td class="dots">………</td><td class="dots">………</td></tr>`;
  const civ = c.civilite;
  const body = `
    <div class="subtitle">Formulaire Cerfa n° 12818*02 — Notice 51260#02</div>

    <table class="kv">
      <tr><td>Diplôme / Titre visé</td><td>${esc(cert.intitule)}</td></tr>
      <tr><td>Niveau</td><td>Niveau ${esc(cert.niveau)}</td></tr>
      <tr><td>Certificateur</td><td>${esc(cert.certificateur)}</td></tr>
      <tr><td>Code RNCP</td><td>${esc(cert.rncp)} — <a href="${esc(cert.lien)}">${esc(cert.lien)}</a></td></tr>
      <tr><td>Candidat</td><td>${esc(nomPrenomUpper(c))}</td></tr>
      <tr><td>Organisme accompagnateur</td><td>${esc(o.nom)}</td></tr>
      <tr><td>Date de la demande</td><td>${shortDate(s.dateDemandeRecevabilite)}</td></tr>
    </table>

    <h2>Notice explicative</h2>
    <p>Le présent dossier de faisabilité constitue la première étape de la démarche de Validation des Acquis de l'Expérience. Il permet au certificateur de vérifier que le candidat remplit les conditions légales d'accès à la VAE, notamment la nature et le rapport direct de l'expérience avec la certification visée.</p>
    <p>Conformément à l'article <strong>L. 6412-1 du Code du travail</strong>, toute personne justifiant d'une activité en rapport direct avec le contenu de la certification visée peut demander la validation des acquis de son expérience. Aucune durée minimale d'expérience n'est désormais exigée par la loi ; toutefois, la pertinence et le rapport direct de l'expérience avec le référentiel restent appréciés par l'autorité certificatrice.</p>
    <p>Les rubriques pré-renseignées dans ce livret le sont à partir du curriculum vitæ communiqué par le candidat. Elles doivent être vérifiées, complétées et, le cas échéant, corrigées par le candidat avant signature. Les champs comportant des pointillés (……) sont à compléter manuellement.</p>

    <h2>1. Votre identité</h2>
    <h3>1.1 — État civil</h3>
    <table class="kv">
      <tr><td>Nom de naissance</td><td>${esc(c.nom.toUpperCase())}</td></tr>
      <tr><td>Nom d'usage</td><td>${esc(c.nom.toUpperCase())}</td></tr>
      <tr><td>Prénom(s)</td><td>${esc(c.prenom)}</td></tr>
      <tr><td>Sexe</td><td><span class="cbx">${ck(civ === "M.")}</span> Masculin &nbsp; <span class="cbx">${ck(civ === "Mme")}</span> Féminin</td></tr>
      <tr><td>Date de naissance</td><td>${shortDate(c.dateNaissance)}</td></tr>
      <tr><td>Lieu de naissance (commune, département)</td><td>${esc(c.lieuNaissance || "") || '<span class="dots">……………………………………………………</span>'}</td></tr>
      <tr><td>Nationalité</td><td><span class="dots">……………………………………………………</span></td></tr>
      <tr><td>N° de sécurité sociale</td><td><span class="dots">… …… …… …… ……… ……… ……</span></td></tr>
    </table>

    <h3>1.2 — Coordonnées</h3>
    <table class="kv">
      <tr><td>Adresse</td><td>${esc(c.adresse)}</td></tr>
      <tr><td>Code postal / Commune</td><td>${esc(c.codePostal)} — ${esc(c.ville)}</td></tr>
      ${c.telephone ? `<tr><td>Téléphone mobile</td><td>${esc(c.telephone)}</td></tr>` : ""}
      <tr><td>Adresse électronique</td><td>${esc(c.email)}</td></tr>
    </table>

    <h3>1.3 — Situation actuelle</h3>
    <table class="kv">
      <tr><td>Situation</td><td>
        <span class="cbx">${ck(c.statut === "Salarié")}</span> ${g(c,"Salarié","Salariée")} &nbsp;
        <span class="cbx">${ck(c.statut === "Demandeur d'emploi")}</span> Demandeur d'emploi &nbsp;
        <span class="cbx">${ck(c.statut === "Autre")}</span> Autre
      </td></tr>
      <tr><td>Employeur actuel</td><td>${esc(c.employeur) || '<span class="dots">…………………</span>'}</td></tr>
      <tr><td>Emploi occupé</td><td>${esc(c.emploiActuel) || '<span class="dots">…………………</span>'}</td></tr>
    </table>

    <h2>2. Certification visée</h2>
    <table class="kv">
      <tr><td>Intitulé</td><td>${esc(cert.intitule)}</td></tr>
      <tr><td>Code RNCP</td><td>${esc(cert.rncp)}</td></tr>
      <tr><td>Niveau</td><td>${esc(cert.niveau)}</td></tr>
      <tr><td>Certificateur</td><td>${esc(cert.certificateur)}</td></tr>
      <tr><td>Fiche officielle</td><td><a href="${esc(cert.lien)}">${esc(cert.lien)}</a></td></tr>
    </table>

    <h2>3. Formations et diplômes</h2>
    <table>
      <tr><th>Intitulé du diplôme / titre</th><th>Établissement</th><th>Année</th></tr>
      ${dip}
    </table>

    <h2>4. Expériences en rapport avec la certification</h2>
    <table>
      <tr><th style="width:18%">Période</th><th style="width:22%">Emploi occupé</th><th style="width:22%">Employeur</th><th>Activités principales</th></tr>
      ${exp}
    </table>

    <h2>5. Pièces jointes</h2>
    <p>
      <span class="cbx">☒</span> Copie d'une pièce d'identité en cours de validité<br/>
      <span class="cbx">☒</span> Curriculum vitæ à jour<br/>
      <span class="cbx">☐</span> Justificatifs d'activité en rapport avec la certification (bulletins de salaire, attestations d'employeur, contrats)<br/>
      <span class="cbx">☐</span> Copies des diplômes et titres obtenus<br/>
      <span class="cbx">☐</span> Attestation de formation ou d'expérience bénévole, le cas échéant
    </p>

    <h2>6. Attestation sur l'honneur</h2>
    <p>Je ${g(c,"soussigné","soussignée")} <strong>${esc(fullName(c))}</strong> certifie sur l'honneur l'exactitude des informations portées sur le présent dossier et n'avoir déposé qu'une seule demande de recevabilité pour la certification visée au cours de l'année civile en cours.</p>
    <p>Fait à ${esc(c.ville) || "…………………"}, le ${shortDate(s.dateDemandeRecevabilite || s.dateSignature)}.</p>

    ${signatureBlock("Le Candidat", esc(fullName(c)) + " — mention « Lu et approuvé »", "Pour " + esc(o.nom), esc(o.dirigeant) + " — Dirigeant", { signature: c.signature, tampon: c.tampon }, { tampon: o.tampon })}
  `;
  return wrap(o, "Dossier de faisabilité — demande de recevabilité", body, "Validation des Acquis de l'Expérience (VAE)");
}

// 3) dossier de validation – Dossier de validation
export function getLivret2HTML(d: VAEData): string {
  const { organisme: o, candidat: c, certification: cert, session: s, contents } = d;

  const situationsBloc = contents.situationsParBloc.length
    ? contents.situationsParBloc
    : cert.blocs.slice(0, 3).map((b, i) => ({
        codeBloc: b.code,
        intitule: b.intitule,
        situations: "",
      }));

  const parseSituation = (raw: string) => {
    const text = raw || "";
    const grab = (label: string, next: string[]) => {
      const re = new RegExp(`\\[${label}\\]\\s*([\\s\\S]*?)(?=\\s*\\[(?:${next.join("|")})\\]|$)`, "i");
      const m = text.match(re);
      return m ? m[1].trim() : "";
    };
    if (/\[CONTEXTE\]|\[DESCRIPTION\]|\[MOYENS\]|\[ANALYSE\]/i.test(text)) {
      return {
        contexte: grab("CONTEXTE", ["DESCRIPTION", "MOYENS", "ANALYSE"]),
        description: grab("DESCRIPTION", ["MOYENS", "ANALYSE"]),
        moyens: grab("MOYENS", ["ANALYSE"]),
        analyse: grab("ANALYSE", []),
      };
    }
    const parts = text.split(/\n\s*\n/);
    return { contexte: parts[0] || "", description: parts[1] || "", moyens: parts[2] || "", analyse: parts[3] || "" };
  };

  const situationsHTML = situationsBloc.map((b, idx) => {
    const parsed = parseSituation(b.situations);
    const contexte = cleanGeneratedText(parsed.contexte) || fallbackVAESection(c, b, "contexte");
    const description = cleanGeneratedText(parsed.description) || fallbackVAESection(c, b, "description");
    const moyens = cleanGeneratedText(parsed.moyens) || fallbackVAESection(c, b, "moyens");
    const analyse = isIncompleteVAEAnalysis(parsed.analyse) ? fallbackVAESection(c, b, "analyse") : cleanGeneratedText(parsed.analyse);
    return `
      <h3>Situation ${idx + 1} — ${esc(b.intitule)} (${esc(b.codeBloc)})</h3>
      <h3>3.${idx + 1}.1 — Contexte et finalité de l'activité</h3>
      <p>${nl2br(contexte)}</p>
      <h3>3.${idx + 1}.2 — Description détaillée des activités que j'ai exercées</h3>
      <p>${nl2br(description)}</p>
      <h3>3.${idx + 1}.3 — Moyens et ressources que j'ai mobilisés</h3>
      <p>${nl2br(moyens)}</p>
      <h3>3.${idx + 1}.4 — Analyse des compétences que j'ai mises en œuvre</h3>
      <p>${nl2br(analyse)}</p>
    `;
  }).join("");

  const chronoRows = c.experiences.length
    ? c.experiences.map(x => `<tr><td>${esc(x.dateDebut)} → ${esc(x.dateFin)}</td><td>${esc(x.poste)}</td><td>${esc(x.entreprise)}</td></tr>`).join("")
    : `<tr><td class="dots">………</td><td class="dots">………</td><td class="dots">………</td></tr>`;

  const body = `
    <table class="kv">
      <tr><td>Candidat</td><td>${esc(nomPrenomUpper(c))}</td></tr>
      <tr><td>Certification visée</td><td>${esc(cert.intitule)}</td></tr>
      <tr><td>Niveau</td><td>Niveau ${esc(cert.niveau)} (cadre national des certifications professionnelles)</td></tr>
      <tr><td>Certificateur</td><td>${esc(cert.certificateur)}</td></tr>
      <tr><td>Organisme accompagnateur</td><td>${esc(o.nom)}</td></tr>
      <tr><td>Date de dépôt</td><td>${shortDate(s.dateFin || s.dateSignature)}</td></tr>
    </table>

    <h2>Note au lecteur</h2>
    <p>Le présent dossier a été rédigé par le candidat, avec l'appui méthodologique de ${esc(o.nom)}. Il décrit et analyse les activités professionnelles exercées en lien avec le référentiel de la certification visée. Chaque situation présentée illustre les compétences mobilisées et les résultats obtenus.</p>

    <h2>1. Ma présentation</h2>
    <h3>1.1 — État civil et coordonnées</h3>
    ${candidatCoordTable(c, true)}

    <h3>1.2 — Présentation générale de mon parcours</h3>
    <p>${nl2br(contents.parcours) || "<em>À rédiger avec le candidat.</em>"}</p>

    <h3>1.3 — Synthèse chronologique de mes expériences</h3>
    <table>
      <tr><th>Période</th><th>Poste occupé</th><th>Employeur</th></tr>
      ${chronoRows}
    </table>

    <h3>1.4 — Récapitulatif de la durée d'expérience en rapport avec la certification</h3>
    <p>L'ensemble des expériences décrites ci-dessus permet de justifier d'une expérience significative en lien avec le référentiel du <strong>${esc(cert.intitule)}</strong>.</p>

    <h2>2. Mon environnement professionnel</h2>
    <h3>2.1 — Glossaire des principaux termes et sigles employés</h3>
    <p>${nl2br(contents.synthese) || "<em>Glossaire des termes et sigles du métier à compléter avec le candidat selon le secteur.</em>"}</p>

    <h2>3. Description et analyse de mes situations de travail</h2>
    ${situationsHTML}

    <h2>4. Conclusion et projet professionnel</h2>
    <p>${nl2br(contents.motivation) || "<em>Conclusion à rédiger : bilan de l'accompagnement, projet professionnel visé, poursuite du parcours après obtention de la certification.</em>"}</p>

    <h2>Annexes et déclaration sur l'honneur</h2>
    <p>Je ${g(c,"soussigné","soussignée")} <strong>${esc(fullName(c))}</strong> atteste sur l'honneur que les informations fournies dans le présent dossier de validation sont exactes et que les activités décrites ont été personnellement réalisées.</p>
    <p>Fait à ${esc(c.ville) || "…………………"}, le ${shortDate(s.dateSignature)}.</p>

    ${signatureBlock("Le Candidat", esc(fullName(c)), "Pour " + esc(o.nom), esc(o.dirigeant) + " — Dirigeant", { signature: c.signature, tampon: c.tampon }, { tampon: o.tampon })}
  `;
  return wrap(o, "Dossier de validation", body, "Description et analyse de l'expérience");
}

// 4) Convention d'accompagnement VAE
export function getConventionHTML(d: VAEData): string {
  const { organisme: o, candidat: c, certification: cert, session: s } = d;
  const body = `
    <h2>Entre les soussignés</h2>
    <p><strong>Le Prestataire :</strong> ${esc(o.nom)}, organisme d'accompagnement à la VAE, ${esc(o.adresse)}, SIRET ${esc(o.siret)}, déclaration d'activité n° ${esc(o.nda)}, représenté par ${esc(o.dirigeant)}.</p>
    <p><strong>Et le Candidat :</strong> ${esc(civilLong(c))} ${esc(fullName(c))}</p>
    ${candidatCoordTable(c, true)}

    <p>Il a été convenu ce qui suit, en complément des Conditions Générales de Vente (CGV) de ${esc(o.nom)}, que le Candidat reconnaît avoir lues et acceptées et qui sont annexées à la présente convention.</p>

    <div class="art">Article 1 — Objet et certification visée</div>
    <p>La présente convention a pour objet l'accompagnement individualisé du Candidat dans sa démarche de VAE, en vue de l'obtention de la certification suivante :</p>
    <table class="kv">
      <tr><td>Certification visée</td><td>${esc(cert.intitule)}</td></tr>
      <tr><td>Niveau</td><td>Niveau ${esc(cert.niveau)} (cadre national des certifications professionnelles)</td></tr>
      <tr><td>Certificateur</td><td>${esc(cert.certificateur)}</td></tr>
      <tr><td>Fiche officielle</td><td><a href="${esc(cert.lien)}">${esc(cert.lien)}</a></td></tr>
    </table>

    <div class="art">Article 2 — Nature de l'engagement</div>
    <p>Conformément aux CGV, le Prestataire est tenu à une obligation de moyens et ne garantit pas l'obtention de la certification, la décision relevant du seul jury du certificateur. Le Candidat reconnaît avoir été informé de ce caractère aléatoire du résultat.</p>

    <div class="art">Article 3 — Contenu et modalités de l'accompagnement</div>
    <p>L'accompagnement, réalisé en ${esc((s.modalite || "distanciel").toLowerCase())}, comprend notamment : l'analyse du parcours et de la faisabilité, l'aide à la préparation du dossier de faisabilité déposé sur vae.gouv.fr, l'accompagnement à la rédaction du dossier de validation, la préparation à l'entretien avec le jury, ainsi que la relecture et la finalisation du dossier.</p>
    <table class="kv">
      <tr><td>Durée totale</td><td>${esc(o.duree)}</td></tr>
      <tr><td>Modalité</td><td>${esc(s.modalite)} (visioconférence, courriel, téléphone)</td></tr>
      <tr><td>Référent</td><td>Référent unique — ${esc(o.dirigeant)}</td></tr>
      <tr><td>Date de début</td><td>${shortDate(s.dateDebut)}</td></tr>
      <tr><td>Date de fin</td><td>${shortDate(s.dateFin)}</td></tr>
    </table>

    <div class="art">Article 4 — Modalités spécifiques à la formation à distance (FOAD)</div>
    <p>Conformément à l'article <strong>D.6313-3-1 du Code du travail</strong>, la formation étant réalisée à distance, les modalités suivantes sont précisées :</p>
    <p><strong>Nature des travaux et temps estimé :</strong> le Candidat réalise, en autonomie et lors des classes virtuelles, des travaux de rédaction et d'analyse de son expérience (constitution des Livrets 1 et 2, exercices de préparation à l'entretien). Le temps estimé correspond à la durée totale indiquée à l'article 3.</p>
    <p><strong>Modalités de suivi et d'évaluation :</strong> l'assiduité et la progression sont suivies par émargement électronique par séquence, relevés de connexion, comptes rendus des classes virtuelles et restitution des travaux. L'évaluation est réalisée tout au long du parcours par le référent et formalisée par la finalisation du dossier VAE et la préparation à l'entretien avec le jury.</p>
    <p><strong>Assistance technique et pédagogique :</strong> le Candidat bénéficie d'une assistance pédagogique et d'une assistance technique, joignables par courriel à ${esc(o.email)} et par visioconférence. Le délai de réponse est de deux (2) jours ouvrés maximum pendant toute la durée de l'accompagnement.</p>
    <p><strong>Moyens techniques requis :</strong> ordinateur, connexion Internet, micro et webcam, adresse de messagerie. Les classes virtuelles se déroulent via un outil de visioconférence sécurisé.</p>

    <div class="art">Article 5 — Prix et modalités de financement</div>
    <p>Le prix forfaitaire de la prestation est de <strong>${esc(o.prixTTC)}</strong>, financement par <strong>${esc(s.financement)}</strong> (Mon Compte Formation). TVA non applicable, art. 293 B du Code général des impôts, le cas échéant.</p>

    <div class="art">Article 6 — Rétractation, annulation et abandon</div>
    <p>Le Candidat dispose d'un délai de rétractation conformément aux dispositions du Code du travail et du Code de la consommation. Les conditions détaillées d'annulation et d'abandon figurent aux CGV annexées.</p>

    <p style="margin-top:18px;">Fait à ${esc(s.lieuSignature || villeDepuisAdresse(o.adresse))}, le ${shortDate(s.dateSignature)}, en deux exemplaires originaux.</p>

    ${signatureBlock("Le Candidat", esc(fullName(c)) + " — mention « Lu et approuvé »", "Pour " + esc(o.nom), esc(o.dirigeant) + " — Dirigeant", { signature: c.signature, tampon: c.tampon }, { tampon: o.tampon })}
  `;
  return wrap(o, "Convention d'accompagnement VAE", body, "Validation des Acquis de l'Expérience — Accompagnement individualisé");
}

// 5) Convocation
export function getConvocationHTML(d: VAEData): string {
  const { organisme: o, candidat: c, certification: cert, session: s } = d;
  const phone = c.telephone ? ` — Tél. : ${esc(c.telephone)}` : "";
  const body = `
    <p><strong>À l'attention de :</strong> ${esc(civilLong(c))} ${esc(fullName(c))}<br/>
    ${esc(candidatAddressLine(c))}<br/>
    Courriel : ${esc(c.email)}${phone}</p>

    <p>À ${esc(s.lieuSignature || villeDepuisAdresse(o.adresse))}, le ${shortDate(s.dateSignature)}</p>

    <p>Madame, Monsieur,</p>
    <p>Nous avons le plaisir de vous confirmer votre inscription à l'accompagnement à la Validation des Acquis de l'Expérience (VAE) organisé par ${esc(o.nom)}. Vous trouverez ci-dessous les informations relatives à votre session.</p>

    <h2>Informations sur votre session</h2>
    <table class="kv">
      <tr><td>Candidat</td><td>${esc(civilLong(c))} ${esc(fullName(c))}</td></tr>
      <tr><td>Certification visée</td><td>${esc(cert.intitule)} (Niveau ${esc(cert.niveau)})</td></tr>
      <tr><td>Durée totale</td><td>${esc(o.duree)}</td></tr>
      <tr><td>Dates de la session</td><td>du ${shortDate(s.dateDebut)} au ${shortDate(s.dateFin)}</td></tr>
      <tr><td>Modalité</td><td>${esc(s.modalite)} (visioconférence)</td></tr>
      <tr><td>Référent / accompagnateur</td><td>${esc(o.dirigeant)}</td></tr>
    </table>

    <p>Les rendez-vous individuels seront planifiés avec votre référent selon un calendrier défini ensemble. Un lien de connexion vous sera communiqué pour chaque séance.</p>
    <p>Nous vous recommandons de vous connecter quelques minutes avant le début de chaque séance et de vérifier au préalable votre micro, votre caméra et votre connexion Internet.</p>

    <h2>Assistance technique et pédagogique de ${esc(o.nom)}</h2>
    <p>Pendant toute la durée de votre accompagnement, ${esc(o.nom)} met à votre disposition :</p>
    <p><strong>Une assistance pédagogique :</strong> elle vous accompagne sur le contenu de la formation, répond à vos questions et vous guide dans la rédaction de votre dossier et la préparation de l'entretien avec le jury.</p>
    <p><strong>Une assistance technique :</strong> elle vous aide en cas de difficulté d'accès ou d'usage des outils numériques (connexion à la visioconférence, supports), afin de garantir le bon déroulement de votre formation à distance.</p>

    <p><strong>Assistance pédagogique — ${esc(o.dirigeant)}</strong></p>
    <table class="kv"><tr><td>Lien de l'appel vidéo</td><td><a href="${esc(o.lienVisio)}">${esc(o.lienVisio)}</a></td></tr></table>

    <p><strong>Assistance technique — ${esc(o.dirigeant)}</strong></p>
    <table class="kv"><tr><td>Support</td><td><a href="https://support.google.com/?hl=fr">https://support.google.com/?hl=fr</a></td></tr></table>

    <p>Ces deux assistances sont joignables par courriel à <strong>${esc(o.email)}</strong>, avec un délai de réponse de deux (2) jours ouvrés maximum.</p>

    <p>Nous restons à votre disposition pour toute information complémentaire et vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p>

    <div style="margin-top:36px;">
      <strong>Pour ${esc(o.nom)}</strong><br/>
      ${esc(o.dirigeant)} — Dirigeant
    </div>
  `;
  return wrap(o, "Convocation", body, "Accompagnement à la Validation des Acquis de l'Expérience (VAE) — à distance");
}

// 6) Autorisation RGPD
export function getAutorisationRGPDHTML(d: VAEData): string {
  const { organisme: o, candidat: c, certification: cert, session: s } = d;
  const body = `
    <div class="subtitle">Consentement au traitement des données personnelles — Accompagnement VAE</div>

    <p><strong>Candidat concerné :</strong> ${esc(civilLong(c))} ${esc(fullName(c))}</p>
    <table class="kv">
      <tr><td>Adresse</td><td>${esc(candidatAddressLine(c))}</td></tr>
      ${c.telephone ? `<tr><td>Téléphone</td><td>${esc(c.telephone)}</td></tr>` : ""}
      <tr><td>Courriel</td><td>${esc(c.email)}</td></tr>
      <tr><td>Accompagnement</td><td>VAE — ${esc(cert.intitule)}</td></tr>
    </table>

    <h2>1. Responsable du traitement</h2>
    <p>Le responsable du traitement de vos données est <strong>${esc(o.nom)}</strong>, ${esc(o.adresse)} (SIRET ${esc(o.siret)}), représenté par ${esc(o.dirigeant)}. Pour toute question relative à vos données : ${esc(o.email)}.</p>

    <h2>2. Données collectées et finalités</h2>
    <p>Dans le cadre de votre accompagnement à la VAE, ${esc(o.nom)} collecte et traite les données suivantes : état civil et coordonnées, parcours professionnel et de formation, pièces justificatives (diplômes, attestations, bulletins), et, le cas échéant, informations relatives à une situation de handicap pour l'adaptation de l'accompagnement.</p>
    <p>Ces données sont traitées aux seules fins suivantes : réalisation et suivi de l'accompagnement VAE, constitution du dossier de validation, gestion administrative et contractuelle, et respect des obligations légales et réglementaires du Prestataire.</p>

    <h2>3. Base légale et destinataires</h2>
    <p>Le traitement repose sur l'exécution de la convention d'accompagnement et, pour certaines utilisations spécifiques, sur votre consentement. Vos données sont destinées au référent en charge de votre accompagnement et, lorsque cela est nécessaire, à l'organisme certificateur et au financeur (notamment la Caisse des Dépôts dans le cadre du CPF). Elles ne sont jamais cédées à des tiers à des fins commerciales.</p>

    <h2>4. Durée de conservation</h2>
    <p>Vos données sont conservées pendant la durée de l'accompagnement, puis archivées pour la durée nécessaire au respect des obligations légales et au suivi de la certification, avant d'être supprimées.</p>

    <h2>5. Vos droits</h2>
    <p>Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données :</p>
    <ul>
      <li>Droit d'accès, de rectification et d'effacement.</li>
      <li>Droit à la limitation et droit d'opposition au traitement.</li>
      <li>Droit à la portabilité de vos données.</li>
      <li>Droit de retirer votre consentement à tout moment, sans effet rétroactif.</li>
    </ul>
    <p>Vous pouvez exercer ces droits à tout moment en écrivant à ${esc(o.email)}. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).</p>

    <h2>6. Recueil de votre consentement</h2>
    <p>Je ${g(c,"soussigné","soussignée")} <strong>${esc(fullName(c))}</strong>, après avoir pris connaissance des informations ci-dessus :</p>
    <p><span class="cbx">☐</span> J'autorise ${esc(o.nom)} à collecter et traiter mes données personnelles aux fins de mon accompagnement VAE (nécessaire à la réalisation de la prestation).</p>
    <p><span class="cbx">☐</span> J'autorise la transmission de mes données à l'organisme certificateur et au financeur, lorsque cela est nécessaire à ma démarche.</p>
    <p><span class="cbx">☐</span> J'autorise l'enregistrement éventuel des séances de visioconférence à des fins pédagogiques et de traçabilité de l'accompagnement (facultatif).</p>

    <p style="margin-top:18px;">Fait à ${esc(s.lieuSignature || villeDepuisAdresse(o.adresse))}, le ${shortDate(s.dateSignature)}.</p>

    ${signatureBlock("Le Candidat", esc(fullName(c)) + " — mention « Lu et approuvé »", "Pour " + esc(o.nom), esc(o.dirigeant) + " — Dirigeant", { signature: c.signature, tampon: c.tampon }, { tampon: o.tampon })}
  `;
  return wrap(o, "Autorisation RGPD", body);
}

// 7) CV (fallback quand pas de CV fourni)
export function getCVHTML(d: VAEData): string {
  const { organisme: o, candidat: c, certification: cert } = d;
  const exp = c.experiences.map(x => `
    <p><strong>${esc(x.poste)}</strong> — ${esc(x.entreprise)} <em>(${esc(x.dateDebut)} → ${esc(x.dateFin)})</em></p>
    <p>${nl2br(x.missions)}</p>
  `).join("");
  const dip = c.diplomes.map(x => `<li><strong>${esc(x.intitule)}</strong> — ${esc(x.etablissement)} (${esc(x.annee)})</li>`).join("");
  const skills = (c.competences || []).map(s => `<li>${esc(s)}</li>`).join("");
  const body = `
    <div style="text-align:center; margin-bottom:20px;">
      <div style="font-size:16pt; font-weight:bold; color:#0f172a;">${esc(fullName(c))}</div>
      <div style="color:#475569;">${esc(c.emploiActuel)}</div>
      <div style="color:#475569; font-size:10pt;">${esc(candidatAddressLine(c))} — ${esc(c.email)}${c.telephone ? " — " + esc(c.telephone) : ""}</div>
    </div>

    <h2>Titre visé</h2>
    <p>${esc(cert.intitule)} (RNCP ${esc(cert.rncp)})</p>

    <h2>Expériences professionnelles</h2>
    ${exp || "<p><em>À compléter.</em></p>"}

    <h2>Formations et diplômes</h2>
    <ul>${dip || "<li><em>À compléter.</em></li>"}</ul>

    ${skills ? `<h2>Compétences</h2><ul>${skills}</ul>` : ""}
  `;
  return wrap(o, "Curriculum Vitæ", body);
}

// ------------------------------------------------------------------
// B. Documents organisme
// ------------------------------------------------------------------

export function getProgrammeHTML(d: VAEData): string {
  const { organisme: o, certification: cert, session: s } = d;
  const titreCourt = esc(cert.intitule || "la certification visée");
  const rncp = esc(cert.rncp || "—");
  const modalite = (s.modalite || "100 % Présentiel").trim();
  const duree = (o.duree || "24 heures").trim();
  const totalH = (() => { const m = duree.replace(",", ".").match(/(\d+(?:\.\d+)?)/); const h = m ? Math.round(parseFloat(m[1])) : 24; return h >= 7 && h <= 200 ? h : 24; })();
  const poids = [3, 5, 4, 6, 10, 6, 6];
  const mh = poids.map((p) => Math.max(1, Math.round((p * totalH) / 40)));
  mh[4] += totalH - mh.reduce((a, b) => a + b, 0);
  // Durée du parcours estimée en mois (à partir de dates si dispo, sinon 2,5 mois)
  let dureeParcours = "2,5 mois";
  if (s.dateDebut && s.dateFin) {
    const d1 = new Date(s.dateDebut), d2 = new Date(s.dateFin);
    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime()) && d2 > d1) {
      const mois = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth()) + (d2.getDate() >= d1.getDate() ? 0 : -1);
      const val = Math.max(1, mois + 1);
      dureeParcours = `${val} mois`;
    }
  }

  const blocsHtml = (cert.blocs || []).length > 0
    ? cert.blocs.map((b, i) => `
        <p><strong>Bloc ${i + 1}${b.code ? ` (${esc(b.code)})` : ""} : ${esc(b.intitule)}</strong></p>
        <ul>
          <li>Identifier et décrire les activités professionnelles relevant de ce bloc.</li>
          <li>Sélectionner les preuves d'expérience démontrant les compétences attendues.</li>
          <li>Formaliser l'analyse des compétences mises en œuvre.</li>
        </ul>`).join("")
    : `<p><em>Les blocs de compétences sont détaillés dans le référentiel officiel de la certification.</em></p>`;

  const body = `
    <h2>Intitulé de l'accompagnement</h2>
    <p>Accompagnement à la Validation des Acquis de l'Expérience (VAE) – ${titreCourt} (RNCP ${rncp})</p>

    <h2>Objectifs de l'accompagnement</h2>
    <ul>
      <li>Préparer et déposer son dossier de faisabilité sur vae.gouv.fr.</li>
      <li>Identifier les compétences acquises au regard du référentiel du titre.</li>
      <li>Rédiger son dossier de validation.</li>
      <li>Valoriser ses expériences professionnelles.</li>
      <li>Sélectionner et présenter les preuves pertinentes.</li>
      <li>Préparer et réussir son entretien devant le jury.</li>
      <li>Obtenir une validation totale ou partielle de la certification.</li>
    </ul>

    <h2>Public concerné</h2>
    <ul>
      <li>Toute personne disposant d'une expérience significative en lien avec ${titreCourt}.</li>
    </ul>

    <h2>Prérequis</h2>
    <ul>
      <li>Justifier d'une expérience en lien avec ${titreCourt}.</li>
      <li>Être engagé dans une démarche VAE.</li>
      <li>Maîtriser la communication écrite et orale en français.</li>
    </ul>

    <h2>Programme détaillé – ${esc(duree)}</h2>

    <p><strong>MODULE 1 : Information et diagnostic du projet VAE (${mh[0]} h)</strong></p>
    <ul>
      <li>Présentation de la démarche VAE.</li>
      <li>Analyse du parcours professionnel.</li>
      <li>Présentation du référentiel RNCP ${rncp}.</li>
      <li>Élaboration du planning d'accompagnement.</li>
    </ul>

    <p><strong>MODULE 2 : Dossier de faisabilité et recevabilité (${mh[1]} h)</strong></p>
    <ul>
      <li>Analyse des conditions d'accès à la VAE.</li>
      <li>Collecte des justificatifs.</li>
      <li>Constitution et finalisation du dossier de faisabilité.</li>
      <li>Dépôt du dossier de faisabilité sur vae.gouv.fr (décision de recevabilité par le certificateur).</li>
    </ul>

    <p><strong>MODULE 3 : Analyse du référentiel et repérage des compétences (${mh[2]} h)</strong></p>
    <ul>
      <li>Étude des blocs de compétences.</li>
      <li>Mise en correspondance expérience/référentiel.</li>
      <li>Identification des situations professionnelles à valoriser.</li>
    </ul>

    <p><strong>MODULE 4 : Construction du dossier de validation (${mh[3]} h)</strong></p>
    <ul>
      <li>Présentation du dossier de validation.</li>
      <li>Choix des activités significatives.</li>
      <li>Structuration du dossier.</li>
      <li>Identification des preuves.</li>
    </ul>

    <p><strong>MODULE 5 : Rédaction accompagnée du dossier de validation (${mh[4]} h)</strong></p>
    <ul>
      <li>Description des situations professionnelles.</li>
      <li>Valorisation des activités liées au métier visé.</li>
      <li>Rédaction des différentes parties du dossier de validation.</li>
      <li>Accompagnement individualisé.</li>
    </ul>

    <p><strong>MODULE 6 : Finalisation du dossier de validation et préparation du dépôt (${mh[5]} h)</strong></p>
    <ul>
      <li>Relecture complète.</li>
      <li>Corrections et améliorations.</li>
      <li>Intégration des annexes.</li>
      <li>Préparation du dossier final.</li>
    </ul>

    <p><strong>MODULE 7 : Préparation à l'entretien avec le jury (${mh[6]} h)</strong></p>
    <ul>
      <li>Préparation de la présentation orale.</li>
      <li>Simulations d'entretien.</li>
      <li>Débriefing et axes de progression.</li>
    </ul>

    <h2>Compétences visées</h2>
    ${blocsHtml}

    <h2>Modalités pédagogiques</h2>
    <ul>
      <li>Accompagnement individuel en ${esc(modalite.toLowerCase())} alternant entretiens, analyse d'expériences, aide à la préparation du dossier de faisabilité et à la rédaction du dossier de validation et simulations d'entretien jury.</li>
    </ul>

    <h2>Modalités d'évaluation</h2>
    <ul>
      <li>Diagnostic initial.</li>
      <li>Recevabilité prononcée par le certificateur.</li>
      <li>Évaluation continue du dossier de validation.</li>
      <li>Simulation d'entretien jury.</li>
    </ul>

    <h2>Résultats attendus</h2>
    <ul>
      <li>Dossier de faisabilité complété et déposé.</li>
      <li>Dossier de validation finalisé et conforme.</li>
      <li>Dossier de preuves constitué.</li>
      <li>Préparation complète au jury.</li>
      <li>Validation totale ou partielle du titre.</li>
    </ul>

    <h2>Accessibilité handicap</h2>
    <ul>
      <li>Entretien préalable avec le référent handicap (${esc(o.referentHandicap)} — ${esc(o.email)}).</li>
      <li>Adaptation des supports, rythmes et modalités selon les besoins.</li>
    </ul>

    <h2>Points forts</h2>
    <ul>
      <li>Accompagnement individuel et personnalisé.</li>
      <li>Aide au dossier de faisabilité et au dossier de validation.</li>
      <li>Préparation approfondie à l'entretien jury.</li>
      <li>Méthodologie conforme aux exigences France VAE et Qualiopi.</li>
    </ul>

    <h2>Informations complémentaires</h2>
    <ul>
      <li>Durée : ${esc(duree)}.</li>
      <li>Modalité : ${esc(modalite)}.</li>
      <li>Durée du parcours : ${esc(dureeParcours)}.</li>
      <li>Tarif : ${esc(o.prixTTC)} — Financement : ${esc(s.financement)}.</li>
    </ul>
  `;
  return wrap(o, `Programme VAE — ${titreCourt}`, body, `RNCP ${rncp} — ${modalite}`);
}

export function getCGVHTML(d: VAEData): string {
  const { organisme: o } = d;
  const body = `
    <div class="subtitle">Prestation d'accompagnement à la Validation des Acquis de l'Expérience (VAE)</div>

    <h2>Préambule</h2>
    <p>Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations contractuelles entre la société <strong>${esc(o.nom)}</strong>, organisme d'accompagnement à la VAE, dont le siège social est situé ${esc(o.adresse)} (SIRET ${esc(o.siret)}, déclaration d'activité n° ${esc(o.nda)}), représentée par ${esc(o.dirigeant)} (ci-après « le Prestataire »), et toute personne souhaitant bénéficier d'une prestation d'accompagnement à la VAE (ci-après « le Client » ou « le Candidat »).</p>
    <p>Toute commande ou signature d'un devis, d'un contrat ou d'une convention d'accompagnement implique l'adhésion entière et sans réserve du Client aux présentes CGV, qui prévalent sur tout autre document, sauf dérogation expresse et écrite du Prestataire.</p>

    <div class="art">Article 1 — Objet</div>
    <p>Les présentes CGV définissent les conditions dans lesquelles le Prestataire fournit au Client une prestation d'accompagnement méthodologique à la VAE, destinée à aider le Candidat à constituer son dossier de validation et à préparer son passage devant le jury, en vue de l'obtention de tout ou partie d'une certification professionnelle visée.</p>

    <div class="art">Article 2 — Nature de l'engagement — obligation de moyens</div>
    <p>Le Prestataire est tenu à une obligation de moyens et non à une obligation de résultat. Il met en œuvre toutes les compétences et tous les moyens pédagogiques nécessaires à la bonne réalisation de l'accompagnement, mais ne garantit en aucun cas l'obtention, totale ou partielle, de la certification visée. La décision de validation relève de la seule compétence du jury du certificateur, indépendant du Prestataire.</p>

    <div class="art">Article 3 — Conditions d'accès et pré-requis</div>
    <p>L'accès à la prestation suppose que le candidat soit engagé dans une démarche de VAE et justifie d'une expérience en lien avec la certification visée. Le Candidat doit disposer des outils numériques de base (messagerie, traitement de texte, visioconférence) et d'un accès à Internet, la prestation étant réalisée à distance. Un entretien de positionnement préalable permet de vérifier l'adéquation entre l'expérience du Candidat et le titre visé.</p>

    <div class="art">Article 4 — Modalités de l'accompagnement</div>
    <ul>
      <li><strong>Format :</strong> accompagnement réalisé à 100 % à distance (entretiens individuels en visioconférence, échanges par courriel et téléphone, supports dématérialisés).</li>
      <li><strong>Durée :</strong> ${esc(o.duree)}, répartie selon un calendrier défini avec le Candidat. Entrées et sorties permanentes.</li>
      <li><strong>Suivi :</strong> un référent unique accompagne le Candidat tout au long du parcours.</li>
    </ul>

    <div class="art">Article 5 — Prix et modalités de paiement</div>
    <p>Le prix forfaitaire de la prestation d'accompagnement VAE est fixé à <strong>${esc(o.prixTTC)}</strong>, frais d'examen et de passage devant le jury inclus le cas échéant. TVA non applicable, article 293 B du Code général des impôts (franchise en base), le cas échéant. Les modalités et l'échéancier de paiement sont précisés dans la convention individuelle.</p>

    <div class="art">Article 6 — Financement (CPF — Mon Compte Formation)</div>
    <p>La prestation est éligible au Compte Personnel de Formation (CPF). Le Candidat peut mobiliser son CPF via la plateforme Mon Compte Formation (moncompteformation.gouv.fr). En cas de prise en charge intégrale par le CPF, aucun montant n'est dû directement par le Candidat.</p>

    <div class="art">Article 7 — Rétractation</div>
    <p>Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client dispose d'un délai de rétractation de quatorze (14) jours à compter de la signature de la convention, sans avoir à justifier de motif ni à payer de pénalité.</p>

    <div class="art">Article 8 — Annulation, abandon</div>
    <p>Toute annulation à l'initiative du Candidat après le délai de rétractation, ou tout abandon en cours d'accompagnement, entraîne le règlement des heures d'accompagnement effectivement réalisées, sauf force majeure dûment justifiée.</p>

    <div class="art">Article 9 — Réclamations et médiation</div>
    <p>Toute réclamation peut être adressée par écrit à ${esc(o.email)}. À défaut d'accord amiable, le Candidat peut recourir au médiateur de la consommation dont les coordonnées sont communiquées sur simple demande.</p>

    <div class="art">Article 10 — Protection des données personnelles (RGPD)</div>
    <p>Le Prestataire traite les données personnelles du Candidat conformément au RGPD et à la loi Informatique et Libertés. Une notice RGPD dédiée est remise au Candidat et jointe à la convention.</p>

    <div class="art">Article 11 — Droit applicable et juridiction compétente</div>
    <p>Les présentes CGV sont régies par le droit français. En cas de litige, à défaut de résolution amiable, les tribunaux du ressort du siège social du Prestataire sont seuls compétents.</p>

    <p style="margin-top:18px;">Fait à ${esc(o.adresse.split(",").pop()?.trim() || "")}, le ${shortDate(new Date().toISOString().slice(0, 10))}.</p>
    <p><strong>Pour ${esc(o.nom)}</strong> — ${esc(o.dirigeant)}, Dirigeant.</p>
  `;
  return wrap(o, "Conditions Générales de Vente", body);
}

export function getCharteHTML(d: VAEData): string {
  const { organisme: o } = d;
  const engagements: Array<[number, string, string]> = [
    [1, "Un accueil et une information clairs", "Nous vous informons de manière claire et transparente sur la démarche VAE, le déroulement de l'accompagnement, les conditions et les tarifs, avant tout engagement."],
    [2, "Un accompagnement individualisé", "Nous adaptons notre accompagnement à votre profil, à votre expérience et à votre projet, avec un référent dédié qui vous suit du début à la fin de votre parcours."],
    [3, "L'écoute et la disponibilité", "Nous restons à votre écoute et nous nous engageons à répondre à vos demandes dans un délai de deux jours ouvrés maximum, par courriel ou par téléphone."],
    [4, "Des intervenants compétents", "Nous mobilisons des accompagnateurs qualifiés, qui actualisent régulièrement leurs compétences et maîtrisent la méthodologie de la VAE."],
    [5, "La transparence sur les résultats", "Nous sommes tenus à une obligation de moyens : nous mettons tout en œuvre pour optimiser vos chances, tout en vous rappelant que la décision finale appartient au jury du certificateur."],
    [6, "La confidentialité et la protection des données", "Nous traitons votre dossier et vos données personnelles de manière strictement confidentielle, dans le respect du RGPD."],
    [7, "La non-discrimination et l'accessibilité", "Nous accueillons tous les candidats sans discrimination et mettons en place, avec notre référent handicap, les aménagements nécessaires aux personnes en situation de handicap."],
    [8, "L'amélioration continue", "Nous recueillons votre avis, traitons chaque réclamation avec attention et faisons évoluer nos pratiques afin d'améliorer en permanence la qualité de nos prestations."],
  ];
  const rows = engagements.map(([n, t, txt]) => `<tr><td style="width:8%; text-align:center; font-weight:bold; font-size:14pt; color:#0f172a;">${n}</td><td><strong>${esc(t)}</strong><br/>${esc(txt)}</td></tr>`).join("");

  const body = `
    <div class="subtitle">Nos engagements pour votre accompagnement à la VAE</div>
    <p>Chez ${esc(o.nom)}, la qualité de l'accompagnement est au cœur de notre métier. Cette charte formalise les engagements que nous prenons envers chaque candidat à la Validation des Acquis de l'Expérience, tout au long de son parcours. Elle traduit nos valeurs : l'écoute, le respect, la transparence et l'exigence de professionnalisme.</p>

    <table>${rows}</table>

    <p>En adhérant à cette charte, l'ensemble de l'équipe de ${esc(o.nom)} s'engage à vous offrir un accompagnement de qualité, respectueux et bienveillant, pour mettre toutes les chances de votre côté.</p>

    <p style="margin-top:18px;">Fait à ${esc(o.adresse.split(",").pop()?.trim() || "")}, le ${shortDate(new Date().toISOString().slice(0, 10))}.</p>

    <div class="sign-row">
      <div class="sign-cell" style="width:100%;">
        <div class="lbl">Pour ${esc(o.nom)}</div>
        <div class="sub">${esc(o.dirigeant)} — Dirigeant</div>
        <div class="sub" style="margin-top:24px;">Signature :</div>
      </div>
    </div>
  `;
  return wrap(o, "Charte Qualité", body);
}

export function getLivretAccueilHTML(d: VAEData): string {
  const { organisme: o } = d;
  const body = `
    <div class="subtitle">Accompagnement à la Validation des Acquis de l'Expérience (VAE) — Formations dispensées à distance</div>

    <h2>Bienvenue</h2>
    <p>Madame, Monsieur,</p>
    <p>Nous avons le plaisir de vous accueillir au sein de <strong>${esc(o.nom)}</strong> et vous remercions de la confiance que vous nous accordez pour votre démarche de Validation des Acquis de l'Expérience (VAE).</p>
    <p>Ce livret d'accueil a été conçu pour vous accompagner dès le début de votre parcours. Il réunit toutes les informations pratiques dont vous aurez besoin : le déroulement de votre accompagnement, vos interlocuteurs, les modalités de connexion à distance, ainsi que vos droits et vos contacts utiles.</p>
    <p>Notre objectif est de vous offrir un accompagnement individualisé, bienveillant et structuré, afin de vous donner les meilleures chances de valoriser votre expérience et d'obtenir la certification que vous visez.</p>
    <p><em>${esc(o.dirigeant)} — Dirigeant de ${esc(o.nom)}</em></p>

    <h2>Présentation de ${esc(o.nom)}</h2>
    <table class="kv">
      <tr><td>Organisme</td><td>${esc(o.nom)}</td></tr>
      <tr><td>Adresse</td><td>${esc(o.adresse)}</td></tr>
      <tr><td>SIRET</td><td>${esc(o.siret)}</td></tr>
      <tr><td>Déclaration d'activité</td><td>n° ${esc(o.nda)}</td></tr>
      <tr><td>Dirigeant</td><td>${esc(o.dirigeant)}</td></tr>
      <tr><td>Contact</td><td>${esc(o.email)}</td></tr>
    </table>
    <p><em>L'enregistrement de la déclaration d'activité ne vaut pas agrément de l'État.</em></p>

    <h2>Qu'est-ce que la VAE ?</h2>
    <p>La Validation des Acquis de l'Expérience (VAE) est un droit qui vous permet d'obtenir tout ou partie d'une certification professionnelle (diplôme, titre, certificat) grâce à l'expérience que vous avez acquise, qu'elle soit salariée, non salariée, bénévole ou volontaire.</p>
    <ol>
      <li><strong>Le dossier de faisabilité (recevabilité)</strong> : vous vérifiez que votre expérience correspond à la certification visée et déposez votre demande auprès du certificateur.</li>
      <li><strong>Le dossier de validation</strong> : vous décrivez et analysez votre expérience au regard du référentiel. C'est le cœur de la démarche.</li>
      <li><strong>L'entretien avec le jury</strong> : vous présentez et défendez votre dossier devant un jury, qui décide d'une validation totale, partielle ou d'un refus.</li>
    </ol>

    <h2>Le déroulement de votre accompagnement</h2>
    <p>Votre accompagnement est réalisé avec un référent dédié, en séances individuelles, selon la modalité prévue à votre contrat. Il s'organise autour des modules suivants : analyse du parcours, dossier de faisabilité, rédaction du dossier de validation, préparation à l'entretien jury, finalisation.</p>

    <h2>Interlocuteurs et assistances</h2>
    <p><strong>Référent unique :</strong> ${esc(o.dirigeant)} — ${esc(o.email)}</p>
    <p><strong>Assistance pédagogique et technique :</strong> par courriel à ${esc(o.email)}, avec un délai de réponse de 2 jours ouvrés maximum.</p>

    <h2>Modalités de connexion</h2>
    <p>Ordinateur avec micro et webcam, connexion Internet stable, adresse de messagerie active. Lien de visioconférence : <a href="${esc(o.lienVisio)}">${esc(o.lienVisio)}</a>.</p>

    <h2>Handicap</h2>
    <p>Référent handicap : <strong>${esc(o.referentHandicap)}</strong> — ${esc(o.email)}. Nous étudions au cas par cas tous les aménagements nécessaires (durée, supports, rythme, outils adaptés).</p>

    <h2>Vos droits</h2>
    <p>Confidentialité, respect du RGPD, non-discrimination, droit d'accès à vos données. Vous pouvez à tout moment exercer vos droits en écrivant à ${esc(o.email)}.</p>

    <h2>Contacts utiles</h2>
    <p>France Compétences : <a href="https://www.francecompetences.fr">www.francecompetences.fr</a> — Mon Compte Formation : <a href="https://www.moncompteformation.gouv.fr">www.moncompteformation.gouv.fr</a> — CNIL : <a href="https://www.cnil.fr">www.cnil.fr</a>.</p>
  `;
  return wrap(o, "Livret d'accueil du candidat", body);
}

export function getReglementInterieurHTML(d: VAEData): string {
  const { organisme: o } = d;
  const body = `
    <div class="subtitle">Formations et accompagnements dispensés à distance</div>

    <div class="art">Article 1 — Bases du Règlement Intérieur</div>
    <p>Le présent Règlement Intérieur est actualisé en fonction de l'évolution de la législation, et notamment des dispositions du Décret 2019-1143 du 07 novembre 2019 (article 4). Il obéit aux dispositions des articles <strong>L.6352-3 et 5</strong> et <strong>R.6352-1 à 15</strong> du Code du Travail. Les sanctions pénales sont exposées aux articles L.6355-8 et 9 du Code du Travail.</p>
    <p>Ce Règlement Intérieur est disponible et consultable par tout stagiaire avant son entrée en formation. Les formations étant dispensées intégralement à distance, il est remis au stagiaire par voie dématérialisée (courriel ou plateforme) et accessible à tout moment.</p>

    <div class="art">Article 2 — Informations remises au stagiaire avant son inscription définitive (L.6353-8)</div>
    <p>Avant son inscription définitive, le stagiaire reçoit les informations suivantes :</p>
    <ul>
      <li>Les objectifs (objectif professionnel et objectifs de développement des compétences) et le contenu de la formation.</li>
      <li>La liste des formateurs et des intervenants.</li>
      <li>Les horaires ou le volume horaire et les modalités d'organisation à distance.</li>
      <li>Les modalités d'évaluation de la formation.</li>
      <li>Les coordonnées de la personne chargée des relations avec les stagiaires.</li>
      <li>Le règlement intérieur applicable à la formation.</li>
    </ul>
    <p>Pour les contrats conclus par des personnes physiques, sont également délivrés : les tarifs, les modalités de règlement et les conditions financières prévues en cas de cessation anticipée ou d'abandon.</p>

    <div class="art">Article 3 — Informations demandées au stagiaire (L.6353-9)</div>
    <p>Les informations demandées ne peuvent avoir comme finalité que d'apprécier l'aptitude du candidat à suivre l'action de formation. Elles doivent présenter un lien direct et nécessaire avec l'action de formation, et il doit y être répondu de bonne foi.</p>

    <div class="art">Article 4 — Assiduité, ponctualité, absences (formation à distance)</div>
    <p>Les stagiaires sont tenus de suivre toutes les séquences programmées, avec assiduité et ponctualité, et sans interruption. La formation étant dispensée à distance, la réalité de la participation du stagiaire est attestée par des moyens adaptés au distanciel : émargement électronique par demi-journée ou par séquence, relevés de connexion à la plateforme, justificatifs de réalisation des activités et des évaluations, et comptes rendus des classes virtuelles. Ces éléments sont contresignés ou validés par l'intervenant.</p>
    <p>Toute absence prévisible du stagiaire doit être signalée au préalable au référent, par courriel à ${esc(o.email)}.</p>

    <div class="art">Article 5 — Discipline</div>
    <p>Le stagiaire est tenu d'adopter un comportement respectueux envers les intervenants et les autres stagiaires, y compris dans les échanges à distance (visioconférence, courriel, messagerie).</p>

    <div class="art">Article 6 — Sanctions et garanties procédurales</div>
    <p>Tout manquement du stagiaire à l'une des prescriptions du présent règlement peut faire l'objet d'une sanction (avertissement écrit, blâme, exclusion temporaire, exclusion définitive), prononcée dans le respect des garanties procédurales prévues aux articles R.6352-3 à 8 du Code du Travail.</p>

    <div class="art">Article 7 — Représentation des stagiaires</div>
    <p>Conformément à l'article R.6352-9 du Code du Travail, une représentation des stagiaires est mise en place lorsque la durée de la formation dépasse 500 heures. Les formations VAE étant d'une durée inférieure, cette disposition ne s'applique pas.</p>

    <div class="art">Article 8 — Hygiène et sécurité</div>
    <p>Les formations étant réalisées à distance depuis le domicile ou le lieu de travail du stagiaire, il appartient à ce dernier de veiller à ses propres conditions matérielles de travail. Le Prestataire reste à disposition pour toute question relative à l'ergonomie du poste et à la prévention des risques liés au travail sur écran.</p>

    <div class="art">Article 9 — Entrée en vigueur</div>
    <p>Le présent règlement entre en vigueur à la date de signature par le dirigeant du Prestataire et est applicable à toutes les actions de formation dispensées par ${esc(o.nom)}.</p>

    <p style="margin-top:18px;">Fait à ${esc(o.adresse.split(",").pop()?.trim() || "")}, le ${shortDate(new Date().toISOString().slice(0, 10))}.</p>
    <p><strong>Pour ${esc(o.nom)}</strong> — ${esc(o.dirigeant)}, Dirigeant.</p>
  `;
  return wrap(o, "Règlement Intérieur", body);
}

export function getChecklistHTML(d: VAEData): string {
  const { organisme: o, candidat: c } = d;
  const rows = [
    ["Documents générés par l'organisme", ""],
    ["Évaluation des besoins VAE", "☐"],
    ["Dossier de faisabilité — demande de recevabilité", "☐"],
    ["Dossier de validation", "☐"],
    ["Convention d'accompagnement VAE", "☐"],
    ["Convocation à l'accompagnement", "☐"],
    ["Autorisation RGPD", "☐"],
    ["Programme d'accompagnement VAE", "☐"],
    ["Conditions Générales de Vente (CGV)", "☐"],
    ["Charte Qualité", "☐"],
    ["Livret d'accueil du candidat", "☐"],
    ["Règlement intérieur", "☐"],
    ["Pièces à fournir par le candidat", ""],
    ["Pièce d'identité en cours de validité", "☐"],
    ["Curriculum vitæ à jour", "☐"],
    ["Justificatifs d'activité (bulletins, attestations, contrats)", "☐"],
    ["Copies des diplômes et titres obtenus", "☐"],
    ["Captures d'écran des mails EDOF / CPF d'inscription", "☐"],
    ["RIB (si prise en charge partielle par le candidat)", "☐"],
  ];
  const trs = rows.map(([lbl, cbx]) => {
    if (!cbx) return `<tr><td colspan="2" style="background:#0f172a; color:white; font-weight:bold;">${esc(lbl)}</td></tr>`;
    return `<tr><td style="width:80%;">${esc(lbl)}</td><td style="text-align:center; font-size:14pt;" class="cbx">${cbx}</td></tr>`;
  }).join("");

  const body = `
    <div class="subtitle">Récapitulatif du dossier d'accompagnement VAE</div>
    <p><strong>Candidat :</strong> ${esc(fullName(c))}</p>
    <table>${trs}</table>
    <p style="margin-top:18px;">Ce document sert de suivi à la constitution complète du dossier d'accompagnement. Chaque pièce doit être cochée dès sa réception ou sa validation par le référent.</p>
    <p><strong>Référent :</strong> ${esc(o.dirigeant)} — ${esc(o.email)}</p>
  `;
  return wrap(o, "Checklist du dossier VAE", body);
}
