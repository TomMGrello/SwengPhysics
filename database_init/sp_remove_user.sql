USE physics;
DELIMITER $$

-- stored procedure to remove an inventory item
CREATE PROCEDURE `sp_remove_user`(

        IN p_banner_id int(9)
	)

BEGIN

		DELETE FROM user where (p_banner_id = banner_id);
    DELETE FROM user_permissions where (p_banner_id = banner_id);
    DELETE FROM banner_ids where (p_banner_id = banner_id);
    DELETE FROM user_permissions where (p_banner_id = banner_id);
    DELETE FROM lab_requests where (p_banner_id = banner_id);
    DELETE FROM object_requests where (p_banner_id = banner_id);


	commit;

END $$

DELIMITER ;
