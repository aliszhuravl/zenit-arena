<?php

class Events {

    public static $aEvents = array(
//        array(
//            'date' => '17.05',
//            'title' => 'Матч 29-го тура',
//            'sub-title' => 'ФК Зенит — ФК Краснодар',
//        ),
    );


    public static function getTemplateList($bClassActive = false) {
        $sEvent = '';

        foreach (self::$aEvents as $iKey => $aEvent) {
            $sAddClassActive = $iKey == 0 && $bClassActive === true ? ' active' : '';

            $sEventDate = '<div class="event_date">' . $aEvent['date'] . '</div>';
            $sEventTitle = '<p>' . $aEvent['title'] . '</p>';
            $sEventSubTitle = '<p>' . $aEvent['sub-title'] . '</p>';

            $sEvent .= '<div class="event' . $sAddClassActive . '">';
            $sEvent .= '<div class="event__inner">' . $sEventDate . '<div class="event_game">' . $sEventTitle . $sEventSubTitle . '</div></div>';
            $sEvent .= '</div>';
        }

        return $sEvent;
    }
}