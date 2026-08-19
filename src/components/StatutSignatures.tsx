/**
 * MESSAGE 13 — PARTIE E : tableau de bord « Statut de signature ».
 * Une ligne par pièce, trois colonnes (bénéficiaire / consultant / organisme),
 * trois états : signé le {date} · en attente · non requis.
 */
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BellRing, PenLine } from "lucide-react";
import type { BdcContext, Beneficiaire } from "@/lib/bdc/bdcModel";
import { MATRICE_SIGNATURES, partiesPour, type RoleSignature } from "@/lib/bdc/signatureMatrix";

interface Props {
  ctx: BdcContext;
  /** Bénéficiaire affiché pour les pièces individuelles */
  beneficiaire?: Beneficiaire | null;
  onManquantes?: (pieces: string[]) => void;
}

const COLS: Array<{ role: RoleSignature; titre: string }> = [
  { role: "B", titre: "Bénéficiaire" },
  { role: "C", titre: "Consultant" },
  { role: "O", titre: "Organisme" },
];

export default function StatutSignatures({ ctx, beneficiaire, onManquantes }: Props) {
  const b = beneficiaire ?? ctx.beneficiaires[0] ?? null;

  const lignes = useMemo(
    () =>
      MATRICE_SIGNATURES.map((regle) => {
        const parties = partiesPour(ctx, regle, b);
        const etats = COLS.map(({ role }) => {
          const p = parties.find((x) => x.role === role);
          if (!p) return { role, statut: "non_requis" as const, date: "" };
          return { role, statut: p.image ? ("signe" as const) : ("attente" as const), date: p.date };
        });
        const tamponManquant = regle.tampon && !ctx.organisme.tamponUrl;
        return { regle, etats, tamponManquant };
      }),
    [ctx, b],
  );

  const manquantes = lignes
    .filter((l) => l.etats.some((e) => e.statut === "attente") || l.tamponManquant)
    .map((l) => l.regle.piece);

  if (onManquantes) onManquantes(manquantes);

  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2">
        <PenLine className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-semibold">Statut de signature{b ? ` — ${b.prenom} ${b.nom}` : ""}</h4>
      </div>
      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-xs">
          <thead className="bg-muted/60">
            <tr>
              <th className="p-2 text-left font-medium">Pièce</th>
              {COLS.map((c) => (
                <th key={c.role} className="p-2 text-left font-medium">{c.titre}</th>
              ))}
              <th className="p-2 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map(({ regle, etats, tamponManquant }) => (
              <tr key={regle.rang} className="border-t align-top">
                <td className="p-2">
                  <span className="font-medium">{regle.piece}</span>
                  <div className="text-[10px] text-muted-foreground">{regle.dateLibelle}{regle.tampon ? " · tampon requis" : ""}</div>
                </td>
                {etats.map((e) => (
                  <td key={e.role} className="p-2">
                    {e.statut === "non_requis" && <span className="text-muted-foreground">non requis</span>}
                    {e.statut === "signe" && <Badge variant="secondary">signé le {e.date}</Badge>}
                    {e.statut === "attente" && <Badge variant="destructive">en attente</Badge>}
                  </td>
                ))}
                <td className="p-2">
                  {(etats.some((e) => e.statut === "attente") || tamponManquant) && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-[11px]"
                      onClick={() =>
                        toast.info(`Relance de signature — ${regle.piece}`, {
                          description: tamponManquant
                            ? "Téléversez le tampon de l'organisme dans le formulaire Organisme."
                            : "Ajoutez la signature manquante dans le formulaire correspondant (Organisme, Formation ou Stagiaire).",
                        })
                      }
                    >
                      <BellRing className="h-3 w-3" /> Relancer
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {manquantes.length > 0 && (
        <p className="text-xs text-destructive">
          {manquantes.length} pièce(s) sans signature complète : {manquantes.slice(0, 4).join(", ")}
          {manquantes.length > 4 ? "…" : ""}
        </p>
      )}
    </section>
  );
}
