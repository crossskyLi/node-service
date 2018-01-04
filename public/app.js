var app = require('./myHttp');
// 路径
var path = {
    index: '/',
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
        age: '2',
        password: '123'
    },
    // 更新用户
    updateUser: {
        userId: 21,
        age: '123',
        password: '123'
    },
    deleteUser: {
        userId: 22
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
    }
};
// 路由
var url = '';
var reqData = {}; // 新增用户
// 新增用户
// url = path.addUser;
// reqData = data.addUser;

// 更新用户
// url = path.updateUser;
// reqData = data.updateUser;

//删除用户
// url = path.deleteUser;
// reqData = data.deleteUser;

// 获取用户信息
// url = path.getUserProfile;
// reqData = data.getUserProfile;
// 获取用户列表
url = path.getUserList;
reqData = data.getUserList;
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
// request('post');
request('get');










