
<template>
  <div class="layout-wrapper">
    <!-- 顶部NavHeader -->
    <header>
      <slot name="header"></slot>
    </header>
    <!-- 中间内容区 -->
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <!-- 底部导航栏 -->
    <Nav />
  </div>
</template>

<script lang="ts">
import Nav from "@/components/Nav.vue";
// import NavBar from "../components/NavBar.vue";

export default {
  props: ["classPrefix"],
  name: "Layout",
  components: { Nav },
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  position: relative;
  // max-height: calc(100% - 44px);
  // 当content中内容超出高度，显示滚动条
  overflow: auto;
  // 当flex-container在主轴方向上有剩余size时，flex-grow属性才会生效
  // 剩余空间都分配 给content
  flex-grow: 1;
  // position: relative;
}
</style>