module.exports = function (sequelize, dataTypes) {
    const cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        title: { type: dataTypes.STRING },
        author: { type: dataTypes.STRING },
        year_written: { type: dataTypes.INTEGER },
        price: { type: dataTypes.INTEGER },
        cover: { type: dataTypes.STRING },
    }

    const configs = {
        tableName: 'books',
        timestamps: false
    }

    const Book = sequelize.define('Book', cols, configs);

    return Book;
}