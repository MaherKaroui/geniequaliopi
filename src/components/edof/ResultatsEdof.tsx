import { useEffect, useMemo, useState } from "react";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { CheckCircle2, Download, Eye, FileText, FolderArchive, Loader2, Mail, Send, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { frDate, type EdofCandidat } from "@/lib/edofAuto/candidats";
import type { FichierPack } from "@/lib/edofAuto/rs7650Pdf";
import { cleCandidat } from "@/lib/edofAuto/signatures";
import { ADRESSE_TEST, envoyerAuStagiaire, MESSAGE_DEFAUT, nomFichier, OBJET_DEFAUT, type ReglagesMail } from "@/lib/edofAuto/envoi";
import { zipper, type EnvoiMail } from "@/lib/edofAuto/historique";

export interface ResultatEdof {
  fichiers: FichierPack[];
  candidats: EdofCandidat[];
  /** intitulé de chaque formation (clé = code ou intitulé) */
  formations: Record<string, string>;
  centreNom: string;
  nomZip: string;
  histId?: string;
  envois: EnvoiMail[];
}

const libelle = (chemin: string) => nomFichier(chemin).replace(/^\d+_/, "").replace(/\.pdf$/i, "").replace(/_/g, " ");

export default function ResultatsEdof({ resultat, connecte, onEnvois }: { resultat: ResultatEdof; connecte: boolean; onEnvois: (envois: EnvoiMail[]) => void }) {
  const [apercu, setApercu] = useState<{ titre: string; url: string } | null>(null);
  const [reglages, setReglages] = useState<ReglagesMail>({
    expediteur: "", motDePasse: "", nomExpediteur: resultat.centreNom, objet: OBJET_DEFAUT, message: MESSAGE_DEFAUT, modeTest: true,
  });
  const [enCours, setEnCours] = useState<Record<string, boolean>>({});

  useEffect(() => () => { if (apercu) URL.revokeObjectURL(apercu.url); }, [apercu]);

  // Arborescence : formation > session > dossiers (stagiaires) + PV / documents communs
  const arbre = useMemo(() => {
    const parFormation = new Map<string, Map<string, FichierPack[]>>();
    for (const f of resultat.fichiers) {
      const [formation, session] = f.chemin.split("/");
      if (!parFormation.has(formation)) parFormation.set(formation, new Map());
      const m = parFormation.get(formation)!;
      if (!m.has(session)) m.set(session, []);
      m.get(session)!.push(f);
    }
    return parFormation;
  }, [resultat.fichiers]);
  const candidatParCle = useMemo(() => new Map(resultat.candidats.map((c) => [cleCandidat(c), c])), [resultat.candidats]);
  const dernierEnvoi = (cle: string) => [...resultat.envois].reverse().find((e) => e.candidat === cle);

  const ouvrir = (f: FichierPack) => {
    setApercu({ titre: libelle(f.chemin), url: URL.createObjectURL(new Blob([f.donnees as BlobPart], { type: "application/pdf" })) });
  };
  const telecharger = (f: FichierPack) => saveAs(new Blob([f.donnees as BlobPart], { type: "application/pdf" }), nomFichier(f.chemin));
  const toutTelecharger = async () => saveAs(await zipper(resultat.fichiers), resultat.nomZip);

  const pretEnvoi = connecte && reglages.expediteur.includes("@") && reglages.motDePasse.length >= 8;
  const destinataires = resultat.candidats.filter((c) => resultat.fichiers.some((f) => f.candidat === cleCandidat(c)));

  const envoyer = async (liste: EdofCandidat[]) => {
    if (!pretEnvoi) { toast.error(connecte ? "Renseignez l'adresse Gmail d'envoi et son mot de passe d'application." : "Connectez-vous pour envoyer des e-mails."); return; }
    const nouveaux: EnvoiMail[] = [];
    for (const c of liste) {
      const cle = cleCandidat(c);
      const formation = resultat.fichiers.find((f) => f.candidat === cle)?.chemin.split("/")[0] || "";
      setEnCours((s) => ({ ...s, [cle]: true }));
      try {
        const adresse = await envoyerAuStagiaire(reglages, c, resultat.fichiers.filter((f) => f.candidat === cle), {
          formation: resultat.formations[formation] || c.intitule || formation, centre: resultat.centreNom,
        });
        nouveaux.push({ candidat: cle, email: adresse, statut: "envoye", date: new Date().toISOString(), test: reglages.modeTest });
      } catch (e: any) {
        nouveaux.push({ candidat: cle, email: reglages.modeTest ? ADRESSE_TEST : c.email, statut: "erreur", date: new Date().toISOString(), erreur: e.message, test: reglages.modeTest });
      } finally {
        setEnCours((s) => ({ ...s, [cle]: false }));
      }
    }
    onEnvois([...resultat.envois, ...nouveaux]);
    const ok = nouveaux.filter((n) => n.statut === "envoye").length;
    toast[ok === nouveaux.length ? "success" : "warning"](`${ok}/${nouveaux.length} e-mail(s) envoyé(s)${reglages.modeTest ? ` (mode test → ${ADRESSE_TEST})` : ""}`);
  };

  const ligneFichier = (f: FichierPack) => (
    <div key={f.chemin} className="flex items-center justify-between gap-2 py-1 pl-2 border-l">
      <span className="text-xs flex items-center gap-1 min-w-0"><FileText className="w-3.5 h-3.5 shrink-0 text-primary" /><span className="truncate">{libelle(f.chemin)}</span></span>
      <span className="flex gap-1 shrink-0">
        <Button variant="ghost" size="sm" className="h-7 px-2 gap-1" onClick={() => ouvrir(f)}><Eye className="w-3.5 h-3.5" /> Aperçu</Button>
        <Button variant="ghost" size="sm" className="h-7 px-2 gap-1" onClick={() => telecharger(f)}><Download className="w-3.5 h-3.5" /> Télécharger</Button>
      </span>
    </div>
  );

  return (
    <section className="bg-card rounded-2xl border shadow-card p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-lg flex items-center gap-2"><FolderArchive className="w-5 h-5" /> 5. Documents générés ({resultat.fichiers.length})</h2>
        <Button size="sm" variant="outline" onClick={toutTelecharger} className="gap-1"><Download className="w-4 h-4" /> Tout télécharger (ZIP)</Button>
      </div>

      <div className="border rounded-xl p-4 space-y-3 bg-muted/20">
        <p className="font-medium text-sm flex items-center gap-2"><Mail className="w-4 h-4" /> Envoi par e-mail aux stagiaires</p>
        {!connecte && <p className="text-sm text-destructive">Connectez-vous (bouton Connexion de l'accueil) pour envoyer les e-mails et garder l'historique.</p>}
        <div className="grid md:grid-cols-3 gap-3">
          <div className="space-y-1"><Label>Adresse Gmail d'envoi</Label><Input value={reglages.expediteur} placeholder="contact@organisme.fr ou …@gmail.com" onChange={(e) => setReglages({ ...reglages, expediteur: e.target.value })} /></div>
          <div className="space-y-1"><Label>Mot de passe d'application Gmail</Label><Input type="password" autoComplete="off" value={reglages.motDePasse} placeholder="16 caractères, non enregistré" onChange={(e) => setReglages({ ...reglages, motDePasse: e.target.value })} /></div>
          <div className="space-y-1"><Label>Nom de l'expéditeur</Label><Input value={reglages.nomExpediteur} onChange={(e) => setReglages({ ...reglages, nomExpediteur: e.target.value })} /></div>
        </div>
        <div className="space-y-1"><Label>Objet</Label><Input value={reglages.objet} onChange={(e) => setReglages({ ...reglages, objet: e.target.value })} /></div>
        <div className="space-y-1">
          <Label>Message <span className="text-muted-foreground font-normal">— variables : {"{civilite} {nom} {prenom} {formation} {debut} {fin} {documents} {centre}"}</span></Label>
          <Textarea rows={7} value={reglages.message} onChange={(e) => setReglages({ ...reglages, message: e.target.value })} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={reglages.modeTest} onCheckedChange={(v) => setReglages({ ...reglages, modeTest: !!v })} />
            Mode test : tout envoyer à {ADRESSE_TEST} (décochez pour envoyer aux vrais stagiaires)
          </label>
          <Button onClick={() => envoyer(destinataires)} disabled={!pretEnvoi || Object.values(enCours).some(Boolean)} className="gap-1">
            <Send className="w-4 h-4" /> Envoyer à tous ({destinataires.length})
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Chaque stagiaire reçoit uniquement ses propres documents en pièces jointes. Le mot de passe d'application se crée dans le compte Google (Sécurité › Validation en deux étapes › Mots de passe des applications) ; il n'est jamais enregistré.</p>
      </div>

      {[...arbre.entries()].map(([formation, sessions]) => (
        <div key={formation} className="space-y-3">
          <p className="font-semibold">{formation}{resultat.formations[formation] && resultat.formations[formation] !== formation ? ` — ${resultat.formations[formation]}` : ""}</p>
          {[...sessions.entries()].map(([session, fichiers]) => {
            const parCandidat = new Map<string, FichierPack[]>();
            const autres: FichierPack[] = [];
            for (const f of fichiers) {
              if (f.candidat) { if (!parCandidat.has(f.candidat)) parCandidat.set(f.candidat, []); parCandidat.get(f.candidat)!.push(f); } else autres.push(f);
            }
            return (
              <div key={session} className="border rounded-xl p-3 space-y-3">
                <p className="text-sm font-medium">{session.replace("Session_", "Session d'examen du ").replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1").replace("_Commun", "Documents communs")}</p>
                {autres.map(ligneFichier)}
                {[...parCandidat.entries()].map(([cle, fs]) => {
                  const c = candidatParCle.get(cle);
                  const env = dernierEnvoi(cle);
                  return (
                    <div key={cle} className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm">
                          <strong>{c ? `${c.civilite} ${c.nom} ${c.prenom}` : cle}</strong>
                          {c && <span className="text-muted-foreground"> — {c.email || "pas d'e-mail"} — {frDate(c.dateDebut)} → {frDate(c.dateFin)}</span>}
                        </span>
                        <span className="flex items-center gap-2">
                          {env && (env.statut === "envoye"
                            ? <Badge className="bg-emerald-600 gap-1"><CheckCircle2 className="w-3 h-3" /> Envoyé {env.test ? "(test)" : ""} {new Date(env.date).toLocaleString("fr-FR")}</Badge>
                            : <Badge variant="destructive" className="gap-1" title={env.erreur}><XCircle className="w-3 h-3" /> Échec : {env.erreur?.slice(0, 60)}</Badge>)}
                          {c && (
                            <Button size="sm" variant="outline" className="h-7 gap-1" disabled={!pretEnvoi || enCours[cle]} onClick={() => envoyer([c])}>
                              {enCours[cle] ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />} Envoyer
                            </Button>
                          )}
                        </span>
                      </div>
                      {fs.map(ligneFichier)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}

      <Dialog open={!!apercu} onOpenChange={(o) => { if (!o) setApercu(null); }}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
          <DialogHeader><DialogTitle>{apercu?.titre}</DialogTitle></DialogHeader>
          {apercu && <iframe title={apercu.titre} src={apercu.url} className="flex-1 w-full border rounded" />}
        </DialogContent>
      </Dialog>
    </section>
  );
}
