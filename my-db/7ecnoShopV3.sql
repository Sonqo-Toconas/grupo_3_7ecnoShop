-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: 7ecnoshop
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id_cart` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id_cart`),
  KEY `user_id_idx` (`user_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id_product`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,5,20,1),(2,5,19,2);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_category`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Accesorios'),(1,'Celulares');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id_color` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_color`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Blanco'),(3,'Dorado'),(2,'Negro'),(4,'Plateado');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id_invoice` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `invoice_date` date NOT NULL,
  `id_product` int(11) NOT NULL,
  `method_pay` varchar(30) NOT NULL DEFAULT 'Efectivo',
  PRIMARY KEY (`id_invoice`),
  KEY `id_user` (`id_user`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON UPDATE CASCADE,
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` mediumtext NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(45) NOT NULL,
  `category_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `uploader_user` int(11) NOT NULL,
  PRIMARY KEY (`id_product`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `category_id_idx` (`category_id`),
  KEY `color_id_idx` (`color_id`),
  KEY `id_user` (`uploader_user`),
  KEY `uploader_user` (`uploader_user`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id_category`),
  CONSTRAINT `color_id` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id_color`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`uploader_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Celular Galaxy A34 Awesome','128 GB',247999.99,'user-1699553496028.png',1,1,0),(2,'Celular Galaxy A14','128 GB',134999.99,'user-1699553744914.png',1,1,0),(5,'Celular Galaxy A54 5G Awesome ','256 GB',336999.99,'user-1699554162810.png',1,1,0),(6,'Celular Galaxy S22 Phantom','128 GB',459999.99,'user-1699554303036.png',1,1,0),(7,'Celular Galaxy S23','256 GB',620999.99,'user-1699554408984.png',1,1,0),(8,'Celular Galaxy S21 FE 5G','128 GB',372999.99,'user-1699554543344.png',1,1,0),(9,'Celular Galaxy A24','128GB',187999.99,'user-1699554631749.png',1,1,0),(10,'Celular Galaxy Z Flip4','128 GB',534999.99,'user-1699554733325.png',1,1,0),(11,'Celular Galaxy Z Flip5','256 GB',724999.99,'user-1699554829128.png',1,1,0),(12,'Motorola Earbuds 105','Auriculares',5649.99,'user-1699555130276.png',2,1,0),(13,'Auriculares Moto XT120','Auriculares',22999.99,'user-1699555233649.png',2,1,0),(14,'Moto Buds 105','Auriculares in ear wireless Bluetooth',33849.99,'user-1699557070748.png',2,1,0),(15,'Motorola Razr 40 Ultra','512 GB',599999.99,'user-1699557275053.png',1,1,0),(16,'Cargador de Pared Turbo Power Tipo C','50W',33199.99,'user-1699557386250.png',2,1,0),(17,'Funda Protectora G42','Ajuste preciso, cómodo y ligero',7749.99,'user-1699557732939.png',2,1,0),(18,'Moto Buds 600','Auriculares in ear TWS bluetooth MB600',77599.99,'user-1699557854790.png',2,1,0),(19,'Celular Moto E22 4/64','64 GB',86999.99,'user-1699558031475.png',1,1,0),(20,'Motorola Edge 40 Pro + control','Procesador Snapdragon® 8 Gen 2, el más avanzado hasta el momento.\r\n256 GB',499999.99,'user-1699558143261.png',1,1,0),(21,'Funda de Silicona Galaxy A72','Funda',7199.99,'user-1699558370471.png',2,1,0),(22,'Auriculares In-Ear IA500',' 3.5mm con micrófono',6999.99,'user-1699558504613.png',2,1,0),(23,'Galaxy Buds2','Auriculares',62474.99,'user-1699558596789.png',2,1,0),(24,'Galaxy Buds2 Pro','Auriculares',106049.99,'user-1699558708319.png',2,1,0),(25,'Celular Moto G72','Sistema de cámaras con sensor principal de 108 MP\r\n128 GB',209999.99,'user-1699558838649.png',1,1,0),(26,'Celular Moto G23','Sistema de cámaras con sensor principal de 108 MP\r\n128 GB',129999.99,'user-1699558945654.png',1,1,5);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solds`
--

DROP TABLE IF EXISTS `solds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solds` (
  `id_sold` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id_sold`),
  KEY `user_id_idx` (`user_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `solds_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON UPDATE CASCADE,
  CONSTRAINT `solds_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id_product`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solds`
--

LOCK TABLES `solds` WRITE;
/*!40000 ALTER TABLE `solds` DISABLE KEYS */;
INSERT INTO `solds` VALUES (1,5,10,1),(2,5,2,3);
/*!40000 ALTER TABLE `solds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` int(10) unsigned NOT NULL,
  `password` varchar(100) NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  `admin` int(11) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,'prueba','11@gmail.com',1234567891,'12345678',NULL,1),(1,'Luciano','user1@gmail.com',3885674321,'$2a$10$.k1/ezyzvI5KE1kkSwNDiu2Arod2wENLHXYpADN/SqUGXayMz2Iq.',NULL,1),(2,'Max','user2@gmail.com',3885674300,'$2a$10$.k1/ezyzvI5KE1kkSwNDiu2Arod2wENLHXYpADN/SqUGXayMz2Iq.',NULL,1),(3,'Carina','user3@gmail.com',3885690321,'$2a$10$.k1/ezyzvI5KE1kkSwNDiu2Arod2wENLHXYpADN/SqUGXayMz2Iq.',NULL,1),(4,'Agustina','user4@gmail.com',3885234321,'$2a$10$.k1/ezyzvI5KE1kkSwNDiu2Arod2wENLHXYpADN/SqUGXayMz2Iq.',NULL,1),(5,'Nayla','user5@gmail.com',3885671788,'$2a$10$DUp5rpQt3vsvSX5VpL25XegM9z6gGGu7HK5dV8TAmyE7q8yhYnO1y',NULL,1),(6,'Diego','user6@gmail.com',3885670994,'$2a$10$.k1/ezyzvI5KE1kkSwNDiu2Arod2wENLHXYpADN/SqUGXayMz2Iq.',NULL,1),(7,'Sara','user7@gmail.com',3886678890,'$2a$10$.k1/ezyzvI5KE1kkSwNDiu2Arod2wENLHXYpADN/SqUGXayMz2Iq.',NULL,1),(23,'Admin','superAdmin@gmail.com',123456789,'$2a$10$DUp5rpQt3vsvSX5VpL25XegM9z6gGGu7HK5dV8TAmyE7q8yhYnO1y','user-1701900037955.jpg',1),(24,'nicolas','1@gmail.com',1234567891,'$2a$10$YxGBN3F6UMWsTNKAeheBs.VVxktA6HdlmMfSVpZNTNlsaJjtILEFm','user-1701994306135.jpg',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-08 22:18:01
