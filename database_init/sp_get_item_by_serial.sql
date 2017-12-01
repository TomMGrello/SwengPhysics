USE physics;
-- This procedure returns all the data from the items table that match
-- a set of filters.
-- Filters may be left as null, and that filter will be ignored.
-- Ex: To get all items, regardless of filters, it should be called as:
--    call sp_get_all_inventory_items_with_filters(NULL,NULL,NULL,NULL,NULL,NULL)
DELIMITER $$
CREATE PROCEDURE `sp_get_item_by_serial`(
  IN p_hashed_serial_num int(36)
)

BEGIN
  SELECT object.name,
          item_locations.quantity,
          location.building,
          location.room_num,
          item_locations.shelf,
          invoice.invoice_id,
          object_invoice.object_price FROM object
  INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
  INNER JOIN location on item_locations.location_id = location.location_id
  INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
  INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
  WHERE object.hashed_serial_num = p_hashed_serial_num;
END $$

DELIMITER ;
