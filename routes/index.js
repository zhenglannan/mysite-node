var homesentence = require('./homesentence');

module.exports=function(app){
  app.use('/homesentence',homesentence)
}
