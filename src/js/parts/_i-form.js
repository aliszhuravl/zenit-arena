$(document).ready(function() {
    $(".i-button").click(function () {
        $(".i-form").addClass('i-active');
        setTimeout(function() {
        $(".i-form__inner ").addClass('i-inner-active');
        }, 600);
    });

    $(".i-close").click(function () {
        setTimeout(function() {
        $(".i-form").removeClass('i-active');
        }, 600);
        $(".i-form__inner ").removeClass('i-inner-active');
    });
});

//$(document).ready(function() {
//    $(".lvls_btn").click(function () {
//        $(".stadium_levels__box").animate({
//            right: '15px'
//        });
//    });
//});

$(document).ready(function() {
    $("#serv_down").click(function () {
        $("#sl_serv").toggleClass('active_sl');
    });
    $("#place_down").click(function () {
        $("#p_serv").toggleClass('active_sl');
    });
    $("#sector_down").click(function () {
        $("#sec_serv").toggleClass('active_sl');
    });
});

$(document).ready(function() {
    $(".lvls_btn").click(function () {
        $(".stadium_levels__box").toggleClass('active_slb');
    });
});