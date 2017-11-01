USE permissions;
-- get all permissions stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_permissions`()

BEGIN 
SELECT * FROM  user_permissions;
END $$

DELIMITER ;