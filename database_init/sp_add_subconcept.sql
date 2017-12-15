USE physics_lab;
-- add subconcept stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_subconcept`(
  IN p_name VARCHAR(80),
  IN p_concept_id INT(36)
)

BEGIN
REPLACE into subconcept (
      name,
      concept_id
) values (
      p_name,
      p_concept_id
);
commit;
END $$

DELIMITER ;
