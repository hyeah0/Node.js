// user 모델
const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            // id 컬럼 자동 생성
            email:{
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick:{
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password:{
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider:{
                type: Sequelize.ENUM('local','kakao'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId:{
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        },{
            sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
        });
    }

    // follow 모델 생성
    // 1:n  user -> post
    // n:M  
    static associate(db){
        db.User.hasMany(db.Post);

        // user -> user(as followers로 별칭 지정)
        // == select * from user (as) followers 
        //             join follow  w
        //               on followers.id = w.followingId   
        //
        // foreignKey 옵션 : 수동으로 외래키를 지정
        //                  through 모델에 source 모델의 키를 생성할 수 있다.
        // otherKey 옵션 : through 모델에 target 모델의 키를 생성할 수 있다.
        db.User.belongsToMany(db.User, {
            as: 'Followers',
            foreignKey: 'followingId',  //  followersId는 기본키 follwingid는 참조키 (source 모델키(참조키))
            through: 'Follow',
        });

        db.User.belongsToMany(db.User, {
            as: 'Followings',
            foreignKey: 'followerId', // source 모델키(참조키)
            through: 'Follow',
        });
    }
};

module.exports = User;