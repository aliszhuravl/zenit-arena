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