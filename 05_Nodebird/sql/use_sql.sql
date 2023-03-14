SELECT User.id, User.email, User.nick, User.password, 
       User.provider, User.snsId, User.createdAt, User.updatedAt, 
       User.deletedAt, 
       Followers.id AS Followers.id, 
       Followers.nick AS Followers.nick, 
       Followers->Follow.createdAt AS Followers.Follow.createdAt, 
       Followers->Follow.updatedAt AS Followers.Follow.updatedAt, 
       Followers->Follow.followingId AS Followers.Follow.followingId, 
       Followers->Follow.followerId AS Followers.Follow.followerId, 
       Followings.id AS Followings.id, 
       Followings.nick AS Followings.nick, 
       Followings->Follow.createdAt AS Followings.Follow.createdAt, 
       Followings->Follow.updatedAt AS Followings.Follow.updatedAt, 
       Followings->Follow.followingId AS Followings.Follow.followingId, 
       Followings->Follow.followerId AS Followings.Follow.followerId 
       FROM users AS User 
       LEFT OUTER JOIN ( Follow AS Followers->Follow 
       				INNER JOIN users AS Followers ON Followers.id = Followers->Follow.followerId) 
       ON User.id = Followers->Follow.followingId AND (Followers.deletedAt IS NULL) 
       LEFT OUTER JOIN ( Follow AS Followings->Follow 
       INNER JOIN users AS Followings ON Followings.id = Followings->Follow.followingId) 
       ON User.id = Followings->Follow.followerId AND (Followings.deletedAt IS NULL) 
       WHERE (User.deletedAt IS NULL AND User.id = 1);
       
---------------------------------------------------------------------------------------------

--  
select f.*
 from Follow f;
 
 -- 로그인 한 사람이 팔로우 한 사용자
 select f.followerId , u.id as follwingId, u.nick as followingNick
   from nodebird.Follow f
   join nodebird.users u 
     on f.followingId = u.id
    and followerId=2;
  
-- 로그인 한 사람을 팔로우 한 사용자(맞팔 확인 f4f follow for follow)
 select f.followingId, u.id as followerId, u.nick as follwerNick
       , case when u.id = f2.followingId  then 'f4f' else null end as a
   from Follow f
   join nodebird.users u 
     on f.followerId  = u.id
    and followingId = 2
   join Follow f2
     on f.followingId = f2.followerId;
   
-- 로그인 한 사람이 팔로우 한 사용자, 로그인 한사람을 팔로우한 사용
  select DISTINCT f.followerId 
       , u.id as follwingId, u.nick as followingNick
       , f2.followerId, f2.follwerNick
   from nodebird.Follow f
   join nodebird.users u 
     on f.followingId = u.id
    and followerId=2
   right join (select f.followingId, u.id as followerId, u.nick as follwerNick
			   from Follow f
			   join nodebird.users u 
			     on f.followerId  = u.id
			    and followingId = 2) f2
      on f.followerId = f2.followingId
     


   
   
-- id 초기
ALTER TABLE db명.테이블명 AUTO_INCREMENT = 초기화할 숫자;

ALTER TABLE nodebird.hashtags AUTO_INCREMENT = 1;
ALTER TABLE nodebird.posts AUTO_INCREMENT = 1;
 