// 实现与MySQL交互
// var mysql = require('mysql');
// var $conf = require('../conf/config');
// var $util = require('../lib/util');
var mysqlDao = require('../lib/common/mysql_pool');
var $sql = require('./user_sql_mapping');
// var jsonWrite = require('../lib/jsonWrite');
// // 使用连接池 ,提升性能
// var pool = mysql.createPool($util.extend({}, $conf.mysql));

function addUserSql(param, callback) {
    // 处理

    // var sql = 'INSERT INTO user(name,age) VALUES("1",1)'
    mysqlDao.executeUpdate($sql.user.insert, param, callback)
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
