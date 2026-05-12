<?php
session_start();

if(!isset($_SESSION['role']) || $_SESSION['role'] != 'admin'){
    http_response_code(403);
    echo json_encode(["message"=>"Accesso negato"]);
    exit();
}

// CORS
require 'cors.php';
// specifico il formato della risposta (JSON)
header("Content-Type: application/json; charset=UTF-8");
// includo le classi per la gestione dei dati
include_once '../dataMgr/database.php';
include_once '../dataMgr/Content.php';
// creo una connessione al DBMS
$database = new Database();
$db = $database->getConnection();
// creo un'istanza di Prodotto
$content = new Content($db);

// leggo i dati nel body della request (metodo POST)
$data = json_decode(file_get_contents("php://input"));
// controllo che i dati ci siano...
    if(!empty($data->titolo) && !empty($data->prezzo) && !empty($data->genere) && !empty($data->id_film)) {
        // inserisco i valori nelle variabili di istanza dell'oggetto $content
        $content->setId($data->id_film);
        $content->setTitolo($data->titolo);
        $content->setGenere($data->genere);
        $content->setAnno($data->anno);
        $content->setTipo($data->tipo);
        $content->setPrezzo($data->prezzo);
        $content->setImmagine($data->immagine);

        // invoco il metodo create() che crea un nuovo prodotto
        if ($content->create()){ // se va a buon fine...
            http_response_code(201); // response code 201 = created
            // creo un oggetto JSON costituito dalla coppia message: testo-msg
            echo json_encode(array("message" => "Prodotto creato con successo"));
        }

        else { // se la creazione è fallita...
                http_response_code(503); // response code 503 = service unavailable
                // creo un oggetto JSON costituito dalla coppia message: testo-msg
                echo json_encode(array("message" => "Impossibile creare un prodotto"));
        }
    }
    else { // se i dati sono incompleti
        http_response_code(400); // response code 400 = bad request
        // creo un oggetto JSON costituito dalla coppia message: testo-msg
        // uso l’operatore ternario con empty() per evitare l’errore sulla stampa di un valore inesistente
        echo json_encode(array("message" => "Impossibile creare un prodotto.
            Dati incompleti:" .
           " id_film=" . (empty($data->id_film) ? "null" : $data->id_film) . 
            " titolo=" . (empty($data->titolo) ? "null" : $data->titolo) .
            " genere=" . (empty($data->genere) ? "null" : $data->genere) .
            " anno=" . (empty($data->anno) ? "null" : $data->anno) . 
            " tipo=" . (empty($data->tipo) ? "null" : $data->tipo) .
            " prezzo=" . (empty($data->prezzo) ? "null" : $data->prezzo)
            ));
    }
?>