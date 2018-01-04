// 使用连接池提升性能
var mysqlDao = require('../../lib/common/mysql_pool');
// sql 语句
var $sql = require('./account_sql_mapping');

// 查询用户名是否有效,并返回用户id等信息
function getUserByUserNameSql(params, callback) {
    mysqlDao.executeObject($sql.getUserByUserNameAndStatus, params, callback)
}
// 查询用户权限树
function getPermissionSql(param, callback) {

    mysqlDao.executeList($sql.getPermissions,param,callback);
}

module.exports = {
    getUserByUserNameSql: getUserByUserNameSql
};