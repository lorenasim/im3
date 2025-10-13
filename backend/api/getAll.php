<?php

// -> datenbankkonfiguration laden
require_once '../config.php';

// -> auf json einstellen
header('Content-Type: application/json');

// -> verbindung mit der datenbank
try {
    $pdo = new PDO($dsn, $username, $password, $options);

    // -> sql befehl schreiben und ausführen
    $sql = "SELECT * FROM xmas_songs";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll();

    // -> daten als json zurückgeben
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}