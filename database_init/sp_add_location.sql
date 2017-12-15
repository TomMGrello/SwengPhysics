USE physicslab;
-- get all lab requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_location`(
  IN p_building VARCHAR(60),
  IN p_room_num VARCHAR(45),
  IN p_type VARCHAR(10)
)

BEGIN
if (select exists (select 1 from location where building = p_building and room_num = p_room_num and type = p_type)) THEN
    select location_id from location where building = p_building and room_num = p_room_num and type = p_type;
ELSE
  REPLACE into location (
        building,
        room_num,
        type
  ) values (
        p_building,
        p_room_num,
        p_type
  );
  select LAST_INSERT_ID();
END IF;
commit;
END $$

DELIMITER ;
