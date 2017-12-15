USE physicslab;
-- add concept stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_concept`(
  IN p_name VARCHAR(80)
)

BEGIN
REPLACE into concept (
      name
) values (
      p_name
);
commit;
END $$

DELIMITER ;
