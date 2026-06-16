import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

export interface SignataireConnexion {
  nom: string;
  role: "Apprenant" | "Organisme" | "CFA";
  signatureUrl?: string;
}

const STORAGE_KEY = "connexion_signataires";

export function getSignatairesConnexion(): SignataireConnexion[] {
  try {
    const raw = typeof window !== "undefined" ? window.sessionStorage.getItem(STORAGE_KEY) : null;
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const ROLES: SignataireConnexion["role"][] = ["Apprenant", "Organisme", "CFA"];

export default function SignatairesConnexionForm() {
  const [signataires, setSignataires] = useState<SignataireConnexion[]>(() => getSignatairesConnexion());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(signataires));
    } catch {}
  }, [signataires]);

  const updateOne = (idx: number, patch: Partial<SignataireConnexion>) => {
    setSignataires((arr) => arr.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };

  const addOne = (role: SignataireConnexion["role"]) => {
    setSignataires((arr) => [...arr, { nom: "", role }]);
  };

  const removeOne = (idx: number) => setSignataires((arr) => arr.filter((_, i) => i !== idx));

  const handleSignatureUpload = (idx: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Format image requis (PNG/JPG)");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image trop volumineuse (>2 Mo)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateOne(idx, { signatureUrl: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-700" />
          <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
            Signataires des horaires (connexion / déconnexion)
          </span>
          <span className="text-xs text-muted-foreground">{signataires.length} signataire(s)</span>
        </div>
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
          {open ? "Masquer" : "Configurer"}
        </Button>
      </div>

      {open && (
        <div className="mt-3 space-y-2">
          {signataires.length === 0 && (
            <p className="text-xs text-muted-foreground italic">
              Aucun signataire. Ajoutez Apprenant, Organisme ou CFA — leur nom et signature apparaîtront sous chaque horaire.
            </p>
          )}

          {signataires.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-wrap p-2 bg-white dark:bg-background rounded-lg border">
              <select
                value={s.role}
                onChange={(e) => updateOne(i, { role: e.target.value as SignataireConnexion["role"] })}
                className="px-2 py-1.5 rounded border text-sm bg-background"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Nom complet du signataire"
                value={s.nom}
                maxLength={100}
                onChange={(e) => updateOne(i, { nom: e.target.value })}
                className="flex-1 min-w-[200px] px-3 py-1.5 rounded border text-sm bg-background"
              />
              <label className="text-xs px-2 py-1.5 rounded border cursor-pointer bg-background hover:bg-muted">
                {s.signatureUrl ? "Signature ✓" : "Importer signature"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleSignatureUpload(i, f);
                  }}
                />
              </label>
              {s.signatureUrl && (
                <img src={s.signatureUrl} alt="sig" className="h-8 max-w-[80px] object-contain border rounded bg-white" />
              )}
              <Button size="sm" variant="ghost" onClick={() => removeOne(i)} title="Supprimer">
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}

          <div className="flex gap-2 flex-wrap pt-1">
            {ROLES.map((r) => (
              <Button key={r} size="sm" variant="outline" onClick={() => addOne(r)} className="gap-1">
                <Plus className="w-3.5 h-3.5" /> {r}
              </Button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            Ces signataires apparaîtront sous chaque horaire (connexion matin, déconnexion midi, reconnexion, déconnexion soir) des jours passés sur le relevé des temps de connexion.
          </p>
        </div>
      )}
    </div>
  );
}
