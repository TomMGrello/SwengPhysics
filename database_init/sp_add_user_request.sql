USE physics_lab;
-- add user request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_user_request`(
    IN p_banner_id int(9),
    IN p_first_name VARCHAR(45),
    IN p_middle_name VARCHAR(45),
    IN p_last_name VARCHAR(45),
    IN p_username varchar(45),
    IN p_role VARCHAR(45),
    IN p_email varchar(60)
)

BEGIN

	IF (select exists (select 1 from user where banner_id = p_banner_id)) THEN
		select 'User already exists';
	ELSE

	REPLACE into user_requests (
        banner_id,
        first_name,
        middle_name,
        last_name,
        username,
	      role,
        email
	) values (
        p_banner_id,
        p_first_name,
        p_middle_name,
        p_last_name,
        p_username,
        p_role,
        p_email
	);
  commit;
	END IF;

END $$

DELIMITER ;
