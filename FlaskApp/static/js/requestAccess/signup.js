$(function() {

$.getJSON($SCRIPT_ROOT + '/getStoredUsername', {},
            function(data) {
		document.getElementById("inputUsername").value = data.username;
            });


    $('#signup').click(function() {
        var first_name = document.getElementById("inputFirstName").value;
        var middle_name = document.getElementById("inputMiddleName").value;
        var last_name = document.getElementById("inputLastName").value;
        var username = document.getElementById("inputUsername").value;
        var roleSelect = document.getElementById("inputRole")
        var role = roleSelect.options[roleSelect.selectedIndex].value;
        var banner_id = document.getElementById("inputBannerId").value;
        var email = document.getElementById("inputEmail").value;
        var myjson = {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            username: username,
            banner_id: banner_id,
            role: role,
            email: email
        };
        console.log(myjson);
        $.getJSON($SCRIPT_ROOT + '/addUserRequest', {
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                username: username,
                banner_id: banner_id,
                role: role,
                email: email
            },
            function(data) {
		alert("Your request has been added");
                window.location = $SCRIPT_ROOT + '/signout';
            });
        return false;
    });
});
