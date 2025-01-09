// HTML prvky
const buddy = document.getElementById("buddy");
const gameContainer = document.getElementById("game-container");
const hitSound = document.getElementById("hit-sound");
const hitSound2 = new Audio("pictures/zvuk2.mp3"); // Zvuk při každém kliknutí

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

// Rychlost pohybu buddyho
let speed = 1; // Základní rychlost
let moveInterval;

// Funkce pro pohyb buddyho směrem od kurzoru
function moveBuddyAwayFromCursor(event) {
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    // Spuštění intervalového pohybu
    clearInterval(moveInterval);
    moveInterval = setInterval(() => {
        const buddyRect = buddy.getBoundingClientRect();
        const buddyX = buddyRect.left + buddyRect.width / 2;
        const buddyY = buddyRect.top + buddyRect.height / 2;

        // Vzdálenost a směr pohybu
        const deltaX = buddyX - cursorX;
        const deltaY = buddyY - cursorY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > 50) {
            // Pohyb směrem od kurzoru
            const moveX = (deltaX / distance) * speed;
            const moveY = (deltaY / distance) * speed;
            buddy.style.left = `${buddy.offsetLeft + moveX}px`;
            buddy.style.top = `${buddy.offsetTop + moveY}px`;
        } else {
            clearInterval(moveInterval); // Zastaví pohyb, pokud je dostatečně daleko
        }
    }, 20); // Interval aktualizace pohybu
}

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

    // Přehraj vždy zvuk2
    hitSound2.currentTime = 0;
    hitSound2.play();

    // Přehraj aktuální zvuk zbraně
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

    // Zvýšení rychlosti
    speed += 0.2; // Zrychlení při každém kliknutí

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

// Poslech kurzoru pro pohyb buddyho
gameContainer.addEventListener("mousemove", moveBuddyAwayFromCursor);

// Inicializace buddyho
buddy.style.position = "absolute";
buddy.style.left = "50%";
buddy.style.top = "50%";
