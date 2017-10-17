DELIMITER $$
CREATE PROCEDURE `sp_add_user` (
  IN p_user_id VARCHAR(36),
  IN p_first_name VARCHAR(45),
  IN p_middle_name VARCHAR(45),
  IN p_last_name VARCHAR(45),
  IN p_username VARCHAR(45),
  IN p_role VARCHAR(45),
  IN p_email VARCHAR(60)
)
BEGIN
  if (select exists (select 1 from user where username = p_username)) THEN
    select 'Username already exists';
  ELSE
    insert into user (
      user_id,
      first_name,
      middle_name,
      last_name,
      username,
      role,
      email
    ) values (
      p_user_id,
      p_first_name,
      p_middle_name,
      p_last_name,
      p_username,
      p_role,
      p_email
    );
  END IF;
END$$
DELIMITER ;
