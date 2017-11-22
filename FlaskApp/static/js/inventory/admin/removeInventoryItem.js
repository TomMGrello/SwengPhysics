function removeInventoryItem(serial_num) {
    $.getJSON('/removeInventoryItem', {
            serial_num: serial_num
        },
        function(data) {
            location.reload();
        });
}
