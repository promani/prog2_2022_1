var data = require('../data/data');

const controller = {
    profile: function(req, res) {
        res.render('profile', { user: data.user });
    },
    edit: function(req, res) {
        res.render('index', { title: 'Edit'});
    }
}

module.exports = controller;