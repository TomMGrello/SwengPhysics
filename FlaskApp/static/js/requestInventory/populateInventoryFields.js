var populateInventoryFields = function() {
    var serial_num = window.sessionStorage.getItem('serial_num');
    $.getJSON('/getItem', {
        serial_num: serial_num
    }, function(data) {
        console.log(data.result);
        var inventory = document.getElementById('inventory');
        var data_array = data.result;
        var inventory_data = data_array[0];

        inventory.value = inventory_data[2];
    });
}
