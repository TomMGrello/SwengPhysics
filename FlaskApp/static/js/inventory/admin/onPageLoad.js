$(function() {
    getFilteredInventoryAdmin(null);
    document.getElementById('btn_filter').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredInventoryAdmin(null);
    });
    document.getElementById('btn_search').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredInventoryAdmin(null);
    });
    document.getElementById('th_serial').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredInventoryAdmin("serial");
    });
    document.getElementById('th_name').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredInventoryAdmin("name");
    });
    document.getElementById('th_quantity').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredInventoryAdmin("quantity");
    });
    document.getElementById('th_location').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredInventoryAdmin("location");
    });
    document.getElementById('th_shelf').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredInventoryAdmin("shelf");
    });
    document.getElementById('th_vendor').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredInventoryAdmin("vendor");
    });
    document.getElementById('remove_btn').addEventListener('click', function() {
        removeInventoryItem(window.sessionStorage.getItem('serial_num_to_remove'));
    });
    document.getElementById('add_item_submit').addEventListener('click', function() {
        addInventoryItem(document.getElementById('add_name').value, document.getElementById('add_serial').value, document.getElementById('add_invoice_id').value, document.getElementById('add_purchase_date').value, document.getElementById('add_price').value, document.getElementById('add_vendor').value, document.getElementById('add_building').value, document.getElementById('add_room_number').value, document.getElementById('add_shelf').value, document.getElementById('add_quantity').value);
    });
    document.getElementById('add_item_submit').addEventListener('click', function() {
        modifyInventoryItem(document.getElementById('add_name').value, document.getElementById('add_serial').value, document.getElementById('add_invoice_id').value, document.getElementById('add_purchase_date').value, document.getElementById('add_price').value, document.getElementById('add_vendor').value, document.getElementById('add_building').value, document.getElementById('add_room_number').value, document.getElementById('add_shelf').value, document.getElementById('add_quantity').value);
    });
    return false;
});
