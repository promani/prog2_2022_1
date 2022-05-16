var db = require('../database/models');

const controller = {
    index: function(req, res) {
        res.render('index', { title: 'Index'});
    },
    login: function(req, res) {
        res.render('login', { title: 'Login'});
    },
    access: function(req, res) {
        const user = db.User.findOne({ where: {username: req.body.username}})
        if (user.password == req.body.password) {
            res.redirect('/');
        } else {
            throw Error('Invalid credentials.')
        }
    },
    register: function(req, res) {
        res.render('register');
    },
    store: function(req, res) {
        if (!req.body.email) { throw Error('Not email provided.') }
        db.User.create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            })
            .then(function () {
                res.redirect('/');
            })
            .catch(function (error) {
                res.send(error);
            })
    }
}

module.exports = controller;