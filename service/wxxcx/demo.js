var WXBizDataCrypt = require('./WXBizDataCrypt')
const express = require('express');
var router = express.Router();
var http = require("http");
//返回小程序的unionId
router.get('/demo/getunionId', (req, res, next) => {
	console.log(req.query);
	var appId = req.query.appId
	var sessionKey = req.query.sessionKey
	var encryptedData = req.query.encryptedData
	var iv = req.query.iv

	var pc = new WXBizDataCrypt(appId, sessionKey)

	var data = pc.decryptData(encryptedData, iv)
	console.log('解密后 data: ', data)
	res.send({ status: 200, data: data });

})
router.get('/demo/getunionId2', (req, res, next) => {
	var data = {
		'appid': 'wxba561310e16ea198',
		'secret': '1f2ec44def2a3fcabdb126dd83dd8aof',
		'js_code': req.query['js_code'],
		'grant_type': 'authorization_code'
	 };
	data = JSON.stringify(data);
	console.log(JSON.stringify(data,null,4))
	var opt = {
		host: 'https://api.weixin.qq.com/sns/jscode2session',
		port: '8080',
		method: 'GET',
		headers: {
			"Content-Type": 'application/json',
		}
	}
	http.request(opt, function (res) {
		console.log("response: " + res.statusCode);
		res.on('data', function (data) {
			console.log(1);
			console.log(data);
			res.send({ status: 200, data: data ,msg:'123'})
		}).on('end', function () {
			console.log(2);
			console.log(body);
			res.send({ status: 200, data: data, msg: '456'})
		});
	})

})
module.exports = router

// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }





