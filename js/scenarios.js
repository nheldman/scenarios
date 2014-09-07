jQuery(function() {
    jQuery('.m2-s1-4', '.m2-s1-5', '.m2-s1-6', '.m2-s1-7').click(function() {
        event.preventDefault();
        jQuery(this).modal({fadeDuration:100});
    });
});
