(globalThis as any).DOMParser = class { parseFromString(){ return {} as any; } };
(globalThis as any).XMLSerializer = class { serializeToString(){ return ""; } };
const run = async () => {
  const { SAMPLE_ORGANISME, SAMPLE_FORMATIONS, SAMPLE_STAGIAIRES } = await import("../src/lib/sampleData");
  const { generateDocumentById } = await import("../src/lib/documentGenerator");
  const f = SAMPLE_FORMATIONS.find((x:any)=>x.intitule==="Initiation Word");
  const html = generateDocumentById("programme_formation","",{organisme:SAMPLE_ORGANISME,formation:f,stagiaires:SAMPLE_STAGIAIRES.slice(0,2)} as any);
  const s = String(html);
  console.log(s.match(/<h2>[^<]*<\/h2>/g)?.join("\n"));
};
run();
