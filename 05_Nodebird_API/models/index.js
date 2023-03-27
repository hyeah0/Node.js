'use strict';

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

// model 파일이 많을 경우
const basename = path.basename(__filename);
console.log('-- models index.js --------------------------');

fs.readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회
  .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // 해당 파일의 모델 불러와서 init
    const model = require(path.join(__dirname, file));
    console.log(`file : ${file} | model.name : ${model.name}`);
 
    db[model.name] = model;
    model.initiate(sequelize);
  });
 
  console.log('---------------------------------------------');

Object.keys(db).forEach(modelName => { // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

// model 파일이 적을 경우
// const User = require('./user');
// const Post = require('./post');
// const Hashtag = require('./hashtag');
// const Domain = require('./domain');

// const db = {};
// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// db.sequelize = sequelize;

// db.User = User;
// db.Post = Post;
// db.Hashtag = Hashtag;
// db.Domain = Domain;

// User.initiate(sequelize);
// Post.initiate(sequelize);
// Hashtag.initiate(sequelize);
// Domain.initiate(sequelize);

// User.associate(db);
// Post.associate(db);
// Hashtag.associate(db);
// Domain.associate(db);