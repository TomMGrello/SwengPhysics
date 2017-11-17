USE physics;
-- This procedure returns all the data from the items table that match
-- a set of filters.
-- Filters may be left as null, and that filter will be ignored.
-- Ex: To get all items, regardless of filters, it should be called as:
--    call sp_get_all_inventory_items_with_filters(NULL,NULL,NULL,NULL,NULL,NULL)
DELIMITER $$
CREATE PROCEDURE `sp_get_filtered_labs_demos`(
  IN p_type VARCHAR(10),
  IN p_name VARCHAR(60),
  IN p_topic VARCHAR(30),
  IN p_concept VARCHAR(30),
  IN p_subconcept VARCHAR(30)
)

BEGIN
  SELECT * FROM lab_demo
  WHERE 1=1
  AND (p_name IS NULL OR name Like CONCAT('%',p_name,'%'))
  AND (p_type IS NULL OR type Like p_type)
  AND (p_topic IS NULL OR topic Like p_topic)
  AND (p_concept IS NULL OR concept Like p_concept)
  AND (p_subconcept IS NULL OR subconcept Like p_subconcept);
END $$

DELIMITER ;
