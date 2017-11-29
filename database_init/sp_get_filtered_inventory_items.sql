USE physics;
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
  IN p_shelf VARCHAR(10),
  IN p_sort_by VARCHAR(100),
  IN p_asc_or_desc BOOLEAN
)

BEGIN
  IF p_sort_by = 'name' AND p_asc_or_desc=0 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY object.name ASC;
  ELSEIF p_sort_by = 'name' AND p_asc_or_desc=1 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY object.name DESC;
  ELSEIF p_sort_by = 'quantity' AND p_asc_or_desc=0 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY item_locations.quantity ASC;
  ELSEIF p_sort_by = 'quantity' AND p_asc_or_desc=1 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY item_locations.quantity DESC;
  ELSEIF p_sort_by = 'location' AND p_asc_or_desc=0 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY location.building ASC,location.room_num ASC;
  ELSEIF p_sort_by = 'location' AND p_asc_or_desc=1 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY location.building DESC,location.room_num DESC;
  ELSEIF p_sort_by = 'shelf' AND p_asc_or_desc=0 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY item_locations.shelf ASC;
  ELSEIF p_sort_by = 'shelf' AND p_asc_or_desc=1 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY item_locations.shelf DESC;
  ELSEIF p_sort_by = 'vendor' AND p_asc_or_desc=0 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY invoice.vendor_name ASC;
  ELSEIF p_sort_by = 'vendor' AND p_asc_or_desc=1 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY invoice.vendor_name DESC;
  ELSEIF p_sort_by = 'serial' AND p_asc_or_desc=0 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY object.hashed_serial_num ASC;
  ELSEIF p_sort_by = 'serial' AND p_asc_or_desc=1 THEN
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY object.hashed_serial_num DESC;
  ELSE
    SELECT * FROM object
    INNER JOIN item_locations on object.hashed_serial_num = item_locations.hashed_serial_num
    INNER JOIN location on item_locations.location_id = location.location_id
    INNER JOIN object_invoice on object.hashed_serial_num = object_invoice.hashed_serial_num
    INNER JOIN invoice on object_invoice.invoice_id = invoice.invoice_id
    WHERE 1=1
    AND (p_name IS NULL OR object.name Like CONCAT('%',p_name,'%'))
    AND (p_vendor_name IS NULL OR invoice.vendor_name Like p_vendor_name)
    AND (p_building IS NULL OR location.building Like p_building)
    AND (p_room_num IS NULL OR location.room_num Like p_room_num)
    AND (p_shelf IS NULL OR item_locations.shelf Like p_shelf)
    ORDER BY object.object_id ASC;
  END IF;
END $$

DELIMITER ;
