var app = require('./myHttp');
var utility = require('utility');
// 路径
var path = {
    index: '/',
    // 登录登出
    signIn:'/signIn',

    //用户操作
    addUser: '/users/addUser',
    updateUser: '/users/updateUser',
    deleteUser: '/users/deleteUser',
    getUserProfile: '/users/getUserProfile',
    getUserList: '/users/getUserList'

};
// 数据
var data = {
    index: {},
    //添加用户
    addUser: {
        userName: new Date().getTime(),
        password: utility.md5('123'),
        phone: '',
        email: '',
        realName: '',
        roleId: 1,
        status: 1
    },
    // 更新用户
    updateUser: {
        userId: 764,
        phone: '13692251969',
        email: '453486140@qq.com',
        realName: '真实名字',
        roleId: 1,
        status: 1
    },
    deleteUser: {
        userId: 764
    },
    getUserProfile: {
        userId: 19
    },
    getUserList: {
        lowAge: 1, // 最小年龄
        maxAge: 60, // 最大年龄
        searchName: '15', // 搜索模糊查询
        pageSize: 10,
        currentPage: 1
    },
    signIn:{
        userName:'1514354989449',
        password:utility.md5('123')
    }
};
// 路由
var url = '';
var reqData = {}; // 新增用户
// // 新增用户
// url = path.addUser;
// reqData = data.addUser;

// 更新用户
// url = path.updateUser;
// reqData = data.updateUser;

//删除用户
url = path.deleteUser;
reqData = data.deleteUser;

// 获取用户信息
// url = path.getUserProfile;
// reqData = data.getUserProfile;
// 获取用户列表
// url = path.getUserList;
// reqData = data.getUserList;
// 登录
// url = path.signIn;
// reqData = data.signIn;
function request(model) {
    if(model === 'post'){
        app.httpPost(url, reqData, function (chunk, endTip) {

            if (endTip) {
                console.log('请求结束', endTip, chunk);
                return;
            }
            console.log('请求结束', chunk);

        });
        return;
    }

    app.httpGet(url, reqData, function (resData) {
        if(resData.errcode){
            console.error(resData.errmsg);
            return;
        }

        console.log('请求结束lema', typeof resData,resData.retobj);

    });
}
request('post');
// request('get');










