<template>
  <div class="vue-emoji-container">
    <ul class="vue-emoji-controller">
      <li
        v-for="(pannel, index) in pannels"
        :key="index"
        @click="changeActive(index)"
        :class="{ active: index === activeIndex }"
      >
        {{ pannel }}
      </li>
    </ul>
    <ul class="vue-emojis">
      <li v-for="(emojiGroup, index) in emojis" :key="index">
        <div v-if="index === activeIndex">
          <p
            v-for="(value, emoji) in emojiGroup"
            :key="value"
            @click="selectEmoji(emoji)"
          >
            <span
              class="emoji-item"
              :title="emoji"
              :class="'sprite-' + getPureName(emoji)"
            ></span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import data from "@/datas";
import { emojiModel } from "@/utils";
@Component
export default class EmojiContainer extends Vue {
  activeIndex = 0;
  pannels: string[] = [];
  emojis: emojiModel[] = [];
  created() {
    let emojiDatas = data;
    this.pannels = Object.keys(emojiDatas);
    this.pannels.map((key) => {
      this.emojis.push(emojiDatas[key]);
    });
  }
  changeActive(index: number) {
    this.activeIndex = index;
  }
  getPureName(name: string) {
    return name.replace(/:/g, "");
  }
  selectEmoji(emoji: string) {
    this.$emit("select", emoji);
  }
}
</script>


<style scoped lang="scss">
@import "../assets/emoji-sprite.scss";
.vue-emoji-container {
  width: 100%;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  .vue-emoji-controller {
    height: 36px;
    overflow: hidden;
    margin-bottom: 0;
    li {
      float: left;
      width: 76px;
      font-size: 12px;
      line-height: 36px;
      list-style: none;
      cursor: pointer;
      text-align: center;
      position: relative;
      &.active::after {
        content: "";
        width: 100%;
        height: 1px;
        background: #0689dd;
        left: 0;
        bottom: 4px;
        position: absolute;
      }
    }
  }
  .vue-emojis {
    height: 140px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    li {
      font-size: 0;
      p {
        float: left;
        overflow: hidden;
        height: 35px;
        transition: all ease-out 0.2s;
        border-radius: 4px;
        &:hover {
          background-color: #d8d8d8;
          border-color: #d8d8d8;
        }
        span {
          width: 25px;
          height: 25px;
          display: inline-block;
          border: 1px solid transparent;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
