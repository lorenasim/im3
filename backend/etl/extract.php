<?php
// holt daten von Php und gibt es als json zurück

function fetchMusicenergyData() {
    $url = "https://energy.ch/api/channels/bern/playouts";
    

    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);

    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);

    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    return json_decode($response, true);
}

function fetchMusicsrfData() {
    $url = "https://il.srgssr.ch/integrationlayer/2.0/srf/songList/radio/byChannel/69e8ac16-4327-4af4-b873-fd5cd6e895a7";
    

    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);

    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);

    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    return json_decode($response, true);
}

// Echo pre tut einfach schöner darstellen
/*echo '<pre>';
var_dump(fetchMusicenergyData());
var_dump(fetchMusicsrfData());
echo '</pre>'; */

return [
    'srf' => fetchMusicsrfData(),
    'energy' => fetchMusicenergyData()
];

?>