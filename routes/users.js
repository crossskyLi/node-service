var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 添加用户
router.post('/addUser', function(req, res, next) {
    // console.log('addUser req',req);
  userDao.add(req,res,next);
});
// 查询所有
router.get('queryAll',function (req, res, next) {
    userDao.queryAll(req,res,next);
});
// 查询
router.get('query',function (req, res, next) {
    userDao.queryById(req, res, next)
});

router.get('deleteUser',function (req, res, next) {
    userDao.delete(req, res, next)
});





module.exports = router;
