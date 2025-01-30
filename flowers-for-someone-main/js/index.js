window.onload = async function () {
    const music = document.getElementById("background-music");
    const playButton = document.getElementById("play-music");

    // Ensure the audio file is preloaded
    music.load();

    // Check if music was playing before
    let savedTime = sessionStorage.getItem("musicTime");
    if (savedTime) {
        music.currentTime = parseFloat(savedTime); // Ensure proper conversion
    }

    try {
        await music.play();
        console.log("🎵 Music autoplayed successfully!");
        sessionStorage.setItem("musicPlaying", "true");
    } catch (error) {
        console.warn("⚠️ Autoplay blocked! Showing Play Button.");
        playButton.style.display = "block"; // Show button if autoplay fails

        // User must click to play
        playButton.addEventListener("click", async () => {
            await music.play();
            sessionStorage.setItem("musicPlaying", "true");
            playButton.style.display = "none"; // Hide after playing
            console.log("🎵 Music started after user interaction!");
        }, { once: true });
    }

    // ✅ Trigger wave effect after title animation finishes
    let completedAnimations = 0;
    const textElements = document.querySelectorAll(".title span");

    textElements.forEach((letter) => {
        letter.addEventListener("animationend", () => {
            completedAnimations++;
            if (completedAnimations === textElements.length) {
                triggerWaveEffect();
            }
        });
    });

    function triggerWaveEffect() {
        textElements.forEach((letter, index) => {
            setTimeout(() => letter.classList.add("wave"), index * 100);
        });

        const heart = document.querySelector(".heart");

        setTimeout(() => {
            heart.classList.add("stay-blue");
            setTimeout(() => {
                heart.style.opacity = "0";
                heart.style.transition = "opacity 1s ease";
            }, 2000);
            setTimeout(() => {
                document.querySelector(".btn").classList.add("visible");
            }, 1000);
        }, textElements.length * 100);
    }

    // ✅ Ensure music continues on "Celebrate!" click
    document.querySelector(".btn").addEventListener("click", function () {
        sessionStorage.setItem("musicTime", music.currentTime);
        sessionStorage.setItem("musicPlaying", "true");
    });
};
