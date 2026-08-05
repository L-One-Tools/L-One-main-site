import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildCatalog,
  readJson,
  validateCatalog,
  writeJsonAtomically
} from "./store-catalog-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "store", "catalog.source.json");
const releasesDirectory = path.join(root, "store", "releases");
const outputPath = path.join(root, "public", "data", "store", "catalog.json");
const fallbackPath = path.join(root, "public", "data", "store", "catalog.last-known-good.json");

export async function writeCatalogWithFallback(catalog, target, fallback) {
  let previousCatalog = null;
  try {
    const candidate = await readJson(target);
    if (validateCatalog(candidate).length === 0) previousCatalog = candidate;
  } catch {
    // A missing or invalid primary file must not replace an existing valid fallback.
  }
  if (previousCatalog) {
    await writeJsonAtomically(fallback, previousCatalog);
  } else {
    try {
      const existingFallback = await readJson(fallback);
      if (validateCatalog(existingFallback).length > 0) {
        await writeJsonAtomically(fallback, catalog);
      }
    } catch {
      await writeJsonAtomically(fallback, catalog);
    }
  }
  await writeJsonAtomically(target, catalog);
}

export async function generateCatalog(options = {}) {
  const source = await readJson(options.sourcePath || sourcePath);
  const directory = options.releasesDirectory || releasesDirectory;
  const releaseFiles = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  const snapshots = await Promise.all(releaseFiles.map((name) => readJson(path.join(directory, name))));
  const catalog = buildCatalog(source, snapshots);
  const extraHosts = (process.env.STORE_ALLOWED_DOWNLOAD_HOSTS || "").split(",");
  const errors = validateCatalog(catalog, { extraHosts });
  if (errors.length) throw new Error(`Store Catalog validation failed:\n- ${errors.join("\n- ")}`);
  const target = options.outputPath || outputPath;
  if (options.writeFallback !== false) {
    await writeCatalogWithFallback(catalog, target, options.fallbackPath || fallbackPath);
  } else {
    await writeJsonAtomically(target, catalog);
  }
  return catalog;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const catalog = await generateCatalog();
  console.log(`Generated Store Catalog with ${catalog.tools.length} tool(s) at ${catalog.generated_at}.`);
}
