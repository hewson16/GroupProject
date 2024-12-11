document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("scareMeterForm");
    const feedbackMessage = document.getElementById("feedbackMessage");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        // Get selected scare rating
        const selectedRating = document.querySelector('input[name="scareRating"]:checked');

        if (!selectedRating) {
            feedbackMessage.textContent = "Please select a scare rating before submitting.";
            feedbackMessage.className = "feedback-message error";
            feedbackMessage.style.display = "block";
            return;
        }

        const rating = selectedRating.value;

        // Display success feedback
        feedbackMessage.textContent = `Thank you for rating the game a ${rating} out of 5!`;
        feedbackMessage.className = "feedback-message success";
        feedbackMessage.style.display = "block";

        // Optionally: Send rating data to a server or local storage
        console.log(`User submitted a scare rating of: ${rating}`);
    });
});


