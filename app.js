var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var db = require('./database/models');

// db.sequelize.sync({ force: true });

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var usersRouter = require('./routes/users');

var app = express();

app.use(session({
  secret: 'a_secret_word',
  resave: false,
  saveUninitialized: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cookie middleware
app.use(function(req, res, next) {
  if (!req.session.user && req.cookies.userId) {
    // Find the user
    db.User.findByPk(req.cookies.userId)
      .then(function(data) {
        // Act as login
        req.session.user = data;
        next();
      })
  } else {
    next();
  }
})

// Session middleware
app.use(function(req, res, next) {
  res.locals.me = req.session.user;
  next();
})

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
