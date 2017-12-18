/*****************************************************
 * Author  : wadecha
 * Version : 1.0
 * Date    :  2015/09/18
 ****************************************************/


var validator = require('validator');

/// 公共验证

validator.isDateFormat = function(str, format) {
    // YYYY-MM-DD
    // YYYY-MM-DD HH:mm:ss
    // YYYY-MM-DD HH:mm
    // HH:mm:ss
    var regex = {
        YYYYMMDD: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-9]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/,
        YYYYMMDDHHmmss: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/,
        YYYYMMDDHHmm: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s)(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/,
        HHmmss: /^(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/
    };

    if(!regex.hasOwnProperty(format)) {
        return false;
    }

    return regex[format].test(str + '');
};

// 不推荐，建议使用 validator.isInt((str + ''), { min: 1 })
//validator.isNotZeroInt = function (str) {
//    var regex = /^[0-9]*[1-9][0-9]*$/;
//    return regex.test(str + '');
//};


// float min e.g., max e.l. digit e.l.
validator.isFloatFormat = function(str, options) {
    str = str + '';
    options = options || {};
    if (str === '' || str === '.') {
        return false;
    }

    var regex = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;

    function digitLen() {
        var len = ((str.split('.')[1] || '') + '').length;
        return (!options.hasOwnProperty('digit') || len <= options.digit);
    }

    function minMax() {
        return (!options.hasOwnProperty('min') || str >= options.min)
            && (!options.hasOwnProperty('max') || str <= options.max);
    }

    function neqZero() {
        if(options.hasOwnProperty('neq_zero')) {
            return options.neq_zero && str !== '0';
        }
        return true;
    }

    return regex.test(str) && minMax() && neqZero() && digitLen();
};

validator.isPhone = function(str) {
    return /^1[34578]\d{9}$/.test(str);
};

validator.isChineseName = function (str) {
    var regex = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    return regex.test(str + '');
};

validator.isChineseGBK = function (str) {
    var regex = /[\u4e00-\u9fa5]/;
    return regex.test(str + '');
};

/// 业务验证

// 用户条形码
validator.isUserBarcode = function(str){
    str = str + '';
    var regex = /^\d{16}$/;
    if(!regex.test(str)){
        return false;
    }

    var mathSumFunc = function(_arr){
        var sum = 0;
        for (var i = 0; i < _arr.length; i++)
            sum += parseInt(_arr[i]);
        return sum;
    };

    var barcodeSum = mathSumFunc(str.substring(0, str.length - 1).split('')).toString();
    return barcodeSum.substring(barcodeSum.length -1) === str.substring(str.length - 1);
};

validator.isBatchCode = function(str) {
    var regex = /^\d{6}[12][12]$/;
    return regex.test(str + '');
};

validator.isOrderBatchCode = function (str) {
    return /^(TO|TB|MD)\d{8}$/.test(str);
};

validator.isUserOrderCode = function(str) {
    str = str + '';
    return /^PX[BOM]\d{12}$/.test(str);
};

validator.isMaterialCode = function(str){
    var regex = /^\d{2}\.\d{2}\.\d{3}$/;
    return regex.test(str + '');
};

validator.isMaterialBarcode =  function(str){
    var regex = /^\d{10}\d+$/;
    return regex.test(str + '');
};

validator.isArray = function(obj){
    if(typeof obj == "object" && obj.constructor == Array){
        return true;
    }
    return false;
};


module.exports = exports = validator;



