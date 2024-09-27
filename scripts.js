// Array of sounds and button texts
const sounds = [
    new Audio('./sound/Mos.mp3'), // Sound 1
    new Audio('./sound/slap.mp3'), // Sound 2
];

const texts = [
    "Clap the Mosquito out of existence", // Text for Sound 1
    "Activate the Mosquito",              // Text for Sound 2
];

// Initialize the current index and clap count
let currentIndex = 0;
let clapCount = 0;
let countdownInterval;

// Get the button element, countdown box, and mosquito
const soundButton = document.getElementById('soundButton');
const mosquito = document.getElementById('mosquito');
const countdownDisplay = document.getElementById('countdownDisplay');

// Array of humorous messages for the countdown
const countdownMessages = [
    "You have 10 seconds to save your sanity from the buzzing menace!",
    "9 seconds left, it's getting louder!",
    "8 seconds left, and the mosquito is laughing at you!",
    "7 seconds left, have you found the mosquito yet?",
    "6 seconds left, it’s time to swat it!",
    "5 seconds left, you can do it!",
    "4 seconds left, the mosquito is flying low!",
    "3 seconds left, it's getting too close!",
    "2 seconds left, one more second to save yourself!",
    "1 second left, the final chance to end it!",
    "Time's up! The mosquito won... for now."
];

// Function to start the countdown timer
const startCountdown = () => {
    let countdownValue = 10; // Set the countdown time in seconds
    countdownDisplay.textContent = countdownMessages[0]; // Initial message

    countdownInterval = setInterval(() => {
        countdownValue--;

        if (countdownValue >= 0 && countdownValue < 10) {
            countdownDisplay.textContent = countdownMessages[10 - countdownValue]; // Update the message based on time left
        }

        if (countdownValue <= 0) {
            clearInterval(countdownInterval);

            // Display congratulations message with clap count
            countdownDisplay.textContent = `Congratulations! You’ve destroyed the mosquito ${clapCount} time(s)! 🦟💥`;

            // Reload the page after 2 seconds
            setTimeout(() => {
                location.reload(); // Reload the page to start over
            }, 2000);
        }
    }, 1000);
};

// Function to handle button click
const handleButtonClick = () => {
    // Play the current sound
    const currentSound = sounds[currentIndex];

    // Stop the other sound if it's currently playing
    sounds.forEach((sound, index) => {
        if (index !== currentIndex) {
            sound.pause(); // Stop the other sound
            sound.currentTime = 0; // Reset to start
        }
    });

    // Play the current sound
    currentSound.currentTime = 0; // Reset to start
    currentSound.play(); // Play the sound

    // Increment clap count
    clapCount++;

    // Start the countdown if it's the first clap
    if (clapCount === 1) {
        startCountdown();
    }

    // Update button text
    soundButton.textContent = texts[currentIndex];

    // Increment the index for the next click
    currentIndex = (currentIndex + 1) % texts.length;
};

// Attach click event listener to the button
soundButton.addEventListener('click', handleButtonClick);
