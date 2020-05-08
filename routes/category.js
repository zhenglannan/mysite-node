// 专辑显示
var express = require('express');
var router = express.Router();

var movieModel = require('../models/WorkCollections/movie')
var novelModel = require('../models/WorkCollections/novel')
var proseModel = require('../models/WorkCollections/Prose')
var animeModel = require('../models/WorkCollections/anime')
var seriesModel = require('../models/WorkCollections/series')
var bookModel = require('../models/WorkCollections/book')


router.get('/works/:type',function(req,res,next){
  const type=req.params.type;
  const page=parseInt(req.query.page);
  const pageSize=parseInt(req.query.pageSize);
  // 电影台词
  if(type==='movies'){
    // 分页功能
    movieModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        movieModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  // 小说摘抄
  if(type==='novels'){
    novelModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        novelModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  // 散文美句
  if(type==='proses'){
    proseModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        proseModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  // 动漫台词
  if(type==='animes'){
    animeModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        animeModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  // 连续剧台词
  if(type==='series'){
    seriesModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        seriesModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  // 书籍名句
  if(type==='books'){
    bookModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        bookModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
})

module.exports = router;
