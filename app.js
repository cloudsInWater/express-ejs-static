var express = require('express'),
 path = require('path'),
 favicon = require('serve-favicon'),
 logger = require('morgan'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 router = require('./server/router/index'),
 _ = require('underscore'),
 url = require('url'),
 moment = require('moment');

var app = express();
app.disable('x-powered-by');
const NEV_NOW = process.env.NODE_ENV;
var config;
if(NEV_NOW === 'development'){
  config = require('./server/config/config.dev.json');
}else if(NEV_NOW === 'production'){
  config = require('./server/config/config.prod.json');
}

// view engine setup
app.set('views', path.join(__dirname, 'web'));
// /web\/*//
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'web')));
app.use(require("express-domain-middleware"));


app.use(function (req, res, next) {
  var tail=req.query.utm_content ;
  var realTail='';
  var moop=false;
  var weixin=false;
  if(tail){
    realTail=tail.split("=")[1];
    moop=tail.split("=")[0]=='baidu/MP';
    weixin=tail.split("=")[0]=='caicloud';
  }else{
    realTail=req.query.word_con_m || req.query.word_con_w || req.query.word_con ||'';
    if(req.query.word_con_m){moop=true}
    if(req.query.word_con_w){weixin=true}
  }
  var make_hi=''
  var make_ho=''
  if(moop){
     make_hi=realTail?`?word_con_m=${realTail}`:'';
     make_ho=realTail?`&word_con_m=${realTail}`:'';
  }else{
     if(weixin){
         make_hi=realTail?`?word_con_w=${realTail}`:'';
         make_ho=realTail?`&word_con_w=${realTail}`:'';
     }else{
         make_hi=realTail?`?word_con=${realTail}`:'';
         make_ho=realTail?`&word_con=${realTail}`:'';
     }
 }
  var urlShow = process.env.URL || config.urlShow;
   o = {
    staticPath: config.staticPath + (config.dir != '' ? '/' + config.dir : ''),
    onLine: config.onLine,
    moment: moment,
    url: url,
    req: req,
    urlShow:urlShow,
    make_hi:make_hi,
    make_ho:make_ho,
    moop:moop,
    weixin:weixin,
    realTail:realTail,
  };
  res.locals.G = o;
  res.locals._ = _;
  res.locals.req = req;
  res.locals.moment = moment;
  next();
});

router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
if(process.env.NODE_ENV=='production'){
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    const cai='/';
    if(err.status==404){
      res.render('pages/error', {
        message: '404',
        error: `The URL '${req.url}' you requested was not found on this server.`,
        zh:cai,
      });
    }else if(err.status==500){
      res.render('pages/error', {
        message: 'wrong',
        error: 'An error occurred on the page. Please try again later.发生错误，请稍后重试...',
        zh:cai,
      });
    }else if(err){
      res.render('pages/error', {
        message: 'wrong',
        error: 'An error occurred on the page. Please try again later.发生错误，请稍后重试...',
        zh:cai,
      });
    }
  });
}else{
  app.use(function (err, req, res, next) {
    if(err){
      console.log(err)
    }
  })
}

module.exports = app;