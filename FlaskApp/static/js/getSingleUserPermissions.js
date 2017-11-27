//The permissions end point uses the banner_id stored in the session
//cookie to get the correct user permissions.
$(function() {
    $.getJSON('/permissions', {},
        function(data) {
            var banner_id = data.result[1];
            console.log(data.result);
            console.log("BANNER ID: " + banner_id);
        });
    return false;
});
