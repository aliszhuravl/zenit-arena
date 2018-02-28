
/**
 *  set adaptive viewport on screens smaller then 640 and bigger than 1200
 *  set static viewport on screens between 641px and 1199
 */

var mediaCheckMobile = window.matchMedia('(max-width: 640px)');
var mediaCheckTablet = window.matchMedia('(min-width: 641px) and (max-width: 1200px)');
var mediaCheckDesktop = window.matchMedia('(min-width: 1201px)');

$(window).on('load resize', function () {
    var viewport = document.getElementById('viewport');

    if (mediaCheckMobile.matches) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    } else if (mediaCheckTablet.matches) {
        viewport.setAttribute('content', 'width=device-width');
    } else if (mediaCheckDesktop.matches) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
});

$(window).on('load resize', function () {

    if (mediaCheckMobile.matches) {
        console.log('mobile');
    } else if (mediaCheckTablet.matches) {
        console.log('tablet');
    } else if (mediaCheckDesktop.matches) {
        console.log('desktop');
    }
});
window.onload = function() {

    function GetIEVersion() {
        var sAgent = window.navigator.userAgent;
        var Idx = sAgent.indexOf("MSIE");

        // If IE, return version number.
        if (Idx > 0)
            return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

        // If IE 11 then look for Updated user agent string.
        else if (!!navigator.userAgent.match(/Trident\/7\./))
            return 11;

        else
            return 0; //It is not IE
    }

    if (GetIEVersion() > 0) {
        $('body').addClass('internet-explorer');
    } else {
        return;
    }
};
(function($) {

    function linkHighlight(linkClass) {

        /* highlight active menu item*/
        $(linkClass).each(function (index) {
            if (this.href.trim() == window.location)
                $(this).addClass('link_active');
        });
    }

    linkHighlight('.nav__link');

})(jQuery);
$('.scrolling_link').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[id=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800);
            return false;
        }
    }
});
$('.dropdown').each(function () {

    // Cache the number of options
    var $dropdown = $(this),
        $dropdowns = $('.dropdown').not(this),
        $dropdownText = $dropdown.find('.dropdown__text'),
        $dropdownList = $dropdown.find('.dropdown__list'),
        $dropdownListItems = $dropdown.find('.dropdown__item');

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $dropdown.on('click', function(e) {
        e.stopPropagation();
        $dropdowns.removeClass('dropdown_opened');
        $dropdowns.find('.dropdown__list').slideUp(250);

        if ($dropdown.hasClass('dropdown_opened')) {
            $dropdown.removeClass('dropdown_opened');
            $dropdown.find('.dropdown__list').slideUp(250);
        } else {
            $dropdown.addClass('dropdown_opened');
            $dropdown.find('.dropdown__list').slideDown(250);
        }
    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $dropdownListItems.click(function(e) {
        e.stopPropagation();
        $dropdownText.text($(this).text());
        $dropdown.removeClass('dropdown_opened');
        $dropdownList.slideUp(150);
        if($(this).hasClass('tabs__btn')){
            $(this).addClass('tabs__btn_active').siblings().removeClass('tabs__btn_active');
            $(this).closest('.tabs').find('.tabs__item').removeClass('active').eq($(this).index()).addClass('active');
        }
        if($(this).hasClass('recall_li')) {
            $('.recall_li').each (function() {
                if ($(this).data('id') === 'ans') {
                    $(this).click (function() {$('#modal-answer').modal();});
                }
                if ($(this).data('id') === 'req') {
                    $(this).click (function() {$('#modal-request').modal();});
                }
                if ($(this).data('id') === 'demo') {
                    $(this).click (function() {$('#modal-demo').modal();});
                }
                if ($(this).data('id') === 'rec') {
                    $(this).click (function() {$('#modal-recall').modal();});
                }
                if ($(this).data('id') === 'err') {
                    $(this).click (function() {$('#modal-error').modal();});
                }
                if ($(this).data('id') === 'sale') {
                    $(this).click (function() {$('#modal-sale').modal();});
                }
            });
        }
    });

    // Hides the unordered list when clicking outside of it
    $(document.body).click( function() {
        $dropdown.removeClass('dropdown_opened');
        $dropdownList.slideUp(150);
    });
});
$('.footer-content').slick({
    infinite: true,
    slidesToShow: 1,
    arrows: true
});

$('.footer-content-full').slick({
    infinite: true,
    slidesToShow: 3,
    arrows: true
});



$('.mob-slider-event').slick({
    infinite: true,
    slidesToShow: 2,
    arrows: true,
    responsive: [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});
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
(function($) {

    $('.tabs').each( function() {

        $('.tabs__buttons').on('click', '.tabs__btn:not(.tabs__btn_active)', function () {
            $(this).addClass('tabs__btn_active').siblings().removeClass('tabs__btn_active');
            $(this).closest('.tabs').find('.tabs__item').removeClass('active').eq($(this).index()).addClass('active');
        });
    });
})(jQuery);
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
var map1;
var map2;
var map3;

function initMap() {

    var mapStyles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];

    if (document.getElementById('map1')) {
        map1 = new google.maps.Map(document.getElementById('map1'), {
            center: {lat: 59.972255, lng: 30.237666},
            zoom: 15,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            scrollwheel: false
        });

        google.maps.event.addDomListener(window, 'resize', function () {
            var center1 = map1.getCenter();
            google.maps.event.trigger(map1, 'resize');
            map1.setCenter(center1);
        });

        map1.setOptions({styles: mapStyles});
    }

    if (document.getElementById('map2')) {
        map2 = new google.maps.Map(document.getElementById('map2'), {
            center: {lat: 59.963584, lng: 30.321767},
            zoom: 14,
            //disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            scrollwheel: false
        });

        google.maps.event.addDomListener(window, 'resize', function () {
            var center2 = map2.getCenter();
            google.maps.event.trigger(map2, 'resize');
            map2.setCenter(center2);
        });

        map2.setOptions({styles: mapStyles});
    }

    var geomarkDark = {
        url: '/img/marker.png',
        size: new google.maps.Size(100, 132)
    };

    var geomarkGold = {
        url: '/img/icons/marker_white.png',
        size: new google.maps.Size(40, 50)
    };

    var geomarkPark = {
        url: '/img/icons/blue_marks/icon-geomark_leaf.png',
        size: new google.maps.Size(40, 40)
    };

    var geomarkFour = {
        url: '/img/mark3.png',
        size: new google.maps.Size(113, 68)
    };

    var markOffice1 = new google.maps.Marker({
        position: {lat: 59.969638, lng: 30.221395},
        map: map1,
        icon: geomarkDark,
        title: 'Стадион'
    });

    var markOffice2 = new google.maps.Marker({
        position: {lat: 59.920236, lng: 30.735464},
        map: map1,
        icon: geomarkDark,
        title: 'Коркинские озёра'
    });

    var markOffice3 = new google.maps.Marker({
        position: {lat: 60.444851, lng: 30.446018},
        map: map1,
        icon: geomarkDark,
        title: 'Портосики'
    });

    var markOffice4 = new google.maps.Marker({
        position: {lat: 59.730925, lng: 29.922586},
        map: map1,
        icon: geomarkFour,
        title: 'Южный Версаль'
    });
}

initMap();
jQuery(document).ready(function($) {
    $(window).on('load', function() {
        setTimeout(function() {
            $('#preloader').fadeOut(500);
        }, 800);
    });
});
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