
<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
import Nav from "@/components/Nav.vue";
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
  min-height: 100vh;
}
.content {
  // 当content中内容超出高度，显示滚动条
  overflow: auto;
  // 当flex-container在主轴方向上有剩余size时，flex-grow属性才会生效
  // 剩余空间都分配 给content
  flex-grow: 1;
}
</style>