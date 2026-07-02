import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VAEOrganisme } from "@/lib/vae/vaeTypes";

interface Props { data: VAEOrganisme; onChange: (v: VAEOrganisme) => void; }

const F = (label: string, key: keyof VAEOrganisme, data: VAEOrganisme, onChange: (v: VAEOrganisme) => void, placeholder?: string) => (
  <div className="space-y-1">
    <Label>{label}</Label>
    <Input value={(data[key] as string) || ""} onChange={e => onChange({ ...data, [key]: e.target.value })} placeholder={placeholder} />
  </div>
);

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
    </div>
  );
}
