import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { RUBRIQUES, type CerfaRapport } from "@/lib/cerfa/validation";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  titre: string;
  rapport: CerfaRapport | null;
  onGenerer?: () => void;
}

const fmtDate = (iso: string) => iso.split("-").reverse().join("/");

/** Écran récapitulatif de contrôle avant génération du CERFA 10103*14. */
const CerfaControleDialog = ({ open, onOpenChange, titre, rapport, onGenerer }: Props) => {
  if (!rapport) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {rapport.ok ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
            Contrôle CERFA 10103*14 — {titre}
          </DialogTitle>
          <DialogDescription>
            {rapport.bloquants.length} point(s) bloquant(s), {rapport.avertissements.length} avertissement(s).
            Aucune valeur n'est inventée : les données manquantes doivent être saisies.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {RUBRIQUES.map((rub) => {
            const items = rapport.findings.filter((x) => x.rubrique === rub);
            if (!items.length) return null;
            return (
              <div key={rub} className="border rounded-lg overflow-hidden">
                <div className="px-3 py-2 bg-muted text-sm font-semibold">{rub}</div>
                <table className="w-full text-xs">
                  <thead className="text-muted-foreground">
                    <tr>
                      <th className="text-left p-2 w-1/4">Champ</th>
                      <th className="text-left p-2 w-1/4">Valeur observée</th>
                      <th className="text-left p-2">Correction attendue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, i) => (
                      <tr key={i} className="border-t align-top">
                        <td className="p-2 font-medium">
                          <span className="inline-flex items-center gap-1">
                            {it.niveau === "bloquant" ? (
                              <XCircle className="w-3 h-3 text-destructive shrink-0" />
                            ) : (
                              <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                            )}
                            {it.champ}
                          </span>
                        </td>
                        <td className="p-2 text-muted-foreground">{it.observe}</td>
                        <td className="p-2">{it.attendu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}

          {rapport.periodes.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <div className="px-3 py-2 bg-muted text-sm font-semibold">Rémunération calculée</div>
              <table className="w-full text-xs">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="text-left p-2">Année de contrat</th>
                    <th className="text-left p-2">Période</th>
                    <th className="text-left p-2">Tranche d'âge</th>
                    <th className="text-left p-2">Taux</th>
                  </tr>
                </thead>
                <tbody>
                  {rapport.periodes.map((p, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{p.anneeContrat}</td>
                      <td className="p-2">
                        du {fmtDate(p.debut)} au {fmtDate(p.fin)}
                      </td>
                      <td className="p-2">{p.trancheAge}</td>
                      <td className="p-2">
                        {p.pourcentage === null ? "barème absent" : `${p.pourcentage} % du ${p.base}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-3 py-2 text-xs text-muted-foreground border-t">
                {rapport.smicRef
                  ? `SMIC de référence : ${rapport.smicRef.montant_mensuel_35h.toFixed(2)} € (effet ${fmtDate(rapport.smicRef.date_effet)}${rapport.smicRef.source ? ` — ${rapport.smicRef.source}` : ""})`
                  : "SMIC de référence non renseigné pour cette date."}
                {rapport.salaireMensuel !== null &&
                  ` — Salaire brut mensuel à l'embauche : ${rapport.salaireMensuel.toFixed(2)} €`}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          {onGenerer && (
            <Button disabled={!rapport.ok} onClick={onGenerer}>
              Générer le CERFA
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CerfaControleDialog;
