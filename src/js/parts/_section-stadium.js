$(document).ready(function() {
    $(".show-sector").click(function () {
        setTimeout(function() {
        $(".sector-block").removeClass('inactive-stad');
        }, 400);
        $(".show-sector").addClass('inactive-bt');
        $(".hide-sector").removeClass('inactive-bt');

        $(".stadium-block").addClass('inactive-stad');
    });

    $(".hide-sector").click(function () {
        $(".sector-block").addClass('inactive-stad');
        setTimeout(function() {
        $(".stadium-block").removeClass('inactive-stad');
        }, 400);

        $(".show-sector").removeClass('inactive-bt');
        $(".hide-sector").addClass('inactive-bt');
    });
});