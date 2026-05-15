// DELETE_PRODUCTS.JS - CineXpress
// Gestisce eliminazione prodotti lato admin

console.log("delete_products.js caricato");

// CLICK SU "ELIMINA" DAL MENU ADMIN

// intercetta click dinamicamente
document.addEventListener("click", function (e) {

    // controlla click sul link elimina admin
    if (e.target && e.target.id === "deleteProductLink") {

        e.preventDefault();

        // mostra schermata eliminazione
        showDeleteProducts();
    }
});

// MOSTRA LISTA PRODOTTI ELIMINABILI

function showDeleteProducts() {

    // richiesta API per leggere catalogo
    apiRequest("read.php", function (data) {

        let html = `

        <div class="container mt-5 text-white">

            <h2 class="mb-5 text-center">
                Elimina contenuti
            </h2>

            <div class="row g-4">

        `;

        // ciclo prodotti
        data.contents.forEach(product => {

            html += `

            <div class="col-md-3">

                <div class="card bg-dark text-white h-100">

                    <img 
                        src="/cienxpress/app_client_bootstrap/img/${product.immagine}"
                        class="card-img-top"
                        style="height:350px; object-fit:cover;"
                    >

                    <div class="card-body text-center">

                        <h5 class="card-title">
                            ${product.titolo}
                        </h5>

                        <p>
                            ${product.tipo}
                        </p>

                        <button
                            class="btn btn-danger delete-btn"
                            data-id="${product.id_film}"
                        >
                            Elimina
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

        // mostra pagina eliminazione
        document.getElementById("page-content").innerHTML = html;
    });
}

// CLICK SU BOTTONE ELIMINA

document.addEventListener("click", function (e) {

    // controlla click bottone elimina
    if (e.target && e.target.classList.contains("delete-btn")) {

        e.preventDefault();

        // recupera id prodotto
        const id = e.target.dataset.id;

        // conferma sicurezza
        const confirmDelete = confirm(
            "Vuoi davvero eliminare questo contenuto?"
        );

        // se annulla esce
        if (!confirmDelete) {
            return;
        }

        // richiesta eliminazione backend
        fetch(API_URL + "delete.php?id_film=" + id, {

            method: "DELETE"
        })

        .then(response => response.json())

        .then(data => {

            console.log(data);

            alert(data.message);

            // aggiorna lista dopo eliminazione
            showDeleteProducts();
        })

        .catch(error => {

            console.error(error);

            alert("Errore eliminazione");
        });
    }
});