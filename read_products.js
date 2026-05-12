/* Quando tutta la pagina HTML è stata caricata
 (DOM pronto), viene chiamata la funzione loadProducts -> Il rendering è dinamico: il PHP non genera HTML, 
 ma restituisce JSON. Il frontend JavaScript costruisce l’interfaccia. */
document.addEventListener("DOMContentLoaded", loadProducts);

    // Chiamata API generica definita in app.js
    // Richiede i dati dal backend (read.php)
function loadProducts() {
    apiRequest("read.php", function(data) {

        const products = data.contents; //i prodotti arrivano in contents (JSON)
        
        //creazione del carosello 
        createCarousel(products, "film", "movieCarousel");
        createCarousel(products, "serie", "serieCarousel");

    });
}

/*fetch("http://localhost/CineXpress/api_server/api/read.php")
    .then(response => response.json())
    .then(data => {
        createCarousel(data.contents, "film", "movieCarousel");
        createCarousel(data.contents, "serie", "serieCarousel");
    }); altrimenti si potrebbe anche usare questo che è uguale a ciò che ha scritto anselma nelle slide, 
    apirequest invece è più semplificato, ma fa la stessa cosa

/* Funzione che crea il carosello */
function createCarousel(products, tipo, carouselId) {
    
    // Seleziona il contenitore interno del carosello (dove verranno inserite le slide)
    const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
    // Filtra i prodotti: prende solo quelli del tipo richiesto (film o serie)
    const filtered = products.filter(p => p.tipo === tipo);
    // Numero di elementi per ogni slide del carosello
    const itemsPerSlide = 5;

    // Ciclo for che scorre i prodotti a gruppi di 5
    for (let i = 0; i < filtered.length; i += itemsPerSlide) {

        const slide = document.createElement("div");
        slide.classList.add("carousel-item");

        if (i === 0) slide.classList.add("active");

        const row = document.createElement("div");
        row.classList.add("d-flex", "justify-content-center", "gap-4");

        const group = filtered.slice(i, i + itemsPerSlide);

        group.forEach(product => {

            console.log(product);

            const div = document.createElement("div");
            div.classList.add("movie-poster");

            div.classList.add(
                "movie-poster",
                "read-one-product-button"
                );

                div.dataset.id = product.id;
            
            div.innerHTML = `
                <img src="/cienxpress/app_client_bootstrap/img/${product.immagine}">
            `;

            row.appendChild(div);
        });

        slide.appendChild(row);
        carouselInner.appendChild(slide);
    }
}