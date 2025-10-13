async function getAll_energy() {

const url = 'https://im3.lorenasimonelli.ch/backend/api/getAll_energy.php';
try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // gibt die Daten der API in der Konsole aus
} catch (error) {
    console.error(error)
}

}

getAll_energy();

const datepicker = document.querySelector('#datepicker');

