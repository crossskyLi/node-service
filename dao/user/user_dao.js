// 使用连接池 ,提升性能
var mysqlDao = require('../../lib/common/mysql_pool');
// sql语句
var $sql = require('./user_sql_mapping');

// 查用户名重复
function isUserExist(insertData, callback) {
    var isUserExistSql = $sql.user.isUserExistSql;
    mysqlDao.executeObject(isUserExistSql, insertData, callback)
}

// 添加用户
function addUserSql(insertData, callback) {
    var insertUserSql = $sql.user.insert;
    mysqlDao.executeUpdate(insertUserSql, insertData, callback)
}

function queryAllUserSql(req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.query || req.params;

    })
}

module.exports = {
    addUserSql: addUserSql,
    isUserExist: isUserExist,
    queryAllUserSql: queryAllUserSql
};
