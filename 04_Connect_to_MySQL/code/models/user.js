const Sequelize = require('sequelize');

class User extends Sequelize.Model{

    static initiate(sequelize){ 
        
        User.init(
            { // 컬럼 설정
                name:{
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true,
                },

                age:{
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                },

                married:{
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },

                comment:{
                    type: Sequelize.TEXT,
                    allowNull: true,
                },

                created_at:{
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {   // 테이블 자체 설정
                sequelize,
                    timestamps: false,
                    underscored: false,
                    modelName: 'User',
                    tableName: 'users',
                    paranoid: false,
                    charset: 'utf8',
                    collate: 'utf8_general_ci',
            }
        );
    }

    // 다른 모델과의 관계
    static associate(db){
        /* ----------------------------------------------------------------------------------------------------------- */
         // db.[기본키를포함한모델이름].hasMany(db.[외래키가포함한모델이름], {foreignKey: '[외래키컬럼명]', sourceKey: '[기본키컬럼명]'});
         /* ---------------------------------------------------------------------------------------------------------- */
         db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
    }
};

module.exports = User;
