import SignaturePad from "@/components/SignaturePad";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { validSignatureImage } from "@/lib/izilearn/documentSignature";

interface Props { open: boolean; name: string; role?: "stagiaire" | "entreprise" | "formateur"; onClose: () => void; onSave: (image: string) => void; onRemove?: () => void }

export default function IzilearnSignatureDialog({ open, name, role = "stagiaire", onClose, onSave, onRemove }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  return <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
    <DialogContent className="max-w-xl max-h-[90vh] overflow-auto">
      <DialogHeader><DialogTitle>{role === "entreprise" ? "Signature du responsable d’entreprise" : role === "formateur" ? "Signature du formateur" : "Signature du stagiaire"} — {name}</DialogTitle></DialogHeader>
      <SignaturePad onSave={onSave} onCancel={onClose} label={name} />
      <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp" aria-label="Importer la signature du stagiaire" className="hidden" onChange={async (event) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;
        if (file.size > 2_000_000 || !["image/png", "image/jpeg", "image/webp"].includes(file.type)) { toast.error("Choisissez une image PNG, JPG ou WebP de moins de 2 Mo."); return; }
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result !== "string" || !validSignatureImage(reader.result)) { toast.error("Image de signature invalide"); return; }
          const image = new Image();
          image.onload = () => { if (typeof reader.result === "string") onSave(reader.result); };
          image.onerror = () => toast.error("Image de signature illisible");
          image.src = reader.result;
        };
        reader.onerror = () => toast.error("Lecture de la signature impossible");
        reader.readAsDataURL(file);
      }} />
      <Button variant="outline" onClick={() => fileInput.current?.click()}><Upload className="w-4 h-4 mr-2" />Importer une signature</Button>
      {onRemove && <Button variant="ghost" onClick={onRemove}>Retirer la signature</Button>}
    </DialogContent>
  </Dialog>;
}