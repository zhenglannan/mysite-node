// 分类句子展示
var express = require('express');
var router = express.Router();
var SentenceModel=require('../models/TotalSentence')

router.get('/:tag',function(req, res, next){
  // console.log(req.params);
  const tag=req.params.tag;
  const page=parseInt(req.query.page);
  const pageSize=parseInt(req.query.pageSize);
  // 查找数组字段中含有指定值
  SentenceModel.find({'tags':{$all:[tag]}}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
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
