$(function() {
    $('#signout').click(function() {
        $.getJSON($SCRIPT_ROOT + '/signout', {},
            function(data) {
                window.location = $SCRIPT_ROOT + "/";
            });
        return false;
    });
});
