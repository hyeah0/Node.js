const Sequelize = require('sequelize');

class Comment extends Sequelize.Model{

    static initiate(sequelize){
        Comment.init(
            {
                comment:{
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                created_at:{
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                }
            },
            {
                sequelize,
                    timestamps: false,
                    modelName: 'comment',
                    tableName: 'comments',
                    paranoid: false,
                    charset: 'utf8mb4',
                    collate: 'utf8mb4_general_ci',
            }
        )
    }
    static associate(db){
         /* ----------------------------------------------------------------------------------------------- */
         // db.[모델이름].belongsTo(db.[기본키포함한모델이름], {foreignKey: '[외래키컬럼명]', targetKey: '[기본키컬럼명]'});
         /* ----------------------------------------------------------------------------------------------- */
        db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id'});
    }
};

module.exports = Comment;