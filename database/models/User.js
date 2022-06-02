module.exports = function (sequelize, dataTypes) {
    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        username: { type: dataTypes.STRING },
        password: { type: dataTypes.STRING },
        email: { type: dataTypes.STRING }
    }

    const configs = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define('User', cols, configs);

    User.associate = function(models) {
        User.hasMany(models.Book, {
            as: 'books',
            foreignKey: 'user_id'
        })
    }

    return User;
}