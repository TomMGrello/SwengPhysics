USE physics;
-- get all lab requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_object_request_by_id`(
  IN p_request_id int(36)
)

BEGIN
SELECT * FROM  object_requests
INNER JOIN object on object.hashed_serial_num = object_requests.hashed_serial_num
WHERE object_request_id = p_request_id;
END $$

DELIMITER ;
