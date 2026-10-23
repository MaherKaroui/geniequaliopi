import { describe, it, expect } from "vitest";
import { codeCertificationLms } from "@/lib/izilearn/mapping";
describe("code RS des parcours LILATE CRM LMS", () => {
  it("anglais sans code → RS7314", () => expect(codeCertificationLms("", "Anglais professionnel – LILATE", "2026-03-02")).toBe("RS7314"));
  it("anglais avant le 24/10/2025 → RS6118", () => expect(codeCertificationLms("", "Anglais LILATE", "2025-05-12")).toBe("RS6118"));
  it("FLE sans code → RS6916", () => expect(codeCertificationLms("", "Français langue étrangère (FLE) – LILATE", "2026-03-02")).toBe("RS6916"));
  it("code transmis prioritaire", () => expect(codeCertificationLms("rs 7314", "LILATE FLE", "")).toBe("RS7314"));
});
