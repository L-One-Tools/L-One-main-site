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

let presentationMap=new Map(),iconMap={},publicTools=[],category='all';
function createToolCard(tool) {
  const view=presentationMap.get(tool.id),card=document.createElement('a');
  card.className='catalog-card';card.dataset.toolId=tool.id;card.href=new URL(view.detail_route,window.LOneTools.root);
  const header=document.createElement('div');header.className='catalog-card__header';
  const icon=document.createElement('img');icon.className='catalog-card__icon';icon.src=new URL(iconMap[view.icon].src,window.LOneTools.root);icon.alt='';icon.width=64;icon.height=64;icon.draggable=false;
  const title=document.createElement('div');appendText(title,'h2','',tool.name);appendText(title,'p','catalog-card__status',STATUS_LABELS[tool.status]||'状态待确认');header.append(icon,title);
  const summary=document.createElement('p');summary.className='catalog-card__summary';summary.textContent=tool.summary;
  const hero=document.createElement('figure');hero.className='catalog-card__hero';const image=document.createElement('img');const originalVisuals={'onebar':'store/onebar/hero-lit-screen.png','l-1-file-to-text':'store/l-1-file-to-text/assets/txt-1.png','l-1-web-capture':'store/l-1-web-capture/assets/real-popup-preview.png'};image.src=new URL(originalVisuals[tool.id]||view.hero_visual,window.LOneTools.root);image.alt=tool.id==='onebar'?'OneBar使用场景示意':tool.name+'实际界面';image.width=1600;image.height=1000;image.draggable=false;hero.append(image);
  const foot=document.createElement('p');foot.className='catalog-card__foot';appendText(foot,'span','',tool.id==='onebar'?'场景示意':tool.platforms.map(p=>p.name).join(' / '));appendText(foot,'span','','查看详情 ↗');card.append(header,summary,hero,foot);return card;
}
function updateArrows(){const list=elements.list;document.querySelector('[data-carousel-prev]').disabled=list.scrollLeft<5;document.querySelector('[data-carousel-next]').disabled=list.scrollLeft+list.clientWidth>=list.scrollWidth-5;}
function renderCategory(){elements.list.replaceChildren();const visible=publicTools.filter(t=>category==='all'||presentationMap.get(t.id)?.category===category);visible.forEach(t=>elements.list.append(createToolCard(t)));elements.empty.hidden=visible.length>0;elements.empty.querySelector('p').textContent=category==='ai-skill'?'暂无公开 AI Skills':'暂无公开工具';elements.list.setAttribute('aria-labelledby','category-'+category);document.querySelectorAll('[data-category]').forEach(b=>{const active=b.dataset.category===category;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});elements.list.scrollLeft=0;requestAnimationFrame(updateArrows);}
document.querySelectorAll('[data-category]').forEach(b=>{b.addEventListener('click',()=>{category=b.dataset.category;renderCategory();});b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const tabs=[...document.querySelectorAll('[data-category]')],i=tabs.indexOf(b),next=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];next.focus();next.click();});});
document.querySelector('[data-carousel-prev]').onclick=()=>elements.list.scrollBy({left:-(elements.list.firstElementChild?.clientWidth+24||400),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
document.querySelector('[data-carousel-next]').onclick=()=>elements.list.scrollBy({left:elements.list.firstElementChild?.clientWidth+24||400,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
elements.list.addEventListener('scroll',updateArrows,{passive:true});addEventListener('resize',updateArrows);
let drag=null,moved=false;elements.list.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,left:elements.list.scrollLeft,id:e.pointerId};moved=false;});elements.list.addEventListener('pointermove',e=>{if(!drag)return;const diff=e.clientX-drag.x;if(Math.abs(diff)>8){moved=true;elements.list.style.scrollSnapType='none';elements.list.setPointerCapture(drag.id);elements.list.scrollLeft=drag.left-diff;}});elements.list.addEventListener('pointerup',()=>{drag=null;elements.list.style.scrollSnapType='';setTimeout(()=>moved=false,150);});elements.list.addEventListener('pointercancel',()=>{drag=null;moved=false;elements.list.style.scrollSnapType='';});elements.list.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();}});elements.list.addEventListener('dragstart',e=>e.preventDefault());

function createMotionLibraryCard() {
  const card = document.createElement("a");
  card.className = "catalog-card motion-library-card";
  card.id = "motion-library";
  card.href = "../motion-library.html";
  const cover = document.createElement("div");
  cover.className = "catalog-cover motion-library-cover";
  const mark = appendText(cover, "span", "motion-library-mark", "Aa");
  mark.setAttribute("aria-hidden", "true");
  const copy = document.createElement("div");
  appendText(copy, "h2", "", "文字动效图书馆");
  appendText(copy, "p", "", "浏览可循环预览的文字动效，复制独立 HTML 或嵌入组件代码。");
  const meta = document.createElement("div");
  meta.className = "catalog-meta-row";
  appendText(meta, "span", "", "网页资源");
  appendText(meta, "span", "", "64 个动效");
  copy.append(meta);
  card.append(cover, copy);
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
  try {const [icons,presentation]=await window.LOneTools.ready;iconMap=icons;presentationMap=new Map(presentation.map(t=>[t.id,t]));} catch {elements.loading.hidden=true;showError("工具展示资料暂时无法读取，请重试。");elements.list.setAttribute("aria-busy","false");return;}
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
      showError(`无法读取工具资料：${primaryError.message}`);
      document.querySelector("[data-resource-list]").replaceChildren(createMotionLibraryCard());
      elements.list.setAttribute("aria-busy", "false");
      if (location.hash === "#motion-library") document.getElementById("motion-library")?.scrollIntoView();
      return;
    }
  }

  const tools = catalog.tools.filter((tool) => validTool(tool) && tool.links?.docs && ["stable", "beta", "coming-soon"].includes(tool.status));
  elements.loading.hidden = true;
  elements.empty.hidden = tools.length > 0;
  publicTools=tools.filter(t=>presentationMap.get(t.id)?.detail_route&&presentationMap.get(t.id)?.hero_visual);
  renderCategory();
  document.querySelector("[data-resource-list]").replaceChildren(createMotionLibraryCard());
  elements.list.setAttribute("aria-busy", "false");
  if (location.hash === "#motion-library") document.getElementById("motion-library")?.scrollIntoView();
}

elements.retry?.addEventListener("click", loadCatalog);
loadCatalog();
