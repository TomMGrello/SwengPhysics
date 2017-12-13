USE physics;
-- add lab request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_lab_request`(
    IN p_lab_id INT(36),
    IN p_dates VARCHAR(60),
    IN p_time_needed VARCHAR(60),
    IN p_location_id int(36),
    IN p_banner_id INT(9),
    IN p_num_teams SMALLINT(5),
	  IN p_notes VARCHAR(250)
)

BEGIN

	REPLACE into lab_requests (
        lab_id,
        dates,
        time_needed,
        location_id,
        banner_id,
	    num_teams,
        notes
	) values (
        p_lab_id,
        p_dates,
        p_time_needed,
        p_location_id,
        p_banner_id,
        p_num_teams,
        p_notes
	);
  commit;
  SELECT LAST_INSERT_ID();
END $$

DELIMITER ;
