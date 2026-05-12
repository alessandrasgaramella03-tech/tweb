// LOGIN.JS - CineXpress
// Gestisce login utente/admin in modalità SPA

// attende caricamento pagina
document.addEventListener("DOMContentLoaded", function () {

    // cerca il link Login nella navbar
    const loginLink = document.getElementById("loginLink");

    // se esiste collega click
    if (loginLink) {

        loginLink.addEventListener("click", function (e) {

            e.preventDefault();

            showLoginForm();

        });

    }

});

// MOSTRA FORM LOGIN
function showLoginForm() {

    let html = `
    <div class="container mt-5 product-page">

        <button id="backButton"
                class="btn btn-secondary mb-4">

            <i class="bi bi-arrow-left"></i>
            Torna indietro

        </button>

        <h2 class="product-title mb-4">
            Accedi a CineXpress
        </h2>

        <form id="loginForm">

            <div class="mb-3">

                <label class="form-label text-white">
                    Email
                </label>

                <input type="email"
                       id="email"
                       class="form-control"
                       required>

            </div>


            <div class="mb-4">

                <label class="form-label text-white">
                    Password
                </label>

                <input type="password"
                       id="password"
                       class="form-control"
                       required>

            </div>


            <button type="submit"
                    class="btn btn-success">

                Login

            </button>

        </form>

    </div>
    `;

    // nasconde home
    document.getElementById("home-content").style.display = "none";

    // mostra form login
    document.getElementById("page-content").innerHTML = html;

    // bottone torna home
    document.getElementById("backButton")
        .addEventListener("click", function () {

            document.getElementById("page-content").innerHTML = "";
            document.getElementById("home-content").style.display = "block";

        });

    // submit login
    document.getElementById("loginForm")
        .addEventListener("submit", loginUser);

}

// LOGIN UTENTE
function loginUser(e) {

    e.preventDefault();


    // crea oggetto dati
    const user = {

        email: document.getElementById("email").value,
        password: document.getElementById("password").value

    };


    fetch(API_URL + "login.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);


        // login corretto
        if (data.message === "Login riuscito") {

            // svuota pagina secondaria
            document.getElementById("page-content").innerHTML = "";

            // mostra home
            document.getElementById("home-content").style.display = "block";


            // se admin mostra menu catalogo
            if (data.role === "admin") {
                showAdminMenu();
            }


            // cambia Login in Logout
            showLogout();

        }

    })

    .catch(error => {

        console.error(error);
        alert("Errore login");

    });

}

// MENU ADMIN
function showAdminMenu() {

    document.getElementById("adminMenu").innerHTML = `

    <li class="nav-item dropdown">

        <a class="nav-link my-link dropdown-toggle"
           href="#"
           data-bs-toggle="dropdown">

           Catalogo Admin

        </a>

        <ul class="dropdown-menu my-dropdown">

            <li>
                <a class="dropdown-item"
                   href="#"
                   id="createProductLink">

                   Aggiungi

                </a>
            </li>

            <li>
                <a class="dropdown-item"
                   href="#">

                   Modifica

                </a>
            </li>

            <li>
                <a class="dropdown-item"
                   href="#">

                   Elimina

                </a>
            </li>

        </ul>

    </li>
    `;
}

// SOSTITUISCE LOGIN CON LOGOUT
function showLogout() {

    const loginArea = document.getElementById("loginArea");

    loginArea.innerHTML = `
    
    <li class="nav-item">

        <a class="nav-link my-link"
           href="#"
           id="logoutLink">

           Logout

        </a>

    </li>
    `;


    document.getElementById("logoutLink")
        .addEventListener("click", logoutUser);

}

// LOGOUT
function logoutUser(e) {

    e.preventDefault();


    fetch(API_URL + "logout.php")

    .then(response => response.json())

    .then(data => {

        alert(data.message);


        // ricarica pagina pulita
        location.reload();

    });

}