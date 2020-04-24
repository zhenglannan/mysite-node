var mongoose = require('mongoose')
var Schema = mongoose.Schema
var sentenceData = require('../initData/sentences')

var senSchema = new Schema({
  // uuid: {
  //   type: Number,
  //   required: true
  // },
  content: {
    type: String,
    required: true
  },
  cntComment: Number,
  cntLike: Number,
  referAuthorName: String,
  referWorkId: String,
  referWorkName: String,
  tags: Array,
  // createdAt:{type: Date, default: Date.now()},
  // updatedAt:{type: Date, default: Date.now()},
  creator: {
    _id: Number,
    username: String,
    avatar:String,
    intro: String
  },
  comment: [{
    username:String,
    content: String,
    create_time: {type:Date,default:Date.now},
  }]
}, {
  versionKey: false,
  timestamps: true
})
// ??
senSchema.index({createdAt: -1,cntLike:-1});

var TotalSentence = mongoose.model('TotalSentence', senSchema);
TotalSentence.find({}, function (err, data) {
  // 判断数组为空
  if (!data||data.length===0) {
    sentenceData.forEach(item => {
      TotalSentence.create(item);
    })
  }
})

module.exports = TotalSentence