import { test } from "vitest";
import { construireMatrice } from "./matriceCas";
import { generateFeuilleRouteQualiopiUniversal } from "@/lib/feuilleRouteQualiopiUniversal";
import { buildFullCatalog } from "@/lib/docCatalog";
import { detectTypeAction } from "@/lib/guideAuditUniversal";
test("fr", () => {
  for (const c of construireMatrice()) for (const a of ["initial","surveillance","renouvellement",undefined] as any[]) {
    try { const cat = buildFullCatalog([c.f],c.stagiaires,[],c.org.typesActions as any); const t=detectTypeAction(c.org); generateFeuilleRouteQualiopiUniversal(c.org, cat, [c.f], c.stagiaires, t==="CFA"?"AF":t, a); }
    catch(e:any){ console.log(c.id,a,e.stack.split("\n").slice(0,3).join("\n")); }
  }
});
