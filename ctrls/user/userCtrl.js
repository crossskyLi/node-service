var retJson = require('../../base/retjson'); // 返回数据格式
var errCode = require('../../base/err_code'); // 错误码归类
var async = require('async'); // 流程控制
var userDao = require('../../dao/user/user_dao'); // 表查询
var config = require('../../base/param_config'); // 一些常用的参数配置

// 添加用户
function addUser(req, res, next) {
    var params = req.body;

    function isUserExist( callback ) {
        userDao.isUserExist(params,callback );
        console.log('new retJson',new retJson)
    }

    function insertUser(result,callback) {
        if(result){
            // 查到重复的用户名
            res.send(new retJson(errCode.ERROR,errCode.USERNAME_IS_EXIST));
            return;
        }
        userDao.addUser(params, callback);
    }


    async.waterfall([
        isUserExist,
        insertUser
    ], function (err,result) {

        if (err){
            res.send(new retJson(errCode.DB_ERROR));
            return;
        }
        res.send(retJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE));
    })

}

// 更新用户
function updateUser(req, res, next) {
    var params = req.body;
    // 查询用户是否存在
    function isUserExist(callback) {
        userDao.isUpdateUserExist(param,callback)
    }
    // 更新用户
    function updateUser(result, callback) {
        if(!result){
            res.send(new retJson(errCode.ERROR,errCode.LOGIN_USER_NOT_EXIST));
            return;
        }
        userDao.updateUser(params)

    }
    async.waterfall([isUserExist,updateUser],function (err, result) {
        if(err){
            console.log(err);
            return;
        }
        console.log('查到用户',result);
        res.send(retJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE));
    })
}

module.exports = {
    addUser: addUser,
    updateUser:updateUser
};