var user = {
    insert: 'INSERT INTO sys_user(username,password,phone,email,real_name,role_id,status,createtime)' +
    ' VALUES(:userName,:password,:phone,:email,:realName,:roleId,:status,now())',

    update: ' UPDATE sys_user SET phone = :phone,email = :email,real_name = :realName, ' +
    ' role_id=:roleId,status=:status' +
    ' WHERE id = :userId',

    deleteUser: 'DELETE FROM sys_user WHERE id = :userId',

    deleteStudent: 'DELETE FROM student WHERE user_id = :userId',

    queryUserById: ' SELECT username userName,real_name realName,role_id roleId, status' +
    ' FROM sys_user WHERE id = :userId',

    getUserList: ' SELECT s.id userId ,username userName,phone,email,nickname nickName,' +
    ' real_name realName,sex,birth_date birth_date,school_name schoolName,c.grade,c.class,' +
    ' subject,r.id roleId,r.role_name roleName,s.status,createtime ' +
    ' FROM sys_user s' +
    ' left join sys_role r on r.id = s.role_id ' +
    ' left join student stu on stu.user_id = s.id and stu.status = 3' +
    ' left join class c on c.id = stu.class_id ' +
    ' or s.id = c.cn_teacher_id ' +
    ' left join school l on l.id = c.school_id' +
    ' where (:roleId = "" or s.role_id = :roleId)' +
    ' and ' +
    ' (' +
    ' :searchName = "" ' +
    ' or username like concat ("%",:searchName,"%") ' +
    ' or nickname like concat ("%",:searchName,"%") ' +
    ' or real_name like concat("%",:searchName,"%") ' +
    ' or phone like concat("%",:searchName,"%")' +
    ' )' +
    ' GROUP BY s.id ' +
    ' order by s.id desc',


    isUserExistSql: 'SELECT id FROM sys_user WHERE username = :userName',

    isUpdateUserExistSql: 'SELECT id FROM sys_user WHERE id = :userId'
};

module.exports = user;