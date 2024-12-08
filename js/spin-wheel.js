let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let currentValue = 0; // Track current rotation value to reset properly

spinBtn.onclick = function () {
    if (spinBtn.disabled) return; // Prevent multiple clicks during spin

    spinBtn.disabled = true; // Disable button during spin
    spinBtn.textContent = "Spinning...";
    wheel.style.transition = "none"; // Instantly reset animation
    wheel.style.transform = `rotate(${currentValue}deg)`; // Reset to the current angle

    setTimeout(() => {
        const spinValue = Math.ceil(Math.random() * 3600); // Generate a new random spin value
        currentValue += spinValue; // Accumulate value for accurate rotation tracking
        wheel.style.transition = "transform 3s ease-out"; // Re-enable smooth animation
        wheel.style.transform = `rotate(${currentValue}deg)`; // Apply the new spin

        // Calculate and display the result after the spin completes
        setTimeout(() => {
            const result = determineResult(currentValue % 360); // Determine the prize based on angle
            showWinEffect(result); // Trigger visual effects for the win
            spinBtn.textContent = "Spin Again"; // Reset button text
            spinBtn.disabled = false; // Re-enable button
        }, 3000); // Match the spin duration
    }, 100); // Small delay for reset
};

// Improved determineResult function
function determineResult(angle) {
    const totalSegments = 8; // Total number of segments on the wheel
    const segmentAngle = 360 / totalSegments; // Each segment covers this angle
    const pointerOffset = 0; // Adjust if the pointer isn’t perfectly aligned with 0 degrees

    // Normalize the angle to ensure it's between 0 and 360
    let normalizedAngle = (angle - pointerOffset + 360) % 360;

    // Handle floating-point rounding issues with a small margin
    const margin = 0.001;

    // Define segment prizes
    const prizes = [
        "1",   // Segment 0
        "5",   // Segment 1
        "10",  // Segment 2
        "50",  // Segment 3
        "100", // Segment 4
        "5",   // Segment 5
        "1",   // Segment 6
        "5"    // Segment 7
    ];

    // Determine the winning segment
    for (let i = 0; i < totalSegments; i++) {
        const startAngle = i * segmentAngle - margin;
        const endAngle = (i + 1) * segmentAngle + margin;

        // Log debug information
        console.log(`Segment ${i}: Start ${startAngle}, End ${endAngle}, Normalized Angle ${normalizedAngle}`);

        // Check if the normalized angle falls within this segment
        if (normalizedAngle >= startAngle && normalizedAngle < endAngle) {
            return prizes[i]; // Return the prize for the winning segment
        }
    }

    // Fallback in case of unexpected errors
    console.error("Could not determine the winning segment for angle:", normalizedAngle);
    return null;
}

// Function to trigger win effects
function showWinEffect(result) {
    console.log("You won: $" + result); // Log the result

    // Trigger confetti
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

    // Create and animate floating text
    createFloatingText("$" + result);
}

// Function to create floating text
function createFloatingText(text) {
    const floatingText = document.createElement("div");
    floatingText.textContent = text;
    floatingText.style.position = "absolute";
    floatingText.style.top = "50%"; // Center vertically
    floatingText.style.left = "50%"; // Center horizontally
    floatingText.style.transform = "translate(-50%, -50%)";
    floatingText.style.fontSize = "32px";
    floatingText.style.fontWeight = "bold";
    floatingText.style.color = "gold";
    floatingText.style.textShadow = "2px 2px 10px rgba(0, 0, 0, 0.8)";
    floatingText.style.animation = "float-up 2s ease forwards";
    floatingText.style.zIndex = "9999"; // Bring text to the very front

    document.body.appendChild(floatingText);

    setTimeout(() => {
        floatingText.remove();
    }, 2000);
}

// Add floating text animation via CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -200%);
        }
    }
`;
document.head.appendChild(style);


/*
//MUSIC PLAYBACK STUFF

// Get the audio element
const backgroundMusic = document.getElementById("background-music");

// Retrieve the saved playback time and mute state from localStorage
const savedTime = localStorage.getItem("musicPlaybackTime");
const savedMuted = localStorage.getItem("musicMuted") === "true"; // Convert to boolean

// Restore playback position and mute state
if (savedTime) {
    backgroundMusic.currentTime = parseFloat(savedTime);
}
backgroundMusic.muted = savedMuted;

// Start playing the music when the page loads
backgroundMusic.play().catch((error) => {
    console.error("Autoplay blocked by browser:", error);
});

// Update the playback time in localStorage periodically
backgroundMusic.addEventListener("timeupdate", () => {
    localStorage.setItem("musicPlaybackTime", backgroundMusic.currentTime);
});

// Add a mute toggle button
const muteButton = document.getElementById("mute-music");
updateMuteButton(); // Initialize the button emoji based on mute state

muteButton.onclick = () => {
    backgroundMusic.muted = !backgroundMusic.muted; // Toggle the mute state
    localStorage.setItem("musicMuted", backgroundMusic.muted); // Save mute state
    updateMuteButton(); // Update the button emoji
};

// Function to update the mute button emoji
function updateMuteButton() {
    muteButton.textContent = backgroundMusic.muted ? "🔇" : "🔊"; // Toggle between muted and unmuted icons
}
*/

