function addInventoryItem(name, serial_num, invoice_id, purchase_date, price, vendor_name, location_id, shelf, quantity) {
    $.getJSON($SCRIPT_ROOT + '/addInventoryItem', {
            name: name,
            serial_num: serial_num,
            invoice_id: invoice_id,
            purchase_date: purchase_date,
            price: price,
            vendor_name: vendor_name,
            location_id:location_id,
            shelf: shelf,
            quantity: quantity
        },
        function(data) {
            location.reload();
        });
}
