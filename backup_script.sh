#!/bin/bash
#Variables for backing up
DATE_TIME=$(date +"%F")
BACKUP_DEST="/root/mysql_backups"
MYSQL_APP=/usr/bin/mysql
MYSQL_USER="backup_user"
MYSQL_PASS="4GmfPWBC3BA5g7d"
MYSQLDUMP_APP=/usr/bin/mysqldump

#Variables for monthly backup
FIRST_OF_MONTH=`date '+%d'`
#Variables for deleting old backups
DAYS_TO_SAVE="3"

#Make daily backup directory
mkdir -p "$BACKUP_DEST/daily/$DATE_TIME"

#Inspired by: https://mensfeld.pl/2013/04/backup-mysql-dump-all-your-mysql-databases-in-separate-files/
#Daily Backup
#Shows each database so we can make each database backup into own file
databases=`$MYSQL_APP -u $MYSQL_USER -p$MYSQL_PASS -e "SHOW DATABASES;" | grep -Ev "(Database|information_schema|performance_schema)"`
for db in $databases; do
$MYSQLDUMP_APP -u $MYSQL_USER -p$MYSQL_PASS --databases $db | bzip2 > "$BACKUP_DEST/daily/$DATE_TIME/$db.sql.bz2"
done

#copy first of month backup into monthly folder
if [ $FIRST_OF_MONTH == 01 ]
then
mkdir -p "$BACKUP_DEST/monthly/$DATE_TIME"
cp -R "$BACKUP_DEST/daily/$DATE_TIME/" "$BACKUP_DEST/monthly/"
fi

#delete old backup files, if applicable
find $BACKUP_DEST -mindepth 1 -mtime +$DAYS_TO_SAVE -delete
