import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, ArrowLeft } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Log de connexion (non bloquant)
        try {
          await supabase.from("activity_logs").insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            user_email: email,
            action: "login",
            description: `Connexion de ${email}`,
            page: "/auth",
            user_agent: navigator.userAgent,
          });
        } catch (err) {
          console.warn("[activity] login log failed", err);
        }
        toast({ title: "Connecté !" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({ title: "Inscription réussie", description: "Vérifiez votre email pour confirmer votre compte." });
      }
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-gradient-hero">Qualiopi</span> Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "Connectez-vous pour accéder à vos dossiers" : "Créez un compte pour sauvegarder vos dossiers"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Votre nom" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemple.fr" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
          </div>
          <Button type="submit" className="w-full bg-gradient-hero border-0 text-primary-foreground" disabled={loading}>
            {isLogin ? <><LogIn className="w-4 h-4 mr-2" /> Connexion</> : <><UserPlus className="w-4 h-4 mr-2" /> Inscription</>}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Pas de compte ?" : "Déjà un compte ?"}{" "}
            <button type="button" className="text-primary underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </form>

        <div className="text-center">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Continuer sans compte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
