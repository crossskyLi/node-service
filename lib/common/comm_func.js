/**
 * Created by Administrator on 2015/11/3.
 */
var _ = require('lodash');
var config = require('../../conf/config');
var moment = require('moment');
var qs = require('querystring');
var utility = require('utility');
var urlencode = require('urlencode');
// var httpHandler = new (require('../common/http_handler'))();


// function getHttpApiUrl(apiParams, reqPath, reqParams) {
//     reqParams.apikey = apiParams.apiKey;
//     reqParams.timestamp = moment().format('X');
//     reqParams.sign = '';

//     var gather = '';
//     var keysTemp = _.keys(reqParams);
//     keysTemp = _.sortBy(_.filter(keysTemp, function(k) { return k !== 'sign'; }));
//     for (var i = 0; i < keysTemp.length; i++) {
//         gather += keysTemp[i] + "=" + reqParams[keysTemp[i]];
//     }

//     gather = apiParams.secretkey + gather + apiParams.secretkey;
//     reqParams.sign = utility.md5(urlencode(gather)).toUpperCase();

//     return apiParams.reqBaseUrl + reqPath + '?' + qs.stringify(reqParams);
// }

// function httpGetApiCall(apiParams, reqPath, reqParams, callback) {
//     var reqUrl = getHttpApiUrl(apiParams, reqPath, reqParams);
//     httpHandler.baseHttpGetCall(reqUrl, callback);
// }

// exports.httpGetApiCall = httpGetApiCall;

// function httpPostApiCall(apiParams, reqPath, reqParams, postParams, callback) {
//     var reqUrl = getHttpApiUrl(apiParams, reqPath, reqParams);
//     httpHandler.baseHttpPostCall(reqUrl, postParams, callback);
// }

// exports.httpPostApiCall = httpPostApiCall;



//乘
function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {}
    try {
        m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
exports.accMul = accMul;
// 除
function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}

    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

exports.accDiv = accDiv;

//加
function accPlus(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}
exports.accPlus = accPlus;
//减
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
exports.accSub = accSub;

var mathSum = function(_arr) {
    var sum = 0;
    for (var i = 0; i < _arr.length; i++)
        sum += parseInt(_arr[i]);
    return sum;
};
exports.mathSum = mathSum;

//生成最多13位的随机数字
function randNum(m) {
    m = m > 13 ? 13 : m;
    var num = Math.random().toString();
    if (num.substr(num.length - m, 1) === '0') {
        return randNum(m);
    }
    return num.substring(num.length - m);
};
exports.randNum = randNum;

//根据类型生成用户或者框条码 
function generateBarCode(codeType) {
    //第一段数字
    var str1st = codeType.toString();

    //第二段数字
    var str2nd = (randNum(13)).toString();

    var group = str1st + str2nd;

    //第三段数字

    var tmpArray = [];
    for (var i = 0; i < group.length; i++) {
        tmpArray.push(parseInt(group.substring(i, i + 1)));
    }
    var sum2nd = (_.sum(tmpArray)).toString();

    var str3rd = sum2nd.charAt(sum2nd.length - 1);

    return group + str3rd;
}
exports.generateBarCode = generateBarCode;

function sortNumber(a, b) {
    return a - b;
}
exports.sortNum = sortNumber;


//新的加减乘除运算(除了采购富余量使用这里的方法，其它暂时没有使用这些,区分测试)

var _cf = (function() {
    function _shift(x) {
        var parts = x.toString().split('.');
        return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length);
    }
    return function() {
        // console.log(arguments);
        return Array.prototype.reduce.call(arguments, function(prev, next) { return prev === undefined || next === undefined ? undefined : Math.max(prev, _shift(next)); }, -Infinity);
    };
})();

function mathAdd() {
    var f = _cf.apply(null, arguments);
    if (f === undefined) return undefined;

    function cb(x, y, i, o) {
        return x + ~~(f * y);
    }
    return Array.prototype.reduce.call(arguments, cb, 0) / f;
};
exports.mathAdd = mathAdd;

function mathSub(l, r) {
    var f = _cf(l, r);
    return (~~(l * f) - ~~(r * f)) / f;
};
exports.mathSub = mathSub;

function mathMul() {
    var f = _cf.apply(null, arguments);

    function cb(x, y, i, o) {
        return ~~(x * f) * ~~(y * f) / (f * f);
    }
    return Array.prototype.reduce.call(arguments, cb, 1);
};
exports.mathMul = mathMul;

function mathDiv(l, r) {
    var f = _cf(l, r);
    return ~~(l * f) / ~~(r * f);
};
exports.mathDiv = mathDiv;



//生成连续日期数组
function generationDateArray(startDate, endDate) {
    var sectionDate = [];

    var date1 = getDate(startDate);
    var date2 = getDate(endDate);
    if (date1 > date2) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
    }
    date1.setDate(date1.getDate() + 1);
    while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())) {
        var item = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
        sectionDate.push(moment(new Date(item)).format('YYYY-MM-DD'));
        date1.setDate(date1.getDate() + 1);
    }
    return sectionDate;
}

function getDate(str) {
    var tempDate = new Date();
    var list = str.split("-");
    tempDate.setFullYear(list[0]);
    tempDate.setMonth(list[1] - 1);
    tempDate.setDate(list[2]);
    return tempDate;
}
exports.generationDateArray = generationDateArray;


function addCommas(n) {
    var rx = /(\d+)(\d{3})/;
    return String(n).replace(/^\d+/, function(w) {
        while (rx.test(w)) {
            w = w.replace(rx, '$1,$2');
        }
        return w;
    });
}
exports.addCommas = addCommas;