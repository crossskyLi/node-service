// function RetJson() {
//     var _argu = arguments;
//     var errcode = _argu[0] || 0;
//     var errmsg = _argu[1] || '';
//     var retobj = _argu[2] || {};
//     return {
//         errcode:errcode,
//         errmsg:errmsg,
//         retobj:retobj
//     };
// }
function RetJson(){
    this.errcode = arguments[0] || 0;
    this.errmsg = arguments[1] || '';
    this.retobj = arguments[2] || '';
}
module.exports = exports = RetJson;