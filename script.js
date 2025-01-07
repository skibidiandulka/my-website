// HTML prvky
const buddy = document.getElementById("buddy");
const gameContainer = document.getElementById("game-container");
const hitSound = document.getElementById("hit-sound");
const hitSound2 = new Audio('pictures/zvuk2.mp3'); // Nový zvuk

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
    // Změna obrázku buddyho na jindrich2
    buddy.src = "pictures/jindrich2.png";

    // Zatřesení buddyho
    shakeBuddy();

    // Přehraj zvuk1
    hitSound.currentTime = 0;
    hitSound.play();

    // Otočení kladiva
    customCursor.style.transform = "rotate(90deg)";
    setTimeout(() => customCursor.style.transform = "rotate(0deg)", 200);

    // Přehraj druhý zvuk
    hitSound2.currentTime = 0;
    hitSound2.play();

    // Vrácení obrázku po 1-2 sekundách
    setTimeout(() => {
        buddy.src = "pictures/jindrich.png"; // Vrať původní obrázek
    }, Math.random() * 500 + 1); // Náhodný čas mezi 1 a 2 sekundami
});
