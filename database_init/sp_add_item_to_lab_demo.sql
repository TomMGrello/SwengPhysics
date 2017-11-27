USE physics;
DELIMITER $$
CREATE PROCEDURE `sp_add_item_to_lab_demo`(
  IN p_lab_id int(36),
  IN p_serial int(45),
  IN p_quantity int(20)
)

BEGIN
	REPLACE into object_lab_demo (
    serial_num,
    lab_id,
    quantity
  ) values (
    p_serial,
    p_lab_id,
    p_quantity
  );
  commit;

END $$

DELIMITER ;
