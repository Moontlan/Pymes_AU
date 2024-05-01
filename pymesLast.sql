CREATE DATABASE  IF NOT EXISTS `pymes` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pymes`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: pymes7
-- ------------------------------------------------------
-- Server version	5.6.19

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
-- Table structure for table `almaceninsumos`
--

DROP TABLE IF EXISTS `almaceninsumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `almaceninsumos` (
  `Insumos_id` int(11) NOT NULL,
  `Proveedores_id` int(11) NOT NULL,
  `cantidad` varchar(45) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` datetime NOT NULL,
  PRIMARY KEY (`Insumos_id`,`Proveedores_id`),
  KEY `fk_Insumos_has_Proveedores_Proveedores1_idx` (`Proveedores_id`),
  KEY `fk_Insumos_has_Proveedores_Insumos1_idx` (`Insumos_id`),
  CONSTRAINT `fk_Insumos_has_Proveedores_Insumos1` FOREIGN KEY (`Insumos_id`) REFERENCES `insumo` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Insumos_has_Proveedores_Proveedores1` FOREIGN KEY (`Proveedores_id`) REFERENCES `proveedores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `almaceninsumos`
--

LOCK TABLES `almaceninsumos` WRITE;
/*!40000 ALTER TABLE `almaceninsumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `almaceninsumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atributo`
--

DROP TABLE IF EXISTS `atributo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `atributo` (
  `idAtributo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `valor` varchar(45) NOT NULL,
  `idProducto` int(11) NOT NULL,
  PRIMARY KEY (`idAtributo`),
  KEY `id_idx` (`idProducto`),
  CONSTRAINT `fk_id_productos5` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProductos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atributo`
--

LOCK TABLES `atributo` WRITE;
/*!40000 ALTER TABLE `atributo` DISABLE KEYS */;
INSERT INTO `atributo` VALUES (4,'Tall','XLL',3),(5,'Talla','L',4),(6,'Color','Negro',5),(7,'color','negro',6),(8,'fghjk','fghj',6),(9,'Marca','Hp',7),(10,'Pantalla','OLED',7),(11,'Procesador','Inter Core 7',7),(12,'Litros','5',8),(13,'Botella','Plastico',8),(14,'asfgsd','10',9),(15,'asfasf','45',10),(16,'sdfafsd','sdfafdas',12),(19,'sadasdas','asdasdasd',1),(22,'Envases','Botellas y Latas',16),(23,'Sabor','Chocolate y Frsa',13),(27,'Color','Cafe',15),(29,'Harina','Integral',17),(30,'Pantalla','OLED',2),(31,'Bateria','Litio',2);
/*!40000 ALTER TABLE `atributo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Masas'),(2,'Tecnologias'),(3,'Refrescos'),(4,'Ropa');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` datetime NOT NULL,
  PRIMARY KEY (`idCliente`),
  KEY `fk_Cliente_usuario1_idx` (`idCliente`),
  CONSTRAINT `fk_Cliente_usuario1` FOREIGN KEY (`idCliente`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (6,'123 Main St',1,'2023-10-27 13:28:46','2023-10-27 13:28:46'),(7,'123 Main St',1,'2023-10-27 14:21:15','2023-10-27 14:21:15'),(10,'Hazhzh',1,'2023-11-17 16:11:13','2023-11-17 16:11:13');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleventas`
--

DROP TABLE IF EXISTS `detalleventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalleventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idVenta` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` tinyint(4) NOT NULL,
  `nit` varchar(45) NOT NULL,
  `precioUnitario` decimal(18,2) NOT NULL,
  `inporte` decimal(18,2) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`idVenta`),
  KEY `id_idx1` (`idProducto`),
  CONSTRAINT `fk_id_producto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProductos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_venta` FOREIGN KEY (`idVenta`) REFERENCES `venta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleventas`
--

LOCK TABLES `detalleventas` WRITE;
/*!40000 ALTER TABLE `detalleventas` DISABLE KEYS */;
INSERT INTO `detalleventas` VALUES (1,1,2,1,'639543',250.00,100.00,1,'2023-10-11 02:14:40','2023-10-11 02:14:40'),(2,2,10,50,'101',50.00,20.00,1,'2023-10-11 02:14:40','2023-10-11 02:14:40'),(3,3,4,12,'54',20.00,123.00,1,'2023-10-11 02:14:40','2023-10-11 02:14:40'),(4,6,2,1,'123456789',30.00,30.00,1,'2023-11-20 01:00:21','2023-11-20 01:00:21'),(5,7,4,2,'123456789',5.00,10.00,1,'2023-11-20 02:08:11','2023-11-20 02:08:11'),(6,8,2,2,'123456789',20.00,40.00,1,'2023-11-20 05:52:02','2023-11-20 05:52:02'),(7,9,13,2,'123456789',6.00,12.00,1,'2023-11-20 13:15:44','2023-11-20 13:15:44'),(8,10,13,3,'123456789',6.00,18.00,1,'2023-11-20 14:40:18','2023-11-20 14:40:18');
/*!40000 ALTER TABLE `detalleventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insumo`
--

DROP TABLE IF EXISTS `insumo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insumo` (
  `idInsumo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(18,2) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`idInsumo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumo`
--

LOCK TABLES `insumo` WRITE;
/*!40000 ALTER TABLE `insumo` DISABLE KEYS */;
INSERT INTO `insumo` VALUES (1,'Tuercas',12.00,51),(2,'Pernos',55.00,150),(3,'Pantallas',5.00,0),(4,'Transistores',50.00,50),(5,'Plasticos',100.00,0),(6,'Bolsas de Harina',14.00,41),(8,'Levadura',12.00,15);
/*!40000 ALTER TABLE `insumo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insumoproduccion`
--

DROP TABLE IF EXISTS `insumoproduccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insumoproduccion` (
  `Insumo_idInsumo` int(11) NOT NULL,
  `Produccion_id` int(11) NOT NULL,
  `cantidadEntrada` int(11) NOT NULL,
  `cantidadSalida` int(11) NOT NULL,
  `cantidadTotal` int(11) NOT NULL,
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Insumo_idInsumo`,`Produccion_id`),
  KEY `fk_Insumo_has_Produccion_Produccion1_idx` (`Produccion_id`),
  KEY `fk_Insumo_has_Produccion_Insumo1_idx` (`Insumo_idInsumo`),
  CONSTRAINT `fk_Insumo_has_Produccion_Insumo1` FOREIGN KEY (`Insumo_idInsumo`) REFERENCES `insumo` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Insumo_has_Produccion_Produccion1` FOREIGN KEY (`Produccion_id`) REFERENCES `produccion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumoproduccion`
--

LOCK TABLES `insumoproduccion` WRITE;
/*!40000 ALTER TABLE `insumoproduccion` DISABLE KEYS */;
INSERT INTO `insumoproduccion` VALUES (1,14,100,50,50,'2023-11-02 15:03:02'),(3,14,200,100,100,'2023-11-02 15:03:02'),(3,16,100,100,0,'2023-11-03 00:48:06'),(4,16,150,100,50,'2023-11-03 00:48:06'),(5,15,50,50,0,'2023-11-02 15:10:19'),(6,17,50,2,48,'2023-11-20 04:23:08'),(6,18,48,2,46,'2023-11-20 04:31:35'),(6,19,46,1,45,'2023-11-20 13:52:32'),(6,20,45,3,42,'2023-11-20 14:31:34'),(6,21,42,1,41,'2023-11-20 14:39:06'),(8,19,20,1,19,'2023-11-20 13:52:32'),(8,21,19,4,15,'2023-11-20 14:39:06');
/*!40000 ALTER TABLE `insumoproduccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizacion`
--

DROP TABLE IF EXISTS `organizacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organizacion` (
  `idOrganizacion` int(11) NOT NULL,
  `latitud` varchar(60) NOT NULL,
  `longitud` varchar(60) NOT NULL,
  `crearProductos` tinyint(4) DEFAULT NULL,
  `nit` varchar(45) NOT NULL,
  PRIMARY KEY (`idOrganizacion`),
  CONSTRAINT `fk_Organizacion_usuario1` FOREIGN KEY (`idOrganizacion`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizacion`
--

LOCK TABLES `organizacion` WRITE;
/*!40000 ALTER TABLE `organizacion` DISABLE KEYS */;
INSERT INTO `organizacion` VALUES (2,'-17.38416950806081','-66.23642807681274',1,'12349994'),(3,'-17.144914678468933','-64.65798054739953',1,'12345467'),(4,'-17.428936126725386','-66.2207511099444',1,'12345467'),(8,'-17.515064193547175','-65.83238441701208',0,'45678999'),(11,'-17.388757468190608','-66.15898654589246',0,'11223344'),(12,'-17.314122908826878','-66.30919104296875',0,'11223344'),(13,'-17.175097736679355','-66.37991553027344',0,'11223344'),(14,'-17.366557969518585','-66.19177466113281',0,'11223344'),(19,'-17.403253587530305','-65.71318276314226',0,'12345678'),(20,'-17.38315927872751','-66.7962516046867',0,'12345678'),(21,'-17.245934965520092','-66.2469351984367',0,'12345678'),(23,'-17.401069523905385','-66.23915322212663',0,'12345678');
/*!40000 ALTER TABLE `organizacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produccion`
--

DROP TABLE IF EXISTS `produccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idProductos` int(11) NOT NULL,
  `idProductor` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `canrtidad` int(11) NOT NULL,
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_productor_idx` (`idProductor`),
  KEY `fk_id_productos_idx` (`idProductos`),
  CONSTRAINT `fk_id_productor2` FOREIGN KEY (`idProductor`) REFERENCES `productor` (`idProductor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_productos2` FOREIGN KEY (`idProductos`) REFERENCES `productos` (`idProductos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produccion`
--

LOCK TABLES `produccion` WRITE;
/*!40000 ALTER TABLE `produccion` DISABLE KEYS */;
INSERT INTO `produccion` VALUES (14,7,1,1,100,'2023-11-02 15:03:02','2023-11-02 15:03:02'),(15,8,1,1,50,'2023-11-02 15:10:19','2023-11-02 15:10:19'),(16,9,1,1,50,'2023-11-03 00:48:06','2023-11-03 00:48:06'),(17,13,9,1,20,'2023-11-20 04:23:08','2023-11-20 04:23:08'),(18,13,1,1,10,'2023-11-20 04:31:35','2023-11-20 04:31:35'),(19,17,1,1,20,'2023-11-20 13:52:32','2023-11-20 13:52:32'),(20,17,1,1,10,'2023-11-20 14:31:34','2023-11-20 14:31:34'),(21,13,1,1,10,'2023-11-20 14:39:06','2023-11-20 14:39:06');
/*!40000 ALTER TABLE `produccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productor`
--

DROP TABLE IF EXISTS `productor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productor` (
  `idProductor` int(11) NOT NULL,
  `puesto` varchar(45) NOT NULL,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `idOrganizacion` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` datetime NOT NULL,
  PRIMARY KEY (`idProductor`),
  KEY `id_idx` (`idOrganizacion`),
  CONSTRAINT `fk_id_organizacion` FOREIGN KEY (`idOrganizacion`) REFERENCES `organizacion` (`idOrganizacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productores_usuario1` FOREIGN KEY (`idProductor`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productor`
--

LOCK TABLES `productor` WRITE;
/*!40000 ALTER TABLE `productor` DISABLE KEYS */;
INSERT INTO `productor` VALUES (1,'Secretario',123.457,-12.3457,2,1,'2023-10-10 22:14:16','2023-11-20 05:41:46'),(9,'Gerente',123.457,12.3457,2,0,'2023-10-10 22:14:16','2023-11-20 05:42:21'),(15,'Vendedor',-17.4055,-66.1815,2,0,'2023-11-20 04:39:10','2023-11-20 05:45:19'),(16,'Secretario',-17.0688,-66.3772,2,1,'2023-11-20 04:46:29','2023-11-20 04:46:29'),(17,'Vendedor',-17.2652,-66.4296,2,1,'2023-11-20 13:26:24','2023-11-20 13:27:53'),(22,'Vendedor',-17.1668,-66.777,2,1,'2023-11-20 13:44:15','2023-11-20 13:44:35'),(24,'Vendedor',-17.3967,-66.2735,2,1,'2023-11-20 14:21:00','2023-11-20 14:20:59');
/*!40000 ALTER TABLE `productor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `idProductos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(18,2) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `idCategoria` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `idProductor` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` datetime NOT NULL,
  `fechaVencimiento` datetime DEFAULT NULL,
  `mainIndex` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idProductos`),
  KEY `id_idx` (`idCategoria`),
  KEY `id_idx1` (`idProductor`),
  CONSTRAINT `fk_id_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_productor` FOREIGN KEY (`idProductor`) REFERENCES `productor` (`idProductor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Fanta',10.00,'dhsh',1,54,1,0,'2023-10-11 02:14:40','2023-11-20 02:25:44',NULL,0),(2,'Galaxia Series S',20.00,'Telefono inteligente',2,6,1,1,'2023-10-18 14:58:19','2023-11-20 14:30:11',NULL,1),(3,'Fanta',45.00,'',1,4,1,0,'2023-10-27 04:19:31','2023-10-27 12:51:06',NULL,0),(4,'Papa',5.00,'Papa fritas',2,48,1,0,'2023-10-27 12:14:58','2023-11-20 02:08:12',NULL,0),(5,'Botella',15.00,'botella',1,50,1,1,'2023-10-27 15:19:29','2023-10-27 15:19:29',NULL,0),(6,'pepsi',5.00,'jkhjgg',2,56,1,0,'2023-10-27 15:32:47','2023-11-20 02:25:54','2024-07-07 04:00:00',0),(7,'Laptop PruebaF',50.00,'Hp ',1,260,1,0,'2023-11-01 16:46:57','2023-11-20 02:26:04',NULL,0),(8,'Coca Cola',10.00,'Coca cola de 5 listros',2,50,1,0,'2023-11-02 15:08:53','2023-11-20 02:26:10','2023-12-12 04:00:00',0),(9,'Matequilla',20.00,'',2,50,1,0,'2023-11-02 15:14:48','2023-11-20 02:26:17',NULL,0),(10,'Pepsi',20.00,'',2,0,9,1,'2023-11-03 01:39:52','2023-11-03 01:39:52',NULL,0),(12,'sdfasdfa',12312.00,'asdfdfafa',1,0,1,0,'2023-11-17 14:19:26','2023-11-20 02:26:20',NULL,0),(13,'Dona',6.00,'Donas ricas',1,35,1,1,'2023-11-20 04:20:45','2023-11-20 14:40:18',NULL,1),(15,'Poncho de lana',50.00,'Poncho de lana de alpaca',4,0,1,1,'2023-11-20 05:26:00','2023-11-20 13:22:46',NULL,1),(16,'Pepsi',8.00,'Pepsi 2L',3,0,1,1,'2023-11-20 05:30:22','2023-11-20 05:30:22',NULL,1),(17,'Pan',2.00,'Pan de arani',1,30,1,1,'2023-11-20 13:49:17','2023-11-20 14:31:34',NULL,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `celular` varchar(45) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Pepsi','69535444',1,'2023-11-17 12:47:14','2023-11-17 12:47:14'),(2,'Alicia Virreira','77451540',1,'2023-11-20 04:06:11','2023-11-20 13:54:52');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ruta`
--

DROP TABLE IF EXISTS `ruta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ruta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ruta` varchar(200) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`idProducto`),
  CONSTRAINT `fk_id_productos3` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProductos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruta`
--

LOCK TABLES `ruta` WRITE;
/*!40000 ALTER TABLE `ruta` DISABLE KEYS */;
INSERT INTO `ruta` VALUES (4,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698380393/phkfbnyh0mdf4nogleke.png',3,1,'2023-10-27 04:19:33','2023-10-27 04:19:33'),(5,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698380393/rw1djzfgnticqiq2lt0o.png',3,1,'2023-10-27 04:19:33','2023-10-27 04:19:33'),(6,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698408921/zs11agnhoxv4brenbngp.png',4,1,'2023-10-27 12:15:01','2023-10-27 12:15:01'),(7,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698408922/x1nb757uxziotkeiel2l.png',4,1,'2023-10-27 12:15:01','2023-10-27 12:15:01'),(8,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698419992/fngbbdotzmjvwzyp0khl.jpg',5,1,'2023-10-27 15:19:30','2023-10-27 15:19:30'),(9,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698420790/lkkxaa4oyali6olm8uyd.png',6,1,'2023-10-27 15:32:48','2023-10-27 15:32:48'),(10,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698857247/c6zvpcgt83pf09q768le.jpg',7,1,'2023-11-01 16:47:01','2023-11-01 16:47:01'),(11,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698857249/yi9pucfko9t2jaxe1xnj.jpg',7,1,'2023-11-01 16:47:01','2023-11-01 16:47:01'),(12,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698937765/asteoypwasjxey0vwcsj.jpg',8,1,'2023-11-02 15:08:59','2023-11-02 15:08:59'),(13,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698938127/jtad8ruvzx54zbvjdud1.jpg',9,1,'2023-11-02 15:15:04','2023-11-02 15:15:04'),(14,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698938133/csgk6bxbtxmdmm9mdluk.jpg',9,1,'2023-11-02 15:15:04','2023-11-02 15:15:04'),(15,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698975623/twa8x6t2kgfevophefxv.png',10,1,'2023-11-03 01:39:54','2023-11-03 01:39:54'),(16,'https://res.cloudinary.com/di9vckxy5/image/upload/v1698975624/jyhte8zwnummonkuk8xw.png',10,1,'2023-11-03 01:39:54','2023-11-03 01:39:54'),(27,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700348069/kk2uelunx9c2kbggbxme.jpg',1,1,'2023-11-18 22:54:29','2023-11-18 22:54:29'),(28,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700348067/fkb2fvmeaf7b5s5fuiur.jpg',1,1,'2023-11-18 22:54:29','2023-11-18 22:54:29'),(29,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700352802/kzwuqigsljvu06ajwvd5.jpg',2,1,'2023-11-19 00:13:22','2023-11-19 00:13:22'),(30,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700352801/giayqfe63cni4kjqpwoe.jpg',2,1,'2023-11-19 00:13:22','2023-11-19 00:13:22'),(31,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700454047/s2ydyoj4fhvvxhpe0gvr.jpg',13,1,'2023-11-20 04:20:49','2023-11-20 04:20:49'),(32,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700454048/gybav1w3g9uiipikmkbh.jpg',13,1,'2023-11-20 04:20:49','2023-11-20 04:20:49'),(33,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700457962/jh9puf7okd1agclf6lgp.jpg',15,1,'2023-11-20 05:26:02','2023-11-20 05:26:02'),(34,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700457962/ldp7vu0rqjt4dqsthnqg.jpg',15,1,'2023-11-20 05:26:02','2023-11-20 05:26:02'),(35,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700458224/cemdsynbcdweox2v2pew.jpg',16,1,'2023-11-20 05:30:25','2023-11-20 05:30:25'),(36,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700458225/ewl847iyfes3m9q0w3fm.png',16,1,'2023-11-20 05:30:25','2023-11-20 05:30:25'),(37,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700488160/ydzydxz3cu9yjtjysadq.jpg',17,1,'2023-11-20 13:49:21','2023-11-20 13:49:21'),(38,'https://res.cloudinary.com/di9vckxy5/image/upload/v1700488159/sjadujstlht665d1nalo.jpg',17,1,'2023-11-20 13:49:21','2023-11-20 13:49:21');
/*!40000 ALTER TABLE `ruta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `contrasena` varchar(45) NOT NULL,
  `celular` varchar(45) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `fechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Jaider','Pinto','correo@ejemplo.com','25d55ad283aa400af464c76d713c07ad','1234567890',1,'2023-10-10 22:12:51','2023-11-20 05:41:46'),(2,'Organizacion Cuarta','','samuelaraoz789@gmail.com','e10adc3949ba59abbe56e057f20f883e','69535444',1,'2023-10-11 02:13:38','2023-11-20 03:22:25'),(3,'Samuel','Zapata','selenazapatagalarza@gmail.com','e5ee6c58dc3cc0ab9f20b5e5772c7689','69535444',1,'2023-10-25 23:27:17','2023-10-27 12:29:39'),(4,'Samuel','Merida','fargan19staxx@gmail.com','ed6849f4804cff65abc745b78c512154','69535444',1,'2023-10-27 03:05:27','2023-10-27 12:35:39'),(5,'Alicia','Flores','prueba@gmail.com','e10adc3949ba59abbe56e057f20f883e','69535444',1,'2023-10-27 03:05:27','2023-10-27 03:05:27'),(6,'alan','Doe','alan@gmail.com','e10adc3949ba59abbe56e057f20f883e','69535444',1,'2023-10-27 13:28:46','2023-10-27 13:28:46'),(7,'alan','Doe','alan2@gmail.com','123','69535444',1,'2023-10-27 14:21:15','2023-10-27 14:21:15'),(8,'Org','Org','aliciavirreira15@gmail.com','ff825e5c0c73978567ad166c6e460b9d','65659595',1,'2023-10-27 14:56:35','2023-10-27 14:56:34'),(9,'Leo','Leo','Leo@gmail.com','e10adc3949ba59abbe56e057f20f883e','69535444',0,'2023-10-27 14:56:35','2023-11-20 05:42:21'),(10,'Alana','Campos','cliente3@gmail.com','e10adc3949ba59abbe56e057f20f883e','545754572',1,'2023-11-17 16:11:13','2023-11-17 16:11:13'),(11,'CualquierCosa','Rocha','joel999rey@gmail.com','9e23f80b87e043fed4a3387f57e1be70','77754534',1,'2023-11-20 02:48:29','2023-11-20 02:48:26'),(12,'Organizacion Primero','frut','cris999joel@gmail.com','a8d376541e145a03914da0eadd8a6d0c','77754534',1,'2023-11-20 03:01:13','2023-11-20 03:01:11'),(13,'Organizacion Segunda','Reyes','segundo@gmail.com','6d48bf99793f7f0448e706cc4de0ef06','77754534',1,'2023-11-20 03:06:40','2023-11-20 03:06:38'),(14,'Organizacion Tercera','ddd','tercera@gmail.com','7922fc234dcd3b79cdc98faed52404a6','77754534',1,'2023-11-20 03:11:05','2023-11-20 03:11:04'),(15,'Alan','Quispe','alanquispe@gmail.com','9bec4205b4a2d6a84a32d5e4a5a24e37','76989107',0,'2023-11-20 04:39:10','2023-11-20 05:45:19'),(16,'Fernando','Aparicio','fernando@gmail.com','5a070efdc5b4680e20d4316d5941da01','77754534',1,'2023-11-20 04:46:29','2023-11-20 04:46:29'),(17,'Nilton','Amaru','nilton@gmail.com','a8b346bb752c8b4fb9abf5a3099c4149','77754535',1,'2023-11-20 13:26:24','2023-11-20 13:27:53'),(18,'Admin','Admin','admin@gmail.com','e10adc3949ba59abbe56e057f20f883e','77451540',1,'2023-11-20 13:26:24','2023-11-20 13:26:24'),(19,'organizacion quinta','','org@gmail.com','2daae1b41ff5a03b99f966f78385b8c3','77865564',1,'2023-11-20 13:33:09','2023-11-20 13:33:08'),(20,'Organizacion sexta','','org2@gmail.com','0e755307c98a495730a2eda8f279d99c','77889093',1,'2023-11-20 13:36:32','2023-11-20 13:36:31'),(21,'Organizacion Septima','','org3@gmail.com','7ca8e3abf945543e6b7cd441b2b086f2','73333333',1,'2023-11-20 13:38:47','2023-11-20 13:42:53'),(22,'Marco','lopez','marco2@gmail.com','8f7c209578065c7f3e5e4fd919e97a40','7666666',1,'2023-11-20 13:44:15','2023-11-20 13:44:35'),(23,'Organizacion Octavo','','moontlan.dev@gmail.com','1590a1767af7e0e48a6aecd8e1fbfc47','69535433',1,'2023-11-20 14:16:07','2023-11-20 14:17:22'),(24,'Alicia','Virreira','ama999rey@gmail.com','898f677c8e2e2eb9486eb89bd6f16037','76989105',1,'2023-11-20 14:21:00','2023-11-20 14:20:59');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` int(11) NOT NULL,
  `total` decimal(18,2) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `fechaRegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`idCliente`),
  CONSTRAINT `fk_id_cliente` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (1,6,100.00,1,'2023-10-11 02:14:40'),(2,7,500.00,1,'2023-10-11 02:14:40'),(3,6,100.00,1,'2023-10-11 02:14:40'),(6,6,10.00,1,'2023-11-20 01:00:21'),(7,6,5.00,1,'2023-11-20 02:08:11'),(8,6,40.00,1,'2023-11-20 05:52:02'),(9,6,12.00,1,'2023-11-20 13:15:44'),(10,6,18.00,1,'2023-11-20 14:40:18');
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-21 19:28:51