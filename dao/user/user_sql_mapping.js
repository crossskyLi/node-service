var user = {
    insert :'INSERT INTO user(username,age) VALUES(:userName,:age)',
    update:'update user set name=?,age = ? where id = ?',
    delete:'delete from user where id = ?',
    queryById:'select * from user where id = ?',
    queryAll :'select * from user',
    isUserExistSql:'select id from user where username = :userName',
    isUpdateUserExistSql:'select id from user where id = :userId'
};

module.exports = {
    user:user
};