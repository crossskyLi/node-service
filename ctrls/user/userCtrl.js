var retJson = require('../../base/retjson'); // 返回数据格式
var errCode = require('../../base/err_code'); // 错误码归类
var async = require('async'); // 流程控制
var userDao = require('../../dao/user/user_dao'); // 表查询
var config = require('../../base/param_config'); // 一些常用的参数配置

//添加用户
function addUser(req, res, next) {
    var param = req.body;

    function isUserExist( callback ) {
        userDao.isUserExist(param,callback );
        console.log('new retJson',new retJson)
    }

    function insertUser(result,callback) {
        console.log('isUserExist',result);
        if(result){
            // 查到重复的用户名
            res.send(new retJson(errCode.ERROR,errCode.USERNAME_IS_EXIST));
            return;
        }
        userDao.addUserSql(param, callback);
    }


    async.waterfall([
        isUserExist,
        insertUser
    ], function (err,result) {

        if (err){
            console.log(err);
            res.send(new retJson(errCode.DB_ERROR));
            return;
        }
        console.log(result);
        res.send(retJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE));
    })

}


module.exports = {
    addUser: addUser
};