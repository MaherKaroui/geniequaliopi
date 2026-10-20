import { tableHTML } from "./docBuilder";

/** Shared IND 11 presentation; callers own dates, times and evidence. */
export function attendanceDayTable(rows: { date: string; label: string; horaire: string; learner: string; trainer: string }[]): string {
  return `<table><tr><th>Date</th><th>Horaires</th><th>Signature du Stagiaire</th><th>Signature du Formateur</th></tr>${rows.map((r, i) =>
    `<tr style="background:#fff;border-bottom:1px solid ${i === rows.length - 1 ? '#ccc' : '#ddd'}"><td>${r.date}</td><td>${r.label}<br><small>${r.horaire}</small></td><td style="padding:10px 6px">${r.learner}</td><td style="padding:10px 6px">${r.trainer}</td></tr>`).join("")}</table>`;
}

export function connectionDayTable(cells: string[]): string {
  return tableHTML(["Outil", "Connexion matin", "Déconnexion midi", "Reconnexion", "Déconnexion soir", "Durée totale", "Statut"], [cells]);
}

export function connectionIntro(platform: string): string {
  return `<p style="margin:6px 0 12px;font-size:11px;color:#555;"><strong>Plateforme :</strong> ${platform}</p>`;
}

export function connectionSummary(total: string, duration: string, rate: string, status = ""): string {
  return `<p style="margin-top:10px"><strong>Total connecté :</strong> ${total} | <strong>Durée formation :</strong> ${duration}${rate ? ` | <strong>Taux :</strong> ${rate}` : ""}${status ? ` | ${status}` : ""}</p>`;
}