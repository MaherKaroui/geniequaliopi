import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { toast } from "sonner";

const ACCESS_CODE = "IZI123";
const STORAGE_KEY = "qualiopi_access_granted";

export default function AccessGate({ children }: { children: ReactNode }) {
  const [granted, setGranted] = useState(false);
  const [code, setCode] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1" || localStorage.getItem(STORAGE_KEY) === "1") {
      setGranted(true);
    }
    setChecking(false);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === ACCESS_CODE) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      localStorage.setItem(STORAGE_KEY, "1");
      setGranted(true);
      toast.success("Accès autorisé");
    } else {
      toast.error("Code d'accès incorrect");
      setCode("");
    }
  };

  if (checking) return null;
  if (granted) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-card border rounded-2xl shadow-card p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-hero flex items-center justify-center">
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-gradient-hero">Qualiopi</span> Generator
          </h1>
          <p className="text-sm text-muted-foreground">
            Cette application est protégée. Entrez le code d'accès pour continuer.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="access-code">Code d'accès</Label>
          <Input
            id="access-code"
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="••••••"
            autoFocus
            required
          />
        </div>
        <Button type="submit" className="w-full bg-gradient-hero border-0 text-primary-foreground">
          Accéder
        </Button>
      </form>
    </div>
  );
}
