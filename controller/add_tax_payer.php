<?php
$tpn = $_POST['TPIN'];
$certificate = $_POST['BusinessCertificateNumber'];
$tradingname = $_POST['TradingName'];
$regdate = $_POST['BusinessRegistrationDate'];
$mobilenumber = $_POST['MobileNumber'];
$email = $_POST['Email'];
$physicallocation = $_POST['PhysicalLocation'];
$username = $_POST['Username'];
$postdata = http_build_query(
    array(
        'TPIN' => $tpn,
        'BusinessCertificateNumber' => $certificate,
        'TradingName' => $tradingname,
        'BusinessRegistrationDate' => $regdate,
        'MobileNumber' => $mobilenumber,
        'Email' => $email,
        'PhysicalLocation' => $physicallocation,
        'Username' => $username
    )
);

$headers = array(
    "Content-Type: application/x-www-form-urlencoded",
    "candidateid: bphiri.aki@gmail.com",
    "apikey: 3fdb48c5-336b-47f9-87e4-ae73b8036a1c",
);
$opts = array(
    'http' =>
    array(
        'method' => 'POST',
        'header' => $headers,
        'content' => $postdata
    )
);

$context = stream_context_create($opts);
$result = file_get_contents('https://www.mra.mw/sandbox/programming/challenge/webservice/Taxpayers/add', false, $context);
echo $result;
