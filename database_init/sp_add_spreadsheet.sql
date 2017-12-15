USE physicslab;
-- add spreadsheet stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_add_spreadsheet`(
  IN p_type ENUM('import_lab','import_inventory','export_master'),
  IN p_url VARCHAR(512)
)

BEGIN
REPLACE into spreadsheet (
      type,
      url
) values (
      p_type,
      p_url
);
commit;
END $$

DELIMITER ;
