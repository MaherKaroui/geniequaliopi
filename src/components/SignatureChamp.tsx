import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PenTool, Upload, X } from "lucide-react";
import SignaturePad from "@/components/SignaturePad";

export const lireImage = (file: File) => new Promise<string>((res, rej) => {
  const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(file);
});

/** Signature ou tampon : aperçu, « Dessiner » (pavé de signature), « Importer » (PNG / JPG), « Retirer ». */
export default function SignatureChamp({ valeur, onChange, libelle, compact }: { valeur?: string; onChange: (v: string | undefined) => void; libelle: string; compact?: boolean }) {
  const [dessin, setDessin] = useState(false);
  const fichier = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-2">
      {valeur
        ? <img src={valeur} alt={libelle} className={`${compact ? "h-8 max-w-[110px]" : "h-12 max-w-[160px]"} object-contain border rounded bg-white`} />
        : <span className="text-xs text-muted-foreground">{compact ? "—" : "Aucune image"}</span>}
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 gap-1" onClick={() => setDessin(true)} title="Dessiner"><PenTool className="w-3.5 h-3.5" />{!compact && "Dessiner"}</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 gap-1" onClick={() => fichier.current?.click()} title="Importer une image"><Upload className="w-3.5 h-3.5" />{!compact && "Importer"}</Button>
      {valeur && <Button type="button" variant="ghost" size="sm" className="h-8 px-2" onClick={() => onChange(undefined)} title="Retirer"><X className="w-3.5 h-3.5" /></Button>}
      <input ref={fichier} type="file" accept="image/png,image/jpeg" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) onChange(await lireImage(f)); e.target.value = ""; }} />
      <Dialog open={dessin} onOpenChange={setDessin}>
        <DialogContent>
          <DialogHeader><DialogTitle>{libelle}</DialogTitle></DialogHeader>
          <SignaturePad label="Signez dans le cadre" onSave={(d) => { onChange(d); setDessin(false); }} onCancel={() => setDessin(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
