<template>
  <div class="home">
    <div v-html="emoji(str)"></div>
    <VueEmojiContainer @select="select" />
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
  emoji(str: string) {
    return emoji(str);
  }
  select(emoji: string) {
    this.str = `<span>i am a span ${emoji}</span>`;
  }
}
</script>
