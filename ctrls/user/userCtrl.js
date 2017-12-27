var RetJson = require('../../base/retjson'); // 返回数据格式
var errCode = require('../../base/err_code'); // 错误码归类
var async = require('async'); // 流程控制
var userDao = require('../../dao/user/user_dao'); // 表查询
var config = require('../../base/param_config'); // 一些常用的参数配置
var validator = require('../../lib/common/validator_extend');

// 添加用户
function addUser(req, res, next) {
    var reqBody = req.body;
    var params = {
        userName: reqBody.userName || '',
        age: reqBody.age,
        password: reqBody.password || ''
    };
    if (!params.userName) {
        res.send(new RetJson(errCode.ERROR, errCode.USERNAME_IS_NULL));
        return;
    }
    if (!params.password || params.password.length < 3) {
        res.send(new RetJson(errCode.ERROR, errCode.PASSWORD_FORMAT_IS_WRONG));
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
            console.log('err', err);
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
    var reqBody = req.body;
    var params = {
        userId: reqBody.userId
    };
    var result = {aa: '', bb: ''};
    console.log(validator.isInt(params.userId + ''))
    if (!validator.isInt(params.userId + '')) {
        res.send(new RetJson(errCode.ERROR, errCode.USERID_IS_WRONG));
        return;
    }

    // 查询用户是否存在
    function isUserExist(callback) {
        userDao.isUpdateUserExist(params, callback)
    }

    function deleteUserByUserId(result, callback) {
        if (!result) {
            res.send(new RetJson(errCode.ERROR, errCode.LOGIN_USER_NOT_EXIST));
            return;
        }
        userDao.deleteUser(params, callback)
    }

    async.waterfall([
        isUserExist, deleteUserByUserId
    ], function (err, result) {
        if (err) {
            res.send(new RetJson(errCode.ERROR, errCode.ERROR_MESSAGE));
            return;
        }
        res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE, result))
    });

}

// 查询用户信息
function getUserProfile(req, res, next) {
    var reqBody = req.body;
    var params = {
        userId: reqBody.userId
    };
    if (!validator.isInt(params.userId + '')) {
        res.send(new RetJson(errCode.ERROR, errCode.USERID_IS_WRONG));
        return;
    }

    // 查询用户是否存在
    function isUserExist(callback) {
        userDao.isUpdateUserExist(params, callback)
    }

    function getUserProfile(result, callback) {
        if (!result) {
            res.send(new RetJson(errCode.ERROR, errCode.LOGIN_USER_NOT_EXIST))
            return;
        }
        userDao.getUserProfile(params, callback);
    }

    async.waterfall([
        isUserExist,
        getUserProfile
    ], function (err, result) {
        if (err) {
            res.send(new RetJson(errCode.ERROR, errCode.ERROR_MESSAGE));
            return;
        }
        res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE, result))
    })
}

// 获取用户列表
function getUserList(req, res, next) {
    var reqBody = req.body;
    var searchName = reqBody.searchName || '';
    var lowAge = reqBody.lowAge || 0;
    var maxAge = reqBody.maxAge || 1000;
    var pageSize = 10;
    var offSet = 0;
    if (validator.isInt(reqBody.pageSize + '', {min: 1})) {
        pageSize = parseInt(reqBody.pageSize + '')
    }
    if (validator.isInt(reqBody.currentPage + '', {min: 1})) {
        offSet = (parseInt(reqBody.currentPage + '') - 1) * pageSize
    }
    var params = {
        lowAge: lowAge,
        maxAge: maxAge,
        searchName: searchName,
        pageSize: pageSize,
        offSet: offSet
    };

    userDao.getUserList(params,function (err, result) {
        if(err){
            console.error(err);
            res.send(new RetJson(errCode.ERROR,errCode.ERROR_MESSAGE))
            return;
        }
        console.log('result.rows',result.rows);
        res.send(new RetJson(errCode.SUCCESS,errCode.SUCCESS_MESSAGE,result))
    })

}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserProfile: getUserProfile,
    getUserList: getUserList
};













