// 可以区分具体的对象以及各种类型数据
export function typeOf(obj: any): string {
    if (typeof obj !== 'object') {
        return typeof obj
    } else {
        return Object.prototype.toString.call(obj).slice(8, -1)
    }
}
// 柯里化函数
export function curry<T>(fn: Function, args: T[]) {
    args = args || [];
    const length = fn.length;
    return function () {
        let _args = args.concat([].slice.call(arguments));
        if (_args.length < length) return curry.call(this, fn, _args);
        else return fn.apply(this, _args);
    };
}