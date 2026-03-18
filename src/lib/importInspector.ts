import { DocEntry, StagiaireInfo } from "@/types/qualiopi";
import {
  buildDocumentFileName,
  ExportFormat,
  getFileBaseName,
  getPreferredExtension,
  normalizeLooseFileName,
  PER_STAGIAIRE_TEMPLATES,
  shortCriterePath,
} from "@/lib/fileNaming";

export interface ImportedFileDescriptor {
  baseName: string;
  extension: string;
  file: File;
  id: string;
  normalizedName: string;
  relativePath: string;
}

export interface ExpectedFileDescriptor {
  critere: number;
  docId: string;
  extension: string;
  indicateur: number;
  key: string;
  normalizedName: string;
  requestedName: string;
  searchedPath: string;
}

export interface ImportMatchResult {
  closestFile?: ImportedFileDescriptor;
  expected: ExpectedFileDescriptor;
  matchedFile?: ImportedFileDescriptor;
  probableReason: string;
  similarity?: number;
  status: "exact" | "normalized" | "near" | "missing";
}

export interface ImportAuditResult {
  exactCount: number;
  importedFiles: ImportedFileDescriptor[];
  matches: ImportMatchResult[];
  missingCount: number;
  nearCount: number;
  normalizedCount: number;
  sourceCheck: "ok" | "warning";
  sourceMessage: string;
  sourceRoot: string;
  totalExpected: number;
  totalImported: number;
}

interface AuditOptions {
  catalog: DocEntry[];
  dateMaj: string;
  exportFormat: ExportFormat;
  files: File[] | FileList;
  orgName: string;
  stagiaires: StagiaireInfo[];
  version: string;
}

function listImportedFiles(files: File[] | FileList): ImportedFileDescriptor[] {
  return Array.from(files).map((file, index) => {
    const relativePath = file.webkitRelativePath || file.name;
    const extensionMatch = file.name.match(/\.[^.]+$/);
    const extension = extensionMatch ? extensionMatch[0].toLowerCase() : "";

    return {
      baseName: getFileBaseName(file.name),
      extension,
      file,
      id: `${index}-${relativePath}`,
      normalizedName: normalizeLooseFileName(file.name),
      relativePath,
    };
  });
}

function buildExpectedFiles({ catalog, dateMaj, exportFormat, orgName, stagiaires, version }: Omit<AuditOptions, "files">): ExpectedFileDescriptor[] {
  const expected: ExpectedFileDescriptor[] = [];

  for (const doc of catalog) {
    const extension = getPreferredExtension(doc.template, exportFormat);
    const pushExpected = (suffix: string, stagiaire?: StagiaireInfo | null) => {
      const requestedName = buildDocumentFileName(doc, orgName, version, dateMaj, extension, stagiaire);
      expected.push({
        critere: doc.critere,
        docId: doc.id,
        extension,
        indicateur: doc.indicateur,
        key: `${doc.id}:${suffix}`,
        normalizedName: normalizeLooseFileName(requestedName),
        requestedName,
        searchedPath: `${shortCriterePath(doc.critere, doc.indicateur)}/${requestedName}`,
      });
    };

    if (doc.params?.stagiaireIdx !== undefined) {
      const stagiaire = stagiaires[doc.params.stagiaireIdx] ?? null;
      pushExpected(String(doc.params.stagiaireIdx), stagiaire);
      continue;
    }

    if (PER_STAGIAIRE_TEMPLATES.has(doc.template)) {
      stagiaires.forEach((stagiaire, index) => pushExpected(String(index), stagiaire));
      continue;
    }

    pushExpected("all");
  }

  return expected;
}

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

  for (let row = 0; row < rows; row++) matrix[row][0] = row;
  for (let col = 0; col < cols; col++) matrix[0][col] = col;

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}

function getPrefix(normalizedName: string): string {
  const parts = normalizedName.split("_");
  return parts.slice(0, 3).join("_");
}

function computeSimilarity(a: string, b: string): number {
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 1;
  return 1 - levenshtein(a, b) / maxLength;
}

function findClosestFile(expected: ExpectedFileDescriptor, importedFiles: ImportedFileDescriptor[], usedIds: Set<string>) {
  const prefix = getPrefix(expected.normalizedName);
  const availableFiles = importedFiles.filter((file) => !usedIds.has(file.id));
  const scopedFiles = availableFiles.filter((file) => file.normalizedName.startsWith(prefix));
  const pool = scopedFiles.length > 0 ? scopedFiles : availableFiles;

  let best: { file?: ImportedFileDescriptor; similarity: number } = { similarity: 0 };

  for (const file of pool) {
    const similarity = computeSimilarity(expected.normalizedName, file.normalizedName);
    if (similarity > best.similarity) {
      best = { file, similarity };
    }
  }

  return best;
}

function probableReason(expected: ExpectedFileDescriptor, closest?: ImportedFileDescriptor, sourceCheck: "ok" | "warning" = "ok"): string {
  if (sourceCheck === "warning") {
    return "Le dossier source sélectionné ne ressemble pas à un export Qualiopi complet ou ne contient pas le bon sous-dossier.";
  }

  if (!closest) {
    return "Le fichier est absent du dossier sélectionné ou n'utilise pas la convention attendue.";
  }

  if (getPrefix(expected.normalizedName) === getPrefix(closest.normalizedName)) {
    return "Un fichier très proche a été trouvé, mais le nom diffère encore après normalisation (accents, apostrophes, parenthèses, caractères spéciaux, version ou date).";
  }

  return "Un fichier proche existe, mais il semble appartenir à un autre critère ou à un autre indicateur.";
}

function inspectSource(importedFiles: ImportedFileDescriptor[]) {
  const topLevelFolders = [...new Set(importedFiles.map((file) => file.relativePath.split("/")[0]).filter(Boolean))];
  const sourceRoot = topLevelFolders.length === 1 ? topLevelFolders[0] : (topLevelFolders[0] || "Dossier sélectionné");
  const structureHits = importedFiles.filter((file) => /(^|\/)QUALIOPI(\/|$)|(^|\/)CT\d+(\/|$)|CT\d+_IND_\d+/i.test(file.relativePath)).length;
  const sourceCheck = structureHits > 0 ? "ok" : "warning";
  const sourceMessage = sourceCheck === "ok"
    ? `Dossier source détecté : ${sourceRoot}`
    : `Le dossier sélectionné (${sourceRoot}) ne contient pas la structure attendue (QUALIOPI / CTx / INDx).`;

  return { sourceCheck, sourceMessage, sourceRoot };
}

export function auditImportedFolder(options: AuditOptions): ImportAuditResult {
  const importedFiles = listImportedFiles(options.files);
  const expectedFiles = buildExpectedFiles(options);
  const { sourceCheck, sourceMessage, sourceRoot } = inspectSource(importedFiles);
  const usedIds = new Set<string>();

  let exactCount = 0;
  let normalizedCount = 0;
  let nearCount = 0;
  let missingCount = 0;

  const matches = expectedFiles.map<ImportMatchResult>((expected) => {
    const exactMatch = importedFiles.find((file) => !usedIds.has(file.id) && file.file.name.toLowerCase() === expected.requestedName.toLowerCase());
    if (exactMatch) {
      usedIds.add(exactMatch.id);
      exactCount += 1;
      return {
        expected,
        matchedFile: exactMatch,
        probableReason: "Correspondance exacte trouvée.",
        similarity: 1,
        status: "exact",
      };
    }

    const normalizedMatch = importedFiles.find((file) => !usedIds.has(file.id) && file.normalizedName === expected.normalizedName);
    if (normalizedMatch) {
      usedIds.add(normalizedMatch.id);
      normalizedCount += 1;
      return {
        expected,
        matchedFile: normalizedMatch,
        probableReason: "Correspondance trouvée après normalisation automatique du nom de fichier.",
        similarity: 1,
        status: "normalized",
      };
    }

    const closest = findClosestFile(expected, importedFiles, usedIds);
    const isNear = Boolean(closest.file) && closest.similarity >= 0.72;

    if (isNear && closest.file) {
      usedIds.add(closest.file.id);
      nearCount += 1;
      return {
        closestFile: closest.file,
        expected,
        matchedFile: closest.file,
        probableReason: probableReason(expected, closest.file, sourceCheck),
        similarity: closest.similarity,
        status: "near",
      };
    }

    missingCount += 1;
    return {
      closestFile: closest.file,
      expected,
      probableReason: probableReason(expected, closest.file, sourceCheck),
      similarity: closest.similarity || undefined,
      status: "missing",
    };
  });

  return {
    exactCount,
    importedFiles,
    matches,
    missingCount,
    nearCount,
    normalizedCount,
    sourceCheck,
    sourceMessage,
    sourceRoot,
    totalExpected: expectedFiles.length,
    totalImported: importedFiles.length,
  };
}
