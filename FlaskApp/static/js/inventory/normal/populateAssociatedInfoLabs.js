var populateAssociatedInfoLabs = function() {
    var serial_num = window.sessionStorage.getItem('serial_num');

    $.getJSON('/getAssociatedLabs', {
        serial_num: serial_num
    }, function(data) {
        var info_associated_labs = document.getElementById('info_associated_labs');
        info_associated_labs.innerHTML = "";
        var data_array = data.result;

        for (var i = 0; i < data_array.length; i++) {
            var curr_lab = data_array[i];
            var new_opt = document.createElement('option');
            new_opt.text = curr_lab[1] + " used in " + curr_lab[2] + " with ID " + curr_lab[0];
            info_associated_labs.appendChild(new_opt);
        }
    });
}
