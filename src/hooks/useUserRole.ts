import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type AppRole = "super_admin" | "admin" | "user";

/**
 * Récupère les rôles de l'utilisateur courant depuis la table user_roles.
 * Le rôle n'est jamais stocké côté client comme source de vérité :
 * chaque action sensible est aussi protégée par RLS via has_role().
 */
export function useUserRole() {
  const { user, loading: authLoading } = useAuth();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      if (cancelled) return;
      if (error) {
        console.warn("useUserRole error", error);
        setRoles([]);
      } else {
        setRoles((data ?? []).map((r) => r.role as AppRole));
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return {
    roles,
    isSuperAdmin: roles.includes("super_admin"),
    isAdmin: roles.includes("admin") || roles.includes("super_admin"),
    loading: authLoading || loading,
  };
}
