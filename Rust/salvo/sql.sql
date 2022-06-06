CREATE TABLE `tab_todo` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `body` varchar(255) DEFAULT NULL,
  `done` tinyint(1) unsigned zerofill DEFAULT '0',
  PRIMARY KEY (`id`)
);