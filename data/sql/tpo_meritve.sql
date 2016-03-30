-- MySQL dump 10.16  Distrib 10.1.13-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: tpo
-- ------------------------------------------------------
-- Server version	10.1.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `meritve`
--

DROP TABLE IF EXISTS `meritve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meritve` (
  `id` int(11) NOT NULL,
  `kaj` varchar(45) DEFAULT NULL,
  `normalno_min` float DEFAULT NULL,
  `normalno_max` float DEFAULT NULL,
  `neverjetno_min` float DEFAULT NULL,
  `neverjetno_max` float DEFAULT NULL,
  `bolezen_min` int(11) DEFAULT NULL,
  `bolezen_max` int(11) DEFAULT NULL,
  `bolezen_min_val` float DEFAULT NULL,
  `bolezen_max_val` float DEFAULT NULL,
  `kdaj` varchar(45) DEFAULT NULL,
  `merilec` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_meritve_1_idx` (`bolezen_min`),
  KEY `fk_meritve_2_idx` (`bolezen_max`),
  KEY `fk_meritve_3_idx` (`merilec`),
  CONSTRAINT `fk_meritve_1` FOREIGN KEY (`bolezen_min`) REFERENCES `bolezni` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_meritve_2` FOREIGN KEY (`bolezen_max`) REFERENCES `bolezni` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_meritve_3` FOREIGN KEY (`merilec`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-30 10:53:26
