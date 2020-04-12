-- 建表语句

/*
CREATE TABLE user(
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(50) NOT NULL DEFAULT '',
	`age` TINYINT UNSIGNED NOT NULL DEFAULT 0,
	`gender` ENUM('男', '女') NOT NULL DEFAULT '男',
	PRIMARY KEY (`id`),
	INDEX uname(`username`),
	INDEX age(`age`),
	INDEX gender(`gender`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
*/

-- 数据添加
-- INSERT INTO `user` (`username`, `age`, `gender`) VALUES ('kimoo', 30, '男');

-- 批量添加
-- INSERT INTO `user` (`username`, `age`, `gender`) VALUES ('reci', 6, '女'),('zMouse', 35, '男');

-- 修改、更新数据
-- UPDATE user SET `age` = 5;	-- 更新了表中所有的指定字段的数据，更新的时候要千万小心（有条件更新）

-- 条件更新
-- UPDATE `user` SET `age` = 5 WHERE `id`=2;

-- 删除
-- INSERT INTO `user` (`username`, `age`, `gender`) VALUES ('kimoo', 1, '男');
-- DELETE FROM `user`;	-- 删除也好格外小心
-- DELETE FROM `user` WHERE `id`=8;

-- 查询

-- SELECT username,age,gender FROM user;
-- SELECT * FROM user;	-- * 通配符，但是不推荐，因为性能不好

-- 去重

-- SELECT DISTINCT gender FROM user;
-- SELECT DISTINCT gender,username FROM user;	-- 如果gender和username值完全一样的话，会被去重

-- 分组

-- SELECT gender, count(gender) as count FROM user GROUP BY gender;


-- 条件

-- SELECT * FROM user WHERE gender='男';
-- SELECT * FROM user WHERE gender='男' AND age<20;

-- BETWEEN
-- SELECT * FROM user WHERE age BETWEEN 1 AND 30;

-- LIKE ,一般需要配合指定的通配符来运行：% -> 任意一个或多个字符，_ -> 一个任意字符
-- SELECT * FROM user WHERE username LIKE 'o%';
-- SELECT * FROM user WHERE username LIKE '%o';
-- SELECT * FROM user WHERE username LIKE '%o%';
-- SELECT * FROM user WHERE username LIKE '__o%';

-- IN，范围选择
-- SELECT * FROM user WHERE username='zMouse' OR username='reci';
-- SELECT * FROM user WHERE username IN ('zMouse','reci');

-- BETWEEN、LIKE、IN 都有对应的 NOT
-- SELECT * FROM user WHERE username NOT IN ('zMouse','reci');

-- 正则
-- SELECT * FROM user WHERE age REGEXP '3|1';
-- SELECT * FROM user WHERE username REGEXP '^o';


-- 排序
-- SELECT * FROM user ORDER BY age DESC, id DESC;

-- 限制偏移
-- SELECT * FROM user LIMIT 2 OFFSET 1;
-- SELECT * FROM user LIMIT 1,2;

-- 函数
-- SELECT * FROM user WHERE username='zmouse';	-- 当前数据校对使用的区分大小写的模式
-- SELECT * FROM user WHERE UCASE(username)=UCASE('zmouse');


/*
CREATE TABLE message(
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`uid` INT(11) UNSIGNED NOT NULL DEFAULT 0,
	`content` VARCHAR(50) NOT NULL DEFAULT '',
	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
*/

-- 多表查询

-- SELECT * FROM users,message;

-- SELECT * FROM users,message WHERE users.id=message.uid;

-- SELECT * FROM users JOIN message ON users.id=message.uid;	-- 同上

以左边为主，左边有的数据都要显示出来
-- SELECT * FROM users LEFT JOIN message ON users.id=message.uid;
以右边为主，右边有的数据都要显示出来
-- SELECT * FROM users RIGHT JOIN message ON users.id=message.uid;


users.id取了个名字叫做uid， message.id取了个名字叫做message_id
-- SELECT users.id as uid, users.username, users.age, users.gender, message.id as message_id, message.content FROM users LEFT JOIN message ON users.id=message.uid;





