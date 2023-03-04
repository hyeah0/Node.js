// post 모델
const Sequelize = require('sequelize');

class Post extends Sequelize.Model{
    static initiate(sequelize){
        Post.init({
            content: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img:{
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            commentid:{
                type: Sequelize.INTEGER
            }
        },{
            sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'Post',
                tableName: 'posts',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
        });
    }
    
    // PostHashtag 모델 생성
    static associate(db){
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    }
}

module.exports = Post;