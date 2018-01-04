// 使用连接池 ,提升性能
var mysqlDao = require('../../lib/common/mysql_pool');
// sql语句
var $sql = require('./user_sql_mapping');

// 查用户名重复
function isUserExist(params, callback) {
    var sql = $sql.isUserExistSql;
    mysqlDao.executeObject(sql, params, callback)
}

// 添加用户
function addUser(params, callback) {
    var sql = $sql.insert;
    mysqlDao.executeUpdate(sql, params, callback)
}

// 查询要更新的用户是否存在
function isUpdateUserExist(params, callback) {
    var sql = $sql.isUpdateUserExistSql;
    mysqlDao.executeObject(sql, params, callback);
}

// 更新用户
function updateUser(params, callback) {
    var sql = $sql.update;
    mysqlDao.executeUpdate(sql, params, callback)
}

// 删除用户
function deleteUser(params, callback) {
    var deleteUserSql = $sql.deleteUser;
    var deleteStudentSql = $sql.deleteStudent;
    var sqlTasks = [];
    sqlTasks.push({'sql':deleteUserSql,'params':params});
    sqlTasks.push({'sql':deleteStudentSql,'params':params});
    mysqlDao.executeByTran(sqlTasks,callback)
}

// 查询用户信息
function getUserProfile(params, callback) {
    var sql = $sql.queryUserById;
    mysqlDao.executeObject(sql, params, callback)
}

// 获取用户列表
function getUserList(params, callback) {
    var sql = $sql.getUserList;
    console.log('chuanjinglai',params);
    mysqlDao.executeListGroupByForPagination(sql, params, callback);
}

module.exports = {
    addUser: addUser,
    isUserExist: isUserExist,
    isUpdateUserExist: isUpdateUserExist,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserProfile: getUserProfile,
    getUserList: getUserList
};
