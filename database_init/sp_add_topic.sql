USE physics_lab;
-- add subconcept stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_topic`(
  IN p_name VARCHAR(80)
)

BEGIN
REPLACE into topic (
      name
) values (
      p_name
);
commit;
END $$

DELIMITER ;
