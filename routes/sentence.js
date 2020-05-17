// 句子相关
var express = require('express');
var router = express.Router();
var SentenceModel=require('../models/TotalSentence')
var collectionModel = require('../models/collection')
var adminModel = require('../models/admin')
var latestNewsModel = require('../models/latestNews')

// 查找相应的句子
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
// 搜索结果 
router.get('/search',function(req,res,next){
  console.log(req.query);
  
  const keyWord=req.query.keyWord;
  const page=parseInt(req.query.page);
  const pageSize=parseInt(req.query.pageSize);
  // 怎么把参数来模糊查询???没反应
  // let reg=new RegExp(req.query.keyWord,'i');
  // 查找句子
  // ,{'referAuthorName':{$regex:/keyWord/i}},{'referWorkName':{$regex:/keyWord/i}}
  SentenceModel.find({content:{$regex:'/' + keyWord + '/i'}}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
    if(err){
      res.json({
        status:404,
        msg:err.message
      })
    }else{                                                                      
      res.send(data)
    }
  })
  // 查找专辑
  // collectionModel.find({$or:[{'name':{$in:[keyWord]}},{'intro':{$in:[keyWord]}}]}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
  //   if(err){
  //     res.json({
  //       status:404,
  //       msg:err.message
  //     })
  //   }else{        
  //     res.send(data)
  //   }
  // })
  // // 查找用户
  // adminModel.find({$or:[{'user_name':{$in:[keyWord]}},{'intro':{$in:[keyWord]}}]}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,admin){
  //   if(err){
  //     res.json({
  //       status:404,
  //       msg:err.message
  //     })
  //   }else{
  //     res.send(data)
  //   }
  // })
})

// router.get('/')
// 最新动态
router.get('/latest',function(req,res,next){
  latestNewsModel.find({}).sort({createdAt:-1}).limit(5).exec(function(err,data){
    if(err){
      res.json({
        status:404,
        failed,
        msg:err.message
      })
      return 
    }
   res.send(data)
  })
})
module.exports = router;