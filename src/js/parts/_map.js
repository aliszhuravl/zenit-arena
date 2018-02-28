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