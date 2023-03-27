// 도메인 모델
// clientSecret : 다른 개발자들이 NodeBird API를 사용할 때 필요한 비밀키
// 자료형 UUID : 충돌 가능성이 적은 랜덤 문자열
const Sequelize = require('sequelize');

class Domain extends Sequelize.Model{
    static initiate(sequelize){
        Domain.init({
            host: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type:{
                type: Sequelize.ENUM('free', 'premium'),
                allowNull: false,
            },
            clientSecret: { 
                type: Sequelize.UUID,   
                allowNull: false,
            },    
        },{ sequelize,
                timestamps: true,
                paranoid: true,
                modelName: 'Domain',
                tableName: 'domains',
        });
    }
    static associate(db){
        db.Domain.belongsTo(db.User);
        // User 기본키 1:n Domain 외래키
    }
}

module.exports = Domain;