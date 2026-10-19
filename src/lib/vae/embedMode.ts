/** Presentation-only public VAE entry; never grants access to other routes. */
export function isEmbeddedVAE(pathname: string, search: string): boolean {
  return pathname === "/vae" && new URLSearchParams(search).get("embed") === "1";
}