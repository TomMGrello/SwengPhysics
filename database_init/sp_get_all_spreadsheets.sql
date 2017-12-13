USE physics;
-- get all spreadsheets stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_spreadsheets`()

BEGIN
SELECT * FROM spreadsheet;
END $$

DELIMITER ;
