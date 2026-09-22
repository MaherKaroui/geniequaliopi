import { createParser } from "eventsource-parser";
import { flushSync } from "react-dom";

type ImagePayload = { type?: string; b64_json?: string; error?: { message?: string } };

export async function streamImage(
  endpoint: string,
  input: Record<string, unknown> | FormData,
  onFrame: (dataUrl: string, isFinal: boolean) => void,
  headers?: HeadersInit,
): Promise<void> {
  const send = (stream: boolean) => {
    const requestHeaders = new Headers(headers);
    let body: FormData | string;
    if (input instanceof FormData) {
      const form = new FormData();
      input.forEach((value, name) => form.append(name, value));
      form.set("stream", String(stream));
      if (!stream) form.delete("partial_images");
      body = form;
      requestHeaders.delete("Content-Type");
    } else {
      const payload: Record<string, unknown> = { ...input, stream };
      if (!stream) delete payload.partial_images;
      body = JSON.stringify(payload);
      requestHeaders.set("Content-Type", "application/json");
    }
    return fetch(endpoint, { method: "POST", headers: requestHeaders, body });
  };

  const response = await send(true);
  if (!response.ok || !response.body) {
    const body = await response.text().catch(() => "");
    throw new Error(body || `La création du logo a échoué (${response.status}).`);
  }

  let sawEvent = false;
  let completed = false;
  let streamError = "";
  const parser = createParser({
    onEvent(event) {
      let payload: ImagePayload | undefined;
      try { payload = JSON.parse(event.data) as ImagePayload; } catch { return; }
      if (event.event === "error" || payload.type === "error") {
        sawEvent = true;
        streamError = payload.error?.message || "La création du logo a échoué.";
        return;
      }
      const type = event.event || payload.type;
      if (!["image_generation.partial_image", "image_generation.completed", "image_edit.partial_image", "image_edit.completed"].includes(type || "")) return;
      sawEvent = true;
      if (!payload.b64_json) return;
      const isFinal = type?.endsWith(".completed") || false;
      flushSync(() => onFrame(`data:image/png;base64,${payload?.b64_json}`, isFinal));
      if (isFinal) completed = true;
    },
  });

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  try {
    while (true) {
      let chunk: ReadableStreamReadResult<string>;
      try { chunk = await reader.read(); } catch (error) {
        if (sawEvent) throw error;
        break;
      }
      if (chunk.done) break;
      parser.feed(chunk.value);
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }

  if (streamError) throw new Error(streamError);
  if (!sawEvent) {
    const replay = await send(false);
    if (!replay.ok) throw new Error(await replay.text().catch(() => "La création du logo a échoué."));
    const json = await replay.json() as { data?: { b64_json?: string }[] };
    const image = json.data?.[0]?.b64_json;
    if (!image) throw new Error("Aucun logo n'a été reçu.");
    onFrame(`data:image/png;base64,${image}`, true);
    return;
  }
  if (!completed) throw new Error("La création s'est arrêtée avant la fin.");
}