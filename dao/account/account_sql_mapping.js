var account = {
    getUserByUserNameAndStatus:' SELECT username userName,id userId,role_id roleId,password ' +
                               ' FROM user WHERE username = :userName AND status = :status ',
    getPermissions:''
};
module.exports = account;