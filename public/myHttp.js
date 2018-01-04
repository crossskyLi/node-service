var http = require('http');
var querystring = require('querystring');
var config = require('./conf/config');
var ipData = config.dev;// 开发环境配置
// var ipData = config.test;// 测试环境配置
// var ipData = config.prod;// 生产环境配置

var ip = ipData.requestIp;// IP
var port = ipData.port; // 端口
// var ip = '120.76.25.120';//系统
// var ip = '116.62.8.201';//上线IP
// var ip = '121.199.24.124';//测试IP
// var ip = 'student.api.youyue.group';
// var ip = 'teacher.api.youyue.group';
// var port = '9000';  //系统后台
// var port = 3700;  //当当
// var port = 3600;  //weixin
// var port =3300; //后台管理
// var port =3200; //本地教师端
// post
function httpPost(path, data,callback) {
    //json转换为字符串
    data = querystring.stringify(data);
    // console.log(data);
    var options = {
        host: ip,
        //    host:'localhost',
        port: port,
        //    path: '/v1?command=getAuthenticode',
        path: path,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback( chunk);
        });
        res.on('end', function (chunk) {
            callback( chunk ,'结束');
        })
    });
    req.write(data);
    req.end();
}
// get
function httpGet(path, data,callback) {
    data = querystring.stringify(data);
    path = path + '?' + data;
    //json转换为字符串
    var options = {
        host: ip,
        port: port,
        path: path, // 具体路径, 必须以'/'开头, 是相对于host而言的
        method: 'GET', // 请求方式, 这里以post为例
        headers: { // 必选信息, 如果不知道哪些信息是必须的, 建议用抓包工具看一下, 都写上也无妨...
            'Content-Type': 'application/json;charset=utf-8'
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            // 'Content-Length': Buffer.byteLength(data)
        }
    };
    http.get(options, function (res) {

        var resData = "";
        res.on("data", function (data) {
            console.log('-----',data)
            resData += data;
        });
        res.on("end", function (data, result) {
            resData = JSON.parse(resData)
            callback( resData);
        });
    });
}

// function addStudent(path, data) {
//     //json转换为字符串
//     data = querystring.stringify(data);
//     console.log(data);
//     var options = {
//         host: '192.168.0.55',
//         port: 8080,
//         path: path,
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Content-Length': Buffer.byteLength(data)
//         }
//     };
//
//     var req = http.request(options, function (res) {
//         res.setEncoding('utf8');
//         res.on('data', function (chunk) {
//             console.log("return: " + chunk);
//         });
//         res.on('end', function (chunk) {
//             console.log("body: " + chunk);
//         });
//         req.on('error', function (err) {
//             console.log("err:" + err);
//         });
//     });
//     req.write(data);
//     req.end(function (err, ret) {
//         console.log('end')
//     });
// }


module.exports = {
    httpPost: httpPost,
    httpGet: httpGet,
    // addStudent: addStudent
};


// { errcode: 0,
//   errmsg: '操作成功',
//   retobj:  '' }