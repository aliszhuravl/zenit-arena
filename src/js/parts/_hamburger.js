/* hamburger hide show */
(function($) {
    var hamburger = $('.hamburger');
    var body = $('body');

    function hamburgerOpen() {
        hamburger.addClass('hamburger_active');
        body.addClass('menu-mobile_opened');
    }

    function hamburgerClose() {
        hamburger.removeClass('hamburger_active');
        body.removeClass('menu-mobile_opened');
        body.addClass('menu-mobile_closed');
        setTimeout (function() {
            body.removeClass('menu-mobile_closed');
        }, 200);
    }

    $('.mob-lna').on('click', function () {
        hamburger.removeClass('hamburger_active');
        body.removeClass('menu-mobile_opened');
        body.addClass('menu-mobile_closed');
        setTimeout (function() {
            body.removeClass('menu-mobile_closed');
        }, 200);
    });

    hamburger.on('click', function () {
        if ( $(this).hasClass('hamburger_active') ) {
            hamburgerClose()
        } else {
            hamburgerOpen();
        }
    });

    $('.menu-mobile__close').on('click', function() {
        hamburgerClose();
    });

    $('.menu-mobile__backdrop').on('click', function() {
        hamburgerClose();
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27 && (body.hasClass('menu-mobile_opened'))) { // escape key
            hamburgerClose()
        }
    });
})(jQuery);