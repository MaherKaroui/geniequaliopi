/**
 * Rapport PDF de l'audit EDOF — même plan que les audits HR FORMATION / ORIENTA CONSULT :
 * couverture (4 chiffres clés), synthèse, périmètre et méthode, vue d'ensemble, une section par constat
 * (bandeau de risque, tableaux, Constat / Lecture / À faire), points conformes, qualité des données,
 * plan d'actions, conclusion, annexes.
 */
import { rgb, type RGB } from "pdf-lib";
import { DocPdf, type EnteteDoc } from "@/lib/edofAuto/pdfMiseEnPage";
import { entier, eur, fr, moisLabel, pct, type AuditEdof, type Niveau } from "./analyse";

const BLEU = rgb(0.184, 0.333, 0.592); // #2F5597
const NOIR = rgb(0.1, 0.1, 0.12);
const GRIS = rgb(0.45, 0.45, 0.5);
const CLAIR = rgb(0.93, 0.95, 0.98);
const COULEUR: Record<Niveau | "CONFORME", RGB> = {
  "ÉLEVÉ": rgb(0.75, 0.13, 0.13), MOYEN: rgb(0.85, 0.47, 0.05), FAIBLE: rgb(0.4, 0.45, 0.55), CONFORME: rgb(0.13, 0.55, 0.3),
};

class RapportEdof extends DocPdf {
  private couverture = true;
  private piedSource = "";

  static async creerRapport(entete: EnteteDoc, piedSource: string): Promise<RapportEdof> {
    const d = new RapportEdof(entete, false);
    d.piedSource = piedSource;
    await d.init();
    return d;
  }

  nouvellePage() {
    this.page = this.pdf.addPage([this.W, this.H]);
    if (this.couverture) { this.y = this.H - this.M; return; }
    const { M, W, H } = this;
    const gauche = this.propre(`${this.entete.organisme} – ${this.entete.titre}`);
    this.page.drawText(gauche, { x: M, y: H - 28, size: 7.5, font: this.fb, color: GRIS });
    const droite = this.propre("Document confidentiel");
    this.page.drawText(droite, { x: W - M - this.f.widthOfTextAtSize(droite, 7.5), y: H - 28, size: 7.5, font: this.f, color: GRIS });
    this.page.drawText(this.propre(this.piedSource), { x: M, y: H - 38, size: 7, font: this.f, color: GRIS });
    this.page.drawLine({ start: { x: M, y: H - 43 }, end: { x: W - M, y: H - 43 }, thickness: 0.6, color: BLEU });
    this.y = H - 58;
  }

  finaliser() {
    this.pdf.getPages().forEach((p, i) => {
      if (i === 0) return;
      const t = `Page ${i + 1}`;
      p.drawText(t, { x: this.W - this.M - this.f.widthOfTextAtSize(t, 7.5), y: 22, size: 7.5, font: this.f, color: GRIS });
    });
  }

  finCouverture() { this.couverture = false; this.nouvellePage(); }

  ecrireCouverture(a: AuditEdof, sousTitre: string, identite: string[], kpis: { v: string; l: string }[], blocs: [string, string][]) {
    const { M, W, H } = this;
    this.page.drawRectangle({ x: 0, y: H - 190, width: W, height: 190, color: BLEU });
    this.page.drawText(this.propre("Audit des dossiers CPF"), { x: M, y: H - 80, size: 26, font: this.fb, color: rgb(1, 1, 1) });
    this.page.drawText(this.propre(sousTitre), { x: M, y: H - 108, size: 13, font: this.f, color: rgb(1, 1, 1) });
    this.page.drawText(this.propre(`Situation arrêtée au ${fr(a.dateExport)}${a.anneeEnCours ? ` (année ${a.anneeEnCours} en cours)` : ""}`), { x: M, y: H - 128, size: 10, font: this.f, color: rgb(0.85, 0.9, 1) });
    this.y = H - 225;
    this.paragraphe(a.organisme, { size: 18, gras: true, couleur: BLEU });
    identite.filter(Boolean).forEach((l) => this.paragraphe(l, { size: 9.5, couleur: GRIS }));
    this.y -= 14;
    const n = kpis.length, gap = 10, w = (this.largeur - gap * (n - 1)) / n, h = 92;
    kpis.forEach((k, i) => {
      const x = M + i * (w + gap);
      this.page.drawRectangle({ x, y: this.y - h, width: w, height: h, color: CLAIR });
      this.page.drawRectangle({ x, y: this.y - 3, width: w, height: 3, color: BLEU });
      let sz = 20;
      const v = this.propre(k.v);
      while (sz > 10 && this.fb.widthOfTextAtSize(v, sz) > w - 12) sz -= 1;
      this.page.drawText(v, { x: x + 8, y: this.y - 32, size: sz, font: this.fb, color: BLEU });
      this.ecrireBloc(k.l, x + 8, this.y - 50, w - 16, 7.5, this.f, NOIR, 5);
    });
    this.y -= h + 22;
    blocs.forEach(([l, t]) => this.etiquette(l, t));
  }

  titre1(t: string) {
    this.place(60);
    this.y -= 8;
    this.page.drawText(this.propre(t), { x: this.M, y: this.y - 14, size: 14, font: this.fb, color: BLEU });
    this.y -= 20;
    this.page.drawLine({ start: { x: this.M, y: this.y }, end: { x: this.W - this.M, y: this.y }, thickness: 0.5, color: BLEU });
    this.y -= 10;
  }

  titre2(t: string) {
    this.place(50);
    this.y -= 4;
    this.page.drawText(this.propre(t), { x: this.M, y: this.y - 11, size: 11, font: this.fb, color: NOIR });
    this.y -= 19;
  }

  bandeau(niveau: Niveau) {
    this.place(26);
    const t = this.propre(`Niveau de risque : ${niveau}`);
    const w = this.fb.widthOfTextAtSize(t, 9) + 16;
    this.page.drawRectangle({ x: this.M, y: this.y - 16, width: w, height: 16, color: COULEUR[niveau] });
    this.page.drawText(t, { x: this.M + 8, y: this.y - 11.5, size: 9, font: this.fb, color: rgb(1, 1, 1) });
    this.y -= 24;
  }

  /** « Constat. Texte… » : étiquette en gras au début du paragraphe. */
  etiquette(label: string, texte: string, size = 9.5) {
    for (const [i, para] of texte.split("\n").filter(Boolean).entries()) {
      const tete = i === 0 ? this.propre(label) + " " : "";
      const lignes = this.lignes(tete + para, this.largeur, size, this.fb);
      lignes.forEach((l, k) => {
        this.place(size + 4);
        if (k === 0 && tete) {
          this.page.drawText(tete, { x: this.M, y: this.y - size, size, font: this.fb, color: NOIR });
          this.page.drawText(l.slice(tete.length), { x: this.M + this.fb.widthOfTextAtSize(tete, size), y: this.y - size, size, font: this.f, color: NOIR });
        } else this.page.drawText(l, { x: this.M, y: this.y - size, size, font: this.f, color: NOIR });
        this.y -= size + 3;
      });
    }
    this.y -= 4;
  }

  puces(items: string[]) {
    for (const it of items) {
      const ls = this.lignes(it, this.largeur - 12, 9.5);
      ls.forEach((l, k) => {
        this.place(13);
        if (k === 0) this.page.drawText("•", { x: this.M + 2, y: this.y - 9.5, size: 9.5, font: this.fb, color: BLEU });
        this.page.drawText(l, { x: this.M + 12, y: this.y - 9.5, size: 9.5, font: this.f, color: NOIR });
        this.y -= 12.5;
      });
      this.y -= 2;
    }
    this.y -= 4;
  }

  /** Histogramme à une couleur, étiquettes directes au-dessus des barres. */
  histogramme(items: { label: string; valeur: number; texte: string }[]) {
    if (!items.length) return;
    const h = 150, base = 30;
    this.place(h + base + 10);
    const max = Math.max(...items.map((i) => i.valeur)) || 1;
    const slot = this.largeur / items.length, bw = Math.min(34, slot * 0.7);
    const y0 = this.y - h - 8;
    this.page.drawLine({ start: { x: this.M, y: y0 }, end: { x: this.W - this.M, y: y0 }, thickness: 0.6, color: GRIS });
    items.forEach((it, i) => {
      const x = this.M + i * slot + (slot - bw) / 2;
      const bh = (it.valeur / max) * (h - 16);
      this.page.drawRectangle({ x, y: y0, width: bw, height: bh, color: BLEU });
      const sz = slot < 30 ? 5.5 : 6.5;
      const t = this.propre(it.texte);
      this.page.drawText(t, { x: x + bw / 2 - this.f.widthOfTextAtSize(t, sz) / 2, y: y0 + bh + 3, size: sz, font: this.f, color: NOIR });
      const l = this.propre(it.label);
      this.page.drawText(l, { x: x + bw / 2 - this.f.widthOfTextAtSize(l, sz) / 2, y: y0 - 10, size: sz, font: this.f, color: GRIS });
    });
    this.y = y0 - base;
  }

  tableauRapport(entetes: string[], lignes: string[][], poids: number[], size = 8) {
    this.place(45);
    this.tableau(entetes, lignes, poids, { size, repeterEntete: true });
  }
}

const k = (n: number) => (n % 1000 === 0 ? `${n / 1000} k€` : n >= 1000 ? `${(n / 1000).toFixed(1).replace(".", ",")} k€` : eur(n));
const moisCourt = (ym: string) => `${["janv", "févr", "mars", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"][+ym.slice(5, 7) - 1]} ${ym.slice(2, 4)}`;

export async function genererRapportEdof(a: AuditEdof): Promise<Uint8Array> {
  const ans = a.annees.length > 1 ? `${a.annees[0]} à ${a.annees[a.annees.length - 1]}` : `${a.annees[0] ?? ""}`;
  const ansCourt = a.annees.length === 2 ? a.annees.join(" et ") : ans;
  const siretFmt = a.siret.replace(/^(\d{3})(\d{3})(\d{3})(\d{5})$/, "$1 $2 $3 $4");
  const doc = await RapportEdof.creerRapport(
    { organisme: a.organisme, titre: `Audit des dossiers CPF (EDOF) – ${ansCourt}${a.anneeEnCours ? ` (au ${fr(a.dateExport)})` : ""}`, sousTitre: "", reference: "" },
    `Source : export EDOF « Tous les dossiers » du ${fr(a.dateExport)} – SIRET ${siretFmt}`,
  );
  const ent = a.entreprise;
  const caAns = a.annees.filter((y) => a.caParAnnee[y] > 0);

  /* Couverture */
  const eleves = a.constats.filter((c) => c.niveau === "ÉLEVÉ");
  doc.ecrireCouverture(a, `Analyse complète de l'export EDOF – ${ansCourt}`, [
    `SIRET ${siretFmt}${ent?.adresse ? ` – ${ent.adresse}` : ""}`,
    [ent?.dateCreation ? `Créée le ${fr(ent.dateCreation)}` : "", ent?.dirigeant ? `Dirigeant : ${ent.dirigeant}` : "", ent?.nda ? `NDA ${ent.nda}` : "", ent?.activite ? `NAF ${ent.activite}` : ""].filter(Boolean).join(" – "),
  ], [
    { v: entier(a.dossiers.length), l: `dossiers dans l'export (${fr(a.premiereInscription).slice(3)} – ${fr(a.derniereInscription).slice(3)})` },
    { v: entier(a.servicesFaits), l: "services faits validés" },
    { v: eur(a.ca), l: `chiffre d'affaires CPF validé${caAns.length > 1 ? ` (${caAns.map((y) => `${y} : ${eur(a.caParAnnee[y])}`).join(" ; ")})` : ""}` },
    eleves.length ? { v: entier(eleves.length), l: `constat${eleves.length > 1 ? "s" : ""} de risque élevé : ${eleves.map((c) => c.titre.toLowerCase()).join(" ; ")}` }
      : { v: entier(a.enCours.n), l: `dossiers en cours (${eur(a.enCours.montant)})` },
  ], [
    ["Objet.", "Contrôle de cohérence de tous les dossiers Mon Compte Formation de l'organisme : habilitations, doublons, prix et chiffre d'affaires par formation, durées, délais, taux de réalisation, géographie et annulations."],
    ["Sources.", `Export EDOF « Tous les dossiers » du ${fr(a.dateExport)} : ${entier(a.dossiers.length)} dossiers, inscriptions du ${fr(a.premiereInscription)} au ${fr(a.derniereInscription)}. ${a.annees.length > 1 ? "Toutes les années sont traitées dans un seul rapport, avec le chiffre d'affaires séparé par année. " : ""}Fiches et listes des partenaires habilités de France Compétences (open data${a.dateReferentiel ? ` du ${fr(a.dateReferentiel)}` : ""}). Annuaire des entreprises (INSEE / RNE).`],
    ["Date du rapport.", fr(a.dateRapport)],
  ]);
  doc.finCouverture();

  /* 1. Synthèse */
  doc.titre1("1. Synthèse");
  doc.paragraphe(a.synthese);
  const lignesSynthese = a.constats.map((c, i) => [String(i + 1), c.resume, c.ampleur, c.niveau]);
  if (a.conformes.length) {
    const libs = [...new Set(a.conformes.map((t) => t.split(" :")[0].split(" ;")[0].replace(/\.$/, "")))];
    const codes = libs.filter((l) => /^(RS|RNCP)\d+$/.test(l));
    const autres = libs.filter((l) => !codes.includes(l)).map((l) => l.charAt(0).toLowerCase() + l.slice(1));
    lignesSynthese.push([String(a.constats.length + 1), [codes.length ? `Habilitation ${codes.join(", ")}` : "", ...autres].filter(Boolean).join(" ; "), "Respectés (voir « Points conformes »)", "CONFORME"]);
  }
  doc.tableauRapport(["#", "Constat", "Ampleur", "Risque"], lignesSynthese, [0.4, 4.6, 3.2, 1.1]);
  const prio = eleves[0] || a.constats[0];
  if (prio) doc.etiquette("Priorité.", `Le point « ${prio.titre.toLowerCase()} » est le plus lourd. ${prio.aFaire}`);

  /* 2. Périmètre et méthode */
  doc.titre1("2. Périmètre et méthode");
  doc.puces([
    `Périmètre : les ${entier(a.dossiers.length)} dossiers de l'export, sans filtre. Chiffre d'affaires = montant facturable des « Service fait validé », rangé par année de fin de session.`,
    "Même personne : nom, prénom et date de naissance identiques.",
    "Habilitations : fiche France Compétences et liste des partenaires de chaque certification vendue, recherche du SIRET de l'organisme.",
    "Jours ouvrés : lundi à vendredi, jours fériés exclus ; règle CPF de 11 jours ouvrés minimum.",
    "Prix de référence : l'export ne donne pas le catalogue ; le prix le plus fréquent de chaque action sert d'approximation.",
  ]);
  doc.paragraphe("Limites. L'export ne contient ni les heures des programmes, ni les émargements, ni les résultats aux certifications, ni les factures. La liste des partenaires peut avoir quelques semaines de retard sur les conventions signées. Les constats décrivent des risques et ne prouvent pas une irrégularité.", { size: 8.5, couleur: GRIS });

  /* 3. Vue d'ensemble */
  doc.titre1("3. Vue d'ensemble");
  doc.titre2("3.1 Répartition par statut");
  doc.tableauRapport(["Statut EDOF", "Dossiers", "Part", "Montant"], [
    ...a.statuts.map((s) => [s.statut, entier(s.n), pct(s.n, a.dossiers.length), eur(s.montant)]),
    ["Total", entier(a.dossiers.length), "100 %", ""],
  ], [3, 1, 1, 1.4]);
  doc.titre2("3.2 Chiffre d'affaires par certification");
  const colsAns = a.annees.length <= 3 ? a.annees : [];
  doc.tableauRapport(
    ["Certif.", "Intitulé", "Dossiers", "Payés", ...colsAns.map((y) => `CA ${y}`), "CA total", "Prix"],
    [
      ...a.parCertif.map((c) => [c.cert, `${c.intitule}${c.etat.startsWith("inactive") ? " – inactive" : ""}`, entier(c.dossiers), entier(c.payes), ...colsAns.map((y) => eur(c.ca[y])), eur(c.total), c.prix.map(k).join(" / ")]),
      ["Total", "", entier(a.dossiers.length), entier(a.servicesFaits), ...colsAns.map((y) => eur(a.caParAnnee[y])), eur(a.ca), ""],
    ],
    [1.1, 3, 0.9, 0.8, ...colsAns.map(() => 1.1), 1.2, 1.6], 7.5,
  );
  if (a.parMois.length) {
    doc.titre2("3.3 Chiffre d'affaires validé par mois de fin de session");
    const top = [...a.parMois].sort((x, y) => y.ca - x.ca)[0];
    doc.paragraphe(`Mois le plus fort : ${moisLabel(top.mois)} avec ${eur(top.ca)} (${entier(top.n)} services faits).`);
    doc.histogramme(a.parMois.map((m) => ({ label: moisCourt(m.mois), valeur: m.ca, texte: k(m.ca) })));
  }
  if (a.enCours.n) {
    doc.titre2(`3.4 Dossiers en cours au ${fr(a.dateExport)}`);
    doc.tableauRapport(["Stagiaire", "Certif.", "Statut", "Session", "Prix"], a.enCours.liste.map((d) => [d.nomComplet, d.cert, d.statut, d.debut ? `${fr(d.debut, true)} – ${fr(d.fin, true)}` : "–", eur(d.montant)]), [2.4, 1.1, 1.6, 1.8, 1]);
  }
  if (a.departements.length) {
    doc.titre2("3.5 Domicile des stagiaires (département)");
    doc.tableauRapport(["Département", "Dossiers", "Services faits", "Part des services faits"], a.departements.slice(0, 10).map((d) => [d.dep, entier(d.dossiers), entier(d.payes), pct(d.payes, a.servicesFaits)]), [1.5, 1, 1, 1.4]);
  }

  /* Constats */
  let n = 4;
  for (const c of a.constats) {
    doc.titre1(`${n++}. ${c.titre}`);
    doc.bandeau(c.niveau);
    doc.etiquette("Constat.", c.constat);
    for (const t of c.tableaux) {
      if (t.titre) doc.titre2(t.titre);
      doc.tableauRapport(t.t.entetes, t.t.lignes, t.t.poids, t.t.lignes.length > 25 ? 7.5 : 8);
    }
    doc.etiquette("Lecture.", c.lecture);
    doc.etiquette("À faire.", c.aFaire);
  }

  doc.titre1(`${n++}. Points conformes`);
  doc.puces(a.conformes.length ? a.conformes : ["Aucun point n'a pu être vérifié comme conforme sur cet export."]);
  if (a.qualite.length) {
    doc.titre1(`${n++}. Qualité des données EDOF`);
    doc.puces(a.qualite);
  }
  if (a.constats.length) {
    doc.titre1(`${n++}. Plan d'actions`);
    const prioN: Record<Niveau, string> = { "ÉLEVÉ": "1", MOYEN: "2", FAIBLE: "3" };
    doc.tableauRapport(["Priorité", "Action", "Dossiers", "Pièce à produire"], a.constats.map((c) => [prioN[c.niveau], c.plan.action, c.plan.dossiers, c.plan.piece]), [0.8, 3, 2, 3.4]);
  }
  doc.titre1(`${n++}. Conclusion`);
  doc.paragraphe(a.conclusion);

  /* Annexes */
  doc.nouvellePage();
  doc.titre1("Annexe A – Liste de tous les dossiers");
  doc.paragraphe("Triés par date de début de session, puis d'inscription.", { size: 8.5, couleur: GRIS });
  doc.tableauRapport(["N° dossier", "Stagiaire", "Certif.", "Act.", "Inscr.", "Début", "Fin", "Statut", "Prix"],
    a.dossiers.map((d) => [d.numero, d.nomComplet, d.cert, d.action, fr(d.inscription, true), fr(d.debut, true), fr(d.fin, true), d.statut, eur(d.montant)]),
    [1.6, 2.4, 1, 0.5, 0.9, 0.9, 0.9, 1.8, 0.9], 6.5);
  doc.titre1("Annexe B – Chiffre d'affaires par action");
  doc.tableauRapport(["Certif.", "Action", "Dossiers vendus", "Prix", "Durées (jours)", "CA validé"],
    a.parAction.map((x) => [x.cert, x.action, entier(x.n), x.prix.map((p) => eur(p)).join(" / "), x.durees.length ? (x.durees.length > 1 ? `${x.durees[0]} à ${x.durees[x.durees.length - 1]}` : String(x.durees[0])) : "–", eur(x.ca)]),
    [1.2, 0.8, 1, 2.4, 1.2, 1.2]);

  return doc.enregistrer();
}
