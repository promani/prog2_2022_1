const array = require('./books.json')

function randomNum () {
    return Math.floor(Math.random() * array.length);
}

function getRandomBook () {
    return array[randomNum()];
}

function findBooksById (id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            return array[i];
        }
    }
    return undefined;
}

function findBooksBy (criteria) {
    let books = [];
    for (let i = 0; i < array.length; i++) {
        Object.keys(criteria).forEach(key => {
            console.log(criteria[key]);
            if (
                array[i][key] 
                && (array[i][key].toUpperCase() == criteria[key].toUpperCase()
                || array[i][key].toUpperCase().includes(criteria[key]))
                ) {
                books.push(array[i]);
            }
        });
    }
    return books;
}

function getAll () {
    return array;
}

module.exports = {
    getAll,
    getRandomBook,
    findBooksBy,
    findBooksById
}