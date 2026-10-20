/**
 * Liaison avec IZILearn par postMessage : l'espace est ouvert soit dans une
 * iframe de la fiche session IZILearn, soit dans un nouvel onglet (window.opener).
 * Seules les origines IZILearn sont acceptées ; aucune donnée ne transite par un serveur.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { IZ_MSG, type IzFichierRetour, type IzPayload } from "./types";

const ORIGINES = [
  /^https:\/\/izilearn\.netlify\.app$/,
  /^https:\/\/[a-z0-9-]+--izilearn\.netlify\.app$/,
  /^http:\/\/(localhost|127\.0\.0\.1):\d+$/,
];
export const origineAutorisee = (o: string) => ORIGINES.some((r) => r.test(o));

export type EtatLiaison = "attente" | "connecte" | "seul";

export function useIzilearn() {
  const [payload, setPayload] = useState<IzPayload | null>(null);
  const [etat, setEtat] = useState<EtatLiaison>("attente");
  const cible = useRef<{ win: Window; origin: string } | null>(null);
  const attentes = useRef(new Map<string, (r: { ok: boolean; n: number; erreurs: string[] }) => void>());

  useEffect(() => {
    const parent = window.parent !== window ? window.parent : (window.opener as Window | null);
    const onMessage = (e: MessageEvent) => {
      if (!origineAutorisee(e.origin) || !e.data || typeof e.data !== "object") return;
      if (e.data.type === IZ_MSG.data && e.data.payload?.version === 1) {
        cible.current = { win: e.source as Window, origin: e.origin };
        setPayload(e.data.payload as IzPayload);
        setEtat("connecte");
      } else if (e.data.type === IZ_MSG.saved && typeof e.data.requestId === "string") {
        attentes.current.get(e.data.requestId)?.({ ok: !!e.data.ok, n: Number(e.data.n || 0), erreurs: e.data.erreurs || [] });
        attentes.current.delete(e.data.requestId);
      }
    };
    window.addEventListener("message", onMessage);
    // L'origine du parent est inconnue avant sa réponse : le signal « prêt » ne contient aucune donnée.
    const ping = () => parent?.postMessage({ type: IZ_MSG.ready }, "*");
    ping();
    const t1 = setTimeout(ping, 800);
    const t2 = setTimeout(() => setEtat((x) => (x === "attente" ? "seul" : x)), parent ? 6000 : 300);
    return () => { window.removeEventListener("message", onMessage); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const actualiser = useCallback(() => { cible.current?.win.postMessage({ type: IZ_MSG.ready }, cible.current.origin); }, []);

  const envoyer = useCallback((fichiers: IzFichierRetour[]) => new Promise<{ ok: boolean; n: number; erreurs: string[] }>((resolve, reject) => {
    const c = cible.current;
    if (!c) { reject(new Error("IZILearn n'est pas connecté")); return; }
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    attentes.current.set(requestId, resolve);
    c.win.postMessage({ type: IZ_MSG.save, requestId, fichiers }, c.origin);
    setTimeout(() => {
      if (attentes.current.has(requestId)) { attentes.current.delete(requestId); reject(new Error("IZILearn n'a pas confirmé l'enregistrement (délai dépassé)")); }
    }, 10 * 60 * 1000);
  }), []);

  return { payload, etat, actualiser, envoyer };
}
