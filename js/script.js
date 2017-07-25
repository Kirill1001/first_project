$('.owl-carousel').owlCarousel({
    loop:true,
    margin:25,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:3,
            dots: true
        }
    }
});


//Phone-menu
$('.phone-menu').on('click', function() {

    $('.nav').slideToggle(300, function() {
        if ($(this).css('display') === 'none') {
            $(this).removeAttr('style');
        }
    });

});