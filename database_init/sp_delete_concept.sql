USE physicslab;
-- delete concept stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_delete_concept`(
    IN p_concept_id INT(36)
)

BEGIN
	DELETE FROM concept WHERE (concept_id = p_concept_id);
  commit;
END $$

DELIMITER ;
