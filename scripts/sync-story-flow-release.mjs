import path from "node:path";
import { fileURLToPath } from "node:url";
import { readJson, validateDownloadUrl, writeJsonAtomically } from "./store-catalog-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = path.join(root, "store", "releases", "story-flow.json");
const repository = "L-One-Tools/story-flow";

async function main() {
  const token = process.env.STORE_SYNC_GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    throw new Error("STORE_SYNC_GITHUB_TOKEN is required to read the private Story Flow repository.");
  }

  const response = await fetch(`https://api.github.com/repos/${repository}/releases/latest`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "L-One-Store-Sync"
    }
  });

  if (response.status === 404) {
    console.log("Story Flow has no GitHub Release. The current internal snapshot was preserved.");
    return;
  }
  if (!response.ok) {
    throw new Error(`GitHub Release request failed with HTTP ${response.status}.`);
  }

  const release = await response.json();
  const current = await readJson(snapshotPath);
  const version = String(release.tag_name || "").replace(/^v/i, "");
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`Release tag is not a supported semantic version: ${release.tag_name || "(empty)"}`);
  }
  if (current.version === version && current.tag === release.tag_name) {
    console.log(`Story Flow ${version} is already synchronized.`);
    return;
  }

  const downloadBase = (process.env.STORE_DOWNLOAD_BASE_URL || "").replace(/\/+$/, "");
  const assetsMirrored = process.env.STORE_ASSETS_MIRRORED === "true";
  const extraHosts = (process.env.STORE_ALLOWED_DOWNLOAD_HOSTS || "").split(",").filter(Boolean);
  const assets = (release.assets || []).map((asset) => {
    const digest = String(asset.digest || "").replace(/^sha256:/i, "");
    const url = downloadBase
      ? `${downloadBase}/story-flow/${encodeURIComponent(release.tag_name)}/${encodeURIComponent(asset.name)}`
      : "";
    const urlAllowed = url ? !validateDownloadUrl(url, extraHosts) : false;
    const available = Boolean(assetsMirrored && urlAllowed && digest && asset.size);
    return {
      name: asset.name,
      platform: /win|setup|\.exe$/i.test(asset.name) ? "windows" : "unknown",
      architecture: /x64|amd64/i.test(asset.name) ? "x64" : "unknown",
      size: Number(asset.size || 0),
      url: available ? url : "",
      sha256: digest,
      minimum_system: /win|setup|\.exe$/i.test(asset.name) ? "Windows 10" : "",
      available,
      recalled: false
    };
  });

  const releaseNotes = String(release.body || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[-*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 8);
  const usableAssets = assets.filter((asset) => asset.available && !asset.recalled);
  const snapshot = {
    schema_version: "1.0",
    tool_id: "story-flow",
    updated_at: release.published_at || release.created_at || new Date().toISOString(),
    source: "github-release",
    channel: release.prerelease ? "beta" : "stable",
    version,
    tag: release.tag_name,
    published_at: release.published_at || "",
    release_notes: releaseNotes,
    download_available: usableAssets.length > 0,
    recalled: false,
    assets
  };

  await writeJsonAtomically(snapshotPath, snapshot);
  console.log(
    `Synchronized Story Flow ${version}; public download is ${snapshot.download_available ? "enabled" : "disabled"}.`
  );
}

await main();
