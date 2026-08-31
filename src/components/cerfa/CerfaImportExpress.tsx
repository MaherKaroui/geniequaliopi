import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Building2, IdCard, MapPin, GraduationCap, School, Save, Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { StagiaireInfo, FormationInfo } from "@/types/qualiopi";
import {
  rechercherEntreprise,
  rechercherIdcc,
  decoderNir,
  rechercherRncp,
  rechercherAdresse,
  rechercherUai,
  type EtablissementTrouve,
  type AdresseSuggestion,
} from "@/lib/cerfa/lookups";

interface Props {
  /** Apprenti courant (bloc employeur, NIR, adresse). */
  stagiaire?: StagiaireInfo;
  onPatchStagiaire?: (patch: Partial<StagiaireInfo>) => void;
  /** Formation courante (bloc RNCP, UAI). */
  formation?: FormationInfo;
  onPatchFormation?: (patch: Partial<FormationInfo>) => void;
  /** SIRET du CFA, utilisé pour retrouver le n° UAI. */
  siretCfa?: string;
}

type ProfilRow = { id: string; nom: string; donnees: Record<string, unknown> };

const Ligne = ({
  icone,
  titre,
  children,
}: {
  icone: React.ReactNode;
  titre: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <Label className="text-[11px] uppercase tracking-wide text-muted-foreground flex items-center gap-1">
      {icone}
      {titre}
    </Label>
    {children}
  </div>
);

/**
 * Barre « Remplissage automatique » du CERFA 10103*14.
 * Chaque entrée remplit un bloc entier en un appel d'API publique gratuite.
 * En cas d'échec : champs laissés vides + avertissement, jamais de valeur inventée.
 */
const CerfaImportExpress = ({ stagiaire, onPatchStagiaire, formation, onPatchFormation, siretCfa }: Props) => {
  const [qEnt, setQEnt] = useState("");
  const [resEnt, setResEnt] = useState<EtablissementTrouve[]>([]);
  const [loadEnt, setLoadEnt] = useState(false);
  const [qNir, setQNir] = useState(stagiaire?.nir || "");
  const [loadNir, setLoadNir] = useState(false);
  const [qRncp, setQRncp] = useState(formation?.codeRNCP || "");
  const [loadRncp, setLoadRncp] = useState(false);
  const [qAdr, setQAdr] = useState("");
  const [resAdr, setResAdr] = useState<AdresseSuggestion[]>([]);
  const [loadUai, setLoadUai] = useState(false);
  const [avertissements, setAvertissements] = useState<string[]>([]);
  const [profils, setProfils] = useState<ProfilRow[]>([]);
  const [modeles, setModeles] = useState<ProfilRow[]>([]);

  const avertir = (msg?: string) => {
    if (msg) setAvertissements((a) => Array.from(new Set([...a, msg])));
  };

  /* ---------------- profils enregistrés ---------------- */
  const chargerProfils = async () => {
    const [{ data: p }, { data: m }] = await Promise.all([
      supabase.from("profils_employeurs" as never).select("id,nom,donnees").order("nom"),
      supabase.from("modeles_formation" as never).select("id,nom,donnees").order("nom"),
    ]);
    setProfils((p as unknown as ProfilRow[]) || []);
    setModeles((m as unknown as ProfilRow[]) || []);
  };
  useEffect(() => {
    chargerProfils();
  }, []);

  const enregistrerProfilEmployeur = async () => {
    if (!stagiaire) return;
    const nom = stagiaire.entreprise?.trim();
    if (!nom) return toast.error("Renseignez d'abord l'employeur");
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return toast.error("Connectez-vous pour enregistrer un profil");
    const donnees: Partial<StagiaireInfo> = {
      entreprise: stagiaire.entreprise,
      siretEntreprise: stagiaire.siretEntreprise,
      adresseEntreprise: stagiaire.adresseEntreprise,
      apeEntreprise: stagiaire.apeEntreprise,
      effectifEntreprise: stagiaire.effectifEntreprise,
      idccEntreprise: stagiaire.idccEntreprise,
      aucuneConventionCollective: stagiaire.aucuneConventionCollective,
      typeEmployeur: stagiaire.typeEmployeur,
      telephoneEntreprise: stagiaire.telephoneEntreprise,
      emailEntreprise: stagiaire.emailEntreprise,
      responsableEntreprise: stagiaire.responsableEntreprise,
      caisseRetraiteComplementaire: stagiaire.caisseRetraiteComplementaire,
      maitreNom: stagiaire.maitreNom,
      maitrePrenom: stagiaire.maitrePrenom,
      maitreDateNaissance: stagiaire.maitreDateNaissance,
      maitreEmail: stagiaire.maitreEmail,
      maitreEmploi: stagiaire.maitreEmploi,
      maitreDiplome: stagiaire.maitreDiplome,
      maitreNiveauDiplome: stagiaire.maitreNiveauDiplome,
    };
    const { error } = await supabase
      .from("profils_employeurs" as never)
      .insert({ user_id: auth.user.id, nom, donnees } as never);
    if (error) return toast.error("Enregistrement impossible");
    toast.success(`Profil employeur « ${nom} » enregistré`);
    chargerProfils();
  };

  const enregistrerModeleFormation = async () => {
    if (!formation) return;
    const nom = formation.intitule?.trim();
    if (!nom) return toast.error("Renseignez d'abord l'intitulé de la formation");
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return toast.error("Connectez-vous pour enregistrer un modèle");
    const donnees: Partial<FormationInfo> = {
      intitule: formation.intitule,
      codeRNCP: formation.codeRNCP,
      uaiCfa: formation.uaiCfa,
      codeDiplome: formation.codeDiplome,
      typeDiplome: formation.typeDiplome,
      dureeFormationCfa: formation.dureeFormationCfa,
      duree: formation.duree,
      rythmeAlternance: formation.rythmeAlternance,
    };
    const { error } = await supabase
      .from("modeles_formation" as never)
      .insert({ user_id: auth.user.id, nom, donnees } as never);
    if (error) return toast.error("Enregistrement impossible");
    toast.success(`Modèle de formation « ${nom} » enregistré`);
    chargerProfils();
  };

  /* ---------------- 2.a employeur ---------------- */
  const chercherEntreprise = async () => {
    if (!qEnt.trim()) return;
    setLoadEnt(true);
    const { data, avertissement } = await rechercherEntreprise(qEnt);
    avertir(avertissement);
    setResEnt(data || []);
    setLoadEnt(false);
    if (data?.length === 1) appliquerEntreprise(data[0]);
  };

  const appliquerEntreprise = async (e: EtablissementTrouve) => {
    const adresse = [e.numeroVoie, e.voie, e.complement].filter(Boolean).join(" ").trim();
    const ligne = [adresse, [e.codePostal, e.commune].filter(Boolean).join(" ")].filter(Boolean).join(", ");
    onPatchStagiaire?.({
      entreprise: e.denomination,
      siretEntreprise: e.siret,
      adresseEntreprise: ligne,
      apeEntreprise: e.codeApe,
      effectifEntreprise: e.trancheEffectif,
      responsableEntreprise: e.dirigeant || undefined,
    });
    setResEnt([]);
    const { data: idcc, avertissement } = await rechercherIdcc(e.siret);
    avertir(avertissement);
    if (idcc) onPatchStagiaire?.({ idccEntreprise: idcc.idcc, aucuneConventionCollective: false });
    toast.success(`Employeur « ${e.denomination} » importé`);
  };

  /* ---------------- 2.b NIR ---------------- */
  const appliquerNir = async () => {
    setLoadNir(true);
    const { data, avertissement } = await decoderNir(qNir, stagiaire?.dateNaissance);
    avertir(avertissement);
    if (data) {
      onPatchStagiaire?.({
        nir: qNir.replace(/\s/g, "").toUpperCase(),
        civilite: data.sexe,
        departementNaissance: data.departementNaissance,
        communeNaissance: data.communeNaissance || stagiaire?.communeNaissance || "",
      });
      toast.success("NIR décodé");
    }
    setLoadNir(false);
  };

  /* ---------------- 2.c RNCP ---------------- */
  const appliquerRncp = async () => {
    if (!qRncp.trim()) return;
    setLoadRncp(true);
    const { data, avertissement } = await rechercherRncp(qRncp);
    avertir(avertissement);
    if (data) {
      onPatchFormation?.({
        codeRNCP: data.code,
        intitule: data.intitule || formation?.intitule || "",
      });
      if (!data.active) avertir(`Fiche ${data.code} échue au ${data.dateEcheance} — vérifier avant dépôt`);
      if (!data.codeDiplome) avertir("Code diplôme non fourni par la fiche RNCP — à saisir à la main");
      toast.success(`Fiche ${data.code} importée`);
    }
    setLoadRncp(false);
  };

  /* ---------------- 2.d adresse ---------------- */
  useEffect(() => {
    let annule = false;
    const t = setTimeout(async () => {
      if (qAdr.trim().length < 4) return setResAdr([]);
      const { data, avertissement } = await rechercherAdresse(qAdr);
      if (annule) return;
      avertir(avertissement);
      setResAdr(data || []);
    }, 350);
    return () => {
      annule = true;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qAdr]);

  const appliquerAdresse = (a: AdresseSuggestion) => {
    onPatchStagiaire?.({
      adresse: [a.numero, a.voie].filter(Boolean).join(" ").trim(),
      codePostal: a.codePostal,
      commune: a.commune,
    });
    setQAdr("");
    setResAdr([]);
    toast.success("Adresse de l'apprenti importée");
  };

  /* ---------------- 2.e UAI ---------------- */
  const appliquerUai = async () => {
    setLoadUai(true);
    const { data, avertissement } = await rechercherUai(siretCfa || "");
    avertir(avertissement);
    if (data) {
      onPatchFormation?.({ uaiCfa: data.uai });
      toast.success(`UAI ${data.uai} importé`);
    }
    setLoadUai(false);
  };

  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="text-sm font-semibold text-primary">Remplissage automatique — CERFA 10103*14</div>
        <div className="flex gap-2">
          {stagiaire && (
            <Button size="sm" variant="outline" onClick={enregistrerProfilEmployeur}>
              <Save className="w-3 h-3 mr-1" /> Enregistrer l'employeur
            </Button>
          )}
          {formation && (
            <Button size="sm" variant="outline" onClick={enregistrerModeleFormation}>
              <Save className="w-3 h-3 mr-1" /> Enregistrer la formation
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stagiaire && (
          <Ligne icone={<Building2 className="w-3 h-3" />} titre="SIRET, SIREN, nom ou URL Pappers">
            <div className="flex gap-2">
              <Input
                value={qEnt}
                onChange={(e) => setQEnt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && chercherEntreprise()}
                placeholder="Ex : 935 061 358 00013 ou pappers.fr/entreprise/..."
              />
              <Button size="sm" onClick={chercherEntreprise} disabled={loadEnt}>
                {loadEnt ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
            {resEnt.length > 1 && (
              <div className="mt-1 max-h-40 overflow-y-auto border rounded-md divide-y bg-background">
                {resEnt.map((e) => (
                  <button
                    key={e.siret}
                    type="button"
                    className="w-full text-left px-2 py-1 text-xs hover:bg-muted"
                    onClick={() => appliquerEntreprise(e)}
                  >
                    {e.libelle}
                  </button>
                ))}
              </div>
            )}
          </Ligne>
        )}

        {stagiaire && (
          <Ligne icone={<IdCard className="w-3 h-3" />} titre="NIR de l'apprenti (15 caractères)">
            <div className="flex gap-2">
              <Input value={qNir} onChange={(e) => setQNir(e.target.value)} placeholder="1 95 03 75 116 001 42" />
              <Button size="sm" onClick={appliquerNir} disabled={loadNir}>
                {loadNir ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </Ligne>
        )}

        {stagiaire && (
          <Ligne icone={<MapPin className="w-3 h-3" />} titre="Adresse de l'apprenti">
            <Input value={qAdr} onChange={(e) => setQAdr(e.target.value)} placeholder="Commencez à taper l'adresse…" />
            {resAdr.length > 0 && (
              <div className="mt-1 max-h-40 overflow-y-auto border rounded-md divide-y bg-background">
                {resAdr.map((a, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full text-left px-2 py-1 text-xs hover:bg-muted"
                    onClick={() => appliquerAdresse(a)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </Ligne>
        )}

        {formation && (
          <Ligne icone={<GraduationCap className="w-3 h-3" />} titre="Code RNCP du diplôme visé">
            <div className="flex gap-2">
              <Input value={qRncp} onChange={(e) => setQRncp(e.target.value)} placeholder="Ex : 35030" />
              <Button size="sm" onClick={appliquerRncp} disabled={loadRncp}>
                {loadRncp ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </Ligne>
        )}

        {formation && (
          <Ligne icone={<School className="w-3 h-3" />} titre="N° UAI du CFA (depuis son SIRET)">
            <div className="flex gap-2">
              <Input value={siretCfa || ""} readOnly className="bg-muted/50" placeholder="SIRET de l'organisme" />
              <Button size="sm" onClick={appliquerUai} disabled={loadUai}>
                {loadUai ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </Ligne>
        )}
      </div>

      {(profils.length > 0 || modeles.length > 0) && (
        <div className="flex flex-wrap gap-1 items-center">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Star className="w-3 h-3" /> Réutiliser :
          </span>
          {stagiaire &&
            profils.map((p) => (
              <Badge
                key={p.id}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  onPatchStagiaire?.(p.donnees as Partial<StagiaireInfo>);
                  toast.success(`Profil « ${p.nom} » appliqué`);
                }}
              >
                {p.nom}
              </Badge>
            ))}
          {formation &&
            modeles.map((m) => (
              <Badge
                key={m.id}
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  onPatchFormation?.(m.donnees as Partial<FormationInfo>);
                  toast.success(`Modèle « ${m.nom} » appliqué`);
                }}
              >
                {m.nom}
              </Badge>
            ))}
        </div>
      )}

      {avertissements.length > 0 && (
        <ul className="text-[11px] text-amber-600 list-disc pl-4 space-y-0.5">
          {avertissements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CerfaImportExpress;
