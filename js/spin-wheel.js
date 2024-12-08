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

// Accurate determineResult function
function determineResult(angle) {
    const totalSegments = 8; // Total number of segments on the wheel
    const segmentAngle = 360 / totalSegments; // Each segment covers this angle
    const offsetAngle = segmentAngle / 2; // Offset to align pointer with the center of the segment

    // Normalize the angle to ensure it's between 0 and 360
    let normalizedAngle = (angle + offsetAngle) % 360;

    // Determine the winning segment (0-based index)
    const winningSegment = Math.floor(normalizedAngle / segmentAngle);

    // Map the segment index to a prize
    const prizes = [
        "1",   // Segment 0 (starting at 0 degrees)
        "5",   // Segment 1
        "10",  // Segment 2
        "50",  // Segment 3
        "100", // Segment 4
        "5",   // Segment 5
        "1",   // Segment 6
        "5"    // Segment 7
    ];

    return prizes[winningSegment];
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
