USE permissions;
-- add user request stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_item_to_lab_demo`(
  IN p_lab_name VARCHAR(60),
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
    (SELECT lab_id FROM lab_demo WHERE lab_name=p_lab_name),
    p_quantity
  );
  commit;

END $$

DELIMITER ;
