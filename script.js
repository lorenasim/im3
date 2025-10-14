// --- ALLES IN EINEM MODULE (type="module" in HTML!) --- //

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

// --- Variablen & DOM-Elemente --- //
const datePicker = document.querySelector('#datepicker');
const senderRadios = document.querySelectorAll('input[name="sender"]');

let currentSender = 'both'; // Standardwert
let currentDate = null;

// --- Initiale Daten laden (optional) --- //
(async () => {
    const all = await getAll();
    console.log('Alle Daten beim Laden:', all);
    // TODO: hier ggf. erste Bubbles anzeigen
})();

// --- EventListener: Datumsauswahl --- //
datePicker.addEventListener('input', async function() {
    currentDate = datePicker.value;
    console.log('Datum geändert auf:', currentDate);

    const data = await getByDate(currentDate, currentSender);
    console.log('API-Aufruf bei Datumsauswahl:', { date: currentDate, sender: currentSender, data });

    // TODO: hier später: Funktion zum Aktualisieren der Bubbles aufrufen
});

// --- EventListener: Senderwechsel --- //
senderRadios.forEach(radio => {
    radio.addEventListener('change', async function(e) {
        currentSender = e.target.value;
        console.log('Sender geändert auf:', currentSender);

        if (currentDate) {
            const data = await getByDate(currentDate, currentSender);
            console.log('API-Aufruf bei Senderwechsel:', { date: currentDate, sender: currentSender, data });

            // TODO: hier später: Bubbles aktualisieren
        } else {
            // Wenn noch kein Datum gewählt ist → optional: alles laden
            const data = await getAll();
            console.log('API-Aufruf ohne Datum (alle Daten):', data);
        }
    });
});
