interface Options {
    concurrency: number
}
interface Task {
    fn: () => Promise<any>
    priority: number
}
export class PromiseQueue {
    concurrency: number;
    pendingList: Task[];
    current: number;
    constructor(options: Options) {
        this.concurrency = options.concurrency || 1
        this.pendingList = []
        this.current = 0
    }
    // 若concurrency已满，只push但是不run
    /**
     * @param {Task} task
     * @return {void}
     */
    add(task: Task): PromiseQueue {
        this.pendingList.push(task)
        this.run()
        return this
    }
    run(): void {
        if (this.current === this.concurrency || this.pendingList.length === 0) return
        const { fn } = this.pendingList.sort((a, b) => b.priority - a.priority).shift()
        this.current++
        const promise = fn()
        promise.then(() => {
            this.completeOne.call(this)
        })
    }
    completeOne(): void {
        this.current--
        this.run()
    }
}

let task1 = {
    fn: () => {
        return new Promise<void>((r, j) => {
            console.log(1 + 'start')
            setTimeout(() => {
                console.log(1 + 'end')
                r()
            }, 1000)
        })

    },
    priority: 1
}
let task2 = {
    fn: () => {
        return new Promise<void>((r, j) => {
            console.log(2 + 'start')
            setTimeout(() => {
                console.log(2 + 'end')
                r()
            }, 2000)
        })

    },
    priority: 1
}
let task3 = {
    fn: () => {
        return new Promise<void>((r, j) => {
            console.log(3 + 'start')
            setTimeout(() => {
                console.log(3 + 'end')
                r()
            }, 1000)
        })

    },
    priority: 100
}
let queue = new PromiseQueue({ concurrency: 1 })
queue.add(task1).add(task2).add(task3)

/*  测试~~~~ */