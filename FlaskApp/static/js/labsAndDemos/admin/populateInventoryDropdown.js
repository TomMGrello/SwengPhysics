var populateInventoryDropdown = function() {
    $.getJSON($SCRIPT_ROOT + '/getFilteredInventory', {},
        function(data) {
            var data_array = data.result;
            var select_serial = document.getElementById('addAllItems');
            select_serial.innerHTML = "";
            for (var curr_item = 0; curr_item < data_array.length; curr_item++) {
                var item = data_array[curr_item];
                var name = item[2];
                var serial_num = item[3];

                var new_opt = document.createElement('option');
                new_opt.text = name;
                new_opt.value = serial_num;
                select_serial.appendChild(new_opt);
            }
        });
}
