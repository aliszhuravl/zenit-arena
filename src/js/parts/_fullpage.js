var fullpageInit = false;

function fullpageSettings() {

    $('#fullpage-slider').fullpage({
        anchors: ['promo', 'about', 'comfort', 'place'],
        verticalCentered: false,
        css3: true,
        menu: '#myMenu',
        navigationPosition: 'left',
        afterLoad: function() {
            fullpageInit = true;
        },
        afterLoad: function(anchorLink, index) {
            if (anchorLink == 'promo' && index == 1) {
                $('.footer').css('opacity', '0').css('pointer-events', 'none');
                $('.navigation_bar').css('opacity', '0').css('pointer-events', 'none');
                $('.main_header').css('opacity', '1').css('pointer-events', 'auto');
                $('.header-all').css('opacity', '0').css('pointer-events', 'none');
                $('.maila').css('color', '#fff');
                $('#first').addClass('active-a');
            }
            else {
                $('.footer').css('opacity', '1').css('pointer-events', 'auto');
                $('.navigation_bar').css('opacity', '1').css('pointer-events', 'auto');
                $('.header').css('opacity', '1');
                $('.main_header').css('opacity', '0').css('pointer-events', 'none');
                $('.header-all').css('opacity', '1').css('pointer-events', 'auto');
                $('.maila').css('color', '#000');
                $('#first').removeClass('active-a');
            }
            if (anchorLink == 'comfort' && index == 3) {
                $('.level-bar').addClass('show');
                $('#fourth').addClass('active-a');
            }
            else {
                $('.level-bar').removeClass('show');
                $('#fourth').removeClass('active-a');
            }
            if (anchorLink == 'about' && index == 2) {
                $('#third').addClass('active-a');
            }
            else {
                $('#third').removeClass('active-a');
            }
            if (anchorLink == 'place' && index == 4) {
                $('#fith').addClass('active-a');
            }
            else {
                $('#fith').removeClass('active-a');
            }
        },

        onLeave: function(index, nextIndex, direction){
            if (index == 3 && direction == 'down' &&nextIndex == 4) {
                $('.level-bar').removeClass('show');
            }
            else if (nextIndex == 4 && direction == 'down') {
                $('.level-bar').removeClass('show');
            }
        },
        onLeave: function(index, nextIndex, direction){
            if (nextIndex == 2 && direction == 'up') {
                $('.level-bar').removeClass('show');
            }
        },
        onLeave: function(index, nextIndex, direction){
            if (direction == 'down') {
                $('.cover-animation').addClass('cover-action');
                setTimeout(function() {
                    $('.cover-animation').removeClass('cover-action');
                }, 1100);
            }
            if (direction == 'up') {
                $('.cover-animation').addClass('cover-action');
                setTimeout(function() {
                    $('.cover-animation').removeClass('cover-action');
                }, 1100);
            }
        }
    });
    $.fn.fullpage.setAllowScrolling(false);
}


if ( $('.page-container').hasClass('page-main') ) {

    $(window).on('load resize', function () {

        if (mediaCheckDesktop.matches) {

            if (!fullpageInit) {
                fullpageSettings();
                $.fn.fullpage.reBuild();
            }
        } else if ((mediaCheckMobile.matches) || (mediaCheckTablet.matches)) {

            if (fullpageInit) {
                fullpageInit = false;
                $.fn.fullpage.destroy('all');
            }

        }
    });
}
