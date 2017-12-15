USE physicslab;
-- get all subconcepts stored procedure
DELIMITER $$
CREATE PROCEDURE `sp_get_all_topics`()

BEGIN
SELECT * FROM topic;
END $$

DELIMITER ;
