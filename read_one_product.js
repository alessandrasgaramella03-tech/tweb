document.addEventListener("click", e => {

    const btn = e.target.closest(".read-one-product-button");

    if (btn) {

        e.preventDefault();

        const id = btn.dataset.id;

        apiRequest("read0ne.php?id_film=" + id, function(data) {

            let html = `
            <div class="container product-page">

                <button id="backButton" class="btn btn-secondary mb-5">
                    <i class="bi bi-arrow-left"></i> Torna indietro
                </button>

                <div class="row product-row">

                    <div class="col-md-4">
                        <img 
                            src="/cienxpress/app_client_bootstrap/img/${data.immagine}" 
                            class="product-image">
                    </div>

                    <div class="col-md-8 product-details">

                        <h2 class="product-title">${data.titolo}</h2>

                        <div class="product-info">
                            <div><strong>Tipo:</strong> ${data.tipo}</div>
                            <div><strong>Prezzo:</strong> €${data.prezzo}</div>
                            <div><strong>Genere:</strong> ${data.genere}</div>
                        </div>

                        <div class="buy-wrapper">
                            <button class="btn btn-success btn-lg buy-btn">
                                Acquista
                            </button>
                        </div>

                    </div>

                </div>

            </div>
            `;

            document.getElementById("home-content").style.display = "none";
            document.getElementById("page-content").innerHTML = html;

            document.getElementById("backButton").addEventListener("click", () => {
                document.getElementById("home-content").style.display = "block";
                document.getElementById("page-content").innerHTML = "";
            });

        });
    }
});