document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleMode");
    const video = document.getElementById("backgroundVideo");

    let isDayMode = true; // Initial state

    toggleButton.addEventListener("click", () => {
        if (isDayMode) {
            // Switch to Night Mode
            video.src = "videos/night mode.mp4";
            toggleButton.textContent = "Switch to Day Mode";
        } else {
            // Switch to Day Mode
            video.src = "videos/light mode.mp4";
            toggleButton.textContent = "Switch to Night Mode";
        }
        isDayMode = !isDayMode; // Toggle the mode
        video.play(); // Ensure the video plays after switching
    });
});
