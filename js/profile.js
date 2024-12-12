document.addEventListener("DOMContentLoaded", () => {
    const profileImg = document.getElementById("profile-img");
    const profileImgUpload = document.getElementById("profile-img-upload");
    const displayNameInput = document.getElementById("display-name-input");
    const bioInput = document.getElementById("bio-input");
    const achievements = document.querySelectorAll(".achievements input[type='checkbox']");
    const addImageBtn = document.getElementById("add-image-btn");
    const removeImageBtn = document.getElementById("remove-image-btn");

    // Load saved data from localStorage
    const savedProfileImg = localStorage.getItem("profileImg");
    const savedDisplayName = localStorage.getItem("displayName");
    const savedBio = localStorage.getItem("bio");
    const savedAchievements = JSON.parse(localStorage.getItem("achievements")) || {};

    // Apply saved data
    if (savedProfileImg) {
        profileImg.src = savedProfileImg;
    }
    if (savedDisplayName) {
        displayNameInput.value = savedDisplayName;
    }
    if (savedBio) {
        bioInput.value = savedBio;
    }
    achievements.forEach((checkbox, index) => {
        checkbox.checked = savedAchievements[index] || false;
    });

    // Event Listeners
    addImageBtn.addEventListener("click", () => {
        profileImgUpload.click();
    });

    profileImgUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImg.src = e.target.result;
                localStorage.setItem("profileImg", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    removeImageBtn.addEventListener("click", () => {
        profileImg.src = "images/default-profile.png"; // Reset to default profile image
        localStorage.removeItem("profileImg"); // Remove from localStorage
    });

    displayNameInput.addEventListener("input", () => {
        localStorage.setItem("displayName", displayNameInput.value);
    });

    bioInput.addEventListener("input", () => {
        localStorage.setItem("bio", bioInput.value);
    });

    achievements.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            savedAchievements[index] = checkbox.checked;
            localStorage.setItem("achievements", JSON.stringify(savedAchievements));
        });
    });
});
