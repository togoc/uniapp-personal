const createError = require('http-errors');
const express = require('express');
const path = require('path');
const busboy = require('connect-busboy');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blog')
const filesRouter = require('./routes/file')
const todosRouter = require('./routes/todos')

const app = express();


//启用gzip
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // 这里就过滤掉了请求头包含'x-no-compression'
    return false
  }
  return compression.filter(req, res)
}
app.use(compression({ filter: shouldCompress }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 链接数据库
require('./db/mongoose')

app.use(busboy());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/blog/user-service', usersRouter);
app.use('/blog/blog-service', blogsRouter);
app.use('/blog/file-service', filesRouter);
app.use('/blog/todo-service', todosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("err", err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
