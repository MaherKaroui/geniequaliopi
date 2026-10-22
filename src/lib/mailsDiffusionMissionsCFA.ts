import { lundiMission, dateQCMMission } from "@/lib/calendrierMissionsCFA";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { mailHtmlSimple, type MailAuto } from "@/lib/mails/mailsAutomatiques";

const MISSIONS_DIFFUSION: { num: number; titre: string; supports: string }[] = [
  { num: 1,  titre: "Orientation, réorientation & Handicap",          supports: "Affiche A3 Mission 1 + Livret référent handicap" },
  { num: 2,  titre: "Aide à la recherche d'un employeur",             supports: "Affiche A3 Mission 2 + Procédure aide à la recherche d'employeur" },
  { num: 3,  titre: "Cohérence CFA / Entreprise",                     supports: "Affiche A3 Mission 3 + Procédure coopération CFA / Entreprise" },
  { num: 4,  titre: "Droits, devoirs & Santé-Sécurité au travail",    supports: "Affiche A3 Mission 4 + Note d'information SST" },
  { num: 5,  titre: "Rupture de contrat",                             supports: "Affiche A3 Mission 5 + Procédure maintien 6 mois" },
  { num: 6,  titre: "Accompagnement social & matériel",               supports: "Affiche A3 Mission 6 + Procédure d'accompagnement social + aides de la Région du CFA" },
  { num: 7,  titre: "Mixité Femmes – Hommes",                         supports: "Affiche A3 Mission 7 + Plan d'actions mixité F/H" },
  { num: 8,  titre: "Égalité professionnelle & mixité des métiers",   supports: "Affiche A3 Mission 8 + Plan mixité des métiers" },
  { num: 9,  titre: "Diversité & lutte contre les discriminations",   supports: "Affiche A3 Mission 9 + Plan diversité" },
  { num: 10, titre: "Mobilité nationale & internationale",            supports: "Affiche A3 Mission 10 + Convention inter-CFA + Fiche de demande" },
  { num: 11, titre: "Suivi de la formation à distance",               supports: "Affiche A3 Mission 11 + Procédure de suivi à distance" },
  { num: 12, titre: "Évaluation des compétences acquises",            supports: "Affiche A3 Mission 12 + Attestation formation MA" },
  { num: 13, titre: "Accompagnement post-formation",                  supports: "Affiche A3 Mission 13 + Procédure accompagnement post-formation" },
  { num: 14, titre: "Accès aux aides des apprentis",                  supports: "Affiche A3 Mission 14 + Procédure accès aux aides" },
];

const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const esc = (s: string) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const long = (d: Date) => d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const short = (d: Date) => d.toLocaleDateString("fr-FR");

/** Lundi de la semaine école où la mission est diffusée (rythme saisi, borné au contrat de l'apprenti). */
export function dateDiffusionMission(f: FormationInfo, missionNumero: number, s?: StagiaireInfo): Date {
  return lundiMission(f, missionNumero, s);
}

/** Date d'envoi du mail d'annonce = veille (J-1) de la diffusion. */
export function dateMailDiffusionMission(f: FormationInfo, missionNumero: number, s?: StagiaireInfo): Date {
  const diffusion = dateDiffusionMission(f, missionNumero, s);
  const veille = addDays(diffusion, -1); // dimanche
  // Envoi déterministe en fin de journée (17h45 + offset)
  veille.setHours(17, 45 + (missionNumero % 10), 0, 0);
  return veille;
}

export function mailDiffusionMissionCFA(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, n: number): MailAuto | null {
  const mission = MISSIONS_DIFFUSION.find(m => m.num === n);
  if (!mission) return null;
  const date = dateMailDiffusionMission(f, n, s);
  const diffusion = dateDiffusionMission(f, n, s);
  const fin = dateQCMMission(f, n, s);
  const civilite = s.civilite === "Mme" ? "Madame " : s.civilite === "M." ? "Monsieur " : "";
  const name = `Affiche_A3_Mission_${String(n).padStart(2, "0")}_${mission.titre.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "_").slice(0, 40)}.pdf`;
  const body = `<p>Bonjour ${esc(civilite)}${esc(s.nom)},</p>
<p>Je vous informe que le CFA <strong>${esc(o.nom)}</strong> lancera dès demain, ${long(diffusion)}, la diffusion de la <strong>Mission ${n} – ${esc(mission.titre)}</strong>, dans le cadre des 14 missions du CFA (article L.6231-2 du Code du travail).</p>
<p>Cette diffusion s'inscrit dans la <strong>période au CFA consacrée à la mission n°${n}/14</strong> de votre formation <strong>${esc(f.intitule)}</strong> et se tiendra du ${short(diffusion)} au ${short(fin)}.</p>
<p>Les supports diffusés seront : ${esc(mission.supports)}. Ils seront mis à disposition par affichage en salle commune, dépôt sur l'ENT / LMS et envoi par mail. Vous trouverez ci-joint le visuel A3 qui sera affiché dès demain matin dans le centre.</p>
<p>Je reste à votre disposition pour toute question ou besoin d'accompagnement complémentaire.</p><p>Cordialement,</p>
<p><strong>${esc(o.dirigeant || o.nom)}</strong><br>${esc(o.nom)}${o.email ? `<br>${esc(o.email)}` : ""}${o.telephone ? `<br>${esc(o.telephone)}` : ""}</p>`;
  return { key: `cfa_diffusion_mission_${n}`, titre: `Annonce diffusion J-1 – Mission ${n} ${mission.titre}`, subject: `Diffusion Mission ${n} – ${mission.titre}`, date,
    messages: [{ fromName: o.nom, fromEmail: o.email || "", toName: `${s.prenom} ${s.nom}`.trim(), toEmail: s.email || "", date, body, atts: [{ name, size: "" }] }] };
}

export function genMailDiffusionMissionCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number, missionNumero: number): string {
  const s = stagiaires[stagiaireIdx];
  const mail = s ? mailDiffusionMissionCFA(o, f, s, missionNumero) : null;
  return mail ? mailHtmlSimple(mail) : "";
}
