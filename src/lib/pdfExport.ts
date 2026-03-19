/**
 * PDF export with stable page-by-page rendering.
 * - Footer pinned at the bottom of every page
 * - Block-based pagination to avoid ugly mid-section cuts
 */
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const A4_WIDTH_PX = 794; // 210mm @ 96dpi
const A4_HEIGHT_PX = 1123; // 297mm @ 96dpi
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const FOOTER_OFFSET_PX = 40;
const FOOTER_BUFFER_PX = 20;

type PageParts = {
  page: HTMLDivElement;
  content: HTMLDivElement;
};

function extractCssAndBody(htmlContent: string): { cssText: string; bodyContent: string } {
  const styleMatches = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

  let cssText = "";
  for (const styleTag of styleMatches) {
    const innerCSS = styleTag.replace(/<\/?style[^>]*>/gi, "");
    cssText += innerCSS
      .replace(/\bbody\b\s*\{/g, ".pdf-root {")
      .replace(/@import\s+url\([^)]+\)\s*;?/g, "")
      + "\n";
  }

  cssText += `
    .pdf-root, .pdf-root * {
      letter-spacing: normal !important;
      word-spacing: normal !important;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }
    .pdf-page {
      width: ${A4_WIDTH_PX}px;
      height: ${A4_HEIGHT_PX}px;
      position: relative;
      overflow: hidden;
      background: #fff;
    }
  `;

  return { cssText, bodyContent };
}

async function ensureGoogleFontsLoaded(htmlContent: string): Promise<void> {
  const match = htmlContent.match(/url\(['"]?(https:\/\/fonts\.googleapis\.com[^'")\s]+)['"]?\)/);
  if (!match) return;

  const href = match[1];
  const alreadyPresent = document.querySelector(`link[href=\"${href}\"]`) || document.querySelector("link[href*='fonts.googleapis.com']");

  if (!alreadyPresent) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  if ("fonts" in document) {
    try {
      await (document as Document & { fonts: FontFaceSet }).fonts.ready;
    } catch {
      // fallback below
    }
  }

  await new Promise((r) => setTimeout(r, 250));
}

function isForcedPageBreak(node: ChildNode): boolean {
  if (!(node instanceof HTMLElement)) return false;
  const className = node.className?.toString() || "";
  const inlineStyle = (node.getAttribute("style") || "").toLowerCase();

  return (
    className.includes("page-break") ||
    inlineStyle.includes("page-break-after:always") ||
    inlineStyle.includes("break-after: page") ||
    inlineStyle.includes("break-before: page")
  );
}

function createPage(host: HTMLDivElement, footerHtml: string, footerHeightPx: number): PageParts {
  const page = document.createElement("div");
  page.className = "pdf-page";

  const content = document.createElement("div");
  content.className = "pdf-root";
  content.style.cssText = [
    "position:absolute",
    "left:0",
    "top:0",
    `width:${A4_WIDTH_PX}px`,
    `height:${A4_HEIGHT_PX - footerHeightPx - FOOTER_OFFSET_PX - 8}px`,
    "overflow:hidden",
    "background:#fff",
  ].join(";");

  page.appendChild(content);

  if (footerHeightPx > 0 && footerHtml) {
    const footer = document.createElement("div");
    footer.className = "";
    footer.style.cssText = [
      "position:absolute",
      "left:0",
      `bottom:${FOOTER_OFFSET_PX}px`,
      `width:${A4_WIDTH_PX}px`,
      `height:${footerHeightPx}px`,
      "overflow:visible",
      "background:#fff",
    ].join(";");
    footer.innerHTML = footerHtml;
    page.appendChild(footer);
  }

  host.appendChild(page);
  return { page, content };
}

function measureFooterHeight(host: HTMLDivElement, footerHtml: string): number {
  if (!footerHtml) return 0;

  const measure = document.createElement("div");
  measure.className = "pdf-root";
  measure.style.cssText = `width:${A4_WIDTH_PX}px;background:#fff;position:absolute;left:0;top:0;`;
  measure.innerHTML = footerHtml;
  host.appendChild(measure);

  const raw = Math.ceil(measure.scrollHeight);
  host.removeChild(measure);

  // extra safety buffer to avoid clipping the final footer line in PDFs
  return Math.max(96, Math.min(220, raw + FOOTER_BUFFER_PX));
}

function getRenderableNodes(source: HTMLDivElement): ChildNode[] {
  return Array.from(source.childNodes).filter((node) => {
    if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent?.trim());
    return true;
  });
}

export async function htmlToPdfBlob(htmlContent: string): Promise<Blob> {
  const { cssText, bodyContent } = extractCssAndBody(htmlContent);
  await ensureGoogleFontsLoaded(htmlContent);

  const host = document.createElement("div");
  host.style.cssText = [
    "position:fixed",
    "left:-20000px",
    "top:0",
    `width:${A4_WIDTH_PX}px`,
    "z-index:-1",
    "background:#fff",
  ].join(";");

  const styleEl = document.createElement("style");
  styleEl.textContent = cssText;
  host.appendChild(styleEl);

  const source = document.createElement("div");
  source.className = "pdf-root";
  source.style.cssText = `width:${A4_WIDTH_PX}px;background:#fff;`;
  source.innerHTML = bodyContent;

  // Extract original footer and repeat it on each generated page (always bottom)
  const footerEl = source.querySelector(".footer");
  const footerHtml = footerEl ? footerEl.outerHTML : "";
  if (footerEl) footerEl.remove();

  document.body.appendChild(host);

  try {
    const footerHeightPx = measureFooterHeight(host, footerHtml);
    const nodes = getRenderableNodes(source);

    const pages: HTMLDivElement[] = [];
    let current = createPage(host, footerHtml, footerHeightPx);
    pages.push(current.page);

    for (const node of nodes) {
      if (isForcedPageBreak(node)) {
        current = createPage(host, footerHtml, footerHeightPx);
        pages.push(current.page);
        continue;
      }

      // Special handling for tables: split row by row, repeat thead
      if (node instanceof HTMLElement && node.tagName === "TABLE") {
        const thead = node.querySelector("thead");
        const rows = Array.from(node.querySelectorAll("tbody tr, tr")).filter(
          (tr) => !tr.closest("thead")
        );

        // Helper to create a new table shell with thead clone
        const createTableShell = (): HTMLTableElement => {
          const tbl = document.createElement("table");
          // Copy attributes & styles from original table
          for (const attr of Array.from(node.attributes)) {
            tbl.setAttribute(attr.name, attr.value);
          }
          tbl.style.cssText = node.style.cssText;
          if (thead) tbl.appendChild(thead.cloneNode(true) as HTMLElement);
          const tbody = document.createElement("tbody");
          tbl.appendChild(tbody);
          return tbl;
        };

        let currentTable = createTableShell();
        current.content.appendChild(currentTable);

        for (const row of rows) {
          const tbody = currentTable.querySelector("tbody") || currentTable;
          const rowClone = row.cloneNode(true) as HTMLElement;
          tbody.appendChild(rowClone);

          // Check overflow after adding the row
          if (current.content.scrollHeight > current.content.clientHeight + 1) {
            tbody.removeChild(rowClone);
            // Start new page with a fresh table (with thead)
            current = createPage(host, footerHtml, footerHeightPx);
            pages.push(current.page);
            currentTable = createTableShell();
            current.content.appendChild(currentTable);
            const newTbody = currentTable.querySelector("tbody") || currentTable;
            newTbody.appendChild(rowClone);
          }
        }
        continue;
      }

      const clone = node.cloneNode(true);
      current.content.appendChild(clone);

      // If current block overflows, move the whole block to next page
      if (current.content.scrollHeight > current.content.clientHeight + 1) {
        current.content.removeChild(clone);
        current = createPage(host, footerHtml, footerHeightPx);
        pages.push(current.page);
        current.content.appendChild(clone);
      }
    }

    // Keep a single empty page if nothing was added
    if (pages.length === 0) {
      pages.push(createPage(host, footerHtml, footerHeightPx).page);
    }

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pxToMm = A4_WIDTH_MM / A4_WIDTH_PX;

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) pdf.addPage();

      const canvas = await html2canvas(pages[i], {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
        windowWidth: A4_WIDTH_PX,
        windowHeight: A4_HEIGHT_PX,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      pdf.addImage(imgData, "JPEG", 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);

      // Add clickable link annotations over the rasterized image
      const anchors = pages[i].querySelectorAll("a[href]");
      const pageRect = pages[i].getBoundingClientRect();
      anchors.forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (!href || !href.startsWith("http")) return;
        const rect = anchor.getBoundingClientRect();
        const x = (rect.left - pageRect.left) * pxToMm;
        const y = (rect.top - pageRect.top) * pxToMm;
        const w = rect.width * pxToMm;
        const h = rect.height * pxToMm;
        if (w > 0 && h > 0) {
          pdf.link(x, y, w, h, { url: href });
        }
      });
    }

    return pdf.output("blob");
  } finally {
    document.body.removeChild(host);
  }
}

export async function downloadAsPdf(htmlContent: string, filename: string) {
  const blob = await htmlToPdfBlob(htmlContent);
  const cleanName = filename.replace(/\.(doc|docx|pdf)$/i, "");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${cleanName}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
