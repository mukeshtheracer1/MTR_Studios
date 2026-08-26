/* ==========================================================================
   COMING SOON COUNTDOWN LOGIC - MTR STUDIOS
   ========================================================================== */

// Launch Date Target (15 Days from current date)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 15);

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();