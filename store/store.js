const PRIMARY_CATALOG_URL = "../public/data/store/catalog.json";
const FALLBACK_CATALOG_URL = "../public/data/store/catalog.last-known-good.json";
const STATUS_LABELS = {
  internal: "内测中",
  "coming-soon": "即将开放",
  beta: "公开内测",
  stable: "公开可用",
  unavailable: "暂不可用"
};
const ALLOWED_DOWNLOAD_HOSTS = ["l-one.asia"];
const OFFICIAL_GITHUB_RELEASE_PREFIX = "/L-One-Tools/l-one-tools-releases/releases/download/";

const elements = {
  loading: document.querySelector("[data-loading]"),
  error: document.querySelector("[data-error]"),
  errorMessage: document.querySelector("[data-error-message]"),
  empty: document.querySelector("[data-empty]"),
  list: document.querySelector("[data-tool-list]"),
  meta: document.querySelector("[data-catalog-meta]"),
  retry: document.querySelector("[data-retry]")
};

function validTool(tool) {
  return tool
    && typeof tool.id === "string"
    && typeof tool.slug === "string"
    && typeof tool.name === "string"
    && typeof tool.summary === "string"
    && Array.isArray(tool.platforms)
    && tool.release
    && typeof tool.release === "object"
    && Array.isArray(tool.release.assets);
}

function validCatalog(catalog) {
  return catalog
    && catalog.schema_version === "1.0"
    && typeof catalog.generated_at === "string"
    && !Number.isNaN(Date.parse(catalog.generated_at))
    && Array.isArray(catalog.tools);
}

function isAllowedDownloadUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value, location.origin);
    return url.protocol === "https:" && (
      ALLOWED_DOWNLOAD_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))
      || (url.hostname === "github.com" && url.pathname.startsWith(OFFICIAL_GITHUB_RELEASE_PREFIX))
    );
  } catch {
    return false;
  }
}

function formatDate(value) {
  if (!value || Number.isNaN(Date.parse(value))) return "待发布";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

function formatSize(value) {
  if (!Number.isFinite(value) || value <= 0) return "待补充";
  const units = ["B", "KB", "MB", "GB"];
  let size = value;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size >= 10 || unit === 0 ? size.toFixed(0) : size.toFixed(1)} ${units[unit]}`;
}

function appendText(parent, tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function createToolCard(tool) {
  const card = document.createElement("a");
  card.className = "catalog-card";
  card.dataset.toolId = tool.id;
  card.href = tool.links.docs;

  const cover = document.createElement("div");
  cover.className = "catalog-cover";
  const productLogo = tool.id === "l-1-file-to-text" ? "assets/products/l-1-file-to-text/product-logo.png" : tool.icon;
  if (productLogo) {
    const image = document.createElement("img");
    image.src = productLogo;
    image.alt = "";
    cover.appendChild(image);
  }

  const copy = document.createElement("div");
  appendText(copy, "h2", "", tool.name);
  appendText(copy, "p", "", tool.summary);
  const platforms = tool.platforms.map((platform) => {
    const architectures = Array.isArray(platform.architectures) ? platform.architectures.join("/") : "";
    return `${platform.name}${architectures ? ` ${architectures}` : ""}`;
  }).join("、") || "待补充";
  const meta = document.createElement("div");
  meta.className = "catalog-meta-row";
  appendText(meta, "span", "", platforms);
  appendText(meta, "span", "", STATUS_LABELS[tool.status] || "状态待确认");
  copy.appendChild(meta);
  card.append(cover, copy);
  return card;
}

function createCatalogNote() {
  const note = document.createElement("aside");
  note.className = "catalog-note";
  note.setAttribute("aria-label", "工具目录说明");
  appendText(note, "p", "eyebrow", "Catalog note");
  note.insertAdjacentHTML("beforeend", "<h2>先选工具，<br>再看详细说明。</h2><p>目录页不承担下载、校验和限制说明；这些留给单项详情页。</p><small>第 3 项公开工具加入后，此栏将替换为同规格工具卡。</small>");
  return note;
}

async function fetchCatalog(url, cache) {
  const response = await fetch(url, { cache });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const catalog = await response.json();
  if (!validCatalog(catalog)) throw new Error("Catalog 基础结构无效");
  return catalog;
}

function showError(message) {
  elements.errorMessage.textContent = message;
  elements.error.hidden = false;
}

async function loadCatalog() {
  elements.loading.hidden = false;
  elements.error.hidden = true;
  elements.empty.hidden = true;
  elements.list.replaceChildren();
  elements.list.setAttribute("aria-busy", "true");
  let catalog;
  let usingFallback = false;
  try {
    catalog = await fetchCatalog(PRIMARY_CATALOG_URL, "no-cache");
  } catch (primaryError) {
    try {
      catalog = await fetchCatalog(FALLBACK_CATALOG_URL, "force-cache");
      usingFallback = true;
      showError("最新资料读取失败，当前显示上一份有效快照。");
    } catch {
      elements.loading.hidden = true;
      elements.meta.textContent = "Catalog 不可用";
      showError(`无法读取工具资料：${primaryError.message}`);
      elements.list.setAttribute("aria-busy", "false");
      return;
    }
  }

  const tools = catalog.tools.filter((tool) => validTool(tool) && tool.links?.docs && ["stable", "beta"].includes(tool.status));
  elements.loading.hidden = true;
  elements.empty.hidden = tools.length > 0;
  tools.forEach((tool) => elements.list.appendChild(createToolCard(tool)));
  elements.list.appendChild(createCatalogNote());
  elements.list.setAttribute("aria-busy", "false");
  const date = formatDate(catalog.generated_at);
  elements.meta.textContent = `${usingFallback ? "稳定快照" : "Catalog"} · 更新于 ${date}`;
}

elements.retry?.addEventListener("click", loadCatalog);
loadCatalog();
