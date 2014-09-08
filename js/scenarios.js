jQuery(function() {
    jQuery('.open-modal').click(function() {
        event.preventDefault();
        jQuery('#s4-incorrect').modal({fadeDuration:100});
    });
});
