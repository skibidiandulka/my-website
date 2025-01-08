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

// Počítadlo kliknutí
let clickCount = 0;
const counterDisplay = document.createElement("div");
counterDisplay.id = "counter";
counterDisplay.style.position = "absolute";
counterDisplay.style.top = "10px";
counterDisplay.style.left = "10px";
counterDisplay.style.fontSize = "24px";
counterDisplay.style.fontFamily = "Arial, sans-serif";
counterDisplay.style.color = "black";
counterDisplay.textContent = `Kliknutí: ${clickCount}`;
document.body.appendChild(counterDisplay);

// Funkce pro intenzivní třesení
function intenseShakeBuddy() {
    let shakeCount = 10; // Počet třesení
    const interval = setInterval(() => {
        const randomX = (Math.random() - 0.5) * 40; // Větší pohyb X
        const randomY = (Math.random() - 0.5) * 40; // Větší pohyb Y
        buddy.style.transform = `translate(${randomX}px, ${randomY}px)`;
        shakeCount--;
        if (shakeCount <= 0) {
            clearInterval(interval); // Zastaví třesení
            buddy.style.transform = "translate(0, 0)";
        }
    }, 50); // Rychlejší třesení
}

// Aktualizace pozice kladiva
document.addEventListener("mousemove", (event) => {
    customCursor.style.left = `${event.pageX - 25}px`;
    customCursor.style.top = `${event.pageY - 25}px`;
});

// Kliknutí na buddyho
buddy.addEventListener("click", () => {
    // Zvýšení počítadla kliknutí
    clickCount++;
    counterDisplay.textContent = `Kliknutí: ${clickCount}`;

    // Změna obrázku buddyho na jindrich2
    buddy.src = "pictures/jindrich2.png";

    // Intenzivní třesení buddyho
    intenseShakeBuddy();

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
    }, Math.random() * 1000 + 1000); // Náhodný čas mezi 1 a 2 sekundami
});

