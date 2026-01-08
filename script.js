let songStats = []; 

const datePicker = document.querySelector('#datepicker');
const senderRadios = document.querySelectorAll('input[name="sender"]');
const tooltip = document.querySelector('#tooltip');
const allBubbles = document.querySelectorAll('.bubble, .bubble2');

let currentSender = 'both'; 
let currentDate = null;

async function getByDate(date, sender) {
    const url = `https://im3.lorenasimonelli.ch/backend/api/getByDate.php?date=${date}&sender=${sender}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        songStats = Array.isArray(data) ? data : []; 
        return data;
    } catch (error) {
        console.error('Fehler bei getByDate:', error);
        songStats = [];
    }
}

allBubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', (e) => {
        const songToFind = e.target.getAttribute('data-song').toLowerCase();
        const isEnergyBubble = e.target.classList.contains('bubble2');
        const targetSender = isEnergyBubble ? "energy" : "srf";
        const stationLabel = isEnergyBubble ? "NRJ" : "SRF 1";

        const count = songStats.filter(s => {
            const titleMatches = s.title && s.title.toLowerCase().includes(songToFind);
            const senderMatches = s.sender === targetSender;
            return titleMatches && senderMatches;
        }).length;

        // Tooltip befüllen mit Klasse für CSS-Styling
        tooltip.innerHTML = `
            <b class="song-title">«${e.target.getAttribute('data-song')}»</b>
            <span>wurde ${count}x auf<br>${stationLabel} gespielt.</span>
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

updateBubbles(currentSender);