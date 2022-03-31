var autos = require('../db/autos');

const controller = {
    search: function(req, res) {
        res.render('index');
    },
    show: function(req, res) {
        const result = autos.lista[req.params.id - 1];
        if (!result) {
            res.send('No hay auto con el ID ' + req.params.id);
        }
        res.send(result);
    },
    add: function(req, res) {
        res.render('index');
    }
}

module.exports = controller;