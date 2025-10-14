<?php

// -> datenbankkonfiguration laden
require_once '../config.php';

// -> auf json einstellen
header('Content-Type: application/json');

// -> verbindung mit der datenbank
try {
    $pdo = new PDO($dsn, $username, $password, $options);

// sql befehl schreiben und ausführen
$date = $_GET['date'];
$sender = $_GET['sender'];

if ($sender == 'both') {
$sql = "SELECT * FROM xmas_songs WHERE DATE (timestamp) = :date";
} else {
$sql = "SELECT * FROM xmas_songs WHERE DATE (timestamp) = :date AND sender = :sender";
}

$stmt = $pdo->prepare($sql) ;

if ($sender == 'both') {
$stmt->execute(['date' => $date]);
} else{
$stmt->execute( ['date' => $date, 'sender' => $sender]);
}
$results = $stmt->fetchAll();

// -> daten als json zurückgeben
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

