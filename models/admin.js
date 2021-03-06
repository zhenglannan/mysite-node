var mongoose =require ('mongoose')
var adminData = require('../initData/adminData')

const Schema = mongoose.Schema;

// var collectionSchema=new Schema({
//   _id:String,
//   cover:{type: String, default: '/images/default.jpg'},
//   name:String
// })
//用户模板
var adminSchema=new Schema({
  user_name: {type:String,required:true},
  password: {type:String,required:true},
  email:{type:String,required:true},
  // id: Number,
  create_time: String,
  avatar: {type: String, default: '/images/default.jpg'},
  intro:String,
  cntFollower:{type: Number, default:0},
  cntFollowing:{type: Number, default: 0},
  cntGetLike:{type: Number, default: 0},

  cntLike:{type: Number, default: 0},
  cntCollection:{type: Number, default: 0},
  cntPost:{type: Number, default: 0},
  tags:Array,
  // 正在关注
  followings:[{
    _id:String,
    avatar:String,
    name:String
  }],
  // 关注者
  followers:[{
    _id:String,
    avatar:String,
    name:String
  }],
  //发布的句子
  posts:[{
    _id:String,
    // content:String,
    // cntLike:Number,
    // cntComment:Number,
    // getLike:{
    //   type:Boolean,
    //   default:false
    // }
  }],
//喜欢的句子
  likes:[{
    _id:String,
    // content:String,
    // cntLike:Number,
    // cntComment:Number,
    // getLike:{
    //   type:Boolean,
    //   default:true
    // }
  }],
  collections:[{
    _id:String,
    cover:{type: String, default: '/images/default.jpg'},
    name:String
  }]
})

adminSchema.index({email: 1},{_id:-1});

var Admin = mongoose.model('Admin', adminSchema);
// Admins.find({}, function (err, data) {
//   console.log('data'+data);
  
//   // 判断数组为空
//   if (!data||data.length===0) {
//     adminData.forEach(item => {
//       Admins.create(item);
//     })
//   }
// })
module.exports = Admin
