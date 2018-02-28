<?php

require_once(__DIR__ . '/autoload.php');

$oMobileDetect = new Mobile_Detect();
$bIsMobile = $oMobileDetect->isMobile();
$bIsTablet = $oMobileDetect->isTablet();

?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="cmsmagazine" content="eebede580150b3425f39db3962e571ba"/>
    <link rel="stylesheet" href="css/main.css">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <title>Стадион «Санкт-Петербург»</title>
</head>
<body>