import { useState } from "react";
import { OrganismeInfo } from "@/types/qualiopi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import LogoSignatureUpload from "./LogoSignatureUpload";

interface OrganismeFormProps {
  data: OrganismeInfo;
  onChange: (data: OrganismeInfo) => void;
  hideFields?: string[];
}

const OrganismeForm = ({ data, onChange, hideFields = [] }: OrganismeFormProps) => {
  const hidden = (field: string) => hideFields.includes(field);
  const [pappersUrl, setPappersUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const update = (field: keyof OrganismeInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const fetchPappers = async () => {
    if (!pappersUrl.includes("pappers.fr")) {
      toast({ title: "Erreur", description: "Veuillez coller un lien Pappers valide", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("pappers-scrape", {
        body: { url: pappersUrl },
      });
      if (error || !result?.success) {
        throw new Error(result?.error || error?.message || "Erreur inconnue");
      }
      const d = result.data;
      onChange({
        ...data,
        nom: d.nom || data.nom,
        siret: d.siret || data.siret,
        adresse: d.adresse || data.adresse,
        codePostal: d.codePostal || data.codePostal,
        ville: d.ville || data.ville,
        dirigeant: d.dirigeant || data.dirigeant,
        domainesFormation: d.domainesFormation || data.domainesFormation,
        nda: d.nda || data.nda,
        siteWeb: d.siteWeb || data.siteWeb,
      });
      toast({ title: "Importé", description: "Les informations Pappers ont été récupérées" });
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message || "Impossible de récupérer les données", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleType = (type: OrganismeInfo['typesActions'][0]) => {
    const types = data.typesActions.includes(type)
      ? data.typesActions.filter(t => t !== type)
      : [...data.typesActions, type];
    onChange({ ...data, typesActions: types });
  };

  const typesOptions = [
    { value: 'actions-formation' as const, label: 'Actions de formation' },
    { value: 'bilans-competences' as const, label: 'Bilans de compétences' },
    { value: 'vae' as const, label: 'VAE' },
    { value: 'apprentissage' as const, label: 'Apprentissage' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold font-heading">Informations de l'organisme</h2>
        <p className="text-sm text-muted-foreground">Renseignez les informations de votre organisme de formation</p>
      </div>

      {/* Pappers import */}
      <div className="md:col-span-2 p-4 border border-dashed border-primary/30 rounded-lg bg-muted/30">
        <Label htmlFor="pappersUrl" className="font-semibold">Importer depuis Pappers</Label>
        <p className="text-xs text-muted-foreground mb-2">Collez le lien Pappers de votre entreprise pour remplir automatiquement le formulaire</p>
        <div className="flex gap-2">
          <Input
            id="pappersUrl"
            value={pappersUrl}
            onChange={e => setPappersUrl(e.target.value)}
            placeholder="https://www.pappers.fr/entreprise/mon-organisme-123456789"
            className="flex-1"
          />
          <Button onClick={fetchPappers} disabled={loading || !pappersUrl} variant="default" size="sm">
            {loading ? "Chargement..." : "Importer"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="nom">Nom de l'organisme *</Label>
          <Input id="nom" value={data.nom} onChange={e => update('nom', e.target.value)} placeholder="Ex: Formation Excellence SAS" />
        </div>
        <div>
          <Label htmlFor="siret">SIRET *</Label>
          <Input id="siret" value={data.siret} onChange={e => update('siret', e.target.value)} placeholder="Ex: 123 456 789 00012" />
        </div>
        {!hidden('nda') && (
        <div>
          <Label htmlFor="nda">N° Déclaration d'activité *</Label>
          <Input id="nda" value={data.nda} onChange={e => update('nda', e.target.value)} placeholder="Ex: 11755555555" />
        </div>
        )}
        <div className="md:col-span-2">
          <Label htmlFor="adresse">Adresse</Label>
          <Input id="adresse" value={data.adresse} onChange={e => update('adresse', e.target.value)} placeholder="Ex: 12 rue de la Formation" />
        </div>
        <div>
          <Label htmlFor="codePostal">Code postal</Label>
          <Input id="codePostal" value={data.codePostal} onChange={e => update('codePostal', e.target.value)} placeholder="75001" />
        </div>
        <div>
          <Label htmlFor="ville">Ville</Label>
          <Input id="ville" value={data.ville} onChange={e => update('ville', e.target.value)} placeholder="Paris" />
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" value={data.telephone} onChange={e => update('telephone', e.target.value)} placeholder="01 23 45 67 89" />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={data.email} onChange={e => update('email', e.target.value)} placeholder="contact@formation.fr" />
        </div>
        <div>
          <Label htmlFor="siteWeb">Site internet / Page Facebook</Label>
          <Input id="siteWeb" value={data.siteWeb} onChange={e => update('siteWeb', e.target.value)} placeholder="https://www.facebook.com/monorganisme" />
        </div>
        <div>
          <Label htmlFor="dirigeant">Dirigeant *</Label>
          <Input id="dirigeant" value={data.dirigeant} onChange={e => update('dirigeant', e.target.value)} placeholder="Nom du dirigeant" />
        </div>
        <div>
          <Label htmlFor="responsablePedagogique">Responsable pédagogique</Label>
          <Input id="responsablePedagogique" value={data.responsablePedagogique} onChange={e => update('responsablePedagogique', e.target.value)} placeholder="Nom du responsable pédagogique" />
        </div>
        <div>
          <Label htmlFor="referentHandicap">Référent handicap</Label>
          <Input id="referentHandicap" value={data.referentHandicap} onChange={e => update('referentHandicap', e.target.value)} placeholder="Nom du référent handicap" />
        </div>
        <div>
          <Label htmlFor="referentQualite">Référent qualité</Label>
          <Input id="referentQualite" value={data.referentQualite} onChange={e => update('referentQualite', e.target.value)} placeholder="Nom du référent qualité" />
        </div>
        <div>
          <Label htmlFor="poleAdministratif">Pôle Administratif</Label>
          <Input id="poleAdministratif" value={data.poleAdministratif} onChange={e => update('poleAdministratif', e.target.value)} placeholder="Nom du responsable administratif" />
        </div>
        <div>
          <Label htmlFor="relationEntreprises">Relation Entreprises</Label>
          <Input id="relationEntreprises" value={data.relationEntreprises} onChange={e => update('relationEntreprises', e.target.value)} placeholder="Nom du responsable relation entreprises" />
        </div>
        <div>
          <Label htmlFor="referentMobilite">Référent Mobilité nationale et internationale (externalisé)</Label>
          <Input id="referentMobilite" value={data.referentMobilite} onChange={e => update('referentMobilite', e.target.value)} placeholder="Nom du référent mobilité (Mobi'Jeunes/Erasmus+)" />
        </div>
        <div>
          <Label htmlFor="referentDecrochage">Référent Décrochage / Lutte contre l'abandon (CFA)</Label>
          <Input id="referentDecrochage" value={data.referentDecrochage || ""} onChange={e => update('referentDecrochage', e.target.value)} placeholder="Nom du référent décrochage" />
        </div>
        <div>
          <Label htmlFor="coordinateurPedagogique">Coordinateur Pédagogique (CFA)</Label>
          <Input id="coordinateurPedagogique" value={data.coordinateurPedagogique || ""} onChange={e => update('coordinateurPedagogique', e.target.value)} placeholder="Nom du coordinateur pédagogique" />
        </div>
        <div>
          <Label htmlFor="conseillerFormation">Conseiller en Formation / Orientation</Label>
          <Input id="conseillerFormation" value={data.conseillerFormation || ""} onChange={e => update('conseillerFormation', e.target.value)} placeholder="Nom du conseiller en formation" />
        </div>
        <div>
          <Label htmlFor="referentNumerique">Référent Numérique / Distanciel</Label>
          <Input id="referentNumerique" value={data.referentNumerique || ""} onChange={e => update('referentNumerique', e.target.value)} placeholder="Nom du référent numérique" />
        </div>
        {!hidden('domainesFormation') && (
        <div className="md:col-span-2">
          <Label htmlFor="domainesFormation">Domaines de formation</Label>
          <Textarea id="domainesFormation" value={data.domainesFormation} onChange={e => update('domainesFormation', e.target.value)} placeholder="Ex: Management, RH, Digital, Langues..." rows={2} />
        </div>
        )}
        {!hidden('certifications') && (
        <div className="md:col-span-2">
          <Label htmlFor="certifications">Certifications déjà obtenues</Label>
          <Input id="certifications" value={data.certifications} onChange={e => update('certifications', e.target.value)} placeholder="Ex: Qualiopi (valide jusqu'au...)" />
        </div>
        )}
        <div>
          <Label htmlFor="numeroCertificatQualiopi">N° certificat Qualiopi</Label>
          <Input id="numeroCertificatQualiopi" value={data.numeroCertificatQualiopi || ''} onChange={e => update('numeroCertificatQualiopi' as any, e.target.value)} placeholder="Ex: 2024/98765.1" />
        </div>
        <div>
          <Label htmlFor="organismeCertificateur">Organisme certificateur</Label>
          <Input id="organismeCertificateur" value={data.organismeCertificateur || ''} onChange={e => update('organismeCertificateur' as any, e.target.value)} placeholder="Ex: AFNOR Certification" />
        </div>
        <div>
          <Label htmlFor="dateObtentionQualiopi">Date d'obtention Qualiopi</Label>
          <Input id="dateObtentionQualiopi" type="date" value={data.dateObtentionQualiopi || ''} onChange={e => update('dateObtentionQualiopi' as any, e.target.value)} />
        </div>
        <div>
          <Label htmlFor="dateFinValiditeQualiopi">Date de fin de validité Qualiopi</Label>
          <Input id="dateFinValiditeQualiopi" type="date" value={data.dateFinValiditeQualiopi || ''} onChange={e => update('dateFinValiditeQualiopi' as any, e.target.value)} />
        </div>
        {!hidden('outilsUtilises') && (
        <div className="md:col-span-2">
          <Label htmlFor="outilsUtilises">Outils utilisés</Label>
          <Textarea id="outilsUtilises" value={data.outilsUtilises} onChange={e => update('outilsUtilises', e.target.value)} placeholder="Ex: Zoom, Moodle, Google Drive..." rows={2} />
        </div>
        )}
        {!hidden('version') && (
        <div>
          <Label htmlFor="version">Version du dossier</Label>
          <Input id="version" value={data.version} onChange={e => update('version', e.target.value)} placeholder="1" />
        </div>
        )}
        <div>
          <Label htmlFor="dateMaj">Date de mise à jour (MAJ)</Label>
          <Input id="dateMaj" type="date" value={data.dateMaj} onChange={e => update('dateMaj', e.target.value)} />
        </div>
        {!hidden('typesActions') && (
        <div className="md:col-span-2">
          <Label className="mb-3 block">Types d'actions *</Label>
          <div className="flex flex-wrap gap-4">
            {typesOptions.map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={data.typesActions.includes(option.value)}
                  onCheckedChange={() => toggleType(option.value)}
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        )}

        {/* Logo & Signature Upload */}
        <LogoSignatureUpload
          logoUrl={data.logoUrl}
          signatureUrl={data.signatureUrl}
          tamponUrl={data.tamponUrl}
          onLogoChange={(url) => onChange({ ...data, logoUrl: url })}
          onSignatureChange={(url) => onChange({ ...data, signatureUrl: url })}
          onTamponChange={(url) => onChange({ ...data, tamponUrl: url })}
          organismePrefill={{
            nom: data.nom,
            siret: data.siret,
            ville: data.ville,
            codePostal: data.codePostal,
            nda: data.nda,
          }}
        />
      </div>
    </div>
  );
};

export default OrganismeForm;
