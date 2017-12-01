var getUserPermissions = function() {
    $.getJSON('/getAllUsers', function(data){
        var data_array = data.result;
        console.log(data_array);
        var table = document.getElementById('tablebody');
        for (var curr_item = 0; curr_item < data_array.length; curr_item++) {
            
        }
    });
    $.getJSON('/allUserPermissions', function(data){
        var data_array = data.result;
        console.log(data_array);
    });
}
