var RetJson = require('../../base/retjson'); // 返回数据格式
var errCode = require('../../base/err_code'); // 错误码归类
var validator = require('../../lib/common/validator_extend'); // 验证扩展
var accountDao = require('../../dao/account/account_dao'); // 用户数据库操作
var utility = require('utility'); //md5
var jsonwebtoken = require('jsonwebtoken'); // 生成token
var paramConfig = require('../../base/param_config'); // 常用数据参数
var async = require('async'); // 常用数据参数
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
    // validatorUser(function (err, result) {
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log('result',result)
    // })
    function getPermission(callback,result) {
        var param = {
            userName :result
        }
        accountDao.getPermissionSql (param,callback)
    }
    async.auto({
        task1:validatorUser,
        task2:['task1',getPermission]
    },function (err,result) {
        if(err){
            console.error(err);
            return;
        }
        console.log(result)
    })
}

function validatorLoginUserByUserName(req, param, callback) {
    var sqlParam = {
        userName: param.userName,
        status: 1
    };
    accountDao.getUserByUserNameSql(sqlParam, function (err, userResult) {
        if (err) {
            callback(errCode.DB_ERROR_MESSAGE);
            return
        }
        //用户不存在
        if (!userResult) {
            callback(errCode.LOGIN_USER_NOT_EXIST)
        }

        if (param.password !== userResult.password) {
            callback(errCode.LOGIN_USER_PASSWORD_ERROR)
        }
        var userData = {
            userName: userResult.userName,
            userId: userResult.userId,
            roleId: userResult.roleId
        };
        userResult.token = jsonwebtoken.sign(userData, paramConfig.token_secret, {
            expiresIn: paramConfig.token_expires_time
        });
        delete userResult.password;
        callback(undefined,userResult)
    })

}

module.exports = {
    signIn: signIn
};