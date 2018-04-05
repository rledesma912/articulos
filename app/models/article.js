// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String
}, {collection: 'Article'});

// ArticleSchema.virtual('date')
//   .get(function(){
//     return this._id.getTimestamp();
//   });

// ArticleSchema.plugin(Paginator, {
//     limit: 5,
//     defaultKey: '_id',
//     direction: 1
// });

module.exports = mongoose.model('Article', ArticleSchema);
