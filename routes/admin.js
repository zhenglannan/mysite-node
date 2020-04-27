var express = require('express');
var router = express.Router();
var dtime = require('time-formater')
var md5 = require("blueimp-md5")
var AdminModel = require('../models/admin')
// var CollectionModel = require('../models/collection')
var TotalSentenceModel =require('../models/TotalSentence')
var user=require('../controller/uploadController/uploadImage')
// 注册
router.post('/register', function (req, res, next) {
  // console.log(req.body)
  const email = req.body.email;
  // const newPassword = this.encryption(req.body.password);
  AdminModel.findOne({
    email
  }, function (err, data) {
    if (err) {
      res.status(500).json({
        status: 500,
        message: err.message
      })
    } else {
      if (data) {
        console.log('该用户已经存在');
        res.send({
          status: 0,
          type: 'USER_HAS_EXIST',
          // message最好用英文
          message: '该用户已经存在',
        })
      } else {
        const username = req.body.name;
        // 对密码进行重复加密
        const newPassword = md5(md5(req.body.password));

        // console.log(newPassword);
        // const newPassword = this.encryption(req.body.password);
        // const admin_id = this.getId('admin_id');
        const newAdmin = {
          user_name: username,
          password: newPassword,
          email: email,
          // id: admin_id,
          create_time: dtime().format('YYYY-MM-DD HH:mm'),
          intro:'',
          posts:[],
          likes:[],
          collections:[],
          avatar:'/images/default.jpg'
        };
        AdminModel.create(newAdmin);
        // req.session.admin_id = newAdmin._id;
        // req.session.user_name = newAdmin.user_name;
        // req.session.avatar = newAdmin.avatar;
        res.send({
          status: 1,
          message: '注册用户成功',
        })
      }
    }
  })
})
// 登陆
router.post('/login', function (req, res, next) {
  const email = req.body.email;
  const password = md5(md5(req.body.password));

  AdminModel.findOne({
    email
  }, function (err, admin) {
    if (err) {
      res.status(500).json({
        status: 500,
        message: err.message
      })
    } else if (!admin) {
      res.send({
        status: 0,
        type: 'ERROR_PASSWORD',
        message: '该用户未注册',
      })
    } else if (password.toString() != admin.password.toString()) {
      // console.log('管理员登录密码错误');
      res.send({
        status: 0,
        type: 'ERROR_PASSWORD',
        message: '该用户已存在，密码输入错误',
      })
    } else {
      req.session.admin_id = admin._id;
      req.session.user_name = admin.user_name;
      req.session.avatar = admin.avatar;
      // console.log(req.session);
      res.send({
        status: 1,
        success: '登录成功'
      })
    }
  })
})
// 登出
router.get('/signout', function (req, res, next) {
  console.log('之前' + req.session.admin_id);
  try {
    // req.session.cookie.maxAge=0;
    req.session.destroy(function (err) {
      if (err) {
        console.log('退出失败', err)
        res.send({
          status: 0,
          message: '退出失败'
        })
      } else {
        // console.log(req.session);
        res.send({
          status: 1,
          success: '退出成功'
        })
      }
    })
  } catch (err) {
    console.log('退出失败', err)
    res.send({
      status: 0,
      message: '退出失败'
    })
  }
})
// 得到管理员信息
router.get('/getAdminInfo', function (req, res, next) {
  console.log(req.session.admin_id);
  const admin_id = req.session.admin_id;
  if (!admin_id) {
    console.log('获取管理员信息的session失效');
    res.send({
      status: 0,
      type: 'ERROR_SESSION',
      message: '获取管理员信息失败'
    })
    return
  }else{
    AdminModel.findOne({
      _id: admin_id
    }, function (err, info) {
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      } else {
        res.send({
          status: 1,
          data: info
        })
      }
    });
  }
  
})

// 得到其他管理员信息
router.get("/getOtherUserInfo", function (req, res, next) {
  console.log(req.query)
  const user_id = req.query.user_id;
  AdminModel.findOne({
    _id: user_id
  }, function (err, info) {
    if (err) {
      res.status(500).json({
        status: 500,
        message: err.message
      })
    } else {
      res.send({
        status: 1,
        data: info
      })
    }
  });
})

// 添加新专辑
router.post('/addCollection',function(req,res,next){
  // console.log(req.body);
  user.uploadImage(req,res);
  
})
//发布句子
router.post('/addPost',function(req,res,next){
  console.log(req.body);
  const content=req.body.content;
  const tags=req.body.tags; 
  const referWorkName=req.body.referWorkName
  const referWorkAuthorName=req.body.referWorkAuthorName
  const newSentence={
    content:content,
    tags:tags,
    referWorkName:referWorkName,
    referWorkAuthorName:referWorkAuthorName,
    creator:{
      _id: req.session.admin_id,
      username: req.session.user_name,
      avatar:req.session.avatar,
    },
    comment: []
  }
  // 总的句子添加
  TotalSentenceModel.create(newSentence).then(data=>{
    console.log(data);
    const postSen={
      _id:data._id,
      content:content,
      tags:tags,
      referWorkName:referWorkName,
      referWorkAuthorName:referWorkAuthorName,
      cntLike:0,
      cntComment:0,
    }
    console.log(postSen);
    
    // 管理员句子添加
    AdminModel.findOne({_id: req.session.admin_id},function (err, admin){
      // console.log(admin);
      
      admin.posts.push(postSen);
      admin.save(function (err) {
        if (err) return handleError(err)
        console.log('Success!');
      })
    })
  })

})
// 更改个人信息
router.post('/updateInfo',function(req,res,next){

})
// 更改密码
router.post('/updatePwd',function(req,res,next){

})
// 设置个人标签，用于内容推荐
router.post('/setTags',function(req,res,next){

})
// 删除专辑
router.get('/deleteCollection',function(req,res,next){

})

// 删除句子
router.get('/deletePosts',function(req,res,next){

})
module.exports = router;