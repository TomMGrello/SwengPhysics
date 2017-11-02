USE permissions;
-- delete user request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_delete_user_request`(
    IN p_banner_id int(9),
    IN p_role VARCHAR(45)
)

BEGIN
	DELETE FROM user_requests WHERE (banner_id = p_banner_id and role = p_role);
  commit;
END $$

DELIMITER ;
