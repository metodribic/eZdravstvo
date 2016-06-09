CREATE DATABASE  IF NOT EXISTS `tpo` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `tpo`;
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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permissi_content_type_id_2f476e4b_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add token',7,'add_token'),(20,'Can change token',7,'change_token'),(21,'Can delete token',7,'delete_token'),(22,'Can add cors model',8,'add_corsmodel'),(23,'Can change cors model',8,'change_corsmodel'),(24,'Can delete cors model',8,'delete_corsmodel'),(25,'Can add user',9,'add_uporabnik'),(26,'Can change user',9,'change_uporabnik'),(27,'Can delete user',9,'delete_uporabnik'),(28,'Can add user',10,'add_zdravnik'),(29,'Can change user',10,'change_zdravnik'),(30,'Can delete user',10,'delete_zdravnik'),(31,'Can add user',11,'add_osebje'),(32,'Can change user',11,'change_osebje'),(33,'Can delete user',11,'delete_osebje'),(34,'Can add sifrant registriranih',12,'add_sifrantregistriranih'),(35,'Can change sifrant registriranih',12,'change_sifrantregistriranih'),(36,'Can delete sifrant registriranih',12,'delete_sifrantregistriranih'),(37,'Can add ustanova',13,'add_ustanova'),(38,'Can change ustanova',13,'change_ustanova'),(39,'Can delete ustanova',13,'delete_ustanova'),(40,'Can add ambulanta',14,'add_ambulanta'),(41,'Can change ambulanta',14,'change_ambulanta'),(42,'Can delete ambulanta',14,'delete_ambulanta'),(43,'Can add posta',15,'add_posta'),(44,'Can change posta',15,'change_posta'),(45,'Can delete posta',15,'delete_posta'),(46,'Can add roles',16,'add_roles'),(47,'Can change roles',16,'change_roles'),(48,'Can delete roles',16,'delete_roles'),(49,'Can add dieta',17,'add_dieta'),(50,'Can change dieta',17,'change_dieta'),(51,'Can delete dieta',17,'delete_dieta'),(52,'Can add navodila dieta',18,'add_navodiladieta'),(53,'Can change navodila dieta',18,'change_navodiladieta'),(54,'Can delete navodila dieta',18,'delete_navodiladieta'),(55,'Can add zdravilo',19,'add_zdravilo'),(56,'Can change zdravilo',19,'change_zdravilo'),(57,'Can delete zdravilo',19,'delete_zdravilo'),(58,'Can add pregled',20,'add_pregled'),(59,'Can change pregled',20,'change_pregled'),(60,'Can delete pregled',20,'delete_pregled'),(61,'Can add bolezni',21,'add_bolezni'),(62,'Can change bolezni',21,'change_bolezni'),(63,'Can delete bolezni',21,'delete_bolezni'),(64,'Can add vrednosti meritev',22,'add_vrednostimeritev'),(65,'Can change vrednosti meritev',22,'change_vrednostimeritev'),(66,'Can delete vrednosti meritev',22,'delete_vrednostimeritev'),(67,'Can add meritev',23,'add_meritev'),(68,'Can change meritev',23,'change_meritev'),(69,'Can delete meritev',23,'delete_meritev'),(70,'Can add ip lock',24,'add_iplock'),(71,'Can change ip lock',24,'change_iplock'),(72,'Can delete ip lock',24,'delete_iplock'),(73,'Can add kontaktna oseba',25,'add_kontaktnaoseba'),(74,'Can change kontaktna oseba',25,'change_kontaktnaoseba'),(75,'Can delete kontaktna oseba',25,'delete_kontaktnaoseba'),(79,'Can add uporabnik zdravnik',27,'add_uporabnikzdravnik'),(80,'Can change uporabnik zdravnik',27,'change_uporabnikzdravnik'),(81,'Can delete uporabnik zdravnik',27,'delete_uporabnikzdravnik'),(82,'Can add personalizacija nadzorne plosce',28,'add_personalizacijanadzorneplosce'),(83,'Can change personalizacija nadzorne plosce',28,'change_personalizacijanadzorneplosce'),(84,'Can delete personalizacija nadzorne plosce',28,'delete_personalizacijanadzorneplosce'),(85,'Can add bolezni zdravila',29,'add_boleznizdravila'),(86,'Can change bolezni zdravila',29,'change_boleznizdravila'),(87,'Can delete bolezni zdravila',29,'delete_boleznizdravila'),(88,'Can add clanek bolezni',30,'add_clanekbolezni'),(89,'Can change clanek bolezni',30,'change_clanekbolezni'),(90,'Can delete clanek bolezni',30,'delete_clanekbolezni');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=','2016-06-08 12:21:52',1,'admin@admin.si','','','admin@admin.si',0,1,'2010-04-22 12:10:19'),(2,'pbkdf2_sha256$24000$pwcW26CVPges$8eHzgfJHcTW7jXabHCvCQpC5CnuJsQcxj+ryYGb+6Xs=','2016-06-08 16:52:17',0,'test@test.si','','','test@test.si',0,1,'2015-04-22 12:10:19'),(3,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=','2016-06-08 16:47:02',0,'doc@test.si','','','doc@test.si',0,1,'2015-04-22 12:10:19'),(4,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=','2016-05-05 21:50:00',0,'test1@test.si','','','test1@test.si',0,1,'2015-04-22 12:10:19'),(5,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=','2016-04-25 21:43:47',0,'zobar@test.si','','','zobar@test.si',0,1,'2015-04-22 12:10:19'),(6,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=',NULL,0,'sestra@test.si','','','sestra@test.si',0,1,'2015-04-22 12:10:19'),(7,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=','2016-05-05 19:55:28',0,'prazen@test.si','','','prezen@test.si',0,1,'0000-00-00 00:00:00'),(8,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=','2016-05-05 20:09:26',0,'doc2@test.si','','','doc2@test.si',0,1,'2016-05-05 20:07:30'),(9,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=','2016-05-05 20:08:48',0,'dohtar@test.si','','','dohtar@test.si',0,1,'2016-05-05 20:08:36'),(12,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=',NULL,0,'test2@test.si','','','test2@test.si',0,1,'2016-05-03 09:40:00'),(13,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=',NULL,0,'test3@test.si','','','test3@test.si',0,1,'2016-05-03 09:40:00'),(14,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=',NULL,0,'test4@test.si','','','test4@test.si',0,1,'2016-05-03 09:40:00'),(15,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=',NULL,0,'test5@test.si','','','test5@test.si',0,1,'2016-05-03 09:40:00'),(16,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=',NULL,0,'test6@test.si','','','test6@test.si',0,1,'2016-05-03 09:40:00'),(17,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=',NULL,0,'test7@test.si','','','test7@test.si',0,1,'2016-05-03 09:40:00'),(18,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=',NULL,0,'test8@test.si','','','test8@test.si',0,1,'2016-05-03 09:40:00'),(19,'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=',NULL,0,'test9@test.si','','','test9@test.si',0,1,'2016-05-03 09:40:00'),(31,'pbkdf2_sha256$24000$CqDIzM8tFvMh$SEkyGdOjlk/bV6q91sixqx0gLUVYaLFd8Pej9m5LFjs=',NULL,0,'doc3@test.si','','','doc3@test.si',0,1,'2016-06-09 12:19:33'),(32,'pbkdf2_sha256$24000$2K8IEpzrlGcW$Ub7nwVPBvz4z70FzGBSMpGUPjPi/cD/fIDp2oIGy1E8=',NULL,0,'doc4@test.si','','','doc4@test.si',0,1,'2016-06-09 12:20:53'),(33,'pbkdf2_sha256$24000$ewcWSPWWIUtD$aTtULSD2Qba+KTdErbNcbPIrc2j9dn0+MMgXigwRSww=',NULL,0,'doc5@test.si','','','doc5@test.si',0,1,'2016-06-09 12:24:12'),(34,'pbkdf2_sha256$24000$5UwTmKvFJZpO$bPg6cldQYhvlTFh/ATNA20lKjhA0ICk8AReOUbeAJbo=',NULL,0,'sestra2@sestra.si','','','sestra2@sestra.si',0,1,'2016-06-09 12:25:19'),(35,'pbkdf2_sha256$24000$uVyOgitUYaXX$XQk05pFrnjxEIQINPT9gWPL6ujZe9lyNuwwQClVc19A=',NULL,0,'doc6@test.si','','','doc6@test.si',0,1,'2016-06-09 13:11:27'),(36,'pbkdf2_sha256$24000$ivBR3W46H13F$q1UJRanb7tclBJQJ5zYEJ43+0u/mbOkF7rr5se956ZU=',NULL,0,'doc7@test.si','','','doc7@test.si',0,1,'2016-06-09 13:11:36'),(37,'pbkdf2_sha256$24000$n0aTj6pTHZ2b$Cbh5rGLtqDCYtJGFryTGnal7uDS3wWwXue7m+Wf2WYk=',NULL,0,'doc8@test.si','','','doc8@test.si',0,1,'2016-06-09 13:11:44'),(38,'pbkdf2_sha256$24000$6Ly27roSgGBM$QC5rFiLlRwmxgjZX5xKhDBt5pjlyE7NfcExbkFctgVM=',NULL,0,'doc10@test.si','','','doc10@test.si',0,1,'2016-06-09 13:12:14'),(39,'pbkdf2_sha256$24000$0fI4DRDDMjjA$PAyLFXa+spxRm53udAOwManI6ujMWkYynIgUJXMkzGY=',NULL,0,'sestra3@test.si','','','sestra3@test.si',0,1,'2016-06-09 13:12:32'),(40,'pbkdf2_sha256$24000$1tqs5faB1NAC$yQzssk21CKSorXllNHzx9fumcQpYLanUCglyM39qun0=',NULL,0,'sestra4@test.si','','','sestra4@test.si',0,1,'2016-06-09 13:12:43'),(41,'pbkdf2_sha256$24000$ymEJQFZSaAFD$gFY/ZuQO2FqNU0yXq6yxjZLVVe1gltUqxnp+B2DBmWY=',NULL,0,'sestra5@test.si','','','sestra5@test.si',0,1,'2016-06-09 14:04:07'),(42,'pbkdf2_sha256$24000$QYVVul3ZHlDO$ra0e/oAZndsBLwrM8nI4wUJN6MxPt1F7jB9VlD/R2rk=',NULL,0,'sestra6@test.si','','','sestra6@test.si',0,1,'2016-06-09 15:12:06'),(43,'pbkdf2_sha256$24000$ZvrHkMKcLhqx$J4fFnLOEs1QvlAlXP9Wu0iT+wf+0sccnz9tdx+xErU4=',NULL,0,'sestra7@test.si','','','sestra7@test.si',0,1,'2016-06-09 15:26:05'),(44,'pbkdf2_sha256$24000$TT3sH32oHbWk$gpMWVKXDtAyYpYFQF9XgUrokayU4QndT6l8KPAU7avA=',NULL,0,'sestra8@test.si','','','sestra8@test.si',0,1,'2016-06-09 15:26:46'),(45,'pbkdf2_sha256$24000$HaAUlnJWY3XH$k6VwI+q7tUSCbR0Gmsral+cBct13LVQ7Gns/bO3YMyo=',NULL,0,'doc11@test.si','','','doc11@test.si',0,1,'2016-06-09 15:29:17'),(46,'pbkdf2_sha256$24000$HBvr4y0LHGiy$kzlA7Lc6Dd50WkZZuGJsuE884wDkcLVxNDPgN9WHatU=',NULL,0,'sestra9@test.si','','','sestra9@test.si',0,1,'2016-06-09 15:30:34'),(47,'pbkdf2_sha256$24000$z0mLIArmQlBl$zfbDSj2/srGJmEBkTwRrLPC04f/mEznupSJTAjQdApk=',NULL,0,'sestra10@test.si','','','sestra10@test.si',0,1,'2016-06-09 15:31:45');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('269b8ba00c93bee639482939bb4c5058f5fa31d6','2016-04-22 16:59:01',4),('3b62b5af4166847b55172e410392a3484bac6094','2016-05-05 20:09:26',8),('400166223f39b19ad9d39a6591ce1274ea096964','2016-05-05 20:08:48',9),('42e7d1e5cf16a473f653933c9a90a740a4e59826','2016-04-22 11:12:48',1),('69c3792c488f41bfa0b34ada027d8c855f9e90b5','2016-04-22 11:20:01',2),('b8ab4781c39ea8f0261bed08b92a70ffe5ccab3d','2016-05-05 19:55:28',7),('ccf52a194032fef802c1260b213e6d13197ea3e5','2016-04-22 17:36:25',5),('ce4766d9bf891e8d8ee22b42c957cb3d2c2353d0','2016-04-22 12:49:25',3);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'authtoken','token'),(5,'contenttypes','contenttype'),(8,'corsheaders','corsmodel'),(6,'sessions','session'),(14,'tpo','ambulanta'),(21,'tpo','bolezni'),(29,'tpo','boleznizdravila'),(30,'tpo','clanekbolezni'),(17,'tpo','dieta'),(24,'tpo','iplock'),(25,'tpo','kontaktnaoseba'),(23,'tpo','meritev'),(18,'tpo','navodiladieta'),(11,'tpo','osebje'),(28,'tpo','personalizacijanadzorneplosce'),(15,'tpo','posta'),(20,'tpo','pregled'),(16,'tpo','roles'),(12,'tpo','sifrantregistriranih'),(9,'tpo','uporabnik'),(27,'tpo','uporabnikzdravnik'),(13,'tpo','ustanova'),(22,'tpo','vrednostimeritev'),(19,'tpo','zdravilo'),(10,'tpo','zdravnik');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2016-04-22 10:12:36'),(2,'auth','0001_initial','2016-04-22 10:12:36'),(3,'admin','0001_initial','2016-04-22 10:12:36'),(4,'admin','0002_logentry_remove_auto_add','2016-04-22 10:12:36'),(5,'contenttypes','0002_remove_content_type_name','2016-04-22 10:12:36'),(6,'auth','0002_alter_permission_name_max_length','2016-04-22 10:12:37'),(7,'auth','0003_alter_user_email_max_length','2016-04-22 10:12:37'),(8,'auth','0004_alter_user_username_opts','2016-04-22 10:12:37'),(9,'auth','0005_alter_user_last_login_null','2016-04-22 10:12:37'),(10,'auth','0006_require_contenttypes_0002','2016-04-22 10:12:37'),(11,'auth','0007_alter_validators_add_error_messages','2016-04-22 10:12:37'),(12,'authtoken','0001_initial','2016-04-22 10:12:37'),(13,'sessions','0001_initial','2016-04-22 10:12:37'),(14,'tpo','0001_initial','2016-04-22 10:13:04'),(15,'tpo','0002_vrednostimeritev_kdaj_se_meri','2016-04-22 10:50:10'),(16,'tpo','0003_auto_20160422_1307','2016-04-22 13:07:33'),(17,'tpo','0004_auto_20160422_1321','2016-04-22 13:21:50'),(18,'tpo','0005_auto_20160422_1353','2016-04-22 13:54:04'),(19,'tpo','0006_oskrbovanec','2016-04-22 14:18:57'),(20,'tpo','0007_oskrbovanec_oskrbnik','2016-04-22 14:32:07'),(21,'tpo','0008_auto_20160422_1651','2016-04-22 16:51:25'),(22,'tpo','0009_kontaktnaoseba_telefon','2016-04-23 13:29:28'),(23,'tpo','0010_sifrantregistriranih_is_used','2016-04-24 10:22:05'),(24,'tpo','0011_auto_20160425_1434','2016-04-25 14:34:58'),(25,'tpo','0012_auto_20160425_1818','2016-04-25 18:18:32'),(26,'tpo','0013_auto_20160425_1849','2016-04-25 18:49:15'),(27,'tpo','0014_auto_20160427_1114','2016-04-27 11:26:59'),(28,'tpo','0015_auto_20160510_1139','2016-05-10 11:39:19'),(29,'tpo','0016_auto_20160511_1524','2016-05-21 16:14:26'),(30,'tpo','0017_auto_20160530_1112','2016-05-30 11:12:46'),(31,'tpo','0018_auto_20160530_1549','2016-05-30 15:49:20'),(32,'tpo','0019_auto_20160530_1559','2016-05-30 15:59:29'),(33,'tpo','0020_auto_20160601_1422','2016-06-01 15:06:03'),(34,'tpo','0021_boleznizdravila','2016-06-01 15:06:32'),(35,'tpo','0022_auto_20160602_1634','2016-06-02 16:34:42'),(36,'tpo','0023_auto_20160603_0808','2016-06-03 08:09:18');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_de54fa62` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_ambulanta`
--

DROP TABLE IF EXISTS `tpo_ambulanta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_ambulanta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(100) NOT NULL,
  `naslov` varchar(100) NOT NULL,
  `posta_id` int(11) NOT NULL,
  `ustanova_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tpo_ambulanta_692e170f` (`posta_id`),
  KEY `tpo_ambulanta_72c481af` (`ustanova_id`),
  CONSTRAINT `tpo_ambulanta_posta_id_1a02bff5_fk_tpo_posta_id` FOREIGN KEY (`posta_id`) REFERENCES `tpo_posta` (`id`),
  CONSTRAINT `tpo_ambulanta_ustanova_id_868957c3_fk_tpo_ustanova_id` FOREIGN KEY (`ustanova_id`) REFERENCES `tpo_ustanova` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_ambulanta`
--

LOCK TABLES `tpo_ambulanta` WRITE;
/*!40000 ALTER TABLE `tpo_ambulanta` DISABLE KEYS */;
INSERT INTO `tpo_ambulanta` VALUES (1,'Splošna ambulanta Šempeter','ULICA PADLIH BORCEV 13 A',1216,16),(2,'Splošna ambulanta Medvode','OSTROVRHARJEVA ULICA 6',1215,50501),(6,'Splošna ambulanta Celje','Krekov trg 12',3000,2131);
/*!40000 ALTER TABLE `tpo_ambulanta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_bolezni`
--

DROP TABLE IF EXISTS `tpo_bolezni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_bolezni` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `mkb10` varchar(45) NOT NULL,
  `alergija` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_bolezni`
--

LOCK TABLES `tpo_bolezni` WRITE;
/*!40000 ALTER TABLE `tpo_bolezni` DISABLE KEYS */;
INSERT INTO `tpo_bolezni` VALUES (1,'Esencialna hipertenzija','I10',0),(2,'Hipertenzivna srčna bolezen z (zastojno) srčn','I11',0),(3,'Diabetes tip 2','E11',0),(4,'Diabetes tip 1','E10',0),(5,'Gastritis','K29',0),(6,'Bolečina v trebuhu ali medenici','R10.0',0),(7,'Hiperplazija prostate','N40',0),(8,'Hipotiroza (druge vrste)','E03',0),(9,'Cistitis (vnetja sečnega mehurja)','N30',0),(10,'Hiperholesterolemija','E78.0',0),(11,'Gripa, virus ni dokazan','J11',0),(12,'Panična anksiozna motnja','F41.0',0),(13,'Zmerna depresivna motnja','F32.1',0),(14,'Zlom spodnjega dela koželjnice Bolečine','S52.5',0),(15,'Alergijski rinitis zaradi peloda','J30.1',1),(16,'Glavkom','H40',0),(17,'Akutno serozno vnetje srednjega ušesa','H65.0',0),(18,'Aortna (valvularna) stenoza','I35.0',0),(19,'Impotenca organskega izvora','N48.4',0),(20,'Gastroezofagealna refluksna bolezen (GERB)','K21',0),(21,'Razjeda na želodcu','K25',0),(22,'Limfatična levkemija','C91',0),(23,'Mieloična levkemija','C92',0);
/*!40000 ALTER TABLE `tpo_bolezni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_bolezni_clanki`
--

DROP TABLE IF EXISTS `tpo_bolezni_clanki`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_bolezni_clanki` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bolezni_id` int(11) NOT NULL,
  `clanekbolezni_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_bolezni_clanki_bolezni_id_d9cfc0f8_uniq` (`bolezni_id`,`clanekbolezni_id`),
  KEY `tpo_bolezni_cl_clanekbolezni_id_cd0d4925_fk_tpo_clanekbolezni_id` (`clanekbolezni_id`),
  CONSTRAINT `tpo_bolezni_cl_clanekbolezni_id_cd0d4925_fk_tpo_clanekbolezni_id` FOREIGN KEY (`clanekbolezni_id`) REFERENCES `tpo_clanekbolezni` (`id`),
  CONSTRAINT `tpo_bolezni_clanki_bolezni_id_6fc6ece5_fk_tpo_bolezni_id` FOREIGN KEY (`bolezni_id`) REFERENCES `tpo_bolezni` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_bolezni_clanki`
--

LOCK TABLES `tpo_bolezni_clanki` WRITE;
/*!40000 ALTER TABLE `tpo_bolezni_clanki` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpo_bolezni_clanki` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_bolezni_zdravilo`
--

DROP TABLE IF EXISTS `tpo_bolezni_zdravilo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_bolezni_zdravilo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zbrisano` tinyint(1) DEFAULT NULL,
  `bolezni_id` int(11) NOT NULL,
  `zdravilo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tpo_bolezni_zdravilo_bolezni_id_30525157_fk_tpo_bolezni_id` (`bolezni_id`),
  KEY `tpo_bolezni_zdravilo_zdravilo_id_30fadf39_fk_tpo_zdravilo_id` (`zdravilo_id`),
  CONSTRAINT `tpo_bolezni_zdravilo_bolezni_id_30525157_fk_tpo_bolezni_id` FOREIGN KEY (`bolezni_id`) REFERENCES `tpo_bolezni` (`id`),
  CONSTRAINT `tpo_bolezni_zdravilo_zdravilo_id_30fadf39_fk_tpo_zdravilo_id` FOREIGN KEY (`zdravilo_id`) REFERENCES `tpo_zdravilo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_bolezni_zdravilo`
--

LOCK TABLES `tpo_bolezni_zdravilo` WRITE;
/*!40000 ALTER TABLE `tpo_bolezni_zdravilo` DISABLE KEYS */;
INSERT INTO `tpo_bolezni_zdravilo` VALUES (1,0,1,82392),(2,0,1,16470),(3,0,1,28479),(4,0,1,59064),(5,0,2,11444),(6,0,2,115746),(7,0,2,129607),(8,0,2,146097),(9,0,2,60755),(10,0,2,146144),(11,0,3,144343),(12,0,3,40886),(13,0,3,145137),(14,0,3,108375),(16,0,3,42021),(17,0,3,25550),(18,0,4,30619),(19,0,4,51101),(20,0,4,95990),(21,0,4,30147),(22,0,4,19534),(23,0,5,145976),(24,0,5,71684),(25,0,6,146311),(26,0,6,191),(27,0,7,38695),(28,0,7,105864),(29,0,7,128333),(30,0,7,33880),(31,0,7,38245),(32,0,8,146102),(33,0,8,92010),(34,0,8,23442),(35,0,9,22454),(36,0,9,40398),(37,0,9,86029),(38,0,9,69418),(39,0,10,104426),(40,0,10,109827),(41,0,10,109932),(42,0,10,109690),(43,0,11,34487),(44,0,11,55654),(45,0,11,2739),(46,0,11,72940),(47,0,11,146066),(48,0,11,93351),(49,0,11,600695),(50,0,11,136058),(51,0,12,46124),(52,0,12,45136),(53,0,12,19348),(54,0,13,40096),(55,0,13,125610),(56,0,13,58793),(57,0,13,85685),(58,0,13,146299),(59,0,13,118460),(60,0,13,104213),(61,0,14,72940),(62,0,14,12114),(63,0,14,12084),(64,0,14,145499),(65,0,14,124680),(66,0,15,20583),(67,0,15,62987),(68,0,15,51420),(69,0,15,58238),(70,0,16,146530),(71,0,16,102229),(72,0,16,139603),(73,0,16,114022),(74,0,16,114006),(75,0,17,25666),(76,0,17,69280),(77,0,17,147056),(78,0,17,41866),(79,0,18,72656),(80,0,18,26778),(81,0,19,108995),(82,0,19,97420),(83,0,19,91782),(84,0,19,93564),(85,0,20,28622),(86,0,20,23507),(87,0,20,13200),(88,0,20,13730),(89,0,20,71684),(90,0,20,75566),(91,0,21,28622),(92,0,21,23507),(93,0,21,13200),(94,0,21,13730),(95,0,21,75566),(96,0,22,80608),(97,0,22,145204),(98,0,22,145415),(99,0,23,145204),(100,0,23,145415),(101,0,23,80608);
/*!40000 ALTER TABLE `tpo_bolezni_zdravilo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_clanekbolezni`
--

DROP TABLE IF EXISTS `tpo_clanekbolezni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_clanekbolezni` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clanek` varchar(5000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_clanekbolezni`
--

LOCK TABLES `tpo_clanekbolezni` WRITE;
/*!40000 ALTER TABLE `tpo_clanekbolezni` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpo_clanekbolezni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_dieta`
--

DROP TABLE IF EXISTS `tpo_dieta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_dieta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(100) NOT NULL,
  `sifra` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_dieta`
--

LOCK TABLES `tpo_dieta` WRITE;
/*!40000 ALTER TABLE `tpo_dieta` DISABLE KEYS */;
INSERT INTO `tpo_dieta` VALUES (1,'Dieta pri celiakiji','D001'),(2,'Dieta za ledvične bolnike','D002'),(3,'Dieta pri refluksni bolezni','D003'),(4,'Dieta za sladkorne bolnike','D004'),(5,'Dieta za znižanje holesterola','D005'),(6,'Prehrana pri driski','D006'),(7,'Dieta za znižanje trigliceridov','D007'),(8,'Dieta pri boleznih jeter','D008'),(9,'Dieta pri boleznih želodca in dvanajstnika','D009');
/*!40000 ALTER TABLE `tpo_dieta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_dieta_navodila`
--

DROP TABLE IF EXISTS `tpo_dieta_navodila`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_dieta_navodila` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dieta_id` int(11) NOT NULL,
  `navodiladieta_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_dieta_navodila_dieta_id_ae4c696f_uniq` (`dieta_id`,`navodiladieta_id`),
  KEY `tpo_dieta_navo_navodiladieta_id_9d49ab49_fk_tpo_navodiladieta_id` (`navodiladieta_id`),
  CONSTRAINT `tpo_dieta_navo_navodiladieta_id_9d49ab49_fk_tpo_navodiladieta_id` FOREIGN KEY (`navodiladieta_id`) REFERENCES `tpo_navodiladieta` (`id`),
  CONSTRAINT `tpo_dieta_navodila_dieta_id_dcb75d0d_fk_tpo_dieta_id` FOREIGN KEY (`dieta_id`) REFERENCES `tpo_dieta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_dieta_navodila`
--

LOCK TABLES `tpo_dieta_navodila` WRITE;
/*!40000 ALTER TABLE `tpo_dieta_navodila` DISABLE KEYS */;
INSERT INTO `tpo_dieta_navodila` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,4,5),(6,4,6),(7,5,7),(8,5,8),(9,6,9),(10,6,10),(11,7,11),(12,8,12),(13,9,13);
/*!40000 ALTER TABLE `tpo_dieta_navodila` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_iplock`
--

DROP TABLE IF EXISTS `tpo_iplock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_iplock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(40) NOT NULL,
  `numOfTries` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tpo_iplock_e8701ad4` (`user_id`),
  CONSTRAINT `tpo_iplock_user_id_8e6b88d8_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_iplock`
--

LOCK TABLES `tpo_iplock` WRITE;
/*!40000 ALTER TABLE `tpo_iplock` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpo_iplock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_kontaktnaoseba`
--

DROP TABLE IF EXISTS `tpo_kontaktnaoseba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_kontaktnaoseba` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) NOT NULL,
  `priimek` varchar(100) NOT NULL,
  `naslov` varchar(100) NOT NULL,
  `sorodstveno_razmerje` varchar(100) NOT NULL,
  `posta_id` int(11) NOT NULL,
  `telefon` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tpo_kontaktnaoseba_posta_id_d961c397_fk_tpo_posta_id` (`posta_id`),
  CONSTRAINT `tpo_kontaktnaoseba_posta_id_d961c397_fk_tpo_posta_id` FOREIGN KEY (`posta_id`) REFERENCES `tpo_posta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_kontaktnaoseba`
--

LOCK TABLES `tpo_kontaktnaoseba` WRITE;
/*!40000 ALTER TABLE `tpo_kontaktnaoseba` DISABLE KEYS */;
INSERT INTO `tpo_kontaktnaoseba` VALUES (1,'Jože','Novakovič','Velika Planina 155b','Tast',1001,'+4421321312'),(2,'Matej','Novak','Topniška ulica 13','Brat',1000,'312312312'),(3,'sda','dsa','dsa','dass',1000,'dsa'),(4,'Mojca','Zupanc','Jankova cesta 21','Teta',2000,'40394294'),(5,'Mojca','Pokrajculja','Testni okoliš 3','Nona',3000,'34423'),(6,'test','TEST','TESDS','DKFQ',1000,'SADSA'),(7,'test','TEST','TESDS','DKFQ',1000,'SADSA'),(8,'Jure','Jurovan','Medena ulica 21','Brat',1000,'+98312981'),(9,'Jure','Jurovan','Medena ulica 21','Brat',1000,'+98312981'),(10,'Jure','Jurovan','Medena ulica 21','Brat',1000,'+98312981'),(11,'Jure','Jurovan','Medena ulica 21','Brat',1000,'+98312981'),(12,'Jure','Jurovan','Medena ulica 21','Brat',1000,'+98312981'),(13,'Jure','Jurovan','Medena ulica 21','Brat',1000,'+98312981'),(14,'Jure','Jurovan','Medena ulica 21','Brat',1000,'+98312981'),(15,'fd','fd','dsfs','fds',1000,'fdf'),(16,'a','a','a','ati',3000,'a'),(17,'Mojca','Novak','Naslov 123','Mama',2000,'051776382'),(18,'Mojca','Novak','Naslov 123','Mama',2000,'051776382'),(19,'Mojca','Novak','Naslov 123','Mama',2000,'051776382'),(20,'Mojca','Novak','Naslov 123','Mama',2000,'051776382'),(21,'Mojca','Novak','Naslov 123','Mama',2000,'051776382'),(22,'mama','mija','kak smo žejni','test',1000,'t314332'),(23,'mama','mija','kak smo žejni','test',1000,'t314332'),(24,'test','test','test','test',1000,'test'),(25,'a','a','a','a',1000,'a'),(26,'a','a','a','a',1000,'a'),(27,'a','a','a','a',1000,'a'),(28,'Mojca','Novak','Partizanska cesta 232a','Mama',2000,'+836293634');
/*!40000 ALTER TABLE `tpo_kontaktnaoseba` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_meritev`
--

DROP TABLE IF EXISTS `tpo_meritev`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_meritev` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vrednost_meritve` varchar(100) NOT NULL,
  `datum` datetime NOT NULL,
  `tip_meritve_id` int(11) NOT NULL,
  `uporabnik_id` int(11) NOT NULL,
  `pregled_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tpo_meritev_642d2bfa` (`tip_meritve_id`),
  KEY `tpo_meritev_f9585d13` (`uporabnik_id`),
  KEY `tpo_meritev_8086547c` (`pregled_id`),
  CONSTRAINT `tpo_meritev_pregled_id_dc205b41_fk` FOREIGN KEY (`pregled_id`) REFERENCES `tpo_pregled` (`id`),
  CONSTRAINT `tpo_meritev_tip_meritve_id_320a3a83_fk` FOREIGN KEY (`tip_meritve_id`) REFERENCES `tpo_vrednostimeritev` (`id`),
  CONSTRAINT `tpo_meritev_uporabnik_id_38b4fe52_fk_tpo_uporabnik_user_ptr_id` FOREIGN KEY (`uporabnik_id`) REFERENCES `tpo_uporabnik` (`user_ptr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_meritev`
--

LOCK TABLES `tpo_meritev` WRITE;
/*!40000 ALTER TABLE `tpo_meritev` DISABLE KEYS */;
INSERT INTO `tpo_meritev` VALUES (3,'34','2016-05-14 12:20:00',1,2,4),(4,'36','2016-05-14 07:42:00',1,2,5),(5,'45','2016-05-14 20:01:00',5,2,5),(6,'89/133','2016-05-14 00:00:00',2,2,5),(9,'38','2016-05-14 12:03:00',4,2,6),(10,'44','2016-05-14 12:13:00',1,2,NULL),(11,'67','2016-06-01 10:13:00',3,2,NULL),(12,'10','2016-06-01 06:19:00',1,2,NULL),(13,'99/123','2016-06-01 19:20:00',2,2,NULL),(14,'90','2016-06-01 00:00:00',3,2,NULL),(16,'13','2016-06-01 00:00:00',1,4,NULL),(17,'12','2016-06-01 00:00:00',1,2,NULL),(18,'49','2016-06-01 00:00:00',1,2,NULL),(19,'11','2016-06-02 06:40:00',1,2,NULL),(20,'12','2016-06-02 18:41:00',1,2,NULL),(21,'15','2016-06-02 18:41:00',5,2,NULL),(22,'87/123','2016-06-02 18:45:00',2,2,NULL),(23,'60','2016-06-02 18:45:00',3,2,NULL),(24,'0/0/1.5','2016-06-08 18:44:00',6,2,NULL),(25,'1/2/3','2016-06-08 18:46:00',6,2,NULL),(26,'2/3/4','2016-06-08 00:00:00',6,2,7);
/*!40000 ALTER TABLE `tpo_meritev` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_navodiladieta`
--

DROP TABLE IF EXISTS `tpo_navodiladieta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_navodiladieta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_navodiladieta`
--

LOCK TABLES `tpo_navodiladieta` WRITE;
/*!40000 ALTER TABLE `tpo_navodiladieta` DISABLE KEYS */;
INSERT INTO `tpo_navodiladieta` VALUES (1,'http://www.drustvo-celiakija.si/celiakija'),(2,'http://www.zveza-dlbs.si/Prehrana.html'),(3,'http://www.kclj.si/dokumenti/000203-0002f9.pdf'),(4,'http://www.diabetes-zveza.si/uploads/SB95_julij12clanki1.pdf'),(5,'http://www.ezdravje.com/srce-in-zilje/druge-bolezni-srca-in-zilja/sladkorna-bolezen/?s=9'),(6,'http://www.sladkorcki.si/media/docs/Prehrana_pri_SB.pdf'),(7,'http://www.lek.si/si/skrb-za-zdravje/bolezni-in-simptomi/srce-ozilje/diete-holesterol/'),(8,'http://www.krka.si/media/prk/dokumenti/0577_dieta_ob_povisanem_holesterolu.pdf'),(9,'http://www.nasa-lekarna.si/clanki/clanek/skuhaj-olupi-ali-pusti/'),(10,'http://www.dolenjske-lekarne.si/novice/samozdravljenje-driske'),(11,'http://www.ave.si/novice/prehrana-pri-povisanih-trigliceridih'),(12,'http://www.kclj.si/dokumenti/000203-0002fe.pdf'),(13,'http://www.kclj.si/dokumenti/000203-0002f6.pdf');
/*!40000 ALTER TABLE `tpo_navodiladieta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_navodilazdravila`
--

DROP TABLE IF EXISTS `tpo_navodilazdravila`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_navodilazdravila` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=600697 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_navodilazdravila`
--

LOCK TABLES `tpo_navodilazdravila` WRITE;
/*!40000 ALTER TABLE `tpo_navodilazdravila` DISABLE KEYS */;
INSERT INTO `tpo_navodilazdravila` VALUES (191,'http://data.zdravila.net/pdf/a-010513.pdf'),(666,'http://www.lek.si/sl/zdravila-izdelki/brez-recepta/fluimukan-600/'),(2739,'http://www.cbz.si/cbz/bazazdr2.nsf/o/74B2434C07A44F18C12579C2003F4B3E/$File/a-011568.pdf'),(11444,'http://si.draagle.com/#!/drug/kzk/?sub=10'),(12084,'http://www.cbz.si/cbz/bazazdr2.nsf/o/63B2B4273D302F22C12579C2003F4E25/$File/a-016266.pdf'),(12114,'http://www.zdravila.net/navodilo.php?navodilo=s-005819.pdf&d'),(13200,'http://www.cbz.si/cbz/bazazdr2.nsf/o/520C2C9888BDDC6CC12579C2003F6677/$File/a-016474.pdf'),(13730,'http://www.cbz.si/cbz/bazazdr2.nsf/o/33C7A15D9E906947C12579C2003F4EB7/$File/a-015564.pdf'),(16470,'http://www.cbz.si/cbz/bazazdr2.nsf/o/F2D46D0FDF63B711C12579C2003F5E1A/$File/a-016418.pdf'),(19348,'http://www.krka.si/sl/zdravila-in-izdelki/zdravila-na-recept/apaurintablete/1287/'),(19534,'http://www.diagnosia.com/si/zdravila/mixtard-30-novolet-100-ieml-suspenzija-za-injiciranje-v-napolnjenem-injekcijskem-peresniku'),(20583,'http://www.cbz.si/cbz/bazazdr2.nsf/o/85571397365F09F1C12579EC001FF803?opendocument'),(22454,'http://www.cbz.si/cbz/bazazdr2.nsf/o/6151BEF7B09CA95AC12579C2003F5062?opendocument'),(23442,'http://si.draagle.com/#!/source/ljn/?drug=ljo'),(23507,'http://www.cbz.si/cbz/bazazdr2.nsf/o/C780D3BD9FE393DAC12579C2003F50BD/$File/a-015817.pdf'),(25550,'http://www.cbz.si/cbz/bazazdr2.nsf/o/1D5A54DC62638DE6C12579C2003F61CD/$File/a-014628.pdf'),(25666,'http://www.cbz.si/cbz/bazazdr2.nsf/o/2F6CCCC907EB6078C12579C2003F514E?opendocument'),(26778,'http://www.lek.si/si/zdravila/na-recept/pakiranje/198/'),(28479,'http://www.krka.si/sl/zdravila-in-izdelki/zdravila-na-recept/enap/1323/#title'),(28622,'http://www.cbz.si/cbz/bazazdr2.nsf/o/16D4CBF7CC46F980C12579C2003F67F1/$File/a-016396.pdf'),(30147,'https://myhealthbox.eu/fr/view/1697664/a841ce6cfa958e9d21d2636b18e07e8c/leaflet'),(30619,'https://www.diagnosia.com/si/zdravila/actrapid-100-ieml-raztopina-za-injiciranje-v-viali'),(33880,'http://www.cbz.si/cbz/bazazdr2.nsf/o/CD18459F93237B13C12579C2003F68AF/$File/a-015652.pdf'),(34487,'http://www.cbz.si/cbz/bazazdr2.nsf/o/1B374BA216FAD256C12579C2003F6932?opendocument'),(38245,'http://www.cbz.si/cbz/bazazdr2.nsf/o/B940B7C0F083BE58C12579C2003F637A/$File/a-015072.pdf'),(38695,'http://www.cbz.si/cbz/bazazdr2.nsf/o/7C3C54F51BD29C59C12579C2003F63EF?opendocument'),(40096,'http://www.cbz.si/cbz/bazazdr2.nsf/o/0049AAE59E3AA8D3C12579C2003F532C?opendocument'),(40398,'http://www.cbz.si/cbz/bazazdr2.nsf/o/44DDA83404E35C16C12579C2003F533A/$File/a-015920.pdf'),(40886,'http://si.draagle.com/#!/greader/?file=http%3A%2F%2Fskrito.draagle.com%2Fmedia%2Fd%2Fpil%2F040886_pil.pdf'),(41866,'http://www.cbz.si/cbz/bazazdr2.nsf/o/1C2B687B0E1FB855C12579C2003F6948/$File/a-016157.pdf'),(42021,'http://www.cbz.si/cbz/bazazdr2.nsf/o/4FC2A54BA1DBA6A0C12579C2003F6956/$File/a-020018.pdf'),(45136,'http://www.cbz.si/cbz/bazazdr2.nsf/o/1AF7CA6F1A775F6BC12579C2003F53C6/$File/a-015373.pdf'),(46124,'http://www.cbz.si/cbz/bazazdr2.nsf/o/5C58B200098CB5A2C12579C2003F53E1?opendocument'),(51101,'https://www.diagnosia.com/si/zdravila/actrapid-flexpen-100-ieml-raztopina-za-injiciranje-v-napolnjenem-injekcijskem-peresniku'),(51420,'http://www.cbz.si/cbz/bazazdr2.nsf/o/DA55403BA60DE053C12579EC001FF806/$File/a-013832.pdf'),(55654,'http://www.lek.si/si/zdravila/brez-recepta/lekadol-filmsko-oblozene-tablete/'),(58238,'https://www.lekarna24ur.com/public/upload/dokumenti/Rinolan_navodilo_pdf.pdf'),(58793,'http://www.cbz.si/cbz/bazazdr2.nsf/o/8911B2FE3FFF0EF2C12579EC001FF931/$File/a-016214.pdf'),(59064,'http://www.cbz.si/cbz/bazazdr2.nsf/o/68FDAEEE845A0E52C12579C2003F563B/$File/a-016414.pdf'),(60755,'http://www.cbz.si/cbz/bazazdr2.nsf/o/73A663A39EB07033C12579C2003F5EE2/$File/a-014615.pdf'),(62987,'http://www.lekarnar.com/izdelki/claritine-s-tablete'),(69280,'http://www.lek.si/si/zdravila/na-recept/pakiranje/89/'),(69418,'http://www.lek.si/si/zdravila/na-recept/pakiranje/433/'),(71684,'http://www.lek.si/si/zdravila/brez-recepta/ranital-s-150/'),(72656,'http://www.cbz.si/cbz/bazazdr2.nsf/o/582412352E8F356CC12579C2003F58F2?opendocument'),(72940,'http://www.cbz.si/cbz/bazazdr2.nsf/o/8BA9838F72FB4FA4C12579EC001FFABB?opendocument'),(75566,'http://www.cbz.si/cbz/bazazdr2.nsf/o/AE0A1FEA862CC338C12579C2003F5986/$File/a-014527.pdf'),(80608,'http://rxed.eu/sl/g/Glivec/5/'),(82392,'http://www.vitabalans.com/index.php?id=zopitin0004'),(85685,'http://www.cbz.si/cbz/bazazdr2.nsf/o/A9B3E333AEC06FBEC12579EC001FFC93/$File/a-016422.pdf'),(86029,'http://www.lek.si/si/zdravila/na-recept/pakiranje/1692/'),(91782,'http://www.cbz.si/cbz/bazazdr2.nsf/o/396405FCEAF6D06DC12579EC001FFD67/$File/a-014664.pdf'),(92010,'http://www.cbz.si/cbz/bazazdr2.nsf/o/2ABD62F024313965C12579C2003F5CBB/$File/a-012092.pdf'),(93351,'http://www.cbz.si/cbz/bazazdr2.nsf/o/97D3848355D4ABDAC12579C2003F5CDE/$File/a-015216.pdf'),(93564,'https://www.diagnosia.com/si/zdravila/viagra-50-mg-filmsko-oblozene-tablete'),(95990,'http://www.cbz.si/cbz/bazazdr2.nsf/o/5536585C91748BDFC12579C2003F5D63/$File/a-012384.pdf'),(97420,'https://www.diagnosia.com/si/zdravila/sildenafil-teva-100-mg-filmsko-oblozene-tablete'),(102229,'https://www.diagnosia.com/si/zdravila/lumigan-01-mgml-kapljice-za-oko-raztopina'),(104213,'http://www.cbz.si/cbz/bazazdr2.nsf/o/90DBE9EE574E4B0BC12579EC00200012/$File/a-016440.pdf'),(104426,'http://www.cbz.si/cbz/bazazdr2.nsf/o/F52A113BA34EB9E3C12579EC00200024?opendocument'),(105864,'http://si.draagle.com/#!/greader/?file=http%3A%2F%2Fskrito.draagle.com%2Fmedia%2Fd%2Fpil%2F105864_pil.pdf'),(108375,'http://www.cbz.si/cbz/bazazdr2.nsf/o/C35AF3CC02742C17C12579EC0020018C/$File/a-007344.pdf'),(108995,'http://www.cbz.si/cbz/bazazdr2.nsf/o/C78700915441F103C12579EC002001C7?opendocument'),(109690,'http://www.cbz.si/cbz/bazazdr2.nsf/o/A2118DFEC432DB52C12579EC00200204/$File/a-016289.pdf'),(109827,'http://www.krka.si/sl/zdravila-in-izdelki/zdravila-na-recept/sorvastatablete/1673/'),(109932,'http://www.cbz.si/cbz/bazazdr2.nsf/o/EBA7391D45C8FEBDC12579EC0020021A/$File/a-014601.pdf'),(114006,'http://www.cbz.si/cbz/bazazdr2.nsf/o/159103D546E2C185C12579EC00200367/$File/a-020005.pdf'),(114022,'http://www.cbz.si/cbz/bazazdr2.nsf/o/86C91BB4FE577DACC12579EC00200369/$File/a-014453.pdf'),(115746,'http://www.lek.si/si/zdravila/na-recept/pakiranje/5862/'),(118460,'http://www.cbz.si/cbz/bazazdr2.nsf/o/011783EE948D7D8FC12579EC00200501/$File/a-016059.pdf'),(124680,'http://www.cbz.si/cbz/bazazdr2.nsf/o/871247132BF7287FC12579EC0020072B/$File/a-011732.pdf'),(125610,'http://www.lek.si/si/zdravila/na-recept/pakiranje/5775/'),(128333,'http://www.cbz.si/cbz/bazazdr2.nsf/o/374B2D55A7D6E43AC12579EC002008A5/$File/a-016035.pdf'),(129607,'http://www.cbz.si/cbz/bazazdr2.nsf/o/C393D32B6CCD5421C12579EC00200928/$File/a-009508.pdf'),(136058,'http://www.cbz.si/cbz/bazazdr2.nsf/o/FCD99A29EDCF611EC12579F900492129/$File/a-016002.pdf'),(139603,'http://www.cbz.si/cbz/bazazdr2.nsf/o/727DB8859728BBDEC12579F90049223E/$File/a-016139.pdf'),(144343,'http://www.medis.si/fileadmin/medis/medis.si/docs/Navodilo_za_uporabo_Aglurab_SI.pdf'),(145137,'https://mediately.co/si/drugs/WjSUunNJrYrsXmP7DiMg2FANnb9/belformin-500-mg-filmsko-oblozene-tablete'),(145204,'http://rxed.eu/sl/i/Imatinib+Teva/5/'),(145415,'http://www.cbz.si/cbz/bazazdr2.nsf/o/9F5DD2DFF700BFEDC1257B4B00836C1C/$File/a-013808.pdf'),(145499,'http://www.cbz.si/cbz/bazazdr2.nsf/o/031488B8CE92CA7AC1257BAC0083438E/$File/a-014109.pdf'),(145976,'http://www.cbz.si/cbz/bazazdr2.nsf/o/C3E218A9243FF5E9C1257C310004BB75?opendocument'),(146066,'http://www.cbz.si/cbz/bazazdr2.nsf/o/4D14143C7F6E1F04C1257C620004CDD8/$File/a-016095.pdf'),(146097,'http://www.cbz.si/cbz/bazazdr2.nsf/o/65930B0D5833253BC1257C780004AF95/$File/a-013730.pdf'),(146102,'http://www.cbz.si/cbz/bazazdr2.nsf/o/3291459E7EB4AD14C1257CB400833420?opendocument'),(146144,'http://www.cbz.si/cbz/bazazdr2.nsf/o/06C4EB4CE17A2068C1257C780004B023/$File/a-013839.pdf'),(146299,'http://www.cbz.si/cbz/bazazdr2.nsf/o/C0CAA315ECDB0887C1257CC90083113C/$File/a-016017.pdf'),(146311,'http://www.cbz.si/cbz/bazazdr2.nsf/o/017078003F4E9B32C1257CC90083116E/$File/a-014247.pdf'),(146530,'http://www.cbz.si/cbz/bazazdr2.nsf/o/A3DFEF2F17A035ACC1257D1600831212?opendocument'),(147056,'http://www.cbz.si/cbz/bazazdr2.nsf/o/1FFC4EAA3F7319EEC1257EAB00837141/$File/a-015915.pdf'),(600695,'http://www.cbz.si/cbz/bazazdr2.nsf/o/C8122F0572FA7141C12579EC001FFF17/$File/a-600695.pdf');
/*!40000 ALTER TABLE `tpo_navodilazdravila` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_osebje`
--

DROP TABLE IF EXISTS `tpo_osebje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_osebje` (
  `user_ptr_id` int(11) NOT NULL,
  `ime` varchar(100) DEFAULT NULL,
  `priimek` varchar(100) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `sifra_id` int(11) NOT NULL,
  `ustanova_id` int(11) DEFAULT NULL,
  `telefon` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_ptr_id`),
  KEY `tpo_osebje_84566833` (`role_id`),
  KEY `tpo_osebje_84912d22` (`sifra_id`),
  KEY `tpo_osebje_72c481af` (`ustanova_id`),
  CONSTRAINT `tpo_osebje_role_id_f83cf885_fk_tpo_roles_id` FOREIGN KEY (`role_id`) REFERENCES `tpo_roles` (`id`),
  CONSTRAINT `tpo_osebje_sifra_id_6054d635_fk_tpo_sifrantregistriranih_id` FOREIGN KEY (`sifra_id`) REFERENCES `tpo_sifrantregistriranih` (`id`),
  CONSTRAINT `tpo_osebje_user_ptr_id_1fe18409_fk_auth_user_id` FOREIGN KEY (`user_ptr_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `tpo_osebje_ustanova_id_76d59cd3_fk_tpo_ustanova_id` FOREIGN KEY (`ustanova_id`) REFERENCES `tpo_ustanova` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_osebje`
--

LOCK TABLES `tpo_osebje` WRITE;
/*!40000 ALTER TABLE `tpo_osebje` DISABLE KEYS */;
INSERT INTO `tpo_osebje` VALUES (6,'Jana','Marolt',3,4,16,'+386746654'),(34,'Mia','Mirt',3,9,17,'123456789'),(39,NULL,NULL,3,14,NULL,NULL),(40,NULL,NULL,3,15,NULL,NULL),(41,'Lili','Lazar',3,16,2131,'1234456778'),(42,'Jana','Jeraj',3,17,50501,'232354432'),(43,'Veronika','Vilhar',3,18,50501,'123456789'),(44,'Greta','Goba',3,19,2131,'123456789'),(46,'Dana','Doljak',3,21,17,'123456789'),(47,'Žana','Žorž',3,22,2131,'123456789');
/*!40000 ALTER TABLE `tpo_osebje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_personalizacijanadzorneplosce`
--

DROP TABLE IF EXISTS `tpo_personalizacijanadzorneplosce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_personalizacijanadzorneplosce` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datum_rojstva` tinyint(1) NOT NULL,
  `kraj_rojstva` tinyint(1) NOT NULL,
  `naslov` tinyint(1) NOT NULL,
  `stevilka_zzzs` tinyint(1) NOT NULL,
  `zdravnik` tinyint(1) NOT NULL,
  `zobozdravnik` tinyint(1) NOT NULL,
  `pregledi` int(11) NOT NULL,
  `meritve` int(11) NOT NULL,
  `bolezni` int(11) NOT NULL,
  `zdravila` int(11) NOT NULL,
  `diete` int(11) NOT NULL,
  `alergije` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_personalizacijanadzorneplosce`
--

LOCK TABLES `tpo_personalizacijanadzorneplosce` WRITE;
/*!40000 ALTER TABLE `tpo_personalizacijanadzorneplosce` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpo_personalizacijanadzorneplosce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_posta`
--

DROP TABLE IF EXISTS `tpo_posta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_posta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kraj` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9266 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_posta`
--

LOCK TABLES `tpo_posta` WRITE;
/*!40000 ALTER TABLE `tpo_posta` DISABLE KEYS */;
INSERT INTO `tpo_posta` VALUES (1000,'Ljubljana '),(1001,'Ljubljana - poštni predali'),(1210,'Ljubljana - Šentvid'),(1211,'Ljubljana - Šmartno'),(1215,'Medvode'),(1216,'Smlednik'),(1217,'Vodice'),(1218,'Komenda'),(1219,'Laze v Tuhinju'),(1221,'Motnik'),(1222,'Trojane'),(1223,'Blagovica'),(1225,'Lukovica'),(1230,'Domžale'),(1231,'Ljubljana - Črnuče'),(1233,'Dob'),(1234,'Mengeš'),(1235,'Radomlje'),(1236,'Trzin'),(1241,'Kamnik'),(1242,'Stahovica'),(1251,'Moravče'),(1252,'Vače'),(1260,'Ljubljana - Polje'),(1261,'Ljubljana - Dobrunje'),(1262,'Dol pri Ljubljani'),(1270,'Litija'),(1272,'Polšnik'),(1273,'Dole pri Litiji'),(1274,'Gabrovka'),(1275,'Šmartno pri Litiji'),(1276,'Primskovo '),(1281,'Kresnice'),(1282,'Sava'),(1290,'Grosuplje'),(1291,'Škofljica'),(1292,'Ig'),(1293,'Šmarje - Sap'),(1294,'Višnja Gora'),(1295,'Ivančna Gorica'),(1296,'Šentvid pri Stični'),(1301,'Krka'),(1303,'Zagradec'),(1310,'Ribnica'),(1311,'Turjak'),(1312,'Videm - Dobrepolje'),(1313,'Struge'),(1314,'Rob'),(1315,'Velike Lašče'),(1316,'Ortnek'),(1317,'Sodražica'),(1318,'Loški Potok'),(1319,'Draga'),(1330,'Kočevje'),(1331,'Dolenja vas'),(1332,'Stara Cerkev'),(1336,'Kostel'),(1337,'Osilnica'),(1338,'Kočevska Reka'),(1351,'Brezovica pri Ljubljani'),(1352,'Preserje'),(1353,'Borovnica'),(1354,'Horjul'),(1355,'Polhov Gradec'),(1356,'Dobrova'),(1357,'Notranje Gorice'),(1358,'Log pri Brezovici'),(1360,'Vrhnika'),(1370,'Logatec'),(1371,'Logatec'),(1372,'Hotedršica'),(1373,'Rovte'),(1380,'Cerknica'),(1381,'Rakek'),(1382,'Begunje pri Cerknici'),(1384,'Grahovo'),(1385,'Nova vas'),(1386,'Stari trg pri Ložu'),(1410,'Zagorje ob Savi'),(1411,'Izlake'),(1412,'Kisovec'),(1413,'Čemšenik'),(1414,'Podkum'),(1420,'Trbovlje'),(1423,'Dobovec'),(1430,'Hrastnik'),(1431,'Dol pri Hrastniku'),(1432,'Zidani Most'),(1433,'Radeče'),(1434,'Loka pri Zidanem Mostu'),(2000,'Maribor '),(2001,'Maribor - poštni predali'),(2201,'Zgornja Kungota'),(2204,'Miklavž na Dravskem polju'),(2205,'Starše'),(2206,'Marjeta na Dravskem polju'),(2208,'Pohorje'),(2211,'Pesnica pri Mariboru'),(2212,'Šentilj v Slovenskih goricah'),(2213,'Zgornja Velka'),(2214,'Sladki Vrh'),(2215,'Ceršak'),(2221,'Jarenina'),(2222,'Jakobski Dol'),(2223,'Jurovski Dol'),(2229,'Malečnik'),(2230,'Lenart v Slovenskih goricah'),(2231,'Pernica'),(2232,'Voličina'),(2233,'Sv. Ana v Slovenskih goricah'),(2234,'Benedikt'),(2235,'Sv. Trojica v Slovenskih goricah'),(2236,'Cerkvenjak'),(2241,'Spodnji Duplek'),(2242,'Zgornja Korena'),(2250,'Ptuj'),(2252,'Dornava'),(2253,'Destrnik'),(2254,'Trnovska vas'),(2255,'Vitomarci'),(2256,'Juršinci'),(2257,'Polenšak'),(2258,'Sveti Tomaž'),(2259,'Ivanjkovci'),(2270,'Ormož'),(2272,'Gorišnica'),(2273,'Podgorci'),(2274,'Velika Nedelja'),(2275,'Miklavž pri Ormožu'),(2276,'Kog'),(2277,'Središče ob Dravi'),(2281,'Markovci'),(2282,'Cirkulane'),(2283,'Zavrč'),(2284,'Videm pri Ptuju'),(2285,'Zgornji Leskovec'),(2286,'Podlehnik'),(2287,'Žetale'),(2288,'Hajdina'),(2289,'Stoperce'),(2310,'Slovenska Bistrica'),(2311,'Hoče'),(2312,'Orehova vas'),(2313,'Fram'),(2314,'Zgornja Polskava'),(2315,'Šmartno na Pohorju'),(2316,'Zgornja Ložnica'),(2317,'Oplotnica'),(2318,'Laporje'),(2319,'Poljčane'),(2321,'Makole'),(2322,'Majšperk'),(2323,'Ptujska Gora'),(2324,'Lovrenc na Dravskem polju'),(2325,'Kidričevo'),(2326,'Cirkovce'),(2327,'Rače'),(2331,'Pragersko'),(2341,'Limbuš'),(2342,'Ruše'),(2343,'Fala'),(2344,'Lovrenc na Pohorju'),(2345,'Bistrica ob Dravi'),(2351,'Kamnica'),(2352,'Selnica ob Dravi'),(2353,'Sveti Duh na Ostrem Vrhu'),(2354,'Bresternica'),(2360,'Radlje ob Dravi'),(2361,'Ožbalt'),(2362,'Kapla'),(2363,'Podvelka'),(2364,'Ribnica na Pohorju'),(2365,'Vuhred'),(2366,'Muta'),(2367,'Vuzenica'),(2370,'Dravograd'),(2371,'Trbonje'),(2372,'Libeliče'),(2373,'Šentjanž pri Dravogradu'),(2380,'Slovenj Gradec'),(2381,'Podgorje pri Slovenj Gradcu'),(2382,'Mislinja'),(2383,'Šmartno pri Slovenj Gradcu'),(2390,'Ravne na Koroškem'),(2391,'Prevalje'),(2392,'Mežica'),(2393,'Črna na Koroškem'),(2394,'Kotlje'),(3000,'Celje '),(3001,'Celje - poštni predali'),(3201,'Šmartno v Rožni dolini'),(3202,'Ljubečna'),(3203,'Nova Cerkev'),(3204,'Dobrna'),(3205,'Vitanje'),(3206,'Stranice'),(3210,'Slovenske Konjice'),(3211,'Škofja vas'),(3212,'Vojnik'),(3213,'Frankolovo'),(3214,'Zreče'),(3215,'Loče'),(3220,'Štore'),(3221,'Teharje'),(3222,'Dramlje'),(3223,'Loka pri Žusmu'),(3224,'Dobje pri Planini'),(3225,'Planina pri Sevnici'),(3230,'Šentjur'),(3231,'Grobelno'),(3232,'Ponikva'),(3233,'Kalobje'),(3240,'Šmarje pri Jelšah'),(3241,'Podplat'),(3250,'Rogaška Slatina'),(3252,'Rogatec'),(3253,'Pristava pri Mestinju'),(3254,'Podčetrtek'),(3255,'Buče'),(3256,'Bistrica ob Sotli'),(3257,'Podsreda'),(3260,'Kozje'),(3261,'Lesično'),(3262,'Prevorje'),(3263,'Gorica pri Slivnici'),(3264,'Sveti Štefan'),(3270,'Laško'),(3271,'Šentrupert'),(3272,'Rimske Toplice'),(3273,'Jurklošter'),(3301,'Petrovče'),(3302,'Griže'),(3303,'Gomilsko'),(3304,'Tabor'),(3305,'Vransko'),(3310,'Žalec'),(3311,'Šempeter v Savinjski dolini'),(3312,'Prebold'),(3313,'Polzela'),(3314,'Braslovče'),(3320,'Velenje '),(3322,'Velenje - poštni predali'),(3325,'Šoštanj'),(3326,'Topolšica'),(3327,'Šmartno ob Paki'),(3330,'Mozirje'),(3331,'Nazarje'),(3332,'Rečica ob Savinji'),(3333,'Ljubno ob Savinji'),(3334,'Luče'),(3335,'Solčava'),(3341,'Šmartno ob Dreti'),(3342,'Gornji Grad'),(4000,'Kranj '),(4001,'Kranj - poštni predali'),(4201,'Zgornja Besnica'),(4202,'Naklo'),(4203,'Duplje'),(4204,'Golnik'),(4205,'Preddvor'),(4206,'Zgornje Jezersko'),(4207,'Cerklje na Gorenjskem'),(4208,'Šenčur'),(4209,'Žabnica'),(4210,'Brnik - Aerodrom'),(4211,'Mavčiče'),(4212,'Visoko'),(4220,'Škofja Loka'),(4223,'Poljane nad Škofjo Loko'),(4224,'Gorenja vas'),(4225,'Sovodenj'),(4226,'Žiri'),(4227,'Selca'),(4228,'Železniki'),(4229,'Sorica'),(4240,'Radovljica'),(4243,'Brezje'),(4244,'Podnart'),(4245,'Kropa'),(4246,'Kamna Gorica'),(4247,'Zgornje Gorje'),(4248,'Lesce'),(4260,'Bled'),(4263,'Bohinjska Bela'),(4264,'Bohinjska Bistrica'),(4265,'Bohinjsko jezero'),(4267,'Srednja vas v Bohinju'),(4270,'Jesenice'),(4273,'Blejska Dobrava'),(4274,'Žirovnica'),(4275,'Begunje na Gorenjskem'),(4276,'Hrušica'),(4280,'Kranjska Gora'),(4281,'Mojstrana'),(4282,'Gozd Martuljek'),(4283,'Rateče - Planica'),(4290,'Tržič'),(4294,'Križe'),(5000,'Nova Gorica '),(5001,'Nova Gorica - poštni predali'),(5210,'Deskle'),(5211,'Kojsko'),(5212,'Dobrovo v Brdih'),(5213,'Kanal'),(5214,'Kal nad Kanalom'),(5215,'Ročinj'),(5216,'Most na Soči'),(5220,'Tolmin'),(5222,'Kobarid'),(5223,'Breginj'),(5224,'Srpenica'),(5230,'Bovec'),(5231,'Log pod Mangartom'),(5232,'Soča'),(5242,'Grahovo ob Bači'),(5243,'Podbrdo'),(5250,'Solkan'),(5251,'Grgar'),(5252,'Trnovo pri Gorici'),(5253,'Čepovan'),(5261,'Šempas'),(5262,'Črniče'),(5263,'Dobravlje'),(5270,'Ajdovščina'),(5271,'Vipava'),(5272,'Podnanos'),(5273,'Col'),(5274,'Črni Vrh nad Idrijo'),(5275,'Godovič'),(5280,'Idrija'),(5281,'Spodnja Idrija'),(5282,'Cerkno'),(5283,'Slap ob Idrijci'),(5290,'Šempeter pri Gorici'),(5291,'Miren'),(5292,'Renče'),(5293,'Volčja Draga'),(5294,'Dornberk'),(5295,'Branik'),(5296,'Kostanjevica na Krasu'),(5297,'Prvačina'),(6000,'Koper/Capodistria '),(6001,'Koper/Capodistria - poštni predali'),(6210,'Sežana'),(6215,'Divača'),(6216,'Podgorje'),(6217,'Vremski Britof'),(6219,'Lokev'),(6221,'Dutovlje'),(6222,'Štanjel'),(6223,'Komen'),(6224,'Senožeče'),(6225,'Hruševje'),(6230,'Postojna'),(6232,'Planina'),(6240,'Kozina'),(6242,'Materija'),(6243,'Obrov'),(6244,'Podgrad'),(6250,'Ilirska Bistrica'),(6251,'Ilirska Bistrica-Trnovo'),(6253,'Knežak'),(6254,'Jelšane'),(6255,'Prem'),(6256,'Košana'),(6257,'Pivka'),(6258,'Prestranek'),(6271,'Dekani'),(6272,'Gračišče'),(6273,'Marezige'),(6274,'Šmarje'),(6275,'Črni Kal'),(6276,'Pobegi'),(6280,'Ankaran/Ancarano'),(6281,'Škofije'),(6310,'Izola/Isola'),(6320,'Portorož/Portorose'),(6330,'Piran/Pirano'),(6333,'Sečovlje/Sicciole'),(8000,'Novo mesto'),(8001,'Novo mesto - poštni predali'),(8210,'Trebnje'),(8211,'Dobrnič'),(8212,'Velika Loka'),(8213,'Veliki Gaber'),(8216,'Mirna Peč'),(8220,'Šmarješke Toplice'),(8222,'Otočec'),(8230,'Mokronog'),(8231,'Trebelno '),(8232,'Šentrupert'),(8233,'Mirna'),(8250,'Brežice'),(8251,'Čatež ob Savi'),(8253,'Artiče'),(8254,'Globoko'),(8255,'Pišece'),(8256,'Sromlje '),(8257,'Dobova'),(8258,'Kapele'),(8259,'Bizeljsko'),(8261,'Jesenice na Dolenjskem'),(8262,'Krška vas'),(8263,'Cerklje ob Krki'),(8270,'Krško'),(8272,'Zdole '),(8273,'Leskovec pri Krškem'),(8274,'Raka'),(8275,'Škocjan'),(8276,'Bučka '),(8280,'Brestanica'),(8281,'Senovo'),(8282,'Koprivnica'),(8283,'Blanca'),(8290,'Sevnica'),(8292,'Zabukovje '),(8293,'Studenec'),(8294,'Boštanj'),(8295,'Tržišče'),(8296,'Krmelj'),(8297,'Šentjanž'),(8310,'Šentjernej'),(8311,'Kostanjevica na Krki'),(8312,'Podbočje'),(8321,'Brusnice'),(8322,'Stopiče'),(8323,'Uršna sela'),(8330,'Metlika'),(8331,'Suhor'),(8332,'Gradac'),(8333,'Semič'),(8340,'Črnomelj'),(8341,'Adlešiči'),(8342,'Stari trg ob Kolpi'),(8343,'Dragatuš'),(8344,'Vinica'),(8350,'Dolenjske Toplice'),(8351,'Straža'),(8360,'Žužemberk'),(8361,'Dvor'),(8362,'Hinje'),(9000,'Murska Sobota '),(9001,'Murska Sobota - poštni predali'),(9201,'Puconci'),(9202,'Mačkovci'),(9203,'Petrovci'),(9204,'Šalovci'),(9205,'Hodoš/Hodos'),(9206,'Križevci'),(9207,'Prosenjakovci/Partosfalva'),(9208,'Fokovci'),(9220,'Lendava/Lendva'),(9221,'Martjanci'),(9222,'Bogojina'),(9223,'Dobrovnik/Dobronak '),(9224,'Turnišče'),(9225,'Velika Polana'),(9226,'Moravske Toplice'),(9227,'Kobilje'),(9231,'Beltinci'),(9232,'Črenšovci'),(9233,'Odranci'),(9240,'Ljutomer'),(9241,'Veržej'),(9242,'Križevci pri Ljutomeru'),(9243,'Mala Nedelja'),(9244,'Sveti Jurij ob Ščavnici'),(9245,'Spodnji Ivanjci'),(9246,'Razkrižje'),(9250,'Gornja Radgona'),(9251,'Tišina'),(9252,'Radenci'),(9253,'Apače'),(9261,'Cankova'),(9262,'Rogašovci'),(9263,'Kuzma'),(9264,'Grad'),(9265,'Bodonci');
/*!40000 ALTER TABLE `tpo_posta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_pregled`
--

DROP TABLE IF EXISTS `tpo_pregled`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_pregled` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opombe` varchar(2048) NOT NULL,
  `datum` datetime NOT NULL,
  `datum_naslednjega` datetime DEFAULT NULL,
  `uporabnik_id` int(11) NOT NULL,
  `zdravnik_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tpo_pregled_f9585d13` (`uporabnik_id`),
  KEY `tpo_pregled_8352a122` (`zdravnik_id`),
  CONSTRAINT `tpo_pregled_uporabnik_id_682fe102_fk_tpo_uporabnik_user_ptr_id` FOREIGN KEY (`uporabnik_id`) REFERENCES `tpo_uporabnik` (`user_ptr_id`),
  CONSTRAINT `tpo_pregled_zdravnik_id_9f698849_fk_tpo_zdravnik_user_ptr_id` FOREIGN KEY (`zdravnik_id`) REFERENCES `tpo_zdravnik` (`user_ptr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_pregled`
--

LOCK TABLES `tpo_pregled` WRITE;
/*!40000 ALTER TABLE `tpo_pregled` DISABLE KEYS */;
INSERT INTO `tpo_pregled` VALUES (1,'Pojesti manj sladkarij','2016-04-12 00:00:00','0000-00-00 00:00:00',2,3),(2,'Zdravniški pregled','2015-05-11 00:00:00','0000-00-00 00:00:00',4,5),(3,'test','2016-05-14 00:00:00','2016-05-14 00:00:00',2,3),(4,'Lorem ipsus iglitus supremzum','2016-05-14 00:00:00','2016-05-14 00:00:00',2,3),(5,'Kontrola čez 3 tedne, v priemru da se pojavijo halucinacije, pojejte pest arašidov.','2016-05-14 00:00:00','2016-05-14 00:00:00',2,3),(6,'Prehlad.','2016-05-14 00:00:00','2016-05-14 00:00:00',2,3),(7,'Holesterol ftw','2016-06-08 00:00:00','2016-06-08 00:00:00',2,3);
/*!40000 ALTER TABLE `tpo_pregled` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_pregled_bolezen`
--

DROP TABLE IF EXISTS `tpo_pregled_bolezen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_pregled_bolezen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pregled_id` int(11) NOT NULL,
  `bolezni_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_pregled_bolezen_pregled_id_14f89749_uniq` (`pregled_id`,`bolezni_id`),
  KEY `tpo_pregled_bolezen_bolezni_id_f9d30d68_fk_tpo_bolezni_id` (`bolezni_id`),
  CONSTRAINT `tpo_pregled_bolezen_bolezni_id_f9d30d68_fk_tpo_bolezni_id` FOREIGN KEY (`bolezni_id`) REFERENCES `tpo_bolezni` (`id`),
  CONSTRAINT `tpo_pregled_bolezen_pregled_id_6d22facf_fk_tpo_pregled_id` FOREIGN KEY (`pregled_id`) REFERENCES `tpo_pregled` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_pregled_bolezen`
--

LOCK TABLES `tpo_pregled_bolezen` WRITE;
/*!40000 ALTER TABLE `tpo_pregled_bolezen` DISABLE KEYS */;
INSERT INTO `tpo_pregled_bolezen` VALUES (1,3,1),(2,4,1),(3,4,4),(4,5,2),(5,5,16),(6,5,21),(7,7,10);
/*!40000 ALTER TABLE `tpo_pregled_bolezen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_pregled_dieta`
--

DROP TABLE IF EXISTS `tpo_pregled_dieta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_pregled_dieta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pregled_id` int(11) NOT NULL,
  `dieta_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_pregled_dieta_pregled_id_bc2c4067_uniq` (`pregled_id`,`dieta_id`),
  KEY `tpo_pregled_dieta_dieta_id_bedbc3ea_fk_tpo_dieta_id` (`dieta_id`),
  CONSTRAINT `tpo_pregled_dieta_dieta_id_bedbc3ea_fk_tpo_dieta_id` FOREIGN KEY (`dieta_id`) REFERENCES `tpo_dieta` (`id`),
  CONSTRAINT `tpo_pregled_dieta_pregled_id_15fbe41c_fk_tpo_pregled_id` FOREIGN KEY (`pregled_id`) REFERENCES `tpo_pregled` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_pregled_dieta`
--

LOCK TABLES `tpo_pregled_dieta` WRITE;
/*!40000 ALTER TABLE `tpo_pregled_dieta` DISABLE KEYS */;
INSERT INTO `tpo_pregled_dieta` VALUES (1,4,2),(2,5,2),(4,5,5),(3,5,6),(5,7,4);
/*!40000 ALTER TABLE `tpo_pregled_dieta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_pregled_zdravilo`
--

DROP TABLE IF EXISTS `tpo_pregled_zdravilo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_pregled_zdravilo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pregled_id` int(11) NOT NULL,
  `zdravilo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_pregled_zdravilo_pregled_id_18c15e2a_uniq` (`pregled_id`,`zdravilo_id`),
  KEY `tpo_pregled_zdravilo_zdravilo_id_c04986e6_fk_tpo_zdravilo_id` (`zdravilo_id`),
  CONSTRAINT `tpo_pregled_zdravilo_pregled_id_7dc83c85_fk_tpo_pregled_id` FOREIGN KEY (`pregled_id`) REFERENCES `tpo_pregled` (`id`),
  CONSTRAINT `tpo_pregled_zdravilo_zdravilo_id_c04986e6_fk_tpo_zdravilo_id` FOREIGN KEY (`zdravilo_id`) REFERENCES `tpo_zdravilo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_pregled_zdravilo`
--

LOCK TABLES `tpo_pregled_zdravilo` WRITE;
/*!40000 ALTER TABLE `tpo_pregled_zdravilo` DISABLE KEYS */;
INSERT INTO `tpo_pregled_zdravilo` VALUES (1,3,16470),(2,3,28479),(3,3,59064),(4,3,82392),(5,4,28479),(8,4,30147),(6,4,59064),(7,4,82392),(9,4,95990),(10,5,11444),(19,5,13200),(20,5,13730),(21,5,23507),(11,5,60755),(22,5,75566),(16,5,102229),(12,5,115746),(13,5,129607),(17,5,139603),(14,5,146097),(15,5,146144),(18,5,146530),(23,7,104426),(26,7,109690),(24,7,109827),(25,7,109932);
/*!40000 ALTER TABLE `tpo_pregled_zdravilo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_roles`
--

DROP TABLE IF EXISTS `tpo_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_roles`
--

LOCK TABLES `tpo_roles` WRITE;
/*!40000 ALTER TABLE `tpo_roles` DISABLE KEYS */;
INSERT INTO `tpo_roles` VALUES (1,'Admin'),(2,'Zdravnik'),(3,'Medicinska sestra'),(4,'Pacient');
/*!40000 ALTER TABLE `tpo_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_sifrantregistriranih`
--

DROP TABLE IF EXISTS `tpo_sifrantregistriranih`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_sifrantregistriranih` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sifra` int(11) NOT NULL,
  `is_used` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_sifrantregistriranih`
--

LOCK TABLES `tpo_sifrantregistriranih` WRITE;
/*!40000 ALTER TABLE `tpo_sifrantregistriranih` DISABLE KEYS */;
INSERT INTO `tpo_sifrantregistriranih` VALUES (1,1000,1),(2,1010,1),(3,1020,1),(4,6001,1),(5,7000,1),(6,7001,1),(7,7002,1),(8,8000,1),(9,8001,1),(10,7003,1),(11,7004,1),(12,7005,1),(13,7006,1),(14,7007,1),(15,7008,1),(16,8002,1),(17,8003,1),(18,8004,1),(19,8005,1),(20,8006,1),(21,7009,1),(22,8007,1),(23,8008,0),(24,8009,0),(25,8010,0),(26,7010,0),(27,7011,0),(28,7012,0),(29,7013,0),(30,8011,0),(31,8012,0),(32,8013,0);
/*!40000 ALTER TABLE `tpo_sifrantregistriranih` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_uporabnik`
--

DROP TABLE IF EXISTS `tpo_uporabnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_uporabnik` (
  `user_ptr_id` int(11) NOT NULL,
  `ime` varchar(100) NOT NULL,
  `priimek` varchar(100) NOT NULL,
  `datum_rojstva` datetime DEFAULT NULL,
  `kraj_rojstva` varchar(50) NOT NULL,
  `naslov` varchar(100) NOT NULL,
  `st_zzzs` int(11) DEFAULT NULL,
  `spol` varchar(6) NOT NULL,
  `krvna_skupina` varchar(3) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `ambulanta_id` int(11) DEFAULT NULL,
  `posta_id` int(11) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `telefon` varchar(100) DEFAULT NULL,
  `kontaktna_oseba_id` int(11) DEFAULT NULL,
  `personalizacija_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_ptr_id`),
  KEY `tpo_uporabnik_ambulanta_id_ece56789_fk_tpo_ambulanta_id` (`ambulanta_id`),
  KEY `tpo_uporabnik_posta_id_6bdccc15_fk_tpo_posta_id` (`posta_id`),
  KEY `tpo_uporabnik_role_id_bf875e13_fk_tpo_roles_id` (`role_id`),
  KEY `tpo_uporabnik_bce1a3ac` (`kontaktna_oseba_id`),
  KEY `tpo_uporabnik_a1ab0c76` (`personalizacija_id`),
  CONSTRAINT `D108a6dc2545ac1503209441781061ef` FOREIGN KEY (`personalizacija_id`) REFERENCES `tpo_personalizacijanadzorneplosce` (`id`),
  CONSTRAINT `tpo_uporabn_kontaktna_oseba_id_f6f344a3_fk_tpo_kontaktnaoseba_id` FOREIGN KEY (`kontaktna_oseba_id`) REFERENCES `tpo_kontaktnaoseba` (`id`),
  CONSTRAINT `tpo_uporabnik_ambulanta_id_ece56789_fk_tpo_ambulanta_id` FOREIGN KEY (`ambulanta_id`) REFERENCES `tpo_ambulanta` (`id`),
  CONSTRAINT `tpo_uporabnik_posta_id_6bdccc15_fk_tpo_posta_id` FOREIGN KEY (`posta_id`) REFERENCES `tpo_posta` (`id`),
  CONSTRAINT `tpo_uporabnik_role_id_bf875e13_fk_tpo_roles_id` FOREIGN KEY (`role_id`) REFERENCES `tpo_roles` (`id`),
  CONSTRAINT `tpo_uporabnik_user_ptr_id_7d916ee9_fk_auth_user_id` FOREIGN KEY (`user_ptr_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_uporabnik`
--

LOCK TABLES `tpo_uporabnik` WRITE;
/*!40000 ALTER TABLE `tpo_uporabnik` DISABLE KEYS */;
INSERT INTO `tpo_uporabnik` VALUES (1,'Administrator','1','0000-00-00 00:00:00','','',NULL,'Moški',NULL,0,NULL,NULL,1,NULL,NULL,NULL),(2,'Janko','Novak','2016-06-03 22:00:00','Celje','Topniška ulica 130',123456789,'Moški','AB+',0,NULL,3000,4,'051555666',1,NULL),(4,'Maja','Novak','2016-10-04 22:00:00','Celje','Jamborjeva 133',9203190,'Ženski','B',0,NULL,3000,4,'0391203910',28,NULL),(7,'Jerica','Kos','2016-03-04 23:00:00','Jesenice','Bled 12',2132133,'Ženski',NULL,0,NULL,2000,4,'051776382',NULL,NULL),(12,'Urška','Rozman','1986-02-06 07:15:23','Kranj','Vojnik 13b',1235667,'Ženski','A',0,NULL,1000,4,'051111222',NULL,NULL),(13,'Nataša','Košir','1986-02-06 07:15:23','Ljubljana','Sežana 172',1235467,'Ženski','B',0,NULL,1000,4,'031222444',NULL,NULL),(14,'Matjaž','Korošec','1986-02-06 07:15:23','Jesenice','Medvode 72',1243467,'Moški','A+',0,NULL,1000,4,'041666777',NULL,NULL),(15,'Ana','Kastelic','1986-02-06 07:15:23','Slovenj Gradec','Petrovče 67',1234343,'Ženski','B+',0,NULL,2000,4,'031888999',NULL,NULL),(16,'Stanislav','Golob','1986-02-06 07:15:23','Koper','Poljane pri Stični 4b',1233267,'Moški','A-',0,NULL,2000,4,'040777888',NULL,NULL),(17,'Rok','Kastelic','1986-02-06 07:15:23','Kranj','Šmohor 21',1321456,'Moški','B-',0,NULL,3000,4,'041888222',NULL,NULL),(18,'Metka','Kastelic','1986-02-06 07:15:23','Celje','Laško 13',1312312,'Ženski','AB',0,NULL,3000,4,'031661662',NULL,NULL),(19,'Franc','Vidmar','1986-02-06 07:15:23','Novo Mesto','Cesta na lavo 22',1232133,'Moški','0',0,NULL,3310,4,'040898767',NULL,NULL);
/*!40000 ALTER TABLE `tpo_uporabnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_uporabnik_bolezni`
--

DROP TABLE IF EXISTS `tpo_uporabnik_bolezni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_uporabnik_bolezni` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uporabnik_id` int(11) NOT NULL,
  `bolezni_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_uporabnik_bolezni_uporabnik_id_e359722b_uniq` (`uporabnik_id`,`bolezni_id`),
  KEY `tpo_uporabnik_bolezni_bolezni_id_913e96bd_fk_tpo_bolezni_id` (`bolezni_id`),
  CONSTRAINT `tpo_uporabnik_bolezni_bolezni_id_913e96bd_fk_tpo_bolezni_id` FOREIGN KEY (`bolezni_id`) REFERENCES `tpo_bolezni` (`id`),
  CONSTRAINT `tpo_uporabnik_uporabnik_id_3d2425de_fk_tpo_uporabnik_user_ptr_id` FOREIGN KEY (`uporabnik_id`) REFERENCES `tpo_uporabnik` (`user_ptr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_uporabnik_bolezni`
--

LOCK TABLES `tpo_uporabnik_bolezni` WRITE;
/*!40000 ALTER TABLE `tpo_uporabnik_bolezni` DISABLE KEYS */;
INSERT INTO `tpo_uporabnik_bolezni` VALUES (1,2,1),(2,2,5),(3,2,7),(5,2,10),(4,4,3);
/*!40000 ALTER TABLE `tpo_uporabnik_bolezni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_uporabnik_dieta`
--

DROP TABLE IF EXISTS `tpo_uporabnik_dieta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_uporabnik_dieta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uporabnik_id` int(11) NOT NULL,
  `dieta_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_uporabnik_dieta_uporabnik_id_ba6f444f_uniq` (`uporabnik_id`,`dieta_id`),
  KEY `tpo_uporabnik_dieta_dieta_id_672e08f1_fk_tpo_dieta_id` (`dieta_id`),
  CONSTRAINT `tpo_uporabnik_dieta_dieta_id_672e08f1_fk_tpo_dieta_id` FOREIGN KEY (`dieta_id`) REFERENCES `tpo_dieta` (`id`),
  CONSTRAINT `tpo_uporabnik_uporabnik_id_72618b92_fk_tpo_uporabnik_user_ptr_id` FOREIGN KEY (`uporabnik_id`) REFERENCES `tpo_uporabnik` (`user_ptr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_uporabnik_dieta`
--

LOCK TABLES `tpo_uporabnik_dieta` WRITE;
/*!40000 ALTER TABLE `tpo_uporabnik_dieta` DISABLE KEYS */;
INSERT INTO `tpo_uporabnik_dieta` VALUES (1,2,1),(2,2,4);
/*!40000 ALTER TABLE `tpo_uporabnik_dieta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_uporabnik_oskrbovanci`
--

DROP TABLE IF EXISTS `tpo_uporabnik_oskrbovanci`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_uporabnik_oskrbovanci` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_uporabnik_id` int(11) NOT NULL,
  `to_uporabnik_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_uporabnik_oskrbovanci_from_uporabnik_id_cb231bde_uniq` (`from_uporabnik_id`,`to_uporabnik_id`),
  KEY `tpo_uporab_to_uporabnik_id_c71a2439_fk_tpo_uporabnik_user_ptr_id` (`to_uporabnik_id`),
  CONSTRAINT `tpo_upor_from_uporabnik_id_752b9c67_fk_tpo_uporabnik_user_ptr_id` FOREIGN KEY (`from_uporabnik_id`) REFERENCES `tpo_uporabnik` (`user_ptr_id`),
  CONSTRAINT `tpo_uporab_to_uporabnik_id_c71a2439_fk_tpo_uporabnik_user_ptr_id` FOREIGN KEY (`to_uporabnik_id`) REFERENCES `tpo_uporabnik` (`user_ptr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_uporabnik_oskrbovanci`
--

LOCK TABLES `tpo_uporabnik_oskrbovanci` WRITE;
/*!40000 ALTER TABLE `tpo_uporabnik_oskrbovanci` DISABLE KEYS */;
INSERT INTO `tpo_uporabnik_oskrbovanci` VALUES (1,2,4),(2,4,7);
/*!40000 ALTER TABLE `tpo_uporabnik_oskrbovanci` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_uporabnik_zdravila`
--

DROP TABLE IF EXISTS `tpo_uporabnik_zdravila`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_uporabnik_zdravila` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uporabnik_id` int(11) NOT NULL,
  `zdravilo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_uporabnik_zdravila_uporabnik_id_c6073d50_uniq` (`uporabnik_id`,`zdravilo_id`),
  KEY `tpo_uporabnik_zdravila_zdravilo_id_8fb85f98_fk_tpo_zdravilo_id` (`zdravilo_id`),
  CONSTRAINT `tpo_uporabnik_uporabnik_id_52b20c3e_fk_tpo_uporabnik_user_ptr_id` FOREIGN KEY (`uporabnik_id`) REFERENCES `tpo_uporabnik` (`user_ptr_id`),
  CONSTRAINT `tpo_uporabnik_zdravila_zdravilo_id_8fb85f98_fk_tpo_zdravilo_id` FOREIGN KEY (`zdravilo_id`) REFERENCES `tpo_zdravilo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_uporabnik_zdravila`
--

LOCK TABLES `tpo_uporabnik_zdravila` WRITE;
/*!40000 ALTER TABLE `tpo_uporabnik_zdravila` DISABLE KEYS */;
INSERT INTO `tpo_uporabnik_zdravila` VALUES (1,2,191),(2,2,11444),(3,2,104426),(6,2,109690),(4,2,109827),(5,2,109932);
/*!40000 ALTER TABLE `tpo_uporabnik_zdravila` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_uporabnik_zdravnik`
--

DROP TABLE IF EXISTS `tpo_uporabnik_zdravnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_uporabnik_zdravnik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uporabnik_id` int(11) NOT NULL,
  `zdravnik_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tpo_uporabnik_zdravnik_f9585d13` (`uporabnik_id`),
  KEY `tpo_uporabnik_zdravnik_8352a122` (`zdravnik_id`),
  CONSTRAINT `tpo_uporabnik_uporabnik_id_f44c15ad_fk_tpo_uporabnik_user_ptr_id` FOREIGN KEY (`uporabnik_id`) REFERENCES `tpo_uporabnik` (`user_ptr_id`),
  CONSTRAINT `tpo_uporabnik_z_zdravnik_id_532cd06d_fk_tpo_zdravnik_user_ptr_id` FOREIGN KEY (`zdravnik_id`) REFERENCES `tpo_zdravnik` (`user_ptr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_uporabnik_zdravnik`
--

LOCK TABLES `tpo_uporabnik_zdravnik` WRITE;
/*!40000 ALTER TABLE `tpo_uporabnik_zdravnik` DISABLE KEYS */;
INSERT INTO `tpo_uporabnik_zdravnik` VALUES (1,2,3);
/*!40000 ALTER TABLE `tpo_uporabnik_zdravnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_ustanova`
--

DROP TABLE IF EXISTS `tpo_ustanova`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_ustanova` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(100) NOT NULL,
  `naslov` varchar(100) NOT NULL,
  `posta_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tpo_ustanova_posta_id_1dd325af_fk_tpo_posta_id` (`posta_id`),
  CONSTRAINT `tpo_ustanova_posta_id_1dd325af_fk_tpo_posta_id` FOREIGN KEY (`posta_id`) REFERENCES `tpo_posta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50502 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_ustanova`
--

LOCK TABLES `tpo_ustanova` WRITE;
/*!40000 ALTER TABLE `tpo_ustanova` DISABLE KEYS */;
INSERT INTO `tpo_ustanova` VALUES (16,'SB NOVA GORICA','ULICA PADLIH BORCEV 13 A',5290),(17,'ZZV NOVA GORICA','VIPAVSKA CESTA 13',5000),(2131,'ZD CELJE','GREGORČIČEVA ULICA 5',3000),(50501,'ZD MEDVODE','OSTROVRHARJEVA ULICA 6',1215);
/*!40000 ALTER TABLE `tpo_ustanova` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_vrednostimeritev`
--

DROP TABLE IF EXISTS `tpo_vrednostimeritev`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_vrednostimeritev` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tip` varchar(50) NOT NULL,
  `enota` varchar(50) NOT NULL,
  `normalno_min` varchar(50) NOT NULL,
  `normalno_max` varchar(50) NOT NULL,
  `nenormalno_min` varchar(50) NOT NULL,
  `nenormalno_max` varchar(50) NOT NULL,
  `nemogoce_min` varchar(50) NOT NULL,
  `nemogoce_max` varchar(50) NOT NULL,
  `sifra` varchar(10) NOT NULL,
  `kdaj_se_meri` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_vrednostimeritev`
--

LOCK TABLES `tpo_vrednostimeritev` WRITE;
/*!40000 ALTER TABLE `tpo_vrednostimeritev` DISABLE KEYS */;
INSERT INTO `tpo_vrednostimeritev` VALUES (1,'Glukoza','mmol/l','4','6','4','Hipoglikemija ni bolezen temveč akutno stanje','0','50','GLUK','7-krat na dan, pred in po obrokih in pred spanjem'),(2,'Krvni pritisk','mmHg','100/60','135/80','90/60','140/90','30','300','KP2','Zjutraj in zvečer'),(3,'Srčni utrip','BPM','60','100','60','100','30','200','BPM3','Meri se skupaj z pritiskom'),(4,'Telesna temperatura','°C','35,5','37,5','35,5','37,5','34','42','TEMP','Meri se 2 – 3 na dan'),(5,'ITM','kg/m^2','20','24','BMI < 20','BMI > 24','15','50','ITM','Meri se običajno enkrat na teden (pri bolnikih s srčnim popuščanjem se meri enkrat na dan)'),(6,'Holesterol','mmol/l','0/0/1.2','5.0/3.0/10','5.001/3.001/10','10/10/10','0/0/1.2','5.001/3.001/10','HOL','Meri se ko se nam zljubi');
/*!40000 ALTER TABLE `tpo_vrednostimeritev` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_zdravilo`
--

DROP TABLE IF EXISTS `tpo_zdravilo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_zdravilo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zdravilo` varchar(100) NOT NULL,
  `navodila` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=600696 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_zdravilo`
--

LOCK TABLES `tpo_zdravilo` WRITE;
/*!40000 ALTER TABLE `tpo_zdravilo` DISABLE KEYS */;
INSERT INTO `tpo_zdravilo` VALUES (191,'Analgin 500 mg tbl','http://data.zdravila.net/pdf/a-010513.pdf'),(666,'Fluimukan 600mg, šumeče tablete',''),(2739,'Calpol 250 mg/5 ml\nperoralna suspenzija','http://www.cbz.si/cbz/bazazdr2.nsf/o/74B2434C07A44F18C12579C2003F4B3E/$File/a-011568.pdf'),(11444,'Concor 5 mg tbl','http://si.draagle.com/#!/drug/kzk/?sub=10'),(12084,'Tadol 100 mg tbl\ns podaljšanim sproščanjem','http://www.cbz.si/cbz/bazazdr2.nsf/o/63B2B4273D302F22C12579C2003F4E25/$File/a-016266.pdf'),(12114,'Tramal 150 mg tbl','http://www.zdravila.net/navodilo.php?navodilo=s-005819.pdf&d'),(13200,'Nolpaza 20 mg gastrorezistentne\ntbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/520C2C9888BDDC6CC12579C2003F6677/$File/a-016474.pdf'),(13730,'Nexium 20 mg gastrorezistentne\ntbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/33C7A15D9E906947C12579C2003F4EB7/$File/a-015564.pdf'),(16470,'Piramil 10 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/F2D46D0FDF63B711C12579C2003F5E1A/$File/a-016418.pdf'),(19348,'Apaurin 10 mg tbl','http://www.krka.si/sl/zdravila-in-izdelki/zdravila-na-recept/apaurintablete/1287/'),(19534,'Mixtard 10 NovoLet 100 i.e./ml suspenzija za injiciranje v napolnjenem injekcijskem peresniku','http://www.diagnosia.com/si/zdravila/mixtard-30-novolet-100-ieml-suspenzija-za-injiciranje-v-napolnjenem-injekcijskem-peresniku'),(20583,'Flonidan 10 mg','http://www.cbz.si/cbz/bazazdr2.nsf/o/85571397365F09F1C12579EC001FF803?opendocument'),(22454,'Ciprobay 500 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/6151BEF7B09CA95AC12579C2003F5062?opendocument'),(23442,'Euthyrox 50 mg tbl','http://si.draagle.com/#!/source/ljn/?drug=ljo'),(23507,'Controloc 20 mg\ngastrorezistentne tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/C780D3BD9FE393DAC12579C2003F50BD/$File/a-015817.pdf'),(25550,'Siofor 1000 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/1D5A54DC62638DE6C12579C2003F61CD/$File/a-014628.pdf'),(25666,'Hiconcil 500 mg trde kapsule','http://www.cbz.si/cbz/bazazdr2.nsf/o/2F6CCCC907EB6078C12579C2003F514E?opendocument'),(26778,'Edemid 40 mg tbl','http://www.lek.si/si/zdravila/na-recept/pakiranje/198/'),(28479,'Enap 10 mg tbl','http://www.krka.si/sl/zdravila-in-izdelki/zdravila-na-recept/enap/1323/#title'),(28622,'Acipan 20 mg gastrorezistentne\ntbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/16D4CBF7CC46F980C12579C2003F67F1/$File/a-016396.pdf'),(30147,'Insuman Rapid 100 i.e./ml OptiSet raztopina za injiciranje','https://myhealthbox.eu/fr/view/1697664/a841ce6cfa958e9d21d2636b18e07e8c/leaflet'),(30619,'Actrapid 100 i.e. Raztopina za injiciranje v viali','https://www.diagnosia.com/si/zdravila/actrapid-100-ieml-raztopina-za-injiciranje-v-viali'),(33880,'Morvesin 0,4 mg trde kapsule','http://www.cbz.si/cbz/bazazdr2.nsf/o/CD18459F93237B13C12579C2003F68AF/$File/a-015652.pdf'),(34487,'Daleron 500 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/1B374BA216FAD256C12579C2003F6932?opendocument'),(38245,'Tanyz 0,4 mg trde kapsule','http://www.cbz.si/cbz/bazazdr2.nsf/o/B940B7C0F083BE58C12579C2003F637A/$File/a-015072.pdf'),(38695,'Omnic Ocas 0,4 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/7C3C54F51BD29C59C12579C2003F63EF?opendocument'),(40096,'Cipralex 10 mg','http://www.cbz.si/cbz/bazazdr2.nsf/o/0049AAE59E3AA8D3C12579C2003F532C?opendocument'),(40398,'Ciprinol 500 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/44DDA83404E35C16C12579C2003F533A/$File/a-015920.pdf'),(40886,'Glucophage 1000 mg tbl','http://si.draagle.com/#!/greader/?file=http%3A%2F%2Fskrito.draagle.com%2Fmedia%2Fd%2Fpil%2F040886_pil.pdf'),(41866,'Ospamox 500 mg\ndisperzibilne tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/1C2B687B0E1FB855C12579C2003F6948/$File/a-016157.pdf'),(42021,'Metfogamma 1000 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/4FC2A54BA1DBA6A0C12579C2003F6956/$File/a-020018.pdf'),(45136,'Lekotam 3 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/1AF7CA6F1A775F6BC12579C2003F53C6/$File/a-015373.pdf'),(46124,'Lexaurin 3 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/5C58B200098CB5A2C12579C2003F53E1?opendocument'),(51101,'Actrapid FlexPen 100 i.e. Raztopina za injiciranje v napolnjenem injekcijskem peresniku','https://www.diagnosia.com/si/zdravila/actrapid-flexpen-100-ieml-raztopina-za-injiciranje-v-napolnjenem-injekcijskem-peresniku'),(51420,'Florgan 10 mg\norodisperzibilne tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/DA55403BA60DE053C12579EC001FF806/$File/a-013832.pdf'),(55654,'Lekadol 500 mg tbl','http://www.lek.si/si/zdravila/brez-recepta/lekadol-filmsko-oblozene-tablete/'),(58238,'Rinolan 10 mg tablete','https://www.lekarna24ur.com/public/upload/dokumenti/Rinolan_navodilo_pdf.pdf'),(58793,'Ecytara 10 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/8911B2FE3FFF0EF2C12579EC001FF931/$File/a-016214.pdf'),(59064,'Olivin 10 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/68FDAEEE845A0E52C12579C2003F563B/$File/a-016414.pdf'),(60755,'Lodoz 5 mg/6,25 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/73A663A39EB07033C12579C2003F5EE2/$File/a-014615.pdf'),(62987,'Claritine S 10 mg tbl','http://www.lekarnar.com/izdelki/claritine-s-tablete'),(69280,'Amoksiklav 500mg/125mg tbl','http://www.lek.si/si/zdravila/na-recept/pakiranje/89/'),(69418,'Primotren 80mg/ 400 mg tbl','http://www.lek.si/si/zdravila/na-recept/pakiranje/433/'),(71684,'Ranital 150 mg tbl','http://www.lek.si/si/zdravila/brez-recepta/ranital-s-150/'),(72656,'Lasix 40 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/582412352E8F356CC12579C2003F58F2?opendocument'),(72940,'Doreta 37,5 mg/325 mg','http://www.cbz.si/cbz/bazazdr2.nsf/o/8BA9838F72FB4FA4C12579EC001FFABB?opendocument'),(75566,'Rupurut 500 mg žvečljive tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/AE0A1FEA862CC338C12579C2003F5986/$File/a-014527.pdf'),(80608,'Glivec 100 mg tbl','http://rxed.eu/sl/g/Glivec/5/'),(82392,'Enalapril Vitabalans 10 mg tbl','http://www.vitabalans.com/index.php?id=zopitin0004'),(85685,'Elicea 10 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/A9B3E333AEC06FBEC12579EC001FFC93/$File/a-016422.pdf'),(86029,'Ciprofloksacin Lek 500 mg tbl','http://www.lek.si/si/zdravila/na-recept/pakiranje/1692/'),(91782,'Tornetis 100 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/396405FCEAF6D06DC12579EC001FFD67/$File/a-014664.pdf'),(92010,'Eltroxin 50 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/2ABD62F024313965C12579C2003F5CBB/$File/a-012092.pdf'),(93351,'Panadol 500 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/97D3848355D4ABDAC12579C2003F5CDE/$File/a-015216.pdf'),(93564,'Viagra 50 mg tbl','https://www.diagnosia.com/si/zdravila/viagra-50-mg-filmsko-oblozene-tablete'),(95990,'Humulin M3 100 i.e./ml suspenzija za injiciranje v vložku','http://www.cbz.si/cbz/bazazdr2.nsf/o/5536585C91748BDFC12579C2003F5D63/$File/a-012384.pdf'),(97420,'Sildenafil Teva 100 mg tbl','https://www.diagnosia.com/si/zdravila/sildenafil-teva-100-mg-filmsko-oblozene-tablete'),(102229,'Lumigan 0,1 mg/ml kapljice','https://www.diagnosia.com/si/zdravila/lumigan-01-mgml-kapljice-za-oko-raztopina'),(104213,'Solatcit 10 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/90DBE9EE574E4B0BC12579EC00200012/$File/a-016440.pdf'),(104426,'Coupet 20 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/F52A113BA34EB9E3C12579EC00200024?opendocument'),(105864,'Combodart 0,5 mg/0,4mg kaps','http://si.draagle.com/#!/greader/?file=http%3A%2F%2Fskrito.draagle.com%2Fmedia%2Fd%2Fpil%2F105864_pil.pdf'),(108375,'Formagliben 500 mg/2,5 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/C35AF3CC02742C17C12579EC0020018C/$File/a-007344.pdf'),(108995,'Belfil 50 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/C78700915441F103C12579EC002001C7?opendocument'),(109690,'Rosuvastatin Teva 20 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/A2118DFEC432DB52C12579EC00200204/$File/a-016289.pdf'),(109827,'Sorvasta 20 mg tbl','http://www.krka.si/sl/zdravila-in-izdelki/zdravila-na-recept/sorvastatablete/1673/'),(109932,'Vosustat 20 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/EBA7391D45C8FEBDC12579EC0020021A/$File/a-014601.pdf'),(114006,'Latanox 50 mg/ml kapljice za oko','http://www.cbz.si/cbz/bazazdr2.nsf/o/159103D546E2C185C12579EC00200367/$File/a-020005.pdf'),(114022,'Timalen 2,5 mg/ml kapljice za oko, raztopina','http://www.cbz.si/cbz/bazazdr2.nsf/o/86C91BB4FE577DACC12579EC00200369/$File/a-014453.pdf'),(115746,'Byol 5 mg tbl','http://www.lek.si/si/zdravila/na-recept/pakiranje/5862/'),(118460,'Otigem 10 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/011783EE948D7D8FC12579EC00200501/$File/a-016059.pdf'),(124680,'Zaracet 37,5 mg/325 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/871247132BF7287FC12579EC0020072B/$File/a-011732.pdf'),(125610,'Citafort 10 mg tbl','http://www.lek.si/si/zdravila/na-recept/pakiranje/5775/'),(128333,'Miktan 0,4 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/374B2D55A7D6E43AC12579EC002008A5/$File/a-016035.pdf'),(129607,'Borez 5 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/C393D32B6CCD5421C12579EC00200928/$File/a-009508.pdf'),(136058,'Tevitamol 500 mg tablete','http://www.cbz.si/cbz/bazazdr2.nsf/o/FCD99A29EDCF611EC12579F900492129/$File/a-016002.pdf'),(139603,'Brimonidin Medops 2 mg/ml kapljice za oko','http://www.cbz.si/cbz/bazazdr2.nsf/o/727DB8859728BBDEC12579F90049223E/$File/a-016139.pdf'),(144343,'Aglurab 1000 mg tbl','http://www.medis.si/fileadmin/medis/medis.si/docs/Navodilo_za_uporabo_Aglurab_SI.pdf'),(145137,'Belformin 500 mg tbl','https://mediately.co/si/drugs/WjSUunNJrYrsXmP7DiMg2FANnb9/belformin-500-mg-filmsko-oblozene-tablete'),(145204,'Imatinib Teva 100 mg tbl','http://rxed.eu/sl/i/Imatinib+Teva/5/'),(145415,'Meaxin 100 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/9F5DD2DFF700BFEDC1257B4B00836C1C/$File/a-013808.pdf'),(145499,'Tramadol Vitabalans 50 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/031488B8CE92CA7AC1257BAC0083438E/$File/a-014109.pdf'),(145976,'Ranitidin Accord 150 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/C3E218A9243FF5E9C1257C310004BB75?opendocument'),(146066,'Ibuem 250 mg/250 mg/50 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/4D14143C7F6E1F04C1257C620004CDD8/$File/a-016095.pdf'),(146097,'Concordina 5 mg/5 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/65930B0D5833253BC1257C780004AF95/$File/a-013730.pdf'),(146102,'Dicitirox 50 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/3291459E7EB4AD14C1257CB400833420?opendocument'),(146144,'Sobycor 5 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/06C4EB4CE17A2068C1257C780004B023/$File/a-013839.pdf'),(146299,'Escitalopram Krka 10 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/C0CAA315ECDB0887C1257CC90083113C/$File/a-016017.pdf'),(146311,'Metamizol STADA 500 mg/ml peroralne kapljice, raztopina','http://www.cbz.si/cbz/bazazdr2.nsf/o/017078003F4E9B32C1257CC90083116E/$File/a-014247.pdf'),(146530,'Bimatoprost Sandoz 0,3 mg/ml kapljice','http://www.cbz.si/cbz/bazazdr2.nsf/o/A3DFEF2F17A035ACC1257D1600831212?opendocument'),(147056,'Betaklav 500 mg/125 mg tbl','http://www.cbz.si/cbz/bazazdr2.nsf/o/1FFC4EAA3F7319EEC1257EAB00837141/$File/a-015915.pdf'),(600695,'Paracetamol svečke 500 mg\n(Lekarne Ljubljana)','http://www.cbz.si/cbz/bazazdr2.nsf/o/C8122F0572FA7141C12579EC001FFF17/$File/a-600695.pdf');
/*!40000 ALTER TABLE `tpo_zdravilo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_zdravilo_navodila`
--

DROP TABLE IF EXISTS `tpo_zdravilo_navodila`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_zdravilo_navodila` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zdravilo_id` int(11) NOT NULL,
  `navodilazdravila_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_zdravila_navodila_zdravila_id_ae4c696f_uniq` (`zdravilo_id`,`navodilazdravila_id`),
  KEY `tpo_zdravila_navo__id` (`navodilazdravila_id`),
  CONSTRAINT `tpo_navodilazdravila_id` FOREIGN KEY (`navodilazdravila_id`) REFERENCES `tpo_navodilazdravila` (`id`),
  CONSTRAINT `tpo_zdravilo_id` FOREIGN KEY (`zdravilo_id`) REFERENCES `tpo_zdravilo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_zdravilo_navodila`
--

LOCK TABLES `tpo_zdravilo_navodila` WRITE;
/*!40000 ALTER TABLE `tpo_zdravilo_navodila` DISABLE KEYS */;
INSERT INTO `tpo_zdravilo_navodila` VALUES (14,191,191),(105,666,666),(15,2739,2739),(16,11444,11444),(17,12084,12084),(18,12114,12114),(19,13200,13200),(20,13730,13730),(21,16470,16470),(22,19348,19348),(23,19534,19534),(24,20583,20583),(25,22454,22454),(26,23442,23442),(27,23507,23507),(28,25550,25550),(29,25666,25666),(30,26778,26778),(31,28479,28479),(32,28622,28622),(33,30147,30147),(34,30619,30619),(35,33880,33880),(36,34487,34487),(37,38245,38245),(38,38695,38695),(39,40096,40096),(40,40398,40398),(41,40886,40886),(42,41866,41866),(43,42021,42021),(44,45136,45136),(45,46124,46124),(46,51101,51101),(47,51420,51420),(48,55654,55654),(49,58238,58238),(50,58793,58793),(51,59064,59064),(52,60755,60755),(53,62987,62987),(54,69280,69280),(55,69418,69418),(56,71684,71684),(57,72656,72656),(58,72940,72940),(59,75566,75566),(60,80608,80608),(61,82392,82392),(62,85685,85685),(63,86029,86029),(64,91782,91782),(65,92010,92010),(66,93351,93351),(67,93564,93564),(68,95990,95990),(69,97420,97420),(70,102229,102229),(71,104213,104213),(72,104426,104426),(73,105864,105864),(74,108375,108375),(75,108995,108995),(76,109690,109690),(77,109827,109827),(78,109932,109932),(79,114006,114006),(80,114022,114022),(81,115746,115746),(82,118460,118460),(83,124680,124680),(84,125610,125610),(85,128333,128333),(86,129607,129607),(87,136058,136058),(88,139603,139603),(89,144343,144343),(90,145137,145137),(91,145204,145204),(92,145415,145415),(93,145499,145499),(94,145976,145976),(95,146066,146066),(96,146097,146097),(97,146102,146102),(98,146144,146144),(99,146299,146299),(100,146311,146311),(101,146530,146530),(102,147056,147056);
/*!40000 ALTER TABLE `tpo_zdravilo_navodila` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_zdravnik`
--

DROP TABLE IF EXISTS `tpo_zdravnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_zdravnik` (
  `user_ptr_id` int(11) NOT NULL,
  `ime` varchar(100) NOT NULL,
  `priimek` varchar(100) NOT NULL,
  `naziv` varchar(50) NOT NULL,
  `tip` varchar(50) NOT NULL,
  `sprejema_paciente` tinyint(1) NOT NULL,
  `prosta_mesta` int(11) NOT NULL,
  `ambulanta_id` int(11) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `sifra_id` int(11) NOT NULL,
  `ustanova_id` int(11) DEFAULT NULL,
  `telefon` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_ptr_id`),
  KEY `tpo_zdravnik_ambulanta_id_77018836_fk_tpo_ambulanta_id` (`ambulanta_id`),
  KEY `tpo_zdravnik_role_id_f2d58716_fk_tpo_roles_id` (`role_id`),
  KEY `tpo_zdravnik_sifra_id_472aa447_fk_tpo_sifrantregistriranih_id` (`sifra_id`),
  KEY `tpo_zdravnik_ustanova_id_51f96f8c_fk_tpo_ustanova_id` (`ustanova_id`),
  CONSTRAINT `tpo_zdravnik_ambulanta_id_77018836_fk_tpo_ambulanta_id` FOREIGN KEY (`ambulanta_id`) REFERENCES `tpo_ambulanta` (`id`),
  CONSTRAINT `tpo_zdravnik_role_id_f2d58716_fk_tpo_roles_id` FOREIGN KEY (`role_id`) REFERENCES `tpo_roles` (`id`),
  CONSTRAINT `tpo_zdravnik_sifra_id_472aa447_fk_tpo_sifrantregistriranih_id` FOREIGN KEY (`sifra_id`) REFERENCES `tpo_sifrantregistriranih` (`id`),
  CONSTRAINT `tpo_zdravnik_user_ptr_id_a0de296f_fk_auth_user_id` FOREIGN KEY (`user_ptr_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `tpo_zdravnik_ustanova_id_51f96f8c_fk_tpo_ustanova_id` FOREIGN KEY (`ustanova_id`) REFERENCES `tpo_ustanova` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_zdravnik`
--

LOCK TABLES `tpo_zdravnik` WRITE;
/*!40000 ALTER TABLE `tpo_zdravnik` DISABLE KEYS */;
INSERT INTO `tpo_zdravnik` VALUES (3,'Darko','Dravinski','dr. med.','osebni',1,10,1,2,1,16,'+3865346356'),(5,'Maja','Miklavc','dr. zoboprotetike','zobozdravnik',1,10,1,2,2,17,'041444111'),(31,'Mervin','Mrak','Dr. splošne medicine','zobozdravnik',1,5,2,2,6,2131,'123456789'),(32,'Rado','Ribar','Dr. medicine','osebni',1,5,6,2,7,50501,'123456789'),(33,'Katarina','Koželj','Dr. medicine','osebni',1,2,6,2,8,50501,'123456789'),(35,'','','','',1,10,NULL,2,10,NULL,NULL),(36,'','','','',1,10,NULL,2,11,NULL,NULL),(37,'','','','',1,10,NULL,2,12,NULL,NULL),(38,'','','','',1,10,NULL,2,13,NULL,NULL),(45,'','','','',1,10,NULL,2,20,NULL,NULL);
/*!40000 ALTER TABLE `tpo_zdravnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpo_zdravnik_medicinske_sestre`
--

DROP TABLE IF EXISTS `tpo_zdravnik_medicinske_sestre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tpo_zdravnik_medicinske_sestre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zdravnik_id` int(11) NOT NULL,
  `osebje_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpo_zdravnik_medicinske_sestre_zdravnik_id_45f0dc53_uniq` (`zdravnik_id`,`osebje_id`),
  KEY `tpo_zdravnik_medici_osebje_id_841a066d_fk_tpo_osebje_user_ptr_id` (`osebje_id`),
  CONSTRAINT `tpo_zdravnik_me_zdravnik_id_bb707526_fk_tpo_zdravnik_user_ptr_id` FOREIGN KEY (`zdravnik_id`) REFERENCES `tpo_zdravnik` (`user_ptr_id`),
  CONSTRAINT `tpo_zdravnik_medici_osebje_id_841a066d_fk_tpo_osebje_user_ptr_id` FOREIGN KEY (`osebje_id`) REFERENCES `tpo_osebje` (`user_ptr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpo_zdravnik_medicinske_sestre`
--

LOCK TABLES `tpo_zdravnik_medicinske_sestre` WRITE;
/*!40000 ALTER TABLE `tpo_zdravnik_medicinske_sestre` DISABLE KEYS */;
INSERT INTO `tpo_zdravnik_medicinske_sestre` VALUES (1,3,6),(3,31,6),(4,32,6),(5,33,6);
/*!40000 ALTER TABLE `tpo_zdravnik_medicinske_sestre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tpo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-09 18:07:49
