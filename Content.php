<?php
class Content {
    // connessione (inizializzata nel costruttore)
    private $conn;
    private $table = "catalogo"; // connessione alla tabella catalogo

    // proprietà dei prodotti
    public $id_film;
    public $titolo;
    public $genere;
    public $anno;
    public $tipo;
    public $prezzo;
    public $immagine;

    // il costruttore inizializza la variabile per la connessione al DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // ===== GETTER & SETTER =====

    public function getId() { return $this->id_film; }
    public function setId($id_par) { $this->id_film = $id_par; }

    public function getTitolo() { return $this->titolo; }
    public function setTitolo($titolo) { $this->titolo = $titolo; }

    public function getGenere() { return $this->genere; }
    public function setGenere($genere) { $this->genere = $genere; }

    public function getAnno() { return $this->anno; }
    public function setAnno($anno) { $this->anno = $anno; }

    public function getTipo() { return $this->tipo; }
    public function setTipo($tipo) { $this->tipo = $tipo; }

    public function getPrezzo() { return $this->prezzo; }
    public function setPrezzo($prezzo) { $this->prezzo = $prezzo; }

    public function getImmagine() { return $this->immagine; }
    public function setImmagine($immagine) { $this->immagine = $immagine; }

    // READ ALL
    function read() {
        $query = "SELECT * FROM {$this->table}
        WHERE novita = 0
        ORDER BY titolo"; //ari modifica questo
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // READ ONE
    function readOne() {
        $query = "SELECT * FROM {$this->table} WHERE id_film = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id_film);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->titolo = $row['titolo'];
            $this->genere = $row['genere'];
            $this->anno = $row['anno'];
            $this->tipo = $row['tipo'];
            $this->prezzo = $row['prezzo'];
            $this->immagine = $row['immagine'];
        } else {
            $this->titolo = null;
            $this->genere = null;
            $this->anno = null;
            $this->tipo = null;
            $this->prezzo = null;
            $this->immagine = null;
        }
    }

    // CREATE
    function create() {
        $query = "INSERT INTO {$this->table}
        (titolo, genere, anno, tipo, prezzo, immagine)
        VALUES (:titolo, :genere, :anno, :tipo, :prezzo, :immagine)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":titolo", $this->titolo);
        $stmt->bindParam(":genere", $this->genere);
        $stmt->bindParam(":anno", $this->anno);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":prezzo", $this->prezzo);
        $stmt->bindParam(":immagine", $this->immagine);

        return $stmt->execute();
    }

    // UPDATE (FIXED + DEBUG)
    function update() {

        $query = "UPDATE {$this->table} SET
            titolo = :titolo,
            genere = :genere,
            anno = :anno,
            tipo = :tipo,
            prezzo = :prezzo,
            immagine = :immagine
            WHERE id_film = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":titolo", $this->titolo);
        $stmt->bindParam(":genere", $this->genere);
        $stmt->bindParam(":anno", $this->anno);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":prezzo", $this->prezzo);
        $stmt->bindParam(":immagine", $this->immagine);
        $stmt->bindParam(":id", $this->id_film);

        $ok = $stmt->execute();

        if (!$ok) {
            error_log("UPDATE SQL ERROR:");
            print_r($stmt->errorInfo());
            return false;
        }

        $rows = $stmt->rowCount();
        error_log("UPDATE ROW COUNT: " . $rows);

        // NON usare solo rowCount come verità assoluta
        // (può essere 0 anche se UPDATE è corretto)
        return $ok;
    }

    // DELETE
    function delete() {

    try {
        $query = "DELETE FROM {$this->table} WHERE id_film = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id_film);
        $stmt->execute();
        $deleted = $stmt->rowCount();
        error_log("DELETE rowCount: " . $deleted);
        return $deleted > 0;

    } catch(PDOException $e) {
        error_log("ERRORE DELETE: " . $e->getMessage());
        return $rows > 0;
    }
    
}

    // SEARCH
    function search($keywords) {

        $query = "SELECT * FROM {$this->table}
        WHERE titolo LIKE :kw
        OR genere LIKE :kw
        ORDER BY titolo";

        $stmt = $this->conn->prepare($query);

        $keywords = "%{$keywords}%";
        $stmt->bindParam(":kw", $keywords);

        $stmt->execute();
        return $stmt;
    }
}
?>