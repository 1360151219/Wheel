# waterfall

本仓库以 https://github.com/parrot-design/parrot-ve-waterfall 为 base 来创造的一个瀑布流布局的一个组件。

![效果图](./ex.gif)

## 2021.12.7

实现基本功能。

参数方面：

|      参数名称       | 参数类型  |   是否必选    |                     描述信息                      |
| :-----------------: | :-------: | :-----------: | :-----------------------------------------------: |
|       imgsArr       | imgItem[] |      是       | 目前属性包括 ` src`、`href`、`info`、`hasHeader ` |
|    width/height     |  number   |      否       |   瀑布流容器总宽高，会根据父组件的父容器来扩张    |
|      gapWidth       |  number   | 否 (默认 10)  |                  图片间间隙宽度                   |
|   loadingDotCount   |  number   |  否 (默认 3)  |             默认 loading 的小点点数量             |
| reachBottomDistance |  number   | 否 (默认 100) |                触发触底事件的距离                 |
|      imgWidth       |  number   | 否 (默认 240) |                   单张图片宽度                    |
|      imgClass       | string[]  |      否       |                图片容器的类名数组                 |

事件：

|   事件名称    |     参数类型     |        描述信息        |
| :-----------: | :--------------: | :--------------------: |
|     click     | Event,item,index | 点击单个图片的时候触发 |
| reachBottomed |                  |        触底触发        |

插槽：

| 插槽名称 |                         描述信息                          |
| :------: | :-------------------------------------------------------: |
| loading  |                       loading 效果                        |
|  header  | 图片的 header，可在 imgsArr 中设置哪张图片是否具有 header |

## 2021.12.9

- 移除根据`this.$Slots`来判断插槽是否使用。
- 修复图片显示错误时仍保留高度的 bug
