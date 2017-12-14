var populateRequiredInfoItems = function(button) {
    var lab_id = window.sessionStorage.getItem('lab_id');

    $.getJSON($SCRIPT_ROOT + '/getLabItems', {
        lab_id: lab_id
    }, function(data) {
        console.log(data.result);
        var info_current_items = document.getElementById('info_required_items');
        info_current_items.innerHTML = "";
        var data_array = data.result;

        for (var i = 0; i < data_array.length; i++) {
            var curr_item = data_array[i];
            console.log(curr_item);
            var new_opt = document.createElement('option');
            new_opt.text = curr_item[3] + " x " + curr_item[6];
            info_current_items.appendChild(new_opt);
        }
    });
}
