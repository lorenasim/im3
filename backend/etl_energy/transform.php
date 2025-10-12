<?php

$data = include('extract.php');


$filtered_songlist = array_filter($data, function($value, $key) {
    $allowed_songs = [
        ['title' => 'manchild', 'artist' => 'sabrina carpenter'],
        ['title' => 'survive', 'artist' => 'lewis capaldi'],
        ['title' => 'bad romance', 'artist' => 'lady gaga'],
        ['title' => 'abracadabra', 'artist' => 'lady gaga'],
        ['title' => 'heat', 'artist' => 'anna rossinelli'],
        ['title' => 'as it was', 'artist' => 'harry styles'],
        ['title' => 'messy', 'artist' => 'lola young'],
        ['title' => 'ordinary', 'artist' => 'alex warren'],
        ['title' => 'end of the world', 'artist' => 'miley cyrus'],
        ['title' => 'back to friends', 'artist' => 'sombr'],
        ['title' => 'home pt. 2', 'artist' => 'nico santos'],
        ['title' => 'the one', 'artist' => 'michael patrick kelly'],
        ['title' => 'beautiful people', 'artist' => 'david guetta & sia'],
        ['title' => 'anthem', 'artist' => 'glockenbach & norma jean martine'],
        ['title' => 'from disco to disco', 'artist' => 'alle farben & majestic'],
        ['title' => 'show me love', 'artist' => 'wizthemc & bees & honey'],
        ['title' => 'good 4 u', 'artist' => 'olivia rodrigo'],
        

    ];
    if (!empty($value['title']) && !empty($value['artist'])) {
        foreach ($allowed_songs as $allowed_song) {
            if (strtolower($value['title']) === strtolower($allowed_song['title']) &&
                strtolower($value['artist']) === strtolower($allowed_song['artist'])) {
                return true;
            }
        }
    }
    return false;

}, ARRAY_FILTER_USE_BOTH);

$transformed_songlist = [];
foreach($filtered_songlist as $song) {
    $transformed_songlist[] = [
        'date' => $song['playFrom'],
        'title' => $song['title'],
        'artist' => $song['artist'],
        'sender' => 'energy',
    ];
}

echo '<pre>';
print_r($transformed_songlist);
echo '</pre>';

return $transformed_songlist;

