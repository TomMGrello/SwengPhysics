USE physics;
-- delete lab request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_delete_lab_request`(
    IN p_lab_request_id int(36)
)

BEGIN
	DELETE FROM lab_requests WHERE (lab_request_id = p_lab_request_id);
  commit;
END $$

DELIMITER ;