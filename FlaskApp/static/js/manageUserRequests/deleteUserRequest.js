function deleteUserRequest(banner_id, role) {
    $.getJSON($SCRIPT_ROOT + '/deleteUserRequest', {
            banner_id: banner_id,
            role: role
        },
        function(data) {
            location.reload();
        });
}
