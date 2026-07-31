import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES, DocStyleConfig, DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import OrganismeForm from "@/components/OrganismeForm";
import FormationForm from "@/components/FormationForm";
import StagiairesForm from "@/components/StagiairesForm";
import DocStyleConfigPanel from "@/components/DocStyleConfigPanel";
import SignaturePad from "@/components/SignaturePad";
import ControleEDOF from "@/components/ControleEDOF";
import SuiviVSS from "@/components/SuiviVSS";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, LogIn, LogOut, ChevronDown, ChevronRight, Building2, GraduationCap, Users, Palette, Save, FolderOpen, Trash2, Plus, PenTool, Archive, ArchiveRestore } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", relationEntreprises: "", referentMobilite: "",
  domainesFormation: "", typesActions: [], certifications: "", outilsUtilises: "",
  version: "1", dateMaj: new Date().toISOString().slice(0, 10)
};

const emptyFormation: FormationInfo = {
  intitule: "", objectifs: "", prerequis: "", duree: "", modalites: "", tarif: "",
  programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "",
  delaiAcces: "", dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "", formateur: "",
  rythmeAlternance: ""
};

interface SavedEYControl {
  id: string;
  name: string;
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  doc_states: Record<string, any>;
  doc_style: DocStyleConfig | null;
  archived?: boolean;
  created_at: string;
  updated_at: string;
}

const ControleEY = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [organisme, setOrganisme] = useState<OrganismeInfo>(() => {
    try { const s = sessionStorage.getItem('qualiopi_org'); return s ? JSON.parse(s) : emptyOrganisme; } catch { return emptyOrganisme; }
  });
  const [formation, setFormation] = useState<FormationInfo>(() => {
    try { const s = sessionStorage.getItem('qualiopi_form'); return s ? JSON.parse(s) : emptyFormation; } catch { return emptyFormation; }
  });
  const [stagiaires, setStagiaires] = useState<StagiaireInfo[]>(() => {
    try { const s = sessionStorage.getItem('qualiopi_stag'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [criteres] = useState<CritereData[]>(() => {
    try { const s = sessionStorage.getItem('qualiopi_crit'); return s ? JSON.parse(s) : JSON.parse(JSON.stringify(CRITERES)); } catch { return JSON.parse(JSON.stringify(CRITERES)); }
  });
  const [docStyle, setDocStyle] = useState<DocStyleConfig>(() => {
    try { const s = sessionStorage.getItem('qualiopi_style'); return s ? JSON.parse(s) : DEFAULT_DOC_STYLE; } catch { return DEFAULT_DOC_STYLE; }
  });
  const [signature, setSignature] = useState<string>(() => {
    try { return sessionStorage.getItem('ey_signature') || ''; } catch { return ''; }
  });
  const [showSigPad, setShowSigPad] = useState(false);

  // Save/Load state
  const [savedList, setSavedList] = useState<SavedEYControl[]>([]);
  const [currentSaveId, setCurrentSaveId] = useState<string | null>(null);
  const [saveName, setSaveName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Collapsible sections
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  // Load saved controls list
  const loadSavedList = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("saved_ey_controls")
      .select("*")
      .order("updated_at", { ascending: false });
    if (!error && data) {
      setSavedList(data as unknown as SavedEYControl[]);
    }
  }, [user]);

  useEffect(() => { loadSavedList(); }, [loadSavedList]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section); else next.add(section);
      return next;
    });
  };

  const handleOrgChange = useCallback((data: OrganismeInfo) => {
    setOrganisme(data);
    sessionStorage.setItem('qualiopi_org', JSON.stringify(data));
  }, []);

  const handleFormChange = useCallback((data: FormationInfo) => {
    setFormation(data);
    sessionStorage.setItem('qualiopi_form', JSON.stringify(data));
  }, []);

  const handleStagChange = useCallback((data: StagiaireInfo[]) => {
    setStagiaires(data);
    sessionStorage.setItem('qualiopi_stag', JSON.stringify(data));
  }, []);

  const handleStyleChange = useCallback((style: DocStyleConfig) => {
    setDocStyle(style);
    sessionStorage.setItem('qualiopi_style', JSON.stringify(style));
  }, []);

  // Save current data
  const handleSave = useCallback(async () => {
    if (!user) {
      toast.error("Connectez-vous pour sauvegarder");
      return;
    }
    const name = saveName.trim() || organisme.nom || "Sans titre";
    setSaving(true);
    try {
      const payload: any = {
        user_id: user.id,
        name,
        organisme,
        formation,
        stagiaires,
        doc_states: {},
        doc_style: docStyle || null,
        updated_at: new Date().toISOString(),
      };

      if (currentSaveId) {
        const { error } = await supabase
          .from("saved_ey_controls")
          .update(payload)
          .eq("id", currentSaveId);
        if (error) throw error;
        toast.success("Dossier EY mis à jour");
      } else {
        const { data, error } = await supabase
          .from("saved_ey_controls")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        setCurrentSaveId(data.id);
        toast.success("Dossier EY enregistré");
      }
      setSaveName(name);
      await loadSavedList();
    } catch (e: any) {
      toast.error("Erreur : " + (e.message || "Erreur inconnue"));
    } finally {
      setSaving(false);
    }
  }, [user, saveName, organisme, formation, stagiaires, docStyle, currentSaveId, loadSavedList]);

  // Load saved data
  const handleLoad = useCallback((item: SavedEYControl) => {
    setOrganisme(item.organisme);
    setFormation(item.formation);
    setStagiaires(item.stagiaires || []);
    if (item.doc_style) setDocStyle(item.doc_style);
    setCurrentSaveId(item.id);
    setSaveName(item.name);

    sessionStorage.setItem('qualiopi_org', JSON.stringify(item.organisme));
    sessionStorage.setItem('qualiopi_form', JSON.stringify(item.formation));
    sessionStorage.setItem('qualiopi_stag', JSON.stringify(item.stagiaires || []));
    if (item.doc_style) sessionStorage.setItem('qualiopi_style', JSON.stringify(item.doc_style));

    setShowSaved(false);
    toast.success(`Dossier "${item.name}" chargé`);
  }, []);

  // Delete saved
  const handleDelete = useCallback(async (id: string) => {
    const { error } = await supabase.from("saved_ey_controls").delete().eq("id", id);
    if (error) { toast.error("Erreur suppression"); return; }
    if (currentSaveId === id) { setCurrentSaveId(null); setSaveName(""); }
    toast.success("Dossier supprimé");
    await loadSavedList();
  }, [currentSaveId, loadSavedList]);

  // Archive / unarchive
  const handleToggleArchive = useCallback(async (id: string, archived: boolean) => {
    const { error } = await supabase.from("saved_ey_controls").update({ archived: !archived } as any).eq("id", id);
    if (error) { toast.error("Erreur archivage"); return; }
    toast.success(!archived ? "Dossier archivé" : "Dossier désarchivé");
    await loadSavedList();
  }, [loadSavedList]);

  // New dossier
  const handleNew = useCallback(() => {
    setOrganisme(emptyOrganisme);
    setFormation(emptyFormation);
    setStagiaires([]);
    setDocStyle(DEFAULT_DOC_STYLE);
    setCurrentSaveId(null);
    setSaveName("");
    sessionStorage.removeItem('qualiopi_org');
    sessionStorage.removeItem('qualiopi_form');
    sessionStorage.removeItem('qualiopi_stag');
    sessionStorage.removeItem('qualiopi_style');
    toast.info("Nouveau dossier créé");
  }, []);

  const sections = [
    { key: "organisme", label: "Organisme", icon: <Building2 className="w-4 h-4" />, filled: !!organisme.nom },
    { key: "formation", label: "Formation", icon: <GraduationCap className="w-4 h-4" />, filled: !!formation.intitule },
    { key: "stagiaires", label: "Stagiaires", icon: <Users className="w-4 h-4" />, count: stagiaires.length },
    { key: "signature", label: "Signature électronique", icon: <PenTool className="w-4 h-4" />, filled: !!signature },
    { key: "design", label: "Design des documents", icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
              <ChevronLeft className="w-4 h-4" /> Accueil
            </Button>
            <span className="font-bold text-lg">Contrôle EDOF / EY</span>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground hidden sm:inline">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={signOut} title="Déconnexion"><LogOut className="w-4 h-4" /></Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")} className="gap-1">
                <LogIn className="w-4 h-4" /> Connexion
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Save/Load bar */}
        {user && (
          <div className="border rounded-xl p-4 bg-card space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1 flex items-center gap-2 w-full">
                <Input
                  placeholder="Nom du dossier EY..."
                  value={saveName}
                  onChange={e => setSaveName(e.target.value)}
                  className="max-w-xs"
                />
                {currentSaveId && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    (modifié)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1">
                  <Save className="w-4 h-4" />
                  {currentSaveId ? "Mettre à jour" : "Enregistrer"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowSaved(!showSaved)} className="gap-1">
                  <FolderOpen className="w-4 h-4" />
                  Mes dossiers ({savedList.length})
                </Button>
                <Button size="sm" variant="ghost" onClick={handleNew} className="gap-1">
                  <Plus className="w-4 h-4" />
                  Nouveau
                </Button>
              </div>
            </div>

            {showSaved && (() => {
              const visible = savedList.filter(it => showArchived ? it.archived : !it.archived);
              const archivedCount = savedList.filter(it => it.archived).length;
              return (
                <div className="border-t pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {showArchived ? "Dossiers archivés" : "Dossiers actifs"} ({visible.length})
                    </span>
                    <Button size="sm" variant="ghost" onClick={() => setShowArchived(s => !s)} className="gap-1 text-xs">
                      {showArchived ? <><ArchiveRestore className="w-3 h-3" /> Voir actifs</> : <><Archive className="w-3 h-3" /> Voir archivés ({archivedCount})</>}
                    </Button>
                  </div>
                  {visible.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{showArchived ? "Aucun dossier archivé" : "Aucun dossier sauvegardé"}</p>
                  ) : (
                    visible.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <button
                          onClick={() => handleLoad(item)}
                          className="flex-1 text-left"
                        >
                          <span className="font-medium text-sm">{item.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {new Date(item.updated_at).toLocaleDateString("fr-FR")}
                          </span>
                          {item.archived && <span className="text-xs text-muted-foreground ml-2">(archivé)</span>}
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleToggleArchive(item.id, !!item.archived); }}
                          title={item.archived ? "Désarchiver" : "Archiver"}
                        >
                          {item.archived ? <ArchiveRestore className="w-3 h-3" /> : <Archive className="w-3 h-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Collapsible data forms */}
        {sections.map(({ key, label, icon, filled, count }) => (
          <div key={key} className="border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection(key)}
              className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                {openSections.has(key) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                {icon}
                <span className="font-semibold">{label}</span>
                {count !== undefined && (
                  <span className="text-xs text-muted-foreground">({count})</span>
                )}
                {filled && (
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Rempli</span>
                )}
              </div>
            </button>
            {openSections.has(key) && (
              <div className="p-4 border-t bg-background">
                {key === "organisme" && <OrganismeForm data={organisme} onChange={handleOrgChange} />}
                {key === "formation" && (
                  <FormationForm
                    data={formation}
                    onChange={handleFormChange}
                    onImportStagiaires={handleStagChange}
                    onApplyOrganisme={handleOrgChange}
                  />
                )}
                {key === "stagiaires" && <StagiairesForm data={stagiaires} onChange={handleStagChange} />}
                {key === "signature" && (
                  <div className="space-y-4">
                    {signature ? (
                      <div className="flex items-center gap-4">
                        <div className="border rounded-lg p-2 bg-white">
                          <img src={signature} alt="Signature" className="h-16" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm text-muted-foreground">Votre signature sera appliquée sur tous les documents téléchargés</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setShowSigPad(true)}>Modifier</Button>
                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => { setSignature(''); sessionStorage.removeItem('ey_signature'); }}>Supprimer</Button>
                          </div>
                        </div>
                      </div>
                    ) : showSigPad ? (
                      <SignaturePad
                        label="✍️ Dessinez votre signature"
                        onSave={(dataUrl) => {
                          setSignature(dataUrl);
                          sessionStorage.setItem('ey_signature', dataUrl);
                          setShowSigPad(false);
                        }}
                        onCancel={() => setShowSigPad(false)}
                      />
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-muted-foreground mb-3">Aucune signature enregistrée</p>
                        <Button onClick={() => setShowSigPad(true)} className="gap-2">
                          <PenTool className="w-4 h-4" />
                          Dessiner ma signature
                        </Button>
                      </div>
                    )}
                    {signature && showSigPad && (
                      <SignaturePad
                        label="✍️ Nouvelle signature"
                        onSave={(dataUrl) => {
                          setSignature(dataUrl);
                          sessionStorage.setItem('ey_signature', dataUrl);
                          setShowSigPad(false);
                        }}
                        onCancel={() => setShowSigPad(false)}
                      />
                    )}
                  </div>
                )}
                {key === "design" && <DocStyleConfigPanel style={docStyle} onChange={handleStyleChange} />}
              </div>
            )}
          </div>
        ))}

        {/* Checklist */}
        <ControleEDOF organisme={organisme} formation={formation} stagiaires={stagiaires} criteres={criteres} docStyle={docStyle} signature={signature} />
      </main>
    </div>
  );
};

export default ControleEY;
