/**
 * Word export using @turbodocx/html-to-docx for native .docx format
 * Falls back to .doc HTML format if the library fails
 */

/**
 * Convert HTML to .docx Blob using TurboDocx (lazy-loaded)
 */
/**
 * html-to-docx n'embarque les images que si la balise <img> porte des attributs
 * width/height explicites. Sans ça, les tampons et signatures (data URI)
 * disparaissent du .docx (donc du Drive). On les ajoute à partir du style.
 */
function normalizeImagesForDocx(html: string): string {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\swidth\s*=/.test(tag) && /\sheight\s*=/.test(tag)) return tag;
    const maxW = tag.match(/max-width\s*:\s*(\d+(?:\.\d+)?)px/i);
    const maxH = tag.match(/max-height\s*:\s*(\d+(?:\.\d+)?)px/i);
    const w = Math.round(parseFloat(maxW?.[1] || "180"));
    const h = Math.round(parseFloat(maxH?.[1] || "70"));
    return tag.replace(/\s*\/?>$/, ` width="${w}" height="${h}" />`);
  });
}

async function htmlToDocxBlob(htmlContent: string): Promise<Blob> {
  const { default: HTMLtoDOCX } = await import("@turbodocx/html-to-docx");

  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = normalizeImagesForDocx(bodyMatch?.[1] || htmlContent);

  const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  const styles = styleMatch ? styleMatch.join("\n") : "";

  const htmlForDocx = `<!DOCTYPE html><html><head><meta charset="utf-8">${styles}</head><body>${bodyContent}</body></html>`;


  const result = await HTMLtoDOCX(htmlForDocx, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
    font: "Calibri",
    fontSize: 22,
    margins: { top: 1134, right: 1134, bottom: 1134, left: 1134 },
  });

  if (result instanceof Blob) return result;
  return new Blob([result], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}

/**
 * Fallback: HTML-based .doc format
 */
function htmlToDocBlobFallback(htmlContent: string): Blob {
  const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const headContent = headMatch?.[1] || "";
  const bodyContent = bodyMatch?.[1] || htmlContent;

  const wordDocument = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->
      ${headContent}
      <style>@page{size:A4;margin:2cm}@page Section1{mso-page-orientation:portrait;margin:2cm}div.Section1{page:Section1}</style>
    </head>
    <body><div class="Section1">${bodyContent}</div></body>
    </html>`;

  return new Blob(["\ufeff", wordDocument], { type: "application/msword" });
}

/**
 * Convert HTML to Word blob - tries .docx first, falls back to .doc
 */
export async function htmlToWordBlob(htmlContent: string): Promise<Blob> {
  try {
    return await htmlToDocxBlob(htmlContent);
  } catch (err) {
    console.warn("DOCX generation failed, falling back to .doc format:", err);
    return htmlToDocBlobFallback(htmlContent);
  }
}

/**
 * Synchronous .doc fallback (for ZIP generation where we need sync)
 */
export function htmlToWordBlobSync(htmlContent: string): Blob {
  return htmlToDocBlobFallback(htmlContent);
}

export async function downloadAsWord(htmlContent: string, filename: string) {
  const blob = await htmlToWordBlob(htmlContent);
  const isDocx = blob.type.includes("officedocument");
  const ext = isDocx ? ".docx" : ".doc";
  const cleanName = filename.replace(/\.(doc|docx)$/i, "");
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${cleanName}${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
