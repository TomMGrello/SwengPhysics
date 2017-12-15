USE physics_lab;
DELIMITER $$
CREATE PROCEDURE `sp_get_all_constants`()

BEGIN
SELECT * FROM  constants;
END $$

DELIMITER ;
