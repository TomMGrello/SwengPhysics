USE physics_lab;
-- get all physics stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_user_requests`()

BEGIN
SELECT * FROM  user_requests;
END $$

DELIMITER ;
