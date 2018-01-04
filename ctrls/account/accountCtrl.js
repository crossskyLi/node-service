var RetJson = require('../../base/retjson'); // 返回数据格式
var errCode = require('../../base/err_code'); // 错误码归类
var validator = require('../../lib/common/validator_extend'); // 验证扩展
var accountDao = require('../../dao/account/account_dao'); // 用户数据库操作
var utility = require('utility'); //md5
function signIn(req, res, next) {
    var reqBody = req.body;
    var param = {
        userName: reqBody.userName,
        password: reqBody.password
    };
    if (!param.userName && !validator.isLength(password + '', 2)) {
        res.send(new RetJson(errCode.ERROR, errCode.LOGIN_INPUT_ERROR));
        return;
    }

    function validatorUser(callback) {
        validatorLoginUserByUserName(req, param, callback);
    }

}

function validatorLoginUserByUserName(req, param, callback) {
    var sqlParam = {
        userName: param.userName,
        status: 1
    };
    var password = param.password;
    accountDao.getUserByUserNameSql(sqlParam, function (err, userResult) {
        if (err) {
            callback(errcode.DB_ERROR_MESSAGE);
            return
        }
        if (!userResult) {
            callback(errCode.LOGIN_USER_NOT_EXIST)
        }
        if (utility.md5(password) !== userResult.password) {
            callback(errCode.LOGIN_USER_PASSWORD_ERROR)
        }
        var userData = {
            userName: userResult.userName,
            userId: userResult.userId,
            roleId: userResult.roleId
        };
        console.log(userData)
    })

}

module.exports = {
    signIn: signIn
};