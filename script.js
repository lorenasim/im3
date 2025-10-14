// -> getAll.php (alles laden)
async function getAll() {
    const url = 'https://im3.lorenasimonelli.ch/backend/api/getAll.php';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}
const all = await getAll();
console.log('all', all);

// -> getByDate.php (GET-parameter mitgeben)
async function getByDate(date, sender) {
    const url = `https://im3.lorenasimonelli.ch/backend/api/getByDate.php?date=${date}&sender=${sender}`;
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
    const byDate = await getByDate(date, 'both');
    console.log('byDate', byDate);
})