/**
 * Mails automatiques du dossier : scénario d'échanges par type d'action et par
 * stagiaire, daté à partir de la chronologie du dossier (jours ouvrés, fériés exclus,
 * heures de bureau, JAMAIS dans le futur), rendu ensuite en capture Gmail ou Outlook
 * selon la messagerie de l'organisme (voir captureMail.ts).
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { joursFeriesDeLAnnee, cleDate } from "../joursFeries";
import { getDateAnalyseBesoins, getDateSignatureDossier } from "../docBuilder";
import { chronoVAE } from "../vae/vaeProfil";

export type ClientMail = "gmail" | "outlook";
export type TypeAction = OrganismeInfo["typesActions"][number];

export interface PieceJointe { name: string; size: string }
export interface MessageMail { fromName: string; fromEmail: string; toName: string; toEmail: string; date: Date; body: string; atts: PieceJointe[] }
export interface MailAuto {
  key: string;          // identifiant stable (ex. af_convocation)
  titre: string;        // libellé du catalogue
  subject: string;
  date: Date;           // date du DERNIER message du fil (tri, filtre ≤ aujourd'hui)
  messages: MessageMail[];
}

/** Gmail si l'adresse de l'organisme est une adresse Gmail, Outlook sinon. */
export function clientMailOrganisme(o: Pick<OrganismeInfo, "email">): ClientMail {
  const dom = ((o.email || "").split("@")[1] || "").trim().toLowerCase();
  return /^(gmail\.com|googlemail\.com)$/.test(dom) ? "gmail" : "outlook";
}

// ───────────────────────── dates ─────────────────────────

function parseDate(v?: string): Date | null {
  const t = (v || "").trim();
  if (!t) return null;
  const m = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(`${t.slice(0, 10)}T00:00:00`);
  return isNaN(d.getTime()) ? null : d;
}
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function ouvre(d: Date): boolean {
  const dow = d.getDay();
  return dow !== 0 && dow !== 6 && !joursFeriesDeLAnnee(d.getFullYear()).has(cleDate(d));
}
/** Décale de n jours ouvrés (n négatif = avant). n = 0 : premier jour ouvré à partir de d. */
function jo(d: Date, n: number): Date {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (n === 0) { while (!ouvre(r)) r.setDate(r.getDate() + 1); return r; }
  const step = n > 0 ? 1 : -1;
  let k = Math.abs(n);
  while (k > 0) { r.setDate(r.getDate() + step); if (ouvre(r)) k--; }
  return r;
}
function plusMois(d: Date, m: number): Date { return jo(new Date(d.getFullYear(), d.getMonth() + m, d.getDate()), 0); }
function milieu(a: Date, b: Date): Date { return jo(new Date((a.getTime() + b.getTime()) / 2), 0); }
function maxD(a: Date, b: Date): Date { return a > b ? a : b; }

function seed(s: string): number { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
/** Heure de bureau déterministe (8 h 40 – 17 h 50) propre au mail et au stagiaire. */
function aHeure(d: Date, cle: string, plage: [number, number] = [520, 1070]): Date {
  const minutes = plage[0] + (seed(cle) % (plage[1] - plage[0]));
  const r = new Date(d); r.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0); return r;
}

// ───────────────────────── contenus ─────────────────────────

const esc = (s: string) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fr = (d: Date) => d.toLocaleDateString("fr-FR");
const fichier = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
function taille(cle: string, min = 60, max = 420): string { return `${min + (seed(cle) % (max - min))} Ko`; }

interface Ctx { o: OrganismeInfo; f: FormationInfo; s: StagiaireInfo; debut: Date; fin: Date; nom: string; appel: string; ofMail: string; ofNom: string; signataire: string; distanciel: boolean }

function signature(c: Ctx): string {
  const tel = (c.o.telephone || "").trim();
  return `<p>Cordialement,</p><p>${esc(c.signataire)}<br>${esc(c.ofNom)}<br>${esc(c.ofMail)}${tel ? `<br>${esc(tel)}` : ""}</p>`;
}
function pj(c: Ctx, base: string, perso = true): PieceJointe {
  const n = perso ? `${fichier(base)}_${fichier(c.s.nom)}.pdf` : `${fichier(base)}.pdf`;
  return { name: n, size: taille(n) };
}
function deOF(c: Ctx, date: Date, body: string, atts: PieceJointe[] = [], to?: { name: string; email: string }): MessageMail {
  return { fromName: c.ofNom, fromEmail: c.ofMail, toName: to?.name || c.nom, toEmail: to?.email || c.s.email, date, body: `${body}${signature(c)}`, atts };
}
function deStagiaire(c: Ctx, date: Date, body: string, atts: PieceJointe[] = []): MessageMail {
  return { fromName: c.nom, fromEmail: c.s.email, toName: c.ofNom, toEmail: c.ofMail, date, body: `${body}<p>${esc(c.nom)}</p>`, atts };
}
const modalite = (c: Ctx) => (c.distanciel ? `en classe virtuelle (${esc(c.f.lieu || "Google Meet / Zoom")})` : `à l'adresse suivante : ${esc(c.f.lieu || "")}`);

function mail(key: string, titre: string, subject: string, messages: MessageMail[]): MailAuto {
  return { key, titre, subject, messages, date: messages[messages.length - 1].date };
}

// ───────────────────────── scénarios ─────────────────────────

/** Variante de rédaction propre au stagiaire et au mail : chaque dossier a ses propres formulations. */
function v<T>(c: Ctx, cle: string, options: T[]): T {
  return options[seed(`${c.s.nom}|${c.s.prenom}|${c.s.email}|${cle}`) % options.length];
}

type Regime = "cpf" | "convention" | "contrat" | "aif";

/**
 * Cadre contractuel : stagiaire avec entreprise → convention de formation tripartite
 * (jamais de contrat) ; sans entreprise → contrat de formation professionnelle.
 */
function regime(c: Ctx): { r: Regime; piece: string; libelle: string; phrase: string; art: string; participe: string } {
  const fin = (c.s.financeur || "").toLowerCase();
  const certifiante = /^(RS|RNCP)\d+$/i.test(String(c.f.codeRNCP || "").replace(/\s+/g, ""));
  if (certifiante && /cpf|compte formation/.test(fin)) {
    return { r: "cpf", piece: "", libelle: "", phrase: "Votre inscription a été validée sur Mon Compte Formation : les conditions générales d'utilisation de la plateforme tiennent lieu de contrat, aucune convention n'est à signer.", art: "", participe: "" };
  }
  if (/france travail|aif/.test(fin) && !(c.s.entreprise || "").trim()) {
    return { r: "aif", piece: "Devis AIF", libelle: "devis AIF", phrase: "Le devis d'aide individuelle à la formation (AIF) est à valider avec votre conseiller France Travail avant le démarrage.", art: "le", participe: "signé" };
  }
  if (/opco|entreprise|employeur|plan|r[ée]gion/.test(fin) || (c.s.entreprise || "").trim()) {
    return { r: "convention", piece: "Convention de formation", libelle: "convention de formation", phrase: `La convention de formation est à signer par ${esc((c.s.entreprise || "votre employeur").trim())} et à nous retourner avant le démarrage.`, art: "la", participe: "signée" };
  }
  return { r: "contrat", piece: "Contrat de formation professionnelle", libelle: "contrat de formation professionnelle", phrase: "Conformément à l'article L.6353-5 du Code du travail, vous disposez d'un délai de rétractation de 10 jours à compter de la signature du contrat ; aucune somme ne peut être exigée avant l'expiration de ce délai.", art: "le", participe: "signé" };
}

function scenarioAF(c: Ctx): MailAuto[] {
  const { f, s } = c;
  const analyse = parseDate(getDateAnalyseBesoins(iso(c.debut))) || jo(c.debut, -16);
  const signatureContrat = parseDate(getDateSignatureDossier(iso(c.debut))) || jo(c.debut, -14);
  const reg = regime(c);
  const k = `${s.nom}|${s.prenom}`;
  const formation = `« ${esc(f.intitule)} »`;
  const periode = c.debut.getTime() === c.fin.getTime() ? `le ${fr(c.debut)}` : `du ${fr(c.debut)} au ${fr(c.fin)}`;
  const programme = pj(c, `Programme ${f.intitule}`, false);
  const out: MailAuto[] = [];

  // 1. Pré-inscription : programme + évaluation des besoins + test de positionnement
  out.push(mail("af_preinscription", "Pré-inscription : envoi de l'évaluation des besoins et du test de positionnement",
    v(c, "sp", [`Pré-inscription – ${f.intitule}`, `Votre demande de formation ${f.intitule}`, `${f.intitule} : documents de pré-inscription`]), [
      deOF(c, aHeure(jo(analyse, -3), k + "p1"), v(c, "bp", [
        `<p>${c.appel},</p><p>Merci pour l'intérêt que vous portez à notre formation ${formation}.</p><p>Vous trouverez en pièces jointes le programme détaillé, la trame d'évaluation de vos besoins et le test de positionnement. Merci de nous les retourner complétés : ils nous permettent de vérifier les prérequis et d'adapter la formation à votre situation.</p>`,
        `<p>${c.appel},</p><p>Suite à notre échange téléphonique, je vous adresse les documents de pré-inscription à la formation ${formation} : le programme, le questionnaire d'évaluation de vos besoins et un court test de positionnement (15 minutes environ).</p><p>Vos réponses nous aideront à construire un parcours adapté à vos objectifs.</p>`,
        `<p>${c.appel},</p><p>Nous avons bien reçu votre demande concernant la formation ${formation}. Avant de valider votre inscription, merci de compléter les deux documents joints — évaluation des besoins et test de positionnement — et de lire attentivement le programme.</p>`,
      ]) + `<p>Si vous êtes en situation de handicap ou avez besoin d'un aménagement, indiquez-le-nous : notre référent handicap, ${esc(c.o.referentHandicap || c.o.dirigeant)}, vous contactera.</p>`,
      [programme, pj(c, "Evaluation des besoins"), pj(c, "Test de positionnement")]),
      deStagiaire(c, aHeure(jo(analyse, -1), k + "p2", [1020, 1260]), v(c, "rp", [
        `<p>Bonjour,</p><p>Veuillez trouver ci-joint l'évaluation des besoins et le test de positionnement complétés.</p><p>Bien cordialement,</p>`,
        `<p>Bonjour,</p><p>Voici mes documents remplis. Je reste disponible si vous avez besoin de précisions sur mon projet.</p><p>Cordialement,</p>`,
        `<p>Bonjour,</p><p>Merci pour votre envoi. Je vous retourne les deux documents complétés.</p><p>Bonne journée,</p>`,
      ]), [pj(c, "Evaluation des besoins completee"), pj(c, "Test de positionnement complete")]),
    ]));

  if (s.rqth === "oui") {
    out.push(mail("af_handicap", "Échange avec le référent handicap", `Aménagements – ${f.intitule}`, [
      deOF(c, aHeure(analyse, k + "h1"), `<p>${c.appel},</p><p>Je suis ${esc(c.o.referentHandicap || c.o.dirigeant)}, référent handicap. Suite à votre retour, je vous propose un entretien pour définir ensemble les aménagements utiles (rythme, supports, outils, pauses). Quelles sont vos disponibilités cette semaine ?</p>`),
      deStagiaire(c, aHeure(jo(analyse, 1), k + "h2"), v(c, "rh", [`<p>Bonjour,</p><p>Merci pour votre retour, je suis disponible jeudi matin.</p>`, `<p>Bonjour,</p><p>Merci beaucoup. Mardi après-midi me conviendrait.</p>`])),
    ]));
  }

  // 2. Confirmation d'inscription : programme, règlement intérieur, CGV + pièce contractuelle selon le financement
  const piecesInscription = [programme, pj(c, "Conditions generales de vente", false), pj(c, "Reglement interieur", false)];
  if (reg.piece) piecesInscription.unshift(pj(c, reg.piece));
  const msgsInscription: MessageMail[] = [
    deOF(c, aHeure(jo(signatureContrat, -1), k + "i1"), v(c, "bi", [
      `<p>${c.appel},</p><p>Nous avons le plaisir de vous confirmer votre inscription à la formation ${formation}, qui se déroulera ${periode}.</p>`,
      `<p>${c.appel},</p><p>Votre inscription à la formation ${formation} est confirmée. La session aura lieu ${periode}, ${modalite(c)}.</p>`,
      `<p>${c.appel},</p><p>Bonne nouvelle : votre place est réservée pour la formation ${formation} (${periode}).</p>`,
    ]) + `<p>Vous trouverez ci-joint ${reg.piece ? `${reg.art} ${reg.libelle}${reg.r === "aif" ? "" : ` à nous retourner ${reg.participe}`}, ` : ""}le programme, les conditions générales de vente et le règlement intérieur, à lire avant le démarrage.</p><p>${reg.phrase}</p>`, piecesInscription),
  ];
  if (reg.r === "contrat" || reg.r === "convention") {
    msgsInscription.push(deStagiaire(c, aHeure(signatureContrat, k + "i2"), v(c, "ri", [
      `<p>Bonjour,</p><p>Vous trouverez ci-joint ${reg.art} ${reg.libelle} ${reg.participe}.</p><p>Cordialement,</p>`,
      `<p>Bonjour,</p><p>Merci, voici le document signé. J'ai bien pris connaissance du règlement intérieur et des CGV.</p><p>Cordialement,</p>`,
    ]), [pj(c, `${reg.piece} signe`)]));
  }
  out.push(mail("af_inscription", "Confirmation d'inscription : programme, règlement intérieur, CGV" + (reg.piece ? ` et ${reg.libelle}` : ""),
    v(c, "si", [`Confirmation de votre inscription – ${f.intitule}`, `Inscription confirmée : ${f.intitule}`, `${f.intitule} – votre inscription`]), msgsInscription));

  // 3. Convocation (après le délai de rétractation pour un contrat)
  const dConvoc = reg.r === "contrat" ? maxD(jo(c.debut, -5), new Date(signatureContrat.getTime() + 11 * 86400000)) : maxD(jo(c.debut, -5), jo(signatureContrat, 1));
  out.push(mail("af_convocation", "Convocation", v(c, "sc", [`Convocation – ${f.intitule}`, `Votre convocation à la formation ${f.intitule}`, `${f.intitule} : convocation et informations pratiques`]), [
    deOF(c, aHeure(jo(dConvoc < c.debut ? dConvoc : jo(c.debut, -1), 0), k + "c1"), v(c, "bc", [
      `<p>${c.appel},</p><p>Nous vous confirmons votre participation à la formation ${formation}, ${periode}, ${modalite(c)}.</p><p>Votre convocation, précisant les horaires et les modalités d'accès, est jointe à ce message.</p>`,
      `<p>${c.appel},</p><p>Veuillez trouver ci-joint votre convocation. La formation se tiendra ${periode} de 9 h 00 à 12 h 30 et de 13 h 30 à 17 h 00, ${modalite(c)}.</p><p>Merci de nous prévenir en cas d'empêchement.</p>`,
      `<p>${c.appel},</p><p>J'ai le plaisir de vous adresser votre convocation pour la formation ${formation}. Vous y trouverez les horaires, le lieu et le nom de votre formateur, ${esc(f.formateur || c.o.dirigeant)}.</p>`,
    ]), [pj(c, "Convocation")]),
  ]));

  if (c.distanciel) {
    out.push(mail("af_connexion", "Lien de connexion et assistance technique", v(c, "sl", [`Vos accès à la classe virtuelle – ${f.intitule}`, `Connexion à votre formation de demain`]), [
      deOF(c, aHeure(jo(c.debut, -1), k + "l1"), v(c, "bl", [
        `<p>${c.appel},</p><p>Voici les informations de connexion pour demain : la classe virtuelle ouvre 15 minutes avant le début de la séance. En cas de difficulté technique, répondez à ce message.</p><p>Pensez à tester votre micro et votre caméra.</p>`,
        `<p>${c.appel},</p><p>Votre formation démarre demain. Le lien de connexion est actif dès 8 h 45 ; une assistance technique est assurée pendant toute la session par ${esc(c.o.dirigeant)}.</p>`,
      ])),
    ]));
  }

  // 4. Supports de cours et ressources pédagogiques
  out.push(mail("af_supports", "Envoi du support de cours et des ressources pédagogiques", v(c, "ss", [`Support de cours et ressources – ${f.intitule}`, `Vos ressources pédagogiques – ${f.intitule}`, `Documents de la formation ${f.intitule}`]), [
    deOF(c, aHeure(c.debut, k + "s1", [1020, 1080]), v(c, "bs", [
      `<p>${c.appel},</p><p>Comme convenu, vous trouverez ci-joint le support de cours et les ressources complémentaires de la formation ${formation}. Ils restent à votre disposition après la formation.</p>`,
      `<p>${c.appel},</p><p>Merci pour cette première journée. Je vous transmets le support de cours ainsi que les fiches pratiques et exercices corrigés vus ensemble.</p>`,
      `<p>${c.appel},</p><p>Pour prolonger la séance d'aujourd'hui, voici le support de cours et les ressources pédagogiques. N'hésitez pas à me poser vos questions par retour de mail.</p>`,
    ]), [pj(c, `Support de cours ${f.intitule}`, false), pj(c, "Ressources pedagogiques", false), pj(c, "Exercices corriges", false)]),
  ]));

  // 5. Envoi de l'évaluation des acquis (fin de formation)
  out.push(mail("af_evaluation", "Envoi de l'évaluation des acquis de fin de formation", v(c, "se", [`Évaluation de fin de formation – ${f.intitule}`, `Votre évaluation des acquis`, `${f.intitule} : évaluation finale`]), [
    deOF(c, aHeure(c.fin, k + "e1", [540, 690]), v(c, "be", [
      `<p>${c.appel},</p><p>Vous trouverez ci-joint l'évaluation des acquis de fin de formation et le test de positionnement de sortie. Merci de les compléter pendant la séance de ce matin : ils permettent de mesurer votre progression depuis le test d'entrée.</p>`,
      `<p>${c.appel},</p><p>Dernière étape de votre formation : l'évaluation finale. Elle reprend les objectifs du programme ; votre formateur vous en donnera la correction individuellement.</p>`,
      `<p>${c.appel},</p><p>Comme annoncé, voici l'évaluation des acquis. Prenez le temps nécessaire, il n'y a pas de piège : l'objectif est de vérifier l'atteinte des objectifs de la formation.</p>`,
    ]), [pj(c, "Evaluation des acquis"), pj(c, "Test de positionnement fin")]),
    deStagiaire(c, aHeure(c.fin, k + "e2", [700, 760]), v(c, "re", [`<p>Bonjour,</p><p>Voici mon évaluation complétée.</p>`, `<p>Bonjour,</p><p>Je vous retourne l'évaluation et le test de fin.</p>`]), [pj(c, "Evaluation des acquis completee")]),
  ]));

  // 6. Bilan à chaud + certificat de réalisation
  out.push(mail("af_fin", "Envoi du bilan à chaud et du certificat de réalisation", v(c, "sf", [`Fin de formation – votre avis compte`, `Questionnaire de satisfaction – ${f.intitule}`, `Merci pour votre participation à ${f.intitule}`]), [
    deOF(c, aHeure(c.fin, k + "f1", [1000, 1080]), v(c, "bf", [
      `<p>${c.appel},</p><p>Merci pour votre participation à la formation ${formation} ${periode}.</p><p>Merci de compléter le questionnaire de satisfaction à chaud ci-joint. Vous trouverez également votre certificat de réalisation.</p>`,
      `<p>${c.appel},</p><p>La formation se termine : merci pour votre implication. Votre avis nous est précieux pour améliorer nos formations ; le questionnaire joint ne prend que 5 minutes.</p><p>Votre certificat de réalisation est également joint.</p>`,
      `<p>${c.appel},</p><p>Afin d'évaluer la qualité de la session et d'améliorer nos actions, merci de compléter votre bilan à chaud. Vous trouverez aussi votre certificat de réalisation.</p>`,
    ]), [pj(c, "Questionnaire de satisfaction a chaud"), pj(c, "Certificat de realisation")]),
  ]));

  // 7. Bilan à froid (3 mois)
  out.push(mail("af_froid", "Bilan à froid (3 mois après)", v(c, "sb", [`Et depuis la formation ? – ${f.intitule}`, `Questionnaire à froid – ${f.intitule}`]), [
    deOF(c, aHeure(plusMois(c.fin, 3), k + "b1"), v(c, "bb", [
      `<p>${c.appel},</p><p>Il y a trois mois, vous suiviez la formation ${formation}. Pour mesurer ce qu'elle vous a apporté dans votre activité, merci de répondre au questionnaire à froid ci-joint (5 minutes).</p>`,
      `<p>${c.appel},</p><p>Trois mois après votre formation, nous aimerions savoir comment vous mettez en pratique les compétences acquises. Merci de compléter le court questionnaire joint.</p>`,
    ]), [pj(c, "Questionnaire a froid")]),
  ]));
  return out;
}

function scenarioCFA(c: Ctx): MailAuto[] {
  const { f, s } = c;
  const k = `${s.nom}|${s.prenom}`;
  const tuteur = { name: (s.responsableEntreprise || "").trim() || `Service RH – ${s.entreprise || "entreprise d'accueil"}`, email: (s.emailResponsable || "").trim() || c.s.email };
  return [
    mail("cfa_candidature", "Candidature et entretien de positionnement", `Votre candidature – ${f.intitule} en apprentissage`, [
      deOF(c, aHeure(jo(c.debut, -25), k + "a1"), `<p>${c.appel},</p><p>Nous avons bien reçu votre candidature pour le ${esc(f.intitule)} en apprentissage. Nous vous proposons un entretien de positionnement ; vous trouverez ci-joint la trame d'évaluation des besoins et le test de positionnement à compléter avant l'entretien.</p>`, [pj(c, "Evaluation des besoins apprenti"), pj(c, "Test de positionnement")]),
      deStagiaire(c, aHeure(jo(c.debut, -23), k + "a2", [1020, 1260]), `<p>Bonjour,</p><p>Merci, voici les documents complétés.</p>`, [pj(c, "Evaluation des besoins completee")]),
    ]),
    mail("cfa_convention", "Convention de formation et contrat d'apprentissage (entreprise)", `Contrat d'apprentissage de ${s.prenom} ${s.nom} – documents`, [
      deOF(c, aHeure(jo(c.debut, -15), k + "e1"), `<p>Bonjour,</p><p>Suite à l'accord pour l'accueil de ${esc(s.prenom)} ${esc(s.nom)} en apprentissage, vous trouverez ci-joint la convention de formation, le CERFA du contrat d'apprentissage à compléter et signer, ainsi que le calendrier d'alternance.</p><p>Le contrat doit être transmis à votre OPCO dans les 5 jours suivant le début d'exécution.</p>`, [pj(c, "Convention de formation CFA"), pj(c, "CERFA contrat d apprentissage"), pj(c, "Calendrier d alternance")], tuteur),
    ]),
    mail("cfa_rentree", "Convocation à la rentrée et livret d'accueil", `Rentrée – ${f.intitule}`, [
      deOF(c, aHeure(jo(c.debut, -5), k + "r1"), v(c, "cfa_conv", [v(c, "cfa_rentree", [`<p>${c.appel},</p><p>Votre rentrée au CFA aura lieu le ${fr(c.debut)}, ${modalite(c)}. Vous trouverez ci-joint votre convocation, le livret d'accueil, le règlement intérieur et l'information sur vos droits et devoirs d'apprenti.</p>`, `<p>${c.appel},</p><p>Bienvenue au CFA ! Votre première journée de formation aura lieu le ${fr(c.debut)}, ${modalite(c)}. Vous trouverez ci-joint votre convocation, le livret d'accueil, le règlement intérieur et le document sur vos droits et devoirs d'apprenti, à lire avant la rentrée.</p>`]), `<p>Bonjour,</p><p>Nous vous remercions d'accueillir ${esc(s.prenom)} ${esc(s.nom)} en contrat d'apprentissage. Pour finaliser son inscription, merci de nous retourner signés la convention de formation et le CERFA joints ; le calendrier d'alternance précise les semaines au CFA.</p><p>Le contrat doit être déposé auprès de votre OPCO dans les 5 jours suivant le début d'exécution.</p>`]), [pj(c, "Convocation rentree"), pj(c, "Livret d accueil", false), pj(c, "Droits et devoirs de l apprenti", false)]),
    ]),
    mail("cfa_livret", "Envoi du livret d'apprentissage au maître d'apprentissage", `Livret d'apprentissage – ${s.prenom} ${s.nom}`, [
      deOF(c, aHeure(jo(c.debut, 5), k + "t1"), `<p>Bonjour,</p><p>Vous trouverez ci-joint le livret d'apprentissage de ${esc(s.prenom)} ${esc(s.nom)} et le tableau de correspondance entre les missions en entreprise et les blocs de compétences. Il nous servira de support lors des visites de suivi.</p>`, [pj(c, "Livret d apprentissage"), pj(c, "Missions et blocs de competences")], tuteur),
    ]),
    mail("cfa_visite", "Planification de la visite de suivi en entreprise", `Visite de suivi – ${s.prenom} ${s.nom}`, [
      deOF(c, aHeure(jo(c.debut, 40), k + "v1"), `<p>Bonjour,</p><p>Dans le cadre du suivi de ${esc(s.prenom)} ${esc(s.nom)}, je vous propose une visite en entreprise afin de faire le point sur ses missions et sa progression. Pourriez-vous m'indiquer vos disponibilités sur les deux prochaines semaines ?</p>`, [], tuteur),
    ]),
    mail("cfa_bilan_mi_parcours", "Bilan de mi-parcours", `Bilan de mi-parcours – ${f.intitule}`, [
      deOF(c, aHeure(milieu(c.debut, c.fin), k + "m1"), v(c, "cfa_visite", [`<p>${c.appel},</p><p>Vous êtes à mi-parcours de votre formation. Vous trouverez ci-joint votre bilan intermédiaire : résultats des évaluations, points forts et axes de progrès. Nous en parlerons lors de votre prochain entretien de suivi.</p>`, `<p>Bonjour,</p><p>Afin d'assurer la coordination entre le CFA et l'entreprise, je souhaiterais organiser une visite de suivi de ${esc(s.prenom)} ${esc(s.nom)} : point sur ses missions, sa progression et les compétences à travailler d'ici la prochaine période au CFA. Quelles dates vous conviendraient ?</p>`]), [pj(c, "Bilan intermediaire")]),
    ]),
    mail("cfa_examen", "Information sur l'inscription à la certification", `Inscription à la certification – ${f.intitule}`, [
      deOF(c, aHeure(jo(c.fin, -40), k + "x1"), `<p>${c.appel},</p><p>Votre inscription à la session de certification ${esc(f.codeRNCP || "")} est en cours auprès du certificateur. Vous recevrez votre convocation officielle directement. Pensez à finaliser votre dossier professionnel.</p>`),
    ]),
    mail("cfa_fin", "Fin de formation et évaluation des enseignements", `Fin de formation – votre avis`, [
      deOF(c, aHeure(c.fin, k + "z1", [1000, 1080]), `<p>${c.appel},</p><p>Votre formation se termine. Merci de compléter le questionnaire de satisfaction et la grille d'évaluation des enseignements : vos réponses sont partagées avec l'équipe pédagogique pour améliorer la formation.</p>`, [pj(c, "Questionnaire de satisfaction"), pj(c, "Evaluation des enseignements")]),
    ]),
  ];
}

function scenarioVAE(c: Ctx): MailAuto[] {
  const { f, s } = c;
  const k = `${s.nom}|${s.prenom}`;
  // Même chronologie que les pièces VAE (entretien → faisabilité → contrat → séances → jury).
  const ch = chronoVAE(s, f, c.o);
  const entretien = ch.entretienFaisabilite || jo(c.debut, -25);
  const contrat = ch.contrat || jo(c.debut, -14);
  const premiere = ch.premiereSeance || c.debut;
  const derniere = ch.derniereSeance || c.fin;
  const cpf = /cpf|compte formation/i.test(s.financeur || "");
  const retractation = cpf
    ? "La commande passée sur Mon Compte Formation vaut acceptation des conditions générales de la plateforme, dont le délai de 11 jours ouvrés avant l'entrée en accompagnement."
    : "Vous disposez d'un délai de rétractation de 10 jours à compter de la signature (art. L.6353-5 du Code du travail) ; l'accompagnement débutera ensuite.";
  return [
    mail("vae_demande", "Réponse à la demande d'information VAE", `Votre projet de VAE – ${f.intitule}`, [
      deStagiaire(c, aHeure(jo(entretien, -4), k + "d0", [1000, 1250]), `<p>Bonjour,</p><p>Je souhaite obtenir le ${esc(f.intitule)} par la VAE. Pouvez-vous m'accompagner ?</p>`),
      deOF(c, aHeure(jo(entretien, -3), k + "d1"), `<p>${c.appel},</p><p>Merci pour votre message. La démarche se fait sur la plateforme France VAE (vae.gouv.fr). Nous vous proposons un entretien gratuit pour vérifier l'adéquation de votre expérience avec la certification ${esc(f.codeRNCP || "")} ; vous trouverez ci-joint la présentation de notre accompagnement.</p>`, [pj(c, "Presentation accompagnement VAE", false)]),
    ]),
    mail("vae_faisabilite", "Entretien de faisabilité", `Entretien de faisabilité VAE`, [
      deOF(c, aHeure(jo(entretien, -1), k + "f1"), `<p>${c.appel},</p><p>Je vous confirme notre entretien de faisabilité. Merci de préparer votre CV et la liste de vos expériences en lien avec le référentiel : nous les comparerons bloc par bloc.</p>`),
    ]),
    mail("vae_contrat", "Envoi du contrat d'accompagnement", `Contrat d'accompagnement VAE`, [
      deOF(c, aHeure(jo(contrat, -1), k + "c1"), v(c, "vae_contrat", [`<p>${c.appel},</p><p>Suite à la décision de recevabilité, vous trouverez ci-joint votre contrat d'accompagnement VAE, le règlement intérieur et les conditions générales. ${retractation}</p>`, `<p>${c.appel},</p><p>Votre dossier de faisabilité ayant été déclaré recevable, je vous adresse votre contrat d'accompagnement VAE ainsi que le règlement intérieur. ${retractation}</p>`]), [pj(c, "Contrat d accompagnement VAE"), pj(c, "Reglement interieur", false)]),
      deStagiaire(c, aHeure(contrat, k + "c2"), `<p>Bonjour,</p><p>Ci-joint le contrat signé.</p>`, [pj(c, "Contrat signe")]),
    ]),
    mail("vae_planning", "Planning des séances d'accompagnement", `Planning de vos séances d'accompagnement`, [
      deOF(c, aHeure(jo(premiere, -2), k + "p1"), v(c, "vae_planning", [`<p>${c.appel},</p><p>Vous trouverez ci-joint le planning de vos séances d'accompagnement du ${fr(c.debut)} au ${fr(c.fin)}, ${modalite(c)}.</p>`, `<p>${c.appel},</p><p>Voici le calendrier de nos séances d'accompagnement (${fr(c.debut)} → ${fr(c.fin)}), ${modalite(c)}. Entre les séances, vous pouvez m'envoyer vos écrits pour relecture.</p>`]), [pj(c, "Planning des seances")]),
    ]),
    mail("vae_relecture", "Retour de relecture du dossier de validation", `Relecture de votre dossier de validation`, [
      deStagiaire(c, aHeure(milieu(c.debut, c.fin), k + "r0", [1000, 1260]), `<p>Bonjour,</p><p>Voici la première version de ma description d'activités pour le premier bloc.</p>`, [pj(c, "Dossier de validation V1")]),
      deOF(c, aHeure(jo(milieu(c.debut, c.fin), 2), k + "r1"), `<p>${c.appel},</p><p>Merci pour votre envoi. Mes remarques sont en commentaire : détaillez davantage les situations concrètes (contexte, actions, résultats) pour chaque activité du référentiel.</p>`),
    ]),
    mail("vae_jury", "Préparation à l'entretien avec le jury", `Préparation à l'entretien avec le jury`, [
      deOF(c, aHeure(jo(derniere, -2), k + "j1"), `<p>${c.appel},</p><p>Pour préparer votre passage devant le jury, nous ferons une mise en situation d'entretien lors de la prochaine séance. La date du jury vous sera communiquée par le certificateur.</p>`),
    ]),
    mail("vae_suivi", "Suivi après le jury", `Suivi de votre VAE`, [
      deOF(c, aHeure(jo(c.fin, 25), k + "s1"), `<p>${c.appel},</p><p>Avez-vous reçu la décision du jury ? En cas de validation partielle, nous pouvons étudier ensemble les solutions pour les blocs restants, qui vous sont acquis définitivement pour les blocs validés.</p>`),
    ]),
  ];
}

function scenarioBC(c: Ctx): MailAuto[] {
  const { f, s } = c;
  const k = `${s.nom}|${s.prenom}`;
  return [
    mail("bc_prealable", "Entretien préalable gratuit", `Votre bilan de compétences – entretien préalable`, [
      deOF(c, aHeure(jo(c.debut, -18), k + "a1"), `<p>${c.appel},</p><p>Suite à votre demande, je vous propose un entretien préalable gratuit afin de présenter le déroulement du bilan (trois phases, 24 heures au plus) et de vérifier qu'il répond à votre besoin.</p>`, [pj(c, "Presentation du bilan de competences", false)]),
      deStagiaire(c, aHeure(jo(c.debut, -17), k + "a2", [1000, 1260]), `<p>Bonjour,</p><p>Merci, je suis disponible mardi à 10 h.</p>`),
    ]),
    mail("bc_contrat", "Envoi du contrat ou de la convention et du programme", `Documents de votre bilan de compétences`, [
      deOF(c, aHeure(jo(c.debut, -15), k + "c1"), v(c, "bc_contrat", [`<p>${c.appel},</p><p>Vous trouverez ci-joint votre ${/entreprise|opco|employeur/i.test(s.financeur || "") ? "convention tripartite" : "contrat"}, le programme des trois phases et les conditions générales. Les résultats du bilan vous appartiennent : ils ne seront communiqués à personne sans votre accord écrit.</p>`, `<p>${c.appel},</p><p>Suite à notre entretien préalable, je vous transmets les documents de votre bilan de compétences : ${/entreprise|opco|employeur/i.test(s.financeur || "") ? "la convention tripartite" : "le contrat"}, le programme détaillé des trois phases et les conditions générales. Je vous rappelle que le document de synthèse vous sera remis à vous ${s.civilite === "Mme" ? "seule" : "seul"}.</p>`]), [pj(c, "Contrat bilan de competences"), pj(c, "Programme des trois phases", false)]),
      deStagiaire(c, aHeure(jo(c.debut, -14), k + "c2"), `<p>Bonjour,</p><p>Je vous retourne le document signé. Merci pour ces explications.</p>`, [pj(c, "Contrat signe")]),
    ]),
    mail("bc_planning", "Confirmation du planning des entretiens", `Planning de vos entretiens`, [
      deOF(c, aHeure(jo(c.debut, -2), k + "p1"), `<p>${c.appel},</p><p>Je vous confirme le planning de vos entretiens, du ${fr(c.debut)} au ${fr(c.fin)}, ${modalite(c)}.</p>`, [pj(c, "Planning des entretiens")]),
    ]),
    mail("bc_investigation", "Point d'étape de la phase d'investigation", `Point d'étape de votre bilan`, [
      deOF(c, aHeure(milieu(c.debut, c.fin), k + "i1"), `<p>${c.appel},</p><p>Nous arrivons au terme de la phase d'investigation. Pour notre prochain entretien, merci de préparer vos recherches sur les deux pistes retenues (enquêtes métiers, fiches ROME).</p>`),
    ]),
    mail("bc_synthese", "Remise du document de synthèse", `Votre document de synthèse`, [
      deOF(c, aHeure(c.fin, k + "s1", [1000, 1080]), v(c, "bc_synthese", [`<p>${c.appel},</p><p>Comme convenu lors de notre dernier entretien, vous trouverez ci-joint votre document de synthèse, qui vous est remis à vous ${s.civilite === "Mme" ? "seule" : "seul"}. Merci également de compléter le questionnaire de satisfaction.</p>`, `<p>${c.appel},</p><p>Notre dernier entretien a clôturé votre bilan. Vous trouverez ci-joint votre document de synthèse, qui vous appartient : il ne sera transmis à aucun tiers sans votre accord écrit. Merci de prendre quelques minutes pour le questionnaire de satisfaction.</p>`]), [pj(c, "Document de synthese"), pj(c, "Questionnaire de satisfaction")]),
    ]),
    mail("bc_suivi6mois", "Proposition d'entretien de suivi à 6 mois", `Entretien de suivi de votre bilan`, [
      deOF(c, aHeure(plusMois(c.fin, 6), k + "m1"), `<p>${c.appel},</p><p>Il y a six mois, vous terminiez votre bilan de compétences. Je vous propose, si vous le souhaitez, un entretien de suivi pour faire le point sur la mise en œuvre de votre projet.</p>`),
    ]),
  ];
}

/**
 * Mails d'un stagiaire pour le type d'action du dossier, triés, sans aucun mail
 * postérieur à `aujourdhui` (un dossier d'audit ne montre jamais un mail futur).
 */
export function mailsStagiaire(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, type: TypeAction, aujourdhui: Date = new Date()): MailAuto[] {
  const debut = parseDate(s.dateDebutFormation) || parseDate(f.dateDebut);
  const fin = parseDate(s.dateFinFormation) || parseDate(f.dateFin) || debut;
  if (!debut || !fin || !(s.email || "").trim()) return [];
  const nom = `${s.prenom} ${s.nom}`.trim();
  const c: Ctx = {
    o, f, s, debut, fin, nom,
    appel: s.civilite === "Mme" ? `Bonjour Madame ${s.nom}` : s.civilite === "M." ? `Bonjour Monsieur ${s.nom}` : `Bonjour ${nom}`,
    ofMail: (o.email || "").trim(), ofNom: (o.nom || "").trim(),
    signataire: (o.responsablePedagogique || o.dirigeant || "").trim(),
    distanciel: /distanciel|distance|visio|meet|zoom/i.test(`${f.modalites} ${f.lieu}`),
  };
  const liste = type === "apprentissage" ? scenarioCFA(c) : type === "vae" ? scenarioVAE(c) : type === "bilans-competences" ? scenarioBC(c) : scenarioAF(c);
  return liste
    .map((m) => ({ ...m, messages: m.messages.filter((x) => x.date <= aujourdhui) }))
    .filter((m) => m.messages.length > 0)
    .map((m) => ({ ...m, date: m.messages[m.messages.length - 1].date }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** Tous les modèles de mails possibles (pour le catalogue), indépendamment de la date. */
export function clesMails(type: TypeAction, rqth = false): { key: string; titre: string }[] {
  const d = new Date(2026, 0, 5);
  const fake: Ctx = { o: {} as OrganismeInfo, f: { intitule: "", lieu: "", modalites: "distanciel" } as FormationInfo, s: { nom: "X", prenom: "Y", email: "x@y", rqth: rqth ? "oui" : "non" } as StagiaireInfo, debut: d, fin: d, nom: "", appel: "", ofMail: "", ofNom: "", signataire: "", distanciel: true };
  const l = type === "apprentissage" ? scenarioCFA(fake) : type === "vae" ? scenarioVAE(fake) : type === "bilans-competences" ? scenarioBC(fake) : scenarioAF(fake);
  return l.map((m) => ({ key: m.key, titre: m.titre }));
}

// ───────────────────────── rendu pour les sites ─────────────────────────

function dateGmail(d: Date): string {
  return d.toLocaleString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(" à ", ", ");
}
function dateOutlook(d: Date): string {
  const j = d.toLocaleDateString("fr-FR", { weekday: "short" });
  return `${j} ${d.toLocaleDateString("fr-FR")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
const COULEURS = ["#0F6CBD", "#C239B3", "#498205", "#CA5010", "#8764B8", "#038387", "#986F0B", "#E3008C"];
const couleur = (s: string) => COULEURS[seed(s) % COULEURS.length];

/** Charge utile de window.__prefill pour le site choisi. `precedents` = mails antérieurs du même stagiaire. */
export function payloadCapture(m: MailAuto, client: ClientMail, precedents: MailAuto[] = []): unknown {
  if (client === "gmail") {
    return {
      subject: m.subject,
      messages: m.messages.map((x) => ({ name: x.fromName, mail: x.fromEmail, to: x.toEmail, date: dateGmail(x.date), ago: "", body: x.body, atts: x.atts })),
    };
  }
  const last = m.messages[m.messages.length - 1];
  const pjs = (x: MessageMail) => x.atts.length
    ? `<div class="qatts"><span class="qatts-n"><span class="mdl2">&#xE723;</span> ${x.atts.length} pièce${x.atts.length > 1 ? "s" : ""} jointe${x.atts.length > 1 ? "s" : ""}</span><div class="qatts-l">${x.atts.map((a) => `<span class="qatt"><span class="qatt-ico">PDF</span><span class="qatt-nom">${esc(a.name)}</span><span class="qatt-taille">${esc(a.size)}</span></span>`).join("")}</div></div>`
    : "";
  const quote = m.messages.slice(0, -1).reverse().map((x) => `<div class="quote"><div class="q1"><b>De :</b> ${esc(x.fromName)} &lt;${esc(x.fromEmail)}&gt;<br><b>Envoyé :</b> ${esc(dateOutlook(x.date))}<br><b>Objet :</b> ${esc(m.subject)}</div>${pjs(x)}${x.body}</div>`).join("");
  const texte = (h: string) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return {
    subject: m.messages.length > 1 ? `RE: ${m.subject}` : m.subject,
    // La boîte affichée est toujours celle de l'organisme (expéditeur du premier message).
    acct: m.messages[0].fromEmail,
    fromName: last.fromName, fromEmail: last.fromEmail, toName: last.toName, toEmail: last.toEmail,
    date: dateOutlook(last.date), color: couleur(last.fromName), body: last.body + quote, atts: last.atts,
    history: precedents.slice().reverse().slice(0, 7).map((p) => {
      const l = p.messages[p.messages.length - 1];
      return { from: l.fromName, d: p.date.toLocaleDateString("fr-FR"), subject: p.subject, preview: texte(l.body).slice(0, 80), color: couleur(l.fromName) };
    }),
  };
}

/** Nom de fichier de la capture : date_heure + objet. */
export function nomFichierCapture(m: MailAuto): string {
  const d = m.date;
  const stamp = `${iso(d)}_${String(d.getHours()).padStart(2, "0")}h${String(d.getMinutes()).padStart(2, "0")}`;
  return `${stamp}_${fichier(m.titre).slice(0, 70)}.png`;
}

// ───────────────────────── catalogue ─────────────────────────

/** Type d'action du dossier (un dossier = un type ; AF par défaut). */
export function typeDossier(o: Pick<OrganismeInfo, "typesActions">): TypeAction {
  return (o.typesActions && o.typesActions[0]) || "actions-formation";
}

/** Entrées de catalogue (dossier MAILS) : une capture par mail et par stagiaire. */
export function entreesCatalogueMails(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): { id: string; nom: string; critere: number; indicateur: number; template: string; params: Record<string, unknown> }[] {
  const type = typeDossier(o);
  const client = clientMailOrganisme(o) === "gmail" ? "Gmail" : "Outlook";
  const out: ReturnType<typeof entreesCatalogueMails> = [];
  stagiaires.forEach((s, si) => {
    if (!(s.nom || "").trim()) return;
    mailsStagiaire(o, f, s, type).forEach((m) => {
      out.push({
        id: `mail_capture_${m.key}_${si}`,
        nom: `MAIL - ${m.titre} (${client}, ${m.date.toLocaleDateString("fr-FR")}) – ${s.prenom} ${s.nom}`,
        critere: 0, indicateur: 0, template: "mail_capture",
        params: { stagiaireIdx: si, mailKey: m.key },
      });
    });
  });
  return out;
}

/** Mail d'un stagiaire retrouvé par sa clé, avec les mails qui le précèdent (liste Outlook). */
export function retrouverMail(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, key: string): { mail: MailAuto; precedents: MailAuto[] } | null {
  const all = mailsStagiaire(o, f, s, typeDossier(o));
  const i = all.findIndex((m) => m.key === key);
  return i < 0 ? null : { mail: all[i], precedents: all.slice(0, i) };
}

/** Rendu HTML simple (aperçu texte, export Word) quand la capture image n'est pas disponible. */
export function mailHtmlSimple(m: MailAuto): string {
  const blocs = m.messages.map((x) => `<div style="border-bottom:1px solid #ddd;padding:12px 0"><p style="margin:0"><b>${esc(x.fromName)}</b> &lt;${esc(x.fromEmail)}&gt; — ${esc(x.date.toLocaleString("fr-FR"))}<br>À : ${esc(x.toName)} &lt;${esc(x.toEmail)}&gt;</p>${x.body}${x.atts.length ? `<p><i>Pièces jointes : ${x.atts.map((a) => esc(a.name)).join(", ")}</i></p>` : ""}</div>`).join("");
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;font-size:13px;padding:24px;max-width:860px;margin:auto}</style></head><body><h2>${esc(m.subject)}</h2>${blocs}</body></html>`;
}
