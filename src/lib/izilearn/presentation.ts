import { footer } from "@/lib/docBuilder";
import type { OrganismeInfo } from "@/types/qualiopi";
import type { Contexte } from "./pieces";
import { esc } from "./trames";

export function revisionHtml(o: OrganismeInfo): string {
  const date = new Date(`${o.dateMaj}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return `<p class="document-revision">Mise à jour : ${date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} · Version ${esc(o.version || "1")}</p>`;
}

export function appliquerRevision(html: string, o: OrganismeInfo): string {
  // Le pied de page standard (docBuilder.footer) affiche déjà « V{version} {dateMaj} » :
  // ne rien ajouter de plus pour éviter la mention « Mise à jour » en double.
  const bloc = footer(o);
  if (/<div class="footer">/.test(html)) return html.replace(/<div class="footer">[\s\S]*?<\/div>/, bloc);
  return html.replace(/<\/body>/i, `${bloc}</body>`);
}

/** Complements the action-specific booklet without altering shared templates. */
export function developperLivret(html: string, cx: Contexte): string {
  const { o, f, p } = cx;
  html = html.replace(/À définir selon le groupe/g, esc(f.duree))
    .replace(/Horaires\s*:\s*Lun-Ven 09h00-12h30 \/ 13h30-17h00 \(7 h\/jour\)/g, "Horaires : selon le planning de votre session IZILearn");
  const rows = [
    ["Organisme", o.nom], ["Adresse", [o.adresse, o.codePostal, o.ville].filter(Boolean).join(" ")],
    ["Contact administratif et pédagogique", o.dirigeant], ["E-mail", o.email], ["Téléphone", o.telephone],
    ["Référent handicap", o.referentHandicap], ["Formateur", f.formateur], ["Lieu", f.lieu],
  ].filter(([, value]) => value);
  const distant = /distanciel|elearning|hybride|mixte/i.test(p.session.modalite);
  const supplement = `<section>
    <h2>Votre accueil et vos interlocuteurs</h2>
    <p>Bienvenue chez ${esc(o.nom)} pour votre parcours « ${esc(f.intitule)} ». Dès l’accueil, vous pouvez faire préciser les objectifs, les étapes du programme et les modalités d’évaluation. Signalez toute difficulté afin d’examiner les adaptations nécessaires avec votre interlocuteur pédagogique.</p>
    <table><thead><tr><th>Interlocuteur / information</th><th>Coordonnées</th></tr></thead><tbody>${rows.map(([label, value]) => `<tr><td>${esc(label)}</td><td>${esc(value)}</td></tr>`).join("")}</tbody></table>
    <h2>Avant le démarrage du parcours</h2>
    <p>Prenez connaissance de votre convocation, du programme et du règlement intérieur. Vérifiez vos disponibilités et communiquez vos besoins particuliers. Le positionnement initial et l’analyse des besoins permettent de préciser votre point de départ et les priorités de votre accompagnement.</p>
    ${distant ? `<h2>Accès à votre espace IZILearn</h2><p>Consultez les informations d’accès dans votre session IZILearn : planning, supports, exercices et documents. Avant une séance à distance, vérifiez votre connexion, le son et le microphone. Les informations de classe virtuelle sont celles communiquées dans la session ; en cas de difficulté, contactez l’organisme.</p>` : `<h2>Organisation des séances</h2><p>Reportez-vous à la convocation et au planning pour le lieu et les horaires. Préparez les documents et le matériel demandés par le formateur. Les consignes d’accès aux locaux et de sécurité sont à respecter pendant les séances.</p>`}
    <h2>Votre progression et votre suivi</h2><p>Les supports et activités suivent les objectifs du programme. Les exercices et échanges avec le formateur permettent de suivre votre progression et d’identifier les points à retravailler. Les modalités d’évaluation prévues sont présentées au début du parcours. Conservez vos productions et consultez les retours du formateur.</p>
    <h2>Assiduité, absence et difficultés</h2><p>Respectez les horaires communiqués et participez aux activités prévues. Signalez dès que possible une absence ou un retard à l’organisme et, si nécessaire, à votre entreprise. Les présences et connexions sont relevées selon les modalités de la session. En cas de risque d’interruption, contactez votre interlocuteur pédagogique pour examiner les solutions possibles.</p>
    <h2>Accessibilité et besoins spécifiques</h2><p>Vous pouvez signaler un besoin d’aménagement avant ou pendant le parcours au référent handicap${o.referentHandicap ? `, ${esc(o.referentHandicap)}` : " ou à l’organisme"}. Les possibilités d’adaptation des supports, du rythme ou des conditions matérielles sont examinées avec vous, sans préjuger de leur mise en place.</p>
    <h2>Réclamations, confidentialité et fin de parcours</h2><p>Pour toute réclamation, adressez à l’organisme les faits, la date et les éléments utiles à leur examen. Respectez la confidentialité des informations partagées et le droit d’utilisation des supports. En fin de parcours, votre retour de satisfaction permet d’identifier les améliorations utiles ; les documents de clôture sont remis selon votre situation et les modalités prévues.</p>
  </section>`;
  return html.includes('<div class="footer">') ? html.replace('<div class="footer">', `${supplement}<div class="footer">`) : html.replace(/<\/body>/i, `${supplement}</body>`);
}