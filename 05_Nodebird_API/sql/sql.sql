-- controllers index.js --- renderLogin
-- 로그인한 사용자 정보
-- 시퀄라이즈 
-- const user = await User.findOne({
--            where: {id: req.user?.id|| null},
--            include: {model: Domain},
--        });
-- 쿼리
SELECT `User`.`id`, `User`.`email`
     , `User`.`nick`, `User`.`password`
     , `User`.`provider`
     , `User`.`snsId`
     , `User`.`createdAt`
     , `User`.`updatedAt`
     , `User`.`deletedAt`
     , `Domains`.`id` AS `Domains.id`
     , `Domains`.`host` AS `Domains.host`
     , `Domains`.`type` AS `Domains.type`
     , `Domains`.`clientSecret` AS `Domains.clientSecret`
     , `Domains`.`createdAt` AS `Domains.createdAt`
     , `Domains`.`updatedAt` AS `Domains.updatedAt`
     , `Domains`.`deletedAt` AS `Domains.deletedAt`
     , `Domains`.`UserId` AS `Domains.UserId` 
 FROM `users` AS `User` 
 LEFT OUTER JOIN `domains` AS `Domains` 
   ON `User`.`id` = `Domains`.`UserId` 
  AND (`Domains`.`deletedAt` IS NULL) 
WHERE (`User`.`deletedAt` IS NULL AND `User`.`id` = 1);
 
-- ----------------------------------------------------------------------------------------------
-- controllers index.js --- createDomain
-- 도메인 등록
-- 시퀄라이즈
-- await Domain.create({
--             UserId: req.user.id,
--            host: req.body.host,
--             type: req.body.type,
--             clientSecret: uuidv4(),
--         });
-- 쿼리
INSERT INTO `domains` (`id`,`host`,`type`,`clientSecret`,`createdAt`,`updatedAt`,`UserId`) 
     VALUES (DEFAULT,?,?,?,?,?,?);
























      