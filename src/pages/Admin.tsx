import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole, type AppRole } from "@/hooks/useUserRole";
import { useActivityLogger } from "@/hooks/useActivityLogger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, Download, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

type ActivityLog = {
  id: string;
  user_id: string | null;
  user_email: string | null;
  action: string;
  description: string | null;
  page: string | null;
  form_data: any;
  ip_address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  user_agent: string | null;
  created_at: string;
};

type ProfileRow = {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
  disabled: boolean;
};

type UserRoleRow = { user_id: string; role: AppRole };

const ROLE_LABELS: Record<AppRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  user: "Utilisateur",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("fr-FR");
}

export default function Admin() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { isSuperAdmin, loading: roleLoading } = useUserRole();
  const { logActivity } = useActivityLogger();

  if (!authLoading && !user) return <Navigate to="/auth" replace />;
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!isSuperAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour
            </Button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Tableau de bord Super Admin
              </h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await logActivity("logout", "Déconnexion depuis /admin");
              await signOut();
              navigate("/auth");
            }}
          >
            Déconnexion
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="logs">Journal d'activité</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="logs" className="mt-6">
            <LogsTab />
          </TabsContent>
          <TabsContent value="users" className="mt-6">
            <UsersTab currentUserId={user!.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* -------- Vue d'ensemble -------- */

function OverviewTab() {
  const [stats, setStats] = useState({
    users: 0,
    activeToday: 0,
    docsToday: 0,
    docsWeek: 0,
    docsMonth: 0,
    total: 0,
  });
  const [chart, setChart] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const now = new Date();
      const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const startWeek = new Date(Date.now() - 7 * 86400000).toISOString();
      const startMonth = new Date(Date.now() - 30 * 86400000).toISOString();

      const [usersRes, allLogsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase
          .from("activity_logs")
          .select("action, user_id, created_at")
          .gte("created_at", startMonth),
      ]);

      const logs = allLogsRes.data ?? [];
      const isDocAction = (a: string) =>
        a.startsWith("generate_") || a === "download_document" || a === "save_dossier";

      const docsToday = logs.filter((l) => isDocAction(l.action) && l.created_at >= startDay).length;
      const docsWeek = logs.filter((l) => isDocAction(l.action) && l.created_at >= startWeek).length;
      const docsMonth = logs.filter((l) => isDocAction(l.action)).length;
      const activeToday = new Set(
        logs.filter((l) => l.created_at >= startDay).map((l) => l.user_id),
      ).size;

      // Graphique 30 jours
      const byDay: Record<string, number> = {};
      for (let i = 29; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000);
        const key = d.toISOString().slice(0, 10);
        byDay[key] = 0;
      }
      logs.forEach((l) => {
        const key = l.created_at.slice(0, 10);
        if (byDay[key] !== undefined) byDay[key]++;
      });

      const { count: totalCount } = await supabase
        .from("activity_logs")
        .select("id", { count: "exact", head: true });

      setStats({
        users: usersRes.count ?? 0,
        activeToday,
        docsToday,
        docsWeek,
        docsMonth,
        total: totalCount ?? 0,
      });
      setChart(
        Object.entries(byDay).map(([date, count]) => ({
          date: date.slice(5),
          count,
        })),
      );
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  const cards = [
    { label: "Utilisateurs", value: stats.users },
    { label: "Actifs aujourd'hui", value: stats.activeToday },
    { label: "Documents aujourd'hui", value: stats.docsToday },
    { label: "Documents (7 j)", value: stats.docsWeek },
    { label: "Documents (30 j)", value: stats.docsMonth },
    { label: "Actions totales", value: stats.total },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activité — 30 derniers jours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* -------- Journal d'activité -------- */

function LogsTab({ filterUserId }: { filterUserId?: string } = {}) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>(filterUserId ?? "all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [selected, setSelected] = useState<ActivityLog | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (!mounted) return;
      setLogs((data as ActivityLog[]) ?? []);
      setLoading(false);
    })();

    // Realtime
    const channel = supabase
      .channel("activity_logs_admin")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "activity_logs" },
        (payload) => {
          setLogs((prev) => [payload.new as ActivityLog, ...prev].slice(0, 1000));
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const actions = useMemo(
    () => Array.from(new Set(logs.map((l) => l.action))).sort(),
    [logs],
  );
  const users = useMemo(() => {
    const map = new Map<string, string>();
    logs.forEach((l) => {
      if (l.user_id && l.user_email) map.set(l.user_id, l.user_email);
    });
    return Array.from(map.entries()).map(([id, email]) => ({ id, email }));
  }, [logs]);

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      if (actionFilter !== "all" && l.action !== actionFilter) return false;
      if (userFilter !== "all" && l.user_id !== userFilter) return false;
      if (dateFrom && l.created_at < dateFrom) return false;
      if (dateTo && l.created_at > dateTo + "T23:59:59") return false;
      if (search) {
        const s = search.toLowerCase();
        const hay = `${l.user_email ?? ""} ${l.action} ${l.description ?? ""} ${l.city ?? ""} ${l.country ?? ""}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [logs, actionFilter, userFilter, dateFrom, dateTo, search]);

  const exportCsv = () => {
    const rows = [
      ["Date", "Utilisateur", "Action", "Description", "Page", "Ville", "Pays", "IP", "User agent"],
      ...filtered.map((l) => [
        fmtDate(l.created_at),
        l.user_email ?? "",
        l.action,
        (l.description ?? "").replace(/[\r\n]+/g, " "),
        l.page ?? "",
        l.city ?? "",
        l.country ?? "",
        l.ip_address ?? "",
        (l.user_agent ?? "").replace(/[\r\n]+/g, " "),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `journal_activite_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-2">
            <Label className="text-xs">Recherche</Label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Email, action, description…"
            />
          </div>
          <div>
            <Label className="text-xs">Action</Label>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {actions.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Utilisateur</Label>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {users.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Du</Label>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Au</Label>
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <div className="md:col-span-6 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {filtered.length} entrée{filtered.length > 1 ? "s" : ""}
            </span>
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="w-4 h-4 mr-2" /> Exporter CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date/heure</TableHead>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Appareil</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow
                    key={l.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(l)}
                  >
                    <TableCell className="whitespace-nowrap text-xs">
                      {fmtDate(l.created_at)}
                    </TableCell>
                    <TableCell className="text-xs">{l.user_email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{l.action}</Badge>
                    </TableCell>
                    <TableCell className="max-w-md truncate text-xs">
                      {l.description}
                    </TableCell>
                    <TableCell className="text-xs">
                      {[l.city, l.country].filter(Boolean).join(", ") || "—"}
                    </TableCell>
                    <TableCell className="text-xs max-w-[200px] truncate">
                      {l.user_agent?.split(" ").slice(-2).join(" ")}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucune entrée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.action}</SheetTitle>
                <SheetDescription>{fmtDate(selected.created_at)}</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4 text-sm">
                <DetailRow label="Utilisateur" value={selected.user_email} />
                <DetailRow label="Description" value={selected.description} />
                <DetailRow label="Page" value={selected.page} />
                <DetailRow label="IP" value={selected.ip_address} />
                <DetailRow
                  label="Localisation"
                  value={[selected.city, selected.region, selected.country]
                    .filter(Boolean)
                    .join(" · ")}
                />
                <DetailRow label="User agent" value={selected.user_agent} />
                {selected.form_data && (
                  <div>
                    <div className="font-medium mb-2">Données du formulaire</div>
                    <div className="border rounded-md p-3 bg-muted/30 space-y-1">
                      {Object.entries(selected.form_data as Record<string, any>).map(
                        ([k, v]) => (
                          <div key={k} className="grid grid-cols-3 gap-2 text-xs">
                            <span className="font-mono text-muted-foreground col-span-1">
                              {k}
                            </span>
                            <span className="col-span-2 break-words">
                              {typeof v === "object" ? JSON.stringify(v) : String(v)}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: any }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm break-words">{String(value)}</div>
    </div>
  );
}

/* -------- Utilisateurs -------- */

function UsersTab({ currentUserId }: { currentUserId: string }) {
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [rolesMap, setRolesMap] = useState<Record<string, AppRole[]>>({});
  const [lastActivity, setLastActivity] = useState<
    Record<string, { at: string; city?: string; country?: string; count: number }>
  >({});
  const [loading, setLoading] = useState(true);
  const [historyUser, setHistoryUser] = useState<ProfileRow | null>(null);

  const load = async () => {
    setLoading(true);
    const [pRes, rRes, lRes] = await Promise.all([
      supabase.from("profiles").select("id,email,display_name,created_at,disabled"),
      supabase.from("user_roles").select("user_id,role"),
      supabase
        .from("activity_logs")
        .select("user_id,created_at,city,country,action")
        .order("created_at", { ascending: false })
        .limit(5000),
    ]);
    const rm: Record<string, AppRole[]> = {};
    (rRes.data ?? []).forEach((r: UserRoleRow) => {
      rm[r.user_id] = [...(rm[r.user_id] ?? []), r.role];
    });
    const la: Record<string, any> = {};
    (lRes.data ?? []).forEach((l: any) => {
      if (!l.user_id) return;
      if (!la[l.user_id]) {
        la[l.user_id] = {
          at: l.created_at,
          city: l.city,
          country: l.country,
          count: 0,
        };
      }
      const isDoc =
        l.action?.startsWith("generate_") ||
        l.action === "download_document" ||
        l.action === "save_dossier";
      if (isDoc) la[l.user_id].count++;
    });
    setProfiles((pRes.data as ProfileRow[]) ?? []);
    setRolesMap(rm);
    setLastActivity(la);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const changeRole = async (userId: string, newRole: AppRole) => {
    if (userId === currentUserId && newRole !== "super_admin") {
      toast.error("Vous ne pouvez pas retirer votre propre rôle super_admin.");
      return;
    }
    // On garde une seule ligne par (user, role) : on supprime les autres puis on insère
    await supabase.from("user_roles").delete().eq("user_id", userId);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: newRole });
    if (error) {
      toast.error("Erreur : " + error.message);
      return;
    }
    toast.success("Rôle mis à jour.");
    load();
  };

  const toggleDisabled = async (p: ProfileRow) => {
    if (p.id === currentUserId) {
      toast.error("Vous ne pouvez pas désactiver votre propre compte.");
      return;
    }
    const { error } = await supabase
      .from("profiles")
      .update({ disabled: !p.disabled })
      .eq("id", p.id);
    if (error) {
      toast.error("Erreur : " + error.message);
      return;
    }
    toast.success(p.disabled ? "Compte réactivé." : "Compte désactivé.");
    load();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <>
      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Inscrit le</TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((p) => {
                const roles = rolesMap[p.id] ?? ["user"];
                const highest: AppRole = roles.includes("super_admin")
                  ? "super_admin"
                  : roles.includes("admin")
                    ? "admin"
                    : "user";
                const la = lastActivity[p.id];
                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <button
                        className="text-primary hover:underline text-sm"
                        onClick={() => setHistoryUser(p)}
                      >
                        {p.email}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={highest}
                        onValueChange={(v) => changeRole(p.id, v as AppRole)}
                      >
                        <SelectTrigger className="w-36 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">{ROLE_LABELS.user}</SelectItem>
                          <SelectItem value="admin">{ROLE_LABELS.admin}</SelectItem>
                          <SelectItem value="super_admin">{ROLE_LABELS.super_admin}</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(p.created_at).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell className="text-xs">
                      {la ? fmtDate(la.at) : "—"}
                    </TableCell>
                    <TableCell className="text-xs">
                      {la ? [la.city, la.country].filter(Boolean).join(", ") || "—" : "—"}
                    </TableCell>
                    <TableCell className="text-xs">{la?.count ?? 0}</TableCell>
                    <TableCell>
                      {p.disabled ? (
                        <Badge variant="destructive">Désactivé</Badge>
                      ) : (
                        <Badge variant="secondary">Actif</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleDisabled(p)}
                        disabled={p.id === currentUserId}
                      >
                        {p.disabled ? "Réactiver" : "Désactiver"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {profiles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Aucun utilisateur.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!historyUser} onOpenChange={(o) => !o && setHistoryUser(null)}>
        <SheetContent className="sm:max-w-3xl overflow-y-auto">
          {historyUser && (
            <>
              <SheetHeader>
                <SheetTitle>Historique — {historyUser.email}</SheetTitle>
                <SheetDescription>
                  Toutes les actions de cet utilisateur
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <LogsTab filterUserId={historyUser.id} />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
