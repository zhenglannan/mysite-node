var mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/juzikong',{useNewUrlParser: true});
mongoose.set('useCreateIndex', true) 
var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.on('error', function(error){
  console.error.bind(console, 'connection error:');
  mongoose.disconnect();
});

db.once('open', function () {
  console.log("we're connected!")
});
db.on('close', function() {
  console.log('数据库断开，重新连接数据库');
  // mongoose.connect('mongodb://127.0.0.1:27017/juzikong',{useNewUrlParser: true});
  mongoose.connect('mongodb://127.0.0.1:27017/juzikong',{server:{auto_reconnect:true}});
});
module.exports= db
