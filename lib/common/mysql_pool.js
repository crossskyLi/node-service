/*****************************************************
 * Author  : wadecha
 * Version : 1.0
 * Date    :  2015/9/18
 ****************************************************/
var _ = require('lodash');
var mysqlConfig = require("../../conf/config").mysql;
var mysql = require('mysql');
var async = require('async');
var commonFunc = require('../../lib/common/comm_func');

var pool = mysql.createPool({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database
});
// 1.查询一个结果
exports.executeObject = function( /*sql, params, callback*/ ) {
    var _args = arguments;
    pool.getConnection(function(err, connection) {
        var callback = _args[_args.length - 1];
        if (err) return callback(err);

        var args = Array.prototype.slice.call(_args, 0);
        args[args.length - 1] = function(err, results) {
            pool.releaseConnection(connection);
            callback(err, (results && results.length > 0) ? results[0] : undefined);
        };
        connection.config.queryFormat = function(query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function(txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };
        connection.query.apply(connection, args);
    });
};
// 2.查询列表
exports.executeList = function( /*sql, params, callback*/ ) {
    var _args = arguments;
    pool.getConnection(function(err, connection) {
        var callback = _args[_args.length - 1];
        if (err) return callback(err);

        var args = Array.prototype.slice.call(_args, 0);
        args[args.length - 1] = function(err, results) {
            pool.releaseConnection(connection);
            callback(err, results);
        };
        connection.config.queryFormat = function(query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function(txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };
        connection.query.apply(connection, args);
    });
};

    // var sqlTasks = [];
    // var sql = '';
    // sqlTasks.push({"sql": sql, "paras": insertArr[i]});
    // mysqlDao.executeByTran(sqlTasks, callback);
// 3.事务更新，支持多个更新
exports.executeByTran = function(sqlTasks, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }

        connection.beginTransaction(function(err) {
            if (err) {
                pool.releaseConnection(connection);
                return callback(err);
            }
            var tasks = [];
            sqlTasks.forEach(function(sqlTask) {
                tasks.push(function(callback2) {
                    connection.config.queryFormat = function(query, values) {
                        if (!values) return query;
                        return query.replace(/\:(\w+)/g, function(txt, key) {
                            if (values.hasOwnProperty(key)) {
                                return this.escape(values[key]);
                            }
                            return txt;
                        }.bind(this));
                    };
                    connection.query(sqlTask.sql, sqlTask.paras, callback2);
                });
            });

            async.series(tasks, function(err, taskResult) {
                if (err) {
                    connection.rollback(function(err2) {
                        pool.releaseConnection(connection);
                        callback(err);
                    });
                    return;
                }

                taskResult = _.flatten(taskResult);
                connection.commit(function(err) {
                    pool.releaseConnection(connection);
                    callback(err, taskResult);
                });
            })
        });
    });
};

// exports.executeTransaction = function(sqlTasks, callback) {

//     pool.getConnection(function (err, connection) {
//         if (err) return callback(err);

//         connection.beginTransaction(function (err) {
//             if (err) {
//                 pool.releaseConnection(connection);
//                 return callback(err);
//             }
//             var insertId;
//             async.eachSeries(sqlTasks, function (sqlTask, callback2) {
//                 connection.conf.queryFormat = function(query, values) {
//                     if (!values) return query;
//                     return query.replace(/\:(\w+)/g, function(txt, key) {
//                         if (values.hasOwnProperty(key)) {
//                             return this.escape(values[key]);
//                         }
//                         return txt;
//                     }.bind(this));
//                 };
//                 sqlTask.paras['insertId'] = insertId;
//                 connection.query(sqlTask.sql, sqlTask.paras, function(err, result){
//                     insertId = result && result.insertId || '';
//                 });
//                 // connection.query(sqlTask.sql, sqlTask.paras, callback2);
//             }, function (err) {
//                 if (err) {
//                     connection.rollback(function () {
//                         pool.releaseConnection(connection);
//                         callback(err);
//                     });
//                     return;
//                 }

//                 connection.commit(function (err2) {
//                     if(err2){
//                         return connection.rollback(function() {
//                             callback(err2);
//                         });
//                     }
//                     pool.releaseConnection(connection);
//                     callback(err2);
//                 });
//             })
//         });
//     });
// };

// 4.单个更新
exports.executeUpdate = function( /*sql, params, callback*/ ) {
    var _args = arguments;
    pool.getConnection(function(err, connection) {
        var callback = _args[_args.length - 1];
        if (err) return callback(err);

        var args = Array.prototype.slice.call(_args, 0);
        args[args.length - 1] = function(err, results) {
            pool.releaseConnection(connection);
            callback(err, results);
        };
        connection.config.queryFormat = function(query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function(txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };
        connection.query.apply(connection, args);
    });
};

// 5.分页查询
exports.executeListForPagination = function(sql, params, callback) {
    function tranformResult(err, results) {
        if (err) {
            callback(err);
            return;
        }

        var countResult = results ? results[0][0].count : 0;
        callback(undefined, {
            total: countResult,
            rows: (results[1] ? results[1] : [])
        });
    }

    //sql = sql.toLowerCase();
    var sql_count = "select count(*) as count ";
    var sql_select = sql.split(' from ')[0];
    var sql_where = sql.slice(sql.indexOf(' from '));
    //var sql_where = ' from ' + sql.split(' from ')[1];
    var sql_limit = (params && params.hasOwnProperty('pagination') && !params.pagination) ? "" : " limit :offSet, :pageSize";

    var tasks = [];
    tasks.push(function(callback2) {
        exports.executeList((sql_count + sql_where), params, callback2);
    });
    tasks.push(function(callback2) {
        exports.executeList((sql_select + sql_where + sql_limit), params, callback2);
    });

    async.parallel(
        tasks,
        tranformResult
    );
};

// 6.有 group by 调用的分页查询
exports.executeListGroupByForPagination = function(sql, params, callback) {
    function tranformResult(err, results) {
        if (err) {
            callback(err);
            return;
        }

        var dataResult = (results && results[0]) ? results[0] : [];
        var countResult = dataResult.length;
        if (!(params && params.hasOwnProperty('pagination') && !params.pagination)) {
            dataResult = _.slice(dataResult, params.offSet, (params.offSet + params.pageSize));
        }

        callback(undefined, {
            total: countResult,
            rows: dataResult
        });
    }

    var tasks = [];
    tasks.push(function(callback2) {
        exports.executeList(sql, params, callback2);
    });

    async.parallel(
        tasks,
        tranformResult
    );
};

// 7.有footer的页面
exports.executeListGroupByStatisticsForPagination = function(sql, params, callback) {
    function tranformResult(err, results) {

        if (err) {
            callback(err);
            return;
        }

        var dataResult = (results && results[0]) ? results[0] : [];
        var countResult = dataResult.length;
        var footer = [];

        if (!(params && params.hasOwnProperty('footer') && !params.footer && params.hasOwnProperty('statisticsName') && !params.statisticsName)) {
            var fields = {};
            fields[params.statisticsName] = "合计:";
            _.forEach(params.footer, function(fieldName, index) {
                var sum = _.sumBy(dataResult, fieldName);
                fields[fieldName] = commonFunc.addCommas((sum / 100).toFixed(2));
            });
            footer.push(fields);
        }
        if (!(params && params.hasOwnProperty('pagination') && !params.pagination)) {
            dataResult = _.slice(dataResult, params.offSet, (params.offSet + params.pageSize));
        }

        callback(undefined, {
            total: countResult,
            rows: dataResult,
            footer: footer
        });
    }

    var tasks = [];
    tasks.push(function(callback2) {
        exports.executeList(sql, params, callback2);
    });

    async.parallel(
        tasks,
        tranformResult
    );
};
