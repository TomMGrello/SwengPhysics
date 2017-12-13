USE physics;
-- delete subconcept stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_delete_subconcept`(
    IN p_subconcept_id INT(36)
)

BEGIN
	DELETE FROM subconcept WHERE ( subconcept_id = p_subconcept_id);
  commit;
END $$

DELIMITER ;
