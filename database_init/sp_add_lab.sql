USE physics;
-- add user request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_lab`(
  IN p_type VARCHAR(10),
  IN p_name VARCHAR(60),
  IN p_topic VARCHAR(30),
  IN p_concept VARCHAR(30),
  IN p_subconcept VARCHAR(30),
  IN p_lab_id INT(36)
)

BEGIN
  IF (p_lab_id is NULL) THEN
  	REPLACE into lab_demo (
      type,
      name,
      topic,
      concept,
      subconcept
    ) values (
      p_type,
      p_name,
      p_topic,
      p_concept,
      p_subconcept
    );
    SELECT LAST_INSERT_ID();
  ELSE

    DELETE from lab_demo where lab_id=p_lab_id;
    REPLACE into lab_demo (
      lab_id,
      type,
      name,
      topic,
      concept,
      subconcept
    ) values (
      p_lab_id,
      p_type,
      p_name,
      p_topic,
      p_concept,
      p_subconcept
    );
    SELECT p_lab_id;
    END IF;
  commit;

END $$

DELIMITER ;
