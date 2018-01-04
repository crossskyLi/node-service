var user = {
    insert: 'INSERT INTO user(username,age,password) VALUES(:userName,:age,:password)',
    update: 'UPDATE user SET age = :age WHERE id = :userId',
    deleteUser: 'DELETE FROM user WHERE id = :userId',
    queryUserById: 'SELECT username userName,age FROM user WHERE id = :userId',
    // 根据年龄查询
    getUserList:' SELECT username userName,age FROM user ' +
                ' WHERE (age BETWEEN :lowAge AND :maxAge ) AND (:searchName ="" OR username LIKE CONCAT("%",:searchName,"%")) ' +
                ' GROUP BY user.id ORDER BY user.age',
    isUserExistSql: 'SELECT id FROM user WHERE username = :userName',
    isUpdateUserExistSql: 'SELECT id FROM user WHERE id = :userId'
};

module.exports = {
    user: user
};