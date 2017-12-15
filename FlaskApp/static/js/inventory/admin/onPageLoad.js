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
    document.getElementById('add_item_submit').addEventListener('click', function(e) {
        e.preventDefault();
        var location_select = document.getElementById('add_location');
        var selected_location = location_select.options[location_select.selectedIndex].value;
        addInventoryItem(document.getElementById('add_name').value, document.getElementById('add_serial').value, document.getElementById('add_invoice_id').value, document.getElementById('add_purchase_date').value, document.getElementById('add_price').value, document.getElementById('add_vendor').value, selected_location, document.getElementById('add_shelf').value, document.getElementById('add_quantity').value);
    });
    document.getElementById('update_btn').addEventListener('click', function() {
        var location_select = document.getElementById('modify_location');
        var selected_location = location_select.options[location_select.selectedIndex].value;
        modifyInventoryItem(document.getElementById('modify_name').value, document.getElementById('modify_serial').value, document.getElementById('modify_invoice_id').value, document.getElementById('modify_price').value, selected_location, document.getElementById('modify_shelf').value, document.getElementById('modify_quantity').value);
    });
    document.getElementById('signout').addEventListener('click', function() {
        signout();
    });
    populateInventoryLocations();
    populateLocations();
    return false;
});
