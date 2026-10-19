import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PenLine, X } from "lucide-react";
import SignaturePad from "@/components/SignaturePad";
import { toast } from "sonner";

export default function BdcImageInput({ label, value, onChange, signature = false }: { label: string; value?: string; onChange: (value: string) => void; signature?: boolean }) {
  const [draw, setDraw] = useState(false);
  return <div className="space-y-2 border-t pt-3">
    <Label>{label}</Label>
    <Input type="file" accept="image/png,image/jpeg,image/webp" aria-label={label} onChange={e => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) { toast.error("Choisissez une image de moins de 2 Mo."); return; }
      const reader = new FileReader(); reader.onload = () => { if (typeof reader.result === "string") onChange(reader.result); }; reader.readAsDataURL(file);
    }} />
    <div className="flex items-center gap-2">
      {signature && <Button size="sm" variant="outline" onClick={() => setDraw(!draw)}><PenLine className="h-4 w-4 mr-2" /> Tracer</Button>}
      {value && <><img src={value} alt={label} className="h-20 w-40 object-contain bg-card border rounded" /><Button size="icon" variant="ghost" title={`Retirer ${label}`} aria-label={`Retirer ${label}`} onClick={() => onChange("")}><X className="h-4 w-4" /></Button></>}
    </div>
    {draw && <SignaturePad label={label} onSave={v => { onChange(v); setDraw(false); }} onCancel={() => setDraw(false)} />}
  </div>;
}