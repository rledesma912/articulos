var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

  const { body,validationResult } = require('express-validator/check');
  const { sanitizeBody } = require('express-validator/filter');

//importante para la paginacion (antes tiraba un warning)
mongoose.Promise = global.Promise;

mongoose.set('debug', true);

module.exports = function(app) {
  app.use('/', router);
};

router.get('/articles', function(req, res, next) {
  var perPage = req.params.limit || 4
  var page = req.query.page || 1

  Article
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, articles) {
      Article.count().exec(function(err, count) {
        if (err) return next(err)

        var paginas = Math.ceil(count / perPage);

        res.render('articulos', {
          title: 'Lista de artículos',
          entity:'Articulo',
          articles: articles,
          pagination: {
            page: page,
            limit: perPage,
            totalRows: count,
            pageCount: paginas
          }
        });
      })
    })
});

// eliminando un articulo
router.delete('/delart/:id', function(req, res) {

  Article.remove({
    _id: req.params.id
  }, function(err, datos) {
    if (err)
      res.send(err);

    res.json({
      message: 'Successfully deleted'
    });
  });
});


router.post('/saveart', (req, res) => {
  console.log(req.body)

  var art = new Article(req.body);
  art.save(function(err) {
    // we've saved the dog into the db here
    if (err) throw err;

    art.save(function(err) {
      // we've updated the dog into the db here
      if (err) throw err;

      res.redirect('/articles/');
    });
  });

});
