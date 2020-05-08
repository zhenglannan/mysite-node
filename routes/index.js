var homesentence = require('./homesentence');
var discovery = require('./discovery');
var admin = require('./admin');
var sentence = require('./sentence');
var category = require('./category');

module.exports = function (app) {
  app.use('/homesentence', homesentence)
  app.use('/discovery', discovery)
  app.use('/admin', admin)
  app.use('/sentence', sentence)
  app.use('/category', category)


}