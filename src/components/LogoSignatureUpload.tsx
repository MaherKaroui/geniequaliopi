import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, PenTool } from "lucide-react";
import SignaturePad from "@/components/SignaturePad";

interface LogoSignatureUploadProps {
  logoUrl?: string;
  signatureUrl?: string;
  tamponUrl?: string;
  onLogoChange: (url: string) => void;
  onSignatureChange: (url: string) => void;
  onTamponChange?: (url: string) => void;
}

const UploadCard = ({
  label,
  imageUrl,
  placeholder,
  altText,
  onClear,
  onUpload,
  onDraw,
}: {
  label: string;
  imageUrl?: string;
  placeholder: string;
  altText: string;
  onClear: () => void;
  onUpload: () => void;
  onDraw?: () => void;
}) => (
  <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border bg-background">
    <Label className="font-semibold text-sm text-foreground">{label}</Label>
    <div className="h-20 w-full flex items-center justify-center">
      {imageUrl ? (
        <div className="relative group">
          <img
            src={imageUrl}
            alt={altText}
            className="h-16 w-auto max-w-[140px] object-contain rounded border border-border bg-white p-1"
          />
          <button
            onClick={onClear}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <span className="text-xs text-muted-foreground">{placeholder}</span>
      )}
    </div>
    <div className="flex gap-2 w-full">
      <Button variant="outline" size="sm" className="flex-1" onClick={onUpload}>
        {imageUrl ? "Changer" : "Charger"}
      </Button>
      {onDraw && (
        <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={onDraw}>
          <PenTool className="w-3 h-3" /> Dessiner
        </Button>
      )}
    </div>
  </div>
);

const LogoSignatureUpload = ({ logoUrl, signatureUrl, tamponUrl, onLogoChange, onSignatureChange, onTamponChange }: LogoSignatureUploadProps) => {
  const logoRef = useRef<HTMLInputElement>(null);
  const sigRef = useRef<HTMLInputElement>(null);
  const tamponRef = useRef<HTMLInputElement>(null);
  const [drawingPad, setDrawingPad] = useState<string | null>(null);

  const handleFile = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFile(file, onLogoChange);
        }} />
        <input ref={sigRef} type="file" accept="image/*" className="hidden" onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFile(file, onSignatureChange);
        }} />
        {onTamponChange && (
          <input ref={tamponRef} type="file" accept="image/*" className="hidden" onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFile(file, onTamponChange);
          }} />
        )}

        <UploadCard
          label="Logo de l'organisme"
          imageUrl={logoUrl}
          placeholder="Pas de logo"
          altText="Logo"
          onClear={() => onLogoChange("")}
          onUpload={() => logoRef.current?.click()}
        />
        <UploadCard
          label="Signature du dirigeant"
          imageUrl={signatureUrl}
          placeholder="Pas de signature"
          altText="Signature"
          onClear={() => onSignatureChange("")}
          onUpload={() => sigRef.current?.click()}
          onDraw={() => setDrawingPad(drawingPad === "sig" ? null : "sig")}
        />
        {onTamponChange && (
          <UploadCard
            label="Tampon de l'organisme"
            imageUrl={tamponUrl}
            placeholder="Pas de tampon"
            altText="Tampon"
            onClear={() => onTamponChange("")}
            onUpload={() => tamponRef.current?.click()}
          />
        )}
      </div>

      {drawingPad === "sig" && (
        <SignaturePad
          label="✍️ Signature du dirigeant"
          onSave={(dataUrl) => { onSignatureChange(dataUrl); setDrawingPad(null); }}
          onCancel={() => setDrawingPad(null)}
        />
      )}
    </div>
  );
};

export default LogoSignatureUpload;
