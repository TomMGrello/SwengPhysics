var populateEditModal = function(button) {
    var tr = button.closest('tr');
    var serial_num = tr.id;
    window.sessionStorage.setItem('serial_num', serial_num);
    $.getJSON($SCRIPT_ROOT + '/getItem', {
        serial_num: serial_num
    }, function(data) {
        var modify_name = document.getElementById('modify_name');
        var modify_serial = document.getElementById('modify_serial');
        var modify_quantity = document.getElementById('modify_quantity');
        var modify_location = document.getElementById('modify_location');
        var modify_invoice_id = document.getElementById('modify_invoice_id');
        var modify_invoice_price = document.getElementById('modify_price');
        var modify_shelf = document.getElementById('modify_shelf');



        var data_array = data.result;
        var item_data = data_array[0];

        var name = item_data[0];
        var quantity = item_data[1];
        var building = item_data[2];
        var room_num = item_data[3];
        var shelf = item_data[4];
        var invoice_id = item_data[5];
        var object_price = item_data[6];

        modify_name.value = name;
        modify_serial.value = serial_num;
        modify_quantity.value = quantity;
        modify_invoice_id.value = invoice_id;
        modify_invoice_price.value = object_price;
        modify_shelf.value = shelf;

        for(var i = 0; i < modify_location.options.length; i++){
          if(modify_location.options[i].value === (building + " " + room_num)){
            modify_location.selectedIndex = i;
          }
        }

    });
}
