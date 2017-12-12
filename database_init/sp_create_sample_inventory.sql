USE physics;
-- get all lab requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_create_sample_inventory`(
  IN p_number_of_items INT(10)
)

BEGIN
DECLARE count INT;
SET count = 0;
add_loop: WHILE count < p_number_of_items DO
  call sp_add_inventory_item(CONCAT("TEST OBJECT ",count),count,count,count,"09/24/1995",50.0+count,"Verilog",(count%4)+1,"A",count);
  SET count = count + 1;
END WHILE add_loop;
commit;
END $$

DELIMITER ;
