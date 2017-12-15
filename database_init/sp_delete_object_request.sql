USE physicslab;
-- delete object request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_delete_object_request`(
    IN p_object_request_id int(36)
)

BEGIN
	DELETE FROM object_requests WHERE (object_request_id = p_object_request_id);
  commit;
END $$

DELIMITER ;
