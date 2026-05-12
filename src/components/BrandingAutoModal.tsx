import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, FileText, Mail, CreditCard, Loader2, Sparkles } from "lucide-react";
import { OrganismeInfo } from "@/types/qualiopi";
import { exportCharteGraphique, exportBusinessCards, downloadEmailSignature, buildEmailSignatureHtml } from "@/lib/brandingPack";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  organisme: OrganismeInfo;
}

const PRESET_COLORS = ["#2563eb", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#1e293b"];

const BrandingAutoModal = ({ open, onOpenChange, organisme }: Props) => {
  const [color, setColor] = useState("#2563eb");
  const [loading, setLoading] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [personName, setPersonName] = useState(organisme.dirigeant || "");
  const [personRole, setPersonRole] = useState("Dirigeant");
  const [personEmail, setPersonEmail] = useState(organisme.email || "");
  const [personTel, setPersonTel] = useState(organisme.telephone || "");

  const onLogoFile = (f: File | null) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setLogoUrl(reader.result as string);
    reader.readAsDataURL(f);
  };

  const run = async (type: "charte" | "signature" | "cards") => {
    setLoading(type);
    try {
      const person = { nom: personName, fonction: personRole, email: personEmail, tel: personTel };
      if (type === "charte") {
        await exportCharteGraphique(organisme, color, logoUrl || undefined);
        toast.success("📘 Charte graphique générée !");
      } else if (type === "signature") {
        downloadEmailSignature(organisme, color, logoUrl || undefined, person);
        toast.success("📧 Signature email téléchargée !");
      } else {
        const people = personName.trim() ? [person] : [{ nom: organisme.dirigeant || "Dirigeant", fonction: "Dirigeant", email: organisme.email || "", tel: organisme.telephone }];
        await exportBusinessCards(organisme, color, logoUrl || undefined, people);
        toast.success("💳 Cartes de visite générées !");
      }
    } catch (e: any) {
      toast.error("Erreur : " + (e.message || "génération impossible"));
    } finally {
      setLoading(null);
    }
  };

  const previewSignatureHtml = buildEmailSignatureHtml(organisme, color, logoUrl || undefined, {
    nom: personName || "Prénom NOM", fonction: personRole, email: personEmail || "contact@…", tel: personTel,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Pack Branding Auto
          </DialogTitle>
          <DialogDescription>
            Génère charte graphique, signatures email et cartes de visite à partir du logo et de la couleur principale de ton organisme.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Color + Logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Palette className="w-4 h-4" /> Couleur principale</Label>
              <div className="flex items-center gap-2">
                <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 h-10 rounded cursor-pointer border" />
                <Input value={color} onChange={e => setColor(e.target.value)} className="font-mono text-sm" />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {PRESET_COLORS.map(c => (
                  <button key={c} onClick={() => setColor(c)} className="w-7 h-7 rounded-full border-2 hover:scale-110 transition" style={{ background: c, borderColor: color === c ? "#000" : "transparent" }} />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Logo (optionnel)</Label>
              <Input type="file" accept="image/*" onChange={e => onLogoFile(e.target.files?.[0] || null)} />
              {logoUrl && <img src={logoUrl} alt="logo preview" className="h-16 mt-2 object-contain border rounded p-2 bg-white" />}
            </div>
          </div>

          {/* Person info for signature/cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-secondary/30 rounded-lg">
            <div className="md:col-span-2">
              <Label>Nom complet</Label>
              <Input value={personName} onChange={e => setPersonName(e.target.value)} placeholder="Prénom NOM" />
            </div>
            <div className="md:col-span-2">
              <Label>Fonction</Label>
              <Input value={personRole} onChange={e => setPersonRole(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Label>Email</Label>
              <Input type="email" value={personEmail} onChange={e => setPersonEmail(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Label>Téléphone</Label>
              <Input value={personTel} onChange={e => setPersonTel(e.target.value)} />
            </div>
          </div>

          {/* Live preview */}
          <div>
            <Label className="text-xs text-muted-foreground">Aperçu signature en temps réel</Label>
            <div className="mt-2 border rounded-lg overflow-hidden bg-white" style={{ height: 220 }}>
              <iframe srcDoc={previewSignatureHtml} className="w-full h-full" title="preview" />
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <Button onClick={() => run("charte")} disabled={loading !== null} className="h-auto py-4 flex-col gap-2" style={{ background: color }}>
              {loading === "charte" ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
              <div className="text-center">
                <div className="font-semibold text-sm">Charte graphique</div>
                <div className="text-[11px] opacity-80">PDF · 5 pages</div>
              </div>
            </Button>
            <Button onClick={() => run("signature")} disabled={loading !== null} variant="outline" className="h-auto py-4 flex-col gap-2 border-2" style={{ borderColor: color, color }}>
              {loading === "signature" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
              <div className="text-center">
                <div className="font-semibold text-sm">Signature email</div>
                <div className="text-[11px] opacity-80">HTML copy-paste</div>
              </div>
            </Button>
            <Button onClick={() => run("cards")} disabled={loading !== null} variant="outline" className="h-auto py-4 flex-col gap-2 border-2" style={{ borderColor: color, color }}>
              {loading === "cards" ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
              <div className="text-center">
                <div className="font-semibold text-sm">Cartes de visite</div>
                <div className="text-[11px] opacity-80">PDF · prêt à imprimer</div>
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrandingAutoModal;
