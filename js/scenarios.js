jQuery(function() {
    jQuery('.open-modal').on('click touchend', function() {
        event.preventDefault();
        var $this = jQuery(this);
        $this.modal({fadeDuration:100,closeText:'OK'});

        if ($this.hasClass('correct')) {
            $this.parents('section').children('.button').removeClass('hide');
        }
    });

    /* Allow navigating directly to a slide using: <a class="goto" data-slide="4">Go to Slide 4</a> */
    jQuery('.goto').on('click touchend', function() {
        event.preventDefault();
        var slide = parseInt(jQuery(this).data('slide'));
        Dz.setSlide(slide);
    });

    /* Dynamically scale the font size of modal p tags based on the number of letters in the modal text */
    jQuery('.modal p').each(function () {
        var $this = jQuery(this),
            ln = $this.html().length,
            startSize = 30,
            size = startSize - (ln/100*2);

        $this.css('font-size', Math.round(size))
    });
});
