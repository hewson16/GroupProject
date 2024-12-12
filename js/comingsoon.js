document.querySelector('.dropdown-btn').addEventListener('click', () => {
    const leftNavbar = document.querySelector('.leftnavbar');
    leftNavbar.classList.toggle('expanded'); // Toggle the "expanded" class
});


//Simulate adding or subtracting shilling balance

// Get references to the DOM elements
const shillingText = document.querySelector('.shilling-text'); // The element displaying the shilling count
const addButton = document.getElementById('add-shilling'); // The "+" button
const subtractButton = document.getElementById('subtract-shilling'); // The "−" button

// Initial shilling count (starting value from the displayed text)
let shillingCount = parseInt(shillingText.textContent, 10);

// Function to update the shilling count display
function updateShillingDisplay() {
    shillingText.textContent = shillingCount; // Update the text inside the span
}

// Event listener for adding one shilling
addButton.addEventListener('click', () => {
    shillingCount += 1; // Increment the shilling count
    updateShillingDisplay(); // Update the display
});

// Event listener for subtracting one shilling
subtractButton.addEventListener('click', () => {
    if (shillingCount > 0) { // Prevent negative shillings
        shillingCount -= 1; // Decrement the shilling count
        updateShillingDisplay(); // Update the display
    }
});
