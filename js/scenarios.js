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

    /* Dynamically scale the font size of modal content based on the number of letters in the modal text */
//    $('.modal').each(function () {
//        var ln = $(this).text().length,
//            startSize = 36,
//            size = startSize - (ln/100*2);
//
//        $(this).css('font-size', Math.round(size))
//    });

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

    $('#dir-info-submit').on('click touchend', function () {
        var section = $(this).parents('section'),
            c4checked = section.find('#dir-info-4').is(':checked'),
            c5checked = section.find('#dir-info-5').is(':checked'),
            numChecked = section.find('.dir-info:checked').length,
            correctAnswersChecked = c4checked && c5checked && numChecked === 2;

        var modalId = correctAnswersChecked
            ? '#dir-info-correct-modal'
            : (c4checked || c5checked) && numChecked === 1
                ? '#dir-info-partially-correct-modal'
                : '#dir-info-incorrect-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !correctAnswersChecked);
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

        var allClicked = $(this).parent().children('li').length === $(this).parent().children('li.show').length,
            section = $(this).parents('section'),
            shouldShowNextButton = !$(this).parent().hasClass('no-next');

        if (shouldShowNextButton) {
            $(this).parents('section').children('.button').toggleClass('hide', !allClicked);
        }
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

    var recoupLeft, recoupTop;
    $('.drag-me').draggable({ revert: 'invalid' });

    $('#s6-caseworker').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 10);
            $(ui.draggable).css('left', $(this).position().left + 10);
            alert('Yes');
        }
    });
    $('#s6-file-cabinet').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 10);
            $(ui.draggable).css('left', $(this).position().left + 10);
            alert('No');
        }
    });

    $('.unhide').click(function(e) {
        e.preventDefault();

        var section = $(this).parents('section');

        section.find('.hide').show(500);
        $(this).unbind('click');
    });

    $('a.inc').click(function(e) {
        e.preventDefault();

        var inc = $(this).attr('href').replace('#', '.'),
            section = $(this).parents('section'),
            lastInc = section.find('a.inc').last(),
            isLast = lastInc.attr('href') == $(this).attr('href');

        section.find(inc).show(500);

        $(this).hide();
        $(this).parents('section').children('.button').toggleClass('hide', !isLast);
    });

    $('#release-info-submit').on('click touchend', function () {
        var section = $(this).parents('section'),
            allChecked = section.find('input[type="checkbox"]').length == section.find('input[type="checkbox"]:checked').length,
            numChecked = section.find('.release-info:checked').length;

        var modalId = allChecked
            ? '#release-info-correct-modal'
            : numChecked == 0
                ? '#release-info-incorrect-modal'
                : '#release-info-partially-correct-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !allChecked);
    });
});
