var autos = require('../db/autos');

const controller = {
    index: function(req, res) {
        res.render('index', { title: 'Index'});
    },
    login: function(req, res) {
        res.render('login', { title: 'Login'});
    },
    register: function(req, res) {
        res.render('index', { title: 'Register'});
    }
}

module.exports = controller;