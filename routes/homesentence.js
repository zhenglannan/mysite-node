// 首页句子展示
var express = require('express');
var router = express.Router();
var SentenceModel=require('../modules/TotalSentence')
router.get('/new',function(req, res, next){
  SentenceModel.find({}).sort({createdAt:-1}).exec(function(err,data){
    if(err){
      res.json({
        status:404,
        msg:err.message
      })
    }else{                                                                      
      res.send(data)
    }
  })
})

router.get('/hot',function(req,res,next){
  SentenceModel.find({}).sort({cntLike:'asc'}).exec(function(err,data){
    if(err){
      res.json({
        status:404,
        msg:err.message
      })
    }else{                                                                      
      res.send(data)
    }
  })
})
module.exports = router;
