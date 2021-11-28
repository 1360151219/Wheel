# 造轮子

关于我为什么要造轮子，原因是为了提升自己的代码能力吧~~

## 目前轮子

一个简单的模拟的并发队列

- [PriorityQueue](https://github.com/1360151219/Wheel/blob/master/PriorityQueue.ts)

一个事件总线类的实现

- [EventEmitter](https://github.com/1360151219/Wheel/blob/master/EventEmitter.ts)

使用 typescript 装饰器实现防抖节流功能

> 注意这里 Options 配置中`leading`和`trailing`不能同时设置为`false`,因为如果都设置为`false`后，不触发事件后最后的一次`last=0`也无法执行，导致再次触发事件的时候会立即执行，违背了`leading=false`的本意。

- [Debounce&Throttle](https://github.com/1360151219/Wheel/blob/master/Debounce.ts)
