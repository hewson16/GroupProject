document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleMode");
    const video = document.getElementById("backgroundVideo");

    // Check localStorage for saved mode
    let isDayMode = localStorage.getItem("isDayMode") === "true";

    // Apply the saved mode on load
    if (!isDayMode) {
        video.src = "videos/night mode.mp4";
        toggleButton.textContent = "Switch to Day Mode";
        document.body.classList.remove("day-mode");
        document.body.classList.add("night-mode");
    }

    toggleButton.addEventListener("click", () => {
        if (isDayMode) {
            // Switch to Night Mode
            video.src = "videos/night mode.mp4";
            toggleButton.textContent = "Switch to Day Mode";
            document.body.classList.remove("day-mode");
            document.body.classList.add("night-mode");
        } else {
            // Switch to Day Mode
            video.src = "videos/light mode.mp4";
            toggleButton.textContent = "Switch to Night Mode";
            document.body.classList.remove("night-mode");
            document.body.classList.add("day-mode");
        }
        isDayMode = !isDayMode; // Toggle the mode
        localStorage.setItem("isDayMode", isDayMode); // Save the mode to localStorage
        video.play(); // Ensure the video plays after switching
    });
});
