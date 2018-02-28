<?php

class FeedbackController {

    private static $aRequiredFiled = array(
        'name',
        'message',
    );

    private static $aAllowedTypeFiles = array(
        'image/png',
        'image/gif',
        'image/jpeg',
    );

    public static function actionSend() {
        $aParams = $_REQUEST;
        $sFilePath = null;
        $sFileName = null;

        // If file
        if (isset($_FILES['file']['error']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
            if (!in_array($_FILES['file']['type'], self::$aAllowedTypeFiles)) {
                self::jOut('error', 'Недопустимый формат файла');
            }

            $sFilePath = $_FILES['file']['tmp_name'];
            $sFileName = $_FILES['file']['name'];
        }

        // Check required fields
        $aEmptyField = array();
        foreach (self::$aRequiredFiled as $sFieldCode) {
            if (empty($aParams[$sFieldCode])) {
                array_push($aEmptyField, $sFieldCode);
            }
        }

        if (!empty($aEmptyField)) {
            self::jOut('error', null, $aEmptyField);
        }

        unset($aParams['action']);
        $aParams['date'] = date('Y-m-d H:i:s');
        $aParams['ip'] = $_SERVER['REMOTE_ADDR'];

        $sMessage = '';
        foreach ($aParams as $sKey => $sValue) {
            $sMessage .= $sKey . ": " . $sValue . "<br>";
        }

        $sSubject = 'Обратная связь с сайта zenit';

        //self::saveLog($aParams);
        $resultSendMail = self::sendMail($sSubject, $sMessage, $sFilePath, $sFileName);

        if (!$resultSendMail == true) {
            self::jOut('error', $resultSendMail);
        }

        self::jOut('ok', 'Ваше сообщение отправлено!');
    }

    private static function sendMail($sSubject, $sMessage, $sFilePath = null, $sFileName = null) {
        $mail = new PHPMailer;

        $mail->isSMTP();
//        $mail->SMTPDebug = 2;
//        $mail->Debugoutput = 'html';
        $mail->Host = 'smtp.yandex.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'zenit@its.agency';
        $mail->Password = 'DsBS3kI9sO';

        $mail->CharSet = 'UTF-8';
        $mail->setFrom('zenit@its.agency', 'Zenit');
        $mail->addReplyTo('zenit@its.agency', 'Zenit');
        $mail->addAddress('zenit@its.agency');

        if ($sFilePath) {
            $mail->addAttachment($sFilePath, $sFileName);
        }
        $mail->isHTML(true);

        $mail->Subject = $sSubject;
        $mail->Body    = $sMessage;
        $mail->AltBody = $sMessage;

        if(!$mail->send()) {
            return $mail->ErrorInfo;
        }

        return true;
    }

    // TODO:: сделать обшим классом
    private static function jOut($sStatus = null, $sMessage = null, $aData = array()) {
        echo json_encode(array(
            'status' => !empty($sStatus) ? $sStatus : null,
            'message' => !empty($sMessage) ? $sMessage : null,
            'data' => !empty($aData) ? $aData : array(),
        ), true);
        exit;
    }

}