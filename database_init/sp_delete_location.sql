USE physics_lab;
-- delete lab request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_delete_location`(
    IN p_location_id INT(36)
)

BEGIN
	DELETE FROM location WHERE (location_id = p_location_id);
  commit;
END $$

DELIMITER ;
