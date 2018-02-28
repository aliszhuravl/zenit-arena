$(document).ready(function() {
    $(".navigation_bar").mouseover(function () {
        $(".navigation_bar").addClass('navbar__active');
        $(".fullpage_nav").addClass('fp_nav__active');
    });

    $(".navigation_bar").mouseout(function () {
        $(".navigation_bar").removeClass('navbar__active');
        $(".fullpage_nav").removeClass('fp_nav__active');
    });
});