function removeInventoryItem(serial_num) {
    $.getJSON($SCRIPT_ROOT + '/removeInventoryItem', {
            serial_num: serial_num
        },
        function(data) {
            location.reload();
        });
}
