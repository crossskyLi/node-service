// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db-config');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var jsonWrite = require('../util/jsonWrite');
// 使用连接池 ,提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            // 获取前台页面传来的参数
            var param = req.query || req.params;

            //建立连接,向表中插值
            // 'INSERT INTO user(id,name,age) VALUES(0,?,?)',
            connection.query($sql.insert, [param.name, param.age], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '操作成功'
                    }
                }
                jsonWrite(res,result);
                connection.release();
            })
        })
    }
}
