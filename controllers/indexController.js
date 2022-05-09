var db = require('../database/models');

const controller = {
    index: function(req, res) {
        res.render('index', { title: 'Index'});
    },
    login: function(req, res) {
        res.render('login', { title: 'Login'});
    },
    register: function(req, res) {
        res.render('register');
    },
    prueba: function(req, res) {
        db.Book.findAll()
            .then(function(books){
                res.send(books);
            });
    },
}

module.exports = controller;