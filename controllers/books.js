var books = require('../data/books');

const controller = {
    index: function(req, res) {
        if (Object.keys(req.query).length !== 0) return res.send(books.findBooksBy(req.query));
        res.render('books_index', { books: books.getAll() });
    },
    author: function(req, res) {
        const result = books.findBooksBy({'author': req.params.author});
        res.render('books_index', { books: result });
    },
    show: function(req, res) {
        res.render('books_show', { book: books.findBooksById(req.params.id)});
    }
}

module.exports = controller;