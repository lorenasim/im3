// -> getAll.php (alles laden)
async function getAll_energy() {
    const url = 'https://im3.lorenasimonelli.ch/backend/api/getAll_energy.php';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}
const all = await getAll_energy();
console.log('all', all);

// -> getToday.php (gefiltert laden)
async function getToday_energy() {
    const url = 'https://im3.lorenasimonelli.ch/backend/api/getToday_energy.php';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}
const today = await getToday_energy();
console.log('today', today);

// -> getByDate.php (GET-parameter mitgeben)
async function getByDate_energy(date) {
    const url = `https://im3.lorenasimonelli.ch/backend/api/getByDate_energy.php?date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}

const date_picker = document.querySelector('#datepicker');
date_picker.addEventListener('input', async function() {
    const date = date_picker.value;
    const byDate = await getByDate(date);
    console.log('byDate', byDate);
})

// -> getLatest.php (einzelner Eintrag laden)
async function getLatest_energy() {
    const url = 'https://im3.lorenasimonelli.ch/backend/api/getLatest_energy.php';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}
const latest = await getLatest_energy();
console.log('latest', latest);