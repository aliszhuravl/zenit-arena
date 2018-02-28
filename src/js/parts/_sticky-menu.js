$( window ).scroll(function() {
    if ( $(window).scrollTop() > 500) {
        $("#sticky-menu").fadeIn(500).addClass("active");
        $('.info_box').addClass('box__lower');
    }
    if ( $(window).scrollTop() < 500) {
        $("#sticky-menu").fadeOut(500).removeClass("active");
        $('.info_box').removeClass('box__lower');
    }
    if ( $(window).scrollTop() > 100) {
        $("#about-menu").fadeIn(500).addClass("active");
        $('.info_box').addClass('box__lower');
    }
    if ( $(window).scrollTop() < 100) {
        $("#about-menu").fadeOut(500).removeClass("active");
        $('.info_box').removeClass('box__lower');
    }
});