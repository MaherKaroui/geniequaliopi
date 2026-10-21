/**
 * Système global de jobs de téléchargement en arrière-plan.
 *
 * Permet de lancer une génération longue (ZIP, gros PDF) qui survit aux
 * démontages de composants : l'utilisateur peut quitter la page, naviguer
 * ailleurs dans l'app, le job continue et propose le téléchargement à la fin.
 *
 * Limites : si l'onglet est fermé ou rechargé, le job est perdu (côté client).
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Download, Loader2, X, AlertCircle } from "lucide-react";
import { logActivityStandalone } from "@/lib/activityTracker";
import { garderActif } from "@/lib/arrierePlan";

export type JobStatus = "running" | "done" | "error" | "cancelled";

export interface BackgroundJob {
  id: string;
  label: string;
  status: JobStatus;
  progress: number; // 0-100
  message: string;
  fileName?: string;
  blob?: Blob;
  error?: string;
  createdAt: number;
  finishedAt?: number;
}

export interface JobReporter {
  setProgress: (pct: number) => void;
  setMessage: (msg: string) => void;
  /** Combined helper: progress + message in one call */
  report: (pct: number, msg?: string) => void;
}

export interface RunJobOptions {
  label: string;
  fileName?: string;
  /** If true, auto-download the resulting blob when done (default true). */
  autoDownload?: boolean;
  run: (reporter: JobReporter) => Promise<Blob | void>;
}

interface BackgroundJobsContextValue {
  jobs: BackgroundJob[];
  runJob: (opts: RunJobOptions) => string;
  removeJob: (id: string) => void;
  downloadJob: (id: string) => void;
  hasActive: boolean;
}

const BackgroundJobsContext = createContext<BackgroundJobsContextValue | null>(null);

export function BackgroundJobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<BackgroundJob[]>([]);
  const jobsRef = useRef<BackgroundJob[]>([]);
  jobsRef.current = jobs;

  const updateJob = useCallback((id: string, patch: Partial<BackgroundJob>) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));
  }, []);

  const removeJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const downloadJob = useCallback((id: string) => {
    const job = jobsRef.current.find((j) => j.id === id);
    if (!job?.blob) return;
    saveAs(job.blob, job.fileName || `${job.label}.zip`);
  }, []);

  const runJob = useCallback(
    (opts: RunJobOptions): string => {
      const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const job: BackgroundJob = {
        id,
        label: opts.label,
        status: "running",
        progress: 0,
        message: "Démarrage...",
        fileName: opts.fileName,
        createdAt: Date.now(),
      };
      setJobs((prev) => [...prev, job]);
      logActivityStandalone("generate_start", `Génération démarrée : ${opts.label}`, {
        label: opts.label,
        fileName: opts.fileName,
      });

      const reporter: JobReporter = {
        setProgress: (pct) =>
          updateJob(id, { progress: Math.max(0, Math.min(100, Math.round(pct))) }),
        setMessage: (msg) => updateJob(id, { message: msg }),
        report: (pct, msg) =>
          updateJob(id, {
            progress: Math.max(0, Math.min(100, Math.round(pct))),
            ...(msg ? { message: msg } : {}),
          }),
      };

      // Détaché du composant appelant : on ne await pas ici.
      (async () => {
        try {
          const blob = await garderActif(() => opts.run(reporter));
          if (blob instanceof Blob) {
            updateJob(id, {
              status: "done",
              progress: 100,
              message: "Terminé",
              blob,
              finishedAt: Date.now(),
            });
            logActivityStandalone(
              "generate_done",
              `Génération terminée : ${opts.label}${opts.fileName ? ` (${opts.fileName})` : ""}`,
              { label: opts.label, fileName: opts.fileName, sizeBytes: blob.size },
            );
            if (opts.autoDownload !== false) {
              saveAs(blob, opts.fileName || `${opts.label}.zip`);
              toast.success(`${opts.label} téléchargé`);
            } else {
              toast.success(`${opts.label} prêt — cliquez pour télécharger`);
            }
          } else {
            // Job terminé sans blob (le run a lui-même déclenché le download)
            updateJob(id, {
              status: "done",
              progress: 100,
              message: "Terminé",
              finishedAt: Date.now(),
            });
            logActivityStandalone("generate_done", `Génération terminée : ${opts.label}`, {
              label: opts.label,
            });
            toast.success(`${opts.label} terminé`);
          }
        } catch (err) {
          console.error(`[BackgroundJob] ${opts.label} failed:`, err);
          const msg = (err as Error)?.message || "Erreur inconnue";
          updateJob(id, {
            status: "error",
            message: msg,
            error: msg,
            finishedAt: Date.now(),
          });
          logActivityStandalone("generate_error", `Erreur : ${opts.label} — ${msg}`, {
            label: opts.label,
            error: msg,
          });
          toast.error(`${opts.label} : ${msg}`);
        }
      })();

      return id;
    },
    [updateJob]
  );

  const hasActive = jobs.some((j) => j.status === "running");

  // Avertir l'utilisateur s'il essaye de fermer l'onglet pendant un job actif
  useEffect(() => {
    if (!hasActive) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasActive]);

  const value = useMemo(
    () => ({ jobs, runJob, removeJob, downloadJob, hasActive }),
    [jobs, runJob, removeJob, downloadJob, hasActive]
  );

  return (
    <BackgroundJobsContext.Provider value={value}>
      {children}
      <BackgroundJobsBar />
    </BackgroundJobsContext.Provider>
  );
}

export function useBackgroundJobs(): BackgroundJobsContextValue {
  const ctx = useContext(BackgroundJobsContext);
  if (!ctx) throw new Error("useBackgroundJobs must be used inside BackgroundJobsProvider");
  return ctx;
}

/** Floating progress bar visible across all routes. */
function BackgroundJobsBar() {
  const { jobs, removeJob, downloadJob } = useBackgroundJobs();
  const visible = jobs.filter(
    (j) => j.status === "running" || j.status === "done" || j.status === "error"
  );
  if (visible.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] space-y-2 pointer-events-none">
      {visible.map((job) => (
        <Card
          key={job.id}
          className="p-3 shadow-lg border-border bg-card pointer-events-auto"
        >
          <div className="flex items-start gap-2">
            <div className="mt-0.5">
              {job.status === "running" && (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              )}
              {job.status === "done" && (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              )}
              {job.status === "error" && (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium truncate">{job.label}</p>
                <button
                  onClick={() => removeJob(job.id)}
                  className="text-muted-foreground hover:text-foreground shrink-0"
                  aria-label="Fermer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {job.message}
              </p>
              {job.status === "running" && (
                <Progress value={job.progress} className="h-1.5 mt-2" />
              )}
              {job.status === "done" && job.blob && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 h-7 text-xs w-full"
                  onClick={() => downloadJob(job.id)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Télécharger à nouveau
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
