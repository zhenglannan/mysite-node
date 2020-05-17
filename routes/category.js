// 专辑显示
var express = require('express');
var router = express.Router();

var movieModel = require('../models/WorkCollections/movie')
var novelModel = require('../models/WorkCollections/novel')
var proseModel = require('../models/WorkCollections/Prose')
var animeModel = require('../models/WorkCollections/anime')
var seriesModel = require('../models/WorkCollections/series')
var bookModel = require('../models/WorkCollections/book')

var AmericaModel = require('../models/AuthorCountry/America')
var EnglandModel = require('../models/AuthorCountry/England')
var FranceModel = require('../models/AuthorCountry/France')
var ItalyModel = require('../models/AuthorCountry/Italy')
var JapanModel = require('../models/AuthorCountry/Japan')

var HanModel = require('../models/AuthorDynasty/han')
var MingModel = require('../models/AuthorDynasty/ming')
var ModernModel = require('../models/AuthorDynasty/modern')
var QingModel = require('../models/AuthorDynasty/qing')
var SongModel = require('../models/AuthorDynasty/song')

var ActorModel = require('../models/AuthorJob/actor')
var CartoonistModel = require('../models/AuthorJob/cartoonist')
var HostModel = require('../models/AuthorJob/host')
var PoetModel = require('../models/AuthorJob/poet')
var SingerModel = require('../models/AuthorJob/singer')


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
// 作者国家
router.get('/authors/country/:authorType',function(req,res,next){
  const authorType=req.params.authorType;
  const page=parseInt(req.query.page);
  const pageSize=parseInt(req.query.pageSize);
  if(authorType==='美国'){
    AmericaModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        AmericaModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  if(authorType==='英国'){
    EnglandModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        EnglandModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  if(authorType==='法国'){
    FranceModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        FranceModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  if(authorType==='意大利'){
    ItalyModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        ItalyModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  if(authorType==='日本'){
    JapanModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        JapanModel.countDocuments({},function(err,total){
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
// 作者朝代
router.get('/authors/dynasty/:authorType',function(req,res,next){
  const authorType=req.params.authorType;
  const page=parseInt(req.query.page);
  const pageSize=parseInt(req.query.pageSize);
  if(authorType==='汉朝'){
    HanModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        HanModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  if(authorType==='明朝'){
    MingModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        MingModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }if(authorType==='近现代'){
    ModernModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        ModernModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }if(authorType==='清朝'){
    QingModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        QingModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }if(authorType==='宋朝'){
    SongModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        SongModel.countDocuments({},function(err,total){
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
// 作者职业
router.get('/authors/job/:authorType',function(req,res,next){
  const authorType=req.params.authorType;
  const page=parseInt(req.query.page);
  const pageSize=parseInt(req.query.pageSize);
  if(authorType==='诗人'){
    PoetModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        PoetModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  if(authorType==='漫画家'){
    CartoonistModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        CartoonistModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  if(authorType==='歌手'){
    SingerModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        SingerModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  if(authorType==='演员'){
    ActorModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        ActorModel.countDocuments({},function(err,total){
          res.send({
            status: 1,
            data: data,
            total:total
          })
        })
      }
    })
  }
  if(authorType==='主持人'){
    HostModel.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function(err,data){
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      }else{
        // countDocuments回调返回count
        HanModel.countDocuments({},function(err,total){
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
// 查找收藏此句子的专辑
router.get('/findCollection',function(req,res,next){

})
module.exports = router;
