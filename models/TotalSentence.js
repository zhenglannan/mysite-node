var mongoose = require('mongoose')
var Schema = mongoose.Schema
var sentencesData = require('../initData/sentencesData')
//句子模板
var senSchema = new Schema({
  // uuid: {
  //   type: Number,
  //   required: true
  // },
  content: {
    type: String,
    required: true
  },
  cntComment: {
    type: Number,
    default: 0
  },
  cntLike: {
    type: Number,
    default: 0
  },
  referAuthorName: String,
  referWorkId: String,
  referWorkName: String,
  tags: Array,
  // createdAt:{type: Date, default: Date.now()},
  // updatedAt:{type: Date, default: Date.now()},
  creator: {
    _id: String,
    username: String,
    avatar: String,
    // intro: String
  },
  comment: [{
    username: String,
    content: String,
    create_time: String,
  }]
}, { //时间戳
  versionKey: false,
  timestamps: true
})
// ??
senSchema.index({
  _id: -1,
  cntLike: -1
});

var TotalSentence = mongoose.model('TotalSentence', senSchema);
// sentencesData.forEach(item => {
//   TotalSentence.create(item);
// })
// TotalSentence.find({}, function (err, data) {
//   // 判断数组为空
//   if (!data||data.length===0) { 
//     sentenceData.forEach(item => {
//       TotalSentence.create(item);
//     })
//   }
// })

module.exports = TotalSentence