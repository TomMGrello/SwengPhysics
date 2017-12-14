USE physics;
-- get all subconcepts stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_subconcepts`(
  IN p_concept_id INT(36)
)

BEGIN
IF p_concept_id IS NOT NULL THEN
  SELECT * FROM subconcept WHERE concept_id=p_concept_id;
ELSE
  SELECT * FROM subconcept;
END IF;
END $$

DELIMITER ;
