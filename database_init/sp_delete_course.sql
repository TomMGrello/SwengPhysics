USE physics_lab;
-- delete lab request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_delete_course`(
    IN p_course_id INT(36)
)

BEGIN
	DELETE FROM course WHERE (course_id = p_course_id);
  commit;
END $$

DELIMITER ;
