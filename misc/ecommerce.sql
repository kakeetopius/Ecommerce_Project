-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `product_id` int NOT NULL,
  `gender` enum('M','F') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `season` enum('winter','summer','spring','autumn') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `age_group` enum('adult','kids') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'F','spring','adult'),(2,NULL,'winter','adult'),(3,NULL,'autumn','adult'),(4,NULL,'summer','adult'),(5,'F','summer','kids'),(6,'M','spring','kids'),(7,'M','autumn','adult'),(8,'F','winter','adult'),(9,'F','spring','adult'),(10,'F','summer','adult'),(11,'F','autumn','kids'),(12,'F','summer','kids'),(13,NULL,'spring','adult'),(14,'F','winter','adult'),(15,'F','summer','adult'),(16,NULL,'autumn','kids'),(17,'M','winter','adult'),(18,'M','summer','adult'),(19,NULL,'winter','kids'),(20,'F','spring','kids'),(21,'F',NULL,'adult'),(22,'F',NULL,'adult'),(23,'F',NULL,'kids'),(24,'F','summer',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_no` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`order_no`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_item_ibfk_4` FOREIGN KEY (`order_no`) REFERENCES `orders` (`order_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_ibfk_6` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_no` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `status` enum('pending','confirmed','enroute','delivered') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`order_no`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `image_path` varchar(80) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Midnight Elegance Handbag',NULL,450.00,11,'/view/images/product1.webp'),(2,'Rust Trail Sneakers',NULL,680.00,20,'/view/images/product2.webp'),(3,'Desert Drift Sneakers',NULL,520.00,0,'/view/images/product3.webp'),(4,'Fresh Kicks – White & Green',NULL,320.00,20,'/view/images/product4.webp'),(5,'Blush Breeze Sundress',NULL,95.00,2,'/view/images/product5.webp'),(6,'Classic Crisp Men\'s Shirt',NULL,150.00,16,'/view/images/product6.webp'),(7,'Tide Stripe Beach Shirt',NULL,490.00,12,'/view/images/product7.webp'),(8,'Floral Whisper Sundress',NULL,750.00,20,'/view/images/product8.webp'),(9,'Earthy Charm Sundress',NULL,980.00,17,'/view/images/product9.webp'),(10,'Floral Flare Mini Skirt',NULL,180.00,4,'/view/images/product10.webp'),(11,'Cocoa Flow Maxi Skirt',NULL,120.00,20,'/view/images/product11.webp'),(12,'Noir Luxe Hat',NULL,170.00,20,'/view/images/product12.webp'),(13,'Frost-Toned Long Sleeve Shirt',NULL,350.00,8,'/view/images/product13.webp'),(14,'Skyline Denim Shorts',NULL,220.00,20,'/view/images/product14.webp'),(15,'Ocean Blue Classic Jeans',NULL,280.00,0,'/view/images/product15.webp'),(16,'Denim Dusk Shirt',NULL,190.00,20,'/view/images/product16.webp'),(17,'Jet Black Tee',NULL,420.00,20,'/view/images/product17.webp'),(18,'Shadow Knit Sweater',NULL,290.00,20,'/view/images/product18.webp'),(19,'Vivid Pop Jumper',NULL,110.00,20,'/view/images/product19.webp'),(20,'Rose Mist Sweater',NULL,130.00,20,'/view/images/product20.webp'),(21,'Dior Luxe Chain Necklace',NULL,190.00,5,'/view/images/product21.webp'),(22,'Pearl Step Slip-Ons',NULL,250.00,20,'/view/images/product22.webp'),(23,'Ivory Chic Chain Handbag',NULL,100.00,20,'/view/images/product23.webp'),(24,'Noir Chain Luxe Handbag',NULL,310.00,20,'/view/images/product24.webp');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lname` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (21,'Pius','Kakeeto','pius@gmail.com','$2y$10$4Bmwx2XL3NJW2m0SwkH9muav0UMWu4RFBj29uF.i7IHBg73aZITEC'),(22,'John','Doe','johndoe@gmail.com','$2y$10$U3PIRFKVZt9uIa.iZ.WU8.jHUg3HaT1Wk/boxmW6H9p.NzA2oJXTG'),(23,'James','Norris','norj@gmail.com','$2y$10$Y3qJAmk7EHW4DiuTlPRXKehk16BZfhZXD3n8J4HJhy4q7q08KuSG6');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-26 21:36:09
