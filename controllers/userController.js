var db = require('../database/models');

const controller = {
    profile: function(req, res) {
        db.User.findByPk(req.session.user.id, { include: [ { association: 'books' } ] })
            .then(function (user) {
                res.render('profile', { user });
            })
            .catch(function (error) {
                res.send(error)
            });
    },
    edit: function(req, res) {
        res.render('index', { title: 'Edit'});
    }
}

module.exports = controller;