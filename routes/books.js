var express = require('express');
var router = express.Router();
var controller = require('../controllers/booksController');
var multer = require('multer');
const upload = multer({ dest: 'public/images/uploads' });

router.get('/', controller.index);
router.get('/author/:author', controller.author);

router.get('/:id/edit', controller.edit);
router.post('/:id/edit', upload.single('cover'), controller.update);

router.get('/add', controller.add);
router.post('/add', upload.single('cover'), controller.store);

router.post('/:id/delete', controller.delete);

router.post('/:id/comment', controller.comment);

router.get('/:id', controller.show);

module.exports = router;
