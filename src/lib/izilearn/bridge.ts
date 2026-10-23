/**
 * Liaison avec IZILearn ou CRM LMS par postMessage : l'espace est ouvert soit dans une
 * iframe de la fiche session, soit dans un nouvel onglet (window.opener).
 * Seules les origines de la plateforme sont acceptées ; aucune donnée ne transite par un serveur.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { IzFichierRetour, IzPayload } from "./types";
import { PLATEFORMES, definirPlateforme, type AppSource } from "./plateforme";

export const origineAutorisee = (o: string, app: AppSource = "izilearn") => PLATEFORMES[app].origines.some((r) => r.test(o));

export type EtatLiaison = "attente" | "connecte" | "seul";

export function useIzilearn(app: AppSource = "izilearn") {
  const { msg: IZ_MSG, nom } = PLATEFORMES[app];
  const [payload, setPayload] = useState<IzPayload | null>(null);
  const [etat, setEtat] = useState<EtatLiaison>("attente");
  const cible = useRef<{ win: Window; origin: string } | null>(null);
  const attentes = useRef(new Map<string, (r: { ok: boolean; n: number; erreurs: string[] }) => void>());

  useEffect(() => {
    const parent = window.parent !== window ? window.parent : (window.opener as Window | null);
    const onMessage = (e: MessageEvent) => {
      if (!origineAutorisee(e.origin, app) || !e.data || typeof e.data !== "object") return;
      if (e.data.type === IZ_MSG.data && e.data.payload?.version === 1) {
        cible.current = { win: e.source as Window, origin: e.origin };
        definirPlateforme(app);
        setPayload({ ...e.data.payload, source: { ...e.data.payload.source, app } } as IzPayload);
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
  }, [app, IZ_MSG]);

  const actualiser = useCallback(() => { cible.current?.win.postMessage({ type: IZ_MSG.ready }, cible.current.origin); }, [IZ_MSG]);

  const envoyer = useCallback((fichiers: IzFichierRetour[]) => new Promise<{ ok: boolean; n: number; erreurs: string[] }>((resolve, reject) => {
    const c = cible.current;
    if (!c) { reject(new Error(`${nom} n'est pas connecté`)); return; }
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    attentes.current.set(requestId, resolve);
    c.win.postMessage({ type: IZ_MSG.save, requestId, fichiers }, c.origin);
    setTimeout(() => {
      if (attentes.current.has(requestId)) { attentes.current.delete(requestId); reject(new Error(`${nom} n'a pas confirmé l'enregistrement (délai dépassé)`)); }
    }, 10 * 60 * 1000);
  }), [IZ_MSG, nom]);

  return { payload, etat, actualiser, envoyer };
}
