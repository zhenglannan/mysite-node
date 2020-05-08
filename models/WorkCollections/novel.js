var mongoose =require ('mongoose')
var novelData = require('../../initData/workCollections/novelData')
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

var Novels = mongoose.model('Novels', collectionSchema);
// Novels.create(novelData,function(err,docs){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('save ok');
//     // console.log(docs);
//   }
// });
Novels.find({}, function (err, data) {
  // 判断数组为空
  if (!data||data.length===0) {
    novelData.forEach(item => {
      collection.create(item);
      Novels.create(item,function(err,docs){
        if(err) {
              console.log(err);
            } else {
              console.log('save ok');
            }
      });
    })
  }
})
module.exports = Novels
