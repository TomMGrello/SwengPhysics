DROP database physics;

CREATE DATABASE physics;

CREATE TABLE `physics`.`user`(
     `user_id` int(36) auto_increment,
     `banner_id` int(9) NULL,
     `first_name` VARCHAR(45) NULL,
     `middle_name` VARCHAR(45) NULL,
     `last_name` VARCHAR(45) NULL,
     `username` VARCHAR(45) NULL,
     `role` VARCHAR(45) NULL,
     `email` VARCHAR(45) NULL,
     PRIMARY KEY(`user_id`),
     UNIQUE KEY(`banner_id`));

CREATE TABLE `physics`.`user_permissions`(
    `permission_id` int(36) auto_increment,
    `banner_id` int(9) NULL,
    `can_add_user` BOOLEAN,
    `can_remove_user` BOOLEAN,
    `can_modify_permissions` BOOLEAN,
    `can_request_record` BOOLEAN,
    `can_add_record` BOOLEAN,
    `can_remove_record` BOOLEAN,
    `can_modify_record` BOOLEAN,
    `can_backup_database` BOOLEAN,
    `can_restore_database` BOOLEAN,
    PRIMARY KEY(`permission_id`),
    UNIQUE KEY(`banner_id`));

  CREATE TABLE `physics`.`banner_ids` (
    `banner_index` int(36) auto_increment,
    `username` VARCHAR(45) NULL,
    `banner_id` int(9) NULL,
    PRIMARY KEY(`banner_index`),
    UNIQUE KEY(`username`));

 -- create user requests table
  CREATE TABLE `physics`.`user_requests`(
     `user_request_id` int(36) auto_increment,
     `banner_id` int(9),
     `first_name` varchar(45) NULL,
     `middle_name` VARCHAR(45) NULL,
     `last_name` varchar(45) NULL,
     `username` VARCHAR(45) NULL,
     `role` VARCHAR(45) NULL,
     `email` VARCHAR(60) NULL,
     PRIMARY KEY(`user_request_id`));

source sp_add_user.sql;
source sp_change_permissions.sql;
source sp_get_permissions.sql;
source sp_get_user.sql;
source sp_get_banner_id.sql;
source create_backup_user.sql;
source sp_get_all_permissions.sql;
source sp_add_user_request.sql;
source sp_delete_user_request.sql;
source sp_get_all_user_requests.sql;

/*Following lines are for development purposes only
They add 4 basic users for the 4 different pre-defined roles. Can be used for testing physics.*/

call sp_add_user(111111111,'student','student','student','student','student','student@rowan.edu');
call sp_add_user(222222222,'professor','professor','professor','professor','professor','professor@rowan.edu');
call sp_add_user(333333333,'sys_admin','sys_admin','sys_admin','sys_admin','sys_admin','sys_admin@rowan.edu');
call sp_add_user(444444444,'lab_admin','lab_admin','lab_admin','lab_admin','lab_admin','lab_admin@rowan.edu');
call sp_change_permissions(111111111,0,0,0,1,1,1,1,0,0);
call sp_change_permissions(222222222,0,0,0,1,0,0,0,0,0);
call sp_change_permissions(333333333,0,0,0,0,0,0,0,1,1);
call sp_change_permissions(444444444,1,1,1,1,1,1,1,1,1);
call sp_add_user_request(555555555,'Tom','M','Grello','tomgrello','student','test@test.com');
call sp_add_user_request(666666666,'Ryan',' ','Bell','ryanbell','professor','test@test.com');
call sp_add_user_request(777777777,'Connor', ' ', 'Snee','connorsnee','lab_admin','test@test.com');
call sp_add_user_request(888888888,'Dharmik',' ','Pandya','dharmikpandya','sys_admin','test@test.com');

source create_inventory.sql;
