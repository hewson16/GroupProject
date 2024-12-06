console.log('spun the wheel');

// Define items and their odds
const items = [
    { name: "Endless riches", image: "gold", odds: 5 },  // 5% chance
    { name: "A fake firearm", image: "silver-trophy.png", odds: 15 }, // 15% chance
    { name: "1 Robux", image: "bronze-trophy.png", odds: 30 }, // 30% chance
    { name: "Nothing!", image: "consolation.png", odds: 50 } // 50% chance
];

function openCase() {
    // Calculate total odds
    const totalOdds = items.reduce((sum, item) => sum + item.odds, 0);
    
    // Generate a random number between 0 and totalOdds
    const random = Math.random() * totalOdds;
    let cumulative = 0;

    // Determine which item is won
    for (const item of items) {
        cumulative += item.odds;
        if (random < cumulative) {
            displayResult(item);
            return;
        }
    }
}

function displayResult(item) {
    const resultImage = document.getElementById("result-image");
    const resultText = document.getElementById("result-text");

    resultImage.src = item.image;
    resultImage.style.display = "block";
    resultText.textContent = `You won: ${item.name}!`;
}

// Attach event listener to button
document.getElementById("open-case-button").addEventListener("click", openCase);


