function removeUser(banner_id) {
    $.getJSON('/removeUser', {
            banner_id: banner_id
        },
        function(data) {
            location.reload();
        });
}
