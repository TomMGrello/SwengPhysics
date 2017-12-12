$(function() {
    getUserPermissions();
    document.getElementById('remove_btn').addEventListener('click', function(e) {
        e.preventDefault();
        removeUser(window.sessionStorage.getItem('banner_id_to_remove'));
    });
    document.getElementById('update_btn').addEventListener('click', function(e) {
        e.preventDefault();
        var perm1 = 0;
        var perm2 = 0;
        var perm3 = 0;
        var perm4 = 0;
        var perm5 = 0;
        var perm6 = 0;
        var perm7 = 0;
        var perm8 = 0;
        var perm9 = 0;
        var perm10 = 0;
        if (document.getElementById('accept_user_check').checked == true) {
            perm1 = 1;
        }
        if (document.getElementById('remove_user_check').checked == true) {
            perm2 = 1;
        }
        if (document.getElementById('modify_permissions_check').checked == true) {
            perm3 = 1;
        }
        if (document.getElementById('request_equipment_check').checked == true) {
            perm4 = 1;
        }
        if (document.getElementById('add_inventory_check').checked == true) {
            perm5 = 1;
        }
        if (document.getElementById('remove_inventory_check').checked == true) {
            perm6 = 1;
        }
        if (document.getElementById('modify_inventory_check').checked == true) {
            perm7 = 1;
        }
        if (document.getElementById('backup_database_check').checked == true) {
            perm8 = 1;
        }
        if (document.getElementById('restore_database_check').checked == true) {
            perm9 = 1;
        }
        changePermissions(window.sessionStorage.getItem('banner_id_to_modify'), perm1, perm2, perm3, perm4, perm5, perm6, perm7, perm8, perm9);
    });
    return false;
});
