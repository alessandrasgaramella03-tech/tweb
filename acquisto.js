// ACQUISTO.JS - CineXpress
// Gestisce acquisto film/serie nella SPA

console.log("acquisto.js caricato");


// =====================================
// CLICK SU BOTTONE ACQUISTA
// =====================================

// intercetta click dinamicamente
document.addEventListener("click", function (e) {

    // controlla se è stato cliccato il bottone acquista
    if (e.target && e.target.classList.contains("buy-btn")) {

        e.preventDefault();

        // recupera id del film dal data-id
        const filmId = e.target.dataset.id;

        console.log("Film da acquistare:", filmId);

        // richiama funzione acquisto
        buyContent(filmId);

    }

});


// =====================================
// FUNZIONE ACQUISTO
// =====================================

function buyContent(filmId) {

    // controllo sicurezza
    if (!filmId) {

        alert("Film non valido");
        return;

    }

    // richiesta API al backend
    fetch(API_URL + "purchase.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        // dati inviati al backend
        body: JSON.stringify({

            film_id: filmId

        })

    })

    .then(response => response.json())

    .then(data => {

        console.log(data);

        // messaggio backend
        alert(data.message);

        // se acquisto completato
        if (data.message === "Acquisto completato") {

            // seleziona bottone acquistato
            const btn = document.querySelector(
                `.buy-btn[data-id="${filmId}"]`
            );

            // modifica grafica bottone
            if (btn) {

                btn.innerHTML = `
                    <i class="bi bi-check-circle-fill"></i>
                    Acquistato
                `;

                // disabilita bottone
                btn.disabled = true;

                // cambia colore
                btn.classList.remove("btn-success");
                btn.classList.add("btn-secondary");

            }

        }

    })

    .catch(error => {

        console.error(error);

        alert("Errore durante acquisto");

    });

}