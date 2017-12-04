var populateRequiredItems = function(button) {
    var lab_id = window.sessionStorage.getItem('lab_id');

    $.getJSON('/getLabItems', {
        lab_id: lab_id
    }, function(data) {
        console.log(data.result);
        var add_current_items = document.getElementById('addCurrentItems');
        add_current_items.innerHTML = "";
        var data_array = data.result;

        for (var i = 0; i < data_array.length; i++) {
            var curr_item = data_array[i];
            var new_opt = document.createElement('option');
            new_opt.text = curr_item[3] + " x " + curr_item[6];
            add_current_items.appendChild(new_opt);
        }

        populateInventoryDropdown();

    });
}
