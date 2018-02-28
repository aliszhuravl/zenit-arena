<?php

ini_set('display_errors', false);

define ('_JSON_UNESCAPED_UNICODE', 256);
require_once(__DIR__ . '/../inc/lib/PHPMailer/PHPMailerAutoload.php');

$sAction = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;
$sAction = preg_replace('/[^a-z0-9:\.]/iu', '', $sAction);
$aAction = explode(':', $sAction);

$aResponse = array(
    'status' => 'ok',
    'data' => array(),
    'message' => '',
);

try {
    if (count($aAction) != 2) {
        throw new Exception('Invalid request');
    }

    $sController = ucfirst($aAction[0]) . 'Controller';
    $sMethod = 'action' . ucfirst($aAction[1]);

    $sFileName = "actions/{$sController}.php";
    if (!file_exists($sFileName)) {
        throw new Exception('Invalid filename');
    }

    require_once($sFileName);

    if (!class_exists($sController) || !method_exists($sController, $sMethod)) {
        throw new Exception('Invalid method');
    }

    $aResponse = $sController::$sMethod();
} catch (Exception $oException) {
    $sMessage = 'Произошла ошибка';
    $sMessage = $oException->getMessage();

    $aResponse = array(
        'status' => 'error',
        'message' => $sMessage,
    );
}

echo json_encode($aResponse, _JSON_UNESCAPED_UNICODE);
