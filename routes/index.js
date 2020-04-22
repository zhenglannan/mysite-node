var homesentence = require('./homesentence');
var discovery = require('./discovery');

module.exports=function(app){
  app.use('/homesentence',homesentence)
  app.use('/discovery',discovery)
}
