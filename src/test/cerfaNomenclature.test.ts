import { describe, it, expect } from "vitest";
import { typeEmployeurDepuisNature, regimeSocialDepuisApe } from "@/lib/cerfaNomenclature";
describe("nomenclature CERFA", () => {
  it("SAS → 12, association → 15, commune → 22", () => {
    expect(typeEmployeurDepuisNature("5710")).toBe("12");
    expect(typeEmployeurDepuisNature("9220")).toBe("15");
    expect(typeEmployeurDepuisNature("7210")).toBe("22");
  });
  it("régime MSA pour agriculture, URSSAF sinon", () => {
    expect(regimeSocialDepuisApe("0111Z")).toBe("1");
    expect(regimeSocialDepuisApe("8559A")).toBe("2");
  });
});
