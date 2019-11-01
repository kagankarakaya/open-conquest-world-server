USE master;

DROP PROCEDURE IF EXISTS create_user;
DELIMITER //
CREATE PROCEDURE create_user
(
	user_name	VARCHAR(45),
    world_id	INT(11)
)
BEGIN
    DECLARE sql_error TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET sql_error = TRUE;
    
	START TRANSACTION;
    
    INSERT INTO user (user_name, world_id) VALUES (user_name, world_id);
    IF sql_error = FALSE THEN
		COMMIT;
	ELSE
		ROLLBACK;
	END IF;
    SELECT * FROM user;
END//
DELIMITER ;

CALL create_user("zach", 1);