CREATE TABLE `physics`.`object`(
     `object_id` int(36) auto_increment,
     `hashed_serial_num` int(36) NULL,
     `name` VARCHAR(60) NULL,
     `serial_num` VARCHAR(45) NULL,
     PRIMARY KEY(`object_id`),
     UNIQUE KEY(`hashed_serial_num`));

CREATE TABLE `physics`.`location`(
    `location_id` int(36) auto_increment,
    `building` VARCHAR(60) NULL,
    `room_num` VARCHAR(45) NULL,
    PRIMARY KEY(`location_id`));

CREATE TABLE `physics`.`invoice`(
    `invoice_auto_id` int(32) auto_increment,
    `invoice_id` int(36) NULL,
    `purchase_date` varchar(20),
    `vendor_name` VARCHAR(60) NULL,
    PRIMARY KEY(`invoice_auto_id`),
    UNIQUE KEY(`invoice_id`));

CREATE TABLE `physics`.`object_invoice`(
    `object_invoice_id` int(36) auto_increment,
    `invoice_id` int(36) NULL,
    `hashed_serial_num` int(36) NULL,
    `object_price` float(10) NULL,
    PRIMARY KEY(`object_invoice_id`));

CREATE TABLE `physics`.`lab_demo`(
  `lab_id` int(36) auto_increment,
  `type` VARCHAR(10) NULL,
  `name` VARCHAR(60) NULL,
  `topic` VARCHAR(30) NULL,
  `concept` VARCHAR(30) NULL,
  `subconcept` VARCHAR(30) NULL,
  PRIMARY KEY(`lab_id`),
  UNIQUE KEY(`lab_id`));

CREATE TABLE `physics`.`object_lab_demo`(
  `object_lab_demo_id` int(36) auto_increment,
  `hashed_serial_num` int(36) NULL,
  `lab_id` int(36) NULL,
  `quantity` int(20) NULL,
  PRIMARY KEY(`object_lab_demo_id`));

CREATE TABLE `physics`.`item_locations`(
    `item_locations_id` int(36) auto_increment,
    `location_id` int(36) NULL,
    `hashed_serial_num` int(36) NULL,
    `quantity` int(10) NULL,
    `shelf` VARCHAR(10) NULL,
    PRIMARY KEY(`item_locations_id`),
    UNIQUE KEY(`hashed_serial_num`));


source sp_add_inventory_item.sql;
source sp_get_filtered_inventory_items.sql;
source sp_add_lab.sql;
source sp_add_item_to_lab_demo.sql;
source sp_get_filtered_labs_demos.sql;
source sp_remove_inventory_item.sql;
source sp_get_lab_by_id.sql;
source sp_get_items_by_lab_id.sql;
source sp_get_item_by_serial.sql;
source sp_get_associated_labs.sql;
source sp_remove_lab.sql;


--                          name            serial invoice date      price  vendor        building   room shelf quantity
call sp_add_inventory_item("TEST OBJECT 1", 123456,-656774501,555888,"09/24/95",106.35,"TEST VENDOR","ROBINSON","223","A-1",5);
call sp_add_inventory_item("TEST OBJECT 2", 638854, 181160456,555888,"09/24/95",56.87,"TEST VENDOR","SCIENCE","223","A-1",8);
call sp_add_lab("LAB", "LAB1", "TOPIC1", "CONCEPT1", "SUBCONCEPT1",NULL);
call sp_add_lab("LAB", "LAB2", "TOPIC2", "CONCEPT1", "SUBCONCEPT2",NULL);
call sp_add_lab("DEMO", "DEMO1", "TOPIC2", "CONCEPT2", "SUBCONCEPT1",NULL);
call sp_add_lab("DEMO", "DEMO2", "TOPIC1", "CONCEPT2", "SUBCONCEPT2",NULL);
call sp_add_item_to_lab_demo(1,-656774501,5);
call sp_add_item_to_lab_demo(1,181160456,20);
