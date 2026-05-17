// Permette all'admin di inserire nuovi contenuti
console.log("create_products caricato")
// attende caricamento pagina
document.addEventListener("DOMContentLoaded", function () {

    // listener dinamico sul bottone Aggiungi
    document.addEventListener("click", function (e) {

        if (e.target.id === "createProductLink") {

            e.preventDefault();

            showCreateForm();

        }

    });

});

// MOSTRA FORM INSERIMENTO
function showCreateForm() {

    let html = `
    <div class="container mt-5 product-page">

        <button id="backButton"
                class="btn btn-secondary mb-4">

            <i class="bi bi-arrow-left"></i>
            Torna indietro

        </button>

        <h2 class="product-title mb-4">
            Inserisci nuovo contenuto
        </h2>


        <form id="createForm">

            <!-- titolo -->
            <div class="mb-3">
                <label class="text-white">Titolo</label>

                <input type="text"
                       id="titolo"
                       class="form-control"
                       required>
            </div>


            <!-- genere -->
            <div class="mb-3">
                <label class="text-white">Genere</label>

                <input type="text"
                       id="genere"
                       class="form-control"
                       required>
            </div>


            <!-- anno -->
            <div class="mb-3">
                <label class="text-white">Anno</label>

                <input type="number"
                       id="anno"
                       class="form-control"
                       required>
            </div>


            <!-- tipo -->
            <div class="mb-3">
                <label class="text-white">Tipo</label>

                <select id="tipo"
                        class="form-control">

                    <option value="Film">Film</option>
                    <option value="Serie Tv">Serie TV</option>

                </select>
            </div>


            <!-- prezzo -->
            <div class="mb-3">
                <label class="text-white">Prezzo</label>

                <input type="number"
                       step="0.01"
                       id="prezzo"
                       class="form-control"
                       required>
            </div>


            <!-- immagine -->
            <div class="mb-4">
                <label class="text-white">Nome immagine</label>

                <input type="text"
                       id="immagine"
                       class="form-control"
                       placeholder="matrix.jpg"
                       required>
            </div>


            <button type="submit"
                    class="btn btn-success">

                Salva contenuto

            </button>

        </form>

    </div>
    `;


    // nasconde home
    document.getElementById("home-content").style.display = "none";

    // mostra form
    document.getElementById("page-content").innerHTML = html;



    // bottone indietro
    document.getElementById("backButton")
        .addEventListener("click", function () {

            document.getElementById("page-content").innerHTML = "";
            document.getElementById("home-content").style.display = "block";

        });

    // submit form
    document.getElementById("createForm")
        .addEventListener("submit", createContent);

}

// INVIA DATI A create.php
function createContent(e) {

    e.preventDefault();

    // crea oggetto dati
    const content = {

        titolo: document.getElementById("titolo").value,
        genere: document.getElementById("genere").value,
        anno: document.getElementById("anno").value,
        tipo: document.getElementById("tipo").value,
        prezzo: document.getElementById("prezzo").value,
        immagine: document.getElementById("immagine").value

    };

    fetch(API_URL + "create.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(content)

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        // torna home
        document.getElementById("page-content").innerHTML = "";
        document.getElementById("home-content").style.display = "block";

        // ricarica caroselli
        location.reload();

        showCreateContent();

    })

    .catch(error => {

        console.error(error);
        alert("Errore inserimento");

    });

}