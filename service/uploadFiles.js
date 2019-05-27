const pathLib = require("path");
const express = require('express');
//用于post请求
const bodyParser = require('body-parser');
//用于上传文件
const multer = require('multer');
//定义将上传的文件放到当前文件夹下的uploads文件夹中
const fs = require('fs');
var app = express();

app.use(multer({ dest: './www/uploade/' }).any());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
//上传图片

app.post('/ajaxUpload', function (req, res) {
  console.log(req.files[0].path);
  console.log(req.files[0].originalname);
  // console.log(pathLib.parse(req.files[0].originalname));
  // var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
  var newName = req.files[0].path + req.files[0].originalname;
  fs.rename(req.files[0].path, newName, function (result,err) {
    if (err)
      res.send({ msg: '上传失败' })
    else
      res.send({ msg: '上传成功', img: newName, img2: result })
  });
});

app.listen(3300);
console.log('3300端口可以了');