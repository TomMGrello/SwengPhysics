function modifyInventoryItem(serial_num, name, quantity, building) {
    $.getJSON('/modifyInventoryItem', {
            serial_num: serial_num,
            name: name,
            quantity: quantity,
            building: building
        },
        function(data) {
            location.reload();
        });
}
