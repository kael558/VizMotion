
let isPlaying = false;
let animationFrameId = null;
let startTime = 0;
let selectionStart = null;
let selectionEnd = null;

const cursor = document.querySelector('.timeline-cursor');
const selection = document.querySelector('.timeline-selection');
const playPauseBtn = document.getElementById('playPauseBtn');


function togglePlayPause() {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';

    if (isPlaying) {
        startTime = performance.now() - (cursor.offsetLeft / timeline.offsetWidth) * endDuration * 1000;
        //animationFrameId = requestAnimationFrame(updateAnimation);
    } else {
        cancelAnimationFrame(animationFrameId);
    }
}

function updateAnimation(timestamp) {
    const elapsed = (timestamp - startTime) / 1000;
    animate({ time: Math.min(elapsed, endDuration) });

    if (isPlaying && elapsed < endDuration) {
        animationFrameId = requestAnimationFrame(updateAnimation);
    }
}

timeline.addEventListener('click', (e) => {
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = (x / rect.width) * endDuration;
    animate({ time });
});

timeline.addEventListener('mousedown', (e) => {
    if (e.shiftKey) {
        const rect = timeline.getBoundingClientRect();
        selectionStart = (e.clientX - rect.left) / rect.width;
        selection.style.left = `${selectionStart * 100}%`;
        selection.style.width = '0';
        selection.style.display = 'block';
    }
});

timeline.addEventListener('mousemove', (e) => {
    if (e.shiftKey && selectionStart !== null) {
        const rect = timeline.getBoundingClientRect();
        const currentPos = (e.clientX - rect.left) / rect.width;
        const selectionWidth = Math.abs(currentPos - selectionStart);
        const selectionLeft = Math.min(selectionStart, currentPos);
        
        selection.style.left = `${selectionLeft * 100}%`;
        selection.style.width = `${selectionWidth * 100}%`;
    }
});

timeline.addEventListener('mouseup', () => {
    if (selectionStart !== null) {
        selectionStart = null;
    }
});

playPauseBtn.addEventListener('click', togglePlayPause);

// Initialize the timeline
updateTimeline(0);