CREATE TABLE `physics`.`object`(
     `object_id` int(36) auto_increment,
     `hashed_serial_num` BIGINT(200) NULL,
     `name` VARCHAR(60) NULL,
     `serial_num` VARCHAR(45) NULL,
     PRIMARY KEY(`object_id`),
     UNIQUE KEY(`hashed_serial_num`));

CREATE TABLE `physics`.`location`(
    `location_id` int(36) auto_increment,
    `building` VARCHAR(60) NULL,
    `room_num` VARCHAR(45) NULL,
    `type` VARCHAR(10) NULL,
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
    `hashed_serial_num` BIGINT(200) NULL,
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
  `hashed_serial_num` BIGINT(200) NULL,
  `lab_id` int(36) NULL,
  `quantity` int(20) NULL,
  PRIMARY KEY(`object_lab_demo_id`));

CREATE TABLE `physics`.`item_locations`(
    `item_locations_id` int(36) auto_increment,
    `location_id` int(36) NULL,
    `hashed_serial_num` BIGINT(200) NULL,
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
source sp_add_lab_request.sql;
source sp_delete_lab_request.sql;
source sp_get_all_lab_requests.sql;
source sp_get_lab_request_by_id.sql;
source sp_add_object_request.sql;
source sp_delete_object_request.sql;
source sp_get_object_request_by_id.sql;
source sp_get_all_object_requests.sql;
source sp_create_sample_inventory.sql;
source sp_add_location.sql;
source sp_get_all_locations_by_type.sql;
source sp_delete_location.sql;

call sp_add_location("Science","136","inventory");
call sp_add_location("Science","146","inventory");
call sp_add_location("Science","134","classroom");
call sp_add_location("Science","138","classroom");
call sp_add_location("Science","144","classroom");
call sp_add_location("Science","148","classroom");
call sp_add_location("Science","149","classroom");
call sp_add_location("Science","150","classroom");
call sp_add_location("Science","151","classroom");
call sp_add_location("Science","128","classroom");


/*call sp_create_sample_inventory(25); THIS IS ONLY USED FOR FRONT END TESTING. HASHED SERIAL NUMBERS WILL NOT BE ACCURATE AND WILL CAUSE BACK END FUNCTIONS TO FAIL*/


call sp_add_lab("LAB", "LAB1", "TOPIC1", "CONCEPT1", "SUBCONCEPT1",NULL);
call sp_add_lab("LAB", "LAB2", "TOPIC2", "CONCEPT1", "SUBCONCEPT2",NULL);
call sp_add_lab("DEMO", "DEMO1", "TOPIC2", "CONCEPT2", "SUBCONCEPT1",NULL);
call sp_add_lab("DEMO", "DEMO2", "TOPIC1", "CONCEPT2", "SUBCONCEPT2",NULL);
call sp_add_lab("LAB", "LAB1", "TOPIC1", "CONCEPT1", "SUBCONCEPT1",NULL);
call sp_add_lab("LAB", "LAB2", "TOPIC2", "CONCEPT1", "SUBCONCEPT2",NULL);
call sp_add_lab("DEMO", "DEMO1", "TOPIC2", "CONCEPT2", "SUBCONCEPT1",NULL);
call sp_add_lab("DEMO", "DEMO2", "TOPIC1", "CONCEPT2", "SUBCONCEPT2",NULL);
call sp_add_lab("LAB", "LAB1", "TOPIC1", "CONCEPT1", "SUBCONCEPT1",NULL);
call sp_add_lab("LAB", "LAB2", "TOPIC2", "CONCEPT1", "SUBCONCEPT2",NULL);
call sp_add_lab("DEMO", "DEMO1", "TOPIC2", "CONCEPT2", "SUBCONCEPT1",NULL);
call sp_add_lab("DEMO", "DEMO2", "TOPIC1", "CONCEPT2", "SUBCONCEPT2",NULL);
call sp_add_lab("LAB", "LAB1", "TOPIC1", "CONCEPT1", "SUBCONCEPT1",NULL);
call sp_add_lab("LAB", "LAB2", "TOPIC2", "CONCEPT1", "SUBCONCEPT2",NULL);
call sp_add_lab("DEMO", "DEMO1", "TOPIC2", "CONCEPT2", "SUBCONCEPT1",NULL);
call sp_add_lab("DEMO", "DEMO2", "TOPIC1", "CONCEPT2", "SUBCONCEPT2",NULL);
call sp_add_lab("LAB", "LAB1", "TOPIC1", "CONCEPT1", "SUBCONCEPT1",NULL);
call sp_add_lab("LAB", "LAB2", "TOPIC2", "CONCEPT1", "SUBCONCEPT2",NULL);
call sp_add_lab("DEMO", "DEMO1", "TOPIC2", "CONCEPT2", "SUBCONCEPT1",NULL);
call sp_add_lab("DEMO", "DEMO2", "TOPIC1", "CONCEPT2", "SUBCONCEPT2",NULL);
