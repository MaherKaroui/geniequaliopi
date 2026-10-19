import { buildBdcContext, parseDateAny, repartitionHeures, type BdcContext, type Seance } from "./bdcModel";
import { genererPlanning } from "@/lib/generateurPlanning";
import type { StandaloneBdcData, BdcSessionInput } from "./standaloneTypes";

export function bdcEffectiveDates(d: StandaloneBdcData) {
  return {
    debut: d.beneficiaire.dateDebutFormation || d.formation.dateDebut,
    fin: d.beneficiaire.dateFinFormation || d.formation.dateFin,
  };
}

export function standaloneBdcContext(d: StandaloneBdcData): BdcContext {
  const ctx = buildBdcContext(d.organisme, d.formation, [d.beneficiaire]);
  const b = ctx.beneficiaires[0];
  if (!b) return ctx;
  // The existing model supplies legal/financial derivations, never fictional declarations.
  b.niveauEtudes = d.beneficiaire.diplome || "";
  b.joursDisponibles = d.jours;
  b.creneauxDisponibles = d.creneaux;
  b.profil.attente = d.declarations.attentes;
  b.profil.projet = d.declarations.metiers;
  b.profil.resultatAttendu = d.declarations.attentes;
  b.profil.niveauEtudes = b.niveauEtudes;
  const p = ctx.prestation;
  p.origineDemande = d.beneficiaire.entreprise.trim() ? "employeur" : "beneficiaire";
  const price = Number((d.beneficiaire.tarifFormation || d.formation.tarif).replace(/\s/g, "").replace(",", "."));
  if (Number.isFinite(price)) p.prixHT = price;
  ctx.organisme.regimeTva = d.organisme.regimeTva === "assujetti" ? "assujetti" : "exonere_261_4_4a";
  ctx.organisme.tauxTva = d.organisme.regimeTva === "assujetti" ? 20 : 0;
  p.prixTTC = Math.round(p.prixHT * (1 + ctx.organisme.tauxTva / 100) * 100) / 100;
  const schedule: Seance[] = d.sessions.flatMap(s => {
    const date = parseDateAny(s.date);
    return date ? [{ ...s, date }] : [];
  });
  p.seances = schedule;
  ctx.seancesParBeneficiaire[b.id] = schedule;
  ctx.prestationsParBeneficiaire[b.id] = p;
  return ctx;
}

export function generateStandaloneBdcPlanning(d: StandaloneBdcData): BdcSessionInput[] {
  const errors = validateStandaloneBdc(d, false);
  if (errors.length) throw new Error(errors.join("\n"));
  const ctx = standaloneBdcContext(d);
  const p = ctx.prestation;
  const rep = repartitionHeures(p.dureeTotaleH);
  const result = genererPlanning(p, ctx.beneficiaires[0], {
    repartition: { preliminaire: rep.p1 / p.dureeTotaleH, investigation: rep.p2 / p.dureeTotaleH, conclusion: rep.p3 / p.dureeTotaleH },
  });
  if (!result.ok) throw new Error(result.erreurs.join("\n"));
  if (result.seances.some(s => s.date < p.dateDebut || s.date > p.dateFin)) throw new Error("La période est trop courte pour les disponibilités choisies.");
  return result.seances.map((s, index) => ({ ...s, modalite: p.modalite === "mixte" && index % 2 === 1 ? "distanciel" : s.modalite, date: `${s.date.getFullYear()}-${String(s.date.getMonth() + 1).padStart(2, "0")}-${String(s.date.getDate()).padStart(2, "0")}`, presence: false, compteRendu: "" }));
}

export function bdcIsFinished(d: StandaloneBdcData, now = new Date()) {
  const fin = parseDateAny(bdcEffectiveDates(d).fin);
  if (!fin) return false;
  fin.setHours(23, 59, 59, 999);
  return fin < now;
}

export function bdcFollowupDate(d: StandaloneBdcData): Date | null {
  const fin = parseDateAny(bdcEffectiveDates(d).fin);
  if (!fin) return null;
  const day = fin.getDate();
  fin.setDate(1);
  fin.setMonth(fin.getMonth() + 6);
  const lastDay = new Date(fin.getFullYear(), fin.getMonth() + 1, 0).getDate();
  fin.setDate(Math.min(day, lastDay));
  return fin;
}

export function bdcFollowupDue(d: StandaloneBdcData, now = new Date()) {
  const date = bdcFollowupDate(d);
  return !!date && date <= now;
}

export function validateStandaloneBdc(d: StandaloneBdcData, requirePlanning = true): string[] {
  const o = d.organisme;
  const f = d.formation;
  const s = d.beneficiaire;
  const errors: string[] = [];
  for (const [label, value] of [["Nom de l’organisme", o.nom], ["Adresse de l’organisme", o.adresse], ["Code postal", o.codePostal], ["Ville", o.ville], ["Dirigeant", o.dirigeant], ["Email de l’organisme", o.email], ["Date de mise à jour", o.dateMaj], ["Prénom du bénéficiaire", s.prenom], ["Nom du bénéficiaire", s.nom], ["Email du bénéficiaire", s.email], ["Consultant", f.formateur], ["Intitulé du bilan", f.intitule], ["Financeur", s.financeur], ["Date de signature", d.dateSignature], ["Date d’entretien préalable", d.dateEntretien]]) {
    if (!value?.trim()) errors.push(`${label} à renseigner.`);
  }
  if (!/^\d{14}$/.test(o.siret.replace(/\s/g, ""))) errors.push("Le SIRET doit contenir 14 chiffres.");
  const duration = Number(f.duree.replace(",", "."));
  if (!Number.isInteger(duration) || duration < 3 || duration > 24) errors.push("La durée doit être comprise entre 3 et 24 heures entières.");
  const price = Number((s.tarifFormation || f.tarif).replace(/\s/g, "").replace(",", "."));
  if (!Number.isFinite(price) || price <= 0) errors.push("Le prix du bilan doit être supérieur à zéro.");
  const dates = bdcEffectiveDates(d);
  const start = parseDateAny(dates.debut), end = parseDateAny(dates.fin);
  if (!start || !end || end < start) errors.push("Renseignez une période de bilan valide.");
  if (!d.jours.length || !d.creneaux.length) errors.push("Choisissez les jours et créneaux disponibles.");
  const interview = parseDateAny(d.dateEntretien), signature = parseDateAny(d.dateSignature);
  if (start && ((interview && interview > start) || (signature && signature > start))) errors.push("L’entretien préalable et la signature doivent précéder le début du bilan.");
  if (s.entreprise.trim() && (!s.adresseEntreprise?.trim() || !s.responsableEntreprise?.trim())) errors.push("Renseignez l’adresse et le représentant de l’entreprise pour la convention tripartite.");
  if (requirePlanning) {
    if (!d.sessions.length) errors.push("Générez le planning individuel.");
    if (Math.abs(d.sessions.reduce((sum, item) => sum + item.duree, 0) - duration) > 0.01) errors.push("Les heures du planning doivent correspondre à la durée saisie.");
    if (![1, 2, 3].every(phase => d.sessions.some(item => item.phase === phase))) errors.push("Le planning doit couvrir les trois phases du bilan.");
    d.sessions.forEach((item, index) => {
      const date = parseDateAny(item.date);
      const minutes = (time: string) => { const [h, m] = time.split(":").map(Number); return h * 60 + m; };
      const from = minutes(item.heureDebut), to = minutes(item.heureFin);
      if (!date || (start && date < start) || (end && date > end)) errors.push(`Séance ${index + 1} : date hors période.`);
      if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from || Math.abs((to - from) / 60 - item.duree) > 0.01) errors.push(`Séance ${index + 1} : horaires et durée incohérents.`);
      if (d.sessions.some((other, j) => j < index && other.date === item.date && minutes(other.heureDebut) < to && from < minutes(other.heureFin))) errors.push(`Séance ${index + 1} : chevauchement avec une autre séance.`);
    });
  }
  return errors;
}