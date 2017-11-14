USE permissions;
-- This procedure returns all the data from the items table that match
-- a set of filters.
-- Filters may be left as null, and that filter will be ignored.
-- Ex: To get all items, regardless of filters, it should be called as:
--    call sp_get_all_inventory_items_with_filters(NULL,NULL,NULL,NULL,NULL,NULL)
DELIMITER $$
CREATE PROCEDURE `sp_get_all_inventory_items`()

BEGIN
  SELECT * FROM object
  INNER JOIN item_locations on object.serial_num = item_locations.serial_num
  INNER JOIN location on item_locations.location_id = location.location_id
  INNER JOIN object_invoice on object.serial_num = object_invoice.serial_num
  INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id;
END $$

DELIMITER ;
