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

export type CVDesign = "classique" | "moderne" | "minimaliste" | "elegant" | "colore" | "sidebar" | "timeline" | "magazine" | "corporate" | "executive" | "swiss" | "harvard" | "consulting" | "monochrome" | "serif_pro";

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
  return `<div style="background:#e5e7eb;border-radius:4px;height:8px;width:100%;margin-top:4px;"><div style="background:${accent};height:100%;border-radius:4px;width:${level * 20}%"></div></div>`;
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
  return `<div style="margin-bottom:10px;"><strong>${escapeHtml(exp.poste)}</strong>${exp.entreprise ? ` — ${escapeHtml(exp.entreprise)}` : ""}${exp.dateDebut ? `<br><span style="color:#666;font-size:11px;">${exp.dateDebut}${exp.dateFin ? ` – ${exp.dateFin}` : " – Présent"}</span>` : ""}${exp.description ? `<p style="margin:4px 0 0 0;font-size:12px;color:#444;">${escapeHtml(exp.description)}</p>` : ""}</div>`;
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
  const compSection = comps.length ? `${sectionTitle("Compétences", accent, secStyle)}${comps.map(c => `<div style="margin-bottom:6px;"><span style="font-size:12px;">${escapeHtml(c.nom)}</span>${skillBar(c.niveau, accent, design === "minimaliste" ? "line" : design === "elegant" ? "dots" : "bar")}</div>`).join("")}` : "";
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
