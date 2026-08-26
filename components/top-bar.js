function initTopBar() {

  /* =====================================================
     TOP BAR TYPEWRITER
     ===================================================== */

  const phrases = [
    "Bond of Eternal Love",
    "Send Digital Cards Worldwide",
    "Zero Latency Greetings"
  ];

  let pIdx = 0;
  let cIdx = 0;
  let isDeleting = false;


  function typeLoop() {

    const current = phrases[pIdx];

    const el =
      document.getElementById('typeWriter');


    if (el) {

      el.innerText = isDeleting
        ? current.substring(0, cIdx - 1)
        : current.substring(0, cIdx + 1);


      cIdx += isDeleting ? -1 : 1;


      let speed =
        isDeleting ? 40 : 80;


      if (
        !isDeleting &&
        cIdx === current.length
      ) {

        speed = 2000;

        isDeleting = true;

      }


      else if (
        isDeleting &&
        cIdx === 0
      ) {

        isDeleting = false;

        pIdx =
          (pIdx + 1) % phrases.length;

        speed = 400;

      }


      setTimeout(
        typeLoop,
        speed
      );

    }

  }


  typeLoop();


  /* =====================================================
     RAKSHA BANDHAN COUNTDOWN
     ===================================================== */

  const targetDate =
    new Date(
      'August 28, 2026 00:00:00'
    ).getTime();


  function updateTimer() {

    const now =
      new Date();


    const diff =
      targetDate - now.getTime();


    /* -----------------------------------------------
       COUNTDOWN
       ----------------------------------------------- */

    if (diff > 0) {

      const d =
        document.getElementById('cdDays');

      const h =
        document.getElementById('cdHours');

      const m =
        document.getElementById('cdMins');

      const s =
        document.getElementById('cdSecs');


      if (d) {

        d.innerText =
          String(
            Math.floor(
              diff /
              (1000 * 60 * 60 * 24)
            )
          ).padStart(2, '0');

      }


      if (h) {

        h.innerText =
          String(
            Math.floor(
              (
                diff %
                (1000 * 60 * 60 * 24)
              ) /
              (1000 * 60 * 60)
            )
          ).padStart(2, '0');

      }


      if (m) {

        m.innerText =
          String(
            Math.floor(
              (
                diff %
                (1000 * 60 * 60)
              ) /
              (1000 * 60)
            )
          ).padStart(2, '0');

      }


      if (s) {

        s.innerText =
          String(
            Math.floor(
              (
                diff %
                (1000 * 60)
              ) /
              1000
            )
          ).padStart(2, '0');

      }

    }


    /* -----------------------------------------------
       LIVE DATE
       ----------------------------------------------- */

    const dateEl =
      document.getElementById('liveDate');


    if (dateEl) {

      dateEl.innerText =
        now.toLocaleDateString(
          'en-US',
          {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        );

    }


    /* -----------------------------------------------
       LIVE TIME
       ----------------------------------------------- */

    const timeEl =
      document.getElementById('liveTime');


    if (timeEl) {

      timeEl.innerText =
        now.toLocaleTimeString('en-US') +
        ' IST';

    }

  }


  /* =====================================================
     START COUNTDOWN
     ===================================================== */

  setInterval(
    updateTimer,
    1000
  );


  updateTimer();

}