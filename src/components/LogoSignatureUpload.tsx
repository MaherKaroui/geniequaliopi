import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LogoSignatureUploadProps {
  logoUrl?: string;
  signatureUrl?: string;
  tamponUrl?: string;
  onLogoChange: (url: string) => void;
  onSignatureChange: (url: string) => void;
  onTamponChange?: (url: string) => void;
}

const LogoSignatureUpload = ({ logoUrl, signatureUrl, tamponUrl, onLogoChange, onSignatureChange, onTamponChange }: LogoSignatureUploadProps) => {
  const logoRef = useRef<HTMLInputElement>(null);
  const sigRef = useRef<HTMLInputElement>(null);
  const tamponRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-secondary/50 rounded-xl border">
      {/* Logo */}
      <div>
        <Label className="mb-2 block font-semibold">
          Logo de l'organisme
        </Label>
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <div className="relative group">
              <img src={logoUrl} alt="Logo" className="h-16 w-auto max-w-[160px] object-contain rounded-lg border bg-white p-1" />
              <button
                onClick={() => onLogoChange("")}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="h-16 w-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center text-muted-foreground text-xs">
              Pas de logo
            </div>
          )}
          <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFile(file, onLogoChange);
          }} />
          <Button variant="outline" size="sm" onClick={() => logoRef.current?.click()}>
            {logoUrl ? "Changer" : "Charger"}
          </Button>
        </div>
      </div>

      {/* Signature */}
      <div>
        <Label className="mb-2 block font-semibold">
          Signature du dirigeant
        </Label>
        <div className="flex items-center gap-3">
          {signatureUrl ? (
            <div className="relative group">
              <img src={signatureUrl} alt="Signature" className="h-16 w-auto max-w-[160px] object-contain rounded-lg border bg-white p-1" />
              <button
                onClick={() => onSignatureChange("")}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="h-16 w-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center text-muted-foreground text-xs">
              Pas de signature
            </div>
          )}
          <input ref={sigRef} type="file" accept="image/*" className="hidden" onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFile(file, onSignatureChange);
          }} />
          <Button variant="outline" size="sm" onClick={() => sigRef.current?.click()}>
            {signatureUrl ? "Changer" : "Charger"}
          </Button>
        </div>
      </div>

      {/* Tampon */}
      {onTamponChange && (
        <div>
          <Label className="mb-2 block font-semibold">
            Tampon de l'organisme
          </Label>
          <div className="flex items-center gap-3">
            {tamponUrl ? (
              <div className="relative group">
                <img src={tamponUrl} alt="Tampon" className="h-16 w-auto max-w-[160px] object-contain rounded-lg border bg-white p-1" />
                <button
                  onClick={() => onTamponChange("")}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="h-16 w-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center text-muted-foreground text-xs">
                Pas de tampon
              </div>
            )}
            <input ref={tamponRef} type="file" accept="image/*" className="hidden" onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleFile(file, onTamponChange);
            }} />
            <Button variant="outline" size="sm" onClick={() => tamponRef.current?.click()} className="gap-1">
              <Stamp className="w-3 h-3" /> {tamponUrl ? "Changer" : "Charger"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoSignatureUpload;
