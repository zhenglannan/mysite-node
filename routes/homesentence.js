// 首页句子展示
var express = require('express');
var router = express.Router();
var SentenceModel=require('../models/TotalSentence')
// 全局定义currentpage
var hotCurrentPage=0;
var newCurrentPage=0;
// 每页多少数量
var perPage=10;
// 最新句子
router.get('/new',function(req, res, next){
   // 跳过之前加载过的
  var skip=(newCurrentPage++)*perPage;
  // console.log('new'+skip);
  SentenceModel.find({}).sort({createdAt:-1}).limit(10).skip(skip).exec(function(err,data){
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
// 热门句子
router.get('/hot',function(req,res,next){
  var skip=(hotCurrentPage++)*perPage;
  // console.log(skip);
  SentenceModel.find({}).sort({cntLike:-1}).limit(10).skip(skip).exec(function(err,data){
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
// router.get('/')

module.exports = router;
