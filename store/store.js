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

function createFact(label, value) {
  const fact = document.createElement("div");
  fact.className = "tool-fact";
  appendText(fact, "span", "", label);
  appendText(fact, "strong", "", value);
  return fact;
}

function createToolCard(tool, index) {
  const card = document.createElement("article");
  card.className = "tool-card";
  card.dataset.toolId = tool.id;

  const identity = document.createElement("div");
  identity.className = "tool-identity";
  const mark = document.createElement("div");
  mark.className = "tool-mark";
  const productLogo = tool.id === "l-1-file-to-text" ? "assets/products/l-1-file-to-text/product-logo.png" : tool.icon;
  if (productLogo) {
    const image = document.createElement("img");
    image.src = productLogo;
    image.alt = `${tool.name} 产品 Logo`;
    mark.appendChild(image);
  } else {
    mark.textContent = tool.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
    mark.setAttribute("aria-label", `${tool.name} 文字标记`);
  }
  appendText(identity, "span", "tool-index", String(index + 1).padStart(2, "0"));
  identity.prepend(mark);

  const content = document.createElement("div");
  content.className = "tool-content";
  const heading = document.createElement("div");
  heading.className = "tool-heading";
  const headingCopy = document.createElement("div");
  appendText(headingCopy, "h3", "", tool.name);
  appendText(headingCopy, "p", "tool-summary", tool.summary);
  appendText(heading, "span", "status-badge", STATUS_LABELS[tool.status] || "状态待确认");
  heading.prepend(headingCopy);

  const availableAssets = tool.release.assets.filter((asset) => (
    asset.available && !asset.recalled && isAllowedDownloadUrl(asset.url)
  ));
  const primaryAsset = availableAssets[0] || null;
  const platforms = tool.platforms.map((platform) => {
    const architectures = Array.isArray(platform.architectures) ? platform.architectures.join("/") : "";
    return `${platform.name}${architectures ? ` ${architectures}` : ""}`;
  }).join("、") || "待补充";
  const facts = document.createElement("div");
  facts.className = "tool-facts";
  facts.append(
    createFact("Version", tool.release.version || "待补充"),
    createFact("Published", formatDate(tool.release.published_at)),
    createFact("Platform", platforms),
    createFact("File size", formatSize(primaryAsset?.size))
  );

  const footer = document.createElement("div");
  const actions = document.createElement("div");
  actions.className = "tool-actions";
  const actionGroup = document.createElement("div");
  actionGroup.className = "tool-actions-group";
  const download = document.createElement(primaryAsset ? "a" : "button");
  download.className = "store-button primary";
  download.textContent = primaryAsset ? "下载安装包" : tool.status === "beta" ? "内测包准备中" : "暂无公开下载";
  if (primaryAsset) {
    download.href = primaryAsset.url;
    download.setAttribute("download", "");
  } else {
    download.type = "button";
    download.disabled = true;
  }
  actionGroup.appendChild(download);
  if (tool.links?.docs) {
    const detail = document.createElement("a");
    detail.className = "store-button";
    detail.href = tool.links.docs;
    detail.textContent = "查看详情";
    actionGroup.appendChild(detail);
  }
  if (tool.links?.feedback) {
    const feedback = document.createElement("a");
    feedback.className = "store-button";
    feedback.href = tool.links.feedback;
    feedback.textContent = "反馈与任务";
    actionGroup.appendChild(feedback);
  }
  actions.append(actionGroup);
  appendText(
    actions,
    "span",
    "download-note",
    tool.release.recalled ? "当前版本已撤回" : primaryAsset ? "HTTPS · SHA-256 可校验" : "内测中"
  );
  footer.appendChild(actions);

  if (tool.release.release_notes.length) {
    const details = document.createElement("details");
    details.className = "release-notes";
    appendText(details, "summary", "", "查看更新说明");
    const list = document.createElement("ul");
    tool.release.release_notes.forEach((note) => appendText(list, "li", "", note));
    details.appendChild(list);
    footer.appendChild(details);
  }

  content.append(heading, facts, footer);
  card.append(identity, content);
  return card;
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

  const tools = catalog.tools.filter(validTool);
  elements.loading.hidden = true;
  elements.empty.hidden = tools.length > 0;
  tools.forEach((tool, index) => elements.list.appendChild(createToolCard(tool, index)));
  elements.list.setAttribute("aria-busy", "false");
  const date = formatDate(catalog.generated_at);
  elements.meta.textContent = `${usingFallback ? "稳定快照" : "Catalog"} · 更新于 ${date}`;
  if (tools.length !== catalog.tools.length) {
    showError("部分工具资料未通过页面校验，已安全跳过。");
  }
}

elements.retry?.addEventListener("click", loadCatalog);
loadCatalog();
