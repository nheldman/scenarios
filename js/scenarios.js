jQuery(function() {
    jQuery('.open-modal').on('click touchend', function() {
        event.preventDefault();
        jQuery(this).modal({fadeDuration:100});
    });

    jQuery('.goto').on('click touchend', function() {
        event.preventDefault();
        var slide = parseInt(jQuery(this).data('slide'));
        Dz.setSlide(slide);
    });
});
