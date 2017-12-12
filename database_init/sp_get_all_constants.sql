USE physics;
DELIMITER $$
CREATE PROCEDURE `sp_get_all_courses`()

BEGIN
SELECT * FROM  constants;
END $$

DELIMITER ;
