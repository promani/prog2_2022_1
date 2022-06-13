var db = require('../database/models');

const controller = {
    index: function(req, res) {
        db.Book.findAll({ 
            include: { all: true, nested: false }, 
            order: [ ['id', 'DESC']],
        })
            .then(function (books) {
                res.render('books_index', { books });
            })
            .catch(function (error) {
                res.send(error)
            });
    },
    author: function(req, res) {
        db.Book.findAll({
            'where': {'author': req.params.author}
        }).then(function (result) {
            res.render('books_index', { books: result });
        }).catch(function (error) {
            res.send(error);
        })
    },
    show: function(req, res) {
        db.Book.findByPk(req.params.id, { include: { all: true, nested: true } })
            .then(function (book) {
                res.render('books_show', { book });
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    add: function(req, res) {
        if (!req.session.user) { 
            throw Error('Not authorized.')
        }
        res.render('books_add');
    },
    store: function(req, res) {
        if (!req.session.user) { 
            return res.render('books_add', { error: 'Not authorized.' });
        }
        req.body.user_id = req.session.user.id;
        if (req.file) req.body.cover = (req.file.path).replace('public', '');
        db.Book.create(req.body)
            .then(function() {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    },
    delete: function(req, res) {
        if (!req.session.user) {
            throw Error('Not authorized.')
        }
        db.Book.destroy({ where: { id: req.params.id } })
            .then(function() {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    },
    edit: function(req, res) {
        db.Book.findByPk(req.params.id)
            .then(function (book) {
                res.render('books_edit', { book });
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    update: function(req, res) {
        if (req.file) req.body.cover = (req.file.path).replace('public', '');
        db.Book.update(req.body, { where: { id: req.params.id } })
            .then(function(book) {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    },
    comment: function(req, res) {
        if (!req.session.user) { 
            throw Error('Not authorized.')
        }
        // Set user from session user
        req.body.user_id = req.session.user.id;
        // Set book from url params
        req.body.book_id = req.params.id;
        db.Comment.create(req.body)
            .then(function() {
                res.redirect('/books/' + req.params.id)
            })
            .catch(function(error) {
                res.send(error);
            })
    },
}

module.exports = controller;