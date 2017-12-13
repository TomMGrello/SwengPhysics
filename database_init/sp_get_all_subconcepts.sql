USE physics;
-- get all subconcepts stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_subconcepts`()

BEGIN
SELECT * FROM subconcept;
END $$

DELIMITER ;
