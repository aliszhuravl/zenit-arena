<?php

class StadiumController {
    static $aSectors = array(
        'A' => array(
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            212,
            213,
            214,
            215,
            216,
            217,
            218,
        ),
        'B' => array(
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            114,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            210,
            211,
            212,
            213,
            214,
            215,
            216,
            217,
            218,
        ),
        'C' => array(
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            114,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            210,
            211,
            212,
            213,
            214,
            215,
            216,
            217,
            218,
        ),
        'D' => array(
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            210,
            211,
            212,
            213,
            214,
            215,
            216,
            217,
            218,
        ),
    );

    public static function actionFindSector() {
        $sSector = $_POST['sector'];
        $sPlatform = ucfirst(substr($sSector, 0, 1));
        $aResponse['status'] = 'ok';

        if (!in_array($sPlatform, array_keys(self::$aSectors)) && !is_numeric($sSector)) {
            throw new \Exception('wrong platform');
        }

        // Hints for input
        if (is_numeric($sSector) && strlen($sSector) == 3) {
            $aHints = array();

            foreach (self::$aSectors as $sKey => $aValue) {
                if (in_array($sSector, $aValue)) {
                    array_push($aHints, $sKey);
                }
            }

            unset($aResponse['platform']);
            $aResponse['hints'] = $aHints;
            $aResponse['status'] = 'error';
            $aResponse['message'] = 'hints';
            return $aResponse;
        }
        $aResponse['platform'] = !is_numeric($sSector) ? lcfirst($sPlatform) : null;

        if (!in_array(substr($sSector, 1), self::$aSectors[$sPlatform])) {
            $aResponse['status'] = 'error';
            $aResponse['message'] = 'wrong sector';
            return $aResponse;
        }
        $aResponse['sector'] = lcfirst($sSector);

        return $aResponse;
    }

}