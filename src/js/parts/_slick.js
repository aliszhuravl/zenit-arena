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