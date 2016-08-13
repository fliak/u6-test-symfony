CREATE DATABASE u6_test CHARSET utf8 COLLATE utf8_general_ci;

USE u6_test;

CREATE TABLE menu (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `parent_id` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`parent_id`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB;


CREATE TABLE data (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` TEXT DEFAULT NULL ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;