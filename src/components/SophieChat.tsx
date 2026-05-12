import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, X, Send, Loader2, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Vérifie mon dossier 🔎",
  "Que demande l'IND 11 ?",
  "Génère une convocation",
  "Quels documents manquent ?",
];

const SophieChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Salut 👋 Je suis **Sophie**, ton auditrice Qualiopi virtuelle. Je connais ton dossier en cours. Pose-moi une question ou demande-moi de générer un document." },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const buildContext = () => {
    try {
      const org = JSON.parse(sessionStorage.getItem("qualiopi_org") || "{}");
      const form = JSON.parse(sessionStorage.getItem("qualiopi_form") || "{}");
      const stag = JSON.parse(sessionStorage.getItem("qualiopi_stag") || "[]");
      const step = sessionStorage.getItem("qualiopi_step") || "?";
      return {
        etape_actuelle: step,
        organisme: { nom: org?.nom, siret: org?.siret, nda: org?.nda, dirigeant: org?.dirigeant },
        formation: { intitule: form?.intitule, duree: form?.duree, dateDebut: form?.dateDebut, dateFin: form?.dateFin, modalites: form?.modalites },
        stagiaires: Array.isArray(stag) ? stag.map((s: any) => ({ nom: s?.nom, prenom: s?.prenom, rqth: s?.rqth, dateDebut: s?.dateDebut, dateFin: s?.dateFin })) : [],
      };
    } catch { return null; }
  };

  const FIELD_LABELS: Record<string, string> = {
    nom: "Nom", prenom: "Prénom", civilite: "Civilité", email: "Email",
    telephone: "Téléphone", dateNaissance: "Date de naissance", lieuNaissance: "Lieu de naissance",
    adresse: "Adresse", dateDebut: "Date de début", dateFin: "Date de fin",
    formation: "Formation", duree: "Durée", modalites: "Modalités",
    organisme: "Organisme", siret: "SIRET", nda: "NDA", dirigeant: "Dirigeant",
    rqth: "RQTH", nir: "NIR",
  };

  const resolveField = (field: string, s: any, org: any, form: any): string => {
    if (["organisme", "siret", "nda", "dirigeant"].includes(field)) {
      return field === "organisme" ? (org?.nom || "") : (org?.[field] || "");
    }
    if (["formation", "duree", "modalites"].includes(field)) {
      return field === "formation" ? (form?.intitule || "") : (form?.[field] || "");
    }
    if (field === "dateDebut") return s?.dateDebut || form?.dateDebut || "";
    if (field === "dateFin") return s?.dateFin || form?.dateFin || "";
    return s?.[field] ?? "";
  };

  const handleQuickDoc = async (j: any) => {
    const { downloadAsPdf } = await import("@/lib/pdfExport");
    const org = JSON.parse(sessionStorage.getItem("qualiopi_org") || "{}");
    const form = JSON.parse(sessionStorage.getItem("qualiopi_form") || "{}");
    const stag = JSON.parse(sessionStorage.getItem("qualiopi_stag") || "[]");
    const fields: string[] = Array.isArray(j.fields) ? j.fields : [];
    if (!fields.length) { toast.error("Sophie : aucun champ détecté"); return; }
    let targets: any[] = Array.isArray(stag) ? stag : [];
    if (j.target && j.target !== "all" && targets.length) {
      const t = String(j.target).toLowerCase();
      const f = targets.filter((s: any) => `${s?.prenom || ""} ${s?.nom || ""}`.toLowerCase().includes(t));
      if (f.length) targets = f;
    }
    if (!targets.length) targets = [{}];
    const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    const title = j.title || "Document généré par Sophie";
    const headers = fields.map(f => `<th style="background:#1e3a7b;color:#fff;padding:8px;border:1px solid #1e3a7b;font-size:12px;text-align:left">${FIELD_LABELS[f] || f}</th>`).join("");
    const rows = targets.map((s: any, i: number) => {
      const cells = fields.map(f => `<td style="padding:8px;border:1px solid #ccc;font-size:12px">${resolveField(f, s, org, form) || "—"}</td>`).join("");
      return `<tr style="background:${i % 2 ? "#f0f5ff" : "#fff"}">${cells}</tr>`;
    }).join("");
    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h1 style="color:#1e3a7b;text-align:center;font-size:20px;margin-bottom:6px">${title}</h1>
        <p style="text-align:center;color:#666;font-size:11px;margin-bottom:20px">${org?.nom || ""} — Édité le ${today}</p>
        <table style="width:100%;border-collapse:collapse"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>
        <p style="margin-top:30px;font-size:10px;color:#888;text-align:center">Document généré automatiquement par Sophie • ${org?.nom || ""} ${org?.siret ? "• SIRET " + org.siret : ""} ${org?.nda ? "• NDA " + org.nda : ""}</p>
      </div>`;
    const filename = `${title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_")}.pdf`;
    try {
      await downloadAsPdf(html, filename);
      toast.success(`✅ ${j.note || "Fichier téléchargé"}`);
    } catch (e: any) {
      toast.error("Export PDF : " + (e?.message || "erreur"));
    }
  };

  const handleAction = (raw: string) => {
    const match = raw.match(/\{[\s\S]*?"action"\s*:\s*"(generate|quick_doc)"[\s\S]*?\}/);
    if (!match) return false;
    try {
      const j = JSON.parse(match[0]);
      if (j.action === "quick_doc") { handleQuickDoc(j); return true; }
      toast.success(`📋 ${j.note || "Document demandé"}`, {
        description: `Type: ${j.docType} • Cible: ${j.target}. Va à l'étape "Dossier" pour générer.`,
        duration: 6000,
      });
      return true;
    } catch { return false; }
  };

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user" as const, content }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || "https://uwjxorvytlqqxszylxre.supabase.co";
      const ANON = (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3anhvcnZ5dGxxcXhzenlseHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NTQ5NzQsImV4cCI6MjA4OTMzMDk3NH0.Q4ZON96PgvXy5IewFWTbHJvXx10ZVVa-PjGhmrwZMPQ";
      const res = await fetch(`${SUPABASE_URL}/functions/v1/sophie-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": ANON, "Authorization": `Bearer ${ANON}` },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          context: buildContext(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      // Stream SSE
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantContent = "";
      setMessages(m => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content || "";
            if (delta) {
              assistantContent += delta;
              setMessages(m => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: assistantContent };
                return copy;
              });
            }
          } catch {}
        }
      }
      handleAction(assistantContent);
    } catch (e: any) {
      toast.error("Sophie : " + (e.message || "erreur"));
      setMessages(m => [...m, { role: "assistant", content: "⚠️ Une erreur est survenue. Réessaie ?" }]);
    } finally {
      setLoading(false);
    }
  };

  // Markdown-light renderer
  const render = (txt: string) => {
    const html = txt
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code class='bg-muted px-1 rounded'>$1</code>")
      .replace(/\n/g, "<br/>");
    return { __html: html };
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-pulse-soft"
          aria-label="Ouvrir Sophie"
          style={{ boxShadow: "0 8px 32px hsl(var(--primary) / 0.4)" }}
        >
          <Sparkles className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] bg-card rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">Sophie</p>
                <p className="text-[11px] opacity-90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Auditrice Qualiopi en ligne
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8 text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border rounded-bl-sm"
                  }`}
                  dangerouslySetInnerHTML={render(m.content)}
                />
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-card border rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-xs text-muted-foreground">Sophie réfléchit…</span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t p-3 bg-card">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Demande à Sophie…"
                rows={1}
                className="flex-1 resize-none bg-secondary/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 max-h-24"
              />
              <Button size="icon" onClick={() => send()} disabled={loading || !input.trim()} className="h-9 w-9 shrink-0">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SophieChat;
