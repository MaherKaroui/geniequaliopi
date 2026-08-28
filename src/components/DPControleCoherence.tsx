import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { controlerSessionDp } from "@/lib/dp/dpControles";

interface Props {
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  /** Lancé uniquement si aucun contrôle bloquant n'est en échec. */
  onExport: () => void;
  triggerLabel?: string;
  triggerClassName?: string;
}

/**
 * Écran de contrôle avant export des DP (45A) et ECF (45B).
 * L'export est refusé tant qu'une duplication ou une période d'exercice
 * invalide subsiste.
 */
export function DPControleCoherence({
  organisme,
  formation,
  stagiaires,
  onExport,
  triggerLabel = "Contrôler et générer",
  triggerClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const resultat = useMemo(
    () => (open ? controlerSessionDp(organisme, formation, stagiaires) : { anomalies: [], exportAutorise: false }),
    [open, organisme, formation, stagiaires],
  );

  const parRegle = resultat.anomalies.reduce<Record<string, typeof resultat.anomalies>>((acc, a) => {
    (acc[a.regle] ||= []).push(a);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          <ShieldAlert className="w-4 h-4 mr-2" /> {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Contrôle de cohérence — Dossiers professionnels</DialogTitle>
          <DialogDescription>
            Vérification bloquante des périodes d'exercice et des duplications entre dossiers avant génération.
          </DialogDescription>
        </DialogHeader>

        {resultat.exportAutorise ? (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Aucune anomalie détectée</AlertTitle>
            <AlertDescription>
              Les {stagiaires.length} dossier(s) présentent des périodes d'exercice valides et des contenus distincts.
            </AlertDescription>
          </Alert>
        ) : (
          <ScrollArea className="max-h-80 pr-3">
            <div className="space-y-3">
              {Object.entries(parRegle).map(([regle, items]) => (
                <Alert variant="destructive" key={regle}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center gap-2">
                    {regle} <Badge variant="secondary">{items.length}</Badge>
                  </AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      {items.slice(0, 12).map((a, i) => (
                        <li key={i}>
                          <strong>{a.candidat}</strong> — {a.message}
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </ScrollArea>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fermer
          </Button>
          <Button
            disabled={!resultat.exportAutorise}
            onClick={() => {
              setOpen(false);
              onExport();
            }}
          >
            Générer le pack
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DPControleCoherence;
