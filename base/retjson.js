function RetJson() {
    var _argu = arguments;
    this.errcode = _argu[0] || 0;
    this.errmsg = _argu[1] || '';
    this.retobj = _argu[2] || {};
}
module.exports = exports = RetJson;