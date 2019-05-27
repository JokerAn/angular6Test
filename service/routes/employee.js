const express = require('express');
//用于post请求
const bodyParser = require('body-parser');
const fs = require('fs');
const pathLib = require('path');
const qs = require('qs');
const MongoDBZSGC = require('./connectMongoDB');
//mongodb自动生成的id 如果要被查询需要将查询条件写成
//db(xxx).collection(xxx).find({'_id':ObjectId("5cdd1fbd7479ba481fc98c64")})
const ObjectID = require('mongodb').ObjectID;
const myMongo = new MongoDBZSGC('mongodb://127.0.0.1:27017');
var router = express.Router();
//获取注册用户列表
router.get('/employee/getList', (req, res, next) => {
  console.log(req.query);
  myMongo._query("Joker", "employee", req.query).then((result) => {
    res.send({ status: 200, msg: '我是employee.js我的作用是 查询所有员工信息', data: result });
  })
})
//新增一个员工
/**
 * @param {customerId} 属于哪个人下的id 必填
 * @param {bianma} 编码 必填
 * @param {name} 名称 必填
 * @param {sex} 性别 选填
 * @param {age} 年龄 选填
 * @param {job} 工作 选填
 * @param {state} 状态 选填
 * @param {remark} 备注 选填
 * @param {birthday} 出生年月 选填
 * @param {phone} 电话 选填
 */
/**
 * 新增一个员工 在头像部分 是 提前新增好的 但是 头像的命名 是 时间戳+随机数 这时候就要找到 这个文件 然后将他 重命名为
 * 新增的这个员工的 ' _id ' 并且更新 数据库  这样这个头像文件就是唯一的而且只跟这个员工挂钩
 */
router.post('/employeeLists/addOneInfo', (req, res) => {
  let me = this;
  let qsReq = req.body;
  let canshu;
  if (Object.prototype.toString.call(qsReq) == "[object Array]") {
    canshu = [];
    for (let i = 0; i < qsReq.length; i++) {
      canshu[i] = {
        customerId: qsReq[i].customerId,
        bianma: qsReq[i].bianma,
        name: qsReq[i].name,
        sex: qsReq[i].sex || '',
        age: qsReq[i].age || '',
        job: qsReq[i].job || '',
        state: qsReq[i].state || '',
        birthday: qsReq[i].state || '',
        phone: qsReq[i].state || '',
        userHeaderImg: qsReq[i].userHeaderImg || '',
        remark: qsReq[i].remark || ''
      };
    }
  } else {
    canshu = {
      customerId: qsReq.customerId,
      bianma: qsReq.bianma,
      name: qsReq.name,
      sex: qsReq.sex || '',
      age: qsReq.age || '',
      job: qsReq.job || '',
      state: qsReq.state || '',
      birthday: qsReq.birthday || '',
      phone: qsReq.phone || '',
      userHeaderImg: qsReq.userHeaderImg || '',
      userHeaderImgPath: qsReq.userHeaderImgPath || '',
      remark: qsReq.remark || ''
    };
    if (qsReq.id) {
      canshu.id = qsReq.id
    }
  }

  if (qsReq.id) {
    //修改
    res.send({ status: 200, msg: '修改功能暂时未做' });
  } else {
    console.log(canshu);
    myMongo._add("Joker", "employeeLists", canshu).then((result) => {
      if (result) {
        //找到这个员工
        myMongo._query("Joker", "employeeLists", canshu).then((result2) => {
          console.log('新名称 ' + canshu.userHeaderImgPath + '/' + result2[0]['_id'] + pathLib.parse(canshu.userHeaderImgPath + canshu.userHeaderImg).ext);
          console.log('旧名称 ' + canshu.userHeaderImgPath + '/' + canshu.userHeaderImg);
          let newName = canshu.userHeaderImgPath + '/' + result2[0]['_id'] + pathLib.parse(canshu.userHeaderImgPath + canshu.userHeaderImg).ext;
          if (result2[0].userHeaderImg != '') {
            //重命名为本员工的 ' _id ' 并且更新 数据库
            fs.rename(canshu.userHeaderImgPath + '/' + canshu.userHeaderImg, newName, function (result4, err) {
              if (err) {
                console.log('后台修改文件名失败');
                res.send({ msg: '后台修改文件名失败' })
              } else {
                console.log('后台修改文件名成功')
                console.log({ 'result4': result4, 'result2': result2, 'result': result })
                let linshi = newName.split('/');
                let newNameUrl = linshi[linshi.length - 1];
                //并且更新 数据库
                myMongo._update("Joker", "employeeLists", { '_id': ObjectID(result2[0]['_id']) }, { userHeaderImg: newNameUrl }).then((result3) => {
                  console.log(result3);
                  res.send({ status: 200, msg: '新增成功', data: result3 });
                });
              }
            })
          } else { 
            res.send({ status: 200, msg: '新增成功', data: result });
          }
          

         
        })
      }
    })
  }

})
//获取员工列表
router.get('/employeeLists/getList', (req, res, next) => {
  myMongo._query("Joker", "employeeLists", {}).then((result) => {
    res.send({ status: 200, msg: '成功，我是employee.js我的作用是 查询员工列表', data: result });
  });
})
//删除一个员工
router.post('/employeeLists/delOneInfo', (req, res, next) => {
  let canshu = {};
  canshu['_id'] = ObjectID(req.body.id);
  console.log(canshu);
  myMongo._remove("Joker", "employeeLists", canshu).then((result) => {
    console.log(result);
    console.log('------------------------------');
    if (result) {
      myMongo._query("Joker", "employeeLists", canshu).then((result2) => {
        if (result2.length == 0) {
          res.send({ status: 200, msg: '删除成功' });
          console.log({ status: 200, msg: '删除成功' });
        } else {
          res.send({ status: 200, msg: '删除失败' });
          console.log({ status: 200, msg: '删除失败' });
        }
      })
    } else {
      res.send({ status: 200, msg: '删除失败' });
    }
  });
})
//修改一个员工信息
router.post('/employeeLists/updateOneInfo', (req, res, next) => {
  let qsReq = req.body;
  console.log(qsReq);

  let canshu = { '_id': ObjectID(req.body['_id']) };
  let newData = req.body;
  delete newData['_id'];


  console.log(canshu);
  myMongo._update("Joker", "employeeLists", canshu, newData).then((result) => {
    console.log('------------------------------');

    console.log(result);
    if (result) {
      myMongo._query("Joker", "employeeLists", canshu).then((result2) => {
        res.send({ status: 200, msg: '修改成功', data: result2 });
      })
    } else {
      res.send({ status: 200, msg: '修改失败-并未查出要修改的原数据' });
    }
  });
})
//获取特定员工信息
router.get('/employeeLists/getOneById', (req, res, next) => {
  let canshu = { '_id': ObjectID(req.query.id) };
  myMongo._query("Joker", "employeeLists", canshu).then((result) => {
    res.send({ status: 200, msg: '查询成功', data: result });
  });
})
module.exports = router