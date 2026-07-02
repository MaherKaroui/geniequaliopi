import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VAESession } from "@/lib/vae/vaeTypes";

interface Props { data: VAESession; onChange: (v: VAESession) => void; }

export default function StepSession({ data, onChange }: Props) {
  const F = (label: string, key: keyof VAESession, type = "date") => (
    <div><Label>{label}</Label><Input type={type} value={data[key]} onChange={e => onChange({ ...data, [key]: e.target.value })} /></div>
  );
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dossier / session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {F("Entretien de positionnement", "dateEntretienPositionnement")}
        {F("Demande de recevabilité", "dateDemandeRecevabilite")}
        {F("Date de début d'accompagnement", "dateDebut")}
        {F("Date de fin d'accompagnement", "dateFin")}
        {F("Modalité", "modalite", "text")}
        {F("Mode de financement", "financement", "text")}
        {F("Lieu de signature", "lieuSignature", "text")}
        {F("Date de signature", "dateSignature")}
      </div>
    </div>
  );
}
