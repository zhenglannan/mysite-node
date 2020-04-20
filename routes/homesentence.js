// 首页句子展示
var express = require('express');
var router = express.Router();
var SentenceModel=require('../modules/sentences')
router.get('/hot',function(req, res, next){
  SentenceModel.find(function(err,data){
    if(err){
      res.json({
        status:1,
        msg:err.message
      })
    }else{                                                                      
      res.send(data)
    }
  })
})
module.exports = router;
