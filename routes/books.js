var express = require('express');
var router = express.Router();
var controller = require('../controllers/books');

router.get('/', controller.index);
router.get('/author/:author', controller.author);
router.get('/:id', controller.show);

module.exports = router;
