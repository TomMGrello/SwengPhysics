USE physics_lab;

DELIMITER $$
CREATE PROCEDURE `sp_get_all_locations_by_type`(
  IN p_type VARCHAR(10)
)

BEGIN
SELECT * FROM  location
WHERE type = p_type;
END $$

DELIMITER ;
