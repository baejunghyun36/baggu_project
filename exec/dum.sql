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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
                            `category_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                            `created_at` datetime(6) DEFAULT NULL,
                            `type` int(11) DEFAULT NULL,
                            `user_idx` bigint(20) DEFAULT NULL,
                            PRIMARY KEY (`category_idx`),
                            KEY `FK7g246dqi09bvahbbvgxun4ey` (`user_idx`),
                            CONSTRAINT `FK7g246dqi09bvahbbvgxun4ey` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES
                           (11,'2023-02-16 09:54:54.657559',2,7),
                           (12,'2023-02-16 09:54:54.662261',3,7),
                           (13,'2023-02-16 09:57:38.725511',0,8),
                           (14,'2023-02-16 09:57:38.726905',1,8),
                           (15,'2023-02-16 10:04:41.698798',3,10),
                           (16,'2023-02-16 10:04:41.700276',12,10),
                           (17,'2023-02-16 10:41:25.974421',0,11),
                           (18,'2023-02-16 10:41:25.979140',6,11),
                           (19,'2023-02-16 11:20:24.276815',2,12),
                           (20,'2023-02-16 11:20:24.280828',8,12),
                           (21,'2023-02-16 12:37:28.253777',0,13),
                           (22,'2023-02-16 12:37:28.257731',1,13);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heart`
--

DROP TABLE IF EXISTS `heart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `heart` (
                         `heart_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                         `created_at` datetime(6) DEFAULT NULL,
                         `trade_fin_idx` bigint(20) DEFAULT NULL,
                         `user_idx` bigint(20) DEFAULT NULL,
                         PRIMARY KEY (`heart_idx`),
                         KEY `FKp0m8q1qwf48qy3k2ip9ujjcbi` (`trade_fin_idx`),
                         KEY `FKcsgbjsvve8kcvl9f3or8jigmn` (`user_idx`),
                         CONSTRAINT `FKcsgbjsvve8kcvl9f3or8jigmn` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`),
                         CONSTRAINT `FKp0m8q1qwf48qy3k2ip9ujjcbi` FOREIGN KEY (`trade_fin_idx`) REFERENCES `trade_fin` (`trade_fin_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heart`
--

LOCK TABLES `heart` WRITE;
/*!40000 ALTER TABLE `heart` DISABLE KEYS */;
INSERT INTO `heart` VALUES
                        (2,'2023-02-16 13:02:00.691306',1,12),
                        (3,'2023-02-16 13:02:02.158674',2,12);
/*!40000 ALTER TABLE `heart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
                        `item_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                        `created_at` datetime(6) DEFAULT NULL,
                        `category` int(11) DEFAULT NULL,
                        `content` varchar(255) DEFAULT NULL,
                        `dong` varchar(255) DEFAULT NULL,
                        `first_img` varchar(255) DEFAULT NULL,
                        `gu` varchar(255) DEFAULT NULL,
                        `is_valid` bit(1) DEFAULT NULL,
                        `modified_at` datetime(6) DEFAULT NULL,
                        `si` varchar(255) DEFAULT NULL,
                        `state` int(11) DEFAULT NULL,
                        `title` varchar(255) DEFAULT NULL,
                        `trade_item_idx` bigint(20) DEFAULT NULL,
                        `user_request_count` int(11) DEFAULT NULL,
                        `version` bigint(20) DEFAULT NULL,
                        `view_count` int(11) DEFAULT NULL,
                        `user` bigint(20) DEFAULT NULL,
                        PRIMARY KEY (`item_idx`),
                        KEY `FKbe7gmhlsuilujnl6bbkqlmexq` (`user`),
                        CONSTRAINT `FKbe7gmhlsuilujnl6bbkqlmexq` FOREIGN KEY (`user`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES
                       (10,'2023-02-16 09:58:10.561563',2,'2345555','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp9dfad019-9ed9-47fa-afa4-7ad2eb46750a.png','강남구','','2023-02-16 10:14:07.833590','서울',1,'1234555',11,1,6,0,8),
                       (11,'2023-02-16 10:02:22.428937',4,'ㅎㅇㅎㅇ','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempbe736751-44f7-4ec6-adb1-bd58b3c38849.png','강남구','','2023-02-16 10:02:57.694067','서울',1,'하이용',10,0,2,0,7),
                       (12,'2023-02-16 10:41:44.711785',3,'테스트','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempa0be9ff0-b77f-4210-b2fc-e406e58eb64c.png','강남구','','2023-02-16 10:56:09.278074','서울',2,'테스트',13,1,4,0,11),
                       (13,'2023-02-16 10:46:55.045687',3,'Fdd','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp85ce34aa-913d-48d3-81d0-8d2be39b486f.jpg','강남구','','2023-02-16 10:56:09.277553','서울',2,'Dddd',12,0,3,0,8),
                       (14,'2023-02-16 11:12:56.964158',4,'5352365','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempc5132f3c-bff5-4229-a9d6-199ef4a01c0c.png','강남구','','2023-02-16 11:14:12.164808','서울',1,'44444',15,0,2,0,8),
                       (15,'2023-02-16 11:13:24.414911',5,'테스트다시','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempb0568c39-6151-402e-a39c-ea3a28f5d38f.png','강남구','','2023-02-16 11:14:12.165281','서울',1,'테스트다시',14,1,3,0,11),
                       (16,'2023-02-16 11:20:57.548002',3,'ㅇㅇㅇ','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempf53ec2c5-c455-4fe4-a1f0-a189936bb3bf.png','강남구','','2023-02-16 13:44:45.356103','서울',1,'설계도 교환하자',31,0,2,0,12),
                       (17,'2023-02-16 11:20:58.542577',3,'ㅇㅇㅇ','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp992cdf65-dc2b-4487-94eb-f9d1c83f5700.png','강남구','','2023-02-16 11:22:46.984825','서울',1,'설계도 교환하자',18,1,3,0,12),
                       (18,'2023-02-16 11:21:33.234613',8,'ㄴㅁㄹ','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempdfc36f0d-5a35-4bf2-b3f0-39769a52b326.png','강남구','','2023-02-16 11:22:46.984341','서울',1,'ㄴㅇㄹ',17,0,2,0,11),
                       (19,'2023-02-16 11:32:21.604076',4,'여성의류','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp9df13ca4-7f7d-4c86-a9a6-49e31b7fda07.jpg','강남구','','2023-02-16 11:33:42.191712','서울',1,'윈도우 팝니다',20,1,3,0,8),
                       (20,'2023-02-16 11:33:04.688713',2,'23','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp5894a15a-742f-4630-bf48-4ec5fc2a52da.png','강남구','','2023-02-16 11:33:42.191257','서울',1,'3',19,0,2,0,7),
                       (21,'2023-02-16 12:36:40.567753',5,'asfd','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempee15b0e0-6a04-4a22-a3c2-a6e355624761.png','강남구','','2023-02-16 14:14:50.010686','서울',2,'asdf',24,1,4,0,11),
                       (22,'2023-02-16 12:36:41.161159',5,'asfd','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp472e8a70-98b0-48b8-ab4f-a7971fe64159.png','강남구','','2023-02-16 14:07:07.024454','서울',2,'asdf',23,0,3,0,11),
                       (23,'2023-02-16 12:37:40.113756',2,'ㅁㄴㅇㄹ','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempc8afa4ad-8677-4acd-b98b-771a96c72ba6.png','강남구','','2023-02-16 14:07:07.024646','서울',2,'ㅁㄴㅇㄹ',22,1,4,0,13),
                       (24,'2023-02-16 12:39:35.767010',5,'ㅁㄴㅇㅁㄴㄹㅇ','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempe2bc15d3-ffb2-4ddd-93da-f13a57557711.png','강남구','','2023-02-16 14:14:50.010472','서울',2,'ㅁㄴㅇㄴㅁㄹ',21,0,3,0,13),
                       (25,'2023-02-16 12:41:02.985102',5,'1122','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempfc3cf1c0-72a3-434b-a59d-b8c533c10dae.png','강남구','','2023-02-16 13:56:31.850180','서울',2,'1122',26,1,4,0,11),
                       (26,'2023-02-16 12:41:23.700986',5,'1212','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp39d55f1e-25a7-40c0-a4aa-1032f524ab24.png','강남구','','2023-02-16 13:56:31.849906','서울',2,'1212',25,0,3,0,13),
                       (27,'2023-02-16 12:44:35.632902',3,'asd','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp8635d825-382a-441e-aa69-b1034ea196cd.png','강남구','\0','2023-02-16 12:44:35.714070','서울',0,'asd',NULL,0,1,0,13),
                       (28,'2023-02-16 12:44:41.671427',5,'???','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp3eb3d6a0-c7ac-4d8d-9cff-ffff80bf5e88.png','강남구','','2023-02-16 14:03:43.086313','서울',2,'???',33,0,3,0,11),
                       (29,'2023-02-16 12:56:18.644923',2,'.','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp9ed96341-ca22-4779-90af-9c2a61963ec4.png','강남구','','2023-02-16 13:02:51.176089','서울',1,'.',30,1,3,0,12),
                       (30,'2023-02-16 13:01:54.998871',5,'코드팝니다','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempa76b0d92-dbf1-4857-880d-43c12db391a7.png','강남구','','2023-02-16 13:02:51.175658','서울',1,'코드',29,0,2,0,8),
                       (31,'2023-02-16 13:44:04.470545',5,'434234','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempf7f169c7-be9e-46a8-adff-d296d78ad7b5.png','강남구','','2023-02-16 13:44:45.356549','서울',1,'34123',16,1,3,0,8),
                       (32,'2023-02-16 13:55:09.015097',3,'후기주세요','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp68746eaa-693a-4a6d-86d1-d3c1f2a3bac6.png','강남구','','2023-02-16 14:00:25.326638','서울',2,'후기작업용',34,1,4,0,13),
                       (33,'2023-02-16 13:55:31.881931',6,'후기주세요','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp777618f5-f035-4d46-b4d0-f3d4fcacb6a5.png','강남구','','2023-02-16 14:03:43.086569','서울',2,'후기작업용2',28,1,4,0,13),
                       (34,'2023-02-16 13:58:41.531551',4,'후기작성?','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp79969532-4092-4ec7-b1b7-3db84ff2aa5f.png','강남구','','2023-02-16 14:00:25.326392','서울',2,'후기작성?',32,0,3,0,11),
                       (35,'2023-02-16 14:11:43.656341',10,'곰돌이 푸 책 아직 안읽으신 분?? 교환해요','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempf0950709-75ae-45ee-bd76-1b12c35b6868.png','강남구','','2023-02-16 14:11:43.870339','서울',0,'곰돌이 푸 책',NULL,0,1,0,12),
                       (36,'2023-02-16 14:12:43.553124',2,'인테리어 식물 바꾸바꾸!!','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/tempb4ba11df-463e-4bd6-a9ee-f83be4b2fea4.png','강남구','','2023-02-16 14:12:43.748818','서울',0,'멜라니 고무나무',NULL,0,1,0,12),
                       (37,'2023-02-16 14:19:22.270059',1,'가져가라','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp897eaa96-f897-4002-8268-4d6be7702421.png','강남구','','2023-02-16 14:19:22.428315','서울',0,'커플 휴대폰 케이스',NULL,0,1,0,12),
                       (38,'2023-02-16 14:24:40.485611',8,'바꾸바꾸!!!','역삼동','https://d9f4zibn3mxwq.cloudfront.net/item/temp8f1846c7-7a6a-4c7f-a143-07fc7d4050d6.jpg','강남구','','2023-02-16 14:25:10.186637','서울',0,'운동기구',NULL,0,2,0,12);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_image`
--

DROP TABLE IF EXISTS `item_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_image` (
                              `item_image_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                              `img_order` int(11) DEFAULT NULL,
                              `item_img` varchar(255) DEFAULT NULL,
                              `item_idx` bigint(20) DEFAULT NULL,
                              PRIMARY KEY (`item_image_idx`),
                              KEY `FKso78k0b8hfefqipx2t7p0qbgo` (`item_idx`),
                              CONSTRAINT `FKso78k0b8hfefqipx2t7p0qbgo` FOREIGN KEY (`item_idx`) REFERENCES `item` (`item_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_image`
--

LOCK TABLES `item_image` WRITE;
/*!40000 ALTER TABLE `item_image` DISABLE KEYS */;
INSERT INTO `item_image` VALUES
    (1,0,'https://d9f4zibn3mxwq.cloudfront.net/item/temp83fd0728-0b5e-4e6e-b32c-8ef2b54694d1.png',11);
/*!40000 ALTER TABLE `item_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_keep`
--

DROP TABLE IF EXISTS `item_keep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_keep` (
                             `item_keep_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                             `created_at` datetime(6) DEFAULT NULL,
                             `is_valid` bit(1) DEFAULT NULL,
                             `item_idx` bigint(20) DEFAULT NULL,
                             `user_idx` bigint(20) DEFAULT NULL,
                             PRIMARY KEY (`item_keep_idx`),
                             KEY `FKl0pedw8ya8qu6v42d5xq18u27` (`item_idx`),
                             KEY `FKo970rjx6s4ou3gdnueeu1e4xv` (`user_idx`),
                             CONSTRAINT `FKl0pedw8ya8qu6v42d5xq18u27` FOREIGN KEY (`item_idx`) REFERENCES `item` (`item_idx`),
                             CONSTRAINT `FKo970rjx6s4ou3gdnueeu1e4xv` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_keep`
--

LOCK TABLES `item_keep` WRITE;
/*!40000 ALTER TABLE `item_keep` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_keep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notify`
--

DROP TABLE IF EXISTS `notify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notify` (
                          `notify_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                          `created_at` datetime(6) DEFAULT NULL,
                          `content` varchar(255) DEFAULT NULL,
                          `read_state` bit(1) DEFAULT NULL,
                          `title` varchar(255) DEFAULT NULL,
                          `type` int(11) DEFAULT NULL,
                          `type_idx` int(11) DEFAULT NULL,
                          `user_idx` bigint(20) DEFAULT NULL,
                          PRIMARY KEY (`notify_idx`),
                          KEY `FKldx43ot0jo4cd61aq4iw9j4vl` (`user_idx`),
                          CONSTRAINT `FKldx43ot0jo4cd61aq4iw9j4vl` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notify`
--

LOCK TABLES `notify` WRITE;
/*!40000 ALTER TABLE `notify` DISABLE KEYS */;
/*!40000 ALTER TABLE `notify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_tag`
--

DROP TABLE IF EXISTS `review_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review_tag` (
                              `review_tag_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                              `created_at` datetime(6) DEFAULT NULL,
                              `type` int(11) DEFAULT NULL,
                              `user_idx` bigint(20) DEFAULT NULL,
                              PRIMARY KEY (`review_tag_idx`),
                              KEY `FK4krqrp4mfbu2vx1i60x3v8l4d` (`user_idx`),
                              CONSTRAINT `FK4krqrp4mfbu2vx1i60x3v8l4d` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_tag`
--

LOCK TABLES `review_tag` WRITE;
/*!40000 ALTER TABLE `review_tag` DISABLE KEYS */;
INSERT INTO `review_tag` VALUES
                             (1,'2023-02-16 10:56:19.821455',3,11),
                             (2,'2023-02-16 10:56:35.324131',0,8),
                             (3,'2023-02-16 13:57:49.919966',0,13),
                             (4,'2023-02-16 14:00:58.136713',0,13),
                             (5,'2023-02-16 14:00:58.139448',1,13),
                             (6,'2023-02-16 14:03:42.457327',0,11),
                             (7,'2023-02-16 14:03:42.462370',1,11),
                             (8,'2023-02-16 14:03:42.464767',2,11),
                             (9,'2023-02-16 14:03:42.466999',3,11),
                             (10,'2023-02-16 14:03:57.925756',0,11),
                             (11,'2023-02-16 14:03:57.928804',1,11),
                             (12,'2023-02-16 14:03:57.931144',2,11),
                             (13,'2023-02-16 14:03:57.933345',3,11);
/*!40000 ALTER TABLE `review_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_text`
--

DROP TABLE IF EXISTS `review_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review_text` (
                               `review_text_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                               `created_at` datetime(6) DEFAULT NULL,
                               `comment` varchar(255) DEFAULT NULL,
                               `is_valid` bit(1) DEFAULT NULL,
                               `receive_user_idx` bigint(20) DEFAULT NULL,
                               `item_idx` bigint(20) DEFAULT NULL,
                               `user_idx` bigint(20) DEFAULT NULL,
                               PRIMARY KEY (`review_text_idx`),
                               KEY `FK3efgymv4ch1vxmasq4g2jqrna` (`item_idx`),
                               KEY `FKf5iiujdlxh5t7s9oqlmlllejp` (`user_idx`),
                               CONSTRAINT `FK3efgymv4ch1vxmasq4g2jqrna` FOREIGN KEY (`item_idx`) REFERENCES `item` (`item_idx`),
                               CONSTRAINT `FKf5iiujdlxh5t7s9oqlmlllejp` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_text`
--

LOCK TABLES `review_text` WRITE;
/*!40000 ALTER TABLE `review_text` DISABLE KEYS */;
INSERT INTO `review_text` VALUES
                              (1,'2023-02-16 10:56:22.674781','네네','',11,12,8),
                              (2,'2023-02-16 10:56:41.798401','ㅇㅇ','',8,13,11),
                              (3,'2023-02-16 13:57:54.821915','dasdfsdfdfasdfsdf','',13,26,11),
                              (4,'2023-02-16 14:03:49.866822','ㅗㅗㅗㅙㅏㅏㅓㅏㅓㅏㅓㅣㅓ','',11,25,13),
                              (5,'2023-02-16 14:04:02.113804','ㅓㅛ러ㅛㅎ러호','',11,34,13);
/*!40000 ALTER TABLE `review_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_detail`
--

DROP TABLE IF EXISTS `trade_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trade_detail` (
                                `trade_detail_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                                `created_at` datetime(6) DEFAULT NULL,
                                `is_valid` bit(1) DEFAULT NULL,
                                `modified_at` datetime(6) DEFAULT NULL,
                                `request_item_idx` bigint(20) DEFAULT NULL,
                                `trade_state` int(11) DEFAULT NULL,
                                `trade_request_idx` bigint(20) DEFAULT NULL,
                                PRIMARY KEY (`trade_detail_idx`),
                                KEY `FKlmtdn1pna67bl3pvujvwn9agj` (`trade_request_idx`),
                                CONSTRAINT `FKlmtdn1pna67bl3pvujvwn9agj` FOREIGN KEY (`trade_request_idx`) REFERENCES `trade_request` (`trade_request_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_detail`
--

LOCK TABLES `trade_detail` WRITE;
/*!40000 ALTER TABLE `trade_detail` DISABLE KEYS */;
INSERT INTO `trade_detail` VALUES
                               (3,'2023-02-16 10:02:36.443718','','2023-02-16 10:02:57.693806',11,1,3),
                               (4,'2023-02-16 10:53:39.954321','','2023-02-16 10:56:09.277073',13,2,4),
                               (5,'2023-02-16 11:13:40.297730','','2023-02-16 11:14:12.164529',14,1,5),
                               (6,'2023-02-16 11:21:46.216702','','2023-02-16 11:22:46.983750',18,1,6),
                               (7,'2023-02-16 11:33:18.587646','','2023-02-16 11:33:42.190987',20,1,7),
                               (8,'2023-02-16 12:37:50.229543','','2023-02-16 14:07:07.024044',22,2,8),
                               (9,'2023-02-16 12:39:46.603736','','2023-02-16 14:14:50.010051',24,2,9),
                               (10,'2023-02-16 12:41:45.419519','','2023-02-16 13:56:31.848599',26,2,10),
                               (11,'2023-02-16 13:02:10.937944','','2023-02-16 13:02:51.175333',30,1,11),
                               (12,'2023-02-16 13:44:30.933281','','2023-02-16 13:44:45.355761',16,1,12),
                               (13,'2023-02-16 13:56:11.154237','','2023-02-16 14:03:43.085913',28,2,13),
                               (14,'2023-02-16 13:58:54.192992','','2023-02-16 14:00:25.324385',34,2,14);
/*!40000 ALTER TABLE `trade_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_fin`
--

DROP TABLE IF EXISTS `trade_fin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trade_fin` (
                             `trade_fin_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                             `created_at` datetime(6) DEFAULT NULL,
                             `heart_count` int(11) DEFAULT NULL,
                             `is_valid` bit(1) DEFAULT NULL,
                             `receive_item_idx` bigint(20) DEFAULT NULL,
                             `receive_nickname` varchar(255) DEFAULT NULL,
                             `receive_profile_img_url` varchar(255) DEFAULT NULL,
                             `receive_user_idx` bigint(20) DEFAULT NULL,
                             `request_item_idx` bigint(20) DEFAULT NULL,
                             `request_nickname` varchar(255) DEFAULT NULL,
                             `request_profile_img_url` varchar(255) DEFAULT NULL,
                             `request_user_idx` bigint(20) DEFAULT NULL,
                             PRIMARY KEY (`trade_fin_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_fin`
--

LOCK TABLES `trade_fin` WRITE;
/*!40000 ALTER TABLE `trade_fin` DISABLE KEYS */;
INSERT INTO `trade_fin` VALUES
                            (1,'2023-02-16 10:56:09.271971',1,'',13,'Tttt','https://d9f4zibn3mxwq.cloudfront.net/user/tempd9453c77-07e0-40f9-87ef-c29df67720ac.png',8,12,'은지',NULL,11),
                            (2,'2023-02-16 10:56:09.751523',1,'',13,'Tttt','https://d9f4zibn3mxwq.cloudfront.net/user/tempd9453c77-07e0-40f9-87ef-c29df67720ac.png',8,12,'은지',NULL,11),
                            (3,'2023-02-16 13:56:31.841510',0,'',26,'이승희',NULL,13,25,'은지',NULL,11),
                            (4,'2023-02-16 13:57:22.848543',0,'',26,'이승희',NULL,13,25,'은지',NULL,11),
                            (5,'2023-02-16 14:00:25.322514',0,'',34,'은지',NULL,11,32,'이승희',NULL,13),
                            (6,'2023-02-16 14:03:43.084608',0,'',28,'은지',NULL,11,33,'이승희',NULL,13),
                            (7,'2023-02-16 14:07:07.022705',0,'',22,'은지',NULL,11,23,'이승희',NULL,13),
                            (8,'2023-02-16 14:08:01.950687',0,'',28,'은지',NULL,11,33,'이승희',NULL,13),
                            (9,'2023-02-16 14:14:50.008425',0,'',24,'이승희',NULL,13,21,'은지',NULL,11),
                            (10,'2023-02-16 14:23:29.636411',0,'',28,'은지',NULL,11,33,'이승희',NULL,13);
/*!40000 ALTER TABLE `trade_fin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_request`
--

DROP TABLE IF EXISTS `trade_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trade_request` (
                                 `trade_request_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                                 `created_at` datetime(6) DEFAULT NULL,
                                 `comment` varchar(255) DEFAULT NULL,
                                 `is_valid` bit(1) DEFAULT NULL,
                                 `modified_at` datetime(6) DEFAULT NULL,
                                 `trade_request_state` int(11) DEFAULT NULL,
                                 `item_idx` bigint(20) DEFAULT NULL,
                                 `user_idx` bigint(20) DEFAULT NULL,
                                 PRIMARY KEY (`trade_request_idx`),
                                 KEY `FKl3jk1at1enqh87pg7voak4xfg` (`item_idx`),
                                 KEY `FKn63f8y6ysnvh0v4cmsppph2ad` (`user_idx`),
                                 CONSTRAINT `FKl3jk1at1enqh87pg7voak4xfg` FOREIGN KEY (`item_idx`) REFERENCES `item` (`item_idx`),
                                 CONSTRAINT `FKn63f8y6ysnvh0v4cmsppph2ad` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_request`
--

LOCK TABLES `trade_request` WRITE;
/*!40000 ALTER TABLE `trade_request` DISABLE KEYS */;
INSERT INTO `trade_request` VALUES
                                (3,'2023-02-16 10:02:36.434729','신청할게요','','2023-02-16 10:02:57.694296',1,10,7),
                                (4,'2023-02-16 10:53:39.945946','가자','','2023-02-16 10:56:09.277307',2,12,8),
                                (5,'2023-02-16 11:13:40.286307','22345','','2023-02-16 11:14:12.165062',1,15,8),
                                (6,'2023-02-16 11:21:46.215283','','','2023-02-16 11:22:46.984611',1,17,11),
                                (7,'2023-02-16 11:33:18.577128','gd','','2023-02-16 11:33:42.191504',1,19,7),
                                (8,'2023-02-16 12:37:50.220686','','','2023-02-16 14:07:07.024237',2,23,11),
                                (9,'2023-02-16 12:39:46.601483','','','2023-02-16 14:14:50.010280',2,21,13),
                                (10,'2023-02-16 12:41:45.417197','','','2023-02-16 13:56:31.849222',2,25,13),
                                (11,'2023-02-16 13:02:10.927937','123456','','2023-02-16 13:02:51.175906',1,29,8),
                                (12,'2023-02-16 13:44:30.922818','바꾸자','','2023-02-16 13:44:45.356328',1,31,12),
                                (13,'2023-02-16 13:56:11.144338','','','2023-02-16 14:03:43.086126',2,33,11),
                                (14,'2023-02-16 13:58:54.190485','','','2023-02-16 14:00:25.326162',2,32,11);
/*!40000 ALTER TABLE `trade_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
                        `user_idx` bigint(20) NOT NULL AUTO_INCREMENT,
                        `created_at` datetime(6) DEFAULT NULL,
                        `dong` varchar(255) DEFAULT NULL,
                        `email` varchar(255) DEFAULT NULL,
                        `gu` varchar(255) DEFAULT NULL,
                        `info` varchar(255) DEFAULT NULL,
                        `is_valid` bit(1) DEFAULT NULL,
                        `kakao_id` varchar(255) DEFAULT NULL,
                        `lat` varchar(255) DEFAULT NULL,
                        `lng` varchar(255) DEFAULT NULL,
                        `modified_at` datetime(6) DEFAULT NULL,
                        `name` varchar(255) DEFAULT NULL,
                        `nickname` varchar(255) DEFAULT NULL,
                        `phone` varchar(255) DEFAULT NULL,
                        `profile_img` varchar(255) DEFAULT NULL,
                        `role` int(11) DEFAULT NULL,
                        `si` varchar(255) DEFAULT NULL,
                        `trade_count` int(11) DEFAULT NULL,
                        `visited_at` datetime(6) DEFAULT NULL,
                        PRIMARY KEY (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
                       (7,'2023-02-16 09:54:39.244675','역삼동','thanku1598@gmail.com','강남구','gdgd','','2625025118','37.5010362','127.0279412','2023-02-16 11:33:18.598474',NULL,'gdgd',NULL,'https://d9f4zibn3mxwq.cloudfront.net/user/temp3bfba49b-b7a8-47a9-8736-66da82fd304e.png',1,'서울',2,'2023-02-16 11:33:18.598474'),
                       (8,'2023-02-16 09:57:26.727430','역삼동','alternative6@naver.com','강남구','T66t','','2664275095','37.5010563','127.0279909','2023-02-16 13:02:10.948849',NULL,'Tttt',NULL,'https://d9f4zibn3mxwq.cloudfront.net/user/tempd9453c77-07e0-40f9-87ef-c29df67720ac.png',1,'서울',3,'2023-02-16 13:02:10.948849'),
                       (10,'2023-02-16 10:04:19.624032','역삼동','dldksco@kakao.com','강남구',NULL,'','2627712440','37.5010234','127.0279081','2023-02-16 10:04:41.701883',NULL,'dfff',NULL,NULL,1,'서울',0,'2023-02-16 10:04:41.701883'),
                       (11,'2023-02-16 10:41:00.770240','역삼동','94applekoo@naver.com','강남구',NULL,'','2646884937','37.501024','127.0279443','2023-02-16 13:58:54.196164',NULL,'은지',NULL,NULL,1,'서울',4,'2023-02-16 13:58:54.196164'),
                       (12,'2023-02-16 11:20:13.738932','역삼동','bae1004kin@naver.com','강남구',NULL,'','2664366213','37.5009759','127.0373502','2023-02-16 13:44:30.943883',NULL,'당산사람',NULL,NULL,1,'서울',1,'2023-02-16 13:44:30.943883'),
                       (13,'2023-02-16 12:37:12.471958','역삼동','unregistered_email','강남구',NULL,'','2652834035','37.5010318','127.0279502','2023-02-16 12:41:45.422664',NULL,'이승희',NULL,NULL,2,'서울',2,'2023-02-16 12:41:45.422664');
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