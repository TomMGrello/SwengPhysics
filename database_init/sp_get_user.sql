USE permissions;
DELIMITER $$
CREATE PROCEDURE `sp_get_user` (
  IN p_username VARCHAR(45)
)
BEGIN
  if (select exists (select 1 from user where username = p_username)) THEN
    select * from user where username = p_username;
  ELSE
    select 'Username not found';
  END IF;
END$$
DELIMITER ;
