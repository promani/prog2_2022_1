module.exports = function (sequelize, dataTypes) {
    const cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        username: { type: dataTypes.STRING }
    }

    const configs = {
        tableName: 'users',
        timestamps: false
    }

    const Book = sequelize.define('User', cols, configs);

    return Book;
}