USE physicslab;
-- get all physicslabtored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_users`()

BEGIN
SELECT * FROM user;
END $$

DELIMITER ;
