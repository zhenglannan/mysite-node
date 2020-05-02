var mongoose =require ('mongoose')

const Schema = mongoose.Schema;
//专辑模板
var collectionSchema=new Schema({
  cover:{type: String, default: '/images/default.jpg'},
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
    // content:String,
    // cntLike:{type:Number,default:0},
    // cntComment:{type:Number,default:0},
    // referAuthorName: String,
    // referWorkName: String,
  }],
  // 发布专辑人的其他专辑??
  // otherCollections:[{
  //   _id:String,
  //   cover:{type: String, default: '/images/default.jpg'},
  //   name:String
  // }]
})

// adminSchema.index({email: 1});

var Collections = mongoose.model('Collections', collectionSchema);
// Collections.find({}, function (err, data) {
//   // 判断数组为空
//   if (!data||data.length===0) {
//     adminData.forEach(item => {
//       Admins.create(item);
//     })
//   }
// })
module.exports = Collections
