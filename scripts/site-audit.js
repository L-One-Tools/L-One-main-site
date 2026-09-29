const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "index.html");
const worksIndexPath = path.join(root, "assets", "works", "index.json");
const materialsDir = path.join(root, "materials");
const materialsHtmlPath = path.join(materialsDir, "index.html");
const materialsCssPath = path.join(materialsDir, "materials.css");
const materialsJsPath = path.join(materialsDir, "materials.js");
const materialsConfigPath = path.join(materialsDir, "config.json");
const materialsDataPath = path.join(materialsDir, "data", "assets.json");
const motionLibraryHtmlPath = path.join(root, "motion-library.html");
const storeDir = path.join(root, "store");
const storeHtmlPath = path.join(storeDir, "index.html");
const storeCssPath = path.join(storeDir, "store.css");
const storeJsPath = path.join(storeDir, "store.js");
const fileToTextDir = path.join(storeDir, "l-1-file-to-text");
const fileToTextHtmlPath = path.join(fileToTextDir, "index.html");
const fileToTextCssPath = path.join(fileToTextDir, "tool-detail.css");
const fileToTextJsPath = path.join(fileToTextDir, "tool-detail.js");
const webCaptureDir = path.join(storeDir, "l-1-web-capture");
const webCaptureHtmlPath = path.join(webCaptureDir, "index.html");
const webCaptureCssPath = path.join(webCaptureDir, "web-capture.css");
const webCaptureJsPath = path.join(webCaptureDir, "web-capture.js");
const onebarDir = path.join(storeDir, "onebar");
const onebarHtmlPath = path.join(onebarDir, "index.html");
const onebarLogoPath = path.join(storeDir, "assets", "products", "onebar", "onebar-mark-transparent.png");
const storeSourcePath = path.join(storeDir, "catalog.source.json");
const storeSchemaPath = path.join(storeDir, "catalog.schema.json");
const storeCatalogPath = path.join(root, "public", "data", "store", "catalog.json");
const storeFallbackPath = path.join(root, "public", "data", "store", "catalog.last-known-good.json");
const storeWorkflowPath = path.join(root, ".github", "workflows", "store-catalog-sync.yml");
const robotsPath = path.join(root, "robots.txt");
const sitemapPath = path.join(root, "sitemap.xml");
const spatialLibraryDir = path.join(root, "library");
const spatialLibraryHtmlPath = path.join(spatialLibraryDir, "index.html");
const spatialLibraryDataPath = path.join(spatialLibraryDir, "data", "cards.json");

const SOURCE_PLATFORM = "\u5c0f\u7ea2\u4e66";
const TYPE_IMAGE_TEXT = "\u56fe\u6587";
const TYPE_VIDEO = "\u89c6\u9891";
const TYPE_ARTICLE = "\u6587\u7ae0";
const ALLOWED_TYPES = new Set([TYPE_IMAGE_TEXT, TYPE_VIDEO, TYPE_ARTICLE]);
const KICKER_SEPARATOR = "\u00b7";

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function stripHtml(value) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function stripNonVisibleBlocks(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

function fail(message) {
  failures.push(message);
}

function checkNoCorruption(label, value) {
  if (/[?]{2,}|\uFFFD|锟/.test(value)) {
    fail(`${label} contains replacement/question-mark corruption.`);
  }
}

const failures = [];
const html = read(htmlPath);
const visibleHtml = stripNonVisibleBlocks(html);
const worksIndex = JSON.parse(read(worksIndexPath));
const portfolioHtmlPath = path.join(root, "portfolio.html");

if (!html.includes('href="materials/"') || !html.includes('<strong>Materials</strong><span>素材库</span>')) {
  fail("Main navigation should include Materials / 素材库 linking to materials/.");
}
if (!html.includes('{ url: "materials/", title: "Materials"')) {
  fail("Home search index should include the Materials page.");
}
if (!html.includes('href="store/"') || !html.includes('<strong>Store</strong><span>工具</span>')) {
  fail("Main navigation should include Store / 工具 linking to store/.");
}
if (!html.includes('{ url: "store/", title: "Store"')) {
  fail("Home search index should include the Store page.");
}
if (/#recent|page-recent|data-route="recent"|route: "recent"/.test(html)) {
  fail("The removed Recent section must not remain in main navigation, routes, page markup, or search.");
}
if (!html.includes("grid-template-columns: repeat(5, minmax(0, 1fr));")) {
  fail("Home center navigation should use five columns.");
}
const mainNav = html.match(/<nav class="nav" aria-label="主导航">([\s\S]*?)<\/nav>/)?.[1] || "";
if (mainNav.indexOf('href="store/"') === -1 || mainNav.indexOf('href="store/"') > mainNav.indexOf('href="portfolio.html"')) {
  fail("Store should be the first item in the main site navigation.");
}
const homeNav = html.match(/<nav class="home-m3-nav" aria-label="主导航">([\s\S]*?)<\/nav>/)?.[1] || "";
if (homeNav.indexOf('href="store/"') === -1 || homeNav.indexOf('href="store/"') > homeNav.indexOf('href="portfolio.html"')) {
  fail("Store should be the first item in the home center navigation.");
}
if (!mainNav.includes('href="library/"') || !homeNav.includes('href="library/"')) {
  fail("Library should appear in both first-level navigations.");
}
if (html.includes('id="page-skills"') || mainNav.includes('>Notes<') || homeNav.includes('>notes<')) {
  fail("The removed Notes page and navigation must not remain.");
}
if (!html.includes('rawRoute === "skills"') || !html.includes('store/#motion-library')) {
  fail("Legacy Notes links should reach the Motion Library card in Store.");
}
if (!/\.home-m3-nav\s*\{[^}]*grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/.test(html)) {
  fail("Home center navigation should keep all five links on one row.");
}

[
  materialsHtmlPath,
  materialsCssPath,
  materialsJsPath,
  materialsConfigPath,
  materialsDataPath,
].forEach((filePath) => {
  if (!fs.existsSync(filePath)) fail(`Materials page file is missing: ${path.relative(root, filePath)}.`);
});

if (fs.existsSync(materialsHtmlPath)) {
  const materialsHtml = read(materialsHtmlPath);
  const visibleMaterialsHtml = stripNonVisibleBlocks(materialsHtml);
  checkNoCorruption("visible materials/index.html", visibleMaterialsHtml);
  [
    "Materials",
    "素材库",
    "搜索素材",
    "分类",
    "文件类型",
    "标签",
    "素材上传",
    "暂无素材",
  ].forEach((term) => {
    if (!visibleMaterialsHtml.includes(term)) fail(`Materials page is missing visible text: ${term}.`);
  });
  ["grid", "list", "folder"].forEach((view) => {
    if (!materialsHtml.includes(`data-view="${view}"`)) fail(`Materials page is missing ${view} view control.`);
  });
  if (!materialsHtml.includes('href="../index.html#home"')) {
    fail("Materials page should link back to the main site home route.");
  }
  if (materialsHtml.includes('<strong>Notes</strong>')) fail("Materials navigation must omit Notes.");
  if (!materialsHtml.includes('href="../store/"')) {
    fail("Materials navigation should link to Store.");
  }
  const materialsNav = materialsHtml.match(/<nav class="site-nav" aria-label="主导航">([\s\S]*?)<\/nav>/)?.[1] || "";
  if (materialsNav.includes("#recent") || materialsNav.indexOf('href="../store/"') > materialsNav.indexOf('href="../portfolio.html"')) {
    fail("Materials navigation should remove Recent and place Store first.");
  }
}

if (fs.existsSync(materialsCssPath)) {
  const materialsCss = read(materialsCssPath);
  if (!materialsCss.includes("--page: #fff;")) {
    fail("Materials page background should match the main site's white background.");
  }
  if (!materialsCss.includes("background: rgba(255, 255, 255, .88);")) {
    fail("Materials header background should match the white page background.");
  }
}

if (fs.existsSync(materialsJsPath)) {
  const materialsJs = read(materialsJsPath);
  try {
    new Function(materialsJs);
  } catch (error) {
    fail(`materials.js syntax error: ${error.message}`);
  }
  ["manifestUrl", "mediaBaseUrl", "renderAssets", "applyFilters"].forEach((term) => {
    if (!materialsJs.includes(term)) fail(`materials.js is missing required data hook: ${term}.`);
  });
}
if (fs.existsSync(materialsConfigPath) && fs.existsSync(materialsDataPath)) {
  const config = JSON.parse(read(materialsConfigPath));
  const snapshot = JSON.parse(read(materialsDataPath));
  if (config.manifestUrl !== "data/assets.json" || !Array.isArray(snapshot) || snapshot.length < 200) {
    fail("Materials needs its local snapshot before background remote refresh.");
  }
}

if (fs.existsSync(motionLibraryHtmlPath)) {
  const motionLibraryHtml = read(motionLibraryHtmlPath);
  if (motionLibraryHtml.includes('<strong>Motion Library</strong>')) {
    fail("Motion Library should not appear as a top-level navigation item.");
  }
  if (motionLibraryHtml.includes('<strong>Notes</strong>')) {
    fail("Motion Library navigation must omit Notes.");
  }
  if (!motionLibraryHtml.includes('class="motion-back-link" href="store/#motion-library"')) {
    fail("Motion Library should return to its Store card.");
  }
  if (!motionLibraryHtml.includes('href="store/"')) {
    fail("Motion Library navigation should link to Store.");
  }
  const motionNav = motionLibraryHtml.match(/<nav class="motion-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1] || "";
  if (motionNav.includes("#recent") || motionNav.indexOf('href="store/"') > motionNav.indexOf('href="portfolio.html"')) {
    fail("Motion Library navigation should remove Recent and place Store first.");
  }
}

[
  storeHtmlPath,
  storeCssPath,
  storeJsPath,
  fileToTextHtmlPath,
  fileToTextCssPath,
  fileToTextJsPath,
  storeSourcePath,
  storeSchemaPath,
  storeCatalogPath,
  storeFallbackPath,
  storeWorkflowPath,
  robotsPath,
  sitemapPath,
  onebarHtmlPath,
  onebarLogoPath,
].forEach((filePath) => {
  if (!fs.existsSync(filePath)) fail(`Store file is missing: ${path.relative(root, filePath)}.`);
});

if (fs.existsSync(storeHtmlPath)) {
  const storeHtml = read(storeHtmlPath);
  checkNoCorruption("visible store/index.html", stripNonVisibleBlocks(storeHtml));
  ["L-One Store", "Catalog / 02", "工具目录", "编辑推荐"].forEach((term) => {
    if (!storeHtml.includes(term)) fail(`Store page is missing required text: ${term}.`);
  });
  if (storeHtml.includes('class="store-hero"')) {
    fail("Store page must not retain the removed introductory hero.");
  }
  ["description", "canonical", "og:title", "application/ld+json"].forEach((term) => {
    if (!storeHtml.includes(term)) fail(`Store page is missing SEO metadata: ${term}.`);
  });
  if (!storeHtml.includes('class="active" href="./" aria-current="page"')) {
    fail("Store navigation should expose an active current-page state.");
  }
  const storeNav = storeHtml.match(/<nav class="site-nav" aria-label="主导航">([\s\S]*?)<\/nav>/)?.[1] || "";
  if (storeNav.includes("#recent") || storeNav.indexOf('href="./"') > storeNav.indexOf('href="../portfolio.html"')) {
    fail("Store navigation should remove Recent and keep Store first.");
  }
  if (storeNav.includes('<strong>Notes</strong>') || !read(storeJsPath).includes('createMotionLibraryCard')) {
    fail("Store must replace Notes with its Motion Library resource card.");
  }
}

if (fs.existsSync(storeCssPath)) {
  const storeCss = read(storeCssPath);
  const mobileStoreRules = storeCss.match(/@media \(max-width: 580px\) \{([\s\S]*?)\n\}/)?.[1] || "";
  if (!mobileStoreRules.includes(".tool-list { grid-template-columns: minmax(0, 1fr); overflow: visible;")) {
    fail("Store mobile catalog should use a single-column grid without horizontal overflow.");
  }
}

if (fs.existsSync(onebarHtmlPath)) {
  const onebarHtml = read(onebarHtmlPath);
  checkNoCorruption("visible Store OneBar detail page", stripNonVisibleBlocks(onebarHtml));
  ["复制三次就烦了", "顶边一碰", "OneBar_Setup_v1.0.0.exe", "下载准备中", "Windows 10/11 x64", "安装包未签名"].forEach((term) => {
    if (!onebarHtml.includes(term)) fail(`OneBar detail page is missing required text: ${term}.`);
  });
  if (!onebarHtml.includes('href="../assets/products/onebar/onebar-mark-transparent.png"') || !onebarHtml.includes('type="button" disabled aria-disabled="true"')) {
    fail("OneBar detail page must use its transparent icon and keep download disabled until a public URL is verified.");
  }
  if (/\bdata-download\b|href=["'](?:file:|https?:\/\/)/i.test(onebarHtml)) {
    fail("OneBar detail page must not expose an unverified download or external link.");
  }
  ["hero-lit-screen.png", "onebar-oblique-closeup.png", "onebar-xiaobao-strip.png", "pain-triptych.png", "quiet-light.png", "workflow-hierarchy-banner.png"].forEach((name) => {
    if (!fs.existsSync(path.join(onebarDir, name))) fail(`OneBar article image is missing: ${name}.`);
  });
}

if (fs.existsSync(onebarLogoPath)) {
  const onebarLogo = fs.readFileSync(onebarLogoPath);
  const onebarLogoHash = crypto.createHash("sha256").update(onebarLogo).digest("hex").toUpperCase();
  if (onebarLogoHash !== "AFF9CCBDC625CE6DBD61294BE3CB6824968FB10019625BF3919BCE37300E5411") {
    fail("OneBar transparent logo checksum does not match the reviewed asset.");
  }
  if (onebarLogo.readUInt32BE(16) !== 1254 || onebarLogo.readUInt32BE(20) !== 1254 || onebarLogo[25] !== 6) {
    fail("OneBar logo should remain a 1254×1254 PNG with an alpha channel.");
  }
}

[webCaptureHtmlPath, webCaptureCssPath, webCaptureJsPath].forEach((filePath) => {
  if (!fs.existsSync(filePath)) fail(`Web Capture preview file is missing: ${path.relative(root, filePath)}.`);
});

if (fs.existsSync(webCaptureHtmlPath)) {
  const webCaptureHtml = read(webCaptureHtmlPath);
  checkNoCorruption("visible Web Capture detail page", stripNonVisibleBlocks(webCaptureHtml));
  ["L-1 网页拓印", "公开内测", "v0.2.2", "Chrome 116+", "网页长图", "网页录制", "下载内测包", "内测反馈："].forEach((term) => {
    if (!webCaptureHtml.includes(term)) fail(`Web Capture detail page is missing required text: ${term}.`);
  });
  ["网页自己滚动", "浏览器插件", "仍有瑕疵", 'chrome://extensions'].forEach((term) => {
    if (!webCaptureHtml.includes(term)) fail(`Web Capture detail page is missing revised preview text: ${term}.`);
  });
  ["01 · TWO WAYS", "02 · THREE STEPS", "03 · WHAT YOU WILL FIND", "04 · BETA BOUNDARIES", "使用前再确认一次"].forEach((term) => {
    if (webCaptureHtml.includes(term)) fail(`Web Capture detail page retains removed section annotation or FAQ title: ${term}.`);
  });
  const webCaptureDownloadUrl = "https://github.com/L-One-Tools/l-one-tools-releases/releases/download/l-1-web-imprint-v0.2.2/L-1-.-v0.2.2-.zip";
  const webCaptureDownloadAnchors = [...webCaptureHtml.matchAll(/<a[^>]*data-download[^>]*href="([^"]+)"[^>]*>/g)].map((match) => match[1]);
  if (webCaptureDownloadAnchors.length !== 2 || webCaptureDownloadAnchors.some((url) => url !== webCaptureDownloadUrl)) {
    fail("Web Capture detail page should use only the verified v0.2.2 public download URL for both download controls.");
  }
  if (!webCaptureHtml.includes("https://github.com/L-One-Tools/l-one-tools-releases/issues/3")) {
    fail("Web Capture detail page is missing the verified feedback link.");
  }
}

if (fs.existsSync(webCaptureJsPath)) {
  const webCaptureJs = read(webCaptureJsPath);
  try { new Function(webCaptureJs); } catch (error) { fail(`Web Capture detail script syntax error: ${error.message}`); }
  ["desktopLines", "mobileLines", "IntersectionObserver"].forEach((term) => {
    if (!webCaptureJs.includes(term)) fail(`Web Capture detail script is missing required interaction hook: ${term}.`);
  });
}

if (fs.existsSync(webCaptureCssPath) && !read(webCaptureCssPath).includes("preview-download")) {
  fail("Web Capture detail stylesheet is missing the download control styling.");
}

[
  ["assets/wordmark.svg", "33C4EBC479C0097411F5888E81B5D1D294569974656922DA9E2B5A6A50DF68BB"],
  ["assets/real-long-page-preview.png", "EFAAD8B0538B75709380B753A41731684C185784DA7E7C6D7A2DB78EB71AFB98"],
  ["assets/real-popup-preview.png", "D961EBE7A6A8239CC48957A1230E4A7A0A02077A6446250194E476CBE7F61AEA"]
].forEach(([relativePath, expectedHash]) => {
  const assetPath = path.join(webCaptureDir, relativePath);
  if (!fs.existsSync(assetPath)) { fail(`Web Capture preview asset is missing: ${relativePath}.`); return; }
  const rawAsset = fs.readFileSync(assetPath);
  const canonicalAsset = relativePath.endsWith(".svg")
    ? Buffer.from(rawAsset.toString("utf8").replace(/\r\n/g, "\n"), "utf8")
    : rawAsset;
  const actualHash = crypto.createHash("sha256").update(canonicalAsset).digest("hex").toUpperCase();
  if (actualHash !== expectedHash) fail(`Web Capture preview asset hash mismatch: ${relativePath}.`);
});

[
  ["assets/products/l-1-web-capture/logo-2d-local-preview.png", "68ED144F372F34B25E16C1D8A810CBAC6E55543790115AE1DD7518AD99865C79"],
  ["assets/products/l-1-web-capture/logo-3d-local-preview.png", "9F7F6DE885CB2454FBA762B10D065E0895A86DD42FF854ACAC6F0B4EF441418C"]
].forEach(([relativePath, expectedHash]) => {
  const assetPath = path.join(storeDir, relativePath);
  if (!fs.existsSync(assetPath)) { fail(`Web Capture local-preview logo is missing: ${relativePath}.`); return; }
  const actualHash = crypto.createHash("sha256").update(fs.readFileSync(assetPath)).digest("hex").toUpperCase();
  if (actualHash !== expectedHash) fail(`Web Capture local-preview logo hash mismatch: ${relativePath}.`);
});

if (fs.existsSync(fileToTextHtmlPath)) {
  const fileToTextHtml = read(fileToTextHtmlPath);
  checkNoCorruption("visible store/l-1-file-to-text/index.html", stripNonVisibleBlocks(fileToTextHtml));
  [
    "L-1 File To Text",
    "先把音视频",
    "变成可读文字",
    "Windows",
    "公开内测",
    "146,969,357 bytes",
    "B4CB233299B9660EAC81F702A7215DA13401AEFB79D6591EB651C3F47CDA3406",
    "FireRed",
    "FFmpeg",
    "不提供中文翻译稿、SRT 或 VTT",
    "大批量真实文件仍在测试",
  ].forEach((term) => {
    if (!fileToTextHtml.includes(term)) fail(`File To Text detail page is missing required text: ${term}.`);
  });
  const exactDownloadUrl = "https://github.com/L-One-Tools/l-one-tools-releases/releases/download/l-1-file-to-text-v2.1.0-public-beta/L-1.File.To.Text.Setup.v2.1.0.exe";
  const downloadAnchors = [...fileToTextHtml.matchAll(/<a[^>]*data-download[^>]*href="([^"]+)"[^>]*>/g)].map((match) => match[1]);
  if (downloadAnchors.length !== 2 || downloadAnchors.some((url) => url !== exactDownloadUrl)) {
    fail("File To Text detail page should use only the verified v2.1.0 public beta download URL for both download controls.");
  }
  if (!fileToTextHtml.includes("https://github.com/L-One-Tools/l-one-tools-releases/releases/tag/l-1-file-to-text-v2.1.0-public-beta") || !fileToTextHtml.includes("https://github.com/L-One-Tools/l-one-tools-releases/tree/main/l-1-file-to-text/2.1.0_2026-09-04") || !fileToTextHtml.includes("https://github.com/L-One-Tools/l-one-tools-releases/issues/4")) {
    fail("File To Text detail page is missing the verified Release or public materials link.");
  }
  if (fileToTextHtml.includes("93d82e74-a597-4ee5-8018-e00a8a521b80.png")) {
    fail("File To Text detail page must not reference the prohibited screenshot.");
  }
  if (fileToTextHtml.includes('href="file:') || fileToTextHtml.includes("localhost")) {
    fail("File To Text detail page must not expose local download paths.");
  }
  const detailNav = fileToTextHtml.match(/<nav class="site-nav" aria-label="主导航">([\s\S]*?)<\/nav>/)?.[1] || "";
  if (detailNav.includes("#recent") || detailNav.indexOf('href="../"') > detailNav.indexOf('href="../../portfolio.html"')) {
    fail("File To Text detail navigation should remove Recent and keep Store first.");
  }
}

if (fs.existsSync(fileToTextJsPath)) {
  const fileToTextJs = read(fileToTextJsPath);
  try {
    new Function(fileToTextJs);
  } catch (error) {
    fail(`File To Text detail script syntax error: ${error.message}`);
  }
  ["desktopLines", "mobileLines", "ArrowRight", "dataset.error"].forEach((term) => {
    if (!fileToTextJs.includes(term)) fail(`File To Text detail script is missing required interaction hook: ${term}.`);
  });
}

if (fs.existsSync(fileToTextCssPath)) {
  const fileToTextCss = read(fileToTextCssPath);
  ["white-space: nowrap", "prefers-reduced-motion", "aria-selected", "data-state=\"disabled\""].forEach((term) => {
    if (!fileToTextCss.includes(term)) fail(`File To Text detail stylesheet is missing required responsive/accessibility state: ${term}.`);
  });
}

[
  ["assets/txt-1.png", "038973D97B6DEEEB592DE834D7FBA370B4BBBF87AA81751722C7903721643C1F"],
  ["assets/txt-2.png", "1638E40D414923267A4B3C03B8A206BFFAD961F0F21E67F293FE1A9C793FD7DD"],
  ["assets/txt-3.png", "43D2018DA5C4F45F6B961F312B5AC91C9F52DD008E50FECE764296345D0C0846"]
].forEach(([relativePath, expectedHash]) => {
  const assetPath = path.join(fileToTextDir, relativePath);
  if (!fs.existsSync(assetPath)) {
    fail(`File To Text safe screenshot is missing: ${relativePath}.`);
    return;
  }
  const actualHash = crypto.createHash("sha256").update(fs.readFileSync(assetPath)).digest("hex").toUpperCase();
  if (actualHash !== expectedHash) fail(`File To Text screenshot hash mismatch: ${relativePath}.`);
});

if (fs.existsSync(storeWorkflowPath)) {
  const workflow = read(storeWorkflowPath);
  ["workflow_dispatch", "schedule", "repository_dispatch", "STORE_SYNC_GITHUB_TOKEN"].forEach((term) => {
    if (!workflow.includes(term)) fail(`Store workflow is missing required trigger/configuration: ${term}.`);
  });
}

if (fs.existsSync(robotsPath) && !read(robotsPath).includes("https://l-one.asia/sitemap.xml")) {
  fail("robots.txt should reference the public sitemap.");
}
if (fs.existsSync(sitemapPath) && (!read(sitemapPath).includes("https://l-one.asia/store/") || !read(sitemapPath).includes("https://l-one.asia/store/l-1-file-to-text/") || !read(sitemapPath).includes("https://l-one.asia/store/onebar/"))) {
  fail("sitemap.xml should include the Store, File To Text, and OneBar routes.");
}

if (fs.existsSync(storeJsPath)) {
  const storeJs = read(storeJsPath);
  try {
    new Function(storeJs);
  } catch (error) {
    fail(`store.js syntax error: ${error.message}`);
  }
  ["PRIMARY_CATALOG_URL", "FALLBACK_CATALOG_URL", "isAllowedDownloadUrl", "loadCatalog"].forEach((term) => {
    if (!storeJs.includes(term)) fail(`store.js is missing required data hook: ${term}.`);
  });
}

if (fs.existsSync(storeCatalogPath)) {
  const storeCatalog = JSON.parse(read(storeCatalogPath));
  if (storeCatalog.schema_version !== "1.0") fail("Store Catalog schema_version should be 1.0.");
  const storyFlow = storeCatalog.tools?.find((tool) => tool.id === "story-flow");
  const fileToText = storeCatalog.tools?.find((tool) => tool.id === "l-1-file-to-text");
  const webCapture = storeCatalog.tools?.find((tool) => tool.id === "l-1-web-capture");
  const onebar = storeCatalog.tools?.find((tool) => tool.id === "onebar");
  if (!storyFlow) fail("Store Catalog should include Story Flow.");
  if (!fileToText) fail("Store Catalog should include L-1 File To Text.");
  if (!webCapture) fail("Store Catalog should include L-1 网页拓印.");
  if (!onebar) fail("Store Catalog should include OneBar.");
  if (storeCatalog.tools?.[0]?.id !== "onebar" || onebar?.status !== "coming-soon" || onebar?.release?.download_available !== false || onebar?.release?.assets?.[0]?.available !== false || onebar?.release?.assets?.[0]?.url !== "") {
    fail("OneBar must be the first Store card and remain visibly coming soon without a verified download URL.");
  }
  if (storyFlow?.release?.download_available !== false) {
    fail("Story Flow must remain unavailable until a public installer is verified.");
  }
  if (fileToText?.release?.version !== "2.1.0" || fileToText?.release?.channel !== "beta" || fileToText?.release?.download_available !== true) {
    fail("L-1 File To Text should expose only the verified v2.1.0 public beta release.");
  }
  if (fileToText?.release?.assets?.[0]?.url !== "https://github.com/L-One-Tools/l-one-tools-releases/releases/download/l-1-file-to-text-v2.1.0-public-beta/L-1.File.To.Text.Setup.v2.1.0.exe") {
    fail("L-1 File To Text Catalog should use only the verified v2.1.0 public beta download URL.");
  }
  if (webCapture?.release?.version !== "0.2.2" || webCapture?.release?.channel !== "beta" || webCapture?.release?.download_available !== true) {
    fail("L-1 网页拓印 Catalog must expose the verified v0.2.2 public beta download.");
  }
  if (webCapture?.release?.assets?.[0]?.url !== "https://github.com/L-One-Tools/l-one-tools-releases/releases/download/l-1-web-imprint-v0.2.2/L-1-.-v0.2.2-.zip" || webCapture?.release?.assets?.[0]?.size !== 16700 || webCapture?.release?.assets?.[0]?.sha256 !== "fb9441ed595e24e6a6b9e8dd3d994e353b412fa22efc44c923ad7e7d499df055") {
    fail("L-1 网页拓印 Catalog must match the verified v0.2.2 asset metadata.");
  }
}

if (fs.existsSync(materialsConfigPath)) {
  const config = JSON.parse(read(materialsConfigPath));
  if (!Object.prototype.hasOwnProperty.call(config, "manifestUrl")) fail("Materials config is missing manifestUrl.");
  if (!Object.prototype.hasOwnProperty.call(config, "mediaBaseUrl")) fail("Materials config is missing mediaBaseUrl.");
  if (!Object.prototype.hasOwnProperty.call(config, "uploadUrl")) fail("Materials config is missing uploadUrl.");
}

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  fail("index.html is missing its inline script block.");
} else {
  try {
    new Function(scriptMatch[1]);
  } catch (error) {
    fail(`inline script syntax error: ${error.message}`);
  }
}

[
  "\u539f\u6587\u5185\u5bb9",
  "\u539f\u59cb\u5185\u5bb9\u5165\u53e3",
  "\u5f52\u6863\u5230 L-One",
  "source-card",
].forEach((term) => {
  if (visibleHtml.includes(term)) fail(`forbidden front-end text found: ${term}`);
});

checkNoCorruption("visible index.html", visibleHtml);
checkNoCorruption("assets/works/index.json", read(worksIndexPath));

if (visibleHtml.includes(` ${KICKER_SEPARATOR.replace(KICKER_SEPARATOR, "?")} `)) {
  fail("visible index.html contains a question-mark separator between labels.");
}

if (html.includes('id="page-works"') || html.includes('id="page-work-')) {
  fail("The former Works page and its detail pages must be removed from the main HTML.");
}
if (!html.includes('href="portfolio.html"') || !html.includes('location.replace("portfolio.html")')) {
  fail("Works navigation and legacy hashes should resolve to the promoted portfolio.");
}
if (!fs.existsSync(portfolioHtmlPath)) {
  fail("The first-level Works portfolio page is missing.");
} else {
  const portfolioHtml = read(portfolioHtmlPath);
  if (!portfolioHtml.includes('href="assets/site-chrome.css"') ||
      !portfolioHtml.includes('href="library/"') ||
      !portfolioHtml.includes('href="store/"')) {
    fail("The Works portfolio must include shared first-level navigation.");
  }
  if (!portfolioHtml.includes('const projects = [') ||
      !portfolioHtml.includes('跳转原文链接') ||
      !portfolioHtml.includes('assets/portfolio-v9/')) {
    fail("The promoted Works portfolio appears to be missing its project content.");
  }
  if (!portfolioHtml.includes('preloadProjectVisuals()') || !portfolioHtml.includes('showProjectVisual(p)')) {
    fail("Works should decode project images before swapping them.");
  }
}
const aboutHtmlPath = path.join(root, "assets", "about-v42", "L-One-Homepage-v4.2-FIXED-SINGLE.html");
const aboutHtml = read(aboutHtmlPath);
for (const asset of ["wechat-v1.png", "rednote-v1.png", "l-one-v1.png"]) {
  if (!aboutHtml.includes(`contact-transparent/${asset}`) ||
      !fs.existsSync(path.join(root, "assets", "about-v42", "contact-transparent", asset))) {
    fail(`About contact icon is missing its transparent version: ${asset}`);
  }
}
for (const work of worksIndex) {
  const metadataPath = path.join(root, work.metadata);
  const metadataText = read(metadataPath);
  const metadata = JSON.parse(metadataText);
  checkNoCorruption(`${work.slug} metadata.json`, metadataText);
  if (metadata.sourcePlatform !== SOURCE_PLATFORM ||
      !ALLOWED_TYPES.has(metadata.type) ||
      work.sourcePlatform !== metadata.sourcePlatform ||
      work.type !== metadata.type) {
    fail(`${work.slug} archived metadata/index relationship is inconsistent.`);
  }
}

if (!fs.existsSync(spatialLibraryHtmlPath) || !fs.existsSync(spatialLibraryDataPath)) {
  fail("Spatial Library page or Drive data snapshot is missing.");
} else {
  const spatialHtml = read(spatialLibraryHtmlPath);
  const spatialCards = JSON.parse(read(spatialLibraryDataPath));
  if (!spatialHtml.includes("fetch('./data/cards.json'")) {
    fail("Spatial Library must load its Drive data snapshot.");
  }
  if (!spatialCards.length || new Set(spatialCards.map((card) => card.id)).size !== spatialCards.length ||
      spatialCards.some((card) => !/^(STYLE|IMAGE)-\d{3}$/.test(card.id))) {
    fail("Spatial Library needs unique, valid Drive card IDs.");
  }
  for (const card of spatialCards) {
    if (!card.source?.registry_file_id || !card.source?.preview_file_id || !card.copy_prompt) {
      fail(`Spatial Library card ${card.id} lacks Drive provenance or prompt.`);
    }
    for (const asset of [card.cover_data, ...(card.detail_data || [])]) {
      if (!asset?.startsWith("./assets/cards/") ||
          !fs.existsSync(path.join(spatialLibraryDir, asset.slice(2)))) {
        fail(`Spatial Library card ${card.id} has a missing local Drive asset: ${asset}`);
      }
    }
  }
}

if (failures.length) {
  console.error("Site audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Site audit passed: first-level portfolio, Library, and ${worksIndex.length} archived work records checked.`);
