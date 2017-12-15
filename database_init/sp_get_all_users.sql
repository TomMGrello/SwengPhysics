USE physics_lab;
-- get all physics_labtored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_users`()

BEGIN
SELECT * FROM user;
END $$

DELIMITER ;
