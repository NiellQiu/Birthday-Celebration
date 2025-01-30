window.onload = () => {
  // Start fireworks immediately when the page loads
  startFireworksLoop(); // Start fireworks right away

  setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    document.body.appendChild(titleElement);
  }, 1000);
};

// Function to create a single firework at a random position with different colors
function createFirework() {
  const firework = document.createElement('div');
  firework.classList.add('fireworks');

  // Randomly assign one of the colors: soft pink, pink, lavender, yellow, or white
  const colors = ['soft-pink', 'pink', 'lavender', 'yellow', 'white'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  firework.classList.add(randomColor); // Add the randomly chosen color class to the firework

  document.body.appendChild(firework);

  // Set random position for the firework, focusing on left and right of the screen
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight / 2 + window.innerHeight / 4; // Focus the firework more on top
  
  firework.style.left = `${x}px`;
  firework.style.top = `${y}px`;

  // Apply random animation duration and delay (slower)
  const randomDuration = (4 + Math.random() * 2).toFixed(2); // Between 4s and 6s for slower animation
  const randomDelay = (Math.random() * 2).toFixed(2); // Between 0s and 2s for delay
  firework.style.animationDuration = `${randomDuration}s`;
  firework.style.animationDelay = `${randomDelay}s`;

  // Log the creation of the firework for debugging
  console.log("Firework created at", firework.style.left, firework.style.top);

  // Remove the firework element after the animation ends
  setTimeout(() => {
    firework.remove();
  }, (parseFloat(randomDuration) + parseFloat(randomDelay)) * 1000);
}

// Function to start the continuous fireworks loop
function startFireworksLoop() {
  console.log("Starting fireworks loop"); // Debug log to ensure this is being called
  setInterval(() => {
    // Create multiple fireworks at random intervals (less frequent)
    for (let i = 0; i < 5; i++) { // Adjust the number of fireworks per batch
      createFirework();
    }
  }, 2000); // Create a batch of fireworks every 2 seconds (slower)
}