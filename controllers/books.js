var books = require('../data/books');
var db = require('../database/models');

const controller = {
    index: function(req, res) {
        db.Book.findAll()
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
        db.Book.findByPk(req.params.id)
            .then(function (book) {
                res.render('books_show', { book });
            })
            .catch(function (error) {
                res.send(error);
            })

    },
    add: function(req, res) {
        res.render('books_add');
    },
    store: function(req, res) {
        db.Book.create(req.body)
            .then(function() {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    }
}

module.exports = controller;