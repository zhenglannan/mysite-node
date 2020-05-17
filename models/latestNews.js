// 最新动态
var mongoose = require('mongoose')

const Schema = mongoose.Schema;

var latestSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: String,
  avatar: {
    type: String,
    required: true
  },
  sentenceId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
}, { //时间戳
  versionKey: false,
  timestamps: true
})

// latestSchema.index({createdAt: -1});

var latestNews = mongoose.model('latestNews', latestSchema);

module.exports = latestNews
