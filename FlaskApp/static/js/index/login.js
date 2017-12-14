$(function() {
    $('#signin').click(function() {
        if (!($('#usernameInput').val())) {
            window.reload();
        }
        $.getJSON($SCRIPT_ROOT + '/login', {
                user: $('#usernameInput').val()
            },
            function(data) {
                if (data.result === "DB_BANNER_ERROR") {
                    window.location = $SCRIPT_ROOT + "/requestAccess";
                } else {
                    window.location = $SCRIPT_ROOT + "/inventory";
                }
            });
        return false;
    });
});
