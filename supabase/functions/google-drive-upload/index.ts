import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

import { createClient as __createAuthClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

async function __requireAuth(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const supabase = __createAuthClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data, error } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (error || !data?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const __authErr = await __requireAuth(req);
  if (__authErr) return __authErr;

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    // Return Google Client ID for the frontend GIS flow
    if (action === "config") {
      const clientId = Deno.env.get("google_drive_api");
      if (!clientId) {
        return new Response(
          JSON.stringify({ error: "Google Drive Client ID not configured" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ clientId }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Upload file to Google Drive
    if (req.method === "POST") {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      const accessToken = formData.get("accessToken") as string;
      const fileName = formData.get("fileName") as string;
      const folderName = formData.get("folderName") as string | null;

      if (!file || !accessToken || !fileName) {
        return new Response(
          JSON.stringify({ error: "Missing file, accessToken, or fileName" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      let folderId: string | null = null;

      // Create or find the folder
      if (folderName) {
        // Search for existing folder
        const searchResp = await fetch(
          `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(folderName)}' and mimeType='application/vnd.google-apps.folder' and trashed=false&fields=files(id,name)`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const searchData = await searchResp.json();

        if (searchData.files && searchData.files.length > 0) {
          folderId = searchData.files[0].id;
        } else {
          // Create folder
          const folderResp = await fetch("https://www.googleapis.com/drive/v3/files", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: folderName,
              mimeType: "application/vnd.google-apps.folder",
            }),
          });
          const folderData = await folderResp.json();
          folderId = folderData.id;
        }
      }

      // Upload file using multipart upload
      const metadata: Record<string, unknown> = { name: fileName };
      if (folderId) metadata.parents = [folderId];

      const boundary = "---lovable-boundary-" + Date.now();
      const fileBytes = new Uint8Array(await file.arrayBuffer());

      const metadataPart =
        `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`;
      const filePart =
        `--${boundary}\r\nContent-Type: ${file.type || "application/octet-stream"}\r\n\r\n`;
      const closing = `\r\n--${boundary}--`;

      const encoder = new TextEncoder();
      const metaBytes = encoder.encode(metadataPart);
      const filePartBytes = encoder.encode(filePart);
      const closingBytes = encoder.encode(closing);

      const body = new Uint8Array(
        metaBytes.length + filePartBytes.length + fileBytes.length + closingBytes.length
      );
      body.set(metaBytes, 0);
      body.set(filePartBytes, metaBytes.length);
      body.set(fileBytes, metaBytes.length + filePartBytes.length);
      body.set(closingBytes, metaBytes.length + filePartBytes.length + fileBytes.length);

      const uploadResp = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": `multipart/related; boundary=${boundary}`,
          },
          body,
        }
      );

      if (!uploadResp.ok) {
        const errText = await uploadResp.text();
        console.error("Drive upload error:", uploadResp.status, errText);
        return new Response(
          JSON.stringify({ error: `Google Drive upload failed [${uploadResp.status}]: ${errText}` }),
          { status: uploadResp.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const result = await uploadResp.json();
      return new Response(
        JSON.stringify({ success: true, fileId: result.id, fileName: result.name, webViewLink: result.webViewLink }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("google-drive-upload error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
