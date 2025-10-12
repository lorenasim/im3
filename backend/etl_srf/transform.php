<?php

$data = include('extract.php');

$songlist = $data['songList'];

$filtered_songlist = array_filter($songlist, function($value, $key) {
    $allowed_songs = [
        ['title' => 'watermelon sugar', 'artist' => 'harry styles'],
        ['title' => 'summer of 69', 'artist' => 'bryan adams'],
        ['title' => 'im alive', 'artist' => 'céline dion'],
        ['title' => 'skyfall', 'artist' => 'adele'],
        ['title' => 'listen to your heart', 'artist' => 'roxette'],
        ['title' => 'good day sunshine', 'artist' => 'the beatles'],
        ['title' => 'the best', 'artist' => 'tina turner'],
        ['title' => 'mariana sanchez', 'artist' => 'patent ochsner'],
        ['title' => 'honky tonk women', 'artist' => 'the rolling stones'],
        ['title' => 'you know im no good', 'artist' => 'amy winehouse'],
        ['title' => 'nothing holding me down', 'artist' => 'pegasus'],
        ['title' => 'if i could turn back time', 'artist' => 'cher'],
        ['title' => 'we are the champions', 'artist' => 'queen'],
        ['title' => 'fox on the run', 'artist' => 'the sweet'],
        ['title' => 'eclipse', 'artist' => 'pink floyd'],
        ['title' => 'rock with you', 'artist' => 'michael jackson'],
        ['title' => 'africa', 'artist' => 'toto'],
        ['title' => 'old phone', 'artist' => 'ed sheeran'],
        ['title' => 'more than a woman', 'artist' => 'bee gees'],
        ['title' => 'american pie', 'artist' => 'madonna'],
        ['title' => 'härzschärbe', 'artist' => 'trauffer'],
        ['title' => 's.o.s.', 'artist' => 'abba'],
        ['title' => 'il mio giorno preferito', 'artist' => 'eros ramazzotti'],
        ['title' => 'dancing in the dark', 'artist' => 'bruce springsteen'],
        ['title' => 'how will i know', 'artist' => 'whitney houston'],
        

    ];
    if (!empty($value['title']) && !empty($value['artist']['name'])) {
        foreach ($allowed_songs as $allowed_song) {
            if (strtolower($value['title']) === strtolower($allowed_song['title']) &&
                strtolower($value['artist']['name']) === strtolower($allowed_song['artist'])) {
                return true;
            }
        }
    }
    return false;

}, ARRAY_FILTER_USE_BOTH);

$transformed_songlist = [];
foreach($filtered_songlist as $song) {
    $transformed_songlist[] = [
        'date' => $song['date'],
        'title' => $song['title'],
        'artist' => $song['artist']['name'],
        'sender' => 'srf',
    ];
}

echo '<pre>';
print_r($transformed_songlist);
echo '</pre>';

return $transformed_songlist;

