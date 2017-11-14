CREATE TABLE `permissions`.`object`(
     `object_id` int(36) auto_increment,
     `name` VARCHAR(60) NULL,
     `serial_num` int(45) NULL,
     PRIMARY KEY(`object_id`),
     UNIQUE KEY(`serial_num`));

CREATE TABLE `permissions`.`location`(
    `location_id` int(36) auto_increment,
    `building` VARCHAR(60) NULL,
    `room_num` VARCHAR(45) NULL,
    PRIMARY KEY(`location_id`));

CREATE TABLE `permissions`.`invoice`(
    `invoice_auto_id` int(32) auto_increment,
    `invoice_id` int(36) NULL,
    `purchase_date` varchar(20),
    `vendor_name` VARCHAR(60) NULL,
    PRIMARY KEY(`invoice_auto_id`),
    UNIQUE KEY(`invoice_id`));

CREATE TABLE `permissions`.`object_invoice`(
    `object_invoice_id` int(36) auto_increment,
    `invoice_id` int(36) NULL,
    `serial_num` int(45) NULL,
    `object_price` float(10),
    FOREIGN KEY(`invoice_id`) REFERENCES invoice(`invoice_id`),
    FOREIGN KEY(`serial_num`) REFERENCES object(`serial_num`),
    PRIMARY KEY(`object_invoice_id`));

CREATE TABLE `permissions`.`item_locations`(
    `item_locations_id` int(36) auto_increment,
    `location_id` int(36) NULL,
    `serial_num` int(45) NULL,
    `quantity` int(10) NULL,
    `shelf` VARCHAR(10) NULL,
    FOREIGN KEY(`location_id`) REFERENCES location(`location_id`),
    FOREIGN KEY(`serial_num`) REFERENCES object(`serial_num`),
    PRIMARY KEY(`item_locations_id`),
    UNIQUE KEY(`serial_num`));

ALTER TABLE `permissions`.`item_locations`
  ADD CONSTRAINT uq_item_locations UNIQUE(serial_num,location_id);

source sp_add_inventory_item.sql;
source sp_get_all_inventory_items.sql;
--                          name            serial invoice date      price  vendor        building   room shelf quantity
call sp_add_inventory_item("TEST OBJECT 1", 123456,555888,"09/24/95",106.35,"TEST VENDOR","SCIENCE","223","A-1",5);
call sp_add_inventory_item("TEST OBJECT 2", 638854,555888,"09/24/95",56.87,"TEST VENDOR","SCIENCE","223","A-1",8);
