USE physics;
-- get all users stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_users`()

BEGIN
SELECT first_name, middle_name, last_name, username FROM user;
END $$

DELIMITER ;