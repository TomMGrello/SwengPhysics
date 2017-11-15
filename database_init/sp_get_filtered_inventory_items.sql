USE permissions;
-- This procedure returns all the data from the items table that match
-- a set of filters.
-- Filters may be left as null, and that filter will be ignored.
-- Ex: To get all items, regardless of filters, it should be called as:
--    call sp_get_all_inventory_items_with_filters(NULL,NULL,NULL,NULL,NULL,NULL)
DELIMITER $$
CREATE PROCEDURE `sp_get_filtered_inventory_items`(
  IN p_name VARCHAR(60),
  IN p_price float(10),
  IN p_vendor_name VARCHAR(60),
  IN p_building VARCHAR(60),
  IN p_room_num VARCHAR(45),
  IN p_shelf VARCHAR(10)
)

BEGIN
  SELECT * FROM object
  INNER JOIN item_locations on object.serial_num = item_locations.serial_num
  INNER JOIN location on item_locations.location_id = location.location_id
  INNER JOIN object_invoice on object.serial_num = object_invoice.serial_num
  INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
  WHERE 1=1
  AND (p_name IS NULL OR object.name Like p_name)
  AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
  AND (p_building IS NULL OR location.building Like p_building)
  AND (p_room_num IS NULL OR location.room_num Like p_room_num)
  AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf);
END $$

DELIMITER ;
