var mongoose =require ('mongoose')
var bookData = require('../../initData/workCollections/bookData')
var collection=require('../collection')

const Schema = mongoose.Schema;
//专辑模板
var collectionSchema=new Schema({
  cover:{type: String, default: '/images/collectionDefault.jpg'},
  name:String,
  intro:String,
  create_time: String,
  // updata_time:String,
  creator: {
    _id: String,
    username: String,
  },
  //包含的句子
  posts:[{  
    _id:String,
    content:String
  }]
})

// adminSchema.index({email: 1});

var Book = mongoose.model('Book', collectionSchema); 
Book.find({}, function (err, data) {
  // 判断数组为空
  if (!data||data.length===0) {
    bookData.forEach(item => {
      collection.create(item);
      Book.create(item,function(err,docs){
        if(err) {
              console.log(err);
            } else {
              console.log('save ok');
            }
      });
    })
  }
})
module.exports = Book
