<?php
    // echo date('d'); // Day
    // echo date('m'); // Month
    // echo date('Y'); // Year
    // echo date('l'); // Day of week

    // echo 'Today\'s date is '.date('l').' '.date('d').'/'.date('m').'/'.date('y').'.<br>';

    // echo date('h:i:sa').'<br>';

    // echo date('d/m/y - h:i:sa', mktime(16,24,0,4,3,1972)).'<br>';

    // echo $_SERVER['SERVER_SOFTWARE'].'<BR>';
    // echo date('d/m/y - h:i:sa', $_SERVER['REQUEST_TIME']).'<BR>';
    // echo $_SERVER['SERVER_ADMIN'].'<BR>';

    foreach ($_SERVER as $key => $value) {
        echo $key.' : '.$value.'<BR>';
    }
?>