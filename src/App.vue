<template>
  <div id="app">
    <router-view />
  </div>
</template>

//  全局样式 因此不加scoped
<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/var.scss";

body {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: $base-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: #f5f5f5;
}
#app {
  max-width: 500px;
  margin: 0 auto;
}
</style>
