var autos = require('../db/autos');

const controller = {
    profile: function(req, res) {
        res.render('index');
    },
    edit: function(req, res) {
        res.render('index');
    }
}

module.exports = controller;