USE physics_lab;
DELIMITER $$

CREATE PROCEDURE `sp_update_constants`(
      IN p_auto_accept BOOLEAN,
      IN p_required_num_teams INT(10),
      IN p_start_date VARCHAR(45),
      IN p_end_date VARCHAR(45)
	)

BEGIN
  IF (p_auto_accept IS NOT NULL) THEN
      UPDATE constants set auto_accept = p_auto_accept;
  END IF;

  IF (p_required_num_teams IS NOT NULL) THEN
      UPDATE constants set required_num_teams = p_required_num_teams;
  END IF;

  IF (p_start_date IS NOT NULL) THEN
      UPDATE constants set semester_start_date = p_start_date;
  END IF;

  IF (p_end_date IS NOT NULL) THEN
      UPDATE constants set semester_end_date = p_end_date;
  END IF;

	commit;

END $$

DELIMITER ;
