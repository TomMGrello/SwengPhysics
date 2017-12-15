USE physicslab;
-- delete subconcept stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_remove_subconcepts_by_concept`(
    IN p_concept_id INT(36)
)

BEGIN
	DELETE FROM subconcept WHERE ( concept_id = p_concept_id);
  commit;
END $$

DELIMITER ;
