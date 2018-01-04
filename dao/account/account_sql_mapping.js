var account = {
    getUserByUserNameAndStatus:'SELECT username userName,id userId,role_id roleId' +
                               'FROM `user` WHERE username = :userName AND `status` = :status'
};
module.exports = account;