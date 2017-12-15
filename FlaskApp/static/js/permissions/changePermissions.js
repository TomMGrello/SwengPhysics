function changePermissions(banner_id, can_add_user, can_remove_user, can_modify_permissions, can_request_record, can_add_record, can_modify_record, can_remove_record, can_backup_database, can_restore_database) {
    $.getJSON($SCRIPT_ROOT + '/changePermissions', {
        banner_id: banner_id,
        can_add_user: can_add_user,
        can_remove_user: can_remove_user,
    		can_modify_permissions: can_modify_permissions,
    		can_request_record: can_request_record,
    		can_add_record: can_add_record,
    		can_modify_record: can_modify_record,
    		can_remove_record: can_remove_record,
    		can_backup_database: can_backup_database,
    		can_restore_database: can_restore_database
    },
    function(data) {
        location.reload();
    });
}
