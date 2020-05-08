var mongoose =require ('mongoose')
var movieData = require('../../initData/workCollections/movieData')
var collection=require('../collection')

const Schema = mongoose.Schema;
//专辑模板
var movieSchema=new Schema({
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

var Movie = mongoose.model('Movie', movieSchema); 
// Movie.create(movieData,function(err,docs){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('save ok');
//     console.log(docs);
//   }
// });
Movie.find({}, function (err, data) {
  // 判断数组为空
  if (!data||data.length===0) {
    movieData.forEach(item => {
      collection.create(item);
      Movie.create(item,function(err,docs){
        if(err) {
              console.log(err);
            } else {
              console.log('save ok');
            }
      });
    })
  }
})
module.exports = Movie