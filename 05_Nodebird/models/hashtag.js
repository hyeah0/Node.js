// hashtag 모델
const Sequelize = require('sequelize');

class Hashtag extends Sequelize.Model{
    static initate(sequelize){
        Hashtag.init({
            title:{
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
        },{
            sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'Hashtag',
                tableName: 'hashtags',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utfmb4_general_ci'
        });
    }

    static associate(db){
        db.Hashtag.belongsToMany(db.Post, {through: 'PostHshtag'});
    }
}

module.exports = Hashtag;