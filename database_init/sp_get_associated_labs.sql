USE physics;
-- This procedure returns all the data from the items table that match
-- a set of filters.
-- Filters may be left as null, and that filter will be ignored.
-- Ex: To get all items, regardless of filters, it should be called as:
--    call sp_get_all_inventory_items_with_filters(NULL,NULL,NULL,NULL,NULL,NULL)
DELIMITER $$
CREATE PROCEDURE `sp_get_associated_labs`(
  IN p_serial_num int(45)
)

BEGIN
  SELECT lab_demo.lab_id, object_lab_demo.quantity,lab_demo.name FROM object_lab_demo
  INNER JOIN lab_demo on lab_demo.lab_id = object_lab_demo.lab_id
  WHERE object_lab_demo.serial_num = p_serial_num;
END $$

DELIMITER ;
