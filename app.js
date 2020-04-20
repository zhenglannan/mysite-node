var db=require('./mongodb/db.js')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var notfound=require('./middlewares/not-found')

var Router = require('./routes/index');

var app = express();
// 设置允许跨域（防止跨域问题）
app.all('*', (req, res, next) => {
  const {
    origin,
    Origin,
    referer,
    Referer
  } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header("Access-Control-Allow-Origin", allowOrigin);
  // 此处根据前端请求携带的请求头进行配置 
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", 'Express');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
// view engine setup
// 视图引擎设定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
// 指定静态资源所在目录(path.join对路径进行拼接：__dirname为绝对路径)
app.use(express.static(path.join(__dirname, './public')));

// 路由中间件
Router(app)

// （处理404响应）catch 404 and forward to error handler
//  404错误处理中间件
app.use(notfound);

// error handler(错误处理中间件)
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('成功监听端口')
})