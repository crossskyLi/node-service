var express = require('express');
var accountCtrl = require('../ctrls/account/accountCtrl')
var userCtrl = require('../ctrls/user/userCtrl');
var router = express.Router();

//用户登入/登出/上传
router.post('/signIn',accountCtrl.signIn);

//用户管理
router.post('/users/addUser', userCtrl.addUser);
router.post('/users/updateUser', userCtrl.updateUser);
router.post('/users/deleteUser', userCtrl.deleteUser);
router.post('/users/getUserProfile', userCtrl.getUserProfile);
router.get('/users/getUserList', userCtrl.getUserList);

module.exports = router;
