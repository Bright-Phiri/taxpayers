<?php
$email = $_POST['Email'];
$postdata = http_build_query(
    array(
        'Email' => $email
    )
);
$opts = array(
    'http' =>
    array(
        'method' => 'POST',
        'header' => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
    )
);
$context = stream_context_create($opts);
$result = file_get_contents('https://www.mra.mw/sandbox/programming/challenge/webservice/auth/logout', false, $context);
echo $result;
