-- 시퀄라이즈로 모델생성시 테이블을 따로 생성하지 않아도 된다.
-- user table
create table nodebird.user(
            id int not null auto_increment,
            email varchar(40) unique,
            nick varchar(15) not null,
            password varchar(100) not null,
            provider enum('local','kakao') not null default 'local',
            snsId varchar(30),
            primary key(id)
);

-- post table
create table nodebird.post(
			id int not null auto_increment,
			content varchar(140) not null,
			img varchar(200),
			commentid int not null,
			primary key(id),
			CONSTRAINT commentid FOREIGN KEY(commentid)
		    REFERENCES nodebird.user(id)
		    ON DELETE CASCADE
);

-- hashtag table
create table hashtag(
	id int auto_increment,
	title varchar(15) not null unique,
	primary key(id)
);
