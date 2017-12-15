USE physics_lab;
-- get all lab requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_lab_requests`()

BEGIN
SELECT * FROM  lab_requests
INNER JOIN lab_demo on lab_demo.lab_id = lab_requests.lab_id
INNER JOIN user on user.banner_id = lab_requests.banner_id
INNER JOIN location on location.location_id = lab_requests.location_id;
END $$

DELIMITER ;
