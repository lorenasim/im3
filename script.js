// --- ALLES IN EINEM MODULE (type="module") --- //
let songStats = []; 
const tooltip = document.querySelector('#tooltip');
const datePicker = document.querySelector('#datepicker');
const senderRadios = document.querySelectorAll('input[name="sender"]');
const allBubbles = document.querySelectorAll('.bubble, .bubble2');

let currentSender = 'both'; 
let currentDate = null;

// API Aufruf mit Fehlerprüfung
async function getByDate(date, sender) {
    const url = `https://im3.lorenasimonelli.ch/backend/api/getByDate.php?date=${date}&sender=${sender}`;
    console.log("Rufe API auf:", url);
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Sicherstellen, dass data ein Array ist
        songStats = Array.isArray(data) ? data : [];
        console.log("API Daten empfangen:", songStats);
        
        return songStats;
    } catch (error) {
        console.error('API Fehler:', error);
        songStats = [];
    }
}

// Tooltip Interaktion
allBubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', (e) => {
        // Wir nehmen den data-song Wert und trimmen ihn zur Sicherheit
        const songTitleAttr = e.target.getAttribute('data-song').toLowerCase().trim();
        const isEnergy = e.target.classList.contains('bubble2');
        const displaySender = isEnergy ? "NRJ" : "SRF 1";

        // Filter-Logik: Wir prüfen, ob der Titel aus der DB den Titel aus dem HTML enthält
        const count = songStats.filter(s => {
            const dbTitle = s.title ? s.title.toLowerCase().trim() : "";
            // Wir prüfen auf Teil-Übereinstimmung (Fuzzy Match), falls ! oder Leerschläge variieren
            return dbTitle.includes(songTitleAttr) || songTitleAttr.includes(dbTitle);
        }).length;

        tooltip.innerHTML = `
            <b>«${e.target.getAttribute('data-song')}»</b>
            <span>wurde ${count}x auf<br>${displaySender} gespielt.</span>
        `;
        tooltip.style.opacity = '1';
    });

    bubble.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.pageX + 15) + 'px';
        tooltip.style.top = (e.pageY - 15) + 'px';
    });

    bubble.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
});

// Bubble Filterung
function updateBubbles(sender) {
    const bubbleWhite = document.querySelectorAll('.bubble');
    const bubbleRed   = document.querySelectorAll('.bubble2');

    bubbleWhite.forEach(b => b.style.display = (sender === 'both' || sender === 'srf') ? 'block' : 'none');
    bubbleRed.forEach(b => b.style.display = (sender === 'both' || sender === 'energy') ? 'block' : 'none');
}

// Event Listeners
datePicker.addEventListener('input', async function() {
    currentDate = datePicker.value; // Format: YYYY-MM-DD
    await getByDate(currentDate, currentSender);
});

senderRadios.forEach(radio => {
    radio.addEventListener('change', async function(e) {
        currentSender = e.target.value;
        updateBubbles(currentSender);
        if (currentDate) {
            await getByDate(currentDate, currentSender);
        }
    });
});

// Initialer Aufruf
updateBubbles(currentSender);