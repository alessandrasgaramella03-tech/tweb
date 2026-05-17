<?php

require 'cors.php';

header("Content-Type: application/json; charset=UTF-8");

include_once '../dataMgr/database.php';
include_once '../dataMgr/Content.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM catalogo
WHERE novita = 1
ORDER BY tipo, titolo";

$stmt = $db->prepare($query);
$stmt->execute();

$contents_list = array();
$contents_list["contents"] = array();

foreach ($stmt as $row) {

    $content_item = array(
        "id" => $row['id_film'],
        "titolo" => $row['titolo'],
        "genere" => $row['genere'],
        "anno" => $row['anno'],
        "tipo" => $row['tipo'],
        "prezzo" => $row['prezzo'],
        "immagine" => $row['immagine']
    );

    array_push($contents_list["contents"], $content_item);
}

http_response_code(200);

echo json_encode($contents_list);