$(function() {

    var oFindWay = {
        // Const
        PATH_WAY_SVG: 'img/ways/',

        // Variables

        // DOM
        findWayList: $('.j_find_way li'),
        imgFindWay: $('.j_img_find_way'),
        linkDownload: $('.j_download_find_way'),
        busWayInfo: $('.j_bus_way_info'),

        init: function() {

            this.findWayList.on('click', function () {
                var sWay = $(this).data('name');

                oFindWay.linkDownload.attr('href', oFindWay.PATH_WAY_SVG + sWay + '.svg');
                oFindWay.imgFindWay.animate({
                    opacity: 0
                }, {
                    queue: true,
                    duration: 600,
                    complete: function () {
                        oFindWay.imgFindWay.attr('src', oFindWay.PATH_WAY_SVG + sWay + '.svg').animate({opacity: 1}, 600);
                        oFindWay.toggleBusInfo(sWay);
                    }
                });
            });

        },

        toggleBusInfo: function(sWay) {
            if (sWay == 'bus') {
                oFindWay.busWayInfo.show();
            } else {
                oFindWay.busWayInfo.hide();
            }
        }
    };

    oFindWay.init();
});