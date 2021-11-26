/*
 * @Author: 盐焗乳鸽还要砂锅
 * @Date: 2021-11-26 20:35:32
 * @Description: 防抖节流---TypeScript装饰器实现
 */

export const Debounce = function (delay = 500) {
    let timeout: number
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value
        descriptor.value = function () {
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                method.apply(this, arguments)
            }, delay)
        }
    }
}
/* 第一次不会立即执行，但最后会执行 */
export const TailThrottle = function (delay = 500) {
    let flag: boolean
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value
        descriptor.value = function () {
            if (flag) return
            flag = true
            setTimeout(() => {
                method.call(this, arguments)
                flag = false
            }, delay)
        }
    }
}


/* 第一次立即执行，最后停止不会执行 */
export const HeadThrottle = function (delay = 500) {
    let last = 0
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value
        descriptor.value = function () {
            let now = Date.now()
            if (now - last >= delay) {
                last = now
                method.apply(this, arguments)
            }
        }
    }
}


export const Throttle = function (delay = 500) {
    let last = 0
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value
        descriptor.value = function () {
            let now = Date.now()
            let remain = delay - (now - last)
            // 若now-last不足delay的时候
            if (remain >= 0) {
                setTimeout(() => {
                    method.call(this, arguments)
                    last = now
                }, remain)
            } else {
                method.call(this, arguments)
                last = now
            }
        }
    }
}

// 测试
// class C {
//   @Debounce(1000)
//   static testDebounce(a) {
//     console.log('防抖测试', a);
//   }
//   @Throttle(1000)
//   static testThrottle(a) {
//     console.log('节流测试', a);
//   }
// }

// window.addEventListener('resize', () => {
//   //C.testDebounce(Date());
//   // C.testThrottle(Date());
// });