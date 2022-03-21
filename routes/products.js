var express = require('express');
var router = express.Router();
var autos = require('../db/autos');

router.get('/', function(req, res, next) {
  res.send(autos.lista);
});

router.get('/brand/:brand', function(req, res, next) {
  res.send(autos.getCarsByBrand(req.params.brand));
});

router.get('/model/:model/:anio?', function(req, res, next) {
  const result = autos.getCarsByModel(req.params.model, req.params.anio);
  if (result.length == 0) {
    res.send('No hay autos del modelo ' + req.params.model);
  }
  res.send(result);
});

module.exports = router;
