// 可以区分具体的对象以及各种类型数据
function typeOf(obj: any): string {
    if (typeof obj !== 'object') {
        return typeof obj
    } else {
        return Object.prototype.toString.call(obj).slice(8, -1)
    }
}