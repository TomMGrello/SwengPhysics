function removeUser(banner_id) {
    $.getJSON($SCRIPT_ROOT + '/removeUser', {
            banner_id: banner_id
        },
        function(data) {
            location.reload();
        });
}
