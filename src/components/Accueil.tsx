import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, Building2, CalendarDays, Check, ChevronRight, Clock, FileBadge,
  FileCheck, FileSearch, FolderCheck, Globe, GraduationCap, History, LayoutDashboard, LayoutGrid, LogIn, LogOut, Mail,
  Palette, PanelLeft, Play, Search, ShieldCheck, Sparkles, Stamp, Truck, UserCircle, Workflow, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

/** Un outil de l'accueil : une page de l'application (`route`), un autre site (`url`) ou le parcours en 5 étapes. */
interface Outil {
  label: string;
  description: string;
  icon: LucideIcon;
  route?: string;
  url?: string;
  action?: "preparer";
}

interface Famille {
  titre: string;
  sousTitre: string;
  icon: LucideIcon;
  /** Dégradé de la pastille d'icône. */
  couleur: string;
  outils: Outil[];
}

const FAMILLES: Famille[] = [
  {
    titre: "Dossiers Qualiopi", sousTitre: "AF, CFA, VAE, BC", icon: FolderCheck,
    couleur: "from-blue-500 to-blue-800",
    outils: [
      { label: "Préparer dossier Qualiopi", description: "5 étapes, de l'organisme aux documents", icon: FolderCheck, action: "preparer" },
      { label: "Génération rapide", description: "Un dossier complet en quelques minutes", icon: Zap, route: "/rapide" },
      { label: "Génération VAE", description: "Accompagnement à la VAE", icon: GraduationCap, route: "/vae" },
      { label: "Bilan de compétences", description: "Dossier BC complet", icon: FileCheck, route: "/bilan-competences" },
    ],
  },
  {
    titre: "EDOF et financeurs", sousTitre: "CPF, OPCO, BPF", icon: Workflow,
    couleur: "from-amber-400 to-orange-700",
    outils: [
      { label: "Automatisation EDOF", description: "Pièces depuis l'export EDOF", icon: Workflow, route: "/automatisation-edof" },
      { label: "Audit EDOF (PDF)", description: "Analyse d'un export EDOF", icon: FileSearch, route: "/audit-edof" },
      { label: "Contrôle EDOF / EY", description: "Préparer un contrôle", icon: ShieldCheck, route: "/controle-ey" },
      { label: "OPCO Mobilités", description: "Dossiers OPCO Mobilités", icon: Truck, route: "/opco-mobilites" },
      { label: "Analyse BPF", description: "Lecture du bilan pédagogique", icon: BarChart3, route: "/analyse-bpf" },
    ],
  },
  {
    titre: "Identité de l'organisme", sousTitre: "NDA, tampon, logo, CV", icon: Building2,
    couleur: "from-emerald-400 to-emerald-700",
    outils: [
      { label: "Demande NDA", description: "Déclaration d'activité", icon: FileBadge, route: "/demande-nda" },
      { label: "Générateur de tampon", description: "Tampon de l'organisme", icon: Stamp, route: "/generateur-tampon" },
      { label: "Créateur de logo", description: "Logo de l'organisme", icon: Sparkles, route: "/generateur-logo" },
      { label: "Générateur de CV", description: "CV du formateur", icon: UserCircle, route: "/generateur-cv" },
    ],
  },
  {
    titre: "Messagerie modifiable", sousTitre: "S'ouvre dans un autre site", icon: Mail,
    couleur: "from-rose-400 to-rose-700",
    outils: [
      { label: "Outlook", description: "Autre site", icon: Mail, url: "https://outlook-modifiable.netlify.app/" },
      { label: "Gmail", description: "Autre site", icon: Globe, url: "https://gmail-modifiable.netlify.app/" },
      { label: "Agenda", description: "Autre site", icon: CalendarDays, url: "https://agenda-modifiable.netlify.app/" },
    ],
  },
];

const TYPES: Record<string, { court: string; classe: string }> = {
  "actions-formation": { court: "AF", classe: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  apprentissage: { court: "CFA", classe: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
  vae: { court: "VAE", classe: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
  "bilans-competences": { court: "BC", classe: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
};

const ETAPES = [
  { n: 1, titre: "Organisme", detail: "SIRET, NDA, rôles" },
  { n: 2, titre: "Formation", detail: "Programme, durée" },
  { n: 3, titre: "Stagiaires", detail: "Import EDOF ou saisie" },
  { n: 4, titre: "Critères", detail: "33 indicateurs" },
  { n: 5, titre: "Documents", detail: "≈ 500 preuves" },
];

export type DesignAccueil = "tableau" | "lanceur" | "espace";

const DESIGNS: { id: DesignAccueil; nom: string; detail: string; icon: LucideIcon }[] = [
  { id: "tableau", nom: "Tableau de bord", detail: "Bandeau, dossiers récents et familles d'outils", icon: LayoutDashboard },
  { id: "lanceur", nom: "Lanceur d'outils", detail: "Recherche au centre et tuiles", icon: LayoutGrid },
  { id: "espace", nom: "Espace de travail", detail: "Menu latéral et 5 étapes", icon: PanelLeft },
];

const CLE_DESIGN = "gq_design_accueil";

function lireDesign(): DesignAccueil {
  try {
    const v = localStorage.getItem(CLE_DESIGN);
    if (v === "tableau" || v === "lanceur" || v === "espace") return v;
  } catch { /* stockage indisponible : design par défaut */ }
  return "tableau";
}

interface DossierRecent {
  id: string;
  name: string;
  updated_at: string;
  typesActions: string[] | null;
}

function depuis(iso: string): string {
  const jours = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (jours <= 0) return "Aujourd'hui";
  if (jours === 1) return "Hier";
  if (jours < 30) return `Il y a ${jours} jours`;
  return new Date(iso).toLocaleDateString("fr-FR");
}

const TITRE = { fontFamily: "'Space Grotesk', sans-serif" } as const;

const BANDEAU = {
  background:
    "radial-gradient(120% 90% at 100% 0%, rgba(80,140,255,.55), transparent 55%)," +
    "radial-gradient(80% 80% at 0% 100%, rgba(31,157,108,.35), transparent 60%)," +
    "linear-gradient(140deg, #0f2a66, hsl(var(--primary)))",
};

const QUADRILLAGE = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  maskImage: "radial-gradient(90% 90% at 80% 10%, #000, transparent 70%)",
  WebkitMaskImage: "radial-gradient(90% 90% at 80% 10%, #000, transparent 70%)",
};

interface AccueilProps {
  user: User | null;
  isSuperAdmin: boolean;
  onSignOut: () => void;
  onNavigate: (route: string) => void;
  /** Ouvre le parcours « Préparer dossier Qualiopi », à l'étape donnée si précisée. */
  onPreparer: (etape?: number) => void;
  /** Ouvre le parcours sur un dossier de l'historique. */
  onOuvrirDossier: (id: string) => void;
}

const Accueil = ({ user, isSuperAdmin, onSignOut, onNavigate, onPreparer, onOuvrirDossier }: AccueilProps) => {
  const [design, setDesign] = useState<DesignAccueil>(lireDesign);
  const [recents, setRecents] = useState<DossierRecent[]>([]);
  const [compte, setCompte] = useState<{ actifs: number; ceMois: number } | null>(null);
  const [recherche, setRecherche] = useState(false);

  const choisirDesign = (d: DesignAccueil) => {
    setDesign(d);
    try { localStorage.setItem(CLE_DESIGN, d); } catch { /* choix gardé pour cette visite seulement */ }
  };

  useEffect(() => {
    if (!user) { setRecents([]); setCompte(null); return; }
    // Sélection JSON (organisme->typesActions) hors du typage généré : évite de télécharger les tampons en base64.
    const table = supabase.from("saved_dossiers") as any;
    table
      .select("id, name, updated_at, typesActions:organisme->typesActions")
      .eq("user_id", user.id)
      .eq("archived", false)
      .order("updated_at", { ascending: false })
      .limit(5)
      .then(({ data }: { data: DossierRecent[] | null }) => setRecents(data || []));

    const debutMois = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    Promise.all([
      supabase.from("saved_dossiers").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("archived", false),
      supabase.from("saved_dossiers").select("id", { count: "exact", head: true }).eq("user_id", user.id).gte("created_at", debutMois),
    ]).then(([a, m]) => setCompte({ actifs: a.count ?? 0, ceMois: m.count ?? 0 }));
  }, [user]);

  useEffect(() => {
    const raccourci = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); setRecherche(v => !v); }
    };
    window.addEventListener("keydown", raccourci);
    return () => window.removeEventListener("keydown", raccourci);
  }, []);

  const ouvrir = (o: Outil) => {
    setRecherche(false);
    if (o.action === "preparer") onPreparer();
    else if (o.route) onNavigate(o.route);
    else if (o.url) window.open(o.url, "_blank", "noopener");
  };

  // ---------- Éléments communs ----------
  const Marque = ({ claire = false }: { claire?: boolean }) => (
    <div style={TITRE} className={`flex items-center gap-2.5 text-lg font-bold tracking-tight ${claire ? "text-white" : ""}`}>
      <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-900 text-primary-foreground shadow-md">
        <BadgeCheck className="w-5 h-5" />
      </span>
      Génie Qualiopi
    </div>
  );

  const BarreRecherche = ({ large = false }: { large?: boolean }) => (
    <button
      type="button"
      onClick={() => setRecherche(true)}
      className={large
        ? "flex items-center gap-3 w-full max-w-2xl rounded-2xl border-2 border-primary bg-card px-5 py-4 text-base text-muted-foreground shadow-elevated ring-4 ring-primary/10 hover:ring-primary/20 transition"
        : "flex items-center gap-2 w-64 max-w-full rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground shadow-sm hover:border-primary/50 transition-colors"}
    >
      <Search className={large ? "w-5 h-5 shrink-0" : "w-4 h-4 shrink-0"} />
      <span className="flex-1 text-left truncate">{large ? "ex. « tampon », « VAE », le nom d'un organisme" : "Rechercher un outil ou un dossier"}</span>
      <kbd className="rounded border bg-muted px-1.5 text-[10px] font-semibold">Ctrl K</kbd>
    </button>
  );

  const ChoixDesign = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2"><Palette className="w-4 h-4" /> Changer de design</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Design de l'accueil</DropdownMenuLabel>
        {DESIGNS.map(d => (
          <DropdownMenuItem key={d.id} onSelect={() => choisirDesign(d.id)} className="gap-3 py-2">
            <d.icon className="w-4 h-4 text-muted-foreground" />
            <span className="flex-1">
              <span className="block font-medium">{d.nom}</span>
              <span className="block text-xs text-muted-foreground">{d.detail}</span>
            </span>
            {design === d.id && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const Compte = () => user ? (
    <>
      <span className="hidden lg:inline text-xs text-muted-foreground">{user.email}</span>
      {isSuperAdmin && (
        <Button variant="outline" size="sm" onClick={() => onNavigate("/admin")} className="gap-1">
          <ShieldCheck className="w-4 h-4" /> Admin
        </Button>
      )}
      <Button variant="ghost" size="sm" onClick={onSignOut} title="Déconnexion"><LogOut className="w-4 h-4" /></Button>
    </>
  ) : (
    <Button variant="outline" size="sm" onClick={() => onNavigate("/auth")} className="gap-2">
      <LogIn className="w-4 h-4" /> Connexion
    </Button>
  );

  const ListeRecents = () => !user ? (
    <div className="py-8 text-center space-y-3">
      <p className="text-sm text-muted-foreground">Connectez-vous pour retrouver vos dossiers.</p>
      <Button variant="outline" size="sm" onClick={() => onNavigate("/auth")} className="gap-2"><LogIn className="w-4 h-4" /> Connexion</Button>
    </div>
  ) : recents.length === 0 ? (
    <p className="py-8 text-center text-sm text-muted-foreground">Aucun dossier enregistré pour l'instant. Vos dossiers apparaîtront ici.</p>
  ) : (
    <ul className="space-y-1">
      {recents.slice(0, 4).map(d => {
        const t = TYPES[d.typesActions?.[0] ?? ""];
        return (
          <li key={d.id}>
            <button
              type="button"
              onClick={() => onOuvrirDossier(d.id)}
              className="w-full grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl p-2.5 text-left hover:bg-muted transition-colors"
            >
              <span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${t?.classe ?? "bg-muted text-muted-foreground"}`}>
                {t?.court ?? "—"}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{d.name}</span>
                <span className="block text-xs text-muted-foreground">{depuis(d.updated_at)}</span>
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </li>
        );
      })}
    </ul>
  );

  const Pastille = ({ icon: Icon, couleur, taille = "md" }: { icon: LucideIcon; couleur: string; taille?: "md" | "lg" }) => (
    <span className={`grid place-items-center shrink-0 rounded-xl bg-gradient-to-br ${couleur} text-white shadow-sm ${taille === "lg" ? "w-11 h-11" : "w-10 h-10"}`}>
      <Icon className="w-5 h-5" />
    </span>
  );

  // ---------- A — Tableau de bord ----------
  const Tableau = () => (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <Marque />
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <BarreRecherche />
          <ChoixDesign />
          <Compte />
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl p-7 text-white shadow-xl" style={BANDEAU}>
          <div aria-hidden className="pointer-events-none absolute inset-0" style={QUADRILLAGE} />
          <div className="relative space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[.09em] text-white/70">Nouveau dossier</p>
            <h1 className="text-3xl md:text-[34px] font-bold leading-tight tracking-tight max-w-[20ch]">
              Un dossier Qualiopi complet, prêt pour l'audit
            </h1>
            <p className="text-white/75 max-w-[52ch]">Organisme, formation, stagiaires : le reste est généré, signé et tamponné.</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button size="lg" onClick={() => onPreparer()} className="gap-2 bg-white text-[#0f2a66] hover:bg-white/90 shadow-lg font-semibold">
                <FolderCheck className="w-5 h-5" /> Préparer dossier Qualiopi
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("/rapide")} className="gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur">
                <Zap className="w-5 h-5" /> Génération rapide
              </Button>
            </div>
            <dl className="flex flex-wrap border-t border-white/20 pt-4">
              {[["7", "critères"], ["33", "indicateurs"], ["≈ 500", "documents de preuve"], ["4", "types d'action"]].map(([v, l]) => (
                <div key={l} className="pr-6 mr-6 border-r border-white/20 last:border-0 last:mr-0">
                  <dt style={TITRE} className="text-2xl font-bold tabular-nums">{v}</dt>
                  <dd className="text-xs text-white/70">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-5 shadow-card min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Reprendre un dossier</h2>
            {user && (
              <button type="button" onClick={() => onPreparer()} className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Historique <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <ListeRecents />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {FAMILLES.map(f => (
          <div key={f.titre} className="rounded-2xl border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
            <div className="flex items-center gap-3 mb-3">
              <Pastille icon={f.icon} couleur={f.couleur} />
              <div>
                <h3 className="text-[15px] font-semibold leading-tight">{f.titre}</h3>
                <p className="text-xs text-muted-foreground">{f.sousTitre}</p>
              </div>
            </div>
            <ul>
              {f.outils.map(o => (
                <li key={o.label}>
                  <button type="button" onClick={() => ouvrir(o)} className="group w-full flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium hover:bg-muted transition-colors">
                    <o.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    <span className="flex-1 text-left">{o.label}</span>
                    {o.url && <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );

  // ---------- B — Lanceur d'outils ----------
  const [dossiersQualiopi, ...autresFamilles] = FAMILLES;
  const Lanceur = () => (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <Marque />
        <div className="flex flex-wrap items-center gap-2"><ChoixDesign /><Compte /></div>
      </header>

      <section
        className="rounded-3xl border bg-card px-5 py-10 flex flex-col items-center gap-4 text-center"
        style={{ backgroundImage: "radial-gradient(60% 80% at 20% 0%, hsl(var(--primary) / .10), transparent 70%), radial-gradient(50% 70% at 85% 10%, hsl(var(--accent) / .12), transparent 70%)" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[.09em] text-muted-foreground">Bonjour</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Que voulez-vous préparer aujourd'hui ?</h1>
        <p className="text-muted-foreground">Tapez un organisme, un dossier ou un outil.</p>
        <BarreRecherche large />
        {recents.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[.09em] text-muted-foreground">Récents</span>
            {recents.slice(0, 3).map(d => (
              <button key={d.id} type="button" onClick={() => onOuvrirDossier(d.id)} className="inline-flex items-center gap-1.5 max-w-[260px] rounded-full border bg-card px-3 py-1.5 text-xs shadow-sm hover:border-primary/50">
                <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" /><span className="truncate">{d.name}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[.09em] text-muted-foreground">{dossiersQualiopi.titre}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {dossiersQualiopi.outils.map((o, i) => (
            <button
              key={o.label}
              type="button"
              onClick={() => ouvrir(o)}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated ${i === 0 ? "text-white border-transparent" : "bg-card"}`}
              style={i === 0 ? BANDEAU : undefined}
            >
              {i === 0
                ? <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-white/15"><o.icon className="w-5 h-5" /></span>
                : <Pastille icon={o.icon} couleur={["", "from-emerald-400 to-emerald-700", "from-violet-400 to-violet-700", "from-teal-400 to-teal-700"][i]} taille="lg" />}
              <span className="min-w-0">
                <span className="block font-semibold">{o.label}</span>
                <span className={`block text-xs ${i === 0 ? "text-white/75" : "text-muted-foreground"}`}>{o.description}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[.09em] text-muted-foreground">EDOF, financeurs, organisme et messagerie</p>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          {autresFamilles.flatMap(f => f.outils.map(o => (
            <button key={o.label} type="button" onClick={() => ouvrir(o)} className="flex flex-col items-center gap-2.5 rounded-2xl border bg-card px-2 py-4 text-center text-xs font-semibold shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
              <Pastille icon={o.icon} couleur={f.couleur} />
              <span className="flex items-center gap-1">{o.label}{o.url && <ArrowUpRight className="w-3 h-3 text-muted-foreground" />}</span>
            </button>
          )))}
        </div>
      </section>
    </div>
  );

  // ---------- C — Espace de travail ----------
  const Espace = () => (
    <div className="min-h-screen grid lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block bg-[#0f1a33] text-[#c9d3e8] px-3 py-5 space-y-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="px-2"><Marque claire /></div>
        <nav className="space-y-5">
          <div className="space-y-0.5">
            <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[.09em] text-[#7f8cab]">Accueil</p>
            <span className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-white bg-[#1d2b4f] shadow-[inset_2px_0_0_#6b97f5]">
              <LayoutDashboard className="w-4 h-4 text-[#8fb0ff]" /> Tableau de bord
            </span>
          </div>
          {FAMILLES.map(f => (
            <div key={f.titre} className="space-y-0.5">
              <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[.09em] text-[#7f8cab]">{f.titre}</p>
              {f.outils.map(o => (
                <button key={o.label} type="button" onClick={() => ouvrir(o)} className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors">
                  <o.icon className="w-4 h-4 text-[#7f8cab]" />
                  <span className="flex-1 text-left">{o.label}</span>
                  {o.url && <ArrowUpRight className="w-3 h-3 text-[#7f8cab]" />}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 px-4 md:px-8 py-6 space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <BarreRecherche />
          <div className="flex flex-wrap items-center gap-2"><ChoixDesign /><Compte /></div>
        </header>

        <section className="rounded-3xl border bg-card p-6 md:p-8 shadow-card space-y-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.09em] text-muted-foreground">Les 5 étapes</p>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Préparer dossier Qualiopi</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => onPreparer()} className="gap-2"><History className="w-4 h-4" /> Historique</Button>
              <Button onClick={() => onNavigate("/rapide")} className="gap-2 bg-gradient-accent border-0 text-primary-foreground"><Zap className="w-4 h-4" /> Génération rapide</Button>
            </div>
          </div>

          <ol className="relative grid grid-cols-5 gap-2">
            <span aria-hidden className="absolute left-[10%] right-[10%] top-[22px] h-0.5 bg-border" />
            {ETAPES.map(e => (
              <li key={e.n} className="relative">
                <button type="button" onClick={() => onPreparer(e.n)} className="group w-full flex flex-col items-center gap-1.5 text-center">
                  <span
                    style={TITRE}
                    className={`grid place-items-center w-11 h-11 rounded-full border-2 text-sm font-bold shadow-sm transition-colors ${e.n === 1
                      ? "bg-primary border-primary text-primary-foreground ring-4 ring-primary/15"
                      : "bg-card border-border text-muted-foreground group-hover:border-primary group-hover:text-primary"}`}
                  >
                    {e.n}
                  </span>
                  <span className="text-sm font-semibold">{e.titre}</span>
                  <span className="hidden sm:block text-xs text-muted-foreground">{e.detail}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="flex justify-center">
            <Button size="lg" onClick={() => onPreparer(1)} className="gap-2 bg-gradient-hero border-0 text-primary-foreground shadow-elevated">
              <Play className="w-5 h-5" /> Préparer dossier Qualiopi
            </Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-[.09em] text-muted-foreground">Dossiers actifs</p>
            <p style={TITRE} className="text-3xl font-bold tabular-nums">{compte ? compte.actifs : "—"}</p>
            <p className="text-xs text-muted-foreground">{user ? "dans votre historique" : "connectez-vous pour les voir"}</p>
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-[.09em] text-muted-foreground">Créés ce mois-ci</p>
            <p style={TITRE} className="text-3xl font-bold tabular-nums">{compte ? compte.ceMois : "—"}</p>
            <p className="text-xs text-muted-foreground">depuis le 1er du mois</p>
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-card min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[.09em] text-muted-foreground">Dernier dossier</p>
            {recents[0] ? (
              <button type="button" onClick={() => onOuvrirDossier(recents[0].id)} className="mt-1 w-full text-left group">
                <span className="block truncate font-semibold group-hover:text-primary">{recents[0].name}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">{depuis(recents[0].updated_at)} · Reprendre <ArrowRight className="w-3 h-3" /></span>
              </button>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">Aucun dossier pour l'instant.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {design === "tableau" && Tableau()}
      {design === "lanceur" && Lanceur()}
      {design === "espace" && Espace()}

      <CommandDialog open={recherche} onOpenChange={setRecherche}>
        <CommandInput placeholder="Rechercher un outil ou un dossier…" />
        <CommandList>
          <CommandEmpty>Aucun résultat.</CommandEmpty>
          {recents.length > 0 && (
            <CommandGroup heading="Dossiers récents">
              {recents.map(d => (
                <CommandItem key={d.id} value={`dossier ${d.name}`} onSelect={() => { setRecherche(false); onOuvrirDossier(d.id); }}>
                  <FolderCheck className="mr-2 w-4 h-4" /> {d.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {FAMILLES.map(f => (
            <CommandGroup key={f.titre} heading={f.titre}>
              {f.outils.map(o => (
                <CommandItem key={o.label} value={`${f.titre} ${o.label}`} onSelect={() => ouvrir(o)}>
                  <o.icon className="mr-2 w-4 h-4" /> {o.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandGroup heading="Design de l'accueil">
            {DESIGNS.map(d => (
              <CommandItem key={d.id} value={`design ${d.nom}`} onSelect={() => { choisirDesign(d.id); setRecherche(false); }}>
                <d.icon className="mr-2 w-4 h-4" /> Passer au design « {d.nom} »
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default Accueil;
