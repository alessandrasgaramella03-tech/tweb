console.log("NOVITA JS CARICATO");

document.addEventListener("click", function(e){

    const btn = e.target.closest("#novitaLink");

    if(btn){

        e.preventDefault();

        showNovita();

    }

});

function showNovita(){

    apiRequest("novita.php", function(data){

        console.log(data);

        let films = data.contents.filter(
            p => p.tipo === "Film"
        );

        let series = data.contents.filter(
            p => p.tipo === "Serie Tv"
        );

        let html = `

        <div class="container py-5 text-center text-white">

            <h1 class="novita-title">
                Novità su CineXpress
            </h1>

            <h3 class="mb-4">Film</h3>

            <div class="d-flex justify-content-center gap-4 mb-5 flex-wrap">
        `;

        films.forEach(product => {

            html += `

            <div>

                <img
                    src="/cienxpress/app_client_bootstrap/img/${product.immagine}"

                    class="img-fluid rounded shadow movie-poster read-one-product-button"

                    data-id="${product.id}"
                >

            </div>

            `;

        });

        html += `

            </div>

            <h3 class="mb-4">
                Serie Tv
            </h3>

            <div class="d-flex justify-content-center gap-4 mb-5 flex-wrap">

        `;

        series.forEach(product => {

            html += `

            <div>

                <img
                    src="/cienxpress/app_client_bootstrap/img/${product.immagine}"

                    class="img-fluid rounded shadow movie-poster read-one-product-button"

                    data-id="${product.id}"
                >

            </div>

            `;

        });

        html += `
            </div>
            </div>
            `;

        document.getElementById("home-content").style.display = "none";

        document.getElementById("page-content").innerHTML = html;

    });

}