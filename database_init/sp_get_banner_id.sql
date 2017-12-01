USE physics;
DELIMITER $$
CREATE PROCEDURE `sp_get_banner_id` (
  IN p_username VARCHAR(45)
)
BEGIN
if (select exists (select 1 from banner_ids where username = p_username)) THEN
    select banner_id from banner_ids where username = p_username;
  ELSE
    select 'Username not found';
  END IF;
END$$
DELIMITER ;
