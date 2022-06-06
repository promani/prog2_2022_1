module.exports = function (sequelize, dataTypes) {
    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        content: { type: dataTypes.STRING },
        user_id: { type: dataTypes.INTEGER },
        book_id: { type: dataTypes.INTEGER },
        created_at: { type: dataTypes.DATE },
    }

    const configs = {
        tableName: 'comments',
        timestamps: false
    }

    const Comment = sequelize.define('Comment', cols, configs);

    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
            as: 'author',
            foreignKey: 'user_id'
        });
        Comment.belongsTo(models.Book, {
            as: 'book',
            foreignKey: 'book_id'
        })
    }

    return Comment;
}