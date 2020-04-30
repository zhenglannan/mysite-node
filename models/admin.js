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
  //发布的句子
  posts:[{
    _id:String,
    content:String,
    cntLike:Number,
    cntComment:Number,
    referAuthorName: String,
    referWorkName: String,
    tags:Array,
    getLike:{
      type:Boolean,
      default:false
    }
  }],
//喜欢的句子
  likes:[{
    _id:String,
    content:String,
    cntLike:Number,
    cntComment:Number,
    referAuthorName: String,
    referWorkName: String,
    getLike:{
      type:Boolean,
      default:true
    }
  }],
  collections:[{
    _id:String,
    cover:{type: String, default: '/images/default.jpg'},
    name:String
  }]
})

adminSchema.index({email: 1});

var Admins = mongoose.model('Admins', adminSchema);
Admins.find({}, function (err, data) {
  // 判断数组为空
  if (!data||data.length===0) {
    adminData.forEach(item => {
      Admins.create(item);
    })
  }
})
module.exports = Admins
