import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Cache mémoire + sessionStorage pour la géolocalisation IP.
 * On n'appelle ipapi.co qu'une seule fois par session.
 */
type GeoInfo = {
  ip_address?: string;
  city?: string;
  region?: string;
  country?: string;
};

let geoPromise: Promise<GeoInfo> | null = null;

function loadGeoFromStorage(): GeoInfo | null {
  try {
    const raw = sessionStorage.getItem("__geo_info");
    return raw ? (JSON.parse(raw) as GeoInfo) : null;
  } catch {
    return null;
  }
}

async function fetchGeo(): Promise<GeoInfo> {
  const cached = loadGeoFromStorage();
  if (cached) return cached;
  if (geoPromise) return geoPromise;
  geoPromise = (async () => {
    try {
      const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
      if (!res.ok) throw new Error("geo http " + res.status);
      const j = await res.json();
      const info: GeoInfo = {
        ip_address: j.ip,
        city: j.city,
        region: j.region,
        country: j.country_name,
      };
      try {
        sessionStorage.setItem("__geo_info", JSON.stringify(info));
      } catch {}
      return info;
    } catch (err) {
      console.warn("[activity] geo fetch failed", err);
      return {};
    }
  })();
  return geoPromise;
}

export type LogActivityFn = (
  action: string,
  description?: string,
  formData?: unknown,
) => Promise<void>;

/**
 * Hook réutilisable pour tracer une action utilisateur.
 * Ne bloque JAMAIS le flux applicatif : toute erreur est silencieuse (console.warn).
 */
export function useActivityLogger(): { logActivity: LogActivityFn } {
  const logActivity: LogActivityFn = useCallback(
    async (action, description, formData) => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;
        if (!user) return; // seuls les users connectés loggent

        const geo = await fetchGeo();
        const payload = {
          user_id: user.id,
          user_email: user.email ?? null,
          action,
          description: description ?? null,
          page: typeof window !== "undefined" ? window.location.pathname : null,
          form_data: (formData ?? null) as any,
          ip_address: geo.ip_address ?? null,
          city: geo.city ?? null,
          region: geo.region ?? null,
          country: geo.country ?? null,
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        };
        const { error } = await supabase.from("activity_logs").insert(payload);
        if (error) console.warn("[activity] insert error", error);
      } catch (err) {
        console.warn("[activity] logActivity failed", err);
      }
    },
    [],
  );

  return { logActivity };
}
