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

export type CVDesign = "classique" | "moderne" | "minimaliste" | "elegant" | "colore" | "sidebar" | "timeline" | "magazine" | "corporate";

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
];

// ===== HTML Generators =====
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
  const exps = data.experiences.filter(e => e.poste || e.entreprise);
  const forms = data.formations.filter(f => f.diplome || f.etablissement);
  const comps = data.competences.filter(c => c.nom);
  const langs = data.langues.filter(l => l.langue);
  const certs = data.certifications.filter(c => c.nom);

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
