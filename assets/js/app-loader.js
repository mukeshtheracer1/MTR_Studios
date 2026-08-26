document.addEventListener('DOMContentLoaded', () => {
  // 1. Auto-detect Subfolder Prefix (Root vs pages/ or studio-pro/)
  const currentPath = window.location.pathname;
  let prefix = '';
  
  if (currentPath.includes('/pages/') || currentPath.includes('/studio-pro/')) {
    prefix = '../';
  }

  // Helper Loader Engine
  async function loadComponent(elementId, htmlPath, cssPath, jsPath, callback) {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;

    // Fix paths dynamically with prefix
    const finalHtmlPath = prefix + htmlPath;
    const finalCssPath = cssPath ? prefix + cssPath : null;
    const finalJsPath = jsPath ? prefix + jsPath : null;

    try {
      // 1. Load CSS Dynamic Injection (Avoid duplicates)
      if (finalCssPath && !document.querySelector(`link[href="${finalCssPath}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = finalCssPath;
        document.head.appendChild(link);
      }

      // 2. Fetch HTML Component
      const response = await fetch(finalHtmlPath);
      if (response.ok) {
        targetElement.innerHTML = await response.text();
      } else {
        console.error(`Failed to load HTML from ${finalHtmlPath}`);
      }

      // 3. Load & Run JS Dynamic Script
      if (finalJsPath) {
        // Remove old script if exists to re-run
        const existingScript = document.querySelector(`script[src="${finalJsPath}"]`);
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.src = finalJsPath;
        script.onload = () => { if (callback) callback(); };
        document.body.appendChild(script);
      } else if (callback) {
        callback();
      }
    } catch (error) {
      console.error(`Error loading component from ${finalHtmlPath}:`, error);
    }
  }

  // Load All UI Components Concurrently
  loadComponent('top-bar-placeholder', 'components/top-bar.html', 'components/top-bar.css', 'components/top-bar.js', () => {
    if (typeof initTopBar === 'function') {
      initTopBar();
    }
  });

  loadComponent('header-placeholder', 'components/header.html', 'components/header.css', 'components/header.js', () => {
    if (typeof initHeader === 'function') {
      initHeader();
    }
  });

  loadComponent('footer-placeholder', 'components/footer.html', 'components/footer.css', 'components/footer.js', () => {
    if (typeof initFooter === 'function') {
      initFooter();
    }
  });
});
