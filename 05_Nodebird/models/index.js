'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
// ㄴ MySQl 연동시 [config] 폴더 안 [config.json] 파일 정보가 사용된다.

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.initiate(sequelize);
Post.initiate(sequelize);
Hashtag.initiate(sequelize);
User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;
