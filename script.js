// HTML prvky
const buddy = document.getElementById("buddy");
const gameContainer = document.getElementById("game-container");
const hitSound = document.getElementById("hit-sound");

// Vytvoření kladiva jako kurzoru
const customCursor = document.createElement("img");
customCursor.src = "pictures/kladivo.png";
customCursor.id = "custom-cursor";
document.body.appendChild(customCursor);

// Funkce pro náhodný směr třesení
function shakeBuddy() {
    const randomX = (Math.random() - 0.5) * 20; // Náhodný pohyb X
    const randomY = (Math.random() - 0.5) * 20; // Náhodný pohyb Y
    buddy.style.transform = `translate(${randomX}px, ${randomY}px)`;
    setTimeout(() => buddy.style.transform = "translate(0, 0)", 100);
}

// Aktualizace pozice kladiva
document.addEventListener("mousemove", (event) => {
    customCursor.style.left = `${event.pageX - 25}px`;
    customCursor.style.top = `${event.pageY - 25}px`;
});

// Kliknutí na buddyho
buddy.addEventListener("click", () => {
    // Změna obrázku buddyho
    buddy.src = "pictures/jindrich2.png";

    // Zatřesení buddyho
    shakeBuddy();

    // Přehraj zvuk
    hitSound.currentTime = 0;
    hitSound.play();

    // Otočení kladiva
    customCursor.style.transform = "rotate(90deg)";
    setTimeout(() => customCursor.style.transform = "rotate(0deg)", 200);
});
