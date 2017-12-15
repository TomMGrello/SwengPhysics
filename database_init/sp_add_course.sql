USE physics_lab;
-- get all lab requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_course`(
  IN p_name VARCHAR(80)
)

BEGIN
REPLACE into course (
      name
) values (
      p_name
);
commit;
END $$

DELIMITER ;
