const LOCAL_THUMBNAILS = new Set(["0030cb3ee0384c3ab82fbfe008f4374a", "0034ee53b7fc40a28c97aec4fecd11ee", "00447caea1874ca0b4d4433b5b7f9e76", "017964293adf477392caae3bad3ea556", "02d250318c6543c6903150988f47080b", "040f2fd3b7ea4e678aadcb4641692450", "053635846d824b3ba6b675798e9c1950", "05da57243ae74f2a83055c164bfc17c4", "089c1942361743119d43781ac9bd753c", "0aca7d0a10744797ba28c337025e18fc", "11af4e57b922480ea9a1bb2ecf0d040d", "126ce9ea304b4b00b2b77061828e6956", "1389dccb8d224eb380fa6df51a51760b", "13d4a2a360b34234976ab1ceca9f437d", "14529af6466d4de5aa084489781dc3ed", "14cd19b3b5ba48638a0fea7c50e6aeed", "15438e8781924065952c8ec9618385ae", "1bae57179ede4f3f8cc6faa6da872cde", "1bbc3bd3c7e3483e965a8082c01faa8c", "208990afb2bd44b8a514d8afd8888e2d"]);

const state = {
  config: { manifestUrl: "data/assets.json", mediaBaseUrl: "", uploadUrl: "" },
  assets: [],
  filteredAssets: [],
  category: "全部",
  types: new Set(),
  tags: new Set(),
  query: "",
  view: "grid",
  size: "medium",
};

const elements = {
  loading: document.querySelector("[data-loading]"),
  collection: document.querySelector("[data-asset-collection]"),
  empty: document.querySelector("[data-empty]"),
  error: document.querySelector("[data-error]"),
  errorMessage: document.querySelector("[data-error-message]"),
  search: document.querySelector("[data-search]"),
  searchCount: document.querySelector("[data-search-count]"),
  visibleCount: document.querySelector("[data-visible-count]"),
  categories: document.querySelector("[data-category-filters]"),
  types: document.querySelector("[data-type-filters]"),
  tags: document.querySelector("[data-tag-filters]"),
  drawer: document.querySelector("[data-filter-drawer]"),
  filterToggle: document.querySelector("[data-filter-toggle]"),
  upload: document.querySelector("[data-upload]"),
  detail: document.querySelector("[data-detail-backdrop]"),
};

function resolveThumbnailUrl(asset) {
  const relative = asset.thumbnail || asset.previewGif || asset.image;
  if (LOCAL_THUMBNAILS.has(asset.id) && relative === `assets/${asset.id}/thumbnail.webp`) return relative;
  return resolveMediaUrl(relative);
}

function resolveMediaUrl(value) {
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
  const base = String(state.config.mediaBaseUrl || "").replace(/\/$/, "");
  const path = String(value).replace(/^\//, "");
  return base ? `${base}/${path}` : path;
}

async function loadConfig() {
  const response = await fetch("config.json", { cache: "default" });
  if (!response.ok) throw new Error(`配置读取失败：${response.status}`);
  state.config = { ...state.config, ...(await response.json()) };
  if (state.config.uploadUrl) {
    elements.upload.disabled = false;
    elements.upload.addEventListener("click", () => location.assign(state.config.uploadUrl));
  }
}

async function loadAssets() {
  setStatus("loading");
  try {
    await loadConfig();
    const response = await fetch(state.config.manifestUrl, { cache: "default" });
    if (!response.ok) throw new Error(`素材清单读取失败：${response.status}`);
    const data = await response.json();
    state.assets = Array.isArray(data) ? data : Array.isArray(data.assets) ? data.assets : [];
    buildFilterOptions();
    applyFilters();
    const refresh = () => refreshRemoteAssets();
    if ("requestIdleCallback" in window) requestIdleCallback(refresh, { timeout: 3000 });
    else setTimeout(refresh, 1200);
  } catch (error) {
    elements.errorMessage.textContent = error instanceof Error ? error.message : "未知读取错误";
    setStatus("error");
  }
}

async function refreshRemoteAssets() {
  try {
    const response = await fetch("https://static.l-one.asia/materials/data/assets.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    const assets = Array.isArray(data) ? data : Array.isArray(data.assets) ? data.assets : null;
    if (!assets?.length || JSON.stringify(assets) === JSON.stringify(state.assets)) return;
    state.assets = assets;
    buildFilterOptions();
    applyFilters();
  } catch {
    // The local snapshot remains usable when the remote manifest is unavailable.
  }
}

function setStatus(status) {
  elements.loading.hidden = status !== "loading";
  elements.collection.hidden = status !== "content";
  elements.empty.hidden = status !== "empty";
  elements.error.hidden = status !== "error";
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), "zh-CN"));
}

function createFilterButton(label, attribute, active = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset[attribute] = label;
  button.classList.toggle("is-active", active);
  return button;
}

function buildFilterOptions() {
  const categories = unique(state.assets.map((asset) => asset.category || "未分类"));
  const types = unique(state.assets.flatMap((asset) => asset.fileTypes || []));
  const tags = unique(state.assets.flatMap((asset) => asset.tags || []));

  elements.categories.replaceChildren(createFilterButton("全部", "category", true));
  categories.forEach((category) => elements.categories.append(createFilterButton(category, "category")));
  renderOptionalFilters(elements.types, types, "type");
  renderOptionalFilters(elements.tags, tags, "tag");
}

function renderOptionalFilters(container, values, attribute) {
  container.replaceChildren();
  if (!values.length) {
    const empty = document.createElement("span");
    empty.className = "filter-empty";
    empty.textContent = "等待素材数据";
    container.append(empty);
    return;
  }
  values.forEach((value) => container.append(createFilterButton(value, attribute)));
}

function applyFilters() {
  const query = state.query.trim().toLowerCase();
  state.filteredAssets = state.assets.filter((asset) => {
    const category = asset.category || "未分类";
    if (state.category !== "全部" && category !== state.category) return false;
    const fileTypes = (asset.fileTypes || []).map((type) => String(type).toLowerCase());
    if (state.types.size && ![...state.types].some((type) => fileTypes.includes(type.toLowerCase()))) return false;
    const tags = asset.tags || [];
    if (state.tags.size && ![...state.tags].some((tag) => tags.includes(tag))) return false;
    if (!query) return true;
    return [asset.title, category, asset.fileName, asset.folderPath, asset.relativePath, ...tags]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query);
  });
  renderAssets();
}

function renderAssets() {
  const count = state.filteredAssets.length;
  elements.searchCount.textContent = `${count} 项`;
  elements.visibleCount.textContent = String(count);
  elements.collection.className = `asset-collection view-${state.view} size-${state.size}`;
  elements.collection.replaceChildren();

  if (!count) {
    setStatus("empty");
    return;
  }

  if (state.view === "folder") renderFolders();
  else state.filteredAssets.forEach((asset) => elements.collection.append(createAssetCard(asset)));
  setStatus("content");
}

function renderFolders() {
  const groups = Map.groupBy
    ? Map.groupBy(state.filteredAssets, (asset) => asset.category || "未分类")
    : state.filteredAssets.reduce((map, asset) => {
        const key = asset.category || "未分类";
        map.set(key, [...(map.get(key) || []), asset]);
        return map;
      }, new Map());
  groups.forEach((assets, category) => {
    const group = document.createElement("section");
    group.className = "folder-group";
    const title = document.createElement("h2");
    title.textContent = `${category} · ${assets.length}`;
    const cards = document.createElement("div");
    cards.className = "folder-assets";
    assets.forEach((asset) => cards.append(createAssetCard(asset)));
    group.append(title, cards);
    elements.collection.append(group);
  });
}

function createAssetCard(asset) {
  const card = document.createElement("article");
  card.className = "asset-card";
  card.tabIndex = 0;
  card.dataset.assetId = asset.id || asset.title;
  const preview = document.createElement("div");
  preview.className = "asset-preview";
  const previewVideo = resolveMediaUrl(asset.previewVideo);
  const thumbnail = resolveThumbnailUrl(asset);
  if (previewVideo) {
    const video = document.createElement("video");
    video.poster = thumbnail;
    video.muted = true;
    video.loop = true;
    video.preload = "none";
    video.playsInline = true;
    card.addEventListener("pointerenter", () => {
      if (!video.src) video.src = previewVideo;
      video.play().catch(() => {});
    });
    card.addEventListener("pointerleave", () => video.pause());
    preview.append(video);
  } else if (thumbnail) {
    const image = document.createElement("img");
    image.src = thumbnail;
    image.alt = asset.title || "素材预览";
    image.loading = "lazy";
    preview.append(image);
  }
  const copy = document.createElement("div");
  copy.className = "asset-copy";
  const title = document.createElement("h3");
  title.textContent = asset.title || asset.fileName || "未命名素材";
  const meta = document.createElement("p");
  meta.textContent = `${asset.category || "未分类"} · ${(asset.fileTypes || []).join(" / ") || "未知类型"}`;
  copy.append(title, meta);
  card.append(preview, copy);
  card.addEventListener("click", () => openDetail(asset));
  card.addEventListener("keydown", (event) => { if (event.key === "Enter") openDetail(asset); });
  return card;
}

function openDetail(asset) {
  document.querySelector("[data-detail-title]").textContent = asset.title || asset.fileName || "未命名素材";
  document.querySelector("[data-detail-category]").textContent = asset.category || "未分类";
  document.querySelector("[data-detail-types]").textContent = (asset.fileTypes || []).join(" / ") || "未知";
  document.querySelector("[data-detail-path]").textContent = asset.relativePath || asset.folderPath || "未记录";
  const tags = document.querySelector("[data-detail-tags]");
  tags.replaceChildren(...(asset.tags || []).map((tag) => Object.assign(document.createElement("span"), { textContent: tag })));
  const preview = document.querySelector("[data-detail-preview]");
  preview.replaceChildren();
  const videoUrl = resolveMediaUrl(asset.video || asset.previewVideo);
  const imageUrl = resolveMediaUrl(asset.image || asset.previewGif || asset.thumbnail);
  if (videoUrl) {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.controls = true;
    video.playsInline = true;
    preview.append(video);
  } else if (imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = asset.title || "素材预览";
    preview.append(image);
  }
  const download = document.querySelector("[data-detail-download]");
  download.href = videoUrl || imageUrl || "#";
  download.hidden = !(videoUrl || imageUrl);
  elements.detail.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  elements.detail.hidden = true;
  const video = elements.detail.querySelector("video");
  video?.pause();
  document.body.style.overflow = "";
}

document.addEventListener("click", (event) => {
  const category = event.target.closest("[data-category]");
  if (category) {
    state.category = category.dataset.category;
    document.querySelectorAll("[data-category]").forEach((button) => button.classList.toggle("is-active", button === category));
    applyFilters();
    return;
  }
  const type = event.target.closest("[data-type]");
  if (type) {
    state.types.has(type.dataset.type) ? state.types.delete(type.dataset.type) : state.types.add(type.dataset.type);
    type.classList.toggle("is-active");
    applyFilters();
    return;
  }
  const tag = event.target.closest("[data-tag]");
  if (tag) {
    state.tags.has(tag.dataset.tag) ? state.tags.delete(tag.dataset.tag) : state.tags.add(tag.dataset.tag);
    tag.classList.toggle("is-active");
    applyFilters();
    return;
  }
  const view = event.target.closest("[data-view]");
  if (view) {
    state.view = view.dataset.view;
    document.querySelectorAll("[data-view]").forEach((button) => button.classList.toggle("is-active", button === view));
    renderAssets();
  }
});

elements.search.addEventListener("input", (event) => { state.query = event.target.value; applyFilters(); });
elements.filterToggle.addEventListener("click", () => {
  elements.drawer.hidden = !elements.drawer.hidden;
  elements.filterToggle.setAttribute("aria-expanded", String(!elements.drawer.hidden));
});
document.querySelector("[data-clear-filters]").addEventListener("click", () => {
  state.types.clear();
  state.tags.clear();
  document.querySelectorAll("[data-type], [data-tag]").forEach((button) => button.classList.remove("is-active"));
  applyFilters();
});
document.querySelector("[data-size]").addEventListener("change", (event) => { state.size = event.target.value; renderAssets(); });
document.querySelector("[data-retry]").addEventListener("click", loadAssets);
document.querySelector("[data-detail-close]").addEventListener("click", closeDetail);
elements.detail.addEventListener("click", (event) => { if (event.target === elements.detail) closeDetail(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !elements.detail.hidden) closeDetail(); });

loadAssets();
