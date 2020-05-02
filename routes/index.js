var homesentence = require('./homesentence');
var discovery = require('./discovery');
var admin = require('./admin');
var sentence = require('./sentence');

module.exports = function (app) {
  app.use('/homesentence', homesentence)
  app.use('/discovery', discovery)
  app.use('/admin', admin)
  app.use('/sentence', sentence)


}