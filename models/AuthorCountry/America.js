var mongoose =require ('mongoose')
var AmericaData = require('../../initData/AuthorCountryData/AmericaData')
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

var America = mongoose.model('America', collectionSchema); 
America.find({}, function (err, data) {
  // 判断数组为空
  if (!data||data.length===0) {
    AmericaData.forEach(item => {
      // collection.create(item);
      America.create(item,function(err,docs){
        if(err) {
              console.log(err);
            } else {
              const collectionDoc = {
                _id: docs._id,
                cover: docs.cover,
                name: docs.name,
                intro: docs.intro,
                create_time: docs.create_time,
                creator: {
                  _id: docs.creator._id,
                  username: docs.creator.username
                },
                // 扩展运算符
                posts: [...docs.posts]
              }
              collection.create(collectionDoc);
              console.log('save ok');
            }
      });
    })
    
  }
})
module.exports = America
