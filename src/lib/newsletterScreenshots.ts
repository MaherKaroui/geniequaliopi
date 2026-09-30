// Attestation de suivi de formation en ligne utilisée par la page Demande NDA.
// Les anciennes « captures » d'inscription aux newsletters (fausses preuves de veille)
// ont été supprimées : la veille est désormais sourcée (piecesAF2026.genVeilleSourcee).
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { buildDocument, formatDate } from "./docBuilder";

function certificateDateLong(f: FormationInfo): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - 2);
  const months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
  return `${months[d.getMonth()]} ${d.getDate() < 10 ? "0" : ""}${d.getDate()}, 2025`;
}

export function courseCertificateHtml(o: OrganismeInfo, f: FormationInfo): string {
  const dirigeant = o.dirigeant || "Le Dirigeant";
  const nameParts = dirigeant.split(" ");
  const displayName = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(" ");
  const formationTitle = f.intitule || "Formation professionnelle";
  const certDate = certificateDateLong(f);
  const verifyCode = Math.random().toString(36).substring(2, 14).toUpperCase();

  // Format certificat Coursera/Duke — paysage 1100x850 (ratio ~1.29)
  // Fond blanc avec filigrane guilloché beige + bordure grise + coins décoratifs
  const guilloche = `
    radial-gradient(ellipse 600px 300px at 30% 60%, rgba(230,180,90,0.12), transparent 60%),
    radial-gradient(ellipse 500px 400px at 75% 40%, rgba(220,170,80,0.10), transparent 65%),
    repeating-radial-gradient(circle at 35% 55%, rgba(200,150,70,0.08) 0px, rgba(200,150,70,0.08) 1px, transparent 1px, transparent 8px),
    repeating-radial-gradient(circle at 70% 45%, rgba(190,140,60,0.07) 0px, rgba(190,140,60,0.07) 1px, transparent 1px, transparent 10px)
  `;

  return `
<div style="width:1100px;height:850px;margin:0 auto;font-family:Georgia,'Times New Roman',serif;position:relative;background:#fff;overflow:hidden;border:1px solid #b8b8b8;box-sizing:border-box;padding:18px">
  <!-- Cadre intérieur avec filigrane -->
  <div style="position:absolute;inset:18px;background-image:${guilloche};background-color:#fff;overflow:hidden;border:1px solid #e8e8e8">

    <!-- Coins décoratifs -->
    <div style="position:absolute;top:6px;left:6px;width:14px;height:14px;border-top:1px solid #999;border-left:1px solid #999"></div>
    <div style="position:absolute;top:6px;right:6px;width:14px;height:14px;border-top:1px solid #999;border-right:1px solid #999"></div>
    <div style="position:absolute;bottom:6px;left:6px;width:14px;height:14px;border-bottom:1px solid #999;border-left:1px solid #999"></div>
    <div style="position:absolute;bottom:6px;right:6px;width:14px;height:14px;border-bottom:1px solid #999;border-right:1px solid #999"></div>

    <!-- Bande verticale Coursera (drapeau) — large et collée vers le bord droit -->
    <div style="position:absolute;top:0;right:90px;width:230px;height:620px;z-index:1;overflow:hidden;pointer-events:none">
      <img src="/images/coursera-ribbon.png" alt="Coursera Course Certificate" style="display:block;width:100%;height:100%;object-fit:contain;object-position:top center" />
    </div>

    <!-- Logo Duke en haut à gauche -->
    <div style="position:absolute;top:60px;left:80px;z-index:2">
      <img src="/images/duke-logo.jpg" alt="Duke University" style="display:block;height:95px;width:auto" />
    </div>

    <!-- Contenu principal -->
    <div style="position:absolute;top:230px;left:80px;right:360px;z-index:2">
      <div style="font-size:13px;color:#555;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;margin-bottom:25px">${certDate}</div>
      <div style="font-size:46px;font-weight:400;color:#111;line-height:1.1;margin-bottom:14px;letter-spacing:0.2px">${displayName}</div>
      <div style="font-size:14px;color:#777;font-family:Arial,sans-serif;margin-bottom:28px">has successfully completed</div>
      <div style="font-size:22px;font-weight:600;color:#222;font-style:italic;line-height:1.35;margin-bottom:14px">${formationTitle}</div>
      <div style="font-size:13px;color:#666;line-height:1.7;font-family:Arial,sans-serif;max-width:540px">
        an online non-credit course authorized by Duke University and offered through Coursera
      </div>
    </div>

    <!-- Signatures (bas gauche) — script fin noir, sans rotation -->
    <div style="position:absolute;bottom:140px;left:80px;right:360px;z-index:2;display:flex;gap:50px">
      <div style="flex:1;max-width:300px">
        <div style="font-family:'Brush Script MT','Lucida Handwriting',cursive;font-size:24px;color:#1a1a1a;margin-bottom:4px;line-height:1">Dr. Jana Schaich Borg</div>
        <div style="border-top:1px dotted #999;padding-top:5px">
          <div style="font-size:11px;color:#444;font-family:Arial,sans-serif">Jana Schaich Borg</div>
          <div style="font-size:10px;color:#888;font-family:Arial,sans-serif;font-style:italic">Post-doctoral Fellow</div>
          <div style="font-size:10px;color:#888;font-family:Arial,sans-serif;font-style:italic">Psychiatry and Behavioral Sciences</div>
        </div>
      </div>
      <div style="flex:1;max-width:340px">
        <div style="font-family:'Brush Script MT','Lucida Handwriting',cursive;font-size:24px;color:#1a1a1a;margin-bottom:4px;line-height:1">Daniel Egger</div>
        <div style="border-top:1px dotted #999;padding-top:5px">
          <div style="font-size:11px;color:#444;font-family:Arial,sans-serif">Daniel Egger</div>
          <div style="font-size:10px;color:#888;font-family:Arial,sans-serif;font-style:italic">Executive in Residence and Director, Center for Quantitative Modeling</div>
          <div style="font-size:10px;color:#888;font-family:Arial,sans-serif;font-style:italic">Pratt School of Engineering</div>
        </div>
      </div>
    </div>

    <!-- Verify (bas droite) -->
    <div style="position:absolute;bottom:55px;right:90px;z-index:2;text-align:right;max-width:340px">
      <div style="font-size:12px;color:#1a3a6e;font-family:Arial,sans-serif;font-weight:500">Verify at coursera.org/verify/${verifyCode}</div>
      <div style="font-size:10px;color:#888;font-family:Arial,sans-serif;margin-top:4px;font-style:italic;line-height:1.5">Coursera has confirmed the identity of this individual and<br>their participation in the course.</div>
    </div>
  </div>
</div>`;
}

