const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const dtime = require('time-formater')
var AdminModel = require('../../models/admin')
var collectionModel = require('../../models/collection')

let user = {
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
        desc
      } = fields
      if (err) {
        res.status(500).json({
          status: 500,
          failed,
          message: err.message
        })
      } else {
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
        // 重命名
        fs.rename(files.file.path, newPath, function (err) {
          if (err) {
            throw Error("false")
          }
          const newCollection = {
            cover: newPath,
            name: name,
            intro: desc,
            create_time: dtime().format('YYYY-MM-DD HH:mm'),
            creator: {
              _id: req.session.admin_id,
              username: req.session.user_name,
            }
          };
          // 在总的专辑model中创建此专辑
          collectionModel.create(newCollection);
          // 在管理员model中创建的专辑中添加对象
          // AdminModel.f
          res.send({
            // "/images/packImage/"写自己的保存上传图片的文件
            data: "/images/loadImage/" + avatarName
          })
        });
        // console.log(avatarName);
        // console.log(newPath);
      }

    })
  }
}
//详细处理上传图片
module.exports = user;