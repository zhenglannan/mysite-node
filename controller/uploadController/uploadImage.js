const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const dtime = require('time-formater')
var AdminModel = require('../../models/admin')
var CollectionModel = require('../../models/collection')
var TotalSentenceModel = require('../../models/TotalSentence')

let user = {
  // 创建专辑
  uploadImage: function (req, res) {

    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; //编码
    // form.uploadDir = path.join(__dirname + "./public/images/loadImage"); //可以修改为自己保存上传图片的文件地址，这里的关系看如下图片
    form.uploadDir = "./public/images/loadImage"; //可以修改为自己保存上传图片的文件地址( 这个文件夹要提前创好,否则报错)
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //上传图片最大2m
    //处理图片
    form.parse(req, function (err, fields, files) {
      const {
        name,
        intro,
        file
      } = fields;
      if (err) {
        res.status(500).json({
          status: 500,
          failed,
          message: err.message
        })
      } else if (file !== 'null') {
        // console.log(files.file.name);
        let filename = files.file.name; //文件名字
        let nameArray = filename.split('.'); //分割
        let type = nameArray[nameArray.length - 1];
        let prefixname = '';
        for (let i = 0; i < nameArray.length - 1; i++) {
          prefixname = prefixname + nameArray[i];
        }
        // let date = new Date();
        // let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        let avatarName = prefixname + dtime().format('YYYY-MM-DD') + '.' + type;
        let newPath = form.uploadDir + "/" + avatarName;
        let showPath = newPath.split('public')[1]; 
        // 重命名
        fs.rename(files.file.path, newPath, function (err) {
          if (err) {
            throw Error("false")
          }
          const newCollection = {
            cover: showPath,
            name: name,
            intro: intro,
            create_time: dtime().format('YYYY-MM-DD HH:mm'),
            creator: {
              _id: req.session.admin_id,
              username: req.session.user_name,
            }
          };
          // 在总的专辑model中创建此专辑
          CollectionModel.create(newCollection).then(data => {
            // console.log(data._id);
            // 把新创建的专辑的id放在session中，用于后面添加进adminModel中
            const newAdminCollection = {
              _id: data._id,
              cover: showPath,
              name: name
            };
            AdminModel.findById(req.session.admin_id, function (err, admin) {
              if (err) {
                console.log(err);
                return
              }
              // 每次更改除了create都需要调用save中间件
              admin.collections.push(newAdminCollection);
              admin.save(function (err) {
                if (err) return handleError(err);
                console.log('Success!');
              })
            })
          })
          res.send({
            // "/images/packImage/"写自己的保存上传图片的文件
            // data: "/images/loadImage/" + avatarName
            status: 1,
            success: '创建成功'
          })
        });
      } else {
        const newCollection = {
          name: name,
          intro: intro,
          create_time: dtime().format('YYYY-MM-DD HH:mm'),
          creator: {
            _id: req.session.admin_id,
            username: req.session.user_name,
          }
        };
        // 在总的专辑model中创建此专辑
        CollectionModel.create(newCollection).then(data => {
          // console.log(data._id);
          // 把新创建的专辑的id放在session中，用于后面添加进adminModel中
          const newAdminCollection = {
            _id: data._id,
            name: name
          };
          AdminModel.findById(req.session.admin_id, function (err, admin) {
            if (err) {
              console.log(err);
              return
            }
            // 每次更改除了create都需要调用save中间件
            admin.collections.push(newAdminCollection);
            admin.save(function (err) {
              if (err) return handleError(err);
              console.log('Success!');
            })
          })
          res.send({
            status: 1,
            success: '创建成功'
          })
        })
      }

    })
  },
  // 编辑个人信息
  changeAdminInfo: function (req, res) {

    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; //编码
    // form.uploadDir = path.join(__dirname + "./public/images/loadImage"); //可以修改为自己保存上传图片的文件地址，这里的关系看如下图片
    form.uploadDir = "./public/images/loadImage"; //可以修改为自己保存上传图片的文件地址( 这个文件夹要提前创好,否则报错)
    // form.uploadDir = path.join(__dirname,'/images/loadImage');//可以修改为自己保存上传图片的文件地址( 这个文件夹要提前创好,否则报错)

    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //上传图片最大2m
    form.parse(req, function (err, fields, files) {
      const {
        name,
        intro,
        file
      } = fields
      if (err) {
        res.status(500).json({
          status: 500,
          failed,
          message: err.message
        })
      } else if (file !== 'null') {
        let filename = files.file.name; //文件名字
        let nameArray = filename.split('.'); //分割
        let type = nameArray[nameArray.length - 1];
        let prefixname = '';
        for (let i = 0; i < nameArray.length - 1; i++) {
          prefixname = prefixname + nameArray[i];
        }
        // let date = new Date();
        // let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        let avatarName = prefixname + dtime().format('YYYY-MM-DD') + '.' + type;
        let newPath = form.uploadDir + "/" + avatarName;
         let showPath = newPath.split('public')[1];
        // 重命名
        fs.rename(files.file.path, newPath, function (err) {
          if (err) {
            throw Error("false")
          }
          // 处理展示到前端的真正路径
         
          // AdminModel.findById(req.session.admin_id,function(err,admin){
          //   // 同步删除文件
          //   fs.unlinkSync(admin.avatar)
          // }){avatar:newPath},{user_name:name},{intro:intro},{new:true}
          AdminModel.findByIdAndUpdate(req.session.admin_id, {
            $set: {
              avatar: showPath,
              user_name: name,
              intro: intro
            }
          }, {
            new: true
          }, function (err, admin) {
            if (err) {
              res.status(500).json({
                status: 500,
                message: err.message
              })
              return
            }
            admin.posts.forEach(item => {
              TotalSentenceModel.findByIdAndUpdate(item._id, {
                '$set': {
                  'creator.username': name,
                  'creator.avatar': showPath
                }
              }, {
                new: true
              }, function (err, data) {
                // console.log('sentence'+' '+data);
              })
            })
            // fs.unlinkSync(admin.avatar)
            res.send({
              status: 1,
              success: '修改成功'
            })
            console.log(admin);
          })
        })
      } else {
        AdminModel.findByIdAndUpdate(req.session.admin_id, {
          $set: {
            user_name: name,
            intro: intro
          }
        }, {
          new: true
        }, function (err, admin) {
          admin.posts.forEach(item => {
            TotalSentenceModel.findByIdAndUpdate(item._id, {
              '$set': {
                'creator.username': name
              }
            }, {
              new: true
            }, function (err, data) {
              // console.log('sentence'+' '+data);
            })
          })
          if (err) {
            res.status(500).json({
              status: 500,
              message: err.message
            })
            return
          }
          // fs.unlinkSync(admin.avatar)
          res.send({
            status: 1,
            success: '修改成功'
          })
          // console.log(admin);
        })
      }
    })
  },
  // 编辑专辑
  changeCollection: function (req, res) {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; //编码
    // form.uploadDir = path.join(__dirname + "./public/images/loadImage"); //可以修改为自己保存上传图片的文件地址，这里的关系看如下图片
    form.uploadDir = "./public/images/loadImage"; //可以修改为自己保存上传图片的文件地址( 这个文件夹要提前创好,否则报错)
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //上传图片最大2m
    form.parse(req, function (err, fields, files) {
      console.log('fields' + fields);

      const {
        name,
        intro,
        file
      } = fields
      if (err) {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      } else if (file !== 'null') {
        let filename = files.file.name; //文件名字
        let nameArray = filename.split('.'); //分割
        let type = nameArray[nameArray.length - 1];
        let prefixname = '';
        for (let i = 0; i < nameArray.length - 1; i++) {
          prefixname = prefixname + nameArray[i];
        }
        // let date = new Date();
        // let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        let avatarName = prefixname + dtime().format('YYYY-MM-DD') + '.' + type;
        let newPath = form.uploadDir + "/" + avatarName;
        let showPath = newPath.split('public')[1];
        // 重命名
        fs.rename(files.file.path, newPath, function (err) {
          if (err) {
            throw Error("false")
          }
          // CollectionModel.findById(req.params.id, function (err, collection) {
          //   // fs.unlinkSync(collection.cover)
          // })
          CollectionModel.findByIdAndUpdate(req.params.id, {
            '$set': {
              'cover': showPath,
              'name': name,
              'intro': intro
            }
          }, {
            new: true
          }, function (err, data) {
            if (err) {
              res.status(500).json({
                status: 500,
                message: err.message
              })
              return
            }
            AdminModel.update({
              _id: req.session.admin_id,
              'collections._id': req.params.id
            }, {
              '$set': {
                'collections.$.cover': showPath,
                'collections.$.name': name,
                'collections.$.intro': intro,
              }
            }, {
              new: true
            }, function (err, data) {
              if(err){
                console.log(err.message);
              }
              console.log(data);
            })
            res.send({
              status: 1,
              message: '修改专辑成功'
            })
          })
        })
      } else {
        CollectionModel.findByIdAndUpdate(req.params.id, {
          '$set': {
            'name': name,
            'intro': intro
          }
        }, {
          new: true
        }, function (err, data) {
          if (err) {
            res.status(500).json({
              status: 500,
              message: err.message
            })
            return
          }
          AdminModel.update({
            _id: req.session.admin_id,
            'collections._id': req.params.id
          }, {
            // 嵌套字段修改
            '$set': {
              'collections.$.name': name,
              'collections.$.intro': intro
            }
          }, function (err, data) {
            // let collection= data.collections.find(item=>item._id===req.params.id);
            // collection.name=name;
            // collection.save();
            console.log(data)
          })
          res.send({
            status: 1,
            message: '修改专辑成功'
          })
          console.log('修改' + data);
        })
      }
    })
  }
}
module.exports = user;