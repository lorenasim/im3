<?php
// -> datenbankkonfiguration laden
require_once '../config.php';

// -> Erlaubt den Zugriff von anderen Quellen (behebt den CORS-Fehler)
header('Access-Control-Allow-Origin: *');

// -> auf json einstellen
header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    $date = $_GET['date'];
    $sender = $_GET['sender'];

    if ($sender == 'both') {
        $sql = "SELECT * FROM xmas_songs WHERE DATE(timestamp) = :date";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['date' => $date]);
    } else {
        $sql = "SELECT * FROM xmas_songs WHERE DATE(timestamp) = :date AND sender = :sender";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['date' => $date, 'sender' => $sender]);
    }

    $results = $stmt->fetchAll();
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}