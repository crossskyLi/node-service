var user = {
    insert :'INSERT INTO user(name,age) VALUES("1",1)',
    update:'update user set name=?,age = ? where id = ?',
    delete:'delete from user where id = ?',
    queryById:'select * from user where id = ?',
    queryAll :'select * from user'
};

module.exports = {
    user:user
};