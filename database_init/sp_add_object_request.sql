USE physics;
-- add lab request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_object_request`(
    IN p_hashed_serial_num BIGINT(200),
    IN p_dates VARCHAR(60),
    IN p_time_needed VARCHAR(60),
    IN p_classroom VARCHAR(45),
    IN p_banner_id INT(9),
    IN p_num_items INT(36),
	IN p_notes VARCHAR(250)
)

BEGIN

	REPLACE into lab_requests (
        hashed_serial_num,
        dates,
        time_needed,
        classroom,
        banner_id,
	    num_items,
        notes
	) values (
        p_hashed_serial_num,
        p_dates,
        p_time_needed,
        p_classroom,
        p_banner_id,
        p_num_items,
        p_notes
	);
  commit;

END $$

DELIMITER ;
