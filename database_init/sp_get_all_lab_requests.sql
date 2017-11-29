USE physics;
-- get all lab requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_lab_requests`()

BEGIN
SELECT * FROM  lab_requests;
END $$

DELIMITER ;