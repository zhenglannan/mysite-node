// app.use() 的出场顺序非常重要，use的先后顺序决定了中间函数的优先级。  
var db = require('./mongodb/db.js')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session); //session存储到数据库中
var notfound = require('./middlewares/not-found')

var Router = require('./routes/index');

var app = express();
// 设置允许跨域（防止跨域问题）
app.all('*', (req, res, next) => {
  // const {
  //   origin,
  //   Origin,
  //   referer,
  //   Referer
  // } = req.headers;
  // const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header("Access-Control-Allow-Origin", '*');
  // 此处根据前端请求携带的请求头进行配置 
  res.header("Access-Control-Allow-Headers", "Origin,Accept,Content-Type, Authorization, X-Requested-With");
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

app.use(logger('dev'));//通常是第一个，可以记录全部请求。
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// 解析前端传过来的cookie
app.use(cookieParser());
// 一定要在路由配置之前session
app.use(session({
  secret: 'keyboard cat', //（ 对session id 相关的cookie 进行签名）配置加密字符串，它会在原有加密基础之上cookie和这个字符串拼接起来加密
  resave: false, //即使session没有被修改也保存session
  saveUninitialized: true, //无论你是否使用session，都默认直接给你分配一把钥匙
  cookie: {//设置cookie过期时间
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }, 
  store: new MongoStore({//创建一个储存实例
    url:'mongodb://127.0.0.1:27017/juzikong',
    // 不希望用户每次浏览页面的时候或刷新页面的时候都要重新保存,你可以限制一段时间内更新session.
    touchAfter: 24*3600 // 单位是秒(session懒更新：这样只要在24小时内，无论你发多少个请求，session只会被更新一次。修改session除外.)
  })
}))
// 指定静态资源所在目录(path.join对路径进行拼接：__dirname为绝对路径)
app.use(express.static(path.join(__dirname, './public')));

// 配置解析表单POST请求体插件（一定得在路由之前配body-parser）
/* 以application/x-www-form-urlencoded格式解析数据 */
app.use(bodyParser.urlencoded({
  extended: false
}))
/* 以application/json格式解析数据 */
app.use(bodyParser.json())
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
  next();
});
// 路由请求超时的中间件
app.use(function (req, res, next) {
  // 这里必须是Response响应的定时器【120秒】
  res.setTimeout(120*1000, function () {
      console.log("Request has timed out.");
      return res.status(408).send("请求超时")
  });
  next();
});

app.listen(3000, () => {
  console.log('成功监听端口')
})
