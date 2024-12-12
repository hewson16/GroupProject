document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleMode");
    const video = document.getElementById("backgroundVideo");

    // Check localStorage for saved mode
    let isDayMode = localStorage.getItem("isDayMode") === "true";
    let darkmode = localStorage.getItem("darkmode") === "true";

    // Apply the saved mode on load
    if (!isDayMode) {
        switchToNightMode();
    } else {
        switchToDayMode();
    }

    toggleButton.addEventListener("click", () => {
        if (isDayMode) {
            switchToNightMode();
        } else {
            switchToDayMode();
        }
        isDayMode = !isDayMode; // Toggle the mode
        localStorage.setItem("isDayMode", isDayMode); // Save the mode to localStorage
        video.play(); // Ensure the video plays after switching
    });

    function switchToNightMode() {
        video.src = "videos/night mode.mp4";
        toggleButton.textContent = "Switch to Day Mode";
        document.body.classList.remove("day-mode");
        document.body.classList.add("night-mode");
        document.body.classList.add("darkmode");
        darkmode = true;
        localStorage.setItem("darkmode", darkmode); // Save dark mode state
    }

    function switchToDayMode() {
        video.src = "videos/light mode.mp4";
        toggleButton.textContent = "Switch to Night Mode";
        document.body.classList.remove("night-mode");
        document.body.classList.add("day-mode");
        document.body.classList.remove("darkmode");
        darkmode = false;
        localStorage.setItem("darkmode", darkmode); // Save dark mode state
    }
});
