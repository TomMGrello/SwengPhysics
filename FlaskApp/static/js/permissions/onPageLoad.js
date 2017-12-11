$(function() {
    getUserPermissions();
    document.getElementById('remove_btn').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredInventoryAdmin();
    });
    return false;
});
