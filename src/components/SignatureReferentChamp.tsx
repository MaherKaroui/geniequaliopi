import SignatureChamp from "@/components/SignatureChamp";
import { referentEstDirigeant, signaturePropreReferent, type CleReferent } from "@/lib/signaturesReferents";
import type { OrganismeInfo } from "@/types/qualiopi";

/**
 * Sous le nom d'un référent : même nom que le dirigeant → note (sa signature est reprise) ;
 * personne différente → case de signature propre au référent.
 */
export default function SignatureReferentChamp({ data, cle, libelle, onChange }: {
  data: OrganismeInfo; cle: CleReferent; libelle: string; onChange: (patch: Partial<OrganismeInfo>) => void;
}) {
  const nom = ((data[cle] as string | undefined) || "").trim();
  if (!nom) return null;
  if (cle === "referentQualite" && /fd\s*certif/i.test(nom)) return null;
  if (referentEstDirigeant(data, cle)) {
    return <p className="text-[11px] text-muted-foreground mt-1">Même personne que le dirigeant : sa signature est reprise automatiquement sur les pièces du {libelle}.</p>;
  }
  return (
    <div className="mt-2">
      <p className="text-[11px] text-muted-foreground mb-1">Personne différente du dirigeant : ajoutez la signature de {nom} ({libelle}).</p>
      <SignatureChamp compact valeur={signaturePropreReferent(data, cle)} libelle={`Signature — ${nom}`} onChange={(v) => {
        const sigs = { ...(data.signatureReferents || {}) };
        if (v) sigs[cle] = v; else delete sigs[cle];
        onChange({ signatureReferents: sigs, ...(cle === "referentQualite" ? { referentQualiteSignatureUrl: v } : {}) });
      }} />
    </div>
  );
}
