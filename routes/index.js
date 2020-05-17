var homeSentence = require('./homeSentence');
var discovery = require('./discovery');
var admin = require('./admin');
var sentence = require('./sentence');
var category = require('./category');
 
module.exports = function (app) {
  app.use('/api/homeSentence', homeSentence)
  app.use('/api/discovery', discovery)
  app.use('/api/admin', admin)
  app.use('/api/sentence', sentence)
  app.use('/api/category', category)
 

} 