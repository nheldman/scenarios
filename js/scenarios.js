jQuery(function() {
    var $ = jQuery;

    $('.open-modal').on('click touchend', function(e) {
        e.preventDefault();
        $(this).modal({fadeDuration:100,clickClose:true});

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

    $('.button.require-all-checked').on('click touchend', function () {
        var section = $(this).parents('section'),
            numCheckboxes = section.find('input[type="checkbox"]').length,
            numChecked = section.find('input[type="checkbox"]:checked').length,
            allChecked = numCheckboxes === numChecked,
            modal = allChecked
                ? section.find('.modal.correct')
                : numChecked > 0
                    ? section.find('.modal.partially-correct')
                    : section.find('.modal.incorrect');

        section.children('.button').toggleClass('hide', !allChecked);

        modal.modal({fadeDuration: 100, closeText: 'OK'});
    });

    $('#obtain-records').on('click touchend', function () {
        var section = $(this).parents('section'),
            allChecked = section.find('.obtain-records').length == section.find('.obtain-records:checked').length,
            obtainRecords1Checked = section.find('#obtain-records-1').is(':checked'),
            obtainRecords2Checked = section.find('#obtain-records-2').is(':checked');

        $(this).parents('section').children('.button').toggleClass('hide', !allChecked);

        var modalId = allChecked
            ? '#obtain-records-1-modal'
            : obtainRecords1Checked && !obtainRecords2Checked
                ? '#obtain-records-2-modal'
                : obtainRecords2Checked && !obtainRecords1Checked
                    ? '#obtain-records-3-modal'
                    : '#obtain-records-4-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});
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

    $('#signed-auth').on('click touchend', function () {
        var section = $(this).parents('section'),
            signedAuth1Checked = section.find('#signed-auth-1').is(':checked'),
            signedAuth2Checked = section.find('#signed-auth-2').is(':checked'),
            isCorrect = signedAuth2Checked && !signedAuth1Checked,
            isIncorrect = signedAuth1Checked && !signedAuth2Checked;

        var modalId = isCorrect
            ? '#signed-auth-correct-modal'
            : isIncorrect
                ? '#signed-auth-incorrect-modal'
                : '#signed-auth-incorrect2-modal';

        if (isIncorrect) {
            section.find('#signed-auth-1').prop('checked', false);
        }

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !isCorrect);
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

    $('ul.person-list li').on('click touchend', function () {
        $(this).addClass('show-pic');
        $(this).children('img').removeClass('hide');

        var allClicked = $(this).parent().children('li').length === $(this).parent().children('li.show-pic').length,
            section = $(this).parents('section');

        if (allClicked) {
            $(this).parents('section').find('#show-caseworker').removeClass('hide');
            $(this).parent().children('li.fade').css({opacity: 0.5});
        }

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

    var recoupLeft, recoupTop;
    $('.drag-me').draggable({ revert: 'invalid' });

    $('#s5-caseworker').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 60);
            $(ui.draggable).css('left', $(this).position().left - 30);
            $('#s5-a').modal('open');
            $(this).parents('section').children('.button').removeClass('hide');
        }
    });
    $('#s5-file-cabinet').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('bottom', $(this).position().bottom + 10);
            $(ui.draggable).css('left', $(this).position().left + 10);
            $('#s5-b').modal('open');
        }
    });

    $('#s9-rtf').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 110);
            $(ui.draggable).css('left', $(this).position().left + 120);
            $('#s9-a').modal('open');
            $(this).parents('section').children('.button').removeClass('hide');
        }
    });

    $('#s9-table').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 20);
            $(ui.draggable).css('left', $(this).position().left + 80);
            $('#s9-b').modal('open');
        }
    });

    $('.unhide').click(function(e) {
        e.preventDefault();

        var section = $(this).parents('section');

        section.find('.hide').show(500);
        $(this).unbind('click');
    });

    $('a.inc').on('click touchend', function(e) {
        e.preventDefault();

        var inc = $(this).attr('href').replace('#', '.'),
            section = $(this).parents('section'),
            lastInc = section.find('a.inc').last(),
            isLast = lastInc.attr('href') == $(this).attr('href');

        section.find(inc).show(500);

        $(this).hide();

        if (!$(this).hasClass('no-next')) {
            $(this).parents('section').children('.button').toggleClass('hide', !isLast);
        }
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

    $('#release-ed-rec-submit').on('click touchend', function () {
        var section = $(this).parents('section'),
            allChecked = section.find('input[type="checkbox"]').length == section.find('input[type="checkbox"]:checked').length,
            numChecked = section.find('.release-ed-rec:checked').length;

        var modalId = allChecked
            ? '#release-ed-rec-correct-modal'
            : numChecked == 0
                ? '#release-ed-rec-incorrect-modal'
                : '#release-ed-rec-partially-correct-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !allChecked);
    });

    $('#release-ed-rec2-submit').on('click touchend', function () {
        var section = $(this).parents('section'),
            allChecked = section.find('input[type="checkbox"]').length == section.find('input[type="checkbox"]:checked').length,
            numChecked = section.find('.release-ed-rec2:checked').length;

        var modalId = allChecked
            ? '#release-ed-rec2-correct-modal'
            : numChecked == 0
            ? '#release-ed-rec2-incorrect-modal'
            : '#release-ed-rec2-partially-correct-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !allChecked);
    });

    $('.show-click-text').on('click touchend', function() {
        var section = $(this).parents('section'),
            id = $(this).data('id'),
            clickTextDivs = section.find('.click-text div, .click-text-side div'),
            images = section.find('li img');

        images.css({ opacity: 0.5 });
        $(this).css({ opacity: 1.0 });
        clickTextDivs.hide();
        $('#' + id).show();
    });

    $('#dir-info2-submit').on('click touchend', function () {
        var section = $(this).parents('section'),
            c1checked = section.find('#dir-info2-1').is(':checked'),
            c2checked = section.find('#dir-info2-2').is(':checked'),
            c3checked = section.find('#dir-info2-3').is(':checked'),
            c4checked = section.find('#dir-info2-4').is(':checked'),
            c5checked = section.find('#dir-info2-5').is(':checked'),
            numChecked = section.find('.dir-info2:checked').length,
            correctAnswersChecked = c2checked && c3checked && c4checked && c5checked && numChecked === 4;

        var modalId = correctAnswersChecked
            ? '#dir-info2-correct-modal'
            : numChecked === 0
            ? '#dir-info2-none-modal'
            : !c1checked
            ? '#dir-info2-partially-correct-modal'
            : '#dir-info2-incorrect-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !correctAnswersChecked);
    });

    $('#s6-file-cabinet').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('bottom', $(this).position().bottom + 10);
            $(ui.draggable).css('left', $(this).position().left + 10);
            $('#s6-a').modal('open');
            $(this).parents('section').children('.button').removeClass('hide');
        }
    });

    $('#s6-sheriff').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 60);
            $(ui.draggable).css('left', $(this).position().left - 30);
            $('#s6-b').modal('open');
        }
    });

    $('#s7-file-cabinet').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('bottom', $(this).position().bottom + 10);
            $(ui.draggable).css('left', $(this).position().left + 10);
            $('#s7-a').modal('open');
            $(this).parents('section').children('.button').removeClass('hide');
        }
    });

    $('#s7-sheriff').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 60);
            $(ui.draggable).css('left', $(this).position().left - 30);
            $('#s7-b').modal('open');
        }
    });

    $('.button, .button-back').on('click touchend', function () {
        var iframe = $('iframe.movie');

        if (iframe) {
            var player = iframe[0];
            player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });

    $('.iframe-link').on('click touchend', function (e) {
        e.preventDefault();

        var uri = $(this).attr('href');
        var topUri = window.top.location.href;
        
        if (topUri.indexOf('fiu.blackboard.com') >= 0) {
            uri = 'https://fiu.blackboard.com/webapps/blackboard/content/listContentEditable.jsp?content_id=_3718346_1&course_id=_66860_1&mode=cpview';
        }
        
        window.top.location.href = uri;
    });
});
