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

/** Parse optional <meta name="pdf-page-size" content="WIDTHxHEIGHT"> (mm) from HTML */
function detectPageSizeMm(htmlContent: string): { wMm: number; hMm: number } | null {
  const m = htmlContent.match(/<meta\s+name=["']pdf-page-size["']\s+content=["'](\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)["']/i);
  if (!m) return null;
  const wMm = parseFloat(m[1]);
  const hMm = parseFloat(m[2]);
  if (wMm > 0 && hMm > 0) return { wMm, hMm };
  return null;
}

type PageParts = {
  page: HTMLDivElement;
  content: HTMLDivElement;
};

type PdfExportOptions = {
  scale?: number;
  imageQuality?: number;
  pageYieldMs?: number;
};

const loadedGoogleFontHrefs = new Set<string>();

function yieldToBrowser(ms = 0): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, ms)));
}

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
  const alreadyPresent = document.querySelector(`link[href="${href}"]`);
  const firstLoad = !loadedGoogleFontHrefs.has(href);

  if (!alreadyPresent) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  if (!firstLoad && alreadyPresent) return;

  loadedGoogleFontHrefs.add(href);

  if ("fonts" in document) {
    try {
      await (document as Document & { fonts: FontFaceSet }).fonts.ready;
    } catch {
      // fallback below
    }
  }

  await yieldToBrowser(120);
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

function createPage(host: HTMLDivElement, footerHtml: string, footerHeightPx: number, pageWPx = A4_WIDTH_PX, pageHPx = A4_HEIGHT_PX): PageParts {
  const page = document.createElement("div");
  page.className = "pdf-page";
  page.style.cssText = `width:${pageWPx}px;height:${pageHPx}px;position:relative;overflow:hidden;background:#fff;`;

  const content = document.createElement("div");
  content.className = "pdf-root";
  content.style.cssText = [
    "position:absolute",
    "left:0",
    "top:0",
    `width:${pageWPx}px`,
    `height:${pageHPx - footerHeightPx - FOOTER_OFFSET_PX - 8}px`,
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
      `width:${pageWPx}px`,
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

function measureFooterHeight(host: HTMLDivElement, footerHtml: string, pageWPx = A4_WIDTH_PX): number {
  if (!footerHtml) return 0;

  const measure = document.createElement("div");
  measure.className = "pdf-root";
  measure.style.cssText = `width:${pageWPx}px;background:#fff;position:absolute;left:0;top:0;`;
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

export async function htmlToPdfBlob(htmlContent: string, options: PdfExportOptions = {}): Promise<Blob> {
  const {
    scale = 2,
    imageQuality = 0.95,
    pageYieldMs = 0,
  } = options;

  // Detect custom page size from meta tag, fallback to A4
  const customSize = detectPageSizeMm(htmlContent);
  const PAGE_W_MM = customSize?.wMm ?? A4_WIDTH_MM;
  const PAGE_H_MM = customSize?.hMm ?? A4_HEIGHT_MM;
  const PAGE_W_PX = Math.round(PAGE_W_MM * 96 / 25.4);
  const PAGE_H_PX = Math.round(PAGE_H_MM * 96 / 25.4);

  const { cssText: rawCss, bodyContent } = extractCssAndBody(htmlContent);
  // Override page dimensions in injected CSS
  const cssText = rawCss
    .replace(new RegExp(`${A4_WIDTH_PX}px`, "g"), `${PAGE_W_PX}px`)
    .replace(new RegExp(`${A4_HEIGHT_PX}px`, "g"), `${PAGE_H_PX}px`);
  await ensureGoogleFontsLoaded(htmlContent);

  const host = document.createElement("div");
  host.style.cssText = [
    "position:absolute",
    "left:-99999px",
    "top:-99999px",
    `width:${PAGE_W_PX}px`,
    "z-index:-9999",
    "background:#fff",
    "pointer-events:none",
    "contain:strict",
  ].join(";");

  const styleEl = document.createElement("style");
  styleEl.textContent = cssText;
  host.appendChild(styleEl);

  const source = document.createElement("div");
  source.className = "pdf-root";
  source.style.cssText = `width:${PAGE_W_PX}px;background:#fff;`;
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

    const pdf = new jsPDF({ unit: "mm", format: [PAGE_W_MM, PAGE_H_MM], orientation: "portrait" });
    const pxToMm = PAGE_W_MM / PAGE_W_PX;

    for (let i = 0; i < pages.length; i++) {
      if (pageYieldMs > 0) {
        await yieldToBrowser(pageYieldMs);
      }

      if (i > 0) pdf.addPage();

      const canvas = await html2canvas(pages[i], {
        scale,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: PAGE_W_PX,
        height: PAGE_H_PX,
        windowWidth: PAGE_W_PX,
        windowHeight: PAGE_H_PX,
      });

      const imgData = canvas.toDataURL("image/jpeg", imageQuality);
      pdf.addImage(imgData, "JPEG", 0, 0, PAGE_W_MM, PAGE_H_MM);

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

      // Aggressive canvas cleanup to free GPU/CPU memory
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 1;
      canvas.height = 1;
      canvas.width = 0;
      canvas.height = 0;

      // Remove rendered page from DOM immediately to free memory
      if (pages[i].parentNode) {
        pages[i].parentNode.removeChild(pages[i]);
      }
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
