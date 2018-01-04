var user = {
    insert: 'INSERT INTO sys_user(username,password,phone,email,real_name,role_id,status,createtime)' +
            ' VALUES(:userName,:password,:phone,:email,:realName,:roleId,:status,now())',
    update: ' UPDATE sys_user SET phone = :phone,email = :email,real_name = :realName, ' +
            ' role_id=:roleId,status=:status' +
            ' WHERE id = :userId',
    deleteUser: 'DELETE FROM sys_user WHERE id = :userId',
    queryUserById: 'SELECT username userName,age FROM user WHERE id = :userId',
    // 根据年龄查询
    getUserList:' SELECT username userName,age FROM user ' +
                ' WHERE (age BETWEEN :lowAge AND :maxAge ) AND (:searchName ="" OR username LIKE CONCAT("%",:searchName,"%")) ' +
                ' GROUP BY user.id ORDER BY user.age',
    isUserExistSql: 'SELECT id FROM sys_user WHERE username = :userName',
    isUpdateUserExistSql: 'SELECT id FROM sys_user WHERE id = :userId'
};

module.exports = user;