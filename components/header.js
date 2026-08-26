function initHeader() {

  const hamburgerBtn = document.getElementById('mobileToggleBtn');

  const closeBtn = document.getElementById('drawerCloseBtn');

  const backdrop = document.getElementById('mtrDrawerBackdrop');

  const drawer = document.getElementById('mtrMobileDrawer');


  /* =====================================================
     EXISTING MOBILE DRAWER FUNCTIONALITY
     ===================================================== */

  function toggleDrawer() {

    if (drawer && backdrop) {

      drawer.classList.toggle('active');

      backdrop.classList.toggle('active');

    }

  }


  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', toggleDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', toggleDrawer);
  }


  /* =====================================================
     SMART COUNTDOWN + HEADER SCROLL
     ===================================================== */

  const topBar =
    document.getElementById('top-bar-placeholder');

  const header =
    document.querySelector('.mtr-main-header');


  /*
     Agar top-bar ya header nahi mila,
     to existing drawer functionality
     phir bhi normally kaam karti rahegi.
  */

  if (!topBar || !header) {
    console.warn(
      'MTR Smart Header: Top bar or header not found.'
    );
    return;
  }


  /* =====================================================
     VARIABLES
     ===================================================== */

  let lastScrollY = window.scrollY;

  let ticking = false;

  const scrollThreshold = 8;


  /* =====================================================
     TOP BAR KI ACTUAL HEIGHT FIND KARNA
     ===================================================== */

  function updateTopBarHeight() {

    const topBarHeight =
      topBar.getBoundingClientRect().height;


    document.documentElement.style.setProperty(
      '--mtr-topbar-height',
      `${topBarHeight}px`
    );

  }


  /* Initial height */

  updateTopBarHeight();


  /* =====================================================
     AGAR COUNTDOWN KI HEIGHT CHANGE HO
     TO HEADER POSITION UPDATE HO
     ===================================================== */

  if (window.ResizeObserver) {

    const resizeObserver =
      new ResizeObserver(() => {

        updateTopBarHeight();

      });

    resizeObserver.observe(topBar);

  }


  /* =====================================================
     SCROLL HANDLER
     ===================================================== */

  function handleScroll() {

    const currentScrollY =
      window.scrollY;


    /* =================================================
       PAGE BILKUL TOP PAR HAI
       COUNTDOWN VISIBLE
       HEADER COUNTDOWN KE NICHE
       ================================================= */

    if (currentScrollY <= 5) {

      document.body.classList.remove(
        'mtr-scrolling-down'
      );

      lastScrollY = currentScrollY;

      ticking = false;

      return;

    }


    /* Scroll direction */

    const difference =
      currentScrollY - lastScrollY;


    /* Bahut chhota movement ignore */

    if (Math.abs(difference) < scrollThreshold) {

      ticking = false;

      return;

    }


    /* =================================================
       SCROLL DOWN
       COUNTDOWN HIDE
       HEADER TOP POSITION LEGA
       ================================================= */

    if (difference > 0) {

      document.body.classList.add(
        'mtr-scrolling-down'
      );

    }


    /* =================================================
       SCROLL UP
       COUNTDOWN WAPAS
       HEADER COUNTDOWN KE NICHE
       ================================================= */

    else {

      document.body.classList.remove(
        'mtr-scrolling-down'
      );

    }


    lastScrollY = currentScrollY;

    ticking = false;

  }


  /* =====================================================
     SCROLL EVENT
     ===================================================== */

  window.addEventListener(
    'scroll',
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          handleScroll
        );

        ticking = true;

      }

    },
    {
      passive: true
    }
  );


  /* =====================================================
     WINDOW RESIZE
     ===================================================== */

  window.addEventListener(
    'resize',
    updateTopBarHeight,
    {
      passive: true
    }
  );


  /* =====================================================
     INITIAL STATE
     COUNTDOWN VISIBLE
     HEADER COUNTDOWN KE NICHE
     ===================================================== */

  document.body.classList.remove(
    'mtr-scrolling-down'
  );

  updateTopBarHeight();

}