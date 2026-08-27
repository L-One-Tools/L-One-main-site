import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const TOOL_STATUSES = new Set(["internal", "coming-soon", "beta", "stable", "unavailable"]);
const RELEASE_CHANNELS = new Set(["internal", "test", "beta", "stable"]);
const RELEASE_SOURCES = new Set(["repository-audit", "github-release", "manual"]);
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VERSION_PATTERN = /^(?:\d+\.\d+\.\d+)?$/;
const SHA256_PATTERN = /^(?:[a-f0-9]{64})?$/i;
const OFFICIAL_GITHUB_RELEASE_PREFIX = "/L-One-Tools/l-one-tools-releases/releases/download/";

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function isDateTime(value) {
  return typeof value === "string" && value.length > 0 && !Number.isNaN(Date.parse(value));
}

function allowedDownloadHost(hostname, extraHosts = []) {
  const normalized = hostname.toLowerCase();
  if (normalized === "l-one.asia" || normalized.endsWith(".l-one.asia")) return true;
  if (normalized === "github.com") return true;
  return extraHosts.some((host) => normalized === host || normalized.endsWith(`.${host}`));
}

export function validateDownloadUrl(value, extraHosts = []) {
  if (!value) return "download URL is empty";
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return "download URL is invalid";
  }
  if (parsed.protocol !== "https:") return "download URL must use HTTPS";
  if (parsed.hostname.toLowerCase() === "github.com" && !parsed.pathname.startsWith(OFFICIAL_GITHUB_RELEASE_PREFIX)) {
    return "download URL must use the official L-One GitHub Release path";
  }
  if (!allowedDownloadHost(parsed.hostname, extraHosts)) {
    return `download host is not allowed: ${parsed.hostname}`;
  }
  return "";
}

export function validateCatalog(catalog, options = {}) {
  const errors = [];
  const extraHosts = (options.extraHosts || []).map((host) => host.trim().toLowerCase()).filter(Boolean);
  if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) return ["catalog must be an object"];
  if (catalog.schema_version !== "1.0") errors.push("schema_version must equal 1.0");
  if (!isDateTime(catalog.generated_at)) errors.push("generated_at must be an ISO date-time");
  if (!Array.isArray(catalog.tools)) return [...errors, "tools must be an array"];

  const ids = new Set();
  const slugs = new Set();
  const versions = new Set();
  for (const [index, tool] of catalog.tools.entries()) {
    const prefix = `tools[${index}]`;
    if (!tool || typeof tool !== "object") {
      errors.push(`${prefix} must be an object`);
      continue;
    }
    if (!ID_PATTERN.test(tool.id || "")) errors.push(`${prefix}.id is invalid`);
    if (ids.has(tool.id)) errors.push(`duplicate tool id: ${tool.id}`);
    ids.add(tool.id);
    if (!ID_PATTERN.test(tool.slug || "")) errors.push(`${prefix}.slug is invalid`);
    if (slugs.has(tool.slug)) errors.push(`duplicate tool slug: ${tool.slug}`);
    slugs.add(tool.slug);
    for (const key of ["name", "summary", "description", "repository"]) {
      if (typeof tool[key] !== "string" || !tool[key].trim()) errors.push(`${prefix}.${key} is required`);
    }
    if (!TOOL_STATUSES.has(tool.status)) errors.push(`${prefix}.status is invalid`);
    if (typeof tool.featured !== "boolean") errors.push(`${prefix}.featured must be boolean`);
    if (!Number.isInteger(tool.sort_order) || tool.sort_order < 0) errors.push(`${prefix}.sort_order is invalid`);
    for (const key of ["screenshots", "features", "platforms"]) {
      if (!Array.isArray(tool[key])) errors.push(`${prefix}.${key} must be an array`);
    }

    const release = tool.release;
    if (!release || typeof release !== "object") {
      errors.push(`${prefix}.release is required`);
      continue;
    }
    if (!RELEASE_SOURCES.has(release.source)) errors.push(`${prefix}.release.source is invalid`);
    if (!RELEASE_CHANNELS.has(release.channel)) errors.push(`${prefix}.release.channel is invalid`);
    if (!VERSION_PATTERN.test(release.version || "")) errors.push(`${prefix}.release.version is invalid`);
    const versionKey = `${tool.id}@${release.version}`;
    if (versions.has(versionKey)) errors.push(`duplicate version: ${versionKey}`);
    versions.add(versionKey);
    if (release.published_at && !isDateTime(release.published_at)) {
      errors.push(`${prefix}.release.published_at is invalid`);
    }
    if (!Array.isArray(release.release_notes)) errors.push(`${prefix}.release.release_notes must be an array`);
    if (!Array.isArray(release.assets)) {
      errors.push(`${prefix}.release.assets must be an array`);
      continue;
    }
    const assetNames = new Set();
    for (const [assetIndex, asset] of release.assets.entries()) {
      const assetPrefix = `${prefix}.release.assets[${assetIndex}]`;
      if (!asset?.name) errors.push(`${assetPrefix}.name is required`);
      if (assetNames.has(asset?.name)) errors.push(`${prefix}.release has duplicate asset: ${asset.name}`);
      assetNames.add(asset?.name);
      if (!Number.isInteger(asset?.size) || asset.size < 0) errors.push(`${assetPrefix}.size is invalid`);
      if (!SHA256_PATTERN.test(asset?.sha256 || "")) errors.push(`${assetPrefix}.sha256 is invalid`);
      if (asset?.available) {
        const urlError = validateDownloadUrl(asset.url, extraHosts);
        if (urlError) errors.push(`${assetPrefix}: ${urlError}`);
        if (!asset.sha256) errors.push(`${assetPrefix}.sha256 is required when available`);
        if (!asset.size) errors.push(`${assetPrefix}.size is required when available`);
      }
    }
    const usableAssets = release.assets.filter((asset) => asset.available && !asset.recalled);
    if (release.download_available && usableAssets.length === 0) {
      errors.push(`${prefix}.release.download_available requires an available asset`);
    }
    if (release.recalled && release.download_available) {
      errors.push(`${prefix}.release cannot be downloadable when recalled`);
    }
  }
  return errors;
}

export function buildCatalog(source, releaseSnapshots) {
  const releases = new Map(releaseSnapshots.map((snapshot) => [snapshot.tool_id, snapshot]));
  const tools = source.tools.map((tool) => {
    const snapshot = releases.get(tool.id);
    if (!snapshot) throw new Error(`missing release snapshot for ${tool.id}`);
    const release = {
      source: snapshot.source,
      channel: snapshot.channel,
      version: snapshot.version,
      tag: snapshot.tag,
      published_at: snapshot.published_at,
      release_notes: snapshot.release_notes,
      download_available: snapshot.download_available,
      recalled: snapshot.recalled,
      assets: snapshot.assets
    };
    return { ...tool, release };
  }).sort((left, right) => left.sort_order - right.sort_order || left.name.localeCompare(right.name));
  const timestamps = [source.updated_at, ...releaseSnapshots.map((snapshot) => snapshot.updated_at)]
    .filter(isDateTime)
    .map((value) => new Date(value).getTime());
  return {
    schema_version: source.schema_version,
    generated_at: new Date(Math.max(...timestamps)).toISOString(),
    tools
  };
}

export async function writeJsonAtomically(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(temporaryPath, filePath);
}
