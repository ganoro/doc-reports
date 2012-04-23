DROP TABLE IF EXISTS `users`;
CREATE TABLE  `users` (
	`id` INT NOT NULL PRIMARY KEY COMMENT  'facebook id primary',
	`name` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT  'user name',
	`last_login` DATE NOT NULL COMMENT  'last time log in'
) ENGINE = INNODB CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS `surgeons`;
CREATE TABLE  `surgeons` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT  'id primary',
	`name` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT  'doc name ',
	`title` SET(  'Dr.',  'Prof.' ) NOT NULL COMMENT  'title',
	`uid` INT NOT NULL COMMENT  'user id',	
	INDEX (  `uid` )
) ENGINE = INNODB CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS `operations`;
CREATE TABLE  `operations` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT  'id',
	`name` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_bin  NOT NULL COMMENT  'doc name ',
	`uid` INT NOT NULL COMMENT  'user id',	
	INDEX (  `uid` )
) ENGINE = INNODB CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS sessions;
CREATE TABLE  `sessions` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT  'id',
	`report_date` DATE NOT NULL COMMENT  'date',
	`comments` VARCHAR( 300 ) CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT  'comments',
	`uid` INT NOT NULL COMMENT  'user id',	
	INDEX (  `uid` )
) ENGINE = INNODB CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS shifts;
CREATE TABLE  `shifts` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT  'id',
	`report_date` DATE NOT NULL COMMENT  'date',
	`comments` VARCHAR( 300 ) CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT  'comments',
	`uid` INT NOT NULL COMMENT  'user id',	
	INDEX (  `uid` )
) ENGINE = INNODB CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS surgeries;
CREATE TABLE  `surgeries` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT  'id',
	`date` DATE NOT NULL COMMENT  'date',
	`op_type` INT NOT NULL COMMENT  'operation type ',
	`first` INT NOT NULL COMMENT  'first surgeon',
	`second` INT NULL COMMENT  'second surgeon',
	`patient_id` VARCHAR( 10 ) NOT NULL COMMENT  'id of patient ',
	`patient_name` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT  'name of patient ',
	`comments` VARCHAR( 300 ) CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT  'comments',
	`uid` INT NOT NULL COMMENT  'user id',	
	INDEX (  `uid`, `first`, `second`, `op_type` )
) ENGINE = INNODB CHARACTER SET utf8 COLLATE utf8_bin;

