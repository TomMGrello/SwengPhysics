USE physics_lab;
-- update spreadsheet url stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_update_spreadsheet_url`(
    IN p_type ENUM('import_lab','import_inventory','export_master'),
    IN p_url VARCHAR(512)
)

BEGIN

IF (select exists (select 1 from spreadsheet where type = p_type)) then
	UPDATE spreadsheet SET url = p_url WHERE type=p_type;
    ELSE
		select 'URL not found please add one using the add stored procedure';
	END IF;
  commit;
END $$

DELIMITER ;
