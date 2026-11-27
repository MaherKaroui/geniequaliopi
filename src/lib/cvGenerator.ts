// ===== CV Data Types =====
export interface CVExperience {
  poste: string;
  entreprise: string;
  dateDebut: string;
  dateFin: string;
  description: string;
}
export interface CVFormation {
  diplome: string;
  etablissement: string;
  annee: string;
}
export interface CVCompetence {
  nom: string;
  niveau: number;
}
export interface CVLangue {
  langue: string;
  niveau: string;
}
export interface CVCertification {
  nom: string;
  annee: string;
}
export interface CVData {
  prenom: string;
  nom: string;
  titre: string;
  email: string;
  telephone: string;
  adresse: string;
  photoUrl: string;
  profil: string;
  specialites: string;
  experiences: CVExperience[];
  formations: CVFormation[];
  competences: CVCompetence[];
  langues: CVLangue[];
  certifications: CVCertification[];
  experiencePedagogique: string;
  publications: string;
}

export const emptyCV: CVData = {
  prenom: "", nom: "", titre: "Formateur professionnel", email: "", telephone: "",
  adresse: "", photoUrl: "", profil: "", specialites: "",
  experiences: [{ poste: "", entreprise: "", dateDebut: "", dateFin: "", description: "" }],
  formations: [{ diplome: "", etablissement: "", annee: "" }],
  competences: [{ nom: "", niveau: 3 }],
  langues: [{ langue: "Français", niveau: "Langue maternelle" }],
  certifications: [{ nom: "", annee: "" }],
  experiencePedagogique: "",
  publications: "",
};

export type CVDesign = "classique" | "moderne" | "minimaliste" | "elegant" | "colore" | "sidebar" | "timeline" | "magazine" | "corporate" | "executive" | "swiss" | "harvard" | "consulting" | "monochrome" | "serif_pro" | "nordique" | "atelier" | "impact" | "botanique" | "compact" | "ardoise" | "lavande" | "ocean" | "prestige" | "epure";

export const CV_DESIGNS: { id: CVDesign; label: string; description: string; accent: string }[] = [
  { id: "classique", label: "Classique", description: "Sobre et professionnel", accent: "#1e3a7b" },
  { id: "moderne", label: "Moderne", description: "Design épuré avec accents", accent: "#2563eb" },
  { id: "minimaliste", label: "Minimaliste", description: "Ultra-clean et aéré", accent: "#111827" },
  { id: "elegant", label: "Élégant", description: "Touches dorées raffinées", accent: "#92700C" },
  { id: "colore", label: "Coloré", description: "Palette vive et dynamique", accent: "#dc2626" },
  { id: "sidebar", label: "Sidebar", description: "Colonne latérale moderne", accent: "#0f766e" },
  { id: "timeline", label: "Timeline", description: "Frise chronologique verticale", accent: "#7c3aed" },
  { id: "magazine", label: "Magazine", description: "Mise en page éditoriale 2 colonnes", accent: "#be185d" },
  { id: "corporate", label: "Corporate", description: "Bandeau couleur en-tête + sections épurées", accent: "#0369a1" },
  { id: "executive", label: "Executive", description: "Fond blanc, header serif, ultra-pro", accent: "#1f2937" },
  { id: "swiss", label: "Swiss", description: "Grille suisse, blanc total, rouge accent", accent: "#dc2626" },
  { id: "harvard", label: "Harvard", description: "Format CV académique anglo-saxon", accent: "#7f1d1d" },
  { id: "consulting", label: "Consulting", description: "Style McKinsey/BCG, bleu sobre", accent: "#1e40af" },
  { id: "monochrome", label: "Monochrome", description: "100% noir & blanc, typographie forte", accent: "#000000" },
  { id: "serif_pro", label: "Serif Pro", description: "Serif éditorial, blanc, raffiné", accent: "#374151" },
  { id: "nordique", label: "Nordique", description: "Colonne bleu glacier, claire et structurée", accent: "#155e75" },
  { id: "atelier", label: "Atelier", description: "Papier ivoire et accents terracotta", accent: "#b45309" },
  { id: "impact", label: "Impact", description: "Titre fort, contraste graphite et orange", accent: "#ea580c" },
  { id: "botanique", label: "Botanique", description: "Vert sauge, élégant et naturel", accent: "#3f6212" },
  { id: "compact", label: "Compact", description: "Deux colonnes denses pour un CV court", accent: "#334155" },
  { id: "ardoise", label: "Ardoise", description: "Colonne sombre ardoise, accents turquoise", accent: "#14b8a6" },
  { id: "lavande", label: "Lavande", description: "Doux violet, cartes arrondies", accent: "#6d28d9" },
  { id: "ocean", label: "Océan", description: "Bandeau dégradé bleu profond", accent: "#0e7490" },
  { id: "prestige", label: "Prestige", description: "Noir et or, centré et raffiné", accent: "#a16207" },
  { id: "epure", label: "Épuré", description: "Grille aérée, dates en marge", accent: "#475569" },
];

// ===== HTML Generators =====
function escapeHtml(s: any) {
  if (s === null || s === undefined) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function skillBar(level: number, accent: string, style: "bar" | "dots" | "line" = "bar") {
  if (style === "dots") {
    return `<span>${Array.from({ length: 5 }, (_, i) => `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:3px;background:${i < level ? accent : '#ddd'}"></span>`).join("")}</span>`;
  }
  if (style === "line") {
    return `<div style="background:#e5e7eb;border-radius:4px;height:4px;width:100%;margin-top:4px;"><div style="background:${accent};height:100%;border-radius:4px;width:${level * 20}%"></div></div>`;
  }
  return `<div style="background:#e5e7eb;border-radius:4px;height:5px;width:100%;margin-top:5px;"><div style="background:${accent};height:100%;border-radius:4px;width:${level * 20}%"></div></div>`;
}

function photoBlock(url: string, size = 100, round = true) {
  if (!url) return "";
  return `<img src="${url}" style="width:${size}px;height:${size}px;${round ? "border-radius:50%;" : "border-radius:8px;"}object-fit:cover;display:block;" />`;
}

function sectionTitle(text: string, accent: string, style: "underline" | "filled" | "plain" | "leftbar" = "underline") {
  if (style === "filled") return `<h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;background:${accent};color:#fff;padding:6px 12px;margin:18px 0 10px 0;border-radius:3px;">${text}</h2>`;
  if (style === "leftbar") return `<h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-left:4px solid ${accent};padding-left:10px;margin:18px 0 10px 0;color:${accent};">${text}</h2>`;
  if (style === "plain") return `<h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:18px 0 8px 0;color:${accent};">${text}</h2>`;
  return `<h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid ${accent};padding-bottom:4px;margin:18px 0 10px 0;color:${accent};">${text}</h2>`;
}

function expBlock(exp: CVExperience) {
  return `<div style="margin-bottom:13px;break-inside:avoid;"><strong>${escapeHtml(exp.poste)}</strong>${exp.entreprise ? ` — ${escapeHtml(exp.entreprise)}` : ""}${exp.dateDebut ? `<br><span style="color:#666;font-size:11px;">${exp.dateDebut}${exp.dateFin ? ` – ${exp.dateFin}` : " – Présent"}</span>` : ""}${exp.description ? `<p style="margin:4px 0 0 0;font-size:12px;line-height:1.55;color:#444;">${escapeHtml(exp.description)}</p>` : ""}</div>`;
}

export function generateCVHTML(data: CVData, design: CVDesign, options?: { accent?: string; fontFamily?: string }): string {
  const d = CV_DESIGNS.find(dd => dd.id === design)!;
  const accent = options?.accent || d.accent;
  const fontOverride = options?.fontFamily;
  const fullName = `${data.prenom} ${data.nom}`.trim() || "Votre Nom";

  const contactInfo = [data.email, data.telephone, data.adresse].filter(Boolean).join(" • ");
  const exps = (data.experiences || []).filter(e => e && (e.poste || e.entreprise));
  const forms = (data.formations || []).filter(f => f && (f.diplome || f.etablissement));
  const comps = (data.competences || []).filter(c => c && c.nom);
  const langs = (data.langues || []).filter(l => l && l.langue);
  const certs = (data.certifications || []).filter(c => c && c.nom);

  const sStyle = (s: "underline" | "filled" | "plain" | "leftbar") => s;
  const secStyle = design === "moderne" ? sStyle("leftbar") : design === "colore" ? sStyle("filled") : design === "minimaliste" ? sStyle("plain") : sStyle("underline");

  const profilSection = data.profil ? `${sectionTitle("Profil", accent, secStyle)}<p style="font-size:12px;line-height:1.6;color:#333;">${escapeHtml(data.profil)}</p>` : "";
  const speSection = data.specialites ? `${sectionTitle("Spécialités", accent, secStyle)}<p style="font-size:12px;color:#333;">${escapeHtml(data.specialites)}</p>` : "";
  const expSection = exps.length ? `${sectionTitle("Expérience professionnelle", accent, secStyle)}${exps.map(expBlock).join("")}` : "";
  const pedSection = data.experiencePedagogique ? `${sectionTitle("Expérience pédagogique", accent, secStyle)}<p style="font-size:12px;line-height:1.6;color:#333;">${escapeHtml(data.experiencePedagogique)}</p>` : "";
  const formSection = forms.length ? `${sectionTitle("Formation", accent, secStyle)}${forms.map(f => `<div style="margin-bottom:6px;"><strong>${escapeHtml(f.diplome)}</strong>${f.etablissement ? ` — ${escapeHtml(f.etablissement)}` : ""}${f.annee ? ` <span style="color:#666;font-size:11px;">(${f.annee})</span>` : ""}</div>`).join("")}` : "";
  const certSection = certs.length ? `${sectionTitle("Certifications", accent, secStyle)}${certs.map(c => `<div style="margin-bottom:4px;font-size:12px;">• ${escapeHtml(c.nom)}${c.annee ? ` (${c.annee})` : ""}</div>`).join("")}` : "";
  const compSection = comps.length ? `${sectionTitle("Compétences", accent, secStyle)}${comps.map(c => `<div style="margin-bottom:10px;break-inside:avoid;"><span style="font-size:11.5px;line-height:1.35;display:block;">${escapeHtml(c.nom)}</span>${skillBar(c.niveau, accent, design === "minimaliste" ? "line" : design === "elegant" ? "dots" : "bar")}</div>`).join("")}` : "";
  const langSection = langs.length ? `${sectionTitle("Langues", accent, secStyle)}${langs.map(l => `<div style="font-size:12px;margin-bottom:3px;">${escapeHtml(l.langue)} — <em>${escapeHtml(l.niveau)}</em></div>`).join("")}` : "";
  const pubSection = data.publications ? `${sectionTitle("Publications", accent, secStyle)}<p style="font-size:12px;color:#333;white-space:pre-wrap;">${escapeHtml(data.publications)}</p>` : "";

  if (design === "sidebar") {
    return `<div style="font-family:${fontOverride || "'Segoe UI',Arial,sans-serif"};max-width:800px;margin:0 auto;display:flex;min-height:1100px;">
      <div style="width:260px;background:${accent};color:#fff;padding:30px 20px;">
        <div style="text-align:center;margin-bottom:20px;">${photoBlock(data.photoUrl, 120, true)}</div>
        <h1 style="font-size:20px;margin:0 0 4px 0;text-align:center;">${escapeHtml(fullName)}</h1>
        <p style="text-align:center;font-size:12px;opacity:0.85;margin:0 0 20px 0;">${escapeHtml(data.titre)}</p>
        <div style="border-top:1px solid rgba(255,255,255,0.3);padding-top:15px;font-size:11px;">
          ${data.email ? `<p style="margin:4px 0;">✉ ${escapeHtml(data.email)}</p>` : ""}
          ${data.telephone ? `<p style="margin:4px 0;">☎ ${escapeHtml(data.telephone)}</p>` : ""}
          ${data.adresse ? `<p style="margin:4px 0;">📍 ${escapeHtml(data.adresse)}</p>` : ""}
        </div>
        ${comps.length ? `<h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px 0;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;">Compétences</h3>${comps.map(c => `<div style="margin-bottom:6px;font-size:11px;">${escapeHtml(c.nom)}${skillBar(c.niveau, "rgba(255,255,255,0.5)", "line").replace(/#e5e7eb/g, "rgba(255,255,255,0.2)").replace(new RegExp(accent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), "rgba(255,255,255,0.85)")}</div>`).join("")}` : ""}
        ${langs.length ? `<h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px 0;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;">Langues</h3>${langs.map(l => `<div style="font-size:11px;margin-bottom:3px;">${escapeHtml(l.langue)}<br><em style="opacity:0.8">${escapeHtml(l.niveau)}</em></div>`).join("")}` : ""}
        ${certs.length ? `<h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px 0;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;">Certifications</h3>${certs.map(c => `<div style="font-size:11px;margin-bottom:3px;">${escapeHtml(c.nom)}${c.annee ? ` (${c.annee})` : ""}</div>`).join("")}` : ""}
      </div>
      <div style="flex:1;padding:30px 25px;">
        ${profilSection}${speSection}${expSection}${pedSection}${formSection}${pubSection}
      </div>
    </div>`;
  }

  if (design === "timeline") {
    const ff = fontOverride || "'Segoe UI',Arial,sans-serif";
    const timelineExp = exps.length ? `${sectionTitle("Parcours professionnel", accent, "leftbar")}<div style="position:relative;padding-left:20px;border-left:3px solid ${accent};">${exps.map(exp => `<div style="margin-bottom:14px;position:relative;"><span style="position:absolute;left:-26px;top:4px;width:11px;height:11px;border-radius:50%;background:${accent};border:2px solid #fff;"></span><div style="font-size:11px;color:${accent};font-weight:600;">${escapeHtml(exp.dateDebut || "")}${exp.dateFin ? ` – ${escapeHtml(exp.dateFin)}` : (exp.dateDebut ? " – Présent" : "")}</div><strong style="font-size:13px;">${escapeHtml(exp.poste)}</strong>${exp.entreprise ? ` <span style="color:#555;">— ${escapeHtml(exp.entreprise)}</span>` : ""}${exp.description ? `<p style="margin:4px 0 0 0;font-size:12px;color:#444;">${escapeHtml(exp.description)}</p>` : ""}</div>`).join("")}</div>` : "";
    return `<div style="font-family:${ff};color:#222;font-size:12px;line-height:1.5;padding:30px;">
      <div style="display:flex;align-items:center;gap:18px;margin-bottom:20px;">
        ${photoBlock(data.photoUrl, 90, true)}
        <div style="flex:1;border-left:5px solid ${accent};padding-left:14px;">
          <h1 style="font-size:26px;margin:0;color:#111;">${escapeHtml(fullName)}</h1>
          <p style="font-size:14px;color:${accent};margin:2px 0;font-weight:600;">${escapeHtml(data.titre)}</p>
          <p style="font-size:11px;color:#777;">${contactInfo}</p>
        </div>
      </div>
      ${profilSection}${speSection}${timelineExp}${pedSection}${formSection}${certSection}${compSection}${langSection}${pubSection}
    </div>`;
  }

  if (design === "magazine") {
    const ff = fontOverride || "Georgia,'Times New Roman',serif";
    return `<div style="font-family:${ff};color:#222;font-size:12px;line-height:1.55;padding:30px;">
      <div style="border-top:6px solid ${accent};border-bottom:1px solid #ddd;padding:14px 0;margin-bottom:18px;display:flex;align-items:center;gap:18px;">
        ${photoBlock(data.photoUrl, 100, false)}
        <div style="flex:1;">
          <h1 style="font-size:32px;margin:0;color:#111;font-weight:700;letter-spacing:-0.5px;">${escapeHtml(fullName)}</h1>
          <p style="font-size:14px;color:${accent};margin:4px 0;font-style:italic;">${escapeHtml(data.titre)}</p>
          <p style="font-size:11px;color:#777;">${contactInfo}</p>
        </div>
      </div>
      <div style="display:flex;gap:24px;">
        <div style="flex:2;">
          ${profilSection}${expSection}${pedSection}${pubSection}
        </div>
        <div style="flex:1;background:#f7f7f9;padding:14px;border-radius:6px;">
          ${formSection}${certSection}${compSection}${langSection}${speSection}
        </div>
      </div>
    </div>`;
  }

  if (design === "corporate") {
    const ff = fontOverride || "'Segoe UI',Arial,sans-serif";
    return `<div style="font-family:${ff};color:#222;font-size:12px;line-height:1.5;">
      <div style="background:linear-gradient(135deg, ${accent}, ${accent}dd);color:#fff;padding:28px 30px;display:flex;align-items:center;gap:20px;">
        ${photoBlock(data.photoUrl, 95, true)}
        <div style="flex:1;">
          <h1 style="font-size:28px;margin:0;font-weight:700;">${escapeHtml(fullName)}</h1>
          <p style="font-size:14px;margin:4px 0;opacity:0.95;">${escapeHtml(data.titre)}</p>
          <p style="font-size:11px;opacity:0.85;margin-top:6px;">${contactInfo}</p>
        </div>
      </div>
      <div style="padding:25px 30px;">
        ${profilSection}${speSection}${expSection}${pedSection}${formSection}${certSection}${compSection}${langSection}${pubSection}
      </div>
    </div>`;
  }

  if (design === "executive") {
    const ff = fontOverride || "Georgia,'Times New Roman',serif";
    return `<div style="font-family:${ff};color:#1a1a1a;font-size:12px;line-height:1.55;background:#fff;padding:40px 45px;">
      <div style="text-align:center;border-bottom:1px solid #1f2937;padding-bottom:18px;margin-bottom:22px;">
        <h1 style="font-size:32px;margin:0;font-weight:400;letter-spacing:4px;text-transform:uppercase;color:#1f2937;">${escapeHtml(fullName)}</h1>
        <div style="width:50px;height:1px;background:${accent};margin:10px auto;"></div>
        <p style="font-size:13px;color:#4b5563;margin:4px 0;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(data.titre)}</p>
        <p style="font-size:11px;color:#6b7280;margin-top:8px;">${contactInfo}</p>
      </div>
      ${profilSection}${speSection}${expSection}${pedSection}${formSection}${certSection}${compSection}${langSection}${pubSection}
    </div>`;
  }

  if (design === "swiss") {
    const ff = fontOverride || "'Helvetica Neue',Helvetica,Arial,sans-serif";
    return `<div style="font-family:${ff};color:#0a0a0a;font-size:11px;line-height:1.5;background:#fff;padding:40px 50px;">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:30px;border-top:4px solid ${accent};padding-top:18px;margin-bottom:24px;">
        <div>
          <h1 style="font-size:34px;margin:0;font-weight:700;letter-spacing:-1px;line-height:1;">${escapeHtml(data.prenom)}<br>${escapeHtml(data.nom)}</h1>
        </div>
        <div style="padding-top:6px;">
          <p style="font-size:13px;font-weight:600;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(data.titre)}</p>
          <p style="font-size:10px;color:#525252;margin:0;">${contactInfo}</p>
        </div>
      </div>
      ${profilSection}${speSection}${expSection}${pedSection}${formSection}${certSection}${compSection}${langSection}${pubSection}
    </div>`;
  }

  if (design === "harvard") {
    const ff = fontOverride || "'Times New Roman',Times,serif";
    return `<div style="font-family:${ff};color:#000;font-size:11.5px;line-height:1.5;background:#fff;padding:40px 50px;">
      <div style="text-align:center;margin-bottom:18px;">
        <h1 style="font-size:24px;margin:0;font-weight:700;letter-spacing:1px;">${escapeHtml(fullName).toUpperCase()}</h1>
        <p style="font-size:11px;margin:6px 0 0 0;">${contactInfo}</p>
      </div>
      ${data.titre ? `<p style="text-align:center;font-style:italic;margin:0 0 14px 0;font-size:12px;">${escapeHtml(data.titre)}</p>` : ""}
      ${profilSection}${expSection}${pedSection}${formSection}${certSection}${speSection}${compSection}${langSection}${pubSection}
    </div>`;
  }

  if (design === "consulting") {
    const ff = fontOverride || "'Calibri','Segoe UI',Arial,sans-serif";
    return `<div style="font-family:${ff};color:#1f2937;font-size:11.5px;line-height:1.5;background:#fff;padding:36px 44px;">
      <div style="border-bottom:2px solid ${accent};padding-bottom:14px;margin-bottom:18px;">
        <h1 style="font-size:26px;margin:0;font-weight:600;color:${accent};letter-spacing:0.5px;">${escapeHtml(fullName)}</h1>
        <p style="font-size:13px;color:#374151;margin:4px 0 8px 0;font-weight:500;">${escapeHtml(data.titre)}</p>
        <p style="font-size:10.5px;color:#6b7280;margin:0;">${contactInfo}</p>
      </div>
      ${profilSection}${speSection}${expSection}${pedSection}${formSection}${certSection}${compSection}${langSection}${pubSection}
    </div>`;
  }

  if (design === "monochrome") {
    const ff = fontOverride || "'Helvetica Neue',Helvetica,Arial,sans-serif";
    return `<div style="font-family:${ff};color:#000;font-size:11.5px;line-height:1.5;background:#fff;padding:40px 45px;">
      <div style="margin-bottom:22px;">
        <h1 style="font-size:42px;margin:0;font-weight:900;letter-spacing:-1.5px;line-height:1;text-transform:uppercase;">${escapeHtml(fullName)}</h1>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #000;padding:10px 0 8px 0;margin-top:8px;">
          <p style="font-size:12px;margin:0;font-weight:600;text-transform:uppercase;letter-spacing:2px;">${escapeHtml(data.titre)}</p>
          <p style="font-size:10px;margin:0;color:#333;">${contactInfo}</p>
        </div>
      </div>
      ${profilSection}${speSection}${expSection}${pedSection}${formSection}${certSection}${compSection}${langSection}${pubSection}
    </div>`;
  }

  if (design === "serif_pro") {
    const ff = fontOverride || "Georgia,'Times New Roman',serif";
    return `<div style="font-family:${ff};color:#1f2937;font-size:12px;line-height:1.6;background:#fff;padding:42px 50px;">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;border-bottom:1px solid #d1d5db;padding-bottom:14px;margin-bottom:20px;">
        <div>
          <h1 style="font-size:30px;margin:0;font-weight:400;color:#111827;">${escapeHtml(fullName)}</h1>
          <p style="font-size:13px;color:${accent};margin:4px 0 0 0;font-style:italic;">${escapeHtml(data.titre)}</p>
        </div>
        <p style="font-size:10.5px;color:#6b7280;margin:0;text-align:right;line-height:1.5;">${[data.email, data.telephone, data.adresse].filter(Boolean).map(escapeHtml).join("<br>")}</p>
      </div>
      ${profilSection}${speSection}${expSection}${pedSection}${formSection}${certSection}${compSection}${langSection}${pubSection}
    </div>`;
  }

  if (design === "nordique") {
    const ff = fontOverride || "'Segoe UI',Arial,sans-serif";
    return `<div style="font-family:${ff};color:#16303b;font-size:12px;line-height:1.55;background:#f8fafc;display:grid;grid-template-columns:245px 1fr;min-height:1050px;">
      <aside style="background:#e6f1f4;padding:34px 24px;border-top:10px solid ${accent};">
        ${photoBlock(data.photoUrl, 112, false)}
        <h1 style="font-size:25px;line-height:1.12;margin:0 0 8px 0;color:#0f3d4d;">${escapeHtml(fullName)}</h1>
        <p style="font-size:12px;color:${accent};margin:0 0 22px 0;font-weight:600;">${escapeHtml(data.titre)}</p>
        <div style="font-size:10.5px;line-height:1.7;border-top:1px solid #b7d2da;padding-top:14px;margin-bottom:8px;">${[data.email, data.telephone, data.adresse].filter(Boolean).map(escapeHtml).join("<br>")}</div>
        ${compSection}${langSection}${certSection}
      </aside>
      <main style="padding:38px 32px;background:#fff;">
        ${profilSection}${speSection}${expSection}${pedSection}${formSection}${pubSection}
      </main>
    </div>`;
  }

  if (design === "atelier") {
    const ff = fontOverride || "Georgia,'Times New Roman',serif";
    return `<div style="font-family:${ff};color:#342b25;font-size:12px;line-height:1.6;background:#fffdf8;padding:34px 38px;border-top:9px solid ${accent};">
      <header style="display:flex;align-items:center;gap:22px;padding-bottom:20px;border-bottom:1px solid #d8cbbd;">
        ${photoBlock(data.photoUrl, 92, false)}
        <div style="flex:1;">
          <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin:0 0 7px 0;">Curriculum vitae</p>
          <h1 style="font-size:32px;font-weight:400;margin:0;color:#3b2f28;">${escapeHtml(fullName)}</h1>
          <p style="font-size:14px;margin:3px 0 7px 0;color:${accent};font-style:italic;">${escapeHtml(data.titre)}</p>
          <p style="font-family:Arial,sans-serif;font-size:10px;color:#75675d;margin:0;">${contactInfo}</p>
        </div>
      </header>
      <div style="display:grid;grid-template-columns:1.8fr 1fr;gap:30px;margin-top:4px;">
        <main>${profilSection}${expSection}${pedSection}${pubSection}</main>
        <aside style="border-left:1px solid #e3d8ca;padding-left:22px;">${speSection}${formSection}${certSection}${compSection}${langSection}</aside>
      </div>
    </div>`;
  }

  if (design === "impact") {
    const ff = fontOverride || "'Arial Narrow','Segoe UI',Arial,sans-serif";
    return `<div style="font-family:${ff};color:#202428;font-size:12px;line-height:1.5;background:#fff;">
      <header style="background:#20262b;color:#fff;padding:32px 36px;border-left:12px solid ${accent};display:flex;align-items:center;gap:24px;">
        ${photoBlock(data.photoUrl, 96, false)}
        <div style="flex:1;">
          <h1 style="font-size:38px;line-height:1;margin:0;text-transform:uppercase;letter-spacing:-1px;">${escapeHtml(fullName)}</h1>
          <p style="font-size:15px;color:#ffb48c;margin:9px 0 6px 0;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(data.titre)}</p>
          <p style="font-size:10.5px;color:#d7dde1;margin:0;">${contactInfo}</p>
        </div>
      </header>
      <div style="padding:24px 34px;display:grid;grid-template-columns:1.75fr 1fr;gap:28px;">
        <main>${profilSection}${expSection}${pedSection}${pubSection}</main>
        <aside style="background:#f4f1ee;padding:4px 18px 18px 18px;">${speSection}${compSection}${formSection}${certSection}${langSection}</aside>
      </div>
    </div>`;
  }

  if (design === "botanique") {
    const ff = fontOverride || "Georgia,'Times New Roman',serif";
    return `<div style="font-family:${ff};color:#293127;font-size:12px;line-height:1.6;background:#fbfcf7;padding:34px 38px;">
      <header style="position:relative;padding:0 0 20px 24px;border-left:3px solid ${accent};border-bottom:1px solid #cbd5c0;display:flex;align-items:center;gap:20px;">
        ${photoBlock(data.photoUrl, 92, true)}
        <div style="flex:1;">
          <h1 style="font-size:31px;font-weight:400;margin:0;color:#314224;">${escapeHtml(fullName)}</h1>
          <p style="font-size:14px;color:${accent};margin:4px 0;font-style:italic;">${escapeHtml(data.titre)}</p>
          <p style="font-family:Arial,sans-serif;font-size:10px;color:#687362;margin:0;">${contactInfo}</p>
        </div>
      </header>
      <div style="display:grid;grid-template-columns:1fr 1.75fr;gap:32px;">
        <aside>${speSection}${compSection}${langSection}${certSection}${formSection}</aside>
        <main>${profilSection}${expSection}${pedSection}${pubSection}</main>
      </div>
    </div>`;
  }

  if (design === "compact") {
    const ff = fontOverride || "'Segoe UI',Arial,sans-serif";
    return `<div style="font-family:${ff};color:#252b32;font-size:11px;line-height:1.42;background:#fff;padding:26px 30px;">
      <header style="display:flex;align-items:center;gap:16px;border-bottom:4px solid ${accent};padding-bottom:12px;">
        ${photoBlock(data.photoUrl, 72, false)}
        <div style="flex:1;">
          <h1 style="font-size:26px;margin:0;color:#1e293b;letter-spacing:-0.4px;">${escapeHtml(fullName)}</h1>
          <p style="font-size:12px;margin:2px 0;color:${accent};font-weight:600;">${escapeHtml(data.titre)}</p>
        </div>
        <p style="font-size:9.5px;text-align:right;color:#64748b;margin:0;line-height:1.55;">${[data.email, data.telephone, data.adresse].filter(Boolean).map(escapeHtml).join("<br>")}</p>
      </header>
      <div style="display:grid;grid-template-columns:1.65fr 1fr;gap:24px;">
        <main>${profilSection}${expSection}${pedSection}${pubSection}</main>
        <aside>${speSection}${compSection}${formSection}${certSection}${langSection}</aside>
      </div>
    </div>`;
  }

  if (design === "ardoise") {
    const ff = fontOverride || "'Segoe UI',Arial,sans-serif";
    const light = (h: string) => h.replace(/color:[^;"]+;/g, "color:#e2e8f0;").split(`border-bottom:2px solid ${accent}`).join("border-bottom:1px solid #475569");
    return `<div style="font-family:${ff};color:#1e293b;font-size:12px;line-height:1.55;display:grid;grid-template-columns:250px 1fr;min-height:1050px;">
      <aside style="background:#1e293b;color:#e2e8f0;padding:34px 22px;">
        ${photoBlock(data.photoUrl, 110, true)}
        <h1 style="font-size:24px;line-height:1.15;margin:14px 0 6px 0;color:#fff;">${escapeHtml(fullName)}</h1>
        <p style="font-size:12px;color:${accent};margin:0 0 18px 0;font-weight:600;">${escapeHtml(data.titre)}</p>
        <div style="font-size:10.5px;line-height:1.8;color:#cbd5e1;">${[data.email, data.telephone, data.adresse].filter(Boolean).map(escapeHtml).join("<br>")}</div>
        ${light(compSection)}${light(langSection)}${light(certSection)}
      </aside>
      <main style="padding:36px 30px;">${profilSection}${speSection}${expSection}${pedSection}${formSection}${pubSection}</main>
    </div>`;
  }

  if (design === "lavande") {
    const ff = fontOverride || "'Segoe UI',Arial,sans-serif";
    const card = (h: string) => h ? `<div style="background:#fff;border:1px solid #e9e3f7;border-radius:12px;padding:2px 16px 12px 16px;margin-bottom:12px;">${h}</div>` : "";
    return `<div style="font-family:${ff};color:#2e2640;font-size:12px;line-height:1.55;background:#f6f3fc;padding:30px 32px;">
      <header style="display:flex;align-items:center;gap:20px;background:#fff;border-radius:14px;padding:20px 22px;margin-bottom:14px;border-left:6px solid ${accent};">
        ${photoBlock(data.photoUrl, 86, true)}
        <div style="flex:1;"><h1 style="font-size:28px;margin:0;color:#2e1065;">${escapeHtml(fullName)}</h1>
        <p style="font-size:13px;color:${accent};margin:3px 0 5px 0;font-weight:600;">${escapeHtml(data.titre)}</p>
        <p style="font-size:10.5px;color:#6b6280;margin:0;">${contactInfo}</p></div>
      </header>
      <div style="display:grid;grid-template-columns:1.7fr 1fr;gap:14px;">
        <main>${card(profilSection)}${card(expSection)}${card(pedSection)}${card(pubSection)}</main>
        <aside>${card(speSection)}${card(compSection)}${card(formSection)}${card(certSection)}${card(langSection)}</aside>
      </div>
    </div>`;
  }

  if (design === "ocean") {
    const ff = fontOverride || "'Segoe UI',Arial,sans-serif";
    return `<div style="font-family:${ff};color:#0f2a35;font-size:12px;line-height:1.55;background:#fff;">
      <header style="background:linear-gradient(120deg,#0c4a6e,${accent});color:#fff;padding:34px 36px 40px 36px;display:flex;align-items:center;gap:22px;">
        ${photoBlock(data.photoUrl, 96, true)}
        <div style="flex:1;"><h1 style="font-size:32px;margin:0;font-weight:300;letter-spacing:0.5px;">${escapeHtml(fullName)}</h1>
        <p style="font-size:14px;margin:4px 0 8px 0;font-weight:600;color:#cffafe;">${escapeHtml(data.titre)}</p>
        <p style="font-size:10.5px;margin:0;color:#e0f2fe;">${contactInfo}</p></div>
      </header>
      <div style="padding:10px 36px 28px 36px;display:grid;grid-template-columns:1.75fr 1fr;gap:28px;">
        <main>${profilSection}${expSection}${pedSection}${pubSection}</main>
        <aside style="border-left:2px solid #e0f2f7;padding-left:20px;">${speSection}${compSection}${formSection}${certSection}${langSection}</aside>
      </div>
    </div>`;
  }

  if (design === "prestige") {
    const ff = fontOverride || "Georgia,'Times New Roman',serif";
    return `<div style="font-family:${ff};color:#1c1917;font-size:12px;line-height:1.6;background:#fff;">
      <header style="background:#111;color:#fff;text-align:center;padding:34px 40px 26px 40px;border-bottom:4px solid ${accent};">
        ${data.photoUrl ? `<div style="display:flex;justify-content:center;margin-bottom:12px;">${photoBlock(data.photoUrl, 90, true)}</div>` : ""}
        <h1 style="font-size:30px;margin:0;font-weight:400;letter-spacing:5px;text-transform:uppercase;">${escapeHtml(fullName)}</h1>
        <p style="font-size:12px;color:#e7c46a;margin:8px 0;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(data.titre)}</p>
        <p style="font-size:10.5px;color:#d6d3d1;margin:0;font-family:Arial,sans-serif;">${contactInfo}</p>
      </header>
      <div style="padding:14px 42px 30px 42px;display:grid;grid-template-columns:1.7fr 1fr;gap:30px;">
        <main>${profilSection}${expSection}${pedSection}${pubSection}</main>
        <aside>${speSection}${compSection}${formSection}${certSection}${langSection}</aside>
      </div>
    </div>`;
  }

  if (design === "epure") {
    const ff = fontOverride || "'Helvetica Neue',Helvetica,Arial,sans-serif";
    const row = (label: string, body: string) => body ? `<div style="display:grid;grid-template-columns:130px 1fr;gap:22px;border-top:1px solid #e5e7eb;padding:14px 0;break-inside:avoid;"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${accent};">${label}</div><div>${body}</div></div>` : "";
    const expRows = exps.map(e => `<div style="margin-bottom:12px;break-inside:avoid;"><div style="display:flex;justify-content:space-between;gap:12px;"><strong>${escapeHtml(e.poste)}${e.entreprise ? ` <span style="font-weight:400;color:#555;">— ${escapeHtml(e.entreprise)}</span>` : ""}</strong><span style="font-size:10.5px;color:#888;white-space:nowrap;">${escapeHtml(e.dateDebut || "")}${e.dateDebut ? (e.dateFin ? ` – ${escapeHtml(e.dateFin)}` : " – Présent") : ""}</span></div>${e.description ? `<p style="margin:4px 0 0 0;color:#444;">${escapeHtml(e.description)}</p>` : ""}</div>`).join("");
    return `<div style="font-family:${ff};color:#1f2937;font-size:11.5px;line-height:1.55;background:#fff;padding:42px 48px;">
      <header style="display:flex;align-items:center;gap:20px;margin-bottom:20px;">
        ${photoBlock(data.photoUrl, 80, true)}
        <div style="flex:1;"><h1 style="font-size:34px;margin:0;font-weight:300;letter-spacing:-0.5px;color:#111;">${escapeHtml(fullName)}</h1>
        <p style="font-size:13px;margin:4px 0;color:${accent};">${escapeHtml(data.titre)}</p>
        <p style="font-size:10.5px;color:#888;margin:0;">${contactInfo}</p></div>
      </header>
      ${row("Profil", data.profil ? escapeHtml(data.profil) : "")}
      ${row("Spécialités", data.specialites ? escapeHtml(data.specialites) : "")}
      ${row("Expérience", expRows)}
      ${row("Pédagogie", data.experiencePedagogique ? escapeHtml(data.experiencePedagogique) : "")}
      ${row("Formation", forms.map(f => `<div style="margin-bottom:4px;"><strong>${escapeHtml(f.diplome)}</strong>${f.etablissement ? ` — ${escapeHtml(f.etablissement)}` : ""}${f.annee ? ` <span style="color:#888;">(${escapeHtml(f.annee)})</span>` : ""}</div>`).join(""))}
      ${row("Compétences", comps.map(c => `<span style="display:inline-block;border:1px solid #d1d5db;border-radius:999px;padding:2px 10px;margin:0 6px 6px 0;font-size:10.5px;">${escapeHtml(c.nom)}</span>`).join(""))}
      ${row("Certifications", certs.map(c => `<div>${escapeHtml(c.nom)}${c.annee ? ` (${escapeHtml(c.annee)})` : ""}</div>`).join(""))}
      ${row("Langues", langs.map(l => `<div>${escapeHtml(l.langue)} — <em>${escapeHtml(l.niveau)}</em></div>`).join(""))}
      ${row("Publications", data.publications ? `<div style="white-space:pre-wrap;">${escapeHtml(data.publications)}</div>` : "")}
    </div>`;
  }

  let header = "";
  if (design === "classique") {
    header = `<div style="text-align:center;border-bottom:3px solid ${accent};padding-bottom:15px;margin-bottom:15px;">
      ${photoBlock(data.photoUrl, 90, true) ? `<div style="display:flex;justify-content:center;margin-bottom:10px;">${photoBlock(data.photoUrl, 90, true)}</div>` : ""}
      <h1 style="font-size:26px;color:${accent};margin:0;">${escapeHtml(fullName)}</h1>
      <p style="font-size:14px;color:#555;margin:4px 0;">${escapeHtml(data.titre)}</p>
      <p style="font-size:11px;color:#888;margin:4px 0;">${contactInfo}</p>
    </div>`;
  } else if (design === "moderne") {
    header = `<div style="display:flex;align-items:center;gap:20px;border-bottom:2px solid ${accent};padding-bottom:15px;margin-bottom:15px;">
      ${photoBlock(data.photoUrl, 80, false)}
      <div>
        <h1 style="font-size:28px;margin:0;color:#111;">${escapeHtml(fullName)}</h1>
        <p style="font-size:15px;color:${accent};margin:2px 0;font-weight:600;">${escapeHtml(data.titre)}</p>
        <p style="font-size:11px;color:#888;">${contactInfo}</p>
      </div>
    </div>`;
  } else if (design === "minimaliste") {
    header = `<div style="margin-bottom:20px;">
      <h1 style="font-size:30px;font-weight:300;margin:0;letter-spacing:2px;color:#111;">${escapeHtml(fullName)}</h1>
      <p style="font-size:13px;color:#666;margin:4px 0;letter-spacing:1px;">${escapeHtml(data.titre)}</p>
      <p style="font-size:11px;color:#999;margin:4px 0;">${contactInfo}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin-top:15px;" />
    </div>`;
  } else if (design === "elegant") {
    header = `<div style="text-align:center;margin-bottom:20px;">
      ${photoBlock(data.photoUrl, 100, true) ? `<div style="display:flex;justify-content:center;margin-bottom:10px;">${photoBlock(data.photoUrl, 100, true)}</div>` : ""}
      <h1 style="font-size:28px;color:${accent};margin:0;font-family:Georgia,serif;">${escapeHtml(fullName)}</h1>
      <p style="font-size:14px;color:#666;font-style:italic;margin:4px 0;">${escapeHtml(data.titre)}</p>
      <p style="font-size:11px;color:#999;margin:4px 0;">${contactInfo}</p>
      <div style="width:60px;height:2px;background:${accent};margin:12px auto;"></div>
    </div>`;
  } else if (design === "colore") {
    header = `<div style="background:${accent};color:#fff;padding:25px 30px;margin:-30px -30px 20px -30px;display:flex;align-items:center;gap:20px;">
      ${photoBlock(data.photoUrl, 90, true)}
      <div>
        <h1 style="font-size:26px;margin:0;color:#fff;">${escapeHtml(fullName)}</h1>
        <p style="font-size:14px;margin:4px 0;opacity:0.9;">${escapeHtml(data.titre)}</p>
        <p style="font-size:11px;opacity:0.8;">${contactInfo}</p>
      </div>
    </div>`;
  }

  const fontFamily = fontOverride || (design === "elegant" ? "Georgia,'Times New Roman',serif" : "'Segoe UI',Arial,sans-serif");
  const baseStyle = `font-family:${fontFamily};color:#222;font-size:12px;line-height:1.5;`;

  // Return header + each section as separate top-level divs for proper PDF pagination
  return `<div style="${baseStyle}padding:30px 30px 0 30px;">${header}</div>
    <div style="${baseStyle}padding:0 30px;">${profilSection}</div>
    <div style="${baseStyle}padding:0 30px;">${speSection}</div>
    <div style="${baseStyle}padding:0 30px;">${expSection}</div>
    <div style="${baseStyle}padding:0 30px;">${pedSection}</div>
    <div style="${baseStyle}padding:0 30px;">${formSection}</div>
    <div style="${baseStyle}padding:0 30px;">${certSection}</div>
    <div style="${baseStyle}padding:0 30px;">${compSection}</div>
    <div style="${baseStyle}padding:0 30px;">${langSection}</div>
    <div style="${baseStyle}padding:0 30px 30px 30px;">${pubSection}</div>`;
}
