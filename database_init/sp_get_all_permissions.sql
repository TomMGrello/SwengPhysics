USE physicslab;
-- get all physicslab stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_permissions`()

BEGIN
SELECT * FROM  user_permissions;
END $$

DELIMITER ;
