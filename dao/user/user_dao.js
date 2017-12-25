// 使用连接池 ,提升性能
var mysqlDao = require('../../lib/common/mysql_pool');
// sql语句
var $sql = require('./user_sql_mapping');

// 查用户名重复
function isUserExist(params, callback) {
    var sql = $sql.user.isUserExistSql;
    mysqlDao.executeObject(sql, params, callback)
}

// 添加用户
function addUser(params, callback) {
    var sql = $sql.user.insert;
    mysqlDao.executeUpdate(sql, params, callback)
}

function isUpdateUserExist(params, callback) {
    var sql = $sql.user.isUpdateUserExistSql;
    mysqlDao.executeObject(sql,params,callback);
}
// 更新用户
function updateUser(params, callback) {
    var sql = $sql.user.update;
    mysqlDao.executeUpdate(sql,params,callback)
}

module.exports = {
    addUser: addUser,
    isUserExist: isUserExist,
    isUpdateUserExist: isUpdateUserExist,
    updateUser:updateUser,
};
