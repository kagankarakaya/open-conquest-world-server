USE master;

DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS march;
DROP TABLE IF EXISTS tile;
DROP TABLE IF EXISTS map;
DROP TABLE IF EXISTS army;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS world;

CREATE TABLE `world` (
  `world_id` int(11) NOT NULL AUTO_INCREMENT,
  `world_name` varchar(45) NOT NULL,
  PRIMARY KEY (`world_id`),
  UNIQUE KEY `world_id_UNIQUE` (`world_id`),
  UNIQUE KEY `world_name_UNIQUE` (`world_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `world_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `user_world_idx` (`world_id`),
  CONSTRAINT `user_world` FOREIGN KEY (`world_id`) REFERENCES `world` (`world_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `map` (
  `map_id` int(11) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL,
  PRIMARY KEY (`map_id`),
  UNIQUE KEY `world_id_UNIQUE` (`map_id`),
  KEY `map_world_idx` (`world_id`),
  CONSTRAINT `map_world` FOREIGN KEY (`world_id`) REFERENCES `world` (`world_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tile` (
  `tile_id` int(11) NOT NULL AUTO_INCREMENT,
  `map_id` int(11) NOT NULL,
  `tile_type` varchar(45) NOT NULL,
  `tile_row` int(11) NOT NULL,
  `tile_col` int(11) NOT NULL,
  PRIMARY KEY (`tile_id`),
  UNIQUE KEY `tile_id_UNIQUE` (`tile_id`),
  KEY `tile_map_idx` (`map_id`),
  CONSTRAINT `tile_map` FOREIGN KEY (`map_id`) REFERENCES `map` (`map_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `army` (
  `army_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`army_id`),
  UNIQUE KEY `army_id_UNIQUE` (`army_id`),
  KEY `army_user_idx` (`user_id`),
  CONSTRAINT `army_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `march` (
  `march_id` int(11) NOT NULL AUTO_INCREMENT,
  `army_id` int(11) NOT NULL,
  `start_tile_id` int(11) NOT NULL,
  `end_tile_id` int(11) NOT NULL,
  PRIMARY KEY (`march_id`),
  UNIQUE KEY `march_id_UNIQUE` (`march_id`),
  UNIQUE KEY `army_id_UNIQUE` (`army_id`),
  KEY `march_end_tile_idx` (`end_tile_id`),
  KEY `march_start_tile_idx` (`start_tile_id`),
  KEY `march_army_idx` (`army_id`),
  CONSTRAINT `march_army` FOREIGN KEY (`army_id`) REFERENCES `army` (`army_id`),
  CONSTRAINT `march_end_tile` FOREIGN KEY (`end_tile_id`) REFERENCES `tile` (`tile_id`),
  CONSTRAINT `march_start_tile` FOREIGN KEY (`start_tile_id`) REFERENCES `tile` (`tile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `city` (
  `user_id` int(11) NOT NULL,
  `tile_id` int(11) NOT NULL,
  `city_name` varchar(45) NOT NULL,
  `city_level` int(11) NOT NULL,
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_id_UNIQUE` (`city_id`),
  KEY `city_tile_idx` (`tile_id`),
  KEY `city_user` (`user_id`),
  CONSTRAINT `city_tile` FOREIGN KEY (`tile_id`) REFERENCES `tile` (`tile_id`),
  CONSTRAINT `city_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET @world_id = 1;
INSERT INTO world (world_id, world_name) VALUES (@world_id, "world_1");

INSERT INTO user (world_id, user_name) VALUES (@world_id, "test_user_1");
INSERT INTO user (world_id, user_name) VALUES (@world_id, "test_user_2");
INSERT INTO user (world_id, user_name) VALUES (@world_id, "test_user_3");
INSERT INTO user (world_id, user_name) VALUES (@world_id, "test_user_4");
INSERT INTO user (world_id, user_name) VALUES (@world_id, "test_user_5");

INSERT INTO map (world_id) VALUES (@world_id);

DROP PROCEDURE CreateTiles;
DELIMITER $$
CREATE PROCEDURE CreateTiles()
BEGIN
    DECLARE row_num INT;
    DECLARE col_num INT;
    SET row_num = 0;
    SET col_num = 0;
    row_loop:  LOOP
        IF row_num >= 10 THEN
			LEAVE row_loop;
		END IF;
        SET col_num = 0;
		col_loop: LOOP
			IF col_num >= 10 THEN
				LEAVE col_loop;
			END IF;
			INSERT INTO tile (map_id, tile_type, tile_row, tile_col) VALUES (1, 0, row_num, col_num);
			SET col_num = col_num + 1;
		END LOOP;
        SELECT row_num;
		SET row_num = row_num + 1;
	END LOOP;
END$$
DELIMITER ;
Call CreateTiles();

# Insert cities
INSERT INTO city (user_id, tile_id, city_name, city_level) VALUES (1, 1, "test_city_1", 1);
INSERT INTO city (user_id, tile_id, city_name, city_level) VALUES (2, 15, "test_city_2", 2);
INSERT INTO city (user_id, tile_id, city_name, city_level) VALUES (3, 29, "test_city_3", 3);
INSERT INTO city (user_id, tile_id, city_name, city_level) VALUES (4, 43, "test_city_4", 4);
INSERT INTO city (user_id, tile_id, city_name, city_level) VALUES (5, 57, "test_city_5", 5);

# Insert armies
INSERT INTO army (user_id) VALUES (1);
INSERT INTO army (user_id) VALUES (2);
INSERT INTO army (user_id) VALUES (3);
INSERT INTO army (user_id) VALUES (4);
INSERT INTO army (user_id) VALUES (5);

# Insert marches
INSERT INTO march (army_id, start_tile_id, end_tile_id) VALUES (1, 1, 15);
INSERT INTO march (army_id, start_tile_id, end_tile_id) VALUES (2, 15, 29);
INSERT INTO march (army_id, start_tile_id, end_tile_id) VALUES (3, 29, 43);
INSERT INTO march (army_id, start_tile_id, end_tile_id) VALUES (4, 43, 57);
SELECT * FROM march;
