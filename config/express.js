var express = require('express');
var glob = require('glob');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

var exphbs = require('express-handlebars');
var hbsHelpers = require(path.resolve('./app/helpers/customhelpers'));

module.exports = function(app, config) {

  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  var hbs = exphbs.create({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/partials/'],
    helpers: hbsHelpers
  });

  //console.log(hbs.helpers);

  app.engine('handlebars', hbs.engine);
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'handlebars');

  app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  // redirect bootstrap JS
  app.use('/js', express.static(config.root + '/node_modules/bootstrap/dist/js'));
  // redirect JS jQuery
  app.use('/js', express.static(config.root + '/node_modules/jquery/dist'));
  // redirect JS Popper
  app.use('/umd', express.static(config.root + '/node_modules/popper.js/dist/umd'));
  // redirect CSS bootstrap
  app.use('/css', express.static(config.root + '/node_modules/bootstrap/dist/css/'));
  //font awesome
  app.use('/js', express.static(config.root + '/public/js/'));

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function(controller) {
    require(controller)(app);
  });

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  return app;
};
