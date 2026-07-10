import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { VAEOrganisme } from "@/lib/vae/vaeTypes";

interface Props { data: VAEOrganisme; onChange: (v: VAEOrganisme) => void; }

const F = (label: string, key: keyof VAEOrganisme, data: VAEOrganisme, onChange: (v: VAEOrganisme) => void, placeholder?: string) => (
  <div className="space-y-1">
    <Label>{label}</Label>
    <Input value={(data[key] as string) || ""} onChange={e => onChange({ ...data, [key]: e.target.value })} placeholder={placeholder} />
  </div>
);

function fileToDataUrl(f: File): Promise<string> {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(f); });
}

function ImgField({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return (
    <div className="border rounded p-3 space-y-2">
      <Label>{label}</Label>
      <input type="file" accept="image/*" onChange={async e => { const f = e.target.files?.[0]; if (f) onChange(await fileToDataUrl(f)); }} />
      {value && <div className="flex items-center gap-2"><img src={value} alt={label} className="max-h-16 border rounded bg-white p-1" /><Button size="sm" variant="ghost" onClick={() => onChange("")}>Retirer</Button></div>}
    </div>
  );
}

export default function StepOrganisme({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Organisme accompagnateur</h2>
      <p className="text-sm text-muted-foreground">Ces informations sont sauvegardées pour vos prochains dossiers VAE.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {F("Nom", "nom", data, onChange)}
        {F("SIRET", "siret", data, onChange)}
        <div className="md:col-span-2">{F("Adresse", "adresse", data, onChange)}</div>
        {F("N° déclaration d'activité", "nda", data, onChange)}
        {F("Dirigeant(e)", "dirigeant", data, onChange)}
        {F("Email", "email", data, onChange)}
        {F("Téléphone (optionnel)", "telephone", data, onChange)}
        {F("Lien visioconférence", "lienVisio", data, onChange, "https://meet.google.com/…")}
        {F("Référent handicap", "referentHandicap", data, onChange)}
        {F("Prix forfaitaire TTC", "prixTTC", data, onChange, "4 000 € TTC")}
        {F("Durée", "duree", data, onChange, "40 heures à distance")}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <ImgField label="Logo de l'organisme" value={data.logo} onChange={v => onChange({ ...data, logo: v })} />
        <ImgField label="Signature du dirigeant" value={data.signature} onChange={v => onChange({ ...data, signature: v })} />
        <ImgField label="Tampon de l'organisme" value={data.tampon} onChange={v => onChange({ ...data, tampon: v })} />
      </div>
    </div>
  );
}
