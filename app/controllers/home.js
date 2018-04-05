var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

mongoose.set('debug', true);

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Control de acceso'
    });
});

router.get('/inicio', function (req, res, next) {
    res.render('index', {
      title: 'Control de acceso'
    });

});

router.get('/login', (req, res, next) => {
    res.render('login', {
      title: 'Inicio de sesión'
    });

});

router.get('/usuarios', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('usuarios', {
      title: 'Administración de usuarios',
      articles: articles
    });
  });
});
