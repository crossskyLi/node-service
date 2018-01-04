var config = {
    env: 'production',// 环境名称
    port: '3500',
    requestIp:'192.168.0.12',//生产服的ip,现在暂时是本地
    mysql: {
        host: '127.0.0.1',
        user: 'root', // mysql 用户密码
        password: 'root', // mysql 用户名
        database: 'youyue-test',// 本地表名字
        port: '3306' //本地端口号
    },
    mongodb: {
        //mongodb数据库配置
    },
    redis: {
        //redis数据库配置
    }
};
module.exports = config;