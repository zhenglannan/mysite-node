// 句子相关
var express = require('express');
var router = express.Router();
var SentenceModel=require('../models/TotalSentence')

router.get('/findSentence',function(req, res, next){
  SentenceModel.findById(req.query._id,function (err, data){
    if (err) {
      res.send({
        status: 0,
        message: err.message
      })
    } else {
      res.send({
        status: 1,
        data: data
      })
    }
  })
})
module.exports = router;