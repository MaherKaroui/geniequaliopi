import type { StagiaireInfo } from "@/types/qualiopi";

/** Recherche publique (annuaire des entreprises, data.gouv) : seules les données officielles retournées sont reprises. */
export async function rechercherEntrepriseParSiret(siretBrut: string): Promise<Partial<StagiaireInfo> | null> {
  const siret = siretBrut.replace(/\D/g, "");
  if (siret.length !== 14 && siret.length !== 9) throw new Error("Le SIRET doit contenir 14 chiffres.");
  const res = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${siret}&page=1&per_page=1`);
  if (!res.ok) throw new Error("Service de recherche indisponible.");
  const json = await res.json();
  const r = json?.results?.[0];
  if (!r) return null;
  const etab = (r.matching_etablissements || []).find((e: any) => e.siret === siret) || r.siege || {};
  const ape = String(etab.activite_principale || r.activite_principale || "").replace(".", "");
  const idcc = (etab.liste_idcc || r.complements?.liste_idcc || []).find((c: string) => c && c !== "9999");
  const dir = (r.dirigeants || []).find((d: any) => d.type_dirigeant === "personne physique");
  const prenom = String(dir?.prenoms || "").split(/\s+/)[0].toLowerCase().replace(/(^|-)\p{L}/gu, (m: string) => m.toUpperCase());
  const dirigeantNom = dir ? `${prenom} ${String(dir.nom || "").toUpperCase()}`.trim() : "";
  return {
    entreprise: r.nom_complet || r.nom_raison_sociale || "",
    adresseEntreprise: etab.adresse || "",
    siretEntreprise: etab.siret || siret,
    cerfaApe: ape,
    cerfaIdcc: idcc || "",
    responsableEntreprise: dirigeantNom,
    dateNaissanceResponsable: /^\d{4}-\d{2}-\d{2}$/.test(dir?.date_de_naissance || "") ? dir.date_de_naissance : "",
    dateNaissanceMoisResponsable: dir?.date_de_naissance || "",
    posteResponsable: dir?.qualite || "",
    cerfaPublic: String(r.nature_juridique || "").startsWith("7"),
  } as any;
}
