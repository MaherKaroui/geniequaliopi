import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { MISSIONS_QCM } from "@/lib/templatesCFA14Missions";
import { lundiMission, dateQCMMission } from "@/lib/calendrierMissionsCFA";
import { mailHtmlSimple, type MailAuto } from "@/lib/mails/mailsAutomatiques";

export function dateMailMission(f: FormationInfo, missionNumero: number, s?: StagiaireInfo): Date {
  const lundiSemaineEcole = lundiMission(f, missionNumero, s);
  // Heure d'envoi déterministe (8h05 + offset minutes selon mission)
  lundiSemaineEcole.setHours(8, 5 + (missionNumero % 7), 0, 0);
  return lundiSemaineEcole;
}

const esc = (s: string) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const long = (d: Date) => d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const short = (d: Date) => d.toLocaleDateString("fr-FR");

export function mailMissionCFA(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, n: number): MailAuto | null {
  const mission = MISSIONS_QCM.find(m => m.numero === n);
  if (!mission) return null;
  const date = dateMailMission(f, n, s);
  const fin = dateQCMMission(f, n, s);
  const titre = mission.titre.replace(/^Mission \d+\s*—\s*/, "");
  const civilite = s.civilite === "Mme" ? "Madame " : s.civilite === "M." ? "Monsieur " : "";
  const name = `QCM_Mission_${String(n).padStart(2, "0")}_${titre.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "_").slice(0, 40)}.pdf`;
  const body = `<p>Bonjour ${esc(civilite)}${esc(s.nom)},</p>
<p>J'espère que vous allez bien. Nous vous accueillons au CFA pour la <strong>période au CFA consacrée à la mission n°${n}/14</strong> de votre formation <strong>${esc(f.intitule)}</strong>.</p>
<p>Le thème pédagogique de la semaine porte sur <strong>${esc(mission.titre)}</strong>, dans le cadre des 14 missions du CFA (article L.6231-2 du Code du travail).</p>
<p><strong>${short(date) === short(fin) ? `Journée CFA du ${short(date)}` : `Semaine du ${short(date)} au ${short(fin)}`}</strong><br>Horaires : 09h00 – 12h30 / 13h30 – 17h00 (7h / jour)<br>Lieu : ${esc(f.lieu || "centre de formation")}</p>
<p>Vous trouverez en pièce jointe le <strong>QCM de la semaine</strong> (10 questions, durée ≈ 15 min). Merci de le compléter et de me le retourner avant le <strong>${long(fin)} à 17h00</strong>. Nous reviendrons ensemble sur la correction lors du bilan de fin de période au CFA.</p>
<p>En cas de difficulté pour ouvrir le document ou pour répondre, n'hésitez pas à me le signaler par retour de mail.</p>
<p>Bonne semaine de formation,</p><p><strong>${esc(o.dirigeant || o.nom)}</strong><br>${esc(o.nom)}${o.email ? `<br>${esc(o.email)}` : ""}${o.telephone ? `<br>${esc(o.telephone)}` : ""}</p>`;
  return { key: `cfa_qcm_mission_${n}`, titre: `Envoi QCM – Mission ${String(n).padStart(2, "0")} ${titre}`, subject: `[Mission ${n}/14 — CFA] QCM Mission ${n} : ${titre}`, date,
    messages: [{ fromName: o.nom, fromEmail: o.email || "", toName: `${s.prenom} ${s.nom}`.trim(), toEmail: s.email || "", date, body, atts: [{ name, size: "" }] }] };
}

export function genMailMissionCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number, missionNumero: number): string {
  const s = stagiaires[stagiaireIdx];
  const mail = s ? mailMissionCFA(o, f, s, missionNumero) : null;
  return mail ? mailHtmlSimple(mail) : "";
}
