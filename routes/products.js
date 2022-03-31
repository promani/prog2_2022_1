var express = require('express');
var router = express.Router();
var controller = require('../controllers/productController')

router.get('/', controller.search);
router.get('/:id', controller.show);
router.get('/add', controller.add);


module.exports = router;
