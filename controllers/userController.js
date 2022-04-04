var autos = require('../db/autos');

const controller = {
    profile: function(req, res) {
        res.render('index', { title: 'Profile'});
    },
    edit: function(req, res) {
        res.render('index', { title: 'Edit'});
    }
}

module.exports = controller;