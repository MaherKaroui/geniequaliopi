/**
 * MESSAGE 13 — PARTIE C : bloc de signature réutilisable.
 * Un nom tapé en clair ne vaut pas signature : sans image, on affiche un cadre
 * rouge « Signature manquante » et la pièce devient non exportable.
 */
import type { PartieSignature } from "@/lib/bdc/signatureMatrix";

interface Props {
  parties: PartieSignature[];
  dateSignature?: string;
  lieu?: string;
  avecTampon?: boolean;
  tamponUrl?: string;
}

export default function SignatureBlock({ parties, dateSignature, lieu, avecTampon, tamponUrl }: Props) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold text-foreground">
        Signatures{lieu ? ` — fait à ${lieu}` : ""}
      </p>
      <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max(1, parties.length)}, minmax(0,1fr))` }}>
        {parties.map((p, i) => {
          const tampon = avecTampon && p.role === "O" && tamponUrl;
          return (
            <div
              key={`${p.role}-${i}`}
              className="rounded border p-2"
              style={
                tampon
                  ? { backgroundImage: `url(${tamponUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }
                  : undefined
              }
            >
              <p className="text-[11px] font-semibold text-foreground">{p.libelle}</p>
              <p className="text-[10px] text-muted-foreground">
                {p.nom || "—"}
                {p.qualite ? ` · ${p.qualite}` : ""}
              </p>
              {p.image ? (
                <img src={p.image} alt={`Signature ${p.libelle}`} className="mx-auto my-1 max-h-14 object-contain" />
              ) : p.nom ? (
                <div
                  className="my-1 text-center text-primary"
                  style={{ fontFamily: "'Brush Script MT','Lucida Handwriting','Segoe Script',cursive", fontSize: 22, lineHeight: 1.1 }}
                >
                  {p.nom}
                </div>
              ) : (
                <div className="my-1 h-8 border-b border-border" />
              )}
              <p className="text-center text-[10px] text-muted-foreground">Signé le {dateSignature || p.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
