$(function() {

    var oServices = {
        // Const
        HREF_GET_SERVICE_SVG: 'ajax/index.php?action=stadium:getSvg',

        // Variables
        servicesIds: {
            eat: '#f-6',
            ambulance: '#g-6',
            police: '#r-6',
            wc: '#b-6'
        },
        chosenIcons: [],
        activeClass: 'l-active',
        activeClassServices: 'wnb_active',

        // DOM
        tiersLinks: $('.j_tiers_nav a'),
        svgServicesWrapper: $('.j_stadium_services'),
        servicesList: $('.j_services li'),
        servicesIcon: $('.j_service_icon div'),

        init: function() {

            this.tiersLinks.on('click', function() {
                var oLink = $(this),
                    iTier = oLink.html();

                /* Temp */
                if (iTier == 4) {
                    return false;
                }

                oServices.svgServicesWrapper.find('svg').stop(true, true);
                oServices.svgServicesWrapper.find('svg')
                    .animate({
                        opacity: 0
                    }, {
                        queue: true,
                        duration: 600,
                        complete: function() {
                            oServices.tiersLinks.removeClass(oServices.activeClass);
                            oLink.addClass(oServices.activeClass);
                            oServices.servicesIcon.removeClass(oServices.activeClassServices);
                            $.ajax({
                                url: 'img/services/' + iTier + '.svg',
                                type: 'GET',
                                dataType: 'xml',
                                complete: function(svgDoc) {
                                    //var importedSVGRootElement = document.importNode(svgDoc.documentElement,true);
                                    oServices.svgServicesWrapper.html(svgDoc.responseText);
                                    oServices.svgServicesWrapper.css('opacity', '0');
                                    oServices.svgServicesWrapper.animate({opacity: 1}, 600);
                                    oServices.chosenIcons = [];
                                }
                            });
                        }
                    });

                return false;
            });

            this.servicesList.on('click', function() {
                var sService = $(this).data('name');

                oServices.showService(sService);
                oServices.chosenIcons = [];
            });

            this.servicesIcon.on('click', function() {
                var sService = $(this).data('name').toString();

                if ($.inArray(sService, oServices.chosenIcons) === -1) {
                    oServices.chosenIcons.push(sService);
                    $(this).addClass(oServices.activeClassServices);
                } else {
                    oServices.chosenIcons = jQuery.grep(oServices.chosenIcons, function(value) {
                        return value != sService;
                    });
                    $(this).removeClass(oServices.activeClassServices);
                }

                oServices.allServiceHide();
                $.each(oServices.chosenIcons, function(index, element) {
                    $(oServices.servicesIds[element]).show();
                });

                return false;
            });

        },

        showService: function(sServiceName) {
            $.each(oServices.servicesIds, function(index, element) {
                if (sServiceName == 'all') {
                    $(element).show();
                } else if (sServiceName != index) {
                    $(element).hide();
                } else {
                    $(element).show();
                }
            });
        },

        allServiceHide: function() {
            $.each(oServices.servicesIds, function(index, element) {
                $(element).hide();
            });
        }
    };

    oServices.init();
});