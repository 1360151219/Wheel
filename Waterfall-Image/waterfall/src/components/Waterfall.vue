  <template>
  <div
    class="vue-waterfall-container"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <div
      class="loading ball-beat"
      v-show="!loaded"
      :class="{ first: firstLoading }"
    >
      <slot name="loading" />
      <template v-if="!hasLoadingSlot">
        <div class="dot" v-for="n in loadingDotCount" :key="n"></div>
      </template>
    </div>
    <div class="vue-scroll-container" ref="scrollEl">
      <div class="imgItem" v-for="(item, idx) in imgsArr_c" :key="idx">
        <a :href="item.href"
          ><img
            :src="item.src"
            :alt="item.info"
            :width="imgWidth"
            :height="item._height ? item._height + 'px' : false"
        /></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { imgItem } from "@/models";
@Component
export default class WaterFall extends Vue {
  @Prop()
  imgsArr!: imgItem[];
  @Prop()
  width?: number; // 瀑布流容器总宽度
  @Prop()
  height?: number; // 瀑布流容器总长度
  @Prop({ default: 10 })
  gapWidth!: number;
  @Prop({ default: 3 })
  loadingDotCount!: number;
  @Prop({ default: 100 })
  reachBottomDistance!: number;
  //声明loadedCount变量记录加载完毕的数量，为了和imgsArr大小作比较，通知加载完毕（包括无图、加载完毕，加载失败的情况）
  loadedCnt = 0;
  loaded = false; // 正在预加载中，显示加载动画
  firstLoading = true;
  imgWidth = 240;
  imgBoxEls: any;
  imgsArr_c: imgItem[] = []; // 等预加载好了之后 才开始加载
  beginIndex = 0;
  colsHeightArr: number[] = [];
  cols = NaN;
  created() {
    this.cols = this.calcuCols();
    this.preload();
    // 添加响应式
    window.addEventListener("resize", this.response);
    setTimeout(() => {
      (this.$refs.scrollEl as any).addEventListener(
        "scroll",
        this.reachBottomed
      );
    }, 200);

    this.$on("preloaded", () => {
      this.firstLoading = false;
      this.imgsArr_c = this.imgsArr.concat();
      this.$nextTick(() => {
        this.loaded = true;
        this.waterfall();
      });
    });
  }
  get hasLoadingSlot() {
    return !!this.$slots.loading;
  }
  /**
   * @description: 预加载
   */
  preload(): void {
    this.imgsArr.forEach((item, index) => {
      if (!item.src) {
        // 支持无图模式
        this.imgsArr[index]._height = 0;
        this.loadedCnt++;
        if (this.loadedCnt == this.imgsArr.length) {
          this.$emit("preloaded");
        }
        return;
      }
      let oImg = new Image();
      oImg.src = item.src;
      oImg.onload = oImg.onerror = (e: any) => {
        this.loadedCnt++;
        //理论上 预加载图片的高度/预加载图片的宽度=需要渲染图片的高度/图片宽度
        this.imgsArr[index]._height =
          e.type == "load"
            ? Math.round(this.imgWidth * (oImg.height / oImg.width))
            : this.imgWidth;
        if (e.type == "error") {
          this.imgsArr[index]._error = true;
          this.$emit("imgError", this.imgsArr[index]);
        }
        if (this.loadedCnt === this.imgsArr.length) {
          this.$emit("preloaded");
        }
      };
    });
  }
  /**
   * @description: 获取列宽度
   */
  get ColWidth(): number {
    return this.imgWidth + (this.gapWidth as number);
  }
  reset() {
    this.imgsArr_c = [];
    this.loaded = false;
    this.firstLoading = true;
    this.beginIndex = 0;
    this.loadedCnt = 0;
  }
  @Watch("imgsArr")
  onImgsArrChange(newVal: imgItem[], old: imgItem[]) {
    if (this.imgsArr_c.length > newVal.length) {
      this.reset();
    }
    this.preload();
  }
  /**
   * @description:计算列数
   */
  calcuCols(): number {
    let waterfallWidth = this.width ? this.width : window.innerWidth;
    let cols = Math.max(Math.floor(waterfallWidth / this.ColWidth), 1);
    return cols;
  }
  /**
   * @description:响应式
   */
  response() {
    let old = this.cols;
    this.cols = this.calcuCols();
    if (old === this.cols) return;
    this.beginIndex = 0; // 复原清零
    this.waterfall();
  }
  reachBottomed() {
    if (!this.loaded) return;
    const scrollEl = this.$refs.scrollEl as HTMLElement;
    const scrollTop = scrollEl.scrollTop;
    const height = scrollEl.offsetHeight;
    const minHeight = Math.min(...this.colsHeightArr);
    if (scrollTop + height - minHeight > this.reachBottomDistance) {
      this.$emit("reachBottomed");
      this.loaded = false;
    }
  }
  /* 核心方法 */
  waterfall() {
    this.imgBoxEls = this.$root.$el.getElementsByClassName("imgItem");
    if (!this.imgBoxEls) return;
    let top, left, height;
    let colWidth = this.ColWidth;
    if (this.beginIndex === 0) this.colsHeightArr = [];
    for (let i = this.beginIndex; i < this.imgsArr.length; i++) {
      if (!this.imgBoxEls[i]) return;
      height = this.imgBoxEls[i].offsetHeight;

      // 第一行
      if (i < this.cols) {
        this.colsHeightArr.push(height);
        top = 0;
        left = i * colWidth;
      } else {
        let minHeight = Math.min(...this.colsHeightArr);
        let minIndex = this.colsHeightArr.indexOf(minHeight);
        top = minHeight;
        left = colWidth * minIndex;
        this.colsHeightArr[minIndex] += height;
      }
      this.imgBoxEls[i].style.left = left + "px";
      this.imgBoxEls[i].style.top = top + "px";
    }
    this.beginIndex = this.imgsArr.length;
  }
}
</script>

<style scoped lang="scss">
@keyframes loading {
  50% {
    opacity: 0;
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes show-item {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
.vue-waterfall-container {
  width: 100%;
  height: 100%;
  position: relative;

  > .loading {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
    z-index: 999;
    &.first {
      top: 50%;
      transform: translate(-50%, 50%);
    }
    &.ball-beat {
      > .dot {
        vertical-align: top;
        background-color: #59585a;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 3px;
        animation-fill-mode: both;
        display: inline-block;
        animation: loading 0.7s 0s infinite linear;
        &:nth-child(2n-1) {
          animation-delay: 0.35s;
        }
      }
    }
  }
  .vue-scroll-container {
    height: 100%;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .imgItem {
      position: absolute;
      animation: show-item 0.4s;
      transition: top 0.6s, left 0.6s;
      transition-delay: 0.5s;
    }
  }
}
</style>
