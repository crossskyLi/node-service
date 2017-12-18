var app = require('./myHttp');
// 路径
var path = {
    index:'/',
    addUser:'/users/addUser'
};
// 数据
var data = {
    index:{},
    addUser:{
        name:'1',
        age:'2'
    }
};


// 测试连接
// app.httpGet(path.index,data.index);

// 添加用户
// console.log('path.addUser,data.addUser',path.addUser,data.addUser)
app.httpPost(path.addUser,data.addUser);

