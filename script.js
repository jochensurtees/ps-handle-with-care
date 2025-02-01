// Timer functionality
let timer;
let timeRemaining = 0;
let isPaused = false;
let remainingTimeWhenPaused = 0;
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timeSelect = document.getElementById('timeSelect');

// Start button click handler
startBtn.addEventListener('click', function () {
  if (timeRemaining === 0) {
    timeRemaining = parseInt(timeSelect.value); // Get the selected time in seconds
  }

  // Start or resume the timer
  if (isPaused) {
    isPaused = false;
    timeRemaining = remainingTimeWhenPaused;
  }

  updateTimerDisplay();
  startTimer();
});

// Pause button click handler
pauseBtn.addEventListener('click', function () {
  clearInterval(timer);
  isPaused = true;
  remainingTimeWhenPaused = timeRemaining;  // Save time when paused
  pauseBtn.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = false;
});

// Reset button click handler (Stop the timer)
resetBtn.addEventListener('click', function () {
  clearInterval(timer);
  timeRemaining = 0;
  updateTimerDisplay();
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  startBtn.disabled = false;
});

function startTimer() {
  pauseBtn.disabled = false;
  startBtn.disabled = true;
  resetBtn.disabled = false;

  timer = setInterval(function () {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60); // Get minutes
  const seconds = timeRemaining % 60; // Get seconds

  // Display the time in MM:SS format
  timerDisplay.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
