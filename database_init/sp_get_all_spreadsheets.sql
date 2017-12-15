USE physics_lab;
-- get all spreadsheets stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_spreadsheets`(
  IN p_type ENUM('import_lab','import_inventory','export_master')
)

BEGIN
SELECT * FROM spreadsheet where (type = p_type);
END $$

DELIMITER ;
