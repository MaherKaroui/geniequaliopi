import { CerfaComplement } from "@/types/qualiopi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as N from "@/lib/cerfaNomenclature";
import type { Opt } from "@/lib/cerfaNomenclature";

interface Props {
  value: CerfaComplement;
  onChange: (v: CerfaComplement) => void;
}

type TextKey = Exclude<keyof CerfaComplement, "employeurPublic" | "sportifHautNiveau" | "machinesDangereuses" | "representantLegal" | "maitre2">;

const LISTES: Partial<Record<string, Opt[]>> = {
  typeEmployeur: N.TYPE_EMPLOYEUR,
  employeurSpecifique: N.EMPLOYEUR_SPECIFIQUE,
  regimeSocial: N.REGIME_SOCIAL,
  situationAvant: N.SITUATION_AVANT,
  dernierDiplomePrepare: N.DIPLOMES,
  derniereClasse: N.DERNIERE_CLASSE,
  diplomePlusEleve: N.DIPLOMES,
  typeContrat: N.TYPE_CONTRAT,
  typeDerogation: N.TYPE_DEROGATION,
  codeDiplome: N.DIPLOMES,
};

const SECTIONS: { titre: string; champs: [TextKey, string, string?][] }[] = [
  { titre: "Employeur", champs: [
    ["typeEmployeur", "Type d'employeur (code CERFA)", "11"],
    ["employeurSpecifique", "Employeur spécifique (code)", "4"],
    ["codeApe", "Code APE/NAF", "8559A"],
    ["effectif", "Effectif salarié", "12"],
    ["idcc", "Code IDCC convention collective", "1516"],
    ["telephoneEmployeur", "Téléphone employeur"],
    ["complementAdresseEmployeur", "Complément d'adresse employeur"],
  ]},
  { titre: "Apprenti", champs: [
    ["nomNaissance", "Nom de naissance"],
    ["complementAdresse", "Complément d'adresse"],
    ["regimeSocial", "Régime social (1 MSA / 2 URSSAF)", "2"],
    ["situationAvant", "Situation avant le contrat (code)", "1"],
    ["dernierDiplomePrepare", "Dernier diplôme préparé (code)", "42"],
    ["derniereClasse", "Dernière classe fréquentée (code)", "01"],
    ["diplomePlusEleve", "Diplôme le plus élevé obtenu (code)", "42"],
  ]},
  { titre: "Maître d'apprentissage", champs: [
    ["maitreEmploi", "Emploi occupé par le maître d'apprentissage"],
    ["maitreDiplome", "Diplôme le plus élevé du maître d'apprentissage", "BTS Commerce international"],
    ["maitreNiveau", "Niveau de ce diplôme (3 à 8, auto si vide)", "5"],
  ]},
  { titre: "Contrat", champs: [
    ["typeContrat", "Type de contrat (code)", "11"],
    ["typeDerogation", "Type de dérogation (code)"],
    ["numeroContratPrecedent", "N° du contrat précédent"],
    ["dateConclusion", "Date de conclusion (AAAA-MM-JJ)"],
    ["dateDebutExecution", "Date de début d'exécution (AAAA-MM-JJ)"],
    ["dureeHebdoHeures", "Durée hebdo (heures)", "35"],
    ["dureeHebdoMinutes", "Durée hebdo (minutes)", "00"],
    ["salaireBrutMensuel", "Salaire brut mensuel (€)"],
    ["codeDiplome", "Diplôme ou titre visé (code CERFA, auto si vide)", "58"],
    ["codeDiplomeEN", "Code du diplôme (8 caractères)", "36T31201"],
    ["heuresDistance", "Heures de formation à distance"],
    ["lieuSignature", "Fait à (lieu de signature)"],
  ]},
];

const Check = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    {label}
  </label>
);

const CerfaComplementEditor = ({ value, onChange }: Props) => {
  const set = (patch: Partial<CerfaComplement>) => onChange({ ...value, ...patch });
  const rl = value.representantLegal || {};
  const m2 = value.maitre2 || {};
  return (
    <details className="md:col-span-2 rounded-md border border-border p-3">
      <summary className="cursor-pointer font-medium">CERFA apprentissage (10103*14) — informations complémentaires</summary>
      <div className="mt-3 space-y-4">
        {SECTIONS.map((sec) => (
          <div key={sec.titre}>
            <p className="mb-2 text-sm font-semibold">{sec.titre}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {sec.champs.map(([k, label, ph]) => (
                <div key={k}>
                  <Label>{label}</Label>
                  {LISTES[k] ? (
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={(value[k] as string) || ""}
                      onChange={(e) => set({ [k]: e.target.value })}
                    >
                      <option value="">— Non renseigné —</option>
                      {LISTES[k]!.map(([c, l]) => <option key={c} value={c}>{c} — {l}</option>)}
                    </select>
                  ) : (
                    <Input value={(value[k] as string) || ""} placeholder={ph} onChange={(e) => set({ [k]: e.target.value })} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-4">
          <Check label="Employeur public" checked={!!value.employeurPublic} onChange={(b) => set({ employeurPublic: b })} />
          <Check label="Sportif de haut niveau" checked={!!value.sportifHautNiveau} onChange={(b) => set({ sportifHautNiveau: b })} />
          <Check label="Travail sur machines dangereuses" checked={!!value.machinesDangereuses} onChange={(b) => set({ machinesDangereuses: b })} />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Maître d'apprentissage n°2 (facultatif)</p>
          <div className="grid gap-3 md:grid-cols-2">
            {(["nom", "prenom", "dateNaissance", "email"] as const).map((k) => (
              <div key={k}>
                <Label>{{ nom: "Nom", prenom: "Prénom", dateNaissance: "Date de naissance", email: "Email" }[k]}</Label>
                <Input type={k === "dateNaissance" ? "date" : "text"} value={m2[k] || ""} onChange={(e) => set({ maitre2: { ...m2, [k]: e.target.value } })} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Représentant légal (apprenti mineur)</p>
          <div className="grid gap-3 md:grid-cols-2">
            {(["nom", "numero", "voie", "complement", "codePostal", "commune", "email"] as const).map((k) => (
              <div key={k}>
                <Label>{{ nom: "Nom et prénom", numero: "N°", voie: "Voie", complement: "Complément", codePostal: "Code postal", commune: "Commune", email: "Email" }[k]}</Label>
                <Input value={rl[k] || ""} onChange={(e) => set({ representantLegal: { ...rl, [k]: e.target.value } })} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
};

export default CerfaComplementEditor;
