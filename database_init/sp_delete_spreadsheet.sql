USE physicslab;
-- delete spreadsheet stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_delete_spreadsheet`(
    IN p_spreadsheet_id INT(36)
)

BEGIN
	DELETE FROM spreadsheet WHERE (spreadsheet_id = p_spreadsheet_id);
  commit;
END $$

DELIMITER ;
