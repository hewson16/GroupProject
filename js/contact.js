document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
    const submitButton = form.querySelector("button[type='submit']");

    // Utility function to simulate form submission delay
    function simulateNetworkRequest(duration = 2000) {
        return new Promise((resolve) => setTimeout(resolve, duration));
    }

    // Validate email format
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Display loading animation on button
    function showLoadingState(button, isLoading = true) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = `<span class="spinner"></span> Sending...`;
            button.classList.add("loading");
        } else {
            button.disabled = false;
            button.innerHTML = "Submit";
            button.classList.remove("loading");
        }
    }

    // Form submission handler
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form's default behavior

        // Clear any existing messages
        successMessage.style.display = "none";
        errorMessage.style.display = "none";

        // Extract form data
        const formData = new FormData(form);
        const username = formData.get("username").trim();
        const email = formData.get("email").trim();
        const subject = formData.get("subject");
        const message = formData.get("message").trim();

        // Client-side validation
        if (!username || !email || !subject || !message) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Please fill in all fields.";
            return;
        }

        if (!validateEmail(email)) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Please enter a valid email address.";
            return;
        }

        // Show loading state
        showLoadingState(submitButton, true);

        // Simulate a network request delay
        await simulateNetworkRequest();

        // Simulated response success/failure
        const isSuccess = Math.random() > 0.2; // 80% chance of success
        if (isSuccess) {
            successMessage.style.display = "block";
            successMessage.textContent = `Thank you, ${username}! Your message has been received.`;
            errorMessage.style.display = "none";
            form.reset(); // Reset the form
        } else {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Something went wrong. Please try again later.";
            successMessage.style.display = "none";
        }

        // Hide loading state
        showLoadingState(submitButton, false);
    });

    // Add real-time input feedback
    form.addEventListener("input", (event) => {
        const target = event.target;

        if (target.name === "email" && target.value) {
            if (validateEmail(target.value)) {
                target.style.borderColor = "#28a745"; // Green border for valid email
            } else {
                target.style.borderColor = "#dc3545"; // Red border for invalid email
            }
        } else {
            target.style.borderColor = ""; // Reset border for other fields
        }
    });

    // Add focus/blur effects for inputs
    form.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("focus", () => {
            input.style.backgroundColor = "#333";
        });

        input.addEventListener("blur", () => {
            input.style.backgroundColor = "#1a1a1a";
        });
    });

    console.log("Contact form script loaded and ready!");
});

