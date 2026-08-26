/* ============================================================
   MTR STUDIOS
   RAKSHA BANDHAN MUHURAT — PAGE ENGINE
   ============================================================ */

(function () {

    "use strict";


    /* ============================================================
       HELPERS
       ============================================================ */

    function get(id) {
        return document.getElementById(id);
    }


    function setText(id, value, fallback = "—") {

        const element = get(id);

        if (!element) {
            return;
        }

        if (
            value === undefined ||
            value === null ||
            String(value).trim() === ""
        ) {
            element.textContent = fallback;
            return;
        }

        element.textContent = value;
    }


    function safe(object, path, fallback = "") {

        if (!object) {
            return fallback;
        }

        const parts = path.split(".");

        let current = object;

        for (const part of parts) {

            if (
                current === undefined ||
                current === null ||
                current[part] === undefined ||
                current[part] === null
            ) {
                return fallback;
            }

            current = current[part];
        }

        return current;
    }


    /* ============================================================
       DISTRICT
       ============================================================ */

    function getDistrictSelector() {

        return (
            get("districtSelector") ||
            document.querySelector(
                "[data-district-select]"
            )
        );
    }


    function getSelectedDistrict() {

        const selector =
            getDistrictSelector();

        if (
            selector &&
            selector.value &&
            window.MTR_MUHURAT_DATA &&
            window.MTR_MUHURAT_DATA.districts &&
            window.MTR_MUHURAT_DATA.districts[
                selector.value
            ]
        ) {
            return selector.value;
        }

        if (
            window.MTR_MUHURAT_DATA &&
            window.MTR_MUHURAT_DATA.districts &&
            window.MTR_MUHURAT_DATA.districts.gopalganj
        ) {
            return "gopalganj";
        }

        return null;
    }


    function populateDistrictSelector() {

        const selector =
            getDistrictSelector();

        if (!selector) {
            return;
        }


        const districts =
            safe(
                window.MTR_MUHURAT_DATA,
                "districts",
                {}
            );


        const current =
            selector.value;


        selector.innerHTML = "";


        Object.keys(districts)
            .forEach(function (key) {

                const district =
                    districts[key];

                const option =
                    document.createElement("option");


                option.value = key;


                option.textContent =
                    safe(
                        district,
                        "location.district",
                        key
                    ) +
                    " — " +
                    safe(
                        district,
                        "location.districtHindi",
                        ""
                    );


                selector.appendChild(
                    option
                );
            });


        if (
            current &&
            districts[current]
        ) {

            selector.value = current;

        } else if (
            districts.gopalganj
        ) {

            selector.value =
                "gopalganj";

        } else {

            const first =
                Object.keys(districts)[0];

            if (first) {
                selector.value = first;
            }
        }
    }


    /* ============================================================
       STATUS
       ============================================================ */

    function setStatus(
        message,
        type = "success"
    ) {

        const element =
            get("dataStatus");

        if (!element) {
            return;
        }


        element.className =
            "hero-data-status";


        if (type) {

            element.classList.add(
                "is-" + type
            );
        }


        let icon =
            "fa-circle-check";


        if (type === "error") {

            icon =
                "fa-circle-exclamation";

        } else if (
            type === "loading"
        ) {

            icon =
                "fa-spinner fa-spin";
        }


        element.innerHTML =
            '<i class="fa-solid ' +
            icon +
            '"></i>' +
            "<span>" +
            message +
            "</span>";
    }


    /* ============================================================
       LOCATION
       ============================================================ */

    function renderLocation(data) {

        const location =
            data.location || {};


        const district =
            location.district ||
            "";


        const state =
            location.state ||
            "";


        setText(
            "heroLocation",
            district +
            (
                state
                    ? ", " + state
                    : ""
            )
        );


        setText(
            "muhuratLocationLine",
            location.displayHindi ||
            location.display
        );


        setText(
            "panchangLocation",
            location.display ||
            location.displayHindi
        );


        setText(
            "sunriseLocation",
            location.display ||
            location.displayHindi
        );
    }


    /* ============================================================
       FESTIVAL
       ============================================================ */

    function renderFestival(data) {

        const festival =
            data.festival || {};


        setText(
            "festivalDate",
            festival.dateHindi ||
            data.dateHindi
        );


        setText(
            "festivalDateFact",
            festival.nameHindi ||
            "रक्षा बंधन"
        );


        setText(
            "festivalDayFact",
            festival.weekdayHindi ||
            "शुक्रवार"
        );
    }


    /* ============================================================
       RAKSHA BANDHAN
       ============================================================ */

    function renderRakhi(data) {

        const rakhi =
            data.rakhiMuhurat || {};


        const purnima =
            data.purnima || {};


        const bhadra =
            data.bhadra || {};


        const periods =
            data.rakshaBandhanPeriods || {};


        /* Main Muhurat */

        setText(
            "rakhiStart",
            rakhi.start
        );


        setText(
            "rakhiEnd",
            rakhi.end
        );


        setText(
            "rakhiDuration",
            rakhi.duration
        );


        /* Details */

        setText(
            "purnimaStart",
            purnima.beginsHindi
        );


        setText(
            "rakhiMuhurat",

            rakhi.start &&
            rakhi.end

                ? rakhi.start +
                  " – " +
                  rakhi.end

                : ""
        );


        setText(
            "purnimaEnd",
            purnima.endsHindi
        );


        setText(
            "bhadra",

            rakhi.bhadraStatusHindi ||
            bhadra.statusHindi
        );


        setText(
            "sunrise",
            safe(
                data,
                "sunMoon.sunrise"
            )
        );


        setText(
            "muhuratStatusText",
            "शुभ समय"
        );


        /* Optional existing IDs */

        setText(
            "rakhiPurnimaEnd",
            purnima.endsHindi
        );


        setText(
            "rakhiSunrise",
            safe(
                data,
                "sunMoon.sunrise"
            )
        );


        setText(
            "bhadraStatus",

            rakhi.bhadraStatusHindi ||
            bhadra.statusHindi
        );


        setText(
            "bhadraDetail",

            bhadra.endStatus ||
            bhadra.noteHindi
        );


        setText(
            "purnimaStartDetail",
            purnima.beginsHindi
        );


        setText(
            "rakhiWindowDetail",

            rakhi.start &&
            rakhi.end

                ? rakhi.start +
                  " – " +
                  rakhi.end

                : ""
        );


        setText(
            "rakhiWindowDuration",
            rakhi.duration
        );


        setText(
            "purnimaEndDetail",
            purnima.endsHindi
        );


        setText(
            "bhadraTimingDetail",

            bhadra.endStatus ||
            bhadra.statusHindi
        );


        setText(
            "bhadraTimingNote",

            bhadra.noteHindi ||
            rakhi.recommendationHindi
        );


        setText(
            "aparahnaTime",
            periods.aparahna
        );


        setText(
            "pradoshTime",
            periods.pradosh
        );
    }


    /* ============================================================
       PANCHANG
       ============================================================ */

    function renderPanchang(data) {

        const p =
            data.panchang || {};


        const tithi =
            p.tithi || {};


        const paksha =
            p.paksha || {};


        const nakshatra =
            p.nakshatra || {};


        const yoga =
            p.yoga || {};


        const karana =
            p.karana || {};


        const firstKarana =
            karana.first || {};


        const moon =
            p.moonSign || {};


        const sun =
            p.sunSign || {};


        const weekday =
            p.weekday || {};


        /* Tithi */

        setText(
            "tithiValue",
            tithi.name
        );


        setText(
            "tithiHindi",
            tithi.nameHindi
        );


        setText(
            "tithiEnd",
            tithi.endHindi
        );


        /* Paksha */

        setText(
            "pakshaValue",
            paksha.name
        );


        setText(
            "pakshaHindiValue",
            paksha.nameHindi
        );


        /* Nakshatra */

        setText(
            "nakshatraValue",
            nakshatra.name
        );


        setText(
            "nakshatraHindi",
            nakshatra.nameHindi
        );


        setText(
            "nakshatraEnd",
            nakshatra.endHindi
        );


        /* Yoga */

        setText(
            "yogaValue",
            yoga.name
        );


        setText(
            "yogaHindi",
            yoga.nameHindi
        );


        setText(
            "yogaEnd",
            yoga.endHindi
        );


        /* Karana */

        setText(
            "karanaValue",
            firstKarana.name
        );


        setText(
            "karanaHindi",
            firstKarana.nameHindi
        );


        setText(
            "karanaEnd",
            firstKarana.endHindi
        );


        /* Moon */

        setText(
            "moonSignValue",
            moon.name
        );


        setText(
            "moonSignHindi",
            moon.nameHindi
        );


        /* Sun */

        setText(
            "sunSignValue",
            sun.name
        );


        setText(
            "sunSignHindi",
            sun.nameHindi
        );


        /* Weekday */

        setText(
            "weekdayValue",
            weekday.nameHindi
        );


        setText(
            "weekdayEnglish",
            weekday.name
        );
    }


    /* ============================================================
       ADVANCED PANCHANG
       ============================================================ */

    function renderDetailedPanchang(data) {

        const detail =
            data.detailedPanchang || {};


        const container =
            get(
                "advancedPanchangData"
            );


        if (!container) {
            return;
        }


        const rows = [

            [
                "स्थान",
                detail.location
            ],

            [
                "तारीख",
                detail.dateHindi ||
                detail.date
            ],

            [
                "वार",
                detail.weekday
            ],

            [
                "पक्ष",
                detail.paksha
            ],

            [
                "तिथि",
                detail.tithi
            ],

            [
                "नक्षत्र",
                detail.nakshatra
            ],

            [
                "योग",
                detail.yoga
            ],

            [
                "करण",
                detail.karana
            ],

            [
                "दूसरा करण",
                detail.secondKarana
            ],

            [
                "चन्द्र राशि",
                detail.moonSign
            ],

            [
                "सूर्य राशि",
                detail.sunSign
            ],

            [
                "विक्रम संवत",
                detail.vikramSamvat
            ],

            [
                "शक संवत",
                detail.shakaSamvat
            ],

            [
                "मास",
                detail.lunarMonthHindi ||
                detail.lunarMonth
            ],

            [
                "अयन",
                detail.ayana
            ],

            [
                "ऋतु",
                detail.ritu
            ]
        ];


        container.innerHTML = "";


        rows.forEach(function (row) {

            if (
                row[1] === undefined ||
                row[1] === null ||
                String(row[1]).trim() === ""
            ) {
                return;
            }


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "advanced-data-item";


            const label =
                document.createElement(
                    "span"
                );


            label.textContent =
                row[0];


            const value =
                document.createElement(
                    "strong"
                );


            value.textContent =
                row[1];


            item.appendChild(label);
            item.appendChild(value);

            container.appendChild(item);
        });
    }


    /* ============================================================
       SUN / MOON
       ============================================================ */

    function renderSunMoon(data) {

        const sunMoon =
            data.sunMoon || {};


        setText(
            "sunriseTime",
            sunMoon.sunrise
        );


        setText(
            "sunsetTime",
            sunMoon.sunset
        );


        setText(
            "dayDuration",
            sunMoon.dayDuration
        );


        setText(
            "daySunrise",
            sunMoon.sunrise
        );


        setText(
            "daySunset",
            sunMoon.sunset
        );


        /*
         * Moonrise/Moonset are not present
         * in the supplied data.
         *
         * Do not invent timings.
         */

        setText(
            "moonriseTime",
            sunMoon.moonrise,
            "डेटा उपलब्ध नहीं है"
        );


        setText(
            "moonsetTime",
            sunMoon.moonset,
            "डेटा उपलब्ध नहीं है"
        );


        setText(
            "nightDuration",
            sunMoon.nightDuration,
            "डेटा उपलब्ध नहीं है"
        );
    }


    /* ============================================================
       CHOGHADIYA ICON
       ============================================================ */

    function getChoghadiyaIcon(
        nature
    ) {

        const value =
            String(
                nature || ""
            ).toLowerCase();


        if (value === "best") {
            return "fa-star";
        }


        if (
            value === "good" ||
            value === "gain"
        ) {
            return "fa-leaf";
        }


        if (
            value === "bad" ||
            value === "evil" ||
            value === "loss"
        ) {
            return "fa-triangle-exclamation";
        }


        return "fa-circle-half-stroke";
    }


    function getChoghadiyaClass(
        nature
    ) {

        const value =
            String(
                nature || ""
            ).toLowerCase();


        if (value === "best") {
            return "best";
        }


        if (
            value === "good" ||
            value === "gain"
        ) {
            return "good";
        }


        if (
            value === "bad" ||
            value === "evil" ||
            value === "loss"
        ) {
            return "bad";
        }


        return "neutral";
    }


    /* ============================================================
       CHOGHADIYA
       ============================================================ */

    function renderChoghadiya(data) {

        const choghadiya =
            data.choghadiya || {};


        renderChoghadiyaList(
            "dayChoghadiyaList",
            choghadiya.day || []
        );


        renderChoghadiyaList(
            "nightChoghadiyaList",
            choghadiya.night || []
        );
    }


    function renderChoghadiyaList(
        id,
        list
    ) {

        const container =
            get(id);


        if (!container) {
            return;
        }


        container.innerHTML = "";


        if (
            !Array.isArray(list) ||
            list.length === 0
        ) {

            container.innerHTML =
                '<div class="choghadiya-empty">' +
                "डेटा उपलब्ध नहीं है।" +
                "</div>";

            return;
        }


        list.forEach(
            function (item) {

                const row =
                    document.createElement(
                        "article"
                    );


                row.className =
                    "choghadiya-row " +
                    getChoghadiyaClass(
                        item.nature
                    );


                const name =
                    document.createElement(
                        "div"
                    );


                name.className =
                    "choghadiya-name";


                name.innerHTML =
                    '<i class="fa-solid ' +
                    getChoghadiyaIcon(
                        item.nature
                    ) +
                    '"></i>' +

                    "<span>" +

                    (
                        item.nameHindi ||
                        item.name ||
                        "—"
                    ) +

                    "<small>" +

                    (
                        item.name
                            ? " — " +
                              item.name
                            : ""
                    ) +

                    "</small>" +

                    "</span>";


                const time =
                    document.createElement(
                        "strong"
                    );


                let timeText =
                    "";


                if (
                    item.start &&
                    item.end
                ) {

                    timeText =
                        item.start +
                        " – " +
                        item.end;

                } else {

                    timeText =
                        "डेटा उपलब्ध नहीं है";
                }


                if (item.nextDate) {

                    timeText +=
                        ", " +
                        item.nextDate;
                }


                time.textContent =
                    timeText;


                row.appendChild(name);
                row.appendChild(time);


                container.appendChild(row);
            }
        );
    }


    /* ============================================================
       SHUBH SAMAY
       ============================================================ */

    function renderShubh(data) {

        const shubh =
            data.shubhSamay || {};


        const day =
            shubh.day || {};


        const night =
            shubh.night || {};


        setText(
            "dayShubhTitle",
            day.title
        );


        setText(
            "dayShubhSubtitle",
            day.subtitle
        );


        const daySlots =
            Array.isArray(
                day.slots
            )
                ? day.slots
                : [];


        setText(
            "dayLabhaTime",
            daySlots[0]?.time
        );


        setText(
            "dayAmritaTime",
            daySlots[1]?.time
        );


        setText(
            "dayShubhaTime",
            daySlots[2]?.time
        );


        setText(
            "nightShubhTitle",
            night.title
        );


        setText(
            "nightShubhSubtitle",
            night.subtitle
        );


        const nightSlots =
            Array.isArray(
                night.slots
            )
                ? night.slots
                : [];


        setText(
            "nightLabhaTime",
            nightSlots[0]?.time
        );


        setText(
            "nightShubhaTime",
            nightSlots[1]?.time
        );


        setText(
            "nightAmritaTime",
            nightSlots[2]?.time
        );
    }


    /* ============================================================
       ASHUBH SAMAY
       ============================================================ */

    function renderAshubh(data) {

        const ashubh =
            data.ashubhSamay || {};


        const day =
            ashubh.day || {};


        const night =
            ashubh.night || {};


        setText(
            "dayAshubhTitle",
            day.title
        );


        setText(
            "dayAshubhSubtitle",
            day.subtitle
        );


        const daySlots =
            Array.isArray(
                day.slots
            )
                ? day.slots
                : [];


        /*
         * EXACT ORDER:
         *
         * 1. Kala
         * 2. Roga
         * 3. Udvega
         */

        setText(
            "dayKalaTime",
            daySlots[0]?.time
        );


        setText(
            "dayRogaTime",
            daySlots[1]?.time
        );


        setText(
            "dayUdvegaTime",
            daySlots[2]?.time
        );


        setText(
            "nightAshubhTitle",
            night.title
        );


        setText(
            "nightAshubhSubtitle",
            night.subtitle
        );


        const nightSlots =
            Array.isArray(
                night.slots
            )
                ? night.slots
                : [];


        /*
         * EXACT ORDER:
         *
         * 1. Roga
         * 2. Kala
         * 3. Udvega
         */

        setText(
            "nightRogaTime",
            nightSlots[0]?.time
        );


        setText(
            "nightKalaTime",
            nightSlots[1]?.time
        );


        setText(
            "nightUdvegaTime",
            nightSlots[2]?.time
        );


        /*
         * 04:06 AM – 05:31 AM
         * 29 August
         */

        setText(
            "nextDayAshubhTime",
            night.nextDaySlot?.time
        );
    }


    /* ============================================================
       FULL DISTRICT RENDER
       ============================================================ */

    function renderDistrict(
        districtKey
    ) {

        const DATA =
            window.MTR_MUHURAT_DATA;


        if (
            !DATA ||
            !DATA.districts
        ) {

            setStatus(
                "Panchang data load नहीं हुआ।",
                "error"
            );

            return;
        }


        const data =
            DATA.districts[
                districtKey
            ];


        if (!data) {

            setStatus(
                "इस जिले का Panchang data उपलब्ध नहीं है।",
                "error"
            );

            console.error(
                "District data not found:",
                districtKey
            );

            return;
        }


        setStatus(
            "Panchang data loaded • " +
            safe(
                data,
                "location.district",
                ""
            ) +
            ", Bihar • " +
            safe(
                data,
                "festival.dateHindi",
                ""
            ),
            "success"
        );


        /* Main data */

        renderLocation(data);

        renderFestival(data);

        renderRakhi(data);

        renderPanchang(data);

        renderDetailedPanchang(data);

        renderSunMoon(data);

        renderChoghadiya(data);

        renderShubh(data);

        renderAshubh(data);


        /* Page title */

        document.title =
            "Raksha Bandhan Muhurat 2026 | " +
            safe(
                data,
                "location.district",
                "Bihar"
            ) +
            ", Bihar | MTR Studios";
    }


    /* ============================================================
       IST CLOCK
       ============================================================ */

    function updateISTClock() {

        const element =
            get(
                "panchangCurrentTime"
            );


        if (!element) {
            return;
        }


        const now =
            new Date();


        element.textContent =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                    timeZone:
                        "Asia/Kolkata"
                }
            );
    }


    /* ============================================================
       COPY
       ============================================================ */

    function setupCopyButton() {

        const button =
            get(
                "copyRakhiMuhurat"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            async function () {

                const data =
                    window.MTR_MUHURAT_DATA;


                const district =
                    getSelectedDistrict();


                const districtData =
                    data &&
                    data.districts
                        ? data.districts[
                            district
                        ]
                        : null;


                if (!districtData) {
                    return;
                }


                const rakhi =
                    districtData.rakhiMuhurat;


                const text =

                    "रक्षा बंधन शुभ मुहूर्त 2026\n\n" +

                    districtData.location.displayHindi +

                    "\n28 अगस्त 2026, शुक्रवार\n\n" +

                    "राखी बाँधने का शुभ समय: " +

                    rakhi.start +

                    " – " +

                    rakhi.end +

                    "\nअवधि: " +

                    rakhi.duration +

                    "\n\n" +

                    "भद्रा: " +

                    districtData.bhadra.statusHindi;


                try {

                    await navigator.clipboard
                        .writeText(text);


                    const original =
                        button.innerHTML;


                    button.innerHTML =
                        '<i class="fa-solid fa-check"></i> Copied';


                    setTimeout(
                        function () {

                            button.innerHTML =
                                original;

                        },
                        1600
                    );

                } catch (error) {

                    console.error(
                        "Copy failed:",
                        error
                    );
                }
            }
        );
    }


    /* ============================================================
       SHARE
       ============================================================ */

    function setupShareButton() {

        const button =
            get(
                "shareMuhurat"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            async function () {

                const title =
                    "Raksha Bandhan Muhurat 2026";


                const text =
                    "रक्षा बंधन शुभ मुहूर्त 2026";


                try {

                    if (
                        navigator.share
                    ) {

                        await navigator.share({

                            title:
                                title,

                            text:
                                text,

                            url:
                                window.location.href
                        });

                    } else if (
                        navigator.clipboard
                    ) {

                        await navigator.clipboard
                            .writeText(
                                window.location.href
                            );

                    }

                } catch (error) {

                    console.log(
                        "Share cancelled.",
                        error
                    );
                }
            }
        );
    }


    /* ============================================================
       DISTRICT CHANGE
       ============================================================ */

    function setupDistrictSelector() {

        const selector =
            getDistrictSelector();


        if (!selector) {
            return;
        }


        if (
            selector.dataset
                .mtrMuhuratBound === "1"
        ) {
            return;
        }


        selector.dataset
            .mtrMuhuratBound = "1";


        selector.addEventListener(
            "change",
            function () {

                renderDistrict(
                    this.value
                );
            }
        );
    }


    /* ============================================================
       INITIALIZE
       ============================================================ */

    function init() {

        if (
            !window.MTR_MUHURAT_DATA ||
            !window.MTR_MUHURAT_DATA.districts
        ) {

            setStatus(
                "muhurat-data.js load नहीं हुआ।",
                "error"
            );

            console.error(
                "MTR_MUHURAT_DATA is missing."
            );

            return;
        }


        populateDistrictSelector();

        setupDistrictSelector();

        setupCopyButton();

        setupShareButton();


        const district =
            getSelectedDistrict();


        if (district) {

            renderDistrict(
                district
            );
        }


        updateISTClock();


        setInterval(
            updateISTClock,
            1000
        );
    }


    /* ============================================================
       START
       ============================================================ */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();
    }


    /* ============================================================
       GLOBAL API
       ============================================================ */

    window.MTRMuhurat = {

        render:
            renderDistrict,

        getDistrict:
            function (key) {

                if (
                    !window.MTR_MUHURAT_DATA ||
                    !window.MTR_MUHURAT_DATA.districts
                ) {
                    return null;
                }

                return window.MTR_MUHURAT_DATA
                    .districts[key] || null;
            },

        getData:
            function () {

                return window.MTR_MUHURAT_DATA;
            }
    };


})();