var homesentence = require('./homesentence');
var discovery = require('./discovery');
var admin = require('./admin');

module.exports = function (app) {
  app.use('/homesentence', homesentence)
  app.use('/discovery', discovery)
  app.use('/admin', admin)

}