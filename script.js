// --- ALLES IN EINEM MODULE --- //
let songStats = []; 

const datePicker = document.querySelector('#datepicker');
const senderRadios = document.querySelectorAll('input[name="sender"]');
const tooltip = document.querySelector('#tooltip');
const allBubbles = document.querySelectorAll('.bubble, .bubble2');

let currentSender = 'both'; 
let currentDate = null;

// Daten von API laden
async function getByDate(date, sender) {
    const url = `https://im3.lorenasimonelli.ch/backend/api/getByDate.php?date=${date}&sender=${sender}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        songStats = Array.isArray(data) ? data : []; 
        console.log('Daten geladen für:', date, sender, songStats);
        return data;
    } catch (error) {
        console.error('Fehler bei getByDate:', error);
        songStats = [];
    }
}

// Tooltip Interaktion
allBubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', (e) => {
        const songToFind = e.target.getAttribute('data-song').toLowerCase();
        
        // Identifiziere den Sender basierend auf der Kugel-Klasse
        // .bubble2 = Energy (rot), .bubble = SRF (weiß)
        const isEnergyBubble = e.target.classList.contains('bubble2');
        const targetSender = isEnergyBubble ? "energy" : "srf";
        const stationLabel = isEnergyBubble ? "NRJ" : "SRF 1";

        // Filtert die songStats nach Titel UND dem Sender der Kugel
        const count = songStats.filter(s => {
            const titleMatches = s.title && s.title.toLowerCase().includes(songToFind);
            const senderMatches = s.sender === targetSender;
            return titleMatches && senderMatches;
        }).length;

        // Tooltip befüllen (Design bleibt exakt wie in deinem Screenshot)
        tooltip.innerHTML = `
            <b style="color: #bc1111; font-style: italic; display: block;">«${e.target.getAttribute('data-song')}»</b>
            <span style="color: #bc1111;">wurde ${count}x auf<br>${stationLabel} gespielt.</span>
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

// Sender-Filter (Anzeige der Kugeln)
function updateBubbles(sender) {
    const bubbleWhite = document.querySelectorAll('.bubble');
    const bubbleRed   = document.querySelectorAll('.bubble2');

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

// EventListener
datePicker.addEventListener('input', async function() {
    currentDate = datePicker.value;
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

// Initialisierung
updateBubbles(currentSender);