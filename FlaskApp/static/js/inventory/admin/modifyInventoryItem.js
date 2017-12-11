function modifyInventoryItem(name, serial_num, invoice_id, price, location_id, shelf, quantity) {
    $.getJSON('/modifyInventoryItem', {
            name: name,
            serial_num: serial_num,
            invoice_id: invoice_id,
            price: price,
            location_id:location_id,
            shelf: shelf,
            quantity: quantity
        },
        function(data) {
            location.reload();
        });
}
