jQuery(function() {
    var $ = jQuery;

    $('.open-modal').on('click touchend', function() {
        event.preventDefault();
        $(this).modal({fadeDuration:100,closeText:'OK'});

        if ($(this).hasClass('correct')) {
            $(this).parents('section').children('.button').removeClass('hide');
        }
    });

    /* Allow navigating directly to a slide using: <a class="goto" data-slide="4">Go to Slide 4</a> */
    $('.goto').on('click touchend', function() {
        event.preventDefault();
        var slide = parseInt($(this).data('slide'));
        Dz.setSlide(slide);
    });

    /* Dynamically scale the font size of modal p tags based on the number of letters in the modal text */
    $('.modal p').each(function () {
        var ln = $(this).html().length,
            startSize = 30,
            size = startSize - (ln/100*2);

        $(this).css('font-size', Math.round(size))
    });

    $('#hipaa-auth-7').on('click touchend', function() {
        if ($(this).is(':checked')) {
            $('#s5-signature-info-modal').modal({fadeDuration: 100, closeText: 'OK'});
        }
    });

    $('.hipaa-auth').on('click touchend', function() {
        var allChecked = $('.hipaa-auth').length == $('.hipaa-auth:checked').length;

        $(this).parents('section').children('.button').toggleClass('hide', !allChecked);
    });
});
