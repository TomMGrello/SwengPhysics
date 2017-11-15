USE permissions;
DELIMITER $$

-- stored procedure to remove an inventory item
CREATE PROCEDURE `sp_remove_inventory_item`(

        IN p_serial int(45)
	)
    
BEGIN 

		DELETE FROM item_locations where (p_serial = serial_num);

		DELETE FROM object_invoice where (p_serial = serial_num);
        
        DELETE FROM object_lab_demo where (p_serial = serial_num);
        
        DELETE FROM object where (p_serial = serial_num);

	commit;
    
END $$

DELIMITER ;
