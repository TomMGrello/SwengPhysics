USE physics_lab;
-- get all lab requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_lab_request_by_id`(
  IN p_request_id int(36)
)

BEGIN
SELECT * FROM  lab_requests
INNER JOIN lab_demo on lab_requests.lab_id = lab_demo.lab_id
INNER JOIN location on lab_requests.location_id = location.location_id
WHERE lab_request_id = p_request_id;
END $$

DELIMITER ;
