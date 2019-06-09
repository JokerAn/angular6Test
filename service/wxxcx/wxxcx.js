const express = require('express');
var router = express.Router();
var request = require('request');

router.get('/getUnionId', (req, res, next) => {
	let url='https://api.weixin.qq.com/sns/jscode2session?appid=wxba561310e16ea198&&secret=1f2ec44def2a3fcabdb126dd83dd8a0f&&grant_type=authorization_code'
	request(url+'&&js_code='+req.query['code'], function (error, response, body) {
		console.log(body);
		res.send(JSON.parse(body));
    })

})
module.exports = router





