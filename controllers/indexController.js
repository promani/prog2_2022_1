var db = require('../database/models');
var hasher = require('bcryptjs');

const controller = {
    index: function(req, res) {
        res.render('index', { title: 'Index'});
    },
    login: function(req, res) {
        res.render('login', { title: 'Login'});
    },
    access: function(req, res, next) {
        db.User.findOne({ where: { username: req.body.username }})
            .then(function(user) {
                if (!user) throw Error('User not found.')
                if (hasher.compareSync(req.body.password, user.password)) {
                    res.redirect('/');
                } else {
                    throw Error('Invalid credentials.')
                }
            })
            .catch(function (err) {
                next(err)
            })
    },
    register: function(req, res) {
        res.render('register');
    },
    store: function(req, res) {
        if (!req.body.email) { throw Error('Not email provided.') }
        const hashedPassword = hasher.hashSync(req.body.password, 10);
        db.User.create({
                username: req.body.username,
                password: hashedPassword,
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