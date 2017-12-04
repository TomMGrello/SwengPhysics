USE physics;
-- get all object requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_object_requests`()

BEGIN
SELECT * FROM  object_requests;
END $$

DELIMITER ;