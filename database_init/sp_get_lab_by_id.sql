USE physicslab;
-- This procedure returns all the data from the items table that match
-- a set of filters.
-- Filters may be left as null, and that filter will be ignored.
-- Ex: To get all items, regardless of filters, it should be called as:
--    call sp_get_all_inventory_items_with_filters(NULL,NULL,NULL,NULL,NULL,NULL)
DELIMITER $$
CREATE PROCEDURE `sp_get_lab_by_id`(
  IN p_lab_id int(36)

)

BEGIN
  SELECT * FROM lab_demo WHERE lab_id=p_lab_id;
END $$

DELIMITER ;
