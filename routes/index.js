var express = require('express');
var userCtrl = require('../ctrls/user/userCtrl');
var router = express.Router();


//用户管理
router.post('/users/addUser', userCtrl.addUser);
router.post('/users/updateUser', userCtrl.updateUser);

module.exports = router;
