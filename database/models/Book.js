module.exports = function (sequelize, dataTypes) {
    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        title: { type: dataTypes.STRING },
        author: { type: dataTypes.STRING },
        year_written: { type: dataTypes.INTEGER },
        price: { type: dataTypes.INTEGER },
        cover: { type: dataTypes.STRING },
        user_id: { type: dataTypes.INTEGER },
        created_at: { type: dataTypes.DATE },
    }

    const configs = {
        tableName: 'books',
        timestamps: false
    }

    const Book = sequelize.define('Book', cols, configs);

    Book.associate = function(models) {
        Book.belongsTo(models.User, {
            as: 'owner',
            foreignKey: 'user_id'
        })
    }

    return Book;
}