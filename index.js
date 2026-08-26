// Combined Photos & Songs Playlist Configuration
const mediaPlaylist = [
  {
    photo: "assets/images/Mukesh_Sah.jpeg",
    title: " MTR Special Song 1",
    src: "assets/audio/song1.mp3"
  },
  {
    photo: "assets/images/Mukesh_Sah_2.png",
    title: " MTR Special Song 2",
    src: "assets/audio/song2.mp3"
  },
  {
    photo: "assets/images/Mukesh_Sah_3.jpeg",
    title: " MTR Wishes Song",
    src: "assets/audio/song3.mp3"
  },
  {
    photo: "assets/images/Mukesh_Sah_4.jpeg",
    title: " MTR Wishes",
    src: "assets/audio/song4.mp3"
  }
];

let currentIndex = 0;
let audioPlayer = null;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Audio Player
  audioPlayer = document.getElementById('backgroundAudio');

  if (audioPlayer && mediaPlaylist.length > 0) {
    audioPlayer.src = mediaPlaylist[0].src;
    
    // Auto-play next track when finished
    audioPlayer.addEventListener('ended', () => {
      navigateContent(1);
    });
  }

  // Hero Section Typewriter Logic
  const heroWords = [
    "Connecting Hearts Beyond Borders",
    "दूरियों और सीमाओं से परे दिलों को जोड़ना",
    "Celebrating Sacred Bond of Love",
    "प्यार के पवित्र रिश्ते का जश्न",
    "A Rakhi Carries Years of Love",
    "एक राखी में बरसों का प्यार समाया होता है",
    "A Sister Makes Every Memory Beautiful",
    "बहन हो तो हर याद अपने आप खूबसूरत बन जाती है",
    "Childhood Fades, Memories Never Do",
    "बचपन बीत जाता है, लेकिन उसकी यादें कभी नहीं मिटतीं",
    "May Our Bond Always Remain This Beautiful",
    "हमारा रिश्ता हमेशा यूँ ही खूबसूरत बना रहे",
    "May This Rakhi Bring Love, Laughter and Joy",
    "यह राखी जीवन में प्यार, हंसी और ढेर सारी खुशियाँ लेकर आए",
    "Happy Raksha Bandhan from Mukesh Sah",
    "मुकेश साह की ओर से रक्षा बंधन की हार्दिक शुभकामनाएँ"
  ];

  let hIdx = 0;
  let hCharIdx = 0;
  let hDeleting = false;

  function heroTypeLoop() {
    const current = heroWords[hIdx];
    const el = document.getElementById('heroTypewriterText');

    if (el) {
      el.innerText = hDeleting
        ? current.substring(0, hCharIdx - 1)
        : current.substring(0, hCharIdx + 1);

      hCharIdx += hDeleting ? -1 : 1;
      let speed = hDeleting ? 35 : 75;

      if (!hDeleting && hCharIdx === current.length) {
        speed = 2200;
        hDeleting = true;
      } else if (hDeleting && hCharIdx === 0) {
        hDeleting = false;
        hIdx = (hIdx + 1) % heroWords.length;
        speed = 400;
      }
      setTimeout(heroTypeLoop, speed);
    }
  }
  heroTypeLoop();

  // Founder Modal Logic
  const trigger = document.getElementById('ceoTrigger');
  const modal = document.getElementById('ceoModalOverlay');
  const closeBtn = document.getElementById('ceoModalClose');
  const acceptBtn = document.getElementById('acceptBlessingsBtn');

  function openModal() {
    if (modal) modal.classList.add('active');
    startTypingAnimation();

    // Pehli photo (Mukesh_Sah.jpeg) aur pehla song (song1.mp3) set karein
    currentIndex = 0;
    updateMediaDisplay();

    if (audioPlayer) {
      audioPlayer.src = mediaPlaylist[currentIndex].src;
    }
    playAudio();
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
    pauseAudio(); // Modal stop audio on close
  }

  if (trigger) {
    trigger.addEventListener('click', (e) => {
      if (!e.target.closest('.ceo-hide-handle')) {
        openModal();
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (acceptBtn) acceptBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});

/* ==========================================================================
   AUDIO PLAYER & NAVIGATION FUNCTIONS
   ========================================================================== */
function playAudio() {
  if (audioPlayer) {
    audioPlayer.play().then(() => {
      updatePlayPauseIcon(true);
    }).catch(err => {
      console.log("Autoplay waiting for interaction:", err);
    });
  }
}

function pauseAudio() {
  if (audioPlayer) {
    audioPlayer.pause();
    updatePlayPauseIcon(false);
  }
}

function toggleAudio() {
  if (audioPlayer.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
}

function updatePlayPauseIcon(isPlaying) {
  const icon = document.getElementById('playPauseIcon');
  if (icon) {
    icon.className = isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
  }
}

// Navigating Photo & Song Together via Side Arrows
function navigateContent(direction) {
  currentIndex = (currentIndex + direction + mediaPlaylist.length) % mediaPlaylist.length;
  updateMediaDisplay();
  
  if (audioPlayer) {
    audioPlayer.src = mediaPlaylist[currentIndex].src;
    playAudio();
  }
}

function updateMediaDisplay() {
  const imgEl = document.getElementById('ceoModalImg');
  const titleEl = document.getElementById('currentSongTitle');

  if (imgEl && mediaPlaylist[currentIndex]) {
    imgEl.src = mediaPlaylist[currentIndex].photo;
  }

  if (titleEl && mediaPlaylist[currentIndex]) {
    titleEl.innerHTML = `<i class="fa-solid fa-music"></i> <span>${mediaPlaylist[currentIndex].title}</span>`;
  }
}

/* ==========================================================================
   FEATURE CARD & FULL MESSAGE SEQUENTIAL TYPING ANIMATION
   ========================================================================== */
function toggleFeatureDetail(buttonElement) {
  const card = buttonElement.closest('.feature-card');
  const drawer = card.querySelector('.card-expand-content');
  const icon = buttonElement.querySelector('i');

  const isOpen = drawer.classList.contains('open');

  if (isOpen) {
    drawer.classList.remove('open');
    buttonElement.classList.remove('active');
    icon.className = 'fa-solid fa-plus';
  } else {
    drawer.classList.add('open');
    buttonElement.classList.add('active');
    icon.className = 'fa-solid fa-minus';
  }
}

const headingText = "प्रिय बहनों,";

const p1Text = "रक्षाबंधन सिर्फ़ राखी बाँधने का दिन नहीं, बल्कि उस रिश्ते को महसूस करने का दिन है,जो बचपन से दिल में बसा है और उम्रभर साथ रहता है।";

const p2Text = "आप सभी को रक्षाबंधन की हार्दिक शुभकामनाएँ। ईश्वर आपके जीवन में खुशियाँ, सफलता और सम्मान हमेशा बनाए रखे।";

const p3Text = "❤️ हमेशा खुश रहें, मुस्कुराती रहें। ❤️";

const p4Text = "स्नेह सहित — आपका भाई";

function startTypingAnimation() {
  const heading = document.getElementById("typingHeading");
  const message = document.getElementById("typingMessage");

  if (!heading || !message) return;

  heading.textContent = "";
  message.innerHTML = "";

  let hIdx = 0;
  let p1Idx = 0;
  let p2Idx = 0;
  let p3Idx = 0;
  let p4Idx = 0;

  // 1. Type Heading
  function typeHeading() {
    if (hIdx < headingText.length) {
      heading.textContent += headingText[hIdx];
      hIdx++;
      setTimeout(typeHeading, 80);
    } else {
      setTimeout(typeParagraph1, 300);
    }
  }

  // 2. Type Paragraph 1
  function typeParagraph1() {
    if (p1Idx < p1Text.length) {
      message.innerHTML = p1Text.substring(0, p1Idx + 1);
      p1Idx++;
      setTimeout(typeParagraph1, 30);
    } else {
      setTimeout(typeParagraph2, 400);
    }
  }

  // 3. Type Paragraph 2
  function typeParagraph2() {
    if (p2Idx < p2Text.length) {
      message.innerHTML = p1Text + "<br><br>" + p2Text.substring(0, p2Idx + 1);
      p2Idx++;
      setTimeout(typeParagraph2, 30);
    } else {
      setTimeout(typeParagraph3, 400);
    }
  }

  // 4. Type Paragraph 3 (Bold)
  function typeParagraph3() {
    if (p3Idx < p3Text.length) {
      message.innerHTML = p1Text + "<br><br>" + p2Text + "<br><br><strong>" + p3Text.substring(0, p3Idx + 1) + "</strong>";
      p3Idx++;
      setTimeout(typeParagraph3, 40);
    } else {
      setTimeout(typeParagraph4, 400);
    }
  }

  // 5. Type Paragraph 4 (Bold Sign-off)
  function typeParagraph4() {
    if (p4Idx < p4Text.length) {
      message.innerHTML = p1Text + "<br><br>" + p2Text + "<br><br><strong>" + p3Text + "</strong><br><br><strong>" + p4Text.substring(0, p4Idx + 1) + "</strong>";
      p4Idx++;
      setTimeout(typeParagraph4, 40);
    }
  }

  setTimeout(typeHeading, 150);
}

function hideCeoWidget(event) {
  event.stopPropagation();
  const trigger = document.getElementById('ceoTrigger');
  const minTab = document.getElementById('ceoMinimizedTab');

  if (trigger && minTab) {
    trigger.classList.add('hidden-widget');
    minTab.classList.add('visible');
  }
}

function showCeoWidget() {
  const trigger = document.getElementById('ceoTrigger');
  const minTab = document.getElementById('ceoMinimizedTab');

  if (trigger && minTab) {
    trigger.classList.remove('hidden-widget');
    minTab.classList.remove('visible');
  }
}