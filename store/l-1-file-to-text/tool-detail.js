(() => {
  const renderLines = () => {
    document.querySelectorAll("[data-lines]").forEach((element) => {
      let source;
      try { source = JSON.parse(element.dataset.lines); } catch { return; }
      const { desktopLines, mobileLines } = source;
      if (!Array.isArray(desktopLines) || !Array.isArray(mobileLines)) return;
      element.replaceChildren();
      [["desktop", desktopLines], ["mobile", mobileLines]].forEach(([kind, lines]) => {
        lines.forEach((line) => {
          const span = document.createElement("span");
          span.className = `line-lock ${kind}-line`;
          span.textContent = line;
          element.append(span);
        });
      });
    });
  };

  const setupTabs = () => {
    const tabs = [...document.querySelectorAll("[role=tab]")];
    const panel = document.querySelector("[role=tabpanel]");
    const panelLabel = panel?.querySelector("[data-format-label]");
    const panelDescription = panel?.querySelector("[data-format-description]");
    const copy = {
      txt: "TXT 是最轻的纯文本格式，适合搜索、复制与继续整理。",
      md: "Markdown 保留清晰层级，适合写作、知识库与版本管理。",
      html: "HTML 适合在浏览器中阅读，便于保留结构后再分发。"
    };
    const select = (tab) => {
      tabs.forEach((candidate) => {
        const selected = candidate === tab;
        candidate.setAttribute("aria-selected", String(selected));
        candidate.tabIndex = selected ? 0 : -1;
      });
      if (panelLabel) panelLabel.textContent = tab.textContent;
      if (panelDescription) panelDescription.textContent = copy[tab.dataset.format];
      panel.setAttribute("aria-labelledby", tab.id);
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (event) => {
        const keys = { ArrowRight: 1, ArrowLeft: -1, Home: -index, End: tabs.length - 1 - index };
        if (!(event.key in keys)) return;
        event.preventDefault();
        const next = tabs[(index + keys[event.key] + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
  };

  const setupDownloadControls = () => {
    const controls = [...document.querySelectorAll("[data-download]")];
    const status = document.querySelector("[data-download-status]");
    const setState = (state, message, hasError = false) => {
      controls.forEach((control) => {
        control.dataset.state = state;
        control.dataset.error = String(hasError);
        control.setAttribute("aria-disabled", String(state === "disabled"));
      });
      status.textContent = message;
    };
    const updateNetworkState = () => {
      if (navigator.onLine) setState("ready", "Windows 10/11 x64 · 174,867,225 bytes · SHA-256 可核验 · GitHub Release 在线", false);
      else setState("disabled", "当前离线，下载链接暂不可用。请恢复网络后重试。", true);
    };
    controls.forEach((control) => {
      control.addEventListener("click", (event) => {
        if (!navigator.onLine) { event.preventDefault(); updateNetworkState(); return; }
        setState("loading", "正在转到 GitHub Release 下载…", false);
        window.setTimeout(updateNetworkState, 1600);
      });
    });
    window.addEventListener("online", updateNetworkState);
    window.addEventListener("offline", updateNetworkState);
    updateNetworkState();
  };

  const setupIndex = () => {
    const links = [...document.querySelectorAll(".showcase-index a")];
    const targets = links.map((link) => document.querySelector(link.hash)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        if (link.hash === `#${visible.target.id}`) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-20% 0px -68% 0px", threshold: [0, .15, .4] });
    targets.forEach((target) => observer.observe(target));
  };

  const setupStickyOffsets = () => {
    const header = document.querySelector(".site-header");
    const index = document.querySelector(".showcase-index");
    if (!header || !index) return;
    const update = () => {
      const root = document.documentElement;
      root.style.setProperty("--l1-sticky-header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
      root.style.setProperty("--l1-section-index-height", `${Math.ceil(index.getBoundingClientRect().height)}px`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(header);
    observer.observe(index);
    window.addEventListener("resize", update, { passive: true });
    update();
  };

  renderLines();
  setupTabs();
  setupDownloadControls();
  setupIndex();
  setupStickyOffsets();
})();
