const express = require('express');
//用于post请求
const bodyParser = require('body-parser');
//用于上传文件
const multer = require('multer');
//定义将上传的文件放到当前文件夹下的uploads文件夹中
const fs = require('fs');
const qs = require('qs');
const MongoDBZSGC = require('./routes/connectMongoDB');
const myMongo = new MongoDBZSGC('mongodb://127.0.0.1:27017');
// 
var app = express();
var indexRouter = require('./routes/curriculum');
var usersRouter = require('./routes/users');
var employeeRouter = require('./routes/employee');
var wxxcx = require('./wxxcx/wxxcx.js');//微信小程序

const pathLib = require("path");
//定义将上传的文件放到当前文件夹下的uploads文件夹中
app.use(multer({ dest: '../www/anUploadFiles/' }).any());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())//解决 application/json  req.body获取不到前端传递的参数
app.use('/curriculum', indexRouter);
app.use('/users', usersRouter);
app.use('/employee', employeeRouter);
app.use('/wxxcx', wxxcx);
app.get('/', function (req, res, next) {
  var msg = [
    { name: '/curriculum/getList', doSomething: '我是curriculum.js 我是查询所有课程' },
    { name: '/curriculum/delete/oneList', doSomething: '我是curriculum.js 我是删除一节课程' },
    { name: '/users/getList', doSomething: '我是users.js我的作用是 查询所有学生信息' },
    { name: '/users/addOneInfo', doSomething: '我是users.js我的作用是 添加一条学生信息' }
  ];
  res.send(msg);
})
app.get('/llxh', function (req, res, next) {
  
var http = require("http");
 
var data = {
    username:"name",
    password:"123456"
};
data = JSON.stringify(data);
 
var opt = {
    host:'http://port.51lianlian.cn/api/v1/binding',
    port:'8080',
    method:'POST',
    path:'/loginForeign.jspx',
    headers:{
        "Content-Type": 'application/json',
        "Content-Length": data.length
    }
}
 
var body = '';
var req = http.request(opt, function(res) {
    console.log("response: " + res.statusCode);
    res.on('data',function(data){
        body += data;
    }).on('end', function(){
        console.log(body)
    });
}).on('error', function(e) {
    console.log("error: " + e.message);
})
req.send(data);
})
//登录
app.get('/login', function (req, res, next) {

  console.log(req.query);
  myMongo._query("Joker", "employee", { name: req.query.name, password: req.query.password }).then((result1) => {
    console.log(result1);
    if (result1.length > 0) {
      res.send({ status: 200, msg: '登录成功', data: result1 });
    } else {
      res.send({ status: 200, msg: '登录失败', data: result1 });
    }
  }).catch((err) => {
    res.send({ status: 200, msg: '登录失败', msgErr: 'catch', data: err });
  })

})
//注册
app.post('/register', (req, res) => {
  console.log({ 'req.body': req.body });
  if (req.body.name == undefined || req.body.password == undefined || req.body.phone == undefined) {
    res.send({ status: 200, msg: '请填写name,password,phone' });

  } else {
    let canshu = {
      name: req.body.name,
      password: req.body.password,
      phone: req.body.phone,
    }
    myMongo._query("Joker", "employee", { name: req.body.name }).then((result1) => {
      console.log(result1);
      if (result1.length > 0) {
        res.send({ status: 200, msg: '该用户名称已经被注册了' });
      } else {
        myMongo._add("Joker", "employee", canshu).then((result) => {
          if (result) {
            myMongo._query("Joker", "employee", req.body).then((result2) => {
              res.send({ status: 200, msg: '注册成功', data: result2 });
            })
          } else {
            res.send({ status: 200, msg: '注册失败' });
          }
        }).catch((err) => {
          return res.send(err);
        })
      }
    })

  }
})
//上传图片

//上传图片
app.post('/ajaxUpload', function (req, res) {
  console.log('/ajaxUpload');
  console.log(req.query.customerId);
  console.log(req.files[0]);
  console.log(req.files[0].originalname);
  let nowTime = new Date() - 0;
  let suijishu = (Math.random()*10000000000000000+'').slice(0,8);
  let newName = req.files[0].destination+nowTime + suijishu+ pathLib.parse(req.files[0].originalname).ext;
      //更改文件名
      fs.rename(req.files[0].path, newName, function (result, err) {
        if (err) {
          res.send({ msg: '后台修改文件名失败' })
        }
        else { 
          console.log(pathLib.parse(req.files[0].originalname.destination+newName));
          console.log(result);
          res.send({
            msg: '上传成功',
            newName: newName,
            oldName: req.files[0].path
          })
        }
          
      });
  // })
  


});
app.listen(3100);
console.log('3100端口可以了');