<?php
class Purchase {
    private $conn;
    private $table = "acquisti";

    public $utente_id; //id dell'utente che acquista
    public $film_id; //id del film acquistato

    //costruttore: riceve la connessione al db
    public function __construct($db) {
        $this->conn = $db;
    }

    // CREATE -> inserisce un nuovo acquisto nel db
    function create() {
        //preparo la query SQL con parametri
        $stmt = $this->conn->prepare(
            "INSERT INTO {$this->table} (utente_id, film_id, data_acquisto)
             VALUES (:utente, :film, NOW())"
        );

        //eseguo la query con i valori reali
        return $stmt->execute([
            ':utente' => $this->utente_id,
            ':film' => $this->film_id
        ]);
    }

    // READ (libreria utente) -> recupera tutti i film acquistati da un utente
    function getByUser() {
        //query con JOIN
        //collega tabella acquisti con catalogo per ottenere i dati del film
        $stmt = $this->conn->prepare(
            "SELECT c.*
             FROM acquisti a
             JOIN catalogo c ON a.film_id = c.id_film
             WHERE a.utente_id = :utente"
        );

        //eseguo la query con l'id dell'utente
        $stmt->execute([':utente' => $this->utente_id]);

        //restituisco il risultato 
        return $stmt;
    }

    // arianna deve aggiungere questo
    public function alreadyPurchased() {
    // arianna deve modificare questo
    $query = "SELECT * FROM acquisti
              WHERE utente_id = :utente 
              AND film_id = :film";

    $stmt = $this->conn->prepare($query);

    $stmt->execute([
        ":utente" => $this->utente_id,
        ":film" => $this->film_id
    ]);

    return $stmt->rowCount() > 0;
    }
}
?>