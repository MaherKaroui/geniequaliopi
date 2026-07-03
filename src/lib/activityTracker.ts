/**
 * Tracker global d'activité : intercepte les téléchargements et les
 * modifications côté DB (saved_*) pour les envoyer dans activity_logs.
 *
 * Doit être installé une seule fois au démarrage de l'app (App.tsx).
 */
import { supabase } from "@/integrations/supabase/client";

type GeoInfo = {
  ip_address?: string;
  city?: string;
  region?: string;
  country?: string;
};

let geoCache: GeoInfo | null = null;
async function getGeo(): Promise<GeoInfo> {
  if (geoCache) return geoCache;
  try {
    const raw = sessionStorage.getItem("__geo_info");
    if (raw) {
      geoCache = JSON.parse(raw);
      return geoCache!;
    }
  } catch {}
  try {
    const r = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    const j = await r.json();
    geoCache = {
      ip_address: j.ip,
      city: j.city,
      region: j.region,
      country: j.country_name,
    };
    sessionStorage.setItem("__geo_info", JSON.stringify(geoCache));
    return geoCache!;
  } catch {
    geoCache = {};
    return geoCache;
  }
}

/** Log direct (sans hook) — utilisable partout. */
export async function logActivityStandalone(
  action: string,
  description?: string,
  formData?: unknown,
) {
  try {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;
    const geo = await getGeo();
    await supabase.from("activity_logs").insert({
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
    });
  } catch (err) {
    console.warn("[activity] standalone log failed", err);
  }
}

/* ---------------- Interception des téléchargements ---------------- */

const recentDownloads = new Map<string, number>();
function dedupe(key: string, windowMs = 1500) {
  const now = Date.now();
  const last = recentDownloads.get(key) ?? 0;
  if (now - last < windowMs) return true;
  recentDownloads.set(key, now);
  // cleanup
  if (recentDownloads.size > 100) {
    for (const [k, t] of recentDownloads) {
      if (now - t > 10000) recentDownloads.delete(k);
    }
  }
  return false;
}

function fileExt(name: string) {
  const m = name.match(/\.([a-z0-9]{1,6})(?:\?|$)/i);
  return m ? m[1].toLowerCase() : "";
}

function trackDownload(fileName: string, source: string) {
  if (!fileName) return;
  if (dedupe(fileName + "|" + source)) return;
  logActivityStandalone("download", `Téléchargement : ${fileName}`, {
    fileName,
    ext: fileExt(fileName),
    source,
  });
}

/** Écoute les clics sur <a download> partout dans l'app. */
function installAnchorDownloadListener() {
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const a = target.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      if (!a.hasAttribute("download")) return;
      const name =
        a.getAttribute("download") ||
        a.href.split("/").pop()?.split("?")[0] ||
        "download";
      trackDownload(name, "anchor");
    },
    true,
  );
}

/**
 * Wrap URL.createObjectURL + anchor.click pour capter les téléchargements
 * programmatiques (file-saver, exportCsv, etc.) qui créent un <a> non attaché.
 * On patche HTMLAnchorElement.prototype.click.
 */
function installProgrammaticDownloadHook() {
  const origClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    try {
      if (this.hasAttribute("download")) {
        const name =
          this.getAttribute("download") ||
          this.href.split("/").pop()?.split("?")[0] ||
          "download";
        trackDownload(name, "programmatic");
      }
    } catch {}
    return origClick.apply(this, arguments as any);
  };
}

/* ---------------- Interception des écritures DB ---------------- */

const TRACKED_TABLES = new Set([
  "saved_dossiers",
  "saved_ey_controls",
  "saved_nda_dossiers",
  "saved_opco_dossiers",
  "saved_themes",
  "saved_vae_dossiers",
  "profiles",
  "user_roles",
]);

const ACTION_LABELS: Record<string, string> = {
  saved_dossiers: "dossier Qualiopi",
  saved_ey_controls: "contrôle EY",
  saved_nda_dossiers: "dossier NDA",
  saved_opco_dossiers: "dossier OPCO",
  saved_themes: "thème visuel",
  saved_vae_dossiers: "dossier VAE",
  profiles: "profil",
  user_roles: "rôle utilisateur",
};

function installSupabaseWriteInterceptor() {
  const origFrom = (supabase as any).from.bind(supabase);
  (supabase as any).from = function (table: string) {
    const builder = origFrom(table);
    if (!TRACKED_TABLES.has(table) || table === "activity_logs") return builder;
    const label = ACTION_LABELS[table] ?? table;

    const wrap = (methodName: "insert" | "update" | "upsert" | "delete") => {
      const orig = builder[methodName]?.bind(builder);
      if (!orig) return;
      builder[methodName] = (...args: any[]) => {
        const chain = orig(...args);
        // Fire log after the promise resolves. We attach via .then wrapper.
        const origThen = chain.then.bind(chain);
        chain.then = (onFulfilled: any, onRejected: any) => {
          return origThen((res: any) => {
            if (!res?.error) {
              const verb =
                methodName === "insert" || methodName === "upsert"
                  ? "Création"
                  : methodName === "update"
                    ? "Modification"
                    : "Suppression";
              logActivityStandalone(
                `${methodName}_${table}`,
                `${verb} : ${label}`,
                {
                  table,
                  method: methodName,
                  count: Array.isArray(args[0])
                    ? args[0].length
                    : args[0]
                      ? 1
                      : undefined,
                },
              );
            }
            return onFulfilled ? onFulfilled(res) : res;
          }, onRejected);
        };
        return chain;
      };
    };
    wrap("insert");
    wrap("update");
    wrap("upsert");
    wrap("delete");
    return builder;
  };
}

let installed = false;
export function installActivityTracker() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  installAnchorDownloadListener();
  installProgrammaticDownloadHook();
  installSupabaseWriteInterceptor();
}
