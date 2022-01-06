<template>
  <div id="app">
    <router-view ref="loader" />
  </div>
</template>
<script lang="ts">
import { isreachedBottom } from '@/utils'
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class App extends Vue {

}


</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
