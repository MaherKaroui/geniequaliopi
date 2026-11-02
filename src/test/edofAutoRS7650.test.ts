import { describe, expect, it } from "vitest";
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { PDFDocument } from "pdf-lib";
import { formationRealisee, grouperSessions, lireExportEdof } from "@/lib/edofAuto/candidats";
import { genererPackRS7650, reponsesDe, type ContexteRS7650 } from "@/lib/edofAuto/rs7650Pdf";
import { competenceValidee, CORRIGE_THEO, SEUIL_THEO } from "@/lib/edofAuto/rs7650Reponses";
import { THEO_QUESTIONS } from "@/lib/edofAuto/rs7650Layout";

const ENTETE = "NUMERO_DOSSIER;CIVILITE;NOM;PRENOM;DATE_DE_NAISSANCE;DEPARTEMENT_LIEU_DE_NAISSANCE;VILLE_LIEU_DE_NAISSANCE;PAYS_LIEU_DE_NAISSANCE;ADRESSE_POSTALE;ADRESSE_CODE_POSTAL;ADRESSE_VILLE;ADRESSE_PAYS;COURRIEL;NUMERO_TELEPHONE_FIXE;NUMERO_TELEPHONE_PORTABLE;REF_REPERTOIRE;CODE_CERTIF/THEM;INTITULE_CERTIF/THEM;BLOCS_COMP_RNCP_RETENUS;BLOCS_COMP_RNCP_EXCLUS;NUMERO_FORMATION;NUMERO_ACTION;NUMERO_SESSION;INTITULE_FORMATION;DATE_DEBUT_SESSION;DATE_FIN_SESSION;LIEU_FORMATION_IDENTIFIANT;LIEU_FORMATION_CODE_POSTAL;LIEU_FORMATION_VILLE;LIEU_FORMATION_PAYS;STATUT_DOSSIER;DATE_DERNIERE_ACTION;EN_CONTROLE;ABONDEMENT_FT;DATE_INSCRIPTION;TAUX_REALISATION_SAISI;MOTIF_DE_SORTIE_FINAL;CAS_FORCE_MAJEURE_TITULAIRE;MONTANT_FORMATION;MONTANT_FRAIS_ANNEXES;MONTANT_FACTURABLE;MONTANT_FACTURE";
const ligne = (n: string, civ: string, nom: string, prenom: string, naiss: string, debut: string, fin: string, statut: string) =>
  `${n};${civ};${nom};${prenom};${naiss};93;BONDY;FRANCE;12 rue des Lilas;93250;VILLEMOMBLE;FRANCE;${prenom.toLowerCase()}@exemple.fr;;0612345678;RS;RS7650;Mettre en valeur le regard par la pose d'extensions et le rehaussement de cils;;;F1;A1;S1;Extension et rehaussement de cils;${debut};${fin};;93250;VILLEMOMBLE;FRANCE;${statut};${fin};NON;;01/04/2026;100.00;;NON;1500.00;0.00;1500.00;`;

// Candidats fictifs (aucune personne réelle)
const CSV = [
  ENTETE,
  ligne("100000000001", "Madame", "TESTA", "ALICE", "12/03/1995", "15/05/2026", "17/05/2026", "Service fait validé"),
  ligne("100000000002", "Madame", "EXEMPLE", "BÉATRICE", "02/11/1988", "15/05/2026", "17/05/2026", "Service fait déclaré"),
  ligne("100000000003", "Madame", "FICTIF", "CHLOÉ", "30/07/2001", "15/05/2026", "17/05/2026", "Sortie de formation"),
  ligne("100000000004", "Monsieur", "MODELE", "DAVID", "05/01/1992", "15/05/2026", "17/05/2026", "Service fait validé"),
  ligne("100000000005", "Madame", "ESSAI", "EMMA", "21/09/1990", "15/05/2026", "17/05/2026", "Service fait validé"),
  ligne("100000000006", "Madame", "PROTO", "FANNY", "14/02/1985", "15/05/2026", "17/05/2026", "Service fait validé"),
  ligne("100000000007", "Madame", "ANNULEE", "GAELLE", "14/02/1985", "15/05/2026", "17/05/2026", "Annulé par le titulaire"),
  ligne("100000000008", "Madame", "AUTRE", "HELENE", "08/08/1999", "01/06/2026", "04/06/2026", "Service fait validé"),
].join("\n");

const ctx: ContexteRS7650 = {
  centre: { nom: "CENTRE D'ESSAI", adresse: "1 rue de l'Essai 93250 Villemomble", ville: "Villemomble" },
  jury: [
    { civilite: "Mme", nom: "Juré Un", statut: "Jury", qualite: "Représentante du certificateur" },
    { civilite: "Mme", nom: "Juré Deux", statut: "Jury", qualite: "Membre externe" },
    { civilite: "Mme", nom: "Juré Trois", statut: "Jury", qualite: "Membre externe" },
  ],
};
const charger = async (f: string) => {
  const b = readFileSync(join(__dirname, "../../public/edof-auto/rs7650", f));
  return new Uint8Array(b);
};

describe("Automatisation EDOF — RS7650", () => {
  const exp = lireExportEdof(new TextEncoder().encode(CSV).buffer, "Export_Tous les dossiers_90012810900023_20261102.csv");
  const retenus = exp.candidats.filter((c) => formationRealisee(c.statut));
  const sessions = grouperSessions(retenus);

  it("lit le CSV EDOF, le SIRET du nom de fichier et regroupe les sessions", () => {
    expect(exp.siret).toBe("90012810900023");
    expect(exp.candidats).toHaveLength(8);
    expect(exp.candidats[1]).toMatchObject({ nom: "EXEMPLE", prenom: "Béatrice", civilite: "Mme", dateNaissance: "1988-11-02", codeCertif: "RS7650", dateFin: "2026-05-17" });
    expect(retenus).toHaveLength(7); // dossier annulé écarté
    expect(sessions.map((s) => [s.dateExamen, s.candidats.length])).toEqual([["2026-05-17", 6], ["2026-06-04", 1]]);
  });

  it("donne des copies différentes, stables et toujours admissibles", () => {
    expect(CORRIGE_THEO).toHaveLength(THEO_QUESTIONS.length);
    const reps = retenus.map(reponsesDe);
    expect(JSON.stringify(reponsesDe(retenus[0]))).toBe(JSON.stringify(reps[0]));
    const signatures = new Set(reps.map((r) => JSON.stringify(r.theo.map((t) => t.choix))));
    expect(signatures.size).toBe(reps.length);
    for (const r of reps) {
      expect(r.noteTheo).toBeGreaterThan(SEUIL_THEO);
      expect(r.theo.filter((t) => t.juste)).toHaveLength(r.noteTheo);
      expect(r.pratique.every(competenceValidee)).toBe(true);
      expect(r.noteMiseEnSituation).toBe(6);
      expect(r.admis).toBe(true);
      expect(r.positionnement.prerequisRemplis).toBe("Oui");
    }
  });

  it("produit le pack complet de PDF remplis", async () => {
    const pack = await genererPackRS7650(sessions, ctx, charger);
    expect(pack.filter((f) => f.chemin.endsWith(".pdf"))).toHaveLength(7 * 4 + 2 + 2);
    const pv = await PDFDocument.load(pack.find((f) => f.chemin.includes("PV_session_2026-05-17"))!.donnees);
    expect(pv.getPageCount()).toBe(2); // 6 candidats, 5 lignes par page
    const out = process.env.EDOF_OUT;
    if (out) for (const f of pack) { const p = join(out, f.chemin); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, f.donnees); }
  }, 60000);
});
