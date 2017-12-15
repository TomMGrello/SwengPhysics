USE physics_lab;
DELIMITER $$

-- stored procedure to remove an inventory item
CREATE PROCEDURE `sp_remove_lab`(

        IN p_lab_id int(45)
	)

BEGIN

		DELETE FROM lab_demo where (p_lab_id = lab_id);
    DELETE FROM object_lab_demo where (p_lab_id = lab_id);


	commit;

END $$

DELIMITER ;
