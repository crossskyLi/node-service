var express = require('express');
var userCtrl = require('../ctrls/userCtrl');
var router = express.Router();


//用户管理
router.post('/users/addUser', userCtrl.addUser);

module.exports = router;
