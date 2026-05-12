console.log("search_products caricato");

document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("searchBtn");
    const input = document.getElementById("searchInput");

    // click lente
    btn.addEventListener("click", function () {
        searchProducts();
    });

    // tasto Enter
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            searchProducts();
        }
    });

});


function searchProducts() {

    const text = document
        .getElementById("searchInput")
        .value
        .trim();

    console.log("ricerca:", text);

    if (text === "") {
        alert("Inserisci un titolo");
        return;
    }

    apiRequest(
        "search.php?s=" + encodeURIComponent(text),

        function (data) {

            console.log(data);

            let html = `
                <div class="container mt-5">

                    <button id="backHomeBtn"
                            class="btn btn-secondary mb-4">
                        Torna alla home
                    </button>

                    <div class="row g-4">
            `;

            if (data.contents.length === 0) {

                html += `
                    <div class="text-white">
                        Nessun risultato trovato
                    </div>
                `;

            } else {

                data.contents.forEach(product => {

                    html += `
                    <div class="col-md-3 text-center">

                        <div class="movie-poster read-one-product-button"
                             data-id="${product.id_film}">

                            <img
                            src="/cienxpress/app_client_bootstrap/img/${product.immagine}"
                            class="img-fluid rounded">

                        </div>

                        <div class="text-white mt-2">
                            ${product.titolo}
                        </div>

                    </div>
                    `;
                });

            }

            html += `
                    </div>
                </div>
            `;

            document.getElementById("home-content").style.display = "none";
            document.getElementById("page-content").innerHTML = html;

            document.getElementById("backHomeBtn")
                .addEventListener("click", function () {

                    document.getElementById("page-content").innerHTML = "";
                    document.getElementById("home-content").style.display = "block";

                });

        }

    );

}