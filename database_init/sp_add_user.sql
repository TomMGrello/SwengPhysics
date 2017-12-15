USE physics_lab;
DELIMITER $$
CREATE PROCEDURE `sp_add_user` (
  IN p_banner_id int(9),
  IN p_first_name VARCHAR(45),
  IN p_middle_name VARCHAR(45),
  IN p_last_name VARCHAR(45),
  IN p_username VARCHAR(45),
  IN p_role VARCHAR(45),
  IN p_email VARCHAR(60)
)
BEGIN
  if (select exists (select 1 from banner_ids where banner_id = p_banner_id)) THEN
    select 'Username already exists';
  ELSE
    REPLACE into user (
      banner_id,
      first_name,
      middle_name,
      last_name,
      username,
      role,
      email
    ) values (
      p_banner_id,
      p_first_name,
      p_middle_name,
      p_last_name,
      p_username,
      p_role,
      p_email
    );

    REPLACE into banner_ids (
      banner_id,
      username
    ) values (
      p_banner_id,
      p_username
    );

    select 'SUCCESS';
    commit;
  END IF;
END$$
DELIMITER ;
