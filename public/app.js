var app = require('./myHttp');
// 路径
var path = {
    index:'/',
    addUser:'/users/addUser',
    updateUser:'/users/updateUser'
};
// 数据
var data = {
    index:{},
    //添加用户
    addUser:{
        userName:'85651',
        age:'2'
    },
    // 更新用户
    updateUser:{
        userId:19,
        userName:'85651',
        age:'2'
    }
};


// 测试连接
// app.httpGet(path.index,data.index);

// 添加用户
// console.log('path.addUser,data.addUser',path.addUser,data.addUser)
app.httpPost(path.updateUser,data.updateUser,function () {
    console.log('返回参数',arguments)
});

