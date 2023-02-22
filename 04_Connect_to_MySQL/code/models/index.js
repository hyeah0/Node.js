const Sequelize = require('sequelize');

// process.env.NODE_ENV 가 없으면 'development'
// 배포시에서는 process.env.NODE_ENV를 production 으로 설정한다.
// MySQl 연동시 [config] 폴더 안 [config.json] 파일 정보가 사용된다.
//  ㄴ [config.json] 파일에 operatorAlias 속성이 있다면 삭제한다.
//  ㄴ password 와 데이터베이스 이름을 수정한다.
//    ㄴ process.env.NODE_ENV 가 development이면 development 부분 수정
//    ㄴ process.env.NODE_ENV 가 test이면 test 부분 수정
//    ㄴ process.env.NODE_ENV 가 production이면 production 부분 수정
const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];  // config.json파일의 development
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
module.exports = db;



// 자동생성 코드 ⬇️
// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
