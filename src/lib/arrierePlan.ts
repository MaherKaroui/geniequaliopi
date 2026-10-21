/**
 * Génération qui continue quand l'onglet n'est plus au premier plan.
 *
 * Dans un onglet masqué, Chrome :
 * - ne déclenche plus du tout `requestAnimationFrame` (la génération se figeait) ;
 * - retarde chaque `setTimeout` d'au moins 1 s, puis d'1 min après 5 min en
 *   arrière-plan (« intensive throttling ») ;
 * - peut geler l'onglet s'il n'a aucune activité protégée.
 *
 * `ceder` et `pause` passent par MessageChannel et un Worker, qui ne sont pas
 * bridés, et `garderActif` tient un Web Lock pour que l'onglet ne soit pas gelé.
 */

const estMasque = () => typeof document !== "undefined" && document.visibilityState === "hidden";

let canal: MessageChannel | null = null;
const enAttente: (() => void)[] = [];

/** Tâche suivante sans passer par les timers (non bridé en arrière-plan). */
function tacheSuivante(): Promise<void> {
  if (typeof MessageChannel === "undefined") return new Promise((r) => setTimeout(r, 0));
  if (!canal) {
    canal = new MessageChannel();
    canal.port1.onmessage = () => enAttente.shift()?.();
  }
  return new Promise((resolve) => {
    enAttente.push(resolve);
    canal!.port2.postMessage(0);
  });
}

let worker: Worker | null = null;
let workerKo = false;
let prochainId = 0;
const minuteries = new Map<number, () => void>();

function workerMinuterie(): Worker | null {
  if (worker || workerKo) return worker;
  try {
    const code = "onmessage=function(e){setTimeout(function(){postMessage(e.data.id)},e.data.ms)}";
    const url = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
    worker = new Worker(url);
    worker.onmessage = (e: MessageEvent<number>) => {
      const fin = minuteries.get(e.data);
      minuteries.delete(e.data);
      fin?.();
    };
  } catch {
    workerKo = true;
  }
  return worker;
}

/** Attente de `ms` millisecondes, tenue même onglet masqué (minuterie dans un Worker). */
export function pause(ms: number): Promise<void> {
  const w = estMasque() && ms > 0 ? workerMinuterie() : null;
  if (!w) return new Promise((r) => setTimeout(r, ms));
  return new Promise((resolve) => {
    const id = ++prochainId;
    minuteries.set(id, resolve);
    w.postMessage({ id, ms });
  });
}

let tick = 0;

/**
 * Rend la main au navigateur entre deux documents. Au premier plan : un rAF
 * tous les 5 appels pour laisser l'écran se rafraîchir ; en arrière-plan,
 * rien à peindre, on enchaîne sans timer.
 */
export function ceder(delaiMs = 0): Promise<void> {
  if (estMasque()) return delaiMs > 0 ? pause(delaiMs) : tacheSuivante();
  if (++tick % 5 === 0) {
    return new Promise((resolve) => requestAnimationFrame(() => { setTimeout(resolve, delaiMs); }));
  }
  return delaiMs > 0 ? pause(delaiMs) : tacheSuivante();
}

/**
 * Exécute un travail long en empêchant le gel de l'onglet : Chrome ne gèle pas
 * une page qui détient un Web Lock.
 */
export async function garderActif<T>(travail: () => Promise<T>): Promise<T> {
  const locks = typeof navigator !== "undefined" ? (navigator as any).locks : undefined;
  if (!locks?.request) return travail();
  return locks.request(`generation-${Date.now()}-${Math.random()}`, () => travail());
}
