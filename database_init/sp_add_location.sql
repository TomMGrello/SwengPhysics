USE physicslab;
-- get all lab requests stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_location`(
  IN p_building VARCHAR(60),
  IN p_room_num VARCHAR(45),
  IN p_type VARCHAR(10)
)

BEGIN
REPLACE into location (
      building,
      room_num,
      type
) values (
      p_building,
      p_room_num,
      p_type
);
commit;
END $$

DELIMITER ;
