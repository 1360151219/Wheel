<template>
  <div class="home">
    <div style="background: red; height: 60px; width: 98vw; position: relative">
      <div
        v-html="emoji(str)"
        @input="textChange"
        contenteditable
        style="display: inline-block; height: 30px; width: 80%"
      ></div>
      <span @click="isShow = !isShow">显示</span>
      <VueEmojiContainer
        @select="select"
        :isShow="isShow"
        positionClass="bottom"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { emoji } from "@/utils";
import { Component, Vue } from "vue-property-decorator";
import VueEmojiContainer from "@/components/EmojiContainer.vue"; // @ is an alias to /src

@Component({
  components: {
    VueEmojiContainer,
  },
})
export default class Home extends Vue {
  str = "";
  isShow = true;
  emoji(str: string) {
    return emoji(str);
  }
  select(emoji: string) {
    this.str += emoji;
  }
  textChange(e) {
    this.str = e.target.innerHTML;
  }
}
</script>
<style scoped>
.bottom {
  position: absolute;
  top: 65px;
}
</style>
