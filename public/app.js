var app = require('./myHttp');

var path = {
    addUser:'/addUser'
};
var data = {
    addUser:{
        name:'1',
        age:'2',
        id:1
    }
};

// 添加用户
app.httpGet(path.addUser,data.addUser);
