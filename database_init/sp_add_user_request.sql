USE permissions;     
-- add user request stored procedure 
DELIMITER $$
CREATE PROCEDURE `sp_add_user_request`(
	IN p_user_request_id int(36),
    IN p_first_name VARCHAR(45),
    IN p_last_name VARCHAR(45),
    IN p_banner_id int(9),
    IN p_role VARCHAR(45)
)

BEGIN 

	IF (select exists (select 1 from user where banner_id = p_banner_id)) THEN
		select 'User already exists';
	ELSE

	REPLACE into user_requests (
		user_request_id,
        first_name,
        last_name,
		banner_id,
		role
		) values (
		p_user_request_id,
		p_first_name,
        p_last_name,
        p_banner_id,
		p_role
		);
	END IF;

END $$

DELIMITER ;