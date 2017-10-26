USE permissions;
DELIMITER $$
CREATE PROCEDURE `sp_get_permissions` (
  IN p_banner_id INT(9)
)
BEGIN
if (select exists (select 1 from banner_ids where banner_id = p_banner_id)) THEN
    select * from user_permissions where banner_id = p_banner_id;
  ELSE
    select 'Username not found';
  END IF;
END$$
DELIMITER ;
