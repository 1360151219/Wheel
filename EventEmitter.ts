interface Events {
    [key: string]: Array<Function>
}
interface Listener {
    listener: Function
}
class EventEmitter {
    private events: Events;
    constructor() {
        this.events = {}
    }
    indexOfListener(arr, listener) {
        if (typeof listener === 'object') {
            listener = listener.listener
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === listener) {
                return i
            }
        }
        return -1
    }
    /**
     * @description: 判断listener是否核里
     * @param {Function | Listener} listener
     * @return {Boolean}
     */
    isValidListener = function (listener: Function | Listener) {
        if (typeof listener === 'function') {
            return true
        } else if (listener && typeof listener.listener === 'function') {
            return this.isValidListener(listener.listener)
        } else {
            return false
        }
    }
    /* event.on(ev,()=>{}) */
    on = function (ev: string, cb: Function | Listener): EventEmitter {
        if (!ev || !cb) return
        if (!this.isValidListener(cb)) {
            throw Error('listener must be a function')
        }
        cb = typeof cb === 'object' ? cb.listener : cb
        if (!this.events[ev]) {
            this.events[ev] = []
        }
        /* 避免重复添加 */
        if (this.indexOfListener(this.events[ev], cb) === -1)
            this.events[ev].push(cb)
        return this
    }
    /**
     * @description: 添加只执行一次的事件 这是我觉得最难做的一个函数
     */
    once = function (ev: string, cb: Function | Listener) {
        cb = typeof cb === 'object' ? cb.listener : cb
        const func = function (...args) {
            (cb as Function).apply(args)
            this.off(ev, func)
        }
        this.on(ev, func)
        return this
    }
    /* event.emit(ev) */
    emit = function (ev: string, ...args: any[]): void {
        if (!this.events[ev]) {
            throw Error(ev + ' is not registered')
        }
        for (let f of this.events[ev]) {
            f.call(this, ...args)
        }
        return this
    }
    off = function (ev: string, listener: Function | Listener): void {
        if (!listener) return
        listener = typeof listener === 'object' ? listener.listener : listener
        const evs = this.events[ev]
        for (let i = 0; i < evs.length; i++) {
            if (evs[i] === listener) {
                evs.splice(i, 1)
                if (evs.length === 0) delete this.events[ev]
                break
            }
        }
        return this
    }
    /**
     * @description: 删除指定事件名或者全部事件
     * @param {string} ev
     * @return {*}
     */
    allOff(ev?: string) {
        if (ev && this.events[ev]) {
            this.events[ev] = []
        } else {
            this.events = {}
        }
        return this
    }
}

/* 测试 */
const myEvent = new EventEmitter()
let listener = (...args) => {
    console.log('hzg is a fool&' + args)
}
myEvent.on('hzg', listener)
myEvent.on('hzg', listener)
myEvent.emit('hzg', 1, 2)
myEvent.once('aa', () => {
    console.log('aa')
})


myEvent.emit('aa')
myEvent.emit('aa')


