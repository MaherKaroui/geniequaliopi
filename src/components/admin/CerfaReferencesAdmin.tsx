import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
  invalidateCerfaReferentiels,
  loadCerfaReferentiels,
  type BaremeApprentissage,
  type SmicReference,
} from "@/lib/cerfa/referentiels";

/** Administration des références de calcul du CERFA : SMIC et barèmes d'apprentissage. */
const CerfaReferencesAdmin = () => {
  const [smic, setSmic] = useState<SmicReference[]>([]);
  const [baremes, setBaremes] = useState<BaremeApprentissage[]>([]);
  const [loading, setLoading] = useState(true);
  const [nouveau, setNouveau] = useState({ date_effet: "", montant_mensuel_35h: "", source: "" });

  const recharger = async () => {
    setLoading(true);
    invalidateCerfaReferentiels();
    const refs = await loadCerfaReferentiels(true);
    setSmic(refs.smic);
    setBaremes(refs.baremes);
    setLoading(false);
  };

  useEffect(() => {
    recharger();
  }, []);

  const ajouterSmic = async () => {
    if (!nouveau.date_effet || !nouveau.montant_mensuel_35h) {
      toast.error("Date d'effet et montant sont obligatoires");
      return;
    }
    const { error } = await supabase.from("smic_references").insert({
      date_effet: nouveau.date_effet,
      montant_mensuel_35h: Number(nouveau.montant_mensuel_35h),
      source: nouveau.source,
    });
    if (error) return toast.error(error.message);
    setNouveau({ date_effet: "", montant_mensuel_35h: "", source: "" });
    toast.success("Référence SMIC enregistrée");
    recharger();
  };

  const supprimerSmic = async (id: string) => {
    const { error } = await supabase.from("smic_references").delete().eq("id", id);
    if (error) return toast.error(error.message);
    recharger();
  };

  const majBareme = async (b: BaremeApprentissage, pourcentage: string) => {
    const { error } = await supabase
      .from("baremes_apprentissage")
      .update({ pourcentage: Number(pourcentage) })
      .eq("id", b.id);
    if (error) return toast.error(error.message);
    toast.success("Barème mis à jour");
    recharger();
  };

  const tranches = ["-18", "18-20", "21-25", "26+"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">SMIC de référence (mensuel 35 h)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Aucun montant n'est prérempli. Sans référence couvrant la date de début du contrat, la génération du CERFA est refusée.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div>
              <Label>Date d'effet</Label>
              <Input type="date" value={nouveau.date_effet} onChange={(e) => setNouveau({ ...nouveau, date_effet: e.target.value })} />
            </div>
            <div>
              <Label>Montant mensuel 35 h (€)</Label>
              <Input inputMode="decimal" value={nouveau.montant_mensuel_35h} onChange={(e) => setNouveau({ ...nouveau, montant_mensuel_35h: e.target.value })} />
            </div>
            <div>
              <Label>Source</Label>
              <Input value={nouveau.source} onChange={(e) => setNouveau({ ...nouveau, source: e.target.value })} placeholder="Décret n°…" />
            </div>
            <Button onClick={ajouterSmic}>Ajouter</Button>
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Chargement…</p>
          ) : smic.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune référence SMIC saisie.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-xs">
                <tr>
                  <th className="text-left p-2">Date d'effet</th>
                  <th className="text-left p-2">Montant</th>
                  <th className="text-left p-2">Source</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {smic.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="p-2">{r.date_effet.split("-").reverse().join("/")}</td>
                    <td className="p-2">{r.montant_mensuel_35h.toFixed(2)} €</td>
                    <td className="p-2">{r.source}</td>
                    <td className="p-2 text-right">
                      <Button variant="ghost" size="sm" onClick={() => supprimerSmic(r.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Barèmes d'apprentissage (% du SMIC)</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-muted-foreground text-xs">
              <tr>
                <th className="text-left p-2">Tranche d'âge</th>
                <th className="text-left p-2">1re année</th>
                <th className="text-left p-2">2e année</th>
                <th className="text-left p-2">3e année</th>
              </tr>
            </thead>
            <tbody>
              {tranches.map((t) => (
                <tr key={t} className="border-t">
                  <td className="p-2 font-medium">{t}</td>
                  {[1, 2, 3].map((annee) => {
                    const b = baremes.find((x) => x.tranche_age === t && x.annee_contrat === annee);
                    return (
                      <td key={annee} className="p-2">
                        {b ? (
                          <Input
                            className="w-24"
                            defaultValue={String(b.pourcentage)}
                            onBlur={(e) => {
                              if (Number(e.target.value) !== b.pourcentage) majBareme(b, e.target.value);
                            }}
                          />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3">
            26 ans et plus : 100 % du SMIC, ou du salaire minimum conventionnel s'il est plus favorable.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CerfaReferencesAdmin;
