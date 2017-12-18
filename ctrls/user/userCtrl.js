var RetJson = require('../../base/retjson'); // 返回数据格式
var errCode = require('../../base/err_code'); // 错误码归类
var async = require('async'); // 流程控制
var userDao = require('../../dao/user/user_dao'); // 表查询
var config = require('../../base/param_config'); // 一些常用的参数配置

//添加用户
function addUser(req, res, next) {
    var param = req.body;
    function insertUser(callback) {
        console.log('param',param);
        userDao.addUserSql(param, callback);
    }

    async.waterfall([
        insertUser
    ], function (err,result) {
        if (err){
            console.log(err);
            res.send('cuowu');
            return;
        }
        console.log(result);
        res.send('chheng');

    })

}


module.exports = {
    addUser: addUser
};