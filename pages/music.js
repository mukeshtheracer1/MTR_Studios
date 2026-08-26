/* ==========================================================================
   20 SONGS DATASET & PLAYER LOGIC - MTR STUDIOS
   ========================================================================== */

const playlist = [
    { id: 1, title: "Bhaiya Mere Rakhi Ke", artist: "Shankar-Jaikishan", category: "rakhi", cover: "../assets/images/rakhi1.webp", audio: "../assets/audio/song1.mp3" },
    { id: 2, title: "Phoolon Ka Taron Ka ", artist: "Kishore Kumar", category: "rakhi", cover: "../assets/images/rakhi2.jpg", audio: "../assets/audio/song2.mp3" },
    { id: 3, title: "Dhaagon Se Baandhaa", artist: "Shreya Ghoshal", category: "rakhi", cover: "../assets/images/rakhi3.jpg", audio: "../assets/audio/song3.mp3" },
    { id: 4, title: "Rakhi Ka Ye Dhaga", artist: "MTR Studios", category: "rakhi", cover: "../assets/images/rakhi4.png", audio: "../assets/audio/song4.mp3" },
 
];

let currentIndex = -1;
const audioEngine = document.getElementById('audioEngine');
const songsGrid = document.getElementById('songsGrid');

// Render Songs Cards
function renderSongs(songs) {
    songsGrid.innerHTML = '';
    songs.forEach((song, index) => {
        const card = document.createElement('div');
        card.className = `song-card ${currentIndex === index ? 'playing' : ''}`;
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${song.cover}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(song.title)}&background=800020&color=fff&size=300'" alt="${song.title}">
                <div class="card-play-overlay">
                    <button class="overlay-play-btn" onclick="playSong(${index})">
                        <i class="fa-solid ${currentIndex === index && !audioEngine.paused ? 'fa-pause' : 'fa-play'}"></i>
                    </button>
                </div>
            </div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="card-actions">
                <a href="${song.audio}" class="download-link" download="${song.title}.mp3">
                    <i class="fa-solid fa-download"></i> डाउनलोड MP3
                </a>
            </div>
        `;
        songsGrid.appendChild(card);
    });
}

// Play Song Function
function playSong(index) {
    if (index === currentIndex) {
        if (audioEngine.paused) {
            audioEngine.play();
        } else {
            audioEngine.pause();
        }
    } else {
        currentIndex = index;
        const song = playlist[currentIndex];
        audioEngine.src = song.audio;
        
        // Update Sticky Player DOM
        document.getElementById('playerThumb').src = song.cover;
        document.getElementById('playerTitle').textContent = song.title;
        document.getElementById('playerArtist').textContent = song.artist;
        document.getElementById('playerDownloadBtn').href = song.audio;
        document.getElementById('playerDownloadBtn').setAttribute('download', `${song.title}.mp3`);
        
        audioEngine.play();
    }
    updateUI();
}

function updateUI() {
    const mainPlayBtn = document.getElementById('mainPlayBtn');
    if (audioEngine.paused) {
        mainPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        mainPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    renderSongs(playlist);
}

// Audio Engine Listeners
audioEngine.addEventListener('timeupdate', () => {
    const progress = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    
    if (audioEngine.duration) {
        progress.value = (audioEngine.currentTime / audioEngine.duration) * 100;
        currentTimeEl.textContent = formatTime(audioEngine.currentTime);
        durationEl.textContent = formatTime(audioEngine.duration);
    }
});

audioEngine.addEventListener('ended', () => {
    if (currentIndex < playlist.length - 1) {
        playSong(currentIndex + 1);
    } else {
        playSong(0);
    }
});

document.getElementById('progressBar').addEventListener('input', (e) => {
    if (audioEngine.duration) {
        audioEngine.currentTime = (e.target.value / 100) * audioEngine.duration;
    }
});

document.getElementById('mainPlayBtn').addEventListener('click', () => {
    if (currentIndex === -1) {
        playSong(0);
    } else {
        if (audioEngine.paused) audioEngine.play();
        else audioEngine.pause();
        updateUI();
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIndex > 0) playSong(currentIndex - 1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentIndex < playlist.length - 1) playSong(currentIndex + 1);
});

function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

// Initialize
renderSongs(playlist);
