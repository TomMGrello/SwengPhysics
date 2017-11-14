USE inventory;
-- This procedure returns all the data from the items table that match
-- a set of filters.
-- Filters may be left as null, and that filter will be ignored.
-- Ex: To get all items, regardless of filters, it should be called as:
--    call sp_get_all_inventory_items_with_filters(NULL,NULL,NULL,NULL,NULL,NULL)
DELIMITER $$
CREATE PROCEDURE `sp_get_all_inventory_items_with_filters`(
  IN p_shelf VARCHAR(15), --shelf location
  IN p_object VARCHAR(75), --name of item
  IN p_topic VARCHAR(20), --physics discipline
  IN p_concept VARCHAR(20), --physics concept
  IN p_subconcept VARCHAR(20), --physics subconcept
  IN p_vendor VARCHAR(45) --vendor purchased from
)

BEGIN
  SELECT *
  FROM  objects
  WHERE 1=1 --assure that the query is executed
  AND (p_shelf IS NULL OR shelf Like p_shelf)
  AND (p_object IS NULL OR object Like p_object)
  AND (p_topic IS NULL OR topic Like p_topic)
  AND (p_concept IS NULL OR concept Like p_concept)
  AND (p_subconcept IS NULL OR subconcept Like p_subconcept)
  AND (p_vendor IS NULL OR vendor Like p_vendor);
END $$

DELIMITER ;
