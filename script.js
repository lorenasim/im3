// --- ALLES IN EINEM MODULE (type="module") --- //

// -> getAll.php (alles laden)
async function getAll() {
    const url = 'https://im3.lorenasimonelli.ch/backend/api/getAll.php';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler bei getAll:', error);
    }
}

// -> getByDate.php (GET-Parameter mitgeben)
async function getByDate(date, sender) {
    const url = `https://im3.lorenasimonelli.ch/backend/api/getByDate.php?date=${date}&sender=${sender}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler bei getByDate:', error);
    }
}

// --- Variablen & DOM-Elemente ---
const datePicker = document.querySelector('#datepicker');
const senderRadios = document.querySelectorAll('input[name="sender"]');
let currentSender = 'both'; // Standardwert
let currentDate = null;

// --- Funktion: Bubbles nach Sender anzeigen/verstecken ---
function updateBubbles(sender) {
    const bubbleWhite = document.querySelectorAll('.bubble');   // weiße Bubbles (CSS)
    const bubbleRed   = document.querySelectorAll('.bubble2');  // rote Bubbles (CSS)

    if (sender === 'both') {
        bubbleWhite.forEach(b => b.style.display = 'block');
        bubbleRed.forEach(b => b.style.display = 'block');
    } else if (sender === 'srf') {
        bubbleWhite.forEach(b => b.style.display = 'block');
        bubbleRed.forEach(b => b.style.display = 'none');
    } else if (sender === 'energy') {
        bubbleWhite.forEach(b => b.style.display = 'none');
        bubbleRed.forEach(b => b.style.display = 'block');
    }
}

// --- Initiale Anzeige der Bubbles ---
updateBubbles(currentSender);

// --- EventListener: Datumsauswahl ---
datePicker.addEventListener('input', async function() {
    currentDate = datePicker.value;
    console.log('Datum geändert auf:', currentDate);

    const data = await getByDate(currentDate, currentSender);
    console.log('API-Aufruf bei Datumsauswahl:', { date: currentDate, sender: currentSender, data });

    // Optional: hier später Bubbles dynamisch anpassen
});

// --- EventListener: Senderwechsel ---
senderRadios.forEach(radio => {
    radio.addEventListener('change', async function(e) {
        currentSender = e.target.value;

        // Bubbles filtern
        updateBubbles(currentSender);

        if (currentDate) {
            const data = await getByDate(currentDate, currentSender);
            console.log('API-Aufruf bei Senderwechsel:', { date: currentDate, sender: currentSender, data });
        } else {
            const data = await getAll();
            console.log('API-Aufruf ohne Datum (alle Daten):', data);
        }
    });
});
