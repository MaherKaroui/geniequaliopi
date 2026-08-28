import { it } from "vitest";
import { findGotrmProfile } from "@/lib/gotrm/cvProfiles";
it("p",()=>{for(const [n,p] of [["ATASOY","Dilovan"],["GIMENEZ","Jessica"]] as any){const c=findGotrmProfile(n,p);console.log(n,c?.source,"|",c?.pointsForts?.slice(0,2).join(" / "),"|",c?.experiences?.[0]?.employeur);}});
