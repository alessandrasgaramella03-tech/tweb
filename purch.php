<?php
session_start();

// includo le classi per la gestione dei dati
include_once '../dataMgr/database.php';
include_once '../dataMgr/Purchase.php';

// creo una connessione al DBMS
$database = new Database();
$db = $database->getConnection();

// creo l'oggetto purchase
$purchase = new Purchase($db);

//utente loggato
$utente_id = $_SESSION['id_utente'] ?? null;

// lettura JSON dal frontend
$data = json_decode(file_get_contents("php://input"), true);
$film_id = $data['film_id'] ?? null;

//validazione
if (!$utente_id || !$film_id){
    http_response_code(400);
    echo json_encode(["message" => "Dati mancanti o utente non loggato"]);
    exit;
}

// assegno dati
$purchase->utente_id = $utente_id;
$purchase->film_id = $film_id;

//controllo acquisto esistente (ARI AGGIUNGI QUESTO)
if ($purchase->alreadyPurchased()) {

    echo json_encode(["message" => "Hai già acquistato questo contenuto"]);

    exit;
}

// eseguo acquisto
if ($purchase->create()) {
    echo json_encode(["message" => "Acquisto completato"]);
} else {
    echo json_encode(["message" => "Errore durante l'acquisto"]);
}
?>