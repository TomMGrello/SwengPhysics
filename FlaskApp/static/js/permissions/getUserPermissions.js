var getUserPermissions = function() {
    $.getJSON('/getAllUsers', function(data){
        var data_array = data.result;
        console.log(data_array);
        var table = document.getElementById('tablebody');

    });
    $.getJSON('/allUserPermissions', function(data){
        var data_array = data.result;
        console.log(data_array);
    });
}
