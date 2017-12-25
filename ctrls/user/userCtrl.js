var RetJson = require('../../base/retjson'); // 返回数据格式
var errCode = require('../../base/err_code'); // 错误码归类
var async = require('async'); // 流程控制
var userDao = require('../../dao/user/user_dao'); // 表查询
var config = require('../../base/param_config'); // 一些常用的参数配置

// 添加用户
function addUser(req, res, next) {
    var reqBody = req.body;
    var params = {
        userName: reqBody.userName || '',
        age: reqBody.age,
        password: reqBody.password
    };
    if (!params.userName) {
        res.send(new RetJson(errCode.ERROR, errCode.USERNAME_IS_NULL));
        return;
    }
    if (!params.userName) {
        res.send(new RetJson(errCode.ERROR, errCode.USERNAME_IS_NULL));
        return;
    }
    function isUserExist(callback) {
        userDao.isUserExist(params, callback);
    }

    function insertUser(result, callback) {
        if (result) {
            // 查到重复的用户名
            res.send(new RetJson(errCode.ERROR, errCode.USERNAME_IS_EXIST));
            return;
        }
        userDao.addUser(params, callback);
    }

    async.waterfall([
        isUserExist,
        insertUser
    ], function (err, result) {

        if (err) {
            res.send(new RetJson(errCode.DB_ERROR, errCode.ERROR_MESSAGE));
            return;
        }
        res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE));
    })
}

// 更新用户
function updateUser(req, res, next) {
    var params = req.body;

    // 查询用户是否存在
    function isUserExist(callback) {
        userDao.isUpdateUserExist(params, callback)
    }

    // 更新用户
    function updateUser(result, callback) {
        if (!result) {
            res.send(new RetJson(errCode.ERROR, errCode.LOGIN_USER_NOT_EXIST));
            return;
        }
        userDao.updateUser(params, callback)
    }

    async.waterfall([isUserExist, updateUser], function (err, result) {
        if (err) {
            res.send(new RetJson(errCode.DB_ERROR, errCode.ERROR_MESSAGE));
            return;
        }
        res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE));
    })
}

// 删除用户
function deleteUser(req, res, next) {
    // 查询用户是否存在
    function isUserExist(callback) {
        userDao.isUpdateUserExist(params, callback)
    }
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser
};