var express = require('express');
var userCtrl = require('../ctrls/user/userCtrl');
var router = express.Router();


//用户管理
router.post('/users/addUser', userCtrl.addUser);
router.post('/users/updateUser', userCtrl.updateUser);
router.post('/users/deleteUser', userCtrl.deleteUser);
router.post('/users/getUserProfile', userCtrl.getUserProfile);
router.post('/users/getUserList', userCtrl.getUserList);

module.exports = router;
