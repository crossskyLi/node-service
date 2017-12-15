function extend(destination, source) {
    for (var property in source) {
        destination[property] = source[property];   // 利用动态语言的特性, 通过赋值动态添加属性与方法
    }
    return destination;   // 返回扩展后的对象
}
module.exports = {
    extend :extend
}