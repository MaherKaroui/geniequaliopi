/**
 * BLOC 2 / 7 / 8 — Écran « Contrôle de cohérence » obligatoire avant export BDC.
 * Tant qu'une règle bloquante échoue, l'export est désactivé.
 */
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildBdcContext, formatDuree, formatPrix, typeContrat, mentionNDA } from "@/lib/bdc/bdcModel";
import { validerDossierBDC, calculerCouverture, INDICATEURS_NON_APPLICABLES_BC } from "@/lib/bdc/bdcValidation";
import { PIECES_CONTRACTUELLES } from "@/lib/bdc/bdcTemplatesBC";
import StatutSignatures from "./StatutSignatures";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  organisme: OrganismeInfo;
  formation: FormationInfo;
  beneficiaires: StagiaireInfo[];
  onConfirm: () => void;
}

export default function BdcControleCoherence({ open, onOpenChange, organisme, formation, beneficiaires, onConfirm }: Props) {
  const [alertesLues, setAlertesLues] = useState(false);
  const [piecesSignees, setPiecesSignees] = useState<Record<string, boolean>>({});

  const ctx = useMemo(() => buildBdcContext(organisme, formation, beneficiaires), [organisme, formation, beneficiaires]);
  const rapport = useMemo(() => validerDossierBDC(ctx), [ctx]);
  const couverture = useMemo(() => calculerCouverture([]), []);

  const ko = rapport.bloquantes.filter((r) => !r.ok);
  const alertes = rapport.alertes.filter((r) => !r.ok);
  const signaturesOk = PIECES_CONTRACTUELLES.every((p) => piecesSignees[p]);
  const exportOk = ko.length === 0 && signaturesOk && (alertes.length === 0 || alertesLues);
  const applicables = couverture.filter((c) => c.statut !== "non_applicable").length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" /> Contrôle de cohérence du dossier
          </DialogTitle>
          <DialogDescription>
            Vérification obligatoire avant export : règles bloquantes, alertes, pièces signées et couverture des indicateurs.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[55vh] pr-4">
          <section className="mb-5">
            <StatutSignatures ctx={ctx} />
          </section>

          <section className="mb-5 rounded-md border bg-muted/40 p-3 text-sm">
            <p className="font-medium">{ctx.organisme.raisonSociale}</p>
            <p className="text-muted-foreground">{mentionNDA(ctx.organisme)}</p>
            <p className="mt-2">{typeContrat(ctx.prestation).libelle}</p>
            <p>{formatDuree(ctx.prestation)}</p>
            <p>Prix : {formatPrix(ctx.organisme, ctx.prestation)}</p>
            <p>Financeur : {ctx.prestation.financeur} · Bénéficiaires : {ctx.beneficiaires.length}</p>
          </section>

          <section className="mb-5">
            <h3 className="mb-2 text-sm font-semibold">Règles bloquantes</h3>
            <ul className="space-y-1 text-sm">
              {rapport.bloquantes.map((r) => (
                <li key={r.code} className="flex items-start gap-2">
                  {r.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}
                  <span className={r.ok ? "text-muted-foreground" : "text-destructive"}>
                    <strong>{r.code}</strong> — {r.libelle}
                    {!r.ok && r.message ? ` → ${r.message}` : ""}
                    {!r.ok && r.details?.length ? (
                      <ul className="ml-4 list-disc text-xs">{r.details.map((d, i) => <li key={i}>{d}</li>)}</ul>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-5">
            <h3 className="mb-2 text-sm font-semibold">Alertes</h3>
            {alertes.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune alerte.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {alertes.map((r) => (
                  <li key={r.code} className="flex items-start gap-2 text-amber-700 dark:text-amber-500">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span><strong>{r.code}</strong> — {r.message}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-5">
            <h3 className="mb-2 text-sm font-semibold">Pièces contractuelles signées</h3>
            <ul className="space-y-2 text-sm">
              {PIECES_CONTRACTUELLES.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Checkbox
                    id={`sign-${p}`}
                    checked={!!piecesSignees[p]}
                    onCheckedChange={(v) => setPiecesSignees((s) => ({ ...s, [p]: !!v }))}
                  />
                  <label htmlFor={`sign-${p}`} className="cursor-pointer">{p}</label>
                  <Badge variant={piecesSignees[p] ? "default" : "secondary"}>
                    {piecesSignees[p] ? "signée" : "en attente"}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold">Couverture des indicateurs</h3>
            <p className="text-sm text-muted-foreground">
              {applicables} indicateurs applicables en bilan de compétences. Non applicables : {INDICATEURS_NON_APPLICABLES_BC.join(", ")}.
              Le détail pièce par pièce est joint au ZIP (fichier <code>00_CONTROLE_DE_COHERENCE.txt</code>).
            </p>
          </section>
        </ScrollArea>

        <div className="space-y-3 border-t pt-3">
          {alertes.length > 0 && (
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={alertesLues} onCheckedChange={(v) => setAlertesLues(!!v)} />
              J'ai pris connaissance des {alertes.length} alerte(s) et j'assume l'export.
            </label>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button disabled={!exportOk} onClick={() => { onOpenChange(false); onConfirm(); }}>
              {exportOk ? "Exporter le dossier" : `Export bloqué (${ko.length} règle(s) KO)`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
