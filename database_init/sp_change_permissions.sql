USE permissions;
DELIMITER $$
CREATE PROCEDURE `sp_change_permissions` (
  IN p_banner_id INT(9),
  IN p_can_add_user BOOLEAN,
  IN p_can_remove_user BOOLEAN,
  IN p_can_modify_permissions BOOLEAN,
  IN p_can_request_record BOOLEAN,
  IN p_can_add_record BOOLEAN,
  IN p_can_remove_record BOOLEAN,
  IN p_can_modify_record BOOLEAN,
  IN p_can_backup_database BOOLEAN,
  IN p_can_restore_database BOOLEAN
)
BEGIN


if (select exists (select 1 from banner_ids where banner_id = p_banner_id)) THEN
    REPLACE into user_permissions (
      banner_id,
      can_add_user,
      can_remove_user,
      can_modify_permissions,
      can_request_record,
      can_add_record,
      can_remove_record,
      can_modify_record,
      can_backup_database,
      can_restore_database
    ) values (
      p_banner_id,
      p_can_add_user,
      p_can_remove_user,
      p_can_modify_permissions,
      p_can_request_record,
      p_can_add_record,
      p_can_remove_record,
      p_can_modify_record,
      p_can_backup_database,
      p_can_restore_database
    );
  ELSE
    select 'Username not found';
  END IF;
END$$
DELIMITER ;
