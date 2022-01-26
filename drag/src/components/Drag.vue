<template>
  <div :class="propClass" id="vue-drag" @mousedown="mouseDown">
    <div class="leftTop" @mousedown="resize"></div>
    <div class="leftBottom" @mousedown="resize"></div>
    <div class="rightTop" @mousedown="resize"></div>
    <div class="rightBottom" @mousedown="resize"></div>
    <div class="vue-drag-title">
      <span>{{ title }}</span>
    </div>
    <div class="vue-drag-content">
      <div v-if="!isHtml">{{ content }}</div>
      <div v-else v-html="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref } from 'vue'
interface Props {
  propClass: string,
  crashLimit: number,
  title: string,
  content: string
}
let isHtml = ref(false);
const props = withDefaults(defineProps<Props>(), {
  propClass: 'drag',
  crashLimit: 10,
  title: 'default title',
  content: 'default content'
})
if (props.content.match(/<[^>]+>.*<\/[^>]+>/).input) {
  isHtml.value = true
}
// 拖拽
function mouseDown(e) {
  const Drag = document.getElementById('vue-drag')
  const ev = e
  const X = ev.clientX - Drag.offsetLeft
  const Y = ev.clientY - Drag.offsetTop
  document.onmousemove = (e) => {
    const event = e
    const x = event.clientX
    const y = event.clientY
    Drag.style.left = x - X + 'px'
    Drag.style.top = y - Y + 'px'
  }
  document.onmouseup = () => {
    document.onmousemove = null
  }
}
function resize(e) {
  e.stopPropagation()
  const ev = e || window.event
  const Drag = document.getElementById('vue-drag')
  const height = Drag.clientHeight
  const width = Drag.clientWidth
  const left = Drag.offsetLeft
  const top = Drag.offsetTop
  const X = ev.clientX
  const Y = ev.clientY
  document.onmousemove = (e) => {
    const event: MouseEvent = e
    const x = event.clientX
    const y = event.clientY
    /* 注意：lt和rt left与right修改相同，但width对于差值的符号是相反的 */
    if (ev.target.className === 'leftTop') {
      Drag.style.height = `${(height + Y - y) > props.crashLimit ? (height + Y - y) : props.crashLimit}px`
      Drag.style.width = `${(width + X - x) > props.crashLimit ? width + X - x : props.crashLimit}px`
      Drag.style.left = `${left + x - X < left + width - props.crashLimit ? left + x - X : left + width - props.crashLimit}px`
      Drag.style.top = `${top + y - Y < top + height - props.crashLimit ? top + y - Y : top + height - props.crashLimit}px`
    } else if (ev.target.className === 'rightTop') {
      Drag.style.height = `${(height + Y - y) > props.crashLimit ? (height + Y - y) : props.crashLimit}px`
      Drag.style.width = `${(width + x - X) > props.crashLimit ? width + x - X : props.crashLimit}px`
      Drag.style.right = `${left + x - X < left + width - props.crashLimit ? left + x - X : left + width - props.crashLimit}px`
      Drag.style.top = `${top + y - Y < top + height - props.crashLimit ? top + y - Y : top + height - props.crashLimit}px`
    } else if (ev.target.className === 'leftBottom') {
      Drag.style.height = `${(height + y - Y) > props.crashLimit ? (height + y - Y) : props.crashLimit}px`
      Drag.style.width = `${(width + X - x) > props.crashLimit ? width + X - x : props.crashLimit}px`
      Drag.style.left = `${left + x - X < left + width - props.crashLimit ? left + x - X : left + width - props.crashLimit}px`
      Drag.style.bottom = `${top + y - Y < top + height - props.crashLimit ? top + y - Y : top + height - props.crashLimit}px`
    } else {
      Drag.style.height = `${(height + y - Y) > props.crashLimit ? (height + y - Y) : props.crashLimit}px`
      Drag.style.width = `${(width + x - X) > props.crashLimit ? width + x - X : props.crashLimit}px`
      Drag.style.right = `${left + x - X < left + width - props.crashLimit ? left + x - X : left + width - props.crashLimit}px`
      Drag.style.bottom = `${top + y - Y < top + height - props.crashLimit ? top + y - Y : top + height - props.crashLimit}px`
    }

  }
  document.onmouseup = () => {
    document.onmousemove = null
  }
}
</script>

<style scoped lang="scss">
#vue-drag {
  width: 300px;
  height: 500px;
  border-radius: 4px;
  border: 1px solid rgb(81, 79, 79);
  background-color: #dddddd;
  position: absolute;
  left: 0;
  top: 0;
  .leftTop {
    width: 5px;
    height: 5px;
    background-color: #000;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
  }
  .leftBottom {
    width: 5px;
    height: 5px;
    background-color: #000;
    position: absolute;
    left: 0;
    bottom: 0;
    cursor: pointer;
  }
  .rightTop {
    width: 5px;
    height: 5px;
    background-color: #000;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .rightBottom {
    width: 5px;
    height: 5px;
    background-color: #000;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }
  .vue-drag-title {
    padding: 12px;
    font-size: 18px;
    background-color: #d3d3d3;
  }
  .vue-drag-content {
    margin: 12px;
    height: calc(100% - 66px);
    background-color: #fff;
  }
}
</style>
