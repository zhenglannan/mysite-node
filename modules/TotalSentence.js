var mongoose = require('mongoose')
var Schema = mongoose.Schema
var sentenceData = require('../initData/sentences')

var senSchema = new Schema({
  uuid: {
    type: Number,
    required: true
  },
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
    id: Number,
    username: String,
    avator: {
      type: String,
      default: 'default.jpg'
    },
    intro: String
  },
  comment: [{
    userId: Number,
    avator: {
      type: String,
      default: 'default.jpg'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }]
}, {
  versionKey: false,
  timestamps: true
})

// senSchema.index({id: 1});

var TotalSentence = mongoose.model('TotalSentence', senSchema);
TotalSentence.find({}, function (err, data) {
  // 判断数组为空
  if (!data||data.length===0) {
    sentenceData.forEach(item => {
      TotalSentence.create(item);
    })
  }
  // else{
  // TotalSentence.count(function(err,count){
  //   console.log(count);
  // })
  // }
})

module.exports = TotalSentence