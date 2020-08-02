<template>
  <!-- 顶部标题栏 -->
  <div class="nav-bar">
    <div class="nav-left">
      <slot name="left"></slot>
    </div>
    <div class="nav-center">
      <slot name="center">标题</slot>
    </div>
    <div class="nav-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NavHeader",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/var.scss";

.nav-bar {
  position: relative;
  z-index: $nav-bar-z-index;
  display: flex;
  align-items: center;
  height: $nav-bar-height;
  line-height: 1.5;
  text-align: center;
  background-color: $nav-bar-background-color;

  .nav-left {
    width: 60px;
  }

  .nav-center {
    flex: 1;
  }

  .nav-right {
    width: 60px;
  }
}
</style>