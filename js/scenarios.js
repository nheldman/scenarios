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

    $('.checkbox-list.require-all-checked td').on('click touchend', function () {
        var section = $(this).parents('section'),
            allChecked = section.find('input[type="checkbox"]').length == section.find('input[type="checkbox"]:checked').length,
            modal = section.find('.modal.all-checked');

        section.children('.button').toggleClass('hide', !allChecked);

        if (allChecked && modal) {
            modal.modal({fadeDuration: 100, closeText: 'OK'});
        }
    });

    $('.obtain-records').on('click touchend', function () {
        var id = $(this).attr('id');
        var allChecked = $('.obtain-records').length == $('.obtain-records:checked').length;

        $(this).parents('section').children('.button').toggleClass('hide', !allChecked);

        if ($(this).is(':checked')) {
            $('#' + id + '-modal').modal({fadeDuration: 100, closeText: 'OK'});
        }
    });

    $('#signed-auth-1').on('click touchend', function() {
        if ($(this).is(':checked')) {
            $(this).prop('checked', false);
            $('#s10-incorrect').modal({fadeDuration: 100, closeText: 'OK'});
        }
    });

    $('#signed-auth-2').on('click touchend', function() {
        if ($(this).is(':checked')) {
            Dz.setSlide(11);
        }
    });

    $('.hospital-response').on('click touchend', function() {
        var id = $(this).attr('id'),
            bestAnswerChecked = id === 'hospital-response-4';

        $(this).parents('section').children('.button').toggleClass('hide', !bestAnswerChecked);

        if ($(this).is(':checked')) {
            $('#' + id + '-modal').modal({fadeDuration: 100, closeText: 'OK'});
        }

        if (!bestAnswerChecked) {
            $(this).prop('checked', false);
        }
    });

    $('ul.reveal li, ul.reveal-list li').on('click touchend', function () {
        $(this).addClass('show');

        var allClicked = $(this).parent().children('li').length === $(this).parent().children('li.show').length;

        $(this).parents('section').children('.button').toggleClass('hide', !allClicked);
    });

    $('.fill-in-the-blank').change(function() {
        var id = $(this).val(),
            section = $(this).parents('section'),
            allCorrectChoicesSelected = !(section.find('select>option:selected').filter(function () { return $(this).val() !== 'correct'; }).length > 0),
            sectionId = section.attr('id'),
            hasModal = section.find('.modal'),
            allAnswersProvided = section.find('select>option:selected').filter(function () { return $(this).val() === ''; }).length === 0,
            correctHtml = '<div class="correct answer">Correct!</div>',
            incorrectHtml = '<div class="incorrect answer">Incorrect, please try again</div>';

        section.children('.button').toggleClass('hide', !allCorrectChoicesSelected);

        section.children('.answer').remove();

        if (allAnswersProvided) {
            var html = allCorrectChoicesSelected ? correctHtml : incorrectHtml;
            section.append(html);
        }

        if (allCorrectChoicesSelected && hasModal) {
            $('#' + sectionId + '-' + id + '-modal').modal({fadeDuration: 100, closeText: 'OK'});
        }
    });
});
