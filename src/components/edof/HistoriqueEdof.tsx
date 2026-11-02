import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { FolderOpen, History, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lister, supprimer, type Automatisation } from "@/lib/edofAuto/historique";

/** Historique des automatisations de l'utilisateur connecté ; « Ouvrir » recharge documents, stagiaires et envois. */
export default function HistoriqueEdof({ connecte, rafraichir, onOuvrir }: { connecte: boolean; rafraichir: number; onOuvrir: (a: Automatisation) => Promise<void> }) {
  const [lignes, setLignes] = useState<Automatisation[]>([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [ouverture, setOuverture] = useState<string>();

  const charger = useCallback(async () => {
    if (!connecte) return;
    setChargement(true);
    try { setLignes(await lister()); setErreur(""); } catch (e: any) { setErreur(e.message); } finally { setChargement(false); }
  }, [connecte]);
  useEffect(() => { charger(); }, [charger, rafraichir]);

  const effacer = async (a: Automatisation) => {
    if (!window.confirm(`Supprimer « ${a.name} » et ses documents de l'historique ?`)) return;
    try { await supprimer(a); setLignes((l) => l.filter((x) => x.id !== a.id)); toast.success("Supprimé de l'historique"); } catch (e: any) { toast.error(e.message); }
  };

  return (
    <section className="bg-card rounded-2xl border shadow-card p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg flex items-center gap-2"><History className="w-5 h-5" /> Historique</h2>
        {connecte && <Button variant="ghost" size="sm" onClick={charger} className="gap-1">{chargement ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} Actualiser</Button>}
      </div>
      {!connecte && <p className="text-sm text-muted-foreground">Connectez-vous pour enregistrer chaque génération et la retrouver ici (documents, stagiaires, e-mails envoyés).</p>}
      {erreur && <p className="text-sm text-destructive">Historique indisponible : {erreur}{/relation|does not exist|schema cache/i.test(erreur) ? " — la table saved_edof_automatisations n'est pas encore créée (migration 20261102170000)." : ""}</p>}
      {connecte && !erreur && !lignes.length && !chargement && <p className="text-sm text-muted-foreground">Aucune automatisation enregistrée pour l'instant.</p>}
      {lignes.length > 0 && (
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted-foreground"><th className="p-2">Date</th><th className="p-2">Export</th><th className="p-2">Formations</th><th className="p-2">Documents</th><th className="p-2">E-mails</th><th className="p-2"></th></tr></thead>
          <tbody>
            {lignes.map((a) => {
              const envoyes = new Set(a.envois.filter((e) => e.statut === "envoye" && !e.test).map((e) => e.candidat)).size;
              return (
                <tr key={a.id} className="border-t">
                  <td className="p-2 whitespace-nowrap">{new Date(a.created_at).toLocaleString("fr-FR")}</td>
                  <td className="p-2">{a.name}<br /><span className="text-xs text-muted-foreground">{a.centre?.nom}</span></td>
                  <td className="p-2 text-xs">{(a.resume?.formations || []).map((f) => `${f.code} (${f.nb})`).join(", ")}</td>
                  <td className="p-2">{a.fichiers.length}</td>
                  <td className="p-2">{envoyes} envoyé(s)</td>
                  <td className="p-2 whitespace-nowrap text-right">
                    <Button size="sm" variant="outline" className="gap-1 mr-1" disabled={ouverture === a.id}
                      onClick={async () => { setOuverture(a.id); try { await onOuvrir(a); } catch (e: any) { toast.error(e.message); } finally { setOuverture(undefined); } }}>
                      {ouverture === a.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderOpen className="w-4 h-4" />} Ouvrir
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => effacer(a)}><Trash2 className="w-4 h-4" /></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
