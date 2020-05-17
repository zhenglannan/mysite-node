var mongoose = require('mongoose')
var animeData = require('../../initData/workCollections/animeData')
var collectionModel = require('../collection')
const Schema = mongoose.Schema;
//专辑模板
var collectionSchema = new Schema({
  cover: {
    type: String,
    default: '/images/collectionDefault.jpg'
  },
  name: String,
  intro: String,
  create_time: String,
  // updata_time:String,
  creator: {
    _id: String,
    username: String,
  },
  //包含的句子
  posts: [{
    _id: String,
    content: String
  }]
})

// adminSchema.index({email: 1});
var Anime = mongoose.model('Anime', collectionSchema);
Anime.find({}, function (err, data) {
  // 判断数组为空
  if (!data || data.length === 0) {
    animeData.forEach(item => {

      Anime.create(item, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          const collection = {
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
          collectionModel.create(collection);
          console.log('save ok');
        }
      });
    })

  }
})
module.exports = Anime