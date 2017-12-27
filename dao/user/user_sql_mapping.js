var user = {
    insert: 'INSERT INTO user(username,age,password) VALUES(:userName,:age,:password)',
    update: 'update user set age = :age where id = :userId',
    deleteUser: 'delete from user where id = :userId',
    queryUserById: 'select username userName,age from user where id = :userId',
    // 根据年龄查询
    getUserList:' SELECT username userName,age FROM user ' +
                ' WHERE (age BETWEEN :lowAge AND :maxAge ) AND (:searchName ="" or username like CONCAT("%",:searchName,"%")) ' +
                ' GROUP BY user.id ORDER BY user.age',
    isUserExistSql: 'select id from user where username = :userName',
    isUpdateUserExistSql: 'select id from user where id = :userId'
};

module.exports = {
    user: user
};