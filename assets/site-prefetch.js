(() => {
  if (navigator.connection?.saveData) return;
  const script = document.currentScript;
  const root = new URL('../', script.src);
  const paths = [
    'store/', 'portfolio.html', 'materials/', 'library/', 'motion-library.html',
    'index.html', 'public/data/store/catalog.json', 'materials/data/assets.json',
    'library/data/cards.json', 'library/assets/cards/STYLE-001/cover.webp',
    'assets/about-v42/L-One-Homepage-v4.2-FIXED-SINGLE.html'
  ];
  const current = new URL(location.href);
  let stopped = false;
  document.addEventListener('visibilitychange', () => { stopped = document.hidden; });
  const warm = async () => {
    for (const path of paths) {
      if (stopped) break;
      const url = new URL(path, root);
      if (url.pathname === current.pathname) continue;
      try {
        await fetch(url, { cache: 'force-cache', priority: 'low' });
      } catch { /* A failed warm request must not affect the current page. */ }
    }
    if (stopped) return;
    for (const href of [
      'https://cdn.jsdelivr.net/npm/three@0.180.0/+esm',
      'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js/+esm',
      'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/geometries/RoundedBoxGeometry.js/+esm',
      'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/postprocessing/EffectComposer.js/+esm',
      'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/postprocessing/RenderPass.js/+esm',
      'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/postprocessing/BokehPass.js/+esm',
      'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/postprocessing/OutputPass.js/+esm',
      'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/lights/RectAreaLightUniformsLib.js/+esm'
    ]) {
      try { await fetch(href, { mode: 'cors', cache: 'force-cache', priority: 'low' }); }
      catch { /* Library can still load on demand. */ }
    }
  };
  addEventListener('load', () => {
    const start = () => { if (!document.hidden) warm(); };
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 4000 });
    else setTimeout(start, 1800);
  }, { once: true });
})();
