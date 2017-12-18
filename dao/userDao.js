// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/config');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var jsonWrite = require('../util/jsonWrite');
// 使用连接池 ,提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            console.log(' req.query', req.query)
            console.log('req.params ', req.params)
            // 获取前台页面传来的参数
            var param = req.query || req.params;
            // console.log('param',param)
            //建立连接,向表中插值
            // 'INSERT INTO user(id,name,age) VALUES(0,?,?)',
            // console.log('$sql.insert',$sql.user.insert)
            // console.log('param.name, param.age',param.name, param.age)
            connection.query($sql.user.insert, [param.name, param.age], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '操作成功'
                    }
                }
                jsonWrite(res, result);
                connection.release();
            })
        })
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = req.query || req.params;

        })
    }
}
