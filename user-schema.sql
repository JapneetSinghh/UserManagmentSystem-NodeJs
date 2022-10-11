CREATE TABLE `userManagementSystem`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(25) NULL,
  `phone` VARCHAR(12) NULL,
  `comments` LONGTEXT NULL,
  `status` VARCHAR(10) NULL DEFAULT 'Active',
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
