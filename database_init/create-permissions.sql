CREATE DATABASE permissions;

CREATE TABLE `permissions`.`user`(
     `user_id` int(36) auto_increment,
     `first_name` VARCHAR(45) NULL,
     `middle_name` VARCHAR(45) NULL,
     `last_name` VARCHAR(45) NULL,
     `username` VARCHAR(45) NULL,
     `role` VARCHAR(45) NULL,
     `email` VARCHAR(45) NULL,
     PRIMARY KEY(`user_id`),
     UNIQUE KEY(`username`));

CREATE TABLE `permissions`.`user_permissions`(
    `user_id` int(36) auto_increment,
    `username` VARCHAR(45) NULL,
    `can_add_user` BOOLEAN,
    `can_remove_user` BOOLEAN,
    `can_modify_permissions` BOOLEAN,
    `can_request_record` BOOLEAN,
    `can_add_record` BOOLEAN,
    `can_remove_record` BOOLEAN,
    `can_modify_record` BOOLEAN,
    `can_backup_database` BOOLEAN,
    `can_restore_database` BOOLEAN,
    PRIMARY KEY(`user_id`),
    UNIQUE KEY(`username`));

source sp_add_user.sql;
source sp_change_permissions.sql;
source sp_get_permissions.sql;
source sp_get_user.sql;

call sp_add_user(1,'student','student','student','student','student','student@rowan.edu');
call sp_add_user(2,'professor','professor','professor','professor','professor','professor@rowan.edu');
call sp_add_user(3,'sys_admin','sys_admin','sys_admin','sys_admin','sys_admin','sys_admin@rowan.edu');
call sp_add_user(4,'lab_admin','lab_admin','lab_admin','lab_admin','lab_admin','lab_admin@rowan.edu');
call sp_change_permissions(0,'student',0,0,0,1,1,1,1,0,0);
call sp_change_permissions(0,'professor',0,0,0,1,0,0,0,0,0);
call sp_change_permissions(0,'sys_admin',0,0,0,0,0,0,0,1,1);
call sp_change_permissions(0,'lab_admin',1,1,1,1,1,1,1,1,1);
