// File di configurazione base dell'app: Il frontend chiama le API tramite fetch, riceve dati JSON e li inserisce dinamicamente nel DOM.
// URL base del backend (tutte le API stanno qui)
const API_URL = "/cienxpress/api_server/api/";
// FUNZIONE GENERICA PER CHIAMATE API
/* Questa funzione serve per NON riscrivere sempre fetch.
endpoint = es: "read.php"
callback = funzione che usa i dati ricevuti  */
function apiRequest(endpoint, callback) {

    fetch(API_URL + endpoint)   // chiama il backend
        .then(response => response.json())  // converte in JSON
        .then(data => {
            callback(data); // passa i dati alla funzione che li usa
        })
        .catch(error => {
            console.error("Errore API:", error);
        });
}