/**
 * PDF export with stable page-by-page rendering.
 * - Footer pinned at the bottom of every page
 * - Block-based pagination to avoid ugly mid-section cuts
 */
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ceder } from "@/lib/arrierePlan";

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

export type PdfExportOptions = {
  scale?: number;
  imageQuality?: number;
  pageYieldMs?: number;
  keepTablesTogether?: boolean;
};

export type PdfQuality = "standard" | "high" | "maximum";

export const PDF_QUALITY_PRESETS: Record<PdfQuality, {
  label: string;
  seconds: number;
  options: Required<Omit<PdfExportOptions, "keepTablesTogether">>;
}> = {
  standard: { label: "Standard — rapide", seconds: 5, options: { scale: 1.5, imageQuality: 0.9, pageYieldMs: 8 } },
  high: { label: "Haute — recommandé", seconds: 9, options: { scale: 2, imageQuality: 0.95, pageYieldMs: 8 } },
  maximum: { label: "Maximale — impression", seconds: 16, options: { scale: 3, imageQuality: 1, pageYieldMs: 12 } },
};

let activePdfQuality: PdfQuality = "high";

export function setActivePdfQuality(quality: PdfQuality): void {
  activePdfQuality = quality;
}

export function getActivePdfOptions(): Required<Omit<PdfExportOptions, "keepTablesTogether">> {
  return { ...PDF_QUALITY_PRESETS[activePdfQuality].options };
}

const loadedGoogleFontHrefs = new Set<string>();

const yieldToBrowser = ceder;

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

type PageBreakBehavior = {
  before: boolean;
  after: boolean;
  markerOnly: boolean;
};

function getPageBreakBehavior(node: ChildNode): PageBreakBehavior {
  if (!(node instanceof HTMLElement)) {
    return { before: false, after: false, markerOnly: false };
  }

  const className = node.className?.toString().toLowerCase() || "";
  const inlineStyle = (node.getAttribute("style") || "").toLowerCase().replace(/\s+/g, "");

  const before =
    className.includes("page-break-before") ||
    inlineStyle.includes("page-break-before:always") ||
    inlineStyle.includes("break-before:page");

  const after =
    className.includes("page-break") ||
    className.includes("page-break-after") ||
    inlineStyle.includes("page-break-after:always") ||
    inlineStyle.includes("break-after:page");

  const markerOnly = !node.children.length && !node.textContent?.trim();

  return { before, after, markerOnly };
}

function createPage(host: HTMLDivElement, footerHtml: string, footerHeightPx: number, pageWPx = A4_WIDTH_PX, pageHPx = A4_HEIGHT_PX): PageParts {
  const page = document.createElement("div");
  page.className = "pdf-page";
  page.style.cssText = `width:${pageWPx}px;height:${pageHPx}px;position:relative;overflow:hidden;background:#fff;`;

  const contentHeightPx = footerHeightPx > 0
    ? pageHPx - footerHeightPx - FOOTER_OFFSET_PX - 8
    : pageHPx;

  const content = document.createElement("div");
  content.className = "pdf-root";
  content.style.cssText = [
    "position:absolute",
    "left:0",
    "top:0",
    `width:${pageWPx}px`,
    `height:${contentHeightPx}px`,
    "overflow:hidden",
    "background:#fff",
  ].join(";");

  page.appendChild(content);

  if (footerHeightPx > 0 && footerHtml) {
    const footer = document.createElement("div");
    footer.className = "pdf-page-footer";
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

/**
 * Mémoïsation (footerHtml + largeur) valable pour UN SEUL appel de
 * `htmlToPdfBlob` : le CSS injecté diffère d'un document à l'autre.
 */
let footerHeightCache = new Map<string, number>();

function measureFooterHeight(host: HTMLDivElement, footerHtml: string, pageWPx = A4_WIDTH_PX): number {
  if (!footerHtml) return 0;

  const cacheKey = `${pageWPx}|${footerHtml}`;
  const cached = footerHeightCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const measure = document.createElement("div");
  measure.className = "pdf-root";
  measure.style.cssText = `width:${pageWPx}px;background:#fff;position:absolute;left:0;top:0;`;
  measure.innerHTML = footerHtml;
  host.appendChild(measure);

  const raw = Math.ceil(measure.scrollHeight);
  host.removeChild(measure);

  // extra safety buffer to avoid clipping the final footer line in PDFs
  const value = Math.max(96, Math.min(220, raw + FOOTER_BUFFER_PX));
  if (footerHeightCache.size > 200) footerHeightCache.clear();
  footerHeightCache.set(cacheKey, value);
  return value;
}

function getRenderableNodes(source: HTMLDivElement): ChildNode[] {
  return Array.from(source.childNodes).filter((node) => {
    if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent?.trim());
    return true;
  });
}

function getRenderableChildNodes(source: HTMLElement): ChildNode[] {
  return Array.from(source.childNodes).filter((node) => {
    if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent?.trim());
    return true;
  });
}

function pageHasRenderableContent(page: HTMLDivElement): boolean {
  const content = page.querySelector(".pdf-root");
  if (!content) return false;
  if (content.textContent?.trim()) return true;
  return Boolean(content.querySelector("img, svg, canvas, table, input, textarea"));
}

function isSubstantiveElement(el: Element): boolean {
  if (el.textContent?.trim()) return true;
  return Boolean(el.querySelector("img, svg, canvas, table, input, textarea"));
}

function contentOnlyHasHeadings(content: Element): boolean {
  const children = Array.from(content.children).filter(isSubstantiveElement);
  return children.length > 0 && children.every((el) => /^H[1-4]$/.test(el.tagName));
}

function pageOnlyHasOrphanHeading(page: HTMLDivElement): boolean {
  const content = page.querySelector(".pdf-root");
  return !!content && contentOnlyHasHeadings(content);
}

/**
 * Page de test réutilisée pour tout un appel de `htmlToPdfBlob`, plus un cache
 * par nœud : on évite de recréer/détruire une page (et donc un reflow complet)
 * à chaque mesure, et de mesurer deux fois le même nœud.
 */
let probeParts: PageParts | null = null;
let probeFitCache = new WeakMap<Node, boolean>();

function nodeFitsOnFreshPage(
  host: HTMLDivElement,
  node: Node,
  footerHtml: string,
  footerHeightPx: number,
  pageWPx: number,
  pageHPx: number
): boolean {
  const cached = probeFitCache.get(node);
  if (cached !== undefined) return cached;

  if (!probeParts || probeParts.page.parentNode !== host) {
    probeParts = createPage(host, footerHtml, footerHeightPx, pageWPx, pageHPx);
  }
  probeParts.content.replaceChildren(node.cloneNode(true));
  const fits = probeParts.content.scrollHeight <= probeParts.content.clientHeight + 1;
  probeParts.content.replaceChildren();
  probeFitCache.set(node, fits);
  return fits;
}

function cloneTableShell(original: HTMLElement): HTMLTableElement {
  const tbl = document.createElement("table");
  for (const attr of Array.from(original.attributes)) {
    tbl.setAttribute(attr.name, attr.value);
  }
  tbl.style.cssText = original.style.cssText;
  const thead = original.querySelector("thead");
  if (thead) tbl.appendChild(thead.cloneNode(true) as HTMLElement);
  const tbody = document.createElement("tbody");
  tbl.appendChild(tbody);
  return tbl;
}

function getTableBodyRows(table: HTMLElement): HTMLTableRowElement[] {
  return Array.from(table.querySelectorAll("tbody tr, tr")).filter(
    (tr) => !tr.closest("thead")
  ) as HTMLTableRowElement[];
}

export async function htmlToPdfBlob(htmlContent: string, options: PdfExportOptions = getActivePdfOptions()): Promise<Blob> {
  const {
    scale = 2,
    imageQuality = 0.95,
    pageYieldMs = 0,
    keepTablesTogether = true,
  } = options;

  // Caches valables uniquement pour cet appel (CSS spécifique au document).
  footerHeightCache = new Map<string, number>();
  probeFitCache = new WeakMap<Node, boolean>();
  probeParts = null;


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
    const footerHeightPx = measureFooterHeight(host, footerHtml, PAGE_W_PX);
    const nodes = getRenderableNodes(source);

    const pages: HTMLDivElement[] = [];
    let current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
    pages.push(current.page);

    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      const pageBreak = getPageBreakBehavior(node);
      const hasMoreNodes = index < nodes.length - 1;

      if (pageBreak.before && current.content.childNodes.length > 0) {
        current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
        pages.push(current.page);
      }

      if (pageBreak.markerOnly) {
        if (pageBreak.after && hasMoreNodes && current.content.childNodes.length > 0) {
          current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
          pages.push(current.page);
        }
        continue;
      }


      // Special handling for tables: split row by row, repeat thead
      if (node instanceof HTMLElement && node.tagName === "TABLE") {
        if (keepTablesTogether && current.content.childNodes.length > 0 && nodeFitsOnFreshPage(host, node, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX)) {
          const wholeTable = node.cloneNode(true);
          current.content.appendChild(wholeTable);
          if (current.content.scrollHeight > current.content.clientHeight + 1) {
            current.content.removeChild(wholeTable);
            current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
            pages.push(current.page);
            current.content.appendChild(wholeTable);
          }
          if (pageBreak.after && hasMoreNodes) {
            current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
            pages.push(current.page);
          }
          continue;
        }

        const rows = getTableBodyRows(node);
        let currentTable = cloneTableShell(node);
        current.content.appendChild(currentTable);

        for (const row of rows) {
          const tbody = currentTable.querySelector("tbody") || currentTable;
          const rowClone = row.cloneNode(true) as HTMLElement;
          tbody.appendChild(rowClone);

          // Check overflow after adding the row
          if (current.content.scrollHeight > current.content.clientHeight + 1) {
            tbody.removeChild(rowClone);
            // Start new page with a fresh table (with thead)
            current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
            pages.push(current.page);
            currentTable = cloneTableShell(node);
            current.content.appendChild(currentTable);
            const newTbody = currentTable.querySelector("tbody") || currentTable;
            newTbody.appendChild(rowClone);
          }
        }
        if (pageBreak.after && hasMoreNodes) {
          current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
          pages.push(current.page);
        }
        continue;
      }

      const clone = node.cloneNode(true);
      const hadContentBeforeClone = current.content.childNodes.length > 0;
      current.content.appendChild(clone);

      // If current block overflows, move normal blocks to next page.
      // Oversized containers (ex: full document body) must be split immediately,
      // otherwise page 1 keeps only the header and the real content starts page 2.
      if (current.content.scrollHeight > current.content.clientHeight + 1) {
        current.content.removeChild(clone);
        const cloneIsOversized = clone instanceof HTMLElement && !nodeFitsOnFreshPage(host, clone, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
        if (hadContentBeforeClone && !cloneIsOversized) {
          current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
          pages.push(current.page);
        }
        current.content.appendChild(clone);
        if (current.content.scrollHeight > current.content.clientHeight + 1 && clone instanceof HTMLElement) {
          current.content.removeChild(clone);
          let oversizedTableStarted = false;
          const wrapperTag = clone.tagName === "BODY" ? "DIV" : clone.tagName;
          const makeShell = (sourceEl: HTMLElement) => {
            const shell = document.createElement(sourceEl.tagName === "BODY" ? "DIV" : sourceEl.tagName);
            for (const attr of Array.from(sourceEl.attributes)) shell.setAttribute(attr.name, attr.value);
            shell.style.cssText = sourceEl.style.cssText;
            return shell;
          };
          let splitWrapper = document.createElement(wrapperTag);
          for (const attr of Array.from(clone.attributes)) {
            splitWrapper.setAttribute(attr.name, attr.value);
          }
          splitWrapper.style.cssText = clone.style.cssText;
          current.content.appendChild(splitWrapper);

          for (const child of getRenderableChildNodes(clone)) {
            // Les marqueurs de saut de page internes (ex. <div class="page-break">)
            // doivent être respectés même lorsque le document entier est découpé.
            const childBreak = getPageBreakBehavior(child);
            if (childBreak.markerOnly && (childBreak.after || childBreak.before)) {
              if (current.content.textContent?.trim() || current.content.querySelector("img,table")) {
                current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
                pages.push(current.page);
                splitWrapper = makeShell(clone);
                current.content.appendChild(splitWrapper);
                oversizedTableStarted = false;
              }
              continue;
            }
            if (child instanceof HTMLElement && child.tagName === "TABLE") {
              if (keepTablesTogether && nodeFitsOnFreshPage(host, child, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX)) {
                const wholeTable = child.cloneNode(true);
                splitWrapper.appendChild(wholeTable);
                if (current.content.scrollHeight > current.content.clientHeight + 1) {
                  splitWrapper.removeChild(wholeTable);
                  current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
                  pages.push(current.page);
                  splitWrapper = makeShell(clone);
                  current.content.appendChild(splitWrapper);
                  splitWrapper.appendChild(wholeTable);
                }
                oversizedTableStarted = true;
                continue;
              }

              if (splitWrapper.childNodes.length === 0 && current.content.childNodes.length > 0) current.content.removeChild(splitWrapper);
              let currentTable = cloneTableShell(child);
              if (current.content.scrollHeight + child.offsetHeight > current.content.clientHeight + 1 && !oversizedTableStarted) {
                current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
                pages.push(current.page);
              }
              current.content.appendChild(currentTable);
              for (const row of getTableBodyRows(child)) {
                const tbody = currentTable.querySelector("tbody") || currentTable;
                const rowClone = row.cloneNode(true) as HTMLElement;
                tbody.appendChild(rowClone);
                if (current.content.scrollHeight > current.content.clientHeight + 1) {
                  tbody.removeChild(rowClone);
                  current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
                  pages.push(current.page);
                  currentTable = cloneTableShell(child);
                  current.content.appendChild(currentTable);
                  (currentTable.querySelector("tbody") || currentTable).appendChild(rowClone);
                }
              }
              oversizedTableStarted = true;
              splitWrapper = document.createElement(wrapperTag);
              for (const attr of Array.from(clone.attributes)) splitWrapper.setAttribute(attr.name, attr.value);
              splitWrapper.style.cssText = clone.style.cssText;
              current.content.appendChild(splitWrapper);
              continue;
            }
            const childClone = child.cloneNode(true);
            splitWrapper.appendChild(childClone);
            if (current.content.scrollHeight > current.content.clientHeight + 1) {
              splitWrapper.removeChild(childClone);
              if (child instanceof HTMLElement && getRenderableChildNodes(child).length > 0 && !nodeFitsOnFreshPage(host, child, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX)) {
                let nestedWrapper = makeShell(child);
                splitWrapper.appendChild(nestedWrapper);
                for (const grandChild of getRenderableChildNodes(child)) {
                  const grandClone = grandChild.cloneNode(true);
                  nestedWrapper.appendChild(grandClone);
                  if (current.content.scrollHeight > current.content.clientHeight + 1) {
                    nestedWrapper.removeChild(grandClone);
                    current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
                    pages.push(current.page);
                    splitWrapper = makeShell(clone);
                    current.content.appendChild(splitWrapper);
                    nestedWrapper = makeShell(child);
                    splitWrapper.appendChild(nestedWrapper);
                    nestedWrapper.appendChild(grandClone);
                  }
                }
                continue;
              }
              current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
              pages.push(current.page);
              const nextWrapper = document.createElement(wrapperTag);
              for (const attr of Array.from(clone.attributes)) {
                nextWrapper.setAttribute(attr.name, attr.value);
              }
              nextWrapper.style.cssText = clone.style.cssText;
              current.content.appendChild(nextWrapper);
              splitWrapper = nextWrapper;
              nextWrapper.appendChild(childClone);
            }
          }
        }
      } else {
        // "Keep with next": if this node is a heading (h1..h4) and the next renderable
        // node does NOT fit on the current page, move the heading along with it to
        // the next page so the heading isn't left orphaned at the bottom.
        const isHeading =
          node instanceof HTMLElement && /^H[1-4]$/.test(node.tagName);
        if (isHeading && hasMoreNodes) {
          const nextNode = nodes[index + 1];
          // Skip pure page-break markers (they don't have visual content)
          const nextBehavior = getPageBreakBehavior(nextNode);
          if (!nextBehavior.markerOnly && !nextBehavior.before && nodeFitsOnFreshPage(host, nextNode, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX)) {
            const nextClone = nextNode.cloneNode(true);
            current.content.appendChild(nextClone);
            if (current.content.scrollHeight > current.content.clientHeight + 1) {
              // Next node doesn't fit -> move heading + next node to a new page
              current.content.removeChild(nextClone);
              current.content.removeChild(clone);
              current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
              pages.push(current.page);
              current.content.appendChild(clone);
            } else {
              // Fits — remove the probe; the next iteration will re-add it normally
              current.content.removeChild(nextClone);
            }
          }
        }
      }

      if (pageBreak.after && hasMoreNodes) {
        current = createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX);
        pages.push(current.page);
      }
    }

    // Drop accidental blank pages caused by oversized sections/page-break markers.
    const renderPages = pages.filter((page, index) => pageHasRenderableContent(page) && !(index > 0 && pageOnlyHasOrphanHeading(page)));
    if (renderPages.length === 0) {
      renderPages.push(createPage(host, footerHtml, footerHeightPx, PAGE_W_PX, PAGE_H_PX).page);
    }

    // Pagination réelle : le pied de page peut porter les jetons {{PAGE}} / {{PAGES}}
    if (footerHtml && /\{\{PAGES?\}\}/.test(footerHtml)) {
      renderPages.forEach((page, i) => {
        const footer = page.querySelector(".pdf-page-footer");
        if (footer) {
          footer.innerHTML = footerHtml
            .replace(/\{\{PAGES\}\}/g, String(renderPages.length))
            .replace(/\{\{PAGE\}\}/g, String(i + 1));
        }
      });
    }



    const orientation = PAGE_W_MM > PAGE_H_MM ? "landscape" : "portrait";
    const pdf = new jsPDF({ unit: "mm", format: [PAGE_W_MM, PAGE_H_MM], orientation });
    const pxToMm = PAGE_W_MM / PAGE_W_PX;

    const disposeCanvas = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 1;
      canvas.height = 1;
      canvas.width = 0;
      canvas.height = 0;
    };

    const canvasToJpegBytes = async (canvas: HTMLCanvasElement): Promise<Uint8Array | string> => {
      const blob: Blob | null = await new Promise((resolve) => {
        if (typeof canvas.toBlob !== "function") return resolve(null);
        canvas.toBlob((b) => resolve(b), "image/jpeg", imageQuality);
      });
      if (!blob) return canvas.toDataURL("image/jpeg", imageQuality);
      return new Uint8Array(await blob.arrayBuffer());
    };

    const addLinksForPage = (page: HTMLDivElement) => {
      const anchors = page.querySelectorAll("a[href]");
      if (!anchors.length) return;
      const pageRect = page.getBoundingClientRect();
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
    };

    let pageIndex = 0;
    const addPageFromCanvas = async (canvas: HTMLCanvasElement, page: HTMLDivElement) => {
      if (pageIndex > 0) pdf.addPage();
      const data = await canvasToJpegBytes(canvas);
      pdf.addImage(data as unknown as string, "JPEG", 0, 0, PAGE_W_MM, PAGE_H_MM);
      addLinksForPage(page);
      pageIndex++;
    };

    /** Rendu page par page (chemin de secours, comportement historique). */
    const renderPageByPage = async (batch: HTMLDivElement[]) => {
      for (const page of batch) {
        const canvas = await html2canvas(page, {
          scale,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          width: PAGE_W_PX,
          height: PAGE_H_PX,
          windowWidth: PAGE_W_PX,
          windowHeight: PAGE_H_PX,
        });
        await addPageFromCanvas(canvas, page);
        disposeCanvas(canvas);
      }
    };

    // Un seul appel html2canvas par lot de pages : le coût fixe (clonage du
    // document + reparse CSS) n'est plus payé une fois par page.
    const batchSize = Math.max(1, Math.floor(16000 / (PAGE_H_PX * scale)));

    for (let start = 0; start < renderPages.length; start += batchSize) {
      const batch = renderPages.slice(start, start + batchSize);

      if (pageYieldMs > 0 && start > 0) {
        await ceder();
      }

      if (batch.length === 1) {
        await renderPageByPage(batch);
      } else {
        const strip = document.createElement("div");
        strip.style.cssText = `position:relative;width:${PAGE_W_PX}px;height:${PAGE_H_PX * batch.length}px;background:#fff;`;
        host.appendChild(strip);
        for (const page of batch) strip.appendChild(page);

        let stripCanvas: HTMLCanvasElement | null = null;
        try {
          stripCanvas = await html2canvas(strip, {
            scale,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            width: PAGE_W_PX,
            height: PAGE_H_PX * batch.length,
            windowWidth: PAGE_W_PX,
            windowHeight: PAGE_H_PX * batch.length,
          });
        } catch (err) {
          console.warn("[pdfExport] rendu par lot impossible, repli page par page", err);
          stripCanvas = null;
        }

        if (stripCanvas) {
          const sliceW = Math.round(PAGE_W_PX * scale);
          try {
            for (let i = 0; i < batch.length; i++) {
              // Bornes absolues (et non un pas arrondi multiplié) : l'erreur
              // d'arrondi de PAGE_H_PX * scale (ex. 1684,5 px en Standard)
              // ne s'accumule plus d'une page à l'autre.
              const top = Math.round(i * PAGE_H_PX * scale);
              const bottom = Math.round((i + 1) * PAGE_H_PX * scale);
              let srcH = bottom - top;
              // Garde : ne jamais demander une zone source hors du strip.
              if (top + srcH > stripCanvas.height) {
                srcH = Math.max(0, stripCanvas.height - top);
              }
              const slice = document.createElement("canvas");
              slice.width = sliceW;
              slice.height = srcH;
              const sctx = slice.getContext("2d");
              if (!sctx) throw new Error("2d context indisponible");
              sctx.fillStyle = "#ffffff";
              sctx.fillRect(0, 0, sliceW, srcH);
              sctx.drawImage(stripCanvas, 0, top, sliceW, srcH, 0, 0, sliceW, srcH);
              await addPageFromCanvas(slice, batch[i]);
              disposeCanvas(slice);
              if ((i + 1) % 4 === 0) await ceder();
            }
          } finally {
            disposeCanvas(stripCanvas);
          }
        } else {
          await renderPageByPage(batch);
        }

        if (strip.parentNode) strip.parentNode.removeChild(strip);
      }

      for (const page of batch) {
        if (page.parentNode) page.parentNode.removeChild(page);
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
