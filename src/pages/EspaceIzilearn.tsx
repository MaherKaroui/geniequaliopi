/**
 * /izilearn — espace documentaire relié à IZILearn, accessible par lien sans code d'accès.
 * Les données (organisme, formation, session, apprenants, preuves) arrivent d'IZILearn ;
 * les pièces générées peuvent être renvoyées dans les documents de la session.
 */
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import JSZip from "jszip";
import { limiterCheminsZip } from "@/lib/fileNaming";
import { toast } from "sonner";
import {
  CheckCircle2, Download, Eye, FileText, Link2, Loader2, Mail, RefreshCw, Send, Upload, Users, AlertTriangle, FileDown, Copy, PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { htmlToWordBlob } from "@/lib/wordExport";
import { setDocStyle } from "@/lib/docBuilder";
import { getAutomaticDossierDesign } from "@/lib/dossierDesign";
import { useIzilearn } from "@/lib/izilearn/bridge";
import { installerContenu } from "@/lib/izilearn/contenu";
import { champsManquants } from "@/lib/izilearn/mapping";
import { CATEGORIES, contexte, dossierApprenant, planPieces, type CategorieKey, type Piece } from "@/lib/izilearn/pieces";
import { corpsTexte, lienMailto } from "@/lib/izilearn/mails";
import type { IzFichierRetour } from "@/lib/izilearn/types";
import IzilearnMailPreview from "@/components/IzilearnMailPreview";
import { captureMail } from "@/lib/mails/captureMail";
import { clientMailOrganisme } from "@/lib/mails/mailsAutomatiques";
import { mailPourCapture } from "@/lib/izilearn/mailCapture";
import IzilearnSignatureDialog from "@/components/IzilearnSignatureDialog";
import FormationPresetControl from "@/components/FormationPresetControl";
import { subscribePresets, presetRevision } from "@/lib/formationPresets/registry";
import DossierOutputSettings from "@/components/DossierOutputSettings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DocStyleConfig } from "@/types/qualiopi";
import { applyLearnerSignatures, contexteAvecSignatures, signatureKey, validSignatureImage, type LearnerSignatures, type SignatureRole } from "@/lib/izilearn/documentSignature";
import { ceder } from "@/lib/arrierePlan";

type Format = "pdf" | "word";

const SOURCE_BADGE: Record<Piece["source"], { label: string; cls: string }> = {
  izilearn: { label: "Données IZILearn", cls: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  trame: { label: "Trame à compléter", cls: "bg-slate-100 text-slate-700 border-slate-200" },
  document: { label: "Document", cls: "bg-sky-100 text-sky-800 border-sky-200" },
  modele: { label: "Modèle de mail", cls: "bg-violet-100 text-violet-800 border-violet-200" },
};

const telecharger = (blob: Blob, nom: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = nom; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
};

export default function EspaceIzilearn() {
  const { payload, etat, actualiser, envoyer } = useIzilearn();
  const contentRevision = useSyncExternalStore(subscribePresets, presetRevision);
  const [format, setFormat] = useState<Format>("pdf");
  const [dateMaj, setDateMaj] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<DocStyleConfig | null>(null);
  const [apprenants, setApprenants] = useState<Set<number>>(new Set());
  const [categories, setCategories] = useState<Set<CategorieKey>>(new Set(CATEGORIES.map((c) => c.key)));
  const [apercuId, setApercuId] = useState<string | null>(null);
  const [signatureTarget, setSignatureTarget] = useState<{ index: number; role: SignatureRole } | null>(null);
  const [signatures, setSignatures] = useState<LearnerSignatures>({});
  const [travail, setTravail] = useState<{ label: string; fait: number; total: number } | null>(null);

  const cx = useMemo(() => (payload ? contexteAvecSignatures(contexte(payload, dateMaj), signatures) : null), [payload, signatures, dateMaj]);
  useEffect(() => { setDateMaj(""); setSelectedStyle(null); }, [payload?.source.orgId, payload?.source.sessionId]);
  useEffect(() => { if (cx) setDocStyle(selectedStyle ?? getAutomaticDossierDesign(cx.o, 0).style); }, [cx, selectedStyle]);
  useEffect(() => { if (payload) setApprenants(new Set(payload.apprenants.map((_, i) => i))); }, [payload]);
  const contenu = useMemo(() => (cx ? installerContenu(cx.p, cx.f) : "aucun"), [cx, contentRevision]);
  const pieces = useMemo(() => (cx ? planPieces(cx) : []), [cx, contentRevision]);
  const apercu = pieces.find((piece) => piece.id === apercuId) ?? null;
  const aSigner = signatureTarget && signatureTarget.role !== "formateur" ? payload?.apprenants[signatureTarget.index] : null;
  useEffect(() => { setApercuId(null); setSignatureTarget(null); }, [payload?.source.orgId, payload?.source.sessionId]);
  const manquants = useMemo(() => (payload ? champsManquants(payload) : []), [payload]);

  const visibles = pieces.filter((p) => categories.has(p.categorie) && (p.apprenantIdx === null || apprenants.has(p.apprenantIdx)));
  const categoriesPresentes = CATEGORIES.filter((c) => pieces.some((p) => p.categorie === c.key));

  const rendre = (p: Piece) => { if (cx) setDocStyle(selectedStyle ?? getAutomaticDossierDesign(cx.o, 0).style); return cx ? applyLearnerSignatures(p.rendre(), p, cx) : p.rendre(); };
  const enregistrerSignature = (image: string) => {
    if (!signatureTarget || !payload || !validSignatureImage(image)) return;
    const key = signatureKey(payload, signatureTarget.index, signatureTarget.role);
    if (!key) return;
    setSignatures((previous) => ({ ...previous, [key]: image }));
    setSignatureTarget(null);
    toast.success("Signature appliquée automatiquement aux documents concernés");
  };
  const retirerSignature = () => {
    if (!payload || !signatureTarget) return;
    const key = signatureKey(payload, signatureTarget.index, signatureTarget.role);
    if (!key) return;
    setSignatures((previous) => { const next = { ...previous }; delete next[key]; return next; });
    setSignatureTarget(null);
  };

  async function fichier(p: Piece, fmt: Format): Promise<{ blob: Blob; nom: string }> {
    if (p.mail && cx) return {
      blob: await captureMail(mailPourCapture(p.mail, cx.o), clientMailOrganisme(cx.o)),
      nom: `${p.fichier}.png`,
    };
    const html = rendre(p);
    if (fmt === "pdf") return { blob: await htmlToPdfBlob(html), nom: `${p.fichier}.pdf` };
    const blob = await htmlToWordBlob(html);
    return { blob, nom: `${p.fichier}${blob.type.includes("officedocument") ? ".docx" : ".doc"}` };
  }

  const chemin = (p: Piece) => {
    const cat = CATEGORIES.find((c) => c.key === p.categorie);
    if (!cat) return "Documents";
    const s = p.apprenantIdx !== null ? cx?.stagiaires[p.apprenantIdx] : null;
    return s ? `${cat.dossier}/${dossierApprenant(s)}` : cat.dossier;
  };

  async function unique(p: Piece) {
    try {
      setTravail({ label: p.titre, fait: 0, total: 1 });
      const f = await fichier(p, format);
      telecharger(f.blob, f.nom);
    } catch (e) { toast.error(`Génération impossible : ${(e as Error).message}`); } finally { setTravail(null); }
  }

  async function lot(): Promise<{ p: Piece; blob: Blob; nom: string }[]> {
    const res: { p: Piece; blob: Blob; nom: string }[] = [];
    for (const [i, p] of visibles.entries()) {
      setTravail({ label: p.titre, fait: i, total: visibles.length });
      const f = await fichier(p, format);
      res.push({ p, ...f });
      await ceder();
    }
    return res;
  }

  async function zipTout() {
    if (!cx || !visibles.length) return;
    try {
      const zip = new JSZip();
      const racine = `${(cx.p.session.code || cx.f.intitule).replace(/[^\w-]+/g, "_")}_${cx.p.session.dateDebut}`;
      for (const r of await lot()) zip.file(`${racine}/${chemin(r.p)}/${r.nom}`, r.blob);
      setTravail({ label: "Compression…", fait: visibles.length, total: visibles.length });
      await limiterCheminsZip(zip);
      telecharger(await zip.generateAsync({ type: "blob" }), `${racine}.zip`);
      toast.success(`${visibles.length} pièce(s) téléchargée(s)`);
    } catch (e) { toast.error(`Export impossible : ${(e as Error).message}`); } finally { setTravail(null); }
  }

  async function versIzilearn() {
    if (!cx || !visibles.length) return;
    try {
      const fichiers: IzFichierRetour[] = (await lot()).map((r) => {
        const a = r.p.apprenantIdx !== null ? cx.p.apprenants[r.p.apprenantIdx] : null;
        return { nom: r.nom, dossier: chemin(r.p), categorie: r.p.categorie, inscriptionId: a?.inscriptionId, contactId: a?.contactId, blob: r.blob };
      });
      setTravail({ label: "Enregistrement dans IZILearn…", fait: fichiers.length, total: fichiers.length });
      const res = await envoyer(fichiers);
      if (res.erreurs.length) toast.warning(`${res.n} pièce(s) enregistrée(s), ${res.erreurs.length} erreur(s) : ${res.erreurs[0]}`);
      else toast.success(`${res.n} pièce(s) enregistrée(s) dans les documents de la session IZILearn`);
    } catch (e) { toast.error((e as Error).message); } finally { setTravail(null); }
  }

  if (!payload || !cx) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-card border rounded-2xl shadow-card p-8 text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-hero flex items-center justify-center">
            {etat === "attente" ? <Loader2 className="w-7 h-7 text-primary-foreground animate-spin" /> : <Link2 className="w-7 h-7 text-primary-foreground" />}
          </div>
          <div role="heading" aria-level={1} className="text-2xl font-bold"><span className="text-gradient-hero">Génie Qualiopi</span> × IZILearn</div>
          {etat === "attente" ? (
            <p className="text-sm text-muted-foreground">Connexion à IZILearn…</p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Cet espace se remplit avec les données d'une session IZILearn. Ouvrez une session dans IZILearn puis l'onglet
                <strong> « Génie Qualiopi »</strong> (ou le bouton « Ouvrir en plein écran ») : programme, évaluations, exercices,
                émargements, mails et documents contractuels sont générés pour chaque apprenant.
              </p>
              <Button asChild className="bg-gradient-hero border-0 text-primary-foreground">
                <a href="https://izilearn.netlify.app/sessions" target="_blank" rel="noreferrer">Ouvrir IZILearn</a>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  const { p, f, stagiaires } = cx;
  const toutesApp = apprenants.size === p.apprenants.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="w-3.5 h-3.5" />Connecté à IZILearn</span>
              <span>· {p.organisme.nom}</span>
            </div>
            <div role="heading" aria-level={1} className="text-lg font-bold truncate">{f.intitule}</div>
            <p className="text-xs text-muted-foreground">
              Session {p.session.code ? `${p.session.code} · ` : ""}du {new Date(p.session.dateDebut).toLocaleDateString("fr-FR")} au {new Date(p.session.dateFin).toLocaleDateString("fr-FR")}
              {" · "}{f.modalites}{f.duree ? ` · ${f.duree}` : ""} · {p.apprenants.length} apprenant(s)
            </p>
          </div>
          <div className="flex items-center rounded-lg border p-0.5 text-sm">
            {(["pdf", "word"] as Format[]).map((x) => (
              <button key={x} onClick={() => setFormat(x)} className={`px-3 py-1 rounded-md ${format === x ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{x === "pdf" ? "PDF" : "Word"}</button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={actualiser} title="Recharger les données depuis IZILearn"><RefreshCw className="w-4 h-4 mr-1" />Actualiser</Button>
          <Button variant="outline" size="sm" onClick={zipTout} disabled={!!travail || !visibles.length}><Download className="w-4 h-4 mr-1" />ZIP ({visibles.length})</Button>
          <Button size="sm" onClick={versIzilearn} disabled={!!travail || !visibles.length} className="bg-gradient-hero border-0 text-primary-foreground">
            <Upload className="w-4 h-4 mr-1" />Enregistrer dans IZILearn
          </Button>
        </div>
        {travail && (
          <div className="max-w-7xl mx-auto px-4 pb-3">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="truncate flex-1">{travail.label}</span>
              <span>{travail.fait} / {travail.total}</span>
            </div>
            <Progress value={(100 * travail.fait) / Math.max(1, travail.total)} className="h-1.5 mt-1" />
          </div>
        )}
      </header>

      {contenu === "izilearn" && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 px-4 py-3 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Support de cours, exercices et questions tirés du contenu de la formation dans IZILearn{payload.formation.contenu?.brouillonIA ? " (créé automatiquement par l'IA, à relire par le formateur)" : ""}.</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 pt-5 space-y-3">
        {!p.formation.contenu?.chapitres?.length && <FormationPresetControl formation={f} />}
        <div className="flex flex-wrap items-center gap-3">
          <Label htmlFor="izilearn-date-maj">Date de mise à jour des fichiers</Label>
          <Input id="izilearn-date-maj" type="date" className="w-44" value={cx.o.dateMaj} disabled={!!travail} onChange={(e) => setDateMaj(e.target.value)} />
        </div>
        <fieldset disabled={!!travail}>
          <DossierOutputSettings key={`${p.source.orgId}_${p.source.sessionId}`} organisme={cx.o} scope={`izilearn_${p.source.orgId}_${p.source.sessionId}`} onEffectiveStyleChange={setSelectedStyle} />
        </fieldset>
      </div>
      <main className="max-w-7xl mx-auto px-4 py-5 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-auto">
          <section className="bg-card border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div role="heading" aria-level={2} className="font-semibold text-sm flex items-center gap-1.5"><Users className="w-4 h-4" />Apprenants</div>
              <button className="text-xs text-primary" onClick={() => setApprenants(toutesApp ? new Set() : new Set(p.apprenants.map((_, i) => i)))}>{toutesApp ? "Aucun" : "Tous"}</button>
            </div>
            <ul className="space-y-1.5 max-h-72 overflow-auto">
              {p.apprenants.map((a, i) => (
                <li key={a.inscriptionId}>
                  <div className="flex items-start gap-2">
                  <label className="flex min-w-0 flex-1 items-start gap-2 text-sm cursor-pointer">
                    <Checkbox checked={apprenants.has(i)} onCheckedChange={(v) => { const n = new Set(apprenants); if (v) n.add(i); else n.delete(i); setApprenants(n); }} className="mt-0.5" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{stagiaires[i].prenom} {stagiaires[i].nom}</span>
                      {stagiaires[i].entreprise && <span className="block truncate text-xs text-muted-foreground">{stagiaires[i].entreprise}</span>}
                    </span>
                  </label>
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs shrink-0" disabled={!!travail} aria-label={`Signature de ${a.prenom} ${a.nom}`} onClick={() => setSignatureTarget({ index: i, role: "stagiaire" })}>{stagiaires[i].signatureUrl ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <PenLine className="w-3 h-3 mr-1" />}Signature</Button>
                  </div>
                  {a.entreprise?.nom?.trim() && <div className="flex items-center justify-between gap-2 pl-6 mt-1"><span className="text-xs text-muted-foreground min-w-0 truncate">{a.entreprise.representant || "Resp. entreprise"}</span><Button variant="outline" size="sm" className="h-7 px-2 text-xs shrink-0" disabled={!!travail} aria-label={`Signature responsable entreprise de ${a.prenom} ${a.nom}`} onClick={() => setSignatureTarget({ index: i, role: "entreprise" })}>{stagiaires[i].signatureResponsableUrl ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <PenLine className="w-3 h-3 mr-1" />}Signature resp.</Button></div>}
                </li>
              ))}
            </ul>
            {p.session.formateur?.trim() && (
              <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t">
                <span className="text-xs text-muted-foreground min-w-0 truncate">Formateur : {p.session.formateur}</span>
                <Button variant="outline" size="sm" className="h-7 px-2 text-xs shrink-0" disabled={!!travail} aria-label={`Signature du formateur ${p.session.formateur}`} onClick={() => setSignatureTarget({ index: -1, role: "formateur" })}>{cx.f.formateurSignatureUrl ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <PenLine className="w-3 h-3 mr-1" />}Signature formateur</Button>
              </div>
            )}
          </section>
          <section className="bg-card border rounded-xl p-4">
            <div role="heading" aria-level={2} className="font-semibold text-sm mb-2 flex items-center gap-1.5"><FileText className="w-4 h-4" />Pièces</div>
            <ul className="space-y-1.5">
              {categoriesPresentes.map((c) => (
                <li key={c.key}>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={categories.has(c.key)} onCheckedChange={(v) => { const n = new Set(categories); if (v) n.add(c.key); else n.delete(c.key); setCategories(n); }} />
                    <span className="flex-1">{c.label}</span>
                    <span className="text-xs text-muted-foreground">{pieces.filter((x) => x.categorie === c.key && (x.apprenantIdx === null || apprenants.has(x.apprenantIdx))).length}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
          {manquants.length > 0 && (
            <section className="border border-amber-300 bg-amber-50 rounded-xl p-4 text-amber-900">
              <div role="heading" aria-level={2} className="font-semibold text-sm flex items-center gap-1.5 mb-1"><AlertTriangle className="w-4 h-4" />À compléter dans IZILearn</div>
              <ul className="text-xs list-disc pl-4 space-y-0.5">{manquants.map((m) => <li key={m}>{m}</li>)}</ul>
              <p className="text-xs mt-2">Les documents restent générés ; les champs manquants y apparaissent vides plutôt qu'inventés.</p>
            </section>
          )}
        </aside>

        <div className="space-y-5">
          {categoriesPresentes.filter((c) => categories.has(c.key)).map((c) => {
            const liste = visibles.filter((x) => x.categorie === c.key);
            if (!liste.length) return null;
            return (
              <section key={c.key} className="bg-card border rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b bg-muted/30">
                  <div role="heading" aria-level={2} className="font-semibold flex items-center gap-2">{c.key === "mails" ? <Mail className="w-4 h-4" /> : <FileText className="w-4 h-4" />}{c.label}<span className="text-xs font-normal text-muted-foreground">({liste.length})</span></div>
                  <p className="text-xs text-muted-foreground">{c.aide}</p>
                </div>
                <ul className="divide-y">
                  {liste.map((x) => (
                    <li key={x.id} className="px-4 py-2.5 flex flex-wrap items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{x.titre}</p>
                        {x.mail && (
                          <p className="text-xs text-muted-foreground truncate">
                            {x.mail.aEnvoyer ? "À envoyer le" : "Envoi prévu le"} {x.mail.dateEnvoi.toLocaleDateString("fr-FR")} à {x.mail.dateEnvoi.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} · {x.mail.objet}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className={SOURCE_BADGE[x.source].cls}>{SOURCE_BADGE[x.source].label}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => setApercuId(x.id)}><Eye className="w-4 h-4 mr-1" />Aperçu</Button>
                      {x.mail ? (
                        <>
                          <Button variant="ghost" size="sm" onClick={async () => { if (!x.mail) return; try { await navigator.clipboard.writeText(`${x.mail.objet}\n\n${corpsTexte(x.mail)}`); toast.success("Mail copié"); } catch { toast.error("Copie impossible"); } }}><Copy className="w-4 h-4 mr-1" />Copier</Button>
                          {x.mail.destinataireEmail && cx.o.email ? <Button variant="ghost" size="sm" asChild><a href={lienMailto(x.mail)}><Send className="w-4 h-4 mr-1" />Ouvrir la messagerie</a></Button> : <span className="text-xs text-muted-foreground">Adresse e-mail à compléter</span>}
                          <Button variant="ghost" size="sm" disabled={!!travail} onClick={() => unique(x)}><FileDown className="w-4 h-4 mr-1" />Télécharger</Button>
                        </>
                      ) : (
                        <Button variant="ghost" size="sm" disabled={!!travail} onClick={() => unique(x)}><FileDown className="w-4 h-4 mr-1" />{format === "pdf" ? "PDF" : "Word"}</Button>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {!visibles.length && <p className="text-sm text-muted-foreground text-center py-12">Sélectionnez au moins un apprenant et une catégorie de pièces.</p>}
        </div>
      </main>

      <Dialog open={!!apercu} onOpenChange={(o) => !o && setApercuId(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-5 py-3 border-b">
            <DialogTitle className="text-base pr-8 truncate">{apercu?.titre}</DialogTitle>
          </DialogHeader>
          {apercu && (apercu.mail ? <IzilearnMailPreview mail={apercu.mail} organisme={cx.o} /> : <iframe title="Aperçu" className="flex-1 w-full bg-background" srcDoc={rendre(apercu)} />)}
          {apercu && (
            <div className="px-5 py-3 border-t flex flex-wrap gap-2 justify-end">
              <Button size="sm" disabled={!!travail} onClick={() => unique(apercu)}><FileDown className="w-4 h-4 mr-1" />{apercu.mail ? "Télécharger la capture" : `Télécharger en ${format === "pdf" ? "PDF" : "Word"}`}</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <IzilearnSignatureDialog open={!!aSigner} role={signatureTarget?.role} name={signatureTarget?.role === "entreprise" ? aSigner?.entreprise?.representant || aSigner?.entreprise?.nom || "" : `${aSigner?.prenom ?? ""} ${aSigner?.nom ?? ""}`.trim()} onClose={() => setSignatureTarget(null)} onSave={enregistrerSignature} onRemove={signatureTarget && payload && signatures[signatureKey(payload, signatureTarget.index, signatureTarget.role) ?? ""] ? retirerSignature : undefined} />
    </div>
  );
}
