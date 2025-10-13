<?php

$data = include('transform.php');

// config.php einbinden
require_once '../config.php'; 

function isDuplicate($pdo, $timestamp) {
    try {
        $sql = "SELECT COUNT(*) FROM entries WHERE timestamp = :timestamp";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['timestamp' => $timestamp]);
        return $stmt->fetchColumn() > 0;
    } catch (PDOException $e) {
        return false;
    }
}

// try und catch ist, ich versuche mich mit der Datenbank zu verbinden und catch ist, wenn es nicht klappt
try {
    // Erstellt eine neue PDO-Instanz - technisch Bezeichnung von Verbindung von PHP & Datenbank - mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten - Befehl an unsere Datenbank eingeben
    $sql = "INSERT INTO xmas_songs (timestamp, artist, title, sender) VALUES (?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($data as $song) {
    if (!isDuplicate($pdo, $entry['timestamp'])) {
        $stmt->execute([
            $song['date'],
            $song['artist'],
            $song['title'],
            $song['sender']
        ]);
    }
}


    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
