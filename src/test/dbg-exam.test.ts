import { describe, expect, it, vi, afterEach } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import { examenFinal } from "@/lib/izilearn/trames";
import { hasEvalContentDedie, getEvalContent } from "@/lib/evalContent";

describe("dbg", () => {
  it("dbg exam", () => {
    console.log("dedie:", hasEvalContentDedie("Gérer un projet digital"));
    if (hasEvalContentDedie("Gérer un projet digital")) {
      const ec = getEvalContent("Gérer un projet digital");
      console.log("qcmFinal len:", ec.qcmFinal?.length, "first:", JSON.stringify(ec.qcmFinal?.[0]));
    }
  });
});
