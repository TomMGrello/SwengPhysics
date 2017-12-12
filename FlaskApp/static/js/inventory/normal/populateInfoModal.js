var populateInfoModal = function(button) {
    var tr = button.closest('tr');
    var serial_num = tr.id;
    window.sessionStorage.setItem('serial_num', serial_num);
    populateAssociatedInfoLabs();
    $.getJSON('/getItem', {
        serial_num: serial_num
    }, function(data) {
        console.log(data.result);
        var info_name = document.getElementById('info_name');
        var info_serial = document.getElementById('info_serial');
        var info_quantity = document.getElementById('info_quantity');
        var info_location = document.getElementById('info_location');
        var info_invoice_id = document.getElementById('info_invoice_id');
        var info_invoice_price = document.getElementById('info_invoice_price');
        var info_vendor_name = document.getElementById('info_vendor_name');
        var info_purchase_date = document.getElementById('info_purchase_date');


        var data_array = data.result;
        var item_data = data_array[0];

        var name = item_data[0];
        var quantity = item_data[1];
        var building = item_data[2];
        var room_num = item_data[3];
        var shelf = item_data[4];
        var invoice_id = item_data[5];
        var object_price = item_data[6];
        var vendor_name = item_data[7];
        var purchase_date = item_data[8];

        info_name.value = name;
        info_serial.value = serial_num;
        info_quantity.value = quantity;
        info_location.value = building + " " + room_num + " " + shelf;
        info_invoice_id.value = invoice_id;
        info_invoice_price.value = object_price;
        info_vendor_name.value = vendor_name;
        info_purchase_date.value = purchase_date;
    });
}
