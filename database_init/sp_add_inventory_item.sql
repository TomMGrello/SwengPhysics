USE physics;
-- add user request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_inventory_item`(
    IN p_name VARCHAR(60),
    IN p_serial VARCHAR(45),
    IN p_hashed_serial BIGINT(200),
    IN p_invoice_id int(25),
    IN p_purchase_date varchar(20),
    IN p_price float(10),
    IN p_vendor_name VARCHAR(60),
    IN p_location_id INT(36),
    IN p_shelf VARCHAR(10),
    IN p_quantity int(10)
)

BEGIN

  IF (select not exists (select 1 from location where location_id = p_location_id)) THEN
    SELECT 'INVALID LOCATION';
  END IF;

  IF (select exists (select 1 from object where hashed_serial_num = p_hashed_serial)) THEN
    call sp_remove_inventory_item(p_hashed_serial);
  END IF;
	REPLACE into object (
        hashed_serial_num,
        name,
        serial_num
	) values (
        p_hashed_serial,
        p_name,
        p_serial
  );

  IF (select not exists (select 1 from invoice where invoice_id = p_invoice_id)) THEN
    REPLACE into invoice (
        invoice_id,
        purchase_date,
        vendor_name
  	) values (
        p_invoice_id,
        p_purchase_date,
        p_vendor_name
    );
  END IF;

  REPLACE into object_invoice (
    invoice_id,
    hashed_serial_num,
    object_price
  ) values (
    p_invoice_id,
    p_hashed_serial,
    p_price
  );



  REPLACE into item_locations (
    location_id,
    hashed_serial_num,
    quantity,
    shelf
  ) values(
    p_location_id,
    p_hashed_serial,
    p_quantity,
    p_shelf
  );

  commit;

END $$

DELIMITER ;
