var autos = require('../db/autos');

const controller = {
    index: function(req, res) {
        res.send(autos.lista);
    },
    indexBrand: function(req, res) {
        res.send(autos.getCarsByBrand(req.params.brand));
    },
    indexModel: function(req, res) {
        const results = autos.getCarsByModel(req.params.model, req.params.anio);
        if (results.length == 0) {
            res.send('No hay autos del modelo ' + req.params.model);
        }
        res.send(results);
    },
    show: function(req, res) {
        const result = autos.lista[req.params.id - 1];
        if (!result) {
            res.send('No hay auto con el ID ' + req.params.id);
        }
        res.send(result);
    }
}

module.exports = controller;