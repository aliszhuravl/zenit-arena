$(function() {

    var oStadiumPlan = {
        // Const
        HREF_FIND_SECTOR: 'ajax/index.php?action=stadium:findSector',
        PATH_SCHEME: 'img/schemes/',

        // Variables
        timeOut: 0,
        selectedPlatform: '',
        platformIds: {
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd'
        },

        // DOM
        stadiumPlanPlace: $('.j_stadium_plan'),
        inputSector: $('.j_choose_sector'),
        formFindPlace: $('#form-find-place'),

        imgPlaceScheme: $('.j_img_scheme'),
        imgPlaceWrapper: $('.j_scheme_place'),
        showSector: $('.show-sector'),
        hideSector: $('.hide-sector'),

        init: function() {

            this.stadiumPlanPlace.on('mouseover', '.st1', function() {
                var sSector = $(this).attr('id'),
                    iTier = parseInt(sSector.substring(1, 2)),
                    sPlatform = sSector.substring(0, 1);

                TweenMax.to($(this), 0.5, {scale:1.08, transformOrigin:"50% 50%"});

                oStadiumPlan.stadiumPlanPlace.find('.chosen-sector').removeClass('chosen-sector');
                oStadiumPlan.selectPlatform(sPlatform);

                if (sSector == 'apress') {
                    sSector = 'press';
                    iTier = 2;
                }

                oStadiumPlan.setTier(iTier);
                oStadiumPlan.setPlatform(sPlatform);
                oStadiumPlan.setSector(sSector);
            });

            this.stadiumPlanPlace.on('mouseout', '.chosen-sectors', function() {
                TweenMax.to($(this), 0.5, {scale:1, transformOrigin:"50% 50%"});
            });

            this.stadiumPlanPlace.on('mouseout', '.j_svg_platform', function() {
                var sPlatform = $(this).attr('id').substring(3, 4);

                oStadiumPlan.timeOut = setTimeout(function() {

                    $.each(oStadiumPlan.platformIds, function(index, element) {
                        oStadiumPlan.unSelectPlatform(element);
                    });

                    oStadiumPlan.setTier('');
                    oStadiumPlan.setPlatform('');
                    oStadiumPlan.setSector('');
                }, 200);
            });

            this.inputSector.on('keyup input', function() {
                var oInput = $(this),
                    sValue = oInput.val();

                oStadiumPlan.formFindPlace.find('.j_hints').remove();
                TweenMax.to($('.chosen-sector'), 0.5, {scale:1, transformOrigin:"50% 50%"});
                oStadiumPlan.stadiumPlanPlace.find('.chosen-sector').removeClass('chosen-sector');

                $.ajax({
                    url: oStadiumPlan.HREF_FIND_SECTOR,
                    type: 'POST',
                    data: 'sector=' + sValue,
                    dataType: 'json',
                    success:function(oResponse) {

                        if (oResponse.status === 'ok') {
                            oStadiumPlan.selectPlatform(oResponse.platform);

                            oStadiumPlan.setTier(oResponse.sector.substring(1, 2));
                            oStadiumPlan.setPlatform(oResponse.platform);
                            oStadiumPlan.setSector(oResponse.sector);

                            oStadiumPlan.stadiumPlanPlace.find('#' + oResponse.sector).addClass('chosen-sector');
                            TweenMax.to(oStadiumPlan.stadiumPlanPlace.find('#' + oResponse.sector), 0.5, {scale:1.08, transformOrigin:"50% 50%"});

                        } else if (oResponse.message === 'hints') {
                            oStadiumPlan.drawHints(oStadiumPlan.formFindPlace, oInput, oResponse.hints);
                            $('.j_hints').slideDown();
                        } else if (oResponse.message === 'wrong platform') {
                            oStadiumPlan.unSelectPlatforms();
                        } else if (oResponse.message === 'wrong sector' && oResponse.platform) {
                            oStadiumPlan.selectPlatform(oResponse.platform);
                            oStadiumPlan.setPlatform(oResponse.platform);
                        }
                    }
                });

            });

            this.formFindPlace.on('submit', function() {
                oStadiumPlan.inputSector.trigger('keyup');
                return false;
            });

            this.formFindPlace.on('click', '.j_hints li', function() {
                var sValue = $(this).html();
                oStadiumPlan.inputSector.val(sValue).trigger('input');
            });

            this.stadiumPlanPlace.on('click', '.chosen-sectors', function() {
                var sSector = $(this).attr('id'),
                    iTier = parseInt(sSector.substring(1, 2)),
                    sPlatform = sSector.substring(0, 1);

                if (sSector == 'apress') {
                    sSector = 'press';
                    iTier = 2;
                    return false;
                }

                // set src img place
                oStadiumPlan.imgPlaceWrapper.find('img').attr('src', oStadiumPlan.PATH_SCHEME + sSector + '.svg');
                oStadiumPlan.showSector.trigger('click');
            });

            $('.j_trigger_place').on('click', function() {
                location.href = location.origin + location.pathname + '#place';
            });

        },

        selectPlatform: function(sPlatform) {
            clearTimeout(oStadiumPlan.timeOut);

            if (oStadiumPlan.selectedPlatform.length > 0 && oStadiumPlan.selectedPlatform != sPlatform) {
                oStadiumPlan.unSelectPlatform(oStadiumPlan.selectedPlatform);
            }

            $.each(oStadiumPlan.platformIds, function(index, element) {
                if (sPlatform == element) {
                    $('#tr-' + sPlatform).find('.st1').each(function(index, element) {
                        $(element).addClass('chosen-sectors');
                    });

                    $('#tr-' + sPlatform + '2').find('.st1').each(function(index, element) {
                        $(element).addClass('chosen-sectors');
                    });
                } else {

                    $('#tr-' + element).find('.st1').each(function(index, element) {
                        $(element).addClass('grey-sectors');
                    });

                    $('#tr-' + element + '2').find('.st1').each(function(index, element) {
                        $(element).addClass('grey-sectors');
                    });
                }
            });

            oStadiumPlan.selectedPlatform = sPlatform;
        },

        unSelectPlatform: function(sPlatform) {
            $('#tr-' + sPlatform).find('.st1').each(function(index, element) {
                $(element).removeClass('chosen-sectors grey-sectors');
            });

            $('#tr-' + sPlatform + '2').find('.st1').each(function(index, element) {
                $(element).removeClass('chosen-sectors grey-sectors');
            });

            oStadiumPlan.selectedPlatform = '';
        },

        unSelectPlatforms: function() {
            oStadiumPlan.stadiumPlanPlace.find('.chosen-sectors').removeClass('chosen-sectors');
            oStadiumPlan.selectedPlatform = '';
        },

        setTier: function(sValue) {
            $('.j_tier').html(sValue);
        },

        setPlatform: function(sValue) {
            $('.j_platform').html(sValue.toUpperCase());
        },

        setSector: function(sValue) {
            $('.j_sector').html(sValue.toUpperCase());
        },

        drawHints: function(oForm, oInput, aPlatforms) {
            var offsetInput = oInput.offset(),
                widthForm = oForm.width(),
                heightForm = oForm.height(),
                sHintsList = '<ul class="hints-list j_hints" style="top: ' + heightForm + 'px;width: ' + widthForm + 'px">';

            $.each(aPlatforms, function(index, element) {
                sHintsList += '<li>' + element + oInput.val() + '</li>';
            });

            sHintsList += '</ul>';

            oForm.append(sHintsList);
        }
    };

    oStadiumPlan.init();
});
