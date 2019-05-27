var express = require('express');
var router = express.Router();
router.get('/getList', function (req,res,next) { 
  res.send('我是curriculum.js 我是查询所有课程');
})
router.get('/delete/oneList', function (req,res,next) { 
  res.send('我是curriculum.js 我是删除一节课程');
})
module.exports = router