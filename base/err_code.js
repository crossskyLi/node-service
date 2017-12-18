var errCode = {
    'SUCCESS': 0,        //操作成功
    'ERROR': 1,          //服务器异常
    'DB_ERROR': 2,       //数据库错误
    'NO_SIGNIN': 3,      //用户未登陆
    'NO_PERMISSION': 4,      //没有权限

	'SUCCESS_MESSAGE': '操作成功',
    'ERROR_MESSAGE': '服务器异常',
    'DB_ERROR_MESSAGE': '数据库错误',
    'USER_NO_SIGNIN': '请先登陆',
	'PARAM_ERROR': '参数错误',
    'TOKEN_IS_NULL': '没有提供token！',
    'TOKEN_IS_ERROR': 'token信息错误',

    'USERNAME_IS_EXIST': '账号已经被注册',
    'PHONE_NUMBER_INPUT_ERROR': '手机号码输入错误',
    'LOGIN_INPUT_ERROR': '登录输入格式不对',
    'LOGIN_USER_NOT_EXIST': '用户名不存在',
    'LOGIN_USER_PASSWORD_ERROR': '登录密码错误',

    'NAME_IS_NULL': '学生名字不能为空',
    'SCHOOLID_IS_WRONG': '学校id错误',
    'CLASSID_IS_WRONG': '班级id错误',
    'USERID_IS_WRONG': '用户id错误',
    'STUDENTID_IS_WRONG': '学生id错误',
    'TEACHERID_IS_WRONG': '教师id错误',
    'BOOKID_IS_WRONG': '书籍id错误',
    'LESSONID_IS_WRONG': '课程id错误',
    'BATCH_IS_WRONG': '作业批次id错误',
    'RECOMMEND_IS_WRONG': '名师推荐id错误',
    'ROLEID_IS_WRONG': '角色id错误',
    'CATEGORYID_IS_WRONG': '类别id错误',
    'APPID_IS_WRONG': '应用id错误',
    'ADVERTD_IS_WRONG': '广告id错误',
    'PARAGRAPH_IS_WRONG': '段落id错误',
    'WORD_IS_WRONG': '生字词id错误',
    'RESOURCE_IS_WRONG': '朗诵资源id错误',
    
    'AREA_CODE_WRONG': '地区代码错误',
    'DATE_WRONG': '日期格式错误',
    'PUBLICATION_DATE_WRONG': '出版日期格式错误',
    'AUTHORIZE_DATE_WRONG': '授权截止日期格式错误',
    'HAVE_BINDING_CLASS': '该学生已绑定其他班级',
    'STUDENT_HAVE_AUDIT': '该学生已审核',
    'STUDENT_HAVE_NOT_APPLY': '该学生未申请审核',

    'NICKNAME_IS_NULL': '昵称不能为空',

    'CLASS_HOMEWORK_HAVE_PUBLISH': '该班级作业已经发布',
    'TIME_HAS_EXCEEDED_THE_DEADLINE': '当前时间已超过截止时间',
    'QUESTION_TYPE_IS_WRONG': '习题类型错误',

    'CLASS_IS_EMPTY': '请先选择班级',
    'BULLETIN_IS_EMPTY': '公告不能为空',

    'BOOK_NAME_IS_EMPTY': '书名不能为空',
    'USERNAME_IS_EMPTY': '用户名不能为空',
    'PASSWORD_IS_EMPTY': '密码不能为空',
    'CATEGORY_IS_EMPTY': '类别不能为空',
    'APPNAME_IS_EMPTY': '应用名不能为空',
    'LESSON_IS_EMPTY': '课程名不能为空',
    'ROLE_IS_EMPTY': '角色名不能为空',
    'RESOURCE_IS_EMPTY': '朗诵资源名不能为空',
    'RESOURCE_CONTENT_IS_EMPTY': '朗诵资源内容不能为空',

    'NO_PERMISSION_MSG': '权限错误',
    'PRICE_IS_WORNG': '价格格式错误',
    'MD5_IS_WORNG': 'md5格式错误'
};

module.exports = errCode;