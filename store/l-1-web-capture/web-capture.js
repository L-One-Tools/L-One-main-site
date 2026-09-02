(() => {
  document.querySelectorAll("[data-lines]").forEach((element) => {
    let lines;
    try { lines = JSON.parse(element.dataset.lines); } catch { return; }
    if (!Array.isArray(lines.desktopLines) || !Array.isArray(lines.mobileLines)) return;
    element.replaceChildren();
    [["desktop", lines.desktopLines], ["mobile", lines.mobileLines]].forEach(([kind, items]) => {
      items.forEach((item) => {
        const line = document.createElement("span");
        line.className = `line-lock ${kind}-line`;
        line.textContent = item;
        element.append(line);
      });
    });
  });

  const links = [...document.querySelectorAll(".section-index a")];
  const targets = links.map((link) => document.querySelector(link.hash)).filter(Boolean);
  if (targets.length) {
    const observer = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      links.forEach((link) => link.toggleAttribute("aria-current", link.hash === `#${active.target.id}`));
    }, { rootMargin: "-20% 0px -68% 0px", threshold: [0, .15, .4] });
    targets.forEach((target) => observer.observe(target));
  }
})();
