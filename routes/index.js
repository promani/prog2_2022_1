var express = require('express');
var router = express.Router();
var controller = require('../controllers/indexController')

router.get('/', controller.index);
router.get('/search', controller.search);

router.get('/login', controller.login);
router.post('/login', controller.access);

router.get('/logout', controller.logout);

router.get('/register', controller.register);
router.post('/register', controller.store);


module.exports = router;
