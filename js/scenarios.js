jQuery(function() {
    jQuery('.open-modal').on('click touchend', function() {
        event.preventDefault();
        jQuery(this).modal({fadeDuration:100});
    });
});
