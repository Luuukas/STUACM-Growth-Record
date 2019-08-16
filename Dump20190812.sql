-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: acm
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acmer`
--

DROP TABLE IF EXISTS `acmer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `acmer` (
  `acmer_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `sign` tinytext,
  `codeforces` varchar(45) DEFAULT NULL,
  `sdut` varchar(45) DEFAULT NULL,
  `folder` json DEFAULT NULL,
  `mindmap` json DEFAULT NULL,
  `urls` json DEFAULT NULL,
  `mission` json DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`acmer_id`),
  UNIQUE KEY `acmer_id` (`acmer_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acmer`
--

LOCK TABLES `acmer` WRITE;
/*!40000 ALTER TABLE `acmer` DISABLE KEYS */;
INSERT INTO `acmer` VALUES (1,'unknown','...','Luuukas','Luuukas','{\"msg\": \"OK\", \"data\": [[{\"elementName\": \"文件\", \"elementType\": \"folder\", \"childElements\": [{\"fileUrl\": \"https://view.officeapps.live.com/op/view.aspx?src=http://www.stuacm.club/1565520648000.docx\", \"elementName\": \"2017101007.docx\", \"elementType\": \"file\"}]}]], \"status\": 200}','{\"msg\": \"OK\", \"data\": [[{\"detail\": {\"left_urls\": [], \"right_urls\": []}, \"isChange\": 0, \"rootQNum\": 1024, \"elementName\": \"ACM\", \"childElements\": [], \"permissionValue\": 1}]], \"status\": 200}','[]','[{\"name\": \"第二周周训\", \"deadline\": \"2019-06-01\", \"missions\": [{\"url\": \"https://codeforces.com/contest/1/problem/C\", \"title\": \"C - Lieges of Legendre\", \"state0\": \"OK\", \"state1\": \"OK\"}], \"materials\": {\"bing\": \"https://www.bing.com\"}}]','Lukas','Chong516','2017');
/*!40000 ALTER TABLE `acmer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-12 15:24:59
