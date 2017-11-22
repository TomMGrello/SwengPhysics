$(function() {
    $.getJSON('/allUserPermissions', {},
        function(data) {
            console.log(data.result);
            var dataArray = data.result;
            for (var currUser = 0; currUser < dataArray.length; currUser++) {
                var currUserData = dataArray[currUser];
                var bannerId = currUserData[1];
                var permission1 = currUserData[2];
                var permission2 = currUserData[3];
                var permission3 = currUserData[4];
                var permission4 = currUserData[5];
                var permission5 = currUserData[6];
                var permission6 = currUserData[7];
                var permission7 = currUserData[8];
                var permission8 = currUserData[9];
                var permission9 = currUserData[10];

                /*console.log(bannerId);
                console.log(permission1);
                console.log(permission9);*/
            }
        });
    return false;
});
