// 实现与MySQL交互
// var mysql = require('mysql');
// var $conf = require('../conf/config');
// var $util = require('../lib/util');
var mysqlDao = require('../lib/common/mysql_pool');
var $sql = require('./userSqlMapping');
// var jsonWrite = require('../lib/jsonWrite');
// // 使用连接池 ,提升性能
// var pool = mysql.createPool($util.extend({}, $conf.mysql));

function addUserSql(req, res, next) {
    // 处理
    mysqlDao.executeObject($sql.user.insert, req, next)
    // pool.getConnection(function (err, connection) {
    //     // console.log(' req.query', req.query)
    //     // 获取前台页面传来的参数
    //     var param = req.body;
    //     //建立连接,向表中插值
    //     // 'INSERT INTO user(id,name,age) VALUES(0,?,?)',
    //     // console.log('$sql.insert',$sql.user.insert)
    //     // console.log('param.name, param.age',param.name, param.age)
    //     // console.log('param',param);
    //     connection.query($sql.user.insert, [param.id, param.name, param.age], function (err, result) {
    //         if (result) {
    //             result = {
    //                 code: 200,
    //                 msg: '操作成功'
    //             }
    //         }
    //         jsonWrite(res, result);
    //         connection.release();
    //     })
    // })
}

function queryAllUserSql(req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.query || req.params;

    })
}

module.exports = {
    addUserSql: addUserSql,
    queryAllUserSql: queryAllUserSql
};
