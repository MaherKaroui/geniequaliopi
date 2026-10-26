/**
 * Orienta Campus : les parcours envoyés (code du parcours + intitulé de la plateforme) sont rattachés
 * aux formations du catalogue Génie Qualiopi qui portent leur contenu (presets builtinOrienta) :
 * VTest Business English RS6905 (A2, B1, B2, C1) et Product Builder No-Code RNCP41480 (titre et blocs).
 * Un parcours inconnu (ou adapté sous un autre code) garde son intitulé.
 */
import { PBNC_FORMATIONS, VTEST_FORMATIONS } from "@/lib/orientaFormations";

const NIVEAUX = ["A2", "B1", "B2", "C1"];

export function intituleOrienta(code: string, intitule: string): string {
  const c = code.trim().toUpperCase();
  const t = intitule.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const pbnc = c.match(/^PBNC-(?:BC0([1-4])-)?\d+H$/);
  if (pbnc) return PBNC_FORMATIONS[Number(pbnc[1] || 0)].intitule;
  const niv = c.match(/^(A2|B1|B2|C1)-\d+H$/)?.[1];
  if (niv) return VTEST_FORMATIONS[NIVEAUX.indexOf(niv)].intitule;
  // Repli sur l'intitulé affiché par Orienta Campus.
  const bloc = t.match(/product builder no-code.*bloc\s*([1-4])/)?.[1];
  if (bloc) return PBNC_FORMATIONS[Number(bloc)].intitule;
  if (/product builder no-code/.test(t)) return PBNC_FORMATIONS[0].intitule;
  const p = t.match(/^parcours (a2|b1|b2|c1)\b/)?.[1]?.toUpperCase();
  if (p) return VTEST_FORMATIONS[NIVEAUX.indexOf(p)].intitule;
  return intitule;
}
