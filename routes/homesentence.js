// 首页句子展示
var express = require('express');
var router = express.Router();
var SentenceModel=require('../models/TotalSentence')

router.get('/:type',function(req, res, next){
  const page=parseInt(req.query.currentPage);
  const pageSize=parseInt(req.query.pageSize);
   // 跳过之前加载过的
  // new
  if(req.params.type==='new'){
    SentenceModel.find({}).sort({createdAt:-1}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if(err){
        res.json({
          status:404,
          msg:err.message
        })
      }else{                                                                      
        res.send(data)
      }
    })
  }else if(req.params.type==='hot'){//hot
    SentenceModel.find({}).sort({cntLike:-1}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if(err){
        res.json({
          status:404,
          msg:err.message
        })
      }else{                                                                      
        res.send(data)
      }
    })
  }
})
// 查找全部句子
router.get('/all',function(req,res,next){
  SentenceModel.find({},function(err,list){
    res.send(list)
  })
})

module.exports = router;
