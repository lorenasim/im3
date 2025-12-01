<?php

$data = include('extract.php');

$songlist = $data['songList'];

$filtered_songlist = array_filter($songlist, function($value, $key) {
    $allowed_songs = [
        ['title' => 'mistletoe', 'artist' => 'justin bieber'],
        ['title' => 'last christmas', 'artist' => 'wham!'],
        ['title' => 'let it snow! let it snow! let it snow!', 'artist' => 'dean martin'],
        ['title' => 'snowman', 'artist' => 'sia'],
        ['title' => 'all i want for christmas is you', 'artist' => 'mariah carey'],
        

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

