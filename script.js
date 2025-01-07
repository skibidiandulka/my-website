// HTML prvky
const buddy = document.getElementById("buddy");
const gameContainer = document.getElementById("game-container");
const hitSound = document.getElementById("hit-sound");

// Vytvoření kladiva jako kurzoru
const customCursor = document.createElement("img");
customCursor.src = "pictures/kladivo.png";
customCursor.id = "custom-cursor";
document.body.appendChild(customCursor);

// Aktualizace pozice kladiva
document.addEventListener("mousemove", (event) => {
    customCursor.style.left = `${event.pageX - 25}px`;
    customCursor.style.top = `${event.pageY - 25}px`;
});

// Kliknutí na buddyho
buddy.addEventListener("click", () => {
    // Zatřesení buddyho
    buddy.style.transform = "translateX(10px)";
    setTimeout(() => buddy.style.transform = "translateX(-10px)", 50);
    setTimeout(() => buddy.style.transform = "translateX(0)", 100);

    // Přehraj zvuk
    hitSound.currentTime = 0;
    hitSound.play();

    // Otočení kladiva
    customCursor.style.transform = "rotate(90deg)";
    setTimeout(() => customCursor.style.transform = "rotate(0deg)", 200);
});
