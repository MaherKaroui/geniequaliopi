import { CritereData } from "@/types/qualiopi";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


interface CriteresFormProps {
  data: CritereData[];
  onChange: (data: CritereData[]) => void;
}

const CriteresForm = ({ data, onChange }: CriteresFormProps) => {
  const updateIndicateur = (critereIdx: number, indicateurIdx: number, value: string) => {
    const updated = [...data];
    updated[critereIdx] = {
      ...updated[critereIdx],
      indicateurs: updated[critereIdx].indicateurs.map((ind, i) =>
        i === indicateurIdx ? { ...ind, reponse: value } : ind
      )
    };
    onChange(updated);
  };

  const getProgress = (critere: CritereData) => {
    const filled = critere.indicateurs.filter(i => i.reponse.trim().length > 0).length;
    return Math.round((filled / critere.indicateurs.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Critères & Indicateurs Qualiopi</h2>
        <p className="text-sm text-muted-foreground">Répondez aux 33 indicateurs des 7 critères</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {data.map((critere, cIdx) => {
          const progress = getProgress(critere);
          return (
            <AccordionItem key={critere.numero} value={`critere-${critere.numero}`} className="bg-card border rounded-xl shadow-card px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {critere.numero}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate pr-4">Critère {critere.numero}</p>
                    <p className="text-xs text-muted-foreground truncate pr-4">{critere.titre}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-qualiopi-green rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{progress}%</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 space-y-4">
                {critere.indicateurs.map((indicateur, iIdx) => (
                  <div key={indicateur.numero} className="p-4 bg-secondary/30 rounded-lg space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {indicateur.numero}
                      </span>
                      <p className="text-sm font-medium">{indicateur.titre}</p>
                    </div>
                    <div className="ml-8 space-y-2">
                      <div className="p-2 bg-qualiopi-blue-light rounded-md">
                        <p className="text-xs font-semibold text-primary">Niveau attendu</p>
                        <p className="text-xs text-foreground/80">{indicateur.niveauAttendu}</p>
                      </div>
                      <div className="p-2 bg-qualiopi-green-light rounded-md">
                        <p className="text-xs font-semibold text-qualiopi-green">Preuves attendues</p>
                        <p className="text-xs text-foreground/80">{indicateur.preuves}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Votre réponse / preuves apportées</Label>
                        <Textarea
                          value={indicateur.reponse}
                          onChange={e => updateIndicateur(cIdx, iIdx, e.target.value)}
                          placeholder="Décrivez comment vous répondez à cet indicateur et listez vos preuves..."
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CriteresForm;
