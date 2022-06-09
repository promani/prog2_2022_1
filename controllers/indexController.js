var db = require('../database/models');
var op = db.Sequelize.Op;
var hasher = require('bcryptjs');

const controller = {
    index: function(req, res) {
        res.redirect('/books');
    },
    search: function(req, res) {
        db.Book.findAll({ 
            where: {
                [op.or]: [
                    { title: { [op.like]: "%"+req.query.criteria+"%"} },
                    { author: { [op.like]: "%"+req.query.criteria+"%"} }
                ]
            },
            include: [ { association: 'owner' } ] 
        }).then(function (books) {
                res.render('books_index', { books });
            })
            .catch(function (error) {
                res.send(error)
            });
    },
    login: function(req, res) {
        res.render('login', { title: 'Login'});
    },
    access: function(req, res, next) {
        db.User.findOne({ where: { username: req.body.username }})
            .then(function(user) {
                if (!user) throw Error('User not found.')
                if (hasher.compareSync(req.body.password, user.password)) {
                    req.session.user = user;
                    if (req.body.rememberme) {
                        res.cookie('userId', user.id, { maxAge: 1000 * 60 * 60 * 7 })
                    }
                    res.redirect('/');
                } else {
                    throw Error('Invalid credentials.')
                }
            })
            .catch(function (err) {
                next(err)
            })
    },
    logout: function (req, res, next) {
        req.session.user = null;
        res.clearCookie('userId');
        res.redirect('/')
    },
    register: function(req, res) {
        res.render('register');
    },
    store: async function(req, res, next) {
        try {
            if (!req.body.username) { throw Error('Not username provided.') }
            if (!req.body.email) { throw Error('Not email provided.') }
            if (req.body.password.length < 4) { throw Error('Password too short.') }
            const user = await db.User.findOne({ where: { email: req.body.email } })
            if (user) { throw Error('Email already in use.') }
        } catch (err) {
            return res.render('register', { error: err.message });
        }
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