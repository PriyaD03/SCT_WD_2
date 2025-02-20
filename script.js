let minutes = 0, seconds = 0, milliseconds = 0, interval;
let running = false;
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const lapsContainer = document.getElementById("laps");

// Start or Stop Stopwatch
function startStop() {
    if (!running) {
        interval = setInterval(updateTime, 10);
        startStopButton.textContent = "Pause";
        startStopButton.style.background = "orange";
    } else {
        clearInterval(interval);
        startStopButton.textContent = "Start";
        startStopButton.style.background = "green";
    }
    running = !running;
}

// Reset Stopwatch
function reset() {
    clearInterval(interval);
    minutes = seconds = milliseconds = 0;
    running = false;
    startStopButton.textContent = "Start";
    startStopButton.style.background = "green";
    updateDisplay();
    lapsContainer.innerHTML = "";
}

// Update Time
function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

// Update Stopwatch Display
function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
    millisecondsDisplay.textContent = (milliseconds / 10).toString().padStart(2, "0");
}

// Save Lap Time
function saveLap() {
    if (running) {
        let lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        let lapItem = document.createElement("li");
        lapItem.textContent = "Lap: " + lapTime;
        lapsContainer.appendChild(lapItem);
    }
}

// Event Listeners
startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", saveLap);