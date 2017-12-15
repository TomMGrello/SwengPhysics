$(function() {
    $('#signout').click(function() {
        $.getJSON($SCRIPT_ROOT + '/signout', {},
            function(data) {
                window.location = "/";
            });
        return false;
    });
});
