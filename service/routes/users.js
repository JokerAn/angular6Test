const express = require('express');
//用于post请求
const bodyParser = require('body-parser');
const MongoDBZSGC = require('./connectMongoDB');
const myMongo = new MongoDBZSGC('mongodb://127.0.0.1:27017');
var router = express.Router();

router.get('/getList', (req, res, next) => {
  console.log(req.query);
  myMongo._query("angular", "angular07", req.query).then((result) => {
    res.send({ status: 200, msg: '我是users.js我的作用是 查询所有学生信息', data: result });
  })
})

router.get('/addOneInfo', (req, res, next) => {
  res.send({ state: 200, msg: '我是users.js我的作用是 添加一条学生信息'});

})
router.post('/addSchool', (req, res) => {
  console.log(req.bdoy);
  myMongo._add("angular", "angular07", req.body).then((result) => {
    if (result) {
      myMongo._query("angular", "angular07", req.body).then((result1) => {
        res.send({ status: 200,msg:'我是users.js我的作用是 查询所有学生信息',data: result1 });
      })
    } else { 
      res.send({ status: 200,msg:'保存失败'});
    }
  }).catch((err) => { 
    return res.send(err);
  })
})
module.exports = router