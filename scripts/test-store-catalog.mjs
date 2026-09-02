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
const fileToTextRelease = await readJson(path.join(root, "store", "releases", "l-1-file-to-text.json"));
const webCaptureRelease = await readJson(path.join(root, "store", "releases", "l-1-web-capture.json"));
const schema = await readJson(path.join(root, "store", "catalog.schema.json"));
const catalog = buildCatalog(source, [release, fileToTextRelease, webCaptureRelease]);
assert.equal(schema.$id, "https://l-one.asia/store/catalog.schema.json");
assert.deepEqual(validateCatalog(catalog), []);
const storyFlow = catalog.tools.find((tool) => tool.id === "story-flow");
const fileToText = catalog.tools.find((tool) => tool.id === "l-1-file-to-text");
const webCapture = catalog.tools.find((tool) => tool.id === "l-1-web-capture");
assert.equal(storyFlow.release.version, "0.5.8");
assert.equal(storyFlow.release.download_available, false);
assert.equal(storyFlow.release.assets.length, 0);
assert.equal(fileToText.release.version, "2.0.8");
assert.equal(fileToText.release.download_available, true);
assert.equal(fileToText.release.assets.length, 1);
assert.equal(fileToText.release.assets[0].size, 174867225);
assert.equal(fileToText.release.assets[0].sha256, "0b4080d6cf4fb9b47fa230cb8ac3c14a37c7202bedc266869ee8bbedb71418d8");
assert.equal(webCapture.release.version, "0.2.2");
assert.equal(webCapture.release.channel, "beta");
assert.equal(webCapture.release.download_available, true);
assert.equal(webCapture.release.assets.length, 1);
assert.equal(webCapture.release.assets[0].name, "L-1-.-v0.2.2-.zip");
assert.equal(webCapture.release.assets[0].size, 16700);
assert.equal(webCapture.release.assets[0].sha256, "fb9441ed595e24e6a6b9e8dd3d994e353b412fa22efc44c923ad7e7d499df055");
assert.equal(webCapture.release.assets[0].url, "https://github.com/L-One-Tools/l-one-tools-releases/releases/download/l-1-web-imprint-v0.2.2/L-1-.-v0.2.2-.zip");

const testRelease = structuredClone(release);
testRelease.updated_at = "2026-07-30T01:00:00+08:00";
testRelease.source = "manual";
testRelease.channel = "test";
testRelease.version = "0.5.9";
testRelease.release_notes = ["端到端测试版本字段，不代表 Stable 发布。"];
const secondRoundCatalog = buildCatalog(source, [testRelease, fileToTextRelease, webCaptureRelease]);
assert.deepEqual(validateCatalog(secondRoundCatalog), []);
assert.equal(secondRoundCatalog.tools.find((tool) => tool.id === "story-flow").release.version, "0.5.9");
assert.equal(secondRoundCatalog.tools.find((tool) => tool.id === "story-flow").release.channel, "test");
assert.equal(secondRoundCatalog.tools.find((tool) => tool.id === "story-flow").release.download_available, false);
assert.equal(storyFlow.release.version, "0.5.8");

const duplicate = structuredClone(catalog);
duplicate.tools.push(structuredClone(duplicate.tools[0]));
const duplicateErrors = validateCatalog(duplicate);
assert(duplicateErrors.some((error) => error.includes("duplicate tool id")));
assert(duplicateErrors.some((error) => error.includes("duplicate version")));

const invalidDate = structuredClone(catalog);
invalidDate.tools.find((tool) => tool.id === "story-flow").release.published_at = "not-a-date";
assert(validateCatalog(invalidDate).some((error) => error.includes("published_at")));

const invalidDownload = structuredClone(catalog);
const invalidStoryFlow = invalidDownload.tools.find((tool) => tool.id === "story-flow");
invalidStoryFlow.release.download_available = true;
invalidStoryFlow.release.assets = [{
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
assert(validateCatalog(invalidDownload).some((error) => error.includes("official L-One GitHub Release path")));
assert.equal(validateDownloadUrl("https://download.l-one.asia/story-flow/v0.5.8/setup.exe"), "");
assert.equal(validateDownloadUrl(fileToText.release.assets[0].url), "");

const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "l-one-store-test-"));
try {
  const stablePath = path.join(temporaryDirectory, "catalog.json");
  const fallbackPath = path.join(temporaryDirectory, "catalog.last-known-good.json");
  await writeCatalogWithFallback(catalog, stablePath, fallbackPath);
  const stableBeforeFailure = await readFile(stablePath, "utf8");
  const broken = structuredClone(catalog);
  broken.tools.find((tool) => tool.id === "story-flow").release.download_available = true;
  const errors = validateCatalog(broken);
  assert(errors.length > 0);
  if (!errors.length) await writeFile(stablePath, "unexpected", "utf8");
  assert.equal(await readFile(stablePath, "utf8"), stableBeforeFailure);
  await writeCatalogWithFallback(secondRoundCatalog, stablePath, fallbackPath);
  assert.equal((await readJson(stablePath)).tools.find((tool) => tool.id === "story-flow").release.version, "0.5.9");
  assert.equal((await readJson(fallbackPath)).tools.find((tool) => tool.id === "story-flow").release.version, "0.5.8");
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}

console.log("Store Catalog tests passed: two rounds, schema, duplicates, downloads, and failure retention.");
