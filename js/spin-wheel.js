document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("case-open-button");
    const prizeBox = document.getElementById("prize-box");
    
    // Create a countdown display
    const cooldownDisplay = document.createElement("div");
    cooldownDisplay.style.marginTop = "10px";
    cooldownDisplay.style.fontSize = "16px";
    cooldownDisplay.style.color = "red";
    cooldownDisplay.style.height = "20px"; // Ensure a consistent height
    cooldownDisplay.textContent = ""; // Start empty
    button.parentNode.insertBefore(cooldownDisplay, button.nextSibling); // Add it below the button

    // Array of prizes
    const prizes = [
        { emoji: "💰", text: "Prize!" },
        { emoji: "❌", text: "" },
        { emoji: "❌", text: "" },
        { emoji: "❌", text: "" },
    ];

    let cooldown = false; // Cooldown flag

    button.addEventListener("click", () => {
        if (cooldown) {
            console.log("Please wait for the cooldown to finish!");
            return; // Exit if cooldown is active
        }

        // Set cooldown to true and disable the button
        cooldown = true;
        button.disabled = true;

        // Start countdown
        let countdown = 3;
        cooldownDisplay.textContent = `Cooldown: ${countdown}s`;

        const interval = setInterval(() => {
            countdown--;
            cooldownDisplay.textContent = countdown > 0 ? `Cooldown: ${countdown}s` : "";

            if (countdown <= 0) {
                clearInterval(interval);
                cooldown = false;
                button.disabled = false;
                cooldownDisplay.textContent = ""; // Empty text but keep the box visible

                // Cool way for the prize to go away
                Velocity(prizeBox, {
                    opacity: 0, // Fade out
                    scale: 0.5, // Shrink to half size
                }, {
                    duration: 1000, // 1 second
                    easing: "easeInOutCubic",
                    complete: () => {
                        prizeBox.style.display = "none"; // Hide the prize box after animation
                        console.log("Prize has disappeared in a cool way!");
                    }
                });
            }
        }, 1000);

        // Reset prize box
        prizeBox.style.opacity = 0;
        prizeBox.style.transform = "scale(1)";
        prizeBox.style.display = "none";
        prizeBox.innerHTML = ""; // Clear any previous prize content

        // Randomly select a prize
        const prize = prizes[Math.floor(Math.random() * prizes.length)];

        // Display prize (emoji and optional text)
        prizeBox.innerHTML = `
            <div style="font-size: 48px;">${prize.emoji}</div>
            <div style="font-size: 18px; color: green; margin-top: 10px;">${prize.text}</div>
        `;

        // Show the prize result
        Velocity(prizeBox, {
            opacity: 1,
            scale: [1, 0], // Animate scale from 0 to 1
        }, {
            duration: 1000,
            display: "block",
            easing: "easeInOutCubic",
            complete: () => {
                // Trigger confetti for non-❌ results
                if (prize.emoji !== "❌") {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            }
        });
    });
});
