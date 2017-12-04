CREATE USER 'backup_user'@'localhost' IDENTIFIED BY '4GmfPWBC3BA5g7d';
GRANT SHOW DATABASES ON * . * to 'backup_user'@'localhost';
GRANT SELECT ON * . * to 'backup_user'@'localhost';
GRANT LOCK TABLES ON * . * to 'backup_user'@'localhost';
GRANT RELOAD ON * . * to 'backup_user'@'localhost';
GRANT SHOW VIEW ON * . * to 'backup_user'@'localhost';
FLUSH PRIVILEGES;
