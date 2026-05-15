// UPDATE_PRODUCTS.JS - CineXpress
// Gestisce aggiornamento contenuti (solo admin)
// SPA: tutto dinamico senza cambio pagina

console.log("update_products.js caricato");

// attende caricamento pagina
document.addEventListener("DOMContentLoaded", function () {

    // listener sul link "Modifica" del menu admin
    document.addEventListener("click", function (e) {

        // controllo click sul link modifica
        if (e.target && e.target.id === "updateProductLink") {

            e.preventDefault();

            showUpdateProducts();

        }

    });

});

// ===============================
// MOSTRA LISTA PRODOTTI
// ===============================
function showUpdateProducts() {

    // chiamata API read.php
    apiRequest("read.php", function (data) {

        let html = `

        <div class="container mt-5 text-white">

            <h2 class="mb-5 text-center">
                Modifica contenuti
            </h2>

            <div class="row g-4">
        `;

        // ciclo prodotti
        data.contents.forEach(product => {

            html += `

            <div class="col-md-3">

                <div class="card bg-dark text-white h-100 shadow">

                    <img 
                        src="/cienxpress/app_client_bootstrap/img/${product.immagine}"
                        class="card-img-top"
                        style="height:350px; object-fit:cover;"
                    >

                    <div class="card-body text-center">

                        <h5 class="card-title">
                            ${product.titolo}
                        </h5>

                        <button
                            class="btn btn-warning mt-3 edit-product-btn"
                            data-id="${product.id_film}"
                            data-titolo="${product.titolo}"
                            data-genere="${product.genere}"
                            data-anno="${product.anno}"
                            data-tipo="${product.tipo}"
                            data-prezzo="${product.prezzo}"
                            data-immagine="${product.immagine}"
                        >
                            Modifica
                        </button>

                    </div>

                </div>

            </div>
            `;

        });

        html += `
            </div>
        </div>
        `;

        // nasconde home
        document.getElementById("home-content").style.display = "none";

        // mostra pagina update
        document.getElementById("page-content").innerHTML = html;

    });

}

// ===============================
// CLICK SU MODIFICA
// ===============================
document.addEventListener("click", function (e) {

    const btn = e.target.closest(".edit-product-btn");

    if (btn) {

        e.preventDefault();

        // recupera dati prodotto
        const product = {

            id_film: btn.dataset.id,
            titolo: btn.dataset.titolo,
            genere: btn.dataset.genere,
            anno: btn.dataset.anno,
            tipo: btn.dataset.tipo,
            prezzo: btn.dataset.prezzo,
            immagine: btn.dataset.immagine

        };

        showUpdateForm(product);

    }

});

// ===============================
// FORM MODIFICA
// ===============================
function showUpdateForm(product) {

    let html = `

    <div class="container mt-5 text-white">

        <h2 class="mb-5 text-center">
            Modifica contenuto
        </h2>

        <form id="updateForm" class="w-50 mx-auto">

            <input
                type="hidden"
                id="id_film"
                value="${product.id_film}"
            >

            <div class="mb-3">

                <label class="form-label">
                    Titolo
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="titolo"
                    value="${product.titolo}"
                    required
                >

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Genere
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="genere"
                    value="${product.genere}"
                    required
                >

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Anno
                </label>

                <input
                    type="number"
                    class="form-control"
                    id="anno"
                    value="${product.anno}"
                    required
                >

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Tipo
                </label>

                <select
                    class="form-select"
                    id="tipo"
                    required
                >

                    <option value="film"
                        ${product.tipo === "film" ? "selected" : ""}
                    >
                        Film
                    </option>

                    <option value="serie"
                        ${product.tipo === "serie" ? "selected" : ""}
                    >
                        Serie TV
                    </option>

                </select>

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Prezzo
                </label>

                <input
                    type="number"
                    step="0.01"
                    class="form-control"
                    id="prezzo"
                    value="${product.prezzo}"
                    required
                >

            </div>

            <div class="mb-4">

                <label class="form-label">
                    Nome immagine
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="immagine"
                    value="${product.immagine}"
                    required
                >

            </div>

            <button
                type="submit"
                class="btn btn-warning w-100"
            >
                Salva modifiche
            </button>

        </form>

    </div>
    `;

    // mostra form
    document.getElementById("page-content").innerHTML = html;

    // listener submit
    document
        .getElementById("updateForm")
        .addEventListener("submit", updateProduct);

}

// ===============================
// UPDATE PRODOTTO
// ===============================
function updateProduct(e) {

    e.preventDefault();

    // creo oggetto prodotto
    const product = {

        id_film: document.getElementById("id_film").value,
        titolo: document.getElementById("titolo").value,
        genere: document.getElementById("genere").value,
        anno: document.getElementById("anno").value,
        tipo: document.getElementById("tipo").value,
        prezzo: document.getElementById("prezzo").value,
        immagine: document.getElementById("immagine").value

    };

    // chiamata API update
    fetch(API_URL + "update.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        // se aggiornamento riuscito
        if (data.message === "Prodotto aggiornato") {

            // svuota contenuto secondario
            document.getElementById("page-content").innerHTML = "";

            // mostra home
            document.getElementById("home-content").style.display = "block";

            // ricarica caroselli
            location.reload();

        }

    })

    .catch(error => {

        console.error(error);

        alert("Errore aggiornamento prodotto");

    });

}