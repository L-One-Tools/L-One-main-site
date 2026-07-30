import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildCatalog,
  readJson,
  validateCatalog,
  validateDownloadUrl,
  writeJsonAtomically
} from "./store-catalog-lib.mjs";
import { writeCatalogWithFallback } from "./generate-store-catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = await readJson(path.join(root, "store", "catalog.source.json"));
const release = await readJson(path.join(root, "store", "releases", "story-flow.json"));
const schema = await readJson(path.join(root, "store", "catalog.schema.json"));
const catalog = buildCatalog(source, [release]);
assert.equal(schema.$id, "https://l-one.asia/store/catalog.schema.json");
assert.deepEqual(validateCatalog(catalog), []);
assert.equal(catalog.tools[0].release.version, "0.5.8");
assert.equal(catalog.tools[0].release.download_available, false);
assert.equal(catalog.tools[0].release.assets.length, 0);

const testRelease = structuredClone(release);
testRelease.updated_at = "2026-07-30T01:00:00+08:00";
testRelease.source = "manual";
testRelease.channel = "test";
testRelease.version = "0.5.9";
testRelease.release_notes = ["端到端测试版本字段，不代表 Stable 发布。"];
const secondRoundCatalog = buildCatalog(source, [testRelease]);
assert.deepEqual(validateCatalog(secondRoundCatalog), []);
assert.equal(secondRoundCatalog.tools[0].release.version, "0.5.9");
assert.equal(secondRoundCatalog.tools[0].release.channel, "test");
assert.equal(secondRoundCatalog.tools[0].release.download_available, false);
assert.equal(catalog.tools[0].release.version, "0.5.8");

const duplicate = structuredClone(catalog);
duplicate.tools.push(structuredClone(duplicate.tools[0]));
const duplicateErrors = validateCatalog(duplicate);
assert(duplicateErrors.some((error) => error.includes("duplicate tool id")));
assert(duplicateErrors.some((error) => error.includes("duplicate version")));

const invalidDate = structuredClone(catalog);
invalidDate.tools[0].release.published_at = "not-a-date";
assert(validateCatalog(invalidDate).some((error) => error.includes("published_at")));

const invalidDownload = structuredClone(catalog);
invalidDownload.tools[0].release.download_available = true;
invalidDownload.tools[0].release.assets = [{
  name: "Story-Flow-Setup-v0.5.8.exe",
  platform: "windows",
  architecture: "x64",
  size: 100,
  url: "https://github.com/L-One-Tools/story-flow/releases/private.exe",
  sha256: "a".repeat(64),
  minimum_system: "Windows 10",
  available: true,
  recalled: false
}];
assert(validateCatalog(invalidDownload).some((error) => error.includes("download host is not allowed")));
assert.equal(validateDownloadUrl("https://download.l-one.asia/story-flow/v0.5.8/setup.exe"), "");

const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "l-one-store-test-"));
try {
  const stablePath = path.join(temporaryDirectory, "catalog.json");
  const fallbackPath = path.join(temporaryDirectory, "catalog.last-known-good.json");
  await writeCatalogWithFallback(catalog, stablePath, fallbackPath);
  const stableBeforeFailure = await readFile(stablePath, "utf8");
  const broken = structuredClone(catalog);
  broken.tools[0].release.download_available = true;
  const errors = validateCatalog(broken);
  assert(errors.length > 0);
  if (!errors.length) await writeFile(stablePath, "unexpected", "utf8");
  assert.equal(await readFile(stablePath, "utf8"), stableBeforeFailure);
  await writeCatalogWithFallback(secondRoundCatalog, stablePath, fallbackPath);
  assert.equal((await readJson(stablePath)).tools[0].release.version, "0.5.9");
  assert.equal((await readJson(fallbackPath)).tools[0].release.version, "0.5.8");
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}

console.log("Store Catalog tests passed: two rounds, schema, duplicates, downloads, and failure retention.");
