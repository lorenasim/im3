<?php

// config.php einbinden
require_once '../config.php'; 

// Datei in gewisser Dateiformat -> JSON aktivieren
header('Content-Type: application/json');

// try und catch ist, ich versuche mich mit der Datenbank zu verbinden und catch ist, wenn es nicht klappt
try {
    // Erstellt eine neue PDO-Instanz - technisch Bezeichnung von Verbindung von PHP & Datenbank - mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten - Befehl an unsere Datenbank eingeben
    $sql = "SELECT * FROM xmas_songs";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // SQL aufführen
        $stmt->execute (); 

    // Daten in Empfang nehmen
    $results = $stmt->fetchAll();

    // Daten als JSON ausgeben
    echo json_encode($results);

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
