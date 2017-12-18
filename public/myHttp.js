var http = require('http');
var querystring = require('querystring');
// var port = '9000';  //系统后台
 // var port = 3700;  //当当
// var port = 3600;  //weixin
// var port =3300; //后台管理 
// var port =3200; //本地教师端 
var port = 3300; //本地学生端
var ip = '192.168.0.66';//本地IP
// var ip = '120.76.25.120';//系统
// var ip = '116.62.8.201';//上线IP
// var ip = '121.199.24.124';//测试IP
// var ip = 'student.api.youyue.group';
// var ip = 'teacher.api.youyue.group';
function httpPost(path, data){
	//json转换为字符串
	data = querystring.stringify(data);
	console.log(data);
	var options = {
	    host: ip,
	//    host:'localhost',
	   port: port,
	//    path: '/v1?command=getAuthenticode',
	    path:path,
	    method: 'post',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Content-Length': Buffer.byteLength(data)
	    }
	};

	var req = http.request(options, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
	        console.log("body: " + chunk);
	    });
	    res.on('end',function(chunk){
	        console.log("body: " + chunk);
	    })
	});
	req.write(data);
	req.end();
}

var i = 0;
function httpGet(path, data){

	data = querystring.stringify(data);
	path = path + '?' + data;
	console.log(path)
	//json转换为字符串
	var options = {
	    host: ip,
        port:port,
        path:path, // 具体路径, 必须以'/'开头, 是相对于host而言的
        method: 'GET', // 请求方式, 这里以post为例
        headers: { // 必选信息, 如果不知道哪些信息是必须的, 建议用抓包工具看一下, 都写上也无妨...
            'Content-Type': 'application/json'
        }
    };
    http.get(options, function(res) {
        var resData = "";
        res.on("data",function(data){
            resData += data;
        });
        res.on("end", function() {
            // callback(null,JSON.parse(resData));
            console.log('--',JSON.parse(resData));
            // console.log('--',resData);
            console.log(++i);
        });
    });
}

function addStudent(path, data){
	//json转换为字符串
	data = querystring.stringify(data);
	console.log(data);
	var options = {
	    host: '192.168.0.55',
	    port: 8080,
	    path:path,
	    method: 'post',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Content-Length': Buffer.byteLength(data)
	    }
	};

	var req = http.request(options, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
	        console.log("return: " + chunk);
	    });
	    res.on('end',function(chunk){
	        console.log("body: " + chunk);
	    });
	    req.on('error', function (err) {
			console.log("err:" + err);
		});
	});
	req.write(data);
	req.end(function(err, ret){
		console.log('end')
	});
}


module.exports = {
	httpPost: httpPost,
	httpGet: httpGet,
	addStudent: addStudent
};


// { errcode: 0,
//   errmsg: '操作成功',
//   retobj:  '' }