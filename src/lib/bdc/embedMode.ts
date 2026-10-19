/** Presentation-only BDC entry; never grants access to other routes. */
export function isEmbeddedBDC(pathname: string, search: string): boolean {
  return pathname === "/bilan-competences" && new URLSearchParams(search).get("embed") === "1";
}