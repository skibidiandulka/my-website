// HTML prvky
const buddy = document.getElementById("buddy");
const gameContainer = document.getElementById("game-container");
const hitSound = document.getElementById("hit-sound");
const hitSound2 = new Audio('pictures/zvuk2.mp3'); // Nový zvuk

// Počítadlo kliknutí
let clickCount = 0;

// Zbraně a jejich vlastnosti
const weapons = [
    { name: "Kladivo", img: "pictures/kladivo.png", sound: "pictures/zvuk.mp3", unlockAt: 0 },
    { name: "Lopata", img: "pictures/lopata.png", sound: "pictures/zvuk3.mp3", unlockAt: 100 },
    { name: "Kovová tyč", img: "pictures/kovovatyc.png", sound: "pictures/zvuk4.mp3", unlockAt: 500 },
    { name: "Klíč", img: "pictures/wrench.png", sound: "pictures/zvuk5.mp3", unlockAt: 1000 },
];

// Aktuální zbraň
let currentWeaponIndex = 0;

// Zobrazení aktuální zbraně
const weaponDisplay = document.createElement("div");
weaponDisplay.id = "weapon-display";
weaponDisplay.style.position = "absolute";
weaponDisplay.style.top = "50px";
weaponDisplay.style.left = "10px";
weaponDisplay.style.fontSize = "20px";
weaponDisplay.style.fontFamily = "Arial, sans-serif";
weaponDisplay.style.color = "black";
weaponDisplay.textContent = `Zbraň: ${weapons[currentWeaponIndex].name}`;
document.body.appendChild(weaponDisplay);

// Přidání vlastního kurzoru
const customCursor = document.createElement("img");
customCursor.src = weapons[currentWeaponIndex].img;
customCursor.id = "custom-cursor";
document.body.appendChild(customCursor);

// Aktualizace pozice kurzoru
document.addEventListener("mousemove", (event) => {
    customCursor.style.left = `${event.pageX - 25}px`;
    customCursor.style.top = `${event.pageY - 25}px`;
});

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

// Kliknutí na buddyho
buddy.addEventListener("click", () => {
    // Zvýšení počítadla kliknutí
    clickCount++;
    document.getElementById("counter").textContent = `Kliknutí: ${clickCount}`;

    // Změna obrázku buddyho na jindrich2
    buddy.src = "pictures/jindrich2.png";

    // Intenzivní třesení buddyho
    intenseShakeBuddy();

    // Přehraj aktuální zvuk
    const currentWeaponSound = new Audio(weapons[currentWeaponIndex].sound);
    currentWeaponSound.currentTime = 0;
    currentWeaponSound.play();

    // Otočení zbraně
    customCursor.style.transform = "rotate(90deg)";
    setTimeout(() => customCursor.style.transform = "rotate(0deg)", 200);

    // Vrácení obrázku po 1-2 sekundách
    setTimeout(() => {
        buddy.src = "pictures/jindrich.png"; // Vrať původní obrázek
    }, Math.random() * 1000 + 1000);

    // Kontrola, zda má být odemknuta nová zbraň
    const nextWeaponIndex = currentWeaponIndex + 1;
    if (nextWeaponIndex < weapons.length && clickCount >= weapons[nextWeaponIndex].unlockAt) {
        currentWeaponIndex = nextWeaponIndex;
        weaponDisplay.textContent = `Zbraň: ${weapons[currentWeaponIndex].name}`;
        customCursor.src = weapons[currentWeaponIndex].img;
    }
});

// Počítadlo kliknutí
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
