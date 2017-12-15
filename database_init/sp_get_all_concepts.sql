USE physicslab;
-- get all concepts stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_concepts`()

BEGIN
SELECT * FROM  concept;
END $$

DELIMITER ;
