import { afterEach, describe, expect, it, vi } from "vitest";
import { captureMail } from "@/lib/mails/captureMail";
import type { MailAuto } from "@/lib/mails/mailsAutomatiques";

vi.mock("@/lib/arrierePlan", () => ({ pause: async () => {} }));
vi.mock("@/lib/mails/mailsAutomatiques", () => ({ payloadCapture: () => ({}) }));
vi.mock("modern-screenshot", () => ({ domToBlob: vi.fn(async () => new Blob(["png"])) }));

afterEach(() => vi.restoreAllMocks());

describe("Gmail Ctrl+E before shared captures", () => {
  it.each([false, true])("hides the toolbar without re-enabling it (already hidden: %s)", async (hidden) => {
    const append = document.body.appendChild.bind(document.body);
    let shortcuts = 0;
    let capturedDoc: Document | undefined;
    vi.spyOn(document.body, "appendChild").mockImplementation((node) => {
      const result = append(node);
      if (node instanceof HTMLIFrameElement) {
        const doc = node.contentDocument;
        const win = node.contentWindow;
        if (!doc || !win) throw new Error("Missing iframe");
        capturedDoc = doc;
        doc.body.innerHTML = `<div id="bar" class="${hidden ? "hidden" : ""}"></div>`;
        Object.assign(win, { __prefill: () => {} });
        doc.addEventListener("keydown", (event) => {
          const key = event as KeyboardEvent;
          if (key.ctrlKey && key.key === "e") {
            shortcuts++;
            doc.getElementById("bar")?.classList.toggle("hidden");
          }
        });
        queueMicrotask(() => node.dispatchEvent(new Event("load")));
      }
      return result;
    });
    await captureMail({ key: "mail", titre: "Mail", subject: "Formation", date: new Date(), messages: [] } as MailAuto, "gmail");
    expect(shortcuts).toBe(hidden ? 0 : 1);
    expect(capturedDoc?.getElementById("bar")?.classList.contains("hidden")).toBe(true);
    expect(document.querySelector("iframe")).toBeNull();
  });
});