var app = require('./myHttp');
// 路径
var path = {
    index: '/',
    addUser: '/users/addUser',
    updateUser: '/users/updateUser'
};
// 数据
var data = {
    index: {},
    //添加用户
    addUser: {
        userName: '85651',
        age: '2',
        password: '123'
    },
    // 更新用户
    updateUser: {
        userId: 20,
        age: '123',
        password: '123'
    }
};


// 测试连接
// app.httpGet(path.index,data.index);

// 添加用户
// console.log('path.addUser,data.addUser',path.addUser,data.addUser)
app.httpPost(path.updateUser, data.updateUser, function (chunk, endTip) {

    if (endTip) {
        console.log('请求结束', endTip, chunk);
        return;
    }
    console.log('请求结束', chunk);

});

