USE physics;
-- delete subconcept stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_delete_topic`(
    IN p_topic_id INT(36)
)

BEGIN
	DELETE FROM topic WHERE ( topic_id = p_topic_id);
  commit;
END $$

DELIMITER ;
