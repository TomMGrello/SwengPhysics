USE physics;
-- get all lab requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_courses`()

BEGIN
SELECT * FROM  course;
END $$

DELIMITER ;
