var addItemToLab = function() {
    var quantity = document.getElementById('addItemQuantity').value;
    var select_serial = document.getElementById('addAllItems');
    var serial_num = select_serial.options[select_serial.selectedIndex].value.toLowerCase();
    var lab_id = window.sessionStorage.getItem('lab_id');
    $.getJSON('/addItemToLab', {
        lab_id: lab_id,
        quantity: quantity,
        serial_num: serial_num
    }, function(data) {
        alert("Item added to lab");
        return false;
    });

}
