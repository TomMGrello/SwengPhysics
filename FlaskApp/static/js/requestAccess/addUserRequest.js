function addUserRequest(first_name, middle_name, last_name, banner_id, username, role, email) {
    $.getJSON($SCRIPT_ROOT + '/addUserRequest', {
            banner_id: banner_id,
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            user: username,
            role: role,
            email: email
        },
        function(data) {
            window.location = "$SCRIPT_ROOT + /";
        });
}
