jQuery(function() {
    jQuery('.open-modal').on('click touchend', function() {
        event.preventDefault();
        var $this = jQuery(this);
        $this.modal({fadeDuration:100});

        if ($this.hasClass('correct')) {
            $this.parents('section').children('.button').removeClass('hide');
        }
    });

    jQuery('.goto').on('click touchend', function() {
        event.preventDefault();
        var slide = parseInt(jQuery(this).data('slide'));
        Dz.setSlide(slide);
    });

    jQuery('')
});
