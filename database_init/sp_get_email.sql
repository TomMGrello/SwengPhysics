USE physics;
DELIMITER $$
CREATE PROCEDURE `sp_get_email` (
  IN p_banner_id int(9)
)
BEGIN
if (select exists (select 1 from user where banner_id = p_banner_id)) THEN
    select email from user where banner_id = p_banner_id;
  ELSE
    select 'Email not found';
  END IF;
END$$
DELIMITER ;
