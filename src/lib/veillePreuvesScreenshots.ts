// Preuves de veille réglementaire (Indicateur 23) : une fiche par information de veille.
//
// Chaque fiche sépare clairement :
//  1. la RÉFÉRENCE de la source (éditeur, titre, date de parution ou de consultation, lien) —
//     présentée dans la charte de l'organisme, jamais dans une mise en page imitant un site officiel ;
//  2. l'EXPLOITATION interne par l'organisme (impact, décision, pilote, échéance, statut).
// La page officielle elle-même se consulte au lien indiqué (impression datée à joindre si besoin).

import type { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { getCachedVeillePack, type AIVeilleRow } from "./aiVeillePack";
import { buildDocument } from "./docBuilder";
import { entreesVeille, libelleParution, orgVeille, type EntreeVeille } from "./veilleExploitee";
import type { TypePrestation } from "./qualite2026";

const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function typeDepuisOrganisme(o: OrganismeInfo): TypePrestation {
  const t = o.typesActions || [];
  return t.includes("apprentissage") ? "CFA" : t.includes("vae") ? "VAE" : t.includes("bilans-competences") ? "BC" : "AF";
}

interface FichePreuve {
  ref: string;
  source: string;
  url: string;
  titre: string;
  date: string;
  resume: string;
  exploitation: [string, string][];
}

function depuisEntree(e: EntreeVeille, vae = false): FichePreuve {
  return {
    ref: e.id, source: e.source, url: e.url, titre: e.titre, date: libelleParution(e), resume: e.resume,
    exploitation: [
      [vae ? "Impact sur l'accompagnement" : "Impact sur la formation", e.impact],
      ["Décision / action", e.action],
      ["Pilote", e.pilote],
      ["Prise en compte", e.priseEnCompte],
      ["Échéance", e.echeance],
      ["Statut", `${e.statut} — ${e.diffusion}`],
    ],
  };
}

function depuisPackIA(r: AIVeilleRow, i: number): FichePreuve {
  return {
    ref: `R${i + 1}`, source: r.titreLien || "", url: r.lien || "", titre: r.titre || "", date: r.date || "", resume: r.commentaire || "",
    exploitation: [["Exploitation", r.exploitation || ""]],
  };
}

function ficheHtml(o: OrganismeInfo, p: FichePreuve): string {
  const lignes = (rows: [string, string][]) => rows.filter(([, val]) => String(val || "").trim())
    .map(([k, val]) => `<tr><th style="width:28%;text-align:left">${esc(k)}</th><td>${esc(val)}</td></tr>`).join("");
  return `<div style="page-break-inside:avoid;margin:0 0 22px">
  <h3 style="margin:0 0 6px">${esc(p.ref)} — ${esc(p.titre)}</h3>
  <p style="margin:4px 0 2px;font-weight:700">1. Référence de la source (document externe)</p>
  <table>${lignes([["Éditeur / source", p.source], ["Titre", p.titre], ["Date", p.date], ["Lien", p.url], ["Contenu (résumé par l'organisme)", p.resume]])}</table>
  <p style="margin:10px 0 2px;font-weight:700">2. Exploitation interne par ${esc(o.nom)}</p>
  <table>${lignes(p.exploitation)}</table>
</div>`;
}

export function genPreuvesVeilleReglementaire(o: OrganismeInfo, f: FormationInfo): string {
  const entrees = entreesVeille(o, f, "reglementaire", typeDepuisOrganisme(o));
  const pack = getCachedVeillePack(f)?.reglementaire;
  const fiches = pack?.length ? pack.map(depuisPackIA) : entrees.map((e) => depuisEntree(e, typeDepuisOrganisme(o) === "VAE"));
  return buildDocument({
    org: pack?.length ? o : orgVeille(o, entrees),
    title: "PREUVES DE VEILLE RÉGLEMENTAIRE",
    subtitle: `Indicateur 23 — ${f.intitule}`,
    sections: [
      { heading: "Mode de lecture", content: `<p>Une fiche par information de veille. La partie 1 identifie la source externe (éditeur, titre, date de parution — ou date de consultation pour une page sans date de parution — et lien) ; le texte officiel se consulte au lien indiqué. La partie 2 décrit l'exploitation faite par ${esc(o.nom)} ; elle est reprise au tableau de veille et au tableau d'amélioration continue.</p>` },
    ],
    extraHtml: fiches.length ? fiches.map((p) => ficheHtml(o, p)).join("\n") : "<p>Aucune information de veille réglementaire enregistrée.</p>",
  });
}
