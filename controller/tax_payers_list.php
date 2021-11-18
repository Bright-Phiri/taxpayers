<?php

$headers = array(
    "Content-Type: application/x-www-form-urlencoded",
    "candidateid: bphiri.aki@gmail.com",
    "apikey: 3fdb48c5-336b-47f9-87e4-ae73b8036a1c",
);
$opts = array(
    'http' =>
    array(
        'method' => 'GET',
        'header' => $headers
    )
);

$context = stream_context_create($opts);
$result = file_get_contents('https://www.mra.mw/sandbox/programming/challenge/webservice/Taxpayers/getAll', false, $context);
echo $result;
