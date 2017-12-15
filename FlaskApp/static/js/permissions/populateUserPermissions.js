var populateUserPermissions = function(button) {
    var tr = button.closest('tr');
    var banner_id = tr.cells[2].innerHTML;
    $.getJSON($SCRIPT_ROOT + '/getUser', {
      banner_id: banner_id
    },
    function(data){
      var data_array = data.result;
      var user_perms = data_array[0];
      window.sessionStorage.setItem('banner_id_to_modify', banner_id);
      if (user_perms[2] == true) {
        document.getElementById('accept_user_check').checked = true;
      } else {
        document.getElementById('accept_user_check').checked = false;
      }
      if (user_perms[3] == true) {
        document.getElementById('remove_user_check').checked = true;
      } else {
        document.getElementById('remove_user_check').checked = false;
      }
      if (user_perms[4] == true) {
        document.getElementById('modify_permissions_check').checked = true;
      } else {
        document.getElementById('modify_permissions_check').checked = false;
      }
      if (user_perms[5] == true) {
        document.getElementById('request_equipment_check').checked = true;
      } else {
        document.getElementById('request_equipment_check').checked = false;
      }
      if (user_perms[6] == true) {
        document.getElementById('add_inventory_check').checked = true;
      } else {
        document.getElementById('add_inventory_check').checked = false;
      }
      if (user_perms[7] == true) {
        document.getElementById('remove_inventory_check').checked = true;
      } else {
        document.getElementById('remove_inventory_check').checked = false;
      }
      if (user_perms[8] == true) {
        document.getElementById('modify_inventory_check').checked = true;
      } else {
        document.getElementById('modify_inventory_check').checked = false;
      }
      if (user_perms[9] == true) {
        document.getElementById('backup_database_check').checked = true;
      } else {
        document.getElementById('backup_database_check').checked = false;
      }
      if (user_perms[10] == true) {
        document.getElementById('restore_database_check').checked = true;
      } else {
        document.getElementById('restore_database_check').checked = false;
      }
    });
};
